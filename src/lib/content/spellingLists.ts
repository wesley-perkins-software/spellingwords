import type { CollectionEntry } from 'astro:content';
import type { SpellingWord } from '@/types/spelling';

export type SpellingListEntry = CollectionEntry<'spelling-lists'>;

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

/** Returns the full SpellingWord array for a content entry, preserving optional fields like exampleSentence. */
export function toPlayableWords(entry: SpellingListEntry): SpellingWord[] {
  return entry.data.words as SpellingWord[];
}
