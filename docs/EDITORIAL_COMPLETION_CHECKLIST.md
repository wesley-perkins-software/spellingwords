# Editorial Completion Checklist

## Context

This is the master tracking document for the Editorial Completion project: writing hand-authored `readinessSignals` and `faq` content (per `docs/EDITORIAL_SYSTEM.md`) across every list in the `spelling-lists` content collection, and evaluating the existing `shortAnswer` field list-by-list as we go. It is scaffolded for the **entire 135-list library** even though work proceeds one archetype at a time — the intent is that this project can pause for months and resume without anyone needing to reconstruct where it left off.

**How to use this doc:**
- Update it every time a list's `readinessSignals`/`faq` is written — not only at PR boundaries.
- Status symbols: `✅` done · `⬜` not started. Aggregate fractions/percentages live only in the summary tables below, not per row.
- `phonics/short-vowels-cvc-words.md` has `status: archived` (superseded by the five separate short-vowel lists) and never renders a page — it is excluded from every count in this document and marked `N/A` in its row rather than `⬜`.
- Archetype numbers refer to the 10 archetypes defined in `docs/EDITORIAL_SYSTEM.md`. For `phonics/` and `sight-words/`, every list shares one archetype (3 and 5 respectively), so the per-list tables for those folders omit a redundant Archetype column. For `grade-level/` and `challenge/`, archetype varies row by row; the assignments below are a **first-pass, best-guess classification made from filenames/content during checklist scaffolding, not from reading every list's full body** — treat any row marked *(provisional)* as needing a quick confirm (not a rewrite) when that archetype's rollout actually reaches it.
- **Before marking any batch's rows `✅`, run the Batch QA checklist in `docs/EDITORIAL_SYSTEM.md`** (duplicate readiness/FAQ checks, resolving every prerequisite/next/related ID, confirming no archived list is referenced, and confirming readiness signals describe learner ability rather than curriculum completion). It exists because every item on it was a real defect caught in the first phonics batch, not a hypothetical.

---

## Progress summary by archetype

| # | Archetype | Total | Complete | Remaining |
|---|---|---:|---:|---:|
| 1 | Beginning vocabulary | 10 | 1 | 9 |
| 2 | Grade-level vocabulary | 20 | 0 | 20 |
| 3 | Phonics pattern pages | 53 | 53 | 0 |
| 4 | Spelling rule pages | 6 | 0 | 6 |
| 5 | Sight-word pages | 24 | 0 | 24 |
| 6 | Prefix pages | 4 | 0 | 4 |
| 7 | Suffix pages | 5 | 0 | 5 |
| 8 | Root-word pages | 4 | 0 | 4 |
| 9 | Homophone pages | 4 | 0 | 4 |
| 10 | Morphology pages | 4 | 0 | 4 |
| — | **Total (excludes 1 archived phonics list)** | **134** | **54** | **80** |

## Progress summary by category folder

| Category | Total | Complete | Remaining | Notes |
|---|---:|---:|---:|---|
| phonics | 53 | 53 | 0 | Excludes `short-vowels-cvc-words` (archived, not counted) |
| sight-words | 24 | 0 | 24 | |
| grade-level | 54 | 1 | 53 | `kindergarten-first-words` already complete (pre-existing reference example) |
| challenge | 3 | 0 | 3 | `tier-2-greek-latin-roots.md` lives in `challenge/` but its frontmatter `category: grade-level` — a pre-existing mismatch, noted here for awareness, not fixed by this project |
| **Total** | **134** | **54** | **80** | |

---

## Per-list tracking — phonics (archetype 3: Phonics pattern pages)

### Short vowels + CVC

| List (file) | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|
| short-a-words | ✅ | ✅ | fine as-is | |
| short-e-words | ✅ | ✅ | fine as-is | |
| short-i-words | ✅ | ✅ | fine as-is | |
| short-o-words | ✅ | ✅ | fine as-is | |
| short-u-words | ✅ | ✅ | fine as-is | |
| short-vowels-cvc-words | N/A | N/A | N/A | `status: archived` — superseded by the five lists above, excluded from scope |

### Silent-e long vowels

| List (file) | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|
| silent-e-long-a | ✅ | ✅ | fine as-is | |
| silent-e-long-i | ✅ | ✅ | fine as-is | |
| silent-e-long-o | ✅ | ✅ | fine as-is | |
| silent-e-long-e | ✅ | ✅ | fine as-is | Shortest word list (7 words) — real, not padded |
| silent-e-long-u | ✅ | ✅ | fine as-is | |

### Digraphs

| List (file) | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|
| digraph-ch-words | ✅ | ✅ | fine as-is | |
| digraph-sh-words | ✅ | ✅ | fine as-is | |
| digraph-th-words | ✅ | ✅ | fine as-is | |
| digraph-wh-words | ✅ | ✅ | fine as-is | |
| c-k-ck-words | ✅ | ✅ | fine as-is | Spelling-choice pattern (which letter spells /k/), not a pure sound pattern — still filed under archetype 3 per folder/EDITORIAL_SYSTEM.md |
| tch-dge-ending-words | ✅ | ✅ | fine as-is | Same spelling-choice framing as c-k-ck; bridges toward archetype-4 territory (`grade-3-dropping-silent-e`, `grade-3-doubling-final-consonants`) — noted, not restructured |

### R-controlled vowels

| List (file) | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|
| r-controlled-ar | ✅ | ✅ | fine as-is | |
| r-controlled-er-ir-ur | ✅ | ✅ | fine as-is | |
| r-controlled-or | ✅ | ✅ | fine as-is | |

### Vowel teams

| List (file) | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|
| vowel-teams-ai-ay | ✅ | ✅ | fine as-is | |
| vowel-teams-ee-ea | ✅ | ✅ | fine as-is | |
| vowel-teams-oa-ow | ✅ | ✅ | fine as-is | |
| vowel-teams-oi-oy | ✅ | ✅ | fine as-is | |
| vowel-teams-ou-ow | ✅ | ✅ | fine as-is | |

### Initial blends

| List (file) | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|
| bl-blend-words | ✅ | ✅ | fine as-is | |
| br-blend-words | ✅ | ✅ | fine as-is | |
| cl-blend-words | ✅ | ✅ | fine as-is | |
| cr-blend-words | ✅ | ✅ | fine as-is | |
| dr-blend-words | ✅ | ✅ | fine as-is | |
| fl-blend-words | ✅ | ✅ | fine as-is | |
| fr-blend-words | ✅ | ✅ | fine as-is | |
| gl-blend-words | ✅ | ✅ | fine as-is | |
| gr-blend-words | ✅ | ✅ | fine as-is | |
| pl-blend-words | ✅ | ✅ | fine as-is | |
| pr-blend-words | ✅ | ✅ | fine as-is | |
| sl-blend-words | ✅ | ✅ | fine as-is | |
| sm-blend-words | ✅ | ✅ | fine as-is | |
| sn-blend-words | ✅ | ✅ | fine as-is | |
| sp-blend-words | ✅ | ✅ | fine as-is | |
| st-blend-words | ✅ | ✅ | fine as-is | |
| sw-blend-words | ✅ | ✅ | fine as-is | |
| tr-blend-words | ✅ | ✅ | fine as-is | |

### Final blends

| List (file) | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|
| ft-final-blend-words | ✅ | ✅ | fine as-is | |
| ld-final-blend-words | ✅ | ✅ | fine as-is | |
| lk-final-blend-words | ✅ | ✅ | fine as-is | |
| lt-final-blend-words | ✅ | ✅ | fine as-is | |
| mp-final-blend-words | ✅ | ✅ | fine as-is | |
| nd-final-blend-words | ✅ | ✅ | fine as-is | |
| ng-final-blend-words | ✅ | ✅ | fine as-is | |
| nk-final-blend-words | ✅ | ✅ | fine as-is | |
| nt-final-blend-words | ✅ | ✅ | fine as-is | |
| sk-final-blend-words | ✅ | ✅ | fine as-is | |
| st-final-blend-words | ✅ | ✅ | fine as-is | |

---

## Per-list tracking — sight-words (archetype 5: Sight-word pages)

| List (file) | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|
| dolch-pre-primer-a | ⬜ | ⬜ | not yet | |
| dolch-pre-primer-b | ⬜ | ⬜ | not yet | |
| dolch-pre-primer-c | ⬜ | ⬜ | not yet | |
| dolch-primer-a | ⬜ | ⬜ | not yet | |
| dolch-primer-b | ⬜ | ⬜ | not yet | |
| dolch-primer-c | ⬜ | ⬜ | not yet | |
| dolch-primer-d | ⬜ | ⬜ | not yet | |
| dolch-first-grade-a | ⬜ | ⬜ | not yet | |
| dolch-first-grade-b | ⬜ | ⬜ | not yet | |
| dolch-first-grade-c | ⬜ | ⬜ | not yet | |
| dolch-second-grade-a | ⬜ | ⬜ | not yet | |
| dolch-second-grade-b | ⬜ | ⬜ | not yet | |
| dolch-second-grade-c | ⬜ | ⬜ | not yet | |
| dolch-second-grade-d | ⬜ | ⬜ | not yet | |
| dolch-third-grade-a | ⬜ | ⬜ | not yet | |
| dolch-third-grade-b | ⬜ | ⬜ | not yet | |
| dolch-third-grade-c | ⬜ | ⬜ | not yet | |
| dolch-nouns-a | ⬜ | ⬜ | not yet | |
| dolch-nouns-b | ⬜ | ⬜ | not yet | |
| dolch-nouns-c | ⬜ | ⬜ | not yet | |
| dolch-nouns-d | ⬜ | ⬜ | not yet | |
| dolch-nouns-e | ⬜ | ⬜ | not yet | |
| dolch-nouns-f | ⬜ | ⬜ | not yet | |
| dolch-nouns-g | ⬜ | ⬜ | not yet | |

---

## Per-list tracking — grade-level (mixed archetypes)

### Kindergarten

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| kindergarten-first-words | 1 | ✅ | ✅ | — | Pre-existing reference example; the only list in the library done before this project started |
| kindergarten-animal-words | 1 | ⬜ | ⬜ | not yet | |
| kindergarten-body-words | 1 | ⬜ | ⬜ | not yet | |
| kindergarten-describing-words | 1 | ⬜ | ⬜ | not yet | |
| kindergarten-family-words | 1 | ⬜ | ⬜ | not yet | |
| kindergarten-feelings-words | 1 | ⬜ | ⬜ | not yet | |
| kindergarten-food-words | 1 | ⬜ | ⬜ | not yet | |
| kindergarten-number-color-words | 1 | ⬜ | ⬜ | not yet | |
| kindergarten-school-words | 1 | ⬜ | ⬜ | not yet | |
| kindergarten-shape-words | 1 | ⬜ | ⬜ | not yet | |

### 1st grade

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| 1st-grade-action-words | 2 | ⬜ | ⬜ | not yet | |
| 1st-grade-describing-words | 2 | ⬜ | ⬜ | not yet | |
| 1st-grade-everyday-words | 2 | ⬜ | ⬜ | not yet | |

### 2nd grade

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| 2nd-grade-action-words | 2 | ⬜ | ⬜ | not yet | |
| 2nd-grade-describing-words | 2 | ⬜ | ⬜ | not yet | |
| 2nd-grade-everyday-words | 2 | ⬜ | ⬜ | not yet | |
| 2nd-grade-comparatives-er-est | 7 | ⬜ | ⬜ | not yet | |
| 2nd-grade-suffixes-ful-less | 7 | ⬜ | ⬜ | not yet | |
| 2nd-grade-regular-plurals | 7 *(provisional)* | ⬜ | ⬜ | not yet | Could also be read as a spelling-rule page; confirm at rollout |
| 2nd-grade-prefixes-un-re | 6 | ⬜ | ⬜ | not yet | |
| 2nd-grade-homophones | 9 | ⬜ | ⬜ | not yet | |
| 2nd-grade-compound-words | 10 *(provisional)* | ⬜ | ⬜ | not yet | Doesn't cleanly match any of the 10 archetypes yet; morphology is closest fit |
| 2nd-grade-contractions | 4 *(provisional)* | ⬜ | ⬜ | not yet | Doesn't cleanly match any of the 10 archetypes yet; spelling-rule is closest fit |
| 2nd-grade-silent-letter-words | 4 *(provisional)* | ⬜ | ⬜ | not yet | `PHONICS_STRATEGY.md` calls this class "advanced spelling patterns" rather than phonics or a rule; closest existing archetype is spelling-rule pages — confirm at rollout |

### 3rd grade

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| 3rd-grade-describing-words | 2 | ⬜ | ⬜ | not yet | |
| 3rd-grade-everyday-words | 2 | ⬜ | ⬜ | not yet | |
| 3rd-grade-reading-writing-words | 2 | ⬜ | ⬜ | not yet | |
| 3rd-grade-changing-y-to-i | 4 | ⬜ | ⬜ | not yet | |
| 3rd-grade-doubling-final-consonants | 4 | ⬜ | ⬜ | not yet | |
| 3rd-grade-dropping-silent-e | 4 | ⬜ | ⬜ | not yet | |
| 3rd-grade-prefix-words | 6 | ⬜ | ⬜ | not yet | |
| 3rd-grade-suffix-words | 7 | ⬜ | ⬜ | not yet | |
| 3rd-grade-root-word-families | 8 | ⬜ | ⬜ | not yet | |
| 3rd-grade-homophones | 9 | ⬜ | ⬜ | not yet | |
| 3rd-grade-multisyllabic-words | 10 | ⬜ | ⬜ | not yet | |

### 4th grade

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| 4th-grade-community-words | 2 | ⬜ | ⬜ | not yet | |
| 4th-grade-everyday-words | 2 | ⬜ | ⬜ | not yet | |
| 4th-grade-reading-writing-words | 2 | ⬜ | ⬜ | not yet | |
| 4th-grade-advanced-prefixes | 6 | ⬜ | ⬜ | not yet | |
| 4th-grade-advanced-suffixes | 7 | ⬜ | ⬜ | not yet | |
| 4th-grade-multisyllabic-academic-words | 10 | ⬜ | ⬜ | not yet | |
| 4th-grade-commonly-confused-words | 9 *(provisional)* | ⬜ | ⬜ | not yet | Not strict homophones, but same "distinguish confusable words" shape — confirm at rollout |

### 5th grade

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| 5th-grade-academic-words | 2 | ⬜ | ⬜ | not yet | |
| 5th-grade-community-civics-words | 2 | ⬜ | ⬜ | not yet | |
| 5th-grade-everyday-words | 2 | ⬜ | ⬜ | not yet | |
| 5th-grade-math-vocabulary | 2 | ⬜ | ⬜ | not yet | |
| 5th-grade-opinion-argument-words | 2 | ⬜ | ⬜ | not yet | |
| 5th-grade-reading-writing-words | 2 | ⬜ | ⬜ | not yet | |
| 5th-grade-science-nature-words | 2 | ⬜ | ⬜ | not yet | |
| 5th-grade-spelling-rules | 4 | ⬜ | ⬜ | not yet | |
| 5th-grade-prefix-suffix-words | 6 *(provisional)* | ⬜ | ⬜ | not yet | Covers both prefixes and suffixes; counted under archetype 6 for totals — confirm framing at rollout |
| 5th-grade-multisyllabic-academic-words | 10 | ⬜ | ⬜ | not yet | |
| 5th-grade-greek-latin-word-parts | 8 | ⬜ | ⬜ | not yet | |
| 5th-grade-commonly-confused-words | 9 *(provisional)* | ⬜ | ⬜ | not yet | Same note as 4th-grade-commonly-confused-words |

---

## Per-list tracking — challenge (mixed archetypes)

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| academic-vocabulary | 2 *(provisional)* | ⬜ | ⬜ | not yet | Challenge-tier vocabulary, closest to grade-level vocabulary archetype |
| tier-1-roots-and-patterns | 8 *(provisional)* | ⬜ | ⬜ | not yet | |
| tier-2-greek-latin-roots | 8 *(provisional)* | ⬜ | ⬜ | not yet | Frontmatter `category: grade-level`, `grade: "4"` despite living in `challenge/` — pre-existing mismatch, not fixed here |

---

## shortAnswer observations (running notes, not a decision)

- **2026-07-07** — Completed the remaining 29 published phonics blend pages (initial blends ×18, final blends ×11) with hand-authored `readinessSignals` and `faq` content, reviewed all phonics `shortAnswer` fields, and performed a full phonics relationship QA sweep. The single-skill blend lists now use an explicit instructional chain from initial blends into final blends, then onward to vowel teams, using `id` values only; no published phonics page references the archived `short-vowels-cvc-words` page. Phonics archetype is now complete: 53/53 published pages.
- **2026-07-07** — Reviewed `shortAnswer` for the 16 phonics lists completed in this batch (short vowels ×5, silent-e long vowels ×5, digraphs ×6). All 16 read as accurate, teacher-voiced, one-sentence summaries and none felt redundant with the new FAQ content — the FAQ's first question answers "why does this pattern matter," while `shortAnswer` is closer to a plain "what this list is," so they serve different purposes even sitting close together conceptually. No pattern yet suggesting `shortAnswer` needs a rewrite pass. Still not rendered anywhere on the list-detail page (only used on the `spelling-collections` template) — no page-architecture change made or proposed here; this remains an open `EDITORIAL_SYSTEM.md` "Future TODO" to revisit once more archetypes have been through this same review.
- **2026-07-07 (r-controlled + vowel-team batch)** — Reviewed `shortAnswer` for 8 additional published phonics lists: r-controlled vowels ×3 and vowel teams ×5. All 8 remain accurate one-sentence summaries of the target pattern, and none needed edits while adding readiness/FAQ. Vowel-team `shortAnswer` entries consistently name the sound and example words; r-controlled entries correctly distinguish AR, OR, and ER/IR/UR. No new evidence that `shortAnswer` should render on list-detail pages yet. Batch relationship checks found all `prerequisiteLists`, `nextLists`, and `relatedLists` references resolving to published lists; no archived references found in this batch. Duplicate checks across readiness sentences, FAQ questions, and FAQ answers found no exact duplicates.
- **2026-07-07 (refinement pass)** — Did a quality refinement of the same 16 lists after the initial batch: reworded readiness signals to read as learner-fit outcomes rather than "has completed list X" prerequisite checklists; removed a `readinessSignals`/`faq` content overlap on the TH and WH digraph pages (voiced/unvoiced and the "who" exception were each stated twice); fixed a broken content-graph reference where `c-k-ck-words` and `tch-dge-ending-words` pointed at the archived `short-vowels-cvc-words` list (dead link, silently dropped by the template); added `nextLists` from Short E/I/O/U to Long A Silent E Words, matching the existing Short A → Long A link so all five short-vowel lists now have a real "ready for next" path instead of three dead ends; added reciprocal `relatedLists` between each short-vowel list and its silent-e counterpart. `shortAnswer` conclusion unchanged by this pass.
