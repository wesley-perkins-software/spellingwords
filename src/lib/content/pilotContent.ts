import type { GradeCode } from './gradeConfig';
import type { GradeRouteClassification } from './canonicalGradeRoutes';

/**
 * Single source of truth for which real production routes render through the
 * new "Direction A" design system during the staged migration (see
 * docs/architecture — the Direction A production pilot). Every template that
 * can show Direction A checks one of the `isPilot*` helpers below instead of
 * hardcoding slug checks — extending the pilot, or eventually retiring it in
 * favor of full rollout, is an edit to the arrays here, not a hunt through
 * components.
 *
 * IDs are content `id`s (the collection entry's stable identifier), never
 * URL slugs — a few canonical routes have a slug that doesn't match the
 * content id (e.g. Grade 2 "Compound Words" is content id `grade-2-list-02`,
 * not `compound-words`), so slug-based checks would silently miss those.
 */

export const PILOT_GRADE_HUB_GRADES: readonly GradeCode[] = ['K', '5'];

export const PILOT_GRADE_UNIT_IDS: readonly string[] = [
  'kindergarten-short-a-words', // /kindergarten/core-spelling/short-a-words
  'grade-2-list-02', // /2nd-grade/core-spelling/compound-words
  'grade-4-commonly-confused-words', // /4th-grade/core-spelling/commonly-confused-words
  'kindergarten-color-words', // /kindergarten/themed-spelling-practice/color-words
  'grade-1-high-frequency-words-set-1', // /1st-grade/high-frequency-words/set-1
];

export const PILOT_SKILL_IDS: readonly string[] = [
  'vowel-teams-ai-ay', // /skills/ai-ay-vowel-teams
  'short-a-words', // /skills/short-a-words
  'digraph-ch-words', // /skills/ch-digraph-words
  'silent-e-long-o', // /skills/long-o-silent-e
  'greek-and-latin-roots', // /skills/greek-and-latin-roots
];

export function isPilotGradeHub(grade: GradeCode): boolean {
  return (PILOT_GRADE_HUB_GRADES as readonly string[]).includes(grade);
}

export function isPilotGradeUnit(id: string): boolean {
  return PILOT_GRADE_UNIT_IDS.includes(id);
}

export function isPilotSkill(id: string): boolean {
  return PILOT_SKILL_IDS.includes(id);
}

/**
 * Restrained accent mapping for the pilot — deliberately small (documented
 * here in full, not scattered) so it can be evaluated as a whole rather than
 * requiring a legend. Two independent axes:
 *
 * - Grade Unit strand accent: reused verbatim from Direction A's own Grade
 *   Hub exploration (design-explore/direction-a/grade-hub.astro), so the
 *   Grade Hub's strand cards and a Grade Unit page's own strand accent stay
 *   the same color for the same strand.
 * - Skill-family accent: one explicit hue per family actually represented in
 *   the pilot. The other 7 families in SPELLING_SKILL_FAMILIES are
 *   deliberately left unassigned — inventing accents for skills the pilot
 *   never renders would be exactly the "invent a huge mapping up front"
 *   the pilot is supposed to avoid. Extend this table as more Skills join
 *   the pilot in a later rollout.
 */
export type DaAccent = 'brand' | 'coral' | 'sun' | 'teal' | 'pink' | 'periwinkle';

export const STRAND_ACCENT: Record<GradeRouteClassification, DaAccent> = {
  'core-spelling': 'sun',
  'high-frequency-words': 'teal',
  'themed-spelling-practice': 'periwinkle',
};

export const SKILL_FAMILY_ACCENT: Record<string, DaAccent> = {
  'Short Vowels': 'sun',
  'Vowel Teams': 'brand',
  'Consonant Digraphs': 'teal',
  'Silent E': 'periwinkle',
  'Greek and Latin Roots': 'pink',
};
