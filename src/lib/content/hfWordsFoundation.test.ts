import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { canonicalGradeRoutes } from './canonicalGradeRoutes';
import { gradeConfig } from './gradeConfig';
import { FROZEN_HF_WORDS_CURRICULUM, HF_WORDS_SET_IDS_BY_GRADE } from './hfWordsCurriculum';
import { getHighFrequencyNeighbors } from './hfWordsSequence';

const contentDirectory = new URL('../../content/spelling-lists/high-frequency-words/', import.meta.url);
const curriculumSets = Object.entries(FROZEN_HF_WORDS_CURRICULUM).flatMap(([grade, sets]) =>
  sets.map((set) => ({ ...set, grade })),
);
const obsoleteHfwTerminology = /(?:sight|common)[-_ ]words?/i;

describe('High-Frequency Words editorial foundation', () => {
  it('keeps all canonical files and public routes aligned with the frozen curriculum', () => {
    const files = readdirSync(contentDirectory).filter((file) => file.endsWith('.md')).sort();
    const routes = canonicalGradeRoutes.filter(
      (route) => route.classification === 'high-frequency-words',
    );

    expect(files).toHaveLength(27);
    expect(files).toEqual(curriculumSets.map((set) => `${set.id}.md`).sort());
    expect(routes).toHaveLength(27);
    expect(routes.map((route) => route.id).sort()).toEqual(
      curriculumSets.map((set) => set.id).sort(),
    );
    for (const route of routes) {
      expect(route.canonicalPath).toBe(
        `/grades/${route.gradeSlug}/high-frequency-words/set-${
          curriculumSets.find((set) => set.id === route.id)?.setNumber
        }`,
      );
    }
  });

  it('uses canonical public names and HFW descriptions in every file', () => {
    for (const set of curriculumSets) {
      const markdown = readFileSync(new URL(`${set.id}.md`, contentDirectory), 'utf8');
      const gradeLabel = gradeConfig.find((g) => g.grade === set.grade)?.label;
      expect(markdown).toContain(`title: "${gradeLabel} High-Frequency Words — Set ${set.setNumber}"`);
      expect(markdown.toLowerCase()).toContain('description: "');
      expect(markdown.toLowerCase()).toContain('high-frequency words');
      expect(markdown).toContain('contentRole: high-frequency-word-set');
      expect(markdown).toContain('category: high-frequency-words');
      expect(markdown).not.toMatch(obsoleteHfwTerminology);
      expect(markdown).not.toContain('heart-words');
      expect(markdown).not.toContain('Heart part:');
    }
  });

  it('has no obsolete HFW semantic identifiers in active manifests and helpers', () => {
    const activeSemanticFiles = [
      'canonicalGradeRoutes.ts',
      'categoryMeta.ts',
      'grade2Progression.ts',
      'grade3Progression.ts',
      'grade4Progression.ts',
      'grade5Progression.ts',
      'gradeHubCopy.ts',
      'gradeHubModel.ts',
      'hfWordsCurriculum.ts',
      'hfWordsSequence.ts',
      'nonCoreNavigation.ts',
    ];
    for (const file of activeSemanticFiles) {
      expect(readFileSync(new URL(file, import.meta.url), 'utf8')).not.toMatch(
        obsoleteHfwTerminology,
      );
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
