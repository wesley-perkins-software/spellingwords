# Deprecated and Legacy Pages

**Repository awareness only — this is not an editorial worklist.** Nothing in this file receives a checklist, a Definition of Done, a P0–P3 priority, or a phase assignment in `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`. These pages remain in the repository and, in some cases, remain live and linked — but they are not part of the frozen canonical architecture (`docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md`, `docs/architecture/SKILLS_ARCHITECTURE.md`) and are not pages the active editorial phase intends to improve.

## Why these pages are classified legacy

`docs/architecture/PUBLIC_URL_ARCHITECTURE.md` (approved contract, route implementation pending) is the authoritative basis for this classification. It explicitly states `/spelling-lists/sight-words/` "remains a temporary browse hub only," and names **"Dolch and other legacy Sight Words"** and **"unresolved legacy phonics and focused children"** as deferred, legacy content — distinct from the K–5 grade curriculum, which it treats as real content simply awaiting a URL migration, not as legacy. That doc's language was cross-checked against live code: none of the pages below are referenced in `src/lib/content/gradeHubCards.ts` (Grade Hub cards) or `src/lib/content/spellingSkills.ts` (Skills Hub taxonomy) — the two files that implement the frozen architecture's navigation. They only cross-link to each other via `relatedLists`.

## Currently linked from live navigation

**Yes — the Dolch tier is.** `src/pages/spelling-lists/index.astro` (the main browse page) links to `/spelling-lists/sight-words`, and `src/pages/spelling-lists/sight-words.astro` prominently features and links to all 6 Dolch gateway collections and their member sets. A visitor reaches legacy Dolch content in two clicks from the canonical browse page today. The orphaned phonics "focused child" and practice pages below are **not** linked from any live navigation surface — they are reachable only by direct URL or through `relatedLists` cross-links among themselves.

## Dolch tier — gateway collections (6)

| Title | id | urlSlug | Grade | Source file |
|---|---|---|---|---|
| Dolch First Grade Sight Words | dolch-first-grade | dolch-first-grade-sight-words | 1 | `src/content/spelling-collections/dolch-first-grade.md` |
| Dolch Noun Words | dolch-nouns | dolch-noun-words | — | `src/content/spelling-collections/dolch-nouns.md` |
| Dolch Pre-Primer Sight Words | dolch-pre-primer | dolch-pre-primer-sight-words | K | `src/content/spelling-collections/dolch-pre-primer.md` |
| Dolch Primer Sight Words | dolch-primer | dolch-primer-sight-words | 1 | `src/content/spelling-collections/dolch-primer.md` |
| Dolch Second Grade Sight Words | dolch-second-grade | dolch-second-grade-sight-words | 2 | `src/content/spelling-collections/dolch-second-grade.md` |
| Dolch Third Grade Sight Words | dolch-third-grade | dolch-third-grade-sight-words | 3 | `src/content/spelling-collections/dolch-third-grade.md` |

## Dolch tier — member sets (24)

| Title | id | urlSlug | Grade | Source file |
|---|---|---|---|---|
| Dolch First Grade Sight Words — Part A | dolch-first-grade-a | dolch-first-grade-a-sight-words | 1 | `src/content/spelling-lists/sight-words/dolch-first-grade-a.md` |
| Dolch First Grade Sight Words — Part B | dolch-first-grade-b | dolch-first-grade-b-sight-words | 1 | `src/content/spelling-lists/sight-words/dolch-first-grade-b.md` |
| Dolch First Grade Sight Words — Part C | dolch-first-grade-c | dolch-first-grade-c-sight-words | 1 | `src/content/spelling-lists/sight-words/dolch-first-grade-c.md` |
| Dolch Noun Words — Part A | dolch-nouns-a | dolch-nouns-a-sight-words | — | `src/content/spelling-lists/sight-words/dolch-nouns-a.md` |
| Dolch Noun Words — Part B | dolch-nouns-b | dolch-nouns-b-sight-words | — | `src/content/spelling-lists/sight-words/dolch-nouns-b.md` |
| Dolch Noun Words — Part C | dolch-nouns-c | dolch-nouns-c-sight-words | — | `src/content/spelling-lists/sight-words/dolch-nouns-c.md` |
| Dolch Noun Words — Part D | dolch-nouns-d | dolch-nouns-d-sight-words | — | `src/content/spelling-lists/sight-words/dolch-nouns-d.md` |
| Dolch Noun Words — Part E | dolch-nouns-e | dolch-nouns-e-sight-words | — | `src/content/spelling-lists/sight-words/dolch-nouns-e.md` |
| Dolch Noun Words — Part F | dolch-nouns-f | dolch-nouns-f-sight-words | — | `src/content/spelling-lists/sight-words/dolch-nouns-f.md` |
| Dolch Noun Words — Part G | dolch-nouns-g | dolch-nouns-g-sight-words | — | `src/content/spelling-lists/sight-words/dolch-nouns-g.md` |
| Dolch Pre-Primer Sight Words — Part A | dolch-pre-primer-a | dolch-pre-primer-a-sight-words | K | `src/content/spelling-lists/sight-words/dolch-pre-primer-a.md` |
| Dolch Pre-Primer Sight Words — Part B | dolch-pre-primer-b | dolch-pre-primer-b-sight-words | K | `src/content/spelling-lists/sight-words/dolch-pre-primer-b.md` |
| Dolch Pre-Primer Sight Words — Part C | dolch-pre-primer-c | dolch-pre-primer-c-sight-words | K | `src/content/spelling-lists/sight-words/dolch-pre-primer-c.md` |
| Dolch Primer Sight Words — Part A | dolch-primer-a | dolch-primer-a-sight-words | 1 | `src/content/spelling-lists/sight-words/dolch-primer-a.md` |
| Dolch Primer Sight Words — Part B | dolch-primer-b | dolch-primer-b-sight-words | 1 | `src/content/spelling-lists/sight-words/dolch-primer-b.md` |
| Dolch Primer Sight Words — Part C | dolch-primer-c | dolch-primer-c-sight-words | 1 | `src/content/spelling-lists/sight-words/dolch-primer-c.md` |
| Dolch Primer Sight Words — Part D | dolch-primer-d | dolch-primer-d-sight-words | 1 | `src/content/spelling-lists/sight-words/dolch-primer-d.md` |
| Dolch Second Grade Sight Words — Part A | dolch-second-grade-a | dolch-second-grade-a-sight-words | 2 | `src/content/spelling-lists/sight-words/dolch-second-grade-a.md` |
| Dolch Second Grade Sight Words — Part B | dolch-second-grade-b | dolch-second-grade-b-sight-words | 2 | `src/content/spelling-lists/sight-words/dolch-second-grade-b.md` |
| Dolch Second Grade Sight Words — Part C | dolch-second-grade-c | dolch-second-grade-c-sight-words | 2 | `src/content/spelling-lists/sight-words/dolch-second-grade-c.md` |
| Dolch Second Grade Sight Words — Part D | dolch-second-grade-d | dolch-second-grade-d-sight-words | 2 | `src/content/spelling-lists/sight-words/dolch-second-grade-d.md` |
| Dolch Third Grade Sight Words — Part A | dolch-third-grade-a | dolch-third-grade-a-sight-words | 3 | `src/content/spelling-lists/sight-words/dolch-third-grade-a.md` |
| Dolch Third Grade Sight Words — Part B | dolch-third-grade-b | dolch-third-grade-b-sight-words | 3 | `src/content/spelling-lists/sight-words/dolch-third-grade-b.md` |
| Dolch Third Grade Sight Words — Part C | dolch-third-grade-c | dolch-third-grade-c-sight-words | 3 | `src/content/spelling-lists/sight-words/dolch-third-grade-c.md` |

## Standalone Heart Word pages (6)

Heart Word guidance is delivered live through the architecture-defined Common Words sets (e.g. "Kindergarten High-Frequency Words 1"); these standalone pages predate or duplicate that and are not referenced by any Grade Hub card.

| Title | id | urlSlug | Category | Grade | Source file |
|---|---|---|---|---|---|
| Heart Word Practice | grade-1-heart-word-practice | 1st-grade-heart-word-practice | phonics | 1 | `src/content/spelling-lists/phonics/grade-1-heart-word-practice.md` |
| First Grade Heart Words | grade-1-heart-words | 1st-grade-heart-words | phonics | 1 | `src/content/spelling-lists/phonics/grade-1-heart-words.md` |
| First Grade Heart Words Part 1 | grade-1-heart-words-part-1 | 1st-grade-heart-words-part-1 | sight-words | 1 | `src/content/spelling-lists/sight-words/grade-1-heart-words-part-1.md` |
| First Grade Heart Words Part 2 | grade-1-heart-words-part-2 | 1st-grade-heart-words-part-2 | sight-words | 1 | `src/content/spelling-lists/sight-words/grade-1-heart-words-part-2.md` |
| First Grade Heart Words Part 3 | grade-1-heart-words-part-3 | 1st-grade-heart-words-part-3 | sight-words | 1 | `src/content/spelling-lists/sight-words/grade-1-heart-words-part-3.md` |
| Kindergarten Heart Words | kindergarten-heart-words | kindergarten-heart-words | sight-words | K | `src/content/spelling-lists/sight-words/kindergarten-heart-words.md` |

## Orphaned 'focused child' phonics pages (31)

Individual single-blend, single-ending, or single-pattern pages beneath the Consonant Blends / Common Spelling Patterns Skill pages. Not referenced by `gradeHubCards.ts` or `spellingSkills.ts`; matches `PUBLIC_URL_ARCHITECTURE.md`'s own "unresolved legacy phonics and focused children" language.

| Title | id | urlSlug | Grade | Source file |
|---|---|---|---|---|
| BL Blend Words | bl-blend-words | bl-blend-words | 1 | `src/content/spelling-lists/phonics/bl-blend-words.md` |
| BR Blend Words | br-blend-words | br-blend-words | 1 | `src/content/spelling-lists/phonics/br-blend-words.md` |
| C, K, and CK Words | c-k-ck-words | c-k-ck-words | 1 | `src/content/spelling-lists/phonics/c-k-ck-words.md` |
| CL Blend Words | cl-blend-words | cl-blend-words | 1 | `src/content/spelling-lists/phonics/cl-blend-words.md` |
| CR Blend Words | cr-blend-words | cr-blend-words | 1 | `src/content/spelling-lists/phonics/cr-blend-words.md` |
| DR Blend Words | dr-blend-words | dr-blend-words | 1 | `src/content/spelling-lists/phonics/dr-blend-words.md` |
| FL Blend Words | fl-blend-words | fl-blend-words | 1 | `src/content/spelling-lists/phonics/fl-blend-words.md` |
| FR Blend Words | fr-blend-words | fr-blend-words | 1 | `src/content/spelling-lists/phonics/fr-blend-words.md` |
| FT Final Blend Words | ft-final-blend-words | ft-final-blend-words | 1 | `src/content/spelling-lists/phonics/ft-final-blend-words.md` |
| GL Blend Words | gl-blend-words | gl-blend-words | 1 | `src/content/spelling-lists/phonics/gl-blend-words.md` |
| GR Blend Words | gr-blend-words | gr-blend-words | 1 | `src/content/spelling-lists/phonics/gr-blend-words.md` |
| Beginning Blend Practice | grade-1-beginning-blend-practice | 1st-grade-beginning-blend-practice | 1 | `src/content/spelling-lists/phonics/grade-1-beginning-blend-practice.md` |
| Consonant Digraph Practice | grade-1-consonant-digraph-practice | 1st-grade-consonant-digraph-practice | 1 | `src/content/spelling-lists/phonics/grade-1-consonant-digraph-practice.md` |
| Ending Blend Practice | grade-1-ending-blend-practice | 1st-grade-ending-blend-practice | 1 | `src/content/spelling-lists/phonics/grade-1-ending-blend-practice.md` |
| Heart Word Practice | grade-1-heart-word-practice | 1st-grade-heart-word-practice | 1 | `src/content/spelling-lists/phonics/grade-1-heart-word-practice.md` |
| First Grade Heart Words | grade-1-heart-words | 1st-grade-heart-words | 1 | `src/content/spelling-lists/phonics/grade-1-heart-words.md` |
| R-Controlled Vowel Practice | grade-1-r-controlled-vowel-practice | 1st-grade-r-controlled-vowel-practice | 1 | `src/content/spelling-lists/phonics/grade-1-r-controlled-vowel-practice.md` |
| Short Vowel Practice | grade-1-short-vowel-practice | 1st-grade-short-vowel-practice | 1 | `src/content/spelling-lists/phonics/grade-1-short-vowel-practice.md` |
| Silent E Practice | grade-1-silent-e-practice | 1st-grade-silent-e-practice | 1 | `src/content/spelling-lists/phonics/grade-1-silent-e-practice.md` |
| Final -tch and -dge Practice | grade-1-tch-dge-practice | 1st-grade-tch-dge-practice | 1 | `src/content/spelling-lists/phonics/grade-1-tch-dge-practice.md` |
| Vowel Team Practice | grade-1-vowel-team-practice | 1st-grade-vowel-team-practice | 1 | `src/content/spelling-lists/phonics/grade-1-vowel-team-practice.md` |
| LD Final Blend Words | ld-final-blend-words | ld-final-blend-words | 1 | `src/content/spelling-lists/phonics/ld-final-blend-words.md` |
| LK Final Blend Words | lk-final-blend-words | lk-final-blend-words | 1 | `src/content/spelling-lists/phonics/lk-final-blend-words.md` |
| LT Final Blend Words | lt-final-blend-words | lt-final-blend-words | 1 | `src/content/spelling-lists/phonics/lt-final-blend-words.md` |
| MP Final Blend Words | mp-final-blend-words | mp-final-blend-words | 1 | `src/content/spelling-lists/phonics/mp-final-blend-words.md` |
| ND Final Blend Words | nd-final-blend-words | nd-final-blend-words | 1 | `src/content/spelling-lists/phonics/nd-final-blend-words.md` |
| NG Final Blend Words | ng-final-blend-words | ng-final-blend-words | 1 | `src/content/spelling-lists/phonics/ng-final-blend-words.md` |
| NK Final Blend Words | nk-final-blend-words | nk-final-blend-words | 1 | `src/content/spelling-lists/phonics/nk-final-blend-words.md` |
| NT Final Blend Words | nt-final-blend-words | nt-final-blend-words | 1 | `src/content/spelling-lists/phonics/nt-final-blend-words.md` |
| PL Blend Words | pl-blend-words | pl-blend-words | 1 | `src/content/spelling-lists/phonics/pl-blend-words.md` |
| PR Blend Words | pr-blend-words | pr-blend-words | 1 | `src/content/spelling-lists/phonics/pr-blend-words.md` |
| SK Final Blend Words | sk-final-blend-words | sk-final-blend-words | 1 | `src/content/spelling-lists/phonics/sk-final-blend-words.md` |
| SL Blend Words | sl-blend-words | sl-blend-words | 1 | `src/content/spelling-lists/phonics/sl-blend-words.md` |
| SM Blend Words | sm-blend-words | sm-blend-words | 1 | `src/content/spelling-lists/phonics/sm-blend-words.md` |
| SN Blend Words | sn-blend-words | sn-blend-words | 1 | `src/content/spelling-lists/phonics/sn-blend-words.md` |
| SP Blend Words | sp-blend-words | sp-blend-words | 1 | `src/content/spelling-lists/phonics/sp-blend-words.md` |
| ST Blend Words | st-blend-words | st-blend-words | 1 | `src/content/spelling-lists/phonics/st-blend-words.md` |
| ST Final Blend Words | st-final-blend-words | st-final-blend-words | 1 | `src/content/spelling-lists/phonics/st-final-blend-words.md` |
| SW Blend Words | sw-blend-words | sw-blend-words | 1 | `src/content/spelling-lists/phonics/sw-blend-words.md` |
| TCH and DGE Ending Words | tch-dge-ending-words | tch-dge-ending-words | 3 | `src/content/spelling-lists/phonics/tch-dge-ending-words.md` |
| TR Blend Words | tr-blend-words | tr-blend-words | 1 | `src/content/spelling-lists/phonics/tr-blend-words.md` |

## Grade-scoped phonics practice/review pages (8)

Standalone "practice" or "review" pages not referenced by any Grade Hub card — the live Grade 1 Core Spelling cards cover the same ground through their primary Grade Unit pages.

| Title | id | urlSlug | Grade | Source file |
|---|---|---|---|---|
| Beginning Blend Practice | grade-1-beginning-blend-practice | 1st-grade-beginning-blend-practice | 1 | `src/content/spelling-lists/phonics/grade-1-beginning-blend-practice.md` |
| Consonant Digraph Practice | grade-1-consonant-digraph-practice | 1st-grade-consonant-digraph-practice | 1 | `src/content/spelling-lists/phonics/grade-1-consonant-digraph-practice.md` |
| Ending Blend Practice | grade-1-ending-blend-practice | 1st-grade-ending-blend-practice | 1 | `src/content/spelling-lists/phonics/grade-1-ending-blend-practice.md` |
| R-Controlled Vowel Practice | grade-1-r-controlled-vowel-practice | 1st-grade-r-controlled-vowel-practice | 1 | `src/content/spelling-lists/phonics/grade-1-r-controlled-vowel-practice.md` |
| Short Vowel Practice | grade-1-short-vowel-practice | 1st-grade-short-vowel-practice | 1 | `src/content/spelling-lists/phonics/grade-1-short-vowel-practice.md` |
| Silent E Practice | grade-1-silent-e-practice | 1st-grade-silent-e-practice | 1 | `src/content/spelling-lists/phonics/grade-1-silent-e-practice.md` |
| Final -tch and -dge Practice | grade-1-tch-dge-practice | 1st-grade-tch-dge-practice | 1 | `src/content/spelling-lists/phonics/grade-1-tch-dge-practice.md` |
| Vowel Team Practice | grade-1-vowel-team-practice | 1st-grade-vowel-team-practice | 1 | `src/content/spelling-lists/phonics/grade-1-vowel-team-practice.md` |

## Archived-status pages (7)

`status: archived` excludes every row below from `getStaticPaths()`, so no standalone content page is emitted for any of them. Some former URLs are wired to a permanent redirect in `netlify.toml` (noted per row); rows without a noted redirect have no redirect configured and 404 at their old URL.

| Title | id | Source file | Former URL status |
|---|---|---|---|
| Kindergarten Describing Words | kindergarten-describing-words | `src/content/spelling-lists/grade-level/kindergarten-describing-words.md` | Redirects (301) to `/spelling-lists/kindergarten` |
| Kindergarten Feelings Words | kindergarten-feelings-words | `src/content/spelling-lists/grade-level/kindergarten-feelings-words.md` | Redirects (301) to `/spelling-lists/kindergarten` |
| Kindergarten Food Words | kindergarten-food-words | `src/content/spelling-lists/grade-level/kindergarten-food-words.md` | Redirects (301) to `/spelling-lists/kindergarten` |
| Kindergarten School Words | kindergarten-school-words | `src/content/spelling-lists/grade-level/kindergarten-school-words.md` | Redirects (301) to `/spelling-lists/kindergarten` |
| Kindergarten Shape Words | kindergarten-shape-words | `src/content/spelling-lists/grade-level/kindergarten-shape-words.md` | Redirects (301) to `/spelling-lists/kindergarten` |
| Short Vowels: CVC Words | short-vowels-cvc-words | `src/content/spelling-lists/phonics/short-vowels-cvc-words.md` | No redirect configured |
| Long E Silent E Words | silent-e-long-e | `src/content/spelling-lists/phonics/silent-e-long-e.md` | Redirects (301) to `/spelling-lists/skills/#silent-e-family` (the canonical Silent E family overview on the Skills Hub, per `docs/architecture/SKILLS_ARCHITECTURE.md` §5) |

---
**Total: 82 pages classified deprecated/legacy**, none of them in the active editorial scope defined by `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`. If a future product decision brings any of these back into the canonical architecture (for example, formally deciding the Dolch tier's long-term relationship to the Common Words system), move its row into the appropriate active inventory file at that time and record the decision per the roadmap's §15 maintenance rule — do not silently start editing it first.

