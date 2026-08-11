# Skill Practice Integration — Implementation Planning Report

*Status: planning only. No code, content, or architecture changed by this document. Prepared for handoff to an implementation pass.*

---

## 0. Critical flag — read this first

**The task's primary goal ("arrive on a Skill page → practice that Skill's words") directly contradicts a currently-frozen architectural decision in this repository.**

`docs/architecture/CONTENT_MODEL.md` §3 (Skill) and §4 (Practice Sets) state, unambiguously and twice:

> "A Skill's demonstration is not a Practice Set... **and does not launch the practice experience.** ... A user who wants to practice the concept is routed, via the Skill's curriculum-placement links, to the Grade Unit(s) where it is actually assigned." (§3)
>
> "**A Skill does not launch the practice experience directly.** The practice experience is reached exclusively through a Grade Unit's Practice Set (or custom words); a Skill routes there via its curriculum-placement links rather than exposing a second, grade-neutral Practice Set of its own." (§4)

`docs/architecture/SKILLS_MODEL.md` §15 (not superseded by `SKILLS_ARCHITECTURE.md`, which only supersedes §7/§8/§10) says the same thing a third time:

> "A Skill page is concept-first: its job is to teach the pattern clearly, demonstrate it, and route the user to the Grade Unit(s) where it is actually practiced — **it does not launch a practice session of its own.**"

This is not incidental prose — it is implemented today. `src/pages/skills/[slug].astro` renders the Skill's demonstration words in a **read-only** `WordListPreview` (no practice button), and its only route into `/play` is the "Where this fits in the curriculum" section, which links to Grade Unit pages (`curriculumPlacements`, computed by scanning every Grade Unit's `skillIds` for the current Skill's id — see lines 96–111 of `[slug].astro`). A Skill with **zero** Grade Unit placements has **no path into practice at all** today (`CONTENT_MODEL.md` §10 even says such a Skill should stay in `draft` status for exactly this reason).

The research report's entire premise — one canonical grade-independent practice bank per Skill, with a "Practice this Skill" CTA on the Skill page itself — is educationally sound and matches the product's stated goal ("Skill page → instructional content → 'Practice this Skill' experience"). But it is also exactly the change `CONTENT_MODEL.md` and `SKILLS_MODEL.md` currently forbid by name. Per this task's own instruction ("If you find an apparent contradiction... FLAG IT for review rather than silently choosing one"), **this is that flag.**

This is not a reason to stop. It is a reason for a human to explicitly approve amending `CONTENT_MODEL.md` §3/§4 and `SKILLS_MODEL.md` §15 before implementation starts, rather than an implementer discovering mid-PR that the change contradicts a document titled "frozen." See §J (Documentation plan) and §M (Risks) below. Everything in this report is written on the assumption that this amendment will be approved, since the alternative (not amending it) means the feature as specified cannot ship at all.

---

## A. Repository findings

### A1. How practice actually works today

**Route:** `/play?list=<payload>` (`src/pages/play.astro`).

**How a session is launched:** every existing "Start practice" entry point (`GradeUnitWorldPage.astro` lines 668–722; the homepage custom-words form in `index.astro` lines ~268–311) follows the same pattern:
1. Build a plain `string[]` of words (or richer `{word, hint?, exampleSentence?, phonicsPattern?}[]` from `toPlayableWords()`).
2. `encodeWordList(words.map(w => w.word))` (`src/lib/words/serialization.ts`) — normalizes, dedupes, base64url-encodes into `1.<payload>`, capped at `MAX_WORD_COUNT = 200` words / `MAX_PAYLOAD_LENGTH = 4096` chars.
3. `sessionStorage.setItem('sw:words:' + payload, JSON.stringify(richWords))` and `sw:title:<payload>` — this is how per-word `exampleSentence` (and title) survive the navigation; the URL itself only carries plain words.
4. `window.location.href = '/play?list=' + payload`.

**On `/play`:** `decodeWordList(payload)` recovers the plain words from the URL (works even with sessionStorage cleared/private browsing — degrades to plain dictation, no sentences). If `sessionStorage['sw:words:' + payload]` is present and well-formed, it's used instead as the richer `{word, exampleSentence}[]` — **this is the existing, already-shipped mechanism for supplying a per-word example sentence**, and it is exactly the extension point a contextual practice item needs (see §C, §G).

**Audio/TTS:** `src/modules/speech/` wraps `window.speechSynthesis`. On each question, `speech.speakWord(current.word, opts)` fires immediately; if the word has an `exampleSentence`, `speech.speakWord(sentence, opts)` fires automatically ~1s later (also replayable via a secondary "Hear sentence again" button, `play.astro` lines 215–235, 885–892). **The isolated word is always spoken first, before the sentence, and this order is not currently configurable per word or per session.**

**Answer evaluation:** `src/modules/spellingTest/stateMachine.ts` (a pure reducer: `idle → ready → awaitingAnswer → feedback → complete`) calls `compareWords(answer, correctWord)` (`src/lib/words/compareWords.ts`) — case-insensitive, accent-*sensitive* exact match via `normalizeWord`. No fuzzy matching, no partial credit. This is unconditionally reusable for any target spelling, including contextual items — evaluation only ever needs the target word string, not the sentence.

**Session length:** entirely determined by how many words are encoded into the payload — there is no separate "session size" concept in the engine. Grade Units use 8–16 words per `CONTENT_MODEL.md` §3; CLAUDE.md documents a "default 10-word session size" for the custom-words homepage flow. `MAX_WORD_COUNT = 200` is a hard ceiling far above any Skill bank size under discussion (14–30 words), so **no serialization/URL-length constraint blocks even the largest proposed bank (Multisyllabic Words, 28 words) from being encoded whole.**

**Contextual prompts today:** partially. `exampleSentence` exists and is wired end-to-end (played, replayable, "no sentence available" fallback state exists in the UI already). But it is **one sentence per unique word string, globally** (`src/lib/sentenceBank/lookup.ts` — `SENTENCE_BANK` is indexed by `normalizeWord(entry.word)`; there is exactly one canonical entry per spelling site-wide, reused everywhere that word appears). There is no per-list or per-Skill override of a word's sentence in the *shipped* engine — except the sessionStorage rich-payload path described above, which *does* let a given practice launch supply an arbitrary `exampleSentence` per word, bypassing the global bank entirely. That path is unused for this purpose today but requires no new engine code.

**Does the engine assume every target is a plain string?** Mostly no at the type level (`SpellingWord` already carries optional `hint`, `exampleSentence`, `phonicsPattern`) but yes at the *authoring* level — nothing today models a *base word*, a *contrastive spelling set*, or a *morphological relationship* (e.g. `run → running`). Those are pure additions, not breaking changes — see §C.

**Custom-words flow (`index.astro`) and Grade Unit launch (`GradeUnitWorldPage.astro`)** both funnel into the exact same `/play` mechanism described above; there is only one practice engine in the codebase, not two.

### A2. How the 41 canonical Skills are modeled today

**Canonical source of the 41 ids:** `CURATED_SPELLING_SKILL_IDS` in `src/lib/content/spellingSkills.ts`, cross-checked 1:1 against the route manifest `CANONICAL_SKILL_ROUTE_DEFS` in `src/lib/content/canonicalSkillRoutes.ts` (id → public slug → canonical path). `canonicalSkillRoutes.test.ts` enforces: exactly 41, no duplicates, every id resolves to a `published` + `contentRole: skill` Markdown entry, no orphan slugs. **This is the single source of truth for "is this one of the 41."**

**Canonical source of each Skill's content:** one Markdown file per Skill under `src/content/spelling-lists/grade-level/` (morphology/context Skills) or `src/content/spelling-lists/phonics/` (phonics Skills), validated by the `spelling-lists` Content Collection schema (`src/content/config.ts`). Each file's frontmatter `words:` array (`z.union([z.string(), z.object({word, hint?, phonicsPattern?})])`) is the Skill's **demonstration set** — per `CONTENT_MODEL.md` §3/§4, explicitly small, explicitly *not* a Practice Set, and explicitly capped "well below Practice Set size."

**Page template:** `src/pages/skills/[slug].astro`, one shared template for all 41 (`getStaticPaths` maps every `CANONICAL_SKILL_ROUTE_DEFS` entry to its content entry). Renders: hero → "What is X?" answer block → readiness signals → `WordListPreview` of the demonstration words (read-only, `showSentences={false}`) → markdown body (`Understanding the pattern`) → "Where this fits in the curriculum" (links to Grade Units that declare this Skill in `skillIds`) → FAQ → prerequisite/next/related Skill cards.

**Are demonstration words already conflated with practice words?** No — the separation is clean and intentional today. `toPlayableWords(entry)` is called on Skill pages purely to render the *preview*, never to launch `/play`. This is a real, working three-way distinction already present in the codebase:
1. **Demonstration/example words** — Skill frontmatter `words:`, small, prose-referenced, teaches the pattern.
2. **Grade Unit Practice Set** — Grade Unit frontmatter `words:`, 8–16 words, the *only* thing `/play` is currently reachable from.
3. **Session words** — whatever subset is actually encoded into a given `/play` URL (today: always the full Grade Unit Practice Set or the full custom-word list; there is no session-selection logic anywhere in the repo).

**Is there an existing "practice inventory" concept?** No. This is the actual data gap — see §B.

**Is Skill data duplicated anywhere?** No duplication found. `skillTags` groups content editorially (`groupBySkillFamily` in `src/lib/content/spellingLists.ts`) but does not duplicate word lists.

**Tests enforcing the 41-Skill architecture:** `canonicalSkillRoutes.test.ts` (id/slug/count integrity) plus per-family tests (`shortVowelsSkillFamily.test.ts`, `consonantDigraphsSkillFamily.test.ts`, `multisyllabicWordsSkillFamily.test.ts`, `greekAndLatinRootsSkillFamily.test.ts`, `homophonesAndConfusedWordsSkillFamily.test.ts`, `prefixesSkillFamily.test.ts`, etc. — one per family in `src/lib/content/`) that check family membership, ordering, and (for some) content shape. These are a strong precedent for how a `skillPracticeBanks` test suite should be structured (see §I).

---

## B. Gap analysis

**Data gaps**
- No canonical practice-bank data structure exists anywhere. Skill `words:` frontmatter is schema-typed as demonstration content and is explicitly forbidden from doubling as a Practice Set (`CONTENT_MODEL.md` §4). A new, separate data source is required (§H).
- No `group`/`base`/`context`/`contrasts`/`role` metadata exists anywhere in the content schema.
- Homophones/Commonly Confused Words have no authored contextual sentences beyond their existing (non-blank, non-contrastive) demonstration prose examples.

**Practice-engine gaps**
- No session-selection logic (bank → subset) exists; every current launch site encodes its entire word list.
- No mechanism to bias audio playback order (sentence-before-word vs. word-before-sentence) per item or per session; today it's always word-then-sentence, fixed.
- No morphology-aware prompt shape (e.g., showing/asking a base→derived pair) — `SpellingWord` has no `base` field.

**UI gaps**
- `src/pages/skills/[slug].astro` has no practice CTA, no session-start affordance, and (per §0) is architecturally forbidden from having one today.
- `WordListPreview` is read-only; no component currently turns a word list into an "encode + navigate to /play" action *except* the inline `<script>` embedded directly in `GradeUnitWorldPage.astro` (not extracted into a reusable component).

**Content gaps**
- The specific corrections examined in §F (mostly: none needed) and the not-yet-authored contextual sentences for Homophones/Commonly Confused Words (§G).

---

## C. Recommended architecture

```
Skill definition (existing: src/content/spelling-lists/**/*.md, contentRole: skill)
        │
        ▼
Canonical practice bank (NEW: src/lib/content/skillPractice/banks/<skillId>.ts)
        │  PracticeItem[] — see type below
        ▼
Session selection (NEW: pure fn, src/lib/content/skillPractice/selectSession.ts)
        │  bank → SpellingWord[] subset, given a target size
        ▼
Practice route (EXISTING: encodeWordList + sessionStorage rich payload + /play)
        │  no changes to serialization; Skill CTA script mirrors GradeUnitWorldPage's inline script
        ▼
Practice engine (EXISTING: src/modules/spellingTest/*, src/modules/speech/*, compareWords)
        │  no changes required for plain/grouped/morphology items;
        │  one small, additive change for context items — see §G
```

### C1. Data model

Do **not** adopt the research report's proposed union verbatim without simplification — but it is close to right. Recommended minimal type, colocated with the bank registry:

```ts
// src/lib/content/skillPractice/types.ts

/** A single word to practice. A plain string is a complete, valid item — most
 *  phonics Skills need nothing else. Richer fields are opt-in per item, not
 *  a schema every Skill must fill in. */
export type PracticeItem =
  | string
  | {
      word: string;
      /** Subgroup label for balanced session selection and optional display,
       *  e.g. "ck" | "floss" | "tch" | "dge", or "sub" | "super" for a prefix
       *  family. Not used for grading. */
      group?: string;
      /** The unsuffixed/unprefixed base this item derives from, e.g.
       *  "carry" for "carrying", "hope" for "hopeful". Required wherever a
       *  Skill's instructional value depends on the base→derived relationship
       *  (see §D "morphology-aware"). */
      base?: string;
      /** Whether this item demonstrates the Skill's rule (default) or is a
       *  deliberate non-example/contrast the rule does NOT apply to, e.g.
       *  "carrying" inside Spelling Rules for Adding Suffixes. Session
       *  selection and any future explanatory UI can use this to avoid
       *  presenting a contrast as if it were a positive example. */
      role?: 'target' | 'contrast';
      /** A sentence with the target word's sound embedded naturally (no
       *  blank placeholder needed — see §G). Required for every item in
       *  Homophones and Commonly Confused Words; optional elsewhere as a
       *  per-Skill override of the global sentence bank. */
      context?: string;
      /** Other correctly-spelled words this item is commonly confused with,
       *  for authoring/QA cross-checks (e.g. uniqueness validation in §I) —
       *  not surfaced to the student and not used by evaluation. */
      contrasts?: string[];
    };

export interface SkillPracticeBank {
  /** Must equal a `CURATED_SPELLING_SKILL_IDS` entry from spellingSkills.ts. */
  skillId: string;
  items: PracticeItem[];
}
```

Rejected from the research's proposal: nothing — the union is already minimal. The only change is making the intent of each field explicit above and tying `skillId` to the existing id registry rather than inventing a parallel one.

### C2. Storage (see §H for full comparison)

`src/lib/content/skillPractice/banks/<skillId>.ts` — one small TS module per Skill, each exporting a single `SkillPracticeBank` (or, for the ~29 plain-string Skills, just `export const items: PracticeItem[] = [...]` with the wrapper applied by a registry). A barrel `src/lib/content/skillPractice/index.ts` exports `getPracticeBank(skillId): SkillPracticeBank | undefined` and `getAllPracticeBanks(): SkillPracticeBank[]`, mirroring the existing `getCanonicalSkillRouteById` / `getCanonicalSkillRoutes` pattern in `canonicalSkillRoutes.ts` — same shape, same file neighborhood, same test style.

### C3. Session selection

```ts
// src/lib/content/skillPractice/selectSession.ts
export function selectPracticeSession(
  bank: PracticeItem[],
  opts: { size?: number; rng?: () => number } = {},
): PracticeItem[]
```

Default behavior (see §E for the product reasoning): shuffle the full bank with the existing `shuffleWords` (`src/modules/spellingTest/order.ts` — already a pure, RNG-injectable Fisher-Yates; reuse, don't reimplement) and take the first `size` items, where `size` defaults to the full bank for banks ≤ ~18 items and to a fixed cap (e.g. 16) for larger ones. This is a placeholder-simple v1; do not build subgroup-balanced or difficulty-tiered selection now (§K Phase list; explicitly out of scope per the task's constraints against speculative features).

### C4. Route and CTA

No new route. Extract the inline "encode + sessionStorage + navigate" logic currently duplicated only in `GradeUnitWorldPage.astro`'s `<script>` into a small shared client-side helper (e.g. `src/lib/words/startPractice.ts`, framework-free) so the Skill page's CTA script and the Grade Unit's CTA script call the same function instead of two independent copies. This is a light refactor opportunity, not a requirement — flag it as an option in §L rather than mandating it if the implementer prefers to keep the existing duplication pattern.

### C5. Practice engine

No changes required to `stateMachine.ts`, `compareWords.ts`, `order.ts`, or `speech/`. The one additive change (§G) is in `play.astro`'s init/render logic: when every word in a launched session carries a `context` sentence with no `sentenceOmissionReason`-style ambiguity, the sentence should be eligible to play *before or with equal weight to* the isolated word rather than strictly after it. This can be as small as a boolean carried through the rich sessionStorage payload (e.g. `{word, exampleSentence, contextFirst?: true}`) read by `renderQuestion()` — additive, backward compatible, does not touch the reducer or evaluation.

---

## D. Skill-category handling (all 41, each listed exactly once)

**Plain-word practice** (string[] sufficient; no metadata needed) — 19 Skills:
Short A Words, Short E Words, Short I Words, Short O Words, Short U Words, SH Digraph Words, CH Digraph Words, TH Digraph Words, WH Digraph Words, Beginning Blends, Ending Blends, Long A Silent E Words, Long I Silent E Words, Long O Silent E Words, AI and AY Words, EE and EA Words, OI and OY Words, OU and OW Words, AU and AW Words.

**Subgroup-aware practice** (`group` recommended for authoring balance/session variety; plain evaluation, no other structure) — 9 Skills:
CK, Double Letters, and TCH/DGE Word Endings (ck/floss/tch/dge); Silent Letters (wr/kn/mb); Soft C and Soft G; Long U Silent E Words (/yū/ vs /ū/); OA and OW Words (oa/ow, optional); IE and IGH Words (ie/igh, optional); OO Words (long/short); R-Controlled AR Words *(plain — no subgroup)*; **note:** AR is plain, so recount below.

Corrected list (9 Skills, subgroup metadata genuinely useful): CK/Double Letters/TCH/DGE; Silent Letters; Soft C and Soft G; Long U Silent E Words; OA and OW Words; IE and IGH Words; OO Words; R-Controlled OR Words *(plain, no subgroup needed — grouped with plain-word list above is also defensible; kept here only if editors want an AR/OR/mixed-review tag)*; R-Controlled ER, IR, and UR Words (er/ir/ur — required).

To avoid double-counting, the authoritative per-Skill assignment is the flat table below (each of the 41 appears exactly once):

| # | Skill | Category |
|---|---|---|
| 1 | Short A Words | Plain |
| 2 | Short E Words | Plain |
| 3 | Short I Words | Plain |
| 4 | Short O Words | Plain |
| 5 | Short U Words | Plain |
| 6 | SH Digraph Words | Plain |
| 7 | CH Digraph Words | Plain |
| 8 | TH Digraph Words | Plain |
| 9 | WH Digraph Words | Plain |
| 10 | Beginning Blends | Plain |
| 11 | Ending Blends | Plain |
| 12 | CK, Double Letters, and TCH/DGE Word Endings | Subgroup-aware (ck/floss/tch/dge) |
| 13 | Silent Letters | Subgroup-aware (wr/kn/mb) |
| 14 | Soft C and Soft G | Subgroup-aware (soft-c/soft-g) |
| 15 | Long A Silent E Words | Plain |
| 16 | Long I Silent E Words | Plain |
| 17 | Long O Silent E Words | Plain |
| 18 | Long U Silent E Words | Subgroup-aware (/yū//ū/) |
| 19 | AI and AY Words | Plain |
| 20 | EE and EA Words | Plain |
| 21 | OA and OW Words | Plain (subgroup optional, low value) |
| 22 | OI and OY Words | Plain |
| 23 | OU and OW Words | Plain |
| 24 | IE and IGH Words | Plain (subgroup optional, low value) |
| 25 | OO Words | Subgroup-aware (long/short) |
| 26 | AU and AW Words | Plain |
| 27 | R-Controlled AR Words | Plain |
| 28 | R-Controlled OR Words | Plain |
| 29 | R-Controlled ER, IR, and UR Words | Subgroup-aware (er/ir/ur) |
| 30 | Multisyllabic Words | Multisyllabic structured (§below) |
| 31 | Plural Words with -s and -es | Morphology-aware (base + -s/-es group) |
| 32 | Words Ending in -ed and -ing | Morphology-aware (base + ending) |
| 33 | Common Suffixes | Morphology-aware (base + suffix group) |
| 34 | Spelling Rules for Adding Suffixes | Morphology-aware (base + rule group + role) |
| 35 | Compound Words | Plain (component metadata optional, not required) |
| 36 | Contractions | Morphology-aware (source phrase as `base`) |
| 37 | Un- and Re- Prefixes | Morphology-aware (base + prefix group) |
| 38 | Common Prefixes | Morphology-aware (base/root + prefix group) |
| 39 | Greek and Latin Roots | Morphology-aware + structured families (root group + base) |
| 40 | Homophones | Context-dependent (mandatory `context`, `group`) |
| 41 | Commonly Confused Words | Context-dependent (mandatory `context`, `group`) |

**Multisyllabic Words** deserves its own bucket rather than folding into morphology-aware: its structure need is *syllable-type/chunk* information, not base→derived relationships. Recommend `group` carry a syllable-type tag (closed/open/VCe/vowel-team/r-controlled/consonant-le/compound) rather than inventing a new field — the existing `group` string is sufficient; no new type member needed.

---

## E. Skill-page UX recommendation

**CTA copy:** "Practice these words" (not "Start test" / "Take a quiz" — matches the site's existing "Practice these words again" / "Practice Your Own Words" vocabulary; avoids "test" framing CLAUDE.md's anti-gamification stance implicitly discourages, and avoids duplicating the exact "Start practice" wording `GradeUnitWorldPage.astro` already uses for a *different* thing (a Grade Unit's assigned Practice Set) — using different copy for the Skill CTA keeps the two entry points visually and semantically distinguishable to a parent who lands on both).

**Placement:** immediately after the existing "Hear the pattern in these words" demonstration section (`word-list-heading`, `[slug].astro` lines 230–237), as its own primary card — not folded into the demonstration preview itself (which per §0/Content-Model must remain read-only demonstration, conceptually distinct from the practice bank even after this change ships) and not only as a second CTA buried at the page bottom. A secondary, lighter-weight text link ("Practice these words →") in the existing "Where this fits in the curriculum" section is reasonable to keep alongside the Grade Unit links (a Grade Unit is still a legitimate, more scaffolded destination), but the primary path should not require scrolling past the full markdown body first.

**Display word count?** Yes — "Practice all {n} words" (or "Practice {size} of {n} words" once/if session selection subsets a large bank) mirrors the existing `WorldWordField` heading pattern ("The {n} words to practice in this step") and gives a parent the same at-a-glance sizing information Grade Units already provide.

**Immediate start vs. setup screen?** Immediate start, reusing `/play`'s existing begin screen (`screen-begin` in `play.astro`) as the only "are you ready" checkpoint — this is already the site's standard pattern (click "Start practice" → begin screen → "Start Practice" button) and CLAUDE.md's "no unnecessary setup" principle argues directly against adding a second, Skill-specific setup step.

**Full bank vs. subset?** Use the whole bank when it's small (roughly ≤ 18 words, matching most phonics Skills' recommended range) and a shuffled subset capped around 16 for the larger banks (Beginning Blends 24, CK/FLOSS/TCH/DGE 24, Multisyllabic Words up to 28, Common Prefixes 24, Greek and Latin Roots ~22) — see §C3. This is deliberately the simplest sensible v1; a difficulty/size selector is explicitly a "future/session-selection layer," per the task's own framing, not part of this pass.

**Repeat practice?** Reuse the existing results-screen "Practice these words again" flow unchanged (`btnRetry` in `play.astro`) for exact repeats. For a *different* subset on a repeat visit to the Skill page, no special handling is needed — clicking "Practice these words" again simply reselects a new shuffled subset from the same canonical bank, which is normal, expected behavior for a bank larger than one session and requires no new state (no progress tracking, no "seen words" memory — consistent with the "no accounts required" constraint).

---

## F. Existing content corrections

Direct inspection of the four flagged items against the actual repository content:

**`hopeful`** — `src/content/spelling-lists/grade-level/suffix-spelling-changes.md` (Spelling Rules for Adding Suffixes) already lists `hopeful` in its demonstration `words:` (line 33) **and its prose already uses it correctly**: "The *e* usually stays before a suffix beginning with a consonant: *hope + ful = hopeful* and *care + less = careless*" (line 64) — i.e. it is already presented as the no-change contrast, not a positive doubling/drop-e/y-change example. `common-suffixes.md` also already uses `hope + ful = hopeful` correctly in its `-ful` explanation table (line 57), though `hopeful` itself is not in that page's small demonstration `words:` list (`helpful, careless, kindness, enjoyment, faster, fastest`). **No content correction needed.** The only actionable item is a *data* one: when the Common Suffixes canonical practice bank is authored, include `hopeful` in its `-ful` group per the research's final inventory — that is bank authoring, not a fix to existing instructional content.

**`submarine`** — `src/content/spelling-lists/grade-level/common-prefixes.md` already includes `submarine` in its demonstration `words:` (line 32) and its prose explicitly anchors the sub-/super- contrast on it ("*Sub-* means 'under,' as in *submarine*... *Super-* means 'above'... as in *superstar*," line 62). **No correction needed; nothing in the current repository excludes it.** The research report's own account of a prior, external "candidate audit" that removed it does not correspond to anything in this codebase — flagging this so the implementer does not go looking for a removal to undo.

**`carrying`** — same file as `hopeful`, `suffix-spelling-changes.md` (line 35), and again already correctly framed: "Keep *y* before *-ing*: *carry → carrying*... These negative cases are part of the rule, not optional exceptions" (line 76) and reinforced in the FAQ ("Why is carrying spelled with y?... Final y normally stays before -ing," lines 26–28). **No content correction needed.** As with `hopeful`, the actionable item is purely for future bank authoring: tag it `role: 'contrast'` with `base: 'carry'` in the Spelling Rules for Adding Suffixes practice bank, exactly as the research's final inventory specifies.

**`farther`/`further` → `breath`/`breathe`** — `src/content/spelling-lists/grade-level/commonly-confused-words.md`'s current demonstration `words:` are `affect, effect, principal, principle, advice, advise, than, then`. **`farther`/`further` is not present in the current Skill content at all** — there is nothing to remove. This is purely a canonical-bank *authoring* decision (use `breath`/`breathe` rather than `farther`/`further` when the 12-set Commonly Confused Words bank is written), not a correction to shipped content.

**Net finding for Investigation 7:** the current Skill-page prose is already accurate on all four points the research raised. No `.md` content edits are required by this pass. The "corrections" the research describes apply exclusively to the *not-yet-existing* canonical practice banks this plan proposes building — which is good news for scope (§K Phase 5 shrinks to "author the bank correctly the first time," not "fix and re-author").

No other genuine contradictions between the validated inventories and current Skill content were found in the files inspected (`common-prefixes.md`, `common-suffixes.md`, `suffix-spelling-changes.md`, `commonly-confused-words.md`, `homophones.md`, `greek-and-latin-roots.md`). One item worth the implementer's attention, not a contradiction: `greek-and-latin-roots.md`'s current demonstration set includes the *derived* forms `national` and `critical` but not their bases `nation` and `critic` — consistent with the research's recommendation to add the bases to the canonical bank (not a correction, an addition).

---

## G. Context-sentence dependency

**Can the existing engine support sentence-context spelling?** Substantially yes, with one small additive change, not a new practice mode:

- The rich sessionStorage payload (`sw:words:<payload>` → `{word, exampleSentence}[]`) already lets any practice launch supply an arbitrary sentence per word, bypassing the global `sentenceBank` lookup entirely. Building Skill-launch words this way — `context` from the practice item mapped directly to `exampleSentence` — requires zero changes to `play.astro`'s decode/render path.
- `compareWords`-based evaluation is already word-only and requires no change: the student is always asked to spell one target word; the sentence is disambiguating audio context, not part of the graded answer.
- The UI already has a sentence-audio affordance ("Hear sentence again"), an auto-play-after-word behavior, and a "no sentence available" fallback state — all reusable as-is.

**What genuinely needs to change:**
1. **Playback order/emphasis.** Today the isolated word is always spoken first, automatically, with the sentence following ~1s later as a secondary reinforcement. For a homophone or commonly-confused pair, the isolated word alone is often insufficient (TTS pronounces `their`/`there`/`they're` identically) — the *sentence* is what actually identifies the target spelling, so it needs to be at least equally prominent, and arguably should play first or immediately, not as an afterthought. Recommend a small additive per-word or per-session flag (e.g. `contextFirst?: boolean` on the rich payload entry) that flips the existing word→sentence order to sentence→word for these two Skills specifically. This is a `play.astro` `renderQuestion()` change only — no reducer, no evaluation, no new screen.
2. **Copy.** The static instruction line ("Listen, then type the word.") should read differently for a context item — something like "Listen to the sentence, then spell the missing word." This is a one-line conditional in `renderQuestion()`, not a new component.
3. **Authored sentences.** Every Homophones/Commonly Confused Words practice item needs a hand-authored `context` sentence in which exactly one of the set's spellings is semantically valid — this is real content work, not implementation work, and the research explicitly defers it ("Do NOT author the full sentence bank during this task").

**Should the student hear the sentence, see it, or both?** Hear only, consistent with the whole product's audio-first, no-reading-crutch design (the practice input is always typed-from-audio; showing the sentence as text would let a strong reader skip the actual spelling-from-context skill being tested, and nothing else in the app currently shows dictation text on-screen before submission).

**Blank/target representation?** None needed. The sentence is spoken with the target word embedded normally (e.g. "The students put **their** books on the table," spoken in full) rather than with an artificial pause or beep — this matches how real classroom homophone dictation works (say the word, say it in a sentence, say the word again) and avoids inventing new TTS/audio infrastructure for a synthesized blank.

**Can Homophones/Commonly Confused Words share the normal `/play` route?** Yes, per the above — same route, same reducer, same evaluation; the only delta is the audio-order/copy tweak in `renderQuestion()`.

**Should these two be deferred?** **Yes, explicitly, until their sentence banks are authored.** They are structurally ready to implement (§C2–C5 apply to them exactly like every other Skill) but functionally worthless without correct, disambiguating sentences — a Homophones session with `context` sentences that don't actually disambiguate is *worse* than no feature (silently teaches nothing, or teaches ambiguously). Recommend these two ship in a later phase than the other 39 (§K).

---

## H. Inventory-storage recommendation

Three plausible options, evaluated against this repo's existing conventions:

1. **Colocate in Skill frontmatter `words:`.** Rejected. `CONTENT_MODEL.md` §3/§4 defines that field as demonstration content and explicitly forbids it from doubling as a Practice Set; the zod union (`z.union([z.string(), z.object({word, hint?, phonicsPattern?})])`) also has no room for `group`/`base`/`context`/`contrasts`/`role` without a schema change that would affect every non-Skill list entry too (Grade Units, HFW sets, theme lists all share this collection and schema).
2. **A parallel Astro Content Collection** (e.g. `skill-practice-banks` with its own schema). Rejected as heavier than needed: Astro collections are for user-facing renderable content with frontmatter/markdown bodies; a practice bank is pure structured data with no prose body, no independent route, and benefits from being a plain TypeScript module that Vitest can import directly in `node` environment tests (matching how `canonicalSkillRoutes.ts`, `spellingSkills.ts`, and every `*SkillFamily.ts` file already work) rather than going through Astro's content-collection loader.
3. **Dedicated TS module(s) under `src/lib/content/skillPractice/`** (recommended, §C2). One file per Skill (`banks/<skillId>.ts`), a typed registry/barrel (`index.ts`), colocated Vitest tests. **Recommended** because: it matches the exact existing pattern for `canonicalSkillRoutes.ts` (id-keyed manifest with a barrel API) and the `*SkillFamily.ts` files (per-family/per-concern TS modules with colocated tests) that already govern this taxonomy; it keeps banks framework-free and directly unit-testable per CLAUDE.md's stated architecture ("pure functions... framework-free... colocated tests"); it gives one unambiguous answer to "what is the canonical practice bank for Skill X" (`getPracticeBank('short-a-words')`); and it cleanly avoids ever duplicating a bank into Grade Unit data, page components, or a second grade-specific copy, since Grade Units and the Skill page both import from the same single module if a Grade Unit ever wants Skill-bank words (not recommended today, but structurally cheap later).

---

## I. Test plan

**Should add:**
- `skillPracticeBanks.test.ts` (mirrors `canonicalSkillRoutes.test.ts`'s style): every one of the 41 `CURATED_SPELLING_SKILL_IDS` has exactly one registered bank; no id appears twice; no bank references an id outside the 41 (no orphans); every bank has ≥1 item.
- Per-bank word integrity: no duplicate word within a single bank (case/accent-normalized via the existing `comparisonKey`/`normalizeWord` utilities, not a fresh string check); every plain-string item and every object item's `word` is non-empty after `normalizeWord`.
- Subgroup validation for the 9 subgroup-aware Skills (§D): every item in those specific banks has a `group` from that Skill's known/expected set (a small allow-list per Skill, not a global enum).
- Morphology-required-metadata validation for the morphology-aware Skills (§D): every item is a rich object (not a bare string) and has a non-empty `base`; for Spelling Rules for Adding Suffixes specifically, every item has a `role` and any `role: 'contrast'` item does not also appear as a positive example elsewhere in the same bank.
- Context-required validation for Homophones and Commonly Confused Words: every item is a rich object with a non-empty `context`, and every `word` within one `group` is unique (no set accidentally lists the same spelling twice) — this test should **fail loudly** if these two banks ship with placeholder/missing sentences, since §G establishes that shipping without real sentences is actively harmful.
- Canonical-Skill-count regression: `expect(getAllPracticeBanks().length).toBe(41)` alongside the existing `canonicalSkillRoutes.test.ts` count assertion, so the two can't silently drift apart.
- No grade-specific duplication: assert no bank id matches a pattern implying grade-scoping (e.g. no `short-a-words-grade-1` sneaking in) — a cheap regression guard for the "no grade-specific inventories" principle, not a deep architectural test.
- No accidental demonstration/practice conflation: assert that a Skill's practice bank is not byte-identical to (or a subset check against) its Markdown frontmatter `words:` demonstration list — guards against a future editor "saving time" by copy-pasting the tiny demo set in as the whole bank, which would silently violate the core "these are separate concepts" principle this whole plan is built on.
- Existing-functionality regression: no changes needed to `spellingTest`, `words`, or `speech` test suites, but the `play.astro`/session-storage rich-payload path deserves a smoke-level integration check if one doesn't already exist (confirm decode still degrades cleanly with sessionStorage cleared).

**Should NOT add** (brittle / over-prescriptive):
- Exact word-count assertions per bank (`expect(bank.length).toBe(18)`) — locks editorial content to a specific number for no safety reason; a range check (`toBeGreaterThanOrEqual(...)`) if any check is wanted at all is preferable, and per the research report's own framing, ranges are guidance, not quotas.
- Word-identity assertions per bank (`expect(bank).toContain('cat')`) — turns ordinary editorial revision into a required test-file diff; the structural tests above (dedup, metadata-required-where-relevant) protect what actually matters.
- Cross-Skill "no word reuse" assertions — explicitly wrong per both the research report and this plan's constraints; overlap (`fish` in both Short I and SH) is intentional.
- Snapshot tests of rendered Skill-page HTML for the new CTA — brittle against copy/design iteration; a targeted assertion that the CTA element exists and encodes the right word count is enough, if any Astro-page-level test is added at all (no existing precedent for testing `.astro` page output directly in this repo's suite; most coverage is at the `lib`/`modules` layer).

---

## J. Documentation plan

Documents affected, with each item marked against whether it touches a currently-frozen normative section:

- **`docs/architecture/CONTENT_MODEL.md` §3, §4** — **frozen, normative, requires explicit amendment before implementation** (§0). Needs: a Skill's demonstration and its practice bank formally declared as two separate content identities (not "a Skill's `words`" doing double duty); the sentence "a Skill does not launch the practice experience directly" needs to become "a Skill launches practice from its own canonical practice bank, distinct from its demonstration words" (exact wording is a human/editorial decision, not this report's to make).
- **`docs/architecture/SKILLS_MODEL.md` §15** — **frozen-adjacent** (not superseded by `SKILLS_ARCHITECTURE.md`, still governs per that document's own text) — same contradiction, same amendment need: "it does not launch a practice session of its own" must be corrected or the section flagged superseded by a new document, the same way `SKILLS_ARCHITECTURE.md` superseded §7/§8/§10.
- **`docs/architecture/SKILLS_ARCHITECTURE.md`** — not frozen against *this* change (its scope is taxonomy/naming, not practice mechanics) but should gain a short note once implemented, since its "Where this fits in the curriculum" description of the Skill page (implicit throughout) will no longer be the page's *only* practice-adjacent element.
- **`docs/architecture/CONSTITUTION.md`** — worth a quick read-through by whoever approves the §0 amendment (not read in full during this pass) to confirm nothing at that top precedence level also encodes the "Skills don't launch practice" rule; if it does, that citation supersedes `CONTENT_MODEL.md`/`SKILLS_MODEL.md` and must be amended too.
- **New, non-frozen implementation doc** (e.g. `docs/content/CANONICAL_SKILL_PRACTICE_BANK_STANDARD.md`, matching the naming convention of `docs/content/CANONICAL_HIGH_FREQUENCY_WORD_SET_PAGE_STANDARD.md` and `docs/content/CANONICAL_THEMED_SPELLING_PRACTICE_PAGE_STANDARD.md` already in the repo) — the right home for: grade-independence of practice banks, bank-size-vs-session-size distinction, the `PracticeItem` type and when each field is required per §D's category table, and the context-Skill deferral from §G. This is where the bulk of new documentation belongs, since it's genuinely new implementation guidance rather than a change to an existing frozen decision.
- **`CLAUDE.md`** — minor addition once implemented: a one-line pointer to `src/lib/content/skillPractice/` alongside the existing `src/lib/words/` and `src/modules/spellingTest/` entries in the directory-structure section, so future sessions discover it the same way they discover everything else.

---

## K. Implementation phases

1. **Data model + registry scaffolding.** Add `src/lib/content/skillPractice/types.ts`, `selectSession.ts`, `index.ts`, and an empty/placeholder registry; add the `skillPracticeBanks.test.ts` structural tests from §I (they should fail until banks are populated — useful as a checklist). No content authored yet, no UI changed yet.
2. **Author and land the 19 plain-word banks + the 9 subgroup-aware banks** (§D categories 1–2, 28 Skills total) using the research report's final corrected inventories as the editorial source, since those are explicitly "ready to freeze after listed corrections" per the research's own conclusion and this plan's §F confirms no repository contradictions block them.
3. **Skill-page CTA + practice launch**, scoped to the 28 Skills from Phase 2 only (`getPracticeBank(skillId)` returns `undefined` for the other 13 until their phases land — the CTA simply doesn't render for a Skill with no bank yet, which is a safe, additive rollout condition, not a special case to build). This phase is where the `CONTENT_MODEL.md`/`SKILLS_MODEL.md` amendment from §0/§J must already be approved and merged — do not build the CTA before that approval exists.
4. **Author and land the morphology-aware banks + Multisyllabic Words** (§D categories 3–4, 11 Skills: Plurals, -ed/-ing, Common Suffixes, Spelling Rules for Adding Suffixes, Compound Words, Contractions, Un-/Re- Prefixes, Common Prefixes, Greek and Latin Roots, Multisyllabic Words). CTA now renders for these automatically via the same Phase-3 mechanism.
5. **Author the Homophones and Commonly Confused Words sentence banks**, explicitly the last content phase per §G's deferral recommendation, plus any `contextFirst`/copy changes to `play.astro`'s `renderQuestion()` from §G. CTA renders for these last two Skills only once this phase lands.
6. **Documentation + verification pass**: update the docs from §J that weren't already touched by the §0 amendment in Phase 3, confirm `getAllPracticeBanks().length === 41`, run the full existing test suite plus the new bank tests, and do a manual pass through a handful of Skill pages across all five categories in a browser (per CLAUDE.md's UI-testing guidance) to confirm audio, evaluation, and results screens all behave correctly for a real Skill-launched session, not just a Grade-Unit-launched one.

This sequencing was chosen over the task prompt's example ordering because content authoring (research-validated, low-risk) can safely precede the CTA-and-engine work, and because the one genuinely risky step — the frozen-document amendment — is placed as a hard gate immediately before the first UI change, not buried later.

---

## L. Files likely to change

**New:**
- `src/lib/content/skillPractice/types.ts`
- `src/lib/content/skillPractice/selectSession.ts`
- `src/lib/content/skillPractice/index.ts`
- `src/lib/content/skillPractice/banks/<skillId>.ts` × 41
- `src/lib/content/skillPractice/skillPracticeBanks.test.ts` (+ any per-category test files if the implementer prefers splitting them, matching the existing `*SkillFamily.test.ts` granularity)
- Optionally `src/lib/words/startPractice.ts` (shared encode+launch helper — §C4, optional refactor)
- `docs/content/CANONICAL_SKILL_PRACTICE_BANK_STANDARD.md` (or similar name)

**Modified:**
- `src/pages/skills/[slug].astro` — new CTA section + inline launch script (or import of the shared helper)
- `src/pages/play.astro` — `renderQuestion()` context-first/copy handling for Homophones/Commonly Confused Words only (Phase 5)
- `docs/architecture/CONTENT_MODEL.md` §3, §4 — amendment (Phase 3 gate, §0/§J)
- `docs/architecture/SKILLS_MODEL.md` §15 — amendment or supersession note (Phase 3 gate, §0/§J)
- `CLAUDE.md` — directory-structure pointer (Phase 6)

**Not expected to change:** `src/modules/spellingTest/*`, `src/modules/speech/*`, `src/lib/words/compareWords.ts`, `src/lib/words/serialization.ts`, `src/content/config.ts` (schema), any existing `.md` Skill content files (§F), `GradeUnitWorldPage.astro` (unless the optional §C4 refactor is taken).

---

## M. Risks / unresolved decisions

1. **The §0 contradiction is the real blocker, not an implementation detail.** A human must explicitly decide to amend `CONTENT_MODEL.md`/`SKILLS_MODEL.md` (or explicitly decide not to build direct Skill-page practice at all, contradicting this task's stated primary goal). This report cannot resolve that on its own authority — it's exactly the kind of decision the task instructed be flagged rather than silently made.
2. **`CONSTITUTION.md` was not read in full during this pass** (out of scope for the investigation budget) — if it independently encodes the "Skills route to Grade Units, don't launch practice" rule at the highest precedence level, that supersedes both documents cited in §0/§J and must be included in the same amendment.
3. **Session-selection algorithm is deliberately left simple** (plain shuffle-and-cap, §C3/§E). If product wants subgroup-balanced selection (e.g. guarantee at least one item from each of ck/floss/tch/dge per session) from day one rather than as a later enhancement, that's a small but real scope increase to Phase 3, not Phase-1 data work — worth confirming before Phase 3 starts.
4. **The `contextFirst` flag's exact mechanism (§G) is sketched, not fully specified** — whether it belongs on the rich sessionStorage payload, as a URL param, or as a small session-level config object is an implementation-time call with no strong architectural preference; flagged here only so it isn't rediscovered as an open question mid-Phase-5.
5. **Multisyllabic Words' `group` values (syllable-type tags) aren't validated against a fixed enum in the type system** (§C1, §D) — deliberately, to avoid over-specifying a field that's genuinely just an editorial label. If the implementer wants IDE-level safety here, a `MultisyllabicSyllableType` string-literal union is easy to add later without touching the shared `PracticeItem` type used by every other Skill.
6. **The optional `startPractice.ts` extraction (§C4/§L)** is a nice-to-have, not required — including it changes `GradeUnitWorldPage.astro`, which is otherwise untouched by this whole plan; the implementer should feel free to skip it and accept one more copy of the same ~15-line inline script if minimizing diff surface on unrelated files is preferred.

---

## N. Final recommendation

**READY TO IMPLEMENT WITH SPECIFIC DECISIONS.**

The word inventories, data model, storage location, session mechanics, and test/documentation plans above are ready to hand to an implementation pass as written. Two things must be resolved by a human first, not worked around:

1. **Approve (or reject) amending `CONTENT_MODEL.md` §3/§4 and `SKILLS_MODEL.md` §15** so that a Skill page launching its own practice session stops contradicting the frozen architecture (§0, §M-1). Everything in §C onward assumes approval.
2. **Confirm `docs/architecture/CONSTITUTION.md` doesn't independently restate the same "Skills don't launch practice" rule** at a higher precedence level than the two documents already identified (§M-2) — a five-minute read, not a re-investigation.

Once those two points are settled, Phases 1–2 of §K can start immediately with no further open questions; Phase 3 (the CTA itself) is correctly gated behind decision #1 above by construction, not by discipline.
