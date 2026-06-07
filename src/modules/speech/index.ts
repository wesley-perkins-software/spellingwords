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
} from './types.js';

export { createSpeechController } from './speechController.js';
export { getAvailableVoices, getRankedVoices, getRecommendedVoices, loadVoices, selectPreferredVoice } from './voiceSelection.js';
