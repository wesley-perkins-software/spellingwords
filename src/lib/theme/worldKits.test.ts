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
  it('assigns the Short A Grade Unit to Meadow Morning', () => {
    // Locked in: this is the real id used by src/content/spelling-lists/phonics/kindergarten-short-a-words.md.
    // If this ever fails, the hash function or kit order changed — confirm that was intentional
    // before updating the expectation, since every existing Grade Unit's world shifts with it.
    expect(pickWorldKit('kindergarten-short-a-words').id).toBe('meadow-morning');
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
      expect(kit.palette.ink).toMatch(/^#/);
      expect(kit.palette.accent).toMatch(/^#/);
    }
  });
});
