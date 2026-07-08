# Content Production Roadmap

## 1. Purpose

This document exists to guide curriculum production for the next several months. The foundational architecture work — the Curriculum Bible, the curriculum audit, grade-first hubs, and relationship-graph integrity — is complete. This is not a place for new curriculum philosophy or new curriculum decisions.

**`docs/content/curriculum-bible.md` remains the single source of truth** for what belongs at each grade and why. This document does not restate that reasoning. It converts the Bible's §9 Content Gap Matrix and the reconciling findings in `docs/content/curriculum-audit-phase-2.md` into an ordered, schedulable production queue: what to build next, in what order, and how to know a list is done.

Every row in the backlog below traces back to a specific finding in the Bible or the audit. If a proposed list can't be traced to one of those two documents, it does not belong in this backlog.

---

## 2. Current Production Status

| Category | List Count |
|---|---|
| `phonics/` | 59 (includes 9 new Kindergarten phonics pages, 2026-07-08) |
| `sight-words/` | 8 (full Dolch pre-primer → 3rd grade, all published, plus `kindergarten-heart-words`) |
| `grade-level/` — K | 3 (7 former thematic lists archived 2026-07-08 — see Bible §7) |
| `grade-level/` — 1st | 3 |
| `grade-level/` — 2nd | 4 |
| `grade-level/` — 3rd | 3 |
| `grade-level/` — 4th | 5 (includes 2 root lists) |
| `grade-level/` — 5th | 6 |
| `challenge/` | 1 |
| **Total** | **86** |

**Strengths:** 1st and 2nd grade phonics (short vowels, blends, digraphs, silent-e, vowel teams, r-controlled vowels) are comprehensively covered. The Dolch sight-word ladder is complete and fully published. 4th grade has dedicated Greek/Latin root lists (`tier-1-roots-and-patterns`, `tier-2-greek-latin-roots`), and 5th grade has the library's strongest thematic/academic-vocabulary spread.

**Largest remaining gaps:** Grade 3 has effectively zero morphology content (no prefixes, suffixes, multisyllabic words, or spelling-change rules) — the single largest structural hole in the library. Grade 2 word study beyond phonics is also empty (no contractions, homophones, plural rules, or basic affixes). Kindergarten's Phase D thematic vocabulary (shapes, family, school, body, feelings, food, animals) was **superseded 2026-07-08** by a locked, phonics-based core curriculum (see `docs/content/kindergarten-curriculum.md`); most Phase D lists were archived, with Animal Words retained as supplemental. Grades 4 and 5 are missing their next tier of advanced morphology and content-area vocabulary.

Per the audit's reconciliation (`curriculum-audit-phase-2.md` §7/§172), 5 of the Bible's ~25 "Missing" gap rows are already resolvable through reclassification, not new authoring (K color words, K number words, and the Grade 4/5 root-list overlaps). That leaves **~20 gap rows that require genuinely new lists** — the backlog in §4 below.

---

## 3. Production Priorities

Phases are ordered by the severity and leverage the Bible and audit assign to each gap, not by document section order.

### Phase A — Grade 2 & Grade 3 Foundational Gaps (Highest Priority)
The Bible and audit both identify Grade 3 morphology and Grade 2 word study as the most structurally important holes in the library — the point where phonics should hand off to morphology, and currently doesn't. Filling these first makes the K–5 progression coherent end to end.

- Grade 2: contractions, homophones, plural spelling rules (all tagged **High** in Bible §9)
- Grade 3: prefixes (un-, re-, pre-, dis-, mis-), suffixes (-er, -est, -tion, -ly, -ness), multisyllabic words 2–3 syllable (all tagged **High**)
- Grade 2 basic prefixes/suffixes (un-, re-, -ful, -less) and Grade 3 homophones, spelling-change rules, and root-word introduction (all tagged **Medium**) round out Phase A since they're the same instructional thread as the High items above.

### Phase B — Grade 4 Advanced Morphology & Content Vocabulary
Advanced prefixes/suffixes and content-area vocabulary for Grade 4, all tagged **High/Medium** in Bible §9, and the specific missing root lists the Bible names (struct, vis/vid, scrib/script, scope).

### Phase C — Grade 5 Morphology Capstone (Complete)
Grade 5 now uses a 12-list elementary capstone architecture: multisyllabic academic words, parent-friendly prefix/suffix practice, Greek and Latin word-part extension, one combined spelling-rules page for -tion/-sion, -able/-ible, and -ance/-ence, commonly confused words, strengthened science and social studies/civics vocabulary, and math vocabulary as the lowest-priority content-area extension.

### Phase D — Kindergarten Completion (Superseded 2026-07-08)
Shape, family, school, and animal word lists were originally shipped on the premise that thematic vocabulary was the right kindergarten approach. That premise is superseded: Kindergarten now follows a locked, phonics-based core curriculum (see `docs/content/kindergarten-curriculum.md`). Shape, Family, and School Words were archived; Animal Words was retained but re-audited and reframed as supplemental practice. This phase is kept here only as a historical record — see the backlog annotations below.

### Phase E — Grade 1 Long-Tail & Structural Decisions
Grade 1's remaining gaps are all **Medium/Low** (silent-e long-u, inflectional endings, simple two-syllable words). This phase also covers the one open structural question the audit flagged but did not resolve: whether the 38 single-skill phonics lists should gain `relatedLists`/`prerequisiteLists` sequencing, which the audit explicitly calls "a legitimate future content-architecture decision, not a metadata bug" (`curriculum-audit-phase-2.md` Phase 4 Resolution).

---

## 4. Master Production Backlog

| Priority | Proposed List | Grade | Curriculum Area | Why it matters | Dependencies | Status |
|---|---|---|---|---|---|---|
| A | 2nd Grade Contractions | 2 | Word study | Bible §9: Grade 2 Contractions — Missing / High | None | Not Started |
| A | 2nd Grade Homophones | 2 | Word study | Bible §9: Grade 2 Homophones — Missing / High | None | Not Started |
| A | 2nd Grade Plural Spelling Rules | 2 | Word study | Bible §9: Grade 2 Plural spelling rules — Missing / High | None | Not Started |
| A | 3rd Grade Prefixes (un-, re-, pre-, dis-, mis-) | 3 | Morphology | Bible §9: Grade 3 Prefixes — Missing / High; audit confirms Grade 3 morphology as the library's largest gap | Reviews Grade 2 prefix work if sequenced after it | Not Started |
| A | 3rd Grade Suffixes (-er, -est, -tion, -ly, -ness) | 3 | Morphology | Bible §9: Grade 3 Suffixes — Missing / High | None | Not Started |
| A | 3rd Grade Multisyllabic Words (2–3 syllable) | 3 | Morphology | Bible §9: Grade 3 Multisyllabic words — Missing / High | None | Not Started |
| A | 2nd Grade Prefix un- | 2 | Morphology | Bible §9: Grade 2 Prefix un- — Missing / Medium | None | Not Started |
| A | 2nd Grade Prefix re- | 2 | Morphology | Bible §9: Grade 2 Prefix re- — Missing / Medium | None | Not Started |
| A | 2nd Grade Suffix -ful / -less | 2 | Morphology | Bible §9: Grade 2 Suffix -ful/-less — Missing / Medium | None | Not Started |
| A | 3rd Grade Homophones | 3 | Word study | Bible §9: Grade 3 Homophones — Missing / Medium | None | Not Started |
| A | 3rd Grade Spelling Changes (doubling, drop-e, y→i) | 3 | Morphology | Bible §9: Grade 3 Spelling changes — Missing / Medium | None | Not Started |
| A | 3rd Grade Root Word Introduction | 3 | Morphology | Bible §9: Grade 3 Root word introduction — Missing / Medium | Precedes Grade 4 dedicated root lists | Not Started |
| B | 4th Grade Advanced Prefixes (anti-, inter-, sub-, super-, trans-) | 4 | Morphology | Bible §9: Grade 4 Advanced prefixes — Missing / High | None | Not Started |
| B | 4th Grade Advanced Suffixes (-ible/-able, -ous, -ive) | 4 | Morphology | Bible §9: Grade 4 Advanced suffixes — Missing / High | None | Not Started |
| B | Latin Root: struct | 4 | Morphology / roots | Bible §7 4th Grade Target Checklist: struct named as an unbuilt root list | Follows existing tier-1-roots-and-patterns pattern | Not Started |
| B | Latin Root: vis/vid | 4 | Morphology / roots | Bible §7 4th Grade Target Checklist: vis/vid named as an unbuilt root list | Same as above | Not Started |
| B | Latin Root: scrib/script | 4 | Morphology / roots | Bible §7 4th Grade Target Checklist: scrib/script named as an unbuilt root list | Same as above | Not Started |
| B | Greek Root: scope | 4 | Morphology / roots | Bible §7 4th Grade Target Checklist: scope named as an unbuilt root list | Same as above | Not Started |
| B | 4th Grade Commonly Confused Words | 4 | Vocabulary | Bible §9: Grade 4 Commonly confused words — Missing / Medium | None | Not Started |
| B | 4th Grade Science Vocabulary | 4 | Content vocabulary | Bible §9: Grade 4 Science vocabulary — Missing / Medium | None | Not Started |
| B | 4th Grade Social Studies Vocabulary | 4 | Content vocabulary | Bible §9: Grade 4 Social studies vocabulary — Missing / Medium | None | Not Started |
| C | 5th Grade Multisyllabic Academic Words | 5 | Morphology / academic vocabulary | Bible §7: Grade 5 morphology capstone — longer school words | Grade 4 multisyllabic academic words | Complete |
| C | 5th Grade Prefix & Suffix Words | 5 | Morphology / affixes | Bible §7: Grade 5 prefix/suffix extension with parent-friendly title | Grade 4 advanced prefixes/suffixes | Complete |
| C | 5th Grade Greek & Latin Word Parts | 5 | Morphology / roots | Bible §7: extends Grade 4 roots inside longer academic words without duplicate Greek/Latin pages | Grade 4 Latin and Greek root lists | Complete |
| C | 5th Grade Spelling Rules | 5 | Morphology / spelling rules | Bible §7: combined -tion/-sion, -able/-ible, -ance/-ence page avoids over-fragmentation | Grade 4 advanced suffixes | Complete |
| C | 5th Grade Commonly Confused Words | 5 | Vocabulary / writing | Bible §7: Grade 5 commonly confused words extension | Grade 4 commonly confused words | Complete |
| C | 5th Grade Science Words | 5 | Content vocabulary | Bible §7: strengthened Grade 5 science vocabulary | Academic vocabulary | Complete |
| C | 5th Grade Social Studies & Civics Words | 5 | Content vocabulary | Bible §7: strengthened Grade 5 civics/social studies vocabulary | Academic vocabulary | Complete |
| C | 5th Grade Math Vocabulary | 5 | Content vocabulary | Bible §7: lowest-priority Grade 5 content-area extension | None | Complete |
| Future | 5th Grade Word Origins Awareness | 5 | Vocabulary | Optional only if future search demand or curriculum need justifies it | Greek & Latin Word Parts | Deferred |
| D | Kindergarten Shape Words | K | Thematic vocabulary | Bible §9: K Shape words — Missing / High | None | Archived (2026-07-08, superseded by locked curriculum) |
| D | Kindergarten Family Words | K | Thematic vocabulary | Bible §9: K Family words — Missing / High | None | Archived (2026-07-08, superseded by locked curriculum) |
| D | Kindergarten School Words | K | Thematic vocabulary | Bible §9: K School words — Missing / Medium | None | Archived (2026-07-08, superseded by locked curriculum) |
| D | Kindergarten Animal Words | K | Thematic vocabulary | Bible §9: K Animal words — Missing / Medium | None | Retained as supplemental (2026-07-08, word list re-audited) |
| E | 1st Grade Silent-e Long-u Words | 1 | Phonics | Bible §9: Grade 1 Silent-e long-u words — Missing / Medium | None | Not Started |
| E | 1st Grade Inflectional Endings (-s, -ed, -ing) | 1 | Morphology | Bible §9: Grade 1 Inflectional endings — Missing / Medium | None | Not Started |
| E | 1st Grade Simple Two-Syllable Words | 1 | Phonics | Bible §9: Grade 1 Simple two-syllable words — Missing / Low | None | Not Started |

**Reclassification-only items (not new authoring, tracked for completeness):** K Color words and K Number words are already partially covered by `kindergarten-number-color-words` per Bible §9 and audit §7 — any further action here is a tagging/retag decision, not a new list, and is out of scope for this backlog.

---

## 5. Production Rules

Future list creation must follow these existing project rules — this document does not introduce new ones:

- **Align with the Curriculum Bible.** Every list must trace to a Bible §9 gap row or an explicitly named Bible §7 checklist item (`curriculum-bible.md` §1, §12 Rule 1).
- **One primary grade per list.** No list may carry multiple primary grades (`curriculum-bible.md` §12 Rule 2, `docs/GRADE_LEVEL_STRATEGY.md`).
- **Use secondary/relationship tags sparingly and correctly.** Cross-grade relationships are expressed via `relatedLists` / `prerequisiteLists` / `nextLists`, not a secondary-grade field (`curriculum-bible.md` §12 Rule 3, Decision Rules §12 note under Running Progress Map). These fields resolve by `id`, not `urlSlug` — verify against `resolveListRefs()` behavior documented in the audit's Phase 4 Resolution before publishing.
- **Follow the approved schema and tagging conventions** in `src/content/config.ts` (`skillTags`, `tags`, `category`, `difficulty`, `status`, `sourceType`, etc.) — no new top-level categories or schema migrations without explicit justification (`curriculum-bible.md` §4 Taxonomy Constraints, §12 Rule 7).
- **Maintain the K–2 phonics / 3–5 morphology curriculum split.** Grade 3 in particular should receive morphology and academic vocabulary, not phonics review content (`curriculum-bible.md` §4, §7 3rd Grade Notes).
- **Reuse the existing relationship graph** rather than inventing new sequencing patterns — follow the pattern established by `tier-1-roots-and-patterns` / `tier-2-greek-latin-roots` for root lists and the Dolch chain for sight words.
- **Avoid duplicate coverage unless it is an intentional ladder.** The audit confirmed the repeated "everyday words" lists per grade and the 5th-grade-academic-words/challenge/academic-vocabulary overlap are deliberate, verified to have no duplicate words across the ladder (`curriculum-audit-phase-2.md` §3). New lists should follow this same verified-no-overlap standard, not assume overlap is automatically acceptable.
- **Follow editorial standards** in `docs/CONTENT_STANDARDS.md` (word selection, sentence guidelines, tone, "what we do not publish") and the per-list planning template in `docs/LIST_SPECIFICATIONS.md`.

---

## 6. Definition of Done

A spelling list is complete when it satisfies all of the following:

- [ ] **Researched** — word selection vetted against `docs/CONTENT_STANDARDS.md` inclusion/exclusion rules and grade-appropriateness.
- [ ] **Specified** — a completed specification following the `docs/LIST_SPECIFICATIONS.md` template (title, slug, category, target grade, word count range, skill focus, source type).
- [ ] **Written** — words authored, sized to project convention (12–15 words standard, 10–12 for Kindergarten per `docs/GRADE_LEVEL_STRATEGY.md`).
- [ ] **Example sentences complete** — sentences meet the guidelines in `docs/SENTENCE_BANK.md` (length, heteronym/TTS pronunciation rule, no advanced vocabulary in the sentence itself).
- [ ] **Metadata complete** — full `src/content/config.ts` schema populated: `id`, `urlSlug`, `title`, `description`, `category`, `grade`, `difficulty`, `skillTags`, `tags`, `order`, `estimatedDurationMinutes`, `status`, `masteryThreshold`, `sourceType`.
- [ ] **Relationships assigned** — `relatedLists` / `prerequisiteLists` / `nextLists` populated using `id` values (not `urlSlug`), consistent with the audit's Phase 4 Resolution fix.
- [ ] **Grade placement verified** — checked against the relevant grade's section in `curriculum-bible.md` §7 and its Target Coverage Checklist.
- [ ] **Linked into curriculum** — list appears correctly in its grade hub and any relevant category hub; corresponding Bible §9 gap row and §7 checklist item are marked resolved.

---

## 7. Future Authority Opportunities

The following are larger curriculum or product initiatives that should wait until the Phase A–E backlog above is substantially complete. They are explicitly **not** part of the immediate production backlog and require no near-term action:

- **Fry word lists** (as an alternative/supplement to Dolch) — deferred per Bible §11 until Dolch is confirmed complete (it now is, but this remains a deliberate post-core-backlog decision, not an automatic next step).
- **Dialect-aware word lists** — deferred pending linguistic expertise (Bible §11).
- **Spanish/English cognate lists** — deferred until core English curriculum gaps are filled (Bible §11); this document's Phase A–E backlog is that core gap-filling work.
- **Dyslexia-targeted word lists** — deferred pending specialist/contributor partnership (Bible §11).
- **AI-assisted custom list builder** — a product/engineering initiative, deferred until the library reaches 150+ lists (Bible §11).
- **Progress tracking across sessions** — planned as a `localStorage` engineering feature, content-neutral (Bible §11, `docs/CONTENT_ARCHITECTURE.md`).
- **Printable word list PDFs** — deferred until the site reaches a stable traffic baseline (Bible §11).
- **Teacher classroom tools** (assigning lists, tracking students) — a significant product scope expansion, deferred long-term (Bible §11).
- **SEO/AEO informational guides** (grade-level explainer content, skill guides) — named as Bible §10 Phase 8, intentionally sequenced after the content gaps in Phase A–E of this roadmap are filled.
- **Formal morphology and content-architecture strategy documents** — the audit noted that `docs/content/curriculum-architecture.md` was expected but never created, and no dedicated `MORPHOLOGY_STRATEGY.md` exists despite morphology being the library's largest gap area. Once the Phase A–B morphology backlog above is underway, writing a dedicated morphology strategy document (prefix/suffix progression, root-list sequencing conventions) may be worth doing — but that is a documentation decision for later, not a prerequisite for starting Phase A.
- **Relationship-graph sequencing for single-skill phonics lists** — the audit flagged that the 38 single-skill phonics lists (blends, digraphs, final blends) intentionally have empty `relatedLists`/`prerequisiteLists` fields, and that adding them "would be inventing curriculum structure, not fixing a bug" (`curriculum-audit-phase-2.md` Phase 4 Resolution). This is a legitimate future content-architecture decision, tracked here rather than in the Phase A–E backlog since it requires a deliberate design choice, not routine list authoring.
