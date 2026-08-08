import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { canonicalGradeRoutes } from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM, HF_WORDS_SET_IDS_BY_GRADE } from './hfWordsCurriculum';
import { getHighFrequencyNeighbors } from './hfWordsSequence';

const contentDirectory = new URL('../../content/spelling-lists/sight-words/', import.meta.url);
const curriculumSets = Object.entries(FROZEN_HF_WORDS_CURRICULUM).flatMap(([grade, sets]) =>
  sets.map((set) => ({ ...set, grade })),
);

describe('High-Frequency Words editorial foundation', () => {
  it('keeps all canonical files and public routes aligned with the frozen curriculum', () => {
    const files = readdirSync(contentDirectory).filter((file) => file.endsWith('.md')).sort();
    const routes = canonicalGradeRoutes.filter(
      (route) => route.classification === 'high-frequency-words',
    );

    expect(files).toHaveLength(27);
    expect(routes).toHaveLength(27);
    expect(routes.map((route) => route.id).sort()).toEqual(
      curriculumSets.map((set) => set.id).sort(),
    );
    expect(routes.every((route) => route.canonicalPath.endsWith(`/${route.finalSlug}`))).toBe(true);
  });

  it('uses canonical public names and HFW descriptions in every file', () => {
    for (const set of curriculumSets) {
      const markdown = readFileSync(new URL(`${set.id}.md`, contentDirectory), 'utf8');
      const gradeLabel = set.grade === 'K' ? 'Kindergarten' : `Grade ${set.grade}`;
      expect(markdown).toContain(`title: "${gradeLabel} High-Frequency Words — Set ${set.setNumber}"`);
      expect(markdown.toLowerCase()).toContain('description: "');
      expect(markdown.toLowerCase()).toContain('high-frequency words');
    }
  });

  it('keeps adjacency inside each grade and has correct terminal behavior', () => {
    for (const sequence of Object.values(HF_WORDS_SET_IDS_BY_GRADE)) {
      sequence.forEach((id, index) => {
        expect(getHighFrequencyNeighbors(id)).toEqual({
          previousId: sequence[index - 1],
          nextId: sequence[index + 1],
        });
      });
    }
  });

  it('uses strand-aware HFW rendering without Core readiness UI', () => {
    const renderer = readFileSync(
      new URL('../../pages/[gradeSlug]/[strand]/[slug].astro', import.meta.url),
      'utf8',
    );
    expect(renderer).toContain("route.classification === 'high-frequency-words'");
    expect(renderer).toContain('!isHighFrequencyWords && data.readinessSignals.length > 0');
    expect(renderer).toContain('Practice and review');
    expect(renderer).toContain('All {gradeHubForBreadcrumb.label} High-Frequency Words');
  });
});
