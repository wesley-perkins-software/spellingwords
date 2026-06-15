# Spellingwords.app Content Standards

## Context
This document is the editorial constitution for the spellingwords.app library. `docs/CONTENT_ARCHITECTURE.md` defines *how* content is organized and `docs/LIBRARY_ROADMAP.md` defines *what gets built when*; this document defines *what we are willing to publish at all*. Every list, sentence, and category decision should be checked against the rules below before it enters the library. The purpose is to keep the library small, trustworthy, and durable — and to give anyone making future content decisions a fixed reference point so quality does not erode as the library grows.

---

## Purpose

Spellingwords.app exists to provide carefully curated spelling practice for children, parents, teachers, and homeschoolers. It is not a content farm, and growth in page count is never itself a goal.

Every editorial decision should be weighed against these priorities, in order:

- **Educational usefulness over search traffic.** A list earns its place because it helps a learner, not because it might rank for a keyword.
- **Quality over quantity.** A small library of excellent lists is worth more than a large library of mediocre ones. Thin or filler lists damage trust in every list around them.
- **Timeless lists over trendy content.** Lists should still be useful, accurate, and relevant in ten years. Avoid anything tied to a moment, a fad, or a calendar date.
- **No AI-generated filler pages.** Lists exist to teach specific, deliberately chosen words — not to fill out a sitemap. If a list could have been produced by a script with no human judgment behind the word selection, it does not belong in the library.
- **Every list should be independently valuable.** A learner or teacher who lands on a single list page, with no other context, should walk away with something genuinely useful. No list should exist only to support another list or pad out a category.

---

## Audience

The library is built for, in order of priority:

1. **Children (ages 6–10)** — the people actually doing the spelling practice.
2. **Parents** — who choose lists for their children and want to trust that the words and sentences are appropriate.
3. **Teachers** — who need lists that map cleanly onto the skills and vocabulary they are already teaching.
4. **Homeschool families** — who rely on the library to substitute for curriculum materials a classroom would otherwise provide.

When these groups' interests conflict, **children's comprehension comes first.** A word, sentence, or list structure that is technically correct but confusing to a 6–10 year old should be simplified or reconsidered, even if an adult reader would find it unremarkable.

---

## Vocabulary Rules

**Allowed:**

- Common elementary vocabulary — words a child in the target grade range would plausibly already be using or hearing.
- Curriculum words — words that map onto what schools at that grade level actually teach.
- Canonical word sources, such as:
  - Dolch sight words
  - phonics patterns
  - curriculum vocabulary
- Words children are likely to encounter in books or school — i.e., words with a real reading-life payoff, not just a spelling-list payoff.

**Avoid:**

- Obscure dictionary words chosen for novelty or difficulty rather than usefulness.
- Archaic words that a child will rarely or never encounter in modern reading.
- Slang, which ages quickly and undermines the "timeless" goal.
- Proper nouns and brand names, which are not general vocabulary and date a list almost immediately. **Exception:** closed educational proper-noun sets — specifically, days of the week and months of the year — are allowed because they are canonical curriculum content taught at every elementary grade level. Arbitrary proper nouns (place names, people, brands, country names) remain excluded.
- Words chosen only because they have search volume. If a word's only justification is that people search for it, it does not belong on a list.

---

## Duplicate Rules

- **Adjacent lists should avoid duplicates whenever possible.** Lists that sit next to each other in the taxonomy (e.g., consecutive grade levels, sibling phonics patterns) should each contribute distinct words rather than reshuffling the same set.
- **If a duplicate is pedagogically necessary, it must be explained.** Some words legitimately belong in more than one list (for example, a high-frequency sight word that also fits a phonics pattern). When this happens, the list specification should state plainly *why* the overlap exists, so it reads as a deliberate teaching decision rather than an oversight.
- **Do not create multiple lists containing the same words merely to increase page count.** A list that exists primarily to duplicate or lightly remix an existing list provides no educational value and actively works against the "every list should be independently valuable" principle above.

---

## Sentence Guidelines

Example sentences exist to show a word in natural use — not to demonstrate vocabulary range or impress an adult reader. They should:

- **Be age appropriate** — built from words and ideas a 6–10 year old already understands.
- **Be concrete** — describe something a child can picture (an action, an object, a simple scene), not an abstraction.
- **Stay short** — one clear idea per sentence.
- **Prefer present tense** — present tense reads more naturally to early readers and keeps sentences simple.
- **Avoid advanced vocabulary inside the sentence itself** — a sentence written to teach one word should not introduce three more words the learner doesn't know.

**Good:**

> The kite flew high.

**Avoid:**

> The expedition relied upon the navigator.

---

### Pronunciation and Heteronyms

The app reads words and sentences aloud using the browser's native text-to-speech (TTS). The TTS pronounces words in isolation without semantic context, so it may produce a different pronunciation of a heteronym than a sentence implies.

**Rule: a true heteronym is added as a spelling-only entry with no example sentence.**

A heteronym changes pronunciation with meaning (`live`, `read`, `wind`, `tear`, `lead`, `row`, `close`, `bow`, `sow`, `wound`, `minute`). For these words there is no single sentence we can trust: when "live" is spoken in isolation, browser TTS defaults to /laɪv/ ("live music"), but a sentence like "They live in a small white house" implies /lɪv/ — a contradictory pair. Rather than gamble on a sentence, the word is added to the sentence bank as a spelling-only entry that carries `sentenceOmissionReason: 'heteronym'` and **no** `exampleSentence`. TTS speaks the isolated word, "Listen Again" works, and the "Use in a Sentence" button stays hidden (see `docs/SENTENCE_BANK.md`).

For a **non-heteronym** word whose single TTS pronunciation simply needs a matching sentence, the example sentence must use that same pronunciation:

✓ "We heard live music at the school fair." (only valid if "live" were not a heteronym)  
✗ Pairing two senses of a heteronym in word-prompt vs sentence — never do this; omit the sentence instead.

**Do not** invent a sentence for a heteronym to "make it fit."  
**Do not** use IPA, SSML, or phonetic spelling tricks to influence TTS output.  
**Do not** use AI-generated pronunciation guidance.  
**Do not** alter the sentence to match a *different* TTS voice — target the default voice selected by `src/modules/speech/voiceSelection.ts` (currently prioritizes Google US English).

---

## Tone Guidelines

The voice across all content — list descriptions, instructions, sentences, and any surrounding copy — should feel:

- Encouraging
- Calm
- Teacher-like
- Friendly

The voice should never be:

- Sarcastic
- Childish

A useful test: would a calm, experienced elementary teacher write or say this to a class? If the answer is no — if it sounds like marketing copy, internet slang, or exaggerated "kid-friendly" baby talk — it does not belong.

---

## What We Do NOT Publish

To keep the library trustworthy and durable, the following are explicitly rejected, regardless of how easy they would be to produce or how well they might perform in search:

- **Seasonal filler** — content tied to holidays, seasons, or calendar events that exists mainly to capture short-lived search interest.
- **Keyword-stuffed pages** — pages or lists shaped around search phrases rather than around what a learner actually needs to practice.
- **"Word of the day" gimmicks** — novelty mechanics that prioritize engagement loops over genuine, structured learning.
- **AI mass-production** — lists, sentences, or descriptions generated in bulk without deliberate human editorial judgment behind every word and sentence choice.
- **Duplicate content** — lists or pages that exist mainly to multiply surface area rather than to teach something distinct.
- **Gamified content disguised as education** — streaks, points, badges, or competitive mechanics dressed up as if they were the educational substance, when the underlying content is thin.

If a proposed list, page, or feature would only exist to satisfy one of the items above, it should not be built — no matter how small the effort or how plausible the short-term upside.
