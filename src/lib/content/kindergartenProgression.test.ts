import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  KINDERGARTEN_ADDITIONAL_IDS,
  KINDERGARTEN_CORE_IDS,
  KINDERGARTEN_CORE_STEPS,
  KINDERGARTEN_SYNTHETIC_STEP_ID,
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
  // Pre-existing bug fix (unrelated to Phase 2 content changes): the trailing
  // `|$` alternative in the lookahead matched end-of-*line* under the `m`
  // flag, not end-of-string, truncating every word list to its first item.
  // `(?![\s\S])` matches only the true end of the string.
  const match = frontmatter.match(/^words:\s*\n([\s\S]*?)(?=\n---|\n[a-zA-Z][\w]*:|(?![\s\S]))/m);
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

// Ids that carry a Grade Unit role today: the 3 canonical steps plus the one
// temporary GD-7 supporting step. The composed High-Frequency Words step's
// members (kindergarten-heart-words, dolch-pre-primer-a/b/c) are Sight Word
// Sets composed into the roadmap under GD-2, not Grade Units themselves —
// this is a documented, intentional exception, not a general loosening of
// "core progression = grade units only".
const KINDERGARTEN_GRADE_UNIT_IDS = new Set([
  'kindergarten-first-words',
  'kindergarten-mixed-vowel-review',
  'kindergarten-consonant-digraphs',
]);
const KINDERGARTEN_SIGHT_WORD_SET_IDS = new Set([
  'kindergarten-heart-words',
  'dolch-pre-primer-a',
  'dolch-pre-primer-b',
  'dolch-pre-primer-c',
]);
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
  it('resolves all 4 core steps (7 content ids) and 9 additional ids in curated order', () => {
    const gradeLists = [...KINDERGARTEN_CORE_IDS, ...KINDERGARTEN_ADDITIONAL_IDS]
      .slice()
      .reverse()
      .map((id) => makeEntry({ id }));

    const { core, additional } = buildKindergartenSections(gradeLists);

    expect(core).toHaveLength(4);
    expect(core.map((section) => section.entries.map((e) => e.data.id))).toEqual([
      ['kindergarten-first-words'],
      ['kindergarten-mixed-vowel-review'],
      ['kindergarten-heart-words', 'dolch-pre-primer-a', 'dolch-pre-primer-b', 'dolch-pre-primer-c'],
      ['kindergarten-consonant-digraphs'],
    ]);
    core.forEach((section, index) => {
      expect(section.step).toBe(index + 1);
      expect(section.total).toBe(4);
    });
    expect(additional.map((e) => e.data.id)).toEqual(KINDERGARTEN_ADDITIONAL_IDS);
  });

  it('drops ids with no matching published entry instead of throwing', () => {
    const gradeLists = [makeEntry({ id: 'kindergarten-first-words' })];

    const { core, additional } = buildKindergartenSections(gradeLists);

    expect(core[0].entries).toEqual([gradeLists[0]]);
    expect(core[1].entries).toEqual([]);
    expect(core[2].entries).toEqual([]);
    expect(core[3].entries).toEqual([]);
    expect(additional).toEqual([]);
  });

  it('returns empty sections for an empty grade list', () => {
    const { core, additional } = buildKindergartenSections([]);
    expect(core.every((section) => section.entries.length === 0)).toBe(true);
    expect(additional).toEqual([]);
  });
});

describe('getKindergartenRoadmapPosition', () => {
  it('returns 1-based positions over the 4-step core progression', () => {
    expect(getKindergartenRoadmapPosition('kindergarten-first-words')).toEqual({ step: 1, total: 4 });
    expect(getKindergartenRoadmapPosition('kindergarten-mixed-vowel-review')).toEqual({ step: 2, total: 4 });
    expect(getKindergartenRoadmapPosition('kindergarten-consonant-digraphs')).toEqual({ step: 4, total: 4 });
  });

  it('resolves every member of the composed High-Frequency Words step to the same position', () => {
    const expected = { step: 3, total: 4 };
    expect(getKindergartenRoadmapPosition('kindergarten-heart-words')).toEqual(expected);
    expect(getKindergartenRoadmapPosition('dolch-pre-primer-a')).toEqual(expected);
    expect(getKindergartenRoadmapPosition('dolch-pre-primer-b')).toEqual(expected);
    expect(getKindergartenRoadmapPosition('dolch-pre-primer-c')).toEqual(expected);
  });

  it('returns undefined for anything outside the core progression', () => {
    expect(getKindergartenRoadmapPosition('kindergarten-short-a-words')).toBeUndefined();
    expect(getKindergartenRoadmapPosition('short-a-words')).toBeUndefined();
    expect(getKindergartenRoadmapPosition('')).toBeUndefined();
  });

  it('resolves the synthetic milestone id to its own step position, even though it has no content entry', () => {
    // Real callers only ever query real content ids (the milestone's
    // memberIds) since the synthetic id itself is never rendered as a page —
    // this just confirms position lookup stays internally consistent if the
    // bookkeeping id is ever queried directly.
    expect(getKindergartenRoadmapPosition(KINDERGARTEN_SYNTHETIC_STEP_ID)).toEqual({ step: 3, total: 4 });
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

  it('keeps only Grade Units in the core progression, except the documented composed High-Frequency Words milestone (GD-2)', () => {
    for (const id of KINDERGARTEN_CORE_IDS) {
      if (KINDERGARTEN_SIGHT_WORD_SET_IDS.has(id)) {
        // Intentional, documented exception: the High-Frequency Words step
        // composes existing Sight Word Sets under one roadmap milestone
        // (its own step id is synthetic and has no content entry). This is
        // not a general loosening of "core = grade units" — every other
        // core id must still be a real Grade Unit.
        continue;
      }
      expect(KINDERGARTEN_GRADE_UNIT_IDS.has(id), id).toBe(true);
      expect(KINDERGARTEN_VOCABULARY_THEME_IDS.has(id), id).toBe(false);
    }
  });

  it('keeps Vocabulary/Theme Lists in Additional Practice', () => {
    for (const id of KINDERGARTEN_VOCABULARY_THEME_IDS) {
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

  it('keeps every Kindergarten core-progression practice set in the expected 8-16 word range', () => {
    const byId = new Map(kindergartenContent().map((entry) => [entry.id, entry]));

    for (const id of KINDERGARTEN_CORE_IDS) {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      expect(entry!.words.length, id).toBeGreaterThanOrEqual(8);
      expect(entry!.words.length, id).toBeLessThanOrEqual(16);
    }
  });

  it('keeps the previous and next links coherent through the flattened core progression', () => {
    const byId = new Map(kindergartenContent().map((entry) => [entry.id, entry]));

    KINDERGARTEN_CORE_IDS.forEach((id, index) => {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();

      const previousId = KINDERGARTEN_CORE_IDS[index - 1];
      const nextId = KINDERGARTEN_CORE_IDS[index + 1];

      if (previousId) expect(entry!.prerequisiteLists).toContain(previousId);
      if (nextId) expect(entry!.nextLists).toContain(nextId);
    });
  });
});

describe('KINDERGARTEN_CORE_STEPS structural invariants', () => {
  it('has unique step ids, including the synthetic milestone id', () => {
    const stepIds = KINDERGARTEN_CORE_STEPS.map((step) => step.id);
    expect(new Set(stepIds).size).toBe(stepIds.length);
  });

  it('resolves every non-synthetic step/member id to a published content entry', () => {
    const byId = new Map(kindergartenContent().map((entry) => [entry.id, entry]));

    for (const step of KINDERGARTEN_CORE_STEPS) {
      const memberIds = step.memberIds ?? [step.id];
      for (const id of memberIds) {
        expect(byId.get(id), id).toMatchObject({ status: 'published' });
      }
    }
  });

  it('documents the one synthetic step id as configuration-only, with no content entry, route, or page', () => {
    const byId = new Map(kindergartenContent().map((entry) => [entry.id, entry]));

    expect(KINDERGARTEN_SYNTHETIC_STEP_ID).toBe('kindergarten-high-frequency-words');
    // The synthetic milestone id itself must NOT resolve to any published
    // content entry — only its memberIds are real, resolvable content.
    expect(byId.has(KINDERGARTEN_SYNTHETIC_STEP_ID)).toBe(false);

    const syntheticStep = KINDERGARTEN_CORE_STEPS.find((step) => step.id === KINDERGARTEN_SYNTHETIC_STEP_ID);
    expect(syntheticStep).toBeDefined();
    expect(syntheticStep!.memberIds && syntheticStep!.memberIds.length > 0).toBe(true);
  });

  it('does not repeat any member id across more than one core step', () => {
    const seen = new Set<string>();
    for (const step of KINDERGARTEN_CORE_STEPS) {
      for (const id of step.memberIds ?? [step.id]) {
        expect(seen.has(id), id).toBe(false);
        seen.add(id);
      }
    }
  });

  it('keeps core and additional ids completely disjoint', () => {
    const coreSet = new Set(KINDERGARTEN_CORE_IDS);
    for (const id of KINDERGARTEN_ADDITIONAL_IDS) {
      expect(coreSet.has(id), id).toBe(false);
    }
  });
});
