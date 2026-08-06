/**
 * The single canonical Core Spelling sequence, Kindergarten First Words
 * through the Grade 5 terminal unit — one continuous K-5 instructional
 * journey, not per-grade islands (see the Canonical Navigation Relationships
 * review, docs/planning/CANONICAL_NAVIGATION_RELATIONSHIPS.md).
 *
 * This array is the sole source of truth for every Core Spelling page's
 * Review First / Next Step relationship: `getSequenceNeighbors()` in
 * `navigationSequence.ts` derives both from a page's position here. There is
 * intentionally no frontmatter `prerequisiteLists`/`nextLists` authored for
 * Core Spelling pages — this array is what those values used to duplicate,
 * and duplication of canonical truth is what caused the original
 * stale-reference bug this review fixes.
 *
 * Ids are the live Grade Hub `Core Spelling` card ids from `gradeHubCards.ts`
 * for each grade, in hub card order. Combined-roadmap-entry sibling pages
 * (e.g. `grade-1-long-e-vowel-teams`, `grade-3-doubling-final-consonants`)
 * are intentionally excluded — they are not independent hub cards and never
 * become independent chain steps; their separate Skill-support links are not
 * part of this bottom-of-page sequence.
 */
export const CORE_SPELLING_SEQUENCE: readonly string[] = [
  // Kindergarten
  'kindergarten-first-words',
  'kindergarten-short-a-words',
  'kindergarten-short-i-words',
  'kindergarten-short-o-words',
  'kindergarten-short-u-words',
  'kindergarten-short-e-words',
  'kindergarten-mixed-vowel-review',
  'kindergarten-consonant-digraphs',
  // Grade 1
  'grade-1-cvc-short-vowels-c-k-rule',
  'grade-1-floss-rule',
  'grade-1-consonant-digraphs-final-ck',
  'grade-1-beginning-consonant-blends',
  'grade-1-ending-consonant-blends',
  'grade-1-long-vowels-silent-e',
  'grade-1-open-syllables-final-y',
  'grade-1-long-a-long-o-vowel-teams',
  'grade-1-inflectional-endings-s-es',
  'grade-1-inflectional-endings-ed-ing',
  'grade-1-r-controlled-ar-or',
  'grade-1-tch-dge-ending-rules',
  // Grade 2
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
  // Grade 3
  'grade-3-prefix-words',
  'grade-3-suffix-words',
  'grade-3-suffix-spelling-changes',
  'grade-3-possessives',
  'grade-3-multisyllabic-words',
  'grade-3-homophones',
  'grade-3-root-word-families',
  // Grade 4
  'grade-4-multisyllabic-academic-words',
  'grade-4-advanced-prefixes',
  'grade-4-advanced-suffixes',
  'tier-1-roots-and-patterns',
  'grade-4-commonly-confused-words',
  'grade-4-derived-words',
  // Grade 5
  'grade-5-multisyllabic-academic-words',
  'grade-5-prefix-suffix-words',
  'grade-5-greek-latin-word-parts',
  'grade-5-commonly-confused-words',
  'grade-5-spelling-changes-related-words',
];
