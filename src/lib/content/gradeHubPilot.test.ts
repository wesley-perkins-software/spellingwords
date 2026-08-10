import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { canonicalGradeRoutes, getGradeHubGatewayLinks } from './canonicalGradeRoutes';
import { buildGrade3HubPilot } from './gradeHubPilot';
import type { SpellingListEntry } from './spellingLists';

const renderer = readFileSync(join(process.cwd(), 'src/pages/[gradeSlug].astro'), 'utf8');
const grade3Routes = canonicalGradeRoutes.filter(({ grade }) => grade === '3');
const entries = grade3Routes.map((route) => ({
  data: {
    id: route.id,
    words: Array.from({ length: route.classification === 'high-frequency-words' ? 12 : 1 }, (_, index) => ({
      word: `word-${index}`,
    })),
  },
})) as unknown as SpellingListEntry[];

describe('3rd Grade Hub pilot', () => {
  const pilot = buildGrade3HubPilot(entries);

  it('exposes exactly the three canonical Gateway destinations and no member inventory', () => {
    expect(pilot.strands.map(({ strand, label, href }) => ({ strand, label, href }))).toEqual(
      getGradeHubGatewayLinks('3'),
    );
    expect(pilot.strands).toHaveLength(3);
    expect(pilot.strands.flatMap((strand) => Object.keys(strand))).not.toContain('cards');
    const memberPaths = new Set(grade3Routes.map(({ canonicalPath }) => canonicalPath));
    expect(pilot.strands.every(({ href }) => !memberPaths.has(href))).toBe(true);
  });

  it('derives the canonical Grade 3 counts', () => {
    expect(pilot.strands.map(({ strand, memberCount, wordCount }) => ({ strand, memberCount, wordCount }))).toEqual([
      { strand: 'core-spelling', memberCount: 7, wordCount: 7 },
      { strand: 'high-frequency-words', memberCount: 5, wordCount: 60 },
      { strand: 'themed-spelling-practice', memberCount: 4, wordCount: 4 },
    ]);
  });

  it('keeps cross-strand guidance at Hub level and begins with Core', () => {
    expect(pilot.synthesis).toMatch(/^Start with Core Spelling/);
    expect(pilot.synthesis).toMatch(/High-Frequency Words alongside Core/);
    expect(pilot.synthesis).toMatch(/Themed Spelling Practice as optional additional practice/);
    expect(pilot.strands.find(({ strand }) => strand === 'core-spelling')?.summary).toMatch(/main systematic path/);
  });

  it('renders the pilot conditionally while preserving the five legacy Hub models', () => {
    expect(renderer).toContain("const grade3Pilot = grade === '3' ? buildGrade3HubPilot(entries) : undefined");
    expect(renderer).toContain('grade3Pilot ? (');
    expect(renderer).toContain('curatedSections.map((section) => (');
    expect(renderer).toContain('section.cards.map((card, index) => (');
  });

  it('builds Grade 3 ItemList schema from Gateways rather than member cards', () => {
    expect(renderer).toContain('numberOfItems: grade3Pilot?.strands.length ?? displayedItemCount');
    expect(renderer).toContain('? grade3Pilot.strands.map((strand, index) => ({');
    expect(renderer).toContain('url: new URL(strand.href, canonicalURL.origin).toString()');
    expect(renderer).toContain('name: `${label} ${strand.label}`');
    expect(renderer).toContain('itemListElement: itemListElements');
  });

  it('retains adjacent-grade and all-grades navigation without cross-grade Gateways', () => {
    expect(renderer).toContain('const { prev, next } = getAdjacentGrades(grade)');
    expect(renderer).toContain('href={prev.hubHref}');
    expect(renderer).toContain('href={next.hubHref}');
    expect(renderer).toContain('href="/#grades"');
  });
});
