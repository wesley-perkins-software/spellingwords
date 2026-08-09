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
import { getGradeStrandGatewayCopy } from './gradeStrandGatewayCopy';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');
const gatewayRenderer = readFileSync(join(process.cwd(), 'src/pages/[gradeSlug]/[strand].astro'), 'utf8');
const spellingListCard = readFileSync(join(process.cwd(), 'src/components/SpellingListCard.astro'), 'utf8');

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
    expect(`${copy.orientation} ${copy.synthesis}`).toMatch(/systematic|sequence/i);
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

  it('does not expose the internal grade-level category on themed gateway cards', () => {
    expect(gatewayRenderer).toContain("showCategoryBadge={strand !== 'themed-spelling-practice'}");
    expect(spellingListCard).toContain('showCategoryBadge = true');
    expect(spellingListCard).toContain('{showCategoryBadge &&');
  });

  it('keeps authored copy independent of positional presentation instructions', () => {
    const prose = (['core-spelling', 'high-frequency-words', 'themed-spelling-practice'] as const)
      .flatMap((strand) => Object.values(getGradeStrandGatewayCopy('K', strand, factsFor(strand))!))
      .join(' ');
    expect(prose).not.toMatch(/\b(?:above|below|card|box|column|scroll)\b/i);
  });
});
