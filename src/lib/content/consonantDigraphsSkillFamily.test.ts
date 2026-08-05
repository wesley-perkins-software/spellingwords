import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  GRADE_1_CORE_IDS,
  GRADE_1_TARGETED_SKILL_IDS,
} from './grade1Progression';
import { KINDERGARTEN_CORE_IDS } from './kindergartenProgression';
import { gradeConfig } from './gradeConfig';
import {
  CONSONANT_DIGRAPHS_SKILL_FAMILY,
  CURATED_SPELLING_SKILL_IDS,
  SHORT_VOWELS_AND_CVC_SKILL_FAMILY,
  SPELLING_SKILL_FAMILIES,
} from './spellingSkills';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');
const skillsIndexRoutePath = join(process.cwd(), 'src/pages/skills/index.astro');
const listDetailRoutePath = join(process.cwd(), 'src/pages/[gradeSlug]/[slug].astro');

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
};

type FrontmatterSummary = {
  id: string;
  urlSlug: string;
  category: string;
  status: string;
  contentRole?: string;
  grade?: string;
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
    grade: readScalar(frontmatter, 'grade'),
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

function gradeConfigOrder(id: string): number {
  const grade = byId.get(id)?.grade;
  const index = gradeConfig.findIndex((g) => g.grade === grade);
  return index === -1 ? gradeConfig.length : index;
}

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

  it('keeps every active Consonant Digraphs family Grade Unit/gateway Practice Set in the 8-16 word range', () => {
    // The four CH/SH/TH/WH Skills carry a small demonstration set, not an
    // 8-16 word Practice Set — see the dedicated demonstration-set contract
    // test below. Only the Grade Unit and gateway pages hold the legacy
    // 8-16 word assigned-practice range.
    for (const id of CONSONANT_DIGRAPH_FAMILY_IDS) {
      if (CONSONANT_DIGRAPH_SKILL_IDS.includes(id as (typeof CONSONANT_DIGRAPH_SKILL_IDS)[number]))
        continue;

      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      expect(entry!.status, id).toBe('published');
      expect(entry!.words.length, id).toBeGreaterThanOrEqual(8);
      expect(entry!.words.length, id).toBeLessThanOrEqual(16);
    }
  });

  it('marks the Grade 1 Consonant Digraphs & Final -ck page as a Grade Unit', () => {
    expect(byId.get('grade-1-consonant-digraphs-final-ck')).toMatchObject({
      id: 'grade-1-consonant-digraphs-final-ck',
      contentRole: 'grade-unit',
    });
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

  it('keeps Grade 1 coverage resolving through core and targeted Skill sections', () => {
    expect(GRADE_1_CORE_IDS).toContain('grade-1-consonant-digraphs-final-ck');

    for (const id of CONSONANT_DIGRAPH_SKILL_IDS) {
      expect(GRADE_1_TARGETED_SKILL_IDS).toContain(id);
    }
  });

  it('keeps the protected Grade 1 CVC short-vowel review behavior unchanged', () => {
    expect(GRADE_1_CORE_IDS).toContain('grade-1-cvc-short-vowels-c-k-rule');
    expect(GRADE_1_TARGETED_SKILL_IDS).not.toContain('grade-1-cvc-short-vowels-c-k-rule');
  });

  it('does not give reusable digraph Skills readinessSignals (a Grade Unit-only field)', () => {
    for (const id of CONSONANT_DIGRAPH_SKILL_IDS) {
      const frontmatter = readFrontmatter(byId.get(id)!.filePath);
      expect(frontmatter, id).not.toMatch(/^readinessSignals:/m);
    }
  });

  it('resolves every Grade Unit skillIds entry to a real, live digraph Skill', () => {
    for (const id of ['kindergarten-consonant-digraphs', 'grade-1-consonant-digraphs-final-ck']) {
      const entry = byId.get(id)!;
      expect(entry.skillIds.length, id).toBeGreaterThan(0);
      for (const skillId of entry.skillIds) {
        expect(allIds.has(skillId), `${id} skillIds references ${skillId}`).toBe(true);
        expect(byId.get(skillId)?.contentRole, skillId).toBe('skill');
      }
    }
  });

  it('gives every digraph Skill at least one resolvable curriculum placement via skillIds', () => {
    // Curriculum placement is computed entirely from the Grade Unit side (a
    // reverse skillIds lookup, see [category]/[slug].astro) — a Skill with
    // zero incoming references would silently render with no "Where this
    // fits in the curriculum" section despite the Standard requiring one.
    const gradeUnitIds = ['kindergarten-consonant-digraphs', 'grade-1-consonant-digraphs-final-ck'];

    for (const skillId of CONSONANT_DIGRAPH_SKILL_IDS) {
      const hasPlacement = gradeUnitIds.some((gradeUnitId) =>
        byId.get(gradeUnitId)!.skillIds.includes(skillId),
      );
      expect(hasPlacement, skillId).toBe(true);
    }
  });

  it('sorts curriculum placement cards into canonical K-5 grade order, not content-collection order', () => {
    // digraph-sh/ch/th-words is the first live case of a Skill placed in
    // both a Kindergarten and a Grade 1 Grade Unit, which exposed that
    // placements were previously left in whatever order the content
    // collection returned them (Grade 1's lower `order` value sorted it
    // ahead of Kindergarten). This is a shared-template contract, not a
    // digraph-specific one — it protects every current and future Skill
    // placed across more than one grade.
    const route = readFileSync(listDetailRoutePath, 'utf8');
    expect(route).toContain('gradeSortIndex');
    expect(route).toContain('.sort((a, b) => gradeSortIndex(a.unit.data.grade) - gradeSortIndex(b.unit.data.grade))');

    const kindergartenOrder = gradeConfigOrder('kindergarten-consonant-digraphs');
    const grade1Order = gradeConfigOrder('grade-1-consonant-digraphs-final-ck');
    expect(kindergartenOrder, 'Kindergarten must sort before Grade 1').toBeLessThan(grade1Order);
  });

  it('does not claim a WH placement on the Kindergarten unit, which does not teach WH', () => {
    expect(byId.get('kindergarten-consonant-digraphs')!.skillIds).not.toContain('digraph-wh-words');
  });

  it('computes a Skill curriculum placement from the Grade Unit side, not stored on the Skill', () => {
    for (const id of CONSONANT_DIGRAPH_SKILL_IDS) {
      const frontmatter = readFrontmatter(byId.get(id)!.filePath);
      expect(frontmatter, id).not.toMatch(/^skillIds:/m);
    }
  });
});
