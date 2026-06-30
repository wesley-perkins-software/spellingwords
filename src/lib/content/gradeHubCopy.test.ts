import { describe, expect, it } from 'vitest';
import { gradeConfig } from './gradeConfig';
import { gradeHubCopy } from './gradeHubCopy';

describe('gradeHubCopy', () => {
  it('has an entry with non-empty copy for every configured grade', () => {
    for (const { grade } of gradeConfig) {
      const copy = gradeHubCopy[grade];
      expect(copy).toBeDefined();
      expect(copy.metaDescription.length).toBeGreaterThan(0);
      expect(copy.heroParagraphs).toHaveLength(2);
      expect(copy.guidanceBody.length).toBeGreaterThan(0);
      expect(copy.emptyStateLabel.length).toBeGreaterThan(0);
    }
  });
});
