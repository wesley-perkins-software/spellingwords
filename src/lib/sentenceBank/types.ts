export interface SentenceBankEntry {
  word: string;
  exampleSentence: string;
  gradeBand?: 'K-1' | '2-3' | '4-5';
  tags?: string[];
  sourceType: 'curated';
}

export type ReviewStatus = 'needs-review' | 'safe-to-add' | 'avoid';

export interface ReviewWordEntry {
  word: string;
  reason: string;
  recommendation: string;
  status: ReviewStatus;
  notes?: string;
}
