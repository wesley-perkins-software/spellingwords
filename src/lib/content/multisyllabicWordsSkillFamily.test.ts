import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CURATED_SPELLING_SKILL_IDS, MULTISYLLABIC_WORDS_SKILL_FAMILY } from './spellingSkills';

const contentRoot = join(process.cwd(), 'src/content/spelling-lists');

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
    expect(source).toMatch(/open syllable/i);
    expect(source).toMatch(/final stable -le|consonant-le/i);
  });

  it('leaves the source grade-unit chain untouched', () => {
    for (const id of ['grade-2-two-syllable-words', 'grade-2-final-stable-le']) {
      const source = readFile(id);
      expect(source, id).toMatch(/^contentRole: grade-unit$/m);
    }
  });
});
