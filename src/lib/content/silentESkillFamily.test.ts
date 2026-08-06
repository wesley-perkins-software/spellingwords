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
  SILENT_E_FAMILY_ANCHOR_ID,
  SILENT_E_LONG_E_EXAMPLES,
  SILENT_E_SKILL_FAMILY,
  SPELLING_SKILL_FAMILIES,
  VOWEL_TEAMS_SKILL_FAMILY,
} from './spellingSkills';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');
const skillsIndexRoutePath = join(process.cwd(), 'src/pages/skills/index.astro');

// Long E Silent E is deliberately excluded per SKILLS_ARCHITECTURE.md §5: its
// standalone page is archived (no longer statically generated) and its old
// URL now permanently redirects to the canonical Silent E family overview —
// it is not a curated family member and not reachable as its own page.
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
};

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

  it('uses exactly four curated Silent E Skill IDs (Long E folded into guidance copy, not a peer page or separate block)', () => {
    expect(SILENT_E_SKILL_FAMILY.skillIds).toEqual(SILENT_E_SKILL_IDS);
    expect(SILENT_E_SKILL_FAMILY.skillIds).not.toContain('silent-e-long-e');
    expect(CURATED_SPELLING_SKILL_IDS).not.toContain('silent-e-long-e');
    expect(SILENT_E_SKILL_FAMILY.anchorId).toBe(SILENT_E_FAMILY_ANCHOR_ID);
    expect(SILENT_E_SKILL_FAMILY).not.toHaveProperty('longEOverviewNote');
    expect(SILENT_E_SKILL_FAMILY.guidance).toContain('Long E Silent E');
    for (const example of SILENT_E_LONG_E_EXAMPLES) {
      expect(SILENT_E_SKILL_FAMILY.guidance, example).toContain(example);
    }
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
    expect(route).not.toContain('longEOverviewNote');
  });

  it('keeps Skills browse JSON-LD counts and item order derived from curated family order', () => {
    const route = readFileSync(skillsIndexRoutePath, 'utf8');
    expect(route).toContain(
      'numberOfItems: skillFamilies.reduce((count, family) => count + family.entries.length, 0)',
    );
    expect(route).toContain('itemListElement: skillFamilies.flatMap((family) =>');
    expect(route).toContain('position: ++itemListPosition');

    expect(CURATED_SPELLING_SKILL_IDS).toHaveLength(41);

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

  it('marks the four curated Silent E pages as reusable Skills, and Long E Silent E as archived (no standalone page)', () => {
    for (const id of SILENT_E_SKILL_IDS) {
      expect(byId.get(id), id).toMatchObject({ id, contentRole: 'skill' });
    }
    expect(byId.get('silent-e-long-e')).toMatchObject({
      id: 'silent-e-long-e',
      contentRole: 'skill',
      status: 'archived',
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

  it('keeps active Silent E family entries published and Long E Silent E archived', () => {
    for (const id of SILENT_E_FAMILY_IDS) {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      expect(entry!.status, id).toBe(id === 'silent-e-long-e' ? 'archived' : 'published');
    }
  });

  it('keeps Grade Unit Practice Sets within the legacy 8-16 word range', () => {
    // The four reusable Silent E Skills use a small, unpadded demonstration
    // set instead (see the dedicated word-count contract test below) — the
    // 8-16 range is a Grade Unit/Practice Set contract, not a Skill one.
    for (const id of SILENT_E_FAMILY_IDS) {
      if (SILENT_E_SKILL_IDS.includes(id as (typeof SILENT_E_SKILL_IDS)[number])) continue;
      if (id === 'silent-e-long-e') continue;

      const entry = byId.get(id)!;
      expect(entry.words.length, id).toBeGreaterThanOrEqual(8);
      expect(entry.words.length, id).toBeLessThanOrEqual(16);
    }
  });

  it('keeps reusable Silent E Skill demonstration sets small and unpadded, not sized to match a Practice Set', () => {
    for (const id of SILENT_E_SKILL_IDS) {
      const entry = byId.get(id)!;
      expect(entry.words.length, id).toBeGreaterThanOrEqual(3);
      expect(entry.words.length, id).toBeLessThanOrEqual(8);
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

  it('keeps Grade 1 coverage resolving through core and targeted Skill sections', () => {
    expect(GRADE_1_CORE_IDS).toContain('grade-1-long-vowels-silent-e');

    for (const id of SILENT_E_SKILL_IDS) {
      expect(GRADE_1_TARGETED_SKILL_IDS).toContain(id);
    }
  });

  it('keeps the protected Grade 1 CVC short-vowel review behavior unchanged', () => {
    expect(GRADE_1_CORE_IDS).toContain('grade-1-cvc-short-vowels-c-k-rule');
    expect(GRADE_1_TARGETED_SKILL_IDS).not.toContain('grade-1-cvc-short-vowels-c-k-rule');
  });

  it('does not give reusable Silent E Skills readinessSignals (a Grade Unit-only field)', () => {
    for (const id of SILENT_E_SKILL_IDS) {
      const frontmatter = readFrontmatter(byId.get(id)!.filePath);
      expect(frontmatter, id).not.toMatch(/^readinessSignals:/m);
    }
  });

  it('resolves the Grade 1 Silent E unit skillIds entry to real, live Silent E Skills', () => {
    const entry = byId.get('grade-1-long-vowels-silent-e')!;
    expect(entry.skillIds.length).toBeGreaterThan(0);
    for (const skillId of entry.skillIds) {
      expect(allIds.has(skillId), `grade-1-long-vowels-silent-e skillIds references ${skillId}`).toBe(
        true,
      );
      expect(byId.get(skillId)?.contentRole, skillId).toBe('skill');
    }
  });

  it('gives every Silent E Skill at least one resolvable curriculum placement via skillIds', () => {
    // Curriculum placement is computed entirely from the Grade Unit side (a
    // reverse skillIds lookup, see [category]/[slug].astro) — a Skill with
    // zero incoming references would silently render with no "Where this
    // fits in the curriculum" section despite the Standard requiring one.
    const gradeUnitIds = ['grade-1-long-vowels-silent-e'];

    for (const skillId of SILENT_E_SKILL_IDS) {
      const hasPlacement = gradeUnitIds.some((gradeUnitId) =>
        byId.get(gradeUnitId)!.skillIds.includes(skillId),
      );
      expect(hasPlacement, skillId).toBe(true);
    }
  });

  it('computes a Skill curriculum placement from the Grade Unit side, not stored on the Skill', () => {
    for (const id of SILENT_E_SKILL_IDS) {
      const frontmatter = readFrontmatter(byId.get(id)!.filePath);
      expect(frontmatter, id).not.toMatch(/^skillIds:/m);
    }
  });

  it('does not link a live Silent E Skill to the archived silent-e-long-e page', () => {
    // The Standard (CANONICAL_SKILL_PAGE_STANDARD.md §12) prohibits linking
    // to deprecated/archived content from a canonical Skill page.
    for (const id of SILENT_E_SKILL_IDS) {
      const entry = byId.get(id)!;
      for (const ref of [...entry.relatedLists, ...entry.prerequisiteLists, ...entry.nextLists]) {
        expect(ref, `${id} references ${ref}`).not.toBe('silent-e-long-e');
      }
    }
  });
});
