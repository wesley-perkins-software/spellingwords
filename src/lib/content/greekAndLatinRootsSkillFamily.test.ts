import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CURATED_SPELLING_SKILL_IDS, GREEK_AND_LATIN_ROOTS_SKILL_FAMILY } from './spellingSkills';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');

function readFile(dir: string, id: string): string {
  return readFileSync(join(contentRoot, dir, `${id}.md`), 'utf8');
}

function extractQuotedArray(source: string, field: string): string[] {
  const match = source.match(new RegExp(`^${field}: \\[(.*)\\]$`, 'm'));
  if (!match) return [];
  const inner = match[1].trim();
  if (inner === '') return [];
  return inner.split(',').map((entry) => entry.trim().replace(/^"|"$/g, ''));
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

  it('declares relationship fields that resolve to real, live canonical Skills, not Grade Unit ids, with no duplicates', () => {
    const source = readFile('grade-level', 'greek-and-latin-roots');
    const related = extractQuotedArray(source, 'relatedLists');
    const prerequisite = extractQuotedArray(source, 'prerequisiteLists');
    const next = extractQuotedArray(source, 'nextLists');

    for (const field of [related, prerequisite, next]) {
      expect(new Set(field).size).toBe(field.length);
      for (const id of field) {
        expect(CURATED_SPELLING_SKILL_IDS).toContain(id);
      }
    }
  });

  it('has its curriculum placement backed by the Grade 4 Latin root unit', () => {
    const latinUnit = readFile('grade-level', 'tier-1-roots-and-patterns');
    expect(extractQuotedArray(latinUnit, 'skillIds')).toContain('greek-and-latin-roots');
  });
});
