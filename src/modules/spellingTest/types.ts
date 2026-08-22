import type { SpellingWord } from '@/types/spelling';
import type { AnswerOutcome } from '@/lib/words';

export type TestStatus = 'idle' | 'ready' | 'awaitingAnswer' | 'feedback' | 'complete';

export type TestErrorCode = 'empty_word_list' | 'invalid_state_transition' | 'answer_too_long';

export interface WordAttempt {
  wordIndex: number;
  answer: string;
  /** True for both `correct` and `caseMismatch` outcomes — a case-only
   *  mismatch against meaningfully-capitalized canonical words still counts
   *  as correct for scoring. See `outcome` for the richer grading detail. */
  correct: boolean;
  outcome: AnswerOutcome;
}

export interface TestResult {
  words: SpellingWord[];
  attempts: WordAttempt[];
  missedWords: SpellingWord[];
  correct: number;
  total: number;
  percentage: number;
  elapsedMs: number;
  startedAt: number;
  completedAt: number;
}

export interface TestState {
  status: TestStatus;
  words: SpellingWord[];
  currentIndex: number;
  attempts: WordAttempt[];
  startedAt: number | null;
  completedAt: number | null;
  result: TestResult | null;
  lastAnswerCorrect: boolean | null;
  lastAnswerOutcome: AnswerOutcome | null;
  /**
   * Whether this session's canonical words carry meaningful capitalization
   * worth teaching (curated curriculum content — `January`, `Wednesday`) as
   * opposed to unverifiable custom-entered casing (mobile autocapitalization,
   * accidental Shift). Set once at INITIALIZE from the session's practice
   * source; drives whether SUBMIT_ANSWER can ever produce `caseMismatch`.
   */
  meaningfulCapitalization: boolean;
  error: TestErrorCode | null;
}

export type TestAction =
  | {
      type: 'INITIALIZE';
      payload: {
        words: SpellingWord[] | string[];
        shuffle?: boolean;
        rng?: () => number;
        meaningfulCapitalization?: boolean;
      };
    }
  | { type: 'START'; payload: { timestamp: number } }
  | { type: 'SUBMIT_ANSWER'; payload: { answer: string; timestamp: number } }
  | { type: 'NEXT_WORD'; payload: { timestamp: number } }
  | { type: 'RESET' }
  | { type: 'REVIEW_MISSED'; payload: { shuffle?: boolean; rng?: () => number } };
