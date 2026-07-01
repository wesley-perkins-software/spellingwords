import type { CollectionEntry } from 'astro:content';
import type { SpellingWord } from '@/types/spelling';
import { getSentenceBankEntry } from '@/lib/sentenceBank/lookup';
import { categoryOrder } from '@/lib/content/categoryMeta';

export type SpellingListEntry = CollectionEntry<'spelling-lists'>;
export type SpellingCollectionEntry = CollectionEntry<'spelling-collections'>;

/** Whether a content entry is visible on browse/index/detail surfaces. */
export function isPublished(entry: SpellingListEntry): boolean {
  return entry.data.status === 'published';
}

/**
 * Groups entries by their `category`, sorting each group by `order`.
 * Categories with no entries are simply absent from the result.
 */
export function groupByCategory(
  entries: SpellingListEntry[],
): Map<SpellingListEntry['data']['category'], SpellingListEntry[]> {
  const groups = new Map<SpellingListEntry['data']['category'], SpellingListEntry[]>();

  for (const entry of entries) {
    const existing = groups.get(entry.data.category);
    if (existing) {
      existing.push(entry);
    } else {
      groups.set(entry.data.category, [entry]);
    }
  }

  for (const group of groups.values()) {
    group.sort((a, b) => a.data.order - b.data.order);
  }

  return groups;
}

/**
 * Resolves an array of `WordList.id` references to their content entries,
 * silently dropping any id that doesn't resolve to a published entry.
 * This is what keeps cross-references to draft/archived lists invisible in
 * rendered UI while leaving the underlying data link intact.
 */
export function resolveListRefs(
  ids: string[],
  publishedEntries: SpellingListEntry[],
): SpellingListEntry[] {
  const byId = new Map(publishedEntries.map((entry) => [entry.data.id, entry]));
  return ids.map((id) => byId.get(id)).filter((entry): entry is SpellingListEntry => entry !== undefined);
}

/**
 * Returns all entries for a given grade value (e.g. "K", "1", "2"),
 * sorted by category alphabetically then by order within each category.
 */
export function getListsByGrade(grade: string, entries: SpellingListEntry[]): SpellingListEntry[] {
  return entries
    .filter((e) => e.data.grade === grade)
    .sort((a, b) => {
      if (a.data.category !== b.data.category) return a.data.category.localeCompare(b.data.category);
      return a.data.order - b.data.order;
    });
}

/**
 * Orders a set of categories by `categoryOrder` display priority
 * (grade-level first); any category outside that priority list is
 * appended alphabetically rather than dropped.
 */
function prioritizeCategories(
  categories: Iterable<SpellingListEntry['data']['category']>,
): SpellingListEntry['data']['category'][] {
  const set = new Set(categories);
  const prioritized = categoryOrder.filter((category) => set.has(category));
  const remaining = [...set]
    .filter((category) => !(prioritized as readonly string[]).includes(category))
    .sort((a, b) => a.localeCompare(b));
  return [...prioritized, ...remaining];
}

/**
 * Groups a grade's entries by category in display priority order
 * (grade-level first), sorting each group by `order`. Categories absent
 * from the given entries are omitted entirely — no empty sections.
 */
export function groupGradeListsByCategory(
  entries: SpellingListEntry[],
): Array<{ category: SpellingListEntry['data']['category']; entries: SpellingListEntry[] }> {
  const grouped = groupByCategory(entries);
  return prioritizeCategories(grouped.keys()).map((category) => ({
    category,
    entries: grouped.get(category)!,
  }));
}

/**
 * Builds the section list for a grade hub page: lists and collections for
 * the grade, merged into one section per category (grade-level first, per
 * `categoryOrder`), so a collection appears alongside the standalone lists
 * in its own category rather than always being hoisted above everything.
 */
export function buildGradeHubSections(
  gradeLists: SpellingListEntry[],
  gradeCollections: SpellingCollectionEntry[],
): Array<{
  category: SpellingListEntry['data']['category'];
  entries: SpellingListEntry[];
  collections: SpellingCollectionEntry[];
}> {
  const grouped = groupByCategory(gradeLists);

  const collectionsByCategory = new Map<SpellingListEntry['data']['category'], SpellingCollectionEntry[]>();
  for (const collection of gradeCollections) {
    const existing = collectionsByCategory.get(collection.data.category);
    if (existing) {
      existing.push(collection);
    } else {
      collectionsByCategory.set(collection.data.category, [collection]);
    }
  }

  const categories = new Set<SpellingListEntry['data']['category']>([
    ...grouped.keys(),
    ...collectionsByCategory.keys(),
  ]);

  return prioritizeCategories(categories).map((category) => ({
    category,
    entries: grouped.get(category) ?? [],
    collections: collectionsByCategory.get(category) ?? [],
  }));
}

/**
 * Groups entries by skill family, derived entirely from each entry's
 * existing `skillTags` — no family list is hardcoded here, so new phonics
 * (or other skill-tagged) families surface automatically as content is
 * added. The grouping key is `skillTags[0]` (the convention used throughout
 * the phonics content), except `final-blends` takes precedence when present
 * so initial- and final-blend lists don't collapse into one bucket. Entries
 * with no skillTags fall into a single generic 'phonics' bucket. Groups are
 * ordered by the lowest `order` value among their members, reusing the
 * existing pedagogical sequencing instead of a second hardcoded sequence.
 */
export function groupBySkillFamily(
  entries: SpellingListEntry[],
): Array<{ key: string; label: string; entries: SpellingListEntry[] }> {
  const groups = new Map<string, SpellingListEntry[]>();

  for (const entry of entries) {
    const key = getSkillFamilyKey(entry.data.skillTags);
    const existing = groups.get(key);
    if (existing) {
      existing.push(entry);
    } else {
      groups.set(key, [entry]);
    }
  }

  for (const group of groups.values()) {
    group.sort((a, b) => a.data.order - b.data.order);
  }

  return [...groups.entries()]
    .map(([key, groupEntries]) => ({ key, label: humanizeSkillFamilyKey(key), entries: groupEntries }))
    .sort((a, b) => a.entries[0].data.order - b.entries[0].data.order);
}

function getSkillFamilyKey(skillTags: string[]): string {
  if (skillTags.includes('final-blends')) return 'final-blends';
  return skillTags[0] ?? 'phonics';
}

function humanizeSkillFamilyKey(key: string): string {
  return key
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Returns a Set of list IDs that belong to any published collection. */
export function getMemberListIds(collections: SpellingCollectionEntry[]): Set<string> {
  const ids = new Set<string>();
  for (const c of collections) {
    if (c.data.status === 'published') {
      for (const id of c.data.listIds) ids.add(id);
    }
  }
  return ids;
}

/** Returns the published collection a list belongs to, if any. */
export function getListCollection(
  listId: string,
  collections: SpellingCollectionEntry[],
): SpellingCollectionEntry | undefined {
  return collections.find((c) => c.data.status === 'published' && c.data.listIds.includes(listId));
}

/**
 * Converts a list entry's word data to playable SpellingWord objects.
 * Words are plain strings or objects with hint/phonicsPattern in frontmatter;
 * exampleSentence is always injected from the sentence bank here.
 */
export function toPlayableWords(entry: SpellingListEntry): SpellingWord[] {
  return entry.data.words.map((w) => {
    const wordStr = typeof w === 'string' ? w : w.word;
    const bankEntry = getSentenceBankEntry(wordStr);
    return {
      word: wordStr,
      exampleSentence: bankEntry?.exampleSentence,
      ...(typeof w !== 'string' && w.hint !== undefined ? { hint: w.hint } : {}),
      ...(typeof w !== 'string' && w.phonicsPattern !== undefined ? { phonicsPattern: w.phonicsPattern } : {}),
    };
  });
}
