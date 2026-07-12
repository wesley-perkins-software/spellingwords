export const SPELLING_SKILLS_INDEX_PATH = '/spelling-lists/skills/';

export const SHORT_VOWELS_AND_CVC_SKILL_FAMILY = {
  title: 'Short Vowels and CVC Words',
  description: 'Practice simple words with short A, E, I, O, and U sounds.',
  /**
   * This family is ready for public Skill browsing, but it does not have its
   * own destination yet. The index uses the family as a grouping label and
   * links directly to the focused reusable Skill pages.
   */
  skillIds: [
    'short-a-words',
    'short-e-words',
    'short-i-words',
    'short-o-words',
    'short-u-words',
  ],
} as const;

export const SPELLING_SKILL_FAMILIES = [SHORT_VOWELS_AND_CVC_SKILL_FAMILY] as const;

export const CURATED_SPELLING_SKILL_IDS = SPELLING_SKILL_FAMILIES.flatMap(
  (family) => family.skillIds,
);

export type CuratedSpellingSkillId = (typeof CURATED_SPELLING_SKILL_IDS)[number];

export function isCuratedSpellingSkillId(id: string): id is CuratedSpellingSkillId {
  return (CURATED_SPELLING_SKILL_IDS as readonly string[]).includes(id);
}

export function getSpellingSkillPath(entry: { data: { category: string; urlSlug: string } }): string {
  return `/spelling-lists/${entry.data.category}/${entry.data.urlSlug}`;
}

export function resolveCuratedSkillFamilyEntries<T extends { data: { id: string } }>(
  entries: T[],
  skillIds: readonly string[],
): T[] {
  const byId = new Map(entries.map((entry) => [entry.data.id, entry]));

  return skillIds.map((id) => {
    const entry = byId.get(id);
    if (!entry) throw new Error(`Missing curated spelling Skill: ${id}`);
    return entry;
  });
}
