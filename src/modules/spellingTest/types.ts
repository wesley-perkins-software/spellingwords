import type { SpellingWord } from '@/types/spelling';

export type TestStatus = 'idle' | 'ready' | 'awaitingAnswer' | 'feedback' | 'complete';

export type TestErrorCode = 'empty_word_list' | 'invalid_state_transition' | 'answer_too_long';

export interface WordAttempt {
  wordIndex: number;
  answer: string;
  correct: boolean;
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
  error: TestErrorCode | null;
}

export type TestAction =
  | { type: 'INITIALIZE'; payload: { words: SpellingWord[] | string[]; shuffle?: boolean; rng?: () => number } }
  | { type: 'START'; payload: { timestamp: number } }
  | { type: 'SUBMIT_ANSWER'; payload: { answer: string; timestamp: number } }
  | { type: 'NEXT_WORD'; payload: { timestamp: number } }
  | { type: 'RESET' }
  | { type: 'REVIEW_MISSED'; payload: { shuffle?: boolean; rng?: () => number } };
