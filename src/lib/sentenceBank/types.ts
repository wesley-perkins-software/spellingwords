export interface SentenceBankEntry {
  word: string;
  exampleSentence: string;
  gradeBand?: 'K-1' | '2-3' | '4-5';
  tags?: string[];
  sourceType: 'curated';
}
