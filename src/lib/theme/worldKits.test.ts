import { describe, expect, it } from 'vitest';
import { contrastRatio } from './contrast';
import {
  assignWorldKitsInSequence,
  hashListId,
  pickWorldKit,
  resolveHighlightColor,
  SAFE_HIGHLIGHT_DEEP,
  SAFE_HIGHLIGHT_PRIMARY,
  WORLD_KITS,
  type WorldKitPalette,
} from './worldKits';

const PUBLISHED_GRADE_UNIT_IDS = [
  'grade-1-cvc-short-vowels-c-k-rule',
  'grade-1-long-a-long-o-vowel-teams',
  'grade-1-long-e-vowel-teams',
  'grade-1-long-vowels-silent-e',
  'kindergarten-consonant-digraphs',
  'kindergarten-mixed-vowel-review',
  'kindergarten-short-a-words',
  'kindergarten-short-e-words',
  'kindergarten-short-i-words',
  'kindergarten-short-o-words',
  'kindergarten-short-u-words',
];

describe('hashListId', () => {
  it('is deterministic for the same input', () => {
    expect(hashListId('kindergarten-short-a-words')).toBe(hashListId('kindergarten-short-a-words'));
  });

  it('produces different hashes for different ids', () => {
    expect(hashListId('kindergarten-short-a-words')).not.toBe(hashListId('kindergarten-short-i-words'));
  });

  it('returns a non-negative 32-bit integer', () => {
    const h = hashListId('grade-5-multisyllabic-academic-words');
    expect(h).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(h)).toBe(true);
  });
});

describe('pickWorldKit', () => {
  it('assigns the Short A Grade Unit to Morning Blue', () => {
    // Locked in: this is the real id used by src/content/spelling-lists/phonics/kindergarten-short-a-words.md.
    // Reassigned from 'seaside' to 'morning-blue' when the kit set expanded from 6 to 9
    // (seaside was retired; the fixed WORLD_KIT_ORDER array grew, which redistributes every
    // existing list by design). If this ever fails again, confirm the kit order change was
    // intentional before updating the expectation, since every Grade Unit's world shifts with it.
    expect(pickWorldKit('kindergarten-short-a-words').id).toBe('morning-blue');
  });

  it('is deterministic across repeated calls', () => {
    const id = 'kindergarten-short-i-words';
    expect(pickWorldKit(id).id).toBe(pickWorldKit(id).id);
  });

  it('always returns a fully-defined kit', () => {
    const ids = [
      'kindergarten-short-a-words',
      'kindergarten-short-i-words',
      'grade-3-root-word-families',
      'grade-5-list-01',
      'r-controlled-or',
    ];
    for (const id of ids) {
      const kit = pickWorldKit(id);
      expect(WORLD_KITS[kit.id]).toBe(kit);
      expect(kit.palette.accent).toMatch(/^#/);
    }
  });

  it('spreads the real published Grade Units across more than half the kits', () => {
    // Every id with contentRole: grade-unit in src/content/spelling-lists today
    // (checked via grep — keep this list in sync if that set changes materially).
    // This is the regression guard for the actual distribution bug found while
    // building the system: raw FNV-1a % 6 put 7 of these 11 on one single kit.
    const kitsUsed = new Set(PUBLISHED_GRADE_UNIT_IDS.map((id) => pickWorldKit(id).id));
    expect(kitsUsed.size).toBeGreaterThanOrEqual(4);

    const counts = new Map<string, number>();
    for (const id of PUBLISHED_GRADE_UNIT_IDS) {
      const kitId = pickWorldKit(id).id;
      counts.set(kitId, (counts.get(kitId) ?? 0) + 1);
    }
    const maxCount = Math.max(...counts.values());
    expect(maxCount).toBeLessThanOrEqual(3);
  });
});

describe('resolveHighlightColor', () => {
  const HERO_ZONES = ['skyTop', 'skyMid', 'skyHorizon', 'paper'] as const;
  const PAPER = '#fbf8f3';

  function zonesFor(palette: WorldKitPalette): string[] {
    return [palette.skyTop, palette.skyMid, palette.skyHorizon, PAPER];
  }

  it('meets 4.5:1 contrast against every hero zone for every real world kit', () => {
    for (const kit of Object.values(WORLD_KITS)) {
      const resolved = resolveHighlightColor(kit.palette);
      const zones = zonesFor(kit.palette);
      zones.forEach((zone, i) => {
        expect(
          contrastRatio(resolved.color, zone),
          `${kit.id} highlight vs ${HERO_ZONES[i]}`,
        ).toBeGreaterThanOrEqual(4.5);
      });
    }
  });

  it('never resolves to plain black or the kit accent when they fail contrast', () => {
    for (const kit of Object.values(WORLD_KITS)) {
      const resolved = resolveHighlightColor(kit.palette);
      expect(resolved.color).not.toBe('#000000');
    }
  });

  it('prefers the kit accent when it clears every zone', () => {
    const passingPalette: WorldKitPalette = {
      skyTop: '#ffffff',
      skyMid: '#ffffff',
      skyHorizon: '#ffffff',
      accent: '#000000',
      accentSoft: '#888888',
    };
    expect(resolveHighlightColor(passingPalette)).toEqual({ color: '#000000', glow: '#888888' });
  });

  it('falls back to SAFE_HIGHLIGHT_PRIMARY when the accent fails but the primary fallback passes', () => {
    const failingAccentPalette: WorldKitPalette = {
      skyTop: '#ffffff',
      skyMid: '#f0f0f0',
      skyHorizon: '#fafafa',
      accent: '#eeeeee', // near-white accent on a near-white sky: fails contrast
      accentSoft: '#dddddd',
    };
    expect(resolveHighlightColor(failingAccentPalette)).toEqual(SAFE_HIGHLIGHT_PRIMARY);
  });

  it('falls back to SAFE_HIGHLIGHT_DEEP when only the deepest fallback passes (mimics the darkest real skyTop zones)', () => {
    const darkestZonePalette: WorldKitPalette = {
      skyTop: '#4A78C7', // morning-blue's real, unmodified skyTop
      skyMid: '#8CB2E6',
      skyHorizon: '#E4F1FA',
      accent: '#C63A2F',
      accentSoft: '#E9B4B0',
    };
    expect(resolveHighlightColor(darkestZonePalette)).toEqual(SAFE_HIGHLIGHT_DEEP);
  });
});

describe('assignWorldKitsInSequence', () => {
  it('never assigns the same kit to two consecutive ids in the real published sequence', () => {
    const assignments = assignWorldKitsInSequence(PUBLISHED_GRADE_UNIT_IDS);
    for (let i = 1; i < PUBLISHED_GRADE_UNIT_IDS.length; i++) {
      const prevKit = assignments.get(PUBLISHED_GRADE_UNIT_IDS[i - 1]);
      const currentKit = assignments.get(PUBLISHED_GRADE_UNIT_IDS[i]);
      expect(currentKit?.id).not.toBe(prevKit?.id);
    }
  });

  it('is deterministic across repeated calls with the same input', () => {
    const first = [...assignWorldKitsInSequence(PUBLISHED_GRADE_UNIT_IDS).entries()];
    const second = [...assignWorldKitsInSequence(PUBLISHED_GRADE_UNIT_IDS).entries()];
    expect(first).toEqual(second);
  });

  it('assigns every input id to a fully-defined kit', () => {
    const assignments = assignWorldKitsInSequence(PUBLISHED_GRADE_UNIT_IDS);
    expect(assignments.size).toBe(PUBLISHED_GRADE_UNIT_IDS.length);
    for (const id of PUBLISHED_GRADE_UNIT_IDS) {
      const kit = assignments.get(id);
      expect(kit).toBeDefined();
      expect(WORLD_KITS[kit!.id]).toBe(kit);
    }
  });

  it('avoids adjacent repeats even for a run of ids that hash to the same base kit', () => {
    // Synthetic ids chosen (by brute force) to all hash to the same WORLD_KIT_ORDER index.
    const sameHashIds: string[] = [];
    let index = 0;
    let candidate = 0;
    while (sameHashIds.length < 3) {
      const id = `synthetic-${candidate}`;
      const kitIndex = hashListId(id) % 9;
      if (sameHashIds.length === 0) {
        index = kitIndex;
        sameHashIds.push(id);
      } else if (kitIndex === index) {
        sameHashIds.push(id);
      }
      candidate++;
    }

    const assignments = assignWorldKitsInSequence(sameHashIds);
    for (let i = 1; i < sameHashIds.length; i++) {
      const prevKit = assignments.get(sameHashIds[i - 1]);
      const currentKit = assignments.get(sameHashIds[i]);
      expect(currentKit?.id).not.toBe(prevKit?.id);
    }
  });
});
