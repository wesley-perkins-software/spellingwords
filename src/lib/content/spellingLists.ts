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
 * Groups entries by their `strand`, sorting each group by `order`.
 * Entries without a strand are placed under a fallback derived from category.
 */
export function groupByStrand(
  entries: SpellingListEntry[],
): Map<string, SpellingListEntry[]> {
  const groups = new Map<string, SpellingListEntry[]>();

  for (const entry of entries) {
    const key = entry.data.strand ?? categoryToStrand(entry.data.category);
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

  return groups;
}

function categoryToStrand(category: SpellingListEntry['data']['category']): string {
  switch (category) {
    case 'sight-words': return 'foundations';
    case 'phonics': return 'word-patterns';
    case 'grade-level': return 'vocabulary';
    case 'challenge': return 'enrichment';
    default: return 'vocabulary';
  }
}

const STRAND_PROGRESSION_ORDER: Record<string, number> = {
  foundations: 0,
  'word-patterns': 1,
  vocabulary: 2,
  enrichment: 3,
};

function strandProgressionKey(entry: SpellingListEntry): number {
  const s = entry.data.strand ?? categoryToStrand(entry.data.category);
  return STRAND_PROGRESSION_ORDER[s] ?? 2;
}

/**
 * Returns all entries for a given grade value (e.g. "K", "1", "2"),
 * sorted by curriculum progression order (foundations → word-patterns →
 * vocabulary → enrichment), then by `order` within each strand.
 */
export function getListsByGrade(grade: string, entries: SpellingListEntry[]): SpellingListEntry[] {
  return entries
    .filter((e) => e.data.grade === grade)
    .sort((a, b) => {
      const strandDiff = strandProgressionKey(a) - strandProgressionKey(b);
      if (strandDiff !== 0) return strandDiff;
      return a.data.order - b.data.order;
    });
}

/**
 * Splits a grade's progression-sorted list into an opening "start here" group
 * (foundations strand) and the remaining lists. Both arrays preserve
 * progression order. If there are no foundations-strand lists the opening
 * array is empty and all lists appear in the rest array.
 */
export function splitProgressionGroups(
  lists: SpellingListEntry[],
): { opening: SpellingListEntry[]; rest: SpellingListEntry[] } {
  const opening = lists.filter((e) => (e.data.strand ?? categoryToStrand(e.data.category)) === 'foundations');
  const rest = lists.filter((e) => (e.data.strand ?? categoryToStrand(e.data.category)) !== 'foundations');
  return { opening, rest };
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
