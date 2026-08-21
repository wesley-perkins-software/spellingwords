/**
 * Editorial sample-word selections for the cross-grade strand index pages
 * (/core-spelling, /high-frequency-words). Each entry is a curated, stable selection — never
 * "first N words" — chosen to give an accurate impression of the unit/set's content from the
 * title and these few words alone. Validated in strandIndexSamples.test.ts against the live
 * canonical word lists (Core) and FROZEN_HF_WORDS_CURRICULUM (HFW): every id must exist, belong
 * to the right strand, and every sample word must be a real member of that unit/set.
 *
 * Themed Spelling Practice intentionally has no equivalent here — topic titles ("Solar System
 * Words") are already self-descriptive; see docs/content/CANONICAL_GRADE_HUB_STANDARD.md §6.1's
 * 2026-08-21 refinement note for the asymmetric-content rationale.
 */

/** ~3 representative words per canonical Core Spelling unit, keyed by canonical id. */
export const CORE_UNIT_SAMPLE_WORDS: Readonly<Record<string, readonly string[]>> = {
  'kindergarten-first-words': ['bed', 'cat', 'sun'],
  'kindergarten-short-a-words': ['hat', 'can', 'map'],
  'kindergarten-short-i-words': ['pig', 'sit', 'win'],
  'kindergarten-short-o-words': ['dog', 'hot', 'box'],
  'kindergarten-short-u-words': ['bug', 'sun', 'cup'],
  'kindergarten-short-e-words': ['bed', 'hen', 'wet'],
  'kindergarten-mixed-vowel-review': ['jam', 'lid', 'hop'],
  'kindergarten-consonant-digraphs': ['ship', 'chat', 'bath'],
  'grade-1-cvc-short-vowels-c-k-rule': ['cat', 'kid', 'duck'],
  'grade-1-floss-rule': ['hill', 'puff', 'buzz'],
  'grade-1-consonant-digraphs-final-ck': ['ship', 'thin', 'sock'],
  'grade-1-beginning-consonant-blends': ['black', 'stop', 'train'],
  'grade-1-ending-consonant-blends': ['hand', 'milk', 'desk'],
  'grade-1-long-vowels-silent-e': ['cake', 'bike', 'rope'],
  'grade-1-open-syllables-final-y': ['me', 'go', 'fly'],
  'grade-1-long-a-long-o-vowel-teams': ['rain', 'play', 'boat'],
  'grade-1-inflectional-endings-s-es': ['cats', 'boxes', 'wishes'],
  'grade-1-inflectional-endings-ed-ing': ['jumped', 'jumping', 'played'],
  'grade-1-r-controlled-ar-or': ['car', 'corn', 'storm'],
  'grade-1-tch-dge-ending-rules': ['catch', 'edge', 'bridge'],
  'grade-2-long-e-ee-ea': ['tree', 'eat', 'beach'],
  'grade-2-long-i-ie-igh': ['pie', 'night', 'bright'],
  'vowel-teams-oi-oy': ['coin', 'boy', 'joy'],
  'vowel-teams-ou-ow': ['cow', 'found', 'sound'],
  'grade-2-oo-two-sounds': ['moon', 'book', 'foot'],
  'grade-2-au-aw-words': ['saw', 'lawn', 'because'],
  'grade-2-r-controlled-er-ir-ur': ['her', 'bird', 'turn'],
  'grade-2-soft-c-soft-g': ['city', 'giant', 'face'],
  'grade-2-two-syllable-words': ['rabbit', 'picnic', 'window'],
  'grade-2-final-stable-le': ['little', 'apple', 'turtle'],
  'grade-2-silent-letter-words': ['write', 'know', 'comb'],
  'grade-2-list-02': ['sunshine', 'backpack', 'rainbow'],
  'grade-2-contractions': ["can't", "don't", "isn't"],
  'grade-3-prefix-words': ['unhappy', 'redo', 'discover'],
  'grade-3-suffix-words': ['bigger', 'careful', 'happiness'],
  'grade-3-suffix-spelling-changes': ['making', 'stopped', 'happier'],
  'grade-3-possessives': ["dog's", "dogs'", "children's"],
  'grade-3-multisyllabic-words': ['umbrella', 'remember', 'information'],
  'grade-3-homophones': ['there', 'their', "they're"],
  'grade-3-root-word-families': ['act', 'action', 'actor'],
  'grade-4-multisyllabic-academic-words': ['communicate', 'organize', 'strategy'],
  'grade-4-advanced-prefixes': ['international', 'submarine', 'transform'],
  'grade-4-advanced-suffixes': ['breakable', 'dangerous', 'discussion'],
  'tier-1-roots-and-patterns': ['portable', 'dictate', 'spectator'],
  'grade-4-commonly-confused-words': ['affect', 'effect', 'principal'],
  'grade-4-derived-words': ['nation', 'national', 'popularity'],
  'grade-5-multisyllabic-academic-words': ['investigation', 'responsibility', 'environment'],
  'grade-5-prefix-suffix-words': ['international', 'substitute', 'courageous'],
  'grade-5-greek-latin-word-parts': ['photography', 'telescope', 'inspection'],
  'grade-5-commonly-confused-words': ['desert', 'dessert', 'advice'],
  'grade-5-spelling-changes-related-words': ['critic', 'critical', 'athletic'],
};

/** 4-6 representative words per canonical High-Frequency Words set, keyed by canonical id. */
export const HFW_SET_SAMPLE_WORDS: Readonly<Record<string, readonly string[]>> = {
  'kindergarten-high-frequency-words-set-1': ['a', 'and', 'the', 'can', 'is'],
  'kindergarten-high-frequency-words-set-2': ['he', 'you', 'go', 'to', 'not'],
  'kindergarten-high-frequency-words-set-3': ['she', 'was', 'here', 'that', 'see'],
  'kindergarten-high-frequency-words-set-4': ['come', 'look', 'with', 'two', 'play'],
  'grade-1-high-frequency-words-set-1': ['said', 'have', 'they', 'what', 'down'],
  'grade-1-high-frequency-words-set-2': ['when', 'who', 'over', 'ask', 'has'],
  'grade-1-high-frequency-words-set-3': ['why', 'make', 'about', 'home', 'very'],
  'grade-1-high-frequency-words-set-4': ['where', 'your', 'time', 'give', 'will'],
  'grade-1-high-frequency-words-set-5': ['were', 'want', 'some', 'day', 'find'],
  'grade-1-high-frequency-words-set-6': ['more', 'help', 'long', 'need', 'name'],
  'grade-1-high-frequency-words-set-7': ['place', 'thing', 'keep', 'room', 'part'],
  'grade-2-high-frequency-words-set-1': ['again', 'people', 'could', 'know', 'their'],
  'grade-2-high-frequency-words-set-2': ['because', 'school', 'book', 'which', 'little'],
  'grade-2-high-frequency-words-set-3': ['before', 'story', 'found', 'made', 'under'],
  'grade-2-high-frequency-words-set-4': ['answer', 'someone', 'large', 'learn', 'never'],
  'grade-2-high-frequency-words-set-5': ['together', 'young', 'high', 'other', 'came'],
  'grade-2-high-frequency-words-set-6': ['right', 'work', 'think', 'much', 'away'],
  'grade-2-high-frequency-words-set-7': ['night', 'water', 'house', 'read', 'year'],
  'grade-3-high-frequency-words-set-1': ['friend', 'family', 'different', 'question', 'through'],
  'grade-3-high-frequency-words-set-2': ['thought', 'brought', 'caught', 'already', 'toward'],
  'grade-3-high-frequency-words-set-3': ['practice', 'difficult', 'heard', 'become', 'especially'],
  'grade-3-high-frequency-words-set-4': ['world', 'believe', 'probably', 'usually', 'really'],
  'grade-3-high-frequency-words-set-5': ['remember', 'weather', 'study', 'certain', 'during'],
  'grade-4-high-frequency-words-set-1': ['important', 'example', 'understand', 'possible', 'straight'],
  'grade-4-high-frequency-words-set-2': ['whether', 'include', 'though', 'written', 'however'],
  'grade-5-high-frequency-words-set-1': ['government', 'business', 'language', 'beautiful', 'attention'],
  'grade-5-high-frequency-words-set-2': ['process', 'piece', 'provide', 'problem', 'experience'],
};
