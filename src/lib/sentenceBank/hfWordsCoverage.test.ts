import { describe, expect, it } from 'vitest';
import { FROZEN_HF_WORDS_CURRICULUM } from '@/lib/content/hfWordsCurriculum';
import { normalizeWord } from '@/lib/words';
import { getSentenceBankEntry } from './lookup';

describe('High-Frequency Words sentence coverage', () => {
  const assignments = Object.values(FROZEN_HF_WORDS_CURRICULUM).flatMap((sets) =>
    sets.flatMap((set) => set.words),
  );
  const normalized = assignments.map((word) => normalizeWord(word, { lowercase: true }));

  it('covers every word in the frozen curriculum with a valid sentence-bank entry', () => {
    const missing = assignments.filter((word) => !getSentenceBankEntry(word));

    expect(missing).toEqual([]);
    expect(assignments).toHaveLength(316);
    expect(new Set(normalized).size).toBe(316);
  });

  it('preserves canonical apostrophes while resolving contractions', () => {
    for (const contraction of ["don't", "I'm", "it's"]) {
      const entry = getSentenceBankEntry(contraction);
      expect(entry?.word).toBe(contraction);
      expect(entry?.exampleSentence?.toLowerCase()).toContain(contraction.toLowerCase());
      expect(normalizeWord(contraction, { lowercase: true })).toContain("'");
    }
  });
});
