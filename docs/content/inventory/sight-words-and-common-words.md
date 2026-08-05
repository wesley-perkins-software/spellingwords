# Inventory: Common Words (High-Frequency Words) — Canonical Active

> URL architecture update: canonical K–5 Grade Hub and Grade Hub card URLs now use the flat no-trailing-slash `/{grade}/{page-slug}` structure. The runtime source of truth is `src/lib/content/canonicalGradeRoutes.ts`; see `docs/content/inventory/grade-url-migration-map.md` for the generated migration map. Historical `/spelling-lists/...` canonical curriculum URLs redirect directly to the new paths.


Linked from `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`. This is the Common Words / High-Frequency Words layer defined by `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md` and confirmed wired into each Grade Hub's High-Frequency Words section via `src/lib/content/gradeHubCards.ts`.

**The legacy Dolch tier is a separate, out-of-scope system and is not inventoried here.** `docs/architecture/PUBLIC_URL_ARCHITECTURE.md` explicitly names Dolch as legacy Sight Words, distinct from this architecture-defined Common Words system; see `docs/content/inventory/deprecated-and-legacy-pages.md`.


## Common Words gateway pages (`spelling-collections`)

| Title | id | urlSlug | Grade | Status | Member listIds | Source file |
|---|---|---|---|---|---|---|
| Grade 1 Common Words | grade-1-common-words | grade-1-common-words | 1 | published | grade-1-common-words-1, grade-1-common-words-2, grade-1-common-words-3, grade-1-common-words-4, grade-1-common-words-5, grade-1-common-words-6 | `src/content/spelling-collections/grade-1-common-words.md` |
| Grade 2 Common Words | grade-2-common-words | grade-2-common-words | 2 | published | grade-2-common-words-1, grade-2-common-words-2, grade-2-common-words-3, grade-2-common-words-4, grade-2-common-words-5, grade-2-common-words-6 | `src/content/spelling-collections/grade-2-common-words.md` |
| Grade 3 Common Words | grade-3-common-words | grade-3-common-words | 3 | published | grade-3-common-words-1, grade-3-common-words-2, grade-3-common-words-3, grade-3-common-words-4, grade-3-common-words-5 | `src/content/spelling-collections/grade-3-common-words.md` |
| Grade 4 Common Words | grade-4-common-words | grade-4-common-words | 4 | published | grade-4-common-words-1, grade-4-common-words-2, grade-4-common-words-3, grade-4-common-words-4 | `src/content/spelling-collections/grade-4-common-words.md` |
| Grade 5 Common Words | grade-5-common-words | grade-5-common-words | 5 | published | grade-5-common-words-1, grade-5-common-words-2, grade-5-common-words-3, grade-5-common-words-4 | `src/content/spelling-collections/grade-5-common-words.md` |
| Kindergarten High-Frequency Words | kindergarten-common-words | kindergarten-common-words | K | published | kindergarten-common-words-1, kindergarten-common-words-2, kindergarten-common-words-3, kindergarten-common-words-4 | `src/content/spelling-collections/kindergarten-common-words.md` |

## Common Words member sets (`contentRole: sight-word-set`)


### Kindergarten (4 sets)

| Title | id | urlSlug | Status | Source file | Editorial status |
|---|---|---|---|---|---|
| Kindergarten Common Words 1 | kindergarten-common-words-1 | kindergarten-common-words-1 | published | `src/content/kindergarten/high-frequency-words-1.md` | Not audited |
| Kindergarten Common Words 2 | kindergarten-common-words-2 | kindergarten-common-words-2 | published | `src/content/kindergarten/high-frequency-words-2.md` | Not audited |
| Kindergarten Common Words 3 | kindergarten-common-words-3 | kindergarten-common-words-3 | published | `src/content/kindergarten/high-frequency-words-3.md` | Not audited |
| Kindergarten Common Words 4 | kindergarten-common-words-4 | kindergarten-common-words-4 | published | `src/content/kindergarten/high-frequency-words-4.md` | Not audited |

### Grade 1 (6 sets)

| Title | id | urlSlug | Status | Source file | Editorial status |
|---|---|---|---|---|---|
| Grade 1 Common Words 1 | grade-1-common-words-1 | grade-1-common-words-1 | published | `src/content/1st-grade/high-frequency-words-1.md` | Not audited |
| Grade 1 Common Words 2 | grade-1-common-words-2 | grade-1-common-words-2 | published | `src/content/1st-grade/high-frequency-words-2.md` | Not audited |
| Grade 1 Common Words 3 | grade-1-common-words-3 | grade-1-common-words-3 | published | `src/content/1st-grade/high-frequency-words-3.md` | Not audited |
| Grade 1 Common Words 4 | grade-1-common-words-4 | grade-1-common-words-4 | published | `src/content/1st-grade/high-frequency-words-4.md` | Not audited |
| Grade 1 Common Words 5 | grade-1-common-words-5 | grade-1-common-words-5 | published | `src/content/1st-grade/high-frequency-words-5.md` | Not audited |
| Grade 1 Common Words 6 | grade-1-common-words-6 | grade-1-common-words-6 | published | `src/content/1st-grade/high-frequency-words-6.md` | Not audited |

### Grade 2 (6 sets)

| Title | id | urlSlug | Status | Source file | Editorial status |
|---|---|---|---|---|---|
| Grade 2 Common Words 1 | grade-2-common-words-1 | grade-2-common-words-1 | published | `src/content/2nd-grade/high-frequency-words-1.md` | Not audited |
| Grade 2 Common Words 2 | grade-2-common-words-2 | grade-2-common-words-2 | published | `src/content/2nd-grade/high-frequency-words-2.md` | Not audited |
| Grade 2 Common Words 3 | grade-2-common-words-3 | grade-2-common-words-3 | published | `src/content/2nd-grade/high-frequency-words-3.md` | Not audited |
| Grade 2 Common Words 4 | grade-2-common-words-4 | grade-2-common-words-4 | published | `src/content/2nd-grade/high-frequency-words-4.md` | Not audited |
| Grade 2 Common Words 5 | grade-2-common-words-5 | grade-2-common-words-5 | published | `src/content/2nd-grade/high-frequency-words-5.md` | Not audited |
| Grade 2 Common Words 6 | grade-2-common-words-6 | grade-2-common-words-6 | published | `src/content/2nd-grade/high-frequency-words-6.md` | Not audited |

### Grade 3 (5 sets)

| Title | id | urlSlug | Status | Source file | Editorial status |
|---|---|---|---|---|---|
| Grade 3 Common Words 1 | grade-3-common-words-1 | grade-3-common-words-1 | published | `src/content/3rd-grade/high-frequency-words-1.md` | Not audited |
| Grade 3 Common Words 2 | grade-3-common-words-2 | grade-3-common-words-2 | published | `src/content/3rd-grade/high-frequency-words-2.md` | Not audited |
| Grade 3 Common Words 3 | grade-3-common-words-3 | grade-3-common-words-3 | published | `src/content/3rd-grade/high-frequency-words-3.md` | Not audited |
| Grade 3 Common Words 4 | grade-3-common-words-4 | grade-3-common-words-4 | published | `src/content/3rd-grade/high-frequency-words-4.md` | Not audited |
| Grade 3 Common Words 5 | grade-3-common-words-5 | grade-3-common-words-5 | published | `src/content/3rd-grade/high-frequency-words-5.md` | Not audited |

### Grade 4 (4 sets)

| Title | id | urlSlug | Status | Source file | Editorial status |
|---|---|---|---|---|---|
| Grade 4 Common Words 1 | grade-4-common-words-1 | grade-4-common-words-1 | published | `src/content/4th-grade/high-frequency-words-1.md` | Not audited |
| Grade 4 Common Words 2 | grade-4-common-words-2 | grade-4-common-words-2 | published | `src/content/4th-grade/high-frequency-words-2.md` | Not audited |
| Grade 4 Common Words 3 | grade-4-common-words-3 | grade-4-common-words-3 | published | `src/content/4th-grade/high-frequency-words-3.md` | Not audited |
| Grade 4 Common Words 4 | grade-4-common-words-4 | grade-4-common-words-4 | published | `src/content/4th-grade/high-frequency-words-4.md` | Not audited |

### Grade 5 (4 sets)

| Title | id | urlSlug | Status | Source file | Editorial status |
|---|---|---|---|---|---|
| Grade 5 Common Words 1 | grade-5-common-words-1 | grade-5-common-words-1 | published | `src/content/5th-grade/high-frequency-words-1.md` | Not audited |
| Grade 5 Common Words 2 | grade-5-common-words-2 | grade-5-common-words-2 | published | `src/content/5th-grade/high-frequency-words-2.md` | Not audited |
| Grade 5 Common Words 3 | grade-5-common-words-3 | grade-5-common-words-3 | published | `src/content/5th-grade/high-frequency-words-3.md` | Not audited |
| Grade 5 Common Words 4 | grade-5-common-words-4 | grade-5-common-words-4 | published | `src/content/5th-grade/high-frequency-words-4.md` | Not audited |

---
**Totals:** 6 Common Words gateway pages · 29 canonical-active Common Words member sets. See `deprecated-and-legacy-pages.md` for the 6 Dolch gateways and their 24 member sets, which are out of scope.

