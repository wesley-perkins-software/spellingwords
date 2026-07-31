# Data-Quality Notes and Untagged-Page Triage

Linked from `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`. Everything in this file is a **repository/documentation finding**, not a page-content judgment — it records where frontmatter is missing, inconsistent, or contradicts the frozen architecture, so Phase 0 can triage it deliberately instead of the roadmap silently guessing. Per the roadmap's ground rules, nothing here was inferred from filenames alone; every row reflects an actual frontmatter read.


## 1. Pages with no `contentRole` set (126 of 267 content files, ~47%)

`contentRole` is the schema field (`src/content/config.ts`) that is supposed to declare which of the five content layers a page belongs to (`grade-unit | skill | sight-word-set | vocabulary-theme | teaching-guide`). Just under half of all content-collection files have this field empty. Grade-level and phonics files below are almost certainly Grade Curriculum or vocabulary/theme pages by naming and directory, and sight-words files are almost certainly Common Words/Dolch sets (see `sight-words-and-common-words.md`), but **this roadmap does not assign them a role** — that requires a content read, which is Phase 0 work, not this planning pass. Recommended Phase 0 action: backfill `contentRole` for all 126 files before relying on it as a query field.


### `grade-level` — 34 untagged files

| Title | id | urlSlug | Grade | Status | Source file |
|---|---|---|---|---|---|
| 1st Grade Everyday Words | grade-1-list-01 | 1st-grade-everyday-words | 1 | published | `src/content/spelling-lists/grade-level/1st-grade-everyday-words.md` |
| 1st Grade Action Words | grade-1-list-02 | 1st-grade-action-words | 1 | published | `src/content/spelling-lists/grade-level/1st-grade-action-words.md` |
| 1st Grade Describing Words | grade-1-describing-words | 1st-grade-describing-words | 1 | published | `src/content/spelling-lists/grade-level/1st-grade-describing-words.md` |
| Regular Plural Words: Review | grade-2-regular-plurals | 2nd-grade-regular-plurals | 1 | published | `src/content/spelling-lists/grade-level/2nd-grade-regular-plurals.md` |
| 2nd Grade Everyday Words | grade-2-list-01 | 2nd-grade-everyday-words | 2 | published | `src/content/spelling-lists/grade-level/2nd-grade-everyday-words.md` |
| 2nd Grade Action Words | grade-2-list-03 | 2nd-grade-action-words | 2 | published | `src/content/spelling-lists/grade-level/2nd-grade-action-words.md` |
| 2nd Grade Describing Words | grade-2-describing-words | 2nd-grade-describing-words | 2 | published | `src/content/spelling-lists/grade-level/2nd-grade-describing-words.md` |
| 3rd Grade Everyday Words | grade-3-list-01 | 3rd-grade-everyday-words | 3 | published | `src/content/spelling-lists/grade-level/3rd-grade-everyday-words.md` |
| 3rd Grade Describing Words | grade-3-list-02 | 3rd-grade-describing-words | 3 | published | `src/content/spelling-lists/grade-level/3rd-grade-describing-words.md` |
| 3rd Grade Reading & Writing Words | grade-3-reading-writing-words | 3rd-grade-reading-writing-words | 3 | published | `src/content/spelling-lists/grade-level/3rd-grade-reading-writing-words.md` |
| Prefix Words: UN and RE | grade-2-prefixes-un-re | 2nd-grade-prefixes-un-re | 3 | published | `src/content/spelling-lists/grade-level/2nd-grade-prefixes-un-re.md` |
| Suffix Words: FUL and LESS | grade-2-suffixes-ful-less | 2nd-grade-suffixes-ful-less | 3 | published | `src/content/spelling-lists/grade-level/2nd-grade-suffixes-ful-less.md` |
| Comparative Words: ER and EST | grade-2-comparatives-er-est | 2nd-grade-comparatives-er-est | 3 | published | `src/content/spelling-lists/grade-level/2nd-grade-comparatives-er-est.md` |
| Homophones: To, Too, and Two | grade-2-homophones | 2nd-grade-homophones | 3 | published | `src/content/spelling-lists/grade-level/2nd-grade-homophones.md` |
| 3rd Grade Root Word Families | grade-3-root-word-families | 3rd-grade-root-word-families | 3 | published | `src/content/spelling-lists/grade-level/3rd-grade-root-word-families.md` |
| 4th Grade Everyday Words | grade-4-list-01 | 4th-grade-everyday-words | 4 | published | `src/content/spelling-lists/grade-level/4th-grade-everyday-words.md` |
| 4th Grade Reading & Writing Words | grade-4-reading-writing-words | 4th-grade-reading-writing-words | 4 | published | `src/content/spelling-lists/grade-level/4th-grade-reading-writing-words.md` |
| 4th Grade Academic & Content Words | grade-4-list-02 | 4th-grade-academic-content-words | 4 | published | `src/content/spelling-lists/grade-level/4th-grade-community-words.md` |
| 5th Grade Everyday Words | grade-5-list-01 | 5th-grade-everyday-words | 5 | published | `src/content/spelling-lists/grade-level/5th-grade-everyday-words.md` |
| 5th Grade Academic Words | grade-5-academic-words | 5th-grade-academic-words | 5 | published | `src/content/spelling-lists/grade-level/5th-grade-academic-words.md` |
| 5th Grade Reading & Writing Words | grade-5-reading-writing-words | 5th-grade-reading-writing-words | 5 | published | `src/content/spelling-lists/grade-level/5th-grade-reading-writing-words.md` |
| 5th Grade Opinion & Argument Words | grade-5-opinion-argument-words | 5th-grade-opinion-argument-words | 5 | published | `src/content/spelling-lists/grade-level/5th-grade-opinion-argument-words.md` |
| 5th Grade Science Words | grade-5-science-nature-words | 5th-grade-science-nature-words | 5 | published | `src/content/spelling-lists/grade-level/5th-grade-science-nature-words.md` |
| 5th Grade Math Vocabulary | grade-5-math-vocabulary | 5th-grade-math-vocabulary | 5 | published | `src/content/spelling-lists/grade-level/5th-grade-math-vocabulary.md` |
| Kindergarten First Words | kindergarten-first-words | kindergarten-first-words | K | published | `src/content/spelling-lists/grade-level/kindergarten-first-words.md` |
| Kindergarten Number and Color Words | kindergarten-number-color-words | kindergarten-number-color-words | K | published | `src/content/spelling-lists/grade-level/kindergarten-number-color-words.md` |
| Kindergarten Describing Words | kindergarten-describing-words | kindergarten-describing-words | K | archived | `src/content/spelling-lists/grade-level/kindergarten-describing-words.md` |
| Kindergarten Shape Words | kindergarten-shape-words | kindergarten-shape-words | K | archived | `src/content/spelling-lists/grade-level/kindergarten-shape-words.md` |
| Kindergarten Animal Words | kindergarten-animal-words | kindergarten-animal-words | K | published | `src/content/spelling-lists/grade-level/kindergarten-animal-words.md` |
| Kindergarten School Words | kindergarten-school-words | kindergarten-school-words | K | archived | `src/content/spelling-lists/grade-level/kindergarten-school-words.md` |
| Kindergarten Body Words | kindergarten-body-words | kindergarten-body-words | K | published | `src/content/spelling-lists/grade-level/kindergarten-body-words.md` |
| Kindergarten Family Words | kindergarten-family-words | kindergarten-family-words | K | published | `src/content/spelling-lists/grade-level/kindergarten-family-words.md` |
| Kindergarten Feelings Words | kindergarten-feelings-words | kindergarten-feelings-words | K | archived | `src/content/spelling-lists/grade-level/kindergarten-feelings-words.md` |
| Kindergarten Food Words | kindergarten-food-words | kindergarten-food-words | K | archived | `src/content/spelling-lists/grade-level/kindergarten-food-words.md` |

### `phonics` — 51 untagged files

| Title | id | urlSlug | Grade | Status | Source file |
|---|---|---|---|---|---|
| Short Vowels: CVC Words | short-vowels-cvc-words | short-vowels-cvc-words | 1 | archived | `src/content/spelling-lists/phonics/short-vowels-cvc-words.md` |
| BL Blend Words | bl-blend-words | bl-blend-words | 1 | published | `src/content/spelling-lists/phonics/bl-blend-words.md` |
| BR Blend Words | br-blend-words | br-blend-words | 1 | published | `src/content/spelling-lists/phonics/br-blend-words.md` |
| CL Blend Words | cl-blend-words | cl-blend-words | 1 | published | `src/content/spelling-lists/phonics/cl-blend-words.md` |
| CR Blend Words | cr-blend-words | cr-blend-words | 1 | published | `src/content/spelling-lists/phonics/cr-blend-words.md` |
| DR Blend Words | dr-blend-words | dr-blend-words | 1 | published | `src/content/spelling-lists/phonics/dr-blend-words.md` |
| FL Blend Words | fl-blend-words | fl-blend-words | 1 | published | `src/content/spelling-lists/phonics/fl-blend-words.md` |
| FR Blend Words | fr-blend-words | fr-blend-words | 1 | published | `src/content/spelling-lists/phonics/fr-blend-words.md` |
| GL Blend Words | gl-blend-words | gl-blend-words | 1 | published | `src/content/spelling-lists/phonics/gl-blend-words.md` |
| GR Blend Words | gr-blend-words | gr-blend-words | 1 | published | `src/content/spelling-lists/phonics/gr-blend-words.md` |
| PL Blend Words | pl-blend-words | pl-blend-words | 1 | published | `src/content/spelling-lists/phonics/pl-blend-words.md` |
| PR Blend Words | pr-blend-words | pr-blend-words | 1 | published | `src/content/spelling-lists/phonics/pr-blend-words.md` |
| SL Blend Words | sl-blend-words | sl-blend-words | 1 | published | `src/content/spelling-lists/phonics/sl-blend-words.md` |
| SM Blend Words | sm-blend-words | sm-blend-words | 1 | published | `src/content/spelling-lists/phonics/sm-blend-words.md` |
| SN Blend Words | sn-blend-words | sn-blend-words | 1 | published | `src/content/spelling-lists/phonics/sn-blend-words.md` |
| SP Blend Words | sp-blend-words | sp-blend-words | 1 | published | `src/content/spelling-lists/phonics/sp-blend-words.md` |
| ST Blend Words | st-blend-words | st-blend-words | 1 | published | `src/content/spelling-lists/phonics/st-blend-words.md` |
| SW Blend Words | sw-blend-words | sw-blend-words | 1 | published | `src/content/spelling-lists/phonics/sw-blend-words.md` |
| TR Blend Words | tr-blend-words | tr-blend-words | 1 | published | `src/content/spelling-lists/phonics/tr-blend-words.md` |
| ND Final Blend Words | nd-final-blend-words | nd-final-blend-words | 1 | published | `src/content/spelling-lists/phonics/nd-final-blend-words.md` |
| NG Final Blend Words | ng-final-blend-words | ng-final-blend-words | 1 | published | `src/content/spelling-lists/phonics/ng-final-blend-words.md` |
| LD Final Blend Words | ld-final-blend-words | ld-final-blend-words | 1 | published | `src/content/spelling-lists/phonics/ld-final-blend-words.md` |
| ST Final Blend Words | st-final-blend-words | st-final-blend-words | 1 | published | `src/content/spelling-lists/phonics/st-final-blend-words.md` |
| NT Final Blend Words | nt-final-blend-words | nt-final-blend-words | 1 | published | `src/content/spelling-lists/phonics/nt-final-blend-words.md` |
| NK Final Blend Words | nk-final-blend-words | nk-final-blend-words | 1 | published | `src/content/spelling-lists/phonics/nk-final-blend-words.md` |
| LT Final Blend Words | lt-final-blend-words | lt-final-blend-words | 1 | published | `src/content/spelling-lists/phonics/lt-final-blend-words.md` |
| LK Final Blend Words | lk-final-blend-words | lk-final-blend-words | 1 | published | `src/content/spelling-lists/phonics/lk-final-blend-words.md` |
| MP Final Blend Words | mp-final-blend-words | mp-final-blend-words | 1 | published | `src/content/spelling-lists/phonics/mp-final-blend-words.md` |
| FT Final Blend Words | ft-final-blend-words | ft-final-blend-words | 1 | published | `src/content/spelling-lists/phonics/ft-final-blend-words.md` |
| SK Final Blend Words | sk-final-blend-words | sk-final-blend-words | 1 | published | `src/content/spelling-lists/phonics/sk-final-blend-words.md` |
| C, K, and CK Words | c-k-ck-words | c-k-ck-words | 1 | published | `src/content/spelling-lists/phonics/c-k-ck-words.md` |
| The Floss Rule | grade-1-floss-rule | 1st-grade-floss-rule | 1 | published | `src/content/spelling-lists/phonics/grade-1-floss-rule.md` |
| Short Words with Long Vowels: Open Syllables & Final Y | grade-1-open-syllables-final-y | 1st-grade-open-syllables-final-y | 1 | published | `src/content/spelling-lists/phonics/grade-1-open-syllables-final-y.md` |
| First Grade Heart Words | grade-1-heart-words | 1st-grade-heart-words | 1 | published | `src/content/spelling-lists/phonics/grade-1-heart-words.md` |
| Inflectional Endings: -s and -es | grade-1-inflectional-endings-s-es | 1st-grade-inflectional-endings-s-es | 1 | published | `src/content/spelling-lists/phonics/grade-1-inflectional-endings-s-es.md` |
| Inflectional Endings: -ed and -ing | grade-1-inflectional-endings-ed-ing | 1st-grade-inflectional-endings-ed-ing | 1 | published | `src/content/spelling-lists/phonics/grade-1-inflectional-endings-ed-ing.md` |
| R-Controlled Vowels: ar / or | grade-1-r-controlled-ar-or | 1st-grade-r-controlled-ar-or | 1 | published | `src/content/spelling-lists/phonics/grade-1-r-controlled-ar-or.md` |
| R-Controlled Vowels: er / ir / ur | grade-1-r-controlled-er-ir-ur | 1st-grade-r-controlled-er-ir-ur | 1 | published | `src/content/spelling-lists/phonics/grade-1-r-controlled-er-ir-ur.md` |
| Short Vowel Ending Rules: -tch and -dge | grade-1-tch-dge-ending-rules | 1st-grade-tch-dge-ending-rules | 1 | published | `src/content/spelling-lists/phonics/grade-1-tch-dge-ending-rules.md` |
| Short Vowel Practice | grade-1-short-vowel-practice | 1st-grade-short-vowel-practice | 1 | published | `src/content/spelling-lists/phonics/grade-1-short-vowel-practice.md` |
| Consonant Digraph Practice | grade-1-consonant-digraph-practice | 1st-grade-consonant-digraph-practice | 1 | published | `src/content/spelling-lists/phonics/grade-1-consonant-digraph-practice.md` |
| Beginning Blend Practice | grade-1-beginning-blend-practice | 1st-grade-beginning-blend-practice | 1 | published | `src/content/spelling-lists/phonics/grade-1-beginning-blend-practice.md` |
| Ending Blend Practice | grade-1-ending-blend-practice | 1st-grade-ending-blend-practice | 1 | published | `src/content/spelling-lists/phonics/grade-1-ending-blend-practice.md` |
| Silent E Practice | grade-1-silent-e-practice | 1st-grade-silent-e-practice | 1 | published | `src/content/spelling-lists/phonics/grade-1-silent-e-practice.md` |
| Heart Word Practice | grade-1-heart-word-practice | 1st-grade-heart-word-practice | 1 | published | `src/content/spelling-lists/phonics/grade-1-heart-word-practice.md` |
| R-Controlled Vowel Practice | grade-1-r-controlled-vowel-practice | 1st-grade-r-controlled-vowel-practice | 1 | published | `src/content/spelling-lists/phonics/grade-1-r-controlled-vowel-practice.md` |
| Vowel Team Practice | grade-1-vowel-team-practice | 1st-grade-vowel-team-practice | 1 | published | `src/content/spelling-lists/phonics/grade-1-vowel-team-practice.md` |
| Final -tch and -dge Practice | grade-1-tch-dge-practice | 1st-grade-tch-dge-practice | 1 | published | `src/content/spelling-lists/phonics/grade-1-tch-dge-practice.md` |
| TCH and DGE Ending Words | tch-dge-ending-words | tch-dge-ending-words | 3 | published | `src/content/spelling-lists/phonics/tch-dge-ending-words.md` |
| The -ck Ending Rule | kindergarten-ck-ending-words | kindergarten-ck-ending-words | K | published | `src/content/spelling-lists/phonics/kindergarten-ck-ending-words.md` |
| Double Consonants | kindergarten-double-consonants | kindergarten-double-consonants | K | published | `src/content/spelling-lists/phonics/kindergarten-double-consonants.md` |

### `sight-words` — 40 untagged files

(Full per-title table already given in `sight-words-and-common-words.md` — not repeated here.)


### `challenge` — 1 untagged files

| Title | id | urlSlug | Grade | Status | Source file |
|---|---|---|---|---|---|
| Challenge: Academic Vocabulary | academic-vocabulary | academic-vocabulary | — | published | `src/content/spelling-lists/challenge/academic-vocabulary.md` |

## 2. Pages tagged `contentRole: skill` outside the frozen 41-skill taxonomy

Full detail in `skill-pages.md` §"Flagged". Summary: `silent-e-long-e`, `grade-4-final-stable-syllables`, `grade-5-spelling-rules` — three published pages marked as Skill pages that are not in `CURATED_SPELLING_SKILL_IDS` and are not linked from the live Skills Hub. Needs a product-owner decision; not resolved by this roadmap.


## 3. Archived pages (6 files, `status: archived`)

These are not part of the live public site (not published) but remain in the repository. Confirm with the product owner whether they should stay archived, be revived, or be deleted — no action taken here.

| Title | id | Source file |
|---|---|---|
| Kindergarten Describing Words | kindergarten-describing-words | `src/content/spelling-lists/grade-level/kindergarten-describing-words.md` |
| Kindergarten Feelings Words | kindergarten-feelings-words | `src/content/spelling-lists/grade-level/kindergarten-feelings-words.md` |
| Kindergarten Food Words | kindergarten-food-words | `src/content/spelling-lists/grade-level/kindergarten-food-words.md` |
| Kindergarten School Words | kindergarten-school-words | `src/content/spelling-lists/grade-level/kindergarten-school-words.md` |
| Kindergarten Shape Words | kindergarten-shape-words | `src/content/spelling-lists/grade-level/kindergarten-shape-words.md` |
| Short Vowels: CVC Words | short-vowels-cvc-words | `src/content/spelling-lists/phonics/short-vowels-cvc-words.md` |

Note: `short-vowels-cvc-words.md` (archived) is a combined short-vowels page, distinct from the five live per-vowel Skill pages (`short-a-words.md` etc.) — likely a predecessor superseded by the split. `kindergarten-*-words.md` archived theme pages (describing, feelings, food, school, shape) sit alongside otherwise-live Kindergarten theme pages of the same pattern (color, animal, body, family, first, number) — worth a quick product check on whether the archived five were intentionally cut or are simply incomplete.


## 4. `skillIds` linking from Grade Unit pages to canonical Skill pages is almost entirely unpopulated

Only 3 of 44 `contentRole: grade-unit` pages set `skillIds` (the field meant to connect a grade-specific treatment back to its grade-independent canonical Skill page): `kindergarten-short-a-words` → `short-a-words`; `grade-2-two-syllable-words` → `r-controlled-ar`, `r-controlled-or`, `r-controlled-er-ir-ur`; `grade-5-prefix-suffix-words` → `grade-5-spelling-rules` (itself one of the non-taxonomy "skill" pages flagged in §2 above — a page linking to a page that isn't a recognized skill). Populating this field for the remaining 41 grade-unit pages, once their target Skill page exists and is in good shape, is core Phase 2 work and also the mechanism for the internal linking the content-layer model calls for.


## 5. `grade` field does not distinguish phonics content used across multiple grades

Many `phonics` category files (e.g. most Skill pages like `short-a-words.md`) carry a single `grade: "1"` value even though the concept is taught in Kindergarten and reinforced in Grade 1 (per the canonical curriculum, Short Vowels and CVC Words is a Kindergarten Grade Unit). This is expected for a single-value schema field and is not a bug to fix, but authors should not read `grade` on a Skill page as "this is a Grade 1-only concept" — Skill pages are explicitly grade-independent per the content-layer model. Flagged here so the inventory tables aren't misread.


## 6. `id` vs `urlSlug` divergence — not a defect

116 files have `id !== urlSlug` (e.g. `id: grade-1-list-02`, `urlSlug: 1st-grade-action-words`). This is expected: `id` is a stable internal identifier and `urlSlug` is the human/SEO-facing path segment, and the schema defines them as separate fields by design. Listed here only so a future contributor doesn't mistake the two for the same value when reading the inventory tables, and does not need re-flagging as an issue.

