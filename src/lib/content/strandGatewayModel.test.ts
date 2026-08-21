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
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';
import type { SpellingListEntry } from './spellingLists';

const entries = canonicalGradeRoutes.map((route) => ({
  data: { id: route.id, title: route.finalSlug, words: [{ word: 'x' }] },
})) as unknown as SpellingListEntry[];

describe('/core-spelling cross-grade model — complete linked index', () => {
  const sections = buildCoreSpellingGatewayModel(entries);
  const allCoreRoutes = canonicalGradeRoutes.filter((r) => r.classification === 'core-spelling');

  it('has six sections in canonical grade order with live-derived unit counts', () => {
    expect(sections.map((s) => s.grade)).toEqual(gradeConfig.map((g) => g.grade));
    for (const section of sections) {
      const expected = allCoreRoutes.filter((r) => r.grade === section.grade).length;
      expect(section.unitCount).toBe(expected);
      expect(section.units).toHaveLength(expected);
    }
  });

  it('every canonical active Core unit appears exactly once, in canonical curriculum order, with a resolvable link', () => {
    const flatUnits = sections.flatMap((s) => s.units);
    expect(flatUnits.map((u) => u.id)).toEqual(allCoreRoutes.map((r) => r.id));
    expect(new Set(flatUnits.map((u) => u.id)).size).toBe(allCoreRoutes.length);
    for (const unit of flatUnits) {
      const route = getCanonicalGradeRouteById(unit.id);
      expect(unit.href).toBe(route?.canonicalPath);
    }
  });

  it('every unit carries 2-3 sample words', () => {
    for (const unit of sections.flatMap((s) => s.units)) {
      expect(unit.sampleWords.length).toBeGreaterThanOrEqual(2);
      expect(unit.sampleWords.length).toBeLessThanOrEqual(3);
    }
  });
});

describe('/high-frequency-words cross-grade model — complete linked index', () => {
  const sections = buildHfwGatewayModel(entries);

  it('derives set/word counts live and matches the frozen 27-set/316-word totals', () => {
    const totalSets = sections.reduce((total, s) => total + s.setCount, 0);
    const totalWords = sections.reduce((total, s) => total + s.wordCount, 0);
    expect(totalSets).toBe(HF_WORDS_TOTAL_SET_COUNT);
    expect(totalWords).toBe(HF_WORDS_TOTAL_WORD_COUNT);
    expect(HF_WORDS_TOTAL_SET_COUNT).toBe(27);
    expect(HF_WORDS_TOTAL_WORD_COUNT).toBe(316);
  });

  it('exposes every canonical HFW set exactly once, in frozen order, with a resolvable link', () => {
    const flatSets = sections.flatMap((s) => s.sets);
    const frozenOrder = gradeConfig.flatMap(({ grade }) => FROZEN_HF_WORDS_CURRICULUM[grade].map((set) => set.id));
    expect(flatSets.map((s) => s.id)).toEqual(frozenOrder);
    expect(new Set(flatSets.map((s) => s.id)).size).toBe(frozenOrder.length);
    for (const set of flatSets) {
      const route = getCanonicalGradeRouteById(set.id);
      expect(set.href).toBe(route?.canonicalPath);
    }
  });

  it('every set carries 4-6 sample words', () => {
    for (const set of sections.flatMap((s) => s.sets)) {
      expect(set.sampleWords.length).toBeGreaterThanOrEqual(4);
      expect(set.sampleWords.length).toBeLessThanOrEqual(6);
    }
  });

  it('never equates high-frequency with irregular in its role copy', () => {
    for (const section of sections) {
      expect(section.role.toLowerCase()).not.toMatch(/irregular|tricky|sight word/);
    }
  });
});

describe('/themed-spelling-practice cross-grade model — complete linked catalog', () => {
  const sections = buildThemedGatewayModel(entries);

  it('exposes all 27 canonical Themed topics across the six grade sections, each a real resolvable link', () => {
    const allTopics = sections.flatMap((s) => s.topics);
    expect(allTopics).toHaveLength(27);
    expect(new Set(allTopics.map((t) => t.id)).size).toBe(27);
    for (const section of sections) {
      for (const topic of section.topics) {
        const route = getCanonicalGradeRouteById(topic.id);
        expect(route?.grade).toBe(section.grade);
        expect(route?.classification).toBe('themed-spelling-practice');
        expect(topic.href).toBe(route?.canonicalPath);
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
