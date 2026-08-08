/**
 * Curated Grade 4 Core Spelling order, hand-maintained like `gradeConfig.ts`/
 * `gradeHubCopy.ts` rather than derived from content frontmatter. This is the
 * only export consumed outside this file today — it feeds `CURATED_GRADE_ORDER`
 * in `gradeUnitSequence.ts`, which powers the cross-grade K-5 Grade Unit
 * sequence (world-kit assignment). The Grade 4 hub itself is driven directly
 * by `GRADE_4_HUB_SECTIONS` in `gradeHubCards.ts`, independent of this file.
 *
 * Two canonical Grade 4 units (`grade-4-advanced-suffixes`,
 * `tier-1-roots-and-patterns`) are single roadmap entries.
 */
export const GRADE_4_CORE_IDS: readonly string[] = [
  'grade-4-multisyllabic-academic-words',
  'grade-4-advanced-prefixes',
  'grade-4-advanced-suffixes',
  'tier-1-roots-and-patterns',
  'grade-4-commonly-confused-words',
  'grade-4-derived-words',
];

/**
 * Off-hub Grade 4 vocabulary, not yet High-Frequency Words. Documentation only —
 * `vocabulary-theme` (and undeclared `contentRole`) is not a `grade-unit`, so
 * these ids never enter `buildGradeUnitSequence()`.
 */
export const GRADE_4_VOCABULARY_IDS: readonly string[] = [];

/**
 * Grade 4 High-Frequency Words sets, published. Documentation only —
 * `high-frequency-word-set` is not a `grade-unit`, so these ids never enter
 * `buildGradeUnitSequence()`. The Grade 4 hub's High-Frequency Words section
 * is driven directly by `GRADE_4_HUB_SECTIONS` in `gradeHubCards.ts`,
 * independent of this file.
 */
export const GRADE_4_HFW_SET_IDS: readonly string[] = [
  'grade-4-high-frequency-words-set-1',
  'grade-4-high-frequency-words-set-2',
];

/**
 * Grade 4 Themed Spelling Practice, published. Documentation only —
 * `vocabulary-theme` is not a `grade-unit`, so this id never enters
 * `buildGradeUnitSequence()` either.
 */
export const GRADE_4_THEMED_SPELLING_PRACTICE_IDS: readonly string[] = ['grade-4-measurement-words'];

/**
 * Card badge label, independent of `category` — matches the convention in
 * `grade1Progression.ts`/`grade2Progression.ts`/`grade3Progression.ts`.
 */
export const grade4Badges: Record<string, string> = {
  'grade-4-multisyllabic-academic-words': 'Core Unit',
  'grade-4-advanced-prefixes': 'Core Unit',
  'grade-4-advanced-suffixes': 'Core Unit',
  'tier-1-roots-and-patterns': 'Core Unit',
  'grade-4-commonly-confused-words': 'Core Unit',
  'grade-4-derived-words': 'Core Unit',
  'grade-4-high-frequency-words-set-1': 'High-Frequency Words',
  'grade-4-high-frequency-words-set-2': 'High-Frequency Words',
  'grade-4-measurement-words': 'Vocabulary',
};
