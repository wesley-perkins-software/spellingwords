import type {
  SpeechSynthesisAdapter,
  SpeechSynthesisVoiceAdapter,
} from './types.js';

/** Name substrings indicating a higher-fidelity synthesis engine. */
const HIGH_QUALITY_PATTERNS = ['enhanced', 'premium', 'natural', 'neural'];

/** Known good voice names, regardless of platform. */
const KNOWN_GOOD_NAMES = [
  'Google US English',
  'Microsoft Aria',
  'Microsoft Jenny',
  'Microsoft Guy',
  'Alex',
  'Ava',
  'Allison',
  'Samantha',
];

/** English locale tags that earn the locale bonus. */
const ENGLISH_LOCALES = ['en-US', 'en-GB', 'en-CA', 'en-AU'];

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
  return voices.map((voice) => scoreVoiceWithReasons(voice));
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
 * Scores and ranks all available voices, returning the highest-quality
 * English voice on the device. Returns null when the voice list is empty.
 *
 * Scoring (additive, higher = better):
 *   Name contains enhanced/premium/natural/neural: +100
 *   Known good voice name (Google US English, …):  +50
 *   English locale (en-US, en-GB, en-CA, en-AU):    +25
 *   localService:                                    +5
 *   voice.default:                                   +2
 *
 * Ties are broken by original array position (earlier wins).
 */
export function selectPreferredVoice(
  voices: SpeechSynthesisVoiceAdapter[],
): SpeechSynthesisVoiceAdapter | null {
  if (voices.length === 0) return null;

  let bestVoice = voices[0];
  let bestScore = scoreVoice(voices[0]);

  for (let i = 1; i < voices.length; i++) {
    const s = scoreVoice(voices[i]);
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
      .map((v) => scoreVoiceWithReasons(v))
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
  for (const voice of qualified) {
    const key = normaliseVoiceName(voice.name) + '|' + voice.lang.toLowerCase();
    const s = scoreVoice(voice);
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

function scoreVoice(voice: SpeechSynthesisVoiceAdapter): number {
  return scoreVoiceWithReasons(voice).score;
}

function scoreVoiceWithReasons(voice: SpeechSynthesisVoiceAdapter): RankedVoice {
  let score = 0;
  const reasons: string[] = [];
  const nameLower = voice.name.toLowerCase();
  const langLower = voice.lang.toLowerCase();

  // High-fidelity synthesis quality signal
  if (HIGH_QUALITY_PATTERNS.some((p) => nameLower.includes(p))) {
    score += 100;
    reasons.push('high-quality synthesis (enhanced/premium/natural/neural)');
  }

  // Known good voice name
  const knownGood = KNOWN_GOOD_NAMES.find((n) => nameLower.includes(n.toLowerCase()));
  if (knownGood) {
    score += 50;
    reasons.push(`known good voice: ${knownGood}`);
  }

  // English locale bonus
  if (ENGLISH_LOCALES.some((l) => langLower === l.toLowerCase())) {
    score += 25;
    reasons.push('English locale');
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

  if (voice.localService) {
    score += 5;
    reasons.push('local service');
  }
  if (voice.default) {
    score += 2;
    reasons.push('default voice');
  }

  return { voice, score, reasons };
}
