# Inventory: Common Words (High-Frequency Words) and Sight-Word Sets

Linked from `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`. This is the Common Words / sight-word layer that feeds each Grade Hub's **High-Frequency Words** section. Two structures exist side by side:

- `spelling-collections` entries — the gateway pages (e.g. "Kindergarten High-Frequency Words"), each grouping several `spelling-lists` member sets via `listIds`.
- `spelling-lists` entries with `contentRole: sight-word-set` (or, for the legacy Dolch tiers, no `contentRole` set — flagged below) — the individual practice sets a gateway links to.


## Common Words gateway pages (`spelling-collections`, grade-N-common-words)

| Title | id | urlSlug | Grade | Status | Member listIds | Source file |
|---|---|---|---|---|---|---|
| Grade 1 Common Words | grade-1-common-words | grade-1-common-words | 1 | published | grade-1-common-words-1, grade-1-common-words-2, grade-1-common-words-3, grade-1-common-words-4, grade-1-common-words-5, grade-1-common-words-6 | `src/content/spelling-collections/grade-1-common-words.md` |
| Grade 2 Common Words | grade-2-common-words | grade-2-common-words | 2 | published | grade-2-common-words-1, grade-2-common-words-2, grade-2-common-words-3, grade-2-common-words-4, grade-2-common-words-5, grade-2-common-words-6 | `src/content/spelling-collections/grade-2-common-words.md` |
| Grade 3 Common Words | grade-3-common-words | grade-3-common-words | 3 | published | grade-3-common-words-1, grade-3-common-words-2, grade-3-common-words-3, grade-3-common-words-4, grade-3-common-words-5 | `src/content/spelling-collections/grade-3-common-words.md` |
| Grade 4 Common Words | grade-4-common-words | grade-4-common-words | 4 | published | grade-4-common-words-1, grade-4-common-words-2, grade-4-common-words-3, grade-4-common-words-4 | `src/content/spelling-collections/grade-4-common-words.md` |
| Grade 5 Common Words | grade-5-common-words | grade-5-common-words | 5 | published | grade-5-common-words-1, grade-5-common-words-2, grade-5-common-words-3, grade-5-common-words-4 | `src/content/spelling-collections/grade-5-common-words.md` |
| Kindergarten High-Frequency Words | kindergarten-common-words | kindergarten-common-words | K | published | kindergarten-common-words-1, kindergarten-common-words-2, kindergarten-common-words-3, kindergarten-common-words-4 | `src/content/spelling-collections/kindergarten-common-words.md` |

## Common Words member sets (`spelling-lists`, sight-words category, `contentRole: sight-word-set`)


### Kindergarten (4 sets)

| Title | id | urlSlug | Status | Source file | Editorial status |
|---|---|---|---|---|---|
| Kindergarten Common Words 1 | kindergarten-common-words-1 | kindergarten-common-words-1 | published | `src/content/spelling-lists/sight-words/kindergarten-common-words-1.md` | Not audited |
| Kindergarten Common Words 2 | kindergarten-common-words-2 | kindergarten-common-words-2 | published | `src/content/spelling-lists/sight-words/kindergarten-common-words-2.md` | Not audited |
| Kindergarten Common Words 3 | kindergarten-common-words-3 | kindergarten-common-words-3 | published | `src/content/spelling-lists/sight-words/kindergarten-common-words-3.md` | Not audited |
| Kindergarten Common Words 4 | kindergarten-common-words-4 | kindergarten-common-words-4 | published | `src/content/spelling-lists/sight-words/kindergarten-common-words-4.md` | Not audited |

### Grade 1 (6 sets)

| Title | id | urlSlug | Status | Source file | Editorial status |
|---|---|---|---|---|---|
| Grade 1 Common Words 1 | grade-1-common-words-1 | grade-1-common-words-1 | published | `src/content/spelling-lists/sight-words/grade-1-common-words-1.md` | Not audited |
| Grade 1 Common Words 2 | grade-1-common-words-2 | grade-1-common-words-2 | published | `src/content/spelling-lists/sight-words/grade-1-common-words-2.md` | Not audited |
| Grade 1 Common Words 3 | grade-1-common-words-3 | grade-1-common-words-3 | published | `src/content/spelling-lists/sight-words/grade-1-common-words-3.md` | Not audited |
| Grade 1 Common Words 4 | grade-1-common-words-4 | grade-1-common-words-4 | published | `src/content/spelling-lists/sight-words/grade-1-common-words-4.md` | Not audited |
| Grade 1 Common Words 5 | grade-1-common-words-5 | grade-1-common-words-5 | published | `src/content/spelling-lists/sight-words/grade-1-common-words-5.md` | Not audited |
| Grade 1 Common Words 6 | grade-1-common-words-6 | grade-1-common-words-6 | published | `src/content/spelling-lists/sight-words/grade-1-common-words-6.md` | Not audited |

### Grade 2 (6 sets)

| Title | id | urlSlug | Status | Source file | Editorial status |
|---|---|---|---|---|---|
| Grade 2 Common Words 1 | grade-2-common-words-1 | grade-2-common-words-1 | published | `src/content/spelling-lists/sight-words/grade-2-common-words-1.md` | Not audited |
| Grade 2 Common Words 2 | grade-2-common-words-2 | grade-2-common-words-2 | published | `src/content/spelling-lists/sight-words/grade-2-common-words-2.md` | Not audited |
| Grade 2 Common Words 3 | grade-2-common-words-3 | grade-2-common-words-3 | published | `src/content/spelling-lists/sight-words/grade-2-common-words-3.md` | Not audited |
| Grade 2 Common Words 4 | grade-2-common-words-4 | grade-2-common-words-4 | published | `src/content/spelling-lists/sight-words/grade-2-common-words-4.md` | Not audited |
| Grade 2 Common Words 5 | grade-2-common-words-5 | grade-2-common-words-5 | published | `src/content/spelling-lists/sight-words/grade-2-common-words-5.md` | Not audited |
| Grade 2 Common Words 6 | grade-2-common-words-6 | grade-2-common-words-6 | published | `src/content/spelling-lists/sight-words/grade-2-common-words-6.md` | Not audited |

### Grade 3 (5 sets)

| Title | id | urlSlug | Status | Source file | Editorial status |
|---|---|---|---|---|---|
| Grade 3 Common Words 1 | grade-3-common-words-1 | grade-3-common-words-1 | published | `src/content/spelling-lists/sight-words/grade-3-common-words-1.md` | Not audited |
| Grade 3 Common Words 2 | grade-3-common-words-2 | grade-3-common-words-2 | published | `src/content/spelling-lists/sight-words/grade-3-common-words-2.md` | Not audited |
| Grade 3 Common Words 3 | grade-3-common-words-3 | grade-3-common-words-3 | published | `src/content/spelling-lists/sight-words/grade-3-common-words-3.md` | Not audited |
| Grade 3 Common Words 4 | grade-3-common-words-4 | grade-3-common-words-4 | published | `src/content/spelling-lists/sight-words/grade-3-common-words-4.md` | Not audited |
| Grade 3 Common Words 5 | grade-3-common-words-5 | grade-3-common-words-5 | published | `src/content/spelling-lists/sight-words/grade-3-common-words-5.md` | Not audited |

### Grade 4 (4 sets)

| Title | id | urlSlug | Status | Source file | Editorial status |
|---|---|---|---|---|---|
| Grade 4 Common Words 1 | grade-4-common-words-1 | grade-4-common-words-1 | published | `src/content/spelling-lists/sight-words/grade-4-common-words-1.md` | Not audited |
| Grade 4 Common Words 2 | grade-4-common-words-2 | grade-4-common-words-2 | published | `src/content/spelling-lists/sight-words/grade-4-common-words-2.md` | Not audited |
| Grade 4 Common Words 3 | grade-4-common-words-3 | grade-4-common-words-3 | published | `src/content/spelling-lists/sight-words/grade-4-common-words-3.md` | Not audited |
| Grade 4 Common Words 4 | grade-4-common-words-4 | grade-4-common-words-4 | published | `src/content/spelling-lists/sight-words/grade-4-common-words-4.md` | Not audited |

### Grade 5 (4 sets)

| Title | id | urlSlug | Status | Source file | Editorial status |
|---|---|---|---|---|---|
| Grade 5 Common Words 1 | grade-5-common-words-1 | grade-5-common-words-1 | published | `src/content/spelling-lists/sight-words/grade-5-common-words-1.md` | Not audited |
| Grade 5 Common Words 2 | grade-5-common-words-2 | grade-5-common-words-2 | published | `src/content/spelling-lists/sight-words/grade-5-common-words-2.md` | Not audited |
| Grade 5 Common Words 3 | grade-5-common-words-3 | grade-5-common-words-3 | published | `src/content/spelling-lists/sight-words/grade-5-common-words-3.md` | Not audited |
| Grade 5 Common Words 4 | grade-5-common-words-4 | grade-5-common-words-4 | published | `src/content/spelling-lists/sight-words/grade-5-common-words-4.md` | Not audited |

## Dolch tier gateway pages (`spelling-collections`, legacy sight-word ladder)

These are **not** part of the frozen Common Words (High-Frequency Words) system defined in `K5_FINAL_CONTENT_ARCHITECTURE.md` — they predate it (see the older `docs/LIST_SPECIFICATIONS.md` / `docs/LIBRARY_ROADMAP.md` Dolch-ladder model flagged in the main roadmap as a stale/conflicting document set). They are live, published content that must still be accounted for; their long-term relationship to the Common Words system is a product decision **not** made by this roadmap.

| Title | id | urlSlug | Grade | Status | Member listIds | Source file |
|---|---|---|---|---|---|---|
| Dolch First Grade Sight Words | dolch-first-grade | dolch-first-grade-sight-words | 1 | published | dolch-first-grade-a, dolch-first-grade-b, dolch-first-grade-c | `src/content/spelling-collections/dolch-first-grade.md` |
| Dolch Noun Words | dolch-nouns | dolch-noun-words | — | published | dolch-nouns-a, dolch-nouns-b, dolch-nouns-c, dolch-nouns-d, dolch-nouns-e, dolch-nouns-f, dolch-nouns-g | `src/content/spelling-collections/dolch-nouns.md` |
| Dolch Pre-Primer Sight Words | dolch-pre-primer | dolch-pre-primer-sight-words | K | published | dolch-pre-primer-a, dolch-pre-primer-b, dolch-pre-primer-c | `src/content/spelling-collections/dolch-pre-primer.md` |
| Dolch Primer Sight Words | dolch-primer | dolch-primer-sight-words | 1 | published | dolch-primer-a, dolch-primer-b, dolch-primer-c, dolch-primer-d | `src/content/spelling-collections/dolch-primer.md` |
| Dolch Second Grade Sight Words | dolch-second-grade | dolch-second-grade-sight-words | 2 | published | dolch-second-grade-a, dolch-second-grade-b, dolch-second-grade-c, dolch-second-grade-d | `src/content/spelling-collections/dolch-second-grade.md` |
| Dolch Third Grade Sight Words | dolch-third-grade | dolch-third-grade-sight-words | 3 | published | dolch-third-grade-a, dolch-third-grade-b, dolch-third-grade-c | `src/content/spelling-collections/dolch-third-grade.md` |

## Dolch tier member sets and other untagged sight-words files

All 40 files below are in `src/content/spelling-lists/sight-words/` but currently have **no `contentRole` set** in frontmatter (not inferred here — see `untagged-and-data-quality.md` for the full triage list). Included here because their filenames/collection membership make their sight-word role unambiguous, even though the field itself is empty.

| Title | id | urlSlug | Grade | Status | Source file |
|---|---|---|---|---|---|
| Dolch Noun Words | dolch-nouns | dolch-noun-words | — | published | `src/content/spelling-collections/dolch-nouns.md` |
| Dolch Noun Words — Part A | dolch-nouns-a | dolch-nouns-a-sight-words | — | published | `src/content/spelling-lists/sight-words/dolch-nouns-a.md` |
| Dolch Noun Words — Part B | dolch-nouns-b | dolch-nouns-b-sight-words | — | published | `src/content/spelling-lists/sight-words/dolch-nouns-b.md` |
| Dolch Noun Words — Part C | dolch-nouns-c | dolch-nouns-c-sight-words | — | published | `src/content/spelling-lists/sight-words/dolch-nouns-c.md` |
| Dolch Noun Words — Part D | dolch-nouns-d | dolch-nouns-d-sight-words | — | published | `src/content/spelling-lists/sight-words/dolch-nouns-d.md` |
| Dolch Noun Words — Part E | dolch-nouns-e | dolch-nouns-e-sight-words | — | published | `src/content/spelling-lists/sight-words/dolch-nouns-e.md` |
| Dolch Noun Words — Part F | dolch-nouns-f | dolch-nouns-f-sight-words | — | published | `src/content/spelling-lists/sight-words/dolch-nouns-f.md` |
| Dolch Noun Words — Part G | dolch-nouns-g | dolch-nouns-g-sight-words | — | published | `src/content/spelling-lists/sight-words/dolch-nouns-g.md` |
| Dolch First Grade Sight Words | dolch-first-grade | dolch-first-grade-sight-words | 1 | published | `src/content/spelling-collections/dolch-first-grade.md` |
| Dolch Primer Sight Words | dolch-primer | dolch-primer-sight-words | 1 | published | `src/content/spelling-collections/dolch-primer.md` |
| Grade 1 Common Words | grade-1-common-words | grade-1-common-words | 1 | published | `src/content/spelling-collections/grade-1-common-words.md` |
| Dolch Primer Sight Words — Part A | dolch-primer-a | dolch-primer-a-sight-words | 1 | published | `src/content/spelling-lists/sight-words/dolch-primer-a.md` |
| Dolch Primer Sight Words — Part B | dolch-primer-b | dolch-primer-b-sight-words | 1 | published | `src/content/spelling-lists/sight-words/dolch-primer-b.md` |
| Dolch Primer Sight Words — Part C | dolch-primer-c | dolch-primer-c-sight-words | 1 | published | `src/content/spelling-lists/sight-words/dolch-primer-c.md` |
| Dolch Primer Sight Words — Part D | dolch-primer-d | dolch-primer-d-sight-words | 1 | published | `src/content/spelling-lists/sight-words/dolch-primer-d.md` |
| Dolch First Grade Sight Words — Part A | dolch-first-grade-a | dolch-first-grade-a-sight-words | 1 | published | `src/content/spelling-lists/sight-words/dolch-first-grade-a.md` |
| Dolch First Grade Sight Words — Part B | dolch-first-grade-b | dolch-first-grade-b-sight-words | 1 | published | `src/content/spelling-lists/sight-words/dolch-first-grade-b.md` |
| Dolch First Grade Sight Words — Part C | dolch-first-grade-c | dolch-first-grade-c-sight-words | 1 | published | `src/content/spelling-lists/sight-words/dolch-first-grade-c.md` |
| First Grade Heart Words Part 1 | grade-1-heart-words-part-1 | 1st-grade-heart-words-part-1 | 1 | published | `src/content/spelling-lists/sight-words/grade-1-heart-words-part-1.md` |
| First Grade Heart Words Part 2 | grade-1-heart-words-part-2 | 1st-grade-heart-words-part-2 | 1 | published | `src/content/spelling-lists/sight-words/grade-1-heart-words-part-2.md` |
| First Grade Heart Words Part 3 | grade-1-heart-words-part-3 | 1st-grade-heart-words-part-3 | 1 | published | `src/content/spelling-lists/sight-words/grade-1-heart-words-part-3.md` |
| Dolch Second Grade Sight Words | dolch-second-grade | dolch-second-grade-sight-words | 2 | published | `src/content/spelling-collections/dolch-second-grade.md` |
| Grade 2 Common Words | grade-2-common-words | grade-2-common-words | 2 | published | `src/content/spelling-collections/grade-2-common-words.md` |
| Dolch Second Grade Sight Words — Part A | dolch-second-grade-a | dolch-second-grade-a-sight-words | 2 | published | `src/content/spelling-lists/sight-words/dolch-second-grade-a.md` |
| Dolch Second Grade Sight Words — Part B | dolch-second-grade-b | dolch-second-grade-b-sight-words | 2 | published | `src/content/spelling-lists/sight-words/dolch-second-grade-b.md` |
| Dolch Second Grade Sight Words — Part C | dolch-second-grade-c | dolch-second-grade-c-sight-words | 2 | published | `src/content/spelling-lists/sight-words/dolch-second-grade-c.md` |
| Dolch Second Grade Sight Words — Part D | dolch-second-grade-d | dolch-second-grade-d-sight-words | 2 | published | `src/content/spelling-lists/sight-words/dolch-second-grade-d.md` |
| Dolch Third Grade Sight Words | dolch-third-grade | dolch-third-grade-sight-words | 3 | published | `src/content/spelling-collections/dolch-third-grade.md` |
| Grade 3 Common Words | grade-3-common-words | grade-3-common-words | 3 | published | `src/content/spelling-collections/grade-3-common-words.md` |
| Dolch Third Grade Sight Words — Part A | dolch-third-grade-a | dolch-third-grade-a-sight-words | 3 | published | `src/content/spelling-lists/sight-words/dolch-third-grade-a.md` |
| Dolch Third Grade Sight Words — Part B | dolch-third-grade-b | dolch-third-grade-b-sight-words | 3 | published | `src/content/spelling-lists/sight-words/dolch-third-grade-b.md` |
| Dolch Third Grade Sight Words — Part C | dolch-third-grade-c | dolch-third-grade-c-sight-words | 3 | published | `src/content/spelling-lists/sight-words/dolch-third-grade-c.md` |
| Grade 4 Common Words | grade-4-common-words | grade-4-common-words | 4 | published | `src/content/spelling-collections/grade-4-common-words.md` |
| Grade 5 Common Words | grade-5-common-words | grade-5-common-words | 5 | published | `src/content/spelling-collections/grade-5-common-words.md` |
| Dolch Pre-Primer Sight Words | dolch-pre-primer | dolch-pre-primer-sight-words | K | published | `src/content/spelling-collections/dolch-pre-primer.md` |
| Kindergarten High-Frequency Words | kindergarten-common-words | kindergarten-common-words | K | published | `src/content/spelling-collections/kindergarten-common-words.md` |
| Dolch Pre-Primer Sight Words — Part A | dolch-pre-primer-a | dolch-pre-primer-a-sight-words | K | published | `src/content/spelling-lists/sight-words/dolch-pre-primer-a.md` |
| Dolch Pre-Primer Sight Words — Part B | dolch-pre-primer-b | dolch-pre-primer-b-sight-words | K | published | `src/content/spelling-lists/sight-words/dolch-pre-primer-b.md` |
| Dolch Pre-Primer Sight Words — Part C | dolch-pre-primer-c | dolch-pre-primer-c-sight-words | K | published | `src/content/spelling-lists/sight-words/dolch-pre-primer-c.md` |
| Kindergarten Heart Words | kindergarten-heart-words | kindergarten-heart-words | K | published | `src/content/spelling-lists/sight-words/kindergarten-heart-words.md` |

---
**Totals:** Common Words gateways: 6 · Common Words member sets: 29 · Dolch gateways: 6 · Dolch/other untagged sight-word files: 40.

