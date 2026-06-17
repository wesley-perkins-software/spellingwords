import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSpeechController } from './speechController.js';
import type {
  SpeechAdapterFactory,
  SpeechSynthesisAdapter,
  SpeechSynthesisUtteranceAdapter,
  SpeechSynthesisVoiceAdapter,
} from './types.js';

function makeVoice(name: string, lang: string): SpeechSynthesisVoiceAdapter {
  return { name, lang, localService: true, default: false };
}

function makeMocks() {
  const synthesis: SpeechSynthesisAdapter = {
    speaking: false,
    speak: vi.fn(),
    cancel: vi.fn(),
    getVoices: vi.fn(() => []),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };

  const factory: SpeechAdapterFactory = {
    createSynthesis: () => synthesis,
    createUtterance: (text: string): SpeechSynthesisUtteranceAdapter => ({
      text,
      voice: null,
      rate: 1,
      pitch: 1,
      volume: 1,
      lang: '',
    }),
  };

  return { synthesis, factory };
}

function makeUnsupportedFactory(): SpeechAdapterFactory {
  return {
    createSynthesis: () => null,
    createUtterance: (text: string): SpeechSynthesisUtteranceAdapter => ({
      text,
      voice: null,
      rate: 1,
      pitch: 1,
      volume: 1,
      lang: '',
    }),
  };
}

describe('createSpeechController', () => {
  describe('isSpeechSupported', () => {
    it('returns false when synthesis adapter is null', () => {
      const controller = createSpeechController(makeUnsupportedFactory());
      expect(controller.isSpeechSupported()).toBe(false);
    });

    it('returns true when synthesis adapter is present', () => {
      const { factory } = makeMocks();
      const controller = createSpeechController(factory);
      expect(controller.isSpeechSupported()).toBe(true);
    });
  });

  describe('no auto-speak on creation', () => {
    it('does not call speak when controller is created', () => {
      const { synthesis, factory } = makeMocks();
      createSpeechController(factory);
      expect(synthesis.speak).not.toHaveBeenCalled();
    });
  });

  describe('speakWord', () => {
    it('returns { ok: false, error: { code: "unsupported" } } when not supported', () => {
      const controller = createSpeechController(makeUnsupportedFactory());
      const result = controller.speakWord('cat');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('unsupported');
      }
    });

    it('calls synthesis.cancel() then synthesis.speak()', () => {
      const { synthesis, factory } = makeMocks();
      const controller = createSpeechController(factory);
      controller.speakWord('cat');
      expect(synthesis.cancel).toHaveBeenCalledOnce();
      expect(synthesis.speak).toHaveBeenCalledOnce();
    });

    it('passes the word as utterance text', () => {
      const { synthesis, factory } = makeMocks();
      const controller = createSpeechController(factory);
      controller.speakWord('elephant');
      const utterance = (synthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(utterance.text).toBe('elephant');
    });

    it('applies classroom-safe defaults when no options given', () => {
      const { synthesis, factory } = makeMocks();
      const controller = createSpeechController(factory);
      controller.speakWord('cat');
      const utterance = (synthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(utterance.rate).toBe(1);
      expect(utterance.pitch).toBe(1);
      expect(utterance.volume).toBe(1);
      expect(utterance.lang).toBe('en-US');
    });

    it('applies provided options to the utterance', () => {
      const { synthesis, factory } = makeMocks();
      const controller = createSpeechController(factory);
      controller.speakWord('cat', { rate: 0.6, pitch: 1.2, volume: 0.8, lang: 'en-GB' });
      const utterance = (synthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(utterance.rate).toBe(0.6);
      expect(utterance.pitch).toBe(1.2);
      expect(utterance.volume).toBe(0.8);
      expect(utterance.lang).toBe('en-GB');
    });

    it('sets a specific voice on the utterance when provided', () => {
      const { synthesis, factory } = makeMocks();
      const voice = makeVoice('Samantha', 'en-US');
      const controller = createSpeechController(factory);
      controller.speakWord('cat', { voice });
      const utterance = (synthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(utterance.voice).toBe(voice);
    });

    it('uses selectPreferredVoice when no explicit voice provided', () => {
      const voice = makeVoice('Samantha', 'en-US');
      const { synthesis, factory } = makeMocks();
      (synthesis.getVoices as ReturnType<typeof vi.fn>).mockReturnValue([voice]);
      const controller = createSpeechController(factory);
      controller.speakWord('cat');
      const utterance = (synthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(utterance.voice).toBe(voice);
    });

    it('returns { ok: true } on success', () => {
      const { factory } = makeMocks();
      const controller = createSpeechController(factory);
      expect(controller.speakWord('cat')).toEqual({ ok: true });
    });

    it('saves the spoken word for repeatWord', () => {
      const { synthesis, factory } = makeMocks();
      const controller = createSpeechController(factory);
      controller.speakWord('dog');
      vi.mocked(synthesis.speak).mockClear();
      vi.mocked(synthesis.cancel).mockClear();
      controller.repeatWord();
      const utterance = (synthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(utterance.text).toBe('dog');
    });
  });

  describe('repeatWord', () => {
    it('returns { ok: false, error: { code: "no_word" } } before any word is spoken', () => {
      const { factory } = makeMocks();
      const controller = createSpeechController(factory);
      const result = controller.repeatWord();
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('no_word');
      }
    });

    it('returns { ok: false, error: { code: "unsupported" } } on unsupported browser', () => {
      const controller = createSpeechController(makeUnsupportedFactory());
      // speakWord would also fail, but repeatWord with no prior word returns no_word first
      const result = controller.repeatWord();
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.code).toBe('no_word');
      }
    });

    it('re-speaks the last word', () => {
      const { synthesis, factory } = makeMocks();
      const controller = createSpeechController(factory);
      controller.speakWord('cat');
      vi.mocked(synthesis.speak).mockClear();
      controller.repeatWord();
      expect(synthesis.speak).toHaveBeenCalledOnce();
      const utterance = (synthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(utterance.text).toBe('cat');
    });

    it('allows overriding options on repeat', () => {
      const { synthesis, factory } = makeMocks();
      const controller = createSpeechController(factory);
      controller.speakWord('cat', { rate: 1.0 });
      vi.mocked(synthesis.speak).mockClear();
      controller.repeatWord({ rate: 0.5 });
      const utterance = (synthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(utterance.rate).toBe(0.5);
    });
  });

  describe('cancelSpeech', () => {
    it('calls synthesis.cancel() and returns { ok: true }', () => {
      const { synthesis, factory } = makeMocks();
      const controller = createSpeechController(factory);
      const result = controller.cancelSpeech();
      expect(synthesis.cancel).toHaveBeenCalledOnce();
      expect(result).toEqual({ ok: true });
    });

    it('returns { ok: true } even when synthesis is not speaking', () => {
      const { factory } = makeMocks();
      const controller = createSpeechController(factory);
      // nothing was ever spoken
      expect(controller.cancelSpeech()).toEqual({ ok: true });
    });

    it('returns { ok: true } on unsupported browser', () => {
      const controller = createSpeechController(makeUnsupportedFactory());
      expect(controller.cancelSpeech()).toEqual({ ok: true });
    });
  });

  describe('getAvailableVoices', () => {
    it('delegates to synthesis.getVoices()', () => {
      const voices = [makeVoice('Samantha', 'en-US')];
      const { synthesis, factory } = makeMocks();
      (synthesis.getVoices as ReturnType<typeof vi.fn>).mockReturnValue(voices);
      const controller = createSpeechController(factory);
      expect(controller.getAvailableVoices()).toEqual(voices);
    });

    it('returns [] when synthesis is not supported', () => {
      const controller = createSpeechController(makeUnsupportedFactory());
      expect(controller.getAvailableVoices()).toEqual([]);
    });

    it('returns [] when getVoices returns an empty array', () => {
      const { factory } = makeMocks();
      const controller = createSpeechController(factory);
      expect(controller.getAvailableVoices()).toEqual([]);
    });
  });
});
