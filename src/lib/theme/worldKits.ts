/**
 * Grade Unit "world kits" — a small, curated set of color moods that a Grade
 * Unit page is deterministically assigned to, based on its permanent content
 * `id`. The id never changes once published, so a given list always renders
 * in the same kit across builds — no client-side randomness, no hydration
 * mismatch.
 *
 * Nine kits exist today. Each is just a gradient (sky-top down to a paper
 * horizon) plus one accent color used for the CTA button and the
 * highlighted spelling pattern in the practice words — no illustration
 * elements. Adding a tenth kit redistributes all existing lists
 * automatically — nothing about an existing list needs to change.
 */

import { meetsContrast } from './contrast';

export type WorldKitId =
  | 'morning-blue'
  | 'soft-sage'
  | 'warm-peach'
  | 'lavender'
  | 'cream'
  | 'golden-meadow'
  | 'forest-green'
  | 'sunset'
  | 'soft-coral';

export interface WorldKitPalette {
  /** Sky/backdrop gradient stops, top to bottom. */
  skyTop: string;
  skyMid: string;
  skyHorizon: string;
  /**
   * The world's single accent color: CTA, underlines, decorative touches.
   * Deliberately a hue family DIFFERENT from the kit's own sky gradient
   * (not a darker shade of the same hue) — a same-family accent can pass a
   * numeric contrast check yet still read as "the same color" as the
   * background at a glance (this happened for real: Lavender's old purple
   * accent on its own purple-pink gradient).
   *
   * NOTE: the accent is decorative only. It is NOT guaranteed to be
   * readable against every zone of the hero gradient (in practice it never
   * clears 4.5:1 against `skyTop`/`skyMid` for any kit) — the highlighted
   * grapheme in the practice words never uses this color directly. See
   * `resolveHighlightColor()` below for the readability-guaranteed color.
   */
  accent: string;
  accentSoft: string;
}

export interface WorldKit {
  id: WorldKitId;
  name: string;
  /** One line describing the mood. */
  tagline: string;
  palette: WorldKitPalette;
}

/** Fixed order — this is what `hash(id) % length` indexes into. Never reorder. */
const WORLD_KIT_ORDER: WorldKitId[] = [
  'morning-blue',
  'soft-sage',
  'warm-peach',
  'lavender',
  'cream',
  'golden-meadow',
  'forest-green',
  'sunset',
  'soft-coral',
];

export const WORLD_KITS: Record<WorldKitId, WorldKit> = {
  'morning-blue': {
    id: 'morning-blue',
    name: 'Morning Blue',
    tagline: 'a clear sky, just past sunrise',
    palette: {
      skyTop: '#4A78C7',
      skyMid: '#8CB2E6',
      skyHorizon: '#E4F1FA',
      accent: '#C63A2F',
      accentSoft: '#E9B4B0',
    },
  },
  'soft-sage': {
    id: 'soft-sage',
    name: 'Soft Sage',
    tagline: 'quiet green, like a calm afternoon',
    palette: {
      skyTop: '#7C9A82',
      skyMid: '#A9C2A0',
      skyHorizon: '#E8EDD9',
      accent: '#7151D6',
      accentSoft: '#C9BDEF',
    },
  },
  'warm-peach': {
    id: 'warm-peach',
    name: 'Warm Peach',
    tagline: 'soft light, like the last hour before dinner',
    palette: {
      skyTop: '#F0A691',
      skyMid: '#F7C9A8',
      skyHorizon: '#FDE8D2',
      accent: '#1B746C',
      accentSoft: '#A8CAC7',
    },
  },
  lavender: {
    id: 'lavender',
    name: 'Lavender',
    tagline: 'a dusky purple evening',
    palette: {
      // Lightened ~12% from #7A5C85 (same hue) so the highlight-color
      // guarantee in resolveHighlightColor() can hold against this zone.
      skyTop: '#8a7094',
      skyMid: '#B27C9C',
      skyHorizon: '#F3D6E0',
      accent: '#216B19',
      accentSoft: '#ABC7A8',
    },
  },
  cream: {
    id: 'cream',
    name: 'Cream',
    tagline: 'plain, warm, and unhurried',
    palette: {
      skyTop: '#F5E9D3',
      skyMid: '#FAF1E0',
      skyHorizon: '#FFFBF3',
      accent: '#217C8C',
      accentSoft: '#ABCDD3',
    },
  },
  'golden-meadow': {
    id: 'golden-meadow',
    name: 'Golden Meadow',
    tagline: 'warm gold, just after sunrise',
    palette: {
      skyTop: '#6FA6DE',
      skyMid: '#CDE6C6',
      skyHorizon: '#FCEFC6',
      accent: '#7751D6',
      accentSoft: '#CBBDEF',
    },
  },
  'forest-green': {
    id: 'forest-green',
    name: 'Forest Green',
    tagline: 'deep green, quiet and still',
    palette: {
      // Lightened ~15% from #4C6B54 (same hue) so the highlight-color
      // guarantee in resolveHighlightColor() can hold against this zone.
      skyTop: '#67816e',
      skyMid: '#7C9A73',
      skyHorizon: '#EFD59E',
      accent: '#6239D0',
      accentSoft: '#C3B4ED',
    },
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    tagline: 'rose and gold at the end of the day',
    palette: {
      skyTop: '#C97A88',
      skyMid: '#EBAE8E',
      skyHorizon: '#FBE6C8',
      accent: '#1B7466',
      accentSoft: '#A8CAC5',
    },
  },
  'soft-coral': {
    id: 'soft-coral',
    name: 'Soft Coral',
    tagline: 'warm coral pink, soft and easy',
    palette: {
      skyTop: '#E8768A',
      skyMid: '#F0A6A0',
      skyHorizon: '#FBDCC8',
      accent: '#196B48',
      accentSoft: '#A8C7B9',
    },
  },
};

/**
 * FNV-1a 32-bit hash. Deterministic across Node and browser, stable across
 * builds — the same list `id` always produces the same integer.
 *
 * FNV-1a's low bits are known to mix weakly for short, similarly-prefixed
 * strings (exactly what content ids are — "kindergarten-...", "grade-1-...").
 * Taking `% 6` straight off the raw hash measurably clustered real ids in an
 * earlier version of this file (7 of 11 real Grade Units landed on the same
 * kit). `avalanche()` re-mixes the bits (the fmix32 finalizer from
 * MurmurHash3) before the modulo specifically to fix that — verified against
 * the real id set in worldKits.test.ts.
 */
export function hashListId(id: string): number {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i++) {
    hash ^= id.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return avalanche(hash >>> 0);
}

function avalanche(h: number): number {
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/** Deterministically assigns a Grade Unit's permanent id to one of the world kits. */
export function pickWorldKit(id: string): WorldKit {
  const index = hashListId(id) % WORLD_KIT_ORDER.length;
  return WORLD_KITS[WORLD_KIT_ORDER[index]];
}

/**
 * Assigns each id in `orderedIds` (the full cross-grade curriculum sequence,
 * see `src/lib/content/gradeUnitSequence.ts`) to a world kit, starting from
 * `pickWorldKit`'s per-id hash and only deviating when that would repeat the
 * immediately preceding id's kit. Deterministic, no randomness, single
 * left-to-right pass — a child progressing through the curriculum never
 * sees the same scene kit twice in a row.
 *
 * With 9 kits and only one forbidden value (the previous entry's kit) to
 * avoid at each step, stepping one slot forward in `WORLD_KIT_ORDER` always
 * finds a substitute — this can never fail to satisfy "no two consecutive
 * entries share a kit" for the sequences this app produces.
 */
export function assignWorldKitsInSequence(orderedIds: readonly string[]): Map<string, WorldKit> {
  const assignments = new Map<string, WorldKit>();
  let previousKitId: WorldKitId | undefined;

  for (const id of orderedIds) {
    const baseIndex = hashListId(id) % WORLD_KIT_ORDER.length;
    const chosenIndex =
      WORLD_KIT_ORDER[baseIndex] === previousKitId ? (baseIndex + 1) % WORLD_KIT_ORDER.length : baseIndex;
    const kit = WORLD_KITS[WORLD_KIT_ORDER[chosenIndex]];
    assignments.set(id, kit);
    previousKitId = kit.id;
  }

  return assignments;
}

export interface HighlightColors {
  /** Text color for the highlighted grapheme in the practice words. */
  color: string;
  /** Soft glow color for the highlight's text-shadow. */
  glow: string;
}

/** The paper background the hero gradient fades into (matches the literal in GradeUnitWorldPage.astro's <style>). */
const HERO_PAPER_BACKGROUND = '#fbf8f3';

/**
 * Preferred fallback when a kit's own `accent` can't clear 4.5:1 against
 * every hero gradient zone (the common case — see the note on
 * `WorldKitPalette.accent`). A vivid, richly saturated "teaching ink",
 * deliberately not black, so the highlighted grapheme stays visually
 * distinct from the plain-black word ink around it. Clears 4.5:1 against
 * every zone for kits whose `skyTop` isn't especially dark.
 */
export const SAFE_HIGHLIGHT_PRIMARY: HighlightColors = {
  color: '#3a1240',
  glow: 'rgba(58, 18, 64, 0.35)',
};

/**
 * Deepest fallback, used only when even `SAFE_HIGHLIGHT_PRIMARY` can't clear
 * 4.5:1 against a kit's darkest zone (today: morning-blue, lavender,
 * forest-green — the three kits with the darkest `skyTop`). Still a
 * deliberate off-black hue, not literal `#000000`, and verified (in
 * worldKits.test.ts) to clear 4.5:1 against every zone for every kit in
 * `WORLD_KITS` — this is the true accessibility floor.
 */
export const SAFE_HIGHLIGHT_DEEP: HighlightColors = {
  color: '#150014',
  glow: 'rgba(21, 0, 20, 0.35)',
};

/**
 * Resolves the guaranteed-readable highlight color for a kit's palette,
 * checking candidates in priority order — theme consistency (the kit's own
 * accent) first, then educational emphasis (a vivid, distinct teaching
 * color), then the readability floor (a near-black but still-hued fallback)
 * — against every zone the highlighted grapheme could render over: the
 * hero's sky gradient (`skyTop`, `skyMid`, `skyHorizon`) and the paper
 * background it fades into. Returns the first candidate that clears 4.5:1
 * against all four zones.
 */
export function resolveHighlightColor(palette: WorldKitPalette): HighlightColors {
  const zones = [palette.skyTop, palette.skyMid, palette.skyHorizon, HERO_PAPER_BACKGROUND];
  const candidates: HighlightColors[] = [
    { color: palette.accent, glow: palette.accentSoft },
    SAFE_HIGHLIGHT_PRIMARY,
    SAFE_HIGHLIGHT_DEEP,
  ];

  for (const candidate of candidates) {
    if (zones.every((zone) => meetsContrast(candidate.color, zone))) {
      return candidate;
    }
  }

  return SAFE_HIGHLIGHT_DEEP;
}
