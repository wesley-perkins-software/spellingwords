import type { SpellingWord } from '@/types/spelling';
import { getSentenceBankEntry } from '@/lib/sentenceBank/lookup';
import { shuffleWords } from '@/modules/spellingTest/order';
import type { CuratedSpellingSkillId } from './spellingSkills';

/**
 * A Skill practice bank: the canonical, grade-independent pool of practice
 * words for one Skill, distinct from that Skill's (smaller) demonstration
 * set in the Skill's own content frontmatter. See
 * docs/architecture/CONTENT_MODEL.md §3/§4.
 *
 * Items are plain strings for this pilot. That is sufficient for the
 * single-pattern, multi-pattern, and morphological Skills piloted here, but
 * it is not meant as a frozen shape for all 41 Skills — a meaning-dependent
 * Skill (Homophones, Commonly Confused Words) will need a richer item shape
 * (at minimum, a disambiguating context sentence) before it can ship a bank,
 * which is deliberately left undesigned until that work is taken on.
 */
export interface SkillPracticeBank {
  skillId: CuratedSpellingSkillId;
  words: string[];
}

/**
 * Pilot banks only. A Skill with no entry here simply has no practice CTA —
 * that's the whole rollout mechanism for the remaining Skills, not a state
 * that needs to be checked for or handled specially by callers.
 */
export const SKILL_PRACTICE_BANKS: Partial<Record<CuratedSpellingSkillId, SkillPracticeBank>> = {
  'short-a-words': {
    skillId: 'short-a-words',
    words: [
      'cat', 'hat', 'mat', 'sat',
      'pan', 'can', 'fan', 'ran',
      'cap', 'map', 'tap',
      'bad', 'dad', 'sad',
      'bag', 'tag',
      'hand', 'stamp',
    ],
  },
  'digraph-sh-words': {
    skillId: 'digraph-sh-words',
    words: [
      'ship', 'shop', 'shut', 'shin', 'shell',
      'wish', 'brush', 'dish', 'fish', 'wash', 'mush',
      'fishing', 'washing',
    ],
  },
  'silent-e-long-a': {
    skillId: 'silent-e-long-a',
    words: [
      'cake', 'bake', 'lake', 'make', 'take', 'wake',
      'gate', 'late', 'date', 'plate', 'skate',
      'flame', 'game', 'name', 'same', 'tame',
      'cape', 'grape', 'shape', 'tape',
      'brave', 'cave', 'gave', 'save', 'wave',
    ],
  },
  'ck-tch-dge-word-endings': {
    skillId: 'ck-tch-dge-word-endings',
    words: [
      'back', 'duck', 'rock', 'pick',
      'staff', 'bell', 'moss', 'cliff', 'buzz', 'fuzz', 'jazz',
      'catch', 'pitch', 'notch', 'hutch',
      'badge', 'bridge', 'lodge', 'fudge',
    ],
  },
  'common-suffixes': {
    skillId: 'common-suffixes',
    words: [
      'helpful', 'hopeful', 'careful', 'thoughtful',
      'careless', 'hopeless',
      'kindness', 'darkness',
      'enjoyment', 'movement',
      'faster', 'fastest', 'slower', 'slowest', 'smaller', 'smallest',
    ],
  },
  'multisyllabic-words': {
    skillId: 'multisyllabic-words',
    words: [
      'rabbit', 'basket', 'kitten', 'chicken', 'pencil', 'garden',
      'robot', 'paper', 'music', 'baby',
      'table', 'little', 'apple', 'simple', 'gentle', 'circle', 'turtle',
      'sunset',
      'winter', 'number',
    ],
  },
  'short-e-words': {
    skillId: 'short-e-words',
    words: [
      'bed', 'fed', 'led', 'red', 'wed',
      'hen', 'ten', 'men', 'pen', 'den',
      'bet', 'get', 'net', 'pet',
      'leg', 'beg', 'peg',
      'tent', 'step', 'nest',
    ],
  },
  'short-i-words': {
    skillId: 'short-i-words',
    words: [
      'bit', 'fit', 'hit', 'kit', 'sit',
      'big', 'dig', 'fig', 'pig', 'wig',
      'bin', 'fin', 'pin', 'tin', 'win',
      'dip', 'hip', 'lip', 'rip', 'tip',
      'dish', 'fish', 'wish',
      'hill',
    ],
  },
  'short-o-words': {
    skillId: 'short-o-words',
    words: [
      'cot', 'dot', 'got', 'hot', 'not', 'pot',
      'hop', 'mop', 'pop', 'top',
      'dog', 'fog', 'jog', 'log',
      'dock', 'lock', 'rock', 'sock',
      'pond', 'moth',
    ],
  },
  'short-u-words': {
    skillId: 'short-u-words',
    words: [
      'bug', 'hug', 'jug', 'mug', 'rug',
      'bun', 'fun', 'run', 'sun',
      'cub', 'rub', 'tub',
      'dust', 'just', 'must', 'trust',
      'cup', 'drum',
    ],
  },
  'digraph-ch-words': {
    skillId: 'digraph-ch-words',
    words: [
      'chin', 'chip', 'chop', 'chest',
      'lunch', 'much', 'rich', 'such',
    ],
  },
  'digraph-th-words': {
    skillId: 'digraph-th-words',
    words: [
      'that', 'this', 'them',
      'think', 'math', 'bath', 'path',
    ],
  },
  'digraph-wh-words': {
    skillId: 'digraph-wh-words',
    words: [
      'what', 'when', 'where', 'whip', 'while', 'why', 'wheel', 'white',
      'who', 'whom', 'whose', 'whole',
    ],
  },
  'silent-e-long-i': {
    skillId: 'silent-e-long-i',
    words: [
      'bike', 'hike', 'like', 'spike',
      'fine', 'line', 'mine', 'nine', 'pine', 'shine',
      'hide', 'ride', 'side', 'slide', 'wide',
      'chime', 'dime', 'lime', 'time',
    ],
  },
  'silent-e-long-o': {
    skillId: 'silent-e-long-o',
    words: [
      'home', 'hope', 'note', 'stone', 'chose',
      'bone', 'cone', 'rope', 'slope', 'vote',
      'broke', 'joke', 'poke', 'smoke',
    ],
  },
  'silent-e-long-u': {
    skillId: 'silent-e-long-u',
    words: [
      'cube', 'cute', 'huge', 'mule', 'fuse',
      'rule', 'flute', 'prune', 'tune', 'tube',
    ],
  },
  'r-controlled-ar': {
    skillId: 'r-controlled-ar',
    words: [
      'art', 'car', 'dark', 'farm', 'hard', 'park', 'sharp', 'yard',
      'far', 'star', 'cart', 'start', 'shark', 'arm',
    ],
  },
  'r-controlled-or': {
    skillId: 'r-controlled-or',
    words: [
      'corn', 'for', 'form', 'horse', 'morning', 'north', 'short', 'story',
      'born', 'torn', 'sort', 'storm', 'glory', 'worn',
    ],
  },
  'r-controlled-er-ir-ur': {
    skillId: 'r-controlled-er-ir-ur',
    words: [
      'her', 'fern', 'term',
      'bird', 'first', 'girl',
      'turn', 'hurt', 'turtle',
      'sister', 'winter', 'under',
    ],
  },
  'vowel-teams-ai-ay': {
    skillId: 'vowel-teams-ai-ay',
    words: [
      'chain', 'mail', 'nail', 'paint', 'rain', 'snail', 'train', 'wait',
      'day', 'play', 'stay', 'way',
    ],
  },
  'vowel-teams-ee-ea': {
    skillId: 'vowel-teams-ee-ea',
    words: [
      'bee', 'feel', 'feet', 'free', 'keep', 'need', 'sleep', 'tree', 'week',
      'beach', 'clean', 'dream', 'eat', 'heat', 'speak', 'team',
    ],
  },
  'vowel-teams-oa-ow': {
    skillId: 'vowel-teams-oa-ow',
    words: [
      'boat', 'coat', 'goat', 'road', 'soap',
      'blow', 'crow', 'flow', 'grow', 'know', 'snow',
    ],
  },
  'oi-and-oy-words': {
    skillId: 'oi-and-oy-words',
    words: [
      'oil', 'coin', 'point', 'voice', 'noise', 'soil',
      'boy', 'joy', 'enjoy', 'royal', 'loyal', 'toy',
    ],
  },
  'ou-and-ow-words': {
    skillId: 'ou-and-ow-words',
    words: [
      'out', 'loud', 'found', 'round', 'sound', 'ground', 'mouse', 'mouth',
      'cow', 'brown', 'down', 'now', 'town', 'clown', 'crown', 'howl',
    ],
  },
  'ie-and-igh-words': {
    skillId: 'ie-and-igh-words',
    words: [
      'pie', 'tie', 'lie', 'die',
      'high', 'sigh', 'night', 'light', 'right', 'might', 'sight', 'bright', 'flight',
    ],
  },
  'oo-words': {
    skillId: 'oo-words',
    words: [
      'moon', 'food', 'zoo', 'spoon', 'soon', 'room', 'smooth',
      'book', 'look', 'foot', 'good', 'took', 'wood', 'hood',
    ],
  },
  'au-and-aw-words': {
    skillId: 'au-and-aw-words',
    words: [
      'saw', 'draw', 'lawn', 'crawl', 'hawk',
      'cause', 'author', 'haul', 'because', 'fault', 'vault',
    ],
  },
};

/** Looks up a Skill's practice bank, or `undefined` if it doesn't have one yet. */
export function getSkillPracticeBank(skillId: string): SkillPracticeBank | undefined {
  return SKILL_PRACTICE_BANKS[skillId as CuratedSpellingSkillId];
}

/**
 * Maps a bank's plain-string words to playable `SpellingWord`s, attaching
 * an example sentence from the shared sentence bank where one exists —
 * mirrors `spellingLists.ts`'s `toPlayableWords`, which does the same for a
 * content-collection entry's demonstration words.
 */
export function toPlayableSkillPracticeWords(bank: SkillPracticeBank): SpellingWord[] {
  return bank.words.map((word) => ({
    word,
    exampleSentence: getSentenceBankEntry(word)?.exampleSentence,
  }));
}

/**
 * Selects a bounded, shuffled practice session from a Skill's bank. Default
 * session size of 10 matches the curated-collection default already decided
 * in docs/LEARNING_MODEL.md; a bank smaller than that simply yields the
 * whole (shuffled) bank.
 */
export function selectSkillPracticeSession<T>(
  words: readonly T[],
  sessionSize = 10,
  rng: () => number = Math.random,
): T[] {
  return shuffleWords(words, rng).slice(0, sessionSize);
}
