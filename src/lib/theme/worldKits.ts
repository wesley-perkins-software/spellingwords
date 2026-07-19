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
   * The world's single accent color: CTA, underlines, word-family highlight.
   * Deliberately a hue family DIFFERENT from the kit's own sky gradient
   * (not a darker shade of the same hue) — a same-family accent can pass a
   * numeric contrast check yet still read as "the same color" as the
   * background at a glance (this happened for real: Lavender's old purple
   * accent on its own purple-pink gradient). Each accent also holds at
   * least 4.5:1 contrast against both `skyHorizon` and the paper background
   * the hero fades into, since the highlighted grapheme in the practice
   * words renders in this color directly on that fade.
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
      skyTop: '#7A5C85',
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
      skyTop: '#4C6B54',
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
