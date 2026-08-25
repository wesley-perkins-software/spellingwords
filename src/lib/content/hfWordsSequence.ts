import type { GradeCode } from './gradeConfig';

/**
 * Canonical High-Frequency Words set order, grouped by grade. Each grade is
 * an independent collection: adjacency must never continue across a grade
 * boundary. The ids match the live canonical route manifest and Grade Hub
 * card order.
 */
export { HF_WORDS_SET_IDS_BY_GRADE as HF_WORDS_SEQUENCES } from './hfWordsCurriculum';

import { HF_WORDS_SET_IDS_BY_GRADE as HF_WORDS_SEQUENCES } from './hfWordsCurriculum';

/** Flat inventory retained for callers that need all canonical HFW ids, not adjacency. */
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
