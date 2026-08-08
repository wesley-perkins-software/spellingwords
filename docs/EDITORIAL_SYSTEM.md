# Editorial System

## Context

This is the publishing handbook for spelling-list detail pages. `docs/LIST_DETAIL_SPEC.md` defines what the page must contain and why; `docs/CONTENT_STANDARDS.md` defines what the library is willing to publish at all; this document defines *how* two of those required-in-spirit sections — readiness guidance and FAQ — get written consistently across a 135-list library (and growing) without becoming either bespoke one-offs or generated filler.

It exists because two sections (`readinessSignals`, `faq`) shipped in the content schema without ever being added to the authoring template (`docs/LIST_SPECIFICATIONS.md`), so only 1 of 135 lists ever had them written. That's not a content gap anyone chose — it's a process gap. This document closes it by giving every future author (human or AI-assisted, in any session) the same reusable structure to write against, so the decision of "what goes in the readiness checklist for a phonics list" only has to be made once, not 54 times independently.

---

## Standard section order

Every list-detail page (`src/pages/spelling-lists/[category]/[slug].astro`) follows this order, top to bottom:

1. **Hero** — title, description, grade/category, Practice CTA
2. **Is this the right list?** — readiness checklist
3. **Word list** — the complete list, always
4. **Why these words matter** — editorial explanation (the markdown body)
5. **Frequently asked questions**
6. **What's next** — learning progression (review / related / next lists)
7. **Source attribution** — only when a canonical source exists

This order is fixed. New sections are not inserted into the middle of this sequence without updating this document first.

---

## Section status

| Section | Status | Target |
|---|---|---|
| Hero | Always rendered | — |
| Is this the right list? | **Temporarily conditional** — renders only when `readinessSignals` is populated | 100% of lists, via the archetypes below |
| Word list | Always rendered | — |
| Why these words matter | Always rendered (markdown body is required) | — |
| FAQ | **Temporarily conditional** — renders only when `faq` is populated | 100% of lists, via the archetypes below |
| What's next | Renders when any of prerequisite/related/next lists exist (135/135 lists today) | Already effectively universal |
| Source attribution | **Permanently conditional by design** | Renders only for lists with a real `canonicalSource` — this is correct, not a gap |

"Temporarily conditional" is a state, not a permanent architecture decision. The goal is for readiness and FAQ to eventually render on every page, the same way the word list does — reached by writing the content, not by changing the code to fill the gap with something else.

---

## Writing principles and tone

Readiness signals and FAQ answers are subject to the same tone rules as every other piece of content on the site (`CONTENT_STANDARDS.md`'s Tone Guidelines apply in full): **encouraging, calm, teacher-like, friendly** — never sarcastic or childish. The test is the same one used everywhere else in the library: *would a calm, experienced elementary teacher say this to a class or a parent?* If it reads like marketing copy or a generated FAQ, it doesn't belong.

Specific to these two sections:

- **Readiness signals describe a learner, not a product feature.** Write them as things a parent or teacher can actually observe ("Is starting to sound out short, familiar words while reading"), not restatements of metadata ("This list is for Grade 1").
- **FAQ answers should answer the real question, not gesture at it.** A parent asking "should these be memorized?" wants a direct answer with a reason, not a deflection.
- **Every signal and every answer must be true of *this specific list*.** If a sentence could be pasted into any other list in the same archetype without changing a word, it hasn't been written yet — it's been templated. The archetypes below define the *shape* of the content, never its wording.
- **Keep it short.** Readiness signals are one line each. FAQ answers are 1–3 sentences. This isn't the place for the depth that belongs in the editorial explanation section.

---

## Content archetypes

Ten archetypes cover the site's content today, each with a target readiness-signal pattern and FAQ question pattern. These are targets, not rigid counts — roughly 3 signals and 4 questions, but an archetype can reasonably run fewer or more where the content genuinely calls for it. Consistency of *structure* is what matters, not hitting an exact number.

### 1. Beginning vocabulary
*Kindergarten concrete-object lists (first-words, animal-words, body-words, food-words, etc.)*
- Readiness: knows most letters and their sounds; can already say the words aloud; is starting to connect spoken words to print.
- FAQ: Are these really the first words a child learns to spell? Should they be memorized or practiced? What if these words are too easy? What comes after this list?

### 2. Grade-level vocabulary
*Everyday/describing/action-word lists not tied to a specific phonics or morphology rule*
- Readiness: is in or approaching the target grade; can already say/read these words even if not spell them; is comfortable with the prior difficulty tier's patterns.
- FAQ: Are these really the words this grade is expected to spell? What if these words are too easy or too hard? Should they be memorized or practiced through repetition? What comes after this list?

### 3. Phonics pattern pages
*Short vowels, consonant blends, digraphs, vowel teams, r-controlled vowels*
- Readiness: can already blend/segment simpler CVC words; is starting to meet this sound in books, even without being able to spell it; knows the individual letter sounds involved.
- FAQ: What is this sound/pattern and why is it taught at this stage? How is it different from [an adjacent, easily-confused pattern]? Should these be sounded out or memorized? What comes after mastering this pattern?

**Choosing the comparison for "How is it different from [X]" (archetype 3 only):** this question only earns its place when the comparison is real — not every phonics pattern has a genuinely confusable neighbor, and reaching for one that doesn't exist produces generic filler. Pick the comparison the way an author would, not by formula:
- *Short vowels, silent-e, vowel teams, r-controlled vowels* — an adjacent list already linked via `prerequisiteLists`/`nextLists` is usually the right comparison (e.g. `silent-e-long-a` against `short-a-words`); use that link when it exists rather than inventing a different one.
- *Digraphs* — compare against whichever pattern is actually confused with this one in early reading, and that isn't always a sibling digraph. Some sibling pairs are a real, documented mix-up (ch/sh); others (th/wh) aren't confused with each other at all, and a more honest comparison is digraph-vs-single-letter (why `th` isn't just `t`, why `wh` isn't just `w`).
- *Consonant blends (initial and final)* — a single "adjacent list" comparison is often forced across 29 blend files. Default to comparing the blend against its own two letters said separately (why `st` isn't `s` and `t` said slowly, one after the other) unless a specific sibling blend is a genuine, common mix-up (e.g. `sm`/`sn`) — in which case use that instead.

This is a decision rule, not a formula: it exists so every author reaches the same place independently, not so an answer can be assembled without judgment. The standing rule still applies — if none of the above produces something true and useful for a specific list, write the honest comparison for that list rather than forcing one of these defaults.

### 4. Spelling rule pages
*Silent-e, doubling the final consonant, changing y to i, dropping silent e before a suffix*
- Readiness: can already spell the base words the rule modifies; recognizes the "before" pattern while reading; is starting to write words where the rule applies.
- FAQ: What is this rule and why does English spelling work this way? When does the rule *not* apply (exceptions)? How is it different from [a similar/adjacent rule]? What comes after this list?

### 5. High-frequency-word pages
*Dolch tiers (pre-primer, primer, first–third grade, nouns)*
- Readiness: can recognize these words when reading, even without spelling them; has practiced the previous Dolch tier; is starting to write short sentences that need these high-frequency words.
- FAQ: Why do high-frequency words matter if they don't follow regular spelling rules? Should they be memorized rather than sounded out? What's the difference between this part and the next/previous part of the tier? What comes after this tier?

### 6. Prefix pages
*un-, re-, and other prefix lists*
- Readiness: can already spell the base word correctly; understands that adding a word part changes meaning; has met simpler prefixes already.
- FAQ: What does this prefix mean and how does it change the base word? Does the spelling of the base word change when you add it? How is it different from [a similar prefix]? What comes after this list?

### 7. Suffix pages
*-ful, -less, comparatives (-er/-est), other suffix lists*
- Readiness: can already spell the base word; understands the word-part concept; is comfortable with the spelling change the suffix causes (dropping e, doubling, y→i).
- FAQ: What does this suffix do to a word's meaning or part of speech? What spelling changes happen when you add it? How is it different from [a similar suffix]? What comes after this list?

### 8. Root-word pages
*Greek/Latin roots, root-word families*
- Readiness: is comfortable with grade-level academic vocabulary; has met simpler roots already; reads multisyllabic words in context.
- FAQ: What does this root mean, and which other words share it? Why do roots matter for spelling long words? How is it different from [a similar/confusable root]? What comes after this list?

### 9. Homophone and commonly confused word pages
*Word-pair/set lists where meaning, grammar, context, or visual similarity distinguishes spelling*
- Readiness: can already spell many words in the set individually; is starting to write sentences where mixing them up is a common mistake; can compare the words' meanings or sentence jobs when prompted.
- FAQ: What's the difference in meaning or use between these words? Is there a memory trick or sentence test to tell them apart? Why is this a common mistake? What comes after this list?

This archetype includes strict homophones (`to`/`too`/`two`) and broader commonly confused pairs (`affect`/`effect`, `advice`/`advise`, `desert`/`dessert`). The editorial task is the same in both cases: teach learners to choose the spelling that fits the sentence, not to sort pages by whether every pair has identical pronunciation.

### 10. Morphology pages
*Multisyllabic words, combined word-part study*
- Readiness: is comfortable with the individual word parts involved; can break multisyllabic words into syllables; has practiced simpler morphology lists.
- FAQ: How does breaking this word into parts help spell it? Why are these particular words grouped together? How does this build on [the prerequisite skill]? What comes after this list?

---

## What should never be auto-generated

This is a direct, permanent decision, not a temporary constraint: **readiness signals and FAQ content are never derived from structured metadata (grade, difficulty, word count, skill tags) or assembled algorithmically.** This follows directly from existing library policy —

> "No AI-generated filler pages. Lists exist to teach specific, deliberately chosen words — not to fill out a sitemap. If a list could have been produced by a script with no human judgment behind the word selection, it does not belong in the library." — `CONTENT_STANDARDS.md`

> "AI mass-production — lists, sentences, or descriptions generated in bulk without deliberate human editorial judgment behind every word and sentence choice." (listed under What We Do NOT Publish) — `CONTENT_STANDARDS.md`

> "Algorithmically generated recommendations with no editorial basis" must never appear in the related-lists section. — `LIST_DETAIL_SPEC.md`

The same standard applies to readiness and FAQ content. A section that could be filled in by a script reading `grade`/`difficulty`/`wordCount` doesn't teach anything a reader couldn't already see elsewhere on the page — it isn't a real section, it's decoration wearing a section's clothes. If a list doesn't have real readiness/FAQ content yet, the section stays hidden. That's the correct, honest state — not a bug to be papered over.

---

## What makes a page authoritative

The goal of this system is not template conformance — a page that hits every archetype question with a shrug isn't done. A page has genuinely earned topical authority when it:

- Answers the questions a teacher, parent, or student would actually search for or ask an AI assistant, not just the questions that are easy to answer.
- Explains the *why* behind the word or pattern selection, not just the *what* — a list of words with no reasoning behind it is a spreadsheet, not a resource.
- Correctly and specifically differentiates the list from adjacent, easily-confused lists (this is where the "how is this different from X" FAQ pattern earns its place — it's often the single most useful sentence on the page for a confused searcher).
- Cites real sources where they exist (Dolch, standard curricular sequences) rather than implying authority it doesn't have.
- Is internally consistent with the rest of the curriculum — correct prerequisites, correct next steps, no dead or mismatched links.
- Reads as though it was written by someone who understands how children actually learn to spell, not as filler wrapped around a word list.

---

## Batch QA checklist

Run this before calling any editorial batch (a set of lists worked through readiness/FAQ authoring together) finished. These are mechanical process checks, not writing advice — every one below was a real defect found during the first phonics batch, not a hypothetical risk, so treat this as required, not optional:

- **Duplicate readiness-signal check** — diff every `readinessSignals` bullet across the batch. An exact match across two files means the signal hasn't been individually written yet; it's been copied.
- **Duplicate FAQ check** — same check against every `faq` question and answer in the batch.
- **Resolve every `prerequisiteLists` ID** — confirm each ID is a real, **published** list, not one that used to exist.
- **Resolve every `nextLists` ID** — same check.
- **Resolve every `relatedLists` ID** — same check.
- **Verify no archived list is referenced** — `resolveListRefs` (`src/lib/content/spellingLists.ts`) silently drops references to archived or draft lists rather than erroring, so a stale reference doesn't break the build, it just quietly renders nothing. That silence is exactly why it goes unnoticed; check for it explicitly rather than trusting the build to catch it.
- **Verify readiness signals describe learner ability, not curriculum completion** — a signal that names another list by title, or says "has completed X" / "has practiced Y," is describing the site's data model, not the learner. Rewrite it as an observable behavior instead; the prerequisite/next relationship is already surfaced automatically by the template.
- **Verify FAQ owns "interesting facts" rather than repeating them in readiness** — if a pattern has one standout fact worth knowing (an exception, a voiced/unvoiced split, a common confusion), it should be explained once, in the FAQ. A readiness signal that foreshadows the same fact is answering the question before the reader has asked it.

---

## North star

Every list-detail page's goal is to be the best available educational resource on the web for that specific spelling topic — thorough enough that students, parents, teachers, search engines, and AI systems all come away understanding the topic better than a bare word list would teach them. Every section on the page earns its place by serving that goal. If a section, sentence, or field doesn't move a page closer to that bar, it doesn't belong — no matter how easy it would be to add.

---

## Future TODO

`shortAnswer` — a one-sentence, hand-authored summary — already exists on 100% of the 135 lists in the library, but is not currently rendered anywhere on the list-detail page (it's only used on the `spelling-collections` template). Evaluate incorporating it into the page architecture in a future pass now that readiness/FAQ rollout is complete. It's real, existing editorial content sitting unused — a low-risk lever once the higher-priority section rollout has a rhythm going.

## Morphology rollout guidance

The Morphology domain crosses several archetypes, so folder names are not enough to decide treatment. In this rollout, regular plurals are handled as suffix/word-formation content because plural `-s` and `-es` are endings added to nouns; contractions are handled as spelling-rule/word-formation content because apostrophe placement represents omitted letters; and silent-letter words are handled as spelling-pattern/rule content rather than phonics because the visible spelling does not map directly to pronounced sounds.

For combined morphology pages, especially prefix-plus-suffix and Greek/Latin word-part pages, FAQ should explain how word parts work together inside academic vocabulary rather than treating the page as only a prefix page or only a root page. Readiness should show that learners can identify meaningful chunks inside longer words, not merely that they are in the target grade.
