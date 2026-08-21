import { gradeConfig, type GradeCode } from './gradeConfig';
import {
  canonicalGradeRoutes,
  getGradeStrandPath,
  type CanonicalGradeRoute,
} from './canonicalGradeRoutes';
import { FROZEN_HF_WORDS_CURRICULUM, HF_WORDS_TOTAL_SET_COUNT, HF_WORDS_TOTAL_WORD_COUNT } from './hfWordsCurriculum';
import { coreSpellingGatewaySummaries, hfwGatewaySummaries, themedGatewaySummaries } from './strandGatewayPreview';
import { gradeHubPreview } from './gradeHubPreview';
import type { SpellingListEntry } from './spellingLists';

export { HF_WORDS_TOTAL_SET_COUNT, HF_WORDS_TOTAL_WORD_COUNT };

export interface CoreGatewaySection {
  grade: GradeCode;
  label: string;
  gatewayHref: string;
  unitCount: number;
  summary: string;
  representativeTitles: readonly string[];
}

/** Builds the six grade sections for /core-spelling. Titles resolve from live content, never copied. */
export function buildCoreSpellingGatewayModel(entries: SpellingListEntry[]): readonly CoreGatewaySection[] {
  const entriesById = new Map(entries.map((entry) => [entry.data.id, entry]));
  return gradeConfig.map(({ grade, label }) => {
    const routes = canonicalGradeRoutes.filter((r) => r.grade === grade && r.classification === 'core-spelling');
    const representativeIds = gradeHubPreview[grade].coreRepresentativeIds;
    const representativeTitles = representativeIds.map((id) => {
      const entry = entriesById.get(id);
      if (!entry) throw new Error(`/core-spelling could not resolve representative id ${id}`);
      return entry.data.title;
    });
    return {
      grade,
      label,
      gatewayHref: getGradeStrandPath(grade, 'core-spelling'),
      unitCount: routes.length,
      summary: coreSpellingGatewaySummaries[grade].summary,
      representativeTitles,
    };
  });
}

export interface HfwGatewaySection {
  grade: GradeCode;
  label: string;
  gatewayHref: string;
  setCount: number;
  wordCount: number;
  role: string;
}

/** Builds the six grade sections for /high-frequency-words. Counts derive live from the frozen curriculum. */
export function buildHfwGatewayModel(): readonly HfwGatewaySection[] {
  return gradeConfig.map(({ grade, label }) => {
    const sets = FROZEN_HF_WORDS_CURRICULUM[grade];
    return {
      grade,
      label,
      gatewayHref: getGradeStrandPath(grade, 'high-frequency-words'),
      setCount: sets.length,
      wordCount: sets.reduce((total, set) => total + set.words.length, 0),
      role: hfwGatewaySummaries[grade].role,
    };
  });
}

export interface ThemedTopic {
  id: string;
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
      return { id: route.id, label: displayLabelFor(route, entry) };
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
