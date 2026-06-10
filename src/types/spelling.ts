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
  grade?: string;
  tags: string[];
  words: SpellingWord[];
  sourceType: SourceType;
  relatedLists: string[];
}
