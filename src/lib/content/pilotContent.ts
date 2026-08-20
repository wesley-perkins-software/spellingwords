import type { GradeCode } from './gradeConfig';
import type { GradeRouteClassification } from './canonicalGradeRoutes';

/**
 * Direction A is the site's production design system. This module now holds
 * only the accent mappings every Direction A view draws from — the staged
 * per-route `isPilot*` gating that used to live here has been retired route
 * family by route family as each was verified and migrated (Grade Hubs,
 * Grade Units, canonical Skills).
 */

/**
 * Restrained accent mapping — documented here in full, not scattered, so it
 * can be evaluated as a whole rather than requiring a legend. Two
 * independent axes:
 *
 * - Grade Unit strand accent: reused verbatim from Direction A's own Grade
 *   Hub exploration (design-explore/direction-a/grade-hub.astro), so the
 *   Grade Hub's strand cards and a Grade Unit page's own strand accent stay
 *   the same color for the same strand.
 * - Skill-family accent: one hue per family in SPELLING_SKILL_FAMILIES.
 *   Coral is reserved for the site's one action color, so only 5 non-coral
 *   accents exist for 12 families — families that share a conceptual
 *   neighborhood share an accent rather than each getting an invented,
 *   arbitrary hue:
 *     sun        — Short Vowels (foundational phonics)
 *     teal       — Consonant Digraphs, Consonant Blends, Common Spelling
 *                  Patterns (consonant-sound / consonant-adjacent conventions)
 *     brand      — Vowel Teams, R-Controlled Vowels, Multisyllabic Words
 *                  (vowel-sound and word-structure families)
 *     periwinkle — Silent E, Homophones and Commonly Confused Words
 *                  (spelling-by-meaning / usage nuance)
 *     pink       — Greek and Latin Roots, Word Building and Endings,
 *                  Prefixes (word-parts / morphology)
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
  'Consonant Blends': 'teal',
  'Common Spelling Patterns': 'teal',
  'R-Controlled Vowels': 'brand',
  'Multisyllabic Words': 'brand',
  'Silent E': 'periwinkle',
  'Homophones and Commonly Confused Words': 'periwinkle',
  'Greek and Latin Roots': 'pink',
  'Word Building and Endings': 'pink',
  Prefixes: 'pink',
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

/** Same accent as a low-opacity wash over the canvas, for large surfaces
 * (e.g. a Grade Unit hero) where the full-strength `-tint` token would read
 * as too saturated. Uses Tailwind's built-in color-opacity modifier on the
 * same da.* colors already in tailwind.config.mjs — no new hex values. */
export const ACCENT_WASH_BG_CLASS: Record<DaAccent, string> = {
  brand: 'bg-da-brand/20',
  coral: 'bg-da-coral/20',
  sun: 'bg-da-sun/20',
  teal: 'bg-da-teal/20',
  pink: 'bg-da-pink/20',
  periwinkle: 'bg-da-periwinkle/20',
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
