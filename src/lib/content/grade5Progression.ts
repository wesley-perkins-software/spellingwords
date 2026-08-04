/**
 * Curated Grade 5 Core Spelling order, hand-maintained like `gradeConfig.ts`/
 * `gradeHubCopy.ts` rather than derived from content frontmatter. This is the
 * only export consumed outside this file today — it feeds `CURATED_GRADE_ORDER`
 * in `gradeUnitSequence.ts`, which powers the cross-grade K-5 Grade Unit
 * sequence (world-kit assignment). The Grade 5 hub itself is driven directly
 * by `GRADE_5_HUB_SECTIONS` in `gradeHubCards.ts`, independent of this file.
 *
 * One canonical Grade 5 unit ("Advanced Roots, Affixes, and Academic Words")
 * is a combined roadmap entry: only the anchor page
 * (`grade-5-prefix-suffix-words`, contentRole: grade-unit) appears here. Its
 * supporting page (`grade-5-spelling-rules`, contentRole: supporting-practice) is
 * reached from the anchor's related-practice links rather than entering the
 * Grade Unit sequence directly — the same pattern Grade 4 uses for its
 * Advanced Suffixes and Final Stable Syllables unit.
 *
 * Grade 5 is the K-5 capstone: the sequence ends on
 * `grade-5-spelling-changes-related-words`, not the Commonly Confused Words
 * accuracy card, to keep the "final Core Spelling card is the most
 * generative, novel-that-grade morphological synthesis concept" pattern
 * Grades 3-4 established (Root Word Families; Derived Words and Word
 * Meaning). Commonly Confused Words sits second-to-last, the same slot the
 * accuracy card holds in Grades 3-4.
 *
 * Grade 5 Additional Practice ships two cards (Civics and Government Words;
 * Money Management Words) after auditing three other candidates —
 * Science Words and Math Vocabulary read as open, subject-wide vocabulary
 * (the same defect that sank Grade 2's and Grade 4's generic "Math"/"Science"
 * candidates) rather than a genuinely closed, standard-named set, so they
 * stay off-hub vocabulary (see GRADE_5_VOCABULARY_IDS) instead of being
 * promoted. Geography was not reconsidered — Section 1 of
 * `K5_FINAL_CONTENT_ARCHITECTURE.md` blocklists it by name.
 */
export const GRADE_5_CORE_IDS: readonly string[] = [
  'grade-5-multisyllabic-academic-words',
  'grade-5-prefix-suffix-words',
  'grade-5-greek-latin-word-parts',
  'grade-5-commonly-confused-words',
  'grade-5-spelling-changes-related-words',
];

/**
 * Off-hub Grade 5 vocabulary, not yet Common Words. Documentation only —
 * undeclared `contentRole` is not a `grade-unit`, so these ids never enter
 * `buildGradeUnitSequence()`.
 */
export const GRADE_5_VOCABULARY_IDS: readonly string[] = [
  'grade-5-list-01',
  'grade-5-academic-words',
  'grade-5-reading-writing-words',
  'grade-5-opinion-argument-words',
  'grade-5-science-nature-words',
  'grade-5-math-vocabulary',
];

/**
 * Grade 5 Common Words sets, published. Documentation only —
 * `sight-word-set` is not a `grade-unit`, so these ids never enter
 * `buildGradeUnitSequence()`. The Grade 5 hub's High-Frequency Words section
 * is driven directly by `GRADE_5_HUB_SECTIONS` in `gradeHubCards.ts`,
 * independent of this file.
 */
export const GRADE_5_COMMON_WORD_IDS: readonly string[] = [
  'grade-5-common-words-1',
  'grade-5-common-words-2',
  'grade-5-common-words-3',
  'grade-5-common-words-4',
];

/**
 * Grade 5 Additional Practice, published. Documentation only —
 * `vocabulary-theme` is not a `grade-unit`, so these ids never enter
 * `buildGradeUnitSequence()` either.
 */
export const GRADE_5_ADDITIONAL_PRACTICE_IDS: readonly string[] = [
  'grade-5-community-civics-words',
  'grade-5-money-management-words',
];

/**
 * Card badge label, independent of `category` — matches the convention in
 * `grade1Progression.ts`/`grade2Progression.ts`/`grade3Progression.ts`/
 * `grade4Progression.ts`.
 */
export const grade5Badges: Record<string, string> = {
  'grade-5-multisyllabic-academic-words': 'Core Unit',
  'grade-5-prefix-suffix-words': 'Core Unit',
  'grade-5-spelling-rules': 'Supporting Practice',
  'grade-5-greek-latin-word-parts': 'Core Unit',
  'grade-5-commonly-confused-words': 'Core Unit',
  'grade-5-spelling-changes-related-words': 'Core Unit',
  'grade-5-common-words-1': 'Common Words',
  'grade-5-common-words-2': 'Common Words',
  'grade-5-common-words-3': 'Common Words',
  'grade-5-common-words-4': 'Common Words',
  'grade-5-community-civics-words': 'Vocabulary',
  'grade-5-money-management-words': 'Vocabulary',
};
