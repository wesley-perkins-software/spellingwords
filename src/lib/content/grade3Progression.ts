/**
 * Curated Grade 3 Core Spelling order, hand-maintained like `gradeConfig.ts`/
 * `gradeHubCopy.ts` rather than derived from content frontmatter. This is the
 * only export consumed outside this file today — it feeds `CURATED_GRADE_ORDER`
 * in `gradeUnitSequence.ts`, which powers the cross-grade K-5 Grade Unit
 * sequence (world-kit assignment). The Grade 3 hub itself is driven directly
 * by `GRADE_3_HUB_SECTIONS` in `gradeHubCards.ts`, independent of this file.
 *
 * The Suffix Spelling Changes unit is a combined roadmap entry: only its
 * anchor page (`grade-3-dropping-silent-e`, contentRole: grade-unit) appears
 * here. Its two sibling focused pages (`grade-3-doubling-final-consonants`,
 * `grade-3-changing-y-to-i`, both contentRole: skill) are reached from the
 * anchor's "Go deeper" links rather than entering the Grade Unit sequence
 * directly — the same pattern Grade 1 uses for `grade-1-long-a-long-o-vowel-teams`.
 */
export const GRADE_3_CORE_IDS: readonly string[] = [
  'grade-3-prefix-words',
  'grade-3-suffix-words',
  'grade-3-dropping-silent-e',
  'grade-3-possessives',
  'grade-3-multisyllabic-words',
  'grade-3-homophones',
  'grade-3-root-word-families',
];

/**
 * Grade 3 Common Words, published. Documentation only — `sight-word-set` is
 * not a `grade-unit`, so these ids never enter `buildGradeUnitSequence()`.
 * The Grade 3 hub's High-Frequency Words section is driven directly by
 * `GRADE_3_HUB_SECTIONS` in `gradeHubCards.ts`, independent of this file.
 */
export const GRADE_3_COMMON_WORD_IDS: readonly string[] = [
  'grade-3-common-words-1',
  'grade-3-common-words-2',
  'grade-3-common-words-3',
  'grade-3-common-words-4',
  'grade-3-common-words-5',
];

/**
 * Off-hub Grade 3 vocabulary and legacy-reclassified library content.
 * Documentation only — `vocabulary-theme` (and undeclared `contentRole`) is
 * not a `grade-unit`, so these ids never enter `buildGradeUnitSequence()`.
 */
export const GRADE_3_VOCABULARY_IDS: readonly string[] = [
  'grade-3-list-01',
  'grade-3-list-02',
  'grade-3-reading-writing-words',
  'grade-2-prefixes-un-re',
  'grade-2-suffixes-ful-less',
  'grade-2-comparatives-er-est',
  'grade-2-homophones',
];

/**
 * Card badge label, independent of `category` — matches the convention in
 * `grade1Progression.ts`/`grade2Progression.ts`.
 */
export const grade3Badges: Record<string, string> = {
  'grade-3-prefix-words': 'Core Unit',
  'grade-3-suffix-words': 'Core Unit',
  'grade-3-dropping-silent-e': 'Core Unit',
  'grade-3-doubling-final-consonants': 'Focused Skill',
  'grade-3-changing-y-to-i': 'Focused Skill',
  'grade-3-possessives': 'Core Unit',
  'grade-3-multisyllabic-words': 'Core Unit',
  'grade-3-homophones': 'Core Unit',
  'grade-3-root-word-families': 'Core Unit',
  'grade-3-common-words-1': 'Common Words',
  'grade-3-common-words-2': 'Common Words',
  'grade-3-common-words-3': 'Common Words',
  'grade-3-common-words-4': 'Common Words',
  'grade-3-common-words-5': 'Common Words',
};
