import { describe, it, expect, vi } from 'vitest';
import { selectPreferredVoice, getAvailableVoices, loadVoices, getRecommendedVoices } from './voiceSelection.js';
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

  it('prefers exact language match over no match', () => {
    const enUS = makeVoice('Voice A', 'en-US');
    const frFR = makeVoice('Voice B', 'fr-FR');
    expect(selectPreferredVoice([frFR, enUS], { langs: ['en-US'] })).toBe(enUS);
  });

  it('prefers earlier lang in prefs.langs over later', () => {
    const enGB = makeVoice('Voice GB', 'en-GB');
    const enUS = makeVoice('Voice US', 'en-US');
    expect(selectPreferredVoice([enGB, enUS], { langs: ['en-US', 'en-GB'] })).toBe(enUS);
  });

  it('applies language prefix matching ("en" matches "en-US")', () => {
    const enUS = makeVoice('Voice US', 'en-US');
    const frFR = makeVoice('Voice FR', 'fr-FR');
    // "en" should prefix-match "en-US" with +40
    expect(selectPreferredVoice([frFR, enUS], { langs: ['en'] })).toBe(enUS);
  });

  it('scores preferred name substrings — earlier name in array wins', () => {
    const samantha = makeVoice('Samantha', 'en-US');
    const google = makeVoice('Google US English', 'en-US');
    const result = selectPreferredVoice([google, samantha], {
      langs: ['en-US'],
      preferredNames: ['Samantha', 'Google US English'],
    });
    expect(result).toBe(samantha);
  });

  it('name match is case-insensitive', () => {
    const v = makeVoice('Samantha', 'en-US');
    const other = makeVoice('Other Voice', 'en-US');
    expect(
      selectPreferredVoice([other, v], { preferredNames: ['SAMANTHA'] }),
    ).toBe(v);
  });

  it('prefers local voices over non-local when preferLocal=true (default)', () => {
    const local = makeVoice('Local Voice', 'en-US', true);
    const network = makeVoice('Network Voice', 'en-US', false);
    expect(selectPreferredVoice([network, local])).toBe(local);
  });

  it('does not prefer local voices when preferLocal=false', () => {
    const local = makeVoice('Local Voice', 'en-US', true);
    const network = makeVoice('Network Voice', 'en-US', false);
    // With preferLocal=false and no other differentiators, first voice (network) wins via position
    expect(selectPreferredVoice([network, local], { preferLocal: false })).toBe(network);
  });

  it('falls back to first voice when no preferences match anything', () => {
    const a = makeVoice('Unknown A', 'zh-CN');
    const b = makeVoice('Unknown B', 'ja-JP');
    // Neither matches en-US; first array entry wins tie
    expect(selectPreferredVoice([a, b], { langs: ['en-US'] })).toBe(a);
  });

  it('uses default preferences when called with no second argument', () => {
    const enUS = makeVoice('Samantha', 'en-US', true);
    const frFR = makeVoice('Thomas', 'fr-FR', true);
    expect(selectPreferredVoice([frFR, enUS])).toBe(enUS);
  });

  it('breaks ties by array position (earlier voice wins)', () => {
    // Two identical-scoring voices
    const a = makeVoice('Voice A', 'en-US', true, false);
    const b = makeVoice('Voice B', 'en-US', true, false);
    expect(selectPreferredVoice([a, b])).toBe(a);
  });

  it('default voice flag provides a small tie-breaking score', () => {
    const nonDefault = makeVoice('Voice A', 'en-US', true, false);
    const defaultVoice = makeVoice('Voice B', 'en-US', true, true);
    // defaultVoice gets +2; placed second but should still win
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

describe('selectPreferredVoice — priority voice list', () => {
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

  it('ranks Samantha above Google US English (priority list order)', () => {
    const google = makeVoice('Google US English', 'en-US');
    const samantha = makeVoice('Samantha', 'en-US');
    expect(selectPreferredVoice([google, samantha])).toBe(samantha);
  });

  it('applies enhanced quality bonus', () => {
    const plain = makeVoice('Daniel', 'en-GB');
    const enhanced = makeVoice('Daniel (Enhanced)', 'en-GB');
    expect(selectPreferredVoice([plain, enhanced], { langs: ['en-GB'] })).toBe(enhanced);
  });

  it('applies premium quality bonus', () => {
    const plain = makeVoice('Fiona', 'en-GB');
    const premium = makeVoice('Fiona Premium', 'en-GB');
    expect(selectPreferredVoice([plain, premium], { langs: ['en-GB'] })).toBe(premium);
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

  it('includes Alex in priority list', () => {
    const generic = makeVoice('System Voice', 'en-US');
    const alex = makeVoice('Alex', 'en-US');
    expect(selectPreferredVoice([generic, alex])).toBe(alex);
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

  it('uses default cap of 8', () => {
    const voices = Array.from({ length: 20 }, (_, i) =>
      makeVoice(`Voice ${i}`, 'en-US'),
    );
    expect(getRecommendedVoices(voices).length).toBeLessThanOrEqual(8);
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
