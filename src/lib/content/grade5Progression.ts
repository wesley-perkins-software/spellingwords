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
 * focused sibling page (`grade-5-spelling-rules`, contentRole: skill) is
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
 * Grade 5 Common Words and Additional Practice are a separate, later
 * implementation phase — this file intentionally has no
 * GRADE_5_COMMON_WORD_IDS / GRADE_5_ADDITIONAL_PRACTICE_IDS exports yet.
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
];

/**
 * Card badge label, independent of `category` — matches the convention in
 * `grade1Progression.ts`/`grade2Progression.ts`/`grade3Progression.ts`/
 * `grade4Progression.ts`.
 */
export const grade5Badges: Record<string, string> = {
  'grade-5-multisyllabic-academic-words': 'Core Unit',
  'grade-5-prefix-suffix-words': 'Core Unit',
  'grade-5-spelling-rules': 'Focused Skill',
  'grade-5-greek-latin-word-parts': 'Core Unit',
  'grade-5-commonly-confused-words': 'Core Unit',
  'grade-5-spelling-changes-related-words': 'Core Unit',
};
