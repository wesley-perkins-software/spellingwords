import type { CollectionEntry } from 'astro:content';
import type { SpellingWord } from '@/types/spelling';
import { getSentenceBankEntry } from '@/lib/sentenceBank/lookup';
import { categoryOrder } from '@/lib/content/categoryMeta';

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

/**
 * Removes entries from `related` that already appear in `prerequisites` or
 * `next`, so a list authored into more than one of the three frontmatter
 * arrays only renders once on the detail page. Directional progression
 * (prerequisite/next) is treated as more useful than the generic "related"
 * bucket, so related always loses the overlap — prerequisites and next are
 * never filtered against each other.
 */
export function dedupeRelatedLists(
  prerequisites: SpellingListEntry[],
  related: SpellingListEntry[],
  next: SpellingListEntry[],
): SpellingListEntry[] {
  const directional = new Set([
    ...prerequisites.map((entry) => entry.data.id),
    ...next.map((entry) => entry.data.id),
  ]);
  return related.filter((entry) => !directional.has(entry.data.id));
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
