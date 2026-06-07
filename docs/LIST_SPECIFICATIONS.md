# Spellingwords.app List Specifications

## Context
`docs/CONTENT_STANDARDS.md` defines what kind of content the library publishes and what it refuses to publish. This document is one level more concrete: it defines *how an individual list is designed before a single word is chosen.* Every list — whether it ships next month or three years from now — should be planned against the template below, and that plan should be reviewed against `CONTENT_STANDARDS.md` before any words are written down. The goal is that anyone proposing or reviewing a new list can evaluate it against a fixed, written specification rather than relying on memory or instinct.

The specifications in this document are **plans, not content.** They describe the boundaries a list must respect and the reasoning behind those boundaries. No words, sentences, or list data are produced here — that is a separate, later step, done one list at a time.

---

## Specification Template

Every list specification should be written using the fields below, in this order. A specification is not complete until every field has a real, specific answer — "TBD" or a placeholder is not acceptable for a list that is ready to be authored.

## List Title
The full display title of the list, as it would appear to a reader.

## Slug
The public, URL-facing identifier for the list (see `docs/CONTENT_ARCHITECTURE.md` for the id/slug split). Should be descriptive, human-readable, and stable enough to stay meaningful even if the title is later tuned.

## Category
Which top-level taxonomy family the list belongs to (e.g., sight words, phonics patterns, grade-level lists), per the taxonomy defined in `docs/CONTENT_ARCHITECTURE.md`.

## Target Grade
The school grade(s) this list is written for. Should be specific enough to guide word and sentence choices (e.g., "1st grade" rather than "early elementary").

## Target Age
The approximate age range of the learners this list serves. Used alongside Target Grade because homeschool and remedial/advanced learners do not always map cleanly to a single grade.

## Target Word Count Range
The expected number of words on the list, expressed as a range rather than a fixed number. Different list families naturally call for different sizes (a sight-word set drawn from a fixed canonical source has a different natural size than a phonics-pattern list assembled by hand), and a range keeps the system flexible instead of forcing artificial uniformity.

## Skill Focus
The specific spelling or reading skill this list is built to reinforce (e.g., a phonics pattern, a category of sight words, a grammatical structure). A list should have one clear skill focus, not several competing ones.

## Source Type
One of:
- **curated** — words selected by deliberate human judgment for this specific list, without a single external canonical source.
- **canonical** — words drawn from a recognized, externally-defined source list (e.g., a Dolch word list).
- **curriculum** — words chosen to align with what a given grade level is generally taught in school, without a single canonical source list to draw from directly.

## Inclusion Rules
The specific, concrete rules that determine whether a candidate word belongs on this list. Should be precise enough that two different reviewers would make the same include/exclude decision for a given word.

## Exclusion Rules
The specific, concrete rules that rule a candidate word out, even if it would otherwise seem to fit. Often the more important half of the specification — exclusion rules are what keep a list focused and prevent drift.

## Duplicate Constraints
Which neighboring or related lists this list must avoid overlapping with, and why. If some overlap with a specific list is acceptable or necessary, that should be stated explicitly here, consistent with the Duplicate Rules in `docs/CONTENT_STANDARDS.md`.

## Sentence Style
Any list-specific notes on how example sentences should be written, on top of the general Sentence Guidelines in `docs/CONTENT_STANDARDS.md` (for example, a list built around a phonics pattern may want sentences that naturally showcase that pattern without forcing it).

## Difficulty Expectations
A description of the expected challenge level for the target learner — not just "easy" or "hard," but what kind of difficulty the list is designed to present (e.g., word length, spelling-pattern complexity, conceptual familiarity of the words themselves).

## Related Lists
Which other lists in the library this one connects to — lists a learner might naturally move to next, lists that cover an adjacent skill, or lists that this one was deliberately designed alongside.

---

# Initial Specifications

The following ten specifications define the first lists planned for the library. They are specifications only — no word lists have been generated, and no content pages exist yet. Each is ready to guide a future, separate authoring pass.

---

## 1. Dolch First Grade Sight Words

## Slug
`dolch-first-grade-sight-words`

## Category
Sight words

## Target Grade
1st grade

## Target Age
6–7

## Target Word Count Range
38–46 words (the canonical Dolch first-grade tier)

## Skill Focus
Recognizing and spelling high-frequency sight words that a first grader is expected to read on sight rather than sound out.

## Source Type
canonical

## Inclusion Rules
Only words that appear in the canonical Dolch first-grade word list. Every word on the list must come directly from that source — no substitutions, additions, or "similar" words.

## Exclusion Rules
No words outside the canonical Dolch first-grade tier, even if they seem like a natural fit. No words already covered on the Dolch Pre-Primer or Primer tiers (those belong on their own lists, not here).

## Duplicate Constraints
Must not overlap with the Dolch Pre-Primer, Primer, Second Grade, or Third Grade sight word lists, or with the Dolch Noun Words list — each Dolch tier is a distinct, non-overlapping set by definition of the canonical source. If the canonical source itself contains a word that also appears on the Noun list, that overlap should be noted explicitly rather than silently resolved.

## Sentence Style
Very short, concrete sentences using only words a first grader would already recognize on sight — ideally drawing on other Dolch Pre-Primer/Primer/First Grade words wherever natural, so the sentence reinforces sight-word recognition rather than introducing new vocabulary.

## Difficulty Expectations
Low conceptual difficulty — these are words first graders are expected to already be encountering constantly in early readers. The "difficulty" is entirely about consistent recognition and correct spelling of short, often irregular words, not about word meaning.

## Related Lists
Dolch Second Grade Sight Words (natural next step), Dolch Noun Words (a thematically related canonical Dolch set), and any future Dolch Pre-Primer/Primer lists that would sit before this one in sequence.

---

## 2. Dolch Second Grade Sight Words

## Slug
`dolch-second-grade-sight-words`

## Category
Sight words

## Target Grade
2nd grade

## Target Age
7–8

## Target Word Count Range
44–52 words (the canonical Dolch second-grade tier)

## Skill Focus
Recognizing and spelling the second tier of high-frequency Dolch sight words, building directly on first-grade sight-word fluency.

## Source Type
canonical

## Inclusion Rules
Only words that appear in the canonical Dolch second-grade word list, taken directly from that source.

## Exclusion Rules
No words from the first-grade, third-grade, or noun Dolch tiers. No "helpful" additions outside the canonical set, even if they seem like words a second grader should know.

## Duplicate Constraints
Must not overlap with Dolch First Grade, Third Grade, or Noun Words lists. As with the first-grade list, any overlap that exists in the canonical source itself (rather than being introduced by this site) should be called out explicitly rather than quietly removed.

## Sentence Style
Slightly more varied sentence structure than the first-grade list is acceptable, but sentences should still be short, concrete, and built primarily from words a second grader would already recognize on sight (including words from the first-grade tier).

## Difficulty Expectations
Moderate step up from the first-grade tier — words are still high frequency, but a few are longer or less phonetically obvious, which is exactly why they are taught at this stage rather than earlier.

## Related Lists
Dolch First Grade Sight Words (prerequisite), Dolch Third Grade Sight Words (natural next step), Dolch Noun Words, and 2nd Grade Contractions / 2nd Grade Long Vowel Words (other lists aimed at the same grade band).

---

## 3. Dolch Third Grade Sight Words

## Slug
`dolch-third-grade-sight-words`

## Category
Sight words

## Target Grade
3rd grade

## Target Age
8–9

## Target Word Count Range
38–46 words (the canonical Dolch third-grade tier)

## Skill Focus
Completing the core Dolch sight-word progression with the words a third grader is expected to recognize and spell automatically.

## Source Type
canonical

## Inclusion Rules
Only words that appear in the canonical Dolch third-grade word list, taken directly from that source.

## Exclusion Rules
No words from the first-grade, second-grade, or noun Dolch tiers, and no additions beyond the canonical set.

## Duplicate Constraints
Must not overlap with Dolch First Grade, Second Grade, or Noun Words lists, for the same reasons described in those specifications above.

## Sentence Style
Sentences may be marginally longer than the first- and second-grade lists, but must remain short, concrete, present-tense, and built from vocabulary a third grader would already be comfortable with — this is the top of the Dolch progression, not a bridge into harder material.

## Difficulty Expectations
The most demanding tier of the core Dolch progression — words are still high frequency, but several are longer or carry less obvious spelling patterns, reflecting that this tier is typically taught last.

## Related Lists
Dolch Second Grade Sight Words (prerequisite), Dolch Noun Words (companion canonical Dolch set), and any future grade-level or phonics lists aimed at a 3rd-grade reader who has completed the Dolch progression.

---

## 4. Dolch Noun Words

## Slug
`dolch-noun-words`

## Category
Sight words

## Target Grade
1st–3rd grade (companion list spanning the Dolch progression)

## Target Age
6–9

## Target Word Count Range
90–100 words (the canonical Dolch noun list)

## Skill Focus
Recognizing and spelling the canonical set of common nouns that the Dolch system treats as a distinct companion list to its core sight-word tiers.

## Source Type
canonical

## Inclusion Rules
Only words that appear in the canonical Dolch noun list, taken directly from that source.

## Exclusion Rules
No nouns outside the canonical Dolch noun list, regardless of how common or useful they might seem. This list exists to faithfully represent that specific canonical set, not to be a general "common nouns" list.

## Duplicate Constraints
This list is, by the nature of the canonical Dolch source, a distinct companion to the Dolch First/Second/Third Grade lists rather than a graded tier among them — overlap with those lists should not be engineered, but if the canonical source itself contains shared words, that should be documented rather than silently changed. This list should not be split or partially duplicated into smaller "noun" lists elsewhere in the library.

## Sentence Style
Concrete, simple sentences that put each noun in a familiar, everyday context a young child would recognize (a person, animal, place, or object they already know), reinforcing meaning alongside spelling.

## Difficulty Expectations
Generally low-to-moderate — most entries are common, concrete nouns. The challenge for younger learners is volume and consistency rather than unfamiliar concepts.

## Related Lists
Dolch First, Second, and Third Grade Sight Words (the core progression this list complements), and any future vocabulary-themed lists that might logically extend from concrete nouns.

---

## 5. Silent E: Long I Words

## Slug
`silent-e-long-i-words`

## Category
Phonics patterns

## Target Grade
1st–2nd grade

## Target Age
6–8

## Target Word Count Range
15–25 words

## Skill Focus
Recognizing the "silent e" (magic e) pattern as it produces a long *I* sound (e.g., the *i_e* pattern).

## Source Type
curated

## Inclusion Rules
Words that follow a clear, regular silent-e pattern in which the silent final *e* causes the preceding *i* to be pronounced as a long *I*. Words should be common enough that a 1st–2nd grader is likely to encounter them in everyday reading.

## Exclusion Rules
No words where the silent-e pattern is present but does not produce a long *I* sound (these belong to a different pattern entirely, not this list). No irregular or exception words that would confuse the pattern being taught. No obscure words included only to round out the count.

## Duplicate Constraints
Must not overlap with Silent E: Long O Words — the two lists are deliberately split by vowel sound so each stays focused on one pattern. Some overlap with general grade-level or sight-word lists is acceptable if a word is genuinely common, but should not be the basis for word selection here.

## Sentence Style
Sentences should let the long-*I* silent-e pattern appear naturally in context (ideally featuring the target word clearly), without contorting the sentence just to force the pattern to stand out.

## Difficulty Expectations
Low-to-moderate — the words themselves should be familiar; the challenge is purely in recognizing and applying the silent-e rule consistently, not in unfamiliar vocabulary.

## Related Lists
Silent E: Long O Words (sibling pattern list), Vowel Teams: ai and ay / Vowel Teams: ee and ea (other phonics-pattern lists at a similar level), and 2nd Grade Long Vowel Words (broader long-vowel companion list).

---

## 6. Silent E: Long O Words

## Slug
`silent-e-long-o-words`

## Category
Phonics patterns

## Target Grade
1st–2nd grade

## Target Age
6–8

## Target Word Count Range
15–25 words

## Skill Focus
Recognizing the "silent e" (magic e) pattern as it produces a long *O* sound (e.g., the *o_e* pattern).

## Source Type
curated

## Inclusion Rules
Words that follow a clear, regular silent-e pattern in which the silent final *e* causes the preceding *o* to be pronounced as a long *O*. Words should be common enough that a 1st–2nd grader is likely to encounter them in everyday reading.

## Exclusion Rules
No words where the silent-e pattern is present but does not produce a long *O* sound. No irregular or exception words that would confuse the pattern being taught. No obscure words included only to round out the count.

## Duplicate Constraints
Must not overlap with Silent E: Long I Words — the two lists are deliberately split by vowel sound so each stays focused on a single, learnable pattern. Some incidental overlap with broader grade-level or sight-word lists is acceptable if a word is genuinely common, but should not drive word selection.

## Sentence Style
Sentences should let the long-*O* silent-e pattern appear naturally in context (ideally featuring the target word clearly), without contorting the sentence just to force the pattern to stand out.

## Difficulty Expectations
Low-to-moderate — same expectation as the Long I companion list: familiar words, with the challenge centered on consistent application of the silent-e rule rather than unfamiliar vocabulary.

## Related Lists
Silent E: Long I Words (sibling pattern list), Vowel Teams: ai and ay / Vowel Teams: ee and ea (other phonics-pattern lists at a similar level), and 2nd Grade Long Vowel Words (broader long-vowel companion list).

---

## 7. Vowel Teams: ai and ay

## Slug
`vowel-teams-ai-and-ay`

## Category
Phonics patterns

## Target Grade
1st–2nd grade

## Target Age
6–8

## Target Word Count Range
15–25 words

## Skill Focus
Recognizing the long-*A* sound produced by the *ai* and *ay* vowel-team spelling patterns, and learning the general convention that *ai* tends to appear within a word and *ay* tends to appear at the end.

## Source Type
curated

## Inclusion Rules
Common words that clearly demonstrate the *ai* or *ay* vowel-team pattern producing a long-*A* sound, drawn in a reasonable balance from both spellings so the list teaches the *ai*-versus-*ay* positional convention rather than just one half of it.

## Exclusion Rules
No words where *ai* or *ay* appear but do not produce the target long-*A* sound. No irregular exception words that would undermine the positional convention being taught. No words obscure enough that a 1st–2nd grader would be unlikely to meet them in regular reading.

## Duplicate Constraints
Must not overlap with Vowel Teams: ee and ea — the two lists are deliberately split by vowel-team family so each stays focused on its own pattern. Should also avoid needless overlap with the Silent E long-vowel lists, since those teach a different spelling mechanism for similar vowel sounds.

## Sentence Style
Sentences should give the target word a natural context where the *ai*/*ay* spelling is visible and unforced, reinforcing the idea that the same sound can be spelled two different, predictable ways depending on where it falls in the word.

## Difficulty Expectations
Moderate — slightly more demanding than the silent-e lists, because the learner must hold two related spellings of the same sound in mind and connect each to a positional rule, not just recognize a single pattern.

## Related Lists
Vowel Teams: ee and ea (sibling vowel-team list), Silent E: Long I Words / Silent E: Long O Words (related long-vowel mechanisms), and 2nd Grade Long Vowel Words (broader companion list this pattern feeds into).

---

## 8. Vowel Teams: ee and ea

## Slug
`vowel-teams-ee-and-ea`

## Category
Phonics patterns

## Target Grade
1st–2nd grade

## Target Age
6–8

## Target Word Count Range
15–25 words

## Skill Focus
Recognizing the long-*E* sound produced by the *ee* and *ea* vowel-team spelling patterns.

## Source Type
curated

## Inclusion Rules
Common words that clearly demonstrate the *ee* or *ea* vowel-team pattern producing a long-*E* sound, drawn in a reasonable balance from both spellings so the learner sees that the same sound can take more than one common spelling.

## Exclusion Rules
No words where *ea* produces a different vowel sound (such as a short-*E* sound, as in some common exception words) — those would undercut the specific pattern this list is teaching and belong, if anywhere, in a dedicated "exceptions" discussion rather than this introductory list. No obscure words included only to pad the count.

## Duplicate Constraints
Must not overlap with Vowel Teams: ai and ay — the two lists are deliberately split by vowel-team family. Should also avoid needless overlap with the Silent E long-vowel lists and with 2nd Grade Long Vowel Words beyond what is pedagogically natural.

## Sentence Style
Sentences should place the target word in a natural, concrete context where the *ee*/*ea* spelling is visible without being forced, helping the learner connect the spelling to the sound through normal reading rather than artificial repetition.

## Difficulty Expectations
Moderate — comparable to the *ai*/*ay* list, with the added wrinkle that *ea* is a less consistent pattern in English generally; this list should stick to its clearest, most regular examples and leave exceptions for later, more advanced material.

## Related Lists
Vowel Teams: ai and ay (sibling vowel-team list), Silent E: Long I Words / Silent E: Long O Words (related long-vowel mechanisms), and 2nd Grade Long Vowel Words (broader companion list this pattern feeds into).

---

## 9. 2nd Grade Contractions

## Slug
`2nd-grade-contractions`

## Category
Grade-level lists

## Target Grade
2nd grade

## Target Age
7–8

## Target Word Count Range
12–20 words

## Skill Focus
Recognizing and correctly spelling common contractions, including the placement of the apostrophe and the words they are formed from.

## Source Type
curriculum

## Inclusion Rules
Common, everyday contractions that a 2nd grader is likely to encounter in books, conversation, and classroom instruction (e.g., contractions built from common pronouns and "to be," "to have," "will," and "not"). Each entry should have a clear, well-known pair of source words.

## Exclusion Rules
No rare, regional, or informal contractions that a 2nd grader would be unlikely to meet in standard reading. No contractions whose source words are themselves above a 2nd-grade vocabulary level.

## Duplicate Constraints
This list is structurally distinct from the phonics-pattern and sight-word lists (its focus is a grammatical/orthographic structure, not a sound or a canonical word set), so direct word overlap is less of a concern — but it should still avoid being a thin re-presentation of contractions that already appear incidentally inside other 2nd-grade lists.

## Sentence Style
Sentences should use each contraction in a natural spoken-style context, and — where useful for teaching — may also show the expanded two-word form so the learner can connect the contraction to what it stands for. Sentences should otherwise follow the general guidelines: short, concrete, present tense where natural.

## Difficulty Expectations
Moderate — the words themselves are usually short and familiar, but the apostrophe placement and the "two words becoming one" concept represent a genuine conceptual step for a 2nd grader, which is the actual skill being assessed.

## Related Lists
Dolch Second Grade Sight Words and 2nd Grade Long Vowel Words (other lists targeting the same grade band), and any future grammar-and-mechanics lists that might extend this list's focus on word structure rather than sound.

---

## 10. 2nd Grade Long Vowel Words

## Slug
`2nd-grade-long-vowel-words`

## Category
Grade-level lists

## Target Grade
2nd grade

## Target Age
7–8

## Target Word Count Range
15–25 words

## Skill Focus
Reinforcing long-vowel spelling concepts at a 2nd-grade level by drawing together examples across multiple long-vowel patterns (silent-e and vowel-team spellings) into a single grade-level review list.

## Source Type
curriculum

## Inclusion Rules
Common 2nd-grade-appropriate words that clearly demonstrate a long-vowel sound, drawn so that the list as a whole represents a sensible cross-section of the long-vowel patterns a 2nd grader is expected to know by this point (rather than focusing on just one pattern, which is what the dedicated phonics-pattern lists are for).

## Exclusion Rules
No words whose long-vowel spelling is irregular or exception-based in a way that would confuse a learner who is still consolidating the core patterns. No words above a 2nd-grade vocabulary level, even if they would otherwise fit the long-vowel theme well.

## Duplicate Constraints
This list is intentionally a broader, grade-level companion to the more narrowly focused Silent E and Vowel Team pattern lists — light, deliberate overlap with those lists is acceptable and should be noted as intentional (this list exists to show the patterns working together at grade level, not to avoid every word those lists already use). It should not, however, become large enough or specific enough to function as a substitute for those dedicated pattern lists.

## Sentence Style
Sentences should read as natural 2nd-grade-level prose that happens to showcase a long-vowel word in context, rather than as a drill explicitly calling attention to the spelling pattern — this list is meant to feel like grade-level reading practice with a long-vowel throughline, not a phonics worksheet.

## Difficulty Expectations
Moderate — appropriate to a 2nd grader who has already been introduced to individual long-vowel patterns and is now expected to recognize and spell them in mixed, grade-level context.

## Related Lists
Silent E: Long I Words, Silent E: Long O Words, Vowel Teams: ai and ay, and Vowel Teams: ee and ea (the focused pattern lists this one draws together), Dolch Second Grade Sight Words, and 2nd Grade Contractions (other lists targeting the same grade band).
