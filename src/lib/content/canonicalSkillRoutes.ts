export const TRAILING_SLASH = 'never' as const;

// Explicit stable-id -> canonical public slug mapping for the 41 frozen
// canonical Skill pages (see docs/architecture/SKILLS_ARCHITECTURE.md). This
// is the sole runtime source of truth for canonical Skill paths — never
// derived from source folder, category, filename, or frontmatter `urlSlug`.
// 14 ids get a purpose-built public slug (reordered for scanability now that
// pre-launch status removes any churn cost on the old repository-shaped
// URLs); the other 27 keep their existing slug unchanged. Frontmatter
// `urlSlug` is intentionally left untouched by this manifest.
type SkillRouteDef = readonly [id: string, finalSlug: string];

export const CANONICAL_SKILL_ROUTE_DEFS = [
  ['short-a-words', 'short-a-words'],
  ['short-e-words', 'short-e-words'],
  ['short-i-words', 'short-i-words'],
  ['short-o-words', 'short-o-words'],
  ['short-u-words', 'short-u-words'],
  ['digraph-ch-words', 'ch-digraph-words'],
  ['digraph-sh-words', 'sh-digraph-words'],
  ['digraph-th-words', 'th-digraph-words'],
  ['digraph-wh-words', 'wh-digraph-words'],
  ['beginning-blends', 'beginning-blends'],
  ['ending-blends', 'ending-blends'],
  ['ck-tch-dge-word-endings', 'ck-tch-dge-word-endings'],
  ['silent-letters', 'silent-letters'],
  ['soft-c-soft-g', 'soft-c-soft-g'],
  ['silent-e-long-a', 'long-a-silent-e'],
  ['silent-e-long-i', 'long-i-silent-e'],
  ['silent-e-long-o', 'long-o-silent-e'],
  ['silent-e-long-u', 'long-u-silent-e'],
  ['vowel-teams-ai-ay', 'ai-ay-vowel-teams'],
  ['vowel-teams-ee-ea', 'ee-ea-vowel-teams'],
  ['vowel-teams-oa-ow', 'oa-ow-vowel-teams'],
  ['oi-and-oy-words', 'oi-and-oy-words'],
  ['ou-and-ow-words', 'ou-and-ow-words'],
  ['ie-and-igh-words', 'ie-and-igh-words'],
  ['oo-words', 'oo-words'],
  ['au-and-aw-words', 'au-and-aw-words'],
  ['r-controlled-ar', 'r-controlled-ar-words'],
  ['r-controlled-or', 'r-controlled-or-words'],
  ['r-controlled-er-ir-ur', 'r-controlled-er-ir-ur-words'],
  ['multisyllabic-words', 'multisyllabic-words'],
  ['plurals', 'plurals'],
  ['ed-and-ing', 'ed-and-ing'],
  ['common-suffixes', 'common-suffixes'],
  ['suffix-spelling-changes', 'suffix-spelling-changes'],
  ['compound-words', 'compound-words'],
  ['contractions', 'contractions'],
  ['un-and-re-prefixes', 'un-and-re-prefixes'],
  ['common-prefixes', 'common-prefixes'],
  ['greek-and-latin-roots', 'greek-and-latin-roots'],
  ['homophones', 'homophones'],
  ['commonly-confused-words', 'commonly-confused-words'],
] as const satisfies readonly SkillRouteDef[];

export type CanonicalSkillRoute = {
  id: string;
  finalSlug: string;
  canonicalPath: string;
};

export const SKILLS_INDEX_PATH = '/skills';

export const canonicalSkillRoutes: readonly CanonicalSkillRoute[] = CANONICAL_SKILL_ROUTE_DEFS.map(
  ([id, finalSlug]) => ({ id, finalSlug, canonicalPath: `${SKILLS_INDEX_PATH}/${finalSlug}` }),
);

const skillRouteById = new Map(canonicalSkillRoutes.map((route) => [route.id, route]));
const skillRouteBySlug = new Map(canonicalSkillRoutes.map((route) => [route.finalSlug, route]));

export function getCanonicalSkillRoutes(): readonly CanonicalSkillRoute[] {
  return canonicalSkillRoutes;
}

export function isCanonicalSkillId(id: string): boolean {
  return skillRouteById.has(id);
}

export function getCanonicalSkillRouteById(id: string): CanonicalSkillRoute | undefined {
  return skillRouteById.get(id);
}

export function getCanonicalSkillRouteBySlug(finalSlug: string): CanonicalSkillRoute | undefined {
  return skillRouteBySlug.get(finalSlug);
}

export function getCanonicalSkillPathById(id: string): string | undefined {
  return skillRouteById.get(id)?.canonicalPath;
}
