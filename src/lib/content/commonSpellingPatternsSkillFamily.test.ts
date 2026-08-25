import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { COMMON_SPELLING_PATTERNS_SKILL_FAMILY, CURATED_SPELLING_SKILL_IDS } from './spellingSkills';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');

const COMMON_SPELLING_PATTERNS_SKILL_IDS = [
  'ck-tch-dge-word-endings',
  'silent-letters',
  'soft-c-soft-g',
] as const;

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

describe('Common Spelling Patterns Skill Family', () => {
  it('uses exactly CK/TCH/DGE, Silent Letters, and Soft C/G, in that order', () => {
    expect(COMMON_SPELLING_PATTERNS_SKILL_FAMILY.skillIds).toEqual(
      COMMON_SPELLING_PATTERNS_SKILL_IDS,
    );
  });

  it('marks every Common Spelling Patterns Skill as reusable and published', () => {
    for (const id of COMMON_SPELLING_PATTERNS_SKILL_IDS) {
      expect(byId.get(id), id).toMatchObject({ id, contentRole: 'skill', status: 'published' });
    }
  });

  it('keeps the source grade-unit files for the CK/TCH/DGE merge untouched as grade-units', () => {
    for (const id of [
      'grade-1-floss-rule',
      'grade-1-tch-dge-ending-rules',
    ]) {
      expect(byId.get(id), id).toBeDefined();
      expect(byId.get(id)!.contentRole, id).not.toBe('skill');
    }
  });

  it('keeps each Skill demonstration word set within a reasonable range', () => {
    for (const id of COMMON_SPELLING_PATTERNS_SKILL_IDS) {
      const entry = byId.get(id)!;
      expect(entry.words.length, id).toBeGreaterThanOrEqual(4);
      expect(entry.words.length, id).toBeLessThanOrEqual(16);
    }
  });

  it('keeps relationship ids resolvable', () => {
    for (const id of COMMON_SPELLING_PATTERNS_SKILL_IDS) {
      const entry = byId.get(id)!;
      for (const ref of [...entry.relatedLists, ...entry.prerequisiteLists, ...entry.nextLists]) {
        expect(allIds.has(ref), `${id} references ${ref}`).toBe(true);
      }
    }
  });

  it('is part of the curated Skill id list', () => {
    for (const id of COMMON_SPELLING_PATTERNS_SKILL_IDS) {
      expect(CURATED_SPELLING_SKILL_IDS).toContain(id);
    }
  });
});
