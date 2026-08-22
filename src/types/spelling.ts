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

export type PracticeSourceType = 'core' | 'hfw' | 'themed' | 'skill' | 'custom';

/**
 * Describes where a /play session was launched from, so the practice
 * experience can offer "Return to {source}" / "Continue to next unit"
 * navigation instead of a generic dead end. `nextHref`/`nextTitle` are only
 * ever set for 'core' and 'hfw' sources, which have real sequencing.
 */
export interface PracticeSource {
  type: PracticeSourceType;
  title?: string;
  href?: string;
  grade?: string;
  nextHref?: string;
  nextTitle?: string;
}
