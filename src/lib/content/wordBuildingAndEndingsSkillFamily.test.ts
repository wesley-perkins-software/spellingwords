import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CURATED_SPELLING_SKILL_IDS, WORD_BUILDING_AND_ENDINGS_SKILL_FAMILY } from './spellingSkills';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');

const WORD_BUILDING_SKILL_IDS = [
  'plurals',
  'ed-and-ing',
  'common-suffixes',
  'suffix-spelling-changes',
  'compound-words',
  'contractions',
] as const;

type FrontmatterSummary = {
  id: string;
  urlSlug: string;
  category: string;
  status: string;
  contentRole?: string;
  words: string[];
  skillIds: string[];
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

  const inline = lines[keyIndex].match(/^\w+:\s*\[(.*)\]\s*$/)?.[1];
  if (inline !== undefined) {
    return [...inline.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
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
    skillIds: readArray(frontmatter, 'skillIds'),
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

describe('Word Building and Endings Skill Family', () => {
  it('uses exactly the six approved Skills in the documented order', () => {
    expect(WORD_BUILDING_AND_ENDINGS_SKILL_FAMILY.skillIds).toEqual(WORD_BUILDING_SKILL_IDS);
  });

  it('marks every Word Building and Endings Skill as reusable and published', () => {
    for (const id of WORD_BUILDING_SKILL_IDS) {
      expect(byId.get(id), id).toMatchObject({ id, contentRole: 'skill', status: 'published' });
    }
  });

  it('keeps every contributing source page a Grade Unit', () => {
    for (const id of [
      'grade-3-suffix-words',
      'grade-3-dropping-silent-e',
      'grade-2-list-02',
      'grade-2-contractions',
    ]) {
      expect(byId.get(id), id).toMatchObject({ id, contentRole: 'grade-unit' });
    }
  });

  it('keeps a nonempty demonstration set on each Skill without imposing a target count', () => {
    for (const id of WORD_BUILDING_SKILL_IDS) {
      expect(byId.get(id)!.words.length, id).toBeGreaterThan(0);
    }
  });

  it('keeps relationship ids resolvable', () => {
    for (const id of WORD_BUILDING_SKILL_IDS) {
      const entry = byId.get(id)!;
      const refs = [...entry.relatedLists, ...entry.prerequisiteLists, ...entry.nextLists];
      expect(new Set(refs).size, `${id} has a duplicate relationship`).toBe(refs.length);
      for (const ref of refs) {
        expect(allIds.has(ref), `${id} references ${ref}`).toBe(true);
        expect(byId.get(ref)?.contentRole, `${id} references non-Skill ${ref}`).toBe('skill');
      }
    }
  });

  it('gives each Skill the architecture-defined curriculum placements from Grade Unit skillIds', () => {
    const expectedPlacements: Record<(typeof WORD_BUILDING_SKILL_IDS)[number], string[]> = {
      plurals: ['grade-1-inflectional-endings-s-es'],
      'ed-and-ing': ['grade-1-inflectional-endings-ed-ing'],
      'common-suffixes': [
        'grade-3-suffix-words',
      ],
      'suffix-spelling-changes': [
        'grade-3-dropping-silent-e',
      ],
      'compound-words': ['grade-2-list-02'],
      contractions: ['grade-2-contractions'],
    };

    for (const skillId of WORD_BUILDING_SKILL_IDS) {
      for (const gradeUnitId of expectedPlacements[skillId]) {
        expect(byId.get(gradeUnitId)?.skillIds, gradeUnitId).toContain(skillId);
      }
    }
  });

  it('computes curriculum placement from Grade Units rather than storing skillIds on Skills', () => {
    for (const id of WORD_BUILDING_SKILL_IDS) {
      expect(readFrontmatter(byId.get(id)!.filePath), id).not.toMatch(/^skillIds:/m);
    }
  });

  it('is part of the curated Skill id list', () => {
    for (const id of WORD_BUILDING_SKILL_IDS) {
      expect(CURATED_SPELLING_SKILL_IDS).toContain(id);
    }
  });
});
