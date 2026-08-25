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

// Canonical inventories — not lesson-specific. A new blend/prefix/suffix
// added to future content never requires a code change here, only a tag.
const BEGINNING_BLENDS = [
  'bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr',
  'sc', 'sk', 'sl', 'sm', 'sn', 'sp', 'st', 'sw', 'tr', 'tw',
];
const ENDING_BLENDS = ['ct', 'ft', 'ld', 'lk', 'lp', 'lt', 'mp', 'nd', 'ng', 'nk', 'nt', 'pt', 'sk', 'sp', 'st'];

// Longest-first, computed rather than hand-ordered, so a future addition to
// either list can't silently break "under wins over un" style precedence.
const PREFIXES = ['under', 'inter', 'trans', 'super', 'anti', 'over', 'non', 'sub', 'pre', 'dis', 'mis', 'un', 're'].sort(
  (a, b) => b.length - a.length,
);
const SUFFIXES = [
  'tion', 'sion', 'ness', 'ment', 'able', 'ible', 'ive', 'ous', 'ful', 'less', 'ity', 'est', 'ing', 'ed', 'er', 'ly',
].sort((a, b) => b.length - a.length);

/** First two letters, if they're a known consonant blend (bl-blend-words, grade-1-core beginning blends). */
const beginningBlendStrategy: PatternStrategy = {
  segments: (word) => {
    const cluster = word.slice(0, 2).toLowerCase();
    if (!BEGINNING_BLENDS.includes(cluster)) return [{ text: word, highlight: false }];
    return segmentsFromMask(word, (i) => i < 2);
  },
  groupKey: (word) => {
    const cluster = word.slice(0, 2).toLowerCase();
    return BEGINNING_BLENDS.includes(cluster) ? cluster : word;
  },
};

/** Last two letters, if they're a known consonant blend (ft-final-blend-words, grade-1-core ending blends). */
const endingBlendStrategy: PatternStrategy = {
  segments: (word) => {
    const cluster = word.slice(-2).toLowerCase();
    if (!ENDING_BLENDS.includes(cluster)) return [{ text: word, highlight: false }];
    return segmentsFromMask(word, (i) => i >= word.length - 2);
  },
  groupKey: (word) => {
    const cluster = word.slice(-2).toLowerCase();
    return ENDING_BLENDS.includes(cluster) ? cluster : word;
  },
};

/**
 * Longest-match-first prefix from a canonical inventory — "under" wins over
 * the "un" it contains, so "undercover" groups under "under", not "un".
 * Requires at least 2 letters left after the prefix, a cheap guard against
 * degenerate matches on very short words. Highlights only the prefix's own
 * letters, same "literal matched substring" approach as ckRuleStrategy —
 * no attempt to validate or reconstruct the base word.
 */
const prefixStrategy: PatternStrategy = {
  segments: (word) => {
    const lower = word.toLowerCase();
    const prefix = PREFIXES.find((p) => lower.startsWith(p) && lower.length - p.length >= 2);
    if (!prefix) return [{ text: word, highlight: false }];
    return segmentsFromMask(word, (i) => i < prefix.length);
  },
  groupKey: (word) => {
    const lower = word.toLowerCase();
    return PREFIXES.find((p) => lower.startsWith(p) && lower.length - p.length >= 2) ?? word;
  },
};

/**
 * Longest-match-first suffix from a canonical inventory, mirroring
 * prefixStrategy. Highlights only the matched trailing letters — this is
 * safe even for words with a spelling change before the suffix ("bigger",
 * "happiest") since the strategy never needs the base word's boundary,
 * only the suffix's own letters.
 */
const suffixStrategy: PatternStrategy = {
  segments: (word) => {
    const lower = word.toLowerCase();
    const suffix = SUFFIXES.find((s) => lower.endsWith(s) && lower.length - s.length >= 2);
    if (!suffix) return [{ text: word, highlight: false }];
    return segmentsFromMask(word, (i) => i >= word.length - suffix.length);
  },
  groupKey: (word) => {
    const lower = word.toLowerCase();
    return SUFFIXES.find((s) => lower.endsWith(s) && lower.length - s.length >= 2) ?? word;
  },
};

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

  // Single-blend files (bl-blend-words, ft-final-blend-words) tag
  // "consonant-blends" (+"final-blends" for endings); the two grade-1-core
  // mixed review lists use a coarser "beginning-/ending-consonant-blends"
  // tag instead. Either way, direction — not the specific cluster — is all
  // the dispatcher needs; the strategy itself matches against the full
  // canonical blend inventory.
  const isEndingBlend = tags.has('final-blends') || tags.has('ending-consonant-blends');
  const isBeginningBlend = tags.has('beginning-consonant-blends');
  if (tags.has('consonant-blends') || isBeginningBlend || isEndingBlend) {
    return isEndingBlend ? endingBlendStrategy : beginningBlendStrategy;
  }

  if (tags.has('prefixes')) return prefixStrategy;
  if (tags.has('suffixes')) return suffixStrategy;

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
