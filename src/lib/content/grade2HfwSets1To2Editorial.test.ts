import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';
import { getHighFrequencyNeighbors } from './hfWordsSequence';

const expected = [
  {
    id: 'grade-2-high-frequency-words-set-1',
    path: '/2nd-grade/high-frequency-words/set-1',
    words: [
      'again',
      'any',
      'many',
      'could',
      'there',
      'every',
      'people',
      'know',
      'their',
      'first',
      'would',
      'going',
    ],
    notes: ['again', 'every', 'people', 'know', 'there', 'their'],
    contextExamples: 2,
  },
  {
    id: 'grade-2-high-frequency-words-set-2',
    path: '/2nd-grade/high-frequency-words/set-2',
    words: [
      'should',
      'because',
      'little',
      'around',
      'been',
      'does',
      'school',
      'book',
      'best',
      'both',
      'which',
      'these',
    ],
    notes: ['should', 'because', 'little', 'been', 'does', 'these'],
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

describe('Grade 2 High-Frequency Words Sets 1–2 editorial pilot', () => {
  it('preserves each frozen inventory, canonical identity, classification, and route', () => {
    expected.forEach((set, index) => {
      const source = sourceFor(set.id);
      expect(FROZEN_HF_WORDS_CURRICULUM['2'][index].words).toEqual(set.words);
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

  it('keeps the approved note population selective and context inventory-driven', () => {
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

  it('keeps semantic context examples optional and lets the renderer present them as sentences', () => {
    const set1Source = sourceFor(expected[0].id);
    const set2Source = sourceFor(expected[1].id);
    expect(set1Source).toContain('contextExample: "Put the book over there."');
    expect(set1Source).toContain('contextExample: "The children packed their lunches."');
    expect(set1Source).not.toMatch(/^\s+contextExample: "\s/m);
    expect(set2Source).not.toContain('contextExample:');

    const schema = readFileSync(new URL('../../content/config.ts', import.meta.url), 'utf8');
    expect(schema).toContain('contextExample: z.string().optional()');

    const renderer = readFileSync(
      new URL('../../pages/[gradeSlug]/[strand]/[slug].astro', import.meta.url),
      'utf8',
    );
    expect(renderer).toMatch(/>In a sentence:<\/strong>\{' '\}\s*\{item\.contextExample\}/);
    expect(renderer).not.toContain('In context:');
    expect(renderer).not.toContain('In a sentence:</strong> {item.contextExample}');
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

  it('keeps Grade 2 adjacency and gateway linkage', () => {
    expect(getHighFrequencyNeighbors(expected[0].id)).toEqual({
      previousId: undefined,
      nextId: expected[1].id,
    });
    expect(getHighFrequencyNeighbors(expected[1].id)).toEqual({
      previousId: expected[0].id,
      nextId: 'grade-2-high-frequency-words-set-3',
    });

    const renderer = readFileSync(
      new URL('../../pages/[gradeSlug]/[strand]/[slug].astro', import.meta.url),
      'utf8',
    );
    expect(renderer).toContain('All {gradeHubForBreadcrumb.label} High-Frequency Words');
  });
});
