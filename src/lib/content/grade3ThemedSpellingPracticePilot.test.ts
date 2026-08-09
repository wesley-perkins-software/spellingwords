import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById, getCanonicalGradeRoutes } from './canonicalGradeRoutes';
import { getThemedSpellingPracticeExploreMore } from './themedSpellingPracticeExploreMore';

type PilotPage = {
  id: string;
  title: string;
  path: string;
  words: readonly string[];
  noteWords: readonly string[];
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
  return [...block.matchAll(/^  - (?:word: )?['"]?([^'"\n]+)['"]?$/gm)].map(
    (match) => match[1],
  );
}

const pilots: readonly PilotPage[] = [
  {
    id: 'grade-3-life-cycle-words',
    title: '3rd Grade Life Cycle Spelling Words',
    path: '/3rd-grade/themed-spelling-practice/life-cycle-words',
    words: ['egg', 'larva', 'caterpillar', 'cocoon', 'pupa', 'tadpole', 'hatch', 'cycle'],
    noteWords: ['caterpillar', 'cycle'],
  },
  {
    id: 'grade-3-multiplication-division-words',
    title: '3rd Grade Multiplication & Division Spelling Words',
    path: '/3rd-grade/themed-spelling-practice/multiplication-division-words',
    words: ['multiply', 'divide', 'product', 'factor', 'multiple', 'quotient', 'array', 'equation'],
    noteWords: ['quotient', 'equation'],
  },
];

describe('Grade 3 Themed Spelling Practice pilot batch', () => {
  it('retains the exact four-page canonical Grade 3 themed corpus', () => {
    const routes = getCanonicalGradeRoutes().filter(
      (route) => route.grade === '3' && route.classification === 'themed-spelling-practice',
    );
    expect(routes.map((route) => route.id)).toEqual([
      'grade-3-map-globe-words',
      'grade-3-life-cycle-words',
      'grade-3-time-words',
      'grade-3-multiplication-division-words',
    ]);
  });

  it.each(pilots)('preserves frozen identity, route, ownership, and inventory for $id', (page) => {
    const source = sourceFor(page.id);
    expect(source).toContain(`id: ${page.id}`);
    expect(source).toContain(`urlSlug: ${page.id}`);
    expect(source).toContain(`title: '${page.title}'`);
    expect(source).toContain("grade: '3'");
    expect(source).toContain('contentRole: vocabulary-theme');
    expect(source).toContain("'themed-spelling-practice'");
    expect(listItems(source, 'words')).toEqual(page.words);
    expect(getCanonicalGradeRouteById(page.id)).toMatchObject({
      canonicalPath: page.path,
      classification: 'themed-spelling-practice',
      grade: '3',
    });
  });

  it.each(pilots)('keeps exceptional support selective for $id', (page) => {
    const source = sourceFor(page.id);
    const noteWords = listItems(source, 'wordNotes', 'words');
    const noteBlock = source.match(/^wordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
    expect(noteWords).toEqual(page.noteWords);
    expect(noteWords.length).toBeLessThan(page.words.length / 2);
    expect(noteWords.every((word) => page.words.includes(word))).toBe(true);
    expect(noteBlock).not.toContain('contextExample:');
    expect(noteBlock).not.toContain('pronunciationNote:');
  });

  it.each(pilots)('excludes obsolete and renderer-owned copy from $id', (page) => {
    const source = sourceFor(page.id);
    expect(source).not.toMatch(/Sight Words|Common Words|Heart Words|heart-words/i);
    expect(source).not.toContain('What to notice when spelling these words');
    expect(source).not.toMatch(/Practice and review|Additional Practice/i);
    expect(source).not.toContain('Hear or say each word, notice a useful part');
    expect(source).not.toMatch(/^#{1,2} /m);
    expect(source).not.toMatch(/^faq:|^readinessSignals:/m);
  });

  it.each(pilots)('retains same-grade peers and the owning gateway for $id', (page) => {
    const peers = getThemedSpellingPracticeExploreMore(page.id);
    expect(peers).toHaveLength(3);
    for (const peerId of peers) {
      expect(getCanonicalGradeRouteById(peerId)).toMatchObject({
        classification: 'themed-spelling-practice',
        grade: '3',
      });
    }
    expect(page.path.split('/').slice(0, 3).join('/')).toBe(
      '/3rd-grade/themed-spelling-practice',
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
