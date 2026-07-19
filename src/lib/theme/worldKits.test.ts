import { describe, expect, it } from 'vitest';
import { hashListId, pickWorldKit, WORLD_KITS } from './worldKits';

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
    const publishedGradeUnitIds = [
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

    const kitsUsed = new Set(publishedGradeUnitIds.map((id) => pickWorldKit(id).id));
    expect(kitsUsed.size).toBeGreaterThanOrEqual(4);

    const counts = new Map<string, number>();
    for (const id of publishedGradeUnitIds) {
      const kitId = pickWorldKit(id).id;
      counts.set(kitId, (counts.get(kitId) ?? 0) + 1);
    }
    const maxCount = Math.max(...counts.values());
    expect(maxCount).toBeLessThanOrEqual(3);
  });
});
