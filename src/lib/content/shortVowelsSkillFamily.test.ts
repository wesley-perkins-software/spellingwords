import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  GRADE_1_CORE_IDS,
  GRADE_1_GATEWAY_IDS,
  GRADE_1_TARGETED_SKILL_IDS,
} from './grade1Progression';
import { KINDERGARTEN_CORE_IDS } from './kindergartenProgression';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');
const listDetailRoutePath = join(process.cwd(), 'src/pages/spelling-lists/[category]/[slug].astro');

const SHORT_VOWEL_SKILL_IDS = [
  'short-a-words',
  'short-e-words',
  'short-i-words',
  'short-o-words',
  'short-u-words',
] as const;

const KINDERGARTEN_SHORT_VOWEL_GRADE_UNIT_IDS = [
  'kindergarten-short-a-words',
  'kindergarten-short-i-words',
  'kindergarten-short-o-words',
  'kindergarten-short-u-words',
  'kindergarten-short-e-words',
] as const;

const SHORT_VOWEL_FAMILY_IDS = [
  ...SHORT_VOWEL_SKILL_IDS,
  ...KINDERGARTEN_SHORT_VOWEL_GRADE_UNIT_IDS,
  'kindergarten-mixed-vowel-review',
  'grade-1-cvc-short-vowels-c-k-rule',
  'grade-1-short-vowel-practice',
] as const;

const EXPECTED_URL_INPUTS: Record<string, { category: string; urlSlug: string }> = {
  'short-a-words': { category: 'phonics', urlSlug: 'short-a-words' },
  'short-e-words': { category: 'phonics', urlSlug: 'short-e-words' },
  'short-i-words': { category: 'phonics', urlSlug: 'short-i-words' },
  'short-o-words': { category: 'phonics', urlSlug: 'short-o-words' },
  'short-u-words': { category: 'phonics', urlSlug: 'short-u-words' },
  'kindergarten-short-a-words': { category: 'phonics', urlSlug: 'kindergarten-short-a-words' },
  'kindergarten-short-e-words': { category: 'phonics', urlSlug: 'kindergarten-short-e-words' },
  'kindergarten-short-i-words': { category: 'phonics', urlSlug: 'kindergarten-short-i-words' },
  'kindergarten-short-o-words': { category: 'phonics', urlSlug: 'kindergarten-short-o-words' },
  'kindergarten-short-u-words': { category: 'phonics', urlSlug: 'kindergarten-short-u-words' },
  'kindergarten-mixed-vowel-review': { category: 'phonics', urlSlug: 'kindergarten-mixed-vowel-review' },
  'grade-1-cvc-short-vowels-c-k-rule': {
    category: 'phonics',
    urlSlug: '1st-grade-cvc-short-vowels-c-k-rule',
  },
  'grade-1-short-vowel-practice': {
    category: 'phonics',
    urlSlug: '1st-grade-short-vowel-practice',
  },
};

type FrontmatterSummary = {
  id: string;
  urlSlug: string;
  category: string;
  status: string;
  contentRole?: string;
  words: string[];
  relatedLists: string[];
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

function readArray(frontmatter: string, key: string): string[] {
  const lines = frontmatter.split('\n');
  const keyIndex = lines.findIndex((line) => line.startsWith(`${key}:`));
  if (keyIndex === -1) return [];

  const keyLine = lines[keyIndex];
  const inline = keyLine.match(new RegExp(`^${key}:\\s*\\[(.*)\\]$`));
  if (inline) {
    return inline[1]
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  const values: string[] = [];
  for (const line of lines.slice(keyIndex + 1)) {
    if (/^[a-zA-Z][\w]*:/.test(line)) break;
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      values.push(trimmed.slice(2).trim().replace(/^['"]|['"]$/g, ''));
    }
  }

  return values;
}

function readSummary(filePath: string): FrontmatterSummary {
  const frontmatter = readFrontmatter(filePath);
  return {
    id: readScalar(frontmatter, 'id') ?? '',
    urlSlug: readScalar(frontmatter, 'urlSlug') ?? '',
    category: readScalar(frontmatter, 'category') ?? '',
    status: readScalar(frontmatter, 'status') ?? '',
    contentRole: readScalar(frontmatter, 'contentRole'),
    words: readArray(frontmatter, 'words'),
    relatedLists: readArray(frontmatter, 'relatedLists'),
    prerequisiteLists: readArray(frontmatter, 'prerequisiteLists'),
    nextLists: readArray(frontmatter, 'nextLists'),
    filePath,
  };
}

function allSummaries(): FrontmatterSummary[] {
  return readdirSync(contentRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((dir) =>
      readdirSync(join(contentRoot, dir.name), { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
        .map((entry) => readSummary(join(contentRoot, dir.name, entry.name))),
    );
}

const summaries = allSummaries();
const byId = new Map(summaries.map((entry) => [entry.id, entry]));
const allIds = new Set(summaries.map((entry) => entry.id));

describe('Short Vowels and CVC Words Skill Family', () => {
  it('marks Short A/E/I/O/U as reusable Skills', () => {
    for (const id of SHORT_VOWEL_SKILL_IDS) {
      expect(byId.get(id), id).toMatchObject({ id, contentRole: 'skill' });
    }
  });

  it('marks Kindergarten short-vowel pages and mixed review as Grade Units', () => {
    for (const id of [
      ...KINDERGARTEN_SHORT_VOWEL_GRADE_UNIT_IDS,
      'kindergarten-mixed-vowel-review',
    ]) {
      expect(byId.get(id), id).toMatchObject({ id, contentRole: 'grade-unit' });
    }
  });

  it('marks the Grade 1 CVC short-vowel C/K page as a Grade Unit', () => {
    expect(byId.get('grade-1-cvc-short-vowels-c-k-rule')).toMatchObject({
      id: 'grade-1-cvc-short-vowels-c-k-rule',
      contentRole: 'grade-unit',
    });
  });

  it('preserves stable ids, categories, slugs, and public URL inputs', () => {
    for (const id of SHORT_VOWEL_FAMILY_IDS) {
      expect(byId.get(id), id).toMatchObject({ id, ...EXPECTED_URL_INPUTS[id] });
    }
  });

  it('keeps Kindergarten core roadmap focused on Kindergarten Grade Units, not reusable Skills', () => {
    for (const id of KINDERGARTEN_SHORT_VOWEL_GRADE_UNIT_IDS) {
      expect(KINDERGARTEN_CORE_IDS).toContain(id);
    }

    for (const id of SHORT_VOWEL_SKILL_IDS) {
      expect(KINDERGARTEN_CORE_IDS).not.toContain(id);
    }
  });

  it('keeps Grade 1 coverage resolving through core, gateway, and targeted Skill sections', () => {
    expect(GRADE_1_CORE_IDS).toContain('grade-1-cvc-short-vowels-c-k-rule');
    expect(GRADE_1_GATEWAY_IDS).toContain('grade-1-short-vowel-practice');

    for (const id of SHORT_VOWEL_SKILL_IDS) {
      expect(GRADE_1_TARGETED_SKILL_IDS).toContain(id);
    }
  });

  it('keeps every active Short Vowels family Practice Set in the 8-16 word range', () => {
    // short-a-words and short-e-words have migrated to the Grade Unit/Skill
    // content contract: as Skills they now carry a small demonstration set,
    // not an 8-16 word Practice Set — see the dedicated word-count contract
    // test in shortAReferenceSkill.test.ts. The other short-vowel Skills and
    // Grade Units are unmigrated and still expected to hold the legacy range.
    for (const id of SHORT_VOWEL_FAMILY_IDS) {
      if (id === 'short-a-words' || id === 'short-e-words') continue;

      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      expect(entry!.status, id).toBe('published');
      expect(entry!.words.length, id).toBeGreaterThanOrEqual(8);
      expect(entry!.words.length, id).toBeLessThanOrEqual(16);
    }
  });

  it('keeps Short Vowels family relationship ids resolvable', () => {
    for (const id of SHORT_VOWEL_FAMILY_IDS) {
      const entry = byId.get(id)!;
      for (const ref of [...entry.relatedLists, ...entry.prerequisiteLists, ...entry.nextLists]) {
        expect(allIds.has(ref), `${entry.id} references ${ref}`).toBe(true);
      }
    }
  });

  it('does not put rigid next-step sequencing on reusable Short Vowel Skills', () => {
    for (const id of SHORT_VOWEL_SKILL_IDS) {
      expect(byId.get(id)!.nextLists, id).toEqual([]);
    }
  });

  it('keeps legacy content without contentRole valid', () => {
    expect(byId.get('kindergarten-first-words')?.contentRole).toBeUndefined();
    expect(byId.get('grade-1-short-vowel-practice')?.contentRole).toBeUndefined();
  });

  it('keeps archived aggregate Short Vowels content out of live short-vowel roadmaps', () => {
    expect(byId.get('short-vowels-cvc-words')).toMatchObject({ status: 'archived' });
    expect(KINDERGARTEN_CORE_IDS).not.toContain('short-vowels-cvc-words');
    expect(GRADE_1_CORE_IDS).not.toContain('short-vowels-cvc-words');
    expect(GRADE_1_GATEWAY_IDS).not.toContain('short-vowels-cvc-words');
    expect(GRADE_1_TARGETED_SKILL_IDS).not.toContain('short-vowels-cvc-words');
  });

  it('uses role-aware list-detail rendering safely for Skills and legacy entries', () => {
    const route = readFileSync(listDetailRoutePath, 'utf8');

    expect(route).toContain("data.contentRole === 'skill' ? 'Skill' : null");
    expect(route).toContain("data.contentRole === 'skill'");
    expect(route).toContain('data.grade');
  });
});
