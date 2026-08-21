import {
  getCanonicalGradeRoutes,
  getGradeHubGatewayLinks,
  type GradeRouteClassification,
} from './canonicalGradeRoutes';
import { gradeHubCopy } from './gradeHubCopy';
import { gradeHubPreviews } from './gradeHubPreviews';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';
import type { GradeCode } from './gradeConfig';
import type { SpellingListEntry } from './spellingLists';

export type GradeHubStrandSummary = {
  strand: GradeRouteClassification;
  label: string;
  href: string;
  memberCount: number;
  wordCount: number;
  summary: string;
  previewLabel: string;
  previewExamples: readonly string[];
  linkLabel: string;
};

export type GradeHubModel = {
  grade: GradeCode;
  metaDescription: string;
  orientation: readonly [string, string];
  fingerprint: readonly string[];
  strands: readonly GradeHubStrandSummary[];
  synthesis: string;
};

/** Builds a Grade Hub from canonical routes/live word data plus grade-specific authored copy. */
export function buildGradeHubModel(grade: GradeCode, entries: SpellingListEntry[]): GradeHubModel {
  const entriesById = new Map(entries.map((entry) => [entry.data.id, entry]));
  const membersByStrand = getCanonicalGradeRoutes()
    .filter((route) => route.grade === grade)
    .reduce((groups, route) => {
      const entry = entriesById.get(route.id);
      if (!entry) throw new Error(`${grade} Grade Hub could not resolve ${route.id}`);
      const members = groups.get(route.classification) ?? [];
      members.push(entry);
      groups.set(route.classification, members);
      return groups;
    }, new Map<GradeRouteClassification, SpellingListEntry[]>());

  const copy = gradeHubCopy[grade];
  const preview = gradeHubPreviews[grade];
  const strands = getGradeHubGatewayLinks(grade).map(({ strand, label, href }) => {
    const members = membersByStrand.get(strand) ?? [];
    const memberCount = members.length;
    const wordCount = members.reduce((total, entry) => total + entry.data.words.length, 0);
    const previewConfig = {
      'core-spelling': {
        label: 'A few units you’ll find here',
        examples: preview.core.representativeIds.map((id) => {
          const route = getCanonicalGradeRoutes().find((candidate) => candidate.id === id);
          const entry = entriesById.get(id);
          if (!route || route.grade !== grade || route.classification !== strand || !entry) {
            throw new Error(`${grade} Grade Hub has an invalid Core preview id: ${id}`);
          }
          return entry.data.title;
        }),
        summary: `Core Spelling is the main systematic path. Its ${memberCount} ordered units form this grade’s sequence. ${preview.core.summary}`,
      },
      'high-frequency-words': {
        label: 'Examples include',
        examples: preview.hfw.representativeWords.map((word) => {
          const isCanonical = FROZEN_HF_WORDS_CURRICULUM[grade].some((set) =>
            set.words.some((candidate) => candidate === word),
          );
          if (!isCanonical)
            throw new Error(`${grade} Grade Hub has an invalid HFW preview word: ${word}`);
          return word;
        }),
        summary: `${copy.hfwRelationship} These ${memberCount} sets provide practice with ${wordCount} grade-level words. ${preview.hfw.summary}`,
      },
      'themed-spelling-practice': {
        label: 'Topics include',
        examples: preview.themed.representativeIds.map((id) => {
          const route = getCanonicalGradeRoutes().find((candidate) => candidate.id === id);
          const displayLabel = preview.themed.displayLabels[id];
          if (
            !route ||
            route.grade !== grade ||
            route.classification !== strand ||
            !entriesById.has(id) ||
            !displayLabel
          ) {
            throw new Error(`${grade} Grade Hub has an invalid Themed preview id: ${id}`);
          }
          return displayLabel;
        }),
        summary: `${copy.themedFraming.replace('{count}', String(memberCount))} ${preview.themed.summary}`,
      },
    }[strand];
    return {
      strand,
      label,
      href,
      memberCount,
      wordCount,
      summary: previewConfig.summary,
      previewLabel: previewConfig.label,
      previewExamples: previewConfig.examples,
      linkLabel: `Explore ${label}`,
    };
  });

  return {
    grade,
    metaDescription: copy.metaDescription,
    orientation: copy.orientation,
    fingerprint: preview.fingerprint,
    strands,
    synthesis: copy.synthesis,
  };
}
