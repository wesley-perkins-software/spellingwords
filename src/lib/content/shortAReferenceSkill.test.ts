import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { KINDERGARTEN_CORE_IDS } from './kindergartenProgression';

const CONTENT_ROLE_VALUES = [
  'grade-unit',
  'skill',
  'sight-word-set',
  'vocabulary-theme',
  'teaching-guide',
  'supporting-practice',
] as const;

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');
const shortASkillPath = join(contentRoot, 'phonics/short-a-words.md');
const kindergartenShortAPath = join(contentRoot, 'phonics/kindergarten-short-a-words.md');
const listDetailRoutePath = join(process.cwd(), 'src/pages/spelling-lists/[category]/[slug].astro');
const contentConfigPath = join(process.cwd(), 'src/content/config.ts');

type FrontmatterSummary = {
  id: string;
  urlSlug: string;
  category: string;
  contentRole?: string;
  words: string[];
  skillIds: string[];
  relatedLists: string[];
  prerequisiteLists: string[];
  nextLists: string[];
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
  const inline = frontmatter.match(new RegExp(`^${key}:\\s*\\[(.*)\\]$`, 'm'));
  if (inline) {
    return inline[1]
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  const block = frontmatter.match(
    new RegExp(String.raw`(?:^|\n)${key}:\s*\n([\s\S]*?)(?=\n[a-zA-Z][\w]*:|$)`),
  );
  if (!block) return [];

  return block[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim().replace(/^['"]|['"]$/g, ''));
}

function readSummary(filePath: string): FrontmatterSummary {
  const frontmatter = readFrontmatter(filePath);
  return {
    id: readScalar(frontmatter, 'id') ?? '',
    urlSlug: readScalar(frontmatter, 'urlSlug') ?? '',
    category: readScalar(frontmatter, 'category') ?? '',
    contentRole: readScalar(frontmatter, 'contentRole'),
    words: readArray(frontmatter, 'words'),
    skillIds: readArray(frontmatter, 'skillIds'),
    relatedLists: readArray(frontmatter, 'relatedLists'),
    prerequisiteLists: readArray(frontmatter, 'prerequisiteLists'),
    nextLists: readArray(frontmatter, 'nextLists'),
  };
}

function allListIds(): Set<string> {
  return new Set(
    readdirSync(contentRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .flatMap((dir) =>
        readdirSync(join(contentRoot, dir.name), { withFileTypes: true })
          .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
          .map((entry) => readSummary(join(contentRoot, dir.name, entry.name)).id),
      ),
  );
}

describe('Short A reference Skill content roles', () => {
  it('defines the approved optional contentRole schema vocabulary', () => {
    const config = readFileSync(contentConfigPath, 'utf8');

    for (const role of CONTENT_ROLE_VALUES) {
      expect(config).toContain(`'${role}'`);
    }
    expect(config).toContain('.optional()');
  });

  it('preserves legacy entries without requiring contentRole', () => {
    expect(
      readSummary(join(contentRoot, 'grade-level/kindergarten-first-words.md')).contentRole,
    ).toBeUndefined();
  });

  it('marks Kindergarten Short A as a Grade Unit and Short A Words as a Skill', () => {
    expect(readSummary(kindergartenShortAPath)).toMatchObject({
      id: 'kindergarten-short-a-words',
      contentRole: 'grade-unit',
    });
    expect(readSummary(shortASkillPath)).toMatchObject({
      id: 'short-a-words',
      contentRole: 'skill',
    });
  });

  it('keeps the two Short A identities and URL inputs distinct and stable', () => {
    const gradeUnit = readSummary(kindergartenShortAPath);
    const skill = readSummary(shortASkillPath);

    expect(gradeUnit.id).toBe('kindergarten-short-a-words');
    expect(skill.id).toBe('short-a-words');
    expect(gradeUnit.id).not.toBe(skill.id);

    expect(gradeUnit).toMatchObject({
      category: 'phonics',
      urlSlug: 'kindergarten-short-a-words',
    });
    expect(skill).toMatchObject({ category: 'phonics', urlSlug: 'short-a-words' });
  });

  it('keeps Kindergarten Short A in the Kindergarten core roadmap without adding the reusable Skill', () => {
    expect(KINDERGARTEN_CORE_IDS).toContain('kindergarten-short-a-words');
    expect(KINDERGARTEN_CORE_IDS).not.toContain('short-a-words');
  });

  it('keeps the Grade Unit assigned word set inside the 8-16 word range', () => {
    const gradeUnit = readSummary(kindergartenShortAPath);

    expect(gradeUnit.words.length).toBeGreaterThanOrEqual(8);
    expect(gradeUnit.words.length).toBeLessThanOrEqual(16);
  });

  it('keeps modified relationship references resolvable', () => {
    const ids = allListIds();

    for (const entry of [readSummary(kindergartenShortAPath), readSummary(shortASkillPath)]) {
      for (const ref of [...entry.relatedLists, ...entry.prerequisiteLists, ...entry.nextLists]) {
        expect(ids.has(ref), `${entry.id} references ${ref}`).toBe(true);
      }
    }
  });

  it('uses role-aware rendering without requiring every legacy entry to have a role', () => {
    const route = readFileSync(listDetailRoutePath, 'utf8');

    expect(route).toContain("data.contentRole === 'supporting-practice'");
    expect(route).toContain("'Supporting Practice'");
    expect(route).toContain("data.contentRole === 'skill'");
    expect(route).toContain('data.grade');
  });
});

describe('Grade Unit -> Skill relationship model (skillIds)', () => {
  it('models the relationship as an array of Skill ids on the Grade Unit, not a scalar field', () => {
    const config = readFileSync(contentConfigPath, 'utf8');

    expect(config).toContain('skillIds: z.array(z.string())');
    expect(config).not.toContain('conceptSkillId');
  });

  it('links the Kindergarten unit to its canonical Skill via skillIds, resolvable to a real Skill', () => {
    const gradeUnit = readSummary(kindergartenShortAPath);

    expect(gradeUnit.skillIds).toContain('short-a-words');
    expect(allListIds().has('short-a-words')).toBe(true);
  });

  it('computes a Skill curriculum placement from the Grade Unit side, not stored on the Skill', () => {
    // The relationship is one-directional in the schema: skillIds lives on
    // the grade-unit entry; a Skill's placements are a reverse lookup over
    // every grade-unit's skillIds, computed by the template, never authored
    // on the Skill itself.
    const skillFrontmatter = readFrontmatter(shortASkillPath);
    expect(skillFrontmatter).not.toMatch(/^skillIds:/m);

    const route = readFileSync(listDetailRoutePath, 'utf8');
    expect(route).toContain('curriculumPlacements');
    expect(route).toContain('e.data.skillIds.includes(data.id)');
  });

  it('supports zero, one, or several skillIds on a Grade Unit generically (array, not a single id)', () => {
    const config = readFileSync(contentConfigPath, 'utf8');
    // .default([]) is what makes the zero-skill case (e.g. a First Words
    // unit) require no special-casing in content or template code.
    expect(config).toMatch(/skillIds:\s*z\.array\(z\.string\(\)\)\.default\(\[\]\)/);
  });
});

describe('Skill contract: demonstration words, not an assigned list', () => {
  it('keeps the Skill demonstration meaningfully smaller than the Grade Unit assigned set', () => {
    const gradeUnit = readSummary(kindergartenShortAPath);
    const skill = readSummary(shortASkillPath);

    expect(skill.words.length).toBeLessThan(gradeUnit.words.length);
    // A ceiling, not a target: the contract asks for "the smallest purposeful
    // set," not a specific count. This guards against the demonstration
    // creeping back toward assigned-set size, without pinning an exact number.
    expect(skill.words.length).toBeLessThanOrEqual(8);
  });

  it('never curates the Skill demonstration as a copy of the Grade Unit assigned set', () => {
    const gradeUnit = readSummary(kindergartenShortAPath);
    const skill = readSummary(shortASkillPath);

    expect(skill.words).not.toEqual(gradeUnit.words);

    // Purposeful word-level overlap is allowed (a clearest-example word may
    // legitimately anchor both pages); whole-set duplication is not. The
    // demonstration must contain at least one word independently curated
    // for its own teaching purpose, not merely copied from the assignment.
    const overlap = skill.words.filter((word) => gradeUnit.words.includes(word));
    expect(overlap.length).toBeLessThan(skill.words.length);
  });

  it('does not give the Skill readiness signals (Grade Unit sequence position answers readiness; Skills do not)', () => {
    const skill = readFrontmatter(shortASkillPath);
    expect(skill).not.toMatch(/^readinessSignals:/m);
  });

  it('gives the Skill a substantive extractable shortAnswer (the required answer card)', () => {
    const shortAnswer = readScalar(readFrontmatter(shortASkillPath), 'shortAnswer');

    expect(shortAnswer).toBeDefined();
    expect(shortAnswer!.length).toBeGreaterThan(100);
  });

  it('enforces no minimum FAQ count, but requires every present question to be substantive', () => {
    const skill = readFrontmatter(shortASkillPath);
    const answers = [...skill.matchAll(/^\s*answer:\s*"?(.+?)"?\s*$/gm)].map((m) => m[1]);

    // No floor is asserted on question count — the contract explicitly
    // forbids padding to hit a target. Whichever questions exist must each
    // carry a real, non-trivial answer.
    for (const answer of answers) {
      expect(answer.length).toBeGreaterThan(20);
    }
  });
});

describe('Skill contract: no direct practice launch', () => {
  it('keeps the FAQ section exclusive to Skills (Grade Units render none)', () => {
    const unit = readFrontmatter(kindergartenShortAPath);
    expect(unit).not.toMatch(/^faq:/m);
  });

  it('gates the primary practice CTA off for Skill pages in the shared template', () => {
    const route = readFileSync(listDetailRoutePath, 'utf8');

    // The CTA markup is present once, generically, guarded by role -
    // asserting the guard exists (not exact button copy/markup) protects the
    // contract without freezing incidental layout.
    expect(route).toContain('!isSkill &&');
    expect(route).toContain('id="btn-practice"');
  });

  it('keeps curriculum placement cards as the only Skill -> practice route, linking to real Grade Units', () => {
    const route = readFileSync(listDetailRoutePath, 'utf8');
    expect(route).toContain('curriculumPlacements.length > 0');

    // For the reference pair specifically: the Skill must resolve to at
    // least one real, published Grade Unit placement, since a Skill with
    // zero placements has no route into practice at all.
    const gradeUnit = readSummary(kindergartenShortAPath);
    expect(gradeUnit.skillIds).toContain('short-a-words');
  });
});
