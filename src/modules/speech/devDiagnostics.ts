/**
 * TEMPORARY dev-only diagnostic aid for the Chrome voice-selection
 * regression investigation. Every consumer (`play.astro`,
 * `VoiceDiagnosticsPanel.astro`) is gated by `import.meta.env.DEV`, so
 * nothing here ships in a production build. Safe to delete this whole file
 * (and its two call sites) once the regression is diagnosed and resolved.
 *
 * A minimal pub/sub so `play.astro`'s speech call sites and
 * `VoiceDiagnosticsPanel.astro`'s log view — two separate inline
 * `<script>` tags — can share the same event stream. Both import this exact
 * module specifier, so Vite resolves them to the same module instance on a
 * given page load and this module-scoped state is shared between them.
 */

import type { SpeechSynthesisVoiceAdapter } from './types.js';

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
  const event: SpeechDiagnosticEvent = { timestamp: performance.now(), label, text, selectedVoice };
  speechDiagnosticEvents.push(event);
  listeners.forEach((listener) => listener(event));
}

/** Returns an unsubscribe function. */
export function onSpeechDiagnosticEvent(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
