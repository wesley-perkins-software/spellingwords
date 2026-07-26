/**
 * Curated Grade 4 Core Spelling order, hand-maintained like `gradeConfig.ts`/
 * `gradeHubCopy.ts` rather than derived from content frontmatter. This is the
 * only export consumed outside this file today — it feeds `CURATED_GRADE_ORDER`
 * in `gradeUnitSequence.ts`, which powers the cross-grade K-5 Grade Unit
 * sequence (world-kit assignment). The Grade 4 hub itself is driven directly
 * by `GRADE_4_HUB_SECTIONS` in `gradeHubCards.ts`, independent of this file.
 *
 * Two canonical Grade 4 units are combined roadmap entries: only each
 * anchor page (`grade-4-advanced-suffixes`, `tier-1-roots-and-patterns`,
 * both contentRole: grade-unit) appears here. Their focused sibling pages
 * (`grade-4-final-stable-syllables`, `tier-2-greek-latin-roots`, both
 * contentRole: skill) are reached from the anchor's related-practice links
 * rather than entering the Grade Unit sequence directly — the same pattern
 * Grade 3 uses for its Suffix Spelling Changes unit.
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
 * Off-hub Grade 4 vocabulary, not yet Common Words. Documentation only —
 * `vocabulary-theme` (and undeclared `contentRole`) is not a `grade-unit`, so
 * these ids never enter `buildGradeUnitSequence()`.
 */
export const GRADE_4_VOCABULARY_IDS: readonly string[] = [
  'grade-4-list-01',
  'grade-4-reading-writing-words',
  'grade-4-list-02',
];

/**
 * Card badge label, independent of `category` — matches the convention in
 * `grade1Progression.ts`/`grade2Progression.ts`/`grade3Progression.ts`.
 */
export const grade4Badges: Record<string, string> = {
  'grade-4-multisyllabic-academic-words': 'Core Unit',
  'grade-4-advanced-prefixes': 'Core Unit',
  'grade-4-advanced-suffixes': 'Core Unit',
  'grade-4-final-stable-syllables': 'Focused Skill',
  'tier-1-roots-and-patterns': 'Core Unit',
  'tier-2-greek-latin-roots': 'Focused Skill',
  'grade-4-commonly-confused-words': 'Core Unit',
  'grade-4-derived-words': 'Core Unit',
};
