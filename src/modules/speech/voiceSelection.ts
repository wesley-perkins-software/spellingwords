import type {
  SpeechSynthesisAdapter,
  SpeechSynthesisVoiceAdapter,
  VoicePreferences,
} from './types.js';

/**
 * Known high-quality English voices in priority order.
 * Applied as baseline scoring regardless of caller preferences.
 */
const PRIORITY_VOICE_NAMES = [
  'Samantha',
  'Siri',
  'Google US English',
  'Microsoft Aria',
  'Microsoft Jenny',
  'Microsoft Zira',
  'Microsoft David',
  'Microsoft Mark',
  'Alex',
  'Karen',
  'Moira',
  'Tessa',
] as const;

/** Name substrings that identify known low-quality synthesis engines. */
const LOW_QUALITY_PATTERNS = ['espeak', 'festival', 'mbrola'];

export function getAvailableVoices(
  synthesis: SpeechSynthesisAdapter,
): SpeechSynthesisVoiceAdapter[] {
  return synthesis.getVoices();
}

/**
 * Resolves with the voice list once populated, waiting for voiceschanged
 * when voices are not yet available (common in Chrome on first load).
 * Falls back after timeoutMs regardless.
 */
export function loadVoices(
  synthesis: SpeechSynthesisAdapter,
  timeoutMs = 1500,
): Promise<SpeechSynthesisVoiceAdapter[]> {
  const immediate = synthesis.getVoices();
  if (immediate.length > 0) return Promise.resolve(immediate);
  return new Promise((resolve) => {
    const handler = () => resolve(synthesis.getVoices());
    synthesis.addEventListener('voiceschanged', handler);
    setTimeout(() => {
      synthesis.removeEventListener('voiceschanged', handler);
      resolve(synthesis.getVoices());
    }, timeoutMs);
  });
}

/**
 * Score and rank voices against preferences, returning the best match.
 * Returns null when the voice list is empty.
 *
 * Scoring (additive, higher = better):
 *   Exact lang match langs[i]:            100 - (i * 20)
 *   Lang prefix match ("en" → "en-US"):   +40 (only when no exact match)
 *   Priority voice name list match:        +60 (index 0) down to +5 (index 11)
 *   Name substring match preferredNames:   (n - i) * 10
 *   enhanced / premium in name:            +15
 *   Low-quality engine (espeak etc.):      −50
 *   localService when preferLocal=true:    +5
 *   voice.default:                         +2  (tie-breaker)
 *
 * Ties are broken by original array position (earlier wins).
 */
export function selectPreferredVoice(
  voices: SpeechSynthesisVoiceAdapter[],
  preferences?: VoicePreferences,
): SpeechSynthesisVoiceAdapter | null {
  if (voices.length === 0) return null;

  const langs = preferences?.langs ?? ['en-US'];
  const preferredNames = preferences?.preferredNames ?? [];
  const preferLocal = preferences?.preferLocal ?? true;

  let bestVoice = voices[0];
  let bestScore = scoreVoice(voices[0], langs, preferredNames, preferLocal);

  for (let i = 1; i < voices.length; i++) {
    const s = scoreVoice(voices[i], langs, preferredNames, preferLocal);
    if (s > bestScore) {
      bestScore = s;
      bestVoice = voices[i];
    }
  }

  return bestVoice;
}

function scoreVoice(
  voice: SpeechSynthesisVoiceAdapter,
  langs: string[],
  preferredNames: string[],
  preferLocal: boolean,
): number {
  let score = 0;
  const nameLower = voice.name.toLowerCase();

  // Language scoring
  let hasExactMatch = false;
  for (let i = 0; i < langs.length; i++) {
    if (voice.lang === langs[i]) {
      score += 100 - i * 20;
      hasExactMatch = true;
      break;
    }
  }
  if (!hasExactMatch) {
    for (const lang of langs) {
      if (voice.lang.startsWith(lang + '-') || lang.startsWith(voice.lang + '-')) {
        score += 40;
        break;
      }
    }
  }

  // Priority voice name list — baked-in quality ranking
  for (let i = 0; i < PRIORITY_VOICE_NAMES.length; i++) {
    if (nameLower.includes(PRIORITY_VOICE_NAMES[i].toLowerCase())) {
      score += 60 - i * 5;
      break;
    }
  }

  // Enhanced/premium quality signal
  if (nameLower.includes('enhanced') || nameLower.includes('premium')) {
    score += 15;
  }

  // Low-quality synthesis engine penalty
  for (const pattern of LOW_QUALITY_PATTERNS) {
    if (nameLower.includes(pattern)) {
      score -= 50;
      break;
    }
  }

  // Caller-supplied name preferences (override / supplement the default list)
  for (let i = 0; i < preferredNames.length; i++) {
    if (nameLower.includes(preferredNames[i].toLowerCase())) {
      score += (preferredNames.length - i) * 10;
      break;
    }
  }

  if (preferLocal && voice.localService) score += 5;
  if (voice.default) score += 2;

  return score;
}
