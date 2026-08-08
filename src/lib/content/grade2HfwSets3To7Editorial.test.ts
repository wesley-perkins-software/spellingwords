import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';
import { getHighFrequencyNeighbors } from './hfWordsSequence';

const expected = [
  {
    id: 'grade-2-high-frequency-words-set-3',
    words: ['before', 'goes', 'gave', 'word', 'story', 'great', 'those', 'its', 'between', 'under', 'made', 'found'],
    notes: ['goes', 'word', 'great', 'its'],
    contextExamples: 1,
    pronunciationNotes: 0,
  },
  {
    id: 'grade-2-high-frequency-words-set-4',
    words: ['answer', 'someone', 'large', 'small', 'own', 'off', 'until', 'almost', 'told', 'began', 'learn', 'never'],
    notes: ['answer', 'large', 'learn'],
    contextExamples: 0,
    pronunciationNotes: 0,
  },
  {
    id: 'grade-2-high-frequency-words-set-5',
    words: ['young', 'kind', 'high', 'light', 'only', 'other', 'together', 'took', 'came', 'say', 'tell', 'three'],
    notes: ['young', 'other', 'together'],
    contextExamples: 0,
    pronunciationNotes: 0,
  },
  {
    id: 'grade-2-high-frequency-words-set-6',
    words: ['away', 'right', 'must', 'use', 'work', 'went', 'done', 'think', 'take', 'too', 'much', 'each'],
    notes: ['use', 'work', 'done', 'too'],
    contextExamples: 1,
    pronunciationNotes: 0,
  },
  {
    id: 'grade-2-high-frequency-words-set-7',
    words: ['same', 'read', 'night', 'water', 'year', 'few', 'show', 'free', 'house', 'set', 'white', 'live'],
    notes: ['read', 'year', 'live'],
    contextExamples: 0,
    pronunciationNotes: 2,
  },
] as const;

function sourceFor(id: string): string {
  return readFileSync(
    new URL(`../../content/spelling-lists/high-frequency-words/${id}.md`, import.meta.url),
    'utf8',
  );
}

function wordsIn(source: string): string[] {
  const block = source.match(/^words:\n([\s\S]*?)^---$/m)?.[1] ?? '';
  return [...block.matchAll(/^  - "([^"]+)"$/gm)].map((match) => match[1]);
}

describe('Grade 2 High-Frequency Words Sets 3–7 editorial completion', () => {
  it('preserves every frozen inventory, canonical identity, classification, and route', () => {
    expected.forEach((set, offset) => {
      const source = sourceFor(set.id);
      expect(FROZEN_HF_WORDS_CURRICULUM['2'][offset + 2].words).toEqual(set.words);
      expect(wordsIn(source)).toEqual(set.words);
      expect(source).toContain(`id: ${set.id}`);
      expect(source).toContain('contentRole: high-frequency-word-set');
      expect(source).toContain('category: high-frequency-words');
      expect(getCanonicalGradeRouteById(set.id)).toMatchObject({
        canonicalPath: `/2nd-grade/high-frequency-words/set-${offset + 3}`,
        classification: 'high-frequency-words',
      });
    });
  });

  it('keeps notes selective and context and pronunciation fields inventory-driven', () => {
    for (const set of expected) {
      const source = sourceFor(set.id);
      const notesBlock = source.match(/^hfwWordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
      expect([...notesBlock.matchAll(/^  - word: "([^"]+)"$/gm)].map((match) => match[1])).toEqual(set.notes);
      expect(set.notes.length).toBeLessThan(set.words.length);
      expect(notesBlock.match(/^    contextExample:/gm) ?? []).toHaveLength(set.contextExamples);
      expect(notesBlock.match(/^    pronunciationNote:/gm) ?? []).toHaveLength(set.pronunciationNotes);
      expect(notesBlock).not.toMatch(/^    contextExample: "\s/m);
    }
  });

  it('excludes obsolete terminology and renderer-owned sections', () => {
    for (const set of expected) {
      const source = sourceFor(set.id);
      expect(source).not.toMatch(/heart-words|Heart part:|Sight Words|Common Words/i);
      expect(source).not.toContain('What to notice when spelling these words');
      expect(source).not.toContain('Practice and review');
      expect(source).not.toContain('retrieve it again later');
      expect(source).not.toContain('begin the next set');
    }
  });

  it('keeps Grade 2 adjacency, terminal behavior, and gateway linkage', () => {
    expected.forEach((set, offset) => {
      expect(getHighFrequencyNeighbors(set.id)).toEqual({
        previousId: `grade-2-high-frequency-words-set-${offset + 2}`,
        nextId: offset === expected.length - 1 ? undefined : expected[offset + 1].id,
      });
    });

    const renderer = readFileSync(
      new URL('../../pages/[gradeSlug]/[strand]/[slug].astro', import.meta.url),
      'utf8',
    );
    expect(renderer).toContain('All {gradeHubForBreadcrumb.label} High-Frequency Words');
  });
});
