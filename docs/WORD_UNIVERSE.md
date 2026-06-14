# Word Universe

The canonical curriculum-planning document for spellingwords.app vocabulary.

---

## Purpose

The Word Universe represents every approved vocabulary word supported by spellingwords.app.

Words live in the sentence bank (`src/lib/sentenceBank/`). Each word exists once, paired with a hand-written example sentence and a grade band. Nothing else in the repository owns a word outright — curated lists reference words, they do not define them.

This hierarchy governs all content decisions:

```
Word Universe
↓
Metadata
↓
Generated Lists
↓
UI
```

The sentence bank is the product. Everything else derives from it.

---

## Long-Term Goal

spellingwords.app is evolving from:

> a website containing spelling lists

into:

> a vocabulary and curriculum system that happens to have a website attached to it.

Today, lists are authored individually and words are scattered across Markdown files. The long-term goal is for every list family — grade-level, sight words, phonics, challenge — to be generated as a view over the Word Universe, filtered and ordered by metadata.

**Words are the foundation. Lists are presentations.**

This document tracks the state of that foundation and flags where it needs to grow.

---

## Current Sources

The vocabulary currently draws from three established sources:

1. **Reading Rockets** — Evidence-based word lists aligned to literacy research. Primary source for grade-level vocabulary.
2. **Dolch** — The classic 220 high-frequency sight word list, widely used in K–3 instruction. Covered across eight published lists.
3. **Phonics collections** — CVC patterns, silent-e variants, vowel teams, r-controlled vowels. Derived from common phonics sequences used in structured literacy programs.

Future candidates under consideration:

4. **Fry** — 1,000 high-frequency words, complementary to Dolch.
5. **UFLI** — University of Florida Literacy Institute scope and sequence for structured phonics.
6. **Wonders** — McGraw-Hill basal reader series, widely adopted in US schools.
7. **Benchmark Advance** — Another widely adopted basal series with explicit vocabulary strands.

---

## Source Hierarchy

Sources are intentionally prioritized because future additions may overlap or conflict. When a word could come from multiple sources, prefer the higher-priority source.

**Current priority:**

1. Reading Rockets
2. Dolch
3. Phonics collections (structured literacy sequences)

**Future additions (proposed order):**

4. Fry
5. UFLI
6. Wonders
7. Benchmark Advance

When a word from a lower-priority source duplicates a word already in the bank from a higher-priority source, it is not re-added — the existing entry covers it. Source attribution may eventually be recorded in the `WordEntry` metadata (see [Future Content Model](#future-content-model)).

---

## Current State of the Word Universe

Current audit results show the sentence bank contains **914 entries** across three grade bands:

| Grade Band | Entries | Share |
|------------|---------|-------|
| K–1        | 347     | 38%   |
| 2–3        | 486     | 53%   |
| 4–5        | 81      | 9%    |
| **Total**  | **914** |       |

As of this audit, **32 published lists** surface approximately **470 words** — roughly **51% of the sentence bank** appears in at least one curated list. The remaining half exists as a reserve: words with validated sentences and grade placements, ready to be assigned to future lists without requiring new additions first.

The present vocabulary distribution also shows **20 words** documented in the review registry (`src/lib/sentenceBank/reviewWords.ts`) and intentionally kept out of automatic use.

What these numbers mean:

- The lower grade bands (K–3) are well populated. The 2–3 band is the largest, which aligns with the heaviest demand from early elementary lists.
- Grade 4–5 coverage is thin — 81 entries is not enough to build a rich upper-elementary list library.
- Roughly half the bank is untapped, which means near-term lists can draw from existing vocabulary without adding new words first.
- The review registry is small and deliberate, which is healthy.

---

## Grade Coverage

The sentence bank uses three grade bands:

**K–1 (347 entries)**
Kindergarten and first grade. High-frequency words, short CVC patterns, common sight words, early phonics. These words support pre-reader and emerging-reader practice.

**2–3 (486 entries)**
Second and third grade. Expanding vocabulary, compound words, inflected endings, more complex phonics patterns. The largest and most developed band.

**4–5 (81 entries)**
Fourth and fifth grade. Multisyllabic words, academic vocabulary, morphology patterns. This band is currently underdeveloped and is the highest-priority area for future expansion (see [Vocabulary Coverage Gaps](#vocabulary-coverage-gaps)).

---

## Vocabulary Coverage Gaps

The following gaps are observed from the present data. They are intentionally identified opportunities for future expansion — not failures. The goal of this section is visibility, not perfection. Knowing where the vocabulary is thin is the prerequisite for expanding it responsibly.

**Grade 4–5 is thin.**
The present distribution shows 81 entries versus 347 and 486 in the lower bands. Upper-elementary vocabulary is the biggest structural gap in the current bank. Any future list work targeting grades 4–5 will quickly exhaust available sentence-bank coverage.

**Challenge vocabulary is sparse.**
Current audit results show only 2 published challenge lists, and the underlying bank entries supporting that level are limited. Morphological challenge words (roots, prefixes, suffixes) are the primary underrepresented type.

**Academic and content-area vocabulary is limited.**
The present vocabulary distribution skews toward general-use vocabulary. Subject-area academic words (science, social studies, math vocabulary) are largely absent.

**Morphology is underrepresented.**
Prefixes, suffixes, and Greek/Latin roots exist as two challenge lists, but the underlying sentence bank has little metadata to support sorting or filtering by morphological pattern. This limits future list generation.

---

## Categories We Expect to Support

The following categories are under consideration for future list generation. These are planning ideas only — no implementation is implied.

- **Sight words** — High-frequency words prioritized for automaticity (Dolch, Fry)
- **Phonics** — Pattern-based words grouped by phonics rule or sequence
- **Compound words** — Two-word combinations functioning as a single unit
- **Action words** — Verbs; useful for early grammar and vocabulary work
- **Describing words** — Adjectives and adverbs; useful for writing vocabulary
- **Academic vocabulary** — Tier 2 and Tier 3 words for content-area learning
- **Challenge words** — Complex multisyllabic words for advanced learners
- **Roots** — Words grouped by shared Greek or Latin root
- **Prefixes / Suffixes** — Words grouped by morphological affix

These categories are not yet encoded in the sentence bank. They would need to be added as metadata before list generation could use them.

---

## Review Words

The review registry lives at `src/lib/sentenceBank/reviewWords.ts` and documents **20 words** that are intentionally excluded from automatic use. Each entry records the word, a reason, a recommendation, and one of three statuses:

- **`avoid`** — Do not use. Primary cause: heteronyms (words with multiple pronunciations depending on meaning or part of speech). Examples: `read` (present vs. past tense), `wind` (noun vs. verb), `bow`, `tear`, `lead`. Also covers proper nouns that violate content standards (`Mr.`, `Mrs.`, `Ms.`).
- **`needs-review`** — Pronunciation varies by dialect or context and needs additional evaluation before use. Example: `row` (rhymes with "go" or "cow" depending on meaning).
- **`safe-to-add`** — Previously flagged but determined to be acceptable for TTS. Examples: `does`, `hour`, `eight`, `people`.

**Heteronym policy:** any word whose pronunciation changes based on meaning or grammatical role is flagged as `avoid`. Speech synthesis has no semantic context, so it may mispronounce these words when reading them aloud — which directly undermines the core learning loop.

Review words are never added to the sentence bank automatically. They require a manual decision recorded in the registry.

---

## Guiding Principles

1. **Words exist once.** A word lives in the sentence bank and nowhere else. If a word appears in ten lists, it still has one entry.
2. **Sentences belong to words.** Example sentences are properties of a word entry, not of the list that happens to use the word.
3. **Lists do not own words.** A list is a curated view — a selection of words from the universe. Removing a list does not remove the words.
4. **Metadata drives lists.** The goal is for list generation to be a query over word metadata, not a hand-authored collection of strings.
5. **UI follows curriculum.** Interface decisions are shaped by what the vocabulary and curriculum require, not the other way around.
6. **Content quality matters more than quantity.** A smaller bank of well-vetted, well-sentenced words is more valuable than a large bank of low-quality entries.
7. **New words are added intentionally.** Words are not added to fill gaps quickly or to match competitor word counts. Each addition should serve a clear instructional purpose.
8. **Curriculum should remain understandable by parents and teachers.** Lists, grades, and categories should map to concepts that adults familiar with elementary education will recognize without explanation.
9. **Simplicity beats abstraction.** Avoid introducing metadata systems before they are clearly necessary. Build the vocabulary first; add structure when the need is demonstrated.

---

## Non-Goals

To keep the vocabulary system maintainable and trustworthy:

- **No AI-generated sentences.** Every example sentence is hand-written. Automated generation introduces inconsistency, potential errors, and sentences that may not be age-appropriate.
- **No automatic pronunciation guessing.** We do not infer pronunciation or attempt IPA transcription. The TTS engine handles pronunciation; we only flag words where TTS is known to be unreliable.
- **No duplicate words.** The audit suite enforces uniqueness at the normalized-word level. A word may not appear twice, even with different capitalization or diacritics.
- **No list-specific sentence ownership.** Sentences are never written for a specific list. A sentence written for a word in a Dolch list is the same sentence used if that word appears in a grade-level list.
- **No backend vocabulary service.** The sentence bank is a static TypeScript file. There is no API, database, or external vocabulary lookup.
- **No vocabulary added without review.** New words require a hand-written sentence, a grade band assignment, and confirmation that the word is not a heteronym or otherwise problematic.

---

## Expansion Strategy

The path from the current site to a fully metadata-driven curriculum system has four phases. These phases are sequential — each depends on the previous one being complete.

> Vocabulary first. Lists second. UI last.

### Phase 1 — Vocabulary

Build a sufficiently complete K–5 vocabulary universe. This means expanding the sentence bank — particularly the thin grade 4–5 band — until it can support a full library of lists at every level without running out of words. No list work should begin in a grade band that lacks sufficient vocabulary coverage.

### Phase 2 — Metadata

Introduce structured metadata on sentence bank entries: individual grade levels (not just bands), category tags, difficulty, and source references. This is the phase where the `tags` field gets populated and the `WordEntry` interface evolves from planning artifact to production type.

### Phase 3 — Generated Lists

Build grade lists, phonics lists, challenge lists, and sight-word lists as queries over the metadata rather than hand-authored word arrays. At this stage, adding a new word to the bank automatically makes it available to any list that matches its metadata.

### Phase 4 — UI

Present the generated views in the library. The UI becomes a rendering layer over curriculum — it displays what the vocabulary system knows, rather than defining what exists.

---

## Current Priorities

1. Expand grade 4–5 vocabulary.
2. Continue auditing review words.
3. Increase sentence-bank coverage before creating more lists.
4. Delay metadata work until the vocabulary universe stabilizes.

---

## Sentence Bank Audit

> Findings from inspection of `src/lib/sentenceBank/data/`. The data integrity invariants below are enforced automatically by `src/lib/sentenceBank/audit.test.ts`.

### Total Entries

Current audit results show **914 entries** — across k1.ts (347), grade23.ts (486), grade45.ts (81).

### Grade Distribution

| File | Grade Band | Entries |
|------|------------|---------|
| `data/k1.ts` | K–1 | 347 |
| `data/grade23.ts` | 2–3 | 486 |
| `data/grade45.ts` | 4–5 | 81 |

### Review Word Count

As of this audit, **20 words** appear in the review registry:
- 13 flagged `avoid`
- 4 flagged `safe-to-add`
- 1 flagged `needs-review`
- 2 additional entries (proper nouns / edge cases)

### Words Missing Sentences

**0.** The audit suite requires every entry to have a non-empty `exampleSentence`. This invariant is currently passing.

### Duplicate Words

**0.** The audit suite normalizes every word (lowercase, diacritic-stripped) and asserts uniqueness. No duplicates currently exist.

### Data Quality Checks (enforced by audit.test.ts)

- Every `exampleSentence` must contain the target word (with a narrow allowlist for possessives, e.g. "pony's" → "ponys" normalized)
- All sentences are between 5 and 25 words long
- All `gradeBand` values are valid (`'K-1'`, `'2-3'`, `'4-5'`)
- All `sourceType` values are `'curated'`
- Entries within each grade-band file are alphabetically sorted

### Potential Data Problems

**Grade 4–5 is critically thin.** As of this audit, 81 entries is insufficient to support a full upper-elementary list library. This is the most urgent structural gap.

**The `tags` field is unused.** `SentenceBankEntry` declares `tags?: string[]` but no entry currently sets it. Without tags, category-based list generation is not possible. Populating tags is the prerequisite for moving from hand-authored lists to metadata-driven lists.

**No morphological metadata.** There is no `prefix`, `root`, `suffix`, or `morphologyPattern` field on entries. Challenge list work depends on this kind of annotation.

---

## Future Content Model

Before any metadata-driven list generation is possible, the `SentenceBankEntry` type will need to be extended. A richer future model would include individual grade levels (rather than bands), explicit source attribution, category tags, and difficulty — providing enough signal for a query to assemble a list without manual curation.

The current type is:

```ts
interface SentenceBankEntry {
  word: string;
  exampleSentence: string;
  gradeBand?: 'K-1' | '2-3' | '4-5';
  tags?: string[];
  sourceType: 'curated';
}
```

A future model might look like:

```ts
interface WordEntry {
  word: string;
  exampleSentence: string;

  gradeBand?: 'K' | '1' | '2' | '3' | '4' | '5';

  categories?: string[];       // e.g. ['sight-words', 'phonics']

  source?: string[];           // e.g. ['dolch', 'reading-rockets']

  difficulty?: 'easy' | 'medium' | 'hard';

  status?: 'approved' | 'review';
}
```

**This interface is not implemented and exists purely for planning purposes.**

The expanded `gradeBand` (individual grades instead of bands) and `source` array are the fields most likely to be added first, as they unlock filtering by grade and source hierarchy. `categories` and `difficulty` follow naturally once `source` attribution is in place. `status` would eventually replace the current separate `reviewWords.ts` registry with an inline field.

---

## Human Audit Report

### Current Total Words
**914** sentence bank entries, as of this audit.

### Grade-Band Totals
- K–1: **347**
- 2–3: **486**
- 4–5: **81**

### Number of Review Words
**20** (13 avoid, 4 safe-to-add, 1 needs-review, 2 other).

### Number of Published Lists
**32** across 4 categories: grade-level (12), phonics (10), sight-words (8), challenge (2).

### Approximate Percentage of Words Surfaced in Lists
~**51%** (~470 of 914 sentence bank entries appear in at least one list).

### Duplicates Found
**None.** The audit suite enforces uniqueness and is currently passing.

### Suspicious Entries Found
None flagged by current tooling. The grade 4–5 file (`data/grade45.ts`) is notably small — this is a coverage gap, not a data error.

### Recommendations for Next Steps

1. **Expand grade 4–5 vocabulary** before authoring new upper-elementary lists. 81 entries is not a sufficient foundation for that band.
2. **Continue auditing review words.** Four words (`does`, `hour`, `eight`, `people`) are already cleared as safe-to-add — evaluate whether to bring them into the bank.
3. **Increase sentence-bank coverage broadly** before creating more lists. The vocabulary universe needs to stabilize before list expansion resumes.
4. **Delay metadata work** until the vocabulary universe is sufficiently complete. Adding structure prematurely increases maintenance burden without improving curriculum quality.
