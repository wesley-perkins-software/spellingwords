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

/**
 * Grade identity — a second, independent accent axis from strand (see
 * STRAND_ACCENT above). Reused verbatim from Direction A's own homepage
 * grade-grid mock (design-explore/direction-a/index.astro), not invented
 * for this refinement — so Grade Unit pages carry the same grade-color
 * language a visitor already saw on the homepage/Grade Hub. Applied only
 * to Grade Unit pages (grade chip, a thin structural rule, and the
 * related-learning card accent) — canonical Skill pages are grade-
 * independent and never use this map; their identity comes from
 * SKILL_FAMILY_ACCENT instead. Coral is Grade 1's identity color here AND
 * the site's one action color (STRAND/GRADE_ACCENT never controls a
 * Practice CTA's color — that always renders via Button's own coral
 * variant, regardless of which grade or strand the page belongs to).
 */
export const GRADE_ACCENT: Record<GradeCode, DaAccent> = {
  K: 'sun',
  '1': 'coral',
  '2': 'teal',
  '3': 'periwinkle',
  '4': 'pink',
  '5': 'brand',
};

/** Tailwind class lookups for each accent, written as literal strings (not
 * template-built) in every table below so Tailwind's JIT scanner can find
 * them — see the same convention already used in RelatedListCards.astro. */
export const ACCENT_BG_CLASS: Record<DaAccent, string> = {
  brand: 'bg-da-brand',
  coral: 'bg-da-coral',
  sun: 'bg-da-sun',
  teal: 'bg-da-teal',
  pink: 'bg-da-pink',
  periwinkle: 'bg-da-periwinkle',
};

export const ACCENT_TINT_BG_CLASS: Record<DaAccent, string> = {
  brand: 'bg-da-brand-tint',
  coral: 'bg-da-coral-tint',
  sun: 'bg-da-sun-tint',
  teal: 'bg-da-teal-tint',
  pink: 'bg-da-pink-tint',
  periwinkle: 'bg-da-periwinkle-tint',
};

export const ACCENT_BORDER_CLASS: Record<DaAccent, string> = {
  brand: 'border-da-brand',
  coral: 'border-da-coral',
  sun: 'border-da-sun',
  teal: 'border-da-teal',
  pink: 'border-da-pink',
  periwinkle: 'border-da-periwinkle',
};

export const ACCENT_INK_CLASS: Record<DaAccent, string> = {
  brand: 'text-da-brand-strong',
  coral: 'text-da-coral-ink',
  sun: 'text-da-sun-ink',
  teal: 'text-da-teal-ink',
  pink: 'text-da-pink-ink',
  periwinkle: 'text-da-periwinkle-ink',
};

/** Same accent bg color, expressed as a `before:` pseudo-element variant —
 * for the left-edge-accent card treatment (relative + before:absolute
 * before:inset-y-0 before:left-0 before:w-1.5). Kept as its own literal
 * table (rather than derived at render time) so Tailwind's JIT scanner can
 * find the full class string. */
export const ACCENT_BEFORE_BG_CLASS: Record<DaAccent, string> = {
  brand: 'before:bg-da-brand',
  coral: 'before:bg-da-coral',
  sun: 'before:bg-da-sun',
  teal: 'before:bg-da-teal',
  pink: 'before:bg-da-pink',
  periwinkle: 'before:bg-da-periwinkle',
};
