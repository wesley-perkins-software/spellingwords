# Spellingwords.app Content Architecture & Taxonomy

## Context
The site currently has no real content — just 4 fixture `WordList` objects in `src/data/fixtures/sampleLists.ts`, a query-param-based `/play?list=...` flow, and a `WordList`/`SpellingWord` type already defined in `src/types/spelling.ts`. This document is the long-term content constitution: a product philosophy, taxonomy, URL scheme, and frontmatter schema that scales to thousands of lists, supports SEO/AEO/GEO, and makes future mastery/achievement features fully metadata-driven — all while requiring *content additions only* (no code changes) as the library grows. Revision 3 establishes the two-mode product philosophy (Custom Lists + Library Lists), documents the full mastery/achievement/continuity feature set at the architecture level, and finalizes the schema.

---

## 0. Product Philosophy

spellingwords.app has **two equal modes** — neither is subordinate to the other, and the architecture must serve both without privileging one:

1. **Custom Lists** — Parents, teachers, and students paste their own words and immediately generate a test. These lists are **temporary and user-generated**: no taxonomy, no mastery tracking, no SEO surface. This is the site's first-class, zero-friction entry point — the thing that makes the tool *immediately useful* even before the Library exists in the user's mind. Architecturally, custom lists stay exactly as they are today (`sourceType: 'custom'`, ephemeral, query-param driven) — this document does not change that flow.

2. **Library Lists** — Curated, taxonomy-organized spelling lists (`sourceType: 'curated'`) that a student can return to over time. These are what this document is primarily about: they carry the full schema (taxonomy, skill tags, difficulty, mastery threshold, progression links) and are the substrate for everything in §6 (mastery, achievements, continuity, certificates).

Every architectural decision below should be read through this lens: **the Library must feel like a natural "next step" from a Custom List**, not a separate product bolted on. (Concretely: a student who just spelling-tested a custom list of their own words should plausibly see "Looking for more practice? Try Dolch Pre-Primer" — a cross-mode bridge, not a wall.) Library features (mastery, badges, continuity) are exclusively a Library-mode concern; Custom Lists deliberately stay lightweight and ephemeral, because adding tracking weight to them would compromise the very quality — frictionless, disposable, "paste and go" — that makes them valuable.

This philosophy directly shapes why `sourceType` only needs two values (`'curated' | 'custom'` — see §5.5): the type isn't just provenance metadata, it's the switch that determines whether a list participates in the Library's mastery/achievement machinery at all. A `'custom'` list is, by definition, outside that system.

---

## 1. Content Philosophy for Library Lists
Every Library list must satisfy the existing `WordList` purpose: help a student practice OR help a parent/teacher find the right list fast. A list earns a place in the taxonomy only if it is:
- **Discrete and nameable** — a parent could type roughly that name into search ("3rd grade compound words", "Dolch primer sight words", "silent e words").
- **Distinct in content**, not a re-shuffled duplicate of a sibling list.
- **Stable as an identifier** — its `id` should never need to change once published, even as titles/slugs/descriptions are tuned for SEO.

This rules out auto-generated filler pages, and rules out theme/seasonal pages that exist purely to pad a sitemap. It also rules out any form of artificial gamification (daily lists, streak counters, XP systems) — see §6.6 for why "Featured List" replaces any "List of the Day" concept.

---

## 2. Taxonomy

### 2.1 Top-level content families (each maps to a `category`)
1. **Grade-Level Lists** (`grade-level`)
2. **Sight Words** (`sight-words`)
3. **Phonics Patterns** (`phonics`)
4. **Spelling Bee / Challenge** (`challenge`)
5. **Theme Lists** (`theme`) — postponed
6. **Seasonal Lists** (`seasonal`) — postponed

These six families are the permanent top-level taxonomy nodes. New families should be rare and deliberate — this stable, small set is what topical-authority and URL-permanence depend on.

### 2.2 Grade-level lists — naming, with the id/slug split
Avoid arbitrary "List 1, List 2" (meaningless to search) and avoid "Week 1–36" (implies a curriculum/calendar commitment the site doesn't make):

- **`id` (permanent, internal, sequence-based):** `grade-3-list-04` — stable, collision-free, infinitely scalable. Never shown to users, never changes, is the join key for progress tracking, `relatedLists`, `nextLists`, `prerequisiteLists`, and `achievementGroup`.
- **`slug` (public, descriptive, SEO-tunable):** `3rd-grade-compound-words` — human-readable, search-friendly, revisable later (with a redirect) without breaking any internal reference.
- **`title` (display):** "3rd Grade Spelling List 4: Compound Words & Contractions"

The *sequence* lives safely in the permanent `id` (so we always know "what comes after grade-3-list-04"), while the *public identity* is fully descriptive. Each list must genuinely center on the pattern named in its slug/title.

If a curriculum-aligned "Week N" product is wanted later, it can be layered on as an optional alignment field — never baked into core identity, since district curricula vary.

### 2.3 Sight words — organization
Group by **source** first (canonical, externally-recognized, high-search-volume named entities — strong AEO/GEO territory), then by the source's own sub-levels:
- `sight-words/dolch-pre-primer`, `sight-words/dolch-primer`, `sight-words/dolch-first-grade`, … `sight-words/dolch-nouns`
- `sight-words/fry-first-100`, `sight-words/fry-second-100`, …

Each list's `canonicalSource` records `{ name: "Dolch" | "Fry", tier: "pre-primer" | "first-100" | … }`. A cross-cutting `sight-words` index page explains Dolch vs. Fry — genuine UX value, not filler.

### 2.4 Phonics patterns — hierarchy
Two-level hierarchy that doubles as the **skillTag** controlled vocabulary (§5.4):

```
phonics
├── short-vowels        (short-a, short-e, short-i, short-o, short-u)
├── long-vowels
│   ├── silent-e        (a_e, i_e, o_e, u_e)
│   └── vowel-teams     (ai/ay, ee/ea, oa/ow, …)
├── digraphs            (ch, sh, th, wh, ck, ph)
├── blends              (bl, st, tr, …)
├── r-controlled-vowels (ar, er, ir, or, ur)
├── diphthongs          (oi/oy, ou/ow)
└── word-patterns       (e.g. -ight, -ould, common prefixes/suffixes)
```
Top level = phonics concept family; each list = one specific, well-scoped pattern. Because `skillTags` draws from this same vocabulary, the taxonomy and the tagging system reinforce each other.

### 2.5 Spelling Bee / Challenge — how it differs from grade lists
Grade lists are organized by *what's developmentally appropriate to teach at grade N*. Challenge lists are organized by **named difficulty tier**, independent of and often above grade level, oriented toward competition prep:
- Organize by tier name (`challenge/tier-1-roots-and-patterns`, `challenge/tier-2-greek-latin-roots`)
- Carry richer `hint`/`exampleSentence`/etymology data — genuine content differentiation
- Typically set `masteryThreshold: 100` (competition prep tolerates no near-misses)

### 2.6 Theme & Seasonal lists — postponed
Reserved as taxonomy/schema categories (so URLs and schema never need to change later) but **zero seeded at launch**:
- Highest "filler" risk, lowest topical-authority payoff relative to effort
- Real future value exists, but only with a clear non-generic angle (lists tied to actual classroom units of study — not generic "10 animal words")

---

## 3. URL Structure

**Recommendation:** `/spelling-lists/{category}/{slug}`

Examples:
- `/spelling-lists/grade-level/3rd-grade-compound-words`
- `/spelling-lists/sight-words/dolch-pre-primer`
- `/spelling-lists/phonics/silent-e-long-a`
- `/spelling-lists/challenge/tier-1-roots-and-patterns`

### Why flat `{category}/{slug}` rather than deep nesting
- **Cross-cutting reality**: a "silent-e" list is simultaneously a phonics list, grade-2-appropriate, and possibly relevant to a challenge tier. Deep nesting forces one "true" location and creates duplicates/redirects for the others. A flat slug plus rich `tags`/`skillTags`/`category` metadata keeps one canonical URL while every relationship lives in frontmatter.
- **URL stability for SEO**: nested paths invite painful restructuring later (renaming an intermediate segment 301-redirects everything beneath it). A flat slug under one of six fixed category segments essentially never needs to change.
- **The slug *is* the SEO/AEO payload** — `3rd-grade-compound-words` is both human-readable and self-describing to answer engines, unlike `list-1`.
- **Uniqueness scope**: slugs must be unique *within* a category; the globally-unique `id` namespace is the real source of truth for cross-references.

Supporting non-list routes (genuine UX value, not thin pages):
- `/spelling-lists/` — master browse/index, and home of the Featured List (§6.6)
- `/spelling-lists/{category}/` — category landing page (e.g., explains Dolch vs. Fry, maps the phonics skill tree)
- `/skills/{skillTag}/` (later) — auto-generated cross-cutting browse page, built purely from tag metadata

---

## 4. Schema / Frontmatter

Extend the existing `WordList` interface additively. Every field below is either already present, requested in this revision, or required to support a documented future feature — nothing speculative beyond that.

```ts
type Category = 'grade-level' | 'sight-words' | 'phonics' | 'challenge' | 'theme' | 'seasonal';
type DifficultyLevel = 'beginner' | 'developing' | 'intermediate' | 'advanced' | 'challenge';
type ListStatus = 'draft' | 'published' | 'archived';

interface WordList {
  // --- Canonical identity ---
  id: string;                 // PERMANENT internal key, e.g. "grade-3-list-04" or "dolch-pre-primer"
                              // never changes; join key for progress, relatedLists, nextLists,
                              // prerequisiteLists, achievementGroup
  slug: string;               // PUBLIC, human-readable, SEO-tunable URL segment,
                              // e.g. "3rd-grade-compound-words" — may evolve (with redirect);
                              // never used as a join key
  canonicalSource?: {         // for lists derived from named external sets (Dolch, Fry, …)
    name: string;             // "Dolch", "Fry"
    tier: string;             // "pre-primer", "first-100"
    url?: string;             // citation link — trust signal for GEO/AEO
  };

  // --- Display / SEO / AEO ---
  title: string;
  description: string;        // doubles as meta description & AEO snippet
  shortAnswer?: string;       // optional single-sentence "what is this list" for featured snippets

  // --- Taxonomy ---
  category: Category;
  grade?: string;             // "K", "1".."8" — only on grade-relevant lists
  difficulty: DifficultyLevel;
  skillTags: string[];        // controlled vocabulary (§2.4) — what badges/recommendations key off
  tags: string[];             // looser editorial discovery tags

  // --- Sequencing / curriculum metadata ---
  order: number;              // position within its natural sequence (grade, source tier, challenge
                              // tier, …) — drives default ordering on index/category pages and
                              // gives a deterministic fallback when nextLists isn't authored yet
  estimatedDurationMinutes: number;  // realistic time to complete one practice session — surfaced
                              // in UI ("~10 min") and lets future "what can I fit in right now"
                              // recommendations exist without guesswork
  status: ListStatus;         // 'draft' lists are authored but not yet linked/indexed/sitemapped;
                              // 'published' is live; 'archived' is retained for existing progress
                              // records but no longer surfaced in browse/search — this is what
                              // lets content be authored incrementally without ever shipping a
                              // half-finished or thin page

  // --- Mastery ---
  masteryThreshold: number;   // % score required to mark this list "mastered" (e.g. 90; challenge
                              // lists may require 100) — always present, every list needs a defined bar

  // --- Provenance ---
  sourceType: 'curated' | 'custom';   // 'generated' removed — see §5.5

  // --- Relationships / progression ---
  relatedLists: string[];     // ids of topically-related lists (cross-linking, SEO, "see also")
  prerequisiteLists?: string[];  // ids of lists a student should ideally complete/master first —
                              // the *backward*-looking complement to nextLists; powers "you might
                              // want to try X before this" guidance and lets a future
                              // recommendation engine avoid suggesting lists a student isn't ready for
  nextLists: string[];        // ids of lists that logically follow this one — powers Continue
                              // Learning, results-page recommendations, progression chains (§6.1)
  achievementGroup?: string;  // e.g. "dolch-mastery", "phonics-long-vowels" — groups of lists
                              // that compose a future badge (§6.3)

  // --- Content ---
  words: SpellingWord[];      // unchanged
}
```

### Notes on the additions in this revision
- **`order`**: distinct from `id`'s embedded sequence number — `id` encodes sequence as a *permanent identity concern* (never changes), while `order` is an *explicit, editable display/sort concern* (e.g., if we ever decide list 3 and list 4 should swap pedagogical order, we change `order`, not `id`, leaving all historical references intact). Also gives the rendering layer a deterministic sort with zero parsing/inference logic.
- **`estimatedDurationMinutes`**: a small but real UX/AEO asset — "How long does this spelling list take?" is a genuine AEO-style question, and "~10 minutes" is the kind of concrete, scannable detail that helps a busy parent choose between two lists. It is *not* a gamification mechanic (no timers, no speed-scoring) — purely descriptive metadata.
- **`status`**: the mechanism that lets the team author content incrementally and in-repo without ever exposing a thin or unfinished page — `draft` lists exist in the codebase (and can be reviewed, linked internally for QA) but are excluded from sitemaps, browse pages, and search until flipped to `published`. `archived` exists for the rare case a list is retired — its progress records and certificates remain valid/referenceable, but it stops appearing in discovery surfaces. This directly serves "no thin pages, ever" as an enforceable, data-driven rule rather than a editorial promise.
- **`prerequisiteLists`**: the natural complement to `nextLists`. Where `nextLists` answers "where do I go from here," `prerequisiteLists` answers "what should I have done before this" — both are needed for a coherent progression graph, and both are simple `id` arrays consumed identically by future recommendation logic.

---

## 5. Field-by-Field Rationale for Changes Requested in Prior Revisions

**5.1 — id vs. slug separation.** `id` is the permanent join key for everything (progress, `relatedLists`, `nextLists`, `prerequisiteLists`, `achievementGroup`); `slug` is the freely-rewritable public URL segment. This means SEO experimentation on a slug never touches a student's stored progress or any cross-reference — the single biggest unlock for long-term agility.

**5.2 — named difficulty scale.** `'beginner' | 'developing' | 'intermediate' | 'advanced' | 'challenge'` reads naturally in UI chips/filters, maps directly onto badge names with zero translation layer, and self-documents in frontmatter (an author writing `difficulty: intermediate` needs no legend, unlike `difficulty: 3`). Still fully orderable, so "recommend something slightly harder" logic works exactly as it would with numbers.

**5.3 — masteryThreshold.** A required per-list percentage that defines "mastered." Standard lists might use 90; `challenge`-category lists (and any list demanding precision) can require 100. This single field is what lets the future mastery engine answer "has this student mastered list X?" by comparing `bestScore` (from localStorage) to `masteryThreshold` (from content) — no thresholds hardcoded anywhere in code.

**5.4 — nextLists.** An ordered array of `id`s. Powers Continue Learning (§6.1), results-page recommendations, progression chains, and session continuity. Always references `id`s, never `slug`s, so chains survive slug rewrites. Intentionally an array (not a single value) because some lists branch.

**5.5 — sourceType: removing `'generated'`.** Per this revision, `sourceType` is now `'curated' | 'custom'` only. This isn't just a type simplification — it's a direct expression of the two-mode philosophy in §0: every `WordList` in the system is *either* a hand-curated Library entry (`'curated'`) *or* a user-authored ephemeral list (`'custom'`). There is no third "AI-generated" category, because that would reintroduce exactly the kind of filler content this constitution exists to prevent. If an authoring *workflow* someday uses AI assistance to draft a curated list, the output is still reviewed and published as `'curated'` — provenance metadata shouldn't expose internal tooling choices, and it definitely shouldn't create a loophole for unreviewed content to enter the Library.

---

## 6. Future Feature Architecture (documented now, implemented later)

Each of these is described purely in terms of how it reads existing/proposed `WordList` frontmatter plus a localStorage-only progress record — **nothing here requires a backend, accounts, or hardcoded per-list/per-badge logic in code.**

### 6.1 — Continue Learning
A "Continue Learning" surface (on results pages and a future dashboard) is powered entirely by:
1. Read the most recent `ListProgress` record from localStorage (most recent `completedAt`).
2. Look up that list's `nextLists[]` from content.
3. Render the first (or all) of those as recommended next steps, pulling `title`/`slug`/`estimatedDurationMinutes`/`difficulty` for the card.
4. Fallback: if `nextLists` is empty (e.g., end of a chain, or a list authored without one yet), fall back to `order`-based sequencing within the same `category`/`grade`/`canonicalSource.tier` — which is exactly why `order` exists as a field distinct from the chain data.

No per-list "what's next" logic is ever written in code — it's a pure data join.

### 6.2 — Progress Tracking
A future localStorage-only record, requiring no backend:
```ts
interface ListProgress {
  listId: string;        // == WordList.id — the permanent join key (§5.1)
  bestScore: number;     // 0-100; compared against masteryThreshold to derive "mastered"
  attempts: number;
  completedAt?: string;
  masteredAt?: string;   // set the first time bestScore >= masteryThreshold
}
```
Always keyed off `WordList.id`, never `slug` or `title` — guaranteeing that any future SEO-driven slug rewrite leaves every student's history intact. This record is the single source of truth that every other feature in this section reads from.

### 6.3 — Achievement System
Badges are **entirely metadata-derived** — there must be no hardcoded badge definitions in code. Each badge type is a small *rule* that joins `ListProgress` records against `WordList` frontmatter:

| Badge example | Derived from |
|---|---|
| "Dolch Champion" | every `WordList` where `achievementGroup == "dolch-mastery"` has a `ListProgress` with `masteredAt` set |
| "Silent E Master" | every `WordList` where `skillTags` includes `"silent-e"` is mastered |
| "Long Vowel Explorer" | a meaningful subset (e.g. ≥3) of lists tagged with any `long-vowels`-family `skillTag` are completed |
| "Challenge Tier Achiever" | every `category == "challenge"` list at a given `difficulty` is mastered (at its, typically stricter, `masteryThreshold`) |

Because every rule resolves purely against `achievementGroup`, `skillTags`, `difficulty`, and `masteryThreshold` — all content fields — adding list #500 to an existing group or tag set automatically and correctly contributes to every relevant badge's progress, with zero code changes. The only "code" a badge needs is its rule-template (e.g., "all lists in group X mastered" is one reusable rule shape that many badges instantiate with different parameters) — never a per-badge special case.

### 6.4 — Printable Certificates
A future certificate feature generates a printable/downloadable artifact directly from an *achieved* state — i.e., from the same `ListProgress` + `WordList` metadata join described above (a completed `achievementGroup`, a mastered list, or a badge unlocked per §6.3). No accounts are required: the certificate is generated client-side at the moment of achievement (or on-demand from the dashboard, by re-deriving the same achieved state from localStorage), and can include the student's self-entered name, the achievement title (drawn from `achievementGroup`/badge metadata), and the date. Because the underlying achievement logic is entirely metadata-driven (§6.3), certificate templates need only know how to render "achievement X was unlocked on date Y" — they never need per-list or per-badge special-casing.

### 6.5 — Recently Practiced
A homepage/dashboard section — "Continue where you left off" — populated purely from localStorage:
1. Read the N most recent `ListProgress` records (sorted by `completedAt`).
2. Join each `listId` against `WordList` content to render title/slug/category/progress (`bestScore` vs. `masteryThreshold`, with a "mastered" indicator if `masteredAt` is set).
3. Naturally complements §6.1 — "Recently Practiced" shows *where you've been*; "Continue Learning" suggests *where to go next* — both driven by the same record and the same `id` join.

No server state, no accounts — purely a localStorage read-and-render.

### 6.6 — Featured List (replacing any "List of the Day" concept)
**Explicitly rejected:** daily-rotating lists, streak counters, XP/points systems, or any other artificial gamification mechanic. These create pressure and arbitrary engagement loops that run counter to "every list must provide real educational value" — and they invite exactly the kind of low-substance, engagement-bait content this constitution exists to prevent.

**Instead:** an optional, **manually curated** "Featured List" — a single, editorially-chosen highlight that changes *infrequently* (e.g., monthly, or tied to a genuine real-world moment like the start of a school year), surfaced on the `/spelling-lists/` index. It is simply an existing, `published`, genuinely-useful `WordList` that an editor flags for prominent placement (a lightweight `featured: boolean` or a small site-level config pointing at one `id` — to be decided at implementation time, but in either case it references an *existing* list rather than creating new content). The criterion for selection is identical to the criterion for any list's existence: it must provide real educational value and a real reason to be highlighted right now (e.g., "back to school" timing pairing naturally with a `grade-level` list) — never an arbitrary rotation for its own sake.

---

## 7. Launch Content Recommendation

**Six lists is too thin to feel like a real product** — a visitor browsing `/spelling-lists/grade-level/` and finding one entry, or `/spelling-lists/phonics/` with two, reads as "early beta," not "a place with real content." At the same time, padding any family with near-duplicate lists *is* filler and actively hurts topical authority.

**Recommended realistic minimum: ~16 lists**, sized so every launched family demonstrates real *structure* (sequencing, source-tiering, skill progression) — not just existence — while every list remains independently justifiable as real educational content:

**Sight Words — Dolch progression (4 lists)**
`dolch-pre-primer` → `dolch-primer` → `dolch-first-grade` → `dolch-second-grade`
Dolch's own structure is a graded sequence; four consecutive tiers lets `nextLists`/`prerequisiteLists` form a real chain and lets `achievementGroup: "dolch-mastery"` mean something (a multi-step badge). Each tier is distinct, externally-canonical, individually-searched — zero overlap, zero filler.

**Phonics — one complete sub-branch plus a bridging pattern (4 lists)**
`short-vowels-cvc-words` → `silent-e-long-a` → `silent-e-long-i` → `vowel-teams-ai-ay`
`short-vowels → silent-e` is the single most pedagogically fundamental progression in early phonics. Splitting silent-e by vowel sound keeps each list focused enough to practice in one sitting and shows the phonics hierarchy has real depth, not a single-item stub. Forms a natural `nextLists` chain end-to-end.

**Grade-Level — one real sequence within one grade (4 lists)**
`grade-2-list-01`/`2nd-grade-everyday-words`, `grade-2-list-02`/`2nd-grade-compound-words`, `grade-2-list-03`/`2nd-grade-contractions`, `grade-2-list-04`/`2nd-grade-long-vowel-words`
A parent searching "2nd grade spelling list" should land somewhere that feels usable *all year*, not a stub. Four lists demonstrates the `id`/`order` sequencing convention, gives `nextLists` a real chain, and makes the category landing page show a genuine mini-curriculum. Each targets a distinct, real linguistic skill — no two are reshuffled versions of each other.

**Spelling Bee / Challenge (2 lists)**
`tier-1-roots-and-patterns` → `tier-2-greek-latin-roots`
Enough to demonstrate the tiering model, the `nextLists` chain between tiers, and the `masteryThreshold: 100` convention — without overcommitting to a full competitive curriculum at launch.

**Sum: 4 + 4 + 4 + 2 = 14**, plus the existing two generally-useful fixtures (`Grade 2 Essentials` and the current `Sight Words`/`Long Vowel Patterns` content) reshaped to slot directly into the sequences above — e.g. the current `sightWords` fixture substantially overlaps with what a `dolch-primer`-style list should be — bringing the realistic total to **~16 lists**, all serving distinct, real purposes, with zero filler.

This sizing means: every launched category has a browsable, multi-item section that feels intentional and complete (not a stub); every list is independently justifiable on educational merit; and the progression/mastery features (§6) have real chains and real groups to demonstrate from day one.

---

## 8. Categories Intentionally Postponed
- **Theme lists** (`theme/*`) — reserved in taxonomy/schema, zero seeded; revisit only with a clear non-generic angle
- **Seasonal lists** (`seasonal/*`) — same reasoning; highest filler risk, lowest topical-authority payoff
- **Fry sight-word lists** — Dolch is seeded first (manageable size, naturally demonstrates progression); Fry's larger banded structure is a bigger commitment, best done as one deliberate batch later
- **"Week N" curriculum framing** — may layer onto `grade-level` later as an optional alignment field; never baked into core identity
- **Daily/rotating "List of the Day," streaks, XP/points** — explicitly and permanently rejected (§6.6); replaced by the manually-curated, infrequently-changing Featured List

---

## 9. Long-Term Expansion Strategy
Scaling to hundreds/thousands of lists remains purely additive:

- **Adding a list** = one content entry (frontmatter + words) with a unique `id`/`slug`, `status: 'draft'` while in progress, flipped to `'published'` only when genuinely complete and non-thin. Routing, index pages, related/next/prerequisite rendering, and tag/skill browse pages all generate from metadata — zero per-list code.
- **Tuning SEO** = edit `slug`/`title`/`description`/`shortAnswer` only — `id` (the permanent join key, §5.1) means this never touches progress data or any relationship graph.
- **Adding a new sub-grouping** (a new Dolch tier, a new phonics pattern) = no schema change — a new `canonicalSource.tier` value, a new `skillTags` vocabulary entry, and an update to the neighboring lists' `nextLists`/`prerequisiteLists`.
- **Adding a genuinely new top-level family** = the one case that *does* touch code (new `Category` enum value + landing page template) — by design rare, preserving URL/taxonomy stability.
- **Adding a new badge type** (§6.3) = author a new rule against existing fields (`achievementGroup`, `skillTags`, `difficulty`, `masteryThreshold`) — never a per-list or per-badge special case in code.
- **Cross-cutting browse surfaces** (`/skills/{tag}/`, `/by-difficulty/{level}/`, future `/achievements/{group}/`) = pure aggregation views/templates over existing frontmatter — no new content fields ever required.
- **Migration path for content storage**: today's fixtures (`sampleLists.ts`) can become Markdown/MDX files (or a JSON/YAML data directory) matching this exact schema without changing `src/types/spelling.ts` — `getStaticPaths()` simply reads from a new source while every `id`-keyed reference and type contract remains valid.

---

## Pre-Implementation Checklist
Before any `WordList` content is authored or `src/types/spelling.ts` is modified, validate the design against these:
1. Walk through all ~16 seed lists from §7 and confirm each one's full frontmatter (`id`, `slug`, `category`, `skillTags`, `difficulty`, `order`, `estimatedDurationMinutes`, `status`, `masteryThreshold`, `achievementGroup`, `relatedLists`, `prerequisiteLists`, `nextLists`) resolves unambiguously, with real, non-circular, non-dangling chains in both directions (`nextLists` ↔ `prerequisiteLists`).
2. Confirm the existing 4 fixtures map onto the extended schema with only additive/renamed fields (`difficulty` → named enum, `sourceType: 'generated'` retired) — audit all consumers (`stateMachine.ts`, `play.astro`, `index.astro`) for assumptions about the old shape.
3. Spot-check the id/slug split end-to-end: rename one list's `slug`, confirm nothing referencing it by `id` (progress, `relatedLists`, `nextLists`, `prerequisiteLists`, `achievementGroup`) breaks.
4. Walk through each future feature in §6 (Continue Learning, Progress Tracking, Achievements, Certificates, Recently Practiced, Featured List) and confirm each can be fully implemented later by reading only localStorage + existing/proposed frontmatter — no feature should require a new schema field beyond what's listed here.
5. Confirm `masteryThreshold` defaults per family (e.g. 90 standard, 100 `challenge`) before content authoring begins.
