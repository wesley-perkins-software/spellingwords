/**
 * The single canonical High-Frequency Words sequence, Kindergarten Common
 * Words 1 through Grade 5 Common Words 4 — one continuous K-5 instructional
 * journey, parallel to but separate from `CORE_SPELLING_SEQUENCE` (see the
 * Canonical Navigation Relationships review,
 * docs/planning/CANONICAL_NAVIGATION_RELATIONSHIPS.md).
 *
 * This array is the sole source of truth for every High-Frequency Words
 * page's Review First / Next Step relationship: `getSequenceNeighbors()` in
 * `navigationSequence.ts` derives both from a page's position here. There is
 * intentionally no frontmatter `prerequisiteLists`/`nextLists` authored for
 * High-Frequency Words pages.
 *
 * Ids are the live Grade Hub `High-Frequency Words` card ids from
 * `gradeHubCards.ts` for each grade, in hub card (numbered set) order.
 */
export const HF_WORDS_SEQUENCE: readonly string[] = [
  // Kindergarten
  'kindergarten-common-words-1',
  'kindergarten-common-words-2',
  'kindergarten-common-words-3',
  'kindergarten-common-words-4',
  // Grade 1
  'grade-1-common-words-1',
  'grade-1-common-words-2',
  'grade-1-common-words-3',
  'grade-1-common-words-4',
  'grade-1-common-words-5',
  'grade-1-common-words-6',
  // Grade 2
  'grade-2-common-words-1',
  'grade-2-common-words-2',
  'grade-2-common-words-3',
  'grade-2-common-words-4',
  'grade-2-common-words-5',
  'grade-2-common-words-6',
  // Grade 3
  'grade-3-common-words-1',
  'grade-3-common-words-2',
  'grade-3-common-words-3',
  'grade-3-common-words-4',
  'grade-3-common-words-5',
  // Grade 4
  'grade-4-common-words-1',
  'grade-4-common-words-2',
  'grade-4-common-words-3',
  'grade-4-common-words-4',
  // Grade 5
  'grade-5-common-words-1',
  'grade-5-common-words-2',
  'grade-5-common-words-3',
  'grade-5-common-words-4',
];
