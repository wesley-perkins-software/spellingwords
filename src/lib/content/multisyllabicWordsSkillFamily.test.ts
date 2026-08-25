import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CURATED_SPELLING_SKILL_IDS, MULTISYLLABIC_WORDS_SKILL_FAMILY } from './spellingSkills';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');

const curriculumSources = [
  ['phonics', 'grade-1-open-syllables-final-y'],
  ['phonics', 'grade-2-two-syllable-words'],
  ['phonics', 'grade-2-final-stable-le'],
  ['grade-level', '3rd-grade-multisyllabic-words'],
  ['grade-level', '4th-grade-multisyllabic-academic-words'],
  ['grade-level', '5th-grade-multisyllabic-academic-words'],
] as const;

function readFile(id: string): string {
  const filePath = join(contentRoot, 'phonics', `${id}.md`);
  return readFileSync(filePath, 'utf8');
}

describe('Multisyllabic Words Skill Family', () => {
  it('is a single-skill family with exactly one direct destination', () => {
    expect(MULTISYLLABIC_WORDS_SKILL_FAMILY.skillIds).toEqual(['multisyllabic-words']);
  });

  it('is part of the curated Skill id list', () => {
    expect(CURATED_SPELLING_SKILL_IDS).toContain('multisyllabic-words');
  });

  it('is marked as a reusable, published Skill with a stable id and slug', () => {
    const source = readFile('multisyllabic-words');
    expect(source).toMatch(/^id: multisyllabic-words$/m);
    expect(source).toMatch(/^urlSlug: multisyllabic-words$/m);
    expect(source).toMatch(/^contentRole: skill$/m);
    expect(source).toMatch(/^status: published$/m);
    expect(source).not.toMatch(/^readinessSignals:/m);
  });

  it('includes required named sections for Open Syllables and Consonant-LE', () => {
    const source = readFile('multisyllabic-words');
    // These are the only exact section names required by the frozen taxonomy.
    expect(source).toMatch(/^## Open Syllables$/m);
    expect(source).toMatch(/^## Words Ending in Consonant-LE$/m);
  });

  it('keeps every source page a Grade Unit and gives the Skill curriculum placement', () => {
    for (const [directory, id] of curriculumSources) {
      const source = readFileSync(join(contentRoot, directory, `${id}.md`), 'utf8');
      expect(source, id).toMatch(/^contentRole: grade-unit$/m);
      expect(source, id).toMatch(/^skillIds: .*['"]multisyllabic-words['"]/m);
    }
  });

  it('uses only resolvable canonical Skill relationships without duplicates', () => {
    const source = readFile('multisyllabic-words');
    const relationshipLine = source.match(/^relatedLists: \[(.*)\]$/m)?.[1] ?? '';
    const relationships = [...relationshipLine.matchAll(/['"]([^'"]+)['"]/g)].map(
      (match) => match[1]
    );

    expect(relationships).toEqual(['r-controlled-er-ir-ur', 'common-suffixes', 'compound-words']);
    expect(new Set(relationships).size).toBe(relationships.length);
    for (const id of relationships) {
      expect(CURATED_SPELLING_SKILL_IDS, id).toContain(id);
    }
  });
});
