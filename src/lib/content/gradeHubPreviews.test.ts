import { describe, expect, it } from 'vitest';
import { canonicalGradeRoutes } from './canonicalGradeRoutes';
import { gradeConfig } from './gradeConfig';
import { gradeHubPreviews } from './gradeHubPreviews';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';

describe('Grade Hub V2 editorial previews', () => {
  it('provides bounded, explicit selections for every grade', () => {
    for (const { grade } of gradeConfig) {
      const preview = gradeHubPreviews[grade];
      expect(preview.fingerprint.length).toBeGreaterThanOrEqual(5);
      expect(preview.fingerprint.length).toBeLessThanOrEqual(6);
      expect(preview.core.representativeIds).toHaveLength(4);
      expect(preview.hfw.representativeWords).toHaveLength(4);
      expect(preview.themed.representativeIds.length).toBeGreaterThan(0);
      expect(preview.themed.representativeIds.length).toBeLessThanOrEqual(4);

      for (const id of preview.core.representativeIds) {
        expect(canonicalGradeRoutes).toContainEqual(
          expect.objectContaining({
            id,
            grade,
            classification: 'core-spelling',
          }),
        );
      }
      for (const word of preview.hfw.representativeWords) {
        expect(
          FROZEN_HF_WORDS_CURRICULUM[grade].some((set) =>
            set.words.some((candidate) => candidate === word),
          ),
        ).toBe(true);
      }
      for (const id of preview.themed.representativeIds) {
        expect(canonicalGradeRoutes).toContainEqual(
          expect.objectContaining({
            id,
            grade,
            classification: 'themed-spelling-practice',
          }),
        );
        expect(preview.themed.displayLabels[id]).toBeTruthy();
      }
    }
  });
});
