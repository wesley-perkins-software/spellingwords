export type SourceType = 'curated' | 'custom' | 'generated';

export interface SpellingWord {
  word: string;
  /** When present, TTS speaks this instead of `word` — use for heteronyms where the bare word would be mispronounced (e.g. "live, as in: they live in a house"). */
  spokenPrompt?: string;
  hint?: string;
  exampleSentence?: string;
  phonicsPattern?: string[];
}

export interface WordList {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  grade?: string;
  tags: string[];
  words: SpellingWord[];
  sourceType: SourceType;
  relatedLists: string[];
}
