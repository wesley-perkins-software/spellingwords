
> **Non-Core navigation is now final:** all 29 High-Frequency Words sets use grade-contained previous/next peers under Explore more, and all 27 Additional Practice pages use exactly three explicit, curated same-grade peers under Explore more. Neither type shows Review first or Next step. Core's finalized 51-page model is unchanged. “Where to go from here” never contains a Grade Hub card; canonical relationship-card titles retain separate grade metadata. A broader “Continue exploring” grade-orientation section remains a separate future pass.
# Content Improvement Roadmap — spellingwords.app

> **Core navigation implementation is final:** all 51 Core Spelling Grade Units use the single continuous K–5 `CORE_SPELLING_SEQUENCE` for **Review first** and **Next step**, and render no **Explore more** group. The first Kindergarten unit has only Next step; the Grade 5 capstone has only Review first. High-Frequency Words and Additional Practice now follow the finalized non-Core rules above.

> URL architecture update: canonical K–5 Grade Hub and Grade Hub card URLs use the flat no-trailing-slash `/{grade}/{page-slug}` structure, and canonical Skill pages use `/skills` + `/skills/{skill-slug}`. The runtime sources of truth are `src/lib/content/canonicalGradeRoutes.ts` and `src/lib/content/canonicalSkillRoutes.ts`; see `docs/content/inventory/grade-url-migration-map.md` for the grade-curriculum reference. The site is pre-launch, so the old repository-shaped `/spelling-lists/...` paths for migrated grade-curriculum and Skill pages are simply not generated (404) rather than redirected — these are the site's original launch URLs, not a migration preserving an established public site.


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
- The canonical Skills architecture: 12 families and 41 live, content-backed Skill pages (`docs/architecture/SKILLS_ARCHITECTURE.md`).
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

Current counts: **153 canonical-active pages** (151 with their own public destination + 2 focused component pages, `grade-4-final-stable-syllables` and `grade-5-spelling-rules`, that are settled as not canonical Skills and are reachable only via their anchor Grade Unit's related-practice link — see `skill-pages.md` and `grade-curriculum-pages.md`; not separately prioritized, not their own Grade Hub card) · **82 deprecated/legacy pages** · **33 unresolved pages**. See §4 and §14 for the breakdown, and §15 for how a page moves between buckets as facts change.

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
**Core title contract:** each Core card defaults to the destination entry’s exact canonical title, matching its H1, breadcrumb, and relationship-card label. Grade is separate metadata. Any Hub-only title is an explicit reviewed exception with a documented usability rationale; shorter canonical URL slugs remain valid.
**Must not duplicate:** lesson content from any child page.
**Linking role:** routes down into every Grade Unit/Common Words/Additional Practice page for that grade, and up to the Skills Hub / main browse page.

### Layer 4 — Skills Hub
**Purpose:** the main "Browse by Skill" directory across all 12 frozen families. **Defined by:** `docs/architecture/SKILLS_ARCHITECTURE.md`; implemented as `src/pages/skills/index.astro` + `spellingSkills.ts`/`canonicalSkillRoutes.ts`, serving at `/skills`.
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
**Outputs:** this document; the five inventory files; the resolved `silent-e-long-e` decision; the resolved-as-legacy-role-exception classification for the two non-taxonomy `skill`-tagged pages (`grade-4-final-stable-syllables`, `grade-5-spelling-rules` — not canonical Skills, settled) and 33 other unresolved pages; `contentRole` backfilled only on pages already confirmed canonical-active.
**Must not do prematurely:** rewrite any page's prose content, or begin editorial work on an unresolved or deprecated/legacy page before it's confirmed canonical-active.

### Phase 1 — Skill-page content
**Position rationale:** Skill pages are Layer 1 — the grade-independent anchor every Grade Unit page should eventually link to, and the page most likely to earn direct search/AI-answer citations.
**Dependencies:** Phase 0 complete for the family being worked; the two non-taxonomy role mismatches explicitly deferred so canonical family membership remains unambiguous.
**Outputs:** 41 strong, differentiated, internally consistent canonical explanations — the terminology and structural pattern later work will reuse.
**Editorial standard:** every Phase 1 page must follow `docs/content/CANONICAL_SKILL_PAGE_STANDARD.md`, which governs page structure, the four instructional variants, example selection, teaching guidance, and editorial review for the Skill layer. A Skill page should have an approved content brief (`docs/content/templates/SKILL_PAGE_CONTENT_BRIEF.md`, acceptance checklist in the standard §20) before drafting begins. This roadmap still owns scope, sequencing, priority, and the page-level definition of done (§8); the standard does not change any of that.

**Status semantics:** `Written content completed` means implementation is present and has passed the recorded self/adversarial review; it does not mean final editorial approval. `Needs review` means the implementation exists but final independent human sign-off remains open. `Complete` is reserved for a page that satisfies every applicable §8 item. Family-wide consistency self-review and independent family sign-off are separate checkpoints. Phase 2 may begin for a family once its canonical Skill implementation is stable and independently audited, even if final project-wide sign-off remains pending; this does not promote the Skill's inventory status to `Complete`.

**Historical brief exception:** most of the first 40 pages were drafted before the persisted pre-draft brief workflow was consistently followed. Their inline planning and later adversarial audits are retained as an honest historical process exception; no retrospective document should be labeled a pre-draft approval. IE and IGH Words is the first new page required to complete and approve a persisted brief before drafting, and that process is mandatory for every future new Skill.

### Phase 2 — Grade curriculum content
**Position rationale:** each Grade Unit page needs a finished canonical Skill page to link back to and differentiate itself from (§2) — writing grade content first risks re-deriving the same explanation 5–6 times per family and then retrofitting links.
**Dependencies:** the corresponding Skill page(s) must be implementation-complete and independently audited before that family's Grade Unit pages are drafted. A page may still carry `Needs review` while final project-wide human sign-off remains open; `Complete` remains reserved for the full §8 definition of done. Organize by grade **within** a family once its Skill implementation is stable, per the canonical Grade Unit sequence (K→5), not by grade first.
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
| Skill pages (41-slot taxonomy) | 41 live | Canonical active | `inventory/skill-pages.md` |
| Grade Unit + Additional Practice pages (own Grade Hub card) | 75 | Canonical active | `inventory/grade-curriculum-pages.md` |
| Focused component pages of an existing combined Grade Hub unit (no separate card) | 2 | Canonical active — legacy-role exception, not canonical Skills | `inventory/grade-curriculum-pages.md`, `inventory/skill-pages.md` |
| Common Words gateway pages | 6 | Canonical active | `inventory/sight-words-and-common-words.md` |
| Common Words member sets | 29 | Canonical active | `inventory/sight-words-and-common-words.md` |
| Grade Hubs, Skills Hub, main browse page | 8 (6 + 1 + 1, code-driven) | Canonical active | this file, §7 |
| Dolch tier gateways + member sets, orphaned phonics pages, archived pages | 82 | Deprecated / legacy | `inventory/deprecated-and-legacy-pages.md` |
| Pages not resolved by the classification test | 33 | Unresolved | `inventory/untagged-and-data-quality.md` |
| **Total content-collection files** | **268** (256 `spelling-lists` + 12 `spelling-collections`) | — | all inventory files combined |

**Active editorial scope = 153 canonical-active content pages**: 41 canonical Skills + 75 Grade curriculum pages with their own Grade Hub card + 2 focused component pages folded into an existing combined Grade Hub unit + 6 Common Words gateways + 29 Common Words member sets. The 2 focused component pages (`grade-4-final-stable-syllables`, `grade-5-spelling-rules`) are not their own Grade Hub card, not canonical Skills, and not given an independent P0–P3 priority — any future editorial work on them happens alongside their anchor page. The 8 code-driven browse/hub pages and 33 unresolved pages are tracked separately and are not included in 153. Every classification was made against the frozen architecture documents, verified against live code, and cross-checked directly with each file's frontmatter — none of it was inferred from filenames or folder names.

---

## 5. Canonical Skill-family checklist

Generated from the frozen taxonomy in `docs/architecture/SKILLS_ARCHITECTURE.md`, verified against `src/lib/content/spellingSkills.ts`. All 41 slots across 12 families are backed by live published pages. A checked `Written content completed` subitem records implementation; the page-level checkbox and `Complete` inventory status remain reserved for the full §8 definition of done, including final editorial sign-off. Per-page detail is in `inventory/skill-pages.md`.


### Short Vowels and CVC Words

- [x] Family audit completed
- [x] Shared terminology and page pattern agreed — each page independently satisfies the Standard's required Variant 1 elements; section order and emphasis are chosen per page's own instructional needs rather than a fixed shared template (see §4.1 note added below)
- [ ] Short A Words
  - [x] Existing page audited
  - [ ] Search intent documented — no approved per-page tracking location exists yet for this item (the §9 audit template is a copyable note format, not a persisted artifact); leaving unchecked until one is adopted
  - [x] Written content completed
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [x] Final editorial review passed — reviewed rendered desktop (1280px) and mobile (390px) screenshots of the built page: distinct sections, working tables, no practice CTA, correct curriculum placement and related links
- [ ] Short E Words
  - [x] Existing page audited
  - [ ] Search intent documented — no approved per-page tracking location exists yet for this item (the §9 audit template is a copyable note format, not a persisted artifact); leaving unchecked until one is adopted
  - [x] Written content completed
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [x] Final editorial review passed — reviewed rendered desktop (1280px) and mobile (390px) screenshots of the built page: distinct sections, working tables, no practice CTA, correct curriculum placement and related links
- [ ] Short I Words
  - [x] Existing page audited
  - [ ] Search intent documented — no approved per-page tracking location exists yet for this item (the §9 audit template is a copyable note format, not a persisted artifact); leaving unchecked until one is adopted
  - [x] Written content completed
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [x] Final editorial review passed — reviewed the built page's rendered HTML output (word list, FAQ/BreadcrumbList structured data, related-list cards, curriculum-placement lookup) and confirmed `npm test`/`npm run build`/`npm run lint` pass
- [ ] Short O Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap as above
  - [x] Written content completed
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [x] Final editorial review passed — reviewed the built page's rendered HTML output (word list, FAQ/BreadcrumbList structured data, related-list cards, curriculum-placement lookup) and confirmed `npm test`/`npm run build`/`npm run lint` pass
- [ ] Short U Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap as above
  - [x] Written content completed
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [x] Final editorial review passed — reviewed the built page's rendered HTML output (word list, FAQ/BreadcrumbList structured data, related-list cards, curriculum-placement lookup) and confirmed `npm test`/`npm run build`/`npm run lint` pass
- [x] Family-wide consistency self-review completed — all five Short Vowel Skill pages read together; each names its one genuine nearest-neighbor vowel (I↔E, O↔U) instead of contrasting with every other vowel, uses exact canonical titles when cross-referencing, and keeps its own distinctive instructional emphasis rather than mirroring the others' structure
- [ ] Independent family editorial sign-off received
### Consonant Digraphs

**Second batch note:** this is the first Variant 1 family drafted after Short Vowels and the first that isn't a vowel pattern. As part of the audit step, `kindergarten-consonant-digraphs.md` and `grade-1-consonant-digraphs-final-ck.md` were confirmed to have no `skillIds` back-reference to any of the four Skills — the same gap Short I/O/U hit (§13) — so a one-line `skillIds` addition was made to each (SH/CH/TH only on the Kindergarten unit, which doesn't teach WH; all four on the Grade 1 unit), with no other change to those files. **Content-brief process note:** per the Standard §20, a Skill page should have an approved content brief before drafting. No separate persisted brief file was produced for CH/SH/TH/WH — the brief's substance (scope, demonstration set vs. example system, Level 1 distinction, routine, links, FAQ candidates) was reasoned through inline as part of drafting instead, the same gap already present for Short I/O/U (`inventory/skill-pages.md` shows `Needs review`, not `Approved`, for that batch too). Flagging this as a real, unresolved mismatch between the documented brief workflow and actual practice, not treating it as satisfied.

- [x] Family audit completed
- [x] Shared terminology and page pattern agreed — each page independently satisfies the Standard's required Variant 1 elements; CH and SH share their nearest-neighbor contrast (stop vs. continuous), TH is built around its own internal voiced/unvoiced distinction rather than an external neighbor, and WH is built around its who/whole exception and a brief historical/dialect note — no shared template forced across the four
- [ ] CH Digraph Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for Short Vowels
  - [x] Written content completed
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — pending independent human review (see this batch's report)
- [ ] SH Digraph Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for Short Vowels
  - [x] Written content completed
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — pending independent human review (see this batch's report)
- [ ] TH Digraph Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for Short Vowels
  - [x] Written content completed
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — pending independent human review; voiced/unvoiced framing and the th-fronting note specifically flagged for review (see this batch's report)
- [ ] WH Digraph Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for Short Vowels
  - [x] Written content completed
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — pending independent human review; the who/whole exception and the wine–whine historical/dialect note specifically flagged for review (see this batch's report)
- [x] Family-wide consistency self-review completed — self-review passed (siblings read as distinct, not clones; internal links resolve; curriculum placement now resolves for all four; no Grade Unit duplication found)
- [ ] Independent family editorial sign-off received
### Consonant Blends

**Third batch note:** the audit step found both existing pages pre-dated the Standard: `beginning-blends.md`'s demonstration set included "black," which carries an untaught competing pattern (a final `ck` digraph); `ending-blends.md`'s six-word set only actually represented four distinct ending-blend patterns (two words each for `nd` and `st`), with `sk`/`ft`/`lt`/`lk` unrepresented; neither page contrasted blends with digraphs at all despite that being this family's defining distinction (Standard §4.1 names consonant blends by name for exactly this reason); neither had a word-family table, mistakes section, teaching routine, diagnostic response, or "signs of security" section — each was a single unstructured paragraph; both pages' first FAQ merely restated their own `shortAnswer`, a §13 violation; and `relatedLists`/`prerequisiteLists`/`nextLists` were empty on both, including no link between the two sibling pages. As with the Digraphs batch, `grade-1-beginning-consonant-blends.md` and `grade-1-ending-consonant-blends.md` were confirmed to have no `skillIds` back-reference to their Skills — the same gap class as Short I/O/U and Consonant Digraphs (§13) — so a one-line `skillIds` addition was made to each, with no other change to those Grade Unit files. **Content-brief process note:** consistent with the Digraphs batch, no separate persisted brief file was produced; the brief's substance was reasoned through inline during drafting (`inventory/skill-pages.md` shows `Needs review`, not `Approved`, for this batch too).

- [x] Family audit completed
- [x] Shared terminology and page pattern agreed — both pages share the blend-vs-digraph distinction as their conceptual spine, but organize around it differently: Beginning Blends carries the full contrast (a minimal-pair table set against beginning digraphs, since digraphs are taught immediately before blends in the Grade 1 sequence), while Ending Blends treats the contrast in one brief paragraph and instead centers its own distinct theme — why final blends are harder to hear than beginning blends — with a nasal-blend-vs-other-blend table that Beginning Blends has no reason to need
- [ ] Beginning Blends
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for Short Vowels and Consonant Digraphs
  - [x] Written content completed
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — pending independent human review (see this batch's report)
- [ ] Ending Blends
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for Short Vowels and Consonant Digraphs
  - [x] Written content completed
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — pending independent human review (see this batch's report)
- [x] Family-wide consistency self-review completed — self-review passed (siblings read as distinct in structure and emphasis rather than mirrored clones; internal links resolve and are not symmetric for their own sake — Beginning Blends links to both digraph pages used in its contrast table, Ending Blends links to only the one digraph page its own brief mention actually uses; curriculum placement now resolves for both; no Grade Unit duplication found)
- [ ] Independent family editorial sign-off received
### Common Spelling Patterns

- [x] Family audit completed — CK/Double Letters/TCH/DGE, Silent Letters, and Soft C and Soft G have all been audited
- [ ] Shared terminology and page pattern agreed — leaving unchecked deliberately: each page's structure grew from its own instructional needs rather than a shared template (final-position conventions for CK/TCH/DGE, near-homophone risk for Silent Letters, a reliability asymmetry between two letters sharing one condition for Soft C and Soft G) — see the family-wide consistency review item below
- [ ] CK, Double Letters, and TCH/DGE Word Endings
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for Short Vowels, Consonant Digraphs, and Consonant Blends
  - [x] Written content completed — first Variant 2 page; the three merged conventions (final ck, FLOSS doubling, tch/dge) kept as separately conditioned sections with decision tables and differentiated exception groups rather than one blended rule
  - [x] Internal links completed — missing `skillIds` back-references added to the three canonical-active Grade 1 units confirmed to teach this content (`grade-1-floss-rule`, `grade-1-tch-dge-ending-rules`, `grade-1-consonant-digraphs-final-ck`); the other five merge-source/related files were verified and excluded as deprecated, legacy, gateway, or not wired into the live Grade Hub
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through a 9-pass adversarial review; pending independent human editorial sign-off before "Complete"
- [ ] Silent Letters
  - [x] Existing page audited — prior stub had no boundary statement, no teaching routine, no diagnostic guidance, no mistakes/exceptions treatment, no "signs of security" section, empty `relatedLists`/`prerequisiteLists`/`nextLists`, and FAQs that merely restated the demonstration words
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — second Variant 2 page; the three patterns (wr, kn, mb) kept as separately conditioned sections; near-homophone risk (wrap/rap, write/rite, know/no, knot/not) identified as the pattern's central, most concrete teaching point; explicit contrast added distinguishing this page's scope from the unrelated Silent E family; demonstration set individually screened (comb swapped for crumb to avoid an incidental, untaught irregular-vowel spelling; lamb's "lam" homophone risk checked and disclosed rather than assumed absent)
  - [x] Internal links completed — missing `skillIds` back-reference added to the one canonical-active Grade 2 unit that teaches this content (`grade-2-silent-letter-words`); a previously locked test (`grade2Progression.test.ts`) that asserted no Grade 2 core card besides Two-Syllable Words could carry a `skillIds` value was updated to allow this addition
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through a 9-pass adversarial review plus a reading-specialist critique pass; pending independent human editorial sign-off before "Complete"
- [ ] Soft C and Soft G
  - [x] Existing page audited — prior stub had no bounded-scope statement, no "what to notice," no mistakes/exceptions treatment, no teaching routine, no diagnostic response, no "signs of security" section, empty `relatedLists`/`prerequisiteLists`/`nextLists`, a demonstration set that never actually exemplified the "y" trigger despite the page's own rule naming it, one FAQ that merely restated the body, and a second FAQ referencing a non-canonical "C, K, and CK" Skill that does not exist in the taxonomy
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — third Variant 2 page; c and g share one trigger condition (a combined condition table is used for exactly that reason) but are then treated in separately conditioned sections because their reliability differs sharply — soft c is reliable, soft g has common, high-frequency exceptions (get, give, girl, gift) treated as the page's central caution; an explicit cross-reference explains why bridge/badge/edge use dge instead of plain g, connecting to CK, Double Letters, and TCH/DGE Word Endings; demonstration set corrected to city/ice/icy/giant/page/gym so all three trigger letters (e, i, y) are actually demonstrated for both c and g, dropping a prior word (large) whose r-controlled confound added nothing to a minimal set
  - [x] Internal links completed — missing `skillIds` back-reference added to the one canonical-active Grade 2 unit that teaches this content (`grade-2-soft-c-soft-g`); `relatedLists` populated with CK, Double Letters, and TCH/DGE Word Endings (the dge connection) and Long A/Long I Silent E Words (the page's own demonstration words rely on silent e as the softening trigger), each justified in body prose rather than added for family symmetry
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through an adversarial review pass that independently re-verified every example word's pronunciation and fit rather than assuming correctness from surface pattern-matching; pending independent human editorial sign-off before "Complete"
- [x] Family-wide consistency self-review completed — all three Common Spelling Patterns Skill pages read together; each keeps its own distinctive instructional emphasis rather than mirroring a shared structure; internal links resolve and are individually justified per page; curriculum placement resolves for all three
- [ ] Independent family editorial sign-off received
### Silent E

**Fourth batch note:** the audit step found all four existing pages pre-dated the Standard: each was a single unstructured paragraph or two, with no bounded-scope statement, no explicit sound-vs-letter-name framing, no word-family groupings, no neighboring-pattern contrast, no mistakes/exceptions treatment, no teaching routine, no diagnostic response, and no "signs of security" section. All four carried `readinessSignals`, a field the Standard (§11) reserves for Grade Units — removed from all four. None of the four Skills had a resolvable "Where this fits in the curriculum" section, since `grade-1-long-vowels-silent-e.md` (the one Grade Unit that teaches this content) had no `skillIds` field at all — a one-line `skillIds` back-reference was added to that file, with no other change to it. `silent-e-long-u.md`'s `prerequisiteLists`/`relatedLists` pointed at the archived `silent-e-long-e` page, which the Standard (§12) prohibits linking to from a canonical Skill — repointed to `silent-e-long-o`, the actual preceding live Skill in the sequence. `silent-e-long-o.md`'s `relatedLists` pointed at `vowel-teams-ai-ay` (the long-**a** vowel team) instead of the long-**o** one — corrected to `vowel-teams-oa-ow`. No target word count was used for any page's demonstration set; each uses only as many words as its own pattern needs (5–6 words, down from the prior stub's 9–10, which had been padded toward Practice-Set size rather than kept as a true demonstration set per §5). Every demonstration and word-family-table word was independently re-screened per §8, including one word dropped outright: `fire`, in the prior Long I stub, is governed by r-controlled-vowel dynamics rather than the plain long-i pattern this page teaches, and was replaced. Each page's own instructional shape came from that vowel's actual teaching realities rather than a shared template: Long A serves as the family's reference implementation (word families plus the `have` exception, mirroring `short-a-words.md`'s structure most closely); Long I centers the realistic overgeneralization risk right after a child first learns the rule, plus the `give`/`live` exception; Long O centers a distinct exception cluster unique to it (`gone`, `done`, `some`, `come`, `one`) rather than a single word; Long U is organized around its two genuine pronunciations (`/yoo/` vs. `/oo/`) rather than rime families, plus a dialect note on `tune`/`tube`. Multiple full adversarial-review passes were run (see this batch's PR report for the complete list of issues found and corrected, including a since-fixed error in an early Long U draft that named an unsupported consonant context).
- [x] Family audit completed
- [ ] Shared terminology and page pattern agreed — leaving unchecked deliberately, consistent with the Common Spelling Patterns precedent: each page's structure grew from that vowel's own instructional realities (see batch note above) rather than a shared template, so there is no single agreed page pattern to check off — see the family-wide consistency review item below
- [ ] Long A Silent E Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — reference implementation for the family; word families, the short-a/long-a contrast, and the `have` exception
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through multiple adversarial review passes; pending independent human editorial sign-off before "Complete"
- [ ] Long I Silent E Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — centers the overgeneralization risk and the `give`/`live` exception; `fire` dropped from the demonstration set (r-controlled-vowel confound)
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through multiple adversarial review passes; pending independent human editorial sign-off before "Complete"
- [ ] Long O Silent E Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — centers the `gone`/`done`/`some`/`come`/`one` exception cluster; `relatedLists` corrected to `vowel-teams-oa-ow`
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through multiple adversarial review passes; pending independent human editorial sign-off before "Complete"
- [ ] Long U Silent E Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — organized around the `/yoo/` vs. `/oo/` pronunciation split rather than rime families, with a dialect note on `tune`/`tube`; `prerequisiteLists`/`relatedLists` repointed away from the archived `silent-e-long-e`
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through multiple adversarial review passes; pending independent human editorial sign-off before "Complete"
- [x] Family-wide consistency self-review completed — self-review passed (all four siblings read as distinct in structure and emphasis, not mirrored clones; internal links resolve and are individually justified, not added for family symmetry; curriculum placement now resolves for all four via the new `grade-1-long-vowels-silent-e` `skillIds` back-reference; no Grade Unit duplication found; the archived `silent-e-long-e` page is not linked from any live Skill)
- [ ] Independent family editorial sign-off received
### Vowel Teams

**Fifth batch note:** this batch completes the Vowel Teams family's four remaining Grade 2 Skills — OI and OY, OU and OW, OO, and AU and AW — which had existed only as thin, pre-Standard stubs (populated frontmatter and FAQs, but a single one-paragraph body each, `relatedLists`/`prerequisiteLists` both empty). As part of the audit step, the four Grade 2 Grade Unit siblings these Skills were promoted from (`vowel-teams-oi-oy.md`, `vowel-teams-ou-ow.md`, `grade-2-oo-two-sounds.md`, `grade-2-au-aw-words.md`) were confirmed to have no `skillIds` back-reference to their Skill — the same gap already fixed for every earlier family — so a one-line `skillIds` addition was made to each, with a corresponding update to `grade2Progression.test.ts`'s back-reference expectation map (which had encoded the missing back-references as the expected state) and to the explanatory comment in `grade2Progression.ts`. Each Skill's own instructional model was independently derived rather than reused from AI/AY: OI/OY teaches the genuine syllable-final tendency for OY (not a naive "middle vs. end" rule, since it must also explain mid-word cases like `royal`); OU/OW states plainly that no position rule exists and teaches word recognition instead, while keeping its scope boundary against the unrelated long-o OW (`vowel-teams-oa-ow`) reciprocal with that page's existing boundary statement; OO teaches both pronunciations with neither presented as default, naming the loose (not reliable) oo-before-k tendency and a genuine dialect note (`roof`/`root`); AU/AW keeps its existing position tendency but names a real, common counterexample (`haul`, `fault`, `vault`) rather than presenting the tendency as absolute. Every demonstration word was re-audited rather than assumed to deserve its place; `royal`/`loyal` were added to OI/OY specifically to demonstrate the syllable-final tendency, and `author`/`haul` were added to AU/AW to demonstrate genuine mid-word AU and the tendency's real exception.

**Follow-up adversarial pass (same batch):** a second, dedicated adversarial review after the initial draft found three genuine completeness gaps, all now corrected. (1) OO's `shortAnswer` and body claimed *oo* spells "two different vowel sounds" without qualification — `blood`/`flood` (short u) and `door`/`floor`/`poor` (r-controlled, before `r`) are real, if uncommon, third/fourth pronunciations; added an explicit scope boundary (FAQ) naming them rather than leaving the "two sounds" claim to read as exhaustive. (2) AU/AW's existing `augh`-exclusion FAQ claimed `augh` spells "a similar sound" to `au`/`aw` — false: `caught`/`taught` use the target sound but `laugh` (also spelled with `augh`) does not; corrected the FAQ wording and added `laugh` as a named, common, genuine *sound* exception (distinct in kind from `haul`'s *position* exception, since `laugh` doesn't use the target sound at all). (3) OU/OW's scope statement bounded out only the unrelated long-o `ow` (`snow`) — it didn't bound out the equally common short-u `ou` (`young`, `touch`, `double`, `trouble`, `country`, `cousin`), a real and frequent alternate pronunciation of the same two letters; added an explicit second scope boundary alongside the existing OA/OW one.

- [x] Family audit completed
- [ ] Shared terminology and page pattern agreed — deliberately left unchecked: each of the seven live Vowel Teams Skills earns its own section order and emphasis from its own instructional reality (a genuine position tendency, no tendency at all, two coexisting sounds, or a tendency with real exceptions), so there is no single agreed page pattern to check off — see the family-wide consistency review item below
- [ ] AI and AY Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — reframes the AI/AY position tendency as a base-word pattern (distinguishing it from surface forms like `playing`/`stayed`), contrasted with Long A Silent E Words
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed — `readinessSignals` removed (not appropriate for Skill pages per the Standard); `skillIds` back-reference added to `grade-1-long-a-long-o-vowel-teams`
  - [ ] Final editorial review passed — drafted and self-reviewed through multiple adversarial review passes; pending independent human editorial sign-off before "Complete"
- [ ] EE and EA Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — states plainly that no position rule distinguishes EE from EA and teaches recognition/word-family strategy instead of inventing one
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed — `readinessSignals` removed; `skillIds` back-reference added to `grade-1-long-e-vowel-teams`
  - [ ] Final editorial review passed — drafted and self-reviewed through multiple adversarial review passes; pending independent human editorial sign-off before "Complete"
- [ ] OA and OW Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — states the scope boundary against the unrelated `/aʊ/` `ow` in `cow` (belongs to OU and OW Words) in both directions; keeps `know` with an explicit silent-`k` justification
  - [x] Internal links completed
  - [x] Structured data and metadata reviewed — `readinessSignals` removed
  - [ ] Final editorial review passed — drafted and self-reviewed through multiple adversarial review passes; pending independent human editorial sign-off before "Complete"
- [ ] OI and OY Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — teaches OY as ending a syllable (not merely a word), so mid-word cases like `royal`/`loyal` follow the same reasoning rather than reading as exceptions; a genuine `koi`-type exception named
  - [x] Internal links completed — `relatedLists`/`prerequisiteLists` added pointing at `vowel-teams-oa-ow`
  - [x] Structured data and metadata reviewed — `skillIds` back-reference added to `vowel-teams-oi-oy`
  - [ ] Final editorial review passed — drafted and self-reviewed through multiple adversarial review passes; pending independent human editorial sign-off before "Complete"
- [ ] OU and OW Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — states plainly that no position rule distinguishes OU from OW and teaches recognition/word-family strategy instead of inventing one; scope boundary against the unrelated long-o OW (`vowel-teams-oa-ow`) kept reciprocal with that page's existing boundary
  - [x] Internal links completed — `relatedLists`/`prerequisiteLists` added pointing at `vowel-teams-oa-ow` and `oi-and-oy-words`
  - [x] Structured data and metadata reviewed — `skillIds` back-reference added to `vowel-teams-ou-ow`
  - [ ] Final editorial review passed — drafted and self-reviewed through multiple adversarial review passes; pending independent human editorial sign-off before "Complete"
- [ ] OO Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — teaches both oo pronunciations with neither presented as default; the oo-before-k tendency named explicitly as loose, not a rule; a genuine dialect note added (`roof`/`root`)
  - [x] Internal links completed — `prerequisiteLists`/`relatedLists` added pointing at `ou-and-ow-words`
  - [x] Structured data and metadata reviewed — `skillIds` back-reference added to `grade-2-oo-two-sounds`
  - [ ] Final editorial review passed — drafted and self-reviewed through multiple adversarial review passes; pending independent human editorial sign-off before "Complete"
- [ ] AU and AW Words
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — keeps the existing position tendency but names a genuine, common counterexample (`haul`, `fault`, `vault`) rather than presenting the tendency as absolute; `augh` exclusion kept
  - [x] Internal links completed — `prerequisiteLists`/`relatedLists` added pointing at `oo-words`
  - [x] Structured data and metadata reviewed — `skillIds` back-reference added to `grade-2-au-aw-words`
  - [ ] Final editorial review passed — drafted and self-reviewed through multiple adversarial review passes; pending independent human editorial sign-off before "Complete"
- [ ] IE and IGH Words
  - [x] Approved persisted content brief completed before drafting
  - [x] Search intent documented (`shortAnswer`/`description` and approved brief)
  - [x] Written content completed — preserves the real IE/IGH asymmetry; contrasts silent-e and final-y long I; bounds out long-E `ie` and derived `-ied` forms
  - [x] Internal links completed — one earned relationship to Long I Silent E Words; no Grade Unit placement fabricated because no current Grade Unit teaches IE/IGH
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — implementation and adversarial self-review complete; pending independent human editorial sign-off before "Complete"

**IE/IGH adversarial-review note:** the first complete review rejected four tempting but unsupported shortcuts before publication. (1) IE and IGH were not padded to equal columns: `lie` and `die` are valid body examples but add no new demonstration condition, while the substantially larger `igh` family earns more space. (2) The position statement was bounded as a useful tendency, not an absolute rule; hearing long I alone is explicitly insufficient. (3) `cried` and `tried` were removed from the core IE group and treated as derived forms from `cry`/`try`, preventing a suffix change from being mislabeled as a base-word vowel-team pattern. (4) Same-family Vowel Team links and a Multisyllabic Words link were rejected because the body did not earn them; only Long I Silent E Words survives as a materially taught contrast. Release review also corrected the Vowel Teams hub description: it no longer calls every family member a “two-letter vowel team,” because `igh` is explicitly taught as a three-letter spelling and the family also includes non-long-vowel sounds. A repository-wide Grade 1 audit found no unit whose body teaches IE/IGH, so no `skillIds` placement was fabricated. External browsing for an additional authoritative source check was attempted but unavailable in the execution environment; the published page therefore keeps its claims to basic, bounded linguistic descriptions and makes no developmental, frequency, dialect, or named-program claims.
- [x] Family-wide consistency self-review completed — all eight live pages and relationship boundaries reviewed together
- [ ] Independent family editorial sign-off received
### R-Controlled Vowels

**Sixth batch note:** the audit step found all three existing pages pre-dated the Standard: each was a single unstructured two-paragraph body, with no bounded-scope statement, no word-family groupings, no explicit sound-vs-letter-name framing beyond a passing mention, no mistakes/exceptions treatment, no teaching routine, no diagnostic response, and no "signs of security" section. R-Controlled AR Words additionally carried a wrong `relatedLists`/`prerequisiteLists` link to `vowel-teams-ou-ow` (an unrelated vowel-team page, evidently a copy-paste leftover) — removed and replaced with genuinely justified relationships rather than left in place or swapped for another family member by default (per the roadmap's own "same-family membership alone does not earn a relationship" standard): AR now takes `short-a-words` as a real prerequisite (the short-a/AR contrast is a required Variant 1 element, not just a convenient link) and `r-controlled-or` as a related Skill; OR takes `short-o-words` as its own parallel prerequisite, plus both `r-controlled-ar` (parallel single-spelling sibling) and `r-controlled-er-ir-ur` (a concrete, non-arbitrary link: OR's own `wor-` exception words make the ER/IR/UR sound) as related; ER/IR/UR takes `r-controlled-ar` as prerequisite (the foundational r-controlled concept is clearest through AR's single-spelling case) and `r-controlled-or` as related (reciprocal to the `wor-` link). Two independently verified, real phonetic exceptions were researched and added rather than left as unqualified "always" claims: AR's regular sound shifts after `w` or `qu` (`war`, `warm`, `ward`, `quart`, rhyming with `for`/`form`/`cord`/`short` instead of `car`/`farm`), and OR's regular sound shifts in the small `wor-` group (`word`, `work`, `world`, `worm`, `worth`, rhyming with `bird`/`turn`/`her` instead of `corn`/`short`) — with `worn` named explicitly as a counter-example so the `wor-` exception isn't overgeneralized to every word starting with those letters. OR's real, bounded dialect variation (the horse–hoarse merger, where `horse` and historically-distinct `hoarse`/`four` have merged in most modern American English) replaces a vague, unverifiable "pronunciation varies" claim. ER/IR/UR explicitly distinguishes the clear, stressed sound in one-syllable words (`her`, `bird`, `turn`) from the softer, unstressed ending in longer common words (`sister`, `winter`, `under`) rather than treating all ten demonstration words as phonetically identical, and scopes its "one sound" claim to mainstream rhotic American English with a brief note that non-rhotic accents pronounce these words differently. No prediction rule was invented for ER/IR/UR — the page states plainly that recognition through repeated exposure is the practical strategy, matching the existing FAQ's honest stance. Every demonstration word was individually re-screened per the Standard's example-and-word-list criteria rather than assumed to deserve its place: `large` was dropped from AR's set (introduces the soft-g pattern, an untaught Grade 2 Skill, ahead of Grade 1 sequence) and `order` was dropped from OR's set (its unstressed `-er` ending introduces the ER/IR/UR pattern before that Skill is taught in sequence); the ER/IR/UR set was kept at its original ten words after individual review found no confound, reorganized instead into a stressed-core group and a labeled unstressed-ending group. As part of the internal-links audit, both Grade 1 Grade Unit siblings (`grade-1-r-controlled-ar-or.md`, `grade-1-r-controlled-er-ir-ur.md`) were confirmed to have no `skillIds` back-reference to their Skills — the same gap already fixed for every earlier family — so a one-line `skillIds` addition was made to each, with no other change to those files (`grade-2-two-syllable-words.md` already carried the correct back-reference to all three and needed no change). Following the existing `short-a-words`/`silent-e-long-a` reciprocal-link precedent, a one-line reciprocal `relatedLists` entry was also added to `short-a-words.md` (→ `r-controlled-ar`) and `short-o-words.md` (→ `r-controlled-or`), since a new genuine prerequisite relationship was introduced in this batch. A dedicated adversarial-review pass then re-examined every claim above under the assumption it was false until independently verified — including the AR/OR w-shift exceptions, the horse–hoarse merger, the stressed/unstressed ER distinction, and every demonstration word and relationship field — before this batch note was written.

**Follow-up adversarial pass (same batch):** a second, dedicated adversarial re-read of the drafted pages found four issues, all now corrected. (1) AR's short-a/AR contrast table included an invented third pair, `mad`/`mart` — `mart` is an uncommon word for this audience and the pair wasn't a clean contrast the way `cat`/`car` is; the row was dropped rather than patched with another forced pairing. (2) AR's `-are` scope-boundary FAQ originally attributed the `hair`/`stair` sound to "the combination of a, r, and a silent e together," which is only true of `care`/`share`/`dare` — `hair` and `stair` reach the same sound through a vowel-team spelling with no silent e at all, so the FAQ conflated two different spellings of one sound; reworded to separate the sound from the spelling mechanism. (3) OR's short-o/OR contrast table paired `hot` with `short` and `dot` with `sort` — neither pair actually contrasts cleanly (`short` and `sort` don't share `hot`/`dot`'s onset or structure); replaced with `hot`/`horn`, a real, common, structurally parallel pair, and dropped the third row rather than force another weak match. (4) ER/IR/UR's "no rule" FAQ asserted that "some advanced patterns exist in longer, less frequent words" without naming or verifying any — an unsupported claim; removed rather than left as an unverifiable gesture.

**Third pass — external verification and relationship reconfirmation (same batch):** a follow-up review, prompted by a request to independently verify the dialect claim and re-examine two relationship decisions, made three further corrections. (1) OR's horse–hoarse FAQ was checked against external sources (Wikipedia's "English-language vowel changes before historic r" article and corroborating web search results) per the Standard's evidence-ladder requirement (§14) for dialect claims. The original wording — "in some older or regional accents... were pronounced differently" — understated and mis-timed the phenomenon: the merger is not a fading historical artifact but a live, present-day distinction actively maintained by identifiable current speaker populations, including Southern American English, the Boston accent, and some Scottish and Irish varieties, alongside General American's majority merger. The FAQ was reworded to state this accurately (present tense, named accents, explicit "neither pronunciation is more correct") rather than removed, since it serves a genuine purpose: preventing a parent whose own or child's speech reflects one of these non-merging varieties from treating it as an error. (2) The reciprocal `relatedLists` entries added to `short-a-words.md` (→ `r-controlled-ar`) and `short-o-words.md` (→ `r-controlled-or`) were reverted. Neither short-vowel page's body prose explained the relationship in the surrounding text — the Standard (§12) requires every link to be explained in prose, not just represented by a related-Skill card — and retrofitting new prose into those two already-reviewed pages (short-a-words is the family's reference implementation) to justify a card added purely for reciprocity risked displacing their existing, more central purposeful links (short-e-words/silent-e-long-a and short-u-words/silent-e-long-o respectively). The relationship remains one-directional: AR and OR still declare `short-a-words`/`short-o-words` as `prerequisiteLists`, and each R-Controlled page's own "Compared With Short [Vowel]" section substantively explains why, satisfying §12 from that side. (3) ER/IR/UR's `prerequisiteLists: ["r-controlled-ar"]` was re-examined and found not to be a genuine instructional prerequisite — no architecture doc documents a conceptual dependency, and a learner does not need AR's specific single-spelling pattern or its `war`/`warm` exception to understand that ER, IR, and UR share one sound. The only real basis was that Grade 1 happens to teach AR/OR before ER/IR/UR, which is Grade Unit sequencing, not a Skill-level dependency, and the Standard explicitly warns against a Skill page adopting one grade's framing as if it were universal (§2). Moved to `relatedLists` alongside `r-controlled-or`, with `prerequisiteLists` left empty; the body's existing "Unlike AR and OR..." contrast already treats the relationship as related prior context rather than assuming it as required preparation, so no body-prose change was needed.

- [x] Family audit completed
- [ ] Shared terminology and page pattern agreed — deliberately left unchecked, consistent with prior-family precedent: AR and OR each earn a single-spelling-single-sound structure with their own distinct exception (the w-shift for AR, the `wor-` group for OR), while ER/IR/UR earns a three-spellings-one-sound structure built around recognition rather than a rule — there is no single shared page pattern to check off — see the family-wide consistency review item below
- [ ] R-Controlled AR Words
  - [x] Existing page audited — prior stub had no word-family groupings, no short-a contrast, no mistakes/exceptions treatment, no teaching routine, no diagnostic response, no "signs of security" section, and a `relatedLists`/`prerequisiteLists` link to the unrelated `vowel-teams-ou-ow`
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — reframes AR as one of the most reliable r-controlled spellings, contrasted with short a; the `war`/`warm`/`quart` w-shift exception named as a bounded Level 2 case; a brief scope boundary added against `-are` words (`care`, `share`); `large` dropped from the demonstration set (untaught soft-g confound)
  - [x] Internal links completed — wrong `vowel-teams-ou-ow` link removed; `prerequisiteLists` set to `short-a-words`, `relatedLists` set to `r-controlled-or`, each justified in body prose; missing `skillIds` back-reference added to `grade-1-r-controlled-ar-or`; a reciprocal `r-controlled-ar` link was tried on `short-a-words` and then reverted (see third-pass note above) since that page's own body prose never explained the relationship — the link stays one-directional, from this page's `prerequisiteLists` only
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through an adversarial review pass that independently re-verified the w-shift exception and the `-are` scope boundary; pending independent human editorial sign-off before "Complete"
- [ ] R-Controlled OR Words
  - [x] Existing page audited — prior stub had no word-family groupings, no short-o contrast, no mistakes/exceptions treatment, no teaching routine, no diagnostic response, no "signs of security" section
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — contrasted with short o; the `wor-` exception (`word`, `work`, `world`, `worm`, `worth`) named as the central caution and cross-linked to R-Controlled ER, IR, and UR Words, with `worn` named as a counter-example against overgeneralizing the exception; a bounded dialect note added (the horse–hoarse merger) in place of a vague pronunciation-variation claim; `order` dropped from the demonstration set (untaught unstressed ER-ending confound)
  - [x] Internal links completed — `prerequisiteLists` set to `short-o-words`; `relatedLists` kept at `r-controlled-ar` and `r-controlled-er-ir-ur`, each justified in body prose (the latter via the concrete `wor-` connection); missing `skillIds` back-reference added to `grade-1-r-controlled-ar-or`; a reciprocal `r-controlled-or` link was tried on `short-o-words` and then reverted (see third-pass note above) — kept one-directional for the same reason as AR/`short-a-words`
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through an adversarial review pass that independently re-verified the `wor-` exception, the `worn` counter-example, and the horse–hoarse merger claim against external sources (Wikipedia, corroborating search results) in a dedicated third pass; pending independent human editorial sign-off before "Complete"
- [ ] R-Controlled ER, IR, and UR Words
  - [x] Existing page audited — prior stub had no explicit stressed/unstressed distinction, no dialect scoping, no teaching routine, no diagnostic response, no "signs of security" section
  - [ ] Search intent documented — same open tracking-location gap noted for the other batches
  - [x] Written content completed — states plainly that no dependable rule predicts ER vs. IR vs. UR and teaches recognition/repeated-exposure instead of inventing one; explicitly distinguishes the clear stressed sound in `her`/`bird`/`turn` from the softer, unstressed ending in `sister`/`winter`/`under`; scoped to mainstream rhotic American English with a brief non-rhotic dialect note; cross-references the `wor-` exception on R-Controlled OR Words
  - [x] Internal links completed — `prerequisiteLists` was initially set to `r-controlled-ar`, then re-examined in a third pass and found not to be a genuine instructional dependency (no architecture doc documents one, and the only basis was Grade 1's own teaching order, which is Grade Unit sequencing, not a Skill-level requirement); moved to `relatedLists` alongside `r-controlled-or` (the `wor-` connection), with `prerequisiteLists` left empty; missing `skillIds` back-reference added to `grade-1-r-controlled-er-ir-ur`
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through an adversarial review pass that independently re-verified the stressed/unstressed distinction and the rhotic-accent scoping; pending independent human editorial sign-off before "Complete"
- [x] Family-wide consistency self-review completed — self-review passed (all three siblings read as distinct in structure and emphasis: AR and OR each center their own single-spelling exception, ER/IR/UR centers recognition-over-rule; internal links resolve and are individually justified, not added for family symmetry; curriculum placement now resolves for all three via the corrected `grade-1-r-controlled-ar-or` and `grade-1-r-controlled-er-ir-ur` `skillIds` back-references; no Grade Unit duplication found)
- [ ] Independent family editorial sign-off received
### Multisyllabic Words

**Seventh batch note:** the independent audit confirmed the frozen single-Skill family and hybrid classification, but found that the existing page was a one-paragraph synopsis rather than a canonical instructional resource. Its opening claim that longer words are spelled “the same way they're read” was too strong for English orthography, especially where unstressed vowels, silent letters, conventional spellings, and morphology carry information that speech alone does not identify. The existing definition also equated a syllable with a “beat” and “the number of times your mouth opens,” heuristics that can help some learners but do not define the linguistic unit and break down around syllabic consonants. The body characterized every syllable as vowel-centered while simultaneously describing final consonant-`le` words as having a syllable with no separate vowel sound; that contradiction is now resolved by saying syllables are *usually* organized around a vowel sound and explicitly treating syllabic `l`. The Grade 2 source unit also incorrectly called *paper* an open-plus-closed word even though its second syllable is not a short-vowel closed syllable in the target pronunciation; the canonical Skill does not repeat that claim, while the Grade Unit prose remains intentionally untouched because this batch's authority is limited to Skill content and metadata back-references.

The six demonstration words were not preserved automatically. *Rabbit* and *basket* remain because they provide familiar but non-identical closed-syllable analyses (a medial doubled consonant versus two different medial consonants); *paper* remains because its open first syllable and reduced, r-colored ending make it useful for showing both what syllable analysis can reveal and what hearing may leave uncertain; *winter* remains for the same honest stressed/unstressed r-controlled contrast already established on the ER/IR/UR Skill. *Little* and *table* remain as contrasting consonant-`le` examples. *Robot* was added as a clearer open-first-syllable example than relying on *paper* alone, and *sunset* was added as a conceptually pure compound whose syllable and morpheme boundaries align. *Music* is discussed in prose as an open-syllable example but was not added to the immediate demonstration set, avoiding unnecessary list expansion. (An earlier draft of this prose claimed a /yoo/–/oo/ pronunciation variation for *music* specifically — that claim did not survive a later independent audit; see below.) Relationships were left empty until the prose established a concrete purpose: `r-controlled-er-ir-ur` now supports the page's stressed-versus-unstressed *her/winter* contrast, and `common-suffixes` supports the explicit boundary between syllable chunks and genuine morphological parts. Neither is labeled a prerequisite; family order and Grade Unit sequence are not conceptual dependencies.

The curriculum-placement audit found that none of the six architecture-identified contributing Grade Units pointed back to `multisyllabic-words`. Metadata-only `skillIds` entries were added to Grade 1 Open Syllables and Final Y, both Grade 2 syllable units, and the Grades 3–5 multisyllabic units. The existing test that required the Grade 2 source chain to remain “untouched” encoded implementation drift: it protected missing metadata even though reverse `skillIds` lookup is the only supported way to render a required curriculum-placement section. It was replaced with coverage that preserves every page's Grade Unit role while requiring the resolvable back-reference. No test imposes a generic heading template; only **Open Syllables** and **Words Ending in Consonant-LE** are matched exactly because those two names are explicitly frozen by `SKILLS_ARCHITECTURE.md`.

**Adversarial review corrections:** the first falsification pass found and corrected three substantive problems in the draft. (1) The initial draft repeated an incorrect claim that *rabbit* contains three vowel letters; it contains two, so the example was replaced with the clearer silent-*e* contrast in *table*. (2) The first definition still treated every syllable as vowel-centered, contradicting its own consonant-`le` explanation; “usually” and an explicit syllabic-consonant qualification were added to the definition, FAQ, and tapping routine. (3) The draft risked presenting visual VCV division as a rule; it now calls the strategy a first attempt, requires checking the resulting whole-word pronunciation, and states that pronunciation, conventional spelling, and meaningful structure can override a simple visual division. A second complete adversarial pass re-tested the open/closed tendencies, consonant-`le` account, schwa wording, /yoo/–/oo/ variation, word analyses, morphology boundary, relationships, FAQ advice, and diagnostic routine and found no further substantive educational correction. External browsing was attempted for additional authoritative-source verification but was unavailable in the execution environment (the web tool returned HTTP 401 and direct authoritative-site requests were blocked by the network proxy); therefore the page deliberately limits itself to bounded, standard descriptions and leaves independent human source review outstanding rather than presenting uncertain detail as settled fact.

**Rendered-output follow-up:** static HTML inspection found that the first draft's two explanatory prose links used a nonexistent `/spelling-lists/skills/` route even though the relationship cards correctly resolve entries through their content categories. Both prose links were corrected to their live canonical destinations (`/spelling-lists/phonics/r-controlled-er-ir-ur/` and `/spelling-lists/grade-level/common-suffixes/`), and a repeat local-link check found no non-200 spelling-list destinations. Browser binaries were not installed and the network proxy blocked Playwright's Chromium download, so true desktop/mobile visual inspection and screenshots remain an explicit environment-limited human-review item rather than being falsely reported as complete.

**Independent audit pass (post-merge):** a fully independent review, assuming nothing about the merged page's correctness, found five further substantive issues and corrected all of them. (1) The Open Syllables section's claim that *music* may begin with either the long-u sound or an "/oo/" sound was false — yod-dropping (the process behind real variation pairs like *tune*/*toon*) occurs after alveolar consonants, not after *m*; no attested "/oo/" pronunciation of *music* exists in mainstream English, so the fabricated variation was removed rather than replaced with another dialect claim. (2) FAQ #1 duplicated the intro's syllable definition almost verbatim, a direct violation of the FAQ policy's no-duplication rule; it was rewritten around its own genuinely additive content (why clapping and vowel-letter counts are unreliable) instead of re-defining "syllable." (3) The page's central thesis — that hearing syllables does not reveal every letter — depended on schwa/unstressed-vowel reduction, a mechanism that lived only in an FAQ and was never connected to the body's own discussion of *paper*, the word chosen to demonstrate it; the explanation was moved into the Open Syllables section using *paper* directly, and the FAQ was rewritten toward practical diagnostic guidance to avoid re-duplicating the new body content. (4) The body discusses compounding using *sunset* with the same instructional weight given to suffixes, but only Common Suffixes had been added to `relatedLists` — Compound Words was added and linked in prose for the same reason. (5) `multisyllabicWordsSkillFamily.test.ts`'s relationship-resolution test used a double-quote-only regex against frontmatter that uses single quotes, so it passed vacuously without checking anything; the regex was widened to accept both quote styles and the test now genuinely asserts all three related ids resolve. The demonstration set, `prerequisiteLists`, and all six Grade Unit `skillIds` back-references were re-verified independently and found correct — no changes.

- [x] Family audit completed
- [ ] Shared terminology and page pattern agreed — not treated as a mechanical template for a single-page family; the page follows its documented hybrid needs, pending independent human review
- [ ] Multisyllabic Words
  - [x] Existing page audited — the prior one-paragraph body omitted a bounded scope, flexible analysis process, organized contrasts, mistakes and limits, teaching routine, diagnostic response, and signs of security; several claims were overbroad or internally inconsistent as documented above; a later independent audit pass found and corrected five further issues, documented above
  - [ ] Search intent documented — the repository still has no approved tracking location for page-level search intent
  - [x] Written content completed — integrates spoken syllables, open/closed tendencies, the required Open Syllables and Words Ending in Consonant-LE treatments, genuine morphology where applicable, reduced-vowel limits, a five-step routine, diagnostic responses, and signs of security without turning the page into a Grade Unit
  - [x] Internal links completed — three related Skills, each added only after a concrete relationship was explained in prose; no prerequisite invented from curriculum order
  - [x] Structured data and metadata reviewed — concise metadata retained, Grade Unit-only `readinessSignals` remains absent, and `skillIds` back-references added to all six contributing Grade Units
  - [ ] Final editorial review passed — drafted and self-reviewed through repeated adversarial passes, then independently re-audited post-merge with five further corrections made; authoritative web-source access was blocked in this environment, so independent human evidence review and editorial sign-off remain required before "Complete"
- [x] Family-wide consistency self-review completed — self-review passed for the single page and its rendered relationships/curriculum placement
- [ ] Independent family editorial sign-off received
### Word Building and Endings

**Eighth batch note:** the independent audit found six published but noncanonical stubs: each had only a direct answer, a small demonstration list, and one body paragraph. None supplied the Standard's required organized example system, attention statement, mistake/boundary treatment, teaching routine, diagnostic response, or signs of security. All relationship fields were empty; that was not itself drift, and links were added only where the completed prose established a continuing instructional handoff. The family test also imposed an unsupported 4–16 word range while failing to parse inline relationship arrays, and none of the eleven architecture-designated contributing Grade Units carried the `skillIds` metadata required for reverse curriculum placement.

The educational boundaries were redrawn rather than forcing a shared template. Plurals now covers regular noun *-s/-es*, using pronunciation only for the spelling-relevant extra-syllable decision and bounding consonant-plus-*y* and irregular forms. Words Ending in *-ed* and *-ing* uses unchanged-base examples, explains the stable written *-ed* ending without reteaching base changes, and hands those mechanics to the rules Skill. Common Suffixes distinguishes derivational *-ful/-less/-ness/-ment* from inflectional comparative *-er/-est* instead of claiming every suffix changes meaning alike. Spelling Rules for Adding Suffixes teaches only the double/drop/change/attach decision and explicit negative cases. Compound Words centers two meaningful component words, contrasts syllable chunks, and mentions open/hyphenated compounds only as a formatting boundary. Contractions centers expansion, omitted letters, and apostrophe placement, with *won't* and *it's/its* kept as bounded high-utility cautions rather than a broader grammar lesson.

Demonstration sets were independently re-audited rather than normalized by count. Plurals added *books, buses,* and *lunches* to strengthen the *-s/-es* contrast while removing redundant *cups* and the less useful isolated *buzzes*. The *-ed/-ing* set became four complete unchanged-base pairs, adding *playing, rested,* and *resting* so pronunciation and syllable contrasts are honest without importing spelling-change rules. Common Suffixes replaced redundant same-family examples with one transparent example for each distinct suffix job. The spelling-rules set adds negative controls (*hopeful, carrying*) so the immediate resource does not demonstrate transformations without their boundaries. Compound Words replaced *football* and *rainbow* with the especially transparent *sunset* and *toothbrush*. Contractions added *she's* and *won't* because they earn distinct pattern/exception roles; YAML quoting was normalized for every apostrophe-bearing word.

Relationship review retained empty fields for Plurals, Compound Words, and Contractions: family membership and the superficial fact that two words are involved do not establish an instructional relationship. `ed-and-ing` links to `suffix-spelling-changes` because its unchanged-base boundary explicitly sends changing bases there; Common Suffixes and Spelling Rules for Adding Suffixes link reciprocally because the completed pages repeatedly distinguish suffix function from attachment mechanics. The rules page also links to `ed-and-ing` because its transformations operate on the very endings that page deliberately excludes. These are related Skills, not prerequisites or universal next steps; all `prerequisiteLists` and `nextLists` remain empty.

The curriculum audit confirmed every mapping against both `SKILLS_ARCHITECTURE.md`'s named source chain and the Grade Unit's actual teaching content before adding metadata: two plural units, one *-ed/-ing* unit, three suffix-form/function units, three base-change units, one compound unit, and one contraction unit now point to their respective canonical Skills. No Grade Unit prose, word list, sequencing, readiness signal, or relationship was changed. Focused coverage now protects those placements, all contributing Grade Unit roles that are explicit in current content, nonempty demonstration sets without an invented count contract, canonical Skill-only relationship targets, duplicate relationships, and Grade-Unit-side placement ownership.

**Adversarial review corrections:** the first claim-level pass removed a three-way plural-pronunciation lesson from the main instruction and retained only the extra-syllable test that can change the *-s/-es* spelling choice. It qualified *-er/-est* as comparative inflection, limited doubling to clear one-syllable starting examples rather than implying a complete stress rule, added negative cases for doubled consonants and final *y*, and replaced an overbroad final-*e* rule with a useful starting condition plus familiar bounded exceptions. It also prevented Compound Words from becoming a taxonomy of open/hyphenated formatting and treated *won't* as a whole-word irregularity without an unsupported public etymology. A second family-boundary pass removed tense/aspect instruction from the rules page, kept all three base transformations off the *-ed/-ing* page, eliminated duplicate FAQ material, verified every word equation and contraction expansion, and found no further substantive correction. External authoritative-source verification was attempted for the uncertain linguistic claims, but the web service returned HTTP 401 in this environment; wording was therefore kept bounded and independent human source review remains required.

**Rendered-output follow-up:** dependency installation was attempted twice from the lockfile, but the network proxy returned HTTP 403 for required npm tarballs and left no local Astro, Vitest, or project ESLint binaries. Consequently the requested build, full/focused tests, and desktop/mobile browser inspection could not run in this environment; direct authoritative-site requests were likewise rejected by the proxy. Source-level checks confirmed all eleven back-references, canonical Skill relationship targets, nonempty demonstration sets, prose-link destinations, and a clean Git diff. True rendered inspection, screenshots, and the normal project command suite remain explicitly pending rather than being reported as complete.

**Release-verification follow-up:** verification was rerun from the existing feature work (the checkout exposes the review as a squashed commit rather than the original `40b5424`/`cf89d9d` hashes). Both online and offline lockfile installation failed—the proxy returned HTTP 403 and the local npm cache lacked required tarballs—so the exact focused/full test, lint, and build commands could not execute with project binaries. The web research service again returned HTTP 401, and no Git remote or prior CI/rendered artifacts were available. The educational recheck nevertheless found two substantive wording issues and corrected both: the Plurals direct answer now makes the *-es* condition sound-based rather than implying that every written final *ch* behaves alike, matching the body’s *stomach → stomachs* boundary; and the Contractions page now expands *can't* only as *cannot* rather than offering the separately meaningful spelling *can not* as an equivalent teaching expansion. The other central claims were re-falsified and received no further prose change, but authoritative-source confirmation remains a release blocker rather than being claimed from memory. All eleven `skillIds` mappings were rechecked one by one against the frozen source table and actual Grade Unit body; a second source-level audit also confirmed no duplicate or unexpected incoming placement, so no mapping change was warranted. Automated, authoritative-source, and visual verification are handed off with the exact commands and six canonical routes in the PR summary; all pages remain at Needs review and final sign-off remains unchecked.

**Independent release verification (dependencies installed, commands actually run):** unlike the two prior follow-ups, `npm ci` succeeded in this environment, so the focused family test, full suite, lint, and build all ran for real rather than being handed off. The focused test and full suite (39 files, 538 tests) initially showed one failure: `grade2Progression.test.ts` — an unrelated, pre-existing test file with its own hand-maintained `expectedSkillIds` map — had not been updated when `grade-2-list-02` and `grade-2-contractions` legitimately received `skillIds` metadata, so it still expected `[]` for both. This was confirmed as legacy test drift, not an implementation error, and fixed by adding the two entries to that map; full suite, lint, and build are now clean. The family test's inline-array parser was verified to actually work, not just pass vacuously: a synthetic mutation (temporarily changing a Grade Unit's `skillIds` to a wrong value) was confirmed to make the curriculum-placement test fail, then the file was restored.

The dev server was started and all six pages were screenshotted at desktop (1440px) and mobile (390px) widths. Two genuine rendering bugs were found and fixed, both pre-existing template/component defects surfaced by this family's longer Skill descriptions rather than page-content errors: (1) `RelatedListCards.astro`'s card anchors used `sm:flex-none` with no width cap, so a row of exactly two long-description Skill cards (`suffix-spelling-changes`'s "Also worth practicing" row) refused to shrink and overflowed the viewport by ~47px on desktop — fixed by adding `sm:max-w-sm`. (2) Markdown tables rendered with no responsive wrapper anywhere on the site, which produced a small (~5px) horizontal overflow on `compound-words` at mobile width from its comparison table — fixed by adding `[&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto` to the markdown body wrapper in `[slug].astro`. Both are narrowly-scoped CSS/markup fixes, not a redesign, and were verified fixed by re-running the same screenshot pass (all twelve captures show no overflow). A separate observation — in-body markdown `##`/`###` subheadings render with no visual weight (same 18px/400 as body text) — was confirmed to be pre-existing sitewide behavior (reproduced on an already-published, unrelated legacy page) rather than something this family introduced, so it was left alone.

All eleven `skillIds` back-references were re-confirmed directly against file frontmatter (exact `grep` of `id:`/`skillIds:`/`contentRole:` on all eleven files) and cross-checked for duplicates/unexpected placements across the entire content directory — exactly eleven files reference any of the six Skill ids, matching the frozen 2+1+3+3+1+1 mapping with no drift. Rendered curriculum-placement cards were visually confirmed to sort into canonical grade order. Relationship fields were re-read from source (not re-derived) and confirmed unchanged from the prior pass: only `suffix-spelling-changes` ↔ `ed-and-ing`/`common-suffixes` are populated, `nextLists` is empty everywhere, and no Grade Unit id appears in any Skill's relationship fields.

The six pages' prose, word equations, comparison tables, and FAQs were re-read in full against the linguistic claims listed for this verification pass (regular plural conditions, sibilant/hissing-buzzing endings, the *stomach → stomachs* boundary, the three *-ed* pronunciations, derivational-vs-inflectional suffixes, doubling/silent-e/y-to-i conditions and their negative cases, *won't* as irregular and *can't → cannot* as the sole taught expansion, apostrophe/omission explanations, and the compound-word definition) and found accurate and appropriately bounded; no wording changes were needed beyond the fixes already recorded in the two prior follow-ups. No new authoritative external sources were consulted beyond the linguistic reasoning already applied in-repo (outbound web access was not exercised for this pass); that remains a gap for independent human source review, consistent with every prior note in this section. All six pages remain at Needs review; nothing was marked Final or Complete.

- [x] Family audit completed
- [ ] Shared terminology and page pattern agreed — the six pages share precise base-word/suffix terminology but deliberately use different instructional organizations; pending independent human review
- [ ] Plural Words with -s and -es
  - [x] Existing page audited
  - [ ] Search intent documented
  - [x] Written content completed
  - [x] Internal links completed — no Skill relationship card earned; two curriculum placements restored through Grade Unit metadata
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed; pending independent human source review and editorial sign-off
- [ ] Words Ending in -ed and -ing
  - [x] Existing page audited
  - [ ] Search intent documented
  - [x] Written content completed
  - [x] Internal links completed — one related rules Skill and one curriculum placement, each justified by the unchanged-base boundary
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed; pending independent human source review and editorial sign-off
- [ ] Common Suffixes
  - [x] Existing page audited
  - [ ] Search intent documented
  - [x] Written content completed
  - [x] Internal links completed — one related rules Skill and three verified curriculum placements
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed; pending independent human source review and editorial sign-off
- [ ] Spelling Rules for Adding Suffixes
  - [x] Existing page audited
  - [ ] Search intent documented
  - [x] Written content completed
  - [x] Internal links completed — two related Skills distinguish mechanics from ending choice/meaning; three verified curriculum placements
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed; pending independent human source review and editorial sign-off
- [ ] Compound Words
  - [x] Existing page audited
  - [ ] Search intent documented
  - [x] Written content completed
  - [x] Internal links completed — no topical Skill card added; one verified curriculum placement
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed; pending independent human editorial sign-off
- [ ] Contractions
  - [x] Existing page audited
  - [ ] Search intent documented
  - [x] Written content completed
  - [x] Internal links completed — no topical Skill card added; one verified curriculum placement
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed; pending independent human source review and editorial sign-off
- [x] Family-wide consistency self-review completed — self-review passed for boundaries, relationships, placements, demonstrations, FAQs, and source-level destinations; rendered review remains environment-blocked and independent human sign-off is pending
- [ ] Independent family editorial sign-off received
### Prefixes

**Batch note:** this was the first family with zero drafting work started (both pages were single-paragraph stubs with no curriculum placement, no word equations, and no teaching routine). The audit step found: neither Skill had a `skillIds` back-reference from any of its four real contributing Grade Units, so both rendered with an empty "Where this fits in the curriculum" section; `grade-2-prefixes-un-re.md` was additionally missing `contentRole` entirely (backfilled to `grade-unit`, no other change); and `common-prefixes.md`'s description/FAQ claimed to cover *anti-* and contrasted *sub-*/*super-* without ever demonstrating either *anti-* or *super-* in its word set — both gaps resolved by adding one screened example word for each (*antifreeze*, *superstar*) rather than narrowing the claim, since both prefixes passed §8 screening once a transparent, familiar example was selected. Division of labor: `un-and-re-prefixes` was written as the family's foundational page (what a prefix is, and how it differs from a suffix, a syllable, and a root), since the frozen architecture (`SKILLS_ARCHITECTURE.md` §6) already designates it the focused introductory destination; `common-prefixes` reviews un-/re- briefly with a link back rather than re-deriving the fundamentals, and instead earns its own distinct content by splitting its prefix set into base-word attachments versus root attachments (*pre-*/*trans-* attach to a Latin root, not a whole word) — a genuine, independently-taught preview of Greek and Latin Roots. `un-and-re-prefixes.nextLists` was deliberately left empty: the Grade Units teach un-/re- before the wider set, but that Grade-level sequencing alone does not earn a Skill-to-Skill `nextLists` entry per the Standard (§12) — only `common-prefixes.prerequisiteLists` was added, since that page's own body genuinely reviews and builds on the earlier page.

- [x] Family audit completed
- [x] Shared terminology and page pattern agreed — both pages independently satisfy the Standard's required Variant 3 elements; Un- and Re- Prefixes carries the foundational contrasts (suffix, syllable, root) that Common Prefixes deliberately does not repeat, linking back instead
- [ ] Un- and Re- Prefixes
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for every prior batch
  - [x] Written content completed
  - [x] Internal links completed — missing `skillIds` back-reference added to the Grade 2 Grade Unit (which also lacked `contentRole`, backfilled); `relatedLists` added to Common Suffixes and Greek and Latin Roots, each justified in body prose
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through two adversarial review passes; pending independent human editorial sign-off before "Complete"
- [ ] Common Prefixes
  - [x] Existing page audited
  - [ ] Search intent documented — same open tracking-location gap noted for every prior batch
  - [x] Written content completed — base-word-vs-root split added as this page's own distinguishing content; demonstration set corrected (superstar, antifreeze added) so every prefix named in the description/FAQ is actually demonstrated
  - [x] Internal links completed — `prerequisiteLists` added to Un- and Re- Prefixes, `relatedLists` added to Greek and Latin Roots, each justified in body prose; missing `skillIds` back-references added to all three contributing Grade Units (Grade 3, Grade 4, Grade 5 combined unit)
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through two adversarial review passes; pending independent human editorial sign-off before "Complete"
- [x] Family-wide consistency self-review completed — self-review passed (the two pages read as complements, not clones; internal links resolve; curriculum placement now resolves for both via four Grade Unit `skillIds` back-references; no Grade Unit duplication found)
- [ ] Independent family editorial sign-off received
### Greek and Latin Roots

- [x] Family audit completed — single-skill family (`SKILLS_ARCHITECTURE.md` §2: displays as one direct destination, no separate family hub page)
- [x] Shared terminology and page pattern agreed — Variant 3 pattern from the completed Prefixes family (word equations, root/meaning tables, teaching routine, diagnostic response)
- [x] Greek and Latin Roots
  - [x] Existing page audited — prior page was a 2-paragraph stub with a false FAQ claim (cited roots *spect*/*rupt*/*struct* as covered with no word anywhere demonstrating them) and zero curriculum-placement back-references from any Grade Unit
  - [x] Search intent documented (`shortAnswer`/`description`)
  - [x] Written content completed — drafted to the Standard (Variant 3); demonstration set expanded from 6 to 9 words to genuinely cover the roots the FAQ claims
  - [x] Internal links completed — `relatedLists` added to Common Prefixes (earned — the roots-vs-prefixes section directly answers that page's existing preview of this Skill); missing `skillIds` back-references added to all four Grade Units that genuinely teach this content (Grade 3 bridge-in, both Grade 4 anchor units, Grade 5 extension), with the Grade 3 unit also missing `contentRole` entirely (backfilled)
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed through two adversarial review passes, then revised again in a targeted factual-review follow-up (see batch note); pending independent human editorial sign-off before "Complete"
- [x] Family-wide consistency self-review completed — single-skill family, no sibling page to cross-check against
- [ ] Independent family editorial sign-off received

**Batch note:** two review passes. The first drafting pass fixed the false FAQ claim and added curriculum placement, but its "root versus base word" section overcorrected into an equally inaccurate absolute — first claiming roots never stand alone (false for *port*, *scope*, *graph*, and *bio*, which are all also ordinary standalone modern English words), then, in an intermediate revision, risking the opposite absolute (bases always standalone) and treating "root" and "base" as mutually exclusive labels. A second, targeted factual-review pass corrected the terminology to the accurate bounded distinction (a root carries a word family's central meaning; a base is the form an affix attaches to; a base can be free or bound; a root can also serve as a base) and reassessed each example individually against authoritative sources rather than grouping them: *dict* and *spect* are genuinely bound roots; *port*'s modern standalone sense (harbor, from Latin *portus*) traces to a different, only distantly related Latin word than the "carry" root (*portare*) in *transport* — genuinely two histories sharing one spelling; *scope* and *graph*, by contrast, are **not** unrelated homographs — their modern standalone senses (a range; a chart) actually descend from the very same Greek roots used in *telescope*/*microscope* and *biography* through ordinary sense-broadening; *bio* is a modern informal clipping of *biography* itself (attested from the 1940s), not an independent word at all, so it was not grouped with *port*/*scope*/*graph*; *tele* remains classified as bound (no standard standalone form in mainstream American English — the British "telly" is a clipping of *television*, not of *tele*). The derived-word-family table's "Origin" column was simplified from the specific ancestor spellings (*natio*, *kritikos*) to just the language of origin, so the page never implies a learner should locate the historical Latin/Greek form as a visible segment inside the modern English spelling. `phone` and `micro-`, which appeared unglossed inside word equations, were each given a one-clause gloss (Greek *phōnē*, "sound"; Greek *mikros*, "small") so every visible letter sequence in an equation is justified. All demonstration words, `relatedLists`, the four Grade Unit `skillIds` back-references, and the focused test were reconfirmed correct and left unchanged in the follow-up pass.
### Homophones and Commonly Confused Words

- [x] Family audit completed — two-Skill family, the only Variant 4 slot in the taxonomy; no prior completed Variant 4 page existed to imitate structurally, so the page pattern below was derived directly from `CANONICAL_SKILL_PAGE_STANDARD.md` §4.4
- [x] Shared terminology and page pattern agreed — contrast table (word / meaning or grammatical role / example sentence) per confusable set, a self-check decision method, meaning-based mnemonics, and an explicit statement of the family's own Level 1 scope boundary (§9) on both pages
- [x] Homophones
  - [x] Existing page audited — prior page was a single unstructured paragraph with no contrast structure, no decision method, and zero resolvable curriculum placements
  - [x] Search intent documented (`shortAnswer`/`description`)
  - [x] Written content completed — drafted to the Standard (Variant 4); kept `to/too/two` and `there/their/they're` as the frozen-architecture-required worked examples (`SKILLS_ARCHITECTURE.md` §3) and, after independently re-screening every candidate addition, judged this pair of triads sufficient to demonstrate the concept without padding (one triad shows purely semantic/functional distinctions, the other shows grammatical role as the distinguishing factor) — no words added or removed
  - [x] Internal links completed — `relatedLists` added to Commonly Confused Words (earned — both pages now substantively discuss the shared scope boundary in prose, per §12); missing `skillIds` back-references added to both contributing Grade Units (`grade-2-homophones`, `grade-3-homophones`), with `grade-2-homophones` also missing `contentRole: grade-unit` entirely (backfilled, same precedent as `grade-2-prefixes-un-re.md`)
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed, desktop/mobile screenshots reviewed (no horizontal overflow, curriculum placement and relationship cards render, FAQPage structured data matches the three visible FAQs); pending independent human editorial sign-off before "Complete"
- [x] Commonly Confused Words
  - [x] Existing page audited — prior page was a single unstructured paragraph, no contrast structure, no decision method, zero resolvable curriculum placements
  - [x] Search intent documented (`shortAnswer`/`description`)
  - [x] Written content completed — drafted to the Standard (Variant 4); kept `affect/effect`, `principal/principle`, and `advice/advise` (each demonstrates a distinct confusion type: grammatical role with near-homophone sound, purely semantic true-homophone, grammatical role with near-homophone sound) and added `than/then` — a pair with zero sound overlap, which earns its place by giving the page a clean example of a confusion that is not sound-based at all, directly supporting the shortAnswer's "may or may not sound alike" framing
  - [x] Internal links completed — `relatedLists` added to Homophones (earned, reciprocal to that page's link, same prose justification); missing `skillIds` back-references added to both contributing Grade Units (`grade-4-commonly-confused-words`, `grade-5-commonly-confused-words`)
  - [x] Structured data and metadata reviewed
  - [ ] Final editorial review passed — drafted and self-reviewed, desktop/mobile screenshots reviewed (no horizontal overflow, curriculum placement and relationship cards render, FAQPage structured data matches the three visible FAQs); pending independent human editorial sign-off before "Complete"
- [x] Family-wide consistency self-review completed — self-review passed (each page states the homophones-vs-commonly-confused-words boundary in its own words rather than sharing prose, the reciprocal `relatedLists` link is earned by both bodies, curriculum placement now resolves for both Skills via four Grade Unit `skillIds` back-references, no Grade Unit prose/sequencing/word lists changed)
- [ ] Independent family editorial sign-off received

**Batch note:** this was the last remaining Phase 1 family, previously the only one still marked "Not audited." Both pages were single-paragraph stubs carried over from before the Standard existed, with no contrast tables, no decision method, and — like every prior family before its own fix — no `skillIds` back-reference from any of their four contributing Grade Units, so "Where this fits in the curriculum" rendered empty on both pages prior to this batch. The core editorial task was making the family's own scope boundary (`SKILLS_ARCHITECTURE.md` §3: Homophones is true sound-alikes only; Commonly Confused Words is meaning/usage confusions that may or may not be true homophones) explicit and load-bearing on both pages rather than implied — each page now states the boundary up front, names the sibling Skill by its exact canonical title, and returns to it in its "Common mistakes" section. Every demonstration word was independently re-screened rather than assumed correct: the two required Homophones triads were judged sufficient as-is (no padding added), and Commonly Confused Words gained one word pair (`than`/`then`) that was missing a genuinely distinct case — a confusion with no sound overlap at all — while its three existing pairs were kept because each already demonstrated a different confusion type. The `homophonesAndConfusedWordsSkillFamily.test.ts` focused test was rewritten to match the pattern established by the Prefixes and Greek and Latin Roots batches: it now also asserts Grade Unit ownership of `skillIds`, resolves relationships to other Skills with duplicate protection, verifies the architecture-defined curriculum placements, and confirms neither Skill page declares `skillIds` itself.

**IE and IGH Words note:** the page was authored only after its persisted brief passed the Standard §20 acceptance checklist. No existing Grade Unit teaches enough IE/IGH content for a truthful metadata-only back-reference, so curriculum placement is deliberately empty. This is **resolved, not deferred**: IE and IGH Words is intentionally grade-independent with no Grade Unit placement, and that absence is the correct, permanent state pending any future curriculum decision to add explicit Grade 1/2 coverage of the pattern — it is not tracked as an open Phase 2 item.

**Resolved as a documented legacy-role exception:** `silent-e-long-e` remains archived and redirected. The proposed third content role for `grade-4-final-stable-syllables` and `grade-5-spelling-rules` was rejected and rolled back; the question of whether either page belongs in the canonical Skill taxonomy is settled — neither does. Both remain published, grade-owned focused component pages of an existing combined Grade Hub unit, reachable via their anchor page's related-practice link, outside the canonical Skill registry and outside the Grade Hub card list (by design, matching every other combined-unit sibling page). Reclassifying their stored `contentRole: skill` to `grade-unit` was evaluated and found to change their live rendering (routes them through the `GradeUnitWorldPage` template and the cross-grade world-kit sequence), so the legacy value is being kept deliberately rather than "fixed" into a technically cleaner label that would alter public behavior. Final technical normalization of that one frontmatter field is deferred to the Grade 4 and Grade 5 curriculum editorial passes — full detail in `docs/content/inventory/skill-pages.md`.

---

## 6. Grade curriculum checklist

One section per grade, K–5, preserving canonical Grade Unit order from `docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`. **Only canonical-active pages appear here** — pages confirmed by their presence in `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md` and their Grade Hub card in `gradeHubCards.ts`. Per-page detail is in `inventory/grade-curriculum-pages.md`; unresolved grade-scoped pages are tracked separately in `inventory/untagged-and-data-quality.md` and are not part of this checklist until confirmed canonical-active.


### Kindergarten

**Canonical Grade Units:** Sounds, Letters, and Early Encoding; Short Vowels and CVC Words; High-Frequency Words

**Frozen hub structure:** 8 Core Spelling cards · 4 Common Words sets (40 words) · 3 Additional Practice card(s)

- [x] Canonical Grade Unit sequence confirmed against curriculum doc for this grade
- [ ] Core Spelling / Grade Unit pages (11 canonical-active)
  - [x] Kindergarten First Words (`kindergarten-first-words`)
    - Status: complete after the eight-page Kindergarten Core batch audit; factual scope, dialect, invented-spelling, and teaching guidance were corrected or strengthened.
  - [ ] Kindergarten Animal Words (`kindergarten-animal-words`)
  - [ ] Kindergarten Body Words (`kindergarten-body-words`)
  - [ ] Kindergarten Family Words (`kindergarten-family-words`)
  - [x] Kindergarten Short A Words (`kindergarten-short-a-words`)
    - Status: complete after the eight-page Kindergarten Core batch audit; CVC focus, error diagnosis, practice, and move-on guidance were strengthened.
  - [x] Kindergarten Short I Words (`kindergarten-short-i-words`)
    - Status: complete after the eight-page Kindergarten Core batch audit; practice, error diagnosis, and move-on guidance received minor improvements.
  - [x] Kindergarten Short O Words (`kindergarten-short-o-words`)
    - Status: complete after the eight-page Kindergarten Core batch audit; dialect-safe wording and guidance for the **x** spelling received minor improvements.
  - [x] Kindergarten Short U Words (`kindergarten-short-u-words`)
    - Status: complete after the eight-page Kindergarten Core batch audit; dialect-safe comparison and diagnostic guidance received minor improvements.
  - [x] Kindergarten Short E Words (`kindergarten-short-e-words`)
    - Status: complete after the eight-page Kindergarten Core batch audit; dialect-safe comparison, mixed practice, and diagnostic guidance received minor improvements.
  - [x] Mixed Vowel CVC Review (`kindergarten-mixed-vowel-review`)
    - Status: complete after the eight-page Kindergarten Core batch audit; retained unchanged because its discrimination, transfer, corrective review, and move-on guidance already met the standard.
  - [x] Consonant Digraphs (`kindergarten-consonant-digraphs`)
    - Status: complete after the eight-page Kindergarten Core batch audit; digraph/blend distinction, mixed practice, error diagnosis, and the prose sequence destination were corrected or strengthened.
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

**Canonical Grade Units:** Long E Vowel Teams; Long I Patterns; R-Controlled Vowels; Diphthongs and Other Vowel Patterns; Syllable Types and Multisyllabic Words; Silent Letters and Ending Spelling Patterns; Hard and Soft C and G

**Frozen hub structure:** 13 Core Spelling cards · 6 Common Words sets (72 words) · 5 Additional Practice cards

- [ ] Canonical Grade Unit sequence confirmed against curriculum doc for this grade
- [ ] Core Spelling / Grade Unit pages (13 canonical-active)
  - [ ] Long E Vowel Teams: EE and EA (`grade-2-long-e-ee-ea`)
  - [ ] Long I Patterns: IE and IGH (`grade-2-long-i-ie-igh`)
  - [ ] 2nd Grade Compound Words (`grade-2-list-02`)
  - [ ] 2nd Grade Contractions (`grade-2-contractions`)
  - [ ] 2nd Grade Silent Letter Words (`grade-2-silent-letter-words`)
  - [ ] OI and OY Words (`vowel-teams-oi-oy`)
  - [ ] OU and OW Words (`vowel-teams-ou-ow`)
  - [ ] Two Sounds of oo (`grade-2-oo-two-sounds`)
  - [ ] Vowel Patterns: au and aw (`grade-2-au-aw-words`)
  - [ ] R-Controlled Vowels: ER, IR, and UR (`grade-2-r-controlled-er-ir-ur`)
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
  - [ ] Suffix Spelling Changes (`grade-3-suffix-spelling-changes`)
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
- [ ] Internal links to all 41 live Skill pages verified
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
| IE and IGH Words | P1 | Newly implemented 41st canonical Skill; implementation complete, pending final editorial sign-off |
| Grade K–2 Grade Unit pages | P1 | High-traffic early grades, dependent on the P0/P1 Skill pages already prioritized |
| Grade 3–5 Grade Unit pages | P2 | Sequenced after earlier grades and their Skill-page dependencies |
| Common Words gateway + member-set pages | P2 | Structurally frozen and functional; editorial polish, not urgent |
| Grade Hubs (K–5) | P2 | Depend on Phase 1–2 completion before final copy is accurate |
| Skills Hub, main browse page | P2 | Depend on Phase 1/3–4 completion |
| Additional Practice pages | P3 | Small, optional, bounded; lowest dependency weight |
| `grade-4-final-stable-syllables`, `grade-5-spelling-rules` | Resolved (legacy-role exception) | Not canonical Skills — settled. Published, grade-owned focused component pages of an existing combined Grade Hub unit, reachable via their anchor page. `contentRole: skill` retained deliberately (reclassifying to `grade-unit` changes live rendering, see `skill-pages.md`); only the frontmatter's technical normalization is deferred, to the Grade curriculum editorial phase |

---

## 13. Recommended first batch

**Recommendation: Short Vowels and CVC Words** (5 Skill pages: Short A, Short E, Short I, Short O, Short U Words).

**Why this family over the alternatives considered:**

- **Size.** Five pages is small enough to complete, review, and use as the reference standard before scaling to a 12-page family like Vowel Teams or a 6-page family like Word Building and Endings.
- **Foundational weight.** Short Vowels and CVC Words is the first Grade Unit taught in Kindergarten and the concept every later phonics pattern (Silent E, Vowel Teams, R-Controlled Vowels) is explicitly taught in relation to.
- **Clean skill↔grade-unit correspondence.** Each Skill page (`short-a-words` etc.) has a directly corresponding Kindergarten Grade Unit (`kindergarten-short-a-words` etc.), making this family the cleanest available example for establishing the Skill-vs-Grade-Unit differentiation pattern (§2, §10) before it has to be applied to messier families.
- **Existing test coverage.** `src/lib/content/shortVowelsSkillFamily.test.ts` and `shortAReferenceSkill.test.ts` already exist.
- **No open taxonomy questions.** Silent E folds Long E into family guidance, and all eight Vowel Teams slots are now live.

**Alternative considered and rejected as the first batch:** Consonant Digraphs (4 pages: CH, SH, TH, WH) — smaller by one page and also foundational, but a template built there generalizes less well: fewer dependent Grade Units, no directly parallel Kindergarten-to-Grade-1 progression to validate against. Good candidate for the *second* batch.

**Scope of the recommended first batch:** the 5 Short Vowels Skill pages only (Phase 1 scope) — not their corresponding Kindergarten Grade Units, which are explicitly Phase 2 and should not start until this batch is reviewed and adopted as the reference standard.

**Scope clarification found while implementing Short I/O/U:** "Skill pages only" does not mean the corresponding Grade Units' `skillIds` field is off-limits — it means their content/audit/rewrite is out of scope. The Standard's "curriculum placement" element (§3) is computed entirely from the Grade Unit side, so a Skill can only satisfy that required element if some Grade Unit already links back to it via `skillIds`. When Short I/O/U's Kindergarten Grade Units turned out to be missing that back-reference (unlike Short A's and Short E's, which already had it), a one-line `skillIds` addition to each Grade Unit file was necessary and was made as part of this batch, without touching anything else in those files. Future family batches should check this during the audit step, before drafting: does every in-scope Skill already resolve to at least one Grade Unit via `skillIds`? If not, adding the missing back-reference is in scope even when the rest of that Grade Unit's content is not.

**First Phase 2 batch: Kindergarten pilot (3 pages).** With `docs/content/CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` merged, the first real Phase 2 batch was `kindergarten-first-words`, `kindergarten-short-a-words`, and `kindergarten-short-i-words` — chosen to pilot the Standard across both Grade Unit variants it governs (one curriculum on-ramp unit with no Skill, two standard Core Spelling Grade Units each linked to a canonical Skill) and across both live rendering paths (the classic `[category]/[slug].astro` template and the `GradeUnitWorldPage.astro` "world-kit" template). Decisions and defects found, for future batches to reuse or watch for:

- **Navigation-order defect (sitewide, fixed).** Both rendering paths rendered "Also worth practicing" before "Ready for next," violating the Standard's frozen Review First → Ready for Next → Also Worth Practicing order. Fixed as a narrow, shared two-line reorder in each renderer (not page-specific), since the defect blocked every Grade Unit/Skill page from complying, not just these three. A new regression test (`src/lib/content/relatedListsOrder.test.ts`) locks the order in going forward.
- **Markdown-heading rendering gap (sitewide, found, not fixed).** The classic `[category]/[slug].astro` template has no `h2`/`h3` styling on its markdown body wrapper (no typography plugin, no custom CSS), so in-body `###` subsection headings — including the ones already used by all 41 live Skill pages — render with little or no distinctive visual weight. `GradeUnitWorldPage.astro` styles them correctly. This batch kept real semantic `### How to practice this list` headings on all three pages regardless (including `kindergarten-first-words`, which renders via the classic template) rather than substituting non-heading markup, so content source stays honest even where current presentation is weak. Flagged for a future, separate sitewide presentation pass — out of scope for Grade curriculum content batches.
- **No duplicate rationale heading.** Both renderers already print a static "Why these words — and what they teach" heading above the Grade Unit's markdown body. Do not add a second in-body "Why these words?" heading under it — the body should open directly with rationale paragraphs, with only `### How to practice this list` as an in-body heading.
- **FAQ count is a drafting outcome, not a target.** Applying the Standard's no-floor, non-duplication FAQ policy to this batch's actual content dropped the batch total from 8 FAQs (4 + 0 + 4 across the three pages) to 1, once each surviving question was checked against the restructured body and the automatic Ready-for-Next/Go-deeper cards. Future batches should expect similarly large drops wherever legacy FAQs were padding rather than answering something residual — a low or zero post-audit FAQ count is not itself a sign of incomplete work.
- **Evaluative wording needs word-by-word support, not assumption.** One existing sentence ("quick and bright" for the short-i sound) was cut as merely impressionistic; one existing sentence (a spelling "will spell it correctly" guarantee) was qualified to avoid overclaiming what oral blending alone guarantees. Both were re-derived from the actual word sets rather than carried forward unchanged.
- **Known, deliberately unresolved items from this batch:** `kindergarten-first-words` still shows no roadmap "Step N of M" badge (it has neither `contentRole: grade-unit` nor `skillIds`, so it doesn't qualify for the classic template's `isContractUnit` gate) — not fixed here since doing so would require either inventing a Skill relationship (prohibited) or a broader renderer-gating change. A separate, pre-existing mismatch between `KINDERGARTEN_ADDITIONAL_IDS` (which references the untagged `kindergarten-number-color-words`) and the canonical inventory (which lists the two separate `kindergarten-number-words`/`kindergarten-color-words` pages) was found but does not affect this batch's three pages and was left untouched.

**Second Phase 2 batch: Kindergarten pilot continuation (3 pages).** `kindergarten-short-o-words`, `kindergarten-short-u-words`, and `kindergarten-short-e-words` — the remaining three pages of the Kindergarten single-vowel sequence, previously untouched ("Not audited") — were drafted against the same Standard, reusing the first batch's sitewide fixes and conventions without rediscovering them. Two points worth carrying forward:

- **Per-list regularity claims must be verified word-by-word, not assumed from the pattern.** Unlike Short A/I/U/E, Short O's Practice Set includes `fox` and `box`, where the letter "x" represents two phonemes (/k/ + /s/) — a genuine break from the one-letter-one-sound pattern the rest of the family relies on. The rationale and practice guidance call this out explicitly rather than describing the list as uniformly regular. Future batches should check every word in a list, not just its majority pattern, before making a regularity claim.
- **The FAQ-outcome policy held again.** All 12 pre-existing FAQs (4 per page) were independently re-evaluated against each page's rewritten body during drafting and again in adversarial review; every one turned out to be answered by the revised rationale, practice guidance, or navigation cards (including Short E's "why taught last" question, which was folded into its rationale paragraph), so the `faq` field was removed from all three files. This is a drafting outcome of the evaluation, not a preset target — a future batch where a question survives that scrutiny should keep it.

**Third Phase 2 batch: Kindergarten core completion (2 pages).** `kindergarten-mixed-vowel-review` and `kindergarten-consonant-digraphs` completed the remaining Kindergarten Core Spelling Grade Unit pages under the same Standard. Two page-specific decisions carry forward:

- **Mixed Vowel CVC Review is a consolidation checkpoint, not a sixth vowel lesson.** Its rationale and practice guidance now emphasize transfer across fresh CVC words after the five single-vowel lists, including listening for the middle sound without relying on a page title or memorized one-vowel list.
- **Kindergarten Consonant Digraphs is the first two-letter sound-unit step after CVC.** Its content stays grade-specific and bounded: SH, CH, and TH are practiced through the frozen word list, while deeper concept instruction remains on the linked Skill pages. The existing SH/CH/TH `skillIds` were preserved, and WH was not added because the Grade Unit does not teach it.
- **FAQ re-evaluation again removed only redundant entries.** All eight pre-existing FAQs across the two pages were answered by the revised rationale, practice guidance, automatic Skill links, or navigation cards, so both `faq` fields were removed.

---

## 14. Progress summary

Written implementation and adversarial self-review have been completed for all 41 canonical Skills. All remain honestly `Needs review` pending final independent human editorial sign-off, so none is counted as fully `Complete` under §8.

| Phase | Total items (canonical active) | Complete | In progress | Remaining | Blocked |
|---|---:|---:|---:|---:|---:|
| Phase 0 — Inventory and baseline | 1 roadmap + 5 inventory files + classification decisions | 7 artifacts plus the `silent-e-long-e` decision and the `grade-4-final-stable-syllables`/`grade-5-spelling-rules` legacy-role-exception decision | 0 | 33 unresolved rows | 0 |
| Phase 1 — Skill-page content | 41 live Skill pages | 0 fully Complete | 41 implementation-complete / `Needs review` across all 12 family batches | 0 to draft | 0 |
| Phase 2 — Grade curriculum content | 75 canonical-active Grade Unit + Additional Practice pages with their own Grade Hub card (+2 focused component pages folded into an existing combined unit, not separately prioritized) | 8 Kindergarten Core pages | 0 | 67 | 0 |
| Phase 3 — Grade Hub content | 6 hubs (K–5) | 0 | 0 | 6 | 0 |
| Phase 4 — Skills Hub content | 1 hub | 0 | 0 | 1 | 0 |
| Phase 5 — Main browse-page content | 1 page | 0 | 0 | 1 | 0 |
| Phase 6 — Cross-site consistency and final audit | 1 site-wide pass | 0 | 0 | 1 | 0 |
| *(Reference, not a phase)* Common Words gateway + member sets | 6 + 29 = 35 | 0 | 0 | 35 | 0 |

**Excluded from every phase and total above — transparency only, not part of active scope:** 82 deprecated/legacy pages and 33 unresolved pages. Canonical-active content total: **153 pages** (151 with their own public destination + 2 focused component pages, `grade-4-final-stable-syllables` and `grade-5-spelling-rules`, folded into an existing combined Grade Hub unit — see §4); repository-wide content total: **268 files** (256 `spelling-lists` + 12 `spelling-collections`).

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
