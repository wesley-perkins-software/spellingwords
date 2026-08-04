import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  KINDERGARTEN_ADDITIONAL_IDS,
  KINDERGARTEN_CORE_IDS,
  buildKindergartenSections,
  getKindergartenRoadmapPosition,
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

type FrontmatterSummary = {
  id: string;
  status: string;
  grade?: string;
  category: string;
  words: string[];
  prerequisiteLists: string[];
  nextLists: string[];
  filePath: string;
};

function readFrontmatter(filePath: string): string {
  const source = readFileSync(filePath, 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`Missing frontmatter in ${filePath}`);
  return match[1];
}

function readScalar(frontmatter: string, key: string): string | undefined {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match?.[1].trim().replace(/^['"]|['"]$/g, '');
}

function readInlineArray(frontmatter: string, key: string): string[] {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*\\[(.*)\\]$`, 'm'));
  if (!match) return [];
  return match[1]
    .split(',')
    .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

function readWords(frontmatter: string): string[] {
  const match = frontmatter.match(/^words:\s*\n([\s\S]*)$/m);
  if (!match) return [];
  return match[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim().replace(/^['"]|['"]$/g, ''));
}

function kindergartenContent(): FrontmatterSummary[] {
  const root = join(process.cwd(), 'src/content/spelling-lists');
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((dir) =>
      readdirSync(join(root, dir.name), { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
        .map((entry) => join(root, dir.name, entry.name)),
    )
    .map((filePath) => {
      const frontmatter = readFrontmatter(filePath);
      return {
        id: readScalar(frontmatter, 'id') ?? '',
        status: readScalar(frontmatter, 'status') ?? '',
        grade: readScalar(frontmatter, 'grade'),
        category: readScalar(frontmatter, 'category') ?? '',
        words: readWords(frontmatter),
        prerequisiteLists: readInlineArray(frontmatter, 'prerequisiteLists'),
        nextLists: readInlineArray(frontmatter, 'nextLists'),
        filePath,
      };
    })
    .filter((entry) => entry.grade === 'K' || entry.id.startsWith('kindergarten-'));
}

const KINDERGARTEN_GRADE_UNIT_IDS = new Set(KINDERGARTEN_CORE_IDS);
const KINDERGARTEN_SIGHT_WORD_SET_IDS = new Set(['kindergarten-heart-words']);
const KINDERGARTEN_VOCABULARY_THEME_IDS = new Set(['kindergarten-animal-words', 'kindergarten-number-color-words']);
const ARCHIVED_KINDERGARTEN_THEME_IDS = new Set([
  'kindergarten-body-words',
  'kindergarten-describing-words',
  'kindergarten-family-words',
  'kindergarten-feelings-words',
  'kindergarten-food-words',
  'kindergarten-school-words',
  'kindergarten-shape-words',
]);

describe('buildKindergartenSections', () => {
  it('resolves all 8 core unit ids and 3 additional ids in curated order', () => {
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

describe('getKindergartenRoadmapPosition', () => {
  it('returns 1-based positions over the full core progression', () => {
    expect(getKindergartenRoadmapPosition('kindergarten-first-words')).toEqual({
      step: 1,
      total: KINDERGARTEN_CORE_IDS.length,
    });
    expect(getKindergartenRoadmapPosition('kindergarten-short-a-words')).toEqual({
      step: 2,
      total: KINDERGARTEN_CORE_IDS.length,
    });
    expect(getKindergartenRoadmapPosition('kindergarten-consonant-digraphs')).toEqual({
      step: KINDERGARTEN_CORE_IDS.length,
      total: KINDERGARTEN_CORE_IDS.length,
    });
  });

  it('returns undefined for anything outside the core progression', () => {
    expect(getKindergartenRoadmapPosition('kindergarten-heart-words')).toBeUndefined();
    expect(getKindergartenRoadmapPosition('short-a-words')).toBeUndefined();
    // kindergarten-ck-ending-words and kindergarten-double-consonants are
    // support/practice content, not canonical Kindergarten Grade Units —
    // removed from KINDERGARTEN_CORE_IDS per the Canonical Navigation
    // Relationships review.
    expect(getKindergartenRoadmapPosition('kindergarten-ck-ending-words')).toBeUndefined();
    expect(getKindergartenRoadmapPosition('kindergarten-double-consonants')).toBeUndefined();
    expect(getKindergartenRoadmapPosition('')).toBeUndefined();
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

describe('Kindergarten roadmap architecture', () => {
  it('does not duplicate ids across roadmap sections', () => {
    const ids = [...KINDERGARTEN_CORE_IDS, ...KINDERGARTEN_ADDITIONAL_IDS];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps only Grade Units in the core progression', () => {
    for (const id of KINDERGARTEN_CORE_IDS) {
      expect(KINDERGARTEN_GRADE_UNIT_IDS.has(id)).toBe(true);
      expect(KINDERGARTEN_SIGHT_WORD_SET_IDS.has(id)).toBe(false);
      expect(KINDERGARTEN_VOCABULARY_THEME_IDS.has(id)).toBe(false);
    }
  });

  it('keeps Sight Word Sets and Vocabulary or Theme Lists in Additional Practice', () => {
    expect(KINDERGARTEN_ADDITIONAL_IDS).toContain('kindergarten-heart-words');
    for (const id of [...KINDERGARTEN_SIGHT_WORD_SET_IDS, ...KINDERGARTEN_VOCABULARY_THEME_IDS]) {
      expect(KINDERGARTEN_ADDITIONAL_IDS).toContain(id);
      expect(KINDERGARTEN_CORE_IDS).not.toContain(id);
    }
  });

  it('resolves every configured Kindergarten roadmap id to published content', () => {
    const byId = new Map(kindergartenContent().map((entry) => [entry.id, entry]));

    for (const id of [...KINDERGARTEN_CORE_IDS, ...KINDERGARTEN_ADDITIONAL_IDS]) {
      expect(byId.get(id), id).toMatchObject({ status: 'published' });
    }
  });

  it('does not include archived Kindergarten theme pages in the live roadmap', () => {
    for (const id of ARCHIVED_KINDERGARTEN_THEME_IDS) {
      expect(KINDERGARTEN_CORE_IDS).not.toContain(id);
      expect(KINDERGARTEN_ADDITIONAL_IDS).not.toContain(id);
    }
  });

  it('keeps exactly the 8 canonical Kindergarten Core Spelling hub cards, per the Canonical Navigation Relationships review', () => {
    expect(KINDERGARTEN_CORE_IDS).toHaveLength(8);
    expect(KINDERGARTEN_CORE_IDS).not.toContain('kindergarten-ck-ending-words');
    expect(KINDERGARTEN_CORE_IDS).not.toContain('kindergarten-double-consonants');
  });

  it('keeps every Kindergarten Grade Unit practice set in the expected 8-16 word range', () => {
    const byId = new Map(kindergartenContent().map((entry) => [entry.id, entry]));

    for (const id of KINDERGARTEN_CORE_IDS) {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      expect(entry!.words.length, id).toBeGreaterThanOrEqual(8);
      expect(entry!.words.length, id).toBeLessThanOrEqual(16);
    }
  });

  // Review First / Next Step are no longer authored in prerequisiteLists/nextLists
  // frontmatter — they're derived from CORE_SPELLING_SEQUENCE (coreSpellingSequence.ts),
  // whose Kindergarten portion is this same 8-id order. Coherence of that
  // derived chain, including the K -> Grade 1 boundary, is verified in
  // navigationSequence.test.ts.
});
