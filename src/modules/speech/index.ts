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
export { getAvailableVoices, getRecommendedVoices, loadVoices, selectPreferredVoice } from './voiceSelection.js';
