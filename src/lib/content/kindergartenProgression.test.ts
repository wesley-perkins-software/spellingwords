import { describe, expect, it } from 'vitest';
import {
  KINDERGARTEN_ADDITIONAL_IDS,
  KINDERGARTEN_CORE_IDS,
  buildKindergartenSections,
  kindergartenBadges,
} from './kindergartenProgression';
import type { SpellingListEntry } from './spellingLists';

function makeEntry(overrides: Partial<SpellingListEntry['data']> & { id: string }): SpellingListEntry {
  const data = {
    id: overrides.id,
    urlSlug: overrides.id,
    title: overrides.id,
    description: '',
    category: 'phonics',
    grade: 'K',
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

describe('buildKindergartenSections', () => {
  it('resolves all 11 core ids and 2 additional ids in curated order', () => {
    const gradeLists = [...KINDERGARTEN_CORE_IDS, ...KINDERGARTEN_ADDITIONAL_IDS]
      .slice()
      .reverse()
      .map((id) => makeEntry({ id }));

    const { core, additional } = buildKindergartenSections(gradeLists);

    expect(core.map((e) => e.data.id)).toEqual(KINDERGARTEN_CORE_IDS);
    expect(additional.map((e) => e.data.id)).toEqual(KINDERGARTEN_ADDITIONAL_IDS);
  });

  it('drops ids with no matching published entry instead of throwing', () => {
    const gradeLists = [makeEntry({ id: 'kindergarten-first-words' })];

    const { core, additional } = buildKindergartenSections(gradeLists);

    expect(core).toEqual([gradeLists[0]]);
    expect(additional).toEqual([]);
  });

  it('returns empty sections for an empty grade list', () => {
    expect(buildKindergartenSections([])).toEqual({ core: [], additional: [] });
  });
});

describe('kindergartenBadges', () => {
  it('has a badge for every core and additional id', () => {
    for (const id of [...KINDERGARTEN_CORE_IDS, ...KINDERGARTEN_ADDITIONAL_IDS]) {
      expect(kindergartenBadges[id]).toBeTruthy();
    }
  });

  it('only uses the four approved badge labels', () => {
    const allowed = new Set(['Phonics', 'Sight Words', 'Spelling Rules', 'Vocabulary']);
    for (const label of Object.values(kindergartenBadges)) {
      expect(allowed.has(label)).toBe(true);
    }
  });
});
