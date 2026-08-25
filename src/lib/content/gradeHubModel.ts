import { getCanonicalGradeRoutes, getGradeHubGatewayLinks, type GradeRouteClassification } from './canonicalGradeRoutes';
import { gradeHubCopy } from './gradeHubCopy';
import { gradeHubPreview } from './gradeHubPreview';
import { THEMED_TOPIC_DISPLAY_LABELS } from './strandGatewayModel';
import type { GradeCode } from './gradeConfig';
import type { SpellingListEntry } from './spellingLists';

export type GradeHubStrandSummary = {
  strand: GradeRouteClassification;
  label: string;
  href: string;
  memberCount: number;
  wordCount: number;
  /**
   * The templated, semantics-required sentence ("main systematic path" / "alongside Core
   * Spelling" / "optional additional practice"). Kept for callers/tests that depend on its
   * exact required phrases; the rendered card uses `cardDescription` instead (see docs/content/
   * CANONICAL_GRADE_HUB_STANDARD.md §6.1 — Grade Hub V2 consolidates rather than appends).
   */
  summary: string;
  /** Consolidated, grade-specific card copy — carries the same required facts as `summary`, in
   * more concise language, plus the grade-specific fact from gradeHubPreview.ts. This is what
   * GradeHubView.astro renders; `summary` is not rendered a second time. */
  cardDescription: string;
  /** Up to four plain-text representative items (Core: unit titles, HFW: words, Themed: topic labels). Never rendered as links. */
  previewItems: readonly string[];
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
  const preview = gradeHubPreview[grade];

  const resolveTitle = (id: string): string => {
    const entry = entriesById.get(id);
    if (!entry) throw new Error(`${grade} Grade Hub preview could not resolve representative id ${id}`);
    return entry.data.title;
  };
  // Themed titles carry a redundant "{Grade} ... Spelling Words" wrapper; use the same explicit,
  // curated display-label map the cross-grade Themed gateway uses rather than copied/stripped text.
  const resolveThemedLabel = (id: string): string => THEMED_TOPIC_DISPLAY_LABELS[id] ?? resolveTitle(id);

  const strands = getGradeHubGatewayLinks(grade).map(({ strand, label, href }) => {
    const members = membersByStrand.get(strand) ?? [];
    const memberCount = members.length;
    const wordCount = members.reduce((total, entry) => total + entry.data.words.length, 0);
    const summary = {
      'core-spelling': `Core Spelling is the main systematic path. Its ${memberCount} ordered units ${copy.coreScope}`,
      'high-frequency-words': `${copy.hfwRelationship} These ${memberCount} sets provide practice with ${wordCount} grade-level words.`,
      'themed-spelling-practice': copy.themedFraming.replace('{count}', String(memberCount)),
    }[strand];
    const cardDescription = {
      'core-spelling': `Core Spelling is the main systematic path: ${memberCount} ordered units move from ${preview.coreFact}.`,
      'high-frequency-words': `High-Frequency Words are practiced alongside Core Spelling — ${wordCount} words across ${memberCount} sets, drawing on ${preview.hfwFact}.`,
      'themed-spelling-practice': `Themed Spelling Practice is optional additional practice: ${memberCount} lists cover ${preview.themedFact}.`,
    }[strand];
    const previewItems = {
      'core-spelling': preview.coreRepresentativeIds.map(resolveTitle),
      'high-frequency-words': preview.hfwRepresentativeWords,
      'themed-spelling-practice': preview.themedRepresentativeIds.map(resolveThemedLabel),
    }[strand];
    return { strand, label, href, memberCount, wordCount, summary, cardDescription, previewItems, linkLabel: `Explore ${label}` };
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
