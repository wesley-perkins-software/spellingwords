import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { canonicalGradeRoutes, getGradeHubGatewayLinks } from './canonicalGradeRoutes';
import { gradeConfig, getAdjacentGrades } from './gradeConfig';
import { gradeHubCopy } from './gradeHubCopy';
import { buildGradeHubModel } from './gradeHubModel';
import type { SpellingListEntry } from './spellingLists';

const renderer = readFileSync(join(process.cwd(), 'src/pages/[gradeSlug].astro'), 'utf8');
const hfwWords: Record<string, number> = { K: 40, '1': 84, '2': 84, '3': 60, '4': 24, '5': 24 };
const expectedCounts: Record<string, [number, number, number]> = {
  K: [8, 4, 5], '1': [12, 7, 5], '2': [13, 7, 5], '3': [7, 5, 4], '4': [6, 2, 4], '5': [5, 2, 4],
};
const entries = canonicalGradeRoutes.map((route) => ({
  data: {
    id: route.id,
    words: Array.from({ length: route.classification === 'high-frequency-words' ? hfwWords[route.grade] / expectedCounts[route.grade][1] : 1 }, (_, index) => ({ word: `word-${index}` })),
  },
})) as unknown as SpellingListEntry[];

describe('canonical K–5 Grade Hub model', () => {
  const hubs = gradeConfig.map(({ grade }) => buildGradeHubModel(grade, entries));

  it('builds six Hubs and exactly 18 canonical same-grade Gateway relationships', () => {
    expect(hubs).toHaveLength(6);
    expect(hubs.flatMap(({ strands }) => strands)).toHaveLength(18);
    for (const hub of hubs) {
      expect(hub.strands.map(({ strand, label, href }) => ({ strand, label, href }))).toEqual(getGradeHubGatewayLinks(hub.grade));
      expect(hub.strands).toHaveLength(3);
      expect(hub.fingerprint.length).toBeGreaterThanOrEqual(5);
      expect(hub.strands.find(({ strand }) => strand === 'core-spelling')?.previewExamples).toHaveLength(4);
      expect(hub.strands.find(({ strand }) => strand === 'high-frequency-words')?.previewExamples).toHaveLength(4);
      expect(hub.strands.find(({ strand }) => strand === 'themed-spelling-practice')?.previewExamples.length).toBeLessThanOrEqual(4);
      expect(hub.strands.flatMap((strand) => Object.keys(strand))).not.toContain('cards');
      const memberPaths = new Set(canonicalGradeRoutes.filter(({ grade }) => grade === hub.grade).map(({ canonicalPath }) => canonicalPath));
      expect(hub.strands.every(({ href }) => !memberPaths.has(href))).toBe(true);
    }
  });

  it('derives member and HFW word counts from canonical routes and content', () => {
    for (const hub of hubs) {
      expect(hub.strands.map(({ memberCount }) => memberCount)).toEqual(expectedCounts[hub.grade]);
      expect(hub.strands.find(({ strand }) => strand === 'high-frequency-words')?.wordCount).toBe(hfwWords[hub.grade]);
    }
  });

  it('keeps the semantic relationship among strands clear without deprecated language', () => {
    for (const hub of hubs) {
      const core = hub.strands.find(({ strand }) => strand === 'core-spelling')?.summary ?? '';
      const hfw = hub.strands.find(({ strand }) => strand === 'high-frequency-words')?.summary ?? '';
      const themed = hub.strands.find(({ strand }) => strand === 'themed-spelling-practice')?.summary ?? '';
      expect(core).toMatch(/main systematic path/);
      expect(core).not.toMatch(/start with|starting point|where to begin/i);
      expect(hfw).toMatch(/alongside Core Spelling/);
      expect(themed).toMatch(/optional additional practice/);
      expect(hub.synthesis).toMatch(/Core Spelling/);
      expect(hub.synthesis).toMatch(/High-Frequency Words.*alongside/s);
      expect(hub.synthesis).toMatch(/Themed Spelling Practice.*optional additional practice/s);
      expect([core, hfw, themed, hub.synthesis].join(' ')).not.toMatch(/separate strand|sight words|heart words|common words/i);
    }
  });

  it('uses one permanent renderer and three-Gateway ItemList for every Hub', () => {
    expect(renderer).toContain('const hub = buildGradeHubModel(grade, entries)');
    expect(renderer).toContain('numberOfItems: hub.strands.length');
    expect(renderer).toContain('const itemListElements = hub.strands.map');
    // Scattered, ad-hoc special-casing (a hardcoded grade literal, or the old
    // section.cards/SpellingListCard/legacyItems patterns) is still banned.
    expect(renderer).not.toMatch(/grade === ['"][K1-5]['"]|section\.cards|SpellingListCard|legacyItems/i);
    expect(renderer).toContain('GradeHubView');
  });

  it('protects canonical adjacent-grade navigation', () => {
    expect(gradeConfig.map(({ grade }) => {
      const { prev, next } = getAdjacentGrades(grade);
      return [prev?.grade, next?.grade];
    })).toEqual([[undefined, '1'], ['K', '2'], ['1', '3'], ['2', '4'], ['3', '5'], ['4', undefined]]);
    expect(renderer).toContain('href={prev.hubHref}');
    expect(renderer).toContain('href={next.hubHref}');
    expect(renderer).toContain('href="/#grades"');
  });

  it('has grade-specific metadata and two-paragraph orientations', () => {
    for (const { grade } of gradeConfig) {
      expect(gradeHubCopy[grade].metaDescription).toMatch(/Core Spelling.*High-Frequency Words.*optional Themed Spelling Practice/);
      expect(gradeHubCopy[grade].orientation).toHaveLength(2);
    }
  });
});
