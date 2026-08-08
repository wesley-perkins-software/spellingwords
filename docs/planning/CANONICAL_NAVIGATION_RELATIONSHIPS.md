

> **August 2026 HFW supersession:** The executable HFW navigation now contains 27 grade-contained pages in a 4/7/7/5/2/2 distribution. `src/lib/content/hfWordsCurriculum.ts` owns set membership and `hfWordsSequence.ts` derives navigation order. Older 29-page endpoint tables below are historical.
> **Non-Core navigation finalized (August 2026).** The live canonical route manifest and Grade Hub membership classify pages. Core Spelling remains the continuous 51-page Review first / Next step sequence with no Explore more. The 27 High-Frequency Words pages use `HF_WORDS_SEQUENCES`: six independent grade-contained collections whose Explore more cards are previous set then next set (one card at grade endpoints, two in the middle). The 27 Additional Practice pages use the explicit, rationale-bearing `ADDITIONAL_PRACTICE_EXPLORE_MORE` matrix and show exactly three ordered, same-grade Additional Practice peers. Neither non-Core model reads `relatedLists`; legacy values on those 56 entries were emptied.
>
> All three types use **Where to go from here**. Non-Core pages use **Explore more** only—never Review first or Next step. This section contains no Grade Hub card and no cross-type or cross-grade recommendation. Relationship cards use the destination's exact canonical title, with grade and word count as separate metadata. A future **Continue exploring** grade-orientation section is separate and deferred. Historical audit tables below record prior state and are superseded where they conflict with this final rule.
> **Implementation status: Core Spelling navigation finalized.** Core Spelling uses one continuous 51-page K–5 chain. Its bottom navigation is derived only from `CORE_SPELLING_SEQUENCE`: the previous item is **Review first**, the next item is **Next step**, and **Explore more is never rendered**. Only `kindergarten-first-words` lacks Review first; only `grade-5-spelling-changes-related-words` lacks Next step. High-Frequency Words and Additional Practice now use the finalized non-Core models summarized above.
>
> Three corrections were made during implementation that this document's body does not yet reflect inline (kept here rather than silently rewriting the historical record above):
>
> 1. **Additional Practice matrix was significantly incomplete.** §2's Additional Practice tables below were built from `K5_FINAL_CONTENT_ARCHITECTURE.md`'s stated page lists, which turned out to be stale against `src/lib/content/gradeHubCards.ts` (the live hub registration) for every grade except Grade 3 — the same class of doc/code drift as Blocker 3. The live hub has 27 Additional Practice pages across K–5, not the 16 originally evaluated below (missing, per grade: K — `kindergarten-body-words`, `kindergarten-family-words`; Grade 1 — `grade-1-weather-words`, `grade-1-clothing-words`, `grade-1-shape-words` (and `grade-1-five-senses-words`, referenced below, is **not** actually hub-registered); Grade 2 — `grade-2-transportation-words`, `grade-2-community-helpers`; Grade 4 — `grade-4-solar-system-words`, `grade-4-career-occupation-words`, `grade-4-geometry-words`; Grade 5 — `grade-5-ecosystem-environment-words`, `grade-5-fraction-decimal-words`). This historical audit was superseded by the explicit 27-row `ADDITIONAL_PRACTICE_EXPLORE_MORE` model; canonical-route classification and that reviewed map are now authoritative, while non-Core `relatedLists` values are empty.
> 2. **`KINDERGARTEN_CORE_IDS` was trimmed in place, not removed.** §3a-arch and §3b item 6 below assumed this array could be fully superseded by `coreSpellingSequence.ts`. It can't be removed: it also drives an unrelated, pre-existing "Kindergarten spelling · Step N of M" badge feature (`getKindergartenRoadmapPosition`) that this review does not own. The array was trimmed from 10 to 8 entries (dropping `kindergarten-ck-ending-words` and `kindergarten-double-consonants`, the resolved part of Blocker 5) and left in place, now numerically identical to `coreSpellingSequence.ts`'s Kindergarten portion.
> 3. **Two pre-existing broken links were fixed as part of this implementation**, discovered via the new deprecated-id validation test: `kindergarten-ck-ending-words` and `kindergarten-double-consonants` had `relatedLists` pointing into the deprecated/legacy bucket (`c-k-ck-words`, `kindergarten-heart-words`). Both were cleared to `[]`.
>
> Shipped code: `src/lib/content/coreSpellingSequence.ts`, `src/lib/content/hfWordsSequence.ts`, `src/lib/content/navigationSequence.ts` (+ `.test.ts`), `src/lib/content/relatedListsValidation.test.ts`. Decision B (`KINDERGARTEN_ADDITIONAL_IDS` reconciliation) remains an open, separate follow-up task — not implemented here.

# Canonical Navigation Relationships — Deep Architecture Review

## Context

Phase 2 editorial work surfaced a symptom (Kindergarten Consonant Digraphs' "Next Step" pointing at the legacy "-ck Ending Rule" page) that traces back to a cause: relationship metadata (`prerequisiteLists` → "Review First", `nextLists` → "Next Step", `relatedLists` → "Explore More") was authored incrementally, page by page, while the canonical curriculum was still settling. Planning docs (`CANONICAL_CURRICULUM_IMPLEMENTATION_PLAN.md`, `CANONICAL_CURRICULUM_AUDIT.md`) already decided to demote `kindergarten-ck-ending-words` and `kindergarten-double-consonants` out of the Kindergarten core sequence, but that decision never propagated into frontmatter or `kindergartenProgression.ts`'s `KINDERGARTEN_CORE_IDS`. The curriculum and page architecture (`K5_FINAL_CONTENT_ARCHITECTURE.md`, frozen) are not in question — only the relationship *graph* laid on top of them.

## 1. Global Navigation Philosophy

**Core title contract.** The destination entry’s canonical `data.title` is used unchanged on the Grade Hub card, page H1, breadcrumb, and Review first / Next step card. Grade is separate card metadata rather than title decoration. Hub-specific wording is exceptional and must be an explicit override with a reviewed rationale; URL slugs may be shorter than the title.

**Core Spelling final rule.** The model starts from the parent's experience at the bottom of a Core page and answers only two questions:

1. **What should we review first?** (`prerequisiteLists`)
2. **What should we learn next?** (`nextLists`)
Questions 1 and 2 form a single **continuous K–5 instructional journey**, not per-grade islands. Core pages do not answer a third Explore more question in this section. Existing `relatedLists` metadata is retained because non-Core behavior is pending and other features may still use relationship data, but the Core renderer does not resolve it for bottom navigation.

### Navigation heading rename: "More Practice" → "Explore More"

The site has three curriculum *sections* — Core Spelling, High-Frequency Words, **Additional Practice** — and had a fourth navigation *heading* that collided with one of them in name only: "More Practice." That's a naming conflict, not a design conflict: the `relatedLists` heading sometimes points to an Additional Practice page, sometimes to another Core unit, sometimes to an HF set. Its job was never "practice," specifically — it's "here's something else worth your time." Renamed to **"Explore More."** This affects UI copy (`GradeUnitWorldPage.astro`, `[category]/[slug].astro`, and the heading-order test) but not the underlying field name — `relatedLists` is unchanged.

- **`prerequisiteLists` ("Review First") / `nextLists` ("Next Step")** form one directional chain answering "where am I in the K–5 journey, and what's immediately before/after this page." Must never be dangling or circular.
- **`relatedLists` ("Explore More")** answers "what else is worth doing." Every relationship must have a genuine educational rationale (see relaxed-prose rule below) — never asserted automatically from shared category, grade, or family.
- **`skillIds`** (out of scope, adjacent) is the separate "Where this fits in the curriculum" back-reference to atomic Skill pages — never duplicate a `skillIds` target into `relatedLists`.

### Relaxed prose requirement for "Explore More"

> Every `relatedLists` relationship must have a clear educational rationale. Important or non-obvious relationships should be reinforced in the page body when doing so genuinely helps the reader, but body prose is not required for every relationship.

The rationale must exist and be defensible (recorded in this matrix); it doesn't have to be spelled out in every page's copy.

### The reasonable-parent test (permanent rule, v4)

> After finishing Page A, would a typical parent naturally understand why Page B is being suggested and think, "That makes sense; this could be useful or interesting"?

The relationship must be understandable from the page titles, descriptions, and educational purpose — not from hidden data. Explore More answers **"what else might this parent or child genuinely enjoy, benefit from, or reasonably investigate from here?"** It does not answer **"what other page happens to contain one of the same words?"**

### Evidence hierarchy for Explore More

**Strong evidence** (sufficient on its own):
- A combined-roadmap sibling belonging to the same instructional milestone.
- An explicit relationship named in either page's own content.
- A clear continuation or extension of the same spelling, morphological, or usage concept (not merely a shared vocabulary word).
- A naturally useful prior-grade or later-grade version of the same concept.
- A High-Frequency Words set deliberately organized around the same spelling feature as a Core unit.
- Two Additional Practice topics that are naturally related from a parent/child exploration perspective.

**Moderate evidence** (sufficient when it clearly clears the reasonable-parent bar on its own merits):
- A vocabulary page that prominently and repeatedly reinforces a relevant concept in a way a parent would recognize on sight.
- A cross-section recommendation that clearly helps the user apply or notice what was just practiced.

**Insufficient by itself** (never creates a relationship alone, even stacked):
- One shared word. A small number of incidental shared words. Belonging to the same grade or section. A pattern appearing incidentally in one or two words. Reciprocal symmetry for its own sake. A desire to avoid an empty Explore More section.

Shared words may be *recorded* as supporting evidence once a broader relationship is already independently genuine — they just can't be the reason the relationship exists.

### Symmetry: evaluated independently per page, not forced reciprocal

`relatedLists` relationships are judged independently on each page. Reciprocal (A↔B) links are common and fine when both directions genuinely help, but symmetry is never the goal.

### Core Spelling philosophy — one continuous K–5 chain

- **Review First** = the immediately preceding Core Spelling unit in the full K–5 sequence. None only for `kindergarten-first-words`.
- **Next Step** = the immediately following Core Spelling unit in the full K–5 sequence. None only for `grade-5-spelling-changes-related-words`.

### High-Frequency Words philosophy — also one continuous K–5 chain

- **Review First** = the immediately preceding HF set. None only for `kindergarten-common-words-1`.
- **Next Step** = the immediately following HF set. None only for `grade-5-common-words-4`.

### Additional Practice philosophy — exploratory, not pattern reinforcement

Additional Practice pages are fun, curious, bounded vocabulary pages for parents and children to explore — not a disguised extension of the Core Spelling sequence.

- Never has Review First / Next Step, no exceptions.
- Never recommended merely for shared words with a Core page.
- May recommend another Additional Practice page when genuinely curious/useful (cross-grade is fine).
- A Core/HF page may link to an AP page only when it independently passes the reasonable-parent test.

### Grade-boundary transitions (Core Spelling chain)

| Grade transition | Next Step link |
|---|---|
| K → 1 | `kindergarten-consonant-digraphs` → `grade-1-cvc-short-vowels-c-k-rule` |
| 1 → 2 | `grade-1-tch-dge-ending-rules` → `vowel-teams-oi-oy` |
| 2 → 3 | `grade-2-contractions` → `grade-3-prefix-words` |
| 3 → 4 | `grade-3-root-word-families` → `grade-4-multisyllabic-academic-words` |
| 4 → 5 | `grade-4-derived-words` → `grade-5-multisyllabic-academic-words` |

### Grade-boundary transitions (High-Frequency Words chain)

| Grade transition | Next Step link |
|---|---|
| K → 1 | `kindergarten-common-words-4` → `grade-1-common-words-1` |
| 1 → 2 | `grade-1-common-words-6` → `grade-2-common-words-1` |
| 2 → 3 | `grade-2-common-words-6` → `grade-3-common-words-1` |
| 3 → 4 | `grade-3-common-words-5` → `grade-4-common-words-1` |
| 4 → 5 | `grade-4-common-words-4` → `grade-5-common-words-1` |

### Relationship constraints — permanent architectural rules

1. Only reference published, canonical, active `id`s. Never the deprecated/legacy bucket (`docs/content/inventory/deprecated-and-legacy-pages.md`).
2. `prerequisiteLists`/`nextLists` never cross a section boundary; they do cross grade boundaries within their own section, by design. `relatedLists` may cross any boundary when there's a genuine educational rationale.
3. No dangling references — enforced by `relatedListsValidation.test.ts`.
4. `prerequisiteLists`/`nextLists` must be bidirectionally consistent and non-circular — guaranteed by construction since both are derived from `coreSpellingSequence.ts`/`hfWordsSequence.ts` (see the architecture decision below), not authored per page.
5. Combined-roadmap-entry siblings never become their own hub-visible Core Spelling card or their own Review First/Next Step chain link — reachable only via `relatedLists` off their anchor page. (`grade-1-long-e-vowel-teams`, `grade-1-r-controlled-er-ir-ur`, `grade-3-doubling-final-consonants`, `grade-3-changing-y-to-i`, `tier-2-greek-latin-roots`.)
6. `kindergarten-ck-ending-words` and `kindergarten-double-consonants` are support/practice content, not Kindergarten core-sequence pages. Never in `prerequisiteLists`/`nextLists`/`coreSpellingSequence.ts`.
7. `relatedLists` entries must be de-duplicated against the derived `prerequisiteLists`/`nextLists` (`dedupeRelatedLists()`).
8. Every `relatedLists` entry must pass the reasonable-parent test.

## 2. Architecture Decision: Derive Core Review First / Next Step and Suppress Explore More

**Decision for Core Spelling: Review first / Next step are computed from `coreSpellingSequence.ts` via `getSequenceNeighbors(id)` in `navigationSequence.ts`, rather than hand-authored per-page frontmatter. The Core renderer never resolves or renders Explore more from `relatedLists`.** High-Frequency Words and Additional Practice retain their current behavior pending their own navigation passes.

Rationale: a flat ordered array makes competing predecessors and cycles structurally difficult and has exactly one first and last element. Chain integrity therefore reduces to verifying that all 51 unique IDs resolve to published canonical Core routes and that each adjacent pair resolves in both directions. Suppressing Core Explore more keeps optional, cross-section relationships out of the ordered curriculum without deleting metadata that may still be relevant outside this finalized renderer rule.

Implementation: `src/lib/content/coreSpellingSequence.ts`, `src/lib/content/hfWordsSequence.ts`, `src/lib/content/navigationSequence.ts`. `prerequisiteLists`/`nextLists` frontmatter is empty on every Core Spelling and HF Words page, enforced by a guard test in `navigationSequence.test.ts`.

## 3. Page-by-Page Relationship Matrix

Canonical, hub-visible pages per `K5_FINAL_CONTENT_ARCHITECTURE.md` and `src/lib/content/gradeHubCards.ts`. Combined-entry sibling pages and reusable Skill pages are not given independent chain rows but do appear as Explore More targets where relevant. "—" = intentionally empty.

**Review First / Next Step columns reflect `coreSpellingSequence.ts`/`hfWordsSequence.ts` exactly.** Explore More columns reflect what shipped in frontmatter at implementation time — see the Additional Practice correction noted in the status block at the top of this document for the fuller AP page set added during implementation beyond what's tabulated below.

### Kindergarten

**Core Spelling**

| Page (id) | Review First | Next Step | Explore More |
|---|---|---|---|
| `kindergarten-first-words` | — | `kindergarten-short-a-words` | `kindergarten-animal-words` |
| `kindergarten-short-a-words` | `kindergarten-first-words` | `kindergarten-short-i-words` | None |
| `kindergarten-short-i-words` | `kindergarten-short-a-words` | `kindergarten-short-o-words` | None |
| `kindergarten-short-o-words` | `kindergarten-short-i-words` | `kindergarten-short-u-words` | None |
| `kindergarten-short-u-words` | `kindergarten-short-o-words` | `kindergarten-short-e-words` | None |
| `kindergarten-short-e-words` | `kindergarten-short-u-words` | `kindergarten-mixed-vowel-review` | None |
| `kindergarten-mixed-vowel-review` | `kindergarten-short-e-words` | `kindergarten-consonant-digraphs` | `kindergarten-animal-words` |
| `kindergarten-consonant-digraphs` | `kindergarten-mixed-vowel-review` | `grade-1-cvc-short-vowels-c-k-rule` | `kindergarten-ck-ending-words`, `kindergarten-double-consonants` |

**High-Frequency Words**: `kindergarten-common-words-1..4`, chained in order, all Explore More: None.

**Additional Practice**: `kindergarten-number-words` → `grade-1-number-words-11-20`; `kindergarten-color-words` ↔ `kindergarten-animal-words`; `kindergarten-animal-words` → `kindergarten-first-words`, `kindergarten-color-words`; `kindergarten-body-words`, `kindergarten-family-words`: None.

### Grade 1

**Core Spelling**

| Page (id) | Review First | Next Step | Explore More |
|---|---|---|---|
| `grade-1-cvc-short-vowels-c-k-rule` | `kindergarten-consonant-digraphs` | `grade-1-floss-rule` | `grade-1-consonant-digraphs-final-ck` |
| `grade-1-floss-rule` | `grade-1-cvc-short-vowels-c-k-rule` | `grade-1-consonant-digraphs-final-ck` | None |
| `grade-1-consonant-digraphs-final-ck` | `grade-1-floss-rule` | `grade-1-beginning-consonant-blends` | `kindergarten-ck-ending-words`, `grade-1-cvc-short-vowels-c-k-rule` |
| `grade-1-beginning-consonant-blends` | `grade-1-consonant-digraphs-final-ck` | `grade-1-ending-consonant-blends` | None |
| `grade-1-ending-consonant-blends` | `grade-1-beginning-consonant-blends` | `grade-1-long-vowels-silent-e` | `grade-2-common-words-2` |
| `grade-1-long-vowels-silent-e` | `grade-1-ending-consonant-blends` | `grade-1-open-syllables-final-y` | None |
| `grade-1-open-syllables-final-y` | `grade-1-long-vowels-silent-e` | `grade-1-long-a-long-o-vowel-teams` | None |
| `grade-1-long-a-long-o-vowel-teams` | `grade-1-open-syllables-final-y` | `grade-1-inflectional-endings-s-es` | `grade-1-long-e-vowel-teams` |
| `grade-1-inflectional-endings-s-es` | `grade-1-long-a-long-o-vowel-teams` | `grade-1-inflectional-endings-ed-ing` | None |
| `grade-1-inflectional-endings-ed-ing` | `grade-1-inflectional-endings-s-es` | `grade-1-r-controlled-ar-or` | None |
| `grade-1-r-controlled-ar-or` | `grade-1-inflectional-endings-ed-ing` | `grade-1-tch-dge-ending-rules` | `grade-1-r-controlled-er-ir-ur`, `grade-1-common-words-3` |
| `grade-1-tch-dge-ending-rules` | `grade-1-r-controlled-ar-or` | `vowel-teams-oi-oy` | None |

**High-Frequency Words**: `grade-1-common-words-1..6`, chained; `common-words-3` → `grade-1-r-controlled-ar-or`; all others None.

**Additional Practice**: `grade-1-weather-words` ↔ `grade-1-clothing-words`; `grade-1-shape-words`: None; `grade-1-number-words-11-20` ↔ `kindergarten-number-words`, `grade-2-number-words-20-100`; `grade-1-days-of-the-week` ↔ `grade-2-months-of-the-year`.

### Grade 2

**Core Spelling**

| Page (id) | Review First | Next Step | Explore More |
|---|---|---|---|
| `vowel-teams-oi-oy` | `grade-1-tch-dge-ending-rules` | `vowel-teams-ou-ow` | None |
| `vowel-teams-ou-ow` | `vowel-teams-oi-oy` | `grade-2-oo-two-sounds` | None |
| `grade-2-oo-two-sounds` | `vowel-teams-ou-ow` | `grade-2-au-aw-words` | `grade-2-common-words-1`, `grade-2-common-words-3` |
| `grade-2-au-aw-words` | `grade-2-oo-two-sounds` | `grade-2-soft-c-soft-g` | `grade-2-common-words-1`, `-5`, `-6` |
| `grade-2-soft-c-soft-g` | `grade-2-au-aw-words` | `grade-2-two-syllable-words` | `grade-2-common-words-3` |
| `grade-2-two-syllable-words` | `grade-2-soft-c-soft-g` | `grade-2-final-stable-le` | None |
| `grade-2-final-stable-le` | `grade-2-two-syllable-words` | `grade-2-silent-letter-words` | None |
| `grade-2-silent-letter-words` | `grade-2-final-stable-le` | `grade-2-list-02` | `grade-4-common-words-1`, `grade-5-common-words-1` |
| `grade-2-list-02` (Compound Words) | `grade-2-silent-letter-words` | `grade-2-contractions` | None |
| `grade-2-contractions` | `grade-2-list-02` | `grade-3-prefix-words` | `grade-3-homophones` |

**High-Frequency Words**: `grade-2-common-words-1` → `grade-2-oo-two-sounds`, `grade-2-au-aw-words`; `-2` → `grade-1-ending-consonant-blends`; `-3` → `grade-2-soft-c-soft-g`, `grade-2-oo-two-sounds`; `-4`: None; `-5`, `-6` → `grade-2-au-aw-words`.

**Additional Practice**: `grade-2-transportation-words`, `grade-2-community-helpers`: None; `grade-2-money-words` ↔ `grade-2-number-words-20-100` (also ↔ `grade-1-number-words-11-20`); `grade-2-months-of-the-year` ↔ `grade-1-days-of-the-week`.

### Grade 3

**Core Spelling**

| Page (id) | Review First | Next Step | Explore More |
|---|---|---|---|
| `grade-3-prefix-words` | `grade-2-contractions` | `grade-3-suffix-words` | `grade-4-advanced-prefixes` |
| `grade-3-suffix-words` | `grade-3-prefix-words` | `grade-3-suffix-spelling-changes` | `grade-4-advanced-suffixes` |
| `grade-3-suffix-spelling-changes` | `grade-3-suffix-words` | `grade-3-possessives` | — |
| `grade-3-possessives` | `grade-3-suffix-spelling-changes` | `grade-3-multisyllabic-words` | `grade-2-contractions`, `grade-3-homophones` |
| `grade-3-multisyllabic-words` | `grade-3-possessives` | `grade-3-homophones` | None |
| `grade-3-homophones` | `grade-3-multisyllabic-words` | `grade-3-root-word-families` | `grade-3-possessives` |
| `grade-3-root-word-families` | `grade-3-homophones` | `grade-4-multisyllabic-academic-words` | `tier-1-roots-and-patterns` |

**High-Frequency Words**: `grade-3-common-words-1..5`, chained, all Explore More: None.

**Additional Practice** (ratified canonical, four live pages): `grade-3-map-globe-words`, `grade-3-life-cycle-words`, `grade-3-time-words`, `grade-3-multiplication-division-words` — all Explore More: None.

### Grade 4

**Core Spelling — current derived navigation**

The executable `CORE_SPELLING_SEQUENCE` is authoritative. Core pages render Review first and Next step only; former `relatedLists`/Explore More relationships in earlier reviews are not part of the current navigation model.

| Page (id) | Review First | Next Step |
|---|---|---|
| `grade-4-multisyllabic-academic-words` | `grade-3-root-word-families` | `grade-4-advanced-prefixes` |
| `grade-4-advanced-prefixes` | `grade-4-multisyllabic-academic-words` | `grade-4-advanced-suffixes` |
| `grade-4-advanced-suffixes` | `grade-4-advanced-prefixes` | `tier-1-roots-and-patterns` |
| `tier-1-roots-and-patterns` | `grade-4-advanced-suffixes` | `grade-4-commonly-confused-words` |
| `grade-4-commonly-confused-words` | `tier-1-roots-and-patterns` | `grade-4-derived-words` |
| `grade-4-derived-words` | `grade-4-commonly-confused-words` | `grade-5-multisyllabic-academic-words` |

**High-Frequency Words**: `-1` → `grade-2-silent-letter-words`; `-2` → `grade-3-doubling-final-consonants`; `-3`: None; `-4` → `grade-4-commonly-confused-words`.

**Additional Practice**: `grade-4-measurement-words` ↔ `grade-4-geometry-words`; `grade-4-solar-system-words`, `grade-4-career-occupation-words`: None.

### Grade 5

**Core Spelling — current derived navigation**

The executable `CORE_SPELLING_SEQUENCE` is authoritative. Core pages render Review first and Next step only; `relatedLists` metadata does not produce a Core Explore more section.

| Page (id) | Review First | Next Step |
|---|---|---|
| `grade-5-multisyllabic-academic-words` | `grade-4-derived-words` | `grade-5-prefix-suffix-words` |
| `grade-5-prefix-suffix-words` | `grade-5-multisyllabic-academic-words` | `grade-5-greek-latin-word-parts` |
| `grade-5-greek-latin-word-parts` | `grade-5-prefix-suffix-words` | `grade-5-commonly-confused-words` |
| `grade-5-commonly-confused-words` | `grade-5-greek-latin-word-parts` | `grade-5-spelling-changes-related-words` |
| `grade-5-spelling-changes-related-words` | `grade-5-commonly-confused-words` | — (K–5 terminal page) |

**High-Frequency Words**: `-1` → `grade-2-silent-letter-words`; `-2` → `grade-3-doubling-final-consonants`; `-3`, `-4`: None.

**Additional Practice**: `grade-5-money-management-words` ↔ `grade-5-community-civics-words`; `grade-5-ecosystem-environment-words`, `grade-5-fraction-decimal-words`: None.

## 4. Tests and Validation

- `navigationSequence.test.ts` — sequence array integrity/completeness, neighbor resolution, grade-boundary crossing, frontmatter guard (prerequisiteLists/nextLists empty on Core/HF pages).
- `relatedListsValidation.test.ts` — relatedLists reference resolution across all published entries, deprecated/legacy-id exclusion, the named `silent-e-long-e` regression check.
- `relatedListsOrder.test.ts` — Review First → Next Step → Explore More heading order.
- `kindergartenProgression.test.ts` — `KINDERGARTEN_CORE_IDS` stays at 8 canonical entries, excludes `kindergarten-ck-ending-words`/`kindergarten-double-consonants`.

## 5. Open Follow-Up (not implemented here)

**Decision B — deferred.** `KINDERGARTEN_ADDITIONAL_IDS` in `kindergartenProgression.ts` drives a live prev/next chain and "Step N of M" badge but doesn't match the Kindergarten hub's actual 5 Additional Practice cards, includes `kindergarten-heart-words` (arguably belongs with High-Frequency Words), and includes `kindergarten-number-color-words` (flagged elsewhere for removal). This is legacy cleanup unrelated to the Review First/Next Step/Explore More graph and should be scoped as its own task.
