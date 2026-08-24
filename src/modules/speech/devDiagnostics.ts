/**
 * TEMPORARY diagnostic aid for the Chrome voice-selection regression
 * investigation. Safe to delete this whole file (and its call sites in
 * `play.astro` and `VoiceDiagnosticsPanel.astro`) once the regression is
 * diagnosed and resolved.
 *
 * Gating: this can't use `import.meta.env.DEV` — Netlify deploy previews
 * run `astro build` (production mode), so a DEV-only gate would strip the
 * panel from exactly the environment this is meant to debug. Instead,
 * `isVoiceDiagnosticsEnabled()` gates on a runtime opt-in (a `?
 * voiceDiagnostics=1` query param, remembered in sessionStorage for the
 * rest of the tab session) so it ships inert in every build but stays
 * invisible to normal visitors, who never pass that param.
 *
 * Also a minimal pub/sub so `play.astro`'s speech call sites and
 * `VoiceDiagnosticsPanel.astro`'s log view — two separate inline
 * `<script>` tags — can share the same event stream. Both import this exact
 * module specifier, so Vite resolves them to the same module instance on a
 * given page load and this module-scoped state is shared between them.
 */

import type { SpeechSynthesisVoiceAdapter } from './types.js';

const ENABLED_STORAGE_KEY = 'sw:voiceDiagnostics';

let cachedEnabled: boolean | null = null;

/**
 * True once per page load if `?voiceDiagnostics=1` is in the URL, or if it
 * was earlier this tab session (remembered via sessionStorage so the flag
 * survives the redirect from `/practice-your-own-words` or a curated list
 * page into `/play`, which don't otherwise carry the query param forward).
 */
export function isVoiceDiagnosticsEnabled(): boolean {
  if (cachedEnabled !== null) return cachedEnabled;
  if (typeof window === 'undefined') return false;

  const fromQuery = new URLSearchParams(window.location.search).get('voiceDiagnostics') === '1';
  let fromSession = false;
  try {
    fromSession = window.sessionStorage.getItem(ENABLED_STORAGE_KEY) === '1';
  } catch {
    /* sessionStorage unavailable (private browsing, disabled storage) */
  }

  cachedEnabled = fromQuery || fromSession;
  if (fromQuery) {
    try {
      window.sessionStorage.setItem(ENABLED_STORAGE_KEY, '1');
    } catch {
      /* ignore — worst case the flag doesn't persist across navigations */
    }
  }
  return cachedEnabled;
}

export interface SpeechDiagnosticEvent {
  /** High-resolution timestamp (`performance.now()`) when the voice was resolved. */
  timestamp: number;
  /** What triggered this speech, e.g. "word", "sentence", "repeat". */
  label: string;
  /** The text passed to speakWord(). */
  text: string;
  /** The voice actually assigned to utterance.voice for this call. */
  selectedVoice: SpeechSynthesisVoiceAdapter | null;
}

type Listener = (event: SpeechDiagnosticEvent) => void;

const listeners = new Set<Listener>();
export const speechDiagnosticEvents: SpeechDiagnosticEvent[] = [];

export function recordSpeechEvent(
  label: string,
  text: string,
  selectedVoice: SpeechSynthesisVoiceAdapter | null,
): void {
  if (!isVoiceDiagnosticsEnabled()) return;
  const event: SpeechDiagnosticEvent = { timestamp: performance.now(), label, text, selectedVoice };
  speechDiagnosticEvents.push(event);
  listeners.forEach((listener) => listener(event));
}

/** Returns an unsubscribe function. */
export function onSpeechDiagnosticEvent(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
