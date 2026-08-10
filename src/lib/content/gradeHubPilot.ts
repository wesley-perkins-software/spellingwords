import { getCanonicalGradeRoutes, getGradeHubGatewayLinks, type GradeRouteClassification } from './canonicalGradeRoutes';
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

export type GradeHubPilot = {
  grade: GradeCode;
  orientation: readonly [string, string];
  strands: readonly GradeHubStrandSummary[];
  synthesis: string;
};

/**
 * Builds the Grade 3 pilot from the canonical member-route manifest and live
 * published content. Other Grade Hubs intentionally retain their legacy model.
 */
export function buildGrade3HubPilot(entries: SpellingListEntry[]): GradeHubPilot {
  const grade: GradeCode = '3';
  const entriesById = new Map(entries.map((entry) => [entry.data.id, entry]));
  const facts = getCanonicalGradeRoutes()
    .filter((route) => route.grade === grade)
    .reduce((groups, route) => {
      const entry = entriesById.get(route.id);
      if (!entry) throw new Error(`Grade 3 Hub could not resolve ${route.id}`);
      const group = groups.get(route.classification) ?? [];
      group.push(entry);
      groups.set(route.classification, group);
      return groups;
    }, new Map<GradeRouteClassification, SpellingListEntry[]>());

  const strands = getGradeHubGatewayLinks(grade).map(({ strand, label, href }) => {
    const members = facts.get(strand) ?? [];
    const memberCount = members.length;
    const wordCount = members.reduce((total, entry) => total + entry.data.words.length, 0);
    const content = {
      'core-spelling': {
        summary: `Core Spelling is the main systematic path. Its ${memberCount} ordered units build from prefixes and suffixes into spelling changes, possessives, multisyllabic spelling, homophones, and word families.`,
        linkLabel: 'Explore 3rd Grade Core Spelling',
      },
      'high-frequency-words': {
        summary: `High-Frequency Words are practiced alongside Core Spelling, not instead of it. These ${memberCount} sets provide practice with ${wordCount} grade-level words.`,
        linkLabel: 'Explore 3rd Grade High-Frequency Words',
      },
      'themed-spelling-practice': {
        summary: `Themed Spelling Practice offers ${memberCount} optional lists for additional practice. The lists are not required or sequential and can be explored when useful.`,
        linkLabel: 'Explore 3rd Grade Themed Spelling Practice',
      },
    }[strand];
    return { strand, label, href, memberCount, wordCount, ...content };
  });

  return {
    grade,
    orientation: [
      'In 3rd Grade, spelling begins to move beyond a mainly phonics-based focus. Students still use sound and pattern knowledge from earlier grades, while paying more attention to prefixes, suffixes, and the structure of longer words.',
      'They also learn how word parts can affect spelling and meaning, and how meaning can distinguish words that sound alike. This work builds toward using roots, word families, and other meaningful parts to spell more complex words in later grades.',
    ],
    strands,
    synthesis: 'Start with Core Spelling. Practice High-Frequency Words alongside it, and use Themed Spelling Practice for optional additional practice when useful.',
  };
}
