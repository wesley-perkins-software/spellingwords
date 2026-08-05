# Inventory: Grade Curriculum Pages (Canonical Active)

> URL architecture update: canonical K–5 Grade Hub and Grade Hub card URLs now use the flat no-trailing-slash `/{grade}/{page-slug}` structure. The runtime source of truth is `src/lib/content/canonicalGradeRoutes.ts`; see `docs/content/inventory/grade-url-migration-map.md` for the generated migration map. The legacy `/spelling-lists/...` route has been removed entirely; historical repository-shaped URLs are not generated and are not redirected (pre-launch, no traffic to preserve).


Linked from `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`. Scope: Core Spelling (Grade Unit) and Additional Practice (vocabulary-theme) pages that `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md` defines for each grade and that `src/lib/content/gradeHubCards.ts` confirms are wired into that grade's live hub. Common Words (High-Frequency Words) pages are inventoried separately in `sight-words-and-common-words.md`. Canonical Grade Unit names below are copied verbatim from `docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`.


## Kindergarten

**Canonical Grade Units:** Sounds, Letters, and Early Encoding; Short Vowels and CVC Words; High-Frequency Words


**Frozen hub structure:** 8 Core Spelling cards · 4 Common Words sets (40 words) · 3 Additional Practice card(s)


### Canonical active pages (13)

| Title | id | urlSlug | Role | Status | Source file | Editorial status |
|---|---|---|---|---|---|---|
| Kindergarten First Words | kindergarten-first-words | kindergarten-first-words | (untagged — confirmed canonical active via Grade Hub card, see untagged-and-data-quality.md) | published | `src/content/kindergarten/first-words.md` | Needs review (re-audited against `CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` in the Kindergarten pilot batch) |
| Kindergarten Number Words | kindergarten-number-words | kindergarten-number-words | vocabulary-theme | published | `src/content/kindergarten/number-words.md` | Not audited |
| Kindergarten Color Words | kindergarten-color-words | kindergarten-color-words | vocabulary-theme | published | `src/content/kindergarten/color-words.md` | Not audited |
| Kindergarten Animal Words | kindergarten-animal-words | kindergarten-animal-words | (untagged — confirmed canonical active via Grade Hub card, see untagged-and-data-quality.md) | published | `src/content/kindergarten/animal-words.md` | Not audited |
| Kindergarten Body Words | kindergarten-body-words | kindergarten-body-words | (untagged — confirmed canonical active via Grade Hub card, see untagged-and-data-quality.md) | published | `src/content/kindergarten/body-words.md` | Not audited |
| Kindergarten Family Words | kindergarten-family-words | kindergarten-family-words | (untagged — confirmed canonical active via Grade Hub card, see untagged-and-data-quality.md) | published | `src/content/kindergarten/family-words.md` | Not audited |
| Kindergarten Short A Words | kindergarten-short-a-words | kindergarten-short-a-words | grade-unit | published | `src/content/kindergarten/short-a-words.md` | Needs review |
| Kindergarten Short I Words | kindergarten-short-i-words | kindergarten-short-i-words | grade-unit | published | `src/content/kindergarten/short-i-words.md` | Needs review |
| Kindergarten Short O Words | kindergarten-short-o-words | kindergarten-short-o-words | grade-unit | published | `src/content/kindergarten/short-o-words.md` | Needs review (drafted and self-reviewed against `CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` in the second Phase 2 pilot batch; independent human sign-off pending) |
| Kindergarten Short U Words | kindergarten-short-u-words | kindergarten-short-u-words | grade-unit | published | `src/content/kindergarten/short-u-words.md` | Needs review (drafted and self-reviewed against `CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` in the second Phase 2 pilot batch; independent human sign-off pending) |
| Kindergarten Short E Words | kindergarten-short-e-words | kindergarten-short-e-words | grade-unit | published | `src/content/kindergarten/short-e-words.md` | Needs review (drafted and self-reviewed against `CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` in the second Phase 2 pilot batch; independent human sign-off pending) |
| Mixed Vowel CVC Review | kindergarten-mixed-vowel-review | kindergarten-mixed-vowel-review | grade-unit | published | `src/content/kindergarten/mixed-vowel-review.md` | Needs review (drafted and self-reviewed against `CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` in the third Phase 2 Kindergarten batch; independent human sign-off pending) |
| Consonant Digraphs | kindergarten-consonant-digraphs | kindergarten-consonant-digraphs | grade-unit | published | `src/content/kindergarten/consonant-digraphs.md` | Needs review (drafted and self-reviewed against `CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` in the third Phase 2 Kindergarten batch; independent human sign-off pending) |

## Grade 1

**Canonical Grade Units:** Consonant Digraphs and Blends; Inflectional Endings; Silent E and Long Vowels; Vowel Teams; Syllables and Two-Syllable Words


**Frozen hub structure:** 12 Core Spelling cards · 6 Common Words sets (72 words) · 3 Additional Practice card(s)


### Canonical active pages (17)

| Title | id | urlSlug | Role | Status | Source file | Editorial status |
|---|---|---|---|---|---|---|
| Grade 1 Number Words 11–20 | grade-1-number-words-11-20 | grade-1-number-words-11-20 | vocabulary-theme | published | `src/content/1st-grade/number-words-11-20.md` | Not audited |
| Grade 1 Days of the Week | grade-1-days-of-the-week | grade-1-days-of-the-week | vocabulary-theme | published | `src/content/1st-grade/days-of-the-week.md` | Not audited |
| Grade 1 Weather Words | grade-1-weather-words | grade-1-weather-words | vocabulary-theme | published | `src/content/1st-grade/weather-words.md` | Not audited |
| Grade 1 Clothing Words | grade-1-clothing-words | grade-1-clothing-words | vocabulary-theme | published | `src/content/1st-grade/clothing-words.md` | Not audited |
| Grade 1 Shape Words | grade-1-shape-words | grade-1-shape-words | vocabulary-theme | published | `src/content/1st-grade/shape-words.md` | Not audited |
| CVC Short Vowel Review & The C/K Rule | grade-1-cvc-short-vowels-c-k-rule | 1st-grade-cvc-short-vowels-c-k-rule | grade-unit | published | `src/content/spelling-lists/phonics/grade-1-cvc-short-vowels-c-k-rule.md` | Not audited |
| The Floss Rule | grade-1-floss-rule | 1st-grade-floss-rule | (untagged — confirmed canonical active via Grade Hub card, see untagged-and-data-quality.md) | published | `src/content/spelling-lists/phonics/grade-1-floss-rule.md` | Not audited |
| Consonant Digraphs & Final -ck | grade-1-consonant-digraphs-final-ck | 1st-grade-consonant-digraphs-final-ck | grade-unit | published | `src/content/spelling-lists/phonics/grade-1-consonant-digraphs-final-ck.md` | Not audited |
| Beginning Consonant Blends | grade-1-beginning-consonant-blends | 1st-grade-beginning-consonant-blends | grade-unit | published | `src/content/spelling-lists/phonics/grade-1-beginning-consonant-blends.md` | Not audited |
| Ending Consonant Blends | grade-1-ending-consonant-blends | 1st-grade-ending-consonant-blends | grade-unit | published | `src/content/spelling-lists/phonics/grade-1-ending-consonant-blends.md` | Not audited |
| Long Vowels with Silent e (VCe) | grade-1-long-vowels-silent-e | 1st-grade-long-vowels-silent-e | grade-unit | published | `src/content/spelling-lists/phonics/grade-1-long-vowels-silent-e.md` | Not audited |
| Short Words with Long Vowels: Open Syllables & Final Y | grade-1-open-syllables-final-y | 1st-grade-open-syllables-final-y | (untagged — confirmed canonical active via Grade Hub card, see untagged-and-data-quality.md) | published | `src/content/spelling-lists/phonics/grade-1-open-syllables-final-y.md` | Not audited |
| Inflectional Endings: -s and -es | grade-1-inflectional-endings-s-es | 1st-grade-inflectional-endings-s-es | (untagged — confirmed canonical active via Grade Hub card, see untagged-and-data-quality.md) | published | `src/content/spelling-lists/phonics/grade-1-inflectional-endings-s-es.md` | Not audited |
| Inflectional Endings: -ed and -ing | grade-1-inflectional-endings-ed-ing | 1st-grade-inflectional-endings-ed-ing | (untagged — confirmed canonical active via Grade Hub card, see untagged-and-data-quality.md) | published | `src/content/spelling-lists/phonics/grade-1-inflectional-endings-ed-ing.md` | Not audited |
| R-Controlled Vowels: ar / or | grade-1-r-controlled-ar-or | 1st-grade-r-controlled-ar-or | (untagged — confirmed canonical active via Grade Hub card, see untagged-and-data-quality.md) | published | `src/content/spelling-lists/phonics/grade-1-r-controlled-ar-or.md` | Not audited |
| Long A & Long O Vowel Teams | grade-1-long-a-long-o-vowel-teams | 1st-grade-long-a-long-o-vowel-teams | grade-unit | published | `src/content/spelling-lists/phonics/grade-1-long-a-long-o-vowel-teams.md` | Not audited |
| Short Vowel Ending Rules: -tch and -dge | grade-1-tch-dge-ending-rules | 1st-grade-tch-dge-ending-rules | (untagged — confirmed canonical active via Grade Hub card, see untagged-and-data-quality.md) | published | `src/content/spelling-lists/phonics/grade-1-tch-dge-ending-rules.md` | Not audited |

## Grade 2

**Canonical Grade Units:** R-Controlled Vowels; Diphthongs and Other Vowel Patterns; Syllable Types and Multisyllabic Words; Silent Letters and Ending Spelling Patterns; Hard and Soft C and G


**Frozen hub structure:** 10 Core Spelling cards · 6 Common Words sets (72 words) · 3 Additional Practice card(s)


### Canonical active pages (15)

| Title | id | urlSlug | Role | Status | Source file | Editorial status |
|---|---|---|---|---|---|---|
| 2nd Grade Compound Words | grade-2-list-02 | 2nd-grade-compound-words | grade-unit | published | `src/content/2nd-grade/compound-words.md` | Not audited |
| 2nd Grade Contractions | grade-2-contractions | 2nd-grade-contractions | grade-unit | published | `src/content/2nd-grade/contractions.md` | Not audited |
| 2nd Grade Silent Letter Words | grade-2-silent-letter-words | 2nd-grade-silent-letter-words | grade-unit | published | `src/content/2nd-grade/silent-letter-words.md` | Not audited |
| OI and OY Words | vowel-teams-oi-oy | vowel-teams-oi-oy | grade-unit | published | `src/content/2nd-grade/vowel-teams-oi-oy.md` | Not audited |
| OU and OW Words | vowel-teams-ou-ow | vowel-teams-ou-ow | grade-unit | published | `src/content/2nd-grade/vowel-teams-ou-ow.md` | Not audited |
| Grade 2 Transportation Words | grade-2-transportation-words | grade-2-transportation-words | vocabulary-theme | published | `src/content/2nd-grade/transportation-words.md` | Not audited |
| Grade 2 Months of the Year | grade-2-months-of-the-year | grade-2-months-of-the-year | vocabulary-theme | published | `src/content/2nd-grade/months-of-the-year.md` | Not audited |
| Grade 2 Money Words | grade-2-money-words | grade-2-money-words | vocabulary-theme | published | `src/content/2nd-grade/money-words.md` | Not audited |
| Grade 2 Number Words 20–100 | grade-2-number-words-20-100 | grade-2-number-words-20-100 | vocabulary-theme | published | `src/content/2nd-grade/number-words-20-100.md` | Not audited |
| Grade 2 Community Helpers | grade-2-community-helpers | grade-2-community-helpers | vocabulary-theme | published | `src/content/2nd-grade/community-helpers.md` | Not audited |
| Two Sounds of oo | grade-2-oo-two-sounds | grade-2-oo-two-sounds | grade-unit | published | `src/content/2nd-grade/oo-two-sounds.md` | Not audited |
| Vowel Patterns: au and aw | grade-2-au-aw-words | grade-2-au-aw-words | grade-unit | published | `src/content/2nd-grade/au-aw-words.md` | Not audited |
| Soft C and Soft G | grade-2-soft-c-soft-g | grade-2-soft-c-soft-g | grade-unit | published | `src/content/2nd-grade/soft-c-soft-g.md` | Not audited |
| Two-Syllable Words | grade-2-two-syllable-words | grade-2-two-syllable-words | grade-unit | published | `src/content/2nd-grade/two-syllable-words.md` | Not audited |
| Words Ending in -le | grade-2-final-stable-le | grade-2-final-stable-le | grade-unit | published | `src/content/2nd-grade/final-stable-le.md` | Not audited |

## Grade 3

**Canonical Grade Units:** Prefixes; Suffixes; Spelling Changes When Adding Suffixes; Plurals, Possessives, and Contractions; Homophones and Commonly Confused Words


**Frozen hub structure:** 7 Core Spelling cards · 5 Common Words sets (60 words) · 0 Additional Practice card(s)


### Canonical active pages (11)

| Title | id | urlSlug | Role | Status | Source file | Editorial status |
|---|---|---|---|---|---|---|
| 3rd Grade Prefix Words | grade-3-prefix-words | 3rd-grade-prefix-words | grade-unit | published | `src/content/3rd-grade/prefix-words.md` | Not audited |
| 3rd Grade Suffix Words | grade-3-suffix-words | 3rd-grade-suffix-words | grade-unit | published | `src/content/3rd-grade/suffix-words.md` | Not audited |
| 3rd Grade Spelling Rule: Dropping Silent E | grade-3-dropping-silent-e | 3rd-grade-dropping-silent-e | grade-unit | published | `src/content/3rd-grade/dropping-silent-e.md` | Not audited |
| 3rd Grade Map & Globe Words | grade-3-map-globe-words | 3rd-grade-map-globe-words | vocabulary-theme | published | `src/content/3rd-grade/map-globe-words.md` | Not audited |
| 3rd Grade Possessive Words | grade-3-possessives | 3rd-grade-possessives | grade-unit | published | `src/content/3rd-grade/possessives.md` | Not audited |
| 3rd Grade Life Cycle Words | grade-3-life-cycle-words | 3rd-grade-life-cycle-words | vocabulary-theme | published | `src/content/3rd-grade/life-cycle-words.md` | Not audited |
| 3rd Grade Multisyllabic Words | grade-3-multisyllabic-words | 3rd-grade-multisyllabic-words | grade-unit | published | `src/content/3rd-grade/multisyllabic-words.md` | Not audited |
| 3rd Grade Homophones and Commonly Confused Words | grade-3-homophones | 3rd-grade-homophones | grade-unit | published | `src/content/3rd-grade/homophones.md` | Not audited |
| 3rd Grade Time Words | grade-3-time-words | 3rd-grade-time-words | vocabulary-theme | published | `src/content/3rd-grade/time-words.md` | Not audited |
| 3rd Grade Multiplication & Division Words | grade-3-multiplication-division-words | 3rd-grade-multiplication-division-words | vocabulary-theme | published | `src/content/3rd-grade/multiplication-division-words.md` | Not audited |
| 3rd Grade Root Word Families | grade-3-root-word-families | 3rd-grade-root-word-families | (untagged — confirmed canonical active via Grade Hub card, see untagged-and-data-quality.md) | published | `src/content/3rd-grade/root-word-families.md` | Not audited |

## Grade 4

**Canonical Grade Units:** Greek and Latin Roots; Advanced Multisyllabic Words; Final Stable Syllables and Common Word Endings; Derived Words and Word Meaning


**Frozen hub structure:** 6 Core Spelling cards · 4 Common Words sets (48 words) · 1 Additional Practice card(s)


### Canonical active pages (10)

| Title | id | urlSlug | Role | Status | Source file | Editorial status |
|---|---|---|---|---|---|---|
| 4th Grade Multisyllabic Academic Words | grade-4-multisyllabic-academic-words | 4th-grade-multisyllabic-academic-words | grade-unit | published | `src/content/4th-grade/multisyllabic-academic-words.md` | Not audited |
| 4th Grade Advanced Prefix Words | grade-4-advanced-prefixes | 4th-grade-advanced-prefixes | grade-unit | published | `src/content/4th-grade/advanced-prefixes.md` | Not audited |
| 4th Grade Advanced Suffix Words | grade-4-advanced-suffixes | 4th-grade-advanced-suffixes | grade-unit | published | `src/content/4th-grade/advanced-suffixes.md` | Not audited |
| 4th Grade Latin Root Words | tier-1-roots-and-patterns | tier-1-roots-and-patterns | grade-unit | published | `src/content/4th-grade/roots-and-patterns.md` | Not audited |
| 4th Grade Commonly Confused Words | grade-4-commonly-confused-words | 4th-grade-commonly-confused-words | grade-unit | published | `src/content/4th-grade/commonly-confused-words.md` | Not audited |
| 4th Grade Derived Words and Word Meaning | grade-4-derived-words | 4th-grade-derived-words-and-word-meaning | grade-unit | published | `src/content/spelling-lists/grade-level/4th-grade-derived-words.md` | Not audited |
| 4th Grade Measurement Words | grade-4-measurement-words | 4th-grade-measurement-words | vocabulary-theme | published | `src/content/4th-grade/measurement-words.md` | Not audited |
| 4th Grade Solar System Words | grade-4-solar-system-words | 4th-grade-solar-system-words | vocabulary-theme | published | `src/content/4th-grade/solar-system-words.md` | Not audited |
| 4th Grade Career & Occupation Words | grade-4-career-occupation-words | 4th-grade-career-occupation-words | vocabulary-theme | published | `src/content/4th-grade/career-occupation-words.md` | Not audited |
| 4th Grade Geometry Words | grade-4-geometry-words | 4th-grade-geometry-words | vocabulary-theme | published | `src/content/4th-grade/geometry-words.md` | Not audited |

**Removed (legacy-architecture-removal PR):** `grade-4-final-stable-syllables` (4th Grade Final Stable Syllables: -ture and -sure) realized the -ture/-sure portion of the "Final Stable Syllables and Common Word Endings" canonical unit, reached only through `grade-4-advanced-suffixes`'s related-practice link. It was never a canonical Skill or a separate Grade Hub card. The standalone page has been deleted (no content migrated, per explicit product direction) and the anchor's `relatedLists` reference to it removed. See `docs/content/inventory/LEGACY_REMOVAL_DELETION_MANIFEST.md`. This does not change the Grade 4 Core Spelling card count (still 6) or the canonical-active page count above (still 10).

## Grade 5

**Canonical Grade Units:** Advanced Roots, Affixes, and Academic Words; Spelling Changes in Related Words; Meaning-Based and Conventional Spelling


**Frozen hub structure:** 5 Core Spelling cards · 4 Common Words sets (48 words) · 2 Additional Practice card(s)


### Canonical active pages (9)

| Title | id | urlSlug | Role | Status | Source file | Editorial status |
|---|---|---|---|---|---|---|
| 5th Grade Multisyllabic Academic Words | grade-5-multisyllabic-academic-words | 5th-grade-multisyllabic-academic-words | grade-unit | published | `src/content/5th-grade/multisyllabic-academic-words.md` | Not audited |
| 5th Grade Prefix & Suffix Words | grade-5-prefix-suffix-words | 5th-grade-prefix-suffix-words | grade-unit | published | `src/content/5th-grade/prefix-suffix-words.md` | Not audited |
| 5th Grade Greek & Latin Word Parts | grade-5-greek-latin-word-parts | 5th-grade-greek-latin-word-parts | grade-unit | published | `src/content/5th-grade/greek-latin-word-parts.md` | Not audited |
| 5th Grade Commonly Confused Words | grade-5-commonly-confused-words | 5th-grade-commonly-confused-words | grade-unit | published | `src/content/5th-grade/commonly-confused-words.md` | Not audited |
| 5th Grade Spelling Changes in Related Words | grade-5-spelling-changes-related-words | 5th-grade-spelling-changes-in-related-words | grade-unit | published | `src/content/spelling-lists/grade-level/5th-grade-spelling-changes-related-words.md` | Not audited |
| 5th Grade Civics and Government Words | grade-5-community-civics-words | 5th-grade-community-civics-words | vocabulary-theme | published | `src/content/5th-grade/community-civics-words.md` | Not audited |
| 5th Grade Money Management Words | grade-5-money-management-words | 5th-grade-money-management-words | vocabulary-theme | published | `src/content/5th-grade/money-management-words.md` | Not audited |
| 5th Grade Ecosystem & Environment Words | grade-5-ecosystem-environment-words | 5th-grade-ecosystem-environment-words | vocabulary-theme | published | `src/content/5th-grade/ecosystem-environment-words.md` | Not audited |
| 5th Grade Fraction & Decimal Words | grade-5-fraction-decimal-words | 5th-grade-fraction-decimal-words | vocabulary-theme | published | `src/content/5th-grade/fraction-decimal-words.md` | Not audited |

**Removed (legacy-architecture-removal PR):** `grade-5-spelling-rules` (5th Grade Spelling Rules) taught suffix-ending spelling disambiguation (-tion/-sion, -able/-ible, -ance/-ence) as part of the combined "Advanced Roots, Affixes, and Academic Words" canonical unit, reached only through `grade-5-prefix-suffix-words`'s related-practice link. It was never a canonical Skill or a separate Grade Hub card. The standalone page has been deleted (no content migrated, per explicit product direction) and the anchor's `relatedLists` reference to it removed. See `docs/content/inventory/LEGACY_REMOVAL_DELETION_MANIFEST.md`. This does not change the Grade 5 Core Spelling card count (still 5) or the canonical-active page count above (still 9).

---
**Total: 75 canonical-active Core Spelling / Additional Practice pages across K–5.** This counts pages that are their own Grade Hub card (a public curriculum-placement destination). `grade-4-final-stable-syllables` and `grade-5-spelling-rules` — formerly published, grade-owned content pages reachable via an existing combined unit's anchor page, never separate Hub cards — have been deleted (see `docs/content/inventory/LEGACY_REMOVAL_DELETION_MANIFEST.md`).


Every page that was grade-scoped in naming but not confirmed as part of the canonical architecture has been reviewed, deleted, or (never) promoted — see `docs/content/inventory/LEGACY_REMOVAL_DELETION_MANIFEST.md` for the full record. `grade-4-final-stable-syllables` and `grade-5-spelling-rules` were deleted, not promoted — see the notes above.
