import type {
  SpeechSynthesisAdapter,
  SpeechSynthesisVoiceAdapter,
  VoicePreferences,
} from './types.js';

export function getAvailableVoices(
  synthesis: SpeechSynthesisAdapter,
): SpeechSynthesisVoiceAdapter[] {
  return synthesis.getVoices();
}

/**
 * Score and rank voices against preferences, returning the best match.
 * Returns null when the voice list is empty.
 *
 * Scoring (additive, higher = better):
 *   Exact lang match langs[i]:  100 - (i * 20)
 *   Lang prefix match ("en" → "en-US"): +40 (only when no exact match)
 *   Name substring match preferredNames[i]: (n - i) * 10
 *   localService when preferLocal=true: +5
 *   voice.default: +2  (tie-breaker)
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
      // e.g. preference "en" matches voice lang "en-US"
      if (voice.lang.startsWith(lang + '-') || lang.startsWith(voice.lang + '-')) {
        score += 40;
        break;
      }
    }
  }

  // Name preference scoring
  const nameLower = voice.name.toLowerCase();
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
