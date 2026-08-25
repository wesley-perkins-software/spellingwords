import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById, getCanonicalGradeRoutes } from './canonicalGradeRoutes';
import { getThemedSpellingPracticeExploreMore } from './themedSpellingPracticeExploreMore';

type Grade5Page = {
  id: string;
  slug: string;
  title: string;
  path: string;
  words: readonly string[];
  noteWords: readonly string[];
  contextWords: readonly string[];
};

const gradeLevelRoot = new URL('../../content/spelling-lists/grade-level/', import.meta.url);

function sourceFor(id: string): string {
  const matches = readdirSync(gradeLevelRoot)
    .filter((name) => name.endsWith('.md'))
    .map((name) => readFileSync(new URL(name, gradeLevelRoot), 'utf8'))
    .filter((source) => source.includes(`\nid: ${id}\n`));
  expect(matches).toHaveLength(1);
  return matches[0];
}

function listItems(source: string, blockName: string, nextBlock?: string): string[] {
  const end = nextBlock ? `(?=^${nextBlock}:)` : '(?=^---$)';
  const block = source.match(new RegExp(`^${blockName}:\\n([\\s\\S]*?)${end}`, 'm'))?.[1] ?? '';
  return [...block.matchAll(/^  - (?:word: )?(.+)$/gm)].map((match) => {
    const value = match[1].trim();
    const quote = value[0];
    return (quote === "'" || quote === '"') && value.at(-1) === quote ? value.slice(1, -1) : value;
  });
}

const grade5Pages: readonly Grade5Page[] = [
  {
    id: 'grade-5-money-management-words',
    slug: '5th-grade-money-management-words',
    title: '5th Grade Money Management Spelling Words',
    path: '/grades/5th-grade/themed-spelling-practice/money-management-words',
    words: ['budget', 'income', 'expense', 'savings', 'interest', 'deposit', 'withdraw', 'credit', 'debit', 'borrow', 'balance', 'tax'],
    noteWords: ['savings', 'borrow'],
    contextWords: [],
  },
  {
    id: 'grade-5-ecosystem-environment-words',
    slug: '5th-grade-ecosystem-environment-words',
    title: '5th Grade Ecosystem & Environment Spelling Words',
    path: '/grades/5th-grade/themed-spelling-practice/ecosystem-environment-words',
    words: ['habitat', 'ecosystem', 'organism', 'adaptation', 'population', 'predator', 'prey', 'extinct'],
    noteWords: ['prey', 'extinct'],
    contextWords: ['prey'],
  },
  {
    id: 'grade-5-fraction-decimal-words',
    slug: '5th-grade-fraction-decimal-words',
    title: '5th Grade Fraction & Decimal Spelling Words',
    path: '/grades/5th-grade/themed-spelling-practice/fraction-decimal-words',
    words: ['numerator', 'denominator', 'decimal', 'equivalent', 'percent', 'ratio', 'fraction', 'hundredths'],
    noteWords: ['denominator', 'hundredths'],
    contextWords: [],
  },
  {
    id: 'grade-5-community-civics-words',
    slug: '5th-grade-community-civics-words',
    title: '5th Grade Civics and Government Spelling Words',
    path: '/grades/5th-grade/themed-spelling-practice/community-civics-words',
    words: ['citizen', 'law', 'amendment', 'justice', 'constitution', 'congress', 'election', 'representative', 'liberty', 'rights', 'independence', 'capital'],
    noteWords: ['rights', 'representative', 'capital'],
    contextWords: ['rights', 'capital'],
  },
];

describe('Grade 5 Themed Spelling Practice corpus', () => {
  it('retains the exact four-page canonical Grade 5 themed corpus', () => {
    const routes = getCanonicalGradeRoutes().filter(
      (route) => route.grade === '5' && route.classification === 'themed-spelling-practice',
    );
    expect(routes.map((route) => route.id)).toEqual(grade5Pages.map((page) => page.id));
  });

  it.each(grade5Pages)('preserves frozen identity, route, ownership, and inventory for $id', (page) => {
    const source = sourceFor(page.id);
    expect(source).toContain(`id: ${page.id}`);
    expect(source).toContain(`urlSlug: ${page.slug}`);
    expect(source).toContain(`title: '${page.title}'`);
    expect(source).toContain("grade: '5'");
    expect(source).toContain('contentRole: vocabulary-theme');
    expect(source).toContain("'themed-spelling-practice'");
    expect(listItems(source, 'words')).toEqual(page.words);
    expect(getCanonicalGradeRouteById(page.id)).toMatchObject({
      canonicalPath: page.path,
      classification: 'themed-spelling-practice',
      grade: '5',
    });
  });

  it.each(grade5Pages)('keeps exceptional support selective for $id', (page) => {
    const source = sourceFor(page.id);
    const noteBlock = source.match(/^wordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
    const noteWords = listItems(source, 'wordNotes', 'words');
    const contextWords = [...noteBlock.matchAll(/^  - word: ['"]?([^'"\n]+)['"]?\n(?:    .*\n)*?    contextExample:/gm)]
      .map((match) => match[1]);
    expect(noteWords).toEqual(page.noteWords);
    expect(noteWords.length).toBeLessThan(page.words.length / 2);
    expect(contextWords).toEqual(page.contextWords);
    expect(noteBlock).not.toContain('pronunciationNote:');
  });

  it.each(grade5Pages)('excludes obsolete and renderer-owned copy from $id', (page) => {
    const source = sourceFor(page.id);
    expect(source).not.toMatch(/Sight Words|Common Words|Heart Words|heart-words/i);
    expect(source).not.toContain('What to notice when spelling these words');
    expect(source).not.toMatch(/Practice and review|Additional Practice/i);
    expect(source).not.toContain('Hear or say each word, notice a useful part');
    expect(source).not.toMatch(/^#{1,2} /m);
    expect(source).not.toMatch(/^faq:|^readinessSignals:/m);
    expect(source).not.toMatch(/^(<<<<<<<|=======|>>>>>>>)/m);
  });

  it.each(grade5Pages)('retains same-grade peers and the owning gateway for $id', (page) => {
    const peers = getThemedSpellingPracticeExploreMore(page.id);
    expect(peers).toHaveLength(3);
    for (const peerId of peers) {
      expect(getCanonicalGradeRouteById(peerId)).toMatchObject({
        classification: 'themed-spelling-practice',
        grade: '5',
      });
    }
    expect(page.path.split('/').slice(0, 3).join('/')).toBe('/grades/5th-grade/themed-spelling-practice');
  });

  it('protects spelling-critical facts and exceptional context decisions', () => {
    expect(sourceFor('grade-5-money-management-words')).toContain('*save + ing + s*');
    expect(sourceFor('grade-5-ecosystem-environment-words')).toContain('homophone, pray');
    expect(sourceFor('grade-5-fraction-decimal-words')).toContain('*hundred + th + s*');
    expect(sourceFor('grade-5-community-civics-words')).toContain('Capitol ends in ol');
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
