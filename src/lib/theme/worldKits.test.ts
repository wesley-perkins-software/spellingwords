import { describe, expect, it } from 'vitest';
import { contrastRatio } from './contrast';
import { assignWorldKitsInSequence, HIGHLIGHT_PILL, hashListId, pickWorldKit, WORLD_KITS } from './worldKits';

const PUBLISHED_GRADE_UNIT_IDS = [
  'grade-1-beginning-consonant-blends',
  'grade-1-cvc-short-vowels-c-k-rule',
  'grade-1-ending-consonant-blends',
  'grade-1-long-a-long-o-vowel-teams',
  'grade-1-long-e-vowel-teams',
  'grade-1-long-vowels-silent-e',
  'grade-3-prefix-words',
  'grade-3-suffix-words',
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

describe('HIGHLIGHT_PILL', () => {
  it('has strong text-vs-background contrast, independent of any world kit', () => {
    expect(contrastRatio(HIGHLIGHT_PILL.text, HIGHLIGHT_PILL.background)).toBeGreaterThanOrEqual(4.5);
  });

  it('defines two distinct, valid hex colors', () => {
    expect(HIGHLIGHT_PILL.background).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(HIGHLIGHT_PILL.text).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(HIGHLIGHT_PILL.text).not.toBe(HIGHLIGHT_PILL.background);
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
