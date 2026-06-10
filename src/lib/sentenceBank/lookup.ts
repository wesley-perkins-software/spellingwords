import { normalizeWord } from '@/lib/words';
import { SENTENCE_BANK } from './data';
import type { SentenceBankEntry } from './types';

const index = new Map<string, SentenceBankEntry>(
  SENTENCE_BANK.map((e) => [normalizeWord(e.word, { lowercase: true }), e]),
);

export function getSentenceBankEntry(word: string): SentenceBankEntry | undefined {
  return index.get(normalizeWord(word, { lowercase: true }));
}

export function getSentenceForWord(word: string): string | undefined {
  return getSentenceBankEntry(word)?.exampleSentence;
}
