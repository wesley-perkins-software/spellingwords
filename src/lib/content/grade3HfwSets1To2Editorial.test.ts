import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';
import { getHighFrequencyNeighbors } from './hfWordsSequence';

const expected = [
  {
    id: 'grade-3-high-frequency-words-set-1',
    words: [
      'always',
      'friend',
      'family',
      'another',
      'children',
      'everyone',
      'different',
      'question',
      'something',
      'enough',
      'without',
      'through',
    ],
    notes: ['friend', 'family', 'children', 'different', 'question'],
    pronunciationNotes: 0,
  },
  {
    id: 'grade-3-high-frequency-words-set-2',
    words: [
      'thought',
      'often',
      'across',
      'brought',
      'subject',
      'already',
      'above',
      'also',
      'below',
      'caught',
      'better',
      'toward',
    ],
    notes: ['often', 'subject', 'already'],
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

describe('Grade 3 High-Frequency Words Sets 1–2 editorial pilot', () => {
  it('preserves frozen inventories, identities, classifications, and routes', () => {
    expected.forEach((set, index) => {
      const source = sourceFor(set.id);
      expect(FROZEN_HF_WORDS_CURRICULUM['3'][index].words).toEqual(set.words);
      expect(wordsIn(source)).toEqual(set.words);
      expect(source).toContain(`id: ${set.id}`);
      expect(source).toContain('contentRole: high-frequency-word-set');
      expect(source).toContain('category: high-frequency-words');
      expect(getCanonicalGradeRouteById(set.id)).toMatchObject({
        canonicalPath: `/3rd-grade/high-frequency-words/set-${index + 1}`,
        classification: 'high-frequency-words',
      });
    });
  });

  it('keeps structured notes selective, valid, and inventory-driven', () => {
    for (const set of expected) {
      const source = sourceFor(set.id);
      const notesBlock = source.match(/^hfwWordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
      const noteWords = [...notesBlock.matchAll(/^  - word: "([^"]+)"$/gm)].map(
        (match) => match[1],
      );
      expect(noteWords).toEqual(set.notes);
      const inventory = new Set<string>(set.words);
      expect(noteWords.every((word) => inventory.has(word))).toBe(true);
      expect(noteWords.length).toBeLessThan(set.words.length);
      expect(notesBlock.match(/^    pronunciationNote:/gm) ?? []).toHaveLength(
        set.pronunciationNotes,
      );
      expect(notesBlock).not.toContain('contextExample:');
      expect(notesBlock).not.toMatch(/^    contextExample: "\s/m);
    }
  });

  it('excludes obsolete terminology and renderer-owned copy', () => {
    for (const set of expected) {
      const source = sourceFor(set.id);
      expect(source).not.toMatch(/heart-words|Heart part:|Sight Words|Common Words/i);
      expect(source).not.toContain('What to notice when spelling these words');
      expect(source).not.toContain('Practice and review');
      expect(source).not.toContain('retrieve it again later');
      expect(source).not.toContain('begin the next set');
    }
  });

  it('keeps Grade 3 adjacency and gateway linkage', () => {
    expect(getHighFrequencyNeighbors(expected[0].id)).toEqual({
      previousId: undefined,
      nextId: expected[1].id,
    });
    expect(getHighFrequencyNeighbors(expected[1].id)).toEqual({
      previousId: expected[0].id,
      nextId: 'grade-3-high-frequency-words-set-3',
    });

    const renderer = readFileSync(
      new URL('../../pages/[gradeSlug]/[strand]/[slug].astro', import.meta.url),
      'utf8',
    );
    expect(renderer).toContain('All {gradeHubForBreadcrumb.label} High-Frequency Words');
  });
});
