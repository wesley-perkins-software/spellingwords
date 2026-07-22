# Canonical K–5 Curriculum Implementation Audit

**Status:** Audit only — no curriculum implementation decisions are approved by this document.  
**Authoritative educational reference:** `docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`  
**Audit scope:** Current Grade Units, Grade hubs, Skills, word-list data, routes, instructional content, curriculum/architecture documents, and associated tests.  
**Audit method:** Static repository inspection. “Complete” means the current implementation substantially represents the canonical educational scope; it does **not** mean that a matching page title or a word list alone is sufficient.

## Executive summary

The repository contains strong underlying word-list inventory for many canonical concepts, particularly Kindergarten CVC words, Grade 1 phonics, Grade 3 morphology, Grade 4 roots, and Grade 5 academic vocabulary. Its Grade Unit architecture is nevertheless materially incomplete and misgrouped relative to the canonical curriculum.

- Fifteen published entries currently declare `contentRole: grade-unit`. They are concentrated in Kindergarten, Grade 1, and two Grade 3 concepts; Grades 2, 4, and 5 have no Grade Units.
- Kindergarten and Grade 1 have hand-maintained progression arrays. Grades 2–5 instead render grade-tagged lists grouped by category, so a grade-tagged list is not equivalent to a canonical Grade Unit.
- Several narrow subskills are Grade Units where the canonical blueprint calls for broader units: individual Kindergarten vowels, beginning/ending blends, and separate Grade 1 vowel-team batches.
- Several canonical units have supporting lists but no roadmap/Grade Unit representation, especially Grade 2, Grade 4, and Grade 5.
- Primary-grade metadata is inconsistent with the blueprint for Kindergarten digraphs, Grade 1 r-controlled vowels, Grade 2 contractions/plurals/homophones, and Grade 3 `-tch`/`-dge` endings.
- High-frequency content exists as Dolch and Heart Word sets, but it is not represented as the canonical Kindergarten introductory Grade Unit/roadmap milestone. The Kindergarten hub also omits its grade-tagged Dolch Pre-Primer lists from its curated additional-practice section.

The repository’s content model is compatible with fixing these issues without a one-page-per-unit rewrite: a Grade Unit can be a grade-specific milestone with linked Skills and practice sets, while Sight Word Sets and Vocabulary/Theme Lists retain their distinct purposes. See `docs/architecture/CONTENT_MODEL.md`.

## Scope and implementation facts

### Content identities and routes

- `src/content/config.ts` defines optional identities including `grade-unit`, `skill`, `sight-word-set`, and `vocabulary-theme`; it also defines Grade Unit → Skill links through `skillIds`.
- `src/pages/spelling-lists/[category]/[slug].astro` delegates every `contentRole: grade-unit` entry to `src/components/GradeUnitWorldPage.astro`.
- `src/components/GradeUnitWorldPage.astro` describes the intended Grade Unit contract: one curriculum grade, roadmap placement, a grade-specific objective, a primary practice set, sequence relationships, and zero or more linked Skills.
- `src/lib/content/gradeUnitSequence.ts` sequences only published entries with `contentRole: grade-unit`; it therefore cannot represent canonical units that only exist as ordinary lists.

### Grade hubs

- `src/pages/spelling-lists/[gradeSlug].astro` renders Kindergarten through `buildKindergartenSections()` and Grade 1 through `buildGrade1Sections()`.
- `src/lib/content/kindergartenProgression.ts` provides a ten-item core sequence and a three-item additional-practice sequence.
- `src/lib/content/grade1Progression.ts` provides core, gateway, targeted-skill, and vocabulary sections.
- Grades 2–5 use `buildGradeHubSections()` in `src/lib/content/spellingLists.ts`, which groups lists by category. This is browse organization, not a canonical curriculum roadmap.

### Current published Grade Units

> **Amendment (discovered during Phase 2 implementation planning):** the table below originally omitted two live, published, tested Kindergarten core-roadmap entries — `kindergarten-ck-ending-words` and `kindergarten-double-consonants`. Both are corrected here. See the "Kindergarten Implementation Amendment" in `CANONICAL_CURRICULUM_IMPLEMENTATION_PLAN.md` for their disposition.

| Grade | Current `contentRole: grade-unit` entries |
|---|---|
| K | `kindergarten-short-a-words`, `kindergarten-short-e-words`, `kindergarten-short-i-words`, `kindergarten-short-o-words`, `kindergarten-short-u-words`, `kindergarten-mixed-vowel-review`, `kindergarten-consonant-digraphs`, `kindergarten-ck-ending-words`, `kindergarten-double-consonants` |
| 1 | `grade-1-cvc-short-vowels-c-k-rule`, `grade-1-beginning-consonant-blends`, `grade-1-ending-consonant-blends`, `grade-1-long-vowels-silent-e`, `grade-1-long-a-long-o-vowel-teams`, `grade-1-long-e-vowel-teams` |
| 2 | None |
| 3 | `grade-3-prefix-words`, `grade-3-suffix-words` |
| 4 | None |
| 5 | None |

## Canonical Grade Unit audit

### Kindergarten

| Canonical Grade Unit | Current equivalent and contributors | Status | Missing instructional subtopics / word-list coverage | Naming or grouping concern | Recommended product treatment | Confidence and evidence |
|---|---|---|---|---|---|---|
| **Sounds, Letters, and Early Encoding** | `kindergarten-first-words` begins the K core progression. The individual short-vowel units and mixed review contribute. | **Partial** | No explicit sound-letter mapping, phoneme segmentation-to-writing workflow, or early-encoding progression. No controlled beginning/middle/ending-sound practice set. Dictation and word-building are not modeled as embedded supports. | “First Words” is too vague for the foundational encoding milestone. | **Rename** and **merge** introductory material into one broader K Grade Unit; keep phonological awareness, handwriting, word building, and dictation embedded. | **High.** `src/content/spelling-lists/grade-level/kindergarten-first-words.md`; `src/lib/content/kindergartenProgression.ts`; canonical K overview. |
| **Short Vowels and CVC Words** | Grade Units for Short A/E/I/O/U and `kindergarten-mixed-vowel-review`; reusable Skills `short-a-words` through `short-u-words`; `short-vowels-cvc-words` contributes. | **Substantially complete** | Needs one unit-level CVC explanation, unfamiliar-word transfer, and integrated review/dictation guidance. Raw short-vowel word coverage is strong. | Six Grade Units represent one canonical unit while the same narrow concepts also exist as Skills. | **Merge** the five vowel units and mixed review; keep individual vowel pages as Skills or focused practice sets. | **High.** `src/content/spelling-lists/phonics/kindergarten-short-*.md`; `src/content/spelling-lists/phonics/kindergarten-mixed-vowel-review.md`; `src/lib/content/spellingSkills.ts`. |
| **High-Frequency Words** | `kindergarten-heart-words`; Dolch Pre-Primer Parts A–C. | **Partial** | Missing initial regular/irregular mapping, sentence-level use, and ongoing-review framing. The K hub omits Dolch Pre-Primer lists despite their K metadata. | The canonical introductory unit is split between Heart Words and Dolch with no shared roadmap treatment. | **Create new Grade Unit** or named K roadmap milestone backed by existing Sight Word Sets; do not duplicate word data. | **High.** `src/content/spelling-lists/sight-words/kindergarten-heart-words.md`; `src/content/spelling-lists/sight-words/dolch-pre-primer-*.md`; `src/lib/content/kindergartenProgression.ts`; `src/pages/spelling-lists/[gradeSlug].astro`. |
| *(Non-canonical, supporting)* CK Ending / Double Consonants | `kindergarten-ck-ending-words`, `kindergarten-double-consonants` — live K core-roadmap steps (orders 9–10), omitted from this audit's original inventory. | **Live, not canonical** | Not evaluated against any canonical K unit; both are narrow orthographic-pattern pages, not one of the three canonical Kindergarten units. | Previously miscounted as absent from the K Grade Unit inventory; `CURRICULUM_MAP.md` ties them to future Grade 1 concepts (Final CK, FLOSS) rather than to Short Vowels and CVC Words. | **Remove** from the canonical Kindergarten roadmap while keeping both published as supporting/additional-practice content; preserve IDs, routes, and word lists; revisit at the Phase 3 Grade 1 cutover for possible Grade 1 supporting-content placement. | **High.** `src/content/spelling-lists/phonics/kindergarten-ck-ending-words.md`; `kindergarten-double-consonants.md`; `src/lib/content/kindergartenProgression.ts`; `docs/architecture/CURRICULUM_MAP.md` rows 9–10. |

### Grade 1

| Canonical Grade Unit | Current equivalent and contributors | Status | Missing instructional subtopics / word-list coverage | Naming or grouping concern | Recommended product treatment | Confidence and evidence |
|---|---|---|---|---|---|---|
| **Consonant Digraphs and Blends** | Grade Units `grade-1-beginning-consonant-blends` and `grade-1-ending-consonant-blends`; Grade 1 digraph core/gateway lists; Skills CH/SH/TH/WH; individual blend lists. | **Substantially complete** | Needs one canonical sequence that explicitly distinguishes and joins digraphs with beginning and ending blends. No major raw-list gap. | Blends are split into narrow Grade Units; K Digraphs is a separate Grade Unit despite the blueprint’s Grade 1 primary placement. | **Merge** Grade 1 coverage; **represent K digraph exposure as embedded content rather than a standalone Grade Unit**. | **High.** `src/lib/content/grade1Progression.ts`; `src/content/spelling-lists/phonics/grade-1-beginning-consonant-blends.md`; `grade-1-ending-consonant-blends.md`; `kindergarten-consonant-digraphs.md`. |
| **Inflectional Endings** | Grade 1 core lists `grade-1-inflectional-endings-s-es` and `grade-1-inflectional-endings-ed-ing`. | **Partial** | Missing unit-level base-word/ending progression and three pronunciations of `-ed`. | Both lists are core milestones but neither is a Grade Unit. | **Merge** into one Grade 1 Grade Unit with focused subskills. | **High.** The two Grade 1 inflectional-ending files; `src/lib/content/grade1Progression.ts`. |
| **Silent E and Long Vowels** | Grade Unit `grade-1-long-vowels-silent-e`; Skills `silent-e-long-a/e/i/o/u`. | **Complete** | No material canonical gap. Later suffix work should reuse this knowledge. | The reusable Skills carry Grade 2 metadata despite Grade 1 primary introduction. | **Keep existing structure**; reconcile Skill grade metadata during placement review. | **High.** `src/content/spelling-lists/phonics/grade-1-long-vowels-silent-e.md`; `src/content/spelling-lists/phonics/silent-e-long-*.md`. |
| **Vowel Teams** | Grade Units `grade-1-long-a-long-o-vowel-teams` and `grade-1-long-e-vowel-teams`; Skills AI/AY, EE/EA, OA/OW; Grade 1 gateway practice. | **Substantially complete** | Needs one coherent Grade 1 unit-level sequence. Existing coverage supports AI/AY, EE/EA, and OA/OW; no evidence of a controlled plan for other long-vowel spellings. | Two narrow Grade Units represent one canonical unit; reusable Skills are tagged Grade 2. | **Merge** Grade Unit pages; retain pair pages as Skills. | **High.** `src/content/spelling-lists/phonics/grade-1-long-a-long-o-vowel-teams.md`; `grade-1-long-e-vowel-teams.md`; `src/lib/content/spellingSkills.ts`. |
| **Syllables and Two-Syllable Words** | `grade-1-open-syllables-final-y` only. | **Partial** | Missing syllable hearing/counting, regular two-syllable spelling, breaking words into syllables, and embedded open/closed-syllable use. | A narrow final-Y/open-syllable page is treated as a core milestone. | **Create new Grade Unit**; absorb open/closed labels and final-Y as subskills. | **High.** `src/content/spelling-lists/phonics/grade-1-open-syllables-final-y.md`; `src/lib/content/grade1Progression.ts`. |

### Grade 2

| Canonical Grade Unit | Current equivalent and contributors | Status | Missing instructional subtopics / word-list coverage | Naming or grouping concern | Recommended product treatment | Confidence and evidence |
|---|---|---|---|---|---|---|
| **R-Controlled Vowels** | `r-controlled-ar`, `r-controlled-or`, `r-controlled-er-ir-ur`; Grade 1 core r-controlled pages duplicate early placement. | **Substantially complete** | Missing a Grade 2 unit that treats all five spellings as one family and makes spelling alternatives explicit. | Correct Grade 2 lists coexist with incorrect Grade 1 core primary placement. | **Create new Grade Unit** in Grade 2; retain Grade 1 items only as optional preview/review if justified. | **High.** `src/content/spelling-lists/phonics/r-controlled-*.md`; `src/lib/content/grade1Progression.ts`. |
| **Diphthongs and Other Vowel Patterns** | `vowel-teams-oi-oy` and `vowel-teams-ou-ow`. | **Partial** | Missing a coherent Grade 2 unit and controlled coverage of other canonical families such as `oo` and `au/aw`. | “Vowel teams” obscures the Grade 1 long-vowel-team versus Grade 2 diphthong distinction. | **Create new Grade Unit** and clarify subskill taxonomy. | **High.** `src/content/spelling-lists/phonics/vowel-teams-oi-oy.md`; `vowel-teams-ou-ow.md`. |
| **Syllable Types and Multisyllabic Words** | No Grade 2 equivalent; Grade 3 has `3rd-grade-multisyllabic-words`. | **Missing** | Missing systematic syllable types, consonant-`le`, regular Grade 2 multisyllabic spelling, and use of vowel knowledge in longer words. | Grade 1 open-syllable and Grade 3 multisyllabic pages leave the Grade 2 bridge absent. | **Create new Grade Unit**. | **High.** `src/content/spelling-lists/grade-level/3rd-grade-multisyllabic-words.md`; canonical Grade 2 overview. |
| **Silent Letters and Ending Spelling Patterns** | `2nd-grade-silent-letter-words`; Grade 1 Floss, `-ck`, and `-tch/-dge` work. | **Partial** | Missing a unified Grade 2 explanation and controlled pattern sequence. Existing silent-letter list covers `wr`, `kn`, and `mb`; ending patterns are scattered across earlier grades. | Existing title is narrower than the canonical unit. | **Create new Grade Unit**; retain narrow ending pages as subskills/review. | **High.** `src/content/spelling-lists/grade-level/2nd-grade-silent-letter-words.md`; `src/content/spelling-lists/phonics/grade-1-floss-rule.md`; `grade-1-tch-dge-ending-rules.md`. |
| **Hard and Soft C and G** | None. | **Missing** | Missing hard/soft C, hard/soft G, positional generalizations, contrast instruction, and controlled word sets. | Absent canonical concept. | **Create new Grade Unit**. | **High.** Static inventory under `src/content/spelling-lists/`; canonical Grade 2 overview. |

### Grade 3

| Canonical Grade Unit | Current equivalent and contributors | Status | Missing instructional subtopics / word-list coverage | Naming or grouping concern | Recommended product treatment | Confidence and evidence |
|---|---|---|---|---|---|---|
| **Prefixes** | Grade Unit `grade-3-prefix-words`; Grade 2 `un-/re-` list is early exposure. | **Complete** | No material unit-level gap. | Grade 2 exposure should remain support, not a parallel morphology unit. | **Keep existing structure**. | **High.** `src/content/spelling-lists/grade-level/3rd-grade-prefix-words.md`; `2nd-grade-prefixes-un-re.md`. |
| **Suffixes** | Grade Unit `grade-3-suffix-words`; Grade 2 `-ful/-less` list is early exposure. | **Complete** | No material unit-level gap; ensure linkage to suffix-change work. | Some examples overlap the following spelling-changes unit, but the separation is defensible. | **Keep existing structure**. | **High.** `src/content/spelling-lists/grade-level/3rd-grade-suffix-words.md`; `2nd-grade-suffixes-ful-less.md`. |
| **Spelling Changes When Adding Suffixes** | Separate lists for doubling final consonants, dropping silent E, and changing Y to I. | **Substantially complete** | Missing `-ed` pronunciation treatment and a unified base-word-to-derived-word progression. | Three narrow rule pages are not one Grade Unit. | **Merge** into one Grade 3 Grade Unit with focused subskills. | **High.** `src/content/spelling-lists/grade-level/3rd-grade-doubling-final-consonants.md`; `3rd-grade-dropping-silent-e.md`; `3rd-grade-changing-y-to-i.md`. |
| **Plurals, Possessives, and Contractions** | Grade 2 regular plurals and contractions; Grade 1 `-s/-es` contributes. | **Partial** | Missing possessives, apostrophe instruction, Grade 3 sentence-level conventions framing, and controlled contrasts. | Contractions and plurals are currently primary Grade 2 lists. | **Create new Grade Unit**; treat Grade 1/2 work as prerequisite exposure/review. | **High.** `src/content/spelling-lists/grade-level/2nd-grade-regular-plurals.md`; `2nd-grade-contractions.md`; `src/content/spelling-lists/phonics/grade-1-inflectional-endings-s-es.md`. |
| **Homophones and Commonly Confused Words** | `3rd-grade-homophones`; simpler Grade 2 homophones list contributes. | **Substantially complete** | Missing Grade Unit/roadmap identity and explicit sentence-level/proofreading transfer. | Grade 2 and Grade 3 overlap without a documented introduction-versus-extension distinction. | **Create new Grade Unit** around the existing Grade 3 content. | **High.** `src/content/spelling-lists/grade-level/3rd-grade-homophones.md`; `2nd-grade-homophones.md`. |

### Grade 4

| Canonical Grade Unit | Current equivalent and contributors | Status | Missing instructional subtopics / word-list coverage | Naming or grouping concern | Recommended product treatment | Confidence and evidence |
|---|---|---|---|---|---|---|
| **Greek and Latin Roots** | `tier-1-roots-and-patterns`, `tier-2-greek-latin-roots`, advanced prefixes/suffixes. | **Substantially complete** | Missing one Grade 4 milestone linking roots, spelling, affixes, meaning, and academic-word use. | Internal tier labels do not communicate one parent-facing canonical unit. | **Merge** under one Grade 4 Grade Unit; retain separate Latin/Greek practice resources. | **High.** `src/content/spelling-lists/grade-level/tier-1-roots-and-patterns.md`; `tier-2-greek-latin-roots.md`; `4th-grade-advanced-prefixes.md`; `4th-grade-advanced-suffixes.md`. |
| **Advanced Multisyllabic Words** | `4th-grade-multisyllabic-academic-words`. | **Partial** | Missing integrated syllabication/morphology strategy, advanced word analysis, and embedded schwa/difficult-vowel work. | Current title identifies a word collection rather than an instructional unit. | **Create new Grade Unit** using the existing list as one practice set. | **High.** `src/content/spelling-lists/grade-level/4th-grade-multisyllabic-academic-words.md`. |
| **Final Stable Syllables and Common Word Endings** | `4th-grade-advanced-suffixes`; later `5th-grade-spelling-rules` has some related examples. | **Partial** | Missing explicit Grade 4 final stable syllables including `-tion`, `-sion`, and `-ture`; current examples are scattered. | Advanced suffix inventory is not the same as final stable syllables. | **Create new Grade Unit**; keep individual endings as subskills. | **High.** `src/content/spelling-lists/grade-level/4th-grade-advanced-suffixes.md`; `5th-grade-spelling-rules.md`. |
| **Derived Words and Word Meaning** | Grade 3 root-word families; Grade 4 advanced affixes and commonly confused words. | **Partial** | Missing explicit word-family analysis tying spelling, pronunciation, and meaning across derived forms; missing deliberately paired family sets. | Advanced prefixes/suffixes should support an integrated derived-word unit rather than become parallel Grade 4 canonical units. | **Merge** contributors into one broader Grade 4 Grade Unit. | **High.** `src/content/spelling-lists/grade-level/3rd-grade-root-word-families.md`; `4th-grade-advanced-prefixes.md`; `4th-grade-advanced-suffixes.md`; `4th-grade-commonly-confused-words.md`. |

### Grade 5

| Canonical Grade Unit | Current equivalent and contributors | Status | Missing instructional subtopics / word-list coverage | Naming or grouping concern | Recommended product treatment | Confidence and evidence |
|---|---|---|---|---|---|---|
| **Advanced Roots, Affixes, and Academic Words** | Greek/Latin word parts, prefix/suffix words, academic words, multisyllabic academic words. | **Substantially complete** | Missing a single integrative Grade 5 framework requiring productive morphology in academic/content-area words. No high-priority raw-list gap found. | Content is distributed among multiple topic lists rather than one canonical unit. | **Merge** as one Grade 5 Grade Unit with multiple contributing practice sets. | **High.** `src/content/spelling-lists/grade-level/5th-grade-greek-latin-word-parts.md`; `5th-grade-prefix-suffix-words.md`; `5th-grade-academic-words.md`; `5th-grade-multisyllabic-academic-words.md`. |
| **Spelling Changes in Related Words** | `5th-grade-spelling-rules`; Grade 3 suffix-change pages provide prerequisites. | **Partial** | Missing Grade 5 derivational changes across related words and related-word contrast sets. Existing Grade 5 list is largely an ending-pattern list. | “Spelling Rules” is too broad to name the canonical related-word purpose. | **Rename** and **split** framing: retain endings as a subskill and create the broader related-word unit. | **High.** `src/content/spelling-lists/grade-level/5th-grade-spelling-rules.md`; Grade 3 suffix-change files. |
| **Meaning-Based and Conventional Spelling** | Commonly confused words plus Grade 5 reading/writing, argument, and academic lists. | **Substantially complete** | Missing a single unit integrating usage choice, irregular/conventional spelling review, and independent proofreading transfer. | Current pages are topic/writing-purpose lists rather than a named spelling milestone. | **Create new Grade Unit** with current pages as contributors; keep proofreading embedded. | **High.** `src/content/spelling-lists/grade-level/5th-grade-commonly-confused-words.md`; `5th-grade-reading-writing-words.md`; `5th-grade-opinion-argument-words.md`; `5th-grade-academic-words.md`. |

## Cross-cutting audit findings

### Educationally useful content that does not fit the canonical Grade Unit curriculum

The following should retain a supplemental identity rather than become canonical Grade Units solely because they carry grade metadata:

- Kindergarten vocabulary/theme lists: animals, body, family, feelings, food, shapes, school, and number/color words.
- Grade 1–2 action, describing, and everyday-word lists.
- Grade 4–5 science, civics, math, reading/writing, and opinion/argument vocabulary.
- Challenge academic vocabulary.
- Dolch and Heart Word sequences.

This agrees with the content model distinction among Vocabulary/Theme Lists, Sight Word Sets, and Grade Units. Evidence: `docs/architecture/CONTENT_MODEL.md`; `src/content/spelling-lists/grade-level/`; `src/content/spelling-lists/sight-words/`; `src/content/spelling-lists/challenge/academic-vocabulary.md`.

### Duplicate or overlapping Grade Units

1. Kindergarten’s five individual vowel Grade Units and mixed review represent one canonical Short Vowels and CVC Words unit, while reusable vowel Skills already exist.
2. Grade 1 beginning and ending blends should be one canonical Consonant Digraphs and Blends unit.
3. Grade 1 long-A/O and long-E vowel-team units should be one canonical Vowel Teams unit.
4. Grade 1 CVC review plus C/K/CK is educationally useful but overlaps Kindergarten’s canonical CVC unit. It should be framed as review plus an orthographic-rule milestone, not a second CVC Grade Unit.
5. Grade 2 prefix/suffix lists overlap Grade 3 primary morphology. They are appropriate only as embedded support for Grade 2 multisyllabic work, not parallel primary units.

### Concepts assigned to the wrong primary grade

- `kindergarten-consonant-digraphs` is a Kindergarten Grade Unit/core step; the canonical primary placement is Grade 1, with only early exposure embedded in K.
- `grade-1-r-controlled-ar-or` and `grade-1-r-controlled-er-ir-ur` are Grade 1 core steps; canonical primary placement is Grade 2, where matching lists already exist.
- `2nd-grade-contractions` and `2nd-grade-regular-plurals` are early lists, but the canonical integrated conventions unit is Grade 3 and additionally requires possessives.
- `2nd-grade-homophones` is useful introductory exposure, but Grade 3 is the canonical primary meaning-based unit.
- `tch-dge-ending-words` is Grade 3 content, but belongs with Grade 2 silent letters and ending spelling patterns.

### Useful pages that should remain Skills rather than Grade Units

Focused pages for individual vowels, digraphs, blends, vowel teams, Silent E vowels, ending rules, and isolated suffix rules are useful Skills/subskills. Their scope is narrower than canonical Grade Units and their cross-grade/review value fits the Skill identity described in `docs/architecture/CONTENT_MODEL.md` and `docs/architecture/SKILLS_MODEL.md`.

The current public Skill index contains only Short Vowels, Consonant Digraphs, Silent E, and Vowel Teams. See `src/lib/content/spellingSkills.ts`. It should eventually expand to include focused ending-rule and morphology skills where those pages have genuine independent reuse.

### Canonical concepts that should be absorbed into broader units

- Kindergarten: phonological awareness, handwriting/letter formation, sentence dictation, and early digraph exposure.
- Grade 1: open/closed syllable labels.
- Grade 2: consonant-`le`, early prefixes/suffixes, and individual silent-letter subpatterns.
- Grade 4: schwa, dictionary syllabication/origin support, and hard/soft C/G review.
- Grade 5: proofreading, editing, and reference-tool use.

### Spiral strands

**Already present:** Dolch and Heart Word inventory through Grade 3; repeated short-/long-vowel and vowel-team practice; Grades 3–5 multisyllabic/academic-word lists; sentence-bank infrastructure in `src/lib/sentenceBank/`.

**Missing or insufficiently modeled:** a visible K–5 high-frequency strand; Grade Unit-level dictation and spelling-transfer guidance; explicit review/extension relationships across grades; and embedded proofreading transfer in Grades 3–5.

## Proposed final Grade Unit structure

This is an educational/roadmap structure, not a requirement for one page per row.

1. **Kindergarten:** Sounds, Letters, and Early Encoding; Short Vowels and CVC Words; High-Frequency Words.
2. **Grade 1:** Consonant Digraphs and Blends; Inflectional Endings; Silent E and Long Vowels; Vowel Teams; Syllables and Two-Syllable Words.
3. **Grade 2:** R-Controlled Vowels; Diphthongs and Other Vowel Patterns; Syllable Types and Multisyllabic Words; Silent Letters and Ending Spelling Patterns; Hard and Soft C and G.
4. **Grade 3:** Prefixes; Suffixes; Spelling Changes When Adding Suffixes; Plurals, Possessives, and Contractions; Homophones and Commonly Confused Words.
5. **Grade 4:** Greek and Latin Roots; Advanced Multisyllabic Words; Final Stable Syllables and Common Word Endings; Derived Words and Word Meaning.
6. **Grade 5:** Advanced Roots, Affixes, and Academic Words; Spelling Changes in Related Words; Meaning-Based and Conventional Spelling.

Focused phonics, spelling-rule, morphology, high-frequency, and vocabulary resources should be linked Skills, Sight Word Sets, Practice Sets, or supplemental lists—not automatically Grade Units.

## Ordered implementation backlog

1. Approve Grade Unit-to-Skill/Sight Word Set migration rules before changing content identity.
2. Reconcile the canonical curriculum with `docs/architecture/CONSTITUTION.md` and `docs/architecture/CONTENT_MODEL.md`; confirm how canonical units may compose existing resources.
3. Normalize Kindergarten into the three canonical milestones, move `kindergarten-ck-ending-words` and `kindergarten-double-consonants` to supporting/additional-practice content, and surface high-frequency content.
4. Normalize Grade 1 into the five canonical units and move r-controlled vowels to Grade 2 primary placement.
5. Build the missing Grade 2 roadmap and five Grade Units, beginning with syllable types/multisyllabic words and hard/soft C/G.
6. Promote and merge existing Grade 3 rule/conventions content into the three missing Grade 3 Grade Units.
7. Build Grade 4’s four roadmap units from existing roots, academic-word, and advanced-affix content, then fill final-stable-syllable and derived-word gaps.
8. Build Grade 5’s three integrated Grade Units from existing academic, morphology, and conventional-spelling lists.
9. Expand Skill families beyond early phonics and connect Grade Units through `skillIds`.
10. Add explicit spiral-strand guidance and embedded dictation, review, and proofreading transfer to Grade Unit standards.
11. Update grade hubs so Grades 2–5 use curated Grade Unit roadmaps rather than category-only aggregation.
12. Add validation/tests for role coverage, canonical ordering, unresolved Skill links, and approved primary-grade exceptions.

## Documentation reconciliation list

- `docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md` remains the authoritative educational blueprint.
- `docs/architecture/CONSTITUTION.md` and `docs/architecture/CONTENT_MODEL.md` need the approved implementation interpretation reflected explicitly.
- `docs/architecture/CURRICULUM_MAP.md` and `docs/architecture/SKILLS_MODEL.md` need current-to-canonical mappings and expanded Skill coverage.
- `docs/CURRICULUM_ARCHITECTURE.md`, `docs/CONTENT_ARCHITECTURE.md`, `docs/PHONICS_STRATEGY.md`, `docs/GRADE_LEVEL_STRATEGY.md`, `docs/LIST_ARCHITECTURE.md`, `docs/LIST_SPECIFICATIONS.md`, and `docs/WORD_CATALOG.md` need reconciliation with the approved structure.
- `docs/content/curriculum-bible.md` contains historical gap and grade-placement decisions that conflict with this canonical audit and should be explicitly marked/reconciled rather than silently followed.
- After implementation approval, update comments and tests around `src/content/config.ts`, `src/lib/content/gradeUnitSequence.ts`, `src/lib/content/kindergartenProgression.ts`, `src/lib/content/grade1Progression.ts`, and the Grade Unit/Skill family test suite.

## Risks and unresolved product decisions

1. **Representation:** Decide whether a canonical Grade Unit must be a content entry/page or may be a roadmap milestone that composes existing practice sets, Skills, and Sight Word Sets.
2. **Stable IDs and routes:** Preserve stable IDs and public URLs where possible. Do not silently repurpose a narrow ID for a materially broader user purpose.
3. **High-frequency words:** Decide whether K High-Frequency Words is a Grade Unit entry backed by sight-word sets or a named roadmap lane. Either can satisfy the curriculum if discoverable and coherent.
4. **Skill lifecycle:** The content model says a published Skill should have a published Grade Unit placement. Expanding Skills ahead of units requires staged drafts or an explicit exception.
5. **Grade hubs:** Grades 2–5 need roadmap data before their implementation can be curriculum-equivalent to K/1 rather than category browse pages.
6. **Instructional depth:** Final stable syllables, derived words, syllable types, and related-word changes require controlled instructional design—not generic vocabulary additions.
7. **Historical-document conflict:** Reconciliation must be explicit so older plans do not reintroduce superseded primary-grade assignments.
8. **Spiral strands:** Dictation, transfer, review, and proofreading should be cross-unit behavior, not duplicated Grade Units.

