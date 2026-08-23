import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';
import { getHighFrequencyNeighbors } from './hfWordsSequence';

const setId = 'kindergarten-high-frequency-words-set-1';
const source = readFileSync(
  new URL(
    '../../content/spelling-lists/high-frequency-words/kindergarten-high-frequency-words-set-1.md',
    import.meta.url,
  ),
  'utf8',
);
const renderer = readFileSync(
  new URL('../../pages/[gradeSlug]/[strand]/[slug].astro', import.meta.url),
  'utf8',
);
const coreRenderer = readFileSync(
  new URL('../../components/GradeUnitWorldPage.astro', import.meta.url),
  'utf8',
);
const skillRenderer = readFileSync(
  new URL('../../pages/skills/[slug].astro', import.meta.url),
  'utf8',
);
const sourceAttribution = readFileSync(
  new URL('../../components/SourceAttribution.astro', import.meta.url),
  'utf8',
);
const view = readFileSync(
  new URL('../../components/direction-a/GradeUnitView.astro', import.meta.url),
  'utf8',
);

describe('Kindergarten High-Frequency Words Set 1 editorial pilot', () => {
  it('preserves the frozen word inventory and canonical route', () => {
    expect(FROZEN_HF_WORDS_CURRICULUM.K[0].words).toEqual([
      'a',
      'I',
      'am',
      'at',
      'can',
      'in',
      'it',
      'is',
      'and',
      'the',
    ]);
    expect(getCanonicalGradeRouteById(setId)?.canonicalPath).toBe(
      '/grades/kindergarten/high-frequency-words/set-1',
    );
    expect(getCanonicalGradeRouteById(setId)?.classification).toBe('high-frequency-words');
  });

  it('authors selective notes only for words that need an extra detail', () => {
    const notesBlock = source.match(/^hfwWordNotes:\n([\s\S]*?)^words:/m)?.[1] ?? '';
    expect([...notesBlock.matchAll(/^  - word: "([^"]+)"$/gm)].map((match) => match[1])).toEqual([
      'a',
      'I',
      'is',
      'the',
    ]);
    expect(notesBlock).not.toContain('contextExample:');
    expect(source).toContain('### Most of these words can be built from sounds');
    expect(source).toContain('### Some words need one extra reminder');
  });

  it('keeps internal editorial provenance out of public renderers', () => {
    expect(source).toContain('name: "Hybrid editorial"');
    for (const publicRenderer of [renderer, coreRenderer, skillRenderer]) {
      expect(publicRenderer).toContain('data.canonicalSource?.publicAttribution');
    }
    expect(sourceAttribution).toContain('source?.publicAttribution');
  });

  it('does not duplicate shared readiness, practice, or mastery guidance in Markdown', () => {
    expect(source).not.toContain('readinessSignals:');
    expect(source).not.toContain('Practice and review');
    expect(source).not.toContain('retrieve it again later');
    expect(source).not.toContain('begin the next set');
  });

  it('keeps HFW instructional sections in a useful reading order', () => {
    // Word list, then the authored explanatory body ("Explanation"), then
    // word notes — all now rendered in this fixed order by the single
    // shared GradeUnitView, instead of separate inline sections on the page.
    // The standalone "Practice and review" callout (once
    // id="hfw-practice-heading") was removed rather than relocated, so its
    // absence here is intentional, not a regression to guard against.
    expect(view.indexOf('aria-labelledby="word-list-heading"')).toBeLessThan(
      view.indexOf('<!-- Explanation -->'),
    );
    expect(view.indexOf('<!-- Explanation -->')).toBeLessThan(
      view.indexOf('id="word-notes-heading"'),
    );
    expect(view).not.toContain('hfw-practice-heading');
  });

  it('links forward within Kindergarten without inventing a previous set', () => {
    expect(getHighFrequencyNeighbors(setId)).toEqual({
      previousId: undefined,
      nextId: 'kindergarten-high-frequency-words-set-2',
    });
    expect(renderer).toContain('All ${gradeHubForBreadcrumb.label} High-Frequency Words');
  });
});
