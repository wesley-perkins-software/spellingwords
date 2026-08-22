import type { CuratedSpellingSkillId } from './spellingSkills';

/**
 * Curated example words for the Skills Hub (`/skills`). Each entry is a
 * hand-picked 3 (occasionally 4) word subset of that Skill's own canonical
 * `words:` frontmatter — never invented, never the mechanical first N — kept
 * short so a Skill tile stays scannable rather than becoming a full word-list
 * demonstration (that stays exclusive to the Skill page's WordTileGrid).
 * `skillIndexExamples.test.ts` proves every word here is a genuine member of
 * that Skill's own canonical word list.
 *
 * Bias toward 3 words; a 4th is included only where it demonstrates a
 * distinct sub-pattern the title itself names (e.g. CK, Double Letters, and
 * TCH/DGE Word Endings covers four related endings, so three words alone
 * would silently drop one).
 */
export const SKILL_INDEX_EXAMPLE_WORDS: Record<CuratedSpellingSkillId, readonly string[]> = {
  'short-a-words': ['cat', 'pan', 'ran'],
  'short-e-words': ['bed', 'hen', 'leg'],
  'short-i-words': ['pig', 'sit', 'fish'],
  'short-o-words': ['hot', 'dog', 'rock'],
  'short-u-words': ['cup', 'bug', 'drum'],

  'digraph-ch-words': ['chin', 'chop', 'lunch'],
  'digraph-sh-words': ['ship', 'wish', 'brush'],
  'digraph-th-words': ['that', 'think', 'bath'],
  'digraph-wh-words': ['what', 'when', 'where'],

  'beginning-blends': ['clap', 'grab', 'stop'],
  'ending-blends': ['hand', 'jump', 'desk'],

  'ck-tch-dge-word-endings': ['duck', 'bell', 'catch', 'badge'],
  'silent-letters': ['write', 'know', 'thumb'],
  'soft-c-soft-g': ['city', 'giant', 'page'],

  'silent-e-long-a': ['cake', 'gate', 'plate'],
  'silent-e-long-i': ['bike', 'time', 'smile'],
  'silent-e-long-o': ['home', 'hope', 'stone'],
  'silent-e-long-u': ['cube', 'rule', 'flute'],

  'vowel-teams-ai-ay': ['rain', 'day', 'train'],
  'vowel-teams-ee-ea': ['tree', 'beach', 'feet'],
  'vowel-teams-oa-ow': ['boat', 'snow', 'coat'],
  'oi-and-oy-words': ['oil', 'coin', 'boy'],
  'ou-and-ow-words': ['out', 'round', 'cow'],
  'ie-and-igh-words': ['pie', 'night', 'high'],
  'oo-words': ['moon', 'food', 'book'],
  'au-and-aw-words': ['saw', 'draw', 'haul'],

  'r-controlled-ar': ['car', 'farm', 'yard'],
  'r-controlled-or': ['corn', 'short', 'morning'],
  'r-controlled-er-ir-ur': ['bird', 'turn', 'her'],

  'multisyllabic-words': ['rabbit', 'basket', 'winter'],

  plurals: ['cats', 'buses', 'boxes'],
  'ed-and-ing': ['jumped', 'jumping', 'played'],
  'common-suffixes': ['helpful', 'kindness', 'faster'],
  'suffix-spelling-changes': ['running', 'carried', 'hopeful'],
  'compound-words': ['sunshine', 'backpack', 'snowman'],
  contractions: ["can't", "don't", "I'm"],

  'un-and-re-prefixes': ['unhappy', 'unlock', 'redo'],
  'common-prefixes': ['predict', 'misread', 'submarine'],

  'greek-and-latin-roots': ['transport', 'inspect', 'telephone'],

  homophones: ['to', 'too', 'two'],
  'commonly-confused-words': ['affect', 'effect', 'principal'],
};

/**
 * Hand-authored clarifying phrases for the small number of Skill entries
 * where the title and example words together still leave real ambiguity.
 * Deliberately not derived from — or a restatement of — the canonical
 * `description` field (that stays the Skill page's own instructional voice);
 * this is a short Hub-only wayfinding phrase, shown only where the tile
 * would otherwise be genuinely unclear. Most Skills need no entry here: a
 * clear title plus its example words is the default, sufficient tile.
 */
export const SKILL_INDEX_CLARIFIERS: Partial<Record<CuratedSpellingSkillId, string>> = {
  'suffix-spelling-changes': 'When to double a consonant, drop a silent e, or change y to i.',
};
