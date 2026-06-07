# Spelling Library Expansion: Roadmap & Design Plan

## Context
The homepage is stable; the next phase is growing the Library from its current 8 lists (7 published, 1 draft) into a genuinely useful resource for students, parents, teachers, and homeschoolers — without sliding into SEO filler or AI-mass-produced junk. `docs/CONTENT_ARCHITECTURE.md` already lays a strong foundation (taxonomy families, id/slug split, mastery, skill tags, progression fields), but only ~2 lists exist per category, so no family yet *demonstrates* real structure. This plan is a **design document**, not an authoring task: it proposes the taxonomy, progression model, and a curated first-50 roadmap so that when content gets written, it slots into a coherent system rather than being invented ad hoc per list. No code or content changes are made as part of this plan — the output is the roadmap itself (to be saved as a doc in the repo, e.g. `docs/LIBRARY_ROADMAP.md`, once approved).

---

## 1. Critique of the Current Library

**Strengths to preserve:**
- The schema (`id`/`slug` split, `prerequisiteLists`/`nextLists`/`relatedLists`, `skillTags`, `masteryThreshold`, `status: draft|published|archived`) is already expressive enough to support everything below with zero code changes.
- The two existing chains (Dolch sight words, short-vowels → silent-e phonics, grade-2 sequence, challenge tiers) prove the progression model works in miniature.
- `theme`/`seasonal` were correctly reserved-but-zero-seeded — the architecture doc already names these as the highest filler risk.

**Gaps:**
- **Too thin to read as "real."** 2 lists per category means no category page demonstrates a sequence — a visitor sees a stub, not a library.
- **No cross-grade sight-word ladder.** Dolch stops at Primer; there's no first/second-grade Dolch tier, so the chain dead-ends exactly where a returning student would want to continue.
- **Phonics has only one full pedigree** (short vowels → silent-e long-a) and it also dead-ends; no vowel teams, digraphs, blends, or r-controlled vowels exist yet, despite being named in the taxonomy (§2.4 of the architecture doc).
- **Grade-level coverage is one grade deep** (grade 2 only, 2 lists) — no K, 1, 3+ entry points, which is where most parent search traffic will land ("1st grade spelling words", "4th grade spelling list").
- **Challenge branch is narrow and partly draft** — fine for now (it's explicitly a smaller commitment), but it shouldn't expand faster than the core ladders.
- **`achievementGroup` is unused** in current content — an easy win to start wiring now so that future badges have real groups to point at.

---

## 2. Recommended Taxonomy

Keep the **six existing top-level families** — they're well-justified and changing top-level categories is the one taxonomy move that touches code/URLs. Do **not** add new top-level families. Instead, deepen the existing ones:

1. **`grade-level`** — the primary entry point for parent/teacher search ("3rd grade spelling words"). Should eventually span K–6 with multiple lists per grade forming a real in-grade sequence.
2. **`sight-words`** — organize by *named external source* (Dolch, then later Fry), each with its own internal tier ladder. This is the strongest AEO/GEO territory because the names ("Dolch Primer," "Fry First 100") are searched verbatim.
3. **`phonics`** — organize by the skill hierarchy already documented in §2.4 of the architecture doc (short vowels → long vowels/silent-e/vowel teams → digraphs → blends → r-controlled vowels → diphthongs → word patterns). This *is* the taxonomy and the `skillTags` vocabulary simultaneously — keep them mirrored.
4. **`challenge`** — named difficulty tiers, not grade-bound, oriented at competition prep (Scripps-style). Grow slowly and deliberately; richer per-word data (etymology, hints) makes each one expensive to do well, which is itself a natural rate-limiter against filler.
5. **`theme`** — stay zero-seeded until there's a non-generic angle (e.g., lists tied to actual classroom units — "the water cycle," "the American Revolution" — not "10 animal words"). Don't seed this in the first 50.
6. **`seasonal`** — stay zero-seeded. Highest filler risk, lowest payoff. Skip entirely in this roadmap horizon.

**No additional top-level categories are justified right now.** Candidates that *might* sound appealing but should be rejected:
- "Vocabulary" / "Word of the Day" — overlaps `theme`/gamification, rejected by the architecture's own philosophy (§6.6).
- "ESL/ELL" or "Dyslexia-friendly" — genuinely valuable *angles*, but they're better expressed as `tags`/`skillTags` cutting across existing categories (so a phonics list can be tagged for ELL relevance) than as a structurally separate silo that would fragment the taxonomy and create duplicate content.
- "Spelling Bee Words by Year" — a SEO trap; reads as filler/curriculum-calendar commitment the architecture explicitly avoids (§2.2).

---

## 3. Recommended Progression Model

Two complementary structures, both already supported by the schema:

**A. In-family ladders (primary, linear progression)**
Each family should have at least one complete, end-to-end chain using `prerequisiteLists`/`nextLists`:
- *Sight words:* `dolch-pre-primer → dolch-primer → dolch-first-grade → dolch-second-grade → dolch-third-grade` (Dolch's own structure does the design work for us — five canonical tiers).
- *Phonics:* `short-vowels-cvc → silent-e (long a/i/o) → vowel teams (ai/ay, ee/ea, oa/ow) → digraphs → blends → r-controlled vowels → diphthongs`. This mirrors §2.4 directly — the taxonomy tree *is* the learning path.
- *Grade-level:* within each grade, 3–4 lists forming a "what you'd cover this year" mini-curriculum (e.g., grade 3: everyday words → compound words/contractions → vowel-team words → multisyllable words), each grade's final list pointing toward next grade's first list (a soft cross-grade bridge via `relatedLists`, not a hard `nextLists` — grades aren't strictly linear for an individual student).
- *Challenge:* tier ladder (`tier-1 → tier-2 → tier-3…`), each demanding `masteryThreshold: 100`.

**B. Cross-cutting bridges (secondary, lateral discovery)**
- `relatedLists` connects topically-similar lists *across* families (e.g., a `grade-2` list about long vowels related to the `phonics/silent-e` list covering the same pattern). This is what makes "Library feels like one coherent thing" rather than four silos.
- `achievementGroup` ties a ladder together for badge purposes (`"dolch-mastery"`, `"phonics-long-vowels"`, `"grade-3-complete"`) — start tagging these now even though badges aren't built, so the data exists when they are.
- `skillTags` should be assigned consistently using the phonics hierarchy as the controlled vocabulary (already true for phonics lists; extend the same tags onto grade-level/challenge lists that happen to cover the same patterns — e.g., a grade-3 list full of compound words should carry `compound-words`, and if it leans on silent-e words, also `silent-e`). This is what makes a future `/skills/{tag}/` cross-browse page valuable rather than sparse.

**Mastery thresholds:** keep the existing convention — 90% standard, 100% for `challenge`. No need for grade-based variation; it adds complexity without pedagogical payoff.

---

## 4. Proposed First-50 List Roadmap

Organized by category, building outward from what already exists. Counts below are *additions* unless marked "(existing)".

### Sight Words — 9 lists total (2 existing + 7 new) → complete Dolch K–3 ladder
- *(existing)* `dolch-pre-primer`, `dolch-primer`
- **New:** `dolch-first-grade`, `dolch-second-grade`, `dolch-third-grade`, `dolch-nouns` (Dolch's well-known noun supplement — a named, searched sub-list), plus 2 more banded splits if any tier proves too large for one sitting (e.g., split first-grade Dolch into two ~15-word sessions if the canonical list is long)
- *Why:* Dolch is externally canonical, individually searched by name, and its own structure does the sequencing work for us. Completing K–3 gives the ladder a real destination instead of dead-ending at Primer. Defer Fry entirely — it's a second, larger commitment best done as one deliberate batch later (per the architecture doc's own recommendation).

### Phonics — 14 lists total (2 existing + 12 new) → walk the full skill-hierarchy tree
- *(existing)* `short-vowels-cvc-words`, `silent-e-long-a`
- **New, continuing the silent-e branch:** `silent-e-long-i`, `silent-e-long-o`, `silent-e-long-u`
- **New, vowel teams:** `vowel-teams-ai-ay`, `vowel-teams-ee-ea`, `vowel-teams-oa-ow`
- **New, digraphs:** `digraphs-ch-sh`, `digraphs-th-wh`
- **New, blends:** `consonant-blends-l-r` (bl/cl/fl/gl + br/cr/dr/fr/gr/tr), `consonant-blends-s` (sc/sk/sl/sm/sn/sp/st/sw)
- **New, r-controlled & diphthongs:** `r-controlled-vowels-ar-or`, `diphthongs-oi-oy-ou-ow`
- *Why:* This single branch is the most pedagogically load-bearing part of the whole site — phonics IS how kids learn to spell in grades K–3, and the taxonomy tree in §2.4 is essentially a syllabus. Each list is narrow enough to be genuinely distinct (no two are reshuffled duplicates) and the chain end-to-end gives `nextLists` real teeth.

### Grade-Level — 16 lists total (2 existing + 14 new) → K, 1, 2 (complete), 3, 4 entry points
- *(existing, grade 2)* `2nd-grade-everyday-words`, `2nd-grade-compound-words`
- **New, grade 2 (complete the mini-curriculum, +2):** `2nd-grade-contractions`, `2nd-grade-long-vowel-words`
- **New, grade K (3 lists):** `kindergarten-cvc-words`, `kindergarten-color-and-number-words`, `kindergarten-everyday-words`
- **New, grade 1 (3 lists):** `1st-grade-everyday-words`, `1st-grade-short-vowel-words`, `1st-grade-blends-and-digraphs`
- **New, grade 3 (3 lists):** `3rd-grade-everyday-words`, `3rd-grade-vowel-team-words`, `3rd-grade-multisyllable-words`
- **New, grade 4 (3 lists):** `4th-grade-everyday-words`, `4th-grade-prefixes-and-suffixes`, `4th-grade-commonly-misspelled-words`
- *Why:* Grade-level is the highest-traffic entry point ("3rd grade spelling words" is searched far more than "vowel teams"). Spanning K–4 with real in-grade sequences (not stubs) makes every grade landing page feel complete. Each list targets a genuinely distinct skill — names chosen to be nameable/searchable per §1 of the architecture doc, not generic filler ("List 3").

### Challenge — 4 lists total (2 existing + 2 new) → grow the tier ladder modestly
- *(existing)* `tier-1-roots-and-patterns`, `tier-2-greek-latin-roots` (currently draft — publish once content is genuinely complete)
- **New:** `tier-3-latin-derivatives`, `tier-4-advanced-etymology`
- *Why:* Challenge content is expensive to do well (etymology, hints, exemplar sentences) — deliberately the smallest branch. Four tiers is enough to make the ladder feel real without overcommitting to a full competitive curriculum prematurely.

### Theme / Seasonal — 0 lists
*Why:* Stay at zero. Nothing in the current scope justifies a non-generic angle yet (see §4 "what should NOT be added" below). Revisit only when there's a concrete classroom-unit angle worth doing properly.

**Total: 9 + 14 + 16 + 4 = 43 new/refined lists on top of the 7 published + 1 draft = ~50.** This intentionally leaves a little headroom rather than forcing exactly 50 — better to under-promise and have every single list be independently justifiable than to pad to a round number.

---

## 5. What Should NOT Be Added

- **Generic theme packs** ("10 animal words," "fruits and vegetables," "ocean words") — the textbook definition of filler; high search volume but zero differentiation from a thousand other sites, and they don't fit anyone's actual learning sequence.
- **Seasonal/holiday lists** ("Halloween spelling words," "Christmas spelling words") — same filler profile, plus they age out of relevance for 11 months a year and invite a "content calendar" mindset the architecture explicitly rejects.
- **"Week N" / curriculum-calendar lists** — implies a commitment to a specific district's pacing guide that the site doesn't (and shouldn't) make; also explicitly named as a trap in §2.2 of the architecture doc.
- **Near-duplicate grade lists** — e.g., a second "grade 3 everyday words" list that's just a reshuffle of the first. If two lists would share >50% of their words or the exact same skill focus, that's a sign to merge them, not multiply them.
- **AI-mass-produced "Top 100 commonly misspelled words for [grade]/[profession]/[state]"** style pages — exactly the kind of programmatic SEO page-farming the architecture's `sourceType: 'curated' | 'custom'` split (no `'generated'`) was designed to structurally prevent. One well-made "commonly misspelled words" list per relevant grade is fine (it's in the roadmap above); fifty variations of it is not.
- **Fry sight words (for now)** — not low-value, just a large second commitment that deserves its own deliberate batch rather than being threaded into this first wave and diluting focus on completing Dolch.
- **Any gamified surface dressed up as "content"** — "Spelling Streak Words," "Daily Challenge List," "XP Booster Pack" — these aren't lists, they're engagement mechanics wearing a list's clothing, and they're explicitly rejected by §6.6 of the architecture doc.

---

## 6. What the Homepage Should Eventually Surface

Once the library has real depth, the homepage's library-facing real estate should prioritize, in this order:

1. **Grade-level entry points** — the highest-intent, highest-volume discovery path ("I want my 3rd grader's spelling words"). A simple grade picker (K–6 chips or a grid) linking into `/spelling-lists/grade-level/` is likely the single highest-value addition.
2. **Learning paths / ladders** — once a family has a complete chain (Dolch K–3, the phonics tree), surface the *path* itself as a navigable thing ("Start the Dolch Sight Word Journey," "Explore the Phonics Skill Tree"), not just individual lists. This is where the progression metadata pays off visually.
3. **Featured List** (per §6.6 of the architecture doc) — one manually-curated, infrequently-rotated highlight, ideally timed to something real (back-to-school pairs naturally with a grade-level list; a season change *could* pair with a genuinely-good phonics list, not a seasonal-themed one). This should be a small, editorial card — not a rotating carousel.
4. **Continue Learning / Recently Practiced** (§6.1/§6.5) — localStorage-driven, personalized without accounts (see below). This is the most "alive"-feeling surface once a returning visitor has history, and it's the natural bridge from Custom Lists into the Library (§0's "cross-mode bridge" idea).

Avoid surfacing: category chip soup (more than ~6 entry points dilutes focus), anything that looks like a leaderboard/streak/XP display, or auto-rotating "list of the day" content.

---

## 7. How Progression Should Work Without Accounts

The architecture doc already specs this correctly (§6.1, §6.2, §6.5) — the relevant question is which pieces to prioritize and what the tradeoffs are:

| Mechanism | Recommendation | Tradeoff |
|---|---|---|
| **Local progress** (`ListProgress` in localStorage, keyed by `id`) | **Build first** — it's the substrate everything else reads from. | Pro: zero infra, instant, private-by-default. Con: doesn't sync across devices/browsers; a student switching from a tablet to a laptop starts over. This is an acceptable tradeoff for a no-account product — be transparent about it ("your progress is saved on this device") rather than hiding it. |
| **Mastery indicators** (`bestScore` vs `masteryThreshold`, surfaced as a checkmark/badge on list cards) | **High value, low cost** — purely a per-list visual derived from existing data. Implement early; it's the most legible "you're making progress" signal without being gamified. | Pro: meaningful (tied to actual performance, not arbitrary points). Con: none significant — just needs a clear, calm visual treatment (a checkmark, not a trophy/confetti) to stay aligned with "no gamification." |
| **Continue Learning** (`nextLists` lookup from most recent progress record) | **Build once chains exist** — needs real `nextLists` data to be useful, which is exactly what this roadmap produces. | Pro: directly actionable, feels personal. Con: only as good as the underlying chain data — a half-finished ladder produces awkward or empty recommendations, so sequence the data work (this roadmap) before the feature work. |
| **Recently Practiced** | **Pairs naturally with Continue Learning** — same data source, complementary framing ("where you've been" vs "where to go"). Cheap to add once progress records exist. | Pro: low effort once `ListProgress` exists. Con: can feel redundant if shown right next to Continue Learning — choose one as primary on the homepage and relegate the other to a dashboard/library-index page. |
| **Cross-device sync / accounts** | **Explicitly out of scope** (per constraints) — don't build toward it. | If ever revisited, it's a major philosophical shift (the whole "no backend, no accounts" value proposition), not a minor feature add — flag it as a strategic decision, not an engineering one. |

**Sequencing recommendation:** local progress storage → mastery indicators → Continue Learning/Recently Practiced, in that order — each step is a small, additive layer on the previous one, and each requires the underlying content (real chains, real `achievementGroup`s) to already exist, which is precisely what executing this roadmap provides.

---

## 8. Phase 1 — Metadata & Progression Graph (Approved Scope)

**Goal:** the smallest set of new lists that makes the library *feel real* — complete the Dolch ladder, finish the Grade 2 sequence, open Kindergarten/Grade 1/Grade 3 entry points, and extend phonics through silent-e and the first vowel-team lists. Explicitly **not** touching: theme, seasonal, Fry, or challenge. **No word content yet — this is the relationship graph only.**

This is **16 new lists** on top of the 8 that exist (7 published + 1 draft), bringing the published library to ~24 — enough for every targeted family to show a real, walkable chain. All `id`s are new and collision-free; all cross-references resolve to either an existing list or another list in this batch (no dangling refs). `masteryThreshold` is 90 for every list below (none of this batch is `challenge`).

### 9.1 Sight Words — complete the Dolch ladder (4 new → 7-list chain)
Existing: `dolch-pre-primer` → `dolch-primer`. This batch extends it to a full K–3-plus-nouns chain, giving `achievementGroup: "dolch-mastery"` real, multi-step meaning for the first time.

| # | id / slug | title | skillTags | prerequisiteLists | nextLists | relatedLists | achievementGroup |
|---|---|---|---|---|---|---|---|
| 1 | `dolch-first-grade` | Dolch First Grade Sight Words | `sight-words`, `high-frequency` | `[dolch-primer]` | `[dolch-second-grade]` | `[dolch-primer, dolch-second-grade]` | `dolch-mastery` |
| 2 | `dolch-second-grade` | Dolch Second Grade Sight Words | `sight-words`, `high-frequency` | `[dolch-first-grade]` | `[dolch-third-grade]` | `[dolch-first-grade, dolch-third-grade]` | `dolch-mastery` |
| 3 | `dolch-third-grade` | Dolch Third Grade Sight Words | `sight-words`, `high-frequency` | `[dolch-second-grade]` | `[dolch-nouns]` | `[dolch-second-grade, dolch-nouns]` | `dolch-mastery` |
| 4 | `dolch-nouns` | Dolch Noun Words | `sight-words`, `high-frequency`, `nouns` | `[dolch-third-grade]` | `[]` | `[dolch-third-grade]` | `dolch-mastery` |

*Required update to existing `dolch-primer`:* set `nextLists: [dolch-first-grade]` and add `dolch-first-grade` to `relatedLists` (currently dead-ends at Primer).

### 9.2 Grade-Level — finish Grade 2, open K / Grade 1 / Grade 3 (8 new)

**Grade 2 — completes a 4-list mini-curriculum (2 new):**

| id / slug | title | grade | skillTags | prerequisiteLists | nextLists | relatedLists | achievementGroup |
|---|---|---|---|---|---|---|---|
| `grade-2-list-03` / `2nd-grade-contractions` | 2nd Grade Spelling List 3: Contractions | 2 | `grade-2`, `contractions` | `[grade-2-list-02]` | `[grade-2-list-04]` | `[grade-2-list-02, grade-2-list-04]` | `grade-2-complete` |
| `grade-2-list-04` / `2nd-grade-long-vowel-words` | 2nd Grade Spelling List 4: Long Vowel Words | 2 | `grade-2`, `long-vowels`, `silent-e` | `[grade-2-list-03]` | `[]` | `[grade-2-list-03, silent-e-long-a]` | `grade-2-complete` |

*Required updates to existing Grade 2 lists:* `grade-2-list-02.nextLists` → `[grade-2-list-03]` (currently `[]`); both `grade-2-list-01` and `grade-2-list-02` gain `achievementGroup: "grade-2-complete"` retroactively so the group spans the full 4-list sequence.

**Kindergarten — new entry point, 2-list starter sequence (not yet a complete "ladder," so no `achievementGroup` until it's deepened in a later phase):**

| id / slug | title | skillTags | prerequisiteLists | nextLists | relatedLists |
|---|---|---|---|---|---|
| `kindergarten-list-01` / `kindergarten-cvc-words` | Kindergarten Spelling List 1: CVC Words | `kindergarten`, `short-vowels`, `cvc` | `[]` | `[kindergarten-list-02]` | `[kindergarten-list-02, short-vowels-cvc-words]` |
| `kindergarten-list-02` / `kindergarten-everyday-words` | Kindergarten Spelling List 2: Everyday Words | `kindergarten`, `high-frequency` | `[kindergarten-list-01]` | `[]` | `[kindergarten-list-01, dolch-pre-primer]` |

**Grade 1 — new entry point, 2-list starter sequence:**

| id / slug | title | skillTags | prerequisiteLists | nextLists | relatedLists |
|---|---|---|---|---|---|
| `grade-1-list-01` / `1st-grade-everyday-words` | 1st Grade Spelling List 1: Everyday Words | `grade-1`, `high-frequency` | `[]` | `[grade-1-list-02]` | `[grade-1-list-02, dolch-primer]` |
| `grade-1-list-02` / `1st-grade-short-vowel-words` | 1st Grade Spelling List 2: Short Vowel Words | `grade-1`, `short-vowels`, `cvc` | `[grade-1-list-01]` | `[]` | `[grade-1-list-01, short-vowels-cvc-words]` |

**Grade 3 — new entry point, 2-list starter sequence:**

| id / slug | title | skillTags | prerequisiteLists | nextLists | relatedLists |
|---|---|---|---|---|---|
| `grade-3-list-01` / `3rd-grade-everyday-words` | 3rd Grade Spelling List 1: Everyday Words | `grade-3`, `high-frequency` | `[]` | `[grade-3-list-02]` | `[grade-3-list-02, grade-2-list-01]` |
| `grade-3-list-02` / `3rd-grade-vowel-team-words` | 3rd Grade Spelling List 2: Vowel Team Words | `grade-3`, `vowel-teams`, `long-vowels` | `[grade-3-list-01]` | `[]` | `[grade-3-list-01, vowel-teams-ai-ay, vowel-teams-ee-ea]` |

*Note:* K/1/3 deliberately get **no `achievementGroup`** yet — a 2-list "sequence" doesn't make a meaningful badge group. Assign one (e.g. `grade-1-complete`) once each grade is deepened to 3-4 lists in a later phase.

### 9.3 Phonics — extend through silent-e and into vowel teams (4 new → continues the existing chain to 6 links)
Existing chain: `short-vowels-cvc-words` → `silent-e-long-a` (currently dead-ends). This batch continues it through the rest of the silent-e family and bridges into vowel teams — directly mirroring the §2.4 skill-hierarchy tree.

| id / slug | title | skillTags | prerequisiteLists | nextLists | relatedLists | achievementGroup |
|---|---|---|---|---|---|---|---|
| `silent-e-long-i` | Silent E: Long I Words | `silent-e`, `long-vowels`, `long-i` | `[silent-e-long-a]` | `[silent-e-long-o]` | `[silent-e-long-a, silent-e-long-o]` | `phonics-silent-e` |
| `silent-e-long-o` | Silent E: Long O Words | `silent-e`, `long-vowels`, `long-o` | `[silent-e-long-i]` | `[vowel-teams-ai-ay]` | `[silent-e-long-i, vowel-teams-ai-ay]` | `phonics-silent-e` |
| `vowel-teams-ai-ay` | Vowel Teams: ai and ay Words | `vowel-teams`, `long-vowels`, `long-a`, `word-patterns` | `[silent-e-long-o]` | `[vowel-teams-ee-ea]` | `[silent-e-long-a, vowel-teams-ee-ea]` | `phonics-vowel-teams` |
| `vowel-teams-ee-ea` | Vowel Teams: ee and ea Words | `vowel-teams`, `long-vowels`, `long-e`, `word-patterns` | `[vowel-teams-ai-ay]` | `[]` | `[vowel-teams-ai-ay, grade-3-list-02]` | `phonics-vowel-teams` |

*Required update to existing `silent-e-long-a`:* set `nextLists: [silent-e-long-i]`, add `silent-e-long-i` to `relatedLists`, and add `achievementGroup: "phonics-silent-e"` (currently has none — group needs to span all three silent-e lists to mean anything).

### 9.4 Phase 1 summary
- **16 new lists**, 0 word content authored yet — pure metadata/relationship design.
- **3 required edits to existing lists** (`dolch-primer`, `grade-2-list-02`, `silent-e-long-a` `nextLists`/`relatedLists`/`achievementGroup`) to close gaps the new lists create — call these out explicitly when authoring begins so no chain is left half-wired.
- **Three `achievementGroup`s now span complete, meaningful sequences**: `dolch-mastery` (7 lists), `grade-2-complete` (4 lists), `phonics-silent-e` (3 lists) + `phonics-vowel-teams` (2 lists, will extend in a later phase).
- **No dangling or circular references** — every `prerequisiteLists`/`nextLists`/`relatedLists` entry resolves to a list that exists today or is defined in this same batch.
- **Recommended authoring order** (so chains are never half-wired in published state): (1) Dolch first-grade → nouns, since it only depends on already-published `dolch-primer`; (2) phonics silent-e-long-i/long-o → vowel-teams-ai-ay/ee-ea, since it only depends on already-published `silent-e-long-a`; (3) Grade 2 list-03/04; (4) K, Grade 1, Grade 3 starters (these have no prerequisites, so they can be done in any order, but should go last since they're net-new entry points rather than chain completions).

---

## 9. Risks and Opportunities

**Risks**
- **Sequencing risk:** if list-authoring outpaces the metadata discipline (every new list needs correct `prerequisiteLists`/`nextLists`/`skillTags`/`achievementGroup`), chains will end up dangling or circular — exactly what the architecture doc's pre-implementation checklist (§ "Pre-Implementation Checklist," item 1 and 3) warns against. Mitigate by authoring in ladder order (finish a chain before starting the next) and spot-checking bidirectional links as each list is published.
- **Grade-level breadth risk:** spanning K–4 (vs. deepening grade 2 alone) is more work up front; if under-resourced, a half-seeded K–4 (1 list per grade) would look worse than a deep grade 2 (4 lists) + grade 3 (4 lists). If forced to choose, prioritize *depth in fewer grades* over *breadth across many* — a thin grade page is worse than an absent one (it can stay unlinked/`draft` until ready).
- **Phonics complexity risk:** the skill-hierarchy tree (§2.4) is large; trying to cover all of it at once in the "first 50" would crowd out grade-level and sight-words. This plan deliberately caps phonics at one well-sequenced branch (silent-e → vowel teams → digraphs → blends → r-controlled → diphthongs) rather than going deep on every sub-branch simultaneously.

**Opportunities**
- **The Dolch ladder is a near-zero-risk win** — externally canonical, individually searched, structurally pre-sequenced by Dolch itself. Completing it should be the first thing tackled; it demonstrates the whole progression system end-to-end with minimal design judgment calls.
- **`achievementGroup` and `skillTags` are "free" if assigned consistently now** — every list authored against this roadmap should get correct values for both, even though badges/skill-browse pages aren't built yet. Retrofitting fifty lists later is far more expensive than doing it right the first time.
- **The cross-mode bridge (§0 of the architecture doc)** is under-exploited today — once the Library has real depth, surfacing "Looking for more practice? Try [related Library list]" after a Custom List test becomes genuinely valuable rather than aspirational. This roadmap is what makes that bridge meaningful instead of pointing into an empty room.
