import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
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
  SILENT_E_FAMILY_ANCHOR_ID,
  SILENT_E_FAMILY_URL,
  SILENT_E_LONG_E_EXAMPLES,
  SILENT_E_SKILL_FAMILY,
  SPELLING_SKILL_FAMILIES,
  SPELLING_SKILLS_INDEX_PATH,
  VOWEL_TEAMS_SKILL_FAMILY,
  WORD_BUILDING_AND_ENDINGS_SKILL_FAMILY,
  getSpellingSkillPath,
  isCuratedSpellingSkillId,
  resolveCuratedSkillFamilyEntries,
} from './spellingSkills';

const netlifyTomlPath = join(process.cwd(), 'netlify.toml');

function findNetlifyRedirect(from: string): { to: string; status: string } | undefined {
  const source = readFileSync(netlifyTomlPath, 'utf8');
  const blocks = source.split('[[redirects]]').slice(1);

  for (const block of blocks) {
    const fromMatch = block.match(/^\s*from\s*=\s*"([^"]+)"/m);
    if (fromMatch?.[1] !== from) continue;

    const toMatch = block.match(/^\s*to\s*=\s*"([^"]+)"/m);
    const statusMatch = block.match(/^\s*status\s*=\s*(\d+)/m);
    return { to: toMatch?.[1] ?? '', status: statusMatch?.[1] ?? '' };
  }

  return undefined;
}

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

  it('publishes the frozen canonical 12-family taxonomy in stable public order', () => {
    expect(SPELLING_SKILL_FAMILIES).toEqual([
      SHORT_VOWELS_AND_CVC_SKILL_FAMILY,
      CONSONANT_DIGRAPHS_SKILL_FAMILY,
      CONSONANT_BLENDS_SKILL_FAMILY,
      COMMON_SPELLING_PATTERNS_SKILL_FAMILY,
      SILENT_E_SKILL_FAMILY,
      VOWEL_TEAMS_SKILL_FAMILY,
      R_CONTROLLED_VOWELS_SKILL_FAMILY,
      MULTISYLLABIC_WORDS_SKILL_FAMILY,
      WORD_BUILDING_AND_ENDINGS_SKILL_FAMILY,
      PREFIXES_SKILL_FAMILY,
      GREEK_AND_LATIN_ROOTS_SKILL_FAMILY,
      HOMOPHONES_AND_COMMONLY_CONFUSED_WORDS_SKILL_FAMILY,
    ]);

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
  });

  it('derives curated Skill IDs from the published family order (40 published, per the frozen architecture)', () => {
    const expectedSkillIds = SPELLING_SKILL_FAMILIES.flatMap((family) => family.skillIds);

    expect(CURATED_SPELLING_SKILL_IDS).toEqual(expectedSkillIds);
    expect(new Set(CURATED_SPELLING_SKILL_IDS).size).toBe(CURATED_SPELLING_SKILL_IDS.length);
    expect(CURATED_SPELLING_SKILL_IDS).toHaveLength(40);
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
      'beginning-blends',
      'ending-blends',
      'ck-tch-dge-word-endings',
      'silent-letters',
      'soft-c-soft-g',
      'silent-e-long-a',
      'silent-e-long-i',
      'silent-e-long-o',
      'silent-e-long-u',
      'vowel-teams-ai-ay',
      'vowel-teams-ee-ea',
      'vowel-teams-oa-ow',
      'oi-and-oy-words',
      'ou-and-ow-words',
      'oo-words',
      'au-and-aw-words',
      'r-controlled-ar',
      'r-controlled-or',
      'r-controlled-er-ir-ur',
      'multisyllabic-words',
      'plurals',
      'ed-and-ing',
      'common-suffixes',
      'suffix-spelling-changes',
      'compound-words',
      'contractions',
      'un-and-re-prefixes',
      'common-prefixes',
      'greek-and-latin-roots',
      'homophones',
      'commonly-confused-words',
    ]);
  });

  it('resolves every curated Skill family in stable order', () => {
    for (const family of SPELLING_SKILL_FAMILIES) {
      const resolved = resolveCuratedSkillFamilyEntries(summaries, family.skillIds);

      expect(resolved.map((entry) => entry.data.id)).toEqual(family.skillIds);
    }
  });

  it('renders single-skill families (Multisyllabic Words, Greek and Latin Roots) as a one-item list', () => {
    expect(MULTISYLLABIC_WORDS_SKILL_FAMILY.skillIds).toEqual(['multisyllabic-words']);
    expect(GREEK_AND_LATIN_ROOTS_SKILL_FAMILY.skillIds).toEqual(['greek-and-latin-roots']);
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

  it('keeps curated Skill links resolved against each entry\'s own category', () => {
    for (const id of CURATED_SPELLING_SKILL_IDS) {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      expect(getSpellingSkillPath(entry!)).toBe(
        `/spelling-lists/${entry!.data.category}/${entry!.data.urlSlug}`,
      );
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

  it('publishes IE and IGH Words as the 41st canonical Skill', () => {
    expect(CURATED_SPELLING_SKILL_IDS).toHaveLength(41);
    expect(VOWEL_TEAMS_SKILL_FAMILY.skillIds).toContain('ie-and-igh-words');
    expect(isCuratedSpellingSkillId('ie-and-igh-words')).toBe(true);
    expect(byId.get('ie-and-igh-words')).toMatchObject({
      data: {
        urlSlug: 'ie-and-igh-words',
        status: 'published',
        contentRole: 'skill',
      },
    });
  });

  it('keeps non-taxonomy pages out of the canonical registry without freezing their unresolved role', () => {
    for (const id of [
      'grade-3-doubling-final-consonants',
      'grade-3-changing-y-to-i',
      'tier-2-greek-latin-roots',
    ]) {
      expect(CURATED_SPELLING_SKILL_IDS).not.toContain(id);
      expect(byId.get(id), id).toMatchObject({ data: { contentRole: 'grade-unit' } });
    }

    const gradeHubCards = readFileSync(
      join(process.cwd(), 'src/lib/content/gradeHubCards.ts'),
      'utf8',
    );
    for (const id of ['grade-4-final-stable-syllables', 'grade-5-spelling-rules']) {
      expect(CURATED_SPELLING_SKILL_IDS).not.toContain(id);
      expect(VOWEL_TEAMS_SKILL_FAMILY.skillIds).not.toContain(id);
      expect(gradeHubCards).not.toContain(id);
      expect(byId.get(id), id).toMatchObject({ data: { status: 'published' } });
    }

    expect(byId.get('grade-4-advanced-suffixes')!.data.relatedLists).toContain(
      'grade-4-final-stable-syllables',
    );
    expect(byId.get('grade-5-prefix-suffix-words')!.data.relatedLists).toContain(
      'grade-5-spelling-rules',
    );
  });

  describe('retired Long E Silent E page (docs/architecture/SKILLS_ARCHITECTURE.md §5)', () => {
    it('is not one of the 41 canonical Skill slots', () => {
      expect(CURATED_SPELLING_SKILL_IDS).not.toContain('silent-e-long-e');
      expect(CURATED_SPELLING_SKILL_IDS).toHaveLength(41);
    });

    it('is not a Silent E family peer', () => {
      expect(SILENT_E_SKILL_FAMILY.skillIds).not.toContain('silent-e-long-e');
      expect(SILENT_E_SKILL_FAMILY.skillIds).toEqual([
        'silent-e-long-a',
        'silent-e-long-i',
        'silent-e-long-o',
        'silent-e-long-u',
      ]);
    });

    it('no longer emits a standalone content page (archived status excludes it from getStaticPaths)', () => {
      expect(byId.get('silent-e-long-e'), 'silent-e-long-e').toMatchObject({
        data: { status: 'archived' },
      });
    });

    it('permanently redirects its former URL to the canonical Silent E family anchor', () => {
      const redirect = findNetlifyRedirect('/spelling-lists/phonics/silent-e-long-e');

      expect(redirect).toBeDefined();
      expect(redirect?.status).toBe('301');
      expect(redirect?.to).toBe(SILENT_E_FAMILY_URL);
      expect(SILENT_E_FAMILY_URL).toBe(`${SPELLING_SKILLS_INDEX_PATH}#${SILENT_E_FAMILY_ANCHOR_ID}`);
    });

    it('keeps the Long E treatment to one concise sentence in the family guidance, not a separate block', () => {
      expect(SILENT_E_SKILL_FAMILY.anchorId).toBe(SILENT_E_FAMILY_ANCHOR_ID);
      expect(SILENT_E_SKILL_FAMILY).not.toHaveProperty('longEOverviewNote');

      expect(SILENT_E_SKILL_FAMILY.guidance).toMatch(/long e/i);
      // Exactly two sentences: the normal per-family instruction, plus the
      // one-sentence Long E clarification — no separate paragraph/block.
      expect(SILENT_E_SKILL_FAMILY.guidance.split('. ')).toHaveLength(2);

      // Kept intentionally small — a curated subset of the retired page's
      // word list, not a copy of the whole thing.
      expect(SILENT_E_LONG_E_EXAMPLES.length).toBeGreaterThan(0);
      expect(SILENT_E_LONG_E_EXAMPLES.length).toBeLessThanOrEqual(4);

      // Every example must be a real, one-syllable word the retired page
      // actually taught, so the guidance sentence can't drift from audited
      // content — and must never include a multisyllabic word like
      // "complete", since the thin one-syllable word bank is the entire
      // rationale for not having a standalone page.
      const retiredWords = byId.get('silent-e-long-e')!.data.words;
      for (const example of SILENT_E_LONG_E_EXAMPLES) {
        expect(retiredWords, example).toContain(example);
        expect(SILENT_E_SKILL_FAMILY.guidance, example).toContain(example);
      }
      expect(SILENT_E_LONG_E_EXAMPLES).not.toContain('complete');
    });
  });
});
