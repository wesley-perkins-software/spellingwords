import type { CollectionEntry } from 'astro:content';
import type { SpellingWord } from '@/types/spelling';
import { getSentenceBankEntry } from '@/lib/sentenceBank/lookup';

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
