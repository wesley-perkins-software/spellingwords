import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CROSS_GRADE_STRAND_PATHS } from './crossGradeStrands';

describe('cross-grade strand pages', () => {
  for (const [strand, path] of Object.entries(CROSS_GRADE_STRAND_PATHS)) {
    it(`renders the approved ${path} gateway with canonical shared architecture`, () => {
      const source = readFileSync(join(process.cwd(), `src/pages/${strand}.astro`), 'utf8');
      expect(source).toContain(`const strand = '${strand}' as const`);
      expect(source).toContain('buildCrossGradeStrandModel(strand, entries)');
      expect(source).toContain('CrossGradeStrandView');
      expect(source).toContain('BreadcrumbList');
      expect(source).toContain('ItemList');
      expect(source).toContain('numberOfItems: model.grades.length');
    });
  }
});
