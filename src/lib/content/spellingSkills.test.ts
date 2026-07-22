import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CONSONANT_DIGRAPHS_SKILL_FAMILY,
  CURATED_SPELLING_SKILL_IDS,
  SHORT_VOWELS_AND_CVC_SKILL_FAMILY,
  SILENT_E_SKILL_FAMILY,
  SPELLING_SKILL_FAMILIES,
  SPELLING_SKILLS_INDEX_PATH,
  VOWEL_TEAMS_SKILL_FAMILY,
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
    relatedLists: string[];
    prerequisiteLists: string[];
    nextLists: string[];
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
      relatedLists: readArray(frontmatter, 'relatedLists'),
      prerequisiteLists: readArray(frontmatter, 'prerequisiteLists'),
      nextLists: readArray(frontmatter, 'nextLists'),
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
  it('uses the current spelling-lists hierarchy for the public Skills browse route', () => {
    expect(SPELLING_SKILLS_INDEX_PATH).toBe('/spelling-lists/skills/');
  });

  it('publishes the current curated Skill families in stable public order', () => {
    expect(SPELLING_SKILL_FAMILIES).toEqual([
      SHORT_VOWELS_AND_CVC_SKILL_FAMILY,
      CONSONANT_DIGRAPHS_SKILL_FAMILY,
      SILENT_E_SKILL_FAMILY,
      VOWEL_TEAMS_SKILL_FAMILY,
    ]);

    expect(SPELLING_SKILL_FAMILIES.map((family) => family.title)).toEqual([
      'Short Vowels',
      'Consonant Digraphs',
      'Silent E',
      'Vowel Teams',
    ]);
  });

  it('derives curated Skill IDs from the published family order', () => {
    const expectedSkillIds = SPELLING_SKILL_FAMILIES.flatMap((family) => family.skillIds);

    expect(CURATED_SPELLING_SKILL_IDS).toEqual(expectedSkillIds);
    expect(new Set(CURATED_SPELLING_SKILL_IDS).size).toBe(CURATED_SPELLING_SKILL_IDS.length);
    expect(CURATED_SPELLING_SKILL_IDS).toEqual([
      'short-a-words',
      'short-e-words',
      'short-i-words',
      'short-o-words',
      'short-u-words',
      'digraph-ch-words',
      'digraph-sh-words',
      'digraph-th-words',
      'digraph-wh-words',
      'silent-e-long-a',
      'silent-e-long-e',
      'silent-e-long-i',
      'silent-e-long-o',
      'silent-e-long-u',
      'vowel-teams-ai-ay',
      'vowel-teams-ee-ea',
      'vowel-teams-oa-ow',
    ]);
  });

  it('resolves every curated Skill family in stable order', () => {
    for (const family of SPELLING_SKILL_FAMILIES) {
      const resolved = resolveCuratedSkillFamilyEntries(summaries, family.skillIds);

      expect(resolved.map((entry) => entry.data.id)).toEqual(family.skillIds);
    }
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

    // Phase 2 (Kindergarten normalization): these five pages' Grade Unit role
    // merged into kindergarten-mixed-vowel-review, so they now carry no
    // contentRole at all — still not curated Skills, but no longer Grade
    // Units either.
    for (const id of KINDERGARTEN_SHORT_VOWEL_GRADE_UNIT_IDS) {
      expect(CURATED_SPELLING_SKILL_IDS).not.toContain(id);
      expect(byId.get(id), id).toMatchObject({ data: { contentRole: undefined } });
    }

    expect(byId.get('kindergarten-mixed-vowel-review'), 'kindergarten-mixed-vowel-review').toMatchObject({
      data: { contentRole: 'grade-unit' },
    });

    for (const id of [
      'grade-1-cvc-short-vowels-c-k-rule',
      'grade-1-consonant-digraphs-final-ck',
      'grade-1-long-vowels-silent-e',
      'grade-1-long-a-long-o-vowel-teams',
      'grade-1-long-e-vowel-teams',
    ]) {
      expect(CURATED_SPELLING_SKILL_IDS).not.toContain(id);
      expect(byId.get(id), id).toMatchObject({ data: { contentRole: 'grade-unit' } });
    }

    for (const id of [
      'short-vowels-cvc-words',
      'grade-1-short-vowel-practice',
      'grade-1-consonant-digraph-practice',
      'grade-1-silent-e-practice',
      'grade-1-vowel-team-practice',
    ]) {
      expect(CURATED_SPELLING_SKILL_IDS).not.toContain(id);
    }

    expect(byId.get('short-vowels-cvc-words')).toMatchObject({ data: { status: 'archived' } });
  });

  it('keeps curated Skill links on their current legacy spelling-list URLs', () => {
    for (const id of CURATED_SPELLING_SKILL_IDS) {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      expect(getSpellingSkillPath(entry!)).toBe(`/spelling-lists/phonics/${entry!.data.urlSlug}`);
    }
  });

  it('uses curated ids for Skills breadcrumb eligibility', () => {
    for (const id of CURATED_SPELLING_SKILL_IDS) {
      expect(isCuratedSpellingSkillId(id), id).toBe(true);
    }

    for (const id of [
      'kindergarten-short-a-words',
      'grade-1-cvc-short-vowels-c-k-rule',
      'short-vowels-cvc-words',
      'vowel-teams-oi-oy',
    ]) {
      expect(isCuratedSpellingSkillId(id), id).toBe(false);
    }
  });

  it('keeps curated Skill relationships pointing to real lists', () => {
    for (const id of CURATED_SPELLING_SKILL_IDS) {
      const entry = byId.get(id)!;
      const relationshipIds = [
        ...entry.data.prerequisiteLists,
        ...entry.data.relatedLists,
        ...entry.data.nextLists,
      ];

      for (const relationshipId of relationshipIds) {
        expect(byId.has(relationshipId), `${id} references ${relationshipId}`).toBe(true);
      }
    }
  });
});
