import type { GradeCode } from './gradeConfig';
import type { GradeRouteClassification } from './canonicalGradeRoutes';

export interface GradeStrandGatewayFacts {
  memberCount: number;
  wordCount: number;
}

export interface GradeStrandGatewayCopy {
  orientation: string;
  synthesis: string;
  guidance?: string;
}

type GatewayCopyAuthor = (facts: GradeStrandGatewayFacts) => GradeStrandGatewayCopy;

const kindergartenGatewayCopy: Record<GradeRouteClassification, GatewayCopyAuthor> = {
  'core-spelling': ({ memberCount }) => ({
    orientation: `Kindergarten Core Spelling is the systematic starting route: ${memberCount} units move from familiar first words through short-vowel spelling, mixed CVC review, and consonant digraphs.`,
    synthesis:
      'The sequence first gives each short vowel its own focused practice, then asks children to distinguish those vowel sounds in fresh CVC words before introducing SH, CH, and TH.',
    guidance:
      'Begin with First Words if spelling from sounds is new. If simple short-vowel words are already comfortable, choose the earliest vowel unit that still feels useful and continue in order.',
  }),
  'high-frequency-words': ({ memberCount, wordCount }) => ({
    orientation: `Kindergarten High-Frequency Words brings together ${wordCount} commonly used spellings in ${memberCount} manageable sets.`,
    synthesis:
      'High-frequency describes how often a word is encountered or used; it does not mean that every word has an irregular spelling. Children can use sound–spelling information wherever it helps, while giving extra attention to any less-predictable detail in a word.',
    guidance:
      `The ${wordCount}-word inventory is divided into ${memberCount} sets so a child can work with a small group of spellings at a time.`,
  }),
  'themed-spelling-practice': ({ memberCount }) => ({
    orientation: `These ${memberCount} optional Kindergarten spelling-practice lists use familiar themes and are not a sequence.`,
    synthesis:
      'Animal, body, number, color, and family words each provide a recognizable context for additional spelling practice.',
    guidance:
      'Choose the theme that connects with what a child is interested in, reading about, or using in conversation. Each theme stands on its own, so there is no required order.',
  }),
};

/** Returns authored pilot copy only; Grades 1–5 continue to use the renderer fallback. */
export function getGradeStrandGatewayCopy(
  grade: GradeCode,
  strand: GradeRouteClassification,
  facts: GradeStrandGatewayFacts,
): GradeStrandGatewayCopy | undefined {
  if (grade !== 'K') return undefined;
  return kindergartenGatewayCopy[strand](facts);
}
