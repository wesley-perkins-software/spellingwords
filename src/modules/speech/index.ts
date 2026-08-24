export type {
  BrowserSpeechController,
  SpeechAdapterFactory,
  SpeechError,
  SpeechErrorCode,
  SpeechOptions,
  SpeechResult,
  SpeechSynthesisAdapter,
  SpeechSynthesisUtteranceAdapter,
  SpeechSynthesisVoiceAdapter,
  VoicePreferences,
} from './types.js';
export type { RankedVoice } from './voiceSelection.js';

export { createSpeechController } from './speechController.js';
export { getAvailableVoices, loadVoices, rankVoices, selectPreferredVoice } from './voiceSelection.js';
