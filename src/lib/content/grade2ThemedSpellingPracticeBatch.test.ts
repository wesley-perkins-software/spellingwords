import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById, getCanonicalGradeRoutes } from './canonicalGradeRoutes';
import { getThemedSpellingPracticeExploreMore } from './themedSpellingPracticeExploreMore';

type BatchPage = {
  id: string;
  title: string;
  path: string;
  words: readonly string[];
  noteWords: readonly string[];
  contextCount: number;
  pronunciationCount: number;
};

function sourceFor(id: string): string {
  return readFileSync(
    new URL(`../../content/spelling-lists/grade-level/${id}.md`, import.meta.url),
    'utf8',
  );
}

function sourceByFrontmatterId(id: string): string {
  const root = new URL('../../content/spelling-lists/grade-level/', import.meta.url);
  const files = readdirSync(root)
    .filter((name) => name.endsWith('.md'))
    .map((name) => readFileSync(new URL(name, root), 'utf8'));
  const matches = files.filter((source) => source.includes(`\nid: ${id}\n`));
  expect(matches).toHaveLength(1);
  return matches[0];
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
    id: 'grade-2-transportation-words',
    title: '2nd Grade Transportation Spelling Words',
    path: '/2nd-grade/themed-spelling-practice/transportation-words',
    words: ['car', 'bus', 'train', 'airplane', 'boat', 'bicycle', 'truck', 'subway'],
    noteWords: ['bicycle'],
    contextCount: 0,
    pronunciationCount: 0,
  },
  {
    id: 'grade-2-money-words',
    title: '2nd Grade Money Spelling Words',
    path: '/2nd-grade/themed-spelling-practice/money-words',
    words: ['penny', 'nickel', 'dime', 'quarter', 'dollar', 'cent', 'coin', 'change'],
    noteWords: ['nickel', 'change'],
    contextCount: 1,
    pronunciationCount: 0,
  },
  {
    id: 'grade-2-number-words-20-100',
    title: '2nd Grade Number Spelling Words 20–100',
    path: '/2nd-grade/themed-spelling-practice/number-words-20-100',
    words: ['thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred'],
    noteWords: ['forty', 'fifty', 'eighty'],
    contextCount: 0,
    pronunciationCount: 0,
  },
  {
    id: 'grade-2-community-helpers',
    title: '2nd Grade Community Helpers Spelling Words',
    path: '/2nd-grade/themed-spelling-practice/community-helpers',
    words: ['doctor', 'teacher', 'firefighter', 'nurse', 'farmer', 'dentist', 'librarian', 'baker'],
    noteWords: ['librarian'],
    contextCount: 0,
    pronunciationCount: 0,
  },
  {
    id: 'grade-2-months-of-the-year',
    title: '2nd Grade Months of the Year Spelling Words',
    path: '/2nd-grade/themed-spelling-practice/months-of-the-year',
    words: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    noteWords: ['February'],
    contextCount: 0,
    pronunciationCount: 1,
  },
];

describe('Grade 2 Themed Spelling Practice production batch', () => {
  it('contains the exact canonical Grade 2 themed page set', () => {
    const routes = getCanonicalGradeRoutes().filter(
      (route) => route.grade === '2' && route.classification === 'themed-spelling-practice',
    );
    expect(routes.map((route) => route.id)).toEqual(pages.map((page) => page.id));
  });

  it.each(pages)('preserves frozen identity, ownership, route, title, and inventory for $id', (page) => {
    const source = sourceFor(page.id);
    expect(source).toContain(`id: ${page.id}`);
    expect(source).toContain(`urlSlug: ${page.id}`);
    expect(source).toContain(`title: '${page.title}'`);
    expect(source).toContain("grade: '2'");
    expect(source).toContain('contentRole: vocabulary-theme');
    expect(source).toContain("'themed-spelling-practice'");
    expect(listItems(source, 'words')).toEqual(page.words);
    expect(getCanonicalGradeRouteById(page.id)).toMatchObject({
      canonicalPath: page.path,
      classification: 'themed-spelling-practice',
      grade: '2',
    });
  });

  it.each(pages)('keeps optional support selective and owned by $id', (page) => {
    const source = sourceFor(page.id);
    const noteWords = listItems(source, 'wordNotes', 'words');
    const noteBlock = source.match(/^wordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
    expect(noteWords).toEqual(page.noteWords);
    expect(noteWords.length).toBeLessThan(page.words.length / 2);
    expect(noteWords.every((word) => page.words.includes(word))).toBe(true);
    expect(noteBlock.match(/^    contextExample:/gm) ?? []).toHaveLength(page.contextCount);
    expect(noteBlock.match(/^    pronunciationNote:/gm) ?? []).toHaveLength(
      page.pronunciationCount,
    );
    expect(noteBlock).not.toContain('In a sentence:');
  });

  it.each(pages)('excludes renderer-owned and obsolete copy from $id', (page) => {
    const source = sourceFor(page.id);
    expect(source).not.toMatch(/Sight Words|Common Words|Heart Words|heart-words/i);
    expect(source).not.toContain('What to notice when spelling these words');
    expect(source).not.toMatch(/Practice and review/i);
    expect(source).not.toContain('Hear or say each word, notice a useful part');
    expect(source).not.toMatch(/Additional Practice/i);
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
        grade: '2',
      });
    }
    expect(page.path.split('/').slice(0, 3).join('/')).toBe(
      '/2nd-grade/themed-spelling-practice',
    );
  });

  it('keeps completed Kindergarten and Grade 1 themed pages byte-for-byte unchanged', () => {
    const kindergartenIds = getCanonicalGradeRoutes()
      .filter((route) => route.grade === 'K' && route.classification === 'themed-spelling-practice')
      .map((route) => route.id);
    const grade1Ids = getCanonicalGradeRoutes()
      .filter((route) => route.grade === '1' && route.classification === 'themed-spelling-practice')
      .map((route) => route.id);
    const digest = (ids: readonly string[]) => {
      const hash = createHash('sha256');
      ids.forEach((id) => hash.update(sourceFor(id)));
      return hash.digest('hex');
    };
    expect(digest(kindergartenIds)).toBe(
      'b394227db244f68a088b2350596e5f21f0363f76f74f2fc9982890181e99b76b',
    );
    expect(digest(grade1Ids)).toBe(
      '7bbde11557a6cffe277831f40ed48ae99230621752ecfb2d3705e1974dcffba0',
    );
  });

  it('retains the frozen themed corpus totals', () => {
    const routes = getCanonicalGradeRoutes().filter(
      (route) => route.classification === 'themed-spelling-practice',
    );
    const words = routes.flatMap((route) => listItems(sourceByFrontmatterId(route.id), 'words'));
    expect(routes).toHaveLength(27);
    expect(words).toHaveLength(237);
    expect(new Set(words.map((word) => word.toLocaleLowerCase())).size).toBe(236);
  });
});
