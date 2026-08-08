# Canonical K–5 Curriculum Implementation Plan

> **Superseded.** Superseded: its implementation phases and unresolved decisions have been replaced by the frozen architecture and validation slice in [K5_FINAL_CONTENT_ARCHITECTURE.md](./K5_FINAL_CONTENT_ARCHITECTURE.md). Retain this document as historical implementation context.

**Status:** Approved — authoritative engineering roadmap. GD-1 through GD-8 are approved; GD-9 and GD-10 remain open and are explicitly scoped so they do not block execution (see those entries and Phase 9); GD-11 is out of scope by design.
**Educational authority:** `docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md` (unchanged; this document does not reinterpret it).
**Advisory input:** `docs/curriculum/CANONICAL_CURRICULUM_AUDIT.md` (unchanged; every recommendation in it is dispositioned below).
**Relationship to existing architecture docs:** This plan operates inside the model already defined by `docs/architecture/CONTENT_MODEL.md` and `docs/architecture/SKILLS_MODEL.md`, and it supersedes `docs/architecture/CURRICULUM_MAP.md`'s "freeze candidate" status for sequencing purposes once approved — that document's own Decision Register is folded into the decisions below rather than tracked twice.

---

## Purpose

The canonical curriculum document defines *what* K–5 spelling instruction should cover. The audit determined *how far* the current repository is from that coverage. Neither document authorizes any change — the canonical curriculum says so explicitly ("implementation requires a separate audit and approved plan"), and the audit says so explicitly ("no curriculum implementation decisions are approved by this document").

This plan is where that authorization happens. It does two distinct jobs, deliberately kept apart:

1. **Decide the architecture.** A small number of project-wide questions — Grade Unit vs. Skill boundaries, URL stability, roadmap philosophy, Skill Family scope — must be settled once, up front, so that every grade's implementation work follows the same rules instead of re-litigating them 26 times.
2. **Plan the execution.** Once the architecture is settled, the rest of this document is an ordinary engineering roadmap: which files change, in what order, with what definition of done. It is not a second round of approvals — it is work planned in service of decisions already made in Part 1.

Where the audit found current content that will eventually move, merge, or be superseded, this plan treats it as **content awaiting migration**, not as a defect. Existing Grade Units keep working exactly as shipped until the day their replacement ships and their route/redirect is decided — nothing in this plan takes anything live offline as a side effect of being planned.

---

## Guiding Principles

These are the standing rules implementation work must follow. They are restatements/applications of `CONSTITUTION.md`, `CONTENT_MODEL.md`, and `SKILLS_MODEL.md` for this specific effort, not new policy.

- **Educational curriculum drives architecture** — the 26 canonical Grade Units are the spine; product grouping serves them, not the reverse.
- **Grade Units are not Practice Sets** — a Grade Unit is a grade-specific curriculum milestone with one primary Practice Set; it is not simply "a list tagged with a grade."
- **Skills remain reusable and grade-neutral** — a Skill is never owned by the grade that first introduces it.
- **Preserve existing URLs and stable IDs whenever practical** — merges produce one canonical ID; superseded IDs are archived, never silently repointed or deleted (`CONTENT_MODEL.md` §9).
- **Minimize content duplication** — reuse existing word lists as contributing Practice Sets/Skills before authoring anything new.
- **Favor migration over rewriting** — narrow existing pages become subskills, contributors, or archived siblings of a broader canonical unit; they are not thrown away and rewritten from scratch.
- **No page exists solely to route to other pages** — gateway pages are transitional by design (`SKILLS_MODEL.md` §16) and must justify themselves as genuine destinations or be scheduled for retirement.
- **Live content stays live during migration** — a current Grade Unit is not treated as "wrong" while its replacement is being built; both can coexist until a cutover is explicitly executed.

---

## Global Decisions

Architectural and product decisions only. Each carries **Approved**, **Rejected**, or **Needs Discussion**. Nothing below is an implementation task — the tasks that follow from these decisions live in the Grade-by-Grade and Phased Roadmap sections with their own Planned/In Progress/Complete status.

### GD-1. Content identity model — **Approved**
Adopt `CONTENT_MODEL.md`'s six identities (Grade Unit, Skill, Practice Set, High-Frequency Word Set, Vocabulary/Theme List, Teaching Guide, Collection) as-is for this effort. No new identity type is introduced to implement the canonical curriculum.
*Rationale:* the model already anticipated exactly this migration (§14, "Migration and compatibility strategy"); inventing a parallel scheme would fragment governance.

### GD-2. Grade Unit vs. Skill boundary — **Approved**
A canonical Grade Unit may be implemented as a single content entry *or* as a roadmap milestone that composes an existing Practice Set, Skill, and/or High-Frequency Word Set — it does not require one dedicated page per canonical unit. Narrow existing pages (individual blends, individual vowel/digraph pages, individual roots) remain Skills or Practice Sets feeding a broader Grade Unit; they are not each promoted to Grade Unit status.
*Rationale:* resolves `CANONICAL_CURRICULUM_AUDIT.md` Risk 1 and `CURRICULUM_MAP.md` Decision Register item 1 the same way both already leaned.

### GD-3. Stable IDs and URL preservation — **Approved**
Existing stable IDs and public routes are preserved wherever the underlying content identity is unchanged. When several existing pages merge into one canonical Grade Unit, one ID is designated canonical (normally the broadest or most-established existing ID) and the others are archived per `CONTENT_MODEL.md` §9 — never deleted, never silently repointed to a materially different purpose. Route/redirect decisions for archived IDs are made per-merge during implementation, not blanket-decided here.
*Rationale:* directly answers `CANONICAL_CURRICULUM_AUDIT.md` Risk 2.

### GD-4. Skill Families and Focused Skills scope — **Approved**
Adopt `SKILLS_MODEL.md` §7's twelve canonical public Skill Families and §8's canonical Focused Skills list as the target taxonomy for this effort. Individual blends, individual roots, and other narrow patterns identified in `SKILLS_MODEL.md` §9 as Practice-Set-level remain Practice Sets/filters, not Skills, for this implementation.
*Rationale:* avoids re-deriving a taxonomy the project already approved; keeps this plan's scope to *wiring and building* the already-named families, not renaming them.

### GD-5. Grade Roadmap philosophy for Grades 2–5 — **Approved**
Grades 2–5 will each get a curated, hand-sequenced Grade Roadmap analogous in kind to `kindergartenProgression.ts` and `grade1Progression.ts` — not the current category-grouped `buildGradeHubSections()` behavior. `buildGradeHubSections()` remains as the supplemental/"more practice" rendering path beneath the curated roadmap, not as the roadmap itself.
*Rationale:* `CONSTITUTION.md` §8 prohibits roadmaps generated automatically from raw categories; this closes that gap for the four grades currently non-compliant.

### GD-6. Documentation governance during this effort — **Approved**
This plan is authoritative for sequencing/placement decisions going forward. `docs/architecture/CURRICULUM_MAP.md` stops being treated as "freeze candidate, pending review" and its Decision Register items are considered resolved by GD-1 through GD-9 below (cross-referenced inline). Older planning documents (`curriculum-bible.md`, `content-production-roadmap.md`, `K5_CURRICULUM_COVERAGE.md`, `curriculum-audit-phase-2.md`) are not edited by this plan itself; a reconciliation pass against this plan is scheduled as Phase 8 work (see Phased Roadmap), not performed now.
*Rationale:* the task constraints for this plan forbid editing other documentation; this decision only schedules that follow-up rather than leaving it unaddressed.

### GD-7. Kindergarten Consonant Digraphs placement — **Approved**
Direction **(b)** is adopted: `kindergarten-consonant-digraphs` is reclassified from a Kindergarten Grade Unit to embedded/supporting content once the Grade 1 Consonant Digraphs and Blends unit (Grade 1 table, above) is live, and it is retired from the Kindergarten core sequence at that point. Until Grade 1's unit ships (Phase 3), `kindergarten-consonant-digraphs` stays exactly as it currently is — this decision authorizes the eventual cutover but does not itself change anything before Phase 3 completes.
*Rationale:* the canonical curriculum is explicit and high-confidence that Grade 1 is the primary placement; reclassification only changes roadmap role, not content — nothing is deleted.

### GD-8. R-Controlled Vowels primary grade — **Approved**
Grade 2 is the canonical primary placement, matching `r-controlled-ar`/`r-controlled-or`/`r-controlled-er-ir-ur` content and the Grade 2 build-out in this plan. Grade 1's `grade-1-r-controlled-ar-or` and `grade-1-r-controlled-er-ir-ur` core steps become optional early-preview/review content rather than the primary introduction, once the Grade 2 unit (Phase 4) is live. Grade 1's steps are not touched before that unit ships and a cutover is executed — both placements coexist until then.
*Rationale:* the content already built for Grade 2 is Grade-2-appropriate per the audit's high-confidence read; Grade 1's role becomes preview/review, not a parallel primary introduction.

### GD-9. Grade 1 gateway pages and thin single-blend pages — **Needs Discussion (deferred)**
*Preferred direction:* per `SKILLS_MODEL.md` §16 and `CURRICULUM_MAP.md` Decision Register item 6, the 9 Grade 1 gateway pages (`grade-1-short-vowel-practice`, `grade-1-consonant-digraph-practice`, etc.) and the ~29 thin single-blend targeted pages are transitional and should eventually be retired once a proper Skills-browsing experience makes their sibling Skill pages independently discoverable.
*Why this stays open:* retiring live, linked pages depends on a Skills browsing experience that does not exist yet and is not scoped by this plan. It is deliberately left deferred rather than approved or rejected, and is scheduled only as contingent follow-up (Phase 9) once that browsing experience is designed and scoped separately. No phase in this plan (Phases 2–8) depends on this decision.

### GD-10. Diphthong family placement (OI/OY, OU/OW) — **Needs Discussion**
Whether `vowel-teams-oi-oy`/`vowel-teams-ou-ow` fold into the existing Vowel Teams Skill Family or become a separate Diphthongs family is unresolved in `SKILLS_MODEL.md` §7 and stays open here by deliberate choice: it is a navigation/taxonomy question, not a curriculum question, and is best decided alongside the public Skills-browsing experience design rather than in isolation now.
*Why this doesn't block Grade 2:* both pages already serve Grade 2's Diphthongs and Other Vowel Patterns Grade Unit (Grade 2 table, above) regardless of which Skill Family they end up filed under. The Grade 2 build-out (Phase 4) proceeds unconditionally; only the eventual public Skill Family filing is deferred.

### GD-11. Kindergarten CVC scope (phonics-foundations format) — **Needs Discussion, out of scope**
Whether Kindergarten needs a distinct pre-CVC phonics-foundations format (e.g., beginning-sound identification) alongside whole-word CVC spelling is a product/format question, not a curriculum-sequencing one. It is explicitly out of scope for this plan and is not scheduled in any phase below.

---

## Grade-by-Grade Implementation

Each canonical Grade Unit is listed with its current implementation, the architectural treatment it falls under (referencing the Global Decisions above), and the concrete migration mapping. Task status uses **Planned / In Progress / Complete**; anything still gated on a Needs Discussion item is marked **Blocked on GD-n**.

### Kindergarten

| Canonical Grade Unit | Current implementation | Decision applied | Reuse | Rename | Merge | New content | New Skills/Families | URL implications | Doc implications | Priority | Dependencies | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sounds, Letters, and Early Encoding | `kindergarten-first-words` (order 1 of K core) | GD-2, GD-3 | `kindergarten-first-words` as base | Yes — retitle/reframe as the explicit encoding milestone | None | Sound-letter mapping / phoneme-segmentation-to-writing framing text; no new word list required | None new | `kindergarten-first-words` ID and route kept | `kindergartenProgression.ts` step 1 description updated | High | None | Planned |
| Short Vowels and CVC Words | `kindergarten-short-a/e/i/o/u-words` + `kindergarten-mixed-vowel-review` (orders 2–7) | GD-2, GD-3 | All six pages as contributing Practice Sets/Skills | None required | Merge presentation into one canonical Grade Unit; five vowel pages + review become Skills/subskills under it | Unit-level explanation/transfer framing | Reuses existing `short-a/e/i/o/u-words` Skills (already built) | `kindergarten-mixed-vowel-review` becomes the surviving canonical ID for the merged unit; five vowel IDs archived as Grade Unit role but kept live as Skills | `kindergartenProgression.ts` restructured from 6 steps to 1 merged step + linked Skills | High | Short Vowels Skill Family (already built) | Planned |
| High-Frequency Words | `kindergarten-heart-words`, `dolch-pre-primer-a/b/c` | GD-2, GD-3 | All four as contributing High-Frequency Word Sets | None | None (High-Frequency Word Sets stay distinct identities per `CONTENT_MODEL.md`) | New Grade Unit/roadmap-milestone wrapper connecting Heart Words + Dolch Pre-Primer | None (High-Frequency Word Set identity, not Skill) | New milestone ID; existing High-Frequency Word Set IDs/routes untouched | `kindergartenProgression.ts` gains explicit milestone; K hub surfaces Dolch Pre-Primer in curated section | High | None | Planned |
| *(Supporting, not canonical)* `kindergarten-consonant-digraphs` | Order 8 of K core, live/tested | GD-7 (**Approved** — direction (b)) | — | — | — | — | — | Route/ID preserved; reclassified from Grade Unit to embedded/supporting role | `kindergartenProgression.ts` drops it from the core sequence once Grade 1's unit ships | Medium | Grade 1 Consonant Digraphs and Blends unit (Phase 3) must ship first | Planned (executes at Phase 3 cutover) |
| *(Non-canonical, supporting)* `kindergarten-ck-ending-words`, `kindergarten-double-consonants` | Orders 9–10 of K core, live/tested; omitted from the original audit inventory | Kindergarten Implementation Amendment (below) | — | — | — | — | — | Routes/IDs preserved; removed from the canonical Kindergarten roadmap and published as supporting/additional-practice content | Kindergarten roadmap data updated so both move from the core sequence to the supporting/additional-practice section | Medium | None | Planned (executes in Phase 2) |

#### Kindergarten Implementation Amendment

During Phase 2 implementation planning, `kindergarten-ck-ending-words` and `kindergarten-double-consonants` were discovered to be live, published, tested Kindergarten core-roadmap steps (orders 9–10) that this plan's Grade K table and the audit's Kindergarten inventory both omitted entirely. Neither page is addressed by the canonical curriculum document, which defines exactly three canonical Kindergarten Grade Units.

Disposition: both pages keep their existing stable IDs, routes, and word lists — untouched, never deleted, archived, or silently repointed. They are not canonical Kindergarten Grade Units under the approved three-unit curriculum, and they are not merged into the Short Vowels and CVC Words unit. Starting in Phase 2, both are removed from the canonical Kindergarten roadmap and published as supporting/additional-practice content instead. This differs in timing from `kindergarten-consonant-digraphs` (GD-7), whose reclassification is deferred to the Phase 3 cutover — this amendment's reclassification executes directly in Phase 2, since it only corrects an inventory omission rather than sequencing a cross-grade cutover.

Phase 3 follow-up: once Grade 1's Consonant Digraphs and Blends unit ships, evaluate each page as potential supporting content for its Grade 1 counterpart — `kindergarten-ck-ending-words` for Grade 1 Final-CK/C-K-CK spelling instruction, `kindergarten-double-consonants` for Grade 1 FLOSS/double-final-consonant instruction — per `CURRICULUM_MAP.md`'s existing rows for these concepts. Neither page is automatically promoted to a canonical Grade 1 Grade Unit by this evaluation.

*Rationale:* corrects an inventory omission discovered during Phase 2 implementation planning without treating it as project-wide architectural policy; it is scoped to these two pages rather than recorded as a new Global Decision.

### Grade 1

| Canonical Grade Unit | Current implementation | Decision applied | Reuse | Rename | Merge | New content | New Skills/Families | URL implications | Doc implications | Priority | Dependencies | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Consonant Digraphs and Blends | `grade-1-consonant-digraphs-final-ck`, `grade-1-beginning-consonant-blends`, `grade-1-ending-consonant-blends` | GD-2, GD-3, GD-7 (Approved) | All three as contributors | None | Merge into one Grade 1 Grade Unit | Sequence framing joining digraphs + beginning/ending blends | Beginning Blends, Ending Blends (named-not-built per `SKILLS_MODEL.md` §8) | `grade-1-consonant-digraphs-final-ck` becomes canonical merged ID; blend pages archived as Grade Unit role, kept live as Skills | `grade1Progression.ts` steps 3–5 merged to 1; once this unit ships, `kindergarten-consonant-digraphs` is reclassified per GD-7 | High | None | Planned |
| Inflectional Endings | `grade-1-inflectional-endings-s-es`, `grade-1-inflectional-endings-ed-ing` | GD-2, GD-3 | Both as contributors | None | Merge into one Grade Unit | Base-word/ending progression framing; 3-sounds-of-`-ed` explanation | Plurals and -s/-es, -ed and -ing (named-not-built) | One surviving ID; other archived | `grade1Progression.ts` steps 9–10 merged to 1 | High | None | Planned |
| Silent E and Long Vowels | `grade-1-long-vowels-silent-e` | GD-2, GD-3 | As-is | None | None | None | Reuses existing `silent-e-long-a/e/i/o/u` Skills | None | Reconcile Skill grade metadata (currently tagged Grade 2) to Grade 1 introduced/Grade 2 practiced per `SKILLS_MODEL.md` §11 | Medium | None | Planned |
| Vowel Teams | `grade-1-long-a-long-o-vowel-teams`, `grade-1-long-e-vowel-teams` | GD-2, GD-3 | Both as contributors | None | Merge into one Grade Unit | Unit-level sequence framing | Reuses `vowel-teams-ai-ay/ee-ea/oa-ow` Skills | One surviving ID; other archived | `grade1Progression.ts` steps 13–14 merged to 1 | High | None | Planned |
| Syllables and Two-Syllable Words | `grade-1-open-syllables-final-y` (narrow: final-Y only) | GD-2, GD-3 | As partial contributor | Yes — broaden title/framing | None (no second page to merge) | Syllable hearing/counting instruction, regular two-syllable spelling, embedded open/closed-syllable use | Open Syllables (named-not-built, provisional per `SKILLS_MODEL.md` §7) | ID likely preserved with broadened scope, or new ID if scope change is judged material per `CONTENT_MODEL.md` §9 | `grade1Progression.ts` step 7 content expanded | Medium | None | Planned |
| *(Relocating out)* R-Controlled Vowels | `grade-1-r-controlled-ar-or`, `grade-1-r-controlled-er-ir-ur` (current Grade 1 core steps) | GD-8 (**Approved**) | — | — | — | — | — | Route/IDs preserved; steps become optional preview/review once the Grade 2 R-Controlled Vowels unit ships | `grade1Progression.ts` reclassifies these steps from core to optional at Phase 4 cutover | Medium | Grade 2 R-Controlled Vowels unit (Phase 4) must ship first | Planned (executes at Phase 4 cutover) |

### Grade 2

| Canonical Grade Unit | Current implementation | Decision applied | Reuse | Rename | Merge | New content | New Skills/Families | URL implications | Doc implications | Priority | Dependencies | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R-Controlled Vowels | `r-controlled-ar`, `r-controlled-or`, `r-controlled-er-ir-ur` (built as Skills, no Grade Unit role) | GD-2, GD-3, GD-8 (Approved) | All three as contributing Skills | None | None | New Grade 2 Grade Unit wrapper treating all five spellings as one family | Promote R-Controlled Vowels to registered Skill Family (`SKILLS_MODEL.md` §7) | New Grade 2 Grade Unit ID; existing Skill IDs untouched | New Grade 2 roadmap entry | High | None | Planned |
| Diphthongs and Other Vowel Patterns | `vowel-teams-oi-oy`, `vowel-teams-ou-ow` | GD-2, GD-3 | Both as contributors | None | None | New Grade 2 Grade Unit wrapper; optionally `oo`, `au/aw` coverage | Public Skill Family filing (Vowel Teams subfamily vs. separate Diphthongs family) left open per GD-10; does not affect this unit | New Grade 2 Grade Unit ID | New Grade 2 roadmap entry | Medium | None (GD-10 does not block this unit; see GD-10) | Planned |
| Syllable Types and Multisyllabic Words | None (Grade 3 has `3rd-grade-multisyllabic-words`) | GD-2, GD-5 | None directly; Grade 3 content as forward reference only | — | None | Full new authoring: six syllable types, consonant-le, Grade-2-level multisyllabic spelling | Syllable Types (Teaching-Guide-level per `SKILLS_MODEL.md` §7), Multisyllabic Words (named-not-built) | New Grade 2 Grade Unit ID | New Grade 2 roadmap entry | High (closes the Grade 1→3 bridge gap `CURRICULUM_MAP.md` §6 finding 2 identifies) | None | Planned |
| Silent Letters and Ending Spelling Patterns | `2nd-grade-silent-letter-words`, `grade-1-floss-rule`, `grade-1-tch-dge-ending-rules` | GD-2, GD-3 | `2nd-grade-silent-letter-words` as base; other two as review/prerequisite contributors | Yes — broaden title | None | Unified explanation and pattern sequence | Silent Letters (named-not-built) | `2nd-grade-silent-letter-words` likely canonical ID | New Grade 2 roadmap entry | Medium | None | Planned |
| Hard and Soft C and G | None | GD-2 | None | — | — | Full new authoring: hard/soft C, hard/soft G, positional generalizations, contrast word sets | New Grade 2 Skill/Teaching Guide topic | New Grade 2 Grade Unit ID | New Grade 2 roadmap entry | Medium (highest authoring cost in Grade 2; sequence after the four units above) | None | Planned |

### Grade 3

| Canonical Grade Unit | Current implementation | Decision applied | Reuse | Rename | Merge | New content | New Skills/Families | URL implications | Doc implications | Priority | Dependencies | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Prefixes | `3rd-grade-prefix-words` (complete per audit) | GD-2, GD-3 | As-is | None | None | None | Links to Common Prefixes / UN and RE Prefixes (named-not-built) | None | Note `2nd-grade-prefixes-un-re` as prerequisite exposure, not parallel unit | Low | None | Planned |
| Suffixes | `3rd-grade-suffix-words` (complete per audit) | GD-2, GD-3 | As-is | None | None | None | Links to Common Suffixes (named-not-built) | None | Note `2nd-grade-suffixes-ful-less` as prerequisite exposure | Low | None | Planned |
| Spelling Changes When Adding Suffixes | `3rd-grade-doubling-final-consonants`, `3rd-grade-dropping-silent-e`, `3rd-grade-changing-y-to-i` | GD-2, GD-3 | All three as contributors | None | Merge into one Grade Unit | Unified base-word-to-derived-word progression; 3-sounds-of-`-ed` cross-reference | Doubling Final Consonants, Dropping Silent E, Changing Y to I (named-not-built, become subskills) | One surviving ID; others archived | New Grade 3 roadmap entry | High | Grade 1 Inflectional Endings unit (for `-ed` cross-reference) | Planned |
| Plurals, Possessives, and Contractions | `2nd-grade-regular-plurals`, `2nd-grade-contractions`, `grade-1-inflectional-endings-s-es` (prerequisite only) | GD-2, GD-3, GD-8-style relocation (Grade 2→3 primary placement) | Both Grade 2 pages as contributors | None | None (no existing possessives content to merge) | Possessives instruction, apostrophe rules, sentence-level convention framing — net-new | Plurals and -s/-es, Contractions (named-not-built) | New Grade 3 Grade Unit ID; Grade 2 pages stay live as prerequisite/review, not deleted | New Grade 3 roadmap entry | Medium | None | Planned |
| Homophones and Commonly Confused Words | `3rd-grade-homophones`, `2nd-grade-homophones` (prerequisite) | GD-2, GD-3 | `3rd-grade-homophones` as base | None | None | Grade Unit/roadmap identity wrapper; explicit sentence-level/proofreading framing | Homophones (named-not-built) | `3rd-grade-homophones` becomes canonical Grade Unit ID | New Grade 3 roadmap entry | Medium | None | Planned |

### Grade 4

| Canonical Grade Unit | Current implementation | Decision applied | Reuse | Rename | Merge | New content | New Skills/Families | URL implications | Doc implications | Priority | Dependencies | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Greek and Latin Roots | `tier-1-roots-and-patterns`, `tier-2-greek-latin-roots`, `4th-grade-advanced-prefixes`, `4th-grade-advanced-suffixes` | GD-2, GD-3 | All four as contributors | Yes — replace internal "tier" labels with parent-facing canonical title | Merge under one Grade 4 Grade Unit | Milestone linking roots, affixes, meaning, academic-word use | Greek and Latin Roots (named-not-built), Advanced Prefixes/Suffixes (provisional per `SKILLS_MODEL.md` §8) | One surviving canonical ID; others archived | New Grade 4 roadmap entry | High | None | Planned |
| Advanced Multisyllabic Words | `4th-grade-multisyllabic-academic-words` | GD-2, GD-3 | As base practice set | Yes — broaden from "word collection" framing to instructional unit | None | Integrated syllabication/morphology strategy, schwa/difficult-vowel embedded support | Multisyllabic Words (named-not-built) | ID preserved | New Grade 4 roadmap entry | Medium | Grade 2 Syllable Types unit (conceptual prerequisite) | Planned |
| Final Stable Syllables and High-Frequency Word Endings | `4th-grade-advanced-suffixes` (partial overlap), `5th-grade-spelling-rules` (some examples) | GD-2, GD-3 | Both as partial contributors | None | None | Net-new: explicit `-tion`/`-sion`/`-ture` final-stable-syllable coverage | New Skill/subskill grouping | New Grade 4 Grade Unit ID | New Grade 4 roadmap entry | Medium | None | Planned |
| Derived Words and Word Meaning | `3rd-grade-root-word-families`, `4th-grade-advanced-prefixes`, `4th-grade-advanced-suffixes`, `4th-grade-commonly-confused-words` | GD-2, GD-3 | All four as contributors | None | Merge into one Grade 4 Grade Unit | Paired word-family sets tying spelling/pronunciation/meaning | None new beyond existing | One surviving canonical ID; others archived (noting overlap with Greek and Latin Roots unit above — keep `skillIds` distinct per unit) | New Grade 4 roadmap entry | Medium | Greek and Latin Roots unit | Planned |

### Grade 5

| Canonical Grade Unit | Current implementation | Decision applied | Reuse | Rename | Merge | New content | New Skills/Families | URL implications | Doc implications | Priority | Dependencies | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Advanced Roots, Affixes, and Academic Words | `5th-grade-greek-latin-word-parts`, `5th-grade-prefix-suffix-words`, `5th-grade-academic-words`, `5th-grade-multisyllabic-academic-words` | GD-2, GD-3 | All four as contributors | None | Merge into one Grade 5 Grade Unit | Integrative framework requiring productive morphology use | None new beyond existing | One surviving canonical ID; others archived | New Grade 5 roadmap entry | Medium | Grade 4 Greek and Latin Roots unit | Planned |
| Spelling Changes in Related Words | `5th-grade-spelling-rules` | GD-2, GD-3 | As base, split | Yes — "Spelling Rules" renamed to canonical title | None | Broader related-word-derivation-change content beyond current ending-pattern list | Suffix Spelling Changes umbrella (named-not-built) | ID preserved for the retained endings subskill; possible new ID for the broader unit if scope materially changes per `CONTENT_MODEL.md` §9 | New Grade 5 roadmap entry | Medium | Grade 3 Spelling Changes When Adding Suffixes unit | Planned |
| Meaning-Based and Conventional Spelling | `5th-grade-commonly-confused-words`, `5th-grade-reading-writing-words`, `5th-grade-opinion-argument-words`, `5th-grade-academic-words` | GD-2, GD-3 | All four as contributors | None | None (wrapper unit, not a literal content merge) | New Grade 5 Grade Unit wrapper integrating usage choice, conventional-spelling review, embedded proofreading transfer | Commonly Confused Words (named-not-built) | New Grade 5 Grade Unit ID; contributor pages' identities as Vocabulary/Theme or Grade Unit contributors clarified individually | New Grade 5 roadmap entry | Low | None | Planned |

---

## Cross-cutting migrations

These span multiple grades and are tracked once rather than per-grade.

- **Grade hubs.** Replace `buildGradeHubSections()`-only rendering for Grades 2–5 with curated roadmap modules (`grade2Progression.ts` … `grade5Progression.ts`, mirroring `src/lib/content/kindergartenProgression.ts` / `grade1Progression.ts`), wired into `src/pages/spelling-lists/[gradeSlug].astro` alongside the existing K/1 branches. *(GD-5.)*
- **Skill Families.** Register the not-yet-built named Skills from `SKILLS_MODEL.md` §8 as they're needed by each grade's build-out (Beginning/Ending Blends, Plurals and -s/-es, Contractions, -ed and -ing, Common Suffixes, Suffix Spelling Changes subskills, Common/UN-RE Prefixes, Greek and Latin Roots, Homophones, Commonly Confused Words) in `src/lib/content/spellingSkills.ts`. *(GD-4.)*
- **`skillIds` wiring.** Every merged/created Grade Unit declares its `skillIds` at creation time rather than as a follow-up pass; existing published Grade Units (currently ~1 of ~25 intended links wired, per `CURRICULUM_MAP.md` §3) are wired retroactively during each grade's phase.
- **Content roles.** Confirm `contentRole` values (`grade-unit`, `skill`, `high-frequency-word-set`, `vocabulary-theme`) are set correctly on every page touched by a merge, including newly-archived superseded IDs.
- **Navigation.** Grade hub pages surface the curated roadmap first, with `buildGradeHubSections()` output retained underneath as "additional practice," matching the K/1 pattern already shipped.
- **Documentation.** Tracked as Phase 8 below — `docs/architecture/CONSTITUTION.md`, `CONTENT_MODEL.md`, `SKILLS_MODEL.md`, `CURRICULUM_MAP.md`, `CURRICULUM_ARCHITECTURE.md`, `CONTENT_ARCHITECTURE.md`, `PHONICS_STRATEGY.md`, `GRADE_LEVEL_STRATEGY.md`, `LIST_ARCHITECTURE.md`, `LIST_SPECIFICATIONS.md`, `WORD_CATALOG.md`, and `docs/content/curriculum-bible.md` all need a reconciliation pass against this plan — listed here for completeness, not executed by this plan.
- **Validation/tests.** Add validation for: role coverage per grade, canonical Grade Unit ordering, unresolved `skillIds` references, and duplicate/archived-ID conflicts (audit backlog item 12).

---

## Phased Implementation Roadmap

Every phase lists why it exists, what changes, its dependencies, and — per the refinement requested — its **deliverables (definition of done)**. Status for every phase starts **Planned**.

### Phase 1 — Architecture sign-off
**Why:** No execution phase should start against unapproved architecture.
**Changes:** None to code/content. Product owner reviews and signs off on Global Decisions.
**Dependencies:** None.
**Deliverables:**
- [x] GD-1 through GD-8 formally approved.
- [x] GD-9 confirmed deferred, contingent on a future Skills-browsing experience; does not block Phases 2–8.
- [x] GD-10 confirmed left open as a navigation/taxonomy question to revisit alongside the Skills-browsing experience design; does not block Phase 4.
**Status:** Complete

### Phase 2 — Kindergarten normalization
**Why:** Smallest, best-understood gap (audit confidence: High throughout); establishes the merge pattern reused in every later phase.
**Changes:** `src/lib/content/kindergartenProgression.ts` restructured per the Grade K table above; `kindergarten-mixed-vowel-review` becomes the canonical Short Vowels and CVC Words ID; new High-Frequency Words milestone added; `kindergarten-first-words` reframed as Sounds/Letters/Early Encoding. `kindergarten-consonant-digraphs` is **not** touched in this phase — its GD-7 reclassification executes at the Phase 3 cutover, once Grade 1's Consonant Digraphs and Blends unit ships. Per the Kindergarten Implementation Amendment above, `kindergarten-ck-ending-words` and `kindergarten-double-consonants` are removed from the canonical core roadmap and published as supporting/additional-practice content in this phase; their IDs, routes, and word lists are unchanged.
**Dependencies:** Phase 1 sign-off.
**Deliverables:**
- [ ] Kindergarten roadmap reflects exactly 3 canonical Grade Units plus `kindergarten-consonant-digraphs` as the one temporary supporting core step (GD-7, until Phase 3's cutover); `kindergarten-ck-ending-words` and `kindergarten-double-consonants` move to supporting/additional-practice content (Kindergarten Implementation Amendment).
- [ ] Five short-vowel pages + mixed review reclassified as Skills feeding the merged unit; archived Grade Unit role recorded.
- [ ] High-Frequency Words milestone live, surfacing Heart Words + Dolch Pre-Primer.
- [ ] `kindergartenProgression.ts` tests updated and passing.
**Status:** Planned

### Phase 3 — Grade 1 normalization
**Why:** Second-best-understood gap; resolves the largest number of narrow-duplicate Grade Units in one pass, and executes the GD-7 Kindergarten cutover once its Consonant Digraphs and Blends unit is live.
**Changes:** `src/lib/content/grade1Progression.ts` restructured per the Grade 1 table (Consonant Digraphs and Blends merge, Inflectional Endings merge, Vowel Teams merge, Syllables unit broadened). Once this ships, `kindergarten-consonant-digraphs` is reclassified per GD-7 (Kindergarten phase follow-up, not a Grade 1 file change). R-controlled steps stay in Grade 1's core sequence in this phase — their GD-8 reclassification to optional preview/review executes at the Phase 4 cutover, once Grade 2's R-Controlled Vowels unit ships.
**Dependencies:** Phase 2 pattern established.
**Deliverables:**
- [ ] Grade 1 roadmap reflects the 5 canonical Grade Units.
- [ ] Merged units' `skillIds` wired to Beginning/Ending Blends, Plurals-and--s/-es-adjacent, and Vowel Team Skills.
- [ ] `kindergarten-consonant-digraphs` reclassified out of the K core sequence (GD-7 cutover).
- [ ] `kindergarten-ck-ending-words` and `kindergarten-double-consonants` evaluated as potential supporting content for their Grade 1 counterparts (Final-CK/C-K-CK and FLOSS/double-final-consonant instruction, respectively), per the Kindergarten Implementation Amendment; neither is automatically promoted to a canonical Grade 1 Grade Unit.
- [ ] `grade1Progression.ts` and `kindergartenProgression.ts` tests updated and passing.
**Status:** Planned

### Phase 4 — Grade 2 build-out
**Why:** Grade 2 currently has zero Grade Units; this is the first grade requiring net-new roadmap infrastructure, not just a restructure.
**Changes:** New `src/lib/content/grade2Progression.ts`; new Grade 2 branch in `src/pages/spelling-lists/[gradeSlug].astro`; 5 Grade 2 Grade Units built per the Grade 2 table, including full new authoring for Hard and Soft C and G and for Syllable Types and Multisyllabic Words. Once this unit ships, Grade 1's r-controlled steps are reclassified to optional preview/review per the GD-8 cutover.
**Dependencies:** Phase 3 (Grade 1 core sequence stable). GD-10 (Diphthong family filing) is explicitly **not** a dependency — the Diphthongs Grade Unit ships regardless of that open question.
**Deliverables:**
- [ ] `grade2Progression.ts` exists with 5 ordered Grade Units.
- [ ] Grade 2 hub page renders the curated roadmap (not `buildGradeHubSections()` alone).
- [ ] R-Controlled Vowels promoted to a registered Skill Family.
- [ ] Grade 1's r-controlled steps reclassified to optional preview/review (GD-8 cutover); `grade1Progression.ts` tests updated.
- [ ] Hard and Soft C and G content authored and reviewed.
- [ ] Tests added for the new roadmap module.
**Status:** Planned

### Phase 5 — Grade 3 completion
**Why:** Grade 3 has 2 of 5 canonical units live (Prefixes, Suffixes); this phase closes the remaining 3, including the "structural cliff" `CURRICULUM_MAP.md` §6 identifies (Grade 3 otherwise has zero built morphology units beyond those two).
**Changes:** New `grade3Progression.ts`; merge the 3 suffix-spelling-change pages; author Possessives content; wrap Homophones with Grade Unit identity.
**Dependencies:** Phase 3 (Inflectional Endings unit, for `-ed` cross-reference).
**Deliverables:**
- [ ] `grade3Progression.ts` exists with 5 ordered Grade Units.
- [ ] Grade 3 hub renders curated roadmap.
- [ ] Possessives content authored.
- [ ] Suffix-spelling-change merge complete with subskills wired.
**Status:** Planned

### Phase 6 — Grade 4 build-out
**Why:** Grade 4 has strong raw content (roots, academic words, advanced affixes) but zero Grade Unit roadmap identity.
**Changes:** New `grade4Progression.ts`; merge roots content; broaden multisyllabic-words framing; author Final Stable Syllables content; merge derived-words contributors.
**Dependencies:** Phase 4 (Syllable Types unit as conceptual prerequisite for Advanced Multisyllabic Words).
**Deliverables:**
- [ ] `grade4Progression.ts` exists with 4 ordered Grade Units.
- [ ] Grade 4 hub renders curated roadmap.
- [ ] Final Stable Syllables content authored.
- [ ] Greek and Latin Roots Skill Family populated and wired.
**Status:** Planned

### Phase 7 — Grade 5 completion
**Why:** Closes the K–5 spine; Grade 5 content is largely present but scattered across topic/vocabulary pages rather than organized as 3 canonical units.
**Changes:** New `grade5Progression.ts`; merge academic/roots/affix contributors; rename and split Spelling Rules; wrap Meaning-Based and Conventional Spelling contributors.
**Dependencies:** Phase 6 (Greek and Latin Roots), Phase 5 (Spelling Changes When Adding Suffixes, for Spelling Changes in Related Words).
**Deliverables:**
- [ ] `grade5Progression.ts` exists with 3 ordered Grade Units.
- [ ] Grade 5 hub renders curated roadmap.
- [ ] All Grade 5 contributor pages have confirmed content-role classification (Grade Unit contributor vs. Vocabulary/Theme List).
**Status:** Planned

### Phase 8 — Cross-cutting wiring, validation, and documentation reconciliation
**Why:** Individual grade phases wire their own `skillIds` as they go, but Family-level completeness, validation tooling, and documentation consistency are project-wide concerns best closed together once all six grades are live.
**Changes:** Complete any remaining `skillIds` gaps; add validation for role coverage, ordering, and archived-ID conflicts; reconcile `CONSTITUTION.md`, `CONTENT_MODEL.md`, `SKILLS_MODEL.md`, `CURRICULUM_MAP.md`, and the older strategy/architecture docs listed in Cross-cutting migrations against this plan's outcomes.
**Dependencies:** Phases 2–7 complete.
**Deliverables:**
- [ ] `skillIds` wiring at parity with intended links across all grades.
- [ ] Validation suite covers role coverage, ordering, and ID-conflict checks.
- [ ] All named documentation files updated to reflect the shipped structure (or explicitly marked superseded).
- [ ] `CURRICULUM_MAP.md` status changed from "freeze candidate" to authoritative, or retired in favor of this plan.
**Status:** Planned

### Phase 9 — Deferred/contingent follow-ups (GD-9, GD-10)
**Why:** Two items are correct in direction but contingent on work outside this plan's critical path: gateway-page retirement depends on a Skills-browsing experience that doesn't exist yet (GD-9); Diphthong Skill Family filing is a navigation/taxonomy call best made as part of designing that same browsing experience (GD-10). Tracking them as a distinct phase keeps them visible without blocking Phases 2–8, all of which are unconditioned on either.
**Changes:** Executed only once a Skills browsing experience is designed and scoped (a separate future plan): Grade 1 gateway/thin single-blend page retirement, and the Diphthongs-vs-Vowel-Teams family filing decision.
**Dependencies:** A Skills browsing experience (not scheduled by this plan).
**Deliverables:**
- [ ] Skills browsing experience scoped (separate plan).
- [ ] GD-10 resolved as part of that scoping work; Diphthong pages filed accordingly.
- [ ] GD-9 resolved; Grade 1 gateway/thin-page retirement executed or explicitly re-affirmed as permanent.
**Status:** Planned (contingent)

---

## Success Criteria

Implementation of the canonical curriculum is complete when:

1. All 26 canonical Grade Units (3 K + 5 G1 + 5 G2 + 5 G3 + 4 G4 + 3 G5) have exactly one canonical implementation each — a page or a composed roadmap milestone — reachable from that grade's curated Grade Roadmap.
2. Grades 2–5 have curated, hand-sequenced roadmaps equivalent in kind to Kindergarten and Grade 1 (Phase 4–7 deliverables all checked).
3. No canonical Grade Unit remains represented only by narrow, duplicate, or misplaced content without an explicit, dispositioned migration record in this plan.
4. Every published Grade Unit's `skillIds` links are wired to their intended Skills (Phase 8 deliverable).
5. Every stable ID retired by a merge is archived, not deleted, with its replacement relationship recorded per `CONTENT_MODEL.md` §9.
6. Named documentation (Phase 8) is internally consistent with the shipped structure — no document still describes a superseded placement as current without a note.
7. GD-9 and GD-10 (the remaining open items) are either resolved and executed as part of the Skills-browsing-experience scoping work, or explicitly re-affirmed — neither remains silently unresolved indefinitely. GD-11 stays intentionally out of scope.
