import type { GradeRouteClassification } from './canonicalGradeRoutes';
import { getThemedSpellingPracticeExploreMore } from './themedSpellingPracticeExploreMore';
import { getHighFrequencyNeighbors } from './hfWordsSequence';

export type NonCoreNavigationModel = {
  reviewIds: readonly string[];
  nextIds: readonly string[];
  exploreIds: readonly string[];
};

/**
 * Resolves the complete bottom-navigation model for a canonical non-Core
 * route. The caller supplies manifest classification, preventing accidental
 * classification from content metadata or naming conventions.
 */
export function getNonCoreNavigationModel(
  classification: GradeRouteClassification,
  id: string,
): NonCoreNavigationModel | undefined {
  if (classification === 'core-spelling') return undefined;

  if (classification === 'high-frequency-words') {
    const { previousId, nextId } = getHighFrequencyNeighbors(id);
    return {
      reviewIds: [],
      nextIds: [],
      exploreIds: [previousId, nextId].filter(
        (targetId): targetId is string => targetId !== undefined,
      ),
    };
  }

  return {
    reviewIds: [],
    nextIds: [],
    exploreIds: getThemedSpellingPracticeExploreMore(id),
  };
}
