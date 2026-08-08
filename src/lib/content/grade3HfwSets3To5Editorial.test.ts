import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';
import { getHighFrequencyNeighbors } from './hfWordsSequence';

const expected = [
  {
    id: 'grade-3-high-frequency-words-set-3',
    words: [
      'practice',
      'early',
      'against',
      'built',
      'even',
      'able',
      'heard',
      'difficult',
      'ever',
      'become',
      'especially',
      'later',
    ],
    notes: ['practice', 'against', 'built', 'difficult', 'especially'],
    contextExamples: 0,
    pronunciationNotes: 0,
  },
  {
    id: 'grade-3-high-frequency-words-set-4',
    words: [
      'world',
      'believe',
      'finally',
      'might',
      'sometimes',
      'follow',
      'probably',
      'nothing',
      'usually',
      'really',
      'actually',
      'once',
    ],
    notes: ['world', 'believe', 'probably', 'once'],
    contextExamples: 0,
    pronunciationNotes: 0,
  },
  {
    id: 'grade-3-high-frequency-words-set-5',
    words: [
      'remember',
      'instead',
      'while',
      'weather',
      'study',
      'certain',
      'during',
      'such',
      'money',
      "I'm",
      "it's",
      "don't",
    ],
    notes: ['weather', 'certain', 'money', "I'm", "it's"],
    contextExamples: 2,
    pronunciationNotes: 0,
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

describe('Grade 3 High-Frequency Words Sets 3–5 editorial completion', () => {
  it('preserves frozen inventories, identities, classifications, and routes', () => {
    expected.forEach((set, offset) => {
      const source = sourceFor(set.id);
      expect(FROZEN_HF_WORDS_CURRICULUM['3'][offset + 2].words).toEqual(set.words);
      expect(wordsIn(source)).toEqual(set.words);
      expect(source).toContain(`id: ${set.id}`);
      expect(source).toContain('contentRole: high-frequency-word-set');
      expect(source).toContain('category: high-frequency-words');
      expect(getCanonicalGradeRouteById(set.id)).toMatchObject({
        canonicalPath: `/3rd-grade/high-frequency-words/set-${offset + 3}`,
        classification: 'high-frequency-words',
      });
    });
  });

  it('keeps structured fields selective, valid, and inventory-driven', () => {
    for (const set of expected) {
      const notesBlock =
        sourceFor(set.id).match(/^hfwWordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
      const noteWords = [...notesBlock.matchAll(/^  - word: "([^"]+)"$/gm)].map(
        (match) => match[1],
      );
      expect(noteWords).toEqual(set.notes);
      expect(noteWords.every((word) => (set.words as readonly string[]).includes(word))).toBe(true);
      expect(noteWords.length).toBeLessThan(set.words.length);
      expect(notesBlock.match(/^    contextExample:/gm) ?? []).toHaveLength(
        set.contextExamples,
      );
      expect(notesBlock.match(/^    pronunciationNote:/gm) ?? []).toHaveLength(
        set.pronunciationNotes,
      );
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

  it('keeps Grade 3 adjacency, terminal behavior, and gateway linkage', () => {
    expected.forEach((set, offset) => {
      expect(getHighFrequencyNeighbors(set.id)).toEqual({
        previousId: `grade-3-high-frequency-words-set-${offset + 2}`,
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
