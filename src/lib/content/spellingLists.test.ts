import { describe, expect, it } from 'vitest';
import {
  dedupeRelatedLists,
  groupByCategory,
  groupBySkillFamily,
  groupGradeListsByCategory,
  isPublished,
  resolveListRefs,
  toPlayableWords,
} from './spellingLists';
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
    const groups = groupByCategory([makeEntry({ id: 'a', category: 'theme' })]);
    expect(groups.has('grade-level')).toBe(false);
  });
});

describe('groupGradeListsByCategory', () => {
  it('orders groups with grade-level first regardless of alphabetical order', () => {
    const entries = [
      makeEntry({ id: 'sight-1', category: 'sight-words', order: 1 }),
      makeEntry({ id: 'phonics-1', category: 'phonics', order: 1 }),
      makeEntry({ id: 'grade-1', category: 'grade-level', order: 1 }),
      makeEntry({ id: 'theme-1', category: 'theme', order: 1 }),
    ];

    const groups = groupGradeListsByCategory(entries);

    expect(groups.map((g) => g.category)).toEqual([
      'grade-level',
      'sight-words',
      'phonics',
      'theme',
    ]);
  });

  it('omits a category entirely when a grade has no entries for it (e.g. no phonics)', () => {
    const entries = [
      makeEntry({ id: 'grade-1', category: 'grade-level', order: 1 }),
      makeEntry({ id: 'sight-1', category: 'sight-words', order: 1 }),
    ];

    const groups = groupGradeListsByCategory(entries);

    expect(groups.map((g) => g.category)).toEqual(['grade-level', 'sight-words']);
  });

  it('sorts entries within each group by order', () => {
    const entries = [
      makeEntry({ id: 'grade-2', category: 'grade-level', order: 2 }),
      makeEntry({ id: 'grade-1', category: 'grade-level', order: 1 }),
    ];

    const groups = groupGradeListsByCategory(entries);

    expect(groups[0].entries.map((e) => e.data.id)).toEqual(['grade-1', 'grade-2']);
  });

  it('appends categories outside the priority list alphabetically after the prioritized ones', () => {
    const entries = [
      makeEntry({ id: 'theme-1', category: 'theme', order: 1 }),
      makeEntry({ id: 'seasonal-1', category: 'seasonal', order: 1 }),
      makeEntry({ id: 'grade-1', category: 'grade-level', order: 1 }),
    ];

    const groups = groupGradeListsByCategory(entries);

    expect(groups.map((g) => g.category)).toEqual(['grade-level', 'seasonal', 'theme']);
  });
});

describe('groupBySkillFamily', () => {
  it('groups entries by the first skillTags entry', () => {
    const entries = [
      makeEntry({ id: 'short-a', skillTags: ['short-vowels', 'short-a', 'cvc'], order: 1 }),
      makeEntry({ id: 'short-e', skillTags: ['short-vowels', 'short-e', 'cvc'], order: 2 }),
      makeEntry({ id: 'digraph-sh', skillTags: ['digraphs', 'sh'], order: 13 }),
    ];

    const groups = groupBySkillFamily(entries);

    expect(groups.map((g) => g.key)).toEqual(['short-vowels', 'digraphs']);
    expect(groups[0].entries.map((e) => e.data.id)).toEqual(['short-a', 'short-e']);
    expect(groups[1].entries.map((e) => e.data.id)).toEqual(['digraph-sh']);
  });

  it('humanizes the skill family key into a label without a hardcoded family map', () => {
    const entries = [makeEntry({ id: 'r-controlled-ar', skillTags: ['r-controlled', 'ar'], order: 10 })];

    const groups = groupBySkillFamily(entries);

    expect(groups[0].label).toBe('R Controlled');
  });

  it('splits final-blend lists from initial-blend lists even though both start with consonant-blends', () => {
    const entries = [
      makeEntry({ id: 'bl-blend', skillTags: ['consonant-blends', 'bl'], order: 17 }),
      makeEntry({ id: 'nd-final-blend', skillTags: ['consonant-blends', 'nd', 'final-blends'], order: 37 }),
    ];

    const groups = groupBySkillFamily(entries);

    expect(groups.map((g) => g.key)).toEqual(['consonant-blends', 'final-blends']);
    expect(groups[0].entries.map((e) => e.data.id)).toEqual(['bl-blend']);
    expect(groups[1].entries.map((e) => e.data.id)).toEqual(['nd-final-blend']);
  });

  it('buckets entries with no skillTags into a single generic phonics group', () => {
    const entries = [
      makeEntry({ id: 'untagged-1', skillTags: [], order: 1 }),
      makeEntry({ id: 'untagged-2', skillTags: [], order: 2 }),
    ];

    const groups = groupBySkillFamily(entries);

    expect(groups).toHaveLength(1);
    expect(groups[0].key).toBe('phonics');
    expect(groups[0].entries.map((e) => e.data.id)).toEqual(['untagged-1', 'untagged-2']);
  });

  it('orders groups by the lowest order value among their members, not insertion order', () => {
    const entries = [
      makeEntry({ id: 'digraph-sh', skillTags: ['digraphs', 'sh'], order: 13 }),
      makeEntry({ id: 'short-a', skillTags: ['short-vowels', 'short-a'], order: 1 }),
    ];

    const groups = groupBySkillFamily(entries);

    expect(groups.map((g) => g.key)).toEqual(['short-vowels', 'digraphs']);
  });

  it('a future, previously unseen skill family appears automatically with no code change', () => {
    const entries = [makeEntry({ id: 'prefix-un', skillTags: ['prefixes', 'un-'], order: 50 })];

    const groups = groupBySkillFamily(entries);

    expect(groups.map((g) => g.key)).toEqual(['prefixes']);
    expect(groups[0].label).toBe('Prefixes');
  });
});

describe('resolveListRefs', () => {
  const published = [
    makeEntry({ id: 'tier-1', category: 'theme' }),
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

describe('dedupeRelatedLists', () => {
  it('returns related unchanged when there is no overlap', () => {
    const prerequisites = [makeEntry({ id: 'pre-1' })];
    const related = [makeEntry({ id: 'rel-1' }), makeEntry({ id: 'rel-2' })];
    const next = [makeEntry({ id: 'next-1' })];

    expect(dedupeRelatedLists(prerequisites, related, next).map((e) => e.data.id)).toEqual([
      'rel-1',
      'rel-2',
    ]);
  });

  it('drops a related entry that also appears in prerequisites', () => {
    const prerequisites = [makeEntry({ id: 'shared' })];
    const related = [makeEntry({ id: 'shared' }), makeEntry({ id: 'rel-2' })];

    expect(dedupeRelatedLists(prerequisites, related, []).map((e) => e.data.id)).toEqual(['rel-2']);
  });

  it('drops a related entry that also appears in next', () => {
    const next = [makeEntry({ id: 'shared' })];
    const related = [makeEntry({ id: 'shared' }), makeEntry({ id: 'rel-2' })];

    expect(dedupeRelatedLists([], related, next).map((e) => e.data.id)).toEqual(['rel-2']);
  });

  it('never dedupes prerequisites and next against each other', () => {
    const prerequisites = [makeEntry({ id: 'shared' })];
    const next = [makeEntry({ id: 'shared' })];

    expect(dedupeRelatedLists(prerequisites, [], next)).toEqual([]);
    expect(prerequisites.map((e) => e.data.id)).toEqual(['shared']);
    expect(next.map((e) => e.data.id)).toEqual(['shared']);
  });

  it('returns an empty array when related is empty', () => {
    expect(dedupeRelatedLists([makeEntry({ id: 'pre-1' })], [], [makeEntry({ id: 'next-1' })])).toEqual(
      [],
    );
  });

  it('preserves the order of remaining related entries', () => {
    const related = [
      makeEntry({ id: 'rel-1' }),
      makeEntry({ id: 'shared' }),
      makeEntry({ id: 'rel-2' }),
    ];

    expect(dedupeRelatedLists([makeEntry({ id: 'shared' })], related, []).map((e) => e.data.id)).toEqual([
      'rel-1',
      'rel-2',
    ]);
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

  it('returns no exampleSentence for a heteronym in a curated list (spelling-only)', () => {
    // `live` is a spelling-only sentence-bank entry; a curated list using it must
    // enrich to no sentence so the play UI hides "Use in a Sentence".
    const entry = makeEntry({ id: 'a', words: ['live'] });
    const result = toPlayableWords(entry);
    expect(result[0].word).toBe('live');
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
