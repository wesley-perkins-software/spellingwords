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

export { createSpeechController } from './speechController.js';
export { getAvailableVoices, selectPreferredVoice } from './voiceSelection.js';
