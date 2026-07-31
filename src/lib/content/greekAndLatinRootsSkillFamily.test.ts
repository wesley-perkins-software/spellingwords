import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CURATED_SPELLING_SKILL_IDS, GREEK_AND_LATIN_ROOTS_SKILL_FAMILY } from './spellingSkills';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');

function readFile(dir: string, id: string): string {
  return readFileSync(join(contentRoot, dir, `${id}.md`), 'utf8');
}

describe('Greek and Latin Roots Skill Family', () => {
  it('is a single-skill family with exactly one direct destination', () => {
    expect(GREEK_AND_LATIN_ROOTS_SKILL_FAMILY.skillIds).toEqual(['greek-and-latin-roots']);
  });

  it('is part of the curated Skill id list', () => {
    expect(CURATED_SPELLING_SKILL_IDS).toContain('greek-and-latin-roots');
  });

  it('is marked as a reusable, published Skill with a stable id and slug, not renamed per the frozen doc', () => {
    const source = readFile('grade-level', 'greek-and-latin-roots');
    expect(source).toMatch(/^id: greek-and-latin-roots$/m);
    expect(source).toMatch(/^urlSlug: greek-and-latin-roots$/m);
    expect(source).toMatch(/^title: "Greek and Latin Roots"$/m);
    expect(source).toMatch(/^contentRole: skill$/m);
    expect(source).toMatch(/^status: published$/m);
  });

  it('reverted tier-2-greek-latin-roots.md to grade-unit (folded into the merged Skill instead of standing alone)', () => {
    const source = readFile('grade-level', 'tier-2-greek-latin-roots');
    expect(source).toMatch(/^contentRole: grade-unit$/m);
    expect(CURATED_SPELLING_SKILL_IDS).not.toContain('tier-2-greek-latin-roots');
  });
});
