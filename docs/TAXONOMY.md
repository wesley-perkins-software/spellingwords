# Spelling Library Taxonomy

Controlled vocabulary for the spelling library's organizational fields.

---

## The Two-Dimensional Model

Every list is positioned on two axes:

- **Strand** — what kind of learning this list supports
- **Grade** — when it is appropriate in a child's development

All other attributes (difficulty, topic, season, curriculum source) describe a list
within its strand/grade cell. They do not replace it.

---

## Strand

The `strand` field classifies what kind of learning a list primarily supports.
Every list should have a strand. The four strands are not parallel categories —
they reflect four genuinely different pedagogical purposes.

| Value | Display name | Grade range | Description |
|-------|-------------|-------------|-------------|
| `foundations` | Sight Words & Basics | K–3 | High-frequency words children must recognize and spell automatically. Dolch tiers, Fry sequences, print-awareness vocabulary (colors, numbers, shapes, days). Foundations content phases out after Grade 3 as fluency takes over. |
| `word-patterns` | Phonics & Word Structure | K–5+ | Sound-spelling patterns and morphological structure. Grades K–2: short vowels, blends, digraphs, silent-e, vowel teams, r-controlled vowels. Grades 3–5: prefixes, suffixes, compound words, roots, doubling rules, homophones, Greek/Latin roots. This strand does not end at Grade 2. |
| `vocabulary` | Vocabulary | K–5 | Grade-appropriate reading and content-area vocabulary. Includes thematic sets (community, nature, seasons), academic vocabulary (Tier 2 words), and content-area terms (math, science, social studies, ELA). Expands steadily as children's reading lives grow. |
| `enrichment` | Challenge & Enrichment | 2–5+ | Optional, aspirational content for motivated learners. Grade-appropriate spelling bee preparation, advanced pattern extensions, systematic Greek/Latin study (Grade 4+), etymology, heteronyms. Each enrichment list should carry a grade recommendation. |

### Strand assignment rules

- A list has exactly one strand.
- Phonics lists (all existing `category: phonics` content) → `word-patterns`
- Sight word lists (all existing `category: sight-words` content) → `foundations`
- Grade-level vocabulary lists (all existing `category: grade-level` content) → `vocabulary`
- Challenge lists (all existing `category: challenge` content) → `enrichment`
- Thematic and seasonal lists (future content) → `vocabulary`
- When in doubt: assign by primary learning purpose, not surface appearance.

---

## Category

The `category` field is preserved for backward compatibility and for URL routing
(`/spelling-lists/phonics/`, `/spelling-lists/sight-words/`, etc.).

New lists should assign both `category` and `strand`. The `strand` field drives
new navigation surfaces; `category` continues to drive existing routes.

**Planned deprecations:**
- `category: grade-level` → these lists belong in `strand: vocabulary`
- `category: challenge` → these lists belong in `strand: enrichment`

Do not create new lists with `category: theme` or `category: seasonal` without
also assigning the correct strand (`vocabulary`).

---

## Grade

Every list should have a `grade` value or a documented reason it doesn't.

| Value | Meaning |
|-------|---------|
| `K` | Kindergarten |
| `1` | Grade 1 |
| `2` | Grade 2 |
| `3` | Grade 3 |
| `4` | Grade 4 |
| `5` | Grade 5 |

**Lists that span multiple grades:** Use the lowest appropriate grade. A phonics
list appropriate for Grades 1–2 should be tagged `grade: "1"`. A cross-grade
challenge list should carry a grade recommendation (typically the lowest grade
where most students are ready).

**Lists with no grade:** Only acceptable for enrichment content that is
explicitly cross-grade (e.g., a competition spelling bee list). Require an
explicit comment in the frontmatter explaining the omission.

---

## skillTags

Controlled vocabulary for the `skillTags` array. Tags are organized by strand.

### Foundations tags
- `sight-words` — general high-frequency word recognition
- `high-frequency` — subset of sight words from frequency lists
- `dolch` — Dolch sight word source
- `fry` — Fry word list source
- `print-awareness` — colors, numbers, shapes, school vocabulary

### Word Patterns tags
**Short vowels:**
- `short-vowels`, `short-a`, `short-e`, `short-i`, `short-o`, `short-u`
- `cvc-words` — consonant-vowel-consonant pattern

**Consonant patterns:**
- `consonant-blends`, `initial-blends`, `final-blends`
- `digraphs`, `digraph-ch`, `digraph-sh`, `digraph-th`, `digraph-wh`

**Long vowels:**
- `long-vowels`, `silent-e`, `long-a`, `long-i`, `long-o`
- `vowel-teams`, `vowel-team-ai-ay`, `vowel-team-ee-ea`, `vowel-team-oa-ow`
- `vowel-team-oi-oy`, `vowel-team-ou-ow`

**R-controlled:**
- `r-controlled`, `r-controlled-ar`, `r-controlled-or`, `r-controlled-er-ir-ur`

**Morphology (Grades 3–5):**
- `prefixes`, `suffixes`, `compound-words`, `contractions`
- `doubling-rule` — doubling final consonant before -ing/-ed
- `roots`, `latin-roots`, `greek-roots`, `etymology`
- `homophones`, `heteronyms`

### Vocabulary tags
- `grade-K`, `grade-1`, `grade-2`, `grade-3`, `grade-4`, `grade-5`
- `action-words`, `describing-words`, `everyday-words`
- `academic-vocabulary`, `tier-2-words`
- `content-area`, `science`, `social-studies`, `math`
- `thematic`, `community`, `nature`, `seasons`

### Enrichment tags
- `spelling-bee`, `competition`
- `advanced-patterns`
- `greek-roots`, `latin-roots`, `etymology` (shared with word-patterns)

---

## Difficulty

| Value | Meaning |
|-------|---------|
| `beginner` | Early K–1; first experiences with a skill |
| `developing` | Mid K–2; building fluency |
| `intermediate` | Grade 2–3; consolidating the skill |
| `advanced` | Grade 3–4; extending and applying |
| `challenge` | Grade 4+; enrichment and competition |

Difficulty is relative to the strand and grade, not absolute. A `beginner`
phonics list and a `beginner` vocabulary list are both entry-level for their
respective skill domains.
