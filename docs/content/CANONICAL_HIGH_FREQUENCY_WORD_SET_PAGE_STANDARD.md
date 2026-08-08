# Canonical High-Frequency Word Set Page Editorial Standard — spellingwords.app

**Status:** Final canonical editorial standard.  
**Scope:** The 27 individual pages at `/{grade}/high-frequency-words/set-{n}`.  
**Reference implementation:** [Kindergarten High-Frequency Words — Set 1](../../src/content/spelling-lists/high-frequency-words/kindergarten-high-frequency-words-set-1.md).

This document is the durable source of truth for authoring and reviewing individual High-Frequency Words (HFW) set pages. It freezes editorial purpose, semantic content, and quality—not the current visual treatment. The exact curriculum remains owned by [`FROZEN_HIGH_FREQUENCY_WORDS_CURRICULUM.md`](../curriculum/FROZEN_HIGH_FREQUENCY_WORDS_CURRICULUM.md) and its executable contract, `src/lib/content/hfWordsCurriculum.ts`.

---

## 1. Authority and fixed boundary

This standard governs only the member pages in the permanent grade-contained hierarchy:

```text
/{grade}/high-frequency-words/set-{n}
```

It does not govern the six grade HFW gateways, Core Spelling pages, Themed Spelling Practice pages, or broad educational reference pages. Gateway editorial transformation is deferred.

The active taxonomy is **High-Frequency Words**. Every member has `category: high-frequency-words`, `contentRole: high-frequency-word-set`, a stable HFW id, and a source file under `src/content/spelling-lists/high-frequency-words/`. Do not reintroduce *Sight Words*, *Common Words*, `sight-words`, `common-words`, `sight-word-set`, `heart-words`, or `Heart part:` as active taxonomy or hints. Historical source names may remain where factually necessary; “sight word” or a Heart Word approach may be explained in an appropriate broad reference, but neither names this strand.

### Frozen curriculum contract

| Grade | Sets | Words |
|---|---:|---:|
| Kindergarten | 4 | 40 |
| Grade 1 | 7 | 84 |
| Grade 2 | 7 | 84 |
| Grade 3 | 5 | 60 |
| Grade 4 | 2 | 24 |
| Grade 5 | 2 | 24 |
| **Total** | **27** | **316** |

There are 316 assignments, 316 normalized unique spellings, and sentence-bank support for 316/316 spellings. Editors may not add, remove, substitute, or reorder words; move words across sets or grades; change set counts; alter stable ids; or change routes. Verify inventory against the executable contract rather than copying a list from prose.

---

## 2. Purpose: inventory-driven spelling instruction

The governing question is:

> What should a student notice in order to learn to spell these particular frequently encountered words accurately and retrieve their spellings from memory?

HFW pages are **word-driven**. Core Spelling is **concept-driven**: it explains how systematic spelling knowledge works. HFW applies useful known sounds, spellings, word parts, and written patterns to the particular frozen inventory. A set may intentionally mix concepts. Never manufacture a unifying rule so that it resembles a Core lesson, reproduce a whole Core explanation, or automatically link a Core/Skill page merely because a target contains a feature. A future relationship must have genuine instructional value and explicit approval.

### Instructional principles

1. **Frequency and irregularity are different.** Inclusion does not mean a word is irregular, cannot be sounded out, or must be memorized as a visual shape.
2. **Use sound–spelling knowledge wherever it helps.** Explain familiar, useful information rather than treating an entire word as arbitrary.
3. **Isolate the noteworthy portion.** If one part needs attention, describe that part.
4. **Distinguish unfamiliar from unusual.** A legitimate pattern not yet taught may be unfamiliar *for now*; it does not “break a rule.”
5. **Retrieval is the goal.** A student ultimately hears the intended word and spells it without seeing the printed form first. Copying is not mastery.
6. **Review cumulatively.** Revisit learned words in later mixed review. Move forward when most are becoming secure while carrying one or two difficult words forward; do not trap a student on a set.

---

## 3. Canonical semantic production model

> **Set summary → complete word inventory → set-level spelling observations → selective word notes → shared practice/review → navigation**

These semantic components govern production. Their current components, styling, and exact visual ordering do not.

### A. Set summary — required and authored

The `description` and, where used, `shortAnswer` identify the grade, set, and actual instructional character of its inventory concisely. They are not generic definitions or SEO filler.

**Swap test:** if another set replaced the inventory, would the summary become inaccurate? If not, revise it.

### B. Complete word inventory — required and frozen

The ordered words are the page's central object. Keep them prominent, complete, and in frozen order. Do not hide them beneath a long introduction.

### C. Set-level spelling observations — expected and authored

The renderer currently owns the primary heading **“What to notice when spelling these words.”** Markdown supplies the content beneath it: useful groupings, contrasts, strategies shared by multiple words, and characteristics of this inventory. Natural subheadings may vary by set.

Set-level prose must add cross-set analysis, not preview every individual note and immediately repeat it. It is expected on essentially every production page; if an inventory truly yields no useful group-level observation, flag that editorial judgment rather than padding the page.

### D. Selective word-specific notes — conditional and authored

Use `hfwWordNotes`, whose semantic fields are:

- `word`
- `note`
- optional `contextExample`
- optional `pronunciationNote`

These are editorial records, not inherently cards. Add a record only when it gives actionable spelling information: an unexpected correspondence, a likely unfamiliar feature, intrinsic capitalization, a silent letter, useful morphology, meaningful syllable structure, a reduced/unstressed pronunciation, a homophone or confusable, pronunciation variation, or another specific feature worth deliberate attention.

Do not add notes for symmetry or merely say that a word is common or should be practiced carefully. A predictable word normally needs no note.

### E. Practice and review — required, shared, renderer-owned

The canonical baseline is:

> hear → notice/map → spell without seeing → check → retrieve again later

The renderer supplies the standard practice/review block. Markdown must not paraphrase or duplicate it. Author set-specific practice guidance only when the inventory creates a genuine additional need.

### F. Navigation — required and renderer-owned

Progression stays inside the owning grade. The page exposes the previous set when one exists, the next set when one exists, and the grade's HFW gateway. Set 1 has no previous set; the terminal set has no next set. Numbering conveys adjacency, not invented prerequisites.

---

## 4. Editorial reasoning framework

Analyze every word internally, though the categories below are not public labels or badges:

- **Predictable/familiar:** expected grade knowledge explains it; usually no note.
- **Regular but not yet familiar:** a legitimate pattern may be new for now; do not call it random or rule-breaking.
- **Specifically noteworthy/unusual:** explain the relevant portion, not the whole word as “irregular” when avoidable.
- **Confusable/context-dependent:** meaning determines the spelling; provide enough context for fair practice.

Set-level analysis explains relationships **across** the inventory. Word notes handle details best attached to **one** target. Neither should restate the other.

### Pronunciation

Add pronunciation guidance only when it materially affects spelling: reduced vowels, unexpected consonant representations, heteronyms, dialect-sensitive forms, or connected-speech changes. Do not present one dialect as universally correct. Prefer parent-usable wording (“The final **s** sounds like **z**”) to unexplained notation such as `/z/`; if notation truly helps, explain it immediately.

### Capitalization

Discuss capitalization only when intrinsic to the target's conventional written form or specifically relevant to learning it. The pronoun `I` merits a note. A generic reminder to capitalize any word at the start of a sentence does not; that is writing/grammar instruction.

### Context and the sentence bank

All 316 canonical spellings have sentence-bank support, primarily for spoken practice. Do not automatically expose those sentences as editorial copy. Use optional `contextExample` only when meaning identifies a homophone/confusable, pronunciation alone cannot fairly identify the target, or context materially clarifies the observation. Zero, one, or several examples are all valid.

---

## 5. Grade-appropriate maturation

Use the actual Core progression to judge what can reasonably be treated as known. Do not force artificial differences, but do not explain Grade 5 with Kindergarten assumptions.

| Grade | Appropriate emphasis |
|---|---|
| **Kindergarten** | Plain sound-to-letter observations, beginning phonics, listening through short words, intrinsic capitalization, and one noteworthy part when needed. Use exceptionally plain parent-facing language. |
| **Grade 1** | Increasing use of digraphs, blends, silent e, familiar vowel teams, endings, basic confusables, and known Core patterns. |
| **Grade 2** | Expanded vowel teams, silent letters, r-controlled patterns, two-syllable structure, stable endings, contractions, and context where needed. |
| **Grade 3** | Compounds, contractions, prefixes, suffixes, bases, syllable/chunk structure, spelling families, and context-driven distinctions. |
| **Grades 4–5** | Morphology, bases/roots/affixes, multisyllabic structure, reduced or unstressed vowels, stable written structure despite less-transparent pronunciation, and sophisticated confusable reasoning. |

Do not over-etymologize or invent morphology merely because a spelling can be visually split.

---

## 6. Voice and visible-copy rules

Write for a parent, guardian, or teacher helping an elementary student. Research may be sophisticated; visible prose should be accurate, concise, practical, direct, calm, and readable without becoming patronizing.

Avoid repeated “the learner,” unexplained jargon, excessive notation, academic-paper tone, curriculum-development language, and defenses of site architecture. Terms such as *digraph*, *vowel team*, *prefix*, *suffix*, and *base word* are welcome when they add precision and are clear from context; otherwise use simpler accurate language.

Copy must be presentation-independent. Never refer to “the card below,” “the box,” “the left column,” a color, screen position, scrolling, or another current UI detail. Use a semantic reference such as “the spelling notes” or “the practice section” only when necessary.

---

## 7. Explicit anti-patterns

Individual HFW set pages do **not** include by default:

- Core-style readiness (“These spelling words are a good fit for students who…”);
- manufactured “Before starting” prerequisites;
- generic “What are high-frequency words?” definitions;
- repeated sight-word, Dolch/Fry, orthographic-mapping, Science of Reading, or Heart Word essays;
- FAQs for symmetry, schema, SEO, GEO, or AEO (a genuine inventory-specific residual question is allowed);
- a note for every word;
- whole-word “picture” or visual-shape memorization framing;
- unsupported attempt counts, day counts, stopwatch limits, percentages, or other mastery thresholds;
- automatic Core/Skill relationships; or
- renderer-owned headings or shared practice prose repeated in Markdown.

The duplicate-heading lesson from Core production applies directly: authors supply content **under** renderer-owned semantic regions, not a second copy of the renderer's heading.

---

## 8. Search, answer systems, and topical authority

SEO, GEO, AEO, and topical authority are earned through educational usefulness and clear information architecture—not content inflation.

An individual page serves narrow intent: the exact grade, set, words, and spelling practice. The grade gateway owns broad grade-level HFW intent. Favor accurate titles/H1s, descriptive headings, self-contained crawlable explanations, selective concrete examples, semantic hierarchy, useful navigation, consistent terminology, and original inventory-specific analysis.

Apply both information-gain tests:

1. What can a parent learn about spelling **these** words that the list alone cannot teach?
2. If another inventory replaced these words, would meaningful instructional content become wrong?

The second answer must be yes. Reject keyword stuffing, fixed answer lengths, default FAQs, AI-specific schema, hidden AI copy, arbitrary tables, artificial statistics, and speculative GEO tactics. No current visual component is an SEO requirement.

---

## 9. Authored content versus shared behavior

### Authored per set

- inventory-specific `description`/summary;
- `shortAnswer` where schema or metadata requires it;
- set-level spelling observations in Markdown;
- selective `hfwWordNotes`;
- only genuinely necessary set-specific context or practice observations.

### Shared/renderer-owned

- canonical HFW strand heading/badge behavior;
- word-list framework;
- primary “What to notice when spelling these words” heading;
- standard practice/review guidance;
- previous/next/gateway navigation;
- breadcrumb hierarchy.

Before publishing, compare Markdown with the renderer and remove repeated headings or guidance.

### Provenance

The sitewide provenance policy is implemented in the shared schema and renderers: `canonicalSource` may retain internal editorial provenance, but it renders only with explicit `publicAttribution: true`. Never expose labels such as “Hybrid editorial” merely because metadata exists.

---

## 10. Reference implementation, not clone template

Kindergarten Set 1 at `/kindergarten/high-frequency-words/set-1` demonstrates the standard with the frozen inventory `a, I, am, at, can, in, it, is, and, the`:

- five straightforward words are grouped through sound–spelling mapping;
- `and` is handled at set level without an unnecessary note;
- only `a`, `I`, `is`, and `the` receive word notes;
- notes contain specific spelling information rather than generic reminders;
- no visible context examples are forced;
- shared practice is not duplicated;
- set-level prose does not rehearse all four notes; and
- internal provenance does not render publicly.

These are editorial decisions for that inventory, not quotas. Future sets need not have two subheadings, four notes, zero examples, matching paragraph lengths, or the same observations.

---

## 11. Repeatable workflow

1. Verify the exact frozen inventory and order.
2. Review the grade's preceding Core spelling knowledge.
3. Analyze every word using the internal reasoning framework.
4. Identify group-level observations.
5. Select only words genuinely requiring notes.
6. Decide whether context is required for fair spelling.
7. Draft a concise inventory-specific summary/short answer.
8. Draft set-level observations without duplicating notes.
9. Draft selective notes and any genuinely necessary examples.
10. Compare against renderer-owned content and remove duplication.
11. Review for grade-appropriate, parent-readable language.
12. Review pronunciation claims for dialect safety.
13. Remove grammar, general-method, or concept-lesson scope creep.
14. Apply both information-gain tests.
15. Verify presentation independence.
16. Render and inspect desktop/mobile when possible.
17. Verify curriculum, metadata, route, and grade-contained navigation invariants.
18. Run focused tests, the full suite, lint, Astro/TypeScript checks, build, and `git diff --check` where available.

Do not encode subjective prose quality in brittle keyword tests. Structural tests should protect executable invariants; human editorial review should judge instruction and voice.

---

## 12. Definition of done and guardrails

A set is editorially complete only when its frozen identity and ordered inventory are intact; summary and observations depend on the inventory; notes are selective, actionable, and nonduplicative; context and pronunciation are justified; language fits the grade and adult reader; shared content is not repeated; copy is presentation-independent; and focused/full checks pass or limitations are documented.

Existing tests reasonably protect the critical structural baseline: 27 files, 316 unique frozen spellings and ordered parity, canonical metadata/routes, 316/316 sentence coverage, obsolete terminology exclusions, HFW-specific rendering without Core readiness, grade-contained adjacency/terminal behavior, Set 1 pilot decisions, and provenance gating. Navigation is protected structurally rather than by brittle rendered-copy assertions. No new test is required to freeze this editorial document.

This standard authorizes no curriculum, route, taxonomy, renderer, gateway, visual, or non-Set-1 production-page change. The next editorial batch is deliberately separate.
