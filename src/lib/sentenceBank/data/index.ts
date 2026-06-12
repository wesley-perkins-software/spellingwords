import type { SentenceBankEntry } from '../types';
import { K1_ENTRIES } from './k1';
import { GRADE23_ENTRIES } from './grade23';
import { GRADE45_ENTRIES } from './grade45';

export const SENTENCE_BANK: SentenceBankEntry[] = [
  ...K1_ENTRIES,
  ...GRADE23_ENTRIES,
  ...GRADE45_ENTRIES,
];
