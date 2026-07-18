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

/**
 * Whether a Grade Unit's word list should be displayed as shared-ending
 * "word families" at all (hat/mat/sat → the -at family) rather than as a
 * plain word list.
 *
 * This is a real phonics distinction, not a stylistic one: grouping by
 * shared ending is only the actual pattern being taught for plain
 * short-vowel CVC lists. Applying it to a consonant-digraph list (ship/chip
 * share "-ip", but the taught pattern is the sh-/ch- onset, not the rime)
 * or a spelling-rule list like c/k/ck (back/neck/kick/lock/duck/sack would
 * cluster under "-ck" while cat/cot/cup/kid/kit/cap are left as meaningless
 * families of one) would visually teach the wrong pattern. Gated on the
 * content's own `skillTags` rather than re-deriving intent from the words
 * themselves, since only the content model knows what's actually being
 * taught.
 */
export function shouldGroupByWordFamily(skillTags: string[]): boolean {
  const tags = new Set(skillTags);
  const isPlainShortVowelCvc = tags.has('cvc') && tags.has('short-vowels');
  const teachesADifferentPattern =
    tags.has('spelling-rules') ||
    tags.has('digraphs') ||
    tags.has('blends') ||
    tags.has('vowel-teams') ||
    tags.has('silent-e');

  return isPlainShortVowelCvc && !teachesADifferentPattern;
}
