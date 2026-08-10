import { describe, expect, it } from 'vitest';
import { gradeConfig } from './gradeConfig';
import { gradeHubCopy } from './gradeHubCopy';

describe('gradeHubCopy', () => {
  it('has complete authored copy for every configured grade without embedded numerical facts', () => {
    for (const { grade } of gradeConfig) {
      const copy = gradeHubCopy[grade];
      expect(copy.orientation).toHaveLength(2);
      for (const value of [copy.metaDescription, ...copy.orientation, copy.coreScope, copy.hfwRelationship, copy.themedFraming, copy.synthesis]) {
        expect(value.length).toBeGreaterThan(0);
      }
      expect([copy.coreScope, copy.hfwRelationship, copy.themedFraming].join(' ')).not.toMatch(/\b\d+\b/);
    }
  });
});
