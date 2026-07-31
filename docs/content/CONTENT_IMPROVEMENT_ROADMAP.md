# Content Improvement Roadmap — spellingwords.app

**Status:** Living document. Operating plan for the editorial-improvement phase, now that curriculum, taxonomy, and page architecture are frozen.
**Scope:** all pages included in the frozen canonical public architecture. See §1.

This document is the operating plan for improving the written content of every canonical active page on spellingwords.app. It is both a strategy document and a checkbox-driven implementation checklist. A new contributor — human, Claude Code, or Codex — should be able to pick up work from this file alone, without reconstructing project history from chat logs or commit messages.

**Companion inventory files** (full page-by-page tables; this document stays readable by linking out to them rather than embedding every row inline):

- `docs/content/inventory/skill-pages.md` — every canonical Skill page, by family
- `docs/content/inventory/grade-curriculum-pages.md` — every canonical Grade Unit and Additional Practice page, by grade
- `docs/content/inventory/sight-words-and-common-words.md` — the canonical Common Words (High-Frequency Words) gateways and sets
- `docs/content/inventory/deprecated-and-legacy-pages.md` — pages that exist in the repository but are **not** part of the canonical architecture; repository awareness only, not an editorial worklist
- `docs/content/inventory/untagged-and-data-quality.md` — pages that couldn't yet be classified canonical-active or deprecated-legacy, plus repository findings

Keep this file and the inventory files synchronized: this file owns strategy, phases, definitions of done, priority framework, and running totals; the inventory files own per-page rows and per-page editorial status. See §15.

**Editorial content standard for the Skill layer:** `docs/content/CANONICAL_SKILL_PAGE_STANDARD.md` governs the detailed content structure, instructional variants, example selection, and editorial review for canonical Skill pages (Layer 1, §2). It is subordinate to this roadmap for scope, sequencing, priority, and definition of done, and subordinate to the frozen architecture docs for taxonomy and identity — see §5 and the Phase 1 entry in §3.

---

## 1. Status and purpose

### What is frozen (do not reopen)

- The K–5 Grade Unit curriculum and sequence (`docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`).
- The Grade Hub architecture — Core Spelling / High-Frequency Words / Additional Practice, three sections per grade (`docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md`, frozen, authoritative for public architecture).
- Common Words (High-Frequency Words) set counts and structure per grade.
- Additional Practice: the specific, bounded set of approved cards per grade (including the grades — Grade 3 currently has zero — that intentionally have none).
- The canonical Skills architecture: 12 families, 41 skill slots (40 backed by content, 1 — IE and IGH Words — provisional/content-pending) (`docs/architecture/SKILLS_ARCHITECTURE.md`).
- The Skills Hub organization and the set of public pages that should exist.

"Finished" for all of the above means the pages exist, their roles are known, their position in the site architecture is settled, and it's been decided which pages are publicly displayed. **It does not mean the pages are editorially complete.**

### Scope is the canonical architecture, not the repository

The repository contains more published content than the frozen architecture defines — most notably a legacy Dolch sight-word system and a set of orphaned single-pattern phonics pages that predate the current Grade Hub/Skills design. Every page in this roadmap's active scope is classified using one test:

**A page is canonical active if it is explicitly defined by `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md` or `docs/architecture/SKILLS_ARCHITECTURE.md`, or it is a required implementation artifact of that architecture** (a Grade Hub, the Skills Hub, or the main browse page). Live code (`src/lib/content/gradeHubCards.ts`, `src/lib/content/spellingSkills.ts`) verifies the architecture is actually wired into navigation and surfaces drift — it does not redefine what's canonical.

Every content-collection page in the repository falls into exactly one of three buckets:

| Classification | Meaning | Where it lives |
|---|---|---|
| **Canonical active** | Defined by the frozen architecture; in this roadmap's editorial scope | `skill-pages.md`, `grade-curriculum-pages.md`, `sight-words-and-common-words.md` |
| **Deprecated / legacy** | Exists in the repository, sometimes still live and linked, but not part of the frozen architecture; documented for awareness only | `deprecated-and-legacy-pages.md` — no checklists, no DoD, no priority, no phase membership |
| **Unresolved** | Not named by the architecture docs and not matched by a documented legacy pattern; needs a classification decision before any work | `untagged-and-data-quality.md` |

Current counts: **150 canonical-active pages** (plus 1 provisional Skill taxonomy slot with no content file yet) · **81 deprecated/legacy pages** · **36 unresolved pages**. See §4 and §14 for the breakdown, and §15 for how a page moves between buckets as facts change.

A deprecated/legacy classification is not a judgment that the content is bad — it means the frozen architecture doesn't currently define a role for it. The legacy Dolch tier is, in fact, still linked from the main browse page today (`/spelling-lists` → `/spelling-lists/sight-words` → the Dolch collections) — real, reachable, and still explicitly out of this roadmap's scope, because reachability and canonical status are different questions. If a future product decision brings a deprecated page back into the architecture, move it into the active inventory at that time (§15) — don't start improving it first.

### What this phase includes

Rewriting, strengthening, and completing the *written content* of canonical-active pages so they serve parents, teachers, and students well, and perform for traditional search, AI answer engines, topical authority, SEO, GEO, and AEO: educational accuracy and clarity, direct-answer quality, internal linking, metadata/structured-data accuracy, and editorial consistency within and across Skill families and grades.

### What this phase excludes

- Visual and presentation redesign — deferred to a later phase. Do not touch layout, components, or styling.
- Re-deciding curriculum, page taxonomy, Skill families, Grade Unit sequence, Common Words, Additional Practice, or the public page hierarchy. If content work surfaces a real architectural gap, record it (§11, and the mismatches already logged in the inventory files) — don't resolve it by moving pages, renaming ids/slugs, or inventing new pages.
- Editorial work of any kind on deprecated/legacy or unresolved pages, until a product-owner decision moves a page into canonical-active scope.
- New curriculum pages, page deletions, or page merges.
- Full research citations for every page as part of this planning task (§11 governs future page work).

---

## 2. Content-layer model

Five page layers exist within the canonical architecture. Each layer's page set is defined by the classification test in §1 — not by the `category` folder or `contentRole` frontmatter field, which are implementation details that can drift from the architecture. Understanding what belongs on each layer, and what must *not* be duplicated there, is the main defense against the site turning into near-identical pages saying the same six things in different words.

### Layer 1 — Skill pages
**Purpose:** the canonical, grade-independent reference for a spelling concept (e.g. Short A Words, SH Digraph Words, Common Prefixes). **Defined by:** the 41-slot taxonomy in `docs/architecture/SKILLS_ARCHITECTURE.md`, implemented as `spelling-lists` entries with `contentRole: skill`.
**Belongs here:** the strongest possible explanation of the pattern itself — what it is, how to hear/recognize it, how it's typically taught, common misconceptions, a representative (not exhaustive) word set, and links out to every grade that touches the concept.
**Must not duplicate:** grade-specific pacing, a specific grade's expectations, or a single grade's full word-list treatment — that's Layer 2's job.
**Linking role:** the anchor other layers link *into*. Every Grade Unit that teaches this concept should link back here (via `skillIds`, currently almost unpopulated — see the data-quality file). This is the page most likely to earn topical authority and answer-engine citations, so it carries the most SEO/GEO/AEO weight per page.

### Layer 2 — Grade curriculum pages
**Purpose:** explain and provide practice for a concept at a specific grade's expectations and difficulty (e.g. 3rd Grade Prefix Words, Grade 2 Silent Letter Words). **Defined by:** the per-grade Core Spelling and Additional Practice cards named in `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md`, implemented as `spelling-lists` entries with `contentRole: grade-unit` or `vocabulary-theme`.
**Belongs here:** what children at *this* grade practice, why this word set was chosen at this level, grade-appropriate examples, and a link back to the canonical Skill page plus adjacent grade-units (`prerequisiteLists`/`nextLists`).
**Must not duplicate:** the full conceptual explanation already on the Skill page — link to it instead of re-deriving it.
**Linking role:** links up to its canonical Skill page, sideways to `prerequisiteLists`/`nextLists`, and up to its Grade Hub.

### Layer 3 — Grade Hub pages
**Purpose:** summarize and organize one grade's Core Spelling, Common Words, and any approved Additional Practice (e.g. "3rd Grade Spelling Words"). **Defined by:** `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md`; implemented as code (`src/pages/spelling-lists/[gradeSlug].astro` + `src/lib/content/gradeHubCards.ts`/`gradeHubCopy.ts`), not a content file.
**Belongs here:** short orienting copy, a scannable map of the grade's three sections, and links into every child page.
**Must not duplicate:** lesson content from any child page.
**Linking role:** routes down into every Grade Unit/Common Words/Additional Practice page for that grade, and up to the Skills Hub / main browse page.

### Layer 4 — Skills Hub
**Purpose:** the main "Browse by Skill" directory across all 12 frozen families. **Defined by:** `docs/architecture/SKILLS_ARCHITECTURE.md`; implemented as `src/pages/spelling-lists/skills/index.astro` + `spellingSkills.ts`.
**Belongs here:** brief family descriptions and a clear path into each Skill page.
**Must not duplicate:** any single Skill page's explanation of its pattern.
**Linking role:** routes down into every Skill page; sits alongside (not beneath) the Grade Hubs as a second, skill-first way to reach the same underlying content.

### Layer 5 — Main spelling-list browse page
**Purpose:** the top-level entry point where a user chooses Grade-based or Skill-based browsing (`src/pages/spelling-lists/index.astro`).
**Belongs here:** a short explanation of the journeys — Grade-based, Skill-based, and "practice your own words," per `docs/architecture/CONSTITUTION.md`'s three user journeys — and links to the Grade Hubs and Skills Hub.
**Must not duplicate:** hub-level or page-level content — this page should be the shortest, least detailed page in the whole hierarchy.
**Note:** this page currently also links to legacy category pages (`/spelling-lists/sight-words`, etc.) that are outside canonical scope — see §1 and `deprecated-and-legacy-pages.md`. That linkage is a fact about today's implementation, not something this roadmap resolves.

### The Skill-page vs. Grade-unit distinction (the one most at risk of duplication)

A Skill page and a Grade Unit page covering the same pattern (e.g. `oi-and-oy-words` vs. `vowel-teams-oi-oy`, a Grade 2 unit) must read as **complements, not clones**:

- The Skill page answers "what is this pattern and how does it work" for any parent regardless of their child's grade.
- The Grade Unit page answers "what does *this grade* practice, and how does the selected word list express the concept at this level of difficulty" — it assumes the reader already knows, or has just linked to, the general explanation.
- Word lists should differ in difficulty/length; framing should differ in specificity ("third graders are ready to..." vs. a grade-neutral "children learn to..."); the Grade Unit page should link to the Skill page rather than re-explaining the pattern from scratch.

---

## 3. Recommended work sequence

Editorial order: **Skill pages → Grade curriculum pages → Grade Hub pages → Skills Hub → Main browse page.** Evaluated against the actual repository (the canonical-active/deprecated split, the near-empty `skillIds` linking field, hub implementation) and holds up — the dependency logic below is real, not just tidy-looking. All phases operate on canonical-active pages only.

### Phase 0 — Inventory and baseline
**Position rationale:** sequencing "complete families together" (the central planning principle) requires first knowing which pages are actually in scope. This roadmap's classification pass is Phase 0's main deliverable.
**Dependencies:** none — this is the starting point.
**Outputs:** this document; the five inventory files; resolved or explicitly deferred product-owner decisions on the 3 non-taxonomy "skill"-tagged pages and the remaining unresolved pages (§1, `untagged-and-data-quality.md`); `contentRole` backfilled only on pages already confirmed canonical-active.
**Must not do prematurely:** rewrite any page's prose content, or begin editorial work on an unresolved or deprecated/legacy page before it's confirmed canonical-active.

### Phase 1 — Skill-page content
**Position rationale:** Skill pages are Layer 1 — the grade-independent anchor every Grade Unit page should eventually link to, and the page most likely to earn direct search/AI-answer citations.
**Dependencies:** Phase 0 complete for the family being worked; the 3 non-taxonomy "skill"-tagged pages resolved or explicitly deferred so family membership is unambiguous before drafting begins.
**Outputs:** 40 (41 once IE/IGH is authored) strong, differentiated, internally consistent canonical explanations — the terminology and structural pattern later work will reuse.
**Must not do prematurely:** IE and IGH Words cannot be completed here — no content file exists yet, and authoring its word bank is separate future work, not a Phase 1 task.
**Editorial standard:** every Phase 1 page must follow `docs/content/CANONICAL_SKILL_PAGE_STANDARD.md`, which governs page structure, the four instructional variants, example selection, teaching guidance, and editorial review for the Skill layer. A Skill page should have an approved content brief (`docs/content/templates/SKILL_PAGE_CONTENT_BRIEF.md`, acceptance checklist in the standard §20) before drafting begins. This roadmap still owns scope, sequencing, priority, and the page-level definition of done (§8); the standard does not change any of that.

### Phase 2 — Grade curriculum content
**Position rationale:** each Grade Unit page needs a finished canonical Skill page to link back to and differentiate itself from (§2) — writing grade content first risks re-deriving the same explanation 5–6 times per family and then retrofitting links.
**Dependencies:** the corresponding Skill page(s) for a family reach "Complete" (§8) before that family's Grade Unit pages are drafted. Organize by grade **within** a family once its Skill pages are done, per the canonical Grade Unit sequence (K→5), not by grade first.
**Outputs:** canonical-active grade-unit and vocabulary-theme pages differentiated from their Skill pages, with populated `skillIds` back-links and correct `prerequisiteLists`/`nextLists`.
**Must not do prematurely:** don't write later grades ahead of earlier grades within the same family if doing so requires guessing at a still-unwritten earlier grade's terminology.

### Phase 3 — Grade Hub content
**Position rationale:** a Grade Hub's job is to accurately summarize and route to its children — writing hub copy before the children are in good shape means the hub either misrepresents what's there or has to be rewritten later.
**Dependencies:** that grade's Core Spelling and Common Words content substantially complete.
**Outputs:** 6 Grade Hub pages (K–5) with accurate, non-duplicative orienting copy.
**Must not do prematurely:** don't let hub copy expand into full lessons (§7).

### Phase 4 — Skills Hub content
**Position rationale:** the Skills Hub's family summaries only make sense once the Skill pages they point to are finished and consistent within each family.
**Dependencies:** Phase 1 substantially complete across all 12 families.
**Outputs:** one polished Skills Hub page.
**Must not do prematurely:** don't finalize family descriptions while a family's Skill pages are still mid-draft.

### Phase 5 — Main browse-page content
**Position rationale:** the shortest, most derivative page — entirely dependent on the Grade Hubs and Skills Hub it links to being in good shape — so it's written last.
**Dependencies:** Phases 3 and 4 complete.
**Outputs:** one refined top-level browse page.
**Must not do prematurely:** don't reproduce hub content here (§2, Layer 5).

### Phase 6 — Cross-site consistency and final editorial audit
**Position rationale:** a global consistency sweep is cheapest to do once, at the end, after every layer has had its dedicated pass.
**Dependencies:** Phases 1–5 complete.
**Outputs:** a site-wide audit confirming no orphaned links, no unresolved near-duplicates, consistent terminology across all layers, and that every page meets §8's definition of done.
**Must not do prematurely:** this is explicitly the last phase — use targeted spot-checks (the per-batch consistency-review items in §6/§7) mid-flight instead.

---

## 4. Repository-backed page inventory

Full per-page tables live in the companion inventory files (linked at the top of this document). Summary:

| Layer / grouping | Count | Classification | Inventory file |
|---|---:|---|---|
| Skill pages (41-slot taxonomy) | 40 live + 1 provisional (no file) | Canonical active | `inventory/skill-pages.md` |
| Grade Unit + Additional Practice pages | 75 | Canonical active | `inventory/grade-curriculum-pages.md` |
| Common Words gateway pages | 6 | Canonical active | `inventory/sight-words-and-common-words.md` |
| Common Words member sets | 29 | Canonical active | `inventory/sight-words-and-common-words.md` |
| Grade Hubs, Skills Hub, main browse page | 8 (6 + 1 + 1, code-driven) | Canonical active | this file, §7 |
| Dolch tier gateways + member sets, orphaned phonics pages, archived pages | 81 | Deprecated / legacy | `inventory/deprecated-and-legacy-pages.md` |
| Pages not resolved by the classification test | 36 | Unresolved | `inventory/untagged-and-data-quality.md` |
| **Total content-collection files** | **267** (255 `spelling-lists` + 12 `spelling-collections`) | — | all inventory files combined |

**Active editorial scope = 150 canonical-active pages** (plus the 1 provisional Skill slot, plus 8 code-driven pages). Every classification was made against the frozen architecture documents, verified against live code, and cross-checked directly with each file's frontmatter — none of it was inferred from filenames or folder names.

---

## 5. Canonical Skill-family checklist

Generated from the frozen taxonomy in `docs/architecture/SKILLS_ARCHITECTURE.md`, verified against `src/lib/content/spellingSkills.ts`. 12 families, 41 skill slots (40 backed by a live published page today; 1 — IE and IGH Words — provisional). All 41 slots are canonical active by definition — this layer has no deprecated/legacy content. Check items only once the definition of done (§8) is actually met; per-page detail is in `inventory/skill-pages.md`.


### Short Vowels and CVC Words

- [ ] Family audit completed
- [ ] Shared terminology and page pattern agreed
- [ ] Short A Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Short E Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Short I Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Short O Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Short U Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Family-wide consistency review completed
### Consonant Digraphs

- [ ] Family audit completed
- [ ] Shared terminology and page pattern agreed
- [ ] CH Digraph Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] SH Digraph Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] TH Digraph Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] WH Digraph Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Family-wide consistency review completed
### Consonant Blends

- [ ] Family audit completed
- [ ] Shared terminology and page pattern agreed
- [ ] Beginning Blends
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Ending Blends
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Family-wide consistency review completed
### Common Spelling Patterns

- [ ] Family audit completed
- [ ] Shared terminology and page pattern agreed
- [ ] CK, Double Letters, and TCH/DGE Word Endings
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Silent Letters
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Soft C and Soft G
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Family-wide consistency review completed
### Silent E

- [ ] Family audit completed
- [ ] Shared terminology and page pattern agreed
- [ ] Long A Silent E Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Long I Silent E Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Long O Silent E Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Long U Silent E Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Family-wide consistency review completed
### Vowel Teams

- [ ] Family audit completed
- [ ] Shared terminology and page pattern agreed
- [ ] AI and AY Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] EE and EA Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] OA and OW Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] OI and OY Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] OU and OW Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] OO Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] AU and AW Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] IE and IGH Words — **blocked, content-pending** (no source file exists; taxonomy slot is final, word bank authorship is separate future work, not a normal editorial pass)
- [ ] Family-wide consistency review completed
### R-Controlled Vowels

- [ ] Family audit completed
- [ ] Shared terminology and page pattern agreed
- [ ] R-Controlled AR Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] R-Controlled OR Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] R-Controlled ER, IR, and UR Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Family-wide consistency review completed
### Multisyllabic Words

- [ ] Family audit completed
- [ ] Shared terminology and page pattern agreed
- [ ] Multisyllabic Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Family-wide consistency review completed
### Word Building and Endings

- [ ] Family audit completed
- [ ] Shared terminology and page pattern agreed
- [ ] Plural Words with -s and -es
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Words Ending in -ed and -ing
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Common Suffixes
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Spelling Rules for Adding Suffixes
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Compound Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Contractions
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Family-wide consistency review completed
### Prefixes

- [ ] Family audit completed
- [ ] Shared terminology and page pattern agreed
- [ ] Un- and Re- Prefixes
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Common Prefixes
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Family-wide consistency review completed
### Greek and Latin Roots

- [ ] Family audit completed
- [ ] Shared terminology and page pattern agreed
- [ ] Greek and Latin Roots
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Family-wide consistency review completed
### Homophones and Commonly Confused Words

- [ ] Family audit completed
- [ ] Shared terminology and page pattern agreed
- [ ] Homophones
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Commonly Confused Words
  - [ ] Existing page audited
  - [ ] Search intent documented
  - [ ] Written content completed
  - [ ] Internal links completed
  - [ ] Structured data and metadata reviewed
  - [ ] Final editorial review passed
- [ ] Family-wide consistency review completed

**IE and IGH Words note:** its taxonomy placement is final; it is not "not started yet" in the same sense as an audited-but-unwritten page — it is architecturally blocked until a word bank is authored, a separate decision outside this roadmap's scope.

**Not on this checklist:** `silent-e-long-e`, `grade-4-final-stable-syllables`, `grade-5-spelling-rules` are tagged `contentRole: skill` but are not part of the 41-slot taxonomy and are unresolved (§1, `untagged-and-data-quality.md`). Resolve their status with the product owner before folding them into this checklist.

---

## 6. Grade curriculum checklist

One section per grade, K–5, preserving canonical Grade Unit order from `docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`. **Only canonical-active pages appear here** — pages confirmed by their presence in `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md` and their Grade Hub card in `gradeHubCards.ts`. Per-page detail is in `inventory/grade-curriculum-pages.md`; unresolved grade-scoped pages are tracked separately in `inventory/untagged-and-data-quality.md` and are not part of this checklist until confirmed canonical-active.


### Kindergarten

**Canonical Grade Units:** Sounds, Letters, and Early Encoding; Short Vowels and CVC Words; High-Frequency Words

**Frozen hub structure:** 8 Core Spelling cards · 4 Common Words sets (40 words) · 3 Additional Practice card(s)

- [ ] Canonical Grade Unit sequence confirmed against curriculum doc for this grade
- [ ] Core Spelling / Grade Unit pages (11 canonical-active)
  - [ ] Kindergarten First Words (`kindergarten-first-words`)
  - [ ] Kindergarten Animal Words (`kindergarten-animal-words`)
  - [ ] Kindergarten Body Words (`kindergarten-body-words`)
  - [ ] Kindergarten Family Words (`kindergarten-family-words`)
  - [ ] Kindergarten Short A Words (`kindergarten-short-a-words`)
  - [ ] Kindergarten Short I Words (`kindergarten-short-i-words`)
  - [ ] Kindergarten Short O Words (`kindergarten-short-o-words`)
  - [ ] Kindergarten Short U Words (`kindergarten-short-u-words`)
  - [ ] Kindergarten Short E Words (`kindergarten-short-e-words`)
  - [ ] Mixed Vowel CVC Review (`kindergarten-mixed-vowel-review`)
  - [ ] Consonant Digraphs (`kindergarten-consonant-digraphs`)
- [ ] Additional Practice pages (2 canonical-active)
  - [ ] Kindergarten Number Words (`kindergarten-number-words`)
  - [ ] Kindergarten Color Words (`kindergarten-color-words`)
- [ ] Common Words sets audited (see `inventory/sight-words-and-common-words.md` for the Kindergarten rows)
- [ ] Grade-wide consistency review completed (terminology matches this grade's Skill-page links; word-list difficulty appropriately bounded for the grade)
### Grade 1

**Canonical Grade Units:** Consonant Digraphs and Blends; Inflectional Endings; Silent E and Long Vowels; Vowel Teams; Syllables and Two-Syllable Words

**Frozen hub structure:** 12 Core Spelling cards · 6 Common Words sets (72 words) · 3 Additional Practice card(s)

- [ ] Canonical Grade Unit sequence confirmed against curriculum doc for this grade
- [ ] Core Spelling / Grade Unit pages (12 canonical-active)
  - [ ] CVC Short Vowel Review & The C/K Rule (`grade-1-cvc-short-vowels-c-k-rule`)
  - [ ] The Floss Rule (`grade-1-floss-rule`)
  - [ ] Consonant Digraphs & Final -ck (`grade-1-consonant-digraphs-final-ck`)
  - [ ] Beginning Consonant Blends (`grade-1-beginning-consonant-blends`)
  - [ ] Ending Consonant Blends (`grade-1-ending-consonant-blends`)
  - [ ] Long Vowels with Silent e (VCe) (`grade-1-long-vowels-silent-e`)
  - [ ] Short Words with Long Vowels: Open Syllables & Final Y (`grade-1-open-syllables-final-y`)
  - [ ] Inflectional Endings: -s and -es (`grade-1-inflectional-endings-s-es`)
  - [ ] Inflectional Endings: -ed and -ing (`grade-1-inflectional-endings-ed-ing`)
  - [ ] R-Controlled Vowels: ar / or (`grade-1-r-controlled-ar-or`)
  - [ ] Long A & Long O Vowel Teams (`grade-1-long-a-long-o-vowel-teams`)
  - [ ] Short Vowel Ending Rules: -tch and -dge (`grade-1-tch-dge-ending-rules`)
- [ ] Additional Practice pages (5 canonical-active)
  - [ ] Grade 1 Number Words 11–20 (`grade-1-number-words-11-20`)
  - [ ] Grade 1 Days of the Week (`grade-1-days-of-the-week`)
  - [ ] Grade 1 Weather Words (`grade-1-weather-words`)
  - [ ] Grade 1 Clothing Words (`grade-1-clothing-words`)
  - [ ] Grade 1 Shape Words (`grade-1-shape-words`)
- [ ] Common Words sets audited (see `inventory/sight-words-and-common-words.md` for the Grade 1 rows)
- [ ] Grade-wide consistency review completed (terminology matches this grade's Skill-page links; word-list difficulty appropriately bounded for the grade)
### Grade 2

**Canonical Grade Units:** R-Controlled Vowels; Diphthongs and Other Vowel Patterns; Syllable Types and Multisyllabic Words; Silent Letters and Ending Spelling Patterns; Hard and Soft C and G

**Frozen hub structure:** 10 Core Spelling cards · 6 Common Words sets (72 words) · 3 Additional Practice card(s)

- [ ] Canonical Grade Unit sequence confirmed against curriculum doc for this grade
- [ ] Core Spelling / Grade Unit pages (10 canonical-active)
  - [ ] 2nd Grade Compound Words (`grade-2-list-02`)
  - [ ] 2nd Grade Contractions (`grade-2-contractions`)
  - [ ] 2nd Grade Silent Letter Words (`grade-2-silent-letter-words`)
  - [ ] OI and OY Words (`vowel-teams-oi-oy`)
  - [ ] OU and OW Words (`vowel-teams-ou-ow`)
  - [ ] Two Sounds of oo (`grade-2-oo-two-sounds`)
  - [ ] Vowel Patterns: au and aw (`grade-2-au-aw-words`)
  - [ ] Soft C and Soft G (`grade-2-soft-c-soft-g`)
  - [ ] Two-Syllable Words (`grade-2-two-syllable-words`)
  - [ ] Words Ending in -le (`grade-2-final-stable-le`)
- [ ] Additional Practice pages (5 canonical-active)
  - [ ] Grade 2 Transportation Words (`grade-2-transportation-words`)
  - [ ] Grade 2 Months of the Year (`grade-2-months-of-the-year`)
  - [ ] Grade 2 Money Words (`grade-2-money-words`)
  - [ ] Grade 2 Number Words 20–100 (`grade-2-number-words-20-100`)
  - [ ] Grade 2 Community Helpers (`grade-2-community-helpers`)
- [ ] Common Words sets audited (see `inventory/sight-words-and-common-words.md` for the Grade 2 rows)
- [ ] Grade-wide consistency review completed (terminology matches this grade's Skill-page links; word-list difficulty appropriately bounded for the grade)
### Grade 3

**Canonical Grade Units:** Prefixes; Suffixes; Spelling Changes When Adding Suffixes; Plurals, Possessives, and Contractions; Homophones and Commonly Confused Words

**Frozen hub structure:** 7 Core Spelling cards · 5 Common Words sets (60 words) · 0 Additional Practice card(s)

- [ ] Canonical Grade Unit sequence confirmed against curriculum doc for this grade
- [ ] Core Spelling / Grade Unit pages (7 canonical-active)
  - [ ] 3rd Grade Prefix Words (`grade-3-prefix-words`)
  - [ ] 3rd Grade Suffix Words (`grade-3-suffix-words`)
  - [ ] 3rd Grade Spelling Rule: Dropping Silent E (`grade-3-dropping-silent-e`)
  - [ ] 3rd Grade Possessive Words (`grade-3-possessives`)
  - [ ] 3rd Grade Multisyllabic Words (`grade-3-multisyllabic-words`)
  - [ ] 3rd Grade Homophones and Commonly Confused Words (`grade-3-homophones`)
  - [ ] 3rd Grade Root Word Families (`grade-3-root-word-families`)
- [ ] Additional Practice pages (4 canonical-active)
  - [ ] 3rd Grade Map & Globe Words (`grade-3-map-globe-words`)
  - [ ] 3rd Grade Life Cycle Words (`grade-3-life-cycle-words`)
  - [ ] 3rd Grade Time Words (`grade-3-time-words`)
  - [ ] 3rd Grade Multiplication & Division Words (`grade-3-multiplication-division-words`)
- [ ] Common Words sets audited (see `inventory/sight-words-and-common-words.md` for the Grade 3 rows)
- [ ] Grade-wide consistency review completed (terminology matches this grade's Skill-page links; word-list difficulty appropriately bounded for the grade)
### Grade 4

**Canonical Grade Units:** Greek and Latin Roots; Advanced Multisyllabic Words; Final Stable Syllables and Common Word Endings; Derived Words and Word Meaning

**Frozen hub structure:** 6 Core Spelling cards · 4 Common Words sets (48 words) · 1 Additional Practice card(s)

- [ ] Canonical Grade Unit sequence confirmed against curriculum doc for this grade
- [ ] Core Spelling / Grade Unit pages (6 canonical-active)
  - [ ] 4th Grade Multisyllabic Academic Words (`grade-4-multisyllabic-academic-words`)
  - [ ] 4th Grade Advanced Prefix Words (`grade-4-advanced-prefixes`)
  - [ ] 4th Grade Advanced Suffix Words (`grade-4-advanced-suffixes`)
  - [ ] 4th Grade Latin Root Words (`tier-1-roots-and-patterns`)
  - [ ] 4th Grade Commonly Confused Words (`grade-4-commonly-confused-words`)
  - [ ] 4th Grade Derived Words and Word Meaning (`grade-4-derived-words`)
- [ ] Additional Practice pages (4 canonical-active)
  - [ ] 4th Grade Measurement Words (`grade-4-measurement-words`)
  - [ ] 4th Grade Solar System Words (`grade-4-solar-system-words`)
  - [ ] 4th Grade Career & Occupation Words (`grade-4-career-occupation-words`)
  - [ ] 4th Grade Geometry Words (`grade-4-geometry-words`)
- [ ] Common Words sets audited (see `inventory/sight-words-and-common-words.md` for the Grade 4 rows)
- [ ] Grade-wide consistency review completed (terminology matches this grade's Skill-page links; word-list difficulty appropriately bounded for the grade)
### Grade 5

**Canonical Grade Units:** Advanced Roots, Affixes, and Academic Words; Spelling Changes in Related Words; Meaning-Based and Conventional Spelling

**Frozen hub structure:** 5 Core Spelling cards · 4 Common Words sets (48 words) · 2 Additional Practice card(s)

- [ ] Canonical Grade Unit sequence confirmed against curriculum doc for this grade
- [ ] Core Spelling / Grade Unit pages (5 canonical-active)
  - [ ] 5th Grade Multisyllabic Academic Words (`grade-5-multisyllabic-academic-words`)
  - [ ] 5th Grade Prefix & Suffix Words (`grade-5-prefix-suffix-words`)
  - [ ] 5th Grade Greek & Latin Word Parts (`grade-5-greek-latin-word-parts`)
  - [ ] 5th Grade Commonly Confused Words (`grade-5-commonly-confused-words`)
  - [ ] 5th Grade Spelling Changes in Related Words (`grade-5-spelling-changes-related-words`)
- [ ] Additional Practice pages (4 canonical-active)
  - [ ] 5th Grade Civics and Government Words (`grade-5-community-civics-words`)
  - [ ] 5th Grade Money Management Words (`grade-5-money-management-words`)
  - [ ] 5th Grade Ecosystem & Environment Words (`grade-5-ecosystem-environment-words`)
  - [ ] 5th Grade Fraction & Decimal Words (`grade-5-fraction-decimal-words`)
- [ ] Common Words sets audited (see `inventory/sight-words-and-common-words.md` for the Grade 5 rows)
- [ ] Grade-wide consistency review completed (terminology matches this grade's Skill-page links; word-list difficulty appropriately bounded for the grade)

---

## 7. Hub-page checklist

Hub pages are code-driven, always canonical active, and have no frontmatter row in the inventory files. The same checkpoint list applies to every hub; **do not** let any hub page grow into a long educational article that competes with its child pages.

**Standard hub checkpoints** (apply to every hub below):
- [ ] Introductory copy is short, accurate, and non-duplicative of child-page content
- [ ] Clarity of user journey (a first-time visitor can tell what to click and why)
- [ ] Section descriptions are accurate and scannable
- [ ] Internal links to all live child pages are present and correct
- [ ] Terminology matches the child pages it summarizes
- [ ] Primary search intent for the hub itself is addressed
- [ ] No duplication with child-page content
- [ ] Metadata (title/description) accurately reflects the hub's actual content
- [ ] Structured data (if any) accurately reflects visible content
- [ ] Summary text accurately reflects the current editorial state of child content


### Kindergarten Hub

- [ ] Introductory copy reviewed
- [ ] User journey clarity reviewed
- [ ] Section descriptions (Core Spelling / Common Words / Additional Practice) reviewed
- [ ] Internal links to all child pages verified
- [ ] Terminology consistency with child pages verified
- [ ] Metadata and structured data reviewed
- [ ] Summary accuracy re-checked against current child-page editorial status
### Grade 1 Hub

- [ ] Introductory copy reviewed
- [ ] User journey clarity reviewed
- [ ] Section descriptions (Core Spelling / Common Words / Additional Practice) reviewed
- [ ] Internal links to all child pages verified
- [ ] Terminology consistency with child pages verified
- [ ] Metadata and structured data reviewed
- [ ] Summary accuracy re-checked against current child-page editorial status
### Grade 2 Hub

- [ ] Introductory copy reviewed
- [ ] User journey clarity reviewed
- [ ] Section descriptions (Core Spelling / Common Words / Additional Practice) reviewed
- [ ] Internal links to all child pages verified
- [ ] Terminology consistency with child pages verified
- [ ] Metadata and structured data reviewed
- [ ] Summary accuracy re-checked against current child-page editorial status
### Grade 3 Hub

- [ ] Introductory copy reviewed
- [ ] User journey clarity reviewed
- [ ] Section descriptions (Core Spelling / Common Words / Additional Practice) reviewed
- [ ] Internal links to all child pages verified
- [ ] Terminology consistency with child pages verified
- [ ] Metadata and structured data reviewed
- [ ] Summary accuracy re-checked against current child-page editorial status
### Grade 4 Hub

- [ ] Introductory copy reviewed
- [ ] User journey clarity reviewed
- [ ] Section descriptions (Core Spelling / Common Words / Additional Practice) reviewed
- [ ] Internal links to all child pages verified
- [ ] Terminology consistency with child pages verified
- [ ] Metadata and structured data reviewed
- [ ] Summary accuracy re-checked against current child-page editorial status
### Grade 5 Hub

- [ ] Introductory copy reviewed
- [ ] User journey clarity reviewed
- [ ] Section descriptions (Core Spelling / Common Words / Additional Practice) reviewed
- [ ] Internal links to all child pages verified
- [ ] Terminology consistency with child pages verified
- [ ] Metadata and structured data reviewed
- [ ] Summary accuracy re-checked against current child-page editorial status

### Skills Hub

- [ ] Introductory copy reviewed
- [ ] All 12 family summaries reviewed for brevity and accuracy
- [ ] IE and IGH Words' provisional status correctly reflected (not presented as a normal live link)
- [ ] Internal links to all 40 live Skill pages verified
- [ ] Terminology consistency with Skill pages verified
- [ ] Metadata and structured data reviewed
- [ ] Does not duplicate any individual Skill page's explanation

### Main spelling-list browse page

- [ ] Explains the Grade-based, Skill-based, and "practice your own words" journeys without reproducing either hub
- [ ] Introductory copy reviewed
- [ ] Internal links to all Grade Hubs and the Skills Hub verified
- [ ] Metadata and structured data reviewed
- [ ] Shortest, least detailed page in the hierarchy — confirmed no lesson content has crept in
- [ ] Legacy category-page links (e.g. `/spelling-lists/sight-words`) reviewed for whether they should remain, per a product-owner decision — not silently removed or expanded as part of a content pass

---

## 8. Definition of done for an individual content page

Applies to canonical-active pages only. A page is **Complete** only when every applicable item below is true — existence, publication, or `contentRole` being set are prerequisites, not the definition.

### Educational quality
- [ ] The concept is explained accurately
- [ ] Language is parent-friendly
- [ ] Examples are representative of the pattern, not cherry-picked exceptions
- [ ] The word list is coherent and intentionally selected, not padded to hit a round number
- [ ] Likely misconceptions or common spelling errors for this pattern are addressed
- [ ] Practice advice is actionable
- [ ] Grade claims are appropriately bounded
- [ ] Content makes no unsupported universal claims ("all children," "every time," "always")

### Search and answer quality
- [ ] Primary search intent is clearly answered
- [ ] A concise direct answer appears near the top where appropriate (`shortAnswer` reflects this)
- [ ] Headings reflect real user questions, not generic section labels
- [ ] The page can stand alone as a useful answer without requiring another page first
- [ ] Important terminology and synonyms are naturally included
- [ ] Content is helpful rather than padded — length follows what's needed
- [ ] FAQ content (`faq`) is not repetitive with the body or with itself
- [ ] Metadata (`description`) accurately describes the page
- [ ] Structured data accurately reflects visible content

### Site architecture
- [ ] Page links to its parent hub
- [ ] Page links to appropriate prerequisite, related, or next-step content (`prerequisiteLists`/`relatedLists`/`nextLists`, `skillIds` where applicable)
- [ ] Grade Unit and Skill pages covering the same concept do not read as near-duplicates (§2, §10)
- [ ] All links resolve
- [ ] Canonical ids, titles, roles, and slugs are unchanged unless a frozen specification explicitly requires otherwise

### Editorial quality
- [ ] No awkward AI-style repetition
- [ ] No vague filler
- [ ] No contradictory guidance, within the page or against a sibling page in the same family/grade
- [ ] Spelling terminology is consistent with the rest of the site
- [ ] Reading level matches parents and elementary educators — the page is written *to the adult helping*, not to the child
- [ ] Word counts and examples are not padded merely for cross-page uniformity
- [ ] Content passes a cold final read

### Verification
- [ ] Relevant tests pass (`npm test`)
- [ ] Build passes (`npm run build`)
- [ ] Page is manually reviewed on desktop and mobile
- [ ] No accidental visual or functional regression introduced — visual redesign is out of scope; this checkpoint is about not breaking what exists

---

## 9. Page audit template

Copy this block beneath a page's checklist entry, or into a working note, when starting an audit.

```markdown
### Page Audit: [Title]

- File:
- Page type:
- Parent hub:
- Related canonical Skill:
- Primary audience:
- Primary query or intent:
- Secondary questions:
- Current strengths:
- Current weaknesses:
- Missing information:
- Overlapping pages:
- Internal links to add:
- Claims requiring verification:
- Content sections to retain:
- Content sections to rewrite:
- Content sections to add:
- Word-list concerns:
- Metadata concerns:
- Structured-data concerns:
- Status:
```

---

## 10. Content differentiation rules

Explicit rules to prevent duplication, validated against the frozen architecture docs (`CONTENT_MODEL.md`, `SKILLS_ARCHITECTURE.md`, `K5_FINAL_CONTENT_ARCHITECTURE.md`):

**Skill page vs. Grade Unit.** Skill pages provide the strongest grade-independent conceptual explanation — the "what and why." Grade Units focus on what children at that grade practice and how the selected word set expresses the concept at that grade's difficulty — the "what for us, right now." A Grade Unit should assume the reader can click through to the Skill page for first-principles explanation rather than re-deriving it.

**Grade Unit vs. Grade Hub.** Grade Hubs orient and route; they do not repeat every lesson. A hub's Core Spelling section should describe *what's in* each Grade Unit in a sentence, not summarize its teaching content.

**Skill page vs. Skills Hub.** The Skills Hub explains families briefly and helps users choose a destination; it must not contain any family's actual pattern explanation — that stays on the Skill page.

**Common Words gateway vs. individual Common Words set.** The gateway page (e.g. "Kindergarten High-Frequency Words") explains the cumulative structure and Heart Word approach once; individual sets should not each re-explain what a Heart Word is — link back to the gateway instead.

**Core Spelling vs. Additional Practice.** Core Spelling is the recommended encoding/spelling route for the grade — the default path. Additional Practice is small, optional, bounded vocabulary content; its pages should be shorter and lighter than Core Spelling pages by design, not through neglect.

**Top-level browse page vs. either hub.** The browse page explains the user journeys — it does not reproduce either hub's content.

---

## 11. Research and sourcing policy

This planning task did not perform research for individual pages — that is future work this policy governs.

**Supportable directly from the frozen curriculum and repository, no external check needed:** which grade teaches which Grade Unit; which Skill family a pattern belongs to; word-list membership; internal site structure and navigation claims.

**Educational claims that should be checked against authoritative literacy sources before publishing:** claims about *how* children typically acquire a skill, developmental sequencing claims not already fixed by the canonical curriculum, claims about common error patterns, and any claim phrased as a general pedagogical fact rather than a description of this site's own approach.

**Claims about current standards, programs, or search behavior that require external verification:** references to specific state standards, named commercial curricula, or claims about what "most schools" or "most search queries" do. Prefer not making these claims at all over making them unverified.

**Editorial judgment that should be labeled as such:** practice tips, phrasing suggestions, and "what trips children up" observations from the site's own pedagogical stance rather than a citable source — fine to keep, but should read as guidance, not a claimed fact.

**Sourcing preferences, when a check is needed:** authoritative primary sources over secondary summaries; structured-literacy organizations and official curriculum documentation over general parenting blogs; reputable educational institutions over uncredited web content. Prefer restrained, well-chosen claims over citation density.

Apply this policy during Phase 1 onward as each canonical-active page is drafted.

---

## 12. Prioritization system

Priority applies to canonical-active pages only — deprecated/legacy and unresolved pages get no P0–P3 tier, because they are not in scope, not "low priority within scope." No keyword-volume or traffic numbers are used or fabricated anywhere in this system; priority is structural.

A page or batch earns higher priority when it is a canonical Skill page supporting multiple Grade Units, carries high internal-link importance, currently reads thin or duplicated, represents a foundational concept, supports a large family, is likely to directly answer a clear parent/teacher query, or is required before a parent Grade Hub can be completed accurately.

- **P0 — Foundational Skill pages with broad downstream dependency.** Skill pages that multiple Grade Units link to (or should) and that anchor an entire family's terminology.
- **P1 — Remaining Skill pages in an in-progress or next-up family, and Grade Unit pages whose Grade Hub is scheduled soon.**
- **P2 — Grade Unit and Additional Practice pages in families/grades not yet reached, and Hub pages once their children are mostly done.**
- **P3 — Lower-dependency canonical content:** Additional Practice pages with no downstream dependents, and polish passes (Phase 6 consistency sweep items).

Initial assignment by grouping (refine per-family/per-grade as Phase 0 audits land):

| Grouping | Priority | Why |
|---|---|---|
| Short Vowels and CVC Words family (5 Skill pages) | P0 | Most foundational family; underlies Kindergarten and Grade 1 curriculum; smallest fully-live family; template-setting |
| Consonant Digraphs, Consonant Blends, Silent E families | P0 | Foundational Grade 1 concepts with multiple dependent Grade Units |
| Remaining 8 Skill families | P1 | Important, sequenced after the P0 foundational set |
| IE and IGH Words | Blocked | No content file exists; see §5 |
| Grade K–2 Grade Unit pages | P1 | High-traffic early grades, dependent on the P0/P1 Skill pages already prioritized |
| Grade 3–5 Grade Unit pages | P2 | Sequenced after earlier grades and their Skill-page dependencies |
| Common Words gateway + member-set pages | P2 | Structurally frozen and functional; editorial polish, not urgent |
| Grade Hubs (K–5) | P2 | Depend on Phase 1–2 completion before final copy is accurate |
| Skills Hub, main browse page | P2 | Depend on Phase 1/3–4 completion |
| Additional Practice pages | P3 | Small, optional, bounded; lowest dependency weight |
| 3 non-taxonomy "skill"-tagged pages | Blocked | Needs a product-owner decision on role before any content work; see §5/§10 |

---

## 13. Recommended first batch

**Recommendation: Short Vowels and CVC Words** (5 Skill pages: Short A, Short E, Short I, Short O, Short U Words).

**Why this family over the alternatives considered:**

- **Size.** Five pages is small enough to complete, review, and use as the reference standard before scaling to a 12-page family like Vowel Teams or a 6-page family like Word Building and Endings.
- **Foundational weight.** Short Vowels and CVC Words is the first Grade Unit taught in Kindergarten and the concept every later phonics pattern (Silent E, Vowel Teams, R-Controlled Vowels) is explicitly taught in relation to.
- **Clean skill↔grade-unit correspondence.** Each Skill page (`short-a-words` etc.) has a directly corresponding Kindergarten Grade Unit (`kindergarten-short-a-words` etc.), making this family the cleanest available example for establishing the Skill-vs-Grade-Unit differentiation pattern (§2, §10) before it has to be applied to messier families.
- **Existing test coverage.** `src/lib/content/shortVowelsSkillFamily.test.ts` and `shortAReferenceSkill.test.ts` already exist.
- **No open taxonomy questions.** Unlike Silent E (folds Long E in without its own page) or Vowel Teams (contains the provisional IE/IGH slot), Short Vowels has no unresolved architecture question attached.

**Alternative considered and rejected as the first batch:** Consonant Digraphs (4 pages: CH, SH, TH, WH) — smaller by one page and also foundational, but a template built there generalizes less well: fewer dependent Grade Units, no directly parallel Kindergarten-to-Grade-1 progression to validate against. Good candidate for the *second* batch.

**Scope of the recommended first batch:** the 5 Short Vowels Skill pages only (Phase 1 scope) — not their corresponding Kindergarten Grade Units, which are explicitly Phase 2 and should not start until this batch is reviewed and adopted as the reference standard.

---

## 14. Progress summary

No editorial work has started under this roadmap yet — all totals below reflect **existence within canonical-active scope**, not completion. Populate the Complete/In progress/Blocked columns as work lands.

| Phase | Total items (canonical active) | Complete | In progress | Remaining | Blocked |
|---|---:|---:|---:|---:|---:|
| Phase 0 — Inventory and baseline | 1 roadmap + 5 inventory files + 36 unresolved rows + 3 taxonomy-mismatch decisions | 6 (roadmap + inventory files created) | 0 | 36 unresolved rows + 3 mismatch decisions | 0 |
| Phase 1 — Skill-page content | 41 skill slots (40 live + 1 content-pending) | 0 | 0 | 40 | 1 (IE and IGH Words — content-pending) |
| Phase 2 — Grade curriculum content | 75 canonical-active Grade Unit + Additional Practice pages | 0 | 0 | 75 | 0 |
| Phase 3 — Grade Hub content | 6 hubs (K–5) | 0 | 0 | 6 | 0 |
| Phase 4 — Skills Hub content | 1 hub | 0 | 0 | 1 | 0 |
| Phase 5 — Main browse-page content | 1 page | 0 | 0 | 1 | 0 |
| Phase 6 — Cross-site consistency and final audit | 1 site-wide pass | 0 | 0 | 1 | 0 |
| *(Reference, not a phase)* Common Words gateway + member sets | 6 + 29 = 35 | 0 | 0 | 35 | 0 |

**Excluded from every phase and total above — transparency only, not part of active scope:** 81 deprecated/legacy pages (`deprecated-and-legacy-pages.md`) and 36 unresolved pages pending classification (`untagged-and-data-quality.md`). Canonical-active total: **150 pages** (255 `spelling-lists` + 12 `spelling-collections` = 267 total content files repository-wide).

---

## 15. Maintenance instructions

- Check an item only after the relevant definition of done (§8, or the hub checkpoints in §7) is actually met — not when a page merely exists or has been touched.
- Update the page's row in the relevant inventory file (`Editorial status` column) whenever its status changes: `Not audited`, `Audit complete`, `Drafting`, `Needs review`, `Complete`, `Blocked`.
- Update §14's phase totals whenever a batch of pages changes status — this table should stay a true reflection of the inventory files, not drift from them.
- **Moving a page between canonical-active, deprecated/legacy, and unresolved requires the same evidentiary standard used to build this roadmap** — a citation to `K5_FINAL_CONTENT_ARCHITECTURE.md`, `SKILLS_ARCHITECTURE.md`, or `PUBLIC_URL_ARCHITECTURE.md`, or a documented Grade Hub/Skills Hub reachability check — not an ad hoc judgment call. Record the move and its justification in the destination inventory file.
- Record blockers explicitly (in the relevant inventory file row, or as a new entry in `untagged-and-data-quality.md` for a repository-level finding) rather than silently skipping a page.
- Do not silently change frozen architecture (curriculum, taxonomy, page hierarchy, ids/slugs/roles) while doing content work. If content work surfaces a real architectural question, log it as a flagged mismatch and raise it for a product-owner decision.
- When an editorial choice affects multiple pages (a terminology preference, a new FAQ pattern, a word-list selection rule), add a short decision note near the relevant checklist section so later pages stay consistent.
- Keep completed items visible (checked, not deleted) — this roadmap is a historical record as much as a plan for what's left.
- Treat this roadmap and its inventory files as the source of truth for content progress.

---

*Generated from a full read of the frozen architecture documents, the repository's frontmatter, and live navigation code — not inferred from filenames or folder structure. See the inventory files for per-page data and the specific mismatches flagged during generation.*
