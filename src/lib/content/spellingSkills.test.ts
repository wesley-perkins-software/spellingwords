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
  SILENT_E_SKILL_FAMILY,
  SPELLING_SKILL_FAMILIES,
  SKILLS_INDEX_PATH,
  VOWEL_TEAMS_SKILL_FAMILY,
  WORD_BUILDING_AND_ENDINGS_SKILL_FAMILY,
  getSpellingSkillPath,
  isCuratedSpellingSkillId,
  resolveCuratedSkillFamilyEntries,
} from './spellingSkills';
import { getCanonicalSkillPathById } from './canonicalSkillRoutes';

const netlifyTomlPath = join(process.cwd(), 'netlify.toml');
const skillsHubPath = join(process.cwd(), 'src/pages/skills/index.astro');
// The Hub's page-level intro copy and per-skill rendering now live in the
// shared Direction A view component the Hub page renders (SkillsHubView),
// not inline in the page file itself.
const skillsHubViewPath = join(process.cwd(), 'src/components/direction-a/SkillsHubView.astro');

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
    skillIds: string[];
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
      skillIds: readArray(frontmatter, 'skillIds'),
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
  it('frames the Hub around known skills and concepts and routes sequence-seeking readers to grades', () => {
    const viewSource = readFileSync(skillsHubViewPath, 'utf8');

    expect(viewSource).toMatch(/Browse by skill/);
    expect(viewSource).toMatch(/spelling concept/);
    expect(viewSource).toContain('href="/grades"');
    expect(viewSource).toMatch(/sequenced grade-level path/);
    expect(viewSource).not.toMatch(/Start with short vowels/i);
    expect(viewSource).not.toMatch(/Choose a specific spelling sound or pattern/i);
  });

  it('renders Skill destinations as tiles, not rounded-full pills (2026-08 visual redesign, §13a)', () => {
    const viewSource = readFileSync(skillsHubViewPath, 'utf8');

    expect(viewSource).not.toContain("import Chip from './Chip.astro'");
    expect(viewSource).toContain('SkillIndexTile');
    expect(viewSource).not.toMatch(/rounded-full[^"]*"[^>]*>\s*\{skill\.title\}/);
  });

  it('gives every family authored orientation without the legacy Mad-Libs template', () => {
    expect(SPELLING_SKILL_FAMILIES).toHaveLength(12);
    for (const family of SPELLING_SKILL_FAMILIES) {
      expect(family.description.trim(), family.title).not.toBe('');
      expect(family.guidance.trim(), family.title).not.toBe('');
      expect(family.description, family.title).not.toMatch(/^Practice /);
      expect(family.guidance, family.title).not.toMatch(/^Choose the .* your child needs to practice\.$/);
    }

    expect(MULTISYLLABIC_WORDS_SKILL_FAMILY.guidance).not.toMatch(/choose/i);
    expect(GREEK_AND_LATIN_ROOTS_SKILL_FAMILY.guidance).not.toMatch(/choose/i);
  });

  it('uses canonical family descriptions and introduces no Hub-only or grade metadata', () => {
    const source = readFileSync(skillsHubPath, 'utf8');
    const viewSource = readFileSync(skillsHubViewPath, 'utf8');

    // Family sections thread the canonical description/guidance straight
    // through from SPELLING_SKILL_FAMILIES to the view, unmodified — the
    // Hub doesn't fabricate its own per-family or per-skill copy. Individual
    // Skills render as link-pills (title + href only, see the "compact
    // section, not a 41-card dashboard" design note atop SkillsHubView), so
    // there is deliberately no per-skill description on this page.
    expect(source).toContain('description: family.description,');
    expect(source).toContain('guidance: family.guidance,');
    expect(viewSource).toContain('{family.description} {family.guidance}');
    expect(source).not.toMatch(/hubDescription|skillDescription|gradeBadge|gradeRange/);
    expect(viewSource).not.toMatch(/hubDescription|skillDescription|gradeBadge|gradeRange/);
  });

  it('retains a BreadcrumbList and one flat canonical 41-Skill ItemList', () => {
    const source = readFileSync(skillsHubPath, 'utf8');

    expect(source).toContain("'@type': 'BreadcrumbList'");
    expect(source).toContain("'@type': 'ItemList'");
    expect(source.match(/'@type': 'ItemList'/g)).toHaveLength(1);
    expect(source).toContain('itemListElement: skillFamilies.flatMap((family) =>');
    expect(source).toContain('getSpellingSkillPath(entry)');
    expect(CURATED_SPELLING_SKILL_IDS).toHaveLength(41);
  });

  it('uses /skills as the top-level public Skills Hub route, not a child of /spelling-lists', () => {
    expect(SKILLS_INDEX_PATH).toBe('/skills');
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

  it('derives curated Skill IDs from the published family order (41 published, per the frozen architecture)', () => {
    const expectedSkillIds = SPELLING_SKILL_FAMILIES.flatMap((family) => family.skillIds);

    expect(CURATED_SPELLING_SKILL_IDS).toEqual(expectedSkillIds);
    expect(new Set(CURATED_SPELLING_SKILL_IDS).size).toBe(CURATED_SPELLING_SKILL_IDS.length);
    expect(CURATED_SPELLING_SKILL_IDS).toHaveLength(41);
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
      'ie-and-igh-words',
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
    ]) {
      expect(CURATED_SPELLING_SKILL_IDS).not.toContain(id);
      expect(byId.get(id), id).toMatchObject({ data: { contentRole: 'grade-unit' } });
    }

    expect(CURATED_SPELLING_SKILL_IDS).not.toContain('short-vowels-cvc-words');

    expect(byId.get('short-vowels-cvc-words')).toMatchObject({ data: { status: 'archived' } });
  });

  it('resolves curated Skill links through the canonical Skill route manifest', () => {
    for (const id of CURATED_SPELLING_SKILL_IDS) {
      const entry = byId.get(id);
      expect(entry, id).toBeDefined();
      const path = getSpellingSkillPath(entry!);
      expect(path.startsWith('/skills/'), id).toBe(true);
      expect(path).toBe(getCanonicalSkillPathById(id));
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

  it('keeps grade-unit skillIds limited to canonical Skill ids', () => {
    const anchor = byId.get('grade-5-prefix-suffix-words')!;
    expect(anchor.data.skillIds).toEqual(['common-prefixes']);
    for (const skillId of anchor.data.skillIds) {
      expect(CURATED_SPELLING_SKILL_IDS).toContain(skillId);
    }
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

    it('has no redirect for its former URL (pre-launch: obsolete paths 404, not redirect) and folds into the Silent E family anchor', () => {
      const redirect = findNetlifyRedirect('/spelling-lists/phonics/silent-e-long-e');

      expect(redirect).toBeUndefined();
      expect(SILENT_E_FAMILY_URL).toBe(`${SKILLS_INDEX_PATH}#${SILENT_E_FAMILY_ANCHOR_ID}`);
      expect(SILENT_E_FAMILY_URL).toBe('/skills#silent-e-family');
    });

    it('keeps retired Long E out of Hub teaching copy as well as the canonical inventory', () => {
      expect(SILENT_E_SKILL_FAMILY.anchorId).toBe(SILENT_E_FAMILY_ANCHOR_ID);
      expect(SILENT_E_SKILL_FAMILY).not.toHaveProperty('longEOverviewNote');
      expect(`${SILENT_E_SKILL_FAMILY.description} ${SILENT_E_SKILL_FAMILY.guidance}`).not.toMatch(
        /long e|eve|these|theme/i,
      );
    });
  });
});
