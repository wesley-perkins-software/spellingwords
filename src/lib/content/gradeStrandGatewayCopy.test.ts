import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  canonicalGradeRoutes,
  getGradeStrandPath,
  gradeStrandGatewayPaths,
  type GradeRouteClassification,
} from './canonicalGradeRoutes';
import { gradeConfig } from './gradeConfig';
import { getGradeStrandGatewayCopy, getGatewayCardDescription } from './gradeStrandGatewayCopy';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');
const gatewayRenderer = readFileSync(join(process.cwd(), 'src/pages/[gradeSlug]/[strand].astro'), 'utf8');
const spellingListCard = readFileSync(join(process.cwd(), 'src/components/SpellingListCard.astro'), 'utf8');
const gradeHubRenderer = readFileSync(join(process.cwd(), 'src/pages/[gradeSlug].astro'), 'utf8');

function contentById(): Map<string, string> {
  const sources = new Map<string, string>();
  for (const relativePath of readdirSync(contentRoot, { recursive: true, encoding: 'utf8' })) {
    if (!relativePath.endsWith('.md')) continue;
    const source = readFileSync(join(contentRoot, relativePath), 'utf8');
    const id = source.match(/^id:\s*['"]?([^'"\n]+)['"]?$/m)?.[1];
    if (id) sources.set(id, source);
  }
  return sources;
}

function wordsIn(source: string): string[] {
  const block = source.match(/^words:\n([\s\S]*?)\n---/m)?.[1] ?? '';
  return [...block.matchAll(/^\s{2}-\s+['"]?([^'"\n]+?)['"]?\s*$/gm)].map((match) => match[1]);
}

const kindergartenRoutes = canonicalGradeRoutes.filter((route) => route.grade === 'K');
const routesFor = (strand: GradeRouteClassification) =>
  kindergartenRoutes.filter((route) => route.classification === strand);
const sources = contentById();
const factsFor = (strand: GradeRouteClassification) => {
  const routes = routesFor(strand);
  return {
    memberCount: routes.length,
    wordCount: routes.reduce((total, route) => total + wordsIn(sources.get(route.id) ?? '').length, 0),
  };
};

describe('Kindergarten grade-strand gateway pilot', () => {
  it('retains exactly 18 canonical gateways, three per grade, including all Kindergarten strands', () => {
    expect(gradeStrandGatewayPaths).toHaveLength(18);
    for (const grade of gradeConfig) {
      expect(gradeStrandGatewayPaths.filter((path) => path.startsWith(`${grade.hubHref}/`))).toHaveLength(3);
    }
    expect(gradeStrandGatewayPaths.filter((path) => path.startsWith('/kindergarten/'))).toEqual([
      '/kindergarten/core-spelling',
      '/kindergarten/high-frequency-words',
      '/kindergarten/themed-spelling-practice',
    ]);
  });

  it('authors all three Kindergarten gateways without requiring Grades 1–5 copy', () => {
    for (const strand of ['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const) {
      expect(getGradeStrandGatewayCopy('K', strand, factsFor(strand))).toBeDefined();
      expect(getGradeStrandGatewayCopy('1', strand, factsFor(strand))).toBeUndefined();
    }
  });

  it('keeps Core sequential, Kindergarten-specific, and complete in canonical order', () => {
    const routes = routesFor('core-spelling');
    expect(routes.map((route) => route.id)).toEqual([
      'kindergarten-first-words',
      'kindergarten-short-a-words',
      'kindergarten-short-i-words',
      'kindergarten-short-o-words',
      'kindergarten-short-u-words',
      'kindergarten-short-e-words',
      'kindergarten-mixed-vowel-review',
      'kindergarten-consonant-digraphs',
    ]);
    const copy = getGradeStrandGatewayCopy('K', 'core-spelling', factsFor('core-spelling'))!;
    expect(routes).toHaveLength(8);
    expect(copy.orientation).toMatch(/systematic starting sequence/);
    expect(copy.guidance).toMatch(/Begin with First Words/);
  });

  it('derives the HFW aggregate and preserves approved terminology', () => {
    const facts = factsFor('high-frequency-words');
    const copy = getGradeStrandGatewayCopy('K', 'high-frequency-words', facts)!;
    expect(facts).toEqual({ memberCount: 4, wordCount: 40 });
    expect(`${copy.orientation} ${copy.synthesis}`).toMatch(/40 commonly used spellings in 4 manageable sets/);
    expect(copy.synthesis).toMatch(/sound.spelling information/i);
    expect(Object.values(copy).join(' ')).not.toMatch(/sight words|common words|heart words|visual.shape/i);
  });

  it('keeps all five themed peers complete and explicitly non-sequential', () => {
    const routes = routesFor('themed-spelling-practice');
    expect(routes.map((route) => route.id)).toEqual([
      'kindergarten-animal-words',
      'kindergarten-body-words',
      'kindergarten-number-words',
      'kindergarten-color-words',
      'kindergarten-family-words',
    ]);
    const copy = getGradeStrandGatewayCopy('K', 'themed-spelling-practice', factsFor('themed-spelling-practice'))!;
    expect(routes).toHaveLength(5);
    expect(`${copy.orientation} ${copy.guidance}`).toMatch(/not a sequence|no required order/i);
    expect(copy.synthesis).not.toMatch(/progress|curriculum|required lesson/i);
  });

  it('generates same-grade wayfinding and uses unordered semantics for themed peers', () => {
    expect(getGradeStrandPath('K', 'core-spelling')).toBe('/kindergarten/core-spelling');
    expect(getGradeStrandPath('K', 'high-frequency-words')).toBe('/kindergarten/high-frequency-words');
    expect(getGradeStrandPath('K', 'themed-spelling-practice')).toBe('/kindergarten/themed-spelling-practice');
    expect(gatewayRenderer).toContain("const ListElement = strand === 'themed-spelling-practice' ? 'ul' : 'ol'");
    expect(gatewayRenderer).toContain('getGradeStrandPath(gradeEntry.grade, relatedStrand)');
    expect(gatewayRenderer).toContain("index === wayfindingStrands.length - 1 ? '.' : ''");
    expect(gatewayRenderer).not.toMatch(/<\/a>\s*\.\s*\n/);
  });

  it('never exposes raw category classification badges on any of the three gateway strands', () => {
    // Regression guard: Core previously leaked "Grade-Level" (First Words) vs.
    // "Phonics" (its 7 siblings) — a real internal-taxonomy split with no
    // public comparison value — and HFW repeated "High-Frequency Words" on
    // every card of a page already titled and sub-titled with those words.
    // All three strands must suppress the category badge unconditionally, not
    // strand-conditionally, so a future strand can't reintroduce this by omission.
    expect(gatewayRenderer).toContain('showCategoryBadge={false}');
    expect(gatewayRenderer).not.toMatch(/showCategoryBadge=\{strand/);
    expect(spellingListCard).toContain('showCategoryBadge = true');
    expect(spellingListCard).toContain('{showCategoryBadge &&');
  });

  it('leaves other SpellingListCard callers (the Grade Hub) on their existing badge behavior', () => {
    // The Grade Hub authors its own explicit `badge` per card (e.g. "Grade
    // Unit", "Vocabulary") and never opts into `showCategoryBadge` at all, so
    // it keeps relying on the component's default (true) — the gateway-only
    // suppression above must not have touched this caller.
    expect(gradeHubRenderer).toContain('badge={card.badge}');
    expect(gradeHubRenderer).not.toMatch(/showCategoryBadge/);
  });

  it("HFW gateway cards lead with differentiating content instead of repeating their own title", () => {
    const hfwRoutes = routesFor('high-frequency-words');
    expect(hfwRoutes).toHaveLength(4);
    for (const route of hfwRoutes) {
      const source = sources.get(route.id);
      expect(source, `missing content source for ${route.id}`).toBeDefined();
      const title = source!.match(/^title:\s*['"]?([^'"\n]+?)['"]?\s*$/m)![1];
      const description = source!.match(/^description:\s*['"]([\s\S]*?)['"]\s*$/m)![1];
      const shortAnswer = source!.match(/^shortAnswer:\s*['"]([\s\S]*?)['"]\s*$/m)![1];

      // The frozen member-page description is expected to open with its own
      // title (useful there); confirms the corpus assumption this fix relies on.
      expect(description.startsWith(title)).toBe(true);

      const cardDescription = getGatewayCardDescription(route.classification, description, shortAnswer);
      expect(cardDescription).toBe(shortAnswer);
      expect(cardDescription.startsWith(title)).toBe(false);
      // The differentiating substance (word-level detail) must still be present.
      expect(cardDescription.length).toBeGreaterThan(20);
    }
  });

  it('falls back to the member description when a strand has no shortAnswer to prefer', () => {
    expect(getGatewayCardDescription('core-spelling', 'A description.', undefined)).toBe('A description.');
    expect(getGatewayCardDescription('themed-spelling-practice', 'A description.', 'A short answer.')).toBe(
      'A description.',
    );
    expect(getGatewayCardDescription('high-frequency-words', 'A description.', undefined)).toBe('A description.');
  });

  it('keeps authored copy independent of positional presentation instructions', () => {
    const prose = (['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const)
      .flatMap((strand) => Object.values(getGradeStrandGatewayCopy('K', strand, factsFor(strand))!))
      .join(' ');
    expect(prose).not.toMatch(/\b(?:above|below|card|box|column|scroll)\b/i);
  });
});
