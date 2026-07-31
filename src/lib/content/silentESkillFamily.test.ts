import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  GRADE_1_CORE_IDS,
  GRADE_1_GATEWAY_IDS,
  GRADE_1_TARGETED_SKILL_IDS,
} from './grade1Progression';
import {
  COMMON_SPELLING_PATTERNS_SKILL_FAMILY,
  CONSONANT_BLENDS_SKILL_FAMILY,
  CONSONANT_DIGRAPHS_SKILL_FAMILY,
  CURATED_SPELLING_SKILL_IDS,
  SHORT_VOWELS_AND_CVC_SKILL_FAMILY,
  SILENT_E_SKILL_FAMILY,
  SPELLING_SKILL_FAMILIES,
  VOWEL_TEAMS_SKILL_FAMILY,
} from './spellingSkills';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');
const skillsIndexRoutePath = join(process.cwd(), 'src/pages/spelling-lists/skills/index.astro');

// Long E Silent E is deliberately excluded per SKILLS_ARCHITECTURE.md §5: it
// stays published at its own URL but is not a curated family member.
const SILENT_E_SKILL_IDS = [
  'silent-e-long-a',
  'silent-e-long-i',
  'silent-e-long-o',
  'silent-e-long-u',
] as const;

const SILENT_E_FAMILY_IDS = [
  ...SILENT_E_SKILL_IDS,
  'silent-e-long-e',
  'grade-1-long-vowels-silent-e',
  'grade-1-silent-e-practice',
] as const;

const EXPECTED_URL_INPUTS: Record<string, { category: string; urlSlug: string }> = {
  'silent-e-long-a': { category: 'phonics', urlSlug: 'silent-e-long-a' },
  'silent-e-long-e': { category: 'phonics', urlSlug: 'silent-e-long-e' },
  'silent-e-long-i': { category: 'phonics', urlSlug: 'silent-e-long-i' },
  'silent-e-long-o': { category: 'phonics', urlSlug: 'silent-e-long-o' },
  'silent-e-long-u': { category: 'phonics', urlSlug: 'silent-e-long-u' },
  'grade-1-long-vowels-silent-e': {
    category: 'phonics',
    urlSlug: '1st-grade-long-vowels-silent-e',
  },
  'grade-1-silent-e-practice': {
    category: 'phonics',
    urlSlug: '1st-grade-silent-e-practice',
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
  return match?.[1].trim().replace(/^[ '"]|[ '"]$/g, '');
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
      .map((item) => item.trim().replace(/^[ '"]|[ '"]$/g, ''))
      .filter(Boolean);
  }

  const values: string[] = [];
  for (const line of lines.slice(keyIndex + 1)) {
    if (/^[a-zA-Z][\w]*:/.test(line)) break;
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      values.push(trimmed.slice(2).trim().replace(/^[ '"]|[ '"]$/g, ''));
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

describe('Silent E Skill Family', () => {
  it('publishes Silent E as the fifth of 12 public Skill families', () => {
    expect(SPELLING_SKILL_FAMILIES.map((family) => family.title)[4]).toBe('Silent E');
    expect(SPELLING_SKILL_FAMILIES[0]).toBe(SHORT_VOWELS_AND_CVC_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[1]).toBe(CONSONANT_DIGRAPHS_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[2]).toBe(CONSONANT_BLENDS_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[3]).toBe(COMMON_SPELLING_PATTERNS_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[4]).toBe(SILENT_E_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[5]).toBe(VOWEL_TEAMS_SKILL_FAMILY);
  });

  it('uses exactly four curated Silent E Skill IDs (Long E demoted to a labeled section, not a peer page)', () => {
    expect(SILENT_E_SKILL_FAMILY.skillIds).toEqual(SILENT_E_SKILL_IDS);
    expect(SILENT_E_SKILL_FAMILY.skillIds).not.toContain('silent-e-long-e');
    expect(CURATED_SPELLING_SKILL_IDS).not.toContain('silent-e-long-e');
    expect(SILENT_E_SKILL_FAMILY.guidance).toContain('Long E Silent E');
  });

  it('keeps family guidance specific while preserving earlier family guidance', () => {
    expect(SHORT_VOWELS_AND_CVC_SKILL_FAMILY.guidance).toBe(
      'Choose the vowel sound your child needs to practice.',
    );
    expect(CONSONANT_DIGRAPHS_SKILL_FAMILY.guidance).toBe(
      'Choose the letter pair your child needs to practice.',
    );
    expect(SILENT_E_SKILL_FAMILY.guidance).toContain(
      'Choose the vowel sound your child needs to practice.',
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

    const silentEStart = SHORT_VOWELS_AND_CVC_SKILL_FAMILY.skillIds.length +
      CONSONANT_DIGRAPHS_SKILL_FAMILY.skillIds.length +
      CONSONANT_BLENDS_SKILL_FAMILY.skillIds.length +
      COMMON_SPELLING_PATTERNS_SKILL_FAMILY.skillIds.length;

    expect(
      CURATED_SPELLING_SKILL_IDS.slice(silentEStart, silentEStart + SILENT_E_SKILL_IDS.length),
    ).toEqual(SILENT_E_SKILL_IDS);
    expect(
      CURATED_SPELLING_SKILL_IDS.slice(silentEStart + SILENT_E_SKILL_IDS.length).slice(
        0,
        VOWEL_TEAMS_SKILL_FAMILY.skillIds.length,
      ),
    ).toEqual(VOWEL_TEAMS_SKILL_FAMILY.skillIds);
  });

  it('marks the four curated Silent E pages as reusable Skills, and Long E Silent E as an unlinked-but-published Skill', () => {
    for (const id of SILENT_E_SKILL_IDS) {
      expect(byId.get(id), id).toMatchObject({ id, contentRole: 'skill' });
    }
    expect(byId.get('silent-e-long-e')).toMatchObject({
      id: 'silent-e-long-e',
      contentRole: 'skill',
      status: 'published',
    });
  });

  it('marks the Grade 1 Silent E page as a Grade Unit', () => {
    expect(byId.get('grade-1-long-vowels-silent-e')).toMatchObject({
      id: 'grade-1-long-vowels-silent-e',
      contentRole: 'grade-unit',
    });
  });

  it('preserves stable ids, categories, slugs, and public URL inputs', () => {
    for (const id of SILENT_E_FAMILY_IDS) {
      expect(byId.get(id), id).toMatchObject({ id, ...EXPECTED_URL_INPUTS[id] });
    }
  });

  it('keeps active Silent E family Practice Sets concise without padding Long E Silent E', () => {
    for (const id of SILENT_E_FAMILY_IDS) {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      expect(entry!.status, id).toBe('published');
      expect(entry!.words.length, id).toBeGreaterThanOrEqual(id === 'silent-e-long-e' ? 7 : 8);
      expect(entry!.words.length, id).toBeLessThanOrEqual(16);
    }
  });

  it('keeps Silent E family relationship ids resolvable', () => {
    for (const id of SILENT_E_FAMILY_IDS) {
      const entry = byId.get(id)!;
      for (const ref of [...entry.relatedLists, ...entry.prerequisiteLists, ...entry.nextLists]) {
        expect(allIds.has(ref), `${entry.id} references ${ref}`).toBe(true);
      }
    }
  });

  it('does not put rigid next-step sequencing on reusable Silent E Skills', () => {
    for (const id of SILENT_E_SKILL_IDS) {
      expect(byId.get(id)!.nextLists, id).toEqual([]);
    }
  });

  it('keeps Grade 1 coverage resolving through core, gateway, and targeted Skill sections', () => {
    expect(GRADE_1_CORE_IDS).toContain('grade-1-long-vowels-silent-e');
    expect(GRADE_1_GATEWAY_IDS).toContain('grade-1-silent-e-practice');

    for (const id of SILENT_E_SKILL_IDS) {
      expect(GRADE_1_TARGETED_SKILL_IDS).toContain(id);
    }
  });

  it('keeps the protected Grade 1 CVC short-vowel review behavior unchanged', () => {
    expect(GRADE_1_CORE_IDS).toContain('grade-1-cvc-short-vowels-c-k-rule');
    expect(GRADE_1_GATEWAY_IDS).toContain('grade-1-short-vowel-practice');
    expect(GRADE_1_TARGETED_SKILL_IDS).not.toContain('grade-1-cvc-short-vowels-c-k-rule');
  });
});
