import type { CollectionEntry } from 'astro:content';
import { gradeConfig, type GradeCode } from './gradeConfig';
import { getCanonicalSkillPathById } from './canonicalSkillRoutes';

export const TRAILING_SLASH = 'never' as const;

export type GradeHubSectionTitle = 'Core Spelling' | 'High-Frequency Words' | 'Additional Practice';
export type GradeRouteClassification = 'core-spelling' | 'high-frequency-words' | 'additional-practice';

type RouteDef = readonly [id: string, grade: GradeCode, section: GradeHubSectionTitle, finalSlug: string, classification: GradeRouteClassification];

export const CANONICAL_GRADE_ROUTE_DEFS = [
  ['kindergarten-first-words','K','Core Spelling','first-words','core-spelling'],
  ['kindergarten-short-a-words','K','Core Spelling','short-a-words','core-spelling'],
  ['kindergarten-short-i-words','K','Core Spelling','short-i-words','core-spelling'],
  ['kindergarten-short-o-words','K','Core Spelling','short-o-words','core-spelling'],
  ['kindergarten-short-u-words','K','Core Spelling','short-u-words','core-spelling'],
  ['kindergarten-short-e-words','K','Core Spelling','short-e-words','core-spelling'],
  ['kindergarten-mixed-vowel-review','K','Core Spelling','mixed-vowel-review','core-spelling'],
  ['kindergarten-consonant-digraphs','K','Core Spelling','consonant-digraphs','core-spelling'],
  ['kindergarten-common-words-1','K','High-Frequency Words','high-frequency-words-1','high-frequency-words'],
  ['kindergarten-common-words-2','K','High-Frequency Words','high-frequency-words-2','high-frequency-words'],
  ['kindergarten-common-words-3','K','High-Frequency Words','high-frequency-words-3','high-frequency-words'],
  ['kindergarten-common-words-4','K','High-Frequency Words','high-frequency-words-4','high-frequency-words'],
  ['kindergarten-animal-words','K','Additional Practice','animal-words','additional-practice'],
  ['kindergarten-body-words','K','Additional Practice','body-words','additional-practice'],
  ['kindergarten-number-words','K','Additional Practice','number-words','additional-practice'],
  ['kindergarten-color-words','K','Additional Practice','color-words','additional-practice'],
  ['kindergarten-family-words','K','Additional Practice','family-words','additional-practice'],
  ['grade-1-cvc-short-vowels-c-k-rule','1','Core Spelling','cvc-short-vowels-c-k-rule','core-spelling'],
  ['grade-1-floss-rule','1','Core Spelling','floss-rule','core-spelling'],
  ['grade-1-consonant-digraphs-final-ck','1','Core Spelling','consonant-digraphs-final-ck','core-spelling'],
  ['grade-1-beginning-consonant-blends','1','Core Spelling','beginning-consonant-blends','core-spelling'],
  ['grade-1-ending-consonant-blends','1','Core Spelling','ending-consonant-blends','core-spelling'],
  ['grade-1-long-vowels-silent-e','1','Core Spelling','long-vowels-silent-e','core-spelling'],
  ['grade-1-open-syllables-final-y','1','Core Spelling','open-syllables-final-y','core-spelling'],
  ['grade-1-long-a-long-o-vowel-teams','1','Core Spelling','long-a-long-o-vowel-teams','core-spelling'],
  ['grade-1-inflectional-endings-s-es','1','Core Spelling','inflectional-endings-s-es','core-spelling'],
  ['grade-1-inflectional-endings-ed-ing','1','Core Spelling','inflectional-endings-ed-ing','core-spelling'],
  ['grade-1-r-controlled-ar-or','1','Core Spelling','r-controlled-ar-or','core-spelling'],
  ['grade-1-tch-dge-ending-rules','1','Core Spelling','tch-dge-ending-rules','core-spelling'],
  ['grade-1-common-words-1','1','High-Frequency Words','high-frequency-words-1','high-frequency-words'],
  ['grade-1-common-words-2','1','High-Frequency Words','high-frequency-words-2','high-frequency-words'],
  ['grade-1-common-words-3','1','High-Frequency Words','high-frequency-words-3','high-frequency-words'],
  ['grade-1-common-words-4','1','High-Frequency Words','high-frequency-words-4','high-frequency-words'],
  ['grade-1-common-words-5','1','High-Frequency Words','high-frequency-words-5','high-frequency-words'],
  ['grade-1-common-words-6','1','High-Frequency Words','high-frequency-words-6','high-frequency-words'],
  ['grade-1-weather-words','1','Additional Practice','weather-words','additional-practice'],
  ['grade-1-clothing-words','1','Additional Practice','clothing-words','additional-practice'],
  ['grade-1-shape-words','1','Additional Practice','shape-words','additional-practice'],
  ['grade-1-number-words-11-20','1','Additional Practice','number-words-11-20','additional-practice'],
  ['grade-1-days-of-the-week','1','Additional Practice','days-of-the-week','additional-practice'],
  ['grade-2-long-e-ee-ea','2','Core Spelling','long-e-ee-ea','core-spelling'],
  ['grade-2-long-i-ie-igh','2','Core Spelling','long-i-ie-igh','core-spelling'],
  ['vowel-teams-oi-oy','2','Core Spelling','vowel-teams-oi-oy','core-spelling'],
  ['vowel-teams-ou-ow','2','Core Spelling','vowel-teams-ou-ow','core-spelling'],
  ['grade-2-oo-two-sounds','2','Core Spelling','oo-two-sounds','core-spelling'],
  ['grade-2-au-aw-words','2','Core Spelling','au-aw-words','core-spelling'],
  ['grade-2-r-controlled-er-ir-ur','2','Core Spelling','r-controlled-er-ir-ur','core-spelling'],
  ['grade-2-soft-c-soft-g','2','Core Spelling','soft-c-soft-g','core-spelling'],
  ['grade-2-two-syllable-words','2','Core Spelling','two-syllable-words','core-spelling'],
  ['grade-2-final-stable-le','2','Core Spelling','final-stable-le','core-spelling'],
  ['grade-2-silent-letter-words','2','Core Spelling','silent-letter-words','core-spelling'],
  ['grade-2-list-02','2','Core Spelling','compound-words','core-spelling'],
  ['grade-2-contractions','2','Core Spelling','contractions','core-spelling'],
  ['grade-2-common-words-1','2','High-Frequency Words','high-frequency-words-1','high-frequency-words'],
  ['grade-2-common-words-2','2','High-Frequency Words','high-frequency-words-2','high-frequency-words'],
  ['grade-2-common-words-3','2','High-Frequency Words','high-frequency-words-3','high-frequency-words'],
  ['grade-2-common-words-4','2','High-Frequency Words','high-frequency-words-4','high-frequency-words'],
  ['grade-2-common-words-5','2','High-Frequency Words','high-frequency-words-5','high-frequency-words'],
  ['grade-2-common-words-6','2','High-Frequency Words','high-frequency-words-6','high-frequency-words'],
  ['grade-2-transportation-words','2','Additional Practice','transportation-words','additional-practice'],
  ['grade-2-money-words','2','Additional Practice','money-words','additional-practice'],
  ['grade-2-number-words-20-100','2','Additional Practice','number-words-20-100','additional-practice'],
  ['grade-2-community-helpers','2','Additional Practice','community-helpers','additional-practice'],
  ['grade-2-months-of-the-year','2','Additional Practice','months-of-the-year','additional-practice'],
  ['grade-3-prefix-words','3','Core Spelling','prefix-words','core-spelling'],
  ['grade-3-suffix-words','3','Core Spelling','suffix-words','core-spelling'],
  ['grade-3-suffix-spelling-changes','3','Core Spelling','suffix-spelling-changes','core-spelling'],
  ['grade-3-possessives','3','Core Spelling','possessives','core-spelling'],
  ['grade-3-multisyllabic-words','3','Core Spelling','multisyllabic-words','core-spelling'],
  ['grade-3-homophones','3','Core Spelling','homophones','core-spelling'],
  ['grade-3-root-word-families','3','Core Spelling','root-word-families','core-spelling'],
  ['grade-3-common-words-1','3','High-Frequency Words','high-frequency-words-1','high-frequency-words'],
  ['grade-3-common-words-2','3','High-Frequency Words','high-frequency-words-2','high-frequency-words'],
  ['grade-3-common-words-3','3','High-Frequency Words','high-frequency-words-3','high-frequency-words'],
  ['grade-3-common-words-4','3','High-Frequency Words','high-frequency-words-4','high-frequency-words'],
  ['grade-3-common-words-5','3','High-Frequency Words','high-frequency-words-5','high-frequency-words'],
  ['grade-3-map-globe-words','3','Additional Practice','map-globe-words','additional-practice'],
  ['grade-3-life-cycle-words','3','Additional Practice','life-cycle-words','additional-practice'],
  ['grade-3-time-words','3','Additional Practice','time-words','additional-practice'],
  ['grade-3-multiplication-division-words','3','Additional Practice','multiplication-division-words','additional-practice'],
  ['grade-4-multisyllabic-academic-words','4','Core Spelling','multisyllabic-academic-words','core-spelling'],
  ['grade-4-advanced-prefixes','4','Core Spelling','advanced-prefixes','core-spelling'],
  ['grade-4-advanced-suffixes','4','Core Spelling','advanced-suffixes','core-spelling'],
  ['tier-1-roots-and-patterns','4','Core Spelling','roots-and-patterns','core-spelling'],
  ['grade-4-commonly-confused-words','4','Core Spelling','commonly-confused-words','core-spelling'],
  ['grade-4-derived-words','4','Core Spelling','derived-words-and-word-meaning','core-spelling'],
  ['grade-4-common-words-1','4','High-Frequency Words','high-frequency-words-1','high-frequency-words'],
  ['grade-4-common-words-2','4','High-Frequency Words','high-frequency-words-2','high-frequency-words'],
  ['grade-4-common-words-3','4','High-Frequency Words','high-frequency-words-3','high-frequency-words'],
  ['grade-4-common-words-4','4','High-Frequency Words','high-frequency-words-4','high-frequency-words'],
  ['grade-4-measurement-words','4','Additional Practice','measurement-words','additional-practice'],
  ['grade-4-solar-system-words','4','Additional Practice','solar-system-words','additional-practice'],
  ['grade-4-career-occupation-words','4','Additional Practice','career-occupation-words','additional-practice'],
  ['grade-4-geometry-words','4','Additional Practice','geometry-words','additional-practice'],
  ['grade-5-multisyllabic-academic-words','5','Core Spelling','multisyllabic-academic-words','core-spelling'],
  ['grade-5-prefix-suffix-words','5','Core Spelling','prefix-suffix-words','core-spelling'],
  ['grade-5-greek-latin-word-parts','5','Core Spelling','greek-latin-word-parts','core-spelling'],
  ['grade-5-commonly-confused-words','5','Core Spelling','commonly-confused-words','core-spelling'],
  ['grade-5-spelling-changes-related-words','5','Core Spelling','spelling-changes-in-related-words','core-spelling'],
  ['grade-5-common-words-1','5','High-Frequency Words','high-frequency-words-1','high-frequency-words'],
  ['grade-5-common-words-2','5','High-Frequency Words','high-frequency-words-2','high-frequency-words'],
  ['grade-5-common-words-3','5','High-Frequency Words','high-frequency-words-3','high-frequency-words'],
  ['grade-5-common-words-4','5','High-Frequency Words','high-frequency-words-4','high-frequency-words'],
  ['grade-5-money-management-words','5','Additional Practice','money-management-words','additional-practice'],
  ['grade-5-ecosystem-environment-words','5','Additional Practice','ecosystem-environment-words','additional-practice'],
  ['grade-5-fraction-decimal-words','5','Additional Practice','fraction-decimal-words','additional-practice'],
  ['grade-5-community-civics-words','5','Additional Practice','community-civics-words','additional-practice'],
] as const satisfies readonly RouteDef[];

export type CanonicalGradeRoute = {
  id: string;
  grade: GradeCode;
  gradeSlug: string;
  section: GradeHubSectionTitle;
  finalSlug: string;
  canonicalPath: string;
  classification: GradeRouteClassification;
};

const gradeSlugByGrade = new Map(gradeConfig.map((grade) => [grade.grade, grade.slug]));

export const canonicalGradeRoutes: readonly CanonicalGradeRoute[] = CANONICAL_GRADE_ROUTE_DEFS.map(
  ([id, grade, section, finalSlug, classification]) => {
    const gradeSlug = gradeSlugByGrade.get(grade);
    if (!gradeSlug) throw new Error(`Missing grade slug for ${grade}`);
    return { id, grade, gradeSlug, section, finalSlug, canonicalPath: `/${gradeSlug}/${finalSlug}`, classification };
  },
);

const routeById = new Map(canonicalGradeRoutes.map((route) => [route.id, route]));
const routeByPath = new Map(canonicalGradeRoutes.map((route) => [`${route.gradeSlug}/${route.finalSlug}`, route]));

export function getGradeHubPath(grade: GradeCode): string {
  const gradeEntry = gradeConfig.find((entry) => entry.grade === grade);
  if (!gradeEntry) throw new Error(`Unknown grade: ${grade}`);
  return `/${gradeEntry.slug}`;
}

export function getCanonicalGradeRoutes(): readonly CanonicalGradeRoute[] {
  return canonicalGradeRoutes;
}

export function isCanonicalGradeCurriculumId(id: string): boolean {
  return routeById.has(id);
}

export function getCanonicalGradeRouteById(id: string): CanonicalGradeRoute | undefined {
  return routeById.get(id);
}

export function getCanonicalGradeRouteByPath(gradeSlug: string, finalSlug: string): CanonicalGradeRoute | undefined {
  return routeByPath.get(`${gradeSlug}/${finalSlug}`);
}

export function getCanonicalListPathById(id: string): string | undefined {
  return routeById.get(id)?.canonicalPath;
}

// The composed canonical resolver — the one function every template and the
// sitemap should call to link to a spelling-lists entry. Every published
// spelling-lists entry is now, by construction, either a canonical Grade
// Unit or a canonical Skill (see the "spelling-lists ids match canonical
// manifests exactly" test) — so a lookup miss on both manifests indicates
// a real bug (a stray non-canonical entry survived), not a legacy page to
// fall back to. Fail loudly rather than construct a dead legacy URL.
export function getCanonicalListPath(entry: Pick<CollectionEntry<'spelling-lists'>['data'], 'id' | 'category' | 'urlSlug'>): string {
  const path = getCanonicalListPathById(entry.id) ?? getCanonicalSkillPathById(entry.id);
  if (!path) {
    throw new Error(
      `No canonical path for spelling-lists entry "${entry.id}" — every published entry must be a canonical Grade Unit or Skill.`,
    );
  }
  return path;
}
