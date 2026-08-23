import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';
import { getHighFrequencyNeighbors } from './hfWordsSequence';

const expected = [
  {
    id: 'kindergarten-high-frequency-words-set-2',
    path: '/grades/kindergarten/high-frequency-words/set-2',
    words: ['he', 'we', 'me', 'my', 'go', 'to', 'you', 'be', 'on', 'not'],
    notes: ['my', 'to', 'you'],
  },
  {
    id: 'kindergarten-high-frequency-words-set-3',
    path: '/grades/kindergarten/high-frequency-words/set-3',
    words: [
      'she',
      'do',
      'like',
      'for',
      'was',
      'are',
      'see',
      'this',
      'that',
      'here',
    ],
    notes: ['do', 'like', 'was', 'are', 'here'],
  },
  {
    id: 'kindergarten-high-frequency-words-set-4',
    path: '/grades/kindergarten/high-frequency-words/set-4',
    words: [
      'come',
      'look',
      'with',
      'two',
      'play',
      'old',
      'big',
      'yes',
      'let',
      'got',
    ],
    notes: ['come', 'look', 'two', 'play', 'old'],
  },
] as const;

function sourceFor(id: string): string {
  return readFileSync(
    new URL(
      `../../content/spelling-lists/high-frequency-words/${id}.md`,
      import.meta.url,
    ),
    'utf8',
  );
}

function wordsIn(source: string): string[] {
  const block = source.match(/^words:\n([\s\S]*?)^---$/m)?.[1] ?? '';
  return [...block.matchAll(/^  - "([^"]+)"$/gm)].map((match) => match[1]);
}

describe('Kindergarten High-Frequency Words Sets 2–4 editorial batch', () => {
  it('preserves each frozen inventory, canonical identity, metadata, and route', () => {
    expected.forEach((set, index) => {
      const source = sourceFor(set.id);
      expect(FROZEN_HF_WORDS_CURRICULUM.K[index + 1].words).toEqual(set.words);
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

  it('uses selective notes and exposes context only where meaning identifies the word', () => {
    expected.forEach((set) => {
      const source = sourceFor(set.id);
      const notesBlock =
        source.match(/^hfwWordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
      expect(
        [...notesBlock.matchAll(/^  - word: "([^"]+)"$/gm)].map(
          (match) => match[1],
        ),
      ).toEqual(set.notes);
      expect(set.notes.length).toBeLessThan(set.words.length);
      expect((notesBlock.match(/contextExample:/g) ?? []).length).toBe(
        set.id.endsWith('set-4') ? 1 : 0,
      );
    });
  });

  it('does not restore legacy material or duplicate renderer-owned sections', () => {
    for (const set of expected) {
      const source = sourceFor(set.id);
      expect(source).not.toMatch(
        /heart-words|Heart part:|Sight Words|Common Words/i,
      );
      expect(source).not.toContain('What to notice when spelling these words');
      expect(source).not.toContain('Practice and review');
      expect(source).not.toContain('retrieve it again later');
      expect(source).not.toContain('begin the next set');
    }
  });

  it('keeps navigation inside Kindergarten and terminates Set 4', () => {
    expect(getHighFrequencyNeighbors(expected[0].id)).toEqual({
      previousId: 'kindergarten-high-frequency-words-set-1',
      nextId: 'kindergarten-high-frequency-words-set-3',
    });
    expect(getHighFrequencyNeighbors(expected[1].id)).toEqual({
      previousId: 'kindergarten-high-frequency-words-set-2',
      nextId: 'kindergarten-high-frequency-words-set-4',
    });
    expect(getHighFrequencyNeighbors(expected[2].id)).toEqual({
      previousId: 'kindergarten-high-frequency-words-set-3',
      nextId: undefined,
    });
  });
});
