export interface WordFamily {
  /** The shared ending letters (e.g. "at" for hat/mat/sat). */
  rime: string;
  words: string[];
}

/**
 * Groups words by their shared ending letters, preserving first-seen order —
 * the same "word family" grouping early-literacy phonics instruction already
 * uses (hat/mat/sat share "-at"). A word whose ending doesn't recur becomes
 * a family of one rather than being dropped.
 */
export function groupByWordFamily(words: string[], rimeLength = 2): WordFamily[] {
  const families: WordFamily[] = [];
  const indexByRime = new Map<string, number>();

  for (const word of words) {
    const rime = word.slice(-rimeLength);
    const existingIndex = indexByRime.get(rime);
    if (existingIndex === undefined) {
      indexByRime.set(rime, families.length);
      families.push({ rime, words: [word] });
    } else {
      families[existingIndex].words.push(word);
    }
  }

  return families;
}
