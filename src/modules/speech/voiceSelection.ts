import type {
  SpeechSynthesisAdapter,
  SpeechSynthesisVoiceAdapter,
  VoicePreferences,
} from './types.js';

/**
 * Known high-quality English voices in priority order.
 * Applied as baseline scoring regardless of caller preferences.
 * Google US English must rank well above Samantha so local/default bonuses
 * for Samantha (max +7) cannot bridge the 35-point priority gap.
 */
const PRIORITY_VOICE_NAMES = [
  'Google US English',      // index 0 → +60
  'Google UK English Female', // index 1 → +55
  'Google UK English Male',   // index 2 → +50
  'Microsoft Aria',         // index 3 → +45
  'Microsoft Jenny',        // index 4 → +40
  'Microsoft Zira',         // index 5 → +35
  'Alex',                   // index 6 → +30
  'Samantha',               // index 7 → +25
] as const;

/** Name substrings that identify known low-quality synthesis engines. */
const LOW_QUALITY_PATTERNS = ['espeak', 'festival', 'mbrola'];

/**
 * Patterns that disqualify a voice from the recommended list.
 * Includes low-quality engines, compact/low-fidelity variants, and novelty voices.
 */
const DISQUALIFY_PATTERNS = [
  ...LOW_QUALITY_PATTERNS,
  'compact',
  // Novelty / joke voices
  'aaron',
  'albert',
  'bad news',
  'bahh',
  'bells',
  'boing',
  'bubbles',
  'cellos',
  'good news',
  'hysterical',
  'junior',
  'organ',
  'pipe organ',
  'princess',
  'trinoids',
  'whisper',
  'zarvox',
];

export interface RankedVoice {
  voice: SpeechSynthesisVoiceAdapter;
  score: number;
  reasons: string[];
}

/**
 * Returns all voices with their computed scores and human-readable reasons.
 * Pure function — useful for testing and dev-mode diagnostics.
 */
export function getRankedVoices(voices: SpeechSynthesisVoiceAdapter[]): RankedVoice[] {
  return voices.map((voice) => scoreVoiceWithReasons(voice, ['en-US'], [], true));
}

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
 *   Priority voice name list match:        +60 (index 0) down to +25 (index 7)
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

  // Dev-mode diagnostics — stripped by bundler in production builds
  if (typeof import.meta !== 'undefined' && (import.meta as Record<string, unknown>).env &&
      ((import.meta as Record<string, { DEV?: boolean }>).env).DEV) {
    const englishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
    const ranked = englishVoices
      .map((v) => scoreVoiceWithReasons(v, langs, preferredNames, preferLocal))
      .sort((a, b) => b.score - a.score);
    console.group('[VoiceSelection] ranked English voices');
    ranked.forEach(({ voice, score, reasons }) => {
      console.log(
        `  ${score.toString().padStart(4)}  ${voice.name} (${voice.lang})` +
        ` local=${voice.localService} default=${voice.default}` +
        ` — ${reasons.join(', ')}`,
      );
    });
    console.log('[VoiceSelection] selected:', bestVoice.name);
    console.groupEnd();
  }

  return bestVoice;
}

/**
 * Returns a filtered, deduplicated, ranked list of recommended English voices.
 *
 * Steps:
 *   1. Keep only voices whose lang starts with "en".
 *   2. Remove voices matching disqualifying name patterns (espeak, mbrola, compact…).
 *   3. Deduplicate near-identical variants — e.g. "Samantha" and "Samantha (Enhanced)"
 *      collapse to the higher-quality one.
 *   4. Sort by score descending.
 *   5. Return at most maxCount voices.
 */
export function getRecommendedVoices(
  voices: SpeechSynthesisVoiceAdapter[],
  maxCount = 3,
): SpeechSynthesisVoiceAdapter[] {
  // Step 1 — English only
  const english = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));

  // Step 2 — Remove disqualified voices
  const qualified = english.filter((v) => {
    const n = v.name.toLowerCase();
    return !DISQUALIFY_PATTERNS.some((p) => n.includes(p));
  });

  // Step 3 — Deduplicate: group by normalised name + first lang segment
  const groups = new Map<string, { voice: SpeechSynthesisVoiceAdapter; score: number }>();
  const scoringLangs = ['en-US'];
  for (const voice of qualified) {
    const key = normaliseVoiceName(voice.name) + '|' + voice.lang.toLowerCase();
    const s = scoreVoice(voice, scoringLangs, [], true);
    const existing = groups.get(key);
    if (!existing || s > existing.score) {
      groups.set(key, { voice, score: s });
    }
  }

  const deduped = Array.from(groups.values());

  // Step 4 — Sort descending by score
  deduped.sort((a, b) => b.score - a.score);

  // Step 5 — Cap
  return deduped.slice(0, maxCount).map(({ voice }) => voice);
}

/** Strip parenthetical suffixes and quality descriptor words for grouping purposes. */
function normaliseVoiceName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\(.*?\)/g, '')
    .replace(/\b(enhanced|premium|compact|natural)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreVoice(
  voice: SpeechSynthesisVoiceAdapter,
  langs: string[],
  preferredNames: string[],
  preferLocal: boolean,
): number {
  return scoreVoiceWithReasons(voice, langs, preferredNames, preferLocal).score;
}

function scoreVoiceWithReasons(
  voice: SpeechSynthesisVoiceAdapter,
  langs: string[],
  preferredNames: string[],
  preferLocal: boolean,
): RankedVoice {
  let score = 0;
  const reasons: string[] = [];
  const nameLower = voice.name.toLowerCase();

  // Language scoring
  let hasExactMatch = false;
  for (let i = 0; i < langs.length; i++) {
    if (voice.lang === langs[i]) {
      score += 100 - i * 20;
      hasExactMatch = true;
      reasons.push('exact language match');
      break;
    }
  }
  if (!hasExactMatch) {
    for (const lang of langs) {
      if (voice.lang.startsWith(lang + '-') || lang.startsWith(voice.lang + '-')) {
        score += 40;
        reasons.push('language prefix match');
        break;
      }
    }
  }

  // Priority voice name list — baked-in quality ranking
  let priorityMatched = false;
  for (let i = 0; i < PRIORITY_VOICE_NAMES.length; i++) {
    if (nameLower.includes(PRIORITY_VOICE_NAMES[i].toLowerCase())) {
      score += 60 - i * 5;
      reasons.push(`preferred: ${PRIORITY_VOICE_NAMES[i]}`);
      priorityMatched = true;
      break;
    }
  }

  // Enhanced/premium quality signal
  if (nameLower.includes('enhanced') || nameLower.includes('premium')) {
    score += 15;
    if (!priorityMatched) reasons.push('enhanced/premium quality');
  }

  // Low-quality synthesis engine penalty
  for (const pattern of LOW_QUALITY_PATTERNS) {
    if (nameLower.includes(pattern)) {
      score -= 50;
      reasons.push('penalized low-quality engine');
      break;
    }
  }

  // Novelty voice penalty hint (voices may be filtered before scoring, but flag anyway)
  const noveltyPatterns = [
    'aaron', 'albert', 'bad news', 'bahh', 'bells', 'boing', 'bubbles',
    'cellos', 'good news', 'hysterical', 'junior', 'organ', 'pipe organ',
    'princess', 'trinoids', 'whisper', 'zarvox',
  ];
  for (const p of noveltyPatterns) {
    if (nameLower.includes(p)) {
      reasons.push('penalized novelty voice');
      break;
    }
  }
  if (nameLower.includes('compact')) {
    reasons.push('penalized compact voice');
  }

  // Caller-supplied name preferences (override / supplement the default list)
  for (let i = 0; i < preferredNames.length; i++) {
    if (nameLower.includes(preferredNames[i].toLowerCase())) {
      score += (preferredNames.length - i) * 10;
      break;
    }
  }

  if (preferLocal && voice.localService) {
    score += 5;
    reasons.push('local service');
  }
  if (voice.default) score += 2;

  return { voice, score, reasons };
}
