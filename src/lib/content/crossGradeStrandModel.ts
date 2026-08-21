import {
  getCanonicalGradeRoutes,
  getGradeStrandPath,
  type GradeRouteClassification,
} from './canonicalGradeRoutes';
import { crossGradeStrandCopy, themedTopicLabels } from './crossGradeStrands';
import { gradeConfig, type GradeCode } from './gradeConfig';
import { FROZEN_HF_WORDS_CURRICULUM } from './hfWordsCurriculum';
import type { SpellingListEntry } from './spellingLists';

export type CrossGradeStrandGrade = {
  grade: GradeCode;
  label: string;
  href: string;
  summary: string;
  memberCount: number;
  wordCount: number;
  examples: readonly string[];
};

export type CrossGradeStrandModel = {
  strand: GradeRouteClassification;
  title: string;
  description: string;
  eyebrow: string;
  intro: readonly string[];
  grades: readonly CrossGradeStrandGrade[];
};

/** Builds a cross-grade overview from canonical membership plus separately authored synthesis. */
export function buildCrossGradeStrandModel(
  strand: GradeRouteClassification,
  entries: SpellingListEntry[],
): CrossGradeStrandModel {
  const copy = crossGradeStrandCopy[strand];
  const entriesById = new Map(entries.map((entry) => [entry.data.id, entry]));
  const grades = gradeConfig.map(({ grade, label }) => {
    const routes = getCanonicalGradeRoutes().filter(
      (route) => route.grade === grade && route.classification === strand,
    );
    const members = routes.map((route) => {
      const entry = entriesById.get(route.id);
      if (!entry) throw new Error(`${copy.title} could not resolve ${route.id}`);
      return entry;
    });
    const wordCount = members.reduce((total, entry) => total + entry.data.words.length, 0);
    let examples: readonly string[] = [];

    if (strand === 'core-spelling') {
      const ids = copy.coreRepresentativeIds?.[grade];
      if (!ids) throw new Error(`Missing ${grade} Core cross-grade examples`);
      examples = ids.map((id) => {
        const route = routes.find((candidate) => candidate.id === id);
        const entry = entriesById.get(id);
        if (!route || !entry) throw new Error(`Invalid ${grade} Core cross-grade example: ${id}`);
        return entry.data.title;
      });
    } else if (strand === 'themed-spelling-practice') {
      const topics = themedTopicLabels[grade];
      const routeIds = new Set(routes.map((route) => route.id));
      if (topics.length !== routes.length || topics.some(({ id }) => !routeIds.has(id))) {
        throw new Error(`${grade} themed topic labels do not match canonical membership`);
      }
      examples = topics.map(({ label: topicLabel }) => topicLabel);
    } else {
      const sets = FROZEN_HF_WORDS_CURRICULUM[grade];
      if (sets.length !== routes.length || sets.flatMap((set) => set.words).length !== wordCount) {
        throw new Error(`${grade} HFW overview does not match the frozen curriculum`);
      }
    }

    return {
      grade,
      label,
      href: getGradeStrandPath(grade, strand),
      summary: copy.gradeSummaries[grade],
      memberCount: members.length,
      wordCount,
      examples,
    };
  });

  return {
    strand,
    title: copy.title,
    description: copy.description,
    eyebrow: copy.eyebrow,
    intro: copy.intro,
    grades,
  };
}
