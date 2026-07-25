import { describe, expect, it } from 'vitest';
import type { SpellingListEntry } from './spellingLists';
import { buildGradeUnitSequence } from './gradeUnitSequence';

function makeEntry(
  id: string,
  grade: string,
  order: number,
  contentRole?: string,
): SpellingListEntry {
  return {
    data: { id, grade, order, contentRole, status: 'published', category: 'phonics' },
  } as unknown as SpellingListEntry;
}

describe('buildGradeUnitSequence', () => {
  it('keeps only grade-unit ids, in curated order within each grade, K before Grade 1', () => {
    const entries = [
      makeEntry('kindergarten-short-i-words', 'K', 2, 'grade-unit'),
      makeEntry('kindergarten-short-a-words', 'K', 1, 'grade-unit'),
      makeEntry('kindergarten-heart-words', 'K', 3, 'skill'), // not a grade-unit
      makeEntry('grade-1-cvc-short-vowels-c-k-rule', '1', 1, 'grade-unit'),
      makeEntry('grade-1-floss-rule', '1', 2, 'grade-unit'),
    ];

    const sequence = buildGradeUnitSequence(entries);

    expect(sequence).toEqual([
      'kindergarten-short-a-words',
      'kindergarten-short-i-words',
      'grade-1-cvc-short-vowels-c-k-rule',
      'grade-1-floss-rule',
    ]);
  });

  it('orders by curated array position, not frontmatter order or alphabetical', () => {
    const entries = [
      // Frontmatter order is reversed and alphabetically reversed relative to curated order.
      makeEntry('kindergarten-short-u-words', 'K', 1, 'grade-unit'),
      makeEntry('kindergarten-short-a-words', 'K', 2, 'grade-unit'),
    ];

    const sequence = buildGradeUnitSequence(entries);

    // Curated order (KINDERGARTEN_CORE_IDS) places short-a before short-u.
    expect(sequence).toEqual(['kindergarten-short-a-words', 'kindergarten-short-u-words']);
  });

  it('appends an orphaned grade-unit id (absent from the curated progression array) at the end of its grade, sorted by order', () => {
    const entries = [
      makeEntry('kindergarten-short-a-words', 'K', 1, 'grade-unit'),
      makeEntry('kindergarten-brand-new-unit', 'K', 2, 'grade-unit'), // not in KINDERGARTEN_CORE_IDS/ADDITIONAL_IDS
    ];

    const sequence = buildGradeUnitSequence(entries);

    expect(sequence).toEqual(['kindergarten-short-a-words', 'kindergarten-brand-new-unit']);
  });

  it('falls back to order-sorted published entries for a grade with no curated progression file', () => {
    const entries = [
      makeEntry('grade-4-list-b', '4', 2, 'grade-unit'),
      makeEntry('grade-4-list-a', '4', 1, 'grade-unit'),
    ];

    const sequence = buildGradeUnitSequence(entries);

    expect(sequence).toEqual(['grade-4-list-a', 'grade-4-list-b']);
  });

  it('keeps only the Grade 3 combined-roadmap-entry anchor, not its skill-role siblings', () => {
    const entries = [
      makeEntry('grade-3-prefix-words', '3', 4, 'grade-unit'),
      makeEntry('grade-3-suffix-words', '3', 5, 'grade-unit'),
      makeEntry('grade-3-dropping-silent-e', '3', 6, 'grade-unit'),
      makeEntry('grade-3-doubling-final-consonants', '3', 7, 'skill'),
      makeEntry('grade-3-changing-y-to-i', '3', 8, 'skill'),
      makeEntry('grade-3-possessives', '3', 8.5, 'grade-unit'),
      makeEntry('grade-3-multisyllabic-words', '3', 9, 'grade-unit'),
      makeEntry('grade-3-homophones', '3', 10, 'grade-unit'),
      makeEntry('grade-3-root-word-families', '3', 11, 'grade-unit'),
    ];

    const sequence = buildGradeUnitSequence(entries);

    expect(sequence).toEqual([
      'grade-3-prefix-words',
      'grade-3-suffix-words',
      'grade-3-dropping-silent-e',
      'grade-3-possessives',
      'grade-3-multisyllabic-words',
      'grade-3-homophones',
      'grade-3-root-word-families',
    ]);
  });

  it('returns an empty sequence when there are no grade-unit entries', () => {
    const entries = [makeEntry('kindergarten-heart-words', 'K', 1, 'skill')];
    expect(buildGradeUnitSequence(entries)).toEqual([]);
  });
});
