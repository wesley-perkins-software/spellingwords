// Minimal subset of window.speechSynthesis the controller needs.
// Kept as an interface so tests can supply a plain mock object.
export interface SpeechSynthesisAdapter {
  readonly speaking: boolean;
  speak(utterance: SpeechSynthesisUtteranceAdapter): void;
  cancel(): void;
  getVoices(): SpeechSynthesisVoiceAdapter[];
  addEventListener(event: 'voiceschanged', handler: () => void): void;
  removeEventListener(event: 'voiceschanged', handler: () => void): void;
}

// Minimal subset of SpeechSynthesisUtterance the controller configures.
export interface SpeechSynthesisUtteranceAdapter {
  text: string;
  voice: SpeechSynthesisVoiceAdapter | null;
  rate: number;
  pitch: number;
  volume: number;
  lang: string;
}

// Mirrors SpeechSynthesisVoice without DOM coupling.
export interface SpeechSynthesisVoiceAdapter {
  readonly name: string;
  readonly lang: string;
  readonly localService: boolean;
  readonly default: boolean;
}

// Injectable factories — browser implementation uses real globals;
// tests inject mocks without touching window.
export interface SpeechAdapterFactory {
  createSynthesis(): SpeechSynthesisAdapter | null;
  createUtterance(text: string): SpeechSynthesisUtteranceAdapter;
}

export interface SpeechOptions {
  /** BCP-47 language tag. Defaults to "en-US". */
  lang?: string;
  /**
   * Speech rate (0.1–10). Defaults to 0.5 — noticeably slower than normal,
   * appropriate for children hearing a spelling word for the first time.
   */
  rate?: number;
  /** Pitch (0–2). Defaults to 1. */
  pitch?: number;
  /** Volume (0–1). Defaults to 1. */
  volume?: number;
  /** Specific voice to use. When omitted, selectPreferredVoice() is called. */
  voice?: SpeechSynthesisVoiceAdapter | null;
}

export interface VoicePreferences {
  /**
   * BCP-47 language tags ranked by priority, e.g. ["en-US", "en-GB", "en"].
   * Defaults to ["en-US"].
   */
  langs?: string[];
  /**
   * Substrings to match in voice names, ranked by priority.
   * E.g. ["Samantha", "Google US English", "Microsoft Zira"].
   */
  preferredNames?: string[];
  /** Prefer on-device (local) voices over network voices. Defaults to true. */
  preferLocal?: boolean;
}

/**
 * Stable codes describing why a speech operation could not be completed.
 *
 * Note: iOS/Safari may silently block speech when speakWord() is called
 * outside of a user gesture (click/tap). The browser fires an error on
 * utterance.onerror in that case. For this PR, async utterance errors are
 * not surfaced here. Future work: accept an onError callback in SpeechOptions
 * and map SpeechSynthesisErrorEvent codes to these values.
 */
export type SpeechErrorCode =
  | 'unsupported'    // speechSynthesis absent in this browser
  | 'no_word'        // repeatWord() called before any word was spoken
  | 'interrupted'    // synthesis was cancelled mid-utterance
  | 'synthesis_error'; // catch-all for unrecognized synthesis failures

export interface SpeechError {
  code: SpeechErrorCode;
  message: string;
}

/** Structured result from speak/repeat/cancel. Never throws. */
export type SpeechResult =
  | { ok: true }
  | { ok: false; error: SpeechError };

/** Public interface for the speech controller instance. */
export interface BrowserSpeechController {
  /**
   * Returns true when speechSynthesis is available. Safe to call in Node
   * or unsupported browsers — never throws.
   */
  isSpeechSupported(): boolean;

  /**
   * Speak word with the given options. Cancels any in-progress speech first.
   * Saves the word so repeatWord() can re-speak it.
   *
   * IMPORTANT: Must only be called in response to a user gesture (click/tap)
   * on iOS/Safari. Calling speakWord() on page load or without a user
   * interaction will silently fail on iOS.
   */
  speakWord(word: string, options?: SpeechOptions): SpeechResult;

  /**
   * Re-speak the last word passed to speakWord().
   * Returns { ok: false, error: { code: 'no_word' } } when nothing has been spoken yet.
   */
  repeatWord(options?: SpeechOptions): SpeechResult;

  /**
   * Cancel any in-progress speech. Safe to call when nothing is playing.
   * Always returns { ok: true }.
   */
  cancelSpeech(): SpeechResult;

  /**
   * Returns the current voice list from the adapter. May be empty on the first
   * call in browsers where the voiceschanged event has not yet fired.
   */
  getAvailableVoices(): SpeechSynthesisVoiceAdapter[];

  /**
   * Resolves with the voice list, waiting for the voiceschanged event when
   * voices are not yet populated (common in Chrome). Falls back after timeoutMs.
   * Safe to call on page load — does not require a user gesture.
   */
  loadVoices(timeoutMs?: number): Promise<SpeechSynthesisVoiceAdapter[]>;
}
