import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';
import { getHighFrequencyNeighbors } from './hfWordsSequence';

const expected = [
  {
    id: 'grade-1-high-frequency-words-set-3',
    words: ['why', 'into', 'make', 'get', 'by', 'his', 'how', 'about', 'good', 'her', 'home', 'very'],
    notes: ['his', 'good'],
    contextExamples: 0,
  },
  {
    id: 'grade-1-high-frequency-words-set-4',
    words: ['new', 'him', 'where', 'way', 'now', 'from', 'them', 'your', 'time', 'our', 'give', 'will'],
    notes: ['where', 'your', 'give'],
    contextExamples: 1,
  },
  {
    id: 'grade-1-high-frequency-words-set-5',
    words: ['out', 'up', 'were', 'next', 'want', 'had', 'so', 'some', 'then', 'day', 'find', 'well'],
    notes: ['were', 'want', 'some', 'find'],
    contextExamples: 0,
  },
  {
    id: 'grade-1-high-frequency-words-set-6',
    words: ['more', 'put', 'love', 'than', 'may', 'help', 'most', 'long', 'last', 'still', 'need', 'name'],
    notes: ['put', 'love'],
    contextExamples: 0,
  },
  {
    id: 'grade-1-high-frequency-words-set-7',
    words: ['place', 'part', 'life', 'end', 'left', 'thing', 'hard', 'keep', 'room', 'man', 'top', 'oh'],
    notes: ['place', 'oh'],
    contextExamples: 0,
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

describe('Grade 1 High-Frequency Words Sets 3–7 editorial completion', () => {
  it('preserves every frozen inventory, canonical identity, classification, and route', () => {
    expected.forEach((set, offset) => {
      const source = sourceFor(set.id);
      expect(FROZEN_HF_WORDS_CURRICULUM['1'][offset + 2].words).toEqual(set.words);
      expect(wordsIn(source)).toEqual(set.words);
      expect(source).toContain(`id: ${set.id}`);
      expect(source).toContain('contentRole: high-frequency-word-set');
      expect(source).toContain('category: high-frequency-words');
      expect(getCanonicalGradeRouteById(set.id)).toMatchObject({
        canonicalPath: `/grades/1st-grade/high-frequency-words/set-${offset + 3}`,
        classification: 'high-frequency-words',
      });
    });
  });

  it('keeps structured notes selective and context inventory-driven', () => {
    for (const set of expected) {
      const source = sourceFor(set.id);
      const notesBlock = source.match(/^hfwWordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
      expect([...notesBlock.matchAll(/^  - word: "([^"]+)"$/gm)].map((match) => match[1])).toEqual(
        set.notes,
      );
      expect(set.notes.length).toBeLessThan(set.words.length);
      expect(notesBlock.match(/^    contextExample:/gm) ?? []).toHaveLength(set.contextExamples);
      expect(notesBlock).not.toContain('pronunciationNote:');
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

  it('keeps Grade 1 adjacency, terminal behavior, and gateway linkage', () => {
    expected.forEach((set, offset) => {
      expect(getHighFrequencyNeighbors(set.id)).toEqual({
        previousId: `grade-1-high-frequency-words-set-${offset + 2}`,
        nextId: offset === expected.length - 1 ? undefined : expected[offset + 1].id,
      });
    });

    const renderer = readFileSync(
      new URL('../../pages/[gradeSlug]/[strand]/[slug].astro', import.meta.url),
      'utf8',
    );
    expect(renderer).toContain('All ${gradeHubForBreadcrumb.label} High-Frequency Words');
  });
});
