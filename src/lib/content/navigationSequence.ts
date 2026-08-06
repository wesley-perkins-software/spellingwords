import { CORE_SPELLING_SEQUENCE } from './coreSpellingSequence';
import { HF_WORDS_SEQUENCE } from './hfWordsSequence';

export type SequenceNeighbors = {
  prerequisiteId?: string;
  nextId?: string;
};

export type CoreNavigationModel = {
  reviewIds: readonly string[];
  nextIds: readonly string[];
  exploreIds: readonly string[];
};

/**
 * Precomputed id -> index lookups for both canonical sequences, built once
 * at module load rather than per call.
 */
const CORE_SPELLING_INDEX: ReadonlyMap<string, number> = new Map(
  CORE_SPELLING_SEQUENCE.map((id, index) => [id, index]),
);
const HF_WORDS_INDEX: ReadonlyMap<string, number> = new Map(HF_WORDS_SEQUENCE.map((id, index) => [id, index]));

/**
 * Returns the Review First (`prerequisiteId`) and Next Step (`nextId`) ids
 * for a page, derived from its position in whichever canonical sequence
 * (`CORE_SPELLING_SEQUENCE` or `HF_WORDS_SEQUENCE`) it belongs to.
 *
 * A page absent from both sequences — every Additional Practice page, every
 * combined-roadmap sibling, every reusable Skill page — returns `{}`, which
 * is exactly correct: those pages never have a Review First or Next Step.
 * The two sequences are checked independently, so an id present in one is
 * never treated as adjacent to an id in the other; this is what keeps the
 * Core Spelling and High-Frequency Words chains from crossing.
 */
export function getSequenceNeighbors(id: string): SequenceNeighbors {
  const coreIndex = CORE_SPELLING_INDEX.get(id);
  if (coreIndex !== undefined) {
    return {
      prerequisiteId: CORE_SPELLING_SEQUENCE[coreIndex - 1],
      nextId: CORE_SPELLING_SEQUENCE[coreIndex + 1],
    };
  }

  const hfIndex = HF_WORDS_INDEX.get(id);
  if (hfIndex !== undefined) {
    return {
      prerequisiteId: HF_WORDS_SEQUENCE[hfIndex - 1],
      nextId: HF_WORDS_SEQUENCE[hfIndex + 1],
    };
  }

  return {};
}

/**
 * The complete bottom-navigation model for a canonical Core page. Keeping
 * the empty Explore More bucket in this resolved model makes the product rule
 * explicit and testable instead of leaving it to template branching.
 */
export function getCoreNavigationModel(id: string): CoreNavigationModel | undefined {
  if (!CORE_SPELLING_INDEX.has(id)) return undefined;
  const { prerequisiteId, nextId } = getSequenceNeighbors(id);
  return {
    reviewIds: prerequisiteId ? [prerequisiteId] : [],
    nextIds: nextId ? [nextId] : [],
    exploreIds: [],
  };
}
