import type { SpellingWord } from '@/types/spelling';

const EXTENDED_INTRO =
  'Listen to each word, then type its spelling. You can also hear the word used in a sentence.';
const BASIC_INTRO = 'Listen to each word, then type its spelling.';

/**
 * The ready screen must never promise sentence audio the session can't
 * deliver. Canonical curated words have full sentence-bank coverage, but
 * arbitrary custom words may not — so this only claims sentence support
 * when every word actually has one.
 */
export function getPracticeIntroCopy(words: readonly SpellingWord[]): string {
  const allWordsHaveSentences =
    words.length > 0 && words.every((word) => Boolean(word.exampleSentence?.trim()));
  return allWordsHaveSentences ? EXTENDED_INTRO : BASIC_INTRO;
}
