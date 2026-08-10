# Canonical Naming and Terminology Audit

**Status:** Research only. No terminology, URL, navigation, or content change is authorized by this
document. Any `CHANGE` recommendation below requires a separate, explicit implementation decision.
**Scope:** Sitewide public naming, terminology, and major URL conventions, produced ahead of
homepage research and implementation.
**Does not govern:** curriculum content, taxonomy membership, page layouts, or any frozen
architecture decision. Where this document touches a frozen standard, it reports conformance or
discrepancy — it does not amend the standard.

---

## 1. Executive summary

The site's naming system is, on the whole, **already well chosen**. The core architectural
vocabulary — Grade Hub, Grade-Strand Gateway, Core Spelling, High-Frequency Words, Themed Spelling
Practice, Skills, Skill Family — is internally coherent, was arrived at through multiple prior
research passes (`SKILLS_ARCHITECTURE.md`, `CANONICAL_*_STANDARD.md` documents), and does not need
restructuring.

This audit finds:

- **No URL changes are recommended anywhere on the site**, including `/skills`. The evidence bar
  for a URL migration was not met for any candidate examined.
- **One terminology CHANGE is recommended, and it is already in production**: the site does not
  use bare "Skills" as the Skills Hub's public-facing H1/title — it uses **"Spelling Practice by
  Skill"** — while keeping "Skills" as the short navigation label. This is the correct resolution
  to the "is 'Skills' too generic" question this audit was commissioned to answer, and it has
  already been implemented (`src/pages/skills/index.astro`). This audit's job for that question is
  to confirm the existing choice, not to propose it.
- **Two KEEP — CLARIFY IN COPY items**: "Core Spelling" and "Themed Spelling Practice" are sound
  labels but benefit from one-sentence explanatory framing the first time a first-time visitor
  (i.e., the homepage) encounters them, because neither is fully self-explanatory to a parent who
  has never seen the site's architecture.
- **One real, already-flagged architectural discrepancy, not proposed here for the first time**:
  `CANONICAL_THEMED_SPELLING_PRACTICE_PAGE_STANDARD.md` §10 already documents that member-page
  titles are converging on a `[Public grade label] [Theme] Spelling Words` convention and
  explicitly defers a sitewide reconciliation of how grade labels appear across Core, HFW, Themed,
  Grade Hubs, and Gateways. This audit surfaces it again because it is directly relevant to
  homepage grade-naming decisions, not because it is new.
- **The homepage currently in production is pre-Constitution** (`src/pages/index.astro`): it
  predates `docs/architecture/CONSTITUTION.md`'s three-journey model, uses "Ready-Made Lists" and
  "phonics skill" language that does not appear in any frozen standard, and does not name "Practice
  Your Own Words" anywhere in the UI. This is the expected state for a page about to be redesigned,
  not a defect this audit is flagging as urgent — but it means the current homepage should not be
  treated as evidence of settled terminology; the frozen docs and the *inner* pages (Grade Hubs,
  Gateways, Skills Hub, Skill pages) are.

Nothing in this audit recommends reopening the frozen no-Skill-Family-Gateway decision, the frozen
41-Skill/12-family taxonomy, or the frozen `/skills` flat URL structure.

---

## 2. Scope and authorities

Documentation precedence for this audit followed `CONSTITUTION.md` §17:

1. `docs/architecture/CONSTITUTION.md`
2. `docs/architecture/CONTENT_MODEL.md`
3. `docs/architecture/SKILLS_ARCHITECTURE.md` (supersedes `SKILLS_MODEL.md` §7/§8/§10)
4. `docs/architecture/PUBLIC_URL_ARCHITECTURE.md`
5. The five frozen `docs/content/CANONICAL_*_STANDARD.md` page-family standards (Skills Hub, Grade
   Hub, Grade-Strand Gateway, Skill Page, High-Frequency Word Set, Themed Spelling Practice)
6. Production source: `src/pages/`, `src/components/`, `src/lib/content/gradeConfig.ts`,
   `src/lib/content/canonicalGradeRoutes.ts`, `src/lib/content/canonicalSkillRoutes.ts`,
   `src/lib/content/spellingSkills.ts`
7. Older/legacy docs (`SITE_ARCHITECTURE.md`, `HOMEPAGE_SPEC.md`, `GRADE_LEVEL_STRATEGY.md`,
   `LIST_ARCHITECTURE.md`) — read as historical context per the Constitution's own archival note,
   not as current authority where they conflict with the Constitution.

External research used general web search (see §10) with no keyword-volume tool access. All
search-intent statements below are labeled as qualitative/observed, never as measured demand,
per the task's evidence-discipline requirement.

---

## 3. Repository terminology inventory

### 3.1 Frozen architectural vocabulary (internal + partially public)

| Term | Where defined | Public-facing? |
|---|---|---|
| Grade Hub | `CONSTITUTION.md`, `CANONICAL_GRADE_HUB_STANDARD.md` | No — internal name for `/{grade}` |
| Grade-Strand Gateway | `CONSTITUTION.md` §5.3, §11 | No — internal name for `/{grade}/core-spelling` etc. |
| Core Spelling | `PUBLIC_URL_ARCHITECTURE.md` §"Section policy" | **Yes** — visible strand name and route segment |
| High-Frequency Words | same | **Yes** |
| Themed Spelling Practice | same | **Yes** |
| Skill / Skill Family | `SKILLS_ARCHITECTURE.md` | **Yes**, as "Skills" (nav) / family titles (Hub) |
| Skills Hub | `CANONICAL_SKILLS_HUB_STANDARD.md` | No — internal name for `/skills` |
| Grade Roadmap | `CONTENT_MODEL.md` §3 | No — conceptual, not a public label |
| Practice Set | `CONTENT_MODEL.md` §4 | No — internal; never surfaced as a noun to users |
| Vocabulary or Theme List | `CONTENT_MODEL.md` §3 | No — internal name; public name is "Themed Spelling Practice" |
| Collection | `CONTENT_MODEL.md` §3 | No — not implemented publicly (Dolch collections removed, see `PUBLIC_URL_ARCHITECTURE.md`) |
| Teaching Guide | `CONTENT_MODEL.md` §3 | No — not yet implemented in production |

### 3.2 Public-facing usage as actually shipped (verified against `src/`, not documentation)

| Surface | Live text | Source |
|---|---|---|
| Header/footer nav | **"Grades"**, **"Skills"**, **"How it Works"** | `SiteHeader.astro`, `SiteFooter.astro` |
| Homepage category card (grade-first→skill-first) | **"Practice by Skill"** | `index.astro:50` |
| Skills Hub `<title>` / H1 / breadcrumb leaf | **"Spelling Practice by Skill"** / **"Skills"** (breadcrumb) | `skills/index.astro:42,56,70,23` |
| Grade Hub H1 / `<title>` | **"{grade label} Spelling Words"**, e.g. "1st Grade Spelling Words" | `[gradeSlug].astro:62,77` |
| Grade label (`gradeConfig.label`) | `Kindergarten`, `1st Grade`, `2nd Grade`, … `5th Grade` | `gradeConfig.ts` |
| Grade short label (grid tiles) | `Kindergarten`, `Grade 1`, `Grade 2`, … `Grade 5` | `gradeConfig.ts` |
| Grade-Strand Gateway H1 | `{grade label} {strand label}` per `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §6, using `gradeConfig.label` (`1st Grade`, not `First Grade`) | frozen standard |
| Themed member title (target convention) | `[grade label] [Theme] Spelling Words`, e.g. "1st Grade Weather Spelling Words" | `CANONICAL_THEMED_SPELLING_PRACTICE_PAGE_STANDARD.md` §10 |
| HFW terminology exclusions (enforced) | *sight words*, *Heart Words*, *common words* explicitly forbidden in production HFW/Gateway copy | `CANONICAL_HIGH_FREQUENCY_WORD_SET_PAGE_STANDARD.md` §1; gateway standard §3 |

**Finding:** navigation label, H1/title, and breadcrumb text for the Skills system *already
differ by design* — "Skills" in the 3-word nav bar, "Spelling Practice by Skill" as the fuller
page title/H1, "Skills" as the breadcrumb leaf. This is exactly the layered-terminology pattern
§6 of the task brief asks this audit to evaluate, and it is already correctly implemented, not a
gap to fill.

### 3.3 Legacy / superseded terms confirmed absent from production

Grepped across `src/` for `sight word`, `Heart Word`, `common words` (case-insensitive): every
match is either (a) a test file asserting the term's *absence* (obsolete-terminology exclusion
tests, e.g. `kindergartenHfwSets2To4Editorial.test.ts`) or (b) explicitly named and forbidden in a
frozen standard. **No live page currently uses this terminology.** This is a clean result, not a
discrepancy — the earlier HFW terminology decision (documented in the frozen HFW standard) has
been fully executed in code, and this audit found no drift to report.

### 3.4 Grade-naming usage confirmed

`gradeConfig.ts` defines exactly two grade-label forms in production, each scoped to a specific
context:

- **`label`** (`Kindergarten`, `1st Grade`, `2nd Grade`, …): used in H1s, breadcrumbs, and
  Gateway/Hub titles.
- **`shortLabel`** (`Kindergarten`, `Grade 1`, `Grade 2`, …): used only on the homepage grid tiles
  (`index.astro:42`) as a compact eyebrow/count label, not as a heading.

Neither `First Grade` nor a bare ordinal (`Grade 1` as an H1) appears anywhere as a page heading.
`Grade 1`/`Grade 2` do appear as **prose references** inside curriculum documents
(`docs/curriculum/*`, some content-file frontmatter) — this is internal/documentation register, not
public copy, and is a harmless, expected register difference (§21).

---

## 4. Public vs. internal terminology — layering assessment

The task brief asks whether navigation label, H1, body copy, and URL must match. They already
legitimately do not, and the divergence is deliberate and defensible:

| Layer | Skills example | Grade example | Assessment |
|---|---|---|---|
| Internal architecture | "Skills Hub", "Grade Hub", "Grade-Strand Gateway" | same | **INTERNAL ONLY** — correctly never surfaced |
| Navigation label | "Skills" | "Grades" | Short, scannable, correct for a 3-item nav bar |
| Page H1/title | "Spelling Practice by Skill" | "{grade} Spelling Words" | Fuller, self-explanatory, correct for a landing page a user may arrive at directly from search |
| Body copy | "browse by skill... spelling concept your child needs" (`skills/index.astro:73`) | grade-appropriate orientation prose (Hub standard §3) | Natural language, not a rigid label |
| URL | `/skills` | `/1st-grade` | Short, stable, no redundant "spelling-" prefix |

This layering is coherent and should be treated as the **template** for how the homepage should
talk about these same systems: a short nav word, a fuller descriptive H1/intro sentence, and an
unchanged URL. No unification across layers is recommended.

---

## 5. Skills terminology deep dive

### 5.1 The question as posed

Is bare "Skills" — as used in the 3-word primary nav — the right choice, given the library spans
sound-spelling correspondences, orthographic conventions, morphology, roots, and meaning-based
homophone/confusable distinctions, not just phonics patterns?

### 5.2 Candidates evaluated

| Candidate | Breadth (covers morphology/meaning, not just phonics) | Parent comprehension | Teacher familiarity | Naturalness | Nav brevity | Verdict |
|---|---|---|---|---|---|---|
| **Skills** (bare, nav only) | Yes — "skill" is a superset term; doesn't imply phonics-only | High | High ("skills-based instruction" is common teacher vocabulary) | High | Excellent (1 word) | Correct for nav |
| **Spelling Skills** | Yes | High | High | High | Good (2 words) | Viable alternative for nav; not clearly better than bare "Skills" given domain context (§5.4) |
| **Spelling Patterns** | **No** — see §5.5 | Medium | Medium | High | Good | Rejected as the umbrella term |
| **Spelling Skills & Patterns** | Yes, but redundant-sounding | Medium (compound labels read as hedged) | Medium | Low — feels like an internal taxonomy label leaking into UI | Poor (4 words, ampersand) | Rejected |
| **Practice by Skill** | Yes | High | High | High | N/A for nav (verb phrase, works for a card label) | Already correctly used as the *homepage card* label, not the nav label — see §5.6 |

### 5.3 Is "Skills" too narrow for the 41-page library?

No. "Skill" in ordinary parent/teacher usage is not phonics-specific — "reading skills," "study
skills," "life skills," and "spelling skills" are all standard constructions, and none implies
sound-pattern-only content. The library's morphology (Prefixes, Word Building and Endings, Greek
and Latin Roots) and meaning-based content (Homophones and Commonly Confused Words) fit
comfortably under "skill" in ordinary usage — a parent asked "does your child need to work on a
spelling skill?" would not assume the answer excludes suffixes or homophones. The site's own
Skills Hub standard (§4) independently arrived at the same conclusion when it required the Hub's
opening copy to use "spelling skill" or "spelling concept" rather than "sound or pattern," for
exactly this breadth reason — this audit's finding agrees with, and is corroborated by, that
already-frozen requirement.

### 5.4 Is bare "Skills" too generic outside site context?

Weak concern. The nav item sits directly under a wordmark reading "spellingwords" in every
rendering (`SiteHeader.astro`), and the domain itself (`spellingwords.app`) supplies the subject
before a visitor reaches the nav at all. In an isolated context (e.g., a bookmark labeled only
"Skills," a shared screenshot cropped to exclude the header) the term could be ambiguous — but that
scenario is rare relative to the ordinary browsing context, and the cost of "Spelling Skills" (one
more word in a three-item nav, permanently) is a real, continuous UX cost for a hypothetical,
occasional ambiguity. **KEEP.**

### 5.5 Is "Spelling Patterns" too narrow?

Yes, and this matters because it was one of the candidates the task brief specifically asked to be
tested rigorously. "Pattern" in ordinary and structured-literacy usage denotes a sound-spelling or
orthographic regularity (vowel teams, digraphs, silent e). It does not naturally describe:

- **Word Building and Endings** (plurals, -ed/-ing, compound words, contractions) — these are
  morphological operations, not patterns in the sound-spelling sense;
- **Prefixes** and **Greek and Latin Roots** — meaning-based word parts, not spelling patterns;
- **Homophones and Commonly Confused Words** — a meaning/usage distinction, not a pattern at all.

Using "Spelling Patterns" as the umbrella term would misdescribe roughly a third of the 12 families
(Word Building and Endings, Prefixes, Greek and Latin Roots, Homophones and Commonly Confused
Words — 4 of 12 families, 12 of 41 skills). This is exactly the scope problem the task brief
predicted and asked to be investigated; the investigation confirms it. "Spelling Patterns" would
be well suited as a *sub-label* for the phonics-pattern-based families specifically (Short Vowels
through R-Controlled Vowels), but not as the site-wide umbrella. **CHANGE not recommended; risk
confirmed, not adopted.**

### 5.6 "Practice by Skill" — assessment of current dual usage

The homepage card and the Skills Hub `<title>`/H1 both currently read as variants of "Practice by
Skill" / "Spelling Practice by Skill." This works well as a **verb-phrase card label** (it states
the action, "practice," matching the homepage's other card, which is grade-based practice) and as
a **full descriptive H1** (it is unambiguous to a visitor who lands directly on `/skills` from
search, with no nav context). It would work poorly as the *bare nav label* — too long for a
3-item top bar — which is exactly why nav uses "Skills" instead. **KEEP** both, distinguished by
layer, per §4.

### 5.7 Conclusion

**Decision: KEEP.** Nav = "Skills." Full title/H1 = "Spelling Practice by Skill" (already shipped).
Family-level "Spelling Patterns" language remains fine as descriptive prose for pattern-based
families specifically, never as the site-wide umbrella term. No change needed anywhere in this
layer.

---

## 6. Core Spelling audit

"Core Spelling" is the label for the main, sequential, systematic strand — the site's answer to
"what does a normal spelling curriculum look like at this grade."

### 6.1 Candidates evaluated

| Candidate | Communicates "main/recommended path" | Avoids unexplained jargon | Notes |
|---|---|---|---|
| **Core Spelling** (current) | Partial — "core" is common in general curriculum language ("core curriculum," "core subjects") but is not self-evidently "the main path" without context | Mostly | Needs one clarifying sentence on first exposure (Grade Hub already provides this per `CANONICAL_GRADE_HUB_STANDARD.md` §4: "Present Core as the main, systematic, recommended path") |
| Spelling Curriculum | Yes | Yes | Accurate but generic; would read redundantly next to "High-Frequency Words" and "Themed Spelling Practice," which are *also* curriculum |
| Grade-Level Spelling | Yes | Yes | Reasonable alternative; slightly duplicates what "grade" already establishes given it's nested one level under `/{grade}` |
| Spelling Lessons | No — "lessons" implies discrete instructional units, understates that this is the primary path vs. two peers | — | Rejected |
| Structured Spelling | No — imports "structured literacy" jargon a general parent audience does not reliably recognize | — | Rejected |

### 6.2 Assessment

"Core Spelling" is already doing real interpretive work correctly: it's short, it pairs cleanly
with "High-Frequency Words" and "Themed Spelling Practice" as three same-shaped two/three-word
strand names (a genuine information-architecture benefit — parallel construction across the three
strand names is itself a comprehension aid), and "core" is common enough in general parent/teacher
vocabulary (core curriculum, core subjects, core classes) that it does not require specialist
literacy knowledge to parse. Its one weakness — a first-time visitor doesn't automatically know
"core" means "the main, start-here path" — is already addressed by the frozen Grade Hub standard,
which requires exactly that explanation ("Tell the reader to begin with Core") at the point where
a reader first encounters it.

**Decision: KEEP — CLARIFY IN COPY** (already satisfied by `CANONICAL_GRADE_HUB_STANDARD.md` §4;
this audit's job is to confirm that requirement is doing the right job, not to add a new one). The
homepage, when it introduces the grade-first journey, should carry forward the same one-line
clarification ("Core Spelling is the main, grade-by-grade path") rather than assuming the term is
self-explanatory in a zero-context homepage card.

---

## 7. High-Frequency Words audit

Per the task brief, this terminology has already received extensive curriculum research
(`CANONICAL_HIGH_FREQUENCY_WORD_SET_PAGE_STANDARD.md`, `CONSTITUTION.md` §5.5,
`FROZEN_HIGH_FREQUENCY_WORDS_CURRICULUM.md`) and is not reopened as an educational decision here.
This section validates the *public label* only.

### 7.1 Search/observed-usage landscape (qualitative, no volume data)

Contemporary structured-literacy sources (Reading Rockets, keys to literacy, Science-of-Reading
commentary reviewed in §10) show a live terminology shift: "sight word" is increasingly treated as
a *cognitive state* (any word instantly recognized, regular or not), not a category of word, and is
being replaced in curricular writing by "high-frequency word" combined with a
regular/irregular ("Flash Words"/"Heart Words") sub-distinction. This matches, rather than
conflicts with, the site's own frozen decision: `CONSTITUTION.md` §5.5 already separates
"high-frequency" (frequency of occurrence) from "irregular" (spelling predictability) from "heart
word" (an instructional frame) as three distinct, non-synonymous concepts, and the HFW standard
already forbids "sight words" and "Heart Words" as the *strand name*. Current literature supports
that separation; it does not argue for reopening it.

### 7.2 Candidates evaluated

| Candidate | Verdict | Reasoning |
|---|---|---|
| **High-Frequency Words** (current) | **KEEP** | Accurate to the site's actual selection criterion (frequency, per `CONSTITUTION.md` §5.5: "frequency determines eligibility"); increasingly the professional/curricular standard term; already the frozen public strand name |
| Sight Words | Rejected (already) | Conflates frequency with automatic recognition; explicitly forbidden by the frozen HFW standard; also increasingly avoided in current structured-literacy writing per §7.1 |
| Common Words | Rejected (already) | Vaguer than "high-frequency," loses the specific frequency criterion; explicitly forbidden |
| High-Frequency Spelling Words | Not adopted | Marginal added clarity (site-wide context, plus the strand living under a spelling-specific domain, already establishes this is about spelling, not reading recognition) at the cost of a longer label breaking the three-strand parallel-construction pattern (§6.2) |
| Commonly Used Words | Not adopted | Softer/vaguer than "high-frequency," no comprehension advantage, loses the technical anchor that connects the site's copy to the (approved, frozen) frequency-vs-irregularity distinction |

### 7.3 Decision

**KEEP.** No change to "High-Frequency Words" anywhere — strand name, route segment, gateway
title, or Hub summary language. The homepage may reasonably add one clause of plain-language
support ("the words your child will see and use most often") the first time it names the strand,
matching the register already used in the Grade-Strand Gateway standard's own framing requirement
(§3, "State... that high-frequency describes how often a word is encountered or used").

---

## 8. Themed Spelling Practice audit

### 8.1 What these pages actually contain (verified against the frozen standard, not assumed)

Per `CANONICAL_THEMED_SPELLING_PRACTICE_PAGE_STANDARD.md` §1, §8: themed pages are spelling
practice organized around a recognizable topic (weather, animals, etc.) as a retrieval/organizing
frame — they are explicitly **not** vocabulary lessons, subject-matter instruction, or definitions.
§8 states this directly: "Theme context can identify or cue a target, but it cannot teach
vocabulary, anatomy, weather, science... Do not add trivia, definitions for each word... 'fun
facts'." The standard's own anti-pattern list (§14) exists specifically to prevent the page from
drifting into what a name like "Themed Vocabulary" would imply.

### 8.2 Candidates evaluated

| Candidate | Risk of implying vocabulary/comprehension content | Communicates optional/nonsequential role | Verdict |
|---|---|---|---|
| **Themed Spelling Practice** (current) | Low — "Practice" (not "Words" or "Vocabulary") keeps the spelling-practice framing explicit | Neutral — doesn't state optionality on its own, but no worse than alternatives | **KEEP** |
| Themed Spelling Words | Low-Medium | Neutral | Marginally weaker than current — "Words" alone, without "Practice," reads slightly more like a static list and less like an activity |
| Themed Word Lists | Medium | Neutral | Loses "spelling" entirely from the label — a real regression given §8's core concern (must not read as a vocabulary feature) |
| Spelling by Topic | Low | Neutral | Reasonable close alternative; no material benefit over current, and it breaks the parallel two/three-word construction with Core Spelling / High-Frequency Words (§6.2) |
| Topic Spelling Practice | Low | Neutral | Same meaning as current, reordered; no benefit, would require churn on 18 gateway pages + 27 member pages + all internal links for zero gain |
| Additional Spelling Practice | Low | **Higher** — "Additional" signals optional/supplementary more directly than "Themed" does | Interesting alternative for a *supporting sentence*, not the label itself — see §8.3 |
| Vocabulary-themed language ("Themed Vocabulary," etc.) | **High** | Neutral | Rejected outright — directly contradicts §8's core instructional-scope boundary |

### 8.3 Does the current name communicate optionality?

Not fully on its own — "Themed Spelling Practice" by itself doesn't obviously signal "optional and
non-sequential" the way, say, "Additional Spelling Practice" would. But this is already correctly
handled at the layer where it belongs: `CANONICAL_GRADE_HUB_STANDARD.md` §4 requires the Grade Hub
to state explicitly that Themed is "optional additional practice," and the Gateway standard §3
requires the gateway itself to "state plainly that the strand is optional and non-sequential."
**The label doesn't need to carry that job alone — body copy at both the Hub and Gateway layers
already carries it**, which is the correct division of labor per §4/§6 of this audit's own
framework (label = identity, body copy = nuance).

### 8.4 Decision

**KEEP — CLARIFY IN COPY** (already satisfied by the Hub/Gateway standards' existing "optional
additional practice" requirement). No rename. The homepage, if it names this strand at all in a
first pass, should use the same "optional, additional" framing rather than expecting the label
alone to communicate that.

---

## 9. Unit / Set / List / Skill terminology

The site legitimately uses different member-level nouns for different content types, and this
audit finds the differentiation useful rather than inconsistent:

| Strand | Member noun | Why it differs |
|---|---|---|
| Core Spelling | **Unit** ("Grade Unit") | Signals a discrete, sequential curriculum milestone — implies order |
| High-Frequency Words | **Set** | Signals a grouped batch of words with no internal pattern claim, cumulative across the grade (per HFW standard §3.F: "sets build cumulatively") |
| Themed Spelling Practice | **List** (implicit — "the eight Kindergarten... units," "themed lists," per Gateway standard §8) | Signals a nonsequential peer collection, not a progression |
| Skills | **Skill** | Signals a reusable, grade-independent concept, not a grouped word batch |

This differentiation is not accidental drift — it maps cleanly onto the actual behavioral
difference each content type has (sequential vs. cumulative vs. peer-nonsequential vs.
concept-not-word-batch), and a reader who internalizes "Unit implies order, Set implies grouping,
themed list implies free choice" gains real information from the noun choice alone. **Forcing a
single umbrella noun (e.g., calling everything a "Set") would destroy information the current
differentiation carries for free.** This audit recommends **no consolidation**.

One minor observation: "List" is used loosely both as the generic word for any of these (e.g. "the
spelling list" as a category-agnostic reference in older docs and the legacy `spelling-lists`
Astro content-collection name) and specifically for Themed member pages. This is a **stale/internal
naming residue**, not a public-facing problem — `spelling-lists` is the Astro collection folder
name (`src/content/spelling-lists/`), never surfaced to users, and the legacy `/spelling-lists`
*route* has already been fully removed per `PUBLIC_URL_ARCHITECTURE.md`. Classified in §21 as
**stale internal terminology, harmless.**

---

## 10. Grade naming audit

### 10.1 Current production behavior (already differentiated by context — see §3.4)

- **URL slugs:** `kindergarten`, `1st-grade`, `2nd-grade`, `3rd-grade`, `4th-grade`, `5th-grade`
- **H1/breadcrumb/title label:** `Kindergarten`, `1st Grade`, `2nd Grade`, `3rd Grade`, `4th Grade`,
  `5th Grade`
- **Homepage grid short label:** `Kindergarten`, `Grade 1`, `Grade 2`, `Grade 3`, `Grade 4`,
  `Grade 5`

### 10.2 Evaluation

`1st Grade` (ordinal-numeral form) rather than `First Grade` (spelled-out ordinal) or bare
`Grade 1` is the most common convention among U.S. parent-facing educational sites and matches how
parents commonly write and search the term casually ("1st grade spelling words"). This audit found
no evidence that `First Grade` outperforms `1st Grade` in parent comprehension or naturalness, and
no reason grounded in the repository or general knowledge of U.S. elementary-education
conventions to prefer it. `Grade 1` alone (bare ordinal, no "1st") reads more like an internal or
institutional register (report cards, gradebooks) than a warm parent-facing label — its current
confinement to the homepage's compact grid-tile eyebrow, where space is tightest and the fuller
grade name is redundant one line below, is the right scope for it, not a candidate for expansion
into H1s.

**No genuine confidence in a keyword-volume difference exists** — this audit did not have access
to search-volume tooling, and no claim above should be read as a measured search-demand finding
(marked explicitly per the task's evidence-discipline requirement). The judgment is a naturalness/
convention call, not a keyword call.

### 10.3 Decision

**KEEP** the existing three-tier grade-label system exactly as implemented:
`{ordinal}-grade` (URL) / `{Ordinal} Grade` (H1, breadcrumb, prose) / `Grade {n}` (compact
homepage-tile-only shorthand). This is coherent, not inconsistent — different contexts have
different space and formality constraints, exactly per §13 of the task brief's own framing. No
normalization recommended.

---

## 11. URL audit

### 11.1 `/skills` vs. `/spelling-skills` or `/spelling-patterns`

**Decision: KEEP URL.**

- **Domain context sufficiency:** `spellingwords.app/skills` already establishes subject matter
  through the domain — a visitor or crawler encountering `spellingwords.app/skills` does not need
  the path itself to repeat "spelling." This is standard practice in topically-branded domains and
  is explicitly acknowledged as sufficient in `PUBLIC_URL_ARCHITECTURE.md`'s own framing of
  `/skills` as "a first-class top-level public journey," with no redundant "spelling-" prefix
  anywhere else in the URL tree (`/1st-grade`, not `/spelling-1st-grade`; `core-spelling` is a route
  *segment name* chosen for a different reason — see §11.4 — not a site-wide prefixing convention).
- **Migration cost:** `/skills` is already the canonical, implemented, tested (`canonicalSkillRoutes.test.ts` per the architecture doc) route for 41 live pages plus the hub. A rename would require redirects, canonical-tag updates, sitemap regeneration, and internal-link updates across every Grade Unit, Gateway, and Skill page that links to it — for a benefit (one extra keyword in the path) that the evidence in §5 does not support as necessary.
- **`/spelling-patterns` specifically:** rejected on the same semantic-scope grounds as the
  terminology candidate in §5.5 — the URL would misdescribe the ~30% of skills that are
  morphological or meaning-based, not pattern-based.
- Because the site is pre-launch (`PUBLIC_URL_ARCHITECTURE.md`, "No redirects, pre-launch"), the
  usual backlink/indexation cost of a URL change is currently near-zero — but this audit still does
  not recommend the change, because the *semantic* case for it was not established, independent of
  migration cost. A low migration cost is not itself a reason to change a URL that isn't wrong.

### 11.2 Grade URLs (`/{grade}`, `/{grade}/core-spelling`, etc.)

**Decision: KEEP URL**, all of them. No candidate alternative was proposed by the task brief or
surfaced by this audit's own review that offers a material benefit over the current, already-
frozen, already-implemented, no-trailing-slash grade-first tree.

### 11.3 URL depth / no-Skill-Family-Gateway

**Decision: KEEP URL** (`/skills/{skill-slug}`, no `/skills/{family}/{skill-slug}` intermediate).
This audit did not discover new evidence against the frozen no-family-gateway decision
(`SKILLS_ARCHITECTURE.md`, `CANONICAL_SKILLS_HUB_STANDARD.md` §2: "No Skill Family Gateway layer
MUST be introduced"). No architectural conflict is reported here. Per the task brief's own
instruction (§15), this is not reopened.

### 11.4 One naming note, not a URL problem

`core-spelling` as a route *segment* (`/{grade}/core-spelling`) matches its public strand name
exactly, which is good hygiene — a reader can predict the URL from the visible label and vice
versa. The same is true for `high-frequency-words` and `themed-spelling-practice`. `/skills` breaks
this pattern only in the sense that the segment is shorter than the fuller public "Spelling
Practice by Skill" title — but per §4, that's expected: `/skills` corresponds to the **nav label**
("Skills"), not the H1, and nav labels are exactly where URL brevity should track. No inconsistency
found.

---

## 12. SEO/search findings

No keyword-volume tool was available for this audit; every claim below is either an observed-SERP/
qualitative pattern (§10 web research) or a professional inference, explicitly labeled.

- **Observed, not measured:** current structured-literacy and general-education writing (Reading
  Rockets, UFLI materials, Keys to Literacy) increasingly organizes phonics/spelling content around
  "spelling patterns" as a *sub-concept* label (e.g., UFLI's "Ending Spelling Patterns" unit) while
  reserving broader terms like "spelling skills" or "word study" for the umbrella. This supports,
  rather than undermines, this audit's §5.5 finding: "pattern" language is well suited to
  phonics-specific sub-groupings within the taxonomy (which the site already does at the family
  level — e.g. "One-Syllable Spelling Patterns" is a family, not the umbrella), not as the sitewide
  Skills label.
- **Professional inference, not measured:** the three strand names (Core Spelling, High-Frequency
  Words, Themed Spelling Practice) and the Skills system target genuinely different search
  intents — a grade-sequenced curriculum search, a high-frequency/sight-word search, a topic/theme
  search, and a named-concept search, respectively. This is a defensible non-cannibalizing
  structure; nothing in this audit's research surfaced evidence that any two of these systems are
  competing for the same query.
- **No keyword-volume claim is made anywhere in this document** for "skills" vs. "spelling skills,"
  "1st grade" vs. "first grade," or any other candidate pair. Any future homepage-research pass
  that wants to make a volume-based claim needs a dedicated keyword-research tool this audit did
  not have.

---

## 13. GEO/AEO findings

Applying the task's high-evidence-threshold standard: no AI-specific terminology change, hidden
summary, or schema addition is recommended anywhere. The frozen standards already independently
arrived at the correct posture for AI/answer-engine consumption without this audit needing to add
anything:

- `CANONICAL_SKILLS_HUB_STANDARD.md` §10, §12 already explicitly forbid keyword blocks, hidden
  AI-facing summaries, and schema added "solely for LLMs" on the Skills Hub.
- The HFW and Themed standards (§8/§11 respectively) carry the identical prohibition.
- The site's actual GEO/AEO strength — to the extent it can be assessed without live citation
  data — comes from what the standards already require: complete, accurate taxonomy coverage;
  consistent, non-overloaded terminology (Section 3.3's finding that legacy terms are fully
  purged supports this directly); clear entity boundaries (High-Frequency ≠ Irregular ≠ Heart Word,
  explicitly distinguished rather than collapsed); and semantic HTML/structured data that matches
  visible content exactly.

This audit found no case where current terminology creates entity ambiguity for an AI system
reading the site's content. No GEO/AEO-driven terminology change is recommended.

---

## 14. Homepage implications

This section states constraints for later homepage work; it does not design that homepage.

1. **The current production homepage is not a terminology baseline.** It predates
   `CONSTITUTION.md`'s three-journey model and uses phrasing ("Ready-Made Lists," "practice by
   phonics skill") that appears in no frozen standard. Homepage research should treat the frozen
   docs (§2) and inner pages (Grade Hub, Gateway, Skills Hub standards) as the terminology source
   of truth, not the current homepage copy.
2. **Canonical labels to carry into homepage work**, per this audit's findings:
   - Grade-first journey: **"Grades"** (nav-weight label, already correct), full framing should
     name the three strands as **Core Spelling / High-Frequency Words / Themed Spelling Practice**
     when detail is warranted, each with the one-line clarifying context already required by their
     respective canonical standards (§6.2, §7.3, §8.4 above).
   - Skill-first journey: **"Skills"** (nav-weight label, already correct); if the homepage needs a
     fuller descriptive sentence or card subtitle (not a heading), "spelling skills and patterns"
     or "focused spelling practice by skill" are both defensible, evidence-consistent phrasings —
     neither is frozen by this audit, since sentence-level copy was out of scope, but both must
     preserve the breadth finding of §5.3 (do not describe the system as phonics/pattern-only).
   - Custom-words journey: this audit did not find a settled public single-word label analogous to
     "Grades"/"Skills" — `CONSTITUTION.md` §3.1 calls it "Practice Your Own Words" at the
     conceptual-journey level, but this exact string does not currently appear in the shipped
     homepage UI (§14.1 below covers this as a discrepancy, not a naming defect: the *journey* is
     frozen, its exact nav/button wording is not).
3. **Grade naming**: homepage grade tiles should keep the `Grade {n}` compact form only in
   tile-eyebrow-scale contexts (as they do today) and use full `{Ordinal} Grade` labels anywhere
   the text reads as a heading or sentence.
4. **Do not introduce "Spelling Patterns" as a homepage-level umbrella term for the skill-first
   journey** — §5.5's scope finding applies with full force at the homepage, where a first-time
   visitor has the least context to self-correct a misleadingly narrow label.

---

## 15. Repository discrepancies

Reported, not resolved, per the task's instruction (§21 of the brief).

| # | Discrepancy | Classification | Notes |
|---|---|---|---|
| 1 | Homepage (`index.astro`) uses "Ready-Made Lists," "phonics skill," and does not name any of the three Constitution journeys explicitly, while every inner page (Grade Hub, Gateway, Skills Hub) already conforms to post-Constitution terminology. | **Stale, expected pre-redesign state** | This is exactly why homepage research is happening now (task brief §3); not a defect to fix inside this audit. |
| 2 | `CANONICAL_THEMED_SPELLING_PRACTICE_PAGE_STANDARD.md` §10 documents a target member-title convention (`[grade label] [Theme] Spelling Words`) and explicitly defers "a later coordinated task" to reconcile grade-label presentation across Core, HFW, Themed, Hubs, and Gateways. | **Architectural conflict already flagged by its own authority, not new** | Directly relevant to homepage grade-naming work (§14.3); this audit surfaces it for homepage-research awareness, does not resolve it, and does not expand its scope. |
| 3 | `docs/HOMEPAGE_SPEC.md` references "the Spelling Library" as a homepage destination — a term that does not exist as a public system in the current Constitution/Content Model vocabulary. | **Stale documentation** | `HOMEPAGE_SPEC.md` predates the Constitution's three-journey model per its own upstream-document list (`PRODUCT_VISION.md`, `SITE_ARCHITECTURE.md` — both pre-Constitution). Likely an archival candidate per `CONSTITUTION.md` §17's own list of "likely future archival candidates," which already names `SITE_ARCHITECTURE.md` and `GRADE_LEVEL_STRATEGY.md` as similar cases. |
| 4 | `docs/architecture/SKILLS_MODEL.md` §6–7 lists 12 *differently named and differently scoped* candidate families (e.g. "Short Vowels and CVC Words," "Syllables and Multisyllabic Words," "Greek and Latin Word Parts") that were later superseded by `SKILLS_ARCHITECTURE.md`'s frozen 12 families under different names ("Short Vowels," "Multisyllabic Words," "Greek and Latin Roots"). | **Intentional, already-labeled supersession** | `SKILLS_MODEL.md`'s own superseded-notice banner already flags this; not new information, listed here only for completeness of the terminology inventory in §3. |
| 5 | Internal curriculum/test-file identifiers freely use `Grade 1`, `Grade 2` register (e.g. `grade2Progression.ts`, doc prose) alongside the public `1st Grade` label. | **Harmless, expected register variation** | Developer/internal-doc register is not held to public-copy conventions; no public page renders this form as a heading (§3.4, §10.1). |

No discrepancy found rises to "public inconsistency worth fixing" — every item above is either
already self-flagged by its own governing document, or is an expected artifact of internal vs.
public register.

---

## 16. Decision matrix

| Term/System | Classification | Notes |
|---|---|---|
| "Skills" (nav label) | **KEEP** | §5.7 |
| "Spelling Practice by Skill" (Skills Hub H1/title) | **KEEP** | Already shipped; §5.6 |
| "Spelling Skills" (as umbrella replacement) | **KEEP** (i.e., not adopted) | Viable but not clearly superior to current; §5.2 |
| "Spelling Patterns" (as umbrella replacement) | **CHANGE — rejected** (i.e., confirmed NOT to change to this) | Too narrow for morphology/meaning-based families; §5.5 |
| "Core Spelling" | **KEEP — CLARIFY IN COPY** | Clarification already required by frozen Hub standard; §6.2 |
| "High-Frequency Words" | **KEEP** | §7.3 |
| "Themed Spelling Practice" | **KEEP — CLARIFY IN COPY** | Optionality clarification already required by frozen standards; §8.4 |
| Unit / Set / List / Skill (member nouns) | **KEEP**, differentiated | §9 |
| Grade Hub, Grade-Strand Gateway | **INTERNAL ONLY** | §3.1 |
| Grade Roadmap, Practice Set, Collection, Teaching Guide | **INTERNAL ONLY** (or not yet public) | §3.1 |
| `1st Grade` / `Grade 1` / `kindergarten`-style slugs (three-tier system) | **KEEP** | §10.3 |
| "Practice Your Own Words" (exact string, homepage UI) | **NEEDS FURTHER VALIDATION** | Frozen as a *journey concept*, not frozen as literal UI copy; homepage research should decide exact wording within that concept |

---

## 17. URL decision matrix

| URL | Classification | Notes |
|---|---|---|
| `/skills`, `/skills/{skill-slug}` | **KEEP URL** | §11.1 |
| `/{grade}`, `/{grade}/core-spelling`, `/{grade}/high-frequency-words`, `/{grade}/high-frequency-words/set-{n}`, `/{grade}/themed-spelling-practice`, `/{grade}/themed-spelling-practice/{slug}` | **KEEP URL** | §11.2 |
| No `/skills/{family}/{skill-slug}` intermediate layer | **KEEP URL** (i.e., confirmed do-not-add) | §11.3 |

No URL in this audit falls into **NEEDS INDEX/TRAFFIC DATA BEFORE DECISION** — every candidate had
enough qualitative/architectural evidence for a confident KEEP without needing traffic data, largely
because the pre-launch status (§11.1) removes the traffic-risk dimension that would otherwise force
that classification.

---

## 18. Recommended changes

**None.** No terminology change and no URL change is recommended by this audit. This is a
completely successful research outcome per the task's own stated framing (§"Core principle" in the
task brief: "'No changes recommended' is a completely successful research outcome").

The one place this audit's conclusion differs from a literal reading of the task brief's framing
("Is 'Skills' actually the best name...") is that the best available answer was already
implemented before this audit began (§5.6) — the audit's contribution is confirming that
implementation is correct and explaining why, not proposing something new.

---

## 19. Explicit non-changes

For traceability, every candidate the task brief explicitly asked to be evaluated, with its
disposition:

- "Skills" → **kept**, confirmed correct for nav (§5.7)
- "Spelling Skills" → **not adopted**, viable but not clearly superior (§5.2)
- "Spelling Patterns" → **rejected as umbrella**, too narrow (§5.5)
- "Spelling Skills & Patterns" → **rejected**, reads as internal-taxonomy leakage (§5.2)
- "Practice by Skill" → **kept** as homepage card / conceptual phrasing, not nav (§5.6)
- "/spelling-skills" → **URL kept as `/skills`** (§11.1)
- "/spelling-patterns" → **URL kept as `/skills`**, same scope objection as the terminology case (§11.1)
- Grade-naming normalization (`First Grade` vs `1st Grade` vs `Grade 1` unified everywhere) →
  **not recommended**; existing three-tier, context-scoped system is coherent (§10.3)
- "Sight Words" / "Common Words" / "Heart Words" as HFW strand name → **already rejected and fully
  purged**, reconfirmed absent from production (§3.3, §7.2)
- Skill Family Gateway URL layer (`/skills/{family}/{skill}`) → **not reopened**, no new evidence
  found (§11.3)

---

## 20. Implementation implications

Because no CHANGE is recommended, there is no migration plan to write. The implementation-relevant
output of this audit is entirely for homepage research (§14):

- Treat the frozen inner-page standards, not the current pre-Constitution homepage, as the
  terminology baseline.
- Preserve the nav/H1/body-copy/URL layering pattern already correctly in place for Skills (§4) as
  the model for how the homepage should introduce all three journeys.
- Carry forward the "Core is the main path" and "Themed is optional" clarifying-sentence
  requirements already frozen at the Hub/Gateway layer into the homepage's own copy, rather than
  assuming label alone (§6.2, §8.4).
- Resolve "Practice Your Own Words" exact UI wording as part of homepage research — it is
  conceptually frozen, not literally frozen (§16, §18).

---

## 21. Remaining uncertainties

- No keyword-volume or Search Console data was available for any term or URL evaluated. Every
  search-intent statement in this document is either an observed-SERP/professional-literature
  pattern or an explicitly labeled inference, never a measured figure.
- Whether "Spelling Skills" (two words) would outperform bare "Skills" in the nav specifically is
  genuinely close and was not resolved with high confidence — it is classified KEEP (current) but
  not NEEDS FURTHER VALIDATION only because the cost of the status quo is low and no evidence
  favored switching; a future homepage-adjacent A/B or user-testing pass could resolve this with
  more confidence than this desk audit can.
- The exact literal string for the "Practice Your Own Words" journey's homepage-facing UI copy
  (button label, card heading, etc.) is left open for homepage research, per §16/§18 — this audit
  froze the journey concept and its relationship to the other two journeys, not its exact words.
- `CANONICAL_THEMED_SPELLING_PRACTICE_PAGE_STANDARD.md` §10's deferred sitewide grade-label
  reconciliation remains genuinely open; this audit does not resolve it and flags it only as
  relevant context for whoever picks up that deferred task.

---

## 22. Final recommendation

Proceed to homepage research and implementation using the terminology already frozen across the
Constitution, Content Model, Skills Architecture, and the five canonical page-family standards,
exactly as currently implemented in production's inner pages. No renaming, no URL migration, and
no taxonomy change is required or recommended before that work begins. The homepage's job is to
introduce this already-correct naming system to first-time visitors clearly — including the two
places (Core Spelling, Themed Spelling Practice) where a one-sentence clarification, already
required at the Hub/Gateway layer, should be carried forward rather than re-derived — not to
invent new names for it.

---

## Canonical terminology matrix

| Concept | Internal architecture | Navigation | H1 / page title | Body copy | URL | Decision |
|---|---|---|---|---|---|---|
| Skill-first system | Skills Hub | **Skills** | **Spelling Practice by Skill** | "spelling skill," "spelling concept" (breadth-preserving language per §5.3) | `/skills` | KEEP |
| Skill family grouping (phonics-based families only) | Skill Family | (not surfaced as nav) | Family H2 on `/skills` (e.g. "Vowel Teams") | "spelling pattern" language acceptable *within* pattern-based families | n/a (no family URL layer) | KEEP |
| Grade-first system | Grade Hub | **Grades** | **{Grade label} Spelling Words** | "grade-level spelling," "this grade's curriculum" | `/{grade}` | KEEP |
| Core strand | Grade-Strand Gateway (Core) | (surfaced via Grade Hub section, not top nav) | **Core Spelling** | "the main, systematic path" (clarifying clause required) | `/{grade}/core-spelling` | KEEP — CLARIFY IN COPY |
| High-frequency strand | Grade-Strand Gateway (HFW) | (surfaced via Grade Hub section) | **High-Frequency Words** | "words your child sees and uses most often" (frequency framing) | `/{grade}/high-frequency-words` | KEEP |
| Themed strand | Grade-Strand Gateway (Themed) | (surfaced via Grade Hub section) | **Themed Spelling Practice** | "optional, additional practice" (clarifying clause required) | `/{grade}/themed-spelling-practice` | KEEP — CLARIFY IN COPY |
| Custom words journey | Practice Tool | (no settled short nav label found) | n/a — homepage hero, not a subpage | "practice with your own words" (concept frozen, exact copy open) | `/play?list=...` | NEEDS FURTHER VALIDATION (copy only; concept frozen) |
| Grade label, heading context | `gradeConfig.label` | n/a | `1st Grade`, `2nd Grade`, … | same | slug: `1st-grade`, … | KEEP |
| Grade label, compact tile context | `gradeConfig.shortLabel` | n/a | n/a (never a heading) | `Grade 1`, `Grade 2`, … (tile eyebrow only) | n/a | KEEP |
