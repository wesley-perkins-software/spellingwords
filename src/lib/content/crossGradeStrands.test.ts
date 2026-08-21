import { describe, expect, it } from 'vitest';
import { canonicalGradeRoutes, GRADE_STRANDS } from './canonicalGradeRoutes';
import {
  CROSS_GRADE_STRAND_PATHS,
  crossGradeStrandCopy,
  themedTopicLabels,
} from './crossGradeStrands';
import { gradeConfig } from './gradeConfig';

describe('cross-grade strand architecture', () => {
  it('publishes exactly the three approved top-level routes', () => {
    expect(CROSS_GRADE_STRAND_PATHS).toEqual({
      'core-spelling': '/core-spelling',
      'high-frequency-words': '/high-frequency-words',
      'themed-spelling-practice': '/themed-spelling-practice',
    });
    expect(Object.keys(crossGradeStrandCopy)).toEqual(Object.keys(GRADE_STRANDS));
  });

  it('has distinct grade synthesis and a complete 27-topic catalog', () => {
    for (const copy of Object.values(crossGradeStrandCopy)) {
      expect(Object.keys(copy.gradeSummaries)).toEqual(gradeConfig.map(({ grade }) => grade));
      expect(new Set(Object.values(copy.gradeSummaries)).size).toBe(6);
    }

    const topics = Object.values(themedTopicLabels).flat();
    expect(topics).toHaveLength(27);
    expect(new Set(topics.map(({ id }) => id)).size).toBe(27);
    expect(new Set(topics.map(({ label }) => label)).size).toBe(27);
    for (const { id } of topics) {
      expect(canonicalGradeRoutes).toContainEqual(
        expect.objectContaining({
          id,
          classification: 'themed-spelling-practice',
        }),
      );
    }
  });
});
