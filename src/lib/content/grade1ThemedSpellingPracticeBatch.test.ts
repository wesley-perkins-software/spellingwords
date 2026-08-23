import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  getCanonicalGradeRouteById,
  getCanonicalGradeRoutes,
} from './canonicalGradeRoutes';
import { getThemedSpellingPracticeExploreMore } from './themedSpellingPracticeExploreMore';

type BatchPage = {
  id: string;
  title: string;
  path: string;
  words: readonly string[];
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
    id: 'grade-1-weather-words',
    title: '1st Grade Weather Spelling Words',
    path: '/grades/1st-grade/themed-spelling-practice/weather-words',
    words: ['sunny', 'rainy', 'cloudy', 'windy', 'snowy', 'stormy', 'foggy', 'hot', 'cold'],
    noteWords: ['cloudy'],
  },
  {
    id: 'grade-1-clothing-words',
    title: '1st Grade Clothing Spelling Words',
    path: '/grades/1st-grade/themed-spelling-practice/clothing-words',
    words: ['shirt', 'pants', 'shoes', 'socks', 'jacket', 'hat', 'mittens', 'boots'],
    noteWords: ['shoes'],
  },
  {
    id: 'grade-1-shape-words',
    title: '1st Grade Shape Spelling Words',
    path: '/grades/1st-grade/themed-spelling-practice/shape-words',
    words: ['circle', 'square', 'triangle', 'rectangle', 'oval', 'diamond', 'star', 'heart'],
    noteWords: ['heart'],
  },
  {
    id: 'grade-1-number-words-11-20',
    title: '1st Grade Number Spelling Words 11–20',
    path: '/grades/1st-grade/themed-spelling-practice/number-words-11-20',
    words: [
      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
      'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
    ],
    noteWords: ['twelve', 'eighteen', 'twenty'],
  },
  {
    id: 'grade-1-days-of-the-week',
    title: '1st Grade Days of the Week Spelling Words',
    path: '/grades/1st-grade/themed-spelling-practice/days-of-the-week',
    words: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    noteWords: ['Wednesday'],
  },
];

describe('Grade 1 Themed Spelling Practice production batch', () => {
  it('contains the exact canonical Grade 1 themed page set', () => {
    const routes = getCanonicalGradeRoutes().filter(
      (route) => route.grade === '1' && route.classification === 'themed-spelling-practice',
    );
    expect(routes.map((route) => route.id)).toEqual(pages.map((page) => page.id));
  });

  it.each(pages)('preserves frozen identity, ownership, route, title, and inventory for $id', (page) => {
    const source = sourceFor(page.id);
    expect(source).toContain(`id: ${page.id}`);
    expect(source).toContain(`urlSlug: ${page.id}`);
    expect(source).toContain(`title: '${page.title}'`);
    expect(source).toContain("grade: '1'");
    expect(source).toContain('contentRole: vocabulary-theme');
    expect(source).toContain("'themed-spelling-practice'");
    expect(listItems(source, 'words')).toEqual(page.words);
    expect(getCanonicalGradeRouteById(page.id)).toMatchObject({
      canonicalPath: page.path,
      classification: 'themed-spelling-practice',
      grade: '1',
    });
  });

  it.each(pages)('keeps optional notes selective and owned by $id', (page) => {
    const source = sourceFor(page.id);
    const noteWords = listItems(source, 'wordNotes', 'words');
    expect(noteWords).toEqual(page.noteWords);
    expect(noteWords.length).toBeLessThan(page.words.length / 2);
    expect(noteWords.every((word) => page.words.includes(word))).toBe(true);
    const noteBlock = source.match(/^wordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
    expect(noteBlock).not.toContain('contextExample:');
    expect(noteBlock).not.toContain('pronunciationNote:');
  });

  it.each(pages)('excludes renderer-owned and obsolete copy from $id', (page) => {
    const source = sourceFor(page.id);
    expect(source).not.toMatch(/Sight Words|Common Words|Heart Words|heart-words/i);
    expect(source).not.toContain('What to notice when spelling these words');
    expect(source).not.toMatch(/Practice and review/i);
    expect(source).not.toContain('Hear or say each word, notice a useful part');
    expect(source).not.toMatch(/Additional Practice/i);
    expect(source).not.toContain('In a sentence:');
    expect(source).not.toMatch(/^#{1,2} /m);
    expect(source).not.toMatch(/^faq:|^readinessSignals:/m);
  });

  it.each(pages)('retains deterministic same-grade peers and the owning gateway for $id', (page) => {
    const peers = getThemedSpellingPracticeExploreMore(page.id);
    expect(peers).toHaveLength(3);
    expect(getThemedSpellingPracticeExploreMore(page.id)).toEqual(peers);
    for (const peerId of peers) {
      expect(getCanonicalGradeRouteById(peerId)).toMatchObject({
        classification: 'themed-spelling-practice',
        grade: '1',
      });
    }
    expect(page.path.split('/').slice(0, 3).join('/')).toBe(
      '/grades/1st-grade/themed-spelling-practice',
    );
  });

  it('keeps the approved Weather implementation byte-for-byte unchanged', () => {
    expect(createHash('sha256').update(sourceFor('grade-1-weather-words')).digest('hex')).toBe(
      'c8597493bf26683ac2e11311bbe7377ecdb0ea1de3cecffdcecd5e01e7dffcfe',
    );
  });

  it('retains the frozen themed corpus totals', () => {
    const routes = getCanonicalGradeRoutes().filter(
      (route) => route.classification === 'themed-spelling-practice',
    );
    const words = routes.flatMap((route) => listItems(sourceFor(route.id), 'words'));
    expect(routes).toHaveLength(27);
    expect(words).toHaveLength(237);
    expect(new Set(words.map((word) => word.toLocaleLowerCase())).size).toBe(236);
  });
});
