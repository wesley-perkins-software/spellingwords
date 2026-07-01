# Phase 2 Curriculum Audit — Findings Report

**Status:** Fact-finding only. This report does **not** alter `curriculum-bible.md` curriculum decisions (per explicit direction, fact-gathering and editorial decision-making are kept separate). The Bible's Running Progress Map is updated only to mark the audit task complete and link here.

**Date:** 2026-06-29
**Scope:** Every file under `src/content/spelling-lists/{challenge,grade-level,phonics,sight-words}/`, plus `src/data/fixtures/sampleLists.ts` and `src/content/spelling-collections/`. Frontmatter was read directly from source (not summarized secondhand) to guarantee accuracy.

---

## 0. Headline Finding: List-Count Discrepancy

The Bible's §6 Current Library Snapshot states **76 total lists**. The verified count is **82 markdown lists**:

| Category | Bible §6 Count | Verified Count | Delta |
|---|---|---|---|
| `phonics/` | 44 | **50** | +6 |
| `sight-words/` | 7 | 7 | 0 |
| `grade-level/` (all grades) | 22 | 22 | 0 |
| `challenge/` | 3 | 3 | 0 |
| **Total** | **76** | **82** | **+6** |

**Confidence: High** (direct file count via `ls`, cross-checked against frontmatter dump).

The discrepancy is entirely in `phonics/`. The Bible's per-skill breakdown (digraphs, blends, etc.) was correct in substance but undercounted the **initial consonant blends** subgroup: the Bible's §7 1st-grade section says "18 lists" for initial blends and "11 lists" for final blends in its prose (18+11=29), which is consistent with what I verified — the §6 *table* total of 44 simply doesn't arithmetically match the Bible's own prose elsewhere. Likely an arithmetic slip when the snapshot table was hand-typed rather than a real data error.

There is also a non-markdown fact worth flagging: `src/data/fixtures/sampleLists.ts` contains 4 additional sample `WordList` TS objects (`grade2Essentials`, `longVowelPatterns`, `sightWords`, `petNames`) that are **not** part of the Content Collection and are not counted anywhere in the Bible. They appear to be dev/demo fixtures, not live content — confirmed by their non-conforming `category` values (`'General'`, `'Phonics'` — capitalized, not matching the `config.ts` enum) and lack of most required schema fields (`id`/`urlSlug`/`difficulty`/`status`/etc. are partly missing or use a different shape entirely). **Confidence: High** that these are dev fixtures, not undercounted production content — no action recommended beyond noting they exist.

---

## 1. Full List Inventory

Columns: **File** (path under `src/content/spelling-lists/`) · **Title** · **Current Category** · **Current Grade** · **Status** · **Rec. Primary Grade** · **Rec. Secondary Grade(s)** · **Primary Skill** · **List Type** · **Placement OK?** · **Confidence** · **Notes**

### 1.1 Challenge (3 files)

| File | Title | Category | Grade | Status | Rec. Primary | Rec. Secondary | Skill | Type | OK? | Confidence | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| challenge/tier-1-roots-and-patterns.md | Challenge Tier 1: Roots and Patterns | challenge | *(none)* | published | **4** | 5 | Latin roots (port, dict, spect, rupt) | Morphology/Roots | Partial | High | No `grade` field at all — sits outside grade hubs entirely. Content (portable, transport, dictate, predict, spectator, inspect, rupture, interrupt) matches the Bible's explicit 4th-grade root-list target checklist almost word-for-word. |
| challenge/tier-2-greek-latin-roots.md | Challenge Tier 2: Greek and Latin Roots | challenge | *(none)* | published | **4–5** | — | Greek roots (tele, photo, graph, bio, demo) | Morphology/Roots | Partial | High | Same issue — no grade tag. `prerequisiteLists` correctly chains from tier-1. Content matches Bible's 4th-grade "Greek root: graph" target item directly. |
| challenge/academic-vocabulary.md | Challenge: Academic Vocabulary | challenge | *(none)* | published | **5** | 4 (enrichment) | Tier-2 academic vocabulary | Grade Vocabulary / Challenge | Partial | Medium | No grade tag. Words (analyze, evidence, strategy, summarize...) heavily overlap with `5th-grade-academic-words` and `5th-grade-reading-writing-words` — see Duplicate Findings §3. |

### 1.2 Grade-Level (22 files)

| File | Title | Grade | Status | Rec. Primary | Rec. Secondary | Skill/Theme | Type | OK? | Confidence | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| grade-level/kindergarten-first-words.md | Kindergarten First Words | K | published | K | — | Concrete nouns (animals/nature/objects) | Theme | Yes | High | Matches Bible's K theme strategy exactly. |
| grade-level/kindergarten-number-color-words.md | Kindergarten Number and Color Words | K | published | K | — | Numbers + colors | Theme | Yes | High | Satisfies two separate Bible gap-matrix rows at once (Color words, Number words) — see §4 cross-reference. |
| grade-level/kindergarten-describing-words.md | Kindergarten Describing Words | K | published | K | — | Adjectives | Theme | Yes | High | — |
| grade-level/1st-grade-everyday-words.md | 1st Grade Everyday Words | 1 | published | 1 | — | High-frequency vocabulary | Grade Vocabulary | Yes | High | — |
| grade-level/1st-grade-action-words.md | 1st Grade Action Words | 1 | published | 1 | — | Verbs | Grade Vocabulary | Yes | High | — |
| grade-level/1st-grade-describing-words.md | 1st Grade Describing Words | 1 | published | 1 | — | Adjectives | Grade Vocabulary | Yes | High | — |
| grade-level/2nd-grade-everyday-words.md | 2nd Grade Everyday Words | 2 | published | 2 | — | High-frequency vocabulary | Grade Vocabulary | Yes | High | — |
| grade-level/2nd-grade-compound-words.md | 2nd Grade Compound Words | 2 | published | 2 | — | Compound words | Morphology (word structure) | Yes | High | This is the library's only word-structure/morphology list at grade 2 — see §5 gaps. |
| grade-level/2nd-grade-action-words.md | 2nd Grade Action Words | 2 | published | 2 | — | Verbs | Grade Vocabulary | Yes | High | — |
| grade-level/2nd-grade-describing-words.md | 2nd Grade Describing Words | 2 | published | 2 | — | Adjectives | Grade Vocabulary | Yes | High | — |
| grade-level/3rd-grade-everyday-words.md | 3rd Grade Everyday Words | 3 | published | 3 | — | High-frequency vocabulary | Grade Vocabulary | Yes | High | — |
| grade-level/3rd-grade-describing-words.md | 3rd Grade Describing Words | 3 | published | 3 | — | Adjectives | Grade Vocabulary | Yes | High | — |
| grade-level/3rd-grade-reading-writing-words.md | 3rd Grade Reading & Writing Words | 3 | published | 3 | — | ELA/academic vocabulary | Grade Vocabulary | Yes | High | — |
| grade-level/4th-grade-everyday-words.md | 4th Grade Everyday Words | 4 | published | 4 | — | High-frequency vocabulary | Grade Vocabulary | Yes | High | — |
| grade-level/4th-grade-community-words.md | 4th Grade Community Words | 4 | published | 4 | — | Civics/community vocabulary | Theme | Yes | High | — |
| grade-level/4th-grade-reading-writing-words.md | 4th Grade Reading & Writing Words | 4 | published | 4 | — | ELA/academic vocabulary | Grade Vocabulary | Yes | High | — |
| grade-level/5th-grade-everyday-words.md | 5th Grade Everyday Words | 5 | published | 5 | — | High-frequency vocabulary | Grade Vocabulary | Yes | High | — |
| grade-level/5th-grade-reading-writing-words.md | 5th Grade Reading & Writing Words | 5 | published | 5 | — | ELA/academic vocabulary | Grade Vocabulary | Yes | High | Overlaps `challenge/academic-vocabulary.md` — see §3. |
| grade-level/5th-grade-science-nature-words.md | 5th Grade Science & Nature Words | 5 | published | 5 | — | Science vocabulary | Theme | Yes | High | — |
| grade-level/5th-grade-community-civics-words.md | 5th Grade Community & Civics Words | 5 | published | 5 | — | Civics vocabulary | Theme | Yes | High | — |
| grade-level/5th-grade-academic-words.md | 5th Grade Academic Words | 5 | published | 5 | — | Academic vocabulary | Grade Vocabulary | Yes | Medium | Heavy word overlap with `challenge/academic-vocabulary.md` (shares analyze, communicate, examine, identify) — see §3. |
| grade-level/5th-grade-opinion-argument-words.md | 5th Grade Opinion & Argument Words | 5 | published | 5 | — | Argumentative/opinion writing vocabulary | Theme | Yes | High | — |

### 1.3 Phonics (50 files)

All phonics placements were checked against Bible §12 Decision Rule "phonics belongs to 1–2 grade primarily" and §4 "K–2 = phonics primary focus." All 50 carry explicit numeric grade tags (1 or 2) — none are tagged K despite the Bible's own §7 Kindergarten section suggesting K-level CVC lists might be useful (see §5 Opportunities).

| File | Title | Grade | Status | Rec. Primary | Rec. Secondary | Skill | OK? | Confidence | Notes |
|---|---|---|---|---|---|---|---|---|---|
| phonics/short-vowels-cvc-words.md | Short Vowels: CVC Words | 1 | **archived** | 1 | K (review) | Mixed short vowels, CVC | Yes (grade) / Flag (status) | Medium | Archived but `nextLists`/`relatedLists` in `silent-e-long-a.md` still reference it as a live prerequisite — see §6 Editorial Decisions. |
| phonics/short-a-words.md | Short A Words | 1 | published | 1 | K (review) | short-a CVC | Yes | High | — |
| phonics/short-e-words.md | Short E Words | 1 | published | 1 | K (review) | short-e CVC | Yes | High | — |
| phonics/short-i-words.md | Short I Words | 1 | published | 1 | K (review) | short-i CVC | Yes | High | — |
| phonics/short-o-words.md | Short O Words | 1 | published | 1 | K (review) | short-o CVC | Yes | High | — |
| phonics/short-u-words.md | Short U Words | 1 | published | 1 | K (review) | short-u CVC | Yes | High | — |
| phonics/silent-e-long-a.md | Long A Silent E Words | 2 | published | 2 | — | silent-e long-a | Yes | High | — |
| phonics/silent-e-long-i.md | Long I Silent E Words | 2 | published | 2 | — | silent-e long-i | Yes | High | — |
| phonics/silent-e-long-o.md | Long O Silent E Words | 2 | published | 2 | — | silent-e long-o | Yes | High | No silent-e long-u list exists; this is the only one missing from the trio+1 — confirms Bible gap. |
| phonics/vowel-teams-ai-ay.md | AI and AY Words | 2 | published | 2 | — | vowel teams (long-a) | Yes | High | — |
| phonics/vowel-teams-ee-ea.md | EE and EA Words | 2 | published | 2 | — | vowel teams (long-e) | Yes | High | — |
| phonics/vowel-teams-oa-ow.md | OA and OW Words | 2 | published | 2 | — | vowel teams (long-o) | Yes | High | — |
| phonics/vowel-teams-oi-oy.md | OI and OY Words | **3** | published | 2–3 | — | diphthongs | Medium | Medium | Tagged grade 3, unlike its four vowel-team siblings (all grade 2). Diphthongs are typically taught alongside other vowel teams at grade 2 per the Bible's own §7 2nd-grade "Expected Focus" list, which explicitly includes diphthongs. Possible inconsistent tagging. |
| phonics/vowel-teams-ou-ow.md | OU and OW Words | **3** | published | 2–3 | — | diphthongs | Medium | Medium | Same issue as oi-oy — tagged 3 while functionally a 2nd-grade-focus skill per Bible §7. |
| phonics/r-controlled-ar.md | R-Controlled AR Words | 2 | published | 2 | — | r-controlled vowels | Yes | High | — |
| phonics/r-controlled-or.md | R-Controlled OR Words | 2 | published | 2 | — | r-controlled vowels | Yes | High | — |
| phonics/r-controlled-er-ir-ur.md | R-Controlled ER/IR/UR Words | 2 | published | 2 | — | r-controlled vowels | Yes | High | — |
| phonics/digraph-sh-words.md | SH Digraph Words | 1 | published | 1 | — | digraphs | Yes | High | — |
| phonics/digraph-ch-words.md | CH Digraph Words | 1 | published | 1 | — | digraphs | Yes | High | — |
| phonics/digraph-th-words.md | TH Digraph Words | 1 | published | 1 | — | digraphs | Yes | High | — |
| phonics/digraph-wh-words.md | WH Digraph Words | 1 | published | 1 | — | digraphs | Yes | High | — |
| phonics/bl-blend-words.md | BL Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/br-blend-words.md | BR Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/cl-blend-words.md | CL Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/cr-blend-words.md | CR Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/dr-blend-words.md | DR Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/fl-blend-words.md | FL Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/fr-blend-words.md | FR Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/gl-blend-words.md | GL Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | Only 6 words — shortest list in library; not a placement issue, just thinly populated. |
| phonics/gr-blend-words.md | GR Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/pl-blend-words.md | PL Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/pr-blend-words.md | PR Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/sl-blend-words.md | SL Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/sm-blend-words.md | SM Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | Only 6 words. |
| phonics/sn-blend-words.md | SN Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/sp-blend-words.md | SP Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/st-blend-words.md | ST Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/sw-blend-words.md | SW Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | Only 6 words. |
| phonics/tr-blend-words.md | TR Blend Words | 1 | published | 1 | — | initial consonant blends | Yes | High | — |
| phonics/nd-final-blend-words.md | ND Final Blend Words | 1 | published | 1 | — | final consonant blends | Yes | High | — |
| phonics/ng-final-blend-words.md | NG Final Blend Words | 1 | published | 1 | — | final consonant blends | Yes | High | — |
| phonics/ld-final-blend-words.md | LD Final Blend Words | 1 | published | 1 | — | final consonant blends | Yes | High | — |
| phonics/st-final-blend-words.md | ST Final Blend Words | 1 | published | 1 | — | final consonant blends | Yes | High | id `st-final-blend-words` is distinct from `st-blend-words` (initial) — naming is clear, no real collision. |
| phonics/nt-final-blend-words.md | NT Final Blend Words | 1 | published | 1 | — | final consonant blends | Yes | High | — |
| phonics/nk-final-blend-words.md | NK Final Blend Words | 1 | published | 1 | — | final consonant blends | Yes | High | — |
| phonics/lt-final-blend-words.md | LT Final Blend Words | **2** | published | 1–2 | — | final consonant blends | Medium | Medium | Tagged grade 2 while its 6 sibling final-blend lists (nd/ng/ld/st/nt/nk) are all grade 1. |
| phonics/lk-final-blend-words.md | LK Final Blend Words | **2** | published | 1–2 | — | final consonant blends | Medium | Medium | Same inconsistency as lt. |
| phonics/mp-final-blend-words.md | MP Final Blend Words | **2** | published | 1–2 | — | final consonant blends | Medium | Medium | Same inconsistency. |
| phonics/ft-final-blend-words.md | FT Final Blend Words | **2** | published | 1–2 | — | final consonant blends | Medium | Medium | Same inconsistency. |
| phonics/sk-final-blend-words.md | SK Final Blend Words | **2** | published | 1–2 | — | final consonant blends | Medium | Medium | Same inconsistency. |

**Final-blend grade-split note (Confidence: Medium):** the 11 final-blend lists split 6-at-grade-1 (nd, ng, ld, st, nt, nk) vs. 5-at-grade-2 (lt, lk, mp, ft, sk) with no documented rationale in the Bible. This may be deliberate sequencing (simpler blends first) or an artifact of authoring order — flagged for editorial review in §6, not resolved here.

### 1.4 Sight Words (7 files)

| File | Title | Grade | Status | Rec. Primary | Rec. Secondary | Skill | OK? | Confidence | Notes |
|---|---|---|---|---|---|---|---|---|---|
| sight-words/dolch-pre-primer.md | Dolch Pre-Primer Sight Words | K | **archived** | K | — | Dolch tier 1 | Flag (status) | High | Bible §7 Kindergarten "Current Coverage" table lists this as "✅ Covered" — but it's archived, so it is **not actually live** on the site. The Bible's coverage claim is inaccurate as written. |
| sight-words/dolch-primer.md | Dolch Primer Sight Words | 1 | **archived** | 1 | K (review) | Dolch tier 2 | Flag (status) | High | Same issue — Bible §7 1st-grade narrative doesn't even mention this list, but it exists, archived. |
| sight-words/dolch-first-grade-a.md | Dolch First Grade Sight Words — Part A | 1 | published | 1 | — | Dolch tier 3 (split A) | Yes | High | Belongs to the `dolch-first-grade` collection (see `spelling-collections/`). |
| sight-words/dolch-first-grade-b.md | Dolch First Grade Sight Words — Part B | 1 | published | 1 | — | Dolch tier 3 (split B) | Yes | High | — |
| sight-words/dolch-first-grade-c.md | Dolch First Grade Sight Words — Part C | 1 | published | 1 | — | Dolch tier 3 (split C) | Yes | High | — |
| sight-words/dolch-second-grade.md | Dolch Second Grade Sight Words | 2 | **archived** | 2 | — | Dolch tier 4 | Flag (status) | High | Bible §7 2nd-grade table lists as "✅" without noting archived status. |
| sight-words/dolch-third-grade.md | Dolch Third Grade Sight Words | 3 | **archived** | 3 | — | Dolch tier 5 | Flag (status) | High | Bible §7 3rd-grade table lists as "✅ Covered" — same inaccuracy. |

**Pattern (Confidence: High):** every Dolch list *except* the unsplit first-grade-a/b/c trio is `status: archived`. Only 3 of 7 sight-word lists are actually live/published. The Bible's grade-by-grade coverage tables treat archived and published lists identically — this is the single most consequential correction the audit surfaces, since "sight words: Strong ✅" coverage claims in the Bible's narrative sections are materially overstated for K, 2nd, and 3rd grade.

---

## 2. Curriculum Gap → Existing Content → Recommendation

One row per Bible §9 gap-matrix entry, cross-referenced against actual content.

| Grade | Gap (per Bible §9) | Existing Content Found | Recommendation | Confidence |
|---|---|---|---|---|
| K | Simple CVC words (K-level) | `phonics/short-a/e/i/o/u-words.md` exist but all tagged grade **1**, not K | Reclassify: add K as secondary grade, or leave grade 1 primary and treat as "K preview" — needs editorial call | Medium |
| K | Color words | `kindergarten-number-color-words.md` | **Reclassify, not missing** — gap matrix should move from "Partial" to "Exists" | High |
| K | Number words | `kindergarten-number-color-words.md` | **Reclassify, not missing** — same list covers both | High |
| K | Shape words | None found | Genuinely missing | High |
| K | Family words | None found | Genuinely missing | High |
| K | School words | None found | Genuinely missing | High |
| K | Animal words | `kindergarten-first-words.md` includes bird, bug, fish, hen (animal-adjacent) but is not animal-themed | Partial at best — a dedicated animal-words list is still missing | Medium |
| 1 | Silent-e long-u words | None found (long-a/i/o exist, no long-u) | Genuinely missing | High |
| 1 | Inflectional endings (-s, -ed, -ing) | None found as a dedicated list | Genuinely missing | High |
| 1 | Simple two-syllable words | None found | Genuinely missing | High |
| 2 | Contractions | None found | Genuinely missing | High |
| 2 | Homophones | None found | Genuinely missing | High |
| 2 | Plural spelling rules | None found | Genuinely missing | High |
| 2 | Prefix un- / re- | None found | Genuinely missing | High |
| 2 | Suffix -ful / -less | None found | Genuinely missing | High |
| 3 | Prefixes/suffixes/multisyllabic/homophones/spelling-changes/roots | None found at grade 3 | Genuinely missing — confirmed worst-covered grade for morphology | High |
| 4 | Greek and Latin roots | `challenge/tier-1-roots-and-patterns.md`, `challenge/tier-2-greek-latin-roots.md` — content matches almost exactly | **Reclassify, not missing** — these two lists already satisfy this gap if retagged to grade 4 primary | High |
| 4 | Advanced prefixes/suffixes, confused words, science/social-studies vocab | None found | Genuinely missing | High |
| 5 | Academic vocabulary | `5th-grade-academic-words.md`, `challenge/academic-vocabulary.md` | **Exists**, though the two lists overlap significantly (see §3) | High |
| 5 | Advanced roots/affixes | Same two challenge root lists, if treated as 4–5 secondary-grade content | **Partially reclassify** — same lists could double-count toward both grade 4 and grade 5 gaps | Medium |
| 5 | Suffix spelling rules, misspelled words, math vocabulary, word origins | None found | Genuinely missing | High |

**Key takeaway:** of the ~25 items the Bible marked "Missing," **5 are actually addressable today purely through reclassification** (K color/number words ×2, 4th-grade roots ×2, 5th-grade roots/affixes overlap), not new authoring. The remaining ~20 are genuinely missing content. This materially changes the Phase 3 priority list — see §7 Opportunities.

---

## 3. Duplicates and Overlap

| Finding | Lists Involved | Assessment | Confidence |
|---|---|---|---|
| General CVC list vs. per-vowel breakdown | `phonics/short-vowels-cvc-words.md` (archived, mixed-vowel) vs. `short-a/e/i/o/u-words.md` (5 separate, published) | Likely intentional — the general list was probably superseded by the five focused lists and archived accordingly. Its `nextLists`/prerequisite chain to `silent-e-long-a` is stale (points to an archived list as a live prerequisite). | Medium |
| Word-content overlap: 5th-grade academic words | `grade-level/5th-grade-academic-words.md` (achieve, communicate, examine, identify, information, process, provide, result, solution, suggest, support) vs. `challenge/academic-vocabulary.md` (analyze, communicate, conclude, determine, evidence, examine, identify, knowledge, observe, organize, strategy, summarize) | Genuine word-level duplication: "communicate," "examine," "identify" appear in both. Same theme (cross-curricular academic vocabulary), different difficulty tier (intermediate vs. challenge) — could be read as an intentional ladder (grade list → challenge list) or as redundant content needing consolidation. | Medium |
| Word-content overlap: argument/analysis vocabulary | `grade-level/5th-grade-reading-writing-words.md` (analyze, argument, claim, conclusion, strategy...) vs. `grade-level/5th-grade-opinion-argument-words.md` (argument, claim, conclusion, evidence, summarize...) | Both lists share argument, claim, conclusion. Likely intentional (reading/writing skills vs. opinion-writing skills are different instructional contexts) but worth an editorial look given the word-level overlap is substantial (3 of 10–12 words shared). | Low |
| Archived vs. published Dolch sets | `dolch-pre-primer`/`dolch-primer`/`dolch-second-grade`/`dolch-third-grade` (all archived) vs. `dolch-first-grade-a/b/c` (all published) | Not really a duplicate — these are sequential tiers, not overlapping content. The real issue is the archived/published split itself (see §1.4) rather than duplication. | High |
| "Everyday words" repeated at every grade | `1st/2nd/3rd/4th/5th-grade-everyday-words.md` | **Intentional ladder, not redundant.** Word lists are grade-distinct (verified no word repeats across the five lists) and the structure (everyday → action/describing → reading-writing) repeats deliberately as a per-grade template. Not a finding requiring action. | High |
| Final-blend grade split (lt/lk/mp/ft/sk @ grade 2 vs. nd/ng/ld/st/nt/nk @ grade 1) | See §1.3 | Possible inconsistent tagging rather than duplication — flagged for editorial review, not a content duplicate. | Medium |

---

## 4. Per-Grade (K–5) Coverage Rollup

### Kindergarten — 5 lists (3 grade-level + 2 archived sight-words)
- **Strengths:** Strong, well-targeted thematic vocabulary (first-words, numbers/colors, describing-words) for the small footprint that exists.
- **Weaknesses:** Both Dolch K lists (pre-primer, primer is grade-1) are archived — meaning **K sight-word coverage is effectively zero live content**, worse than the Bible's narrative implies.
- **Missing concepts:** Shape words, family words, school words, animal words — confirmed genuinely missing, matching Bible exactly.
- **Overlap:** None found.
- **Surprising:** The Bible calls K "the most underbuilt grade" — confirmed and arguably understated once archived-status is accounted for.

### 1st Grade — 35 lists (3 grade-level + 29 phonics + 3 sight-words [1 archived])
- **Strengths:** By far the deepest grade in the library. All five short vowels, all 18 initial blends, all 11 final blends (6 of them), 4 digraphs, 3 silent-e patterns, full Dolch 1st-grade trio — genuinely comprehensive phonics coverage exactly matching Bible §7 claims.
- **Weaknesses:** None structural; the "overbuilt" feel the Bible worries about is real in raw list count (35 lists at grade 1 vs. 3–6 at every other grade) but is justified content, not duplication.
- **Missing concepts:** Silent-e long-u, inflectional endings (-s/-ed/-ing), two-syllable words — confirmed.
- **Overlap:** None found.
- **Surprising:** `dolch-primer.md` is tagged grade 1 but archived — Bible's 1st-grade section doesn't mention it at all, an unacknowledged gap between documentation and reality.

### 2nd Grade — 17 lists (4 grade-level + 12 phonics + 1 sight-words [archived])
- **Strengths:** Vowel teams, r-controlled vowels, and compound words are genuinely well covered.
- **Weaknesses:** Zero morphology content beyond the single compound-words list — contractions, homophones, plurals, prefixes, suffixes, silent letters are all completely absent, confirming the Bible's biggest 2nd-grade gap claim.
- **Missing concepts:** Confirmed: contractions, homophones, plural rules, un-/re- prefixes, -ful/-less suffixes, silent letters.
- **Overlap:** None found.
- **Surprising:** `dolch-second-grade.md` is archived — the Bible's coverage table marks it "✅" without flagging this.

### 3rd Grade — 6 lists (3 grade-level + 2 phonics [diphthongs tagged 3] + 1 sight-words [archived])
- **Strengths:** Reading/writing vocabulary and describing-words lists are solid for what they cover.
- **Weaknesses:** This is the thinnest *instructionally critical* grade — confirmed worst-covered for morphology, exactly as the Bible states. Zero prefix/suffix/root/homophone/spelling-rule content.
- **Missing concepts:** Confirmed: all major morphology categories.
- **Overlap:** None found.
- **Surprising:** The two diphthong lists (oi-oy, ou-ow) are tagged grade 3 rather than grade 2 like their four vowel-team siblings — worth resolving since it affects whether 3rd grade "looks" slightly less thin than it really is for morphology purposes.

### 4th Grade — 5 lists (3 grade-level + 2 challenge, untagged for grade)
- **Strengths:** Community/civics vocabulary and reading-writing vocabulary are solid thematic coverage.
- **Weaknesses:** The two root lists that would substantially help this grade (`challenge/tier-1-roots-and-patterns`, `challenge/tier-2-greek-latin-roots`) carry **no grade tag at all**, so they don't show up in any grade hub — they exist but are invisible to the grade-first navigation the Bible mandates in §4.
- **Missing concepts:** Advanced prefixes, advanced suffixes, commonly confused words, science/social-studies vocabulary — confirmed missing.
- **Overlap:** None found.
- **Surprising:** The Bible's own §7 Notes section already suspected this ("should be audited to determine whether they properly belong as 4th–5th grade lists") — the audit confirms the suspicion was correct and actionable.

### 5th Grade — 9 lists (6 grade-level + 3 challenge, 2 of which are also candidate-4th-grade)
- **Strengths:** Best-covered grade for thematic vocabulary, confirmed — six grade-level lists spanning academic, ELA, science, civics, and argument-writing vocabulary, none overlapping in word content with each other except the cases noted in §3.
- **Weaknesses:** No suffix spelling-rule, misspelled-words, math-vocabulary, or word-origin content — confirmed missing.
- **Missing concepts:** Confirmed per Bible.
- **Overlap:** `5th-grade-academic-words.md` vs. `challenge/academic-vocabulary.md` share 3 words; `5th-grade-reading-writing-words.md` vs. `5th-grade-opinion-argument-words.md` share 3 words. Neither is a true duplicate but both are close enough to warrant an editorial look.
- **Surprising:** None of the three challenge lists carry a grade tag, even though `challenge/academic-vocabulary.md`'s content is essentially indistinguishable in difficulty from `5th-grade-academic-words.md` (`difficulty: challenge` vs. `intermediate`, but same words).

---

## 5. Findings Requiring Editorial Decisions

These need human sign-off before any change to the Bible or to list frontmatter:

1. **All three `challenge/` lists have no `grade` field.** Recommend assigning: tier-1 → grade 4, tier-2 → grade 4 (secondary 5), academic-vocabulary → grade 5 (secondary 4). *Confidence: High that they should be tagged at all; Medium on exact grade split.*
2. **Five of seven sight-word lists are archived** (pre-primer, primer, second-grade, third-grade) while the Bible's coverage tables present them as live ("✅ Covered"). Decide whether to (a) republish them, (b) update the Bible to reflect archived status honestly, or (c) confirm they were intentionally retired in favor of a future replacement strategy. *Confidence: High that this is a real discrepancy; no recommendation on which resolution is correct — that's a content-strategy call.*
3. **`phonics/short-vowels-cvc-words.md` is archived** but still referenced as a live prerequisite/related-list by `silent-e-long-a.md`. If it stays archived, that relationship link is broken/misleading. *Confidence: High this is an inconsistency; Medium on whether the fix is "unarchive" vs. "remove the stale reference" — a content decision either way.*
4. **Diphthong lists (oi-oy, ou-ow) tagged grade 3** while structurally similar vowel-team lists are tagged grade 2. Decide whether this reflects a deliberate skill-sequencing choice (diphthongs are harder, taught later) or inconsistent tagging. *Confidence: Medium.*
5. **Final-blend lists split 6×grade-1 / 5×grade-2** (lt/lk/mp/ft/sk at grade 2) with no documented rationale. Decide if this split is deliberate. *Confidence: Medium.*
6. **5th-grade academic-vocabulary overlap** between `5th-grade-academic-words.md` and `challenge/academic-vocabulary.md` (3 shared words) — decide whether this is an intentional grade→challenge ladder or should be de-duplicated. *Confidence: Medium.*
7. **Kindergarten phonics question:** should any of the five `short-a/e/i/o/u-words.md` lists (currently grade 1 only) get a K secondary-grade tag, given the Bible's own K target checklist calls for "CVC short-[vowel] words (kindergarten level)"? *Confidence: Medium — reasonable people could argue CVC belongs strictly to grade 1 per the Bible's K–2 split language, or that K needs its own easier on-ramp.*

---

## 6. Opportunities

Places where existing content can satisfy a curriculum need through **reclassification/retagging rather than new authoring**:

- **K Color words / K Number words gaps** are already fully satisfied by `kindergarten-number-color-words.md`. The Bible's gap matrix marks these "Partial" — they should be "Exists." No new content needed, just a Bible update in a later phase.
- **4th-grade Greek/Latin roots gap** is substantially satisfied by `challenge/tier-1-roots-and-patterns.md` and `challenge/tier-2-greek-latin-roots.md` — both already cover exactly the root families (port, dict, spect, rupt, tele, photo, graph, bio, demo) the Bible's own 4th-grade target checklist names. Tagging these to grade 4 (rather than leaving them untagged/challenge-only) could close this "High priority" gap immediately with zero new word-list authoring.
- **5th-grade Advanced roots/affixes gap** can simultaneously be addressed by the same two lists if a grade-4-primary/grade-5-secondary tagging is used — one piece of content serving two grade hubs via the Bible's own secondary-grade mechanism (§3 Definitions already supports this).
- **5th-grade Academic vocabulary gap** is already marked "Exists" correctly by the Bible, and the audit confirms two lists (not one) cover it — `5th-grade-academic-words.md` plus `challenge/academic-vocabulary.md` — suggesting room to either consolidate or deliberately position one as core and one as enrichment, without authoring anything new.
- **K Animal words gap** is partially, not fully, addressed by `kindergarten-first-words.md` (bird, bug, fish, hen are present but mixed into a general starter list rather than a dedicated theme). If a true thematic animal-words list is wanted, this existing list is at least a partial substitute in the interim.

These five items reduce the realistic "genuinely missing, must author new content" backlog from the Bible's ~25 gap rows to roughly 20, by resolving 5 through tagging/reclassification work that is far cheaper than new list authoring.

---

## 7. Audit Summary

**Total spelling lists:** 82 markdown lists (3 challenge + 22 grade-level + 50 phonics + 7 sight-words), plus 4 non-production TS fixtures in `src/data/fixtures/sampleLists.ts` and 1 collection grouping (`dolch-first-grade`) in `src/content/spelling-collections/`.

**Lists by category:** phonics 50 (61%), grade-level 22 (27%), sight-words 7 (9%), challenge 3 (4%).

**Lists by primary grade (recommended):**
- K: 3 (+2 archived sight-words)
- 1: 32 (29 phonics + 3 grade-level)
- 2: 12 phonics + 4 grade-level (+1 archived sight-words) = 16
- 3: 2 phonics (diphthongs, contested) + 3 grade-level (+1 archived sight-words) = 5–6
- 4: 3 grade-level (+0–2 challenge lists pending grade-tag decision)
- 5: 6 grade-level (+1–3 challenge lists pending grade-tag decision)

**Lists requiring primary-grade changes:** 3 challenge lists currently have no grade tag at all (highest-priority fix — they're invisible to grade hubs). 4 phonics lists (oi-oy, ou-ow diphthongs + the lt/lk/mp/ft/sk final-blend cluster) have grade tags that are inconsistent with sibling lists and warrant review, though none are clearly *wrong*.

**Lists requiring secondary-grade changes:** Candidates for adding a secondary grade: the 5 short-vowel CVC lists (K secondary), `dolch-primer` (K secondary), the two challenge root lists (4 primary / 5 secondary).

**Lists that appear misplaced:** None are clearly *wrong* — the most significant issue is **missing or absent tagging** (challenge lists with no grade at all) rather than incorrect tagging.

**Lists that appear duplicated:** No true content duplicates. Two near-duplicate word-overlap cases at grade 5 (academic-words vs. challenge/academic-vocabulary; reading-writing-words vs. opinion-argument-words) — both look like intentional ladders but share enough vocabulary to warrant a look.

**Largest curriculum strengths:** 1st-grade phonics (exhaustive — every standard blend, digraph, and silent-e pattern covered) and 5th-grade thematic vocabulary breadth (six non-overlapping subject-area lists).

**Largest curriculum gaps:** 3rd-grade morphology is essentially zero (confirmed, matches Bible). 2nd-grade word-study beyond phonics (contractions, homophones, plurals, basic affixes) is zero. Kindergarten thematic vocabulary (shapes, family, school, animals) and kindergarten sight words (both lists archived) are both effectively absent.

**Anything unexpected:**
1. The Bible's published list count (76) undercounts reality by 6, entirely within `phonics/`.
2. 5 of 7 sight-word lists are archived, not published — the Bible's coverage tables treat them as live, materially overstating sight-word coverage at K, 2nd, and 3rd grade.
3. All 3 challenge lists lack a `grade` field entirely, making them invisible to the grade-first navigation architecture the Bible mandates as the primary UX pattern — yet their content already targets exactly the 4th/5th-grade root and academic-vocabulary gaps the Bible flagged as missing.
4. A stale prerequisite reference: `silent-e-long-a.md` lists an archived list (`short-vowels-cvc-words`) as a live prerequisite.

---

## Recommended Next Step

Review this report together and make deliberate decisions on the items in §5 (Findings Requiring Editorial Decisions) and §6 (Opportunities). Once those calls are made, run a focused Phase 3 session whose only job is to:
1. Update `curriculum-bible.md` §6 (corrected snapshot numbers), §7 (grade narratives reflecting archived-status reality), §8 (populate the Existing List Inventory with the decided-upon grades), and §9 (flip the ~5 reclassifiable gap rows from Missing/Partial to Exists).
2. Apply the agreed frontmatter changes (grade tags on the 3 challenge lists, any final-blend/diphthong re-tagging, any archived-list republish/cleanup decisions).
3. Only after that, begin authoring genuinely new content against the now-accurate, smaller gap list (~20 items instead of ~25).

---

## Phase 3 Resolution (2026-06-30)

The curriculum architecture decisions this audit's §5 called for have been made and applied to the repository. This section is append-only — it records the resolution against each §5 finding; the inventory tables, counts, and findings above remain an accurate point-in-time snapshot of the 2026-06-29 audit and are unchanged.

1. **Archived Dolch sight-word lists (5 of 7 archived, not published):** Resolved — `dolch-pre-primer`, `dolch-primer`, `dolch-second-grade`, and `dolch-third-grade` are republished (`status: published`). All 7 Dolch tiers are now live. See Curriculum Bible §6 (Current Library Snapshot) and §7 Kindergarten/2nd/3rd Grade Current Coverage tables.
2. **Challenge root lists lacking a grade tag (`tier-1-roots-and-patterns`, `tier-2-greek-latin-roots`):** Resolved — both retagged `category: grade-level`, `grade: "4"`, with `order` renumbered to follow the existing Grade 4 lists. They are Grade 4's canonical morphology content; `tier-2-greek-latin-roots` also serves Grade 5 review/extension via its existing `relatedLists`/`prerequisiteLists` chain, with no duplicate grade tag added. See Curriculum Bible §7 4th Grade and §7 5th Grade.
3. **Diphthong lists tagged grade 3, inconsistent with grade-2 vowel-team siblings (`vowel-teams-oi-oy`, `vowel-teams-ou-ow`):** Resolved — both retagged `grade: "2"`, matching `ai-ay`, `ee-ea`, and `oa-ow`. Grade 3 now carries zero primary phonics content by design. See Curriculum Bible §7 2nd Grade and §7 3rd Grade.
4. **Final-blend grade-1/grade-2 split (`nd/ng/ld/st/nt/nk` at grade 1 vs. `ft/lk/lt/mp/sk` at grade 2):** Kept as-is — confirmed intentional, not a mis-tag. Documented explicitly in Curriculum Bible §7 1st Grade Notes so a future audit doesn't re-flag it.
5. **5th-grade academic vocabulary word overlap (`5th-grade-academic-words` vs. `challenge/academic-vocabulary`):** Kept as-is — intentional and acceptable (standard grade expectation vs. genuine extension beyond it). Documented in Curriculum Bible §7 5th Grade Notes.
6. **Kindergarten CVC/phonics gap:** Resolved as a framing decision, not a retag — K phonics foundations (letter sounds, beginning/ending sounds, phonemic awareness) are a real, legitimate instructional need, but full CVC *spelling* practice stays Grade 1 primary, matching standard scope-and-sequence and this app's type-the-whole-word format. Recorded as a future curriculum consideration in Curriculum Bible §7 Kindergarten Notes and §9 Content Gap Matrix, not an open "High priority" gap to fill by relabeling Grade 1 content.
7. **Challenge vs. grade-level category boundary:** Tightened — `category: challenge` is now explicitly defined as reserved for content with no single natural grade home (genuine cross-grade enrichment), distinct from `difficulty: challenge`, which is an independent rigor signal usable on any category. See Curriculum Bible §3 Definitions, Challenge Word row.

The corrected counts from this audit (82 total lists, `phonics/` at 50) are now reflected in Curriculum Bible §6. Remaining high-priority gaps are unchanged by this resolution pass — 3rd-grade morphology remains the single largest open gap in the library.

---

## Phase 4 Resolution — Metadata Normalization (2026-07-01)

This phase's task named a `docs/content/curriculum-architecture.md` as a source-of-truth document alongside this audit and the Bible. **That file does not exist in the repository.** Git history (commit `096dd2d`) shows the Phase 3 items above were applied citing an "approved Curriculum Architecture Proposal" that was reviewed and approved out-of-band but never committed as its own file — its decisions live only in this audit's Phase 3 Resolution and the Bible's narrative. This phase treats those two documents as the complete record and reports the missing file here rather than blocking on it.

With the Phase 3 items already live, this pass focused on library-wide metadata consistency and — the most consequential finding — relationship-graph integrity:

1. **`relatedLists`/`prerequisiteLists`/`nextLists` resolve by `id`, not `urlSlug`, but ~20 lists referenced the urlSlug form.** `resolveListRefs()` (`src/lib/content/spellingLists.ts:45-51`) matches only against each entry's `id` field. Wherever a list's `id` differs from its `urlSlug` — every numbered `grade-level/` list for grades 1–5 (e.g. `1st-grade-action-words.md` has `id: grade-1-list-02`) and the `sight-words/dolch-*` chain for grades 1–3 — relationship arrays had been written using the urlSlug-style string instead of the real id. Those references silently resolved to nothing at build time, so the related/prerequisite/next-list sections on those pages were dropping links that were clearly intended. Fixed all ~20 references across every `grade-level/` grade (K–5) and the Dolch sight-word chain to use the correct `id`. Confirmed post-fix by rebuilding the site and checking rendered pages (e.g. `2nd-grade-action-words`, `kindergarten-number-color-words`, `silent-e-long-a`) now show the intended links.
2. **Two dangling references to non-existent ids**, unrelated to the urlSlug bug: `dolch-primer.nextLists` and `dolch-second-grade.relatedLists`/`prerequisiteLists` pointed at `dolch-first-grade`, which is the id of the `spelling-collections` grouping entry, not a `spelling-lists` id — repointed to `dolch-first-grade-a` and `dolch-first-grade-c` respectively (the actual first/last parts of that split tier). `kindergarten-number-color-words` referenced `kindergarten-list-03`, which matches no id or urlSlug in the library — repointed to `kindergarten-describing-words`, the actual next list in the K sequence by `order`.
3. **Audit §5 Finding 3 (never resolved in Phase 3): `silent-e-long-a.md` still listed the archived `short-vowels-cvc-words` as its prerequisite/related list.** Resolved non-speculatively — `short-a-words.md` already declares `nextLists: [silent-e-long-a]`, so the correct prerequisite already existed from the other side. `silent-e-long-a` now points to `short-a-words` instead of the dead archived list.
4. **Two obvious gaps filled in already-established chains**, not new relationships: `2nd-grade-action-words` (`grade-2-list-03`) had `nextLists: []` even though `2nd-grade-describing-words` already declared `prerequisiteLists: ["grade-2-list-03"]`; and `3rd-grade-describing-words` (`grade-3-list-02`) had `nextLists: []` even though `3rd-grade-reading-writing-words` already declared `prerequisiteLists: ["grade-3-list-02"]`. Both now complete the reverse direction of a link the sibling file had already declared.
5. **skillTag gaps in the Dolch chain:** every Dolch tier except `dolch-pre-primer` and `dolch-primer` carried a matching grade-name skillTag (`first-grade`, `second-grade`, `third-grade`). Added `kindergarten` to `dolch-pre-primer` and `first-grade` to `dolch-primer` to match the established pattern.
6. **Reading-level tag out of sequence:** the library's existing reading-level tag scale across Dolch tiers is `beginning-readers` (pre-primer/primer/1st grade) → `early-readers` (2nd grade) → `fluent-readers` (3rd grade). `grade-level/kindergarten-first-words.md` — a Kindergarten list — was tagged `early-readers`, out of step with that established scale. Changed to `beginning-readers`.
7. **Cosmetic YAML consistency:** `dolch-pre-primer.md` had `grade: K` (unquoted) while every other list in the library quotes its `grade` value (`grade: "K"`, `grade: "1"`, etc.). Quoted for consistency; the parsed value is unchanged.
8. **No other terminology conflicts found.** Checked category/grade/difficulty/status combinations, `grade-N` (grade-level) vs. `Nth-grade` (sight-words) skillTag conventions, action/verb tags, community/civics tags, and vowel-related tags across all 82 lists — the only real gaps were items 5–7 above. The `grade-N`/`Nth-grade` split between categories is an intentional, consistently-applied convention within each category, not a bug.
9. **Not touched, and why:** the 38 parallel single-skill phonics lists (initial blends, final blends, digraphs) have all-empty relationship fields. There is no established sequencing among them — they were authored as coequal batches (per git history) rather than a dependency chain — so adding relatedLists/prerequisiteLists/nextLists there would be inventing curriculum structure, not fixing a bug. This remains a legitimate opportunity for a future, deliberate content-architecture decision, not a metadata-normalization fix.

No word content, schema fields, routes, categories, grades, or difficulty values changed in this pass — only relationship-array values, two skillTags, one tag, and one YAML quoting style.
