import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CURATED_SPELLING_SKILL_IDS,
  SHORT_VOWELS_AND_CVC_SKILL_FAMILY,
  SPELLING_SKILLS_INDEX_PATH,
  getSpellingSkillPath,
  isCuratedSpellingSkillId,
  resolveCuratedSkillFamilyEntries,
} from './spellingSkills';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');

const KINDERGARTEN_SHORT_VOWEL_GRADE_UNIT_IDS = [
  'kindergarten-short-a-words',
  'kindergarten-short-e-words',
  'kindergarten-short-i-words',
  'kindergarten-short-o-words',
  'kindergarten-short-u-words',
] as const;

type FrontmatterSummary = {
  data: {
    id: string;
    urlSlug: string;
    category: string;
    status: string;
    contentRole?: string;
    words: string[];
  };
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
    data: {
      id: readScalar(frontmatter, 'id') ?? '',
      urlSlug: readScalar(frontmatter, 'urlSlug') ?? '',
      category: readScalar(frontmatter, 'category') ?? '',
      status: readScalar(frontmatter, 'status') ?? '',
      contentRole: readScalar(frontmatter, 'contentRole'),
      words: readArray(frontmatter, 'words'),
    },
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
const byId = new Map(summaries.map((entry) => [entry.data.id, entry]));

describe('curated spelling Skills browse index', () => {
  it('uses the current spelling-lists hierarchy for the first public Skills browse route', () => {
    expect(SPELLING_SKILLS_INDEX_PATH).toBe('/spelling-lists/skills/');
  });

  it('curates only the completed Short Vowels and CVC focused Skills', () => {
    expect(SHORT_VOWELS_AND_CVC_SKILL_FAMILY.title).toBe('Short Vowels');
    expect(CURATED_SPELLING_SKILL_IDS).toEqual([
      'short-a-words',
      'short-e-words',
      'short-i-words',
      'short-o-words',
      'short-u-words',
    ]);
  });

  it('resolves curated Skill entries in stable order', () => {
    const resolved = resolveCuratedSkillFamilyEntries(
      summaries,
      SHORT_VOWELS_AND_CVC_SKILL_FAMILY.skillIds,
    );

    expect(resolved.map((entry) => entry.data.id)).toEqual(CURATED_SPELLING_SKILL_IDS);
  });

  it('exposes only published reusable Skills, not Grade Units or archived content', () => {
    for (const id of CURATED_SPELLING_SKILL_IDS) {
      expect(byId.get(id), id).toMatchObject({
        data: {
          id,
          status: 'published',
          contentRole: 'skill',
        },
      });
    }

    for (const id of KINDERGARTEN_SHORT_VOWEL_GRADE_UNIT_IDS) {
      expect(CURATED_SPELLING_SKILL_IDS).not.toContain(id);
      expect(byId.get(id), id).toMatchObject({ data: { contentRole: 'grade-unit' } });
    }

    expect(CURATED_SPELLING_SKILL_IDS).not.toContain('short-vowels-cvc-words');
    expect(byId.get('short-vowels-cvc-words')).toMatchObject({ data: { status: 'archived' } });
  });

  it('keeps curated Skill links on their current legacy spelling-list URLs', () => {
    for (const id of CURATED_SPELLING_SKILL_IDS) {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      expect(getSpellingSkillPath(entry!)).toBe(`/spelling-lists/phonics/${id}`);
    }
  });

  it('uses the curated ids for Skills breadcrumb eligibility', () => {
    expect(isCuratedSpellingSkillId('short-a-words')).toBe(true);
    expect(isCuratedSpellingSkillId('kindergarten-short-a-words')).toBe(false);
    expect(isCuratedSpellingSkillId('digraph-sh-words')).toBe(false);
  });
});
