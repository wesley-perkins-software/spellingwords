/**
 * Grade Unit "world kits" — a small, curated set of illustrated places
 * (not just backgrounds) that a Grade Unit page is deterministically
 * assigned to, based on its permanent content `id`. The id never changes
 * once published, so a given list always renders in the same world across
 * builds — no client-side randomness, no hydration mismatch.
 *
 * Nine kits exist today; several are gradient-led with only a light touch
 * of environmental detail (a couple of clouds, a flower or two) rather than
 * a full landscape scene — not every world needs a sun, hills, and trees.
 * Adding a tenth kit redistributes all existing lists automatically —
 * nothing about an existing list needs to change.
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
  /** Sky/backdrop gradient stops, top to bottom (or back to front). */
  skyTop: string;
  skyMid: string;
  skyHorizon: string;
  /** Foreground ground silhouette color(s), where the world has a ground. */
  ground?: string;
  groundBack?: string;
  /** The world's single accent color: CTA, underlines, word-family highlight. */
  accent: string;
  accentSoft: string;
}

export interface WorldKit {
  id: WorldKitId;
  name: string;
  /** One line describing the place, used as a small in-page caption. */
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
      accent: '#F2B23C',
      accentSoft: '#FBDFA0',
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
      accent: '#C97B3D',
      accentSoft: '#E9C39A',
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
      accent: '#E2578A',
      accentSoft: '#F5B9CF',
    },
  },
  lavender: {
    id: 'lavender',
    name: 'Lavender',
    tagline: 'dusky purple, where the flowers climb',
    palette: {
      skyTop: '#7A5C85',
      skyMid: '#B27C9C',
      skyHorizon: '#F3D6E0',
      accent: '#8C4FA0',
      accentSoft: '#D9B9E3',
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
      accent: '#D98B3E',
      accentSoft: '#EFC48D',
    },
  },
  'golden-meadow': {
    id: 'golden-meadow',
    name: 'Golden Meadow',
    tagline: 'a sunny hillside, just after sunrise',
    palette: {
      skyTop: '#6FA6DE',
      skyMid: '#CDE6C6',
      skyHorizon: '#FCEFC6',
      ground: '#6FB07A',
      groundBack: '#93C99A',
      accent: '#E0A233',
      accentSoft: '#F3D693',
    },
  },
  'forest-green': {
    id: 'forest-green',
    name: 'Forest Green',
    tagline: 'dappled light between tall trees',
    palette: {
      skyTop: '#4C6B54',
      skyMid: '#7C9A73',
      skyHorizon: '#EFD59E',
      ground: '#3C2E20',
      groundBack: '#54402C',
      accent: '#D98B3E',
      accentSoft: '#EFC48D',
    },
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    tagline: 'a winding path between the peaks',
    palette: {
      // Warm alpenglow (rose/peach dusk light) against cool slate-green peaks —
      // deliberately warm-dominant so it doesn't read as "another blue sky".
      skyTop: '#C97A88',
      skyMid: '#EBAE8E',
      skyHorizon: '#FBE6C8',
      ground: '#5B6E6A',
      groundBack: '#7C8D87',
      accent: '#B15A8C',
      accentSoft: '#E9BFD6',
    },
  },
  'soft-coral': {
    id: 'soft-coral',
    name: 'Soft Coral',
    tagline: 'warm pink, salt air, gulls overhead',
    palette: {
      skyTop: '#E8768A',
      skyMid: '#F0A6A0',
      skyHorizon: '#FBDCC8',
      accent: '#C24E72',
      accentSoft: '#EBB6C9',
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
