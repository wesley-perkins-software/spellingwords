/**
 * Curated Grade 2 Core Spelling order, hand-maintained like `gradeConfig.ts`/
 * `gradeHubCopy.ts` rather than derived from content frontmatter. This is the
 * only export consumed outside this file today — it feeds `CURATED_GRADE_ORDER`
 * in `gradeUnitSequence.ts`, which powers the cross-grade K-5 Grade Unit
 * sequence (world-kit assignment). The Grade 2 hub itself is driven directly
 * by `GRADE_2_HUB_SECTIONS` in `gradeHubCards.ts`, independent of this file.
 */
export const GRADE_2_CORE_IDS: readonly string[] = [
  'grade-2-long-e-ee-ea',
  'grade-2-long-i-ie-igh',
  'vowel-teams-oi-oy',
  'vowel-teams-ou-ow',
  'grade-2-oo-two-sounds',
  'grade-2-au-aw-words',
  'grade-2-r-controlled-er-ir-ur',
  'grade-2-soft-c-soft-g',
  'grade-2-two-syllable-words',
  'grade-2-final-stable-le',
  'grade-2-silent-letter-words',
  'grade-2-list-02',
  'grade-2-contractions',
];

/**
 * Grade 2 Common Words sets. Documentation only — `sight-word-set` is not a
 * `grade-unit`, so these ids never enter `buildGradeUnitSequence()`. Kept for
 * parity with the K/Grade 1 progression files and any future badge lookup.
 */
export const GRADE_2_COMMON_WORD_IDS: readonly string[] = [
  'grade-2-common-words-1',
  'grade-2-common-words-2',
  'grade-2-common-words-3',
  'grade-2-common-words-4',
  'grade-2-common-words-5',
  'grade-2-common-words-6',
  'grade-2-common-words-7',
];

/**
 * Grade 2 Additional Practice. Documentation only — `vocabulary-theme` is not
 * a `grade-unit`, so these ids never enter `buildGradeUnitSequence()` either.
 */
export const GRADE_2_VOCABULARY_IDS: readonly string[] = [
  'grade-2-months-of-the-year',
  'grade-2-money-words',
  'grade-2-number-words-20-100',
];

/**
 * Card badge label, independent of `category` — matches the convention in
 * `kindergartenProgression.ts`/`grade1Progression.ts`.
 */
export const grade2Badges: Record<string, string> = {
  'grade-2-long-e-ee-ea': 'Core Unit',
  'grade-2-long-i-ie-igh': 'Core Unit',
  'vowel-teams-oi-oy': 'Core Unit',
  'vowel-teams-ou-ow': 'Core Unit',
  'grade-2-oo-two-sounds': 'Core Unit',
  'grade-2-au-aw-words': 'Core Unit',
  'grade-2-r-controlled-er-ir-ur': 'Core Unit',
  'grade-2-soft-c-soft-g': 'Core Unit',
  'grade-2-two-syllable-words': 'Core Unit',
  'grade-2-final-stable-le': 'Core Unit',
  'grade-2-silent-letter-words': 'Core Unit',
  'grade-2-list-02': 'Core Unit',
  'grade-2-contractions': 'Core Unit',
  'grade-2-common-words-1': 'Common Words',
  'grade-2-common-words-2': 'Common Words',
  'grade-2-common-words-3': 'Common Words',
  'grade-2-common-words-4': 'Common Words',
  'grade-2-common-words-5': 'Common Words',
  'grade-2-common-words-6': 'Common Words',
  'grade-2-common-words-7': 'Common Words',
  'grade-2-months-of-the-year': 'Vocabulary',
  'grade-2-money-words': 'Vocabulary',
  'grade-2-number-words-20-100': 'Vocabulary',
};

// NOTE: `[category]/[slug].astro` and `GradeUnitWorldPage.astro` render a
// "Grade N Spelling · Step X of Y" banner for any grade-unit that declares
// `skillIds`, but the position lookup (`getKindergartenRoadmapPosition` in
// `kindergartenProgression.ts`) is hardcoded to Kindergarten's progression
// only — it is not yet grade-aware. Several Grade 2 core cards declare
// `skillIds` (`grade-2-two-syllable-words`, `grade-2-silent-letter-words`,
// `grade-2-soft-c-soft-g`, `vowel-teams-oi-oy`, `vowel-teams-ou-ow`,
// `grade-2-oo-two-sounds`, `grade-2-au-aw-words`), so each correctly gets the
// "Go deeper" Skill callout and shows example sentences in its word list, but
// none will show a step badge, and their Skills' reverse "Where this fits"
// lookup will show "Grade 2" with no step count for that placement. This is a
// pre-existing single-grade limitation, not something introduced by Grade 2 —
// generalizing it would mean editing shared K-rendering template code, which
// is out of this implementation's scope.
