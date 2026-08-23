import type { GradeCode } from './gradeConfig';

export interface GradeProgressionExample {
  /** Content-collection id of the canonical Core Spelling unit these words are drawn from. */
  sourceListId: string;
  /** Three representative words from that unit's word list, in curriculum order. */
  words: readonly string[];
}

/**
 * A small, hand-curated set of representative words per grade, used only by
 * the `/grades` progression page to make the K-5 difficulty arc concrete.
 * Every word is drawn verbatim from a single canonical Core Spelling unit
 * (see gradeProgressionExamples.test.ts, which validates each word against
 * that unit's actual frontmatter word list) — nothing here is invented.
 */
export const gradeProgressionExamples: Record<GradeCode, GradeProgressionExample> = {
  K: { sourceListId: 'kindergarten-first-words', words: ['cat', 'dog', 'sun'] },
  '1': { sourceListId: 'grade-1-long-vowels-silent-e', words: ['cake', 'ride', 'home'] },
  '2': { sourceListId: 'grade-2-two-syllable-words', words: ['rabbit', 'basket', 'picnic'] },
  '3': { sourceListId: 'grade-3-root-word-families', words: ['report', 'signal', 'action'] },
  '4': { sourceListId: 'tier-1-roots-and-patterns', words: ['transport', 'predict', 'construct'] },
  '5': {
    sourceListId: 'grade-5-greek-latin-word-parts',
    words: ['photography', 'transportation', 'description'],
  },
};
