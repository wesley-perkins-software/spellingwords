# Editorial Completion Checklist

## Context

This is the master tracking document for the Editorial Completion project: writing hand-authored `readinessSignals` and `faq` content (per `docs/EDITORIAL_SYSTEM.md`) across every list in the `spelling-lists` content collection, and evaluating the existing `shortAnswer` field list-by-list as we go. It is scaffolded for the **entire 135-list library** even though work proceeds one archetype at a time — the intent is that this project can pause for months and resume without anyone needing to reconstruct where it left off.

**How to use this doc:**
- Update it every time a list's `readinessSignals`/`faq` is written — not only at PR boundaries.
- Status symbols: `✅` done · `⬜` not started. Aggregate fractions/percentages live only in the summary tables below, not per row.
- `phonics/short-vowels-cvc-words.md` has `status: archived` (superseded by the five separate short-vowel lists) and never renders a page — it is excluded from every count in this document and marked `N/A` in its row rather than `⬜`.
- `phonics/silent-e-long-e.md` is likewise `status: archived` (merged into the Silent E family overview on the Skills Hub per `docs/architecture/SKILLS_ARCHITECTURE.md` §5; its former URL permanently redirects) and never renders a page — excluded from every count here the same way, marked `N/A`.
- Archetype numbers refer to the 10 archetypes defined in `docs/EDITORIAL_SYSTEM.md`. For `phonics/` and `high-frequency-words/`, every list shares one archetype (3 and 5 respectively), so the per-list tables for those folders omit a redundant Archetype column. For `grade-level/` and `challenge/`, archetype varies row by row; the assignments below are a **first-pass, best-guess classification made from filenames/content during checklist scaffolding, not from reading every list's full body** — treat any row marked *(provisional)* as needing a quick confirm (not a rewrite) when that archetype's rollout actually reaches it.
- **Before marking any batch's rows `✅`, run the Batch QA checklist in `docs/EDITORIAL_SYSTEM.md`** (duplicate readiness/FAQ checks, resolving every prerequisite/next/related ID, confirming no archived list is referenced, and confirming readiness signals describe learner ability rather than curriculum completion). It exists because every item on it was a real defect caught in the first phonics batch, not a hypothetical.

---

## Progress summary by archetype

| # | Archetype | Total | Complete | Remaining |
|---|---|---:|---:|---:|
| 1 | Beginning vocabulary | 10 | 10 | 0 |
| 2 | Grade-level vocabulary | 20 | 20 | 0 |
| 3 | Phonics pattern pages | 52 | 52 | 0 |
| 4 | Spelling rule pages | 6 | 6 | 0 |
| 5 | High-frequency-word pages | 24 | 24 | 0 |
| 6 | Prefix pages | 4 | 4 | 0 |
| 7 | Suffix pages | 5 | 5 | 0 |
| 8 | Root-word pages | 4 | 4 | 0 |
| 9 | Homophone and confusable-word pages | 4 | 4 | 0 |
| 10 | Morphology pages | 4 | 4 | 0 |
| — | **Total (excludes 2 archived phonics lists)** | **133** | **133** | **0** |

## Progress summary by category folder

| Category | Total | Complete | Remaining | Notes |
|---|---:|---:|---:|---|
| phonics | 52 | 52 | 0 | Excludes `short-vowels-cvc-words` and `silent-e-long-e` (both archived, not counted) |
| high-frequency-words | 24 | 24 | 0 | Dolch service-word sequence and supplemental Dolch nouns complete |
| grade-level | 54 | 54 | 0 | Grade-level vocabulary, beginning vocabulary, morphology-domain grade-level pages, and homophone/commonly-confused pages are complete |
| challenge | 3 | 3 | 0 | Root-word challenge lists and academic vocabulary challenge page complete; `tier-2-greek-latin-roots.md` frontmatter category mismatch remains a pre-existing content-model note |
| **Total** | **133** | **133** | **0** | Editorial completion project complete across every published list page |

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
| silent-e-long-e | N/A | N/A | N/A | `status: archived` — merged into the Silent E family overview on the Skills Hub, no longer a standalone page; excluded from scope |
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

## Per-list tracking — high-frequency-words (archetype 5: High-frequency-word pages)

| List (file) | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|
| dolch-pre-primer-a | ✅ | ✅ | reviewed | |
| dolch-pre-primer-b | ✅ | ✅ | reviewed | |
| dolch-pre-primer-c | ✅ | ✅ | reviewed | |
| dolch-primer-a | ✅ | ✅ | reviewed | |
| dolch-primer-b | ✅ | ✅ | reviewed | |
| dolch-primer-c | ✅ | ✅ | reviewed | |
| dolch-primer-d | ✅ | ✅ | reviewed | |
| dolch-first-grade-a | ✅ | ✅ | reviewed | |
| dolch-first-grade-b | ✅ | ✅ | reviewed | |
| dolch-first-grade-c | ✅ | ✅ | reviewed | |
| dolch-second-grade-a | ✅ | ✅ | reviewed | |
| dolch-second-grade-b | ✅ | ✅ | reviewed | |
| dolch-second-grade-c | ✅ | ✅ | reviewed | |
| dolch-second-grade-d | ✅ | ✅ | reviewed | |
| dolch-third-grade-a | ✅ | ✅ | reviewed | |
| dolch-third-grade-b | ✅ | ✅ | reviewed | |
| dolch-third-grade-c | ✅ | ✅ | reviewed | |
| dolch-nouns-a | ✅ | ✅ | reviewed | |
| dolch-nouns-b | ✅ | ✅ | reviewed | |
| dolch-nouns-c | ✅ | ✅ | reviewed | |
| dolch-nouns-d | ✅ | ✅ | reviewed | |
| dolch-nouns-e | ✅ | ✅ | reviewed | |
| dolch-nouns-f | ✅ | ✅ | reviewed | |
| dolch-nouns-g | ✅ | ✅ | reviewed | |

### High-Frequency Words completion notes

- Completed all 24 published high-frequency-word list pages: Dolch Pre-Primer, Primer, First Grade, Second Grade, Third Grade, and supplemental Dolch Nouns.
- Reviewed `shortAnswer` across the high-frequency-word batch and left the existing concise collection summaries in place; no page-architecture changes were made.
- Relationship QA confirmed every high-frequency-word `prerequisiteLists`, `nextLists`, and `relatedLists` ID resolves to a published list. The core Dolch service-word sequence now progresses from Pre-Primer through Third Grade across tier boundaries, while Dolch Nouns remains a separate supplemental sequence.
- Duplicate QA found and resolved repeated readiness/FAQ language during the batch pass; final exact-duplicate checks across high-frequency-word readiness signals, FAQ questions, and FAQ answers returned zero duplicates.

---

## Per-list tracking — grade-level (mixed archetypes)

### Kindergarten

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| kindergarten-first-words | 1 | ✅ | ✅ | — | Pre-existing reference example; the only list in the library done before this project started |
| kindergarten-animal-words | 1 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| kindergarten-body-words | 1 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| kindergarten-describing-words | 1 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| kindergarten-family-words | 1 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| kindergarten-feelings-words | 1 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| kindergarten-food-words | 1 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| kindergarten-number-color-words | 1 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| kindergarten-school-words | 1 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| kindergarten-shape-words | 1 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |

### 1st grade

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| 1st-grade-action-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 1st-grade-describing-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 1st-grade-everyday-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |

### 2nd grade

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| 2nd-grade-action-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 2nd-grade-describing-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 2nd-grade-everyday-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 2nd-grade-comparatives-er-est | 7 | ✅ | ✅ | fine as-is | |
| 2nd-grade-suffixes-ful-less | 7 | ✅ | ✅ | fine as-is | |
| 2nd-grade-regular-plurals | 7 | ✅ | ✅ | fine as-is | Confirmed as early suffix/word-formation page because plural -s/-es functions as an ending added to nouns |
| 2nd-grade-prefixes-un-re | 6 | ✅ | ✅ | fine as-is | |
| 2nd-grade-homophones | 9 | ✅ | ✅ | fine as-is | Homophone/confusable-word completion pass |
| 2nd-grade-compound-words | 10 | ✅ | ✅ | fine as-is | Confirmed as morphology because the page teaches closed compounds as two words forming one lexical unit |
| 2nd-grade-contractions | 4 | ✅ | ✅ | fine as-is | Confirmed as spelling-rule/word-formation because apostrophe placement teaches how two words contract into one spelling form |
| 2nd-grade-silent-letter-words | 4 | ✅ | ✅ | fine as-is | Confirmed as spelling-pattern/rule page for this rollout; silent letters are orthographic patterns rather than word parts |

### 3rd grade

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| 3rd-grade-describing-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 3rd-grade-everyday-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 3rd-grade-reading-writing-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 3rd-grade-changing-y-to-i | 4 | ✅ | ✅ | fine as-is | |
| 3rd-grade-doubling-final-consonants | 4 | ✅ | ✅ | fine as-is | |
| 3rd-grade-dropping-silent-e | 4 | ✅ | ✅ | fine as-is | |
| 3rd-grade-prefix-words | 6 | ✅ | ✅ | fine as-is | |
| 3rd-grade-suffix-words | 7 | ✅ | ✅ | fine as-is | |
| 3rd-grade-root-word-families | 8 | ✅ | ✅ | fine as-is | |
| 3rd-grade-homophones | 9 | ✅ | ✅ | fine as-is | Homophone/confusable-word completion pass |
| 3rd-grade-multisyllabic-words | 10 | ✅ | ✅ | fine as-is | |

### 4th grade

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| 4th-grade-community-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 4th-grade-everyday-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 4th-grade-reading-writing-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 4th-grade-advanced-prefixes | 6 | ✅ | ✅ | fine as-is | |
| 4th-grade-advanced-suffixes | 7 | ✅ | ✅ | fine as-is | |
| 4th-grade-multisyllabic-academic-words | 10 | ✅ | ✅ | fine as-is | |
| 4th-grade-commonly-confused-words | 9 | ✅ | ✅ | fine as-is | Confirmed as homophone/confusable-word archetype: same meaning-based word-choice work, including non-homophone confusables |

### 5th grade

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| 5th-grade-academic-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 5th-grade-community-civics-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 5th-grade-everyday-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 5th-grade-math-vocabulary | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 5th-grade-opinion-argument-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 5th-grade-reading-writing-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 5th-grade-science-nature-words | 2 | ✅ | ✅ | reviewed | Grade-level vocabulary rollout |
| 5th-grade-spelling-rules | 4 | ✅ | ✅ | fine as-is | |
| 5th-grade-prefix-suffix-words | 6 | ✅ | ✅ | fine as-is | Confirmed as combined prefix/suffix morphology and counted with prefix pages for checklist continuity |
| 5th-grade-multisyllabic-academic-words | 10 | ✅ | ✅ | fine as-is | |
| 5th-grade-greek-latin-word-parts | 8 | ✅ | ✅ | fine as-is | |
| 5th-grade-commonly-confused-words | 9 | ✅ | ✅ | fine as-is | Confirmed as homophone/confusable-word archetype: advanced confusables for upper-elementary writing |

---

## Per-list tracking — challenge (mixed archetypes)

| List (file) | Archetype | Readiness | FAQ | shortAnswer | Notes |
|---|---|---|---|---|---|
| academic-vocabulary | 2 | ✅ | ✅ | fine as-is | Confirmed as challenge-tier academic vocabulary, closest to grade-level vocabulary archetype |
| tier-1-roots-and-patterns | 8 | ✅ | ✅ | fine as-is | |
| tier-2-greek-latin-roots | 8 | ✅ | ✅ | fine as-is | Frontmatter `category: grade-level`, `grade: "4"` despite living in `challenge/` — pre-existing mismatch, not fixed here |

---

## Final editorial completion notes — July 2026

- Completed the final 5 published pages that remained unchecked: 2 Grade 2–3 homophone pages, 2 Grade 4–5 commonly confused word pages, and the challenge-tier academic vocabulary page.
- Authored 15 new readiness signals and 20 new FAQ entries in this final pass. Each page now has three observable learner-readiness signals and four page-specific FAQ entries.
- Confirmed the Grade 4 and Grade 5 commonly confused word pages belong in archetype 9 even though not every pair is a strict homophone; their instructional job is the same meaning-based distinction between confusable spellings in real writing.
- Confirmed `academic-vocabulary` belongs with the grade-level vocabulary archetype for editorial purposes, with challenge-tier framing because it is cross-curricular extension vocabulary rather than a new curriculum sequence.
- Whole-site QA found all 134 published pages have `readinessSignals` and `faq`; the one archived phonics overview remains excluded from counts and is not referenced by published list relationships.
- Relationship QA using the content test suite confirmed all `relatedLists`, `prerequisiteLists`, and `nextLists` references resolve to existing published lists. No relationship fixes were needed in this final pass.
- Duplicate QA found no exact duplicate readiness signals, FAQ questions, or FAQ answers across the final 5-page batch. Earlier archetype-level duplicate checks remain documented in the rollout notes above.
- Final `shortAnswer` conclusion: keep evaluation-only treatment. Across the full library, `shortAnswer` consistently works as compact collection/metadata copy; the newly authored FAQ content carries the deeper educational explanation. No list-detail architecture change is justified inside Editorial Completion.
- Final audit: the curriculum can be considered editorially complete. Future work should focus on enhancements rather than completion gaps: deciding whether to surface `shortAnswer` on detail pages, resolving the pre-existing `tier-2-greek-latin-roots.md` category/frontmatter mismatch, adding automated editorial lint rules for duplicate exact strings, and periodically refreshing examples after real classroom/user feedback.

## Grade-Level Vocabulary rollout notes — July 2026

- Completed the full Grade-Level Vocabulary archetype across 28 newly authored pages: 9 kindergarten beginning-vocabulary pages plus 19 Grade 1–5 vocabulary pages. Together with the pre-existing `kindergarten-first-words` page, archetypes 1 and 2 are now complete.
- Authored 84 new readiness signals and 112 new FAQ entries in this rollout. Each completed page now has three observable learner-readiness signals and four topic-specific FAQ entries.
- Reviewed `shortAnswer` across the completed grade-level vocabulary pages and left the existing concise summaries in place. The field continues to read as useful collection-level summary copy, but no list-detail architecture change was made.
- Editorial QA found no exact duplicate readiness signals, FAQ questions, or FAQ answers across the completed Grade-Level Vocabulary batch after authoring. Repeated educational concerns, such as using words in context and connecting spelling to writing, were intentionally handled with page-specific wording rather than copied language.
- Curriculum relationship QA found all grade-level `prerequisiteLists`, `nextLists`, and `relatedLists` IDs resolving to published lists, with no archived-list references. No relationship edits were needed in this rollout; the local vocabulary progression remains coherent from kindergarten concrete vocabulary through Grade 5 academic, content-area, literacy, argument, math, science, and civics vocabulary.
- Scope boundary confirmed: homophone and commonly-confused pages remain incomplete because they belong to the Homophone/confusable-word archetype, not this Grade-Level Vocabulary rollout. The challenge-tier `academic-vocabulary` page also remains for a later challenge/extension pass.

## shortAnswer observations (running notes, not a decision)

- **2026-07-07 (Grade-Level Vocabulary rollout)** — Reviewed `shortAnswer` for 28 newly completed grade-level vocabulary pages. The summaries consistently explain the list's scope in one sentence and do not duplicate the new FAQ bodies; they remain useful as metadata/collection copy. No new evidence supports changing list-detail architecture during this project. The strongest pattern is that grade-level vocabulary FAQs need to own the educational rationale (why the words matter for writing, reading, subject learning, or classroom independence), while `shortAnswer` should stay a compact "what this list contains" description.

- **2026-07-07 (full phonics archetype QA sign-off)** — Completed the all-phonics QA pass across 53 published phonics pages after the blend completion work. Exact-duplicate checks now report 0 duplicate readiness signals, 0 duplicate FAQ questions, and 0 duplicate FAQ answers across the archetype. The pass corrected blend-page templating residue by making the readiness, sound-out, and next-step FAQ language pattern-specific; it also disambiguated initial `st` from final `st`. Relationship checks still show every `prerequisiteLists`, `nextLists`, and `relatedLists` ID resolving to a published list, with 0 references to the archived CVC overview. Curriculum decision: keep the repeated pedagogical shape for blends, but require exact wording to name the specific cluster or position so the copy remains useful on its own. Phonics remains complete at 53/53 published pages, and the archetype can be treated as editorially complete.

- **2026-07-07** — Completed the remaining 29 published phonics blend pages (initial blends ×18, final blends ×11) with hand-authored `readinessSignals` and `faq` content, reviewed all phonics `shortAnswer` fields, and performed a full phonics relationship QA sweep. The single-skill blend lists now use an explicit instructional chain from initial blends into final blends, then onward to vowel teams, using `id` values only; no published phonics page references the archived `short-vowels-cvc-words` page. Phonics archetype is now complete: 53/53 published pages.
- **2026-07-07** — Reviewed `shortAnswer` for the 16 phonics lists completed in this batch (short vowels ×5, silent-e long vowels ×5, digraphs ×6). All 16 read as accurate, teacher-voiced, one-sentence summaries and none felt redundant with the new FAQ content — the FAQ's first question answers "why does this pattern matter," while `shortAnswer` is closer to a plain "what this list is," so they serve different purposes even sitting close together conceptually. No pattern yet suggesting `shortAnswer` needs a rewrite pass. Still not rendered anywhere on the list-detail page (only used on the `spelling-collections` template) — no page-architecture change made or proposed here; this remains an open `EDITORIAL_SYSTEM.md` "Future TODO" to revisit once more archetypes have been through this same review.
- **2026-07-07 (r-controlled + vowel-team batch)** — Reviewed `shortAnswer` for 8 additional published phonics lists: r-controlled vowels ×3 and vowel teams ×5. All 8 remain accurate one-sentence summaries of the target pattern, and none needed edits while adding readiness/FAQ. Vowel-team `shortAnswer` entries consistently name the sound and example words; r-controlled entries correctly distinguish AR, OR, and ER/IR/UR. No new evidence that `shortAnswer` should render on list-detail pages yet. Batch relationship checks found all `prerequisiteLists`, `nextLists`, and `relatedLists` references resolving to published lists; no archived references found in this batch. Duplicate checks across readiness sentences, FAQ questions, and FAQ answers found no exact duplicates.
- **2026-07-07 (refinement pass)** — Did a quality refinement of the same 16 lists after the initial batch: reworded readiness signals to read as learner-fit outcomes rather than "has completed list X" prerequisite checklists; removed a `readinessSignals`/`faq` content overlap on the TH and WH digraph pages (voiced/unvoiced and the "who" exception were each stated twice); fixed a broken content-graph reference where `c-k-ck-words` and `tch-dge-ending-words` pointed at the archived `short-vowels-cvc-words` list (dead link, silently dropped by the template); added `nextLists` from Short E/I/O/U to Long A Silent E Words, matching the existing Short A → Long A link so all five short-vowel lists now have a real "ready for next" path instead of three dead ends; added reciprocal `relatedLists` between each short-vowel list and its silent-e counterpart. `shortAnswer` conclusion unchanged by this pass.


## Morphology rollout notes — July 2026

- Completed all 23 published pages in the Morphology editorial domain: prefix, suffix, root-word, Greek/Latin word-part, prefix-plus-suffix, compound/contraction, multisyllabic, silent-letter, and spelling-rule pages.
- Authored 69 readiness signals and 92 FAQ entries across the domain, with each page receiving three observable readiness signals and four concept-specific FAQ entries.
- `shortAnswer` remains useful and accurate across the completed morphology pages, but still is not rendered on list-detail pages; continue evaluation-only treatment until page architecture changes in a future project.
- Curriculum relationships were reviewed for the completed domain. All referenced list IDs resolve to published content; no archived list references were found. The broader progression now reads as: early compounds/contractions/prefixes/suffixes → plural/comparative and silent-letter patterns → Grade 3 prefixes/suffixes/spelling rules → root families/multisyllabic words → advanced prefixes/suffixes → Latin and Greek roots → Grade 5 combined morphology and spelling rules.
- Editorial decision: regular plurals are tracked as suffix/word-formation content, contractions and silent-letter words remain in the spelling-rule bucket for this checklist, and `5th-grade-prefix-suffix-words` remains counted under prefix pages while written as a combined morphology page.
