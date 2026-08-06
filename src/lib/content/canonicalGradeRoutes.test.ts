import { describe, expect, it } from 'vitest';
import {
  TRAILING_SLASH,
  canonicalGradeRoutes,
  getCanonicalListPath,
  getCanonicalListPathById,
  getGradeHubPath,
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

describe('canonical grade routes', () => {
  it('freezes the no-trailing-slash convention for every manifest path', () => {
    expect(TRAILING_SLASH).toBe('never');
    for (const route of canonicalGradeRoutes) {
      expect(route.canonicalPath).not.toMatch(/\/$/);
      expect(route.canonicalPath).toBe(`/${route.gradeSlug}/${route.finalSlug}`);
    }
    for (const grade of gradeConfig) {
      expect(getGradeHubPath(grade.grade)).toBe(grade.hubHref);
      expect(grade.hubHref).not.toMatch(/\/$/);
    }
  });

  it('contains every canonical K-5 grade hub card and no duplicate canonical URL', () => {
    const manifestIds = new Set(canonicalGradeRoutes.map((route) => route.id));
    const cardIds = Object.values(curatedSectionsByGrade).flatMap((sections) =>
      sections.flatMap((section) => section.cards.filter((card) => card.kind === 'list').map((card) => card.id)),
    );
    expect([...manifestIds].sort()).toEqual([...cardIds].sort());
    expect(new Set(canonicalGradeRoutes.map((route) => route.canonicalPath)).size).toBe(canonicalGradeRoutes.length);
  });

  it('keeps the approved 107-page classification totals', () => {
    expect(canonicalGradeRoutes).toHaveLength(107);
    expect(canonicalGradeRoutes.filter((route) => route.classification === 'core-spelling')).toHaveLength(51);
    expect(canonicalGradeRoutes.filter((route) => route.classification === 'high-frequency-words')).toHaveLength(29);
    expect(canonicalGradeRoutes.filter((route) => route.classification === 'additional-practice')).toHaveLength(27);
  });

  it('has no duplicate final slug within a grade', () => {
    for (const grade of gradeConfig) {
      const slugs = canonicalGradeRoutes.filter((route) => route.grade === grade.grade).map((route) => route.finalSlug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it('uses high-frequency-words-n for every canonical high-frequency set', () => {
    for (const route of canonicalGradeRoutes.filter((route) => route.classification === 'high-frequency-words')) {
      expect(route.finalSlug).toMatch(/^high-frequency-words-\d+$/);
      expect(route.canonicalPath).toContain(`/${route.gradeSlug}/high-frequency-words-`);
    }
  });

  it('resolves approved representative paths by stable content id', () => {
    expect(getCanonicalListPathById('kindergarten-first-words')).toBe('/kindergarten/first-words');
    expect(getCanonicalListPathById('kindergarten-short-a-words')).toBe('/kindergarten/short-a-words');
    expect(getCanonicalListPathById('grade-1-floss-rule')).toBe('/1st-grade/floss-rule');
    expect(getCanonicalListPathById('grade-1-common-words-1')).toBe('/1st-grade/high-frequency-words-1');
    expect(getCanonicalListPathById('grade-1-weather-words')).toBe('/1st-grade/weather-words');
    expect(getCanonicalListPathById('grade-2-long-e-ee-ea')).toBe('/2nd-grade/long-e-ee-ea');
    expect(getCanonicalListPathById('grade-2-long-i-ie-igh')).toBe('/2nd-grade/long-i-ie-igh');
    expect(getCanonicalListPathById('grade-2-r-controlled-er-ir-ur')).toBe(
      '/2nd-grade/r-controlled-er-ir-ur',
    );
    expect(getCanonicalListPathById('grade-3-suffix-spelling-changes')).toBe(
      '/3rd-grade/suffix-spelling-changes',
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
      getCanonicalListPath({ id: 'dolch-nouns-a', category: 'sight-words', urlSlug: 'dolch-nouns-a-sight-words' }),
    ).toThrow(/No canonical path/);
  });
});
