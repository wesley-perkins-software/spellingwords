/**
 * Why an entry intentionally has no example sentence.
 *
 * - `heteronym`: the word changes pronunciation with meaning (e.g. "minute",
 *   "live", "read"). Browser TTS speaks the isolated word with one pronunciation,
 *   but a sentence might imply another — so we omit the sentence rather than risk a
 *   contradictory "Use in a Sentence" experience. The word still exists as a
 *   first-class, spelling-only entry in the word universe.
 */
export type SentenceOmissionReason = 'heteronym';

interface SentenceBankEntryBase {
  word: string;
  gradeBand?: 'K-1' | '2-3' | '4-5';
  tags?: string[];
  sourceType: 'curated';
}

/**
 * A word in the word universe. An entry has EITHER a non-empty `exampleSentence`
 * OR a `sentenceOmissionReason` — never both, never neither. Sentence-less entries
 * are spelling-only: TTS speaks the isolated word, "Listen Again" works, and the
 * "Use in a Sentence" button is hidden (matching custom words with no sentence).
 */
export type SentenceBankEntry =
  | (SentenceBankEntryBase & {
      exampleSentence: string;
      sentenceOmissionReason?: never;
    })
  | (SentenceBankEntryBase & {
      exampleSentence?: never;
      sentenceOmissionReason: SentenceOmissionReason;
    });

export type ReviewStatus = 'needs-review' | 'safe-to-add' | 'avoid';

export interface ReviewWordEntry {
  word: string;
  reason: string;
  recommendation: string;
  status: ReviewStatus;
  notes?: string;
}
