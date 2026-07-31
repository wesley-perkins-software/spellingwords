# Content Improvement Roadmap — spellingwords.app

**Status:** Living document. Created to open the editorial-improvement phase after architecture freeze.
**Owner of updates:** whoever is doing the content work — see §15 Maintenance.
**Scope:** written content quality only. See §1.

This document is the single operating plan for improving the written content of every public page on spellingwords.app now that curriculum, taxonomy, and page architecture are frozen. It is both a strategy document and a checkbox-driven implementation checklist. A new contributor (human, Claude Code, or Codex) should be able to pick up work from this file alone, without reconstructing project history from chat logs or commit messages.

**Companion inventory files** (detailed, full page-by-page tables — this document stays readable by linking out to them rather than embedding all ~267 rows inline):

- `docs/content/inventory/skill-pages.md` — every canonical Skill page, by family
- `docs/content/inventory/grade-curriculum-pages.md` — every Grade Unit and vocabulary/theme page, by grade
- `docs/content/inventory/sight-words-and-common-words.md` — Common Words (High-Frequency Words) gateways/sets and legacy Dolch tiers
- `docs/content/inventory/untagged-and-data-quality.md` — pages missing `contentRole`, archived pages, taxonomy mismatches, and other repository findings

Keep this file and the inventory files synchronized: this file owns strategy, phases, definitions of done, priority framework, and running totals; the inventory files own the per-page rows and per-page editorial status. See §15.

---

## 1. Status and purpose

### What is frozen (do not reopen)

- The K–5 Grade Unit curriculum and sequence (`docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`, canonical for educational scope/sequence).
- The Grade Hub architecture — Core Spelling / High-Frequency Words / Additional Practice, three sections per grade (`docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md`, frozen, authoritative for public architecture).
- Common Words (High-Frequency Words) set counts and structure per grade.
- Additional Practice: the specific, bounded set of approved cards per grade (including the grades — Grade 3 currently has zero — that intentionally have none).
- The canonical Skills architecture: 12 families, 41 skill slots (40 backed by content, 1 — IE and IGH Words — provisional/content-pending) (`docs/architecture/SKILLS_ARCHITECTURE.md`, frozen canonical spec).
- The Skills Hub organization and the set of public pages that should exist.

"Finished" for all of the above means: the pages exist, their roles are known, their position in the site architecture is settled, and it's been decided which pages are publicly displayed. **It does not mean the pages are editorially complete.**

### What this phase includes

Rewriting, strengthening, and completing the *written content* of existing pages so they serve parents, teachers, and students well, and so they perform for traditional search, AI answer engines, topical authority, SEO, GEO, and AEO. This includes: educational accuracy and clarity, direct-answer quality, internal linking, metadata/structured-data accuracy, and editorial consistency within and across Skill families and grades.

### What this phase excludes

- Visual and presentation redesign — explicitly deferred to a later phase. Do not touch layout, components, or styling as part of this work.
- Re-deciding curriculum, page taxonomy, Skill families, Grade Unit sequence, Common Words, Additional Practice, or the public page hierarchy. If a page's *content* work surfaces a real architectural gap (see §11 and the mismatches logged in the inventory files), record it — do not silently fix it by moving pages, renaming ids/slugs, or inventing new pages.
- New curriculum pages, page deletions, or page merges.
- Full research citations for every page as part of this planning task (see §11 for the policy that governs *future* page work).

---

## 2. Content-layer model

Five page layers exist in the repository today. Understanding what belongs on each, and what must *not* be duplicated there, is the main defense against the site turning into 267 pages saying the same six things in different words.

### Layer 1 — Skill pages
**Purpose:** the canonical, grade-independent reference for a spelling concept (e.g. Short A Words, SH Digraph Words, Common Prefixes). **Backed by:** `spelling-lists` entries with `contentRole: skill`, organized into the 12 frozen families (`src/lib/content/spellingSkills.ts`).
**Belongs here:** the strongest possible explanation of the pattern itself — what it is, how to hear/recognize it, how it's typically taught, common misconceptions, a representative (not exhaustive) word set, and links out to every grade that touches the concept.
**Must not duplicate:** grade-specific pacing, a specific grade's expectations, or a single grade's full word list treatment — that's Layer 2's job.
**Linking role:** the anchor other layers link *into*. Every Grade Unit that teaches this concept should link back here (via `skillIds`, currently almost unpopulated — see the data-quality file). This is the page most likely to earn topical authority and answer-engine citations, so it carries the most SEO/GEO/AEO weight per page.

### Layer 2 — Grade curriculum pages
**Purpose:** explain and provide practice for a concept at a specific grade's expectations and difficulty (e.g. 3rd Grade Prefix Words, Grade 2 Silent Letter Words). **Backed by:** `spelling-lists` entries with `contentRole: grade-unit` (44 today) and `vocabulary-theme` (25 today, generally Additional Practice content).
**Belongs here:** what children at *this* grade practice, why this word set was chosen at this level, grade-appropriate examples, and a link back to the canonical Skill page plus adjacent grade-units (`prerequisiteLists`/`nextLists`).
**Must not duplicate:** the full conceptual explanation already on the Skill page — link to it instead of re-deriving it. A Grade Unit page that fully re-explains "what a prefix is" from first principles is doing the Skill page's job.
**Linking role:** links up to its canonical Skill page, sideways to `prerequisiteLists`/`nextLists`, and up to its Grade Hub.

### Layer 3 — Grade Hub pages
**Purpose:** summarize and organize one grade's Core Spelling, Common Words, and any approved Additional Practice (e.g. "3rd Grade Spelling Words"). **Backed by:** code (`src/pages/spelling-lists/[gradeSlug].astro` + `src/lib/content/gradeHubCards.ts`/`gradeHubCopy.ts`), not a content file.
**Belongs here:** short orienting copy, a scannable map of the grade's three sections, and links into every child page.
**Must not duplicate:** lesson content from any child page. A hub that explains prefixes in depth is competing with its own Grade Unit page.
**Linking role:** routes down into every Grade Unit/Common Words/Additional Practice page for that grade, and up to the Skills Hub / main browse page.

### Layer 4 — Skills Hub
**Purpose:** the main "Browse by Skill" directory across all 12 frozen families. **Backed by:** `src/pages/spelling-lists/skills/index.astro` + `spellingSkills.ts`.
**Belongs here:** brief family descriptions and a clear path into each Skill page.
**Must not duplicate:** any single Skill page's explanation of its pattern.
**Linking role:** routes down into every Skill page; sits alongside (not beneath) the Grade Hubs as a second, skill-first way to reach the same underlying content.

### Layer 5 — Main spelling-list browse page
**Purpose:** the top-level entry point where a user chooses Grade-based or Skill-based browsing (`src/pages/spelling-lists/index.astro`).
**Belongs here:** a short explanation of the two journeys (plus "practice your own words," per `docs/architecture/CONSTITUTION.md`'s three user journeys) and links to the Grade Hubs and the Skills Hub.
**Must not duplicate:** hub-level or page-level content — this page should be the shortest, least detailed page in the whole hierarchy.

### The Skill-page vs. Grade-unit distinction (the one most at risk of duplication)

A Skill page and a Grade Unit page covering the same pattern (e.g. `oi-and-oy-words.md` vs. `vowel-teams-oi-oy.md`, a Grade 2 unit) must read as **complements, not clones**:

- The Skill page answers "what is this pattern and how does it work" for any parent regardless of their child's grade.
- The Grade Unit page answers "what does *this grade* practice, and how does the selected word list express the concept at this level of difficulty" — it assumes the reader already knows (or has just linked to) the general explanation.
- Concretely: word lists should differ in difficulty/length, framing should differ in specificity ("third graders are ready to..." vs. a grade-neutral "children learn to..."), and the Grade Unit page should link to the Skill page rather than re-explaining the pattern from scratch.
- See the data-quality inventory for concrete near-duplicate pairs already in the repository that the audit pass should look at first.

---

## 3. Recommended work sequence

Editorial order: **Skill pages → Grade curriculum pages → Grade Hub pages → Skills Hub → Main browse page.** This was evaluated against the actual repository (content-role split, the near-empty `skillIds` linking field, hub implementation) and holds up: nothing found makes it impractical, and the dependency logic below is real, not just tidy-looking.

### Phase 0 — Inventory and baseline
**Position rationale:** you cannot sequence "complete families together" (the central planning principle) without first knowing, per page, its real `contentRole`, status, and current editorial state — and right now 126 of 267 files (47%) have no `contentRole` set at all (see `untagged-and-data-quality.md`).
**Dependencies:** none — this is the starting point, and this roadmap plus its inventory files are Phase 0's first deliverable.
**Outputs:** this document; the four inventory files; a backfilled `contentRole` field across the 126 untagged files (recommend doing this as a fast, low-risk frontmatter-only pass, verified against page content, before Phase 1 content rewrites begin in earnest); resolved or explicitly deferred product-owner decisions on the three taxonomy mismatches in `skill-pages.md` §Flagged.
**Must not do prematurely:** rewrite any page's prose content — Phase 0 is metadata and inventory only.

### Phase 1 — Skill-page content
**Position rationale:** Skill pages are Layer 1 — the grade-independent anchor every Grade Unit page should eventually link to, and the page most likely to earn direct search/AI-answer citations. Fixing the anchor before the pages that cite it avoids rewriting Grade Unit links twice.
**Dependencies:** Phase 0 complete for the families being worked (contentRole backfilled, at minimum for phonics/grade-level files touching that family); the 3 flagged non-taxonomy "skill" pages resolved or explicitly deferred so family membership is unambiguous before drafting begins.
**Outputs:** 40 (41 once IE/IGH is authored) strong, differentiated, internally consistent canonical explanations — the terminology and structural pattern later grade-unit and hub work will reuse.
**Must not do prematurely:** IE and IGH Words cannot be completed in this phase — no content file exists yet. Authoring its word bank is a separate, later content decision (per `SKILLS_ARCHITECTURE.md`), not a Phase 1 task. Grade curriculum work should not race ahead of the Skill pages it needs to link to.

### Phase 2 — Grade curriculum content
**Position rationale:** each Grade Unit page needs a finished canonical Skill page to link back to and differentiate itself from (see §2's Skill-vs-Grade-Unit rule) — writing grade content first risks re-deriving the same explanation 5–6 times per family and then having to retrofit links.
**Dependencies:** the corresponding Skill page(s) for a given family reach "Complete" (§8 definition of done) before that family's Grade Unit pages are drafted. Organize by grade **within** a family once its Skill pages are done, per the canonical Grade Unit sequence (K→5), not by grade first.
**Outputs:** 44 grade-unit pages (plus 25 vocabulary-theme pages) each clearly differentiated from its Skill page, with populated `skillIds` back-links (currently 3/44) and correct `prerequisiteLists`/`nextLists`.
**Must not do prematurely:** don't write Grade 4/5 content ahead of earlier grades within the same family if doing so would require guessing at a still-unwritten earlier grade's terminology — canonical sequence matters for consistency, not just architecture.

### Phase 3 — Grade Hub content
**Position rationale:** a Grade Hub's job is to accurately summarize and route to its children (Core Spelling, Common Words, Additional Practice) — writing hub copy before the children are in good shape means the hub either lies about what's there or has to be rewritten once they improve.
**Dependencies:** that grade's Core Spelling (Grade Unit) content and Common Words content substantially complete.
**Outputs:** 6 Grade Hub pages (K–5) with accurate, non-duplicative orienting copy.
**Must not do prematurely:** don't let hub copy expand into full lessons — see §7's explicit anti-goal.

### Phase 4 — Skills Hub content
**Position rationale:** the Skills Hub's family summaries only make sense once the Skill pages they point to are finished and consistent within each family.
**Dependencies:** Phase 1 (Skill pages) substantially complete across all 12 families.
**Outputs:** one polished Skills Hub page.
**Must not do prematurely:** don't write final family descriptions while a family's Skill pages are still mid-draft — the summary will drift from the pages it's summarizing.

### Phase 5 — Main browse-page content
**Position rationale:** this page explains the two (arguably three, per the Constitution's three user journeys) top-level ways into the site — it should be written last among the five layers because it's the shortest, most derivative page, entirely dependent on the Grade Hubs and Skills Hub it links to being in good shape.
**Dependencies:** Phases 3 and 4 complete.
**Outputs:** one refined top-level browse page.
**Must not do prematurely:** don't reproduce hub content here — see §2 Layer 5.

### Phase 6 — Cross-site consistency and final editorial audit
**Position rationale:** only after every layer has had its dedicated pass does a global consistency sweep make sense — terminology, internal linking completeness, and duplicate-content checks are cheapest to do once, at the end, rather than repeatedly mid-flight.
**Dependencies:** Phases 1–5 complete.
**Outputs:** a site-wide audit confirming no orphaned links, no unresolved near-duplicates, consistent terminology across all layers, and that every page meets §8's definition of done.
**Must not do prematurely:** this is explicitly the last phase — don't run a "final" audit while earlier phases are still in progress; do targeted spot-checks instead (see §6/§7 per-batch consistency-review checkboxes) and save the full sweep for here.

---

## 4. Repository-backed page inventory

Full per-page tables live in the companion inventory files (linked at the top of this document) because embedding all 267 rows here would make this operating document unusable as a quick-reference plan. Summary:

| Layer / grouping | Count | Inventory file |
|---|---:|---|
| Skill pages (`contentRole: skill`, matched to the 41-slot taxonomy) | 40 live + 1 provisional (no file) | `inventory/skill-pages.md` |
| Skill-tagged pages outside the frozen taxonomy (flagged mismatch) | 3 | `inventory/skill-pages.md` §Flagged |
| Grade-unit pages (`contentRole: grade-unit`) | 44 | `inventory/grade-curriculum-pages.md` |
| Vocabulary/theme pages (`contentRole: vocabulary-theme`) | 25 | `inventory/grade-curriculum-pages.md` |
| Common Words gateway pages (`spelling-collections`, grade-N-common-words) | 6 | `inventory/sight-words-and-common-words.md` |
| Common Words member sets (`contentRole: sight-word-set`) | 29 | `inventory/sight-words-and-common-words.md` |
| Dolch tier gateway pages (`spelling-collections`, legacy) | 6 | `inventory/sight-words-and-common-words.md` |
| Pages with no `contentRole` set (triage required) | 126 | `inventory/untagged-and-data-quality.md` |
| Grade Hubs (code-driven, not content files) | 6 (K–5) | this file, §7 |
| Skills Hub (code-driven) | 1 | this file, §7 |
| Main browse page (code-driven) | 1 | this file, §7 |
| **Total content-collection files** | **267** (255 `spelling-lists` + 12 `spelling-collections`) | all inventory files combined |

Every row in the inventory files was read from actual frontmatter — none of the layer assignments above were inferred from filenames. Where a file's role could not be confirmed from frontmatter, it is listed under "untagged" rather than guessed into a layer.

---

## 5. Canonical Skill-family checklist

Generated from the frozen taxonomy in `src/lib/content/spellingSkills.ts`, cross-checked against `docs/architecture/SKILLS_ARCHITECTURE.md`. 12 families, 41 skill slots (40 backed by a live published page today; 1 — IE and IGH Words — provisional). Check items only once the definition of done (§8) is actually met; see per-page detail and source files in `inventory/skill-pages.md`.


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
- [ ] IE and IGH Words — **blocked, content-pending** (no source file exists; taxonomy slot is final per `SKILLS_ARCHITECTURE.md`, word bank authorship is separate future work, not a normal editorial pass)
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

**IE and IGH Words note:** do not check off any sub-item for this skill under normal Skill-page workflow. Its taxonomy placement is final; nothing else about it should be treated as "not started yet" in the same sense as an audited-but-unwritten page — it is architecturally blocked until a word bank is authored, which is a distinct decision outside this roadmap's scope.

**Flagged, not on this checklist:** `silent-e-long-e`, `grade-4-final-stable-syllables`, `grade-5-spelling-rules` are tagged `contentRole: skill` but are not part of the 41-slot taxonomy above. See `inventory/skill-pages.md` §Flagged for detail. Resolve their status with the product owner before folding them into either this checklist or §6's grade checklist.

---

## 6. Grade curriculum checklist

One section per grade, K–5, preserving canonical Grade Unit order from `docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`. Per-page detail (id, urlSlug, status, `skillIds`) is in `inventory/grade-curriculum-pages.md`; this checklist tracks editorial progress at a glance. Complete a grade systematically top-to-bottom once that grade's relevant Skill-family checklists (§5) are done.


### Kindergarten

**Canonical Grade Units:** Sounds, Letters, and Early Encoding; Short Vowels and CVC Words; High-Frequency Words

**Frozen hub structure:** 8 Core Spelling cards · 4 Common Words sets (40 words) · 3 Additional Practice card(s)

- [ ] Canonical Grade Unit sequence confirmed against curriculum doc for this grade
- [ ] Core Spelling / Grade Unit pages (7 in repository)
  - [ ] Kindergarten Short A Words (`kindergarten-short-a-words`) — Skill: short-a-words
  - [ ] Kindergarten Short I Words (`kindergarten-short-i-words`) — Skill: no Skill link set
  - [ ] Kindergarten Short O Words (`kindergarten-short-o-words`) — Skill: no Skill link set
  - [ ] Kindergarten Short U Words (`kindergarten-short-u-words`) — Skill: no Skill link set
  - [ ] Kindergarten Short E Words (`kindergarten-short-e-words`) — Skill: no Skill link set
  - [ ] Mixed Vowel CVC Review (`kindergarten-mixed-vowel-review`) — Skill: no Skill link set
  - [ ] Consonant Digraphs (`kindergarten-consonant-digraphs`) — Skill: no Skill link set
- [ ] Additional Practice / vocabulary-theme pages (2 in repository — compare against the frozen count of 3 approved Additional Practice cards; extra vocabulary-theme files may be unrouted or archived-candidate content, confirm in Phase 0)
  - [ ] Kindergarten Number Words (`kindergarten-number-words`)
  - [ ] Kindergarten Color Words (`kindergarten-color-words`)
- [ ] Common Words sets audited (see `inventory/sight-words-and-common-words.md` for the Kindergarten rows)
- [ ] Grade-wide consistency review completed (terminology matches this grade's Skill-page links; word-list difficulty appropriately bounded for the grade)
### Grade 1

**Canonical Grade Units:** Consonant Digraphs and Blends; Inflectional Endings; Silent E and Long Vowels; Vowel Teams; Syllables and Two-Syllable Words

**Frozen hub structure:** 12 Core Spelling cards · 6 Common Words sets (72 words) · 3 Additional Practice card(s)

- [ ] Canonical Grade Unit sequence confirmed against curriculum doc for this grade
- [ ] Core Spelling / Grade Unit pages (7 in repository)
  - [ ] CVC Short Vowel Review & The C/K Rule (`grade-1-cvc-short-vowels-c-k-rule`) — Skill: no Skill link set
  - [ ] Consonant Digraphs & Final -ck (`grade-1-consonant-digraphs-final-ck`) — Skill: no Skill link set
  - [ ] Beginning Consonant Blends (`grade-1-beginning-consonant-blends`) — Skill: no Skill link set
  - [ ] Ending Consonant Blends (`grade-1-ending-consonant-blends`) — Skill: no Skill link set
  - [ ] Long Vowels with Silent e (VCe) (`grade-1-long-vowels-silent-e`) — Skill: no Skill link set
  - [ ] Long A & Long O Vowel Teams (`grade-1-long-a-long-o-vowel-teams`) — Skill: no Skill link set
  - [ ] Long E Vowel Teams (`grade-1-long-e-vowel-teams`) — Skill: no Skill link set
- [ ] Additional Practice / vocabulary-theme pages (6 in repository — compare against the frozen count of 3 approved Additional Practice cards; extra vocabulary-theme files may be unrouted or archived-candidate content, confirm in Phase 0)
  - [ ] Grade 1 Number Words 11–20 (`grade-1-number-words-11-20`)
  - [ ] Grade 1 Days of the Week (`grade-1-days-of-the-week`)
  - [ ] Grade 1 Five Senses Words (`grade-1-five-senses-words`)
  - [ ] Grade 1 Weather Words (`grade-1-weather-words`)
  - [ ] Grade 1 Clothing Words (`grade-1-clothing-words`)
  - [ ] Grade 1 Shape Words (`grade-1-shape-words`)
- [ ] Common Words sets audited (see `inventory/sight-words-and-common-words.md` for the Grade 1 rows)
- [ ] Grade-wide consistency review completed (terminology matches this grade's Skill-page links; word-list difficulty appropriately bounded for the grade)
### Grade 2

**Canonical Grade Units:** R-Controlled Vowels; Diphthongs and Other Vowel Patterns; Syllable Types and Multisyllabic Words; Silent Letters and Ending Spelling Patterns; Hard and Soft C and G

**Frozen hub structure:** 10 Core Spelling cards · 6 Common Words sets (72 words) · 3 Additional Practice card(s)

- [ ] Canonical Grade Unit sequence confirmed against curriculum doc for this grade
- [ ] Core Spelling / Grade Unit pages (10 in repository)
  - [ ] 2nd Grade Compound Words (`grade-2-list-02`) — Skill: no Skill link set
  - [ ] 2nd Grade Contractions (`grade-2-contractions`) — Skill: no Skill link set
  - [ ] 2nd Grade Silent Letter Words (`grade-2-silent-letter-words`) — Skill: no Skill link set
  - [ ] OI and OY Words (`vowel-teams-oi-oy`) — Skill: no Skill link set
  - [ ] OU and OW Words (`vowel-teams-ou-ow`) — Skill: no Skill link set
  - [ ] Two Sounds of oo (`grade-2-oo-two-sounds`) — Skill: no Skill link set
  - [ ] Vowel Patterns: au and aw (`grade-2-au-aw-words`) — Skill: no Skill link set
  - [ ] Soft C and Soft G (`grade-2-soft-c-soft-g`) — Skill: no Skill link set
  - [ ] Two-Syllable Words (`grade-2-two-syllable-words`) — Skill: r-controlled-ar, r-controlled-or, r-controlled-er-ir-ur
  - [ ] Words Ending in -le (`grade-2-final-stable-le`) — Skill: no Skill link set
- [ ] Additional Practice / vocabulary-theme pages (5 in repository — compare against the frozen count of 3 approved Additional Practice cards; extra vocabulary-theme files may be unrouted or archived-candidate content, confirm in Phase 0)
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
- [ ] Core Spelling / Grade Unit pages (8 in repository)
  - [ ] 3rd Grade Prefix Words (`grade-3-prefix-words`) — Skill: no Skill link set
  - [ ] 3rd Grade Suffix Words (`grade-3-suffix-words`) — Skill: no Skill link set
  - [ ] 3rd Grade Spelling Rule: Dropping Silent E (`grade-3-dropping-silent-e`) — Skill: no Skill link set
  - [ ] 3rd Grade Spelling Rule: Doubling Final Consonants (`grade-3-doubling-final-consonants`) — Skill: no Skill link set
  - [ ] 3rd Grade Spelling Rule: Changing Y to I (`grade-3-changing-y-to-i`) — Skill: no Skill link set
  - [ ] 3rd Grade Possessive Words (`grade-3-possessives`) — Skill: no Skill link set
  - [ ] 3rd Grade Multisyllabic Words (`grade-3-multisyllabic-words`) — Skill: no Skill link set
  - [ ] 3rd Grade Homophones and Commonly Confused Words (`grade-3-homophones`) — Skill: no Skill link set
- [ ] Additional Practice / vocabulary-theme pages (4 in repository — compare against the frozen count of 0 approved Additional Practice cards; extra vocabulary-theme files may be unrouted or archived-candidate content, confirm in Phase 0)
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
- [ ] Core Spelling / Grade Unit pages (7 in repository)
  - [ ] 4th Grade Multisyllabic Academic Words (`grade-4-multisyllabic-academic-words`) — Skill: no Skill link set
  - [ ] 4th Grade Advanced Prefix Words (`grade-4-advanced-prefixes`) — Skill: no Skill link set
  - [ ] 4th Grade Advanced Suffix Words (`grade-4-advanced-suffixes`) — Skill: no Skill link set
  - [ ] 4th Grade Latin Root Words (`tier-1-roots-and-patterns`) — Skill: no Skill link set
  - [ ] 4th Grade Greek Root Words (`tier-2-greek-latin-roots`) — Skill: no Skill link set
  - [ ] 4th Grade Commonly Confused Words (`grade-4-commonly-confused-words`) — Skill: no Skill link set
  - [ ] 4th Grade Derived Words and Word Meaning (`grade-4-derived-words`) — Skill: no Skill link set
- [ ] Additional Practice / vocabulary-theme pages (4 in repository — compare against the frozen count of 1 approved Additional Practice cards; extra vocabulary-theme files may be unrouted or archived-candidate content, confirm in Phase 0)
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
- [ ] Core Spelling / Grade Unit pages (5 in repository)
  - [ ] 5th Grade Multisyllabic Academic Words (`grade-5-multisyllabic-academic-words`) — Skill: no Skill link set
  - [ ] 5th Grade Prefix & Suffix Words (`grade-5-prefix-suffix-words`) — Skill: grade-5-spelling-rules
  - [ ] 5th Grade Greek & Latin Word Parts (`grade-5-greek-latin-word-parts`) — Skill: no Skill link set
  - [ ] 5th Grade Commonly Confused Words (`grade-5-commonly-confused-words`) — Skill: no Skill link set
  - [ ] 5th Grade Spelling Changes in Related Words (`grade-5-spelling-changes-related-words`) — Skill: no Skill link set
- [ ] Additional Practice / vocabulary-theme pages (4 in repository — compare against the frozen count of 2 approved Additional Practice cards; extra vocabulary-theme files may be unrouted or archived-candidate content, confirm in Phase 0)
  - [ ] 5th Grade Civics and Government Words (`grade-5-community-civics-words`)
  - [ ] 5th Grade Money Management Words (`grade-5-money-management-words`)
  - [ ] 5th Grade Ecosystem & Environment Words (`grade-5-ecosystem-environment-words`)
  - [ ] 5th Grade Fraction & Decimal Words (`grade-5-fraction-decimal-words`)
- [ ] Common Words sets audited (see `inventory/sight-words-and-common-words.md` for the Grade 5 rows)
- [ ] Grade-wide consistency review completed (terminology matches this grade's Skill-page links; word-list difficulty appropriately bounded for the grade)
---
## 7. Hub-page checklist

Hub pages are code-driven (`gradeHubCards.ts`, `gradeHubCopy.ts`, `spellingSkills.ts`, `spelling-lists/index.astro`), not standalone content files — there is no frontmatter row for these in the inventory files. The same checkpoint list applies to every hub; **do not** let any hub page grow into a long educational article that competes with its child pages — that is the one failure mode this checklist exists to prevent.

**Standard hub checkpoints** (apply to every hub below):
- [ ] Introductory copy is short, accurate, and non-duplicative of child-page content
- [ ] Clarity of user journey (a first-time visitor can tell what to click and why)
- [ ] Section descriptions are accurate and scannable
- [ ] Internal links to all live child pages are present and correct
- [ ] Terminology matches the child pages it summarizes
- [ ] Primary search intent for the hub itself is addressed (not the intent of any child page)
- [ ] No duplication with child-page content
- [ ] Metadata (title/description) accurately reflects the hub's actual content
- [ ] Structured data (if any) accurately reflects visible content
- [ ] Summary text accurately reflects the current editorial state of child content (don't claim a section is strong if its pages are still "Not audited")


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

- [ ] Explains the Grade-based and Skill-based journeys (and "practice your own words," per the Constitution's three user journeys) without reproducing either hub
- [ ] Introductory copy reviewed
- [ ] Internal links to all Grade Hubs and the Skills Hub verified
- [ ] Metadata and structured data reviewed
- [ ] Shortest, least detailed page in the hierarchy — confirmed no lesson content has crept in

---

## 8. Definition of done for an individual content page

A page is **Complete** only when every applicable item below is true. Existence, publication, or having a `contentRole` set are not on this list on purpose — they're prerequisites, not the definition.

### Educational quality
- [ ] The concept is explained accurately
- [ ] Language is parent-friendly (matches the reading level in §Editorial quality below)
- [ ] Examples are representative of the pattern, not cherry-picked exceptions
- [ ] The word list is coherent and intentionally selected (not padded to hit a round number)
- [ ] Likely misconceptions or common spelling errors for this pattern are addressed
- [ ] Practice advice is actionable (a parent could follow it today, not just nod at it)
- [ ] Grade claims are appropriately bounded (a Skill page doesn't claim one grade "owns" a pattern; a Grade Unit page doesn't claim universality)
- [ ] Content makes no unsupported universal claims ("all children," "every time," "always")

### Search and answer quality
- [ ] Primary search intent is clearly answered
- [ ] A concise direct answer appears near the top where appropriate (the `shortAnswer` field should reflect this)
- [ ] Headings reflect real user questions, not generic section labels
- [ ] The page can stand alone as a useful answer without requiring the reader to visit another page first
- [ ] Important terminology and synonyms are naturally included
- [ ] Content is helpful rather than padded — length follows what's needed, not a target word count
- [ ] FAQ content (the `faq` field) is not repetitive with the body or with itself
- [ ] Metadata (`description`) accurately describes the page
- [ ] Structured data accurately reflects visible content

### Site architecture
- [ ] Page links to its parent hub
- [ ] Page links to appropriate prerequisite, related, or next-step content (`prerequisiteLists`/`relatedLists`/`nextLists`, and `skillIds` where applicable)
- [ ] Grade Unit and Skill pages covering the same concept do not read as near-duplicates (see §2's differentiation rule and §10)
- [ ] All links resolve
- [ ] Canonical ids, titles, roles, and slugs are unchanged, unless a frozen specification explicitly requires otherwise (in which case, note it — don't silently rename)

### Editorial quality
- [ ] No awkward AI-style repetition (restating the same point in slightly different words across paragraphs)
- [ ] No vague filler
- [ ] No contradictory guidance (within the page, or against a sibling page in the same family/grade)
- [ ] Spelling terminology is consistent with the rest of the site
- [ ] Reading level matches parents and elementary educators — not a child's reading level (the page is written *to the adult helping*, even though the words on it are for the child)
- [ ] Word counts and examples are not padded merely for cross-page uniformity
- [ ] Content passes a cold final read (read it once with no context, as a stranger would)

### Verification
- [ ] Relevant tests pass (`npm test`)
- [ ] Build passes (`npm run build`)
- [ ] Page is manually reviewed on desktop and mobile
- [ ] No accidental visual or functional regression introduced (remember: visual redesign is out of scope — this checkpoint is about not breaking what exists, not improving it)

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

**Common Words gateway vs. individual Common Words set.** The gateway page (e.g. "Kindergarten High-Frequency Words") explains the cumulative structure and Heart Word approach once; individual sets (`kindergarten-common-words-1` etc.) should not each re-explain what a Heart Word is — link back to the gateway instead.

**Core Spelling vs. Additional Practice.** Core Spelling is the recommended encoding/spelling route for the grade — the default path. Additional Practice is small, optional, bounded vocabulary content; it should not present itself as equally central, and its pages should be shorter and lighter than Core Spelling pages by design, not through neglect.

**Top-level browse page vs. either hub.** The browse page explains the two (or three, including "practice your own words") user journeys — it does not reproduce either hub's content.

---

## 11. Research and sourcing policy

This planning task did not perform research for individual pages — that is future work this policy governs.

**Supportable directly from the frozen curriculum and repository, no external check needed:** which grade teaches which Grade Unit; which Skill family a pattern belongs to; word-list membership; internal site structure and navigation claims ("this page is part of the Grade 3 Prefixes unit").

**Educational claims that should be checked against authoritative literacy sources before publishing:** claims about *how* children typically acquire a skill, developmental sequencing claims not already fixed by the canonical curriculum, claims about common error patterns, and any claim phrased as a general pedagogical fact rather than a description of this site's own approach.

**Claims about current standards, programs, or search behavior that require external verification:** references to specific state standards, named commercial curricula, or claims about what "most schools" or "most search queries" do. Prefer not making these claims at all over making them unverified.

**Editorial judgment that should be labeled as such:** practice tips, phrasing suggestions, and "what trips children up" observations that come from the site's own pedagogical stance rather than a citable source — these are fine to keep, but should read as guidance, not as a claimed fact.

**Sourcing preferences, when a check is needed:** authoritative primary sources over secondary summaries; structured-literacy organizations and official curriculum documentation over general parenting blogs; reputable educational institutions over uncredited web content. Prefer restrained, well-chosen claims over citation density — a page with three well-placed, accurate statements beats one with ten thin ones.

Do not perform full research for every page as part of this roadmap-creation task; apply this policy during Phase 1 onward as each page is actually drafted.

---

## 12. Prioritization system

A page or batch earns higher priority when it is a canonical Skill page supporting multiple Grade Units, carries high internal-link importance, currently reads thin or duplicated, represents a foundational concept, supports a large family, is likely to directly answer a clear parent/teacher query, or is required before a parent Grade Hub can be completed accurately. No keyword-volume or traffic numbers are used or fabricated anywhere in this system — priority is structural, not estimated-demand-based.

- **P0 — Foundational Skill pages with broad downstream dependency.** Skill pages that multiple Grade Units link to (or should link to) and that anchor an entire family's terminology. Blocking further work in their family and any grade that touches them until done.
- **P1 — Remaining Skill pages in an in-progress or next-up family, and any Grade Unit page whose Grade Hub is scheduled soon.** Important but not yet blocking other work.
- **P2 — Grade Unit and vocabulary-theme pages in families/grades not yet reached, and Hub pages once their children are mostly done.** Sequenced work, not urgent relative to P0/P1.
- **P3 — Lower-dependency content:** vocabulary-theme/Additional Practice pages with no downstream dependents, legacy Dolch-tier content, and polish passes (Phase 6 consistency sweep items).

Initial assignment by layer (refine per-family/per-grade as Phase 0 audits land):

| Grouping | Priority | Why |
|---|---|---|
| Short Vowels and CVC Words family (5 Skill pages) | P0 | Most foundational family; underlies Kindergarten and Grade 1 curriculum; smallest fully-live family; template-setting |
| Consonant Digraphs, Consonant Blends, Silent E families | P0 | Foundational Grade 1 concepts with multiple dependent Grade Units |
| Remaining 8 Skill families | P1 | Important, sequenced after the P0 foundational set |
| IE and IGH Words | Blocked (not prioritized until content-pending status is resolved) | No content file exists; see §5 |
| Grade K–2 Grade Unit pages | P1 | High-traffic early grades, many dependent on P0/P1 Skill pages already prioritized |
| Grade 3–5 Grade Unit pages | P2 | Sequenced after earlier grades and their Skill-page dependencies |
| Common Words gateway + member-set pages | P2 | Structurally frozen and functional; editorial polish, not urgent |
| Grade Hubs (K–5) | P2 | Depend on Phase 1–2 completion before final copy is accurate |
| Skills Hub, main browse page | P2 | Depend on Phase 1/3–4 completion |
| Vocabulary-theme / Additional Practice pages | P3 | Small, optional, bounded; lowest dependency weight |
| Legacy Dolch-tier gateway + member pages | P3 | Outside the frozen Common Words system; low priority pending a product decision on their long-term role |
| 3 non-taxonomy "skill"-tagged pages (`silent-e-long-e`, `grade-4-final-stable-syllables`, `grade-5-spelling-rules`) | Blocked | Needs a product-owner decision on role before any content work, per §5/§10 |

---

## 13. Recommended first batch

**Recommendation: Short Vowels and CVC Words** (5 Skill pages: Short A, Short E, Short I, Short O, Short U Words).

**Why this family over the alternatives considered:**

- **Size.** Five pages is small enough to complete, review, and use as the reference standard before scaling to a 12-page family like Vowel Teams or a 6-page family like Word Building and Endings.
- **Foundational weight.** Short Vowels and CVC Words is the first Grade Unit taught in Kindergarten (per `CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`) and the concept every later phonics pattern (Silent E, Vowel Teams, R-Controlled Vowels) is explicitly taught in relation to. Getting its terminology and structure right pays off across the rest of the phonics families.
- **Clean skill↔grade-unit correspondence already in the repository.** Each Skill page (`short-a-words.md` etc.) has a directly corresponding Kindergarten Grade Unit (`kindergarten-short-a-words.md` etc.), making this family the cleanest available example for establishing the Skill-vs-Grade-Unit differentiation pattern (§2, §10) before it has to be applied to messier families.
- **Existing test coverage.** `src/lib/content/shortVowelsSkillFamily.test.ts` and `shortAReferenceSkill.test.ts` already exist, giving this family more structural safety net than most others during content changes.
- **No open taxonomy questions.** Unlike Silent E (folds Long E in without its own page) or Vowel Teams (contains the provisional IE/IGH slot), Short Vowels has no unresolved architecture question attached — a clean template run, not tangled up with a pending product decision.

**Alternative considered and rejected as the first batch:** Consonant Digraphs (4 pages: CH, SH, TH, WH) — smaller by one page, and also foundational, but a template built there generalizes less well: it has fewer dependent Grade Units and no directly parallel Kindergarten-to-Grade-1 progression to validate against, so the differentiation pattern would be tested on thinner ground. Good candidate for the *second* batch, immediately after Short Vowels.

**Scope of the recommended first batch:** the 5 Short Vowels Skill pages only (Phase 1 scope) — not their corresponding Kindergarten Grade Units, which are explicitly Phase 2 and should not start until this batch is reviewed and adopted as the reference standard.

---

## 14. Progress summary

No editorial work has started under this roadmap yet — all totals below reflect **existence**, not completion. Populate the Complete/In progress/Blocked columns as work lands; do not count a page as complete because it merely exists (see §1).

| Phase | Total items | Complete | In progress | Remaining | Blocked |
|---|---:|---:|---:|---:|---:|
| Phase 0 — Inventory and baseline | 1 roadmap + 4 inventory files + 126 untagged-file triage rows + 3 taxonomy-mismatch decisions | 4 (this roadmap + inventory files created) | 0 | 126 untagged rows + 3 mismatch decisions | 0 |
| Phase 1 — Skill-page content | 41 skill slots (40 live + 1 content-pending) | 0 | 0 | 40 | 1 (IE and IGH Words — content-pending) |
| Phase 2 — Grade curriculum content | 44 grade-unit pages + 25 vocabulary-theme pages = 69 | 0 | 0 | 69 | 0 |
| Phase 3 — Grade Hub content | 6 hubs (K–5) | 0 | 0 | 6 | 0 |
| Phase 4 — Skills Hub content | 1 hub | 0 | 0 | 1 | 0 |
| Phase 5 — Main browse-page content | 1 page | 0 | 0 | 1 | 0 |
| Phase 6 — Cross-site consistency and final audit | 1 site-wide pass | 0 | 0 | 1 | 0 |
| *(Reference, not a phase)* Common Words gateway + member sets | 6 + 29 = 35 | 0 | 0 | 35 | 0 |
| *(Reference, not a phase)* Legacy Dolch tier gateway + member pages | 6 gateways + remaining untagged sight-words files | 0 | 0 | all | 0 (pending product decision on long-term role, §4 in `sight-words-and-common-words.md`) |

**Repository totals (for cross-checking against the inventory files):** 267 content-collection files (255 `spelling-lists` + 12 `spelling-collections`); 43 files tagged `contentRole: skill` (40 matched to the frozen taxonomy + 3 flagged mismatches); 44 `grade-unit`; 25 `vocabulary-theme`; 29 `sight-word-set`; 126 with no `contentRole` set; 6 `archived`.

---

## 15. Maintenance instructions

- Check an item only after the relevant definition of done (§8, or the hub checkpoints in §7) is actually met — not when a page merely exists or has been touched.
- Update the page's row in the relevant inventory file (`Editorial status` column) whenever its status changes, using the values: `Not audited`, `Audit complete`, `Drafting`, `Needs review`, `Complete`, `Blocked`.
- Update §14's phase totals whenever a batch of pages changes status — this table should stay a true reflection of the inventory files, not drift from them.
- Record blockers explicitly (in the relevant inventory file row, or as a new entry in `untagged-and-data-quality.md` if it's a repository-level finding) rather than silently skipping a page.
- Do not silently change frozen architecture (curriculum, taxonomy, page hierarchy, ids/slugs/roles) while doing content work. If content work surfaces a real architectural question, log it as a flagged mismatch and raise it for a product-owner decision — don't resolve it by editing architecture files or renaming content.
- When an editorial choice affects multiple pages (a terminology preference, a new FAQ pattern, a word-list selection rule), add a short decision note near the relevant checklist section so later pages stay consistent — don't make the same judgment call silently five different ways across a family.
- Keep completed items visible (checked, not deleted) — this roadmap is a historical record of what's been done as much as a plan for what's left.
- Treat this roadmap and its inventory files as the source of truth for content progress — status living anywhere else (a chat thread, a PR description) should be reflected back here before it's considered authoritative.

---

*This document was generated from a full read of the repository's frontmatter and code (not inferred from filenames) as of the date in the git history of this file. See the inventory files for the underlying per-page data and the specific mismatches flagged during generation.*
