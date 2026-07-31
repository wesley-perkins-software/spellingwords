import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  GRADE_1_CORE_IDS,
  GRADE_1_GATEWAY_IDS,
  GRADE_1_TARGETED_SKILL_IDS,
} from './grade1Progression';
import { KINDERGARTEN_CORE_IDS } from './kindergartenProgression';
import {
  CONSONANT_DIGRAPHS_SKILL_FAMILY,
  CURATED_SPELLING_SKILL_IDS,
  SHORT_VOWELS_AND_CVC_SKILL_FAMILY,
  SPELLING_SKILL_FAMILIES,
} from './spellingSkills';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');
const skillsIndexRoutePath = join(process.cwd(), 'src/pages/spelling-lists/skills/index.astro');

const CONSONANT_DIGRAPH_SKILL_IDS = [
  'digraph-ch-words',
  'digraph-sh-words',
  'digraph-th-words',
  'digraph-wh-words',
] as const;

const CONSONANT_DIGRAPH_FAMILY_IDS = [
  ...CONSONANT_DIGRAPH_SKILL_IDS,
  'kindergarten-consonant-digraphs',
  'grade-1-consonant-digraphs-final-ck',
  'grade-1-consonant-digraph-practice',
] as const;

const EXPECTED_URL_INPUTS: Record<string, { category: string; urlSlug: string }> = {
  'digraph-ch-words': { category: 'phonics', urlSlug: 'digraph-ch-words' },
  'digraph-sh-words': { category: 'phonics', urlSlug: 'digraph-sh-words' },
  'digraph-th-words': { category: 'phonics', urlSlug: 'digraph-th-words' },
  'digraph-wh-words': { category: 'phonics', urlSlug: 'digraph-wh-words' },
  'kindergarten-consonant-digraphs': {
    category: 'phonics',
    urlSlug: 'kindergarten-consonant-digraphs',
  },
  'grade-1-consonant-digraphs-final-ck': {
    category: 'phonics',
    urlSlug: '1st-grade-consonant-digraphs-final-ck',
  },
  'grade-1-consonant-digraph-practice': {
    category: 'phonics',
    urlSlug: '1st-grade-consonant-digraph-practice',
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

describe('Consonant Digraphs Skill Family', () => {
  it('publishes Consonant Digraphs as the second of 12 public Skill families, after Short Vowels', () => {
    expect(SPELLING_SKILL_FAMILIES[0]).toBe(SHORT_VOWELS_AND_CVC_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[1]).toBe(CONSONANT_DIGRAPHS_SKILL_FAMILY);
  });

  it('uses the requested CH, SH, TH, WH curated Skill order', () => {
    expect(CONSONANT_DIGRAPHS_SKILL_FAMILY.skillIds).toEqual(CONSONANT_DIGRAPH_SKILL_IDS);
    expect(
      CURATED_SPELLING_SKILL_IDS.slice(
        SHORT_VOWELS_AND_CVC_SKILL_FAMILY.skillIds.length,
        SHORT_VOWELS_AND_CVC_SKILL_FAMILY.skillIds.length + CONSONANT_DIGRAPH_SKILL_IDS.length,
      ),
    ).toEqual(CONSONANT_DIGRAPH_SKILL_IDS);
  });

  it('keeps family guidance specific while preserving Short Vowels guidance', () => {
    expect(SHORT_VOWELS_AND_CVC_SKILL_FAMILY.guidance).toBe(
      'Choose the vowel sound your child needs to practice.',
    );
    expect(CONSONANT_DIGRAPHS_SKILL_FAMILY.guidance).toBe(
      'Choose the letter pair your child needs to practice.',
    );

    const route = readFileSync(skillsIndexRoutePath, 'utf8');
    expect(route).toContain('{family.description} {family.guidance}');
    expect(route).toContain('getSpellingSkillPath(entry)');
  });

  it('keeps Skills browse JSON-LD counts and item order derived from curated family order', () => {
    const route = readFileSync(skillsIndexRoutePath, 'utf8');
    expect(route).toContain(
      'numberOfItems: skillFamilies.reduce((count, family) => count + family.entries.length, 0)',
    );
    expect(route).toContain('itemListElement: skillFamilies.flatMap((family) =>');
    expect(route).toContain('position: ++itemListPosition');

    expect(CURATED_SPELLING_SKILL_IDS).toHaveLength(40);
    expect(CURATED_SPELLING_SKILL_IDS.slice(5, 9)).toEqual(CONSONANT_DIGRAPH_SKILL_IDS);
  });

  it('marks CH, SH, TH, and WH as reusable Skills', () => {
    for (const id of CONSONANT_DIGRAPH_SKILL_IDS) {
      expect(byId.get(id), id).toMatchObject({ id, contentRole: 'skill' });
    }
  });

  it('marks the Kindergarten Consonant Digraphs page as a Grade Unit', () => {
    expect(byId.get('kindergarten-consonant-digraphs')).toMatchObject({
      id: 'kindergarten-consonant-digraphs',
      contentRole: 'grade-unit',
    });
  });

  it('preserves stable ids, categories, slugs, and public URL inputs', () => {
    for (const id of CONSONANT_DIGRAPH_FAMILY_IDS) {
      expect(byId.get(id), id).toMatchObject({ id, ...EXPECTED_URL_INPUTS[id] });
    }
  });

  it('keeps every active Consonant Digraphs family Practice Set in the 8-16 word range', () => {
    for (const id of CONSONANT_DIGRAPH_FAMILY_IDS) {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      expect(entry!.status, id).toBe('published');
      expect(entry!.words.length, id).toBeGreaterThanOrEqual(8);
      expect(entry!.words.length, id).toBeLessThanOrEqual(16);
    }
  });

  it('keeps Consonant Digraphs family relationship ids resolvable', () => {
    for (const id of CONSONANT_DIGRAPH_FAMILY_IDS) {
      const entry = byId.get(id)!;
      for (const ref of [...entry.relatedLists, ...entry.prerequisiteLists, ...entry.nextLists]) {
        expect(allIds.has(ref), `${entry.id} references ${ref}`).toBe(true);
      }
    }
  });

  it('does not put rigid next-step sequencing on reusable Consonant Digraph Skills', () => {
    for (const id of CONSONANT_DIGRAPH_SKILL_IDS) {
      expect(byId.get(id)!.nextLists, id).toEqual([]);
    }
  });

  it('keeps Kindergarten roadmap focused on the Kindergarten Grade Unit, not reusable Skills', () => {
    expect(KINDERGARTEN_CORE_IDS).toContain('kindergarten-consonant-digraphs');

    for (const id of CONSONANT_DIGRAPH_SKILL_IDS) {
      expect(KINDERGARTEN_CORE_IDS).not.toContain(id);
    }
  });

  it('keeps Grade 1 coverage resolving through core, gateway, and targeted Skill sections', () => {
    expect(GRADE_1_CORE_IDS).toContain('grade-1-consonant-digraphs-final-ck');
    expect(GRADE_1_GATEWAY_IDS).toContain('grade-1-consonant-digraph-practice');

    for (const id of CONSONANT_DIGRAPH_SKILL_IDS) {
      expect(GRADE_1_TARGETED_SKILL_IDS).toContain(id);
    }
  });

  it('keeps the protected Grade 1 CVC short-vowel review behavior unchanged', () => {
    expect(GRADE_1_CORE_IDS).toContain('grade-1-cvc-short-vowels-c-k-rule');
    expect(GRADE_1_GATEWAY_IDS).toContain('grade-1-short-vowel-practice');
    expect(GRADE_1_TARGETED_SKILL_IDS).not.toContain('grade-1-cvc-short-vowels-c-k-rule');
  });
});
