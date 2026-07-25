import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { GRADE_2_COMMON_WORD_IDS, GRADE_2_CORE_IDS, GRADE_2_VOCABULARY_IDS, grade2Badges } from './grade2Progression';
import { getSentenceBankEntry } from '@/lib/sentenceBank/lookup';

type FrontmatterSummary = {
  id: string;
  status: string;
  grade?: string;
  category: string;
  words: string[];
  prerequisiteLists: string[];
  nextLists: string[];
  listIds: string[];
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

/**
 * Handles both plain-string ("- 'word'") and object-form entries, including
 * their indented, non-dash "hint:" continuation line.
 */
function readWords(frontmatter: string): string[] {
  const match = frontmatter.match(/^words:\s*\n((?:[ \t]+\S.*\n?)+)/m);
  if (!match) return [];
  const words: string[] = [];
  for (const line of match[1].split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('- ')) continue;
    const body = trimmed.slice(2).trim();
    const objectForm = body.match(/^word:\s*(.+)$/);
    const raw = objectForm ? objectForm[1] : body;
    words.push(raw.trim().replace(/^['"]|['"]$/g, ''));
  }
  return words;
}

/** Handles the multi-line `listIds:` block used by spelling-collections entries. */
function readListIds(frontmatter: string): string[] {
  const match = frontmatter.match(/^listIds:\s*\n((?:[ \t]+-.*\n?)+)/m);
  if (!match) return [];
  return match[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim().replace(/^['"]|['"]$/g, ''));
}

function readSpellingListFrontmatter(): FrontmatterSummary[] {
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
        listIds: [],
        filePath,
      };
    });
}

function readCollectionFrontmatter(id: string): FrontmatterSummary {
  const filePath = join(process.cwd(), 'src/content/spelling-collections', `${id}.md`);
  const frontmatter = readFrontmatter(filePath);
  return {
    id: readScalar(frontmatter, 'id') ?? '',
    status: readScalar(frontmatter, 'status') ?? '',
    grade: readScalar(frontmatter, 'grade'),
    category: readScalar(frontmatter, 'category') ?? '',
    words: [],
    prerequisiteLists: [],
    nextLists: [],
    listIds: readListIds(frontmatter),
    filePath,
  };
}

const allLists = readSpellingListFrontmatter();
const byId = new Map(allLists.map((entry) => [entry.id, entry]));
const grade2Sets = GRADE_2_COMMON_WORD_IDS.map((id) => byId.get(id));

const K_AND_GRADE_1_COMMON_WORD_IDS = [
  'kindergarten-common-words-1',
  'kindergarten-common-words-2',
  'kindergarten-common-words-3',
  'kindergarten-common-words-4',
  'grade-1-common-words-1',
  'grade-1-common-words-2',
  'grade-1-common-words-3',
  'grade-1-common-words-4',
  'grade-1-common-words-5',
  'grade-1-common-words-6',
];

function ownedWords(ids: readonly string[]): Set<string> {
  const words = new Set<string>();
  for (const id of ids) {
    const entry = byId.get(id);
    if (!entry) throw new Error(`Missing expected content: ${id}`);
    for (const word of entry.words) words.add(word.toLowerCase());
  }
  return words;
}

describe('Grade 2 Common Words', () => {
  it('has all six sets published with 12 words each', () => {
    for (const set of grade2Sets) {
      expect(set, JSON.stringify(GRADE_2_COMMON_WORD_IDS)).toBeDefined();
      expect(set!.status).toBe('published');
      expect(set!.words).toHaveLength(12);
    }
  });

  it('has 72 unique words across the six sets — no duplicate across sets', () => {
    const allWords = grade2Sets.flatMap((set) => set!.words.map((w) => w.toLowerCase()));
    expect(allWords).toHaveLength(72);
    expect(new Set(allWords).size).toBe(72);
  });

  it('has zero overlap with the 112 K + Grade 1 Common Words', () => {
    const kg1Words = ownedWords(K_AND_GRADE_1_COMMON_WORD_IDS);
    expect(kg1Words.size).toBe(112);

    const grade2Words = grade2Sets.flatMap((set) => set!.words.map((w) => w.toLowerCase()));
    const collisions = grade2Words.filter((w) => kg1Words.has(w));
    expect(collisions).toEqual([]);
  });

  it('resolves every word in the sentence bank', () => {
    const unresolved: string[] = [];
    for (const set of grade2Sets) {
      for (const word of set!.words) {
        if (!getSentenceBankEntry(word)) unresolved.push(`${set!.id}: ${word}`);
      }
    }
    expect(unresolved).toEqual([]);
  });

  it('chains prerequisiteLists/nextLists into an unbroken 1-6 sequence', () => {
    GRADE_2_COMMON_WORD_IDS.forEach((id, index) => {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();

      const previousId = GRADE_2_COMMON_WORD_IDS[index - 1];
      const nextId = GRADE_2_COMMON_WORD_IDS[index + 1];

      if (previousId) expect(entry!.prerequisiteLists).toContain(previousId);
      else expect(entry!.prerequisiteLists).toContain('grade-1-common-words-6');

      if (nextId) expect(entry!.nextLists).toContain(nextId);
      else expect(entry!.nextLists).toEqual([]);
    });
  });

  it("the gateway's listIds matches the six sets in order", () => {
    const gateway = readCollectionFrontmatter('grade-2-common-words');
    expect(gateway.status).toBe('published');
    expect(gateway.listIds).toEqual(GRADE_2_COMMON_WORD_IDS);
  });
});

describe('Grade 2 Core Spelling', () => {
  it('resolves every core id to published content', () => {
    for (const id of GRADE_2_CORE_IDS) {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      expect(entry!.status, id).toBe('published');
    }
  });

  it('keeps every core id at contentRole grade-unit', () => {
    for (const id of GRADE_2_CORE_IDS) {
      const frontmatter = readFrontmatter(byId.get(id)!.filePath);
      expect(readScalar(frontmatter, 'contentRole'), id).toBe('grade-unit');
    }
  });

  it('keeps the previous and next links coherent through the core progression', () => {
    GRADE_2_CORE_IDS.forEach((id, index) => {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();

      const previousId = GRADE_2_CORE_IDS[index - 1];
      const nextId = GRADE_2_CORE_IDS[index + 1];

      if (previousId) expect(entry!.prerequisiteLists, id).toContain(previousId);
      else expect(entry!.prerequisiteLists, id).toContain('grade-1-long-a-long-o-vowel-teams');

      if (nextId) expect(entry!.nextLists, id).toContain(nextId);
      else expect(entry!.nextLists, id).toEqual([]);
    });
  });

  it('declares the r-controlled Skills as skillIds only on the Two-Syllable Words card', () => {
    const rControlledIds = ['r-controlled-ar', 'r-controlled-or', 'r-controlled-er-ir-ur'];
    for (const id of GRADE_2_CORE_IDS) {
      const frontmatter = readFrontmatter(byId.get(id)!.filePath);
      const skillIds = readInlineArray(frontmatter, 'skillIds');
      if (id === 'grade-2-two-syllable-words') {
        expect(skillIds, id).toEqual(rControlledIds);
      } else {
        expect(skillIds, id).toEqual([]);
      }
    }
  });
});

describe('grade2Badges', () => {
  it('has a badge for every core, common-word, and vocabulary id', () => {
    for (const id of [...GRADE_2_CORE_IDS, ...GRADE_2_COMMON_WORD_IDS, ...GRADE_2_VOCABULARY_IDS]) {
      expect(grade2Badges[id]).toBeTruthy();
    }
  });

  it('only uses the three approved badge labels', () => {
    const allowed = new Set(['Core Unit', 'Common Words', 'Vocabulary']);
    for (const label of Object.values(grade2Badges)) {
      expect(allowed.has(label)).toBe(true);
    }
  });
});
