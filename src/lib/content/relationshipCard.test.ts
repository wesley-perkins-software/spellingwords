import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { SpellingListEntry } from './spellingLists';
import { GRADE_5_HUB_SECTIONS } from './gradeHubCards';
import { getRelationshipCardModel } from './relationshipCard';

function canonicalEntry(relativePath: string): SpellingListEntry {
  const source = readFileSync(join(process.cwd(), 'src/content/spelling-lists', relativePath), 'utf8');
  const title = source.match(/^title:\s*["'](.+)["']$/m)?.[1];
  const grade = source.match(/^grade:\s*["'](.+)["']$/m)?.[1];
  if (!title || !grade) throw new Error(`Missing title or grade in ${relativePath}`);
  return { data: { title, grade, words: Array(12).fill('word') } } as unknown as SpellingListEntry;
}

describe('Core relationship-card labels', () => {
  it('uses the destination canonical title verbatim and renders grade separately', () => {
    const multisyllabic = canonicalEntry('grade-level/5th-grade-multisyllabic-academic-words.md');
    const roots = canonicalEntry('grade-level/5th-grade-greek-latin-word-parts.md');

    expect(getRelationshipCardModel(multisyllabic)).toEqual({
      canonicalTitle: 'Multisyllabic Academic Words',
      gradeLabel: 'Grade 5',
      wordCount: 12,
    });
    expect(getRelationshipCardModel(roots)).toEqual({
      canonicalTitle: 'Greek and Latin Word Parts',
      gradeLabel: 'Grade 5',
      wordCount: 12,
    });
  });

  it('uses the same separate grade-label rule for same-grade and cross-grade cards', () => {
    const kindergarten = canonicalEntry('phonics/kindergarten-short-a-words.md');
    expect(getRelationshipCardModel(kindergarten).canonicalTitle).toBe('Short A Words');
    expect(getRelationshipCardModel(kindergarten).gradeLabel).toBe('Kindergarten');
  });

  it('preserves intentionally customized Grade Hub display titles', () => {
    const coreCards = GRADE_5_HUB_SECTIONS[0].cards;
    expect(coreCards.find((card) => card.id === 'grade-5-multisyllabic-academic-words')?.title).toBe(
      'Advanced Multisyllabic Academic Words',
    );
    expect(coreCards.find((card) => card.id === 'grade-5-greek-latin-word-parts')?.title).toBe(
      'Greek and Latin Word Parts',
    );
  });
});
