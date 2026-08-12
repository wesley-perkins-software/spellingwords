export type SourceType = 'curated' | 'custom' | 'generated';

export interface SpellingWord {
  word: string;
  hint?: string;
  exampleSentence?: string;
  phonicsPattern?: string[];
  /**
   * True when isolated pronunciation of `word` does not identify the
   * intended spelling (homophones, and other meaning-dependent pairs) — the
   * student must hear/read `exampleSentence` to know which spelling is
   * meant. When true, `exampleSentence` and `contextSentence` are present.
   */
  contextRequired?: boolean;
  /**
   * The same sentence as `exampleSentence`, with `word` replaced by a blank
   * ("___"), for on-screen display that establishes meaning without
   * revealing the spelling.
   */
  contextSentence?: string;
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
