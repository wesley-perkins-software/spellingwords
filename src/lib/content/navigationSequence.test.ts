import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CORE_SPELLING_SEQUENCE } from './coreSpellingSequence';
import { HF_WORDS_SEQUENCE } from './hfWordsSequence';
import { getSequenceNeighbors } from './navigationSequence';
import { getCanonicalGradeRouteById, getCanonicalGradeRoutes } from './canonicalGradeRoutes';

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

/** Reads a YAML array value in either inline (`key: [...]`) or block (`key:\n  - item`) form. */
function readArray(frontmatter: string, key: string): string[] {
  const match = frontmatter.match(new RegExp(`^${key}:([^\\n]*)(\\n((?:[ \\t]+-.*\\n?)*))?`, 'm'));
  if (!match) return [];

  const inline = match[1].trim();
  if (inline.startsWith('[')) {
    const inner = inline.slice(1, inline.lastIndexOf(']'));
    return inner
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  const block = match[3] ?? '';
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim().replace(/^['"]|['"]$/g, ''));
}

type FrontmatterSummary = {
  id: string;
  status: string;
  prerequisiteLists: string[];
  nextLists: string[];
  relatedLists: string[];
  contentRole: string;
  filePath: string;
};

function allContent(): FrontmatterSummary[] {
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
        prerequisiteLists: readArray(frontmatter, 'prerequisiteLists'),
        nextLists: readArray(frontmatter, 'nextLists'),
        relatedLists: readArray(frontmatter, 'relatedLists'),
        contentRole: readScalar(frontmatter, 'contentRole') ?? '',
        filePath,
      };
    });
}

describe('CORE_SPELLING_SEQUENCE', () => {
  it('has exactly 51 ids, matching the 8+12+13+7+6+5 canonical Core Spelling count', () => {
    expect(CORE_SPELLING_SEQUENCE.length).toBe(51);
  });

  it('has no duplicate ids', () => {
    expect(new Set(CORE_SPELLING_SEQUENCE).size).toBe(CORE_SPELLING_SEQUENCE.length);
  });

  it('resolves every id to a real, published content entry', () => {
    const byId = new Map(allContent().map((entry) => [entry.id, entry]));
    for (const id of CORE_SPELLING_SEQUENCE) {
      expect(byId.get(id), id).toMatchObject({ status: 'published' });
    }
  });

  it('resolves every id to a canonical Core Spelling URL and every consecutive pair to consecutive URLs', () => {
    const routes = getCanonicalGradeRoutes();
    for (const [index, id] of CORE_SPELLING_SEQUENCE.entries()) {
      const route = getCanonicalGradeRouteById(id);
      expect(route, id).toMatchObject({ classification: 'core-spelling' });
      expect(route?.canonicalPath).toBe(`/${route?.gradeSlug}/${route?.finalSlug}`);
      if (index < CORE_SPELLING_SEQUENCE.length - 1) {
        expect(getSequenceNeighbors(id).nextId).toBe(CORE_SPELLING_SEQUENCE[index + 1]);
        expect(routes.find((candidate) => candidate.id === getSequenceNeighbors(id).nextId)?.canonicalPath)
          .toBe(getCanonicalGradeRouteById(CORE_SPELLING_SEQUENCE[index + 1])?.canonicalPath);
      }
    }
  });

  it('has exactly one start and one end, with every interior page linked in both directions', () => {
    const starts = CORE_SPELLING_SEQUENCE.filter((id) => getSequenceNeighbors(id).prerequisiteId === undefined);
    const ends = CORE_SPELLING_SEQUENCE.filter((id) => getSequenceNeighbors(id).nextId === undefined);
    expect(starts).toEqual(['kindergarten-first-words']);
    expect(ends).toEqual(['grade-5-spelling-changes-related-words']);

    CORE_SPELLING_SEQUENCE.forEach((id, index) => {
      expect(getSequenceNeighbors(id)).toEqual({
        prerequisiteId: CORE_SPELLING_SEQUENCE[index - 1],
        nextId: CORE_SPELLING_SEQUENCE[index + 1],
      });
    });
  });
});

describe('HF_WORDS_SEQUENCE', () => {
  it('has exactly 29 ids, matching the 4+6+6+5+4+4 canonical High-Frequency Words count', () => {
    expect(HF_WORDS_SEQUENCE.length).toBe(29);
  });

  it('has no duplicate ids', () => {
    expect(new Set(HF_WORDS_SEQUENCE).size).toBe(HF_WORDS_SEQUENCE.length);
  });

  it('resolves every id to a real, published content entry', () => {
    const byId = new Map(allContent().map((entry) => [entry.id, entry]));
    for (const id of HF_WORDS_SEQUENCE) {
      expect(byId.get(id), id).toMatchObject({ status: 'published' });
    }
  });

  it('includes every published Common Words set found in content (completeness check)', () => {
    const commonWordsIds = allContent()
      .filter((entry) => entry.status === 'published' && /-common-words-\d+$/.test(entry.id))
      .map((entry) => entry.id);

    expect(commonWordsIds.length).toBeGreaterThan(0);
    for (const id of commonWordsIds) {
      expect(HF_WORDS_SEQUENCE, id).toContain(id);
    }
  });
});

describe('CORE_SPELLING_SEQUENCE and HF_WORDS_SEQUENCE do not overlap', () => {
  it('shares no id between the two chains', () => {
    const coreSet = new Set(CORE_SPELLING_SEQUENCE);
    const overlap = HF_WORDS_SEQUENCE.filter((id) => coreSet.has(id));
    expect(overlap).toEqual([]);
  });
});

describe('getSequenceNeighbors', () => {
  it('returns no prerequisite for the Core Spelling start and no next for its terminal page', () => {
    expect(getSequenceNeighbors('kindergarten-first-words').prerequisiteId).toBeUndefined();
    expect(getSequenceNeighbors('grade-5-spelling-changes-related-words').nextId).toBeUndefined();
  });

  it('returns no prerequisite for the HF Words start and no next for its terminal page', () => {
    expect(getSequenceNeighbors('kindergarten-common-words-1').prerequisiteId).toBeUndefined();
    expect(getSequenceNeighbors('grade-5-common-words-4').nextId).toBeUndefined();
  });

  it.each([
    ['kindergarten-consonant-digraphs', 'grade-1-cvc-short-vowels-c-k-rule'],
    ['grade-1-tch-dge-ending-rules', 'grade-2-long-e-ee-ea'],
    ['grade-2-contractions', 'grade-3-prefix-words'],
    ['grade-3-root-word-families', 'grade-4-multisyllabic-academic-words'],
    ['grade-4-derived-words', 'grade-5-multisyllabic-academic-words'],
  ])('crosses the Core grade boundary %s -> %s in both directions', (previous, next) => {
    expect(getSequenceNeighbors(previous).nextId).toBe(next);
    expect(getSequenceNeighbors(next).prerequisiteId).toBe(previous);
  });

  it.each([
    ['grade-1-tch-dge-ending-rules', 'grade-2-long-e-ee-ea'],
    ['grade-2-long-e-ee-ea', 'grade-2-long-i-ie-igh'],
    ['grade-2-long-i-ie-igh', 'vowel-teams-oi-oy'],
    ['grade-2-au-aw-words', 'grade-2-r-controlled-er-ir-ur'],
    ['grade-2-r-controlled-er-ir-ur', 'grade-2-soft-c-soft-g'],
    ['grade-2-contractions', 'grade-3-prefix-words'],
  ])('keeps finalized Grade 2 adjacency %s -> %s', (previous, next) => {
    expect(getSequenceNeighbors(previous).nextId).toBe(next);
    expect(getSequenceNeighbors(next).prerequisiteId).toBe(previous);
  });

  it('crosses grade boundaries within the HF Words chain', () => {
    expect(getSequenceNeighbors('kindergarten-common-words-4').nextId).toBe('grade-1-common-words-1');
    expect(getSequenceNeighbors('grade-1-common-words-1').prerequisiteId).toBe('kindergarten-common-words-4');
  });

  it('returns {} for a page outside both sequences (Additional Practice, combined-roadmap sibling)', () => {
    expect(getSequenceNeighbors('kindergarten-animal-words')).toEqual({});
    expect(getSequenceNeighbors('grade-1-long-e-vowel-teams')).toEqual({});
    expect(getSequenceNeighbors('kindergarten-ck-ending-words')).toEqual({});
    expect(getSequenceNeighbors('not-a-real-id')).toEqual({});
  });

  it('never treats a Core Spelling id and an HF Words id as adjacent to each other', () => {
    // grade-5-spelling-changes-related-words is the Core Spelling terminal page;
    // confirm its neighbor lookup never spills into the HF chain.
    const neighbors = getSequenceNeighbors('grade-5-spelling-changes-related-words');
    expect(HF_WORDS_SEQUENCE).not.toContain(neighbors.prerequisiteId);
  });
});

describe('Core rendered relationship model', () => {
  it('gives every Core page only its zero-or-one canonical Review First and Next Step targets', () => {
    CORE_SPELLING_SEQUENCE.forEach((id, index) => {
      const { prerequisiteId, nextId } = getSequenceNeighbors(id);
      expect(prerequisiteId ? [prerequisiteId] : []).toHaveLength(index === 0 ? 0 : 1);
      expect(nextId ? [nextId] : []).toHaveLength(index === CORE_SPELLING_SEQUENCE.length - 1 ? 0 : 1);

      for (const targetId of [prerequisiteId, nextId].filter((target): target is string => Boolean(target))) {
        expect(getCanonicalGradeRouteById(targetId)?.classification, `${id} -> ${targetId}`).toBe('core-spelling');
      }
    });
  });

  it('preserves authored relatedLists data while the Core renderer suppresses Explore More', () => {
    const content = allContent();
    const byId = new Map(content.map((entry) => [entry.id, entry]));
    expect(byId.get('kindergarten-first-words')?.relatedLists).toEqual(['kindergarten-animal-words']);
    expect(byId.get('grade-2-au-aw-words')?.relatedLists).toEqual([
      'grade-2-common-words-1',
      'grade-2-common-words-5',
      'grade-2-common-words-6',
    ]);
    expect(byId.get('grade-1-weather-words')?.relatedLists).toEqual(['grade-1-clothing-words']);
    expect(byId.get('grade-2-common-words-1')?.relatedLists).toEqual([
      'grade-2-oo-two-sounds',
      'grade-2-au-aw-words',
    ]);
  });
});

describe('Frontmatter guard: Review First / Next Step are derived, not authored', () => {
  it('keeps prerequisiteLists and nextLists empty on every Core Spelling and HF Words page', () => {
    const byId = new Map(allContent().map((entry) => [entry.id, entry]));

    for (const id of [...CORE_SPELLING_SEQUENCE, ...HF_WORDS_SEQUENCE]) {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      expect(entry!.prerequisiteLists, `${id} prerequisiteLists`).toEqual([]);
      expect(entry!.nextLists, `${id} nextLists`).toEqual([]);
    }
  });
});
