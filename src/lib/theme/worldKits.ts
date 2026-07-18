/**
 * Grade Unit "world kits" — a small, curated set of illustrated places
 * (not just backgrounds) that a Grade Unit page is deterministically
 * assigned to, based on its permanent content `id`. The id never changes
 * once published, so a given list always renders in the same world across
 * builds — no client-side randomness, no hydration mismatch.
 *
 * Six kits exist today; each is a whole pre-tuned bundle (palette + ink +
 * accent + landmark set) so no combination can land on poor contrast or a
 * clashing palette. Adding a seventh kit redistributes all existing lists
 * automatically — nothing about an existing list needs to change.
 */

export type WorldKitId =
  | 'meadow-morning'
  | 'forest-clearing'
  | 'secret-garden'
  | 'seaside'
  | 'mountain-trail'
  | 'sky-adventure';

export interface WorldKitPalette {
  /** Sky/backdrop gradient stops, top to bottom (or back to front). */
  skyTop: string;
  skyMid: string;
  skyHorizon: string;
  /** Foreground ground silhouette color(s), where the world has a ground. */
  ground?: string;
  groundBack?: string;
  /** Body/heading text color — chosen per world for contrast, not pure black. */
  ink: string;
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
  'meadow-morning',
  'forest-clearing',
  'secret-garden',
  'seaside',
  'mountain-trail',
  'sky-adventure',
];

export const WORLD_KITS: Record<WorldKitId, WorldKit> = {
  'meadow-morning': {
    id: 'meadow-morning',
    name: 'Meadow Morning',
    tagline: 'a sunny hillside, just after sunrise',
    palette: {
      skyTop: '#6FA6DE',
      skyMid: '#BEE0E8',
      skyHorizon: '#FCEFC6',
      ground: '#6FB07A',
      groundBack: '#93C99A',
      ink: '#20362F',
      accent: '#E0A233',
      accentSoft: '#F3D693',
    },
  },
  'forest-clearing': {
    id: 'forest-clearing',
    name: 'Forest Clearing',
    tagline: 'dappled light between tall trees',
    palette: {
      skyTop: '#2F4A3B',
      skyMid: '#5C7A54',
      skyHorizon: '#EFD59E',
      ground: '#3C2E20',
      groundBack: '#54402C',
      ink: '#241D12',
      accent: '#D98B3E',
      accentSoft: '#EFC48D',
    },
  },
  'secret-garden': {
    id: 'secret-garden',
    name: 'Secret Garden',
    tagline: 'behind a gate, where the flowers climb',
    palette: {
      skyTop: '#6A4B72',
      skyMid: '#B27C9C',
      skyHorizon: '#F3D6E0',
      ground: '#4C6B4A',
      groundBack: '#6B8F66',
      ink: '#382340',
      accent: '#C24E72',
      accentSoft: '#EBB6C9',
    },
  },
  seaside: {
    id: 'seaside',
    name: 'Seaside',
    tagline: 'sand, salt air, and one small boat',
    palette: {
      skyTop: '#6FB6D9',
      skyMid: '#A9D9DD',
      skyHorizon: '#F2E4C4',
      ground: '#3D8A93',
      groundBack: '#65AEB2',
      ink: '#153037',
      accent: '#E0714A',
      accentSoft: '#F0B79C',
    },
  },
  'mountain-trail': {
    id: 'mountain-trail',
    name: 'Mountain Trail',
    tagline: 'a winding path between the peaks',
    palette: {
      skyTop: '#7FB0DE',
      skyMid: '#BFD9EA',
      skyHorizon: '#F5E6C6',
      ground: '#5B6E6A',
      groundBack: '#7C8D87',
      ink: '#20303A',
      accent: '#C97A46',
      accentSoft: '#EAC09B',
    },
  },
  'sky-adventure': {
    id: 'sky-adventure',
    name: 'Sky Adventure',
    tagline: 'up above the clouds, going somewhere',
    palette: {
      skyTop: '#4F8FD6',
      skyMid: '#8FC0E8',
      skyHorizon: '#D9EDF6',
      ink: '#1B3350',
      accent: '#F2B23C',
      accentSoft: '#FBDFA0',
    },
  },
};

/**
 * FNV-1a 32-bit hash. Deterministic across Node and browser, stable across
 * builds — the same list `id` always produces the same integer.
 */
export function hashListId(id: string): number {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i++) {
    hash ^= id.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Deterministically assigns a Grade Unit's permanent id to one of the world kits. */
export function pickWorldKit(id: string): WorldKit {
  const index = hashListId(id) % WORLD_KIT_ORDER.length;
  return WORLD_KITS[WORLD_KIT_ORDER[index]];
}
