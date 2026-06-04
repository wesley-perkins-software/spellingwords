export type SourceType = 'curated' | 'custom' | 'generated';

export interface SpellingWord {
  word: string;
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
  /** Flexible grade label: 'Pre-K', 'Kindergarten', '3rd Grade', 'Adult', 'Spelling Bee', etc. */
  grade?: string;
  tags: string[];
  words: SpellingWord[];
  sourceType: SourceType;
  relatedLists: string[];
}
