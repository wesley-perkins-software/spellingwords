import { getCanonicalGradeRoutes, getGradeHubGatewayLinks, type GradeRouteClassification } from './canonicalGradeRoutes';
import { gradeHubCopy } from './gradeHubCopy';
import type { GradeCode } from './gradeConfig';
import type { SpellingListEntry } from './spellingLists';

export type GradeHubStrandSummary = {
  strand: GradeRouteClassification;
  label: string;
  href: string;
  memberCount: number;
  wordCount: number;
  summary: string;
  linkLabel: string;
};

export type GradeHubModel = {
  grade: GradeCode;
  metaDescription: string;
  orientation: readonly [string, string];
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
  const strands = getGradeHubGatewayLinks(grade).map(({ strand, label, href }) => {
    const members = membersByStrand.get(strand) ?? [];
    const memberCount = members.length;
    const wordCount = members.reduce((total, entry) => total + entry.data.words.length, 0);
    const summary = {
      'core-spelling': `Core Spelling is the main systematic path. Its ${memberCount} ordered units ${copy.coreScope}`,
      'high-frequency-words': `${copy.hfwRelationship} These ${memberCount} sets provide practice with ${wordCount} grade-level words.`,
      'themed-spelling-practice': copy.themedFraming.replace('{count}', String(memberCount)),
    }[strand];
    return { strand, label, href, memberCount, wordCount, summary, linkLabel: `Explore ${label}` };
  });

  return { grade, metaDescription: copy.metaDescription, orientation: copy.orientation, strands, synthesis: copy.synthesis };
}
