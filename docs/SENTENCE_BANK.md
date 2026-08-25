# Sentence Bank

## Purpose

The sentence bank is a static, editorially controlled dataset that pairs common spelling words with age-appropriate example sentences. It exists to improve the custom-list play experience: when a user pastes their own word list, any word found in the bank will show a "Use in a Sentence" button — exactly the same as curated lists do.

There is no backend, no database, and no AI involved. Every sentence is hand-written and reviewed.

## Why We Start Small

A large, hastily assembled sentence bank would undermine the product's editorial quality. We expand deliberately, using the same criteria each time. It is far better to have accurate, well-suited sentences than thousands of adequate ones. The bank currently holds **861 entries** across three grade bands.

## Where the Data Lives

The entries are split by grade band so each file stays readable and is independently sortable. `data.ts` is a thin re-export shim, so the public import path (`@/lib/sentenceBank`) is unchanged.

```
src/lib/sentenceBank/data.ts            — re-export shim: export { SENTENCE_BANK } from './data/index'
src/lib/sentenceBank/data/index.ts      — combines the three grade-band arrays into SENTENCE_BANK
src/lib/sentenceBank/data/k1.ts         — K1_ENTRIES (gradeBand 'K-1'), sorted alphabetically by word
src/lib/sentenceBank/data/grade23.ts    — GRADE23_ENTRIES (gradeBand '2-3'), sorted alphabetically by word
src/lib/sentenceBank/data/grade45.ts    — GRADE45_ENTRIES (gradeBand '4-5'), sorted alphabetically by word
src/lib/sentenceBank/lookup.ts          — getSentenceBankEntry() / getSentenceForWord()
src/lib/sentenceBank/types.ts           — SentenceBankEntry, SentenceOmissionReason, ReviewWordEntry, ReviewStatus
src/lib/sentenceBank/reviewWords.ts     — REVIEW_WORDS: skipped / problem words with status + rationale
src/lib/sentenceBank/audit.test.ts      — automated data-integrity checks
```

## Automated Audit Rules

`audit.test.ts` enforces the following checks against `SENTENCE_BANK` (run with `npm test`):

1. **No duplicate normalized words** — no two entries normalize to the same word.
2. **Non-empty word** — every entry has a non-empty `word`.
3. **Exactly one of sentence or omission** — every entry has either a non-empty `exampleSentence` **or** a valid `sentenceOmissionReason` (e.g. `heteronym`), never both and never neither.
4. **`sourceType` is `curated`** — every entry is marked as curated content.
5. **Valid `gradeBand`** — every entry's `gradeBand` is one of `K-1`, `2-3`, `4-5`.
6. **Sentence contains the target word** — when an `exampleSentence` is present, it actually contains the `word` (token match, contraction- and allowlist-aware). Skipped for spelling-only entries.
7. **Sentence length 5–25 words** — every present sentence falls within the allowed length window. Skipped for spelling-only entries.
8. **No mojibake** — no `â€œ`/`â€™`-style encoding corruption in any field.
9. **K-1 entries sorted alphabetically** (case-insensitive) by word.
10. **Grade 2-3 and Grade 4-5 entries sorted alphabetically** (case-insensitive) by word.

## Heteronym Policy

**Heteronyms are first-class words in the bank, but they carry no example sentence.** A heteronym changes pronunciation with meaning (`live`, `read`, `wind`, `tear`, `lead`, `row`, `close`, `bow`, `sow`, `wound`, `minute`). Because a word is spoken aloud in isolation, the bank cannot guarantee browser TTS will produce the pronunciation a given sentence implies — e.g. "I live on Maple Street" vs "We watched the live show." Rather than risk a contradictory "Use in a Sentence" experience, a heteronym entry omits the sentence entirely:

```ts
{ word: 'minute', sentenceOmissionReason: 'heteronym', gradeBand: '2-3', sourceType: 'curated' }
```

These are **spelling-only entries**. The word exists in the word universe and may appear in curated lists; browser TTS speaks the isolated word and "Listen Again" works normally; but `getSentenceForWord()` returns `undefined`, so the "Use in a Sentence" button stays hidden — exactly matching how a custom word with no sentence behaves. We do **not** invent sentences, use IPA/SSML, or apply any pronunciation hack.

## Proper Noun Policy

The `word` field distinguishes three categories:

- **True heteronyms** — included as spelling-only entries (no sentence); see Heteronym Policy above.
- **Arbitrary proper nouns** — excluded. Names, brands, country names, city names, and other one-off proper nouns are not general curriculum vocabulary.
- **Closed educational proper-noun sets** — allowed. Days of the week (`Monday`–`Sunday`) and months of the year are canonical K–5 curriculum content, universally taught, and carry no dating or cultural specificity risk. They may appear as `word` entries in the bank. Other closed sets (named holidays, seasons) may be considered on a case-by-case basis.

## Skipped Word Review Process

Words that are deliberately not in the bank — arbitrary proper nouns, honorifics, irregular-but-safe candidates — are tracked in `src/lib/sentenceBank/reviewWords.ts` as `REVIEW_WORDS`. (Heteronyms are no longer listed here; they now live in the bank as spelling-only entries.) Each `ReviewWordEntry` records:

- `word` — the word under consideration.
- `reason` — why it is problematic (e.g. the specific heteronym pronunciations).
- `recommendation` — the editorial call (skip, remove, or add with a careful sentence).
- `status` — one of `avoid`, `needs-review`, or `safe-to-add`.
- `notes` — optional history (e.g. "was briefly in the bank; removed in audit pass") or a suggested example sentence.

This gives the next editor a documented trail so the same words are not repeatedly re-evaluated or accidentally re-added. Excluded honorifics (`Mr.`, `Mrs.`, `Ms.`) and arbitrary proper nouns (`America`) live here with `status: 'avoid'`.

## Sentence Quality Checklist

Before adding an entry, confirm every point:

1. The sentence is 8–15 words long (hard limit 5–25, enforced by the audit).
2. The sentence contains the exact target word (not just an inflection).
3. The word is used naturally in context, never as a definition.
4. The meaning is immediately understandable at the listed grade band.
5. The subject matter is warm, positive, neutral, or gently imaginative — no fear, violence, or stress.
6. There is no cultural specificity that would confuse a non-US child.
7. The word is not arbitrary proper noun (check `reviewWords.ts`). Closed educational sets such as days of the week are allowed. Heteronyms are added as spelling-only entries instead (no sentence — see Heteronym Policy).
8. The entry is inserted in correct alphabetical position within its grade-band file, with the right `gradeBand` and `sourceType: 'curated'`.

## Editorial Standards

Each sentence must:

- Be 8–15 words long
- Use the word naturally in context (not as a definition)
- Be immediately understandable to a child at the listed grade band
- Avoid cultural specificity that would confuse non-US readers
- Use positive, neutral, or gently imaginative subject matter
- Be grammatically correct and punctuated with a full stop

Each sentence must not:

- Repeat the word being tested in the same sentence
- Feel like a dictionary example ("The word 'happy' means feeling joy")
- Contain violence, fear, or stressful themes
- Assume knowledge beyond the grade band
- Be generated by AI or copied from an external source

## Words That Belong

Good candidates:

- Common Dolch / high-frequency words
- Common K–5 grade-level spelling words
- Words very likely to appear on a weekly homework list
- Words with a single clear, unambiguous pronunciation

## Words That Do Not Belong

Do not add:

- A **sentence** for a heteronym (live, read, wind, tear, lead, row, close, bow, sow, wound, minute). The word itself belongs in the bank, but as a spelling-only entry with `sentenceOmissionReason: 'heteronym'` — never with an invented sentence.
- Arbitrary proper nouns (names, brands, places, country names) — not general curriculum vocabulary. Exception: closed educational sets such as days of the week and months of the year are allowed.
- Obscure or advanced vocabulary unlikely to appear on a homework list
- Words where the "right" sentence depends on which definition is being tested
- Words already covered exhaustively in curated lists with their own sentences

## Heteronym Warning

Never write an example sentence for a heteronym. Pairing one risks the wrong pronunciation being spoken: "I live on Maple Street" and "We watched the live concert" are both valid but pronounced differently, and TTS cannot tell which the isolated word should match. Add the word as a **spelling-only entry** (`sentenceOmissionReason: 'heteronym'`, no `exampleSentence`) so it exists in the universe without a contradictory sentence.

## Expansion Process

1. Identify a real gap — words that commonly appear in homework lists but have no coverage.
2. Draft the sentence.
3. Check it against every editorial standard above.
4. Assign the correct `gradeBand` (`K-1`, `2-3`, or `4-5`).
5. Add it to `data.ts` and run `npm test` to confirm nothing breaks.
6. Submit for review like any other content change.

Do not batch-add dozens of words at once. Small, reviewed additions maintain quality.

## Lookup Behavior

- Lookup is case-insensitive and whitespace-normalized.
- `Friend`, `FRIEND`, and `  friend  ` all match `friend`.
- Complex inflections (friends, running, happier) are **not** matched. Exact normalized stem only.
- If a word is not in the bank, no sentence is shown. No disabled button, no placeholder.

## Relationship to Curated Lists

Curated list words carry their own `exampleSentence` in the content collection frontmatter. Those sentences always take precedence. The sentence bank only enriches custom user-entered words and never overrides curated list content.

## This Is Curriculum Content, Not SEO Filler

Every sentence in this bank will be spoken aloud to a child. Quality matters more than quantity. Do not add entries to "cover" a word — add them only when you have a genuinely good sentence for it.
