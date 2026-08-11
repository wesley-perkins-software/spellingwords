import { gradeConfig, type GradeCode } from './gradeConfig';
import { getCanonicalSkillRoutes } from './canonicalSkillRoutes';

export const HOMEPAGE_URL = 'https://spellingwords.app/';

/**
 * Approved editorial teaser per grade, traceable to the canonical K–5 Grade
 * Unit curriculum (docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md).
 * Frozen copy from docs/content/CANONICAL_HOMEPAGE_STANDARD.md's Appendix —
 * not derived algorithmically.
 */
const HOMEPAGE_GRADE_TEASERS: Record<GradeCode, string> = {
  K: 'Letters, sounds, and first words',
  '1': 'Blends, silent e, and vowel teams',
  '2': 'R-controlled vowels and multisyllabic words',
  '3': 'Prefixes, suffixes, and homophones',
  '4': 'Greek and Latin roots and derived words',
  '5': 'Advanced roots, affixes, and academic words',
};

export const homepageGradeHubs = gradeConfig.map(({ grade, label, hubHref }) => ({
  label,
  href: hubHref,
  teaser: HOMEPAGE_GRADE_TEASERS[grade],
}));

/** Real, programmatically sourced count of canonical Skill pages. */
export const HOMEPAGE_SKILL_COUNT = getCanonicalSkillRoutes().length;

/**
 * Representative Skill concepts named as plain text on the homepage,
 * spanning the K–5 difficulty range (early skills through late-elementary
 * skills) per docs/content/CANONICAL_HOMEPAGE_STANDARD.md §5.3.
 */
export const HOMEPAGE_REPRESENTATIVE_SKILLS = [
  'short vowels',
  'silent e',
  'prefixes',
  'suffixes',
  'Greek and Latin roots',
  'homophones',
] as const;

export const homepageJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SpellingWords.app',
    url: HOMEPAGE_URL,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Spelling practice by grade',
    itemListElement: homepageGradeHubs.map((grade, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: grade.label,
      url: new URL(grade.href, HOMEPAGE_URL).href,
    })),
  },
] satisfies Record<string, unknown>[];
