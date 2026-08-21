import { describe, expect, it } from 'vitest';
import { gradeHubPreview } from './gradeHubPreview';
import { gradeConfig } from './gradeConfig';
import { getCanonicalGradeRouteById, canonicalGradeRoutes } from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';

describe('Grade Hub V2 curated preview data', () => {
  for (const { grade } of gradeConfig) {
    const preview = gradeHubPreview[grade];

    it(`${grade}: fingerprint has 5-6 non-empty phrases`, () => {
      expect(preview.fingerprint.length).toBeGreaterThanOrEqual(5);
      expect(preview.fingerprint.length).toBeLessThanOrEqual(6);
      for (const phrase of preview.fingerprint) {
        expect(phrase.trim().length).toBeGreaterThan(0);
      }
    });

    it(`${grade}: exactly four Core representative ids, all belonging to this grade's Core strand, in curriculum order`, () => {
      expect(preview.coreRepresentativeIds).toHaveLength(4);
      const resolved = preview.coreRepresentativeIds.map((id) => {
        const route = getCanonicalGradeRouteById(id);
        expect(route, `Core id "${id}" must resolve to a canonical route`).toBeDefined();
        expect(route?.grade).toBe(grade);
        expect(route?.classification).toBe('core-spelling');
        return route!;
      });
      expect(new Set(resolved.map((route) => route.id)).size).toBe(4); // no duplicates

      // Ordering must match canonical curriculum sequence order for this grade.
      const gradeCoreOrder = canonicalGradeRoutes
        .filter((route) => route.grade === grade && route.classification === 'core-spelling')
        .map((route) => route.id);
      const positions = resolved.map((route) => gradeCoreOrder.indexOf(route.id));
      const sortedPositions = [...positions].sort((a, b) => a - b);
      expect(positions).toEqual(sortedPositions);
    });

    it(`${grade}: exactly four HFW representative words, all members of the frozen curriculum`, () => {
      expect(preview.hfwRepresentativeWords).toHaveLength(4);
      const allWords = new Set(
        FROZEN_HF_WORDS_CURRICULUM[grade].flatMap((set) => set.words),
      );
      for (const word of preview.hfwRepresentativeWords) {
        expect(allWords.has(word), `"${word}" must be a frozen ${grade} HFW word`).toBe(true);
      }
    });

    it(`${grade}: one to four Themed representative ids, all belonging to this grade's Themed strand`, () => {
      expect(preview.themedRepresentativeIds.length).toBeGreaterThanOrEqual(1);
      expect(preview.themedRepresentativeIds.length).toBeLessThanOrEqual(4);
      for (const id of preview.themedRepresentativeIds) {
        const route = getCanonicalGradeRouteById(id);
        expect(route, `Themed id "${id}" must resolve to a canonical route`).toBeDefined();
        expect(route?.grade).toBe(grade);
        expect(route?.classification).toBe('themed-spelling-practice');
      }
    });
  }
});
