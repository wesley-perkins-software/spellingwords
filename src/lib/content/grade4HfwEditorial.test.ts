import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';
import { getHighFrequencyNeighbors } from './hfWordsSequence';

const expected = [
  {
    id: 'grade-4-high-frequency-words-set-1',
    words: [
      'important',
      'example',
      'understand',
      'happened',
      'straight',
      'possible',
      'idea',
      'among',
      'known',
      'general',
      'quite',
      'several',
    ],
    notes: ['straight', 'possible', 'idea', 'known', 'quite'],
    contextExamples: 1,
  },
  {
    id: 'grade-4-high-frequency-words-set-2',
    words: [
      'since',
      'whether',
      'include',
      'sure',
      'though',
      'within',
      'whole',
      'written',
      'common',
      'reason',
      'course',
      'however',
    ],
    notes: ['whether', 'sure', 'though', 'whole', 'written'],
    contextExamples: 2,
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

describe('Grade 4 High-Frequency Words editorial completion', () => {
  it('preserves frozen inventories, identities, classifications, and canonical routes', () => {
    expected.forEach((set, index) => {
      const source = sourceFor(set.id);
      expect(FROZEN_HF_WORDS_CURRICULUM['4'][index].words).toEqual(set.words);
      expect(wordsIn(source)).toEqual(set.words);
      expect(source).toContain(`id: ${set.id}`);
      expect(source).toContain('contentRole: high-frequency-word-set');
      expect(source).toContain('category: high-frequency-words');
      expect(getCanonicalGradeRouteById(set.id)).toMatchObject({
        canonicalPath: `/grades/4th-grade/high-frequency-words/set-${index + 1}`,
        classification: 'high-frequency-words',
      });
    });
  });

  it('keeps optional structured fields selective, valid, and inventory-driven', () => {
    for (const set of expected) {
      const notesBlock =
        sourceFor(set.id).match(/^hfwWordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
      const noteWords = [...notesBlock.matchAll(/^  - word: "([^"]+)"$/gm)].map(
        (match) => match[1],
      );
      expect(noteWords).toEqual(set.notes);
      expect(
        noteWords.every((word) => (set.words as readonly string[]).includes(word)),
      ).toBe(true);
      expect(noteWords.length).toBeLessThan(set.words.length);
      expect(notesBlock.match(/^    contextExample:/gm) ?? []).toHaveLength(
        set.contextExamples,
      );
      expect(notesBlock).not.toContain('pronunciationNote:');
      expect(notesBlock).not.toMatch(/^    contextExample: "\s/m);
    }
  });

  it('excludes obsolete terminology and renderer-owned or shared copy', () => {
    for (const set of expected) {
      const source = sourceFor(set.id);
      expect(source).not.toMatch(/heart-words|Heart part:|Sight Words|Common Words/i);
      expect(source).not.toContain('What to notice when spelling these words');
      expect(source).not.toContain('Practice and review');
      expect(source).not.toContain('retrieve it again later');
      expect(source).not.toContain('begin the next set');
    }
  });

  it('keeps Grade 4 adjacency, terminal behavior, and gateway linkage', () => {
    expect(getHighFrequencyNeighbors(expected[0].id)).toEqual({
      previousId: undefined,
      nextId: expected[1].id,
    });
    expect(getHighFrequencyNeighbors(expected[1].id)).toEqual({
      previousId: expected[0].id,
      nextId: undefined,
    });

    const renderer = readFileSync(
      new URL('../../pages/[gradeSlug]/[strand]/[slug].astro', import.meta.url),
      'utf8',
    );
    expect(renderer).toContain('All ${gradeHubForBreadcrumb.label} High-Frequency Words');
  });
});
