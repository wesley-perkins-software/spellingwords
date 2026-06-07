import { describe, it, expect, vi } from 'vitest';
import { selectPreferredVoice, getAvailableVoices, loadVoices, getRecommendedVoices, getRankedVoices } from './voiceSelection.js';
import type { SpeechSynthesisAdapter, SpeechSynthesisVoiceAdapter } from './types.js';

function makeVoice(
  name: string,
  lang: string,
  localService = true,
  isDefault = false,
): SpeechSynthesisVoiceAdapter {
  return { name, lang, localService, default: isDefault };
}

function makeSynthesis(voices: SpeechSynthesisVoiceAdapter[]): SpeechSynthesisAdapter {
  return {
    speaking: false,
    speak: vi.fn(),
    cancel: vi.fn(),
    getVoices: vi.fn(() => voices),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
}

describe('selectPreferredVoice', () => {
  it('returns null for an empty voice list', () => {
    expect(selectPreferredVoice([])).toBeNull();
  });

  it('returns the only voice when list has one entry', () => {
    const v = makeVoice('Samantha', 'en-US');
    expect(selectPreferredVoice([v])).toBe(v);
  });

  it('prefers an English-locale voice over a non-English voice', () => {
    const enUS = makeVoice('Voice A', 'en-US');
    const frFR = makeVoice('Voice B', 'fr-FR');
    expect(selectPreferredVoice([frFR, enUS])).toBe(enUS);
  });

  it('prefers a voice with "neural" or "natural" in its name', () => {
    const plain = makeVoice('Voice A', 'en-US');
    const neural = makeVoice('Voice B Neural', 'en-US');
    expect(selectPreferredVoice([plain, neural])).toBe(neural);
  });

  it('prefers a known good name over a generic voice', () => {
    const generic = makeVoice('Unknown Voice', 'en-US');
    const ava = makeVoice('Ava', 'en-US');
    expect(selectPreferredVoice([generic, ava])).toBe(ava);
  });

  it('name match is case-insensitive', () => {
    const v = makeVoice('samantha', 'en-US');
    const other = makeVoice('Other Voice', 'en-US');
    expect(selectPreferredVoice([other, v])).toBe(v);
  });

  it('prefers local voices over non-local when otherwise tied', () => {
    const local = makeVoice('Local Voice', 'en-US', true);
    const network = makeVoice('Network Voice', 'en-US', false);
    expect(selectPreferredVoice([network, local])).toBe(local);
  });

  it('falls back to first voice when nothing scores higher', () => {
    const a = makeVoice('Unknown A', 'zh-CN');
    const b = makeVoice('Unknown B', 'ja-JP');
    expect(selectPreferredVoice([a, b])).toBe(a);
  });

  it('breaks ties by array position (earlier voice wins)', () => {
    const a = makeVoice('Voice A', 'en-US', true, false);
    const b = makeVoice('Voice B', 'en-US', true, false);
    expect(selectPreferredVoice([a, b])).toBe(a);
  });

  it('default voice flag provides a small tie-breaking score', () => {
    const nonDefault = makeVoice('Voice A', 'en-US', true, false);
    const defaultVoice = makeVoice('Voice B', 'en-US', true, true);
    expect(selectPreferredVoice([nonDefault, defaultVoice])).toBe(defaultVoice);
  });
});

describe('getAvailableVoices', () => {
  it('returns the result of synthesis.getVoices()', () => {
    const voices = [makeVoice('Samantha', 'en-US')];
    const synthesis = makeSynthesis(voices);
    expect(getAvailableVoices(synthesis)).toEqual(voices);
  });

  it('returns an empty array when getVoices returns []', () => {
    const synthesis = makeSynthesis([]);
    expect(getAvailableVoices(synthesis)).toEqual([]);
  });
});

describe('selectPreferredVoice — quality scoring', () => {
  it('prefers Samantha over a generic en-US voice', () => {
    const generic = makeVoice('Unknown Voice', 'en-US');
    const samantha = makeVoice('Samantha', 'en-US');
    expect(selectPreferredVoice([generic, samantha])).toBe(samantha);
  });

  it('prefers Google US English over a generic en-US voice', () => {
    const generic = makeVoice('Unknown Voice', 'en-US');
    const google = makeVoice('Google US English', 'en-US');
    expect(selectPreferredVoice([generic, google])).toBe(google);
  });

  it('prefers an enhanced/neural voice over a known good name', () => {
    const samantha = makeVoice('Samantha', 'en-US');
    const neural = makeVoice('Generic Neural Voice', 'en-US');
    expect(selectPreferredVoice([samantha, neural])).toBe(neural);
  });

  it('a known-good voice beats a generic one even when the generic is local and default', () => {
    const google = makeVoice('Google US English', 'en-US', false, false);
    const generic = makeVoice('Unknown Voice', 'en-US', true, true);
    expect(selectPreferredVoice([generic, google])).toBe(google);
  });

  it('selects an enhanced voice when available', () => {
    const voices = [
      makeVoice('Alex', 'en-US'),
      makeVoice('Samantha', 'en-US', true, true),
      makeVoice('Samantha (Enhanced)', 'en-US', false),
    ];
    expect(selectPreferredVoice(voices)).toBe(voices[2]);
  });

  it('selects Samantha only when higher-scoring voices are absent', () => {
    const voices = [
      makeVoice('Samantha', 'en-US', true, true),
      makeVoice('Unknown Voice', 'en-US'),
    ];
    expect(selectPreferredVoice(voices)).toBe(voices[0]);
  });

  it('applies the enhanced quality bonus', () => {
    const plain = makeVoice('Daniel', 'en-GB');
    const enhanced = makeVoice('Daniel (Enhanced)', 'en-GB');
    expect(selectPreferredVoice([plain, enhanced])).toBe(enhanced);
  });

  it('applies the premium quality bonus', () => {
    const plain = makeVoice('Fiona', 'en-GB');
    const premium = makeVoice('Fiona Premium', 'en-GB');
    expect(selectPreferredVoice([plain, premium])).toBe(premium);
  });

  it('applies the natural quality bonus', () => {
    const plain = makeVoice('Fiona', 'en-GB');
    const natural = makeVoice('Fiona Natural', 'en-GB');
    expect(selectPreferredVoice([plain, natural])).toBe(natural);
  });

  it('applies the neural quality bonus', () => {
    const plain = makeVoice('Fiona', 'en-GB');
    const neural = makeVoice('Fiona Neural', 'en-GB');
    expect(selectPreferredVoice([plain, neural])).toBe(neural);
  });

  it('penalises espeak voices below a plain fallback', () => {
    const espeak = makeVoice('espeak English', 'en-US');
    const plain = makeVoice('Generic Voice', 'en-US');
    expect(selectPreferredVoice([espeak, plain])).toBe(plain);
  });

  it('penalises festival voices below a plain fallback', () => {
    const festival = makeVoice('festival English', 'en-US');
    const plain = makeVoice('Generic Voice', 'en-US');
    expect(selectPreferredVoice([festival, plain])).toBe(plain);
  });

  it('penalises mbrola voices below a plain fallback', () => {
    const mbrola = makeVoice('mbrola-en1', 'en-US');
    const plain = makeVoice('Generic Voice', 'en-US');
    expect(selectPreferredVoice([mbrola, plain])).toBe(plain);
  });

  it('includes Alex in the known good name list', () => {
    const generic = makeVoice('System Voice', 'en-US');
    const alex = makeVoice('Alex', 'en-US');
    expect(selectPreferredVoice([generic, alex])).toBe(alex);
  });

  it('includes Microsoft Guy in the known good name list', () => {
    const generic = makeVoice('System Voice', 'en-US');
    const guy = makeVoice('Microsoft Guy', 'en-US');
    expect(selectPreferredVoice([generic, guy])).toBe(guy);
  });

  it('includes Allison in the known good name list', () => {
    const generic = makeVoice('System Voice', 'en-US');
    const allison = makeVoice('Allison', 'en-US');
    expect(selectPreferredVoice([generic, allison])).toBe(allison);
  });
});

describe('getRecommendedVoices', () => {
  it('returns an empty array when given no voices', () => {
    expect(getRecommendedVoices([])).toEqual([]);
  });

  it('returns an empty array when no English voices exist', () => {
    const voices = [makeVoice('Thomas', 'fr-FR'), makeVoice('Juan', 'es-ES')];
    expect(getRecommendedVoices(voices)).toEqual([]);
  });

  it('filters out non-English voices', () => {
    const en = makeVoice('Samantha', 'en-US');
    const fr = makeVoice('Thomas', 'fr-FR');
    const result = getRecommendedVoices([en, fr]);
    expect(result).toContain(en);
    expect(result).not.toContain(fr);
  });

  it('removes espeak voices', () => {
    const espeak = makeVoice('espeak English', 'en-US');
    const plain = makeVoice('Samantha', 'en-US');
    expect(getRecommendedVoices([espeak, plain])).not.toContain(espeak);
  });

  it('removes festival voices', () => {
    const festival = makeVoice('festival English', 'en-US');
    const plain = makeVoice('Samantha', 'en-US');
    expect(getRecommendedVoices([festival, plain])).not.toContain(festival);
  });

  it('removes mbrola voices', () => {
    const mbrola = makeVoice('mbrola-en1', 'en-US');
    const plain = makeVoice('Samantha', 'en-US');
    expect(getRecommendedVoices([mbrola, plain])).not.toContain(mbrola);
  });

  it('removes novelty voices (Zarvox, Boing, Whisper, etc.)', () => {
    const zarvox = makeVoice('Zarvox', 'en-US');
    const boing = makeVoice('Boing', 'en-US');
    const whisper = makeVoice('Whisper', 'en-US');
    const good = makeVoice('Samantha', 'en-US');
    const result = getRecommendedVoices([zarvox, boing, whisper, good]);
    expect(result).not.toContain(zarvox);
    expect(result).not.toContain(boing);
    expect(result).not.toContain(whisper);
    expect(result).toContain(good);
  });

  it('removes additional novelty voices (Aaron, Albert, Hysterical, Junior, Princess)', () => {
    const aaron = makeVoice('Aaron', 'en-US');
    const albert = makeVoice('Albert', 'en-US');
    const hysterical = makeVoice('Hysterical', 'en-US');
    const junior = makeVoice('Junior', 'en-US');
    const princess = makeVoice('Princess', 'en-US');
    const good = makeVoice('Samantha', 'en-US');
    const result = getRecommendedVoices([aaron, albert, hysterical, junior, princess, good]);
    expect(result).not.toContain(aaron);
    expect(result).not.toContain(albert);
    expect(result).not.toContain(hysterical);
    expect(result).not.toContain(junior);
    expect(result).not.toContain(princess);
    expect(result).toContain(good);
  });

  it('removes compact voices', () => {
    const compact = makeVoice('Samantha (Compact)', 'en-US');
    const enhanced = makeVoice('Samantha (Enhanced)', 'en-US');
    const result = getRecommendedVoices([compact, enhanced]);
    expect(result).not.toContain(compact);
    expect(result).toContain(enhanced);
  });

  it('deduplicates plain and enhanced variants of the same voice, keeping enhanced', () => {
    const plain = makeVoice('Daniel', 'en-GB');
    const enhanced = makeVoice('Daniel (Enhanced)', 'en-GB');
    const result = getRecommendedVoices([plain, enhanced]);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(enhanced);
  });

  it('does not merge voices with the same base name in different languages', () => {
    const enUS = makeVoice('Fiona', 'en-US');
    const enGB = makeVoice('Fiona', 'en-GB');
    const result = getRecommendedVoices([enUS, enGB]);
    expect(result).toHaveLength(2);
  });

  it('returns at most maxCount voices', () => {
    const voices = Array.from({ length: 15 }, (_, i) =>
      makeVoice(`Voice ${i}`, 'en-US'),
    );
    expect(getRecommendedVoices(voices, 5)).toHaveLength(5);
  });

  it('uses default cap of 3', () => {
    const voices = Array.from({ length: 10 }, (_, i) =>
      makeVoice(`Voice ${i}`, 'en-US'),
    );
    expect(getRecommendedVoices(voices).length).toBeLessThanOrEqual(3);
  });

  it('places Google US English first in results', () => {
    const generic = makeVoice('System Voice', 'en-US');
    const google = makeVoice('Google US English', 'en-US');
    const result = getRecommendedVoices([generic, google]);
    expect(result[0]).toBe(google);
  });

  it('places Samantha before a generic en-US voice in results', () => {
    const generic = makeVoice('System Voice', 'en-US');
    const samantha = makeVoice('Samantha', 'en-US');
    const result = getRecommendedVoices([generic, samantha]);
    expect(result[0]).toBe(samantha);
  });

  it('returns a single-element array when only one voice qualifies', () => {
    const samantha = makeVoice('Samantha', 'en-US');
    const fr = makeVoice('Thomas', 'fr-FR');
    expect(getRecommendedVoices([samantha, fr])).toEqual([samantha]);
  });
});

describe('getRankedVoices', () => {
  it('returns a RankedVoice entry for each voice', () => {
    const voices = [makeVoice('Google US English', 'en-US'), makeVoice('Samantha', 'en-US')];
    const ranked = getRankedVoices(voices);
    expect(ranked).toHaveLength(2);
    ranked.forEach((r) => {
      expect(r).toHaveProperty('voice');
      expect(r).toHaveProperty('score');
      expect(r).toHaveProperty('reasons');
    });
  });

  it('includes reason "known good voice: Google US English" for that voice', () => {
    const google = makeVoice('Google US English', 'en-US');
    const [entry] = getRankedVoices([google]);
    expect(entry.reasons).toContain('known good voice: Google US English');
  });

  it('includes reason "known good voice: Samantha" for Samantha', () => {
    const samantha = makeVoice('Samantha', 'en-US');
    const [entry] = getRankedVoices([samantha]);
    expect(entry.reasons).toContain('known good voice: Samantha');
  });

  it('includes "high-quality synthesis" reason for neural/natural/enhanced/premium voices', () => {
    const voice = makeVoice('Test Neural Voice', 'en-US');
    const [entry] = getRankedVoices([voice]);
    expect(entry.reasons).toContain('high-quality synthesis (enhanced/premium/natural/neural)');
  });

  it('includes "English locale" for en-US voices', () => {
    const voice = makeVoice('Test Voice', 'en-US');
    const [entry] = getRankedVoices([voice]);
    expect(entry.reasons).toContain('English locale');
  });

  it('includes "local service" for local voices', () => {
    const local = makeVoice('Test Voice', 'en-US', true);
    const [entry] = getRankedVoices([local]);
    expect(entry.reasons).toContain('local service');
  });

  it('includes "penalized novelty voice" reason for novelty voices', () => {
    const novelty = makeVoice('Zarvox', 'en-US');
    const [entry] = getRankedVoices([novelty]);
    expect(entry.reasons).toContain('penalized novelty voice');
  });

  it('includes "penalized compact voice" reason for compact voices', () => {
    const compact = makeVoice('Samantha (Compact)', 'en-US');
    const [entry] = getRankedVoices([compact]);
    expect(entry.reasons).toContain('penalized compact voice');
  });

  it('Google US English and Samantha score equally as known-good names', () => {
    const google = makeVoice('Google US English', 'en-US');
    const samantha = makeVoice('Samantha', 'en-US');
    const ranked = getRankedVoices([google, samantha]);
    const googleEntry = ranked.find((r) => r.voice === google)!;
    const samanthaEntry = ranked.find((r) => r.voice === samantha)!;
    expect(googleEntry.score).toBe(samanthaEntry.score);
  });

  it('a neural voice scores higher than a known-good plain voice', () => {
    const neural = makeVoice('Generic Neural', 'en-US');
    const samantha = makeVoice('Samantha', 'en-US');
    const ranked = getRankedVoices([neural, samantha]);
    const neuralEntry = ranked.find((r) => r.voice === neural)!;
    const samanthaEntry = ranked.find((r) => r.voice === samantha)!;
    expect(neuralEntry.score).toBeGreaterThan(samanthaEntry.score);
  });
});

describe('loadVoices', () => {
  it('resolves immediately when voices are already available', async () => {
    const voices = [makeVoice('Samantha', 'en-US')];
    const synthesis = makeSynthesis(voices);
    const result = await loadVoices(synthesis);
    expect(result).toEqual(voices);
  });

  it('resolves after voiceschanged fires when initially empty', async () => {
    const voices = [makeVoice('Google US English', 'en-US')];
    let fireEvent: (() => void) | undefined;
    const synthesis: SpeechSynthesisAdapter = {
      speaking: false,
      speak: vi.fn(),
      cancel: vi.fn(),
      getVoices: vi.fn()
        .mockReturnValueOnce([])     // empty on first call
        .mockReturnValue(voices),     // populated after event
      addEventListener: vi.fn((_event, handler) => { fireEvent = handler; }),
      removeEventListener: vi.fn(),
    };

    const promise = loadVoices(synthesis, 500);
    fireEvent!();
    const result = await promise;
    expect(result).toEqual(voices);
  });

  it('resolves via timeout fallback when voiceschanged never fires', async () => {
    const voices = [makeVoice('Samantha', 'en-US')];
    const synthesis: SpeechSynthesisAdapter = {
      speaking: false,
      speak: vi.fn(),
      cancel: vi.fn(),
      getVoices: vi.fn()
        .mockReturnValueOnce([])
        .mockReturnValue(voices),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    const result = await loadVoices(synthesis, 0);
    expect(result).toEqual(voices);
    expect(synthesis.removeEventListener).toHaveBeenCalled();
  });

  it('returns an empty array when voices never populate', async () => {
    const synthesis: SpeechSynthesisAdapter = {
      speaking: false,
      speak: vi.fn(),
      cancel: vi.fn(),
      getVoices: vi.fn().mockReturnValue([]),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    const result = await loadVoices(synthesis, 0);
    expect(result).toEqual([]);
  });
});
