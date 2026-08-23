import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { getThemedSpellingPracticeExploreMore } from './themedSpellingPracticeExploreMore';

type BatchPage = {
  id: string;
  title: string;
  path: string;
  words: readonly string[];
  source: string;
  noteWords: readonly string[];
};

function sourceFor(id: string): string {
  return readFileSync(
    new URL(`../../content/spelling-lists/grade-level/${id}.md`, import.meta.url),
    'utf8',
  );
}

function listItems(source: string, blockName: string, nextBlock?: string): string[] {
  const end = nextBlock ? `(?=^${nextBlock}:)` : '(?=^---$)';
  const block = source.match(new RegExp(`^${blockName}:\\n([\\s\\S]*?)${end}`, 'm'))?.[1] ?? '';
  return [...block.matchAll(/^  - (?:word: )?['"]?([^'"\n]+)['"]?$/gm)].map(
    (match) => match[1],
  );
}

const pages: readonly BatchPage[] = [
  {
    id: 'kindergarten-animal-words',
    title: 'Kindergarten Animal Spelling Words',
    path: '/grades/kindergarten/themed-spelling-practice/animal-words',
    words: ['bug', 'cat', 'dog', 'duck', 'fish', 'frog', 'hen', 'pig'],
    source: sourceFor('kindergarten-animal-words'),
    noteWords: [],
  },
  {
    id: 'kindergarten-color-words',
    title: 'Kindergarten Color Spelling Words',
    path: '/grades/kindergarten/themed-spelling-practice/color-words',
    words: ['red', 'blue', 'green', 'yellow', 'black', 'white', 'brown', 'pink'],
    source: sourceFor('kindergarten-color-words'),
    noteWords: ['yellow'],
  },
  {
    id: 'kindergarten-body-words',
    title: 'Kindergarten Body Spelling Words',
    path: '/grades/kindergarten/themed-spelling-practice/body-words',
    words: ['eyes', 'ears', 'nose', 'hand', 'foot', 'arm', 'leg', 'head'],
    source: sourceFor('kindergarten-body-words'),
    noteWords: ['eyes'],
  },
  {
    id: 'kindergarten-number-words',
    title: 'Kindergarten Number Spelling Words',
    path: '/grades/kindergarten/themed-spelling-practice/number-words',
    words: [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
    ],
    source: sourceFor('kindergarten-number-words'),
    noteWords: ['one', 'two'],
  },
  {
    id: 'kindergarten-family-words',
    title: 'Kindergarten Family Spelling Words',
    path: '/grades/kindergarten/themed-spelling-practice/family-words',
    words: ['mom', 'dad', 'sister', 'brother', 'baby', 'grandma', 'grandpa', 'family'],
    source: sourceFor('kindergarten-family-words'),
    noteWords: [],
  },
];

describe('Kindergarten Themed Spelling Practice production batch', () => {
  it.each(pages)('preserves the frozen identity and inventory for $id', (page) => {
    expect(page.source).toContain(`id: ${page.id}`);
    expect(page.source).toContain(`urlSlug: ${page.id}`);
    expect(page.source).toContain(`title: '${page.title}'`);
    expect(page.source).toContain("grade: 'K'");
    expect(page.source).toContain('contentRole: vocabulary-theme');
    expect(listItems(page.source, 'words')).toEqual(page.words);
    expect(getCanonicalGradeRouteById(page.id)).toMatchObject({
      canonicalPath: page.path,
      classification: 'themed-spelling-practice',
      grade: 'K',
    });
  });

  it.each(pages)('keeps notes selective and limited to words in $id', (page) => {
    const noteWords = listItems(page.source, 'wordNotes', 'words');
    expect(noteWords).toEqual(page.noteWords);
    expect(noteWords.length).toBeLessThan(page.words.length);
    expect(noteWords.every((word) => page.words.includes(word))).toBe(true);
    const noteBlock = page.source.match(/^wordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
    expect(noteBlock).not.toContain('contextExample:');
    expect(noteBlock).not.toContain('pronunciationNote:');
  });

  it.each(pages)('leaves renderer-owned regions out of $id', (page) => {
    expect(page.source).not.toMatch(/Sight Words|Common Words|Heart Words|heart-words/i);
    expect(page.source).not.toContain('What to notice when spelling these words');
    expect(page.source).not.toMatch(/Practice and review/i);
    expect(page.source).not.toContain('Hear or say each word, notice a useful part');
    expect(page.source).not.toMatch(/Additional Practice/i);
    expect(page.source).not.toContain('In a sentence:');
    expect(page.source).not.toMatch(/^#{1,2} /m);
    expect(page.source).not.toMatch(/^faq:|^readinessSignals:/m);
  });

  it.each(pages)('retains same-grade exploration and its owning gateway for $id', (page) => {
    const route = getCanonicalGradeRouteById(page.id);
    const peers = getThemedSpellingPracticeExploreMore(page.id);
    expect(peers).toHaveLength(3);
    for (const peerId of peers) {
      expect(getCanonicalGradeRouteById(peerId)).toMatchObject({
        classification: 'themed-spelling-practice',
        grade: route?.grade,
      });
    }
    expect(`${route?.canonicalPath.split('/').slice(0, 3).join('/')}`).toBe(
      '/grades/kindergarten/themed-spelling-practice',
    );
  });
});
