import { gradeConfig, type GradeCode } from './gradeConfig';
import {
  canonicalGradeRoutes,
  getGradeStrandPath,
  type CanonicalGradeRoute,
} from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM, HF_WORDS_TOTAL_SET_COUNT, HF_WORDS_TOTAL_WORD_COUNT } from './hfWordsCurriculum';
import { coreSpellingGatewaySummaries, hfwGatewaySummaries, themedGatewaySummaries } from './strandGatewayPreview';
import { CORE_UNIT_SAMPLE_WORDS, HFW_SET_SAMPLE_WORDS } from './strandIndexSamples';
import type { SpellingListEntry } from './spellingLists';

export { HF_WORDS_TOTAL_SET_COUNT, HF_WORDS_TOTAL_WORD_COUNT };

export interface CoreIndexUnit {
  id: string;
  href: string;
  title: string;
  sampleWords: readonly string[];
}

export interface CoreGatewaySection {
  grade: GradeCode;
  label: string;
  gatewayHref: string;
  unitCount: number;
  summary: string;
  /** Every canonical Core unit for this grade, in curriculum order — /core-spelling is a
   * complete linked index (docs/content/CANONICAL_GRADE_HUB_STANDARD.md §6.1, 2026-08-21
   * refinement), unlike the bounded, non-linked Grade Hub preview. */
  units: readonly CoreIndexUnit[];
}

/** Builds the six grade sections for /core-spelling. Titles resolve from live content, never copied. */
export function buildCoreSpellingGatewayModel(entries: SpellingListEntry[]): readonly CoreGatewaySection[] {
  const entriesById = new Map(entries.map((entry) => [entry.data.id, entry]));
  return gradeConfig.map(({ grade, label }) => {
    const routes = canonicalGradeRoutes.filter((r) => r.grade === grade && r.classification === 'core-spelling');
    const units = routes.map((route) => {
      const entry = entriesById.get(route.id);
      if (!entry) throw new Error(`/core-spelling could not resolve unit id ${route.id}`);
      const sampleWords = CORE_UNIT_SAMPLE_WORDS[route.id];
      if (!sampleWords) throw new Error(`/core-spelling has no curated sample words for unit id ${route.id}`);
      return { id: route.id, href: route.canonicalPath, title: entry.data.title, sampleWords };
    });
    return {
      grade,
      label,
      gatewayHref: getGradeStrandPath(grade, 'core-spelling'),
      unitCount: routes.length,
      summary: coreSpellingGatewaySummaries[grade].summary,
      units,
    };
  });
}

export interface HfwIndexSet {
  id: string;
  href: string;
  title: string;
  wordCount: number;
  sampleWords: readonly string[];
}

export interface HfwGatewaySection {
  grade: GradeCode;
  label: string;
  gatewayHref: string;
  setCount: number;
  wordCount: number;
  role: string;
  /** Every canonical HFW set for this grade, in canonical order — complete linked index. */
  sets: readonly HfwIndexSet[];
}

/** Builds the six grade sections for /high-frequency-words. Counts derive live from the frozen curriculum. */
export function buildHfwGatewayModel(entries: SpellingListEntry[]): readonly HfwGatewaySection[] {
  const entriesById = new Map(entries.map((entry) => [entry.data.id, entry]));
  return gradeConfig.map(({ grade, label }) => {
    const frozenSets = FROZEN_HF_WORDS_CURRICULUM[grade];
    const sets = frozenSets.map((set) => {
      const route = canonicalGradeRoutes.find((r) => r.id === set.id);
      if (!route) throw new Error(`/high-frequency-words could not resolve canonical route for set id ${set.id}`);
      const entry = entriesById.get(set.id);
      if (!entry) throw new Error(`/high-frequency-words could not resolve set id ${set.id}`);
      const sampleWords = HFW_SET_SAMPLE_WORDS[set.id];
      if (!sampleWords) throw new Error(`/high-frequency-words has no curated sample words for set id ${set.id}`);
      return { id: set.id, href: route.canonicalPath, title: entry.data.title, wordCount: set.words.length, sampleWords };
    });
    return {
      grade,
      label,
      gatewayHref: getGradeStrandPath(grade, 'high-frequency-words'),
      setCount: frozenSets.length,
      wordCount: frozenSets.reduce((total, set) => total + set.words.length, 0),
      role: hfwGatewaySummaries[grade].role,
      sets,
    };
  });
}

export interface ThemedTopic {
  id: string;
  href: string;
  label: string;
}

export interface ThemedGatewaySection {
  grade: GradeCode;
  label: string;
  gatewayHref: string;
  intro: string;
  topics: readonly ThemedTopic[];
}

/**
 * Explicit display labels for Themed topic titles whose canonical form repeats the grade name
 * and a "Spelling Words" wrapper (e.g. "2nd Grade Transportation Spelling Words"). This is a
 * curated map, not render-time regex stripping, per docs/content/CANONICAL_GRADE_HUB_STANDARD.md
 * §6.1 / the strand-gateway feature spec's explicit prohibition on brittle title stripping.
 */
export const THEMED_TOPIC_DISPLAY_LABELS: Readonly<Record<string, string>> = {
  'kindergarten-animal-words': 'Animal Words',
  'kindergarten-body-words': 'Body Words',
  'kindergarten-number-words': 'Number Words',
  'kindergarten-color-words': 'Color Words',
  'kindergarten-family-words': 'Family Words',
  'grade-1-weather-words': 'Weather Words',
  'grade-1-clothing-words': 'Clothing Words',
  'grade-1-shape-words': 'Shape Words',
  'grade-1-number-words-11-20': 'Number Words (11–20)',
  'grade-1-days-of-the-week': 'Days of the Week',
  'grade-2-transportation-words': 'Transportation Words',
  'grade-2-money-words': 'Money Words',
  'grade-2-number-words-20-100': 'Number Words (20–100)',
  'grade-2-community-helpers': 'Community Helpers',
  'grade-2-months-of-the-year': 'Months of the Year',
  'grade-3-map-globe-words': 'Map & Globe Words',
  'grade-3-life-cycle-words': 'Life Cycle Words',
  'grade-3-time-words': 'Time Words',
  'grade-3-multiplication-division-words': 'Multiplication & Division Words',
  'grade-4-measurement-words': 'Measurement Words',
  'grade-4-solar-system-words': 'Solar System Words',
  'grade-4-career-occupation-words': 'Career & Occupation Words',
  'grade-4-geometry-words': 'Geometry Words',
  'grade-5-money-management-words': 'Money Management Words',
  'grade-5-ecosystem-environment-words': 'Ecosystem & Environment Words',
  'grade-5-fraction-decimal-words': 'Fraction & Decimal Words',
  'grade-5-community-civics-words': 'Civics & Government Words',
};

function displayLabelFor(route: CanonicalGradeRoute, entry: SpellingListEntry): string {
  return THEMED_TOPIC_DISPLAY_LABELS[route.id] ?? entry.data.title;
}

/** Builds the six grade sections for /themed-spelling-practice, showing every canonical topic. */
export function buildThemedGatewayModel(entries: SpellingListEntry[]): readonly ThemedGatewaySection[] {
  const entriesById = new Map(entries.map((entry) => [entry.data.id, entry]));
  return gradeConfig.map(({ grade, label }) => {
    const routes = canonicalGradeRoutes.filter((r) => r.grade === grade && r.classification === 'themed-spelling-practice');
    const topics = routes.map((route) => {
      const entry = entriesById.get(route.id);
      if (!entry) throw new Error(`/themed-spelling-practice could not resolve topic id ${route.id}`);
      return { id: route.id, href: route.canonicalPath, label: displayLabelFor(route, entry) };
    });
    return {
      grade,
      label,
      gatewayHref: getGradeStrandPath(grade, 'themed-spelling-practice'),
      intro: themedGatewaySummaries[grade].intro,
      topics,
    };
  });
}
