import type { GradeCode } from './gradeConfig';

/**
 * Canonical High-Frequency Words set order, grouped by grade. Each grade is
 * an independent collection: adjacency must never continue across a grade
 * boundary. The ids match the live canonical route manifest and Grade Hub
 * card order.
 */
export const HF_WORDS_SEQUENCES = {
  K: [
    'kindergarten-common-words-1',
    'kindergarten-common-words-2',
    'kindergarten-common-words-3',
    'kindergarten-common-words-4',
  ],
  '1': [
    'grade-1-common-words-1',
    'grade-1-common-words-2',
    'grade-1-common-words-3',
    'grade-1-common-words-4',
    'grade-1-common-words-5',
    'grade-1-common-words-6',
  ],
  '2': [
    'grade-2-common-words-1',
    'grade-2-common-words-2',
    'grade-2-common-words-3',
    'grade-2-common-words-4',
    'grade-2-common-words-5',
    'grade-2-common-words-6',
  ],
  '3': [
    'grade-3-common-words-1',
    'grade-3-common-words-2',
    'grade-3-common-words-3',
    'grade-3-common-words-4',
    'grade-3-common-words-5',
  ],
  '4': [
    'grade-4-common-words-1',
    'grade-4-common-words-2',
    'grade-4-common-words-3',
    'grade-4-common-words-4',
  ],
  '5': [
    'grade-5-common-words-1',
    'grade-5-common-words-2',
    'grade-5-common-words-3',
    'grade-5-common-words-4',
  ],
} as const satisfies Record<GradeCode, readonly string[]>;

/** Flat inventory retained for callers that need all 29 ids, not adjacency. */
export const HF_WORDS_SEQUENCE: readonly string[] = Object.values(HF_WORDS_SEQUENCES).flat();

export type HighFrequencyNeighbors = {
  previousId?: string;
  nextId?: string;
};

const highFrequencyPosition: ReadonlyMap<string, { sequence: readonly string[]; index: number }> =
  new Map(
    Object.values(HF_WORDS_SEQUENCES).flatMap((sequence) =>
      sequence.map((id, index) => [id, { sequence, index }] as const),
    ),
  );

/** Returns adjacent sets only from the source page's own grade. */
export function getHighFrequencyNeighbors(id: string): HighFrequencyNeighbors {
  const position = highFrequencyPosition.get(id);
  if (!position) return {};
  return {
    previousId: position.sequence[position.index - 1],
    nextId: position.sequence[position.index + 1],
  };
}
