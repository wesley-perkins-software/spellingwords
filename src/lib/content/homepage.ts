import { gradeConfig, type GradeCode } from './gradeConfig';
import { getCanonicalSkillRoutes } from './canonicalSkillRoutes';

export const HOMEPAGE_URL = 'https://spellingwords.app/';

/**
 * Editorial description per grade, one sentence each, verified against the
 * canonical K–5 Grade Unit curriculum
 * (docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md). Not derived
 * algorithmically; see docs/content/CANONICAL_HOMEPAGE_STANDARD.md's
 * Appendix for the reference copy this is kept in sync with.
 */
const HOMEPAGE_GRADE_TEASERS: Record<GradeCode, string> = {
  K: 'Builds the foundations with letters, sounds, first words, and short-vowel spelling.',
  '1': 'Strengthens early spelling with consonant blends and digraphs, silent e, vowel teams, and word endings.',
  '2': 'Expands into r-controlled vowels, more vowel patterns, syllable structure, silent letters, and multisyllabic words.',
  '3': 'Introduces prefixes, suffixes, spelling changes, homophones, possessives, and word families.',
  '4': 'Develops advanced word knowledge through roots, morphology, multisyllabic spelling, and commonly confused words.',
  '5': 'Brings it together with advanced roots and affixes, academic words, and spelling changes across related words.',
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
