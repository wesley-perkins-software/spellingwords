import { selectPreferredVoice, getAvailableVoices, loadVoices as loadVoicesFromAdapter } from './voiceSelection.js';
import type {
  BrowserSpeechController,
  SpeechAdapterFactory,
  SpeechOptions,
  SpeechResult,
  SpeechSynthesisAdapter,
  SpeechSynthesisVoiceAdapter,
} from './types.js';

const DEFAULT_OPTIONS = {
  lang: 'en-US',
  rate: 0.5,
  pitch: 1,
  volume: 1,
} as const;

// Browser globals are accessed only inside this factory, never at module scope.
// Safe for Astro static builds and Node test environments.
const browserFactory: SpeechAdapterFactory = {
  createSynthesis: () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    return window.speechSynthesis as unknown as SpeechSynthesisAdapter;
  },
  createUtterance: (text) =>
    new SpeechSynthesisUtterance(text) as unknown as ReturnType<
      SpeechAdapterFactory['createUtterance']
    >,
};

export function createSpeechController(
  factory: SpeechAdapterFactory = browserFactory,
): BrowserSpeechController {
  const synthesis = factory.createSynthesis();
  let lastWord: string | null = null;
  let lastOptions: SpeechOptions | undefined;

  function isSpeechSupported(): boolean {
    return synthesis !== null;
  }

  function speakWord(word: string, options?: SpeechOptions): SpeechResult {
    if (!synthesis) {
      return { ok: false, error: { code: 'unsupported', message: 'Speech synthesis is not available in this browser.' } };
    }

    lastWord = word;
    lastOptions = options;

    synthesis.cancel();

    const utterance = factory.createUtterance(word);
    utterance.lang = options?.lang ?? DEFAULT_OPTIONS.lang;
    utterance.rate = options?.rate ?? DEFAULT_OPTIONS.rate;
    utterance.pitch = options?.pitch ?? DEFAULT_OPTIONS.pitch;
    utterance.volume = options?.volume ?? DEFAULT_OPTIONS.volume;

    // Use the explicitly provided voice, or select the best available one.
    if (options?.voice !== undefined) {
      utterance.voice = options.voice;
    } else {
      const voices = getAvailableVoices(synthesis);
      utterance.voice = selectPreferredVoice(voices) ?? null;
    }

    synthesis.speak(utterance);
    return { ok: true };
  }

  function repeatWord(options?: SpeechOptions): SpeechResult {
    if (lastWord === null) {
      return { ok: false, error: { code: 'no_word', message: 'No word has been spoken yet. Call speakWord() first.' } };
    }
    return speakWord(lastWord, options ?? lastOptions);
  }

  function cancelSpeech(): SpeechResult {
    synthesis?.cancel();
    return { ok: true };
  }

  function getAvailableVoicesList(): SpeechSynthesisVoiceAdapter[] {
    if (!synthesis) return [];
    return getAvailableVoices(synthesis);
  }

  function loadVoices(timeoutMs?: number): Promise<SpeechSynthesisVoiceAdapter[]> {
    if (!synthesis) return Promise.resolve([]);
    return loadVoicesFromAdapter(synthesis, timeoutMs);
  }

  return {
    isSpeechSupported,
    speakWord,
    repeatWord,
    cancelSpeech,
    getAvailableVoices: getAvailableVoicesList,
    loadVoices,
  };
}
