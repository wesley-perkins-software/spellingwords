import type { GradeCode } from './gradeConfig';
import type { GradeRouteClassification } from './canonicalGradeRoutes';

/**
 * Direction A is the site's production design system. This module holds the
 * accent mappings every Direction A view draws from — the staged per-route
 * `isPilot*` gating that used to live here has been retired route family by
 * route family as each was verified and migrated (Grade Hubs, Grade Units,
 * canonical Skills).
 *
 * Color semantics — one unambiguous job per color, enforced across the site:
 *
 *   brand blue     — SpellingWords structure/navigation/brand only. Never a
 *                    grade, strand, or Skill-family identity color.
 *   coral          — the one primary-action color (Practice/Start/Check
 *                    Spelling CTAs). Never a grade, strand, or Skill-family
 *                    identity color, and never controlled by GRADE_ACCENT/
 *                    STRAND_ACCENT — Button's `primary` variant is always
 *                    coral regardless of which grade/strand page it's on.
 *   grade palette  — GRADE_ACCENT below. Answers "what learner level am I
 *                    in?" — chip, hero atmosphere/wash, structural rule,
 *                    related-learning accent on Grade Unit pages, plus the
 *                    Grade Hub's own near-white page atmosphere.
 *   strand palette — STRAND_ACCENT below. Answers "what type of spelling
 *                    work is this?" — Grade Hub destination cards, Grade
 *                    Unit word-bank tint/section eyebrow, gateway pages.
 *   Skill-family   — SKILL_FAMILY_ACCENT below. Answers "which canonical
 *                    Skill grouping?" — grade-independent, a separate
 *                    system from grade identity.
 *   very dark ink  — da-ink/da-ink-soft (tailwind.config.mjs). Primary
 *                    reading text site-wide; never grayed out by default.
 *
 * Grade, strand, and Skill-family draw from the same non-brand/non-coral hue
 * pool and may reuse a hue where their page roles never compete for the same
 * visual space (e.g. Grade 2 and the High-Frequency Words strand are both
 * teal, but a grade chip and a strand-tinted word bank never read as the
 * same signal). What they may never do is reach into brand or coral.
 */
export type DaAccent = 'brand' | 'coral' | 'sun' | 'teal' | 'pink' | 'periwinkle' | 'green' | 'plum';

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
 * Grade identity — a third, independent accent axis from strand and Skill-
 * family (see above). Applied to Grade Unit pages (grade chip, hero wash, a
 * thin structural rule, the related-learning card accent) and to the Grade
 * Hub's own page atmosphere (see GRADE_ATMOSPHERE_TONE below) — canonical
 * Skill pages are grade-independent and never use this map.
 *
 * K, 2, 3, and 4 reuse hues already established for strand/Skill-family use
 * (sun, teal, periwinkle, pink) — deliberately, not by accident: adapting an
 * existing hue is preferred over inventing a new one where the roles don't
 * collide (see the module doc above). Grade 1 and Grade 5 needed genuinely
 * new hues: every other slot in the existing non-brand/non-coral pool was
 * taken, and Grade 1 previously borrowed action coral while Grade 5 borrowed
 * structural brand blue — the exact conflict this mapping exists to fix.
 * `green` and `plum` (tailwind.config.mjs) were added for exactly those two
 * slots, chosen to stay clearly distinct from both reserved colors and from
 * each other.
 */
export const GRADE_ACCENT: Record<GradeCode, DaAccent> = {
  K: 'sun',
  '1': 'green',
  '2': 'teal',
  '3': 'periwinkle',
  '4': 'pink',
  '5': 'plum',
};

/**
 * Grade Hub page-atmosphere surfaces — one near-white, low-chroma tone per
 * grade (tailwind.config.mjs `surface-grade-*`), derived from that grade's
 * GRADE_ACCENT hue but nowhere near its saturation. Every Grade Hub shares
 * the identical template and layout; this is the one deliberately subtle
 * signal that differs — "I moved into another grade," not "this page is
 * green." Kept as its own lookup (not derived from GRADE_ACCENT at render
 * time) so AtmosphereBand's tone prop stays a plain string union Tailwind's
 * JIT scanner can find.
 */
export const GRADE_ATMOSPHERE_TONE: Record<
  GradeCode,
  'grade-k' | 'grade-1' | 'grade-2' | 'grade-3' | 'grade-4' | 'grade-5'
> = {
  K: 'grade-k',
  '1': 'grade-1',
  '2': 'grade-2',
  '3': 'grade-3',
  '4': 'grade-4',
  '5': 'grade-5',
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
  green: 'bg-da-green',
  plum: 'bg-da-plum',
};

export const ACCENT_TINT_BG_CLASS: Record<DaAccent, string> = {
  brand: 'bg-da-brand-tint',
  coral: 'bg-da-coral-tint',
  sun: 'bg-da-sun-tint',
  teal: 'bg-da-teal-tint',
  pink: 'bg-da-pink-tint',
  periwinkle: 'bg-da-periwinkle-tint',
  green: 'bg-da-green-tint',
  plum: 'bg-da-plum-tint',
};

export const ACCENT_BORDER_CLASS: Record<DaAccent, string> = {
  brand: 'border-da-brand',
  coral: 'border-da-coral',
  sun: 'border-da-sun',
  teal: 'border-da-teal',
  pink: 'border-da-pink',
  periwinkle: 'border-da-periwinkle',
  green: 'border-da-green',
  plum: 'border-da-plum',
};

export const ACCENT_INK_CLASS: Record<DaAccent, string> = {
  brand: 'text-da-brand-strong',
  coral: 'text-da-coral-ink',
  sun: 'text-da-sun-ink',
  teal: 'text-da-teal-ink',
  pink: 'text-da-pink-ink',
  periwinkle: 'text-da-periwinkle-ink',
  green: 'text-da-green-ink',
  plum: 'text-da-plum-ink',
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
  green: 'bg-da-green/20',
  plum: 'bg-da-plum/20',
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
  green: 'before:bg-da-green',
  plum: 'before:bg-da-plum',
};
