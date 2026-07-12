import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { KINDERGARTEN_CORE_IDS } from './kindergartenProgression';

const CONTENT_ROLE_VALUES = [
  'grade-unit',
  'skill',
  'sight-word-set',
  'vocabulary-theme',
  'teaching-guide',
] as const;

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');
const shortASkillPath = join(contentRoot, 'phonics/short-a-words.md');
const kindergartenShortAPath = join(contentRoot, 'phonics/kindergarten-short-a-words.md');
const listDetailRoutePath = join(process.cwd(), 'src/pages/spelling-lists/[category]/[slug].astro');
const contentConfigPath = join(process.cwd(), 'src/content/config.ts');

type FrontmatterSummary = {
  id: string;
  urlSlug: string;
  category: string;
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
  const inline = frontmatter.match(new RegExp(`^${key}:\\s*\\[(.*)\\]$`, 'm'));
  if (inline) {
    return inline[1]
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  const block = frontmatter.match(
    new RegExp(String.raw`(?:^|\n)${key}:\s*\n([\s\S]*?)(?=\n[a-zA-Z][\w]*:|$)`),
  );
  if (!block) return [];

  return block[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim().replace(/^['"]|['"]$/g, ''));
}

function readSummary(filePath: string): FrontmatterSummary {
  const frontmatter = readFrontmatter(filePath);
  return {
    id: readScalar(frontmatter, 'id') ?? '',
    urlSlug: readScalar(frontmatter, 'urlSlug') ?? '',
    category: readScalar(frontmatter, 'category') ?? '',
    contentRole: readScalar(frontmatter, 'contentRole'),
    words: readArray(frontmatter, 'words'),
    relatedLists: readArray(frontmatter, 'relatedLists'),
    prerequisiteLists: readArray(frontmatter, 'prerequisiteLists'),
    nextLists: readArray(frontmatter, 'nextLists'),
  };
}

function allListIds(): Set<string> {
  return new Set(
    readdirSync(contentRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .flatMap((dir) =>
        readdirSync(join(contentRoot, dir.name), { withFileTypes: true })
          .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
          .map((entry) => readSummary(join(contentRoot, dir.name, entry.name)).id),
      ),
  );
}

describe('Short A reference Skill content roles', () => {
  it('defines the approved optional contentRole schema vocabulary', () => {
    const config = readFileSync(contentConfigPath, 'utf8');

    for (const role of CONTENT_ROLE_VALUES) {
      expect(config).toContain(`'${role}'`);
    }
    expect(config).toContain('.optional()');
  });

  it('preserves legacy entries without requiring contentRole', () => {
    expect(
      readSummary(join(contentRoot, 'grade-level/kindergarten-first-words.md')).contentRole,
    ).toBeUndefined();
  });

  it('marks Kindergarten Short A as a Grade Unit and Short A Words as a Skill', () => {
    expect(readSummary(kindergartenShortAPath)).toMatchObject({
      id: 'kindergarten-short-a-words',
      contentRole: 'grade-unit',
    });
    expect(readSummary(shortASkillPath)).toMatchObject({
      id: 'short-a-words',
      contentRole: 'skill',
    });
  });

  it('keeps the two Short A identities and URL inputs distinct and stable', () => {
    const gradeUnit = readSummary(kindergartenShortAPath);
    const skill = readSummary(shortASkillPath);

    expect(gradeUnit.id).toBe('kindergarten-short-a-words');
    expect(skill.id).toBe('short-a-words');
    expect(gradeUnit.id).not.toBe(skill.id);

    expect(gradeUnit).toMatchObject({
      category: 'phonics',
      urlSlug: 'kindergarten-short-a-words',
    });
    expect(skill).toMatchObject({ category: 'phonics', urlSlug: 'short-a-words' });
  });

  it('keeps Kindergarten Short A in the Kindergarten core roadmap without adding the reusable Skill', () => {
    expect(KINDERGARTEN_CORE_IDS).toContain('kindergarten-short-a-words');
    expect(KINDERGARTEN_CORE_IDS).not.toContain('short-a-words');
  });

  it('keeps both Short A practice sets in the expected 8-16 word range', () => {
    for (const entry of [readSummary(kindergartenShortAPath), readSummary(shortASkillPath)]) {
      expect(entry.words.length, entry.id).toBeGreaterThanOrEqual(8);
      expect(entry.words.length, entry.id).toBeLessThanOrEqual(16);
    }
  });

  it('keeps modified relationship references resolvable', () => {
    const ids = allListIds();

    for (const entry of [readSummary(kindergartenShortAPath), readSummary(shortASkillPath)]) {
      for (const ref of [...entry.relatedLists, ...entry.prerequisiteLists, ...entry.nextLists]) {
        expect(ids.has(ref), `${entry.id} references ${ref}`).toBe(true);
      }
    }
  });

  it('removes rigid Long A Silent E next-step sequencing from the Short A Skill', () => {
    const skill = readSummary(shortASkillPath);

    expect(skill.nextLists).not.toContain('silent-e-long-a');
  });

  it('uses role-aware rendering without requiring every legacy entry to have a role', () => {
    const route = readFileSync(listDetailRoutePath, 'utf8');

    expect(route).toContain("data.contentRole === 'skill' ? 'Skill' : null");
    expect(route).toContain("data.contentRole === 'skill'");
    expect(route).toContain('data.grade');
  });
});
