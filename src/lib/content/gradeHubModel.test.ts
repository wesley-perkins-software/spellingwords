import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { canonicalGradeRoutes, getGradeHubGatewayLinks, getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { gradeConfig, getAdjacentGrades } from './gradeConfig';
import { gradeHubCopy } from './gradeHubCopy';
import { gradeHubPreview } from './gradeHubPreview';
import { buildGradeHubModel } from './gradeHubModel';
import type { SpellingListEntry } from './spellingLists';

// The Grade Hub is composed from two files: the route/page shell
// (src/pages/[gradeSlug].astro, which builds the model and JSON-LD) and the
// shared renderer it delegates to (src/components/direction-a/GradeHubView.astro,
// which renders the strand cards and adjacent-grade nav). Both are read here
// so "one permanent renderer" assertions check the file that actually
// contains the markup in question.
const pageShell = readFileSync(join(process.cwd(), 'src/pages/[gradeSlug].astro'), 'utf8');
const renderer = readFileSync(
  join(process.cwd(), 'src/components/direction-a/GradeHubView.astro'),
  'utf8',
);

const hfwWords: Record<string, number> = { K: 40, '1': 84, '2': 84, '3': 60, '4': 24, '5': 24 };
const expectedCounts: Record<string, [number, number, number]> = {
  K: [8, 4, 5], '1': [12, 7, 5], '2': [13, 7, 5], '3': [7, 5, 4], '4': [6, 2, 4], '5': [5, 2, 4],
};
const entries = canonicalGradeRoutes.map((route) => ({
  data: {
    id: route.id,
    title: route.finalSlug,
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
      const memberPaths = new Set(canonicalGradeRoutes.filter(({ grade }) => grade === hub.grade).map(({ canonicalPath }) => canonicalPath));
      expect(hub.strands.every(({ href }) => !memberPaths.has(href))).toBe(true);
      // The bounded §6.1 preview exception: up to four plain-text items per card, never a
      // canonical member URL/path string.
      for (const strand of hub.strands) {
        expect(strand.previewItems.length).toBeGreaterThan(0);
        expect(strand.previewItems.length).toBeLessThanOrEqual(4);
        for (const item of strand.previewItems) {
          expect(memberPaths.has(item)).toBe(false);
          expect(item).not.toMatch(/^\//); // never a path
        }
      }
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
      expect(themed).toMatch(/optional[\s\S]*additional practice/);
      expect(hub.synthesis).toMatch(/Core Spelling/);
      expect(hub.synthesis).toMatch(/High-Frequency Words.*alongside/s);
      expect(hub.synthesis).toMatch(/Themed Spelling Practice/);
      expect(hub.synthesis.toLowerCase()).toMatch(/optional/);
      expect([core, hfw, themed, hub.synthesis].join(' ')).not.toMatch(/separate strand|sight words|heart words|common words/i);

      // Grade Hub V2: the rendered card description consolidates rather than appends — it must
      // still carry the same required semantic facts, in a single sentence per card.
      const coreCard = hub.strands.find(({ strand }) => strand === 'core-spelling')?.cardDescription ?? '';
      const hfwCard = hub.strands.find(({ strand }) => strand === 'high-frequency-words')?.cardDescription ?? '';
      const themedCard = hub.strands.find(({ strand }) => strand === 'themed-spelling-practice')?.cardDescription ?? '';
      expect(coreCard).toMatch(/main systematic path/);
      expect(hfwCard).toMatch(/alongside Core Spelling/);
      expect(themedCard).toMatch(/optional additional practice/);
    }
  });

  it('resolves exactly four curated Core/HFW preview items and up to four Themed items per Hub, in curriculum order for Core', () => {
    for (const hub of hubs) {
      const core = hub.strands.find(({ strand }) => strand === 'core-spelling')!;
      const hfw = hub.strands.find(({ strand }) => strand === 'high-frequency-words')!;
      const themed = hub.strands.find(({ strand }) => strand === 'themed-spelling-practice')!;
      expect(core.previewItems).toHaveLength(4);
      expect(hfw.previewItems).toHaveLength(4);
      expect(themed.previewItems.length).toBeLessThanOrEqual(4);

      const preview = gradeHubPreview[hub.grade];
      expect(core.previewItems).toEqual(preview.coreRepresentativeIds.map((id) => getCanonicalGradeRouteById(id)!.finalSlug));
      expect(hfw.previewItems).toEqual(preview.hfwRepresentativeWords);
    }
  });

  it('uses one permanent renderer and three-Gateway ItemList for every Hub', () => {
    expect(pageShell).toContain('const hub = buildGradeHubModel(grade, entries)');
    expect(pageShell).toContain('numberOfItems: hub.strands.length');
    expect(pageShell).toContain('const itemListElements = hub.strands.map');
    // Scattered, ad-hoc special-casing (a hardcoded grade literal, or the old
    // section.cards/SpellingListCard/legacyItems patterns) is still banned in both the page
    // shell and the shared renderer it delegates to.
    const bannedPattern = /grade === ['"][K1-5]['"]|section\.cards|SpellingListCard|legacyItems/i;
    expect(pageShell).not.toMatch(bannedPattern);
    expect(renderer).not.toMatch(bannedPattern);
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

  it('has grade-specific metadata, two-paragraph orientations, and a 5-6 phrase fingerprint', () => {
    for (const { grade } of gradeConfig) {
      expect(gradeHubCopy[grade].metaDescription).toMatch(/Core Spelling.*High-Frequency Words.*optional Themed Spelling Practice/);
      expect(gradeHubCopy[grade].orientation).toHaveLength(2);
      expect(gradeHubPreview[grade].fingerprint.length).toBeGreaterThanOrEqual(5);
      expect(gradeHubPreview[grade].fingerprint.length).toBeLessThanOrEqual(6);
    }
  });
});
