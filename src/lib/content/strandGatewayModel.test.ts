import { describe, expect, it } from 'vitest';
import {
  buildCoreSpellingGatewayModel,
  buildHfwGatewayModel,
  buildThemedGatewayModel,
  THEMED_TOPIC_DISPLAY_LABELS,
  HF_WORDS_TOTAL_SET_COUNT,
  HF_WORDS_TOTAL_WORD_COUNT,
} from './strandGatewayModel';
import { canonicalGradeRoutes, getCanonicalGradeRouteById } from './canonicalGradeRoutes';
import { gradeConfig } from './gradeConfig';
import type { SpellingListEntry } from './spellingLists';

const entries = canonicalGradeRoutes.map((route) => ({
  data: { id: route.id, title: route.finalSlug, words: [{ word: 'x' }] },
})) as unknown as SpellingListEntry[];

describe('/core-spelling cross-grade model', () => {
  const sections = buildCoreSpellingGatewayModel(entries);

  it('has six sections in canonical grade order with live-derived unit counts', () => {
    expect(sections.map((s) => s.grade)).toEqual(gradeConfig.map((g) => g.grade));
    for (const section of sections) {
      const expected = canonicalGradeRoutes.filter(
        (r) => r.grade === section.grade && r.classification === 'core-spelling',
      ).length;
      expect(section.unitCount).toBe(expected);
      expect(section.representativeTitles.length).toBeGreaterThanOrEqual(3);
      expect(section.representativeTitles.length).toBeLessThanOrEqual(4);
    }
  });
});

describe('/high-frequency-words cross-grade model', () => {
  const sections = buildHfwGatewayModel();

  it('derives set/word counts live and matches the frozen 27-set/316-word totals', () => {
    const totalSets = sections.reduce((total, s) => total + s.setCount, 0);
    const totalWords = sections.reduce((total, s) => total + s.wordCount, 0);
    expect(totalSets).toBe(HF_WORDS_TOTAL_SET_COUNT);
    expect(totalWords).toBe(HF_WORDS_TOTAL_WORD_COUNT);
    expect(HF_WORDS_TOTAL_SET_COUNT).toBe(27);
    expect(HF_WORDS_TOTAL_WORD_COUNT).toBe(316);
  });
});

describe('/themed-spelling-practice cross-grade model', () => {
  const sections = buildThemedGatewayModel(entries);

  it('exposes all 27 canonical Themed topics across the six grade sections, each belonging to the right grade+strand', () => {
    const allTopicIds = sections.flatMap((s) => s.topics.map((t) => t.id));
    expect(allTopicIds).toHaveLength(27);
    expect(new Set(allTopicIds).size).toBe(27);
    for (const section of sections) {
      for (const topic of section.topics) {
        const route = getCanonicalGradeRouteById(topic.id);
        expect(route?.grade).toBe(section.grade);
        expect(route?.classification).toBe('themed-spelling-practice');
      }
    }
  });

  it('gives every topic id an explicit, non-empty display label (no render-time stripping)', () => {
    const allTopicIds = sections.flatMap((s) => s.topics.map((t) => t.id));
    for (const id of allTopicIds) {
      expect(THEMED_TOPIC_DISPLAY_LABELS[id]?.length ?? 0).toBeGreaterThan(0);
    }
    expect(Object.keys(THEMED_TOPIC_DISPLAY_LABELS)).toHaveLength(27);
  });
});
