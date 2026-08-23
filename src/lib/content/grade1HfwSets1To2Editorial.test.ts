import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';
import { getHighFrequencyNeighbors } from './hfWordsSequence';

const expected = [
  {
    id: 'grade-1-high-frequency-words-set-1',
    path: '/grades/1st-grade/high-frequency-words/set-1',
    words: ['of', 'said', 'have', 'they', 'one', 'all', 'after', 'an', 'what', 'down', 'or', 'but'],
    notes: ['of', 'said', 'have', 'one', 'what'],
  },
  {
    id: 'grade-1-high-frequency-words-set-2',
    path: '/grades/1st-grade/high-frequency-words/set-2',
    words: ['as', 'when', 'back', 'just', 'did', 'if', 'who', 'over', 'us', 'no', 'ask', 'has'],
    notes: ['who', 'over'],
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

describe('Grade 1 High-Frequency Words Sets 1–2 editorial pilot', () => {
  it('preserves each frozen inventory, canonical identity, classification, and route', () => {
    expected.forEach((set, index) => {
      const source = sourceFor(set.id);
      expect(FROZEN_HF_WORDS_CURRICULUM['1'][index].words).toEqual(set.words);
      expect(wordsIn(source)).toEqual(set.words);
      expect(source).toContain(`id: ${set.id}`);
      expect(source).toContain('contentRole: high-frequency-word-set');
      expect(source).toContain('category: high-frequency-words');
      expect(getCanonicalGradeRouteById(set.id)).toMatchObject({
        canonicalPath: set.path,
        classification: 'high-frequency-words',
      });
    });
  });

  it('keeps the deliberate structured-note population selective', () => {
    for (const set of expected) {
      const source = sourceFor(set.id);
      const notesBlock = source.match(/^hfwWordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
      expect(
        [...notesBlock.matchAll(/^  - word: "([^"]+)"$/gm)].map((match) => match[1]),
      ).toEqual(set.notes);
      expect(set.notes.length).toBeLessThan(set.words.length);
      expect(notesBlock).not.toContain('contextExample:');
      expect(notesBlock).not.toContain('pronunciationNote:');
    }
  });

  it('does not restore obsolete terminology or duplicate renderer-owned sections', () => {
    for (const set of expected) {
      const source = sourceFor(set.id);
      expect(source).not.toMatch(/heart-words|Heart part:|Sight Words|Common Words/i);
      expect(source).not.toContain('What to notice when spelling these words');
      expect(source).not.toContain('Practice and review');
      expect(source).not.toContain('retrieve it again later');
      expect(source).not.toContain('begin the next set');
    }
  });

  it('keeps navigation inside the Grade 1 HFW sequence and links to its gateway', () => {
    expect(getHighFrequencyNeighbors(expected[0].id)).toEqual({
      previousId: undefined,
      nextId: expected[1].id,
    });
    expect(getHighFrequencyNeighbors(expected[1].id)).toEqual({
      previousId: expected[0].id,
      nextId: 'grade-1-high-frequency-words-set-3',
    });

    const renderer = readFileSync(
      new URL('../../pages/[gradeSlug]/[strand]/[slug].astro', import.meta.url),
      'utf8',
    );
    expect(renderer).toContain('All ${gradeHubForBreadcrumb.label} High-Frequency Words');
  });
});
