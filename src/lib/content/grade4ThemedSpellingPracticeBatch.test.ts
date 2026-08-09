import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById, getCanonicalGradeRoutes } from './canonicalGradeRoutes';
import { getThemedSpellingPracticeExploreMore } from './themedSpellingPracticeExploreMore';

type Grade4Page = {
  id: string;
  slug: string;
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
  return [...block.matchAll(/^  - (?:word: )?(.+)$/gm)].map((match) => {
    const value = match[1].trim();
    const quote = value[0];
    return (quote === "'" || quote === '"') && value.at(-1) === quote ? value.slice(1, -1) : value;
  });
}

const grade4Pages: readonly Grade4Page[] = [
  {
    id: 'grade-4-measurement-words',
    slug: '4th-grade-measurement-words',
    title: '4th Grade Measurement Spelling Words',
    path: '/4th-grade/themed-spelling-practice/measurement-words',
    words: ['inch', 'foot', 'yard', 'mile', 'ounce', 'pound', 'ton', 'cup', 'pint', 'quart', 'gallon'],
    noteWords: ['ounce'],
  },
  {
    id: 'grade-4-solar-system-words',
    slug: '4th-grade-solar-system-words',
    title: '4th Grade Solar System Spelling Words',
    path: '/4th-grade/themed-spelling-practice/solar-system-words',
    words: ['planet', 'orbit', 'gravity', 'astronaut', 'galaxy', 'satellite', 'comet', 'asteroid', 'eclipse', 'meteor'],
    noteWords: ['astronaut', 'satellite'],
  },
  {
    id: 'grade-4-career-occupation-words',
    slug: '4th-grade-career-occupation-words',
    title: '4th Grade Career & Occupation Spelling Words',
    path: '/4th-grade/themed-spelling-practice/career-occupation-words',
    words: ['engineer', 'journalist', 'architect', 'scientist', 'plumber', 'mechanic', 'photographer', 'chef'],
    noteWords: ['scientist', 'plumber'],
  },
  {
    id: 'grade-4-geometry-words',
    slug: '4th-grade-geometry-words',
    title: '4th Grade Geometry Spelling Words',
    path: '/4th-grade/themed-spelling-practice/geometry-words',
    words: ['perimeter', 'area', 'quadrilateral', 'vertex', 'perpendicular', 'symmetry', 'angle', 'polygon'],
    noteWords: ['quadrilateral', 'perpendicular', 'symmetry'],
  },
];

describe('Grade 4 Themed Spelling Practice corpus', () => {
  it('retains the exact four-page canonical Grade 4 themed corpus', () => {
    const routes = getCanonicalGradeRoutes().filter(
      (route) => route.grade === '4' && route.classification === 'themed-spelling-practice',
    );
    expect(routes.map((route) => route.id)).toEqual(grade4Pages.map((page) => page.id));
  });

  it.each(grade4Pages)('preserves frozen identity, route, ownership, and inventory for $id', (page) => {
    const source = sourceFor(page.id);
    expect(source).toContain(`id: ${page.id}`);
    expect(source).toContain(`urlSlug: ${page.slug}`);
    expect(source).toContain(`title: '${page.title}'`);
    expect(source).toContain("grade: '4'");
    expect(source).toContain('contentRole: vocabulary-theme');
    expect(source).toContain("'themed-spelling-practice'");
    expect(listItems(source, 'words')).toEqual(page.words);
    expect(getCanonicalGradeRouteById(page.id)).toMatchObject({
      canonicalPath: page.path,
      classification: 'themed-spelling-practice',
      grade: '4',
    });
  });

  it.each(grade4Pages)('keeps exceptional support selective for $id', (page) => {
    const source = sourceFor(page.id);
    const noteWords = listItems(source, 'wordNotes', 'words');
    const noteBlock = source.match(/^wordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
    expect(noteWords).toEqual(page.noteWords);
    expect(noteWords.length).toBeLessThan(page.words.length / 2);
    expect(noteWords.every((word) => page.words.includes(word))).toBe(true);
    expect(noteBlock).not.toContain('contextExample:');
    expect(noteBlock).not.toContain('pronunciationNote:');
  });

  it.each(grade4Pages)('excludes obsolete and renderer-owned copy from $id', (page) => {
    const source = sourceFor(page.id);
    expect(source).not.toMatch(/Sight Words|Common Words|Heart Words|heart-words/i);
    expect(source).not.toContain('What to notice when spelling these words');
    expect(source).not.toMatch(/Practice and review|Additional Practice/i);
    expect(source).not.toContain('Hear or say each word, notice a useful part');
    expect(source).not.toMatch(/^#{1,2} /m);
    expect(source).not.toMatch(/^faq:|^readinessSignals:/m);
    expect(source).not.toMatch(/^(id|urlSlug|title|description|shortAnswer|contentRole|category|grade|words):.*\n[\s\S]*^\1:/m);
    expect(source).not.toMatch(/^(<<<<<<<|=======|>>>>>>>)/m);
  });

  it.each(grade4Pages)('retains same-grade peers and the owning gateway for $id', (page) => {
    const peers = getThemedSpellingPracticeExploreMore(page.id);
    expect(peers).toHaveLength(3);
    for (const peerId of peers) {
      expect(getCanonicalGradeRouteById(peerId)).toMatchObject({
        classification: 'themed-spelling-practice',
        grade: '4',
      });
    }
    expect(page.path.split('/').slice(0, 3).join('/')).toBe('/4th-grade/themed-spelling-practice');
  });

  it('protects spelling-critical facts on the completed pages', () => {
    expect(sourceFor('grade-4-measurement-words')).toContain('*Gallon* can be organized as *gal-lon*, with doubled *l*');
    expect(sourceFor('grade-4-career-occupation-words')).toContain('*Scientist* changes at the join: adding *ist* to *science* drops the final *e*');
    expect(sourceFor('grade-4-geometry-words')).toContain('*Symmetry* has doubled *m* and two written *y*s');
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
