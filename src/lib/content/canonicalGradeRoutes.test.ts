import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  TRAILING_SLASH,
  canonicalGradeRoutes,
  getCanonicalListPath,
  getCanonicalListPathById,
  getGradeHubPath,
  gradeStrandGatewayPaths,
} from './canonicalGradeRoutes';
import { gradeConfig } from './gradeConfig';
import {
  GRADE_1_HUB_SECTIONS,
  GRADE_2_HUB_SECTIONS,
  GRADE_3_HUB_SECTIONS,
  GRADE_4_HUB_SECTIONS,
  GRADE_5_HUB_SECTIONS,
  KINDERGARTEN_HUB_SECTIONS,
} from './gradeHubCards';

const curatedSectionsByGrade = {
  K: KINDERGARTEN_HUB_SECTIONS,
  '1': GRADE_1_HUB_SECTIONS,
  '2': GRADE_2_HUB_SECTIONS,
  '3': GRADE_3_HUB_SECTIONS,
  '4': GRADE_4_HUB_SECTIONS,
  '5': GRADE_5_HUB_SECTIONS,
} as const;

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');

function canonicalContentById(): Map<string, string> {
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

describe('canonical grade routes', () => {
  it('freezes the no-trailing-slash convention for every manifest path', () => {
    expect(TRAILING_SLASH).toBe('never');
    for (const route of canonicalGradeRoutes) {
      expect(route.canonicalPath).not.toMatch(/\/$/);
      expect(route.canonicalPath).toBe(`/${route.gradeSlug}/${route.classification}/${route.finalSlug}`);
    }
    for (const grade of gradeConfig) {
      expect(getGradeHubPath(grade.grade)).toBe(grade.hubHref);
      expect(grade.hubHref).not.toMatch(/\/$/);
    }
  });

  it('defines exactly three strand gateways per grade', () => {
    expect(gradeStrandGatewayPaths).toHaveLength(18);
    expect(new Set(gradeStrandGatewayPaths).size).toBe(18);
    for (const grade of gradeConfig) {
      expect(gradeStrandGatewayPaths.filter((path) => path.startsWith(`/${grade.slug}/`))).toHaveLength(3);
    }
  });

  it('does not retain obsolete flat grade-resource paths', () => {
    expect(canonicalGradeRoutes.some((route) => route.canonicalPath === '/kindergarten/short-a-words')).toBe(false);
    expect(canonicalGradeRoutes.some((route) => route.canonicalPath === '/kindergarten/high-frequency-words-1')).toBe(false);
  });

  it('contains every canonical K-5 grade hub card and no duplicate canonical URL', () => {
    const manifestIds = new Set(canonicalGradeRoutes.map((route) => route.id));
    const cardIds = Object.values(curatedSectionsByGrade).flatMap((sections) =>
      sections.flatMap((section) => section.cards.filter((card) => card.kind === 'list').map((card) => card.id)),
    );
    expect([...manifestIds].sort()).toEqual([...cardIds].sort());
    expect(new Set(canonicalGradeRoutes.map((route) => route.canonicalPath)).size).toBe(canonicalGradeRoutes.length);
  });

  it('keeps the approved 105-page classification totals', () => {
    expect(canonicalGradeRoutes).toHaveLength(105);
    expect(canonicalGradeRoutes.filter((route) => route.classification === 'core-spelling')).toHaveLength(51);
    expect(canonicalGradeRoutes.filter((route) => route.classification === 'high-frequency-words')).toHaveLength(27);
    expect(canonicalGradeRoutes.filter((route) => route.classification === 'themed-spelling-practice')).toHaveLength(27);
  });

  it('requires every canonical Core Spelling resource to declare its Grade Unit role', () => {
    const sources = canonicalContentById();
    const coreRoutes = canonicalGradeRoutes.filter((route) => route.classification === 'core-spelling');

    expect(coreRoutes).toHaveLength(51);
    for (const route of coreRoutes) {
      expect(sources.get(route.id), route.id).toBeDefined();
      expect(sources.get(route.id), route.id).toMatch(/^contentRole: grade-unit$/m);
    }
  });

  it('preserves the three frozen 18-word Grade 3 Core inventories exactly', () => {
    const sources = canonicalContentById();
    const expected = {
      'grade-3-prefix-words': [
        'unfair', 'unhappy', 'unkind', 'unsafe', 'unlock', 'redo', 'replay', 'reread', 'rewrite',
        'preview', 'predict', 'disagree', 'dislike', 'discover', 'dishonest', 'misplace', 'misread', 'misspell',
      ],
      'grade-3-suffix-words': [
        'bigger', 'biggest', 'faster', 'fastest', 'easier', 'easiest', 'slowly', 'nearly', 'really',
        'careful', 'helpful', 'useful', 'careless', 'restless', 'happiness', 'kindness', 'movement', 'enjoyment',
      ],
      'grade-3-multisyllabic-words': [
        'basket', 'because', 'umbrella', 'different', 'remember', 'suddenly', 'usually', 'afternoon', 'airplane',
        'already', 'animal', 'birthday', 'building', 'attention', 'connection', 'important', 'information', 'solution',
      ],
    } as const;

    for (const [id, inventory] of Object.entries(expected)) {
      expect(wordsIn(sources.get(id) ?? ''), id).toEqual(inventory);
      expect(inventory, id).toHaveLength(18);
    }
  });

  it('has no duplicate final slug within a grade', () => {
    for (const grade of gradeConfig) {
      const slugs = canonicalGradeRoutes.filter((route) => route.grade === grade.grade).map((route) => route.finalSlug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it('uses set-n for every canonical high-frequency set', () => {
    for (const route of canonicalGradeRoutes.filter((route) => route.classification === 'high-frequency-words')) {
      expect(route.finalSlug).toMatch(/^set-\d+$/);
      expect(route.canonicalPath).toContain(`/${route.gradeSlug}/high-frequency-words/set-`);
    }
  });

  it('resolves approved representative paths by stable content id', () => {
    expect(getCanonicalListPathById('kindergarten-first-words')).toBe('/kindergarten/core-spelling/first-words');
    expect(getCanonicalListPathById('kindergarten-short-a-words')).toBe('/kindergarten/core-spelling/short-a-words');
    expect(getCanonicalListPathById('grade-1-floss-rule')).toBe('/1st-grade/core-spelling/floss-rule');
    expect(getCanonicalListPathById('grade-1-high-frequency-words-set-1')).toBe('/1st-grade/high-frequency-words/set-1');
    expect(getCanonicalListPathById('grade-1-weather-words')).toBe('/1st-grade/themed-spelling-practice/weather-words');
    expect(getCanonicalListPathById('grade-2-long-e-ee-ea')).toBe('/2nd-grade/core-spelling/long-e-ee-ea');
    expect(getCanonicalListPathById('grade-2-long-i-ie-igh')).toBe('/2nd-grade/core-spelling/long-i-ie-igh');
    expect(getCanonicalListPathById('grade-2-r-controlled-er-ir-ur')).toBe(
      '/2nd-grade/core-spelling/r-controlled-er-ir-ur',
    );
    expect(getCanonicalListPathById('grade-3-suffix-spelling-changes')).toBe(
      '/3rd-grade/core-spelling/suffix-spelling-changes',
    );
  });

  it('composes with the Skill manifest: getCanonicalListPath resolves Skill ids to /skills/{slug}', () => {
    expect(getCanonicalListPath({ id: 'digraph-ch-words', category: 'phonics', urlSlug: 'digraph-ch-words' })).toBe(
      '/skills/ch-digraph-words',
    );
    expect(getCanonicalListPath({ id: 'short-a-words', category: 'phonics', urlSlug: 'short-a-words' })).toBe(
      '/skills/short-a-words',
    );
  });

  it('throws for an id in neither manifest, instead of constructing a legacy /spelling-lists path', () => {
    expect(() =>
      getCanonicalListPath({ id: 'dolch-nouns-a', category: 'high-frequency-words', urlSlug: 'dolch-nouns-a-high-frequency-words' }),
    ).toThrow(/No canonical path/);
  });
});
