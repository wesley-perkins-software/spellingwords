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
 * Items are plain strings, resolved against the shared sentence bank like
 * any other curated word — including Homophones and Commonly Confused
 * Words, whose disambiguation comes from an ordinary, carefully chosen
 * example sentence rather than a separate item shape or practice mode.
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
      'chin', 'chip', 'chop', 'chest', 'chick', 'cheese', 'chair', 'church',
      'lunch', 'much', 'rich', 'such', 'bunch', 'punch', 'teach', 'reach',
    ],
  },
  'digraph-th-words': {
    skillId: 'digraph-th-words',
    words: [
      'that', 'this', 'them', 'thin', 'three', 'thing',
      'think', 'math', 'bath', 'path', 'teeth', 'tooth', 'cloth', 'both', 'with',
    ],
  },
  'digraph-wh-words': {
    skillId: 'digraph-wh-words',
    words: [
      'what', 'when', 'where', 'whip', 'while', 'why', 'wheel', 'white',
      'who', 'whom', 'whose', 'whole', 'whale', 'wheat',
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
      'cube', 'cute', 'huge', 'mule', 'fuse', 'use',
      'rule', 'flute', 'prune', 'tune', 'tube', 'cure', 'pure', 'dune',
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
      'her', 'fern', 'term', 'after', 'never',
      'bird', 'first', 'girl', 'third', 'shirt', 'stir',
      'turn', 'hurt', 'turtle', 'burn', 'curl',
      'sister', 'winter', 'under',
    ],
  },
  'vowel-teams-ai-ay': {
    skillId: 'vowel-teams-ai-ay',
    words: [
      'chain', 'mail', 'nail', 'paint', 'rain', 'snail', 'train', 'wait', 'brain', 'tail', 'main',
      'day', 'play', 'stay', 'way', 'say', 'may', 'gray',
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
      'boat', 'coat', 'goat', 'road', 'soap', 'toast', 'roast', 'coach',
      'blow', 'crow', 'flow', 'grow', 'know', 'snow', 'low', 'slow', 'show', 'glow', 'throw',
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
      'saw', 'draw', 'lawn', 'crawl', 'hawk', 'paw', 'jaw', 'straw', 'yawn', 'dawn',
      'cause', 'author', 'haul', 'because', 'fault', 'vault', 'launch', 'sauce',
    ],
  },
  'beginning-blends': {
    skillId: 'beginning-blends',
    words: [
      'black', 'blob', 'clap', 'clip', 'flag', 'flat', 'glad', 'glow', 'plum', 'plan', 'slip', 'sled',
      'brag', 'bring', 'crab', 'cry', 'drum', 'drip', 'frog', 'free', 'grab', 'green', 'prize', 'print', 'train', 'trip',
      'smile', 'small', 'snack', 'snap', 'spin', 'spot', 'stop', 'star', 'swim', 'swing',
      'scrub', 'sprint', 'strap', 'splat',
    ],
  },
  'ending-blends': {
    skillId: 'ending-blends',
    words: [
      'jump', 'lamp', 'camp',
      'hand', 'sand', 'land',
      'sink', 'pink', 'junk',
      'tent', 'hunt', 'mint',
      'gift', 'lift', 'raft',
      'milk', 'silk', 'elk',
      'belt', 'melt', 'salt',
      'desk', 'mask', 'task',
      'cold', 'gold',
      'help', 'yelp',
    ],
  },
  'silent-letters': {
    skillId: 'silent-letters',
    words: [
      'write', 'wrap', 'wrist', 'wrote', 'wrong', 'wreck',
      'know', 'knee', 'knot', 'knew', 'knock', 'knife',
      'thumb', 'lamb', 'crumb', 'comb', 'climb', 'numb',
    ],
  },
  'soft-c-soft-g': {
    skillId: 'soft-c-soft-g',
    words: [
      'city', 'ice', 'icy', 'circus', 'place', 'face', 'race', 'nice',
      'giant', 'page', 'gym', 'cage', 'large', 'change',
    ],
  },
  plurals: {
    skillId: 'plurals',
    words: [
      'cats', 'dogs', 'cups', 'beds', 'books', 'trees',
      'buses', 'boxes', 'dishes', 'wishes', 'brushes', 'fixes', 'buzzes', 'passes', 'lunches', 'foxes',
    ],
  },
  'ed-and-ing': {
    skillId: 'ed-and-ing',
    words: [
      'jumped', 'jumping', 'helped', 'helping', 'played', 'playing',
      'rested', 'resting', 'looked', 'looking', 'called', 'calling',
      'wanted', 'wanting', 'cooked', 'cooking',
    ],
  },
  'suffix-spelling-changes': {
    skillId: 'suffix-spelling-changes',
    words: [
      'running', 'stopped', 'bigger', 'sitting', 'planned',
      'making', 'hoped', 'safer', 'smiled',
      'carried', 'cried', 'happier', 'funniest', 'happiness', 'cities',
      'hopeful', 'careless', 'carrying',
    ],
  },
  'compound-words': {
    skillId: 'compound-words',
    words: [
      'sunshine', 'backpack', 'notebook', 'snowman', 'sunset', 'toothbrush',
      'rainbow', 'weekend', 'bedroom', 'football', 'birthday', 'cupcake',
      'bathtub', 'playground', 'sandbox', 'mailbox', 'doghouse', 'popcorn',
    ],
  },
  contractions: {
    skillId: 'contractions',
    words: [
      "can't", "don't", "didn't", "isn't", "wasn't", "won't",
      "I'm", "she's", "we're", "they're", "he's", "it's", "that's",
      "I'll", "she'll", "they'll",
    ],
  },
  'un-and-re-prefixes': {
    skillId: 'un-and-re-prefixes',
    words: [
      'unfair', 'unhappy', 'unkind', 'unsafe', 'unlock', 'unable', 'undo', 'unwrap', 'unpack',
      'redo', 'replay', 'reread', 'rewrite', 'retell', 'refill', 'rebuild', 'reuse', 'recycle',
    ],
  },
  'common-prefixes': {
    skillId: 'common-prefixes',
    words: [
      'disagree', 'dislike', 'discover', 'dishonest',
      'misread', 'misplace', 'misspell',
      'predict', 'preview',
      'interact', 'interfere', 'intermission', 'international',
      'submarine', 'subway', 'substitute',
      'superstar', 'supervise',
      'transport', 'transplant', 'transform', 'transfer',
      'antifreeze', 'antibiotic',
    ],
  },
  'greek-and-latin-roots': {
    skillId: 'greek-and-latin-roots',
    words: [
      'transport', 'portable', 'transportation',
      'predict', 'dictate', 'prediction',
      'inspect', 'spectator', 'inspection',
      'telephone', 'telescope', 'microscope', 'biography',
      'national', 'critical',
    ],
  },
  homophones: {
    skillId: 'homophones',
    words: [
      'to', 'too', 'two',
      'there', 'their', "they're",
      'your', "you're",
      'here', 'hear',
      'right', 'write',
      'brake', 'break',
      'son', 'sun',
      'one', 'won',
      'no', 'know',
      'new', 'knew',
      'see', 'sea',
      'week', 'weak',
      'meet', 'meat',
      'pair', 'pear',
      'hole', 'whole',
      'flower', 'flour',
      'blue', 'blew',
      'mail', 'male',
      'piece', 'peace',
    ],
  },
  'commonly-confused-words': {
    skillId: 'commonly-confused-words',
    words: [
      'affect', 'effect',
      'principal', 'principle',
      'advice', 'advise',
      'than', 'then',
      'accept', 'except',
      'lose', 'loose',
      'chose', 'choose',
      'quiet', 'quite',
      'weather', 'whether',
      'past', 'passed',
      'breath', 'breathe',
      'whose', "who's",
      'its', "it's",
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

/** Default Skill practice session size, matching the curated-collection default in docs/LEARNING_MODEL.md. */
const DEFAULT_SESSION_SIZE = 10;

/**
 * Selects a bounded, shuffled practice session from a Skill's bank. A bank
 * smaller than the session size simply yields the whole (shuffled) bank.
 */
export function selectSkillPracticeSession<T>(
  words: readonly T[],
  sessionSize = DEFAULT_SESSION_SIZE,
  rng: () => number = Math.random,
): T[] {
  return shuffleWords(words, rng).slice(0, sessionSize);
}

/**
 * Skill-page practice CTA copy, derived from the actual bank size so it
 * never claims a session size the bank can't back. A bank larger than the
 * session size gets the "random words, different mix" framing; a bank at
 * or under the session size practices every word every time, so the copy
 * says so plainly instead of claiming randomness that isn't there.
 */
export function skillPracticeDescription(
  wordCount: number,
  sessionSize = DEFAULT_SESSION_SIZE,
): string {
  if (wordCount > sessionSize) {
    return `Practice ${sessionSize} random words from the list above. Start another session anytime for a different mix.`;
  }
  const wordLabel = wordCount === 1 ? 'word' : 'words';
  return `Practice all ${wordCount} ${wordLabel} from the list above.`;
}
