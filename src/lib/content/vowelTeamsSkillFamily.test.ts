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
  GREEK_AND_LATIN_ROOTS_SKILL_FAMILY,
  HOMOPHONES_AND_COMMONLY_CONFUSED_WORDS_SKILL_FAMILY,
  MULTISYLLABIC_WORDS_SKILL_FAMILY,
  PREFIXES_SKILL_FAMILY,
  R_CONTROLLED_VOWELS_SKILL_FAMILY,
  SHORT_VOWELS_AND_CVC_SKILL_FAMILY,
  SILENT_E_SKILL_FAMILY,
  SPELLING_SKILL_FAMILIES,
  VOWEL_TEAMS_SKILL_FAMILY,
  WORD_BUILDING_AND_ENDINGS_SKILL_FAMILY,
} from './spellingSkills';
import { getSentenceBankEntry, getSentenceForWord } from '@/lib/sentenceBank';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');
const skillsIndexRoutePath = join(process.cwd(), 'src/pages/skills/index.astro');
const gatewayPath = join(contentRoot, 'phonics/grade-1-vowel-team-practice.md');

const VOWEL_TEAM_SKILL_IDS = [
  'vowel-teams-ai-ay',
  'vowel-teams-ee-ea',
  'vowel-teams-oa-ow',
  'oi-and-oy-words',
  'ou-and-ow-words',
  'ie-and-igh-words',
  'oo-words',
  'au-and-aw-words',
] as const;

// The grade-unit source files these new Skills were promoted from keep their
// own distinct ids/slugs (per SKILLS_ARCHITECTURE.md §3) and must never
// appear in the curated Skill id list themselves.
const EXCLUDED_DIPHTHONG_IDS = ['vowel-teams-oi-oy', 'vowel-teams-ou-ow'] as const;

const VOWEL_TEAM_FAMILY_IDS = [
  ...VOWEL_TEAM_SKILL_IDS,
  'grade-1-long-a-long-o-vowel-teams',
  'grade-1-long-e-vowel-teams',
  'grade-1-vowel-team-practice',
] as const;

const EXPECTED_URL_INPUTS: Record<string, { category: string; urlSlug: string }> = {
  'vowel-teams-ai-ay': { category: 'phonics', urlSlug: 'vowel-teams-ai-ay' },
  'vowel-teams-ee-ea': { category: 'phonics', urlSlug: 'vowel-teams-ee-ea' },
  'vowel-teams-oa-ow': { category: 'phonics', urlSlug: 'vowel-teams-oa-ow' },
  'oi-and-oy-words': { category: 'phonics', urlSlug: 'oi-and-oy-words' },
  'ou-and-ow-words': { category: 'phonics', urlSlug: 'ou-and-ow-words' },
  'ie-and-igh-words': { category: 'phonics', urlSlug: 'ie-and-igh-words' },
  'oo-words': { category: 'phonics', urlSlug: 'oo-words' },
  'au-and-aw-words': { category: 'phonics', urlSlug: 'au-and-aw-words' },
  'grade-1-long-a-long-o-vowel-teams': {
    category: 'phonics',
    urlSlug: '1st-grade-long-a-long-o-vowel-teams',
  },
  'grade-1-long-e-vowel-teams': {
    category: 'phonics',
    urlSlug: '1st-grade-long-e-vowel-teams',
  },
  'grade-1-vowel-team-practice': {
    category: 'phonics',
    urlSlug: '1st-grade-vowel-team-practice',
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

describe('Vowel Teams Skill Family', () => {
  it('publishes Vowel Teams as the sixth of 12 public Skill families', () => {
    expect(SPELLING_SKILL_FAMILIES.map((family) => family.title)).toEqual([
      'Short Vowels',
      'Consonant Digraphs',
      'Consonant Blends',
      'Common Spelling Patterns',
      'Silent E',
      'Vowel Teams',
      'R-Controlled Vowels',
      'Multisyllabic Words',
      'Word Building and Endings',
      'Prefixes',
      'Greek and Latin Roots',
      'Homophones and Commonly Confused Words',
    ]);
    expect(SPELLING_SKILL_FAMILIES[0]).toBe(SHORT_VOWELS_AND_CVC_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[1]).toBe(CONSONANT_DIGRAPHS_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[2]).toBe(CONSONANT_BLENDS_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[3]).toBe(COMMON_SPELLING_PATTERNS_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[4]).toBe(SILENT_E_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[5]).toBe(VOWEL_TEAMS_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[6]).toBe(R_CONTROLLED_VOWELS_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[7]).toBe(MULTISYLLABIC_WORDS_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[8]).toBe(WORD_BUILDING_AND_ENDINGS_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[9]).toBe(PREFIXES_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[10]).toBe(GREEK_AND_LATIN_ROOTS_SKILL_FAMILY);
    expect(SPELLING_SKILL_FAMILIES[11]).toBe(HOMOPHONES_AND_COMMONLY_CONFUSED_WORDS_SKILL_FAMILY);
  });

  it('uses exactly the eight approved live Vowel Teams Skill IDs in public order', () => {
    expect(VOWEL_TEAMS_SKILL_FAMILY.skillIds).toEqual(VOWEL_TEAM_SKILL_IDS);
    expect(VOWEL_TEAMS_SKILL_FAMILY.skillIds).not.toEqual(
      expect.arrayContaining(EXCLUDED_DIPHTHONG_IDS),
    );
    expect(VOWEL_TEAMS_SKILL_FAMILY.skillIds).toHaveLength(8);
  });

  it('keeps family-specific browse copy and JSON-LD derived from curated family order', () => {
    expect(VOWEL_TEAMS_SKILL_FAMILY.description).toBe(
      'Practice common vowel spellings for long vowels and other vowel sounds.',
    );
    expect(VOWEL_TEAMS_SKILL_FAMILY.guidance).toBe(
      'Choose the vowel sound or spelling pair your child needs to practice.',
    );

    const route = readFileSync(skillsIndexRoutePath, 'utf8');
    expect(route).toContain('{family.description} {family.guidance}');
    expect(route).toContain(
      'numberOfItems: skillFamilies.reduce((count, family) => count + family.entries.length, 0)',
    );
    expect(route).toContain('itemListElement: skillFamilies.flatMap((family) =>');
    expect(route).toContain('position: ++itemListPosition');

    expect(CURATED_SPELLING_SKILL_IDS).toHaveLength(41);

    const vowelTeamsStart = SHORT_VOWELS_AND_CVC_SKILL_FAMILY.skillIds.length +
      CONSONANT_DIGRAPHS_SKILL_FAMILY.skillIds.length +
      CONSONANT_BLENDS_SKILL_FAMILY.skillIds.length +
      COMMON_SPELLING_PATTERNS_SKILL_FAMILY.skillIds.length +
      SILENT_E_SKILL_FAMILY.skillIds.length;

    expect(
      CURATED_SPELLING_SKILL_IDS.slice(
        vowelTeamsStart,
        vowelTeamsStart + VOWEL_TEAM_SKILL_IDS.length,
      ),
    ).toEqual(VOWEL_TEAM_SKILL_IDS);
  });

  it('marks curated Vowel Team pages as reusable Skills and Grade 1 core pages as Grade Units', () => {
    for (const id of VOWEL_TEAM_SKILL_IDS) {
      expect(byId.get(id), id).toMatchObject({ id, contentRole: 'skill' });
    }

    for (const id of [
      'grade-1-long-a-long-o-vowel-teams',
      'grade-1-long-e-vowel-teams',
    ]) {
      expect(byId.get(id), id).toMatchObject({ id, contentRole: 'grade-unit' });
    }

    expect(byId.get('grade-1-vowel-team-practice')?.contentRole).toBeUndefined();
  });

  it('preserves stable ids, categories, slugs, public URL inputs, and published status', () => {
    for (const id of VOWEL_TEAM_FAMILY_IDS) {
      expect(byId.get(id), id).toMatchObject({
        id,
        status: 'published',
        ...EXPECTED_URL_INPUTS[id],
      });
    }

    for (const id of EXCLUDED_DIPHTHONG_IDS) {
      expect(byId.get(id), id).toMatchObject({
        id,
        status: 'published',
        category: 'phonics',
      });
    }
  });

  it('removes rigid next-step sequencing from reusable public Vowel Team Skills', () => {
    for (const id of VOWEL_TEAM_SKILL_IDS) {
      expect(byId.get(id)!.nextLists, id).toEqual([]);
    }
  });

  it('keeps Vowel Teams family relationship ids resolvable', () => {
    for (const id of VOWEL_TEAM_FAMILY_IDS) {
      const entry = byId.get(id)!;
      for (const ref of [...entry.relatedLists, ...entry.prerequisiteLists, ...entry.nextLists]) {
        expect(allIds.has(ref), `${entry.id} references ${ref}`).toBe(true);
      }
    }
  });

  it('keeps IE and IGH Words focused, relationship-safe, and deliberately without fabricated placement', () => {
    const entry = byId.get('ie-and-igh-words')!;
    const source = readFileSync(entry.filePath, 'utf8');
    const frontmatter = readFrontmatter(entry.filePath);

    expect(entry).toMatchObject({
      id: 'ie-and-igh-words',
      urlSlug: 'ie-and-igh-words',
      category: 'phonics',
      status: 'published',
      contentRole: 'skill',
      relatedLists: ['silent-e-long-i'],
      prerequisiteLists: [],
      nextLists: [],
    });
    expect(readScalar(frontmatter, 'title')).toBe('IE and IGH Words');
    expect(new Set(entry.relatedLists).size).toBe(entry.relatedLists.length);
    expect(source).not.toMatch(/^readinessSignals:/m);
    expect(source).not.toMatch(/^skillIds:/m);

    const ieWords = entry.words.filter((word) => word.includes('ie'));
    const ighWords = entry.words.filter((word) => word.includes('igh'));
    expect(ieWords.length).toBeGreaterThan(0);
    expect(ighWords.length).toBeGreaterThan(0);
    expect(entry.words).not.toEqual(expect.arrayContaining(['field', 'chief', 'piece']));

    // No current Grade Unit teaches IE/IGH; reverse curriculum placement is
    // intentionally empty until Phase 2 can make a truthful content decision.
    for (const summary of summaries) {
      const unitFrontmatter = readFrontmatter(summary.filePath);
      expect(readArray(unitFrontmatter, 'skillIds'), summary.id).not.toContain('ie-and-igh-words');
    }
  });

  it('links OA and OW Words only to other canonical Skills, never to a Grade Unit id', () => {
    // vowel-teams-oa-ow previously related to vowel-teams-oi-oy, the Grade 2
    // Grade Unit source file OI and OY Words was promoted from — a Skill must
    // never store a forward link to a Grade Unit (CONTENT_MODEL.md: "A Skill
    // never stores its own list of Grade Units"; curriculum placement is
    // computed the other way, via a Grade Unit's own skillIds). OI and OY
    // Words is not a substantively earned "related Skill" for OA and OW Words
    // beyond sharing the Vowel Teams family (a different target sound, a
    // diphthong, not the steady long-o this page teaches), so the link was
    // removed rather than repointed to the canonical Skill id oi-and-oy-words.
    expect(byId.get('vowel-teams-oa-ow')!.relatedLists).toEqual(['vowel-teams-ee-ea']);
    expect(byId.get('vowel-teams-oa-ow')!.relatedLists).not.toContain('vowel-teams-oi-oy');
    expect(byId.get('vowel-teams-oa-ow')!.relatedLists).not.toContain('vowel-teams-ou-ow');
  });

  it('keeps existing Vowel Team practice-list sizes and educational pattern boundaries', () => {
    expect(byId.get('vowel-teams-ai-ay')!.words).toHaveLength(12);
    expect(byId.get('vowel-teams-ee-ea')!.words).toHaveLength(12);
    expect(byId.get('vowel-teams-oa-ow')!.words).toHaveLength(10);

    for (const word of byId.get('vowel-teams-ai-ay')!.words) {
      expect(word.includes('ai') || word.includes('ay'), word).toBe(true);
    }
    for (const word of byId.get('vowel-teams-ee-ea')!.words) {
      expect(word.includes('ee') || word.includes('ea'), word).toBe(true);
    }
    for (const word of byId.get('vowel-teams-oa-ow')!.words) {
      expect(word.includes('oa') || word.includes('ow'), word).toBe(true);
    }

    expect(byId.get('vowel-teams-ee-ea')!.words).not.toEqual(
      expect.arrayContaining(['bread', 'head', 'great', 'bear']),
    );
    expect(byId.get('vowel-teams-oa-ow')!.words).not.toEqual(
      expect.arrayContaining(['cow', 'down', 'brown', 'now', 'out']),
    );
    expect(byId.get('vowel-teams-oa-ow')!.words).toContain('know');
  });

  it('keeps Grade 1 core, gateway, targeted Skill coverage, and gateway links focused', () => {
    expect(GRADE_1_CORE_IDS).toContain('grade-1-long-a-long-o-vowel-teams');
    expect(GRADE_1_CORE_IDS).toContain('grade-1-long-e-vowel-teams');
    expect(GRADE_1_GATEWAY_IDS).toContain('grade-1-vowel-team-practice');

    // Only the three Vowel Team Skills already part of the Grade 1 core
    // progression are targeted there; the four newly-promoted Skills
    // (oi/oy, ou/ow, oo, au/aw) are Grade 2 concepts with no Grade 1 roadmap
    // entry.
    for (const id of ['vowel-teams-ai-ay', 'vowel-teams-ee-ea', 'vowel-teams-oa-ow']) {
      expect(GRADE_1_TARGETED_SKILL_IDS).toContain(id);
    }

    const gateway = readFileSync(gatewayPath, 'utf8');
    expect(gateway).toContain('/skills/ai-ay-vowel-teams');
    expect(gateway).toContain('/skills/ee-ea-vowel-teams');
    expect(gateway).toContain('/skills/oa-ow-vowel-teams');
    expect(gateway).not.toContain('/2nd-grade/vowel-teams-oi-oy');
    expect(gateway).not.toContain('/2nd-grade/vowel-teams-ou-ow');
  });

  it('keeps earlier public Skill families and protected Grade 1 CVC behavior unchanged', () => {
    expect(SHORT_VOWELS_AND_CVC_SKILL_FAMILY.skillIds).toEqual([
      'short-a-words',
      'short-e-words',
      'short-i-words',
      'short-o-words',
      'short-u-words',
    ]);
    expect(CONSONANT_DIGRAPHS_SKILL_FAMILY.skillIds).toEqual([
      'digraph-ch-words',
      'digraph-sh-words',
      'digraph-th-words',
      'digraph-wh-words',
    ]);
    expect(SILENT_E_SKILL_FAMILY.skillIds).toEqual([
      'silent-e-long-a',
      'silent-e-long-i',
      'silent-e-long-o',
      'silent-e-long-u',
    ]);
    expect(GRADE_1_CORE_IDS).toContain('grade-1-cvc-short-vowels-c-k-rule');
    expect(GRADE_1_GATEWAY_IDS).toContain('grade-1-short-vowel-practice');
    expect(GRADE_1_TARGETED_SKILL_IDS).not.toContain('grade-1-cvc-short-vowels-c-k-rule');
  });

  it('adds sentence-bank support for chain', () => {
    expect(getSentenceBankEntry('chain')).toMatchObject({
      word: 'chain',
      exampleSentence: 'The chain on the swing was shiny and strong.',
      gradeBand: 'K-1',
      sourceType: 'curated',
    });
    expect(getSentenceForWord('CHAIN')).toBe(
      'The chain on the swing was shiny and strong.',
    );
  });
});
