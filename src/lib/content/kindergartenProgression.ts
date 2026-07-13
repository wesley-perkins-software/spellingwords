import type { SpellingListEntry } from './spellingLists';

/**
 * Curated presentation order for the Kindergarten grade hub, hand-maintained
 * like `gradeConfig.ts`/`gradeHubCopy.ts` rather than derived from content
 * frontmatter. The Kindergarten hub renders exactly two sections — a core
 * spelling progression and optional additional practice — instead of the
 * category-grouped sections every other grade page uses.
 */
export const KINDERGARTEN_CORE_IDS: readonly string[] = [
  'kindergarten-first-words',
  'kindergarten-short-a-words',
  'kindergarten-short-i-words',
  'kindergarten-short-o-words',
  'kindergarten-short-u-words',
  'kindergarten-short-e-words',
  'kindergarten-mixed-vowel-review',
  'kindergarten-consonant-digraphs',
  'kindergarten-ck-ending-words',
  'kindergarten-double-consonants',
];

export const KINDERGARTEN_ADDITIONAL_IDS: readonly string[] = [
  'kindergarten-heart-words',
  'kindergarten-animal-words',
  'kindergarten-number-color-words',
];

/**
 * Card badge label, independent of `category` — the taxonomy a parent sees
 * ("Phonics", "Spelling Rules", "Sight Words", "Vocabulary") is presentation
 * only and must never determine which hub section a list appears in.
 */
export const kindergartenBadges: Record<string, string> = {
  'kindergarten-first-words': 'Phonics',
  'kindergarten-short-a-words': 'Phonics',
  'kindergarten-short-i-words': 'Phonics',
  'kindergarten-short-o-words': 'Phonics',
  'kindergarten-short-u-words': 'Phonics',
  'kindergarten-short-e-words': 'Phonics',
  'kindergarten-mixed-vowel-review': 'Phonics',
  'kindergarten-consonant-digraphs': 'Phonics',
  'kindergarten-ck-ending-words': 'Spelling Rules',
  'kindergarten-double-consonants': 'Spelling Rules',
  'kindergarten-heart-words': 'Sight Words',
  'kindergarten-animal-words': 'Vocabulary',
  'kindergarten-number-color-words': 'Vocabulary',
};

/**
 * Returns a unit's 1-based position within the Kindergarten core progression,
 * for the "Kindergarten spelling · Step N of M" indicator on Grade Unit pages.
 * Returns undefined for anything outside the core roadmap (additional-practice
 * lists, Skills, other grades), which renders no indicator.
 */
export function getKindergartenRoadmapPosition(
  id: string,
): { step: number; total: number } | undefined {
  const index = KINDERGARTEN_CORE_IDS.indexOf(id);
  if (index === -1) return undefined;
  return { step: index + 1, total: KINDERGARTEN_CORE_IDS.length };
}

/**
 * Resolves the curated core/additional id lists against a grade's published
 * entries, in curated order. An id with no matching published entry is
 * silently dropped rather than throwing, matching `resolveListRefs()`'s
 * safety behavior for cross-references elsewhere in the content layer.
 */
export function buildKindergartenSections(gradeLists: SpellingListEntry[]): {
  core: SpellingListEntry[];
  additional: SpellingListEntry[];
} {
  const byId = new Map(gradeLists.map((entry) => [entry.data.id, entry]));
  const resolve = (ids: readonly string[]) =>
    ids.map((id) => byId.get(id)).filter((entry): entry is SpellingListEntry => entry !== undefined);

  return {
    core: resolve(KINDERGARTEN_CORE_IDS),
    additional: resolve(KINDERGARTEN_ADDITIONAL_IDS),
  };
}
