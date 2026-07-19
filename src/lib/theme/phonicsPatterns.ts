export interface WordSegment {
  text: string;
  highlight: boolean;
}

export interface PatternGroup {
  key: string;
  words: string[];
}

interface PatternStrategy {
  /** Splits a word into highlighted/non-highlighted runs for display. */
  segments: (word: string) => WordSegment[];
  /** The shared key used to cluster words that teach the same specific pattern. */
  groupKey: (word: string) => string;
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

function segmentsFromMask(word: string, isHighlighted: (index: number) => boolean): WordSegment[] {
  const segments: WordSegment[] = [];
  for (let i = 0; i < word.length; i++) {
    const highlight = isHighlighted(i);
    const last = segments[segments.length - 1];
    if (last && last.highlight === highlight) {
      last.text += word[i];
    } else {
      segments.push({ text: word[i], highlight });
    }
  }
  return segments;
}

/** Every occurrence of a vowel letter, run-length merged (Short A/E/I/O/U, mixed-vowel review). */
const vowelStrategy: PatternStrategy = {
  segments: (word) => segmentsFromMask(word, (i) => VOWELS.has(word[i].toLowerCase())),
  // Rime (last 2 letters) — for a single-vowel list every word shares the same
  // vowel, so grouping by the vowel itself wouldn't sub-divide anything; the
  // rime is what actually produces the hat/mat/sat-style clusters.
  groupKey: (word) => word.slice(-2),
};

/** First matching digraph substring, wherever it falls in the word (onset or coda). */
function digraphStrategy(digraphs: string[]): PatternStrategy {
  const find = (word: string): { index: number; text: string } | null => {
    const lower = word.toLowerCase();
    for (const digraph of digraphs) {
      const index = lower.indexOf(digraph);
      if (index !== -1) return { index, text: word.slice(index, index + digraph.length) };
    }
    return null;
  };
  return {
    segments: (word) => {
      const match = find(word);
      if (!match) return [{ text: word, highlight: false }];
      return segmentsFromMask(
        word,
        (i) => i >= match.index && i < match.index + match.text.length,
      );
    },
    groupKey: (word) => find(word)?.text.toLowerCase() ?? word,
  };
}

/**
 * c/k/ck: highlights every spelling of /k/ in the word — a leading c or k
 * AND a "ck" ending both highlight when both are present ("kick" has both:
 * the leading k and the closing ck are two separate instances of the rule).
 */
const ckRuleStrategy: PatternStrategy = {
  segments: (word) => {
    const lower = word.toLowerCase();
    const mask = new Array(word.length).fill(false);

    let ckIndex = lower.indexOf('ck');
    while (ckIndex !== -1) {
      mask[ckIndex] = true;
      mask[ckIndex + 1] = true;
      ckIndex = lower.indexOf('ck', ckIndex + 2);
    }
    if (!mask[0] && (lower[0] === 'c' || lower[0] === 'k')) mask[0] = true;

    if (!mask.some(Boolean)) return [{ text: word, highlight: false }];
    return segmentsFromMask(word, (i) => mask[i]);
  },
  groupKey: (word) => {
    const lower = word.toLowerCase();
    if (lower.includes('ck')) return 'ck';
    if (lower.includes('k')) return 'k';
    if (lower.includes('c')) return 'c';
    return word;
  },
};

/** Vowel-team digraphs (ai/ay/oa/ow, ee/ea, ...) — same shape as digraphStrategy. */
function vowelTeamStrategy(teams: string[]): PatternStrategy {
  return digraphStrategy(teams);
}

/**
 * Silent-e (VCe): the earlier vowel and the final silent "e" both highlight,
 * with the consonant between them left plain — cake -> c[a]k[e], not "ake"
 * as one run, since the two letters that work together aren't adjacent.
 */
const silentEStrategy: PatternStrategy = {
  segments: (word) => {
    const lower = word.toLowerCase();
    const last = lower.length - 1;
    const endsInSilentE =
      lower.length >= 3 && lower[last] === 'e' && !VOWELS.has(lower[last - 1]);
    if (!endsInSilentE) return [{ text: word, highlight: false }];

    let vowelIndex = -1;
    for (let i = last - 2; i >= 0; i--) {
      if (VOWELS.has(lower[i])) {
        vowelIndex = i;
        break;
      }
    }
    if (vowelIndex === -1) return [{ text: word, highlight: false }];

    return segmentsFromMask(word, (i) => i === vowelIndex || i === last);
  },
  groupKey: (word) => {
    const lower = word.toLowerCase();
    for (let i = lower.length - 3; i >= 0; i--) {
      if (VOWELS.has(lower[i])) return lower[i];
    }
    return word;
  },
};

/**
 * Chooses which pattern a Grade Unit's word list should highlight, based on
 * its own skillTags — never re-derived by guessing at the words themselves,
 * since only the content model knows what's actually being taught. Returns
 * null for anything not recognized, which renders as a plain word list.
 */
function pickPatternStrategy(skillTags: string[]): PatternStrategy | null {
  const tags = new Set(skillTags);

  if (tags.has('digraphs')) {
    const digraphs = ['sh', 'ch', 'th', 'wh'].filter((d) => tags.has(d));
    if (digraphs.length > 0) return digraphStrategy(digraphs);
  }

  if (tags.has('c-k-ck')) return ckRuleStrategy;

  if (tags.has('long-a-and-long-o-vowel-teams')) return vowelTeamStrategy(['ai', 'ay', 'oa', 'ow']);
  if (tags.has('long-e-vowel-teams')) return vowelTeamStrategy(['ee', 'ea']);

  if (tags.has('silent-e-long-vowels')) return silentEStrategy;

  const isPlainShortVowelCvc =
    tags.has('cvc') &&
    tags.has('short-vowels') &&
    !tags.has('spelling-rules') &&
    !tags.has('digraphs');
  if (isPlainShortVowelCvc) return vowelStrategy;

  return null;
}

export interface PreparedWord {
  word: string;
  segments: WordSegment[];
  /** True for the first word of a new pattern group — drives a little extra
   *  layout gap at the boundary, without a separate column per group. */
  newGroup: boolean;
}

/**
 * The single entry point the page/component layer needs: given a Grade
 * Unit's words and its own skillTags, decides whether a pattern applies and
 * returns each word ready to render — segmented for highlighting, and
 * flagged at group boundaries for layout spacing. Falls back to a fully
 * plain, ungrouped list when no pattern is recognized.
 */
export function prepareWordDisplay(words: string[], skillTags: string[]): PreparedWord[] {
  const strategy = pickPatternStrategy(skillTags);
  if (!strategy) {
    return words.map((word) => ({ word, segments: [{ text: word, highlight: false }], newGroup: false }));
  }

  // A group boundary is wherever the pattern key changes from the
  // immediately preceding word — not "first time we've seen this key" —
  // because real content isn't always pre-sorted by pattern (the c/k/ck
  // list interleaves a review word back into an earlier group: cat, cot,
  // cup, kid, kit, cap, back...). Using strict adjacency means the layout
  // rhythm always matches the actual sequence, contiguous or not.
  let previousKey: string | null = null;
  return words.map((word, index) => {
    const key = strategy.groupKey(word);
    const newGroup = index === 0 || key !== previousKey;
    previousKey = key;
    return { word, segments: strategy.segments(word), newGroup };
  });
}
