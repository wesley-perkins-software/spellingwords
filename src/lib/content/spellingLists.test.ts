import { describe, expect, it } from 'vitest';
import { groupByCategory, isPublished, resolveListRefs, toPlayableWords } from './spellingLists';
import type { SpellingListEntry } from './spellingLists';

function makeEntry(overrides: Partial<SpellingListEntry['data']> & { id: string }): SpellingListEntry {
  const data = {
    id: overrides.id,
    urlSlug: overrides.id,
    title: overrides.id,
    description: '',
    category: 'phonics',
    difficulty: 'beginner',
    skillTags: [],
    tags: [],
    order: 0,
    estimatedDurationMinutes: 5,
    status: 'published',
    masteryThreshold: 90,
    sourceType: 'curated',
    relatedLists: [],
    prerequisiteLists: [],
    nextLists: [],
    featured: false,
    words: [{ word: 'cat' }, { word: 'dog' }],
    ...overrides,
  } as SpellingListEntry['data'];

  return { id: overrides.id, slug: overrides.id, body: '', collection: 'spelling-lists', data } as unknown as SpellingListEntry;
}

describe('isPublished', () => {
  it('returns true only for published entries', () => {
    expect(isPublished(makeEntry({ id: 'a', status: 'published' }))).toBe(true);
    expect(isPublished(makeEntry({ id: 'b', status: 'draft' }))).toBe(false);
    expect(isPublished(makeEntry({ id: 'c', status: 'archived' }))).toBe(false);
  });
});

describe('groupByCategory', () => {
  it('groups entries by category and sorts each group by order', () => {
    const entries = [
      makeEntry({ id: 'phonics-2', category: 'phonics', order: 2 }),
      makeEntry({ id: 'phonics-1', category: 'phonics', order: 1 }),
      makeEntry({ id: 'sight-1', category: 'sight-words', order: 1 }),
    ];

    const groups = groupByCategory(entries);

    expect([...groups.keys()]).toEqual(['phonics', 'sight-words']);
    expect(groups.get('phonics')!.map((e) => e.data.id)).toEqual(['phonics-1', 'phonics-2']);
    expect(groups.get('sight-words')!.map((e) => e.data.id)).toEqual(['sight-1']);
  });

  it('omits categories with no entries', () => {
    const groups = groupByCategory([makeEntry({ id: 'a', category: 'challenge' })]);
    expect(groups.has('grade-level')).toBe(false);
  });
});

describe('resolveListRefs', () => {
  const published = [
    makeEntry({ id: 'tier-1', category: 'challenge' }),
  ];

  it('resolves ids that match a published entry', () => {
    const resolved = resolveListRefs(['tier-1'], published);
    expect(resolved.map((e) => e.data.id)).toEqual(['tier-1']);
  });

  it('silently drops ids that do not resolve to a published entry', () => {
    const resolved = resolveListRefs(['tier-1', 'tier-2-draft', 'nonexistent'], published);
    expect(resolved.map((e) => e.data.id)).toEqual(['tier-1']);
  });

  it('returns an empty array when no ids resolve', () => {
    expect(resolveListRefs(['nonexistent'], published)).toEqual([]);
  });
});

describe('toPlayableWords', () => {
  it('injects exampleSentence from the sentence bank', () => {
    const entry = makeEntry({ id: 'a', words: ['brave', 'cake'] });
    const result = toPlayableWords(entry);
    expect(result[0].word).toBe('brave');
    expect(result[0].exampleSentence).toBeTruthy();
    expect(result[1].word).toBe('cake');
    expect(result[1].exampleSentence).toBeTruthy();
  });

  it('preserves hint from word object through enrichment', () => {
    const entry = makeEntry({ id: 'a', words: [{ word: 'brave', hint: 'courageous' }] });
    const result = toPlayableWords(entry);
    expect(result[0].word).toBe('brave');
    expect(result[0].hint).toBe('courageous');
    expect(result[0].exampleSentence).toBeTruthy();
  });

  it('returns no exampleSentence for words not in the bank', () => {
    const entry = makeEntry({ id: 'a', words: ['xyzzy-notaword'] });
    const result = toPlayableWords(entry);
    expect(result[0].word).toBe('xyzzy-notaword');
    expect(result[0].exampleSentence).toBeUndefined();
  });

  it('handles both string and object word entries in the same list', () => {
    const entry = makeEntry({ id: 'a', words: ['cat', { word: 'dog', hint: 'a pet' }] });
    const result = toPlayableWords(entry);
    expect(result[0].word).toBe('cat');
    expect(result[0].exampleSentence).toBeTruthy();
    expect(result[1].word).toBe('dog');
    expect(result[1].hint).toBe('a pet');
    expect(result[1].exampleSentence).toBeTruthy();
  });
});
