import { describe, expect, it } from 'vitest';
import {
  THEMED_SPELLING_PRACTICE_EXPLORE_MORE,
  getThemedSpellingPracticeExploreMore,
} from './themedSpellingPracticeExploreMore';
import { getCanonicalGradeRouteById, getCanonicalGradeRoutes } from './canonicalGradeRoutes';
import { getHighFrequencyNeighbors } from './hfWordsSequence';
import { getNonCoreNavigationModel } from './nonCoreNavigation';

const additionalRoutes = getCanonicalGradeRoutes().filter(
  (route) => route.classification === 'themed-spelling-practice',
);

describe('Themed Spelling Practice Explore More', () => {
  it('covers the exact canonical 5+5+5+4+4+4 inventory once', () => {
    expect(additionalRoutes).toHaveLength(27);
    expect(new Set(additionalRoutes.map(({ id }) => id)).size).toBe(27);
    expect(THEMED_SPELLING_PRACTICE_EXPLORE_MORE.map(({ sourceId }) => sourceId).sort()).toEqual(
      additionalRoutes.map(({ id }) => id).sort(),
    );
    expect(
      Object.fromEntries(
        ['K', '1', '2', '3', '4', '5'].map((grade) => [
          grade,
          additionalRoutes.filter((route) => route.grade === grade).length,
        ]),
      ),
    ).toEqual({ K: 5, '1': 5, '2': 5, '3': 4, '4': 4, '5': 4 });
  });

  it('gives every source exactly three unique, canonical, same-grade Themed Spelling Practice peers', () => {
    for (const { sourceId, targetIds, rationale } of THEMED_SPELLING_PRACTICE_EXPLORE_MORE) {
      const source = getCanonicalGradeRouteById(sourceId);
      expect(source?.classification, sourceId).toBe('themed-spelling-practice');
      expect(targetIds).toHaveLength(3);
      expect(new Set(targetIds).size, sourceId).toBe(3);
      expect(targetIds, sourceId).not.toContain(sourceId);
      expect(rationale.length, sourceId).toBeGreaterThan(20);
      expect(getThemedSpellingPracticeExploreMore(sourceId), sourceId).toEqual(targetIds);

      for (const targetId of targetIds) {
        expect(getCanonicalGradeRouteById(targetId), `${sourceId} -> ${targetId}`).toMatchObject({
          classification: 'themed-spelling-practice',
          grade: source?.grade,
          canonicalPath: expect.stringMatching(/^\/(kindergarten|grade-[1-5])\//),
        });
      }
    }
  });

  it('recommends every other peer for grades with exactly four pages', () => {
    for (const grade of ['3', '4', '5'] as const) {
      const gradeIds = additionalRoutes
        .filter((route) => route.grade === grade)
        .map(({ id }) => id);
      for (const sourceId of gradeIds) {
        expect([...getThemedSpellingPracticeExploreMore(sourceId)].sort()).toEqual(
          gradeIds.filter((id) => id !== sourceId).sort(),
        );
      }
    }
  });

  it('keeps coverage balanced and leaves no orphan target in the five-page grades', () => {
    for (const grade of ['K', '1', '2'] as const) {
      const gradeIds = additionalRoutes
        .filter((route) => route.grade === grade)
        .map(({ id }) => id);
      const inboundCounts = gradeIds.map(
        (id) =>
          gradeIds.filter((sourceId) => getThemedSpellingPracticeExploreMore(sourceId).includes(id))
            .length,
      );
      expect(Math.min(...inboundCounts), grade).toBeGreaterThan(0);
      expect(Math.max(...inboundCounts) - Math.min(...inboundCounts), grade).toBeLessThanOrEqual(2);
    }
  });

  it('returns no recommendations for Core, HFW, Skill, or unknown ids', () => {
    expect(getThemedSpellingPracticeExploreMore('kindergarten-first-words')).toEqual([]);
    expect(getThemedSpellingPracticeExploreMore('kindergarten-high-frequency-words-set-1')).toEqual([]);
    expect(getThemedSpellingPracticeExploreMore('short-a-words')).toEqual([]);
    expect(getThemedSpellingPracticeExploreMore('not-real')).toEqual([]);
  });

  it('resolves Explore more only in the complete non-Core navigation model', () => {
    for (const route of getCanonicalGradeRoutes()) {
      const model = getNonCoreNavigationModel(route.classification, route.id);
      if (route.classification === 'core-spelling') {
        expect(model, route.id).toBeUndefined();
        continue;
      }
      expect(model?.reviewIds, route.id).toEqual([]);
      expect(model?.nextIds, route.id).toEqual([]);
      expect(model?.exploreIds, route.id).toHaveLength(
        route.classification === 'themed-spelling-practice'
          ? 3
          : getHighFrequencyNeighbors(route.id).previousId &&
              getHighFrequencyNeighbors(route.id).nextId
            ? 2
            : 1,
      );
    }
  });
});
