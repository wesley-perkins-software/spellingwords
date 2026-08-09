# Canonical Grade-Level Strand Gateway Standard — Research & Proposed Model

**Status:** Research document. Proposes a canonical standard for later pilot implementation. Not itself a frozen editorial standard, and not implemented.
**Scope:** The 18 grade-level strand gateway pages — `/{grade}/core-spelling`, `/{grade}/high-frequency-words`, `/{grade}/themed-spelling-practice` for each of the six grades K–5.
**Does not govern:** Grade Hubs (`/{grade}`), Skill pages, Skills Hub, the main browse page, or any of the 105 deepest canonical member pages (51 Core Grade Units, 27 HFW sets, 27 Themed Spelling Practice pages) — all of which remain governed by their own frozen standards and are **not reopened** by this document.

---

## 1. Executive summary

The 18 grade-level strand gateways exist today as live, routable, indexed pages, but no governing document defines what they should contain. Every relevant standard (`CONTENT_IMPROVEMENT_ROADMAP.md`, the HFW and Themed member-page standards, `K5_FINAL_CONTENT_ARCHITECTURE.md`) explicitly calls gateway content "deferred" or "a separate layer." The current implementation is a single shared Astro route (`src/pages/[gradeSlug]/[strand].astro`) that renders identically for all three strands: a breadcrumb, an `h1`, one templated sentence of description, and a numbered list of cards linking to the grade's member pages in that strand. There is no progression narrative, no orientation guidance, no cross-strand linking, and no differentiation of purpose between Core, HFW, and Themed beyond the wording of one sentence.

This research concludes that the three strand gateways should **not** share one editorial template. Each has a distinct governing question, a distinct relationship to its member pages, and a distinct search-intent role:

- **Core Spelling gateway** — explains the grade's spelling *progression* (a sequence, not a list) and legitimately owns broad "[grade] spelling words/curriculum" search intent, because Core is the site's default, systematic path and the Grade Hub deliberately keeps its own copy thin.
- **HFW gateway** — explains what "high-frequency word spelling" means at this grade and orients across the *sets*, owning cumulative/aggregate HFW intent ("how many high-frequency words does [grade] learn," "[grade] sight words list") that no single set page can honestly answer.
- **Themed gateway** — explains the *purpose* of themed practice (context and retrieval cues, not a curriculum) and helps a parent or teacher *choose* a theme; it owns "extra/fun/themed spelling practice for [grade]" intent, deliberately not competing with Core for "curriculum" framing.

All three gateways should add genuine information gain over their member pages — synthesis across units/sets/themes, not a copy-paste of child-page descriptions — while staying substantially shorter than a member page and keeping the practice destinations (the child links) visually and structurally dominant. The research recommends a **shared four-part skeleton** (orientation/answer, synthesis, complete crawlable navigation, cross-strand/grade wayfinding) with strand-specific content inside each part, rejects FAQ quotas and AI-specific gimmicks as unsupported by evidence, and recommends piloting **all three Kindergarten gateways together** so the differentiated model can be validated across all three strands in one grade before scaling to Grades 1–5.

**A central output of this research is the three-layer responsibility matrix in §11** — Grade Hub vs. Strand Gateway vs. Member Page. The single biggest risk in this project is not "the gateway is too thin," it's **cannibalization/duplication across the three layers that already exist and are already frozen** (Grade Hub) or already governed by their own standards (member pages). Every component proposed anywhere in this document (§12–§18, §27) was tested against that matrix before being classified as gateway-owned; §7 and §8 apply the same matrix to the UX and SEO questions specifically.

No schema changes are required to implement the proposed standard — `src/content/spelling-lists/**` frontmatter already carries everything the synthesis content needs to reference, and the gateway's own orientation prose can live as new authored fields on the existing grade/strand data model (see §19) or, more simply, as new small TypeScript copy modules parallel to `gradeHubCopy.ts`. This document recommends the latter as the smaller viable change.

**Verdict: GATEWAY MODEL READY FOR PILOT.**

---

## 2. Repository-state verification

- `origin/development` audited at commit **`8bbe1b7b9e7a1253667dc192aa635595db1546e6`**.
- Working branch `claude/spelling-gateway-standard-research-p65hnj` was **already at `8bbe1b7...`** at the start of this task — identical to `origin/development`.
- No merge or rebase was required. `git status --short` showed a clean tree before this document was added.
- No conflicts occurred (none were possible, since the branch and `development` were already at the same commit).

This audit is against current `development`, not a stale snapshot.

---

## 3. Complete gateway corpus inventory

**18 gateways confirmed** — exactly 6 grades × 3 strands, verified against `src/lib/content/canonicalGradeRoutes.ts` and its own test (`canonicalGradeRoutes.test.ts`, which asserts 18 unique `gradeStrandGatewayPaths`, 3 per grade).

| Grade | Core Spelling gateway | Core units | HFW gateway | HFW sets (words) | Themed gateway | Themed pages |
|---|---|---:|---|---:|---|---:|
| Kindergarten | `/kindergarten/core-spelling` | 8 | `/kindergarten/high-frequency-words` | 4 (40) | `/kindergarten/themed-spelling-practice` | 5 |
| 1st Grade | `/1st-grade/core-spelling` | 12 | `/1st-grade/high-frequency-words` | 7 (84) | `/1st-grade/themed-spelling-practice` | 5 |
| 2nd Grade | `/2nd-grade/core-spelling` | 13 | `/2nd-grade/high-frequency-words` | 7 (84) | `/2nd-grade/themed-spelling-practice` | 5 |
| 3rd Grade | `/3rd-grade/core-spelling` | 7 | `/3rd-grade/high-frequency-words` | 5 (60) | `/3rd-grade/themed-spelling-practice` | 4 |
| 4th Grade | `/4th-grade/core-spelling` | 6 | `/4th-grade/high-frequency-words` | 2 (24) | `/4th-grade/themed-spelling-practice` | 4 |
| 5th Grade | `/5th-grade/core-spelling` | 5 | `/5th-grade/high-frequency-words` | 2 (24) | `/5th-grade/themed-spelling-practice` | 4 |
| **Total** | **51 Core units** | | | **27 sets / 316 words** | | **27 themed pages** |

(Counts read directly from `CANONICAL_GRADE_ROUTE_DEFS` in `src/lib/content/canonicalGradeRoutes.ts`, cross-checked against `docs/content/inventory/high-frequency-words.md`.)

**Implementation:** all 18 pages are generated by one file, `src/pages/[gradeSlug]/[strand].astro`, via `getStaticPaths()` cross-producting `gradeConfig` (6 entries, `src/lib/content/gradeConfig.ts`) with `GRADE_STRANDS` (3 keys, `src/lib/content/canonicalGradeRoutes.ts`). There is no per-gateway content file and no strand-specific renderer — the same 95-line template produces all 18 pages today.

**Data sources:**
- Routing/classification/order: hardcoded TS manifest `CANONICAL_GRADE_ROUTE_DEFS`.
- Display copy per child (title, description, word count, difficulty): the `spelling-lists` content collection (`src/content/spelling-lists/**/*.md`), resolved via `getCollection('spelling-lists')` filtered by `isPublished`.
- Gateway's own copy: one templated sentence per strand, computed inline in the `.astro` file (see §4) — not authored per grade, not stored anywhere.

**Navigation relationships:**
- **Up:** each gateway breadcrumbs to its Grade Hub (`/{grade}`), which is the primary reader entry point and links down into all three gateways from `gradeHubCards.ts` section headings.
- **Down:** each gateway lists every canonical route in that grade+strand, linking to `route.canonicalPath` (a member page).
- **Sideways (cross-strand):** none today. A Core gateway does not link to its grade's HFW or Themed gateway, or vice versa.
- **Cross-grade:** none today. No K→1 "what's next" link exists at the gateway level (this chain exists at the *member*-page level via `coreSpellingSequence.ts`/`hfWordsSequence.ts`, but gateways are outside that chain entirely).
- **Member pages** also link back up to the gateway (`getGradeStrandPath`) as part of their own breadcrumb/navigation, per `CANONICAL_NAVIGATION_RELATIONSHIPS.md`.

**Renderer/component ownership:** `Layout.astro`, `SiteHeader.astro`, `SiteFooter.astro`, `Breadcrumbs.astro`, `SpellingListCard.astro` (which wraps `ListMetadataBadges.astro`). All five are shared with the Grade Hub page, giving Hub and gateway visual consistency today — a constraint worth preserving in spirit even though visual redesign is explicitly out of scope for this task.

**Structured data / SEO already present per gateway:**
- Canonical `<link>` and OG tags via `Layout`.
- One templated meta-description sentence (strand-specific, see §4 for exact text).
- `BreadcrumbList` JSON-LD (Home → Grade → Strand).
- `ItemList` JSON-LD naming every child page (`url` + `name`).
- Included in `sitemap.xml.ts` via `gradeStrandGatewayPaths`.
- No FAQ JSON-LD on any gateway today (FAQ schema exists only on Skill/member pages).

**Tests:** No test renders gateway page markup or asserts on its DOM. `canonicalGradeRoutes.test.ts` only checks the route-manifest shape (18 unique paths, 3 per grade). This is a real gap the pilot implementation should address (a rendering/content-shape test), but it is not a blocker for this research task.

---

## 4. Current implementation audit (verbatim behavior)

For every gateway, `[strand].astro` computes one of three templated sentences:

- Core: *"Explore the {Strand Label} sequence for {Grade} across {N} carefully ordered spelling units."*
- HFW: *"Practice {wordCount} {Grade} High-Frequency Words across {N} manageable spelling sets."*
- Themed: *"Choose from {N} optional {Grade} spelling lists organized around familiar themes."*

This is the entire authored voice of all 18 pages today — three sentence templates, parameterized by grade and count, with **no per-grade or per-strand authored differentiation** beyond the numbers substituted in. The rest of the page is a numbered `<ol>` of `SpellingListCard`s pulling title/description/metadata straight from each child's frontmatter.

This confirms the research premise: these are functionally thin indexes today, not yet distinguished from each other in voice or purpose, despite the strand-specific noun phrases already hinting at three different jobs ("sequence... ordered," "practice... manageable," "choose... optional").

---

## 5. Documentation audit — what's frozen vs. deferred vs. stale

| Document | Relevant status re: gateways |
|---|---|
| `CONTENT_IMPROVEMENT_ROADMAP.md` | Names Core/HFW/Themed as three strands and even table-counts "6 HFW gateways" as canonical-active editorial scope (§4), but **never gives gateways their own layer, phase, or definition of done** anywhere in its 5-layer model (§2) or 6-phase sequence (§3). The only substantive gateway sentence in the whole document is the HFW differentiation rule at line 982: *"The future gateway transformation owns broad grade-level orientation and cumulative sequencing."* Nothing equivalent exists for Core or Themed gateways. This is a genuine documentation gap, not a disagreement — the roadmap is simply silent on Core/Themed gateway content design. |
| `CANONICAL_HIGH_FREQUENCY_WORD_SET_PAGE_STANDARD.md` | §1: explicitly scopes itself to member sets only; "gateway editorial transformation is deferred." §8/§20 (implied, per Explore agent read): "the grade gateway owns broad grade-level HFW intent." |
| `CANONICAL_THEMED_SPELLING_PRACTICE_PAGE_STANDARD.md` | §1: scopes itself to the 27 members; "governs a gateway only insofar as member pages link to the gateway and the gateway, rather than a member, owns broad theme discovery." §9: members are "nonsequential peers... The gateway owns broader grade/theme discovery intent; each member owns its exact grade + theme + spelling intent." This is the clearest, most directly reusable statement of *any* gateway's job in the whole doc set — reused as this document's Themed governing question in §13. §10 also flags that gateway/member title reconciliation is separately unfinished future work. |
| `K5_FINAL_CONTENT_ARCHITECTURE.md` | Frozen for architecture (three-section Grade Hub model), but its own gateway model is **stale**: it describes gateways as `spelling-collections` entries at `/spelling-lists/collections/{urlSlug}`, a route shape `PUBLIC_URL_ARCHITECTURE.md` confirms has been "removed entirely." Its one concrete, still-usable requirement (§12, quoted verbatim): *"Every gateway needs substantive server-rendered orientation text, unique purpose, and a complete crawlable child list."* It also frames the **Grade Hub**, not a separate gateway page, as "the entry point" for K–3 HFW ("no standalone gateway page — the Grade Hub itself is the entry point"), reflecting a moment when the HFW gateway was still `spelling-collections`-shaped and secondary. This is now superseded: `PUBLIC_URL_ARCHITECTURE.md` (current, accurate) confirms all three strand routes, including HFW, are live, first-class, grade-contained gateways today. |
| `PUBLIC_URL_ARCHITECTURE.md` | Current and accurate. States plainly: *"Their public route segments are `core-spelling`, `high-frequency-words`, and `themed-spelling-practice`. Each is also a grade-contained gateway."* This is the only document that treats all three strand gateways as a symmetric, named class of page today. |
| `CANONICAL_NAVIGATION_RELATIONSHIPS.md` | Defines the finalized Review First/Next Step/Explore More model for *member* pages only. Gateways sit entirely outside this chain — confirmed no gateway is a `prerequisiteLists`/`nextLists`/`relatedLists` target or source anywhere in the matrix. Relevant background for §21 (internal linking) below: the site already has a strong precedent for *not* forcing symmetry or manufacturing relationships ("the reasonable-parent test"), which this document adopts for cross-strand gateway linking. |
| `docs/content/inventory/high-frequency-words.md` | Confirms per grade: *"Each grade has an HFW strand gateway at `/{grade}/high-frequency-words`. Its final editorial transformation is deferred; the canonical standard governs only the member sets."* |

**Discrepancies found (reported per task instructions, not corrected):**
1. `K5_FINAL_CONTENT_ARCHITECTURE.md`'s gateway URL model (`/spelling-lists/collections/...`) is stale against the live, accurate `PUBLIC_URL_ARCHITECTURE.md`. Non-blocking — `PUBLIC_URL_ARCHITECTURE.md` is authoritative for routes and the frozen document's *architectural decisions* (three sections, per-grade structure) remain valid even though its URL shape doesn't.
2. `CONTENT_IMPROVEMENT_ROADMAP.md` never defines a Core or Themed gateway phase/layer at all, and its §4 table only line-items "6 HFW gateways," not Core or Themed gateways as a class — an internal completeness gap in the roadmap's own model, not a conflict with reality.
3. Two roadmap-referenced companion inventory files (`deprecated-and-legacy-pages.md`, `untagged-and-data-quality.md`) are missing from the repository — already independently flagged in `final-acceptance-audit-105-pages.md`. Unrelated to gateways; noted for completeness per the task's request to surface discrepancies, not something this document fixes.

None of these rises to a blocking architecture/curriculum discrepancy. All are either stale prose in an otherwise-frozen document, or a documentation completeness gap — exactly the kind of gap this research document exists to fill.

---

## 6. Educational research findings

Distinguishing research-supported principles from editorial inference, per the task's instruction not to overclaim.

**Research-supported (Reading Rockets and related structured-literacy sources):**
- Spelling instruction is most effective when organized around **word patterns taught in a deliberately sequenced progression**, not memorization of unconnected word lists — the "word study" model (Reading Rockets, "Word Study: Learning Word Patterns"; "Word Study Instruction in the K–2 Classroom"). This directly supports treating Core Spelling as a *sequence* worth narrating, not just a set of cards.
- A coherent K–5 progression moves from phoneme-level/sound-letter work toward morphology (prefixes, suffixes, Greek/Latin roots) at upper grades (Reading Rockets, "Spelling: In Depth" / "In Practice"). This matches the site's own frozen curriculum shape (Kindergarten = short vowels/first words; Grade 4–5 = advanced prefixes/suffixes, roots, derived words) and supports K–5 maturation in gateway framing (§15) without needing to invent anything new.
- Retrieval practice (producing the spelling from memory, not just recognizing or copying it) is the instructional mechanism that matters, independent of whether the words are high-frequency or theme-organized. This is already the site's `hear → notice/map → spell without seeing → check → retrieve again later` model (from the HFW standard) — gateways should reference this consistent mental model rather than re-deriving separate rationale per strand.
- High-frequency word instruction benefits from explaining *available* sound-spelling structure rather than treating every high-frequency word as an arbitrary "sight word" to memorize by shape — already the explicit position of `CANONICAL_HIGH_FREQUENCY_WORD_SET_PAGE_STANDARD.md` §2 ("Frequency and irregularity are different"). A gateway explaining *what HFW means at this grade* can and should state this plainly; it is a defensible, source-supported claim, not invented positioning.

**Reasonable UX/editorial inference (not directly "proven" by a cited source, but a defensible product decision):**
- Parents and teachers benefit from a short, explicit "where to begin" pointer at the top of a sequence-shaped page — this is standard curriculum-communication practice, not a controlled-study finding.
- Themed practice provides motivational/context value ("familiar context and retrieval cues") — plausible and consistent with general vocabulary/word-learning literature on contextualized practice, but this document does not claim a specific effect size or a specific citation for "themes improve spelling retention," because none was found and the task explicitly warns against overclaiming.

**What this document does NOT claim:** any specific percentage improvement from a gateway page, any specific "optimal" number of FAQs, or any claim that themed practice is empirically superior to unthemed practice for spelling specifically (the general word-study literature covers pattern-based instruction and retrieval, not theme framing specifically). Any such claim in a future draft should be flagged and either sourced or removed.

Sources: Reading Rockets — [Word Study Instruction in the K-2 Classroom](https://www.readingrockets.org/topics/curriculum-and-instruction/articles/word-study-instruction-k-2-classroom), [Word Study: Learning Word Patterns](https://www.readingrockets.org/topics/spelling-and-word-study/articles/word-study-learning-word-patterns), [Spelling: In Depth](https://www.readingrockets.org/reading-101/reading-101-learning-modules/course-modules/spelling/depth), [Spelling: In Practice](https://www.readingrockets.org/reading-101/reading-101-learning-modules/course-modules/spelling/practice), [Spelling: Instructional Guidelines](https://www.readingrockets.org/topics/spelling-and-word-study/articles/spelling-instructional-guidelines).

---

## 7. User/audience analysis

The three audiences named in the task brief — parent, teacher, student — map cleanly onto the existing three-tier hierarchy already used elsewhere in this codebase's docs (Grade Hub → gateway → member), so this document does **not** propose separate parent/teacher/student page variants (that would violate "serve all three without creating separate mini-sites," §11 of the task brief, and would also duplicate what Grade Hub copy already tries to do per `CONTENT_IMPROVEMENT_ROADMAP.md` Layer 3).

Instead, each audience's need maps to a specific *component* of the shared skeleton (§17):

| Audience question | Answered by |
|---|---|
| Parent: "What should my child practice? Where do we begin?" | Orientation/answer block + (Core only) explicit starting-point sentence |
| Parent: "Is this appropriate for the grade?" | Grade-scoped framing already implicit in "{grade} {strand}" — no separate section needed |
| Teacher: "What's covered? How is it sequenced? Can I scan it fast?" | Synthesis block (progression/organization) + the existing crawlable list, kept scannable (headings, not prose paragraphs) |
| Teacher: "Which unit/set/theme fits what I need?" | Same crawlable list, differentiated by the synthesis framing (e.g., which units cluster around which skill) |
| Student: "What can I practice? Where do I click?" | The list of practice links itself — must stay visually dominant, first fold, not buried under prose (§13, §23) |

This confirms the task brief's premise: a well-structured *single* page, ordered orientation → synthesis → navigation, serves all three without fragmenting into separate audience pages.

**Grade Hub vs. Strand Gateway vs. Member Page, from the reader's perspective:** the same three-audience table above only works because each layer answers a genuinely different grain of the same underlying questions — a parent's "what should we practice, where do we begin" is answered at *increasing* specificity as they move Hub → gateway → member:

| Reader question | Grade Hub | Strand Gateway | Member page |
|---|---|---|---|
| "What's available for my child this year?" | ✅ answers this, across all three strands | ❌ (too narrow — only one strand) | ❌ (too narrow — only one unit) |
| "OK, within [strand], what's the shape of it and where do we start?" | ❌ (Hub doesn't go this deep, by design) | ✅ answers this | ❌ |
| "What exactly will my child practice on this one page?" | ❌ | ❌ | ✅ answers this |

A reader who lands directly on a gateway from search (skipping the Hub) still needs the first question answered *briefly* — this is why the gateway's required orientation sentence (§12, §18) exists: not to re-do the Hub's job, but to give a skipped-the-Hub reader just enough grounding before the gateway does its own, narrower job. See §11 for the full component-by-component version of this same analysis.

---

## 8. Search-intent and SEO analysis — intent ownership

The central risk is cannibalization between Grade Hub, gateway, and member pages, all of which can plausibly rank for overlapping "[grade] spelling" queries. Ownership must be assigned deliberately, per strand, based on what each layer's copy can *honestly and uniquely* answer. **This is the same three-layer boundary problem as §11, applied to search demand rather than reader navigation** — every ownership call below is a direct consequence of the responsibility matrix in §11, not a separate SEO-only judgment.

### 8.1 Grade Hub vs. Strand Gateway vs. Member Page — search-intent ownership matrix

| Layer | Owns this class of query | Does NOT own | Why |
|---|---|---|---|
| **Grade Hub** (`/{grade}`) | Broadest, strand-ambiguous grade queries ("kindergarten spelling," "kindergarten spelling words" with no strand signal) | Any query specific enough to name a strand, a pattern, or a single list | Per §11.1, the Hub is the only layer that legitimately spans all three strands at once — a query that doesn't specify which strand the searcher wants should land on the one page built to orient across all three |
| **Strand Gateway** (`/{grade}/{strand}`) | Strand-scoped aggregate queries ("kindergarten spelling curriculum/sequence" → Core; "kindergarten high-frequency words / sight words list" → HFW; "kindergarten themed/fun spelling practice" → Themed) | Broad strand-ambiguous queries (Hub's job); narrow single-unit queries (member's job); pattern-only queries with no grade (Skill page's job) | Per §11.2, the gateway is the only layer that can honestly answer "give me the whole picture of this one strand at this one grade" — neither the Hub (too broad) nor a member page (too narrow) can do this without either diluting or overreaching their own scope |
| **Member page** | Narrow, fully specific queries ("[grade] short a words," "[grade] high-frequency words set 3," "[grade] weather spelling words") | Anything aggregate or cross-member | Already the member standards' own job (HFW §2, Themed §3); unaffected by gateway design |
| **Skill page** (Layer 1, out of this document's scope) | Pattern-only queries with no grade signal ("short a words," "consonant digraph words") | Anything grade-specific | Existing roadmap boundary (§2, "The Skill-page vs. Grade-unit distinction"); gateways must not compete here either |

**Query families and recommended ownership (detailed):**

**Query families and recommended ownership:**

| Query family | Primary owner | Reasoning |
|---|---|---|
| "kindergarten spelling words" (broad, ambiguous) | Grade Hub | Broadest possible intent — spans all three strands; only the Hub can honestly answer it without picking a strand |
| "kindergarten spelling curriculum" / "spelling sequence" | **Core gateway** | Core is the default, systematic path; "curriculum" language is Core's alone — HFW and Themed are explicitly non-curricular per their own standards (HFW is "word-driven," Themed is "not a disguised extension of the Core sequence") |
| "kindergarten spelling list" (single, general) | Grade Hub or a specific Core/HFW unit, not the gateway | The gateway's job is orientation across many lists, not being "the" list |
| "kindergarten high-frequency words" / "kindergarten sight words list" | **HFW gateway** | Only the gateway can honestly claim the *complete* grade inventory (40 words across 4 sets) — no single set page can, and the Grade Hub's copy is deliberately thin per Layer 3 |
| "kindergarten themed spelling practice" / "fun kindergarten spelling activities" | **Themed gateway** | Matches the Themed standard's own framing — "themes... for parents and children to explore" |
| "[specific pattern] words" (e.g., "short a words," "consonant digraph words") | Skill pages (Layer 1) | Explicitly out of gateway scope — this is the existing Skill-vs-Grade-Unit boundary in the roadmap (§2, "The Skill-page vs. Grade-unit distinction"), unaffected by gateway design |
| "[grade] [specific unit] spelling words" (e.g., "kindergarten short a words") | Member page | Narrowest, most specific intent — always the member page's job, never the gateway's |

**Why Core, not the Grade Hub, should own "[grade] spelling curriculum/sequence" intent:** the Grade Hub's job (per Layer 3, `CONTENT_IMPROVEMENT_ROADMAP.md`) is "short orienting copy, a scannable map of the grade's three sections" — explicitly *not* a full progression narrative. If the Hub tried to also own deep "curriculum sequence" intent, it would either bloat past its Layer-3 role or duplicate the Core gateway. The Core gateway is the only page positioned to go one level deeper than the Hub without duplicating a member page, because Core is a genuine ordered sequence (unlike HFW, which is sets, or Themed, which is peers) — narrating that order is exactly the kind of "information gain" a gateway should provide.

**Search-observation grounding (SEO domain-general research, not spelling-specific):** category/hub pages that function as genuine content hubs — organizing, orienting, and linking rather than acting as thin doorway pages — reliably outperform thin category pages and attract more organic search traffic per page than individual detail pages, precisely because they serve browsing/comparison intent that a single detail page cannot ([Category Pages vs Product Pages](https://www.thebusinessscroll.com/category-pages-vs-product-pages/); [Your Category Pages Are Thin: A Hub Depth Diagnostic](https://www.digitalapplied.com/blog/thin-hub-pages-site-architecture-diagnostic-2026)). The general principle transfers directly: a strand gateway serving "browse this grade's HFW sets" intent is a legitimate SEO asset in its own right, distinct from and complementary to its member pages — it should not be treated as an afterthought or pure crawl aid.

**Explicitly rejected:** competitor-imitation for its own sake. The task brief asks to "identify opportunities for greater information gain than generic word-list sites" rather than copy competitor structure — the synthesis content proposed in §17 (progression narrative, cumulative HFW framing, "why themes" framing) is exactly that opportunity: generic word-list aggregator sites typically do not explain *why* a sequence is ordered the way it is, or *what unifies* a grade's HFW sets, because they don't have a real underlying curriculum to explain. This site does.

---

## 9. GEO/AEO analysis

Applying the task's explicit skepticism requirement, grounded in current evidence on AI-crawler behavior and provider statements.

**What the evidence actually supports:**
- Google's own engineers have stated plainly that Google does not support `llms.txt` and has no plans to; one compared it to the discredited keywords meta tag ([Should I Create an llms.txt File? 2026 Guide](https://www.getpassionfruit.com/blog/should-i-create-an-llms.txt-file-google-s-2026-guidance-explained)). Verified frontier-lab crawler traffic to `llms.txt`-family files is negligible in independent monitoring ([LLMs.txt in Practice: Adoption Data, Evidence, and Setup](https://www.digitalapplied.com/blog/llms-txt-in-practice-adoption-evidence-2026)). **Conclusion: do not build `llms.txt`-based content decisions for these gateways** — directly answering the task's own prohibition (§9), and now backed by first-party statements, not vendor marketing.
- What *does* demonstrably help both traditional search and answer-engine retrieval is the boring, well-evidenced stuff this site already does: clear, self-contained prose; accurate structured data that matches visible content; descriptive headings; explicit, crawlable relationships between pages. There is no credible evidence that AI answer engines need anything exotic beyond what makes a page good for a human reader and a traditional crawler — the same content that serves a parent scanning the page in ten seconds is what an answer engine will excerpt.

**Questions worth directly and naturally answering, mapped to the correct gateway (not duplicated across all three):**

| Question | Correct owner |
|---|---|
| "What spelling patterns should kindergarteners learn?" | Core gateway (its progression synthesis directly answers this) |
| "What order should spelling skills be taught in this grade?" | Core gateway only — HFW/Themed have no "order," so forcing this question onto them would be fabricated content |
| "What are high-frequency spelling words for this grade?" | HFW gateway |
| "How can students get extra spelling practice?" | Themed gateway |
| "How should parents use these spelling lists?" | Split: a Core-specific "where to start" answer on the Core gateway; a general "how to use a set/theme" answer, if needed at all, folded into synthesis prose rather than a separate FAQ (see rejection below) |

**Explicitly rejected, with reasoning (per task §9):**
- **AI-specific hidden copy** — no such thing should exist; content invisible to a human reader is not "for AI," it's a liability (cloaking risk, no evidence it helps).
- **Arbitrary FAQ sections / FAQ quotas** — the task brief itself instructs against this, and the site's own precedent agrees: `CANONICAL_HIGH_FREQUENCY_WORD_SET_PAGE_STANDARD.md` and the Themed standard both treat FAQ/word-note content as *conditional on genuine need*, never quota-driven. A gateway with three strand-differentiated jobs already has natural, non-arbitrary questions to answer (the table above) — that's different from bolting on "Frequently Asked Questions" for its own sake.
- **Keyword stuffing, fake statistics, unsupported claims** — none proposed anywhere in this document; every quantitative claim in the proposed standard (§17) is a real, derivable number (unit count, word count, set count) already present in the data.
- **Speculative AI schema** — no new JSON-LD types proposed. The existing `BreadcrumbList` + `ItemList` combination already accurately represents the page; adding `FAQPage` schema is conditional only, and only if genuine FAQ content is authored (unlikely to be needed per the "not recommended" component classification in §18).
- **Repetitive machine-facing summaries** — rejected; the synthesis prose proposed in §17 is written once, for a human reader, per grade+strand — not a generic template repeated 18 times with numbers swapped in (the opposite of what's currently shipping, per §4).

---

## 10. Topical-authority / information-architecture analysis

Knowledge graph shape (confirmed against the roadmap's own 5-layer model, extended with the gateway layer this document proposes):

```
Spelling (site root)
 └─ Kindergarten (Grade Hub)
     ├─ Kindergarten Core Spelling (gateway)         ← proposed new layer
     │   ├─ First Words (member)
     │   ├─ Short A Words (member)
     │   └─ … 8 total
     ├─ Kindergarten High-Frequency Words (gateway)  ← proposed new layer
     │   ├─ Set 1 … Set 4 (members)
     └─ Kindergarten Themed Spelling Practice (gateway) ← proposed new layer
         ├─ Animal Words … Family Words (members, 5 total)
 └─ (repeat for 1st–5th Grade)
 └─ Skills Hub (parallel, skill-first entry point)
     └─ 41 Skill pages
```

**What belongs uniquely at the gateway level** (must not appear elsewhere):
- Cross-unit/cross-set/cross-theme synthesis — "how do these N pages relate to each other as a group" (no member page can say this about its siblings without duplicating content on every sibling; no Grade Hub page can say it without bloating past Layer 3's "short orienting copy" mandate).
- A single, authoritative "where to start" pointer for the strand (Core especially).
- The complete, accurate count/inventory statement for the strand at this grade (e.g., "4 sets, 40 words" for Kindergarten HFW) — currently computed inline but not narrated with any synthesis.

**What must stay on member pages (not duplicated at the gateway):**
- Word-level or set-level spelling observations, word notes, practice mechanics — explicitly the member page's job in both frozen member standards.
- Any content already covered by `SpellingListCard`'s own rendered description — the gateway should not re-state each child's description in prose above the list; that's the card's job (avoids "concatenation" the task brief explicitly warns against, §14).

**What belongs at the Grade Hub instead:**
- The three-section overview ("this grade has Core, HFW, and Themed") — that's the Hub's whole job, and the gateway should not re-explain "what is Core Spelling" from scratch; it can safely assume the reader either arrived from the Hub (which already explained the three-section split) or arrived directly from search (in which case a one-sentence orientation, not a re-explanation of site architecture, suffices — see §17's orientation-block scope).

**Lateral/cross-strand linking:** recommended but bounded (see §21) — not automatic, and judged by the same "reasonable-parent test" already codified in `CANONICAL_NAVIGATION_RELATIONSHIPS.md` for member pages. A Core gateway linking to its own grade's HFW gateway ("this grade's high-frequency words") passes that test easily; an invented link from Core K to Themed Grade 3 would not.

**Skill-page surfacing:** Core gateways may reasonably link to relevant Skill pages *in aggregate* (e.g., "these units draw on the Short Vowels and Consonant Digraphs skill families") if and only if doing so adds real navigational value beyond what's already on each member page's own `skillIds` back-link — this should be **conditional**, not required, and only where the synthesis prose naturally names a skill family already (see §18 component matrix).

**How much linking is too much:** the existing per-child `SpellingListCard` list already provides complete, crawlable navigation to every member page — that requirement (K5_FINAL_CONTENT_ARCHITECTURE.md §12: "a complete crawlable child list") is already met and should not be expanded with additional per-item links. The added linking surface this document proposes is capped at: one Grade Hub link (already exists via breadcrumb), 0–2 cross-strand gateway links (same grade only), and the existing complete child list. No "related grade" or "related skill" link farm.

---

## 11. The central responsibility matrix — Grade Hub vs. Strand Gateway vs. Member Page

This is the load-bearing analysis of the whole document. The Grade Hub is not a passive neighbor to design around — it is a **first-class, already-frozen page family** (`CONTENT_IMPROVEMENT_ROADMAP.md` Layer 3, `K5_FINAL_CONTENT_ARCHITECTURE.md`) with its own defined job, and the single greatest risk in defining a gateway standard is quietly re-deriving content the Hub already owns, or content a member page already owns, rather than filling the one genuine gap between them. Every component considered anywhere in this document was run through the question this table answers: **Hub, Gateway, or Member — and why not the other two?**

### 11.1 Full three-layer matrix

| Candidate content/responsibility | Grade Hub (`/{grade}`) | Strand Gateway (`/{grade}/{strand}`) | Member page | Why not the other two layers |
|---|---|---|---|---|
| "What are this grade's three strands (Core/HFW/Themed) and what does each cover, briefly?" | ✅ **Owns this** | ❌ | ❌ | This is literally the Hub's Layer-3 job (`CONTENT_IMPROVEMENT_ROADMAP.md`: "short orienting copy, a scannable map of the grade's three sections"). A gateway re-explaining "what is Core Spelling" from scratch would duplicate the Hub for every reader who arrived via the Hub, and a member page has no reason to explain sibling strands at all. |
| Direct links into each strand's gateway | ✅ **Owns this** (already implemented via `gradeHubCards.ts` section headings) | N/A (is the destination) | ❌ | Routing decision belongs one level up from where it routes to. |
| Direct cards for *some* strand members shown right on the Hub (current K–3 HFW convention: "show all direct set cards rather than only the gateway") | ⚠️ **Partial, by explicit historical decision** — `K5_FINAL_CONTENT_ARCHITECTURE.md` §4–§7 chose to expose HFW set cards directly on K–3 Hubs "so families can see the complete sequence" | Still **owns the authoritative complete list** for the strand regardless of what the Hub also surfaces | ❌ | This is the one place today where Hub and gateway *already* both link to the same members — an existing, frozen, non-duplicative pattern (the Hub's cards are a convenience shortcut; the gateway remains the canonical, complete, orientable list). The proposed standard does not change this Hub behavior; it only means the gateway must still justify its own existence alongside it, which §11.2 addresses directly. |
| Grade-level "what's the order/organization *within* this one strand" (Core's sequence logic; HFW's cumulative set structure; Themed's "these are peers, here's how to pick one") | ❌ (too deep for the Hub's Layer-3 mandate — this is exactly the "full progression narrative" the Hub is *not* supposed to become) | ✅ **Owns this** | ❌ (a member only knows its own position via Review First/Next Step; it cannot speak for the whole strand without repeating itself on every sibling) | This is the one genuine gap in the current architecture — see §11.2. |
| "Where should we start?" (Core only) | ❌ | ✅ **Owns this** | ⚠️ Implicit only, via the Review-First chain — never stated as reader-facing guidance | A member page's Review First/Next Step tells a reader already *on* a unit what's adjacent; it never tells a reader who hasn't picked a unit yet where to begin. Only the gateway sees the whole strand at once. |
| Complete, authoritative, crawlable list of every member in this grade+strand | ⚠️ Partial (K–3 HFW convenience cards, see row above; Core/Themed are not similarly duplicated on the Hub today) | ✅ **Owns this, unconditionally** | ❌ | Regardless of what the Hub also shows, the gateway is the one page whose entire job is being complete and authoritative for *this* strand — it is the page a crawler or reader should trust as canonical, even where the Hub offers a shortcut. |
| What one specific unit/set/theme actually teaches; its word list; word-level notes; practice mechanics | ❌ | ❌ (would duplicate) | ✅ **Owns this** | Both frozen member standards (HFW §3, Themed §3) already reserve this exclusively for the member page; nothing in this document changes that. |
| Cumulative grade-level HFW inventory ("this grade has 4 sets / 40 words total") | ❌ — the Hub's per-grade HFW copy is deliberately thin per Layer 3, and no Hub page currently states the aggregate word count | ✅ **Owns this** | ❌ (a set page only knows its own 10–12 words) | The Hub could theoretically state this number too, but doing so would either duplicate the gateway or force the Hub to carry strand-specific arithmetic that belongs to exactly one deeper layer — keeping it at the gateway avoids two sources of truth for the same number. |
| "Why is this themed practice worth doing, and how do I pick a theme?" | ❌ (Hub copy is grade-wide, not strand-specific enough to justify this) | ✅ **Owns this** | ❌ (each theme page can only speak for itself, not the strand's purpose) | Matches the Themed standard's own §9 language almost verbatim: "The gateway owns broader grade/theme discovery intent." |
| Breadcrumb navigation | ✅ (is the parent breadcrumb target) | ✅ (renders it, pointing up to Hub) | ✅ (renders it, pointing up to gateway) | Each layer's breadcrumb is mechanical and already correctly implemented at every layer; no duplication risk since breadcrumbs are structural, not editorial content. |
| Cross-strand awareness ("this grade also has HFW and Themed practice") | ✅ Already the Hub's job, at the grade-overview level | ⚠️ **Conditional, narrow** — a same-grade link to a *sibling gateway*, not a re-explanation of what that sibling strand is | ❌ | The Hub's version is the *complete* three-way overview; a gateway's version, if present at all, is a single wayfinding link ("see this grade's High-Frequency Words") — not a second copy of the Hub's explanatory paragraph. See §21. |
| Cross-grade awareness (what comes before/after this grade in the same strand) | ❌ (Hub is single-grade by design) | ⚠️ **Conditional, one sentence, Core only** (§13, §18) | ✅ Already exists as the real mechanism, via `prerequisiteLists`/`nextLists` chain adjacency at the *boundary* pages specifically | The actual K→1, 1→2, etc. transition already lives correctly at the member-page boundary (`CANONICAL_NAVIGATION_RELATIONSHIPS.md`); a gateway repeating it in prose would be a second, less precise copy of a fact the chain already encodes exactly. |
| Grade-level spelling-pattern synthesis across Core units (e.g., naming which Skill families a grade's units draw on) | ❌ | ⚠️ **Conditional, Core only** (§18) | ✅ Each unit already carries its own `skillIds` back-link | The gateway's version, if used at all, is a light aggregate mention woven into the progression synthesis — never a restatement of any single unit's `skillIds` link, and never required. |

### 11.2 Why the gap the gateway fills is real, not manufactured

Before proposing any gateway content, the honest question is whether the Hub could simply absorb it instead — since the Hub already exists, is frozen, and already links to every strand's members (fully for Core/Themed today, and via convenience cards for HFW at K–3). Three facts settle this:

1. **The Hub's own governing standard already caps its depth.** Layer 3's definition (`CONTENT_IMPROVEMENT_ROADMAP.md`) is explicitly "short orienting copy" spanning *three* strands at once. A progression narrative for Core alone, written well, is already close to that entire budget — asking the Hub to carry three such narratives (one per strand) would either blow past "short" or force each strand's synthesis to be so compressed it stops being genuine information gain.
2. **The Hub's HFW convenience-card pattern proves the point rather than undermining it.** `K5_FINAL_CONTENT_ARCHITECTURE.md` explicitly chose to show K–3 HFW set cards directly on the Hub *while still keeping the collection/gateway as "the canonical explanatory landing page."* That is the architecture already deciding, independently of this research, that Hub-level linking and gateway-level explanation are different jobs — this document's proposed standard is simply the first time anyone has specified what the gateway's side of that split should actually contain.
3. **No member page can honestly speak for its siblings as a group.** This is structural, not a design preference: a member page's frontmatter and standard are scoped to itself. Only a page positioned above all of a strand's members — but below the three-strand Hub — can state a real aggregate fact (a total word count, a real ordering rationale, a "themes are peers" framing) without either duplicating a sibling or exceeding its own scope.

**Conclusion:** the gap is real. The Hub is correctly thin by design; individual member pages are correctly narrow by design; the strand gateway is the only layer structurally positioned to say anything true and useful at the "one grade, one strand, all its members considered together" level of granularity. This is the finding that justifies the entire standard proposed in §27 — and the reason every content element proposed in §12–§18 is scoped as narrowly as it is: each one exists specifically to fill this one gap, not to re-do work the Hub or a member page already does well.

---

## 12. Shared gateway responsibilities (all 18 pages)

1. **Answer, in the first one or two sentences, what this specific grade+strand page is** — not a generic "welcome" opener repeated 18 times (task §12/§23 both prohibit this).
2. **Provide a complete, accurate, crawlable list of every member page** in that grade+strand — already implemented; preserve.
3. **State the real count** (units/sets/themes and, where meaningful, total words) as part of the narrative, not just as list length — already computed (`resources.length`, `wordCount`), currently underused (only in the templated sentence, not in any synthesis).
4. **Never repeat member-page instructional content** — no word lists, no word notes, no practice instructions duplicated from a child page.
5. **Keep the child-page links visually and structurally dominant** — any new synthesis prose must sit *above* or *beside* the list, not push it below the fold or bury it under a long essay (explicit anti-pattern, §23).
6. **Accurate, page-specific structured data** — existing `BreadcrumbList` + `ItemList` JSON-LD stays; only extend if genuinely new visible content justifies it (e.g., `FAQPage` only if real FAQ content is authored — expected to be rare, see §18).
7. **Breadcrumb up to the Grade Hub** — already implemented; preserve.

---

## 13. Core-specific responsibilities

**Governing question (validated, not just hypothesized):** *What does a student learn to spell systematically in this grade, and how does the progression develop?* This is directly supported — Core is the site's only genuinely *ordered* strand (`CORE_SPELLING_SEQUENCE` is a single continuous K–5 chain per `CANONICAL_NAVIGATION_RELATIONSHIPS.md`), so "progression" is not editorial flavor, it's a structural fact worth narrating.

**Unique to Core, not HFW/Themed:**
- A **progression narrative**: what a student moves through, in order, across this grade's units, and roughly why that order makes sense (e.g., "short vowels before consonant digraphs" is a real instructional sequencing choice, not arbitrary).
- An explicit **"where to begin"** pointer for a family new to the grade.
- Legitimate ownership of "[grade] spelling curriculum/sequence" search intent (§8).
- A brief note on the K–5 continuity — Core is the one strand where "what comes right before/after this grade" is a real, answerable fact (the grade-boundary transition table in `CANONICAL_NAVIGATION_RELATIONSHIPS.md` already encodes this) — a single sentence noting the adjacent grade's continuation is reasonable; a whole K–5 map is not (that's a site-wide feature, not this page's job).

**Must not do:** invent a percentage-based "mastery" framing (anti-pattern), or duplicate the actual pattern explanation that belongs on a Skill page (Layer 1) or the specific grade-appropriate example already on the member page (Layer 2).

---

## 14. HFW-specific responsibilities

**Governing question (validated against the Themed/HFW standards' own language, which independently converges on this):** *Which high-frequency words should students learn to spell in this grade, and how are they organized for practice?*

**Unique to HFW, not Core/Themed:**
- The **complete numeric inventory** for the grade — total sets and total words (e.g., "4 sets, 40 words" for Kindergarten) — stated as a real synthesis fact, not just implied by list length. This is the one fact only the gateway can honestly state (no single set page can claim to represent the whole grade's HFW inventory).
- A short, accurate explanation of **what "high-frequency word spelling" means at this grade** — reusing, not re-deriving, the already-approved instructional principles from `CANONICAL_HIGH_FREQUENCY_WORD_SET_PAGE_STANDARD.md` §2 (frequency ≠ irregularity; use sound-spelling knowledge where it helps). The gateway should state this once, briefly, rather than every set repeating it (it currently doesn't repeat it at the set level either, per that standard's own rules — the gateway is actually the *correct*, non-duplicative place for this general framing to live for the first time).
- Cumulative sequencing across sets — "sets build across the grade" framing, referencing the real previous/next set chain that already exists in data (`hfWordsSequence.ts`), without re-listing every set's content.
- Legitimate ownership of "[grade] sight words / high-frequency words list" aggregate search intent.

**Must not do:** reintroduce deprecated terminology (*sight words*, *Heart Words*, *common words* — explicitly prohibited by the HFW standard §1, and that prohibition should extend to gateway copy even though the standard doesn't technically govern the gateway; there's no principled reason gateway copy should be allowed to use terminology the member-page standard just spent significant effort removing).

---

## 15. Themed-specific responsibilities

**Governing question (already stated near-verbatim in the frozen Themed standard §9 — this document adopts it directly rather than inventing a variant):** *What additional grade-appropriate spelling practice is available through familiar themes, and how might a family choose one?*

**Unique to Themed, not Core/HFW:**
- An explicit statement that this strand is **optional and non-sequential** — themes are peers, not a required sequence (directly required by the Themed standard's own member-page rules: "never has Review First/Next Step," "nonsequential peers"). The gateway is the right place to state this plainly for a reader who hasn't yet read a member page and might otherwise assume themes are ordered like Core.
- Brief framing of **why themes help** (context, recognizability, retrieval cues) — stated once, modestly, without overclaiming an evidence base that doesn't exist for "themes" specifically (§6).
- A **browsing/selection aid**: since themes have no inherent order, the gateway's real added value is helping a parent or teacher *choose* — this could be as simple as grouping the theme titles descriptively (not inventing a new taxonomy, just organizing the existing list scannably) rather than a flat numbered list that implies sequence the same way Core's numbered list correctly does.
- Legitimate ownership of "extra/themed/fun spelling practice for [grade]" search intent — deliberately *not* competing with Core for "curriculum" framing (per the Themed standard's own boundary: "not a disguised extension of the Core Spelling sequence").

**Must not do:** imply an order or prerequisite relationship between themes (the current numbered `<ol>` rendering already mildly risks this — worth flagging as a future rendering consideration, though visual/component changes are out of scope here); teach the theme's subject matter (anatomy, weather, etc.) rather than spelling, per the Themed standard's strict strand-boundary rule (§8 of that standard).

---

## 16. K–5 maturation guidance

Maturation should be **derived from the actual frozen corpus**, not manufactured by grade number, consistent with the task's explicit warning (§15) and the Themed standard's own K–5 maturation section (§7), which this document treats as the reusable model:

- **Core:** Kindergarten's progression narrative can honestly describe "hearing short vowel sounds and building simple words"; Grade 5's can honestly describe "advanced prefixes/suffixes, Greek and Latin word parts, and words that change spelling in related forms" — both are literal readouts of the actual unit titles at each grade, not invented sophistication.
- **HFW:** maturation is almost entirely in the *numbers* (Kindergarten: 4 sets/40 words vs. Grade 1–2: 7 sets/84 words vs. Grade 4–5: 2 sets/24 words) — the gateway's synthesis prose can note that set count tapers in upper grades because the *cumulative* K–5 total is what matters (316 words total), not that upper grades "need less" HFW work.
- **Themed:** per the Themed standard's own §7, maturation follows real inventory differences (Kindergarten: concrete sound-letter attention; Grades 4–5: longer-word chunking, selective morphology) — but the *gateway's* framing of "why themes" should barely change across grades, since the purpose of themed practice (context + retrieval cues) doesn't mature the way spelling content does. Over-maturing the *gateway's own explanatory voice* (as opposed to what the member pages teach) would be the "manufactured sophistication" anti-pattern the task explicitly warns against.

---

## 17. Warmth/voice guidance

Applying the same lesson the deepest-page audit already learned (per the task brief's explicit callback), the biggest risk for 18 gateways drafted in one project is **template fatigue** — 18 pages that read like one page with find-and-replace. Concrete guardrails:

- **No fixed opening formula.** The current three-sentence-template approach (§4) is already the anti-pattern to avoid at greater length, not a pattern to extend. Each grade+strand's orientation sentence should be freshly composed from that grade's real facts (unit titles, counts), not filled into an identical syntactic slot 18 times.
- **Avoid "students will..." boilerplate** — write to the parent/teacher reader directly, as the rest of the site's editorial standards already do (the HFW and Themed standards both use direct, concrete language grounded in actual words and units, never generic learning-outcome phrasing).
- **Grade-appropriate warmth, not scaled-down formality** — a Kindergarten gateway can be warmer/plainer in sentence rhythm than a Grade 5 gateway without changing *substance*; this is a voice register choice, not a maturation-of-content choice (keep §16 and this section conceptually separate).
- **No artificial reassurance** ("Don't worry, your child will master this!") — the existing site voice, per every standard reviewed, avoids mastery claims and percentage-based confidence; gateway copy should hold the same line.

---

## 18. Content depth: required / conditional / shared / not-recommended component matrix

Every row was tested against §11 first: could the Grade Hub carry this instead, could a member page carry it instead, and if not, why does it belong at the gateway specifically? The "Rejected alternative layer" column makes that test explicit for each component, so this table doubles as a second, component-level pass through the same three-layer boundary question §11 answers structurally.

| Component | Classification | Rejected alternative layer (and why) | Notes |
|---|---|---|---|
| One-to-two-sentence orientation ("what is this page") | **REQUIRED** | Not Hub-owned: the Hub's three-section overview is grade-wide, not strand-specific enough to replace a strand-scoped orientation for a reader who skipped the Hub (§7). Not member-owned: no single member can speak for the whole strand. | Must be freshly composed per grade+strand, not templated (§17) |
| Progression/organization synthesis (Core: sequence; HFW: cumulative inventory; Themed: purpose+how-to-choose) | **REQUIRED** | Not Hub-owned: exceeds Layer 3's "short orienting copy" budget if attempted for all three strands at once (§11.2). Not member-owned: would require every sibling member to repeat the same synthesis, or none to state it at all. | This is the entire "information gain" case for the gateway existing — see §11.2, §14 |
| Explicit "where to begin" pointer | **CONDITIONAL** — Core only, required there; not applicable to HFW (sets already have inherent set-1-first framing at the member level) or Themed (explicitly non-sequential) | Not Hub-owned (too deep for grade-wide copy); not member-owned (Review First/Next Step only orients a reader already on a unit, never a reader who hasn't chosen one, per §11.1) | |
| Complete crawlable list of member pages | **REQUIRED, SHARED/RENDERER-OWNED** | Not exclusively Hub-owned even where the Hub also shows convenience cards (current K–3 HFW pattern, §11.1) — the gateway remains the one page whose list must be authoritative and complete regardless of what the Hub also surfaces. Not member-owned (a member cannot list its own siblings without duplicating itself on every sibling). | Already implemented via `SpellingListCard` loop; do not duplicate as prose |
| Grade-level spelling observations (cross-unit pattern commentary) | **CONDITIONAL** — natural for Core, optional/light for HFW, not appropriate for Themed (would risk teaching subject matter across themes rather than spelling) | Not Hub-owned (too granular); not member-owned (cross-unit by definition) | |
| Relationship to other strands (cross-strand link) | **CONDITIONAL**, capped at 0–2 per gateway, same-grade only (§10, §11.1, §21) | Not a Hub duplicate: the Hub's cross-strand awareness is a full explanatory overview; the gateway's version is a single wayfinding link only, never a second copy of the Hub's explanation (§11.1) | Never automatic/symmetric |
| Related Skill-page links | **CONDITIONAL**, Core only, only when synthesis prose already names a skill family | Not member-owned exclusively: each unit already carries its own `skillIds` back-link; the gateway may name a family in aggregate but must never restate any single unit's link (§11.1) | Not required; avoid link-farming |
| Previous/next grade progression note | **CONDITIONAL**, Core only, one sentence max | Not a substitute for the member-level chain: the real K→1 etc. transition already lives precisely at the boundary member pages (`CANONICAL_NAVIGATION_RELATIONSHIPS.md`); the gateway's note is a lighter pointer, not a second copy of that mechanism (§11.1) | HFW/Themed lack a real cross-grade narrative to state honestly |
| FAQ section | **NOT RECOMMENDED** by default | N/A — rejected outright, not reassigned to another layer | Only if a genuine, non-generic question survives the same bar member pages use (task explicitly rejects FAQ quotas); expected to apply to few if any of the 18 gateways at launch |
| Teacher-specific / parent-specific subsections | **NOT RECOMMENDED** | N/A | Task explicitly asks to serve all three audiences without separate mini-sections (§7 above already resolves this via component-level mapping, not audience-labeled sections) |
| Word-count/length quota | **NOT RECOMMENDED** | N/A | Task explicitly rejects quotas; depth should be judged by which of the above components are genuinely justified for that grade+strand, not a target word count |
| Timeline/progress-indicator UI | **NOT RECOMMENDED as content, but flagged as future visual opportunity** | N/A (presentation, not a layer-assignment question) | See §22 — semantic progression order should be preserved so a future visual redesign *could* render it as a timeline, but no such component is authored now |

---

## 19. Schema / renderer / data-model findings

**Current state:** all 18 gateways share one renderer (`[strand].astro`) and derive everything from two small manifests (`gradeConfig.ts`, `canonicalGradeRoutes.ts`) plus the existing `spelling-lists` collection. No `spelling-lists` schema change is implied by anything in this document — gateway synthesis content is about a grade+strand *as a whole*, not about any individual entry, so it does not belong in per-entry frontmatter.

**Smallest viable path (recommended):** add authored copy analogous to the existing `gradeHubCopy.ts` pattern (already used for Grade Hub hero copy) — e.g., a new `gradeStrandGatewayCopy.ts` module keyed by `(grade, strand)` holding the orientation sentence, the synthesis paragraph(s), and any conditional fields (starting-point pointer, cross-strand link target). This:
- Requires no Content Collection schema change.
- Requires no new Zod schema in `src/content/config.ts`.
- Keeps authored prose out of `.astro` templates (matches the codebase's stated preference for business logic/content out of `.astro` files — though gateway *copy* is editorial content, not business logic, so a small typed data module, not a content-collection Markdown file, is the right level of ceremony given there are only 18 entries and they're tightly coupled to existing route/grade code).
- Requires the shared renderer (`[strand].astro`) to branch per `strand` when composing the page (it already branches per-strand for the one-sentence description; this extends that branch, it doesn't introduce a new architectural pattern).

**Alternative considered and not recommended:** a new Content Collection or per-gateway Markdown file. Rejected because 18 short, tightly-parameterized pages don't need full Markdown/Content-Collection ceremony (frontmatter schema, content body parsing) when a typed TS object serves the same purpose with less machinery — consistent with "prefer the smallest viable implementation" (task §19) and the codebase's own precedent (`gradeHubCopy.ts` already made this exact choice for a structurally similar problem).

**Renderer implication:** `[strand].astro` should likely still remain the single renderer (not split into three separate `.astro` files) — the three strands share enough structure (breadcrumb, header, list) that a shared template branching on `strand` for the synthesis section is more maintainable than three near-duplicate files, and matches the codebase's stated anti-pattern against premature componentization. This is a recommendation for the *implementation* phase, not a change made in this task.

**No changes recommended to:** `canonicalGradeRoutes.ts`, `gradeConfig.ts`, the `spelling-lists` Content Collection schema, or any member-page template.

---

## 20. Metadata / structured-data findings

- **Title tag:** currently `${gradeEntry.label} ${descriptor.label} | spellingwords.app` — adequate and should be preserved; no change needed for the proposed content model (title reflects the page's identity, which doesn't change).
- **Meta description:** currently the one templated sentence (§4) — should become the *orientation* sentence proposed in §17/§18, authored per grade+strand rather than templated. This is a content change, not a metadata *architecture* change (still one `description` value passed to `Layout`).
- **Canonical URL / OG tags:** no change needed.
- **BreadcrumbList JSON-LD:** no change needed.
- **ItemList JSON-LD:** no change needed — already accurately represents the complete child list, which remains required and unchanged.
- **FAQPage JSON-LD:** not added, per §18 ("not recommended by default") — only implement conditionally, and only alongside genuine authored FAQ content, never speculatively.
- **What should be grade-specific vs. strand-specific vs. shared:** title/description content is both grade- and strand-specific (already true); JSON-LD *shape* (Breadcrumb + ItemList) is shared across all 18; JSON-LD *content* (names, counts, URLs) is already correctly grade+strand-specific via the existing `resources` computation.

No new structured-data types are recommended "for AI visibility" — consistent with §9's rejection of speculative AI schema.

---

## 21. Internal-linking recommendations

- **Preserve:** breadcrumb up to Grade Hub; complete child list down to every member page (both already implemented, both required).
- **Add, capped and judged case-by-case:** same-grade cross-strand links (e.g., Core K → HFW K, Core K → Themed K), evaluated with the same "reasonable-parent test" already codified for member pages in `CANONICAL_NAVIGATION_RELATIONSHIPS.md` — would a parent who just read this gateway's synthesis naturally want to know "what else does this grade offer?" Plausibly yes, especially from Core (the default path) toward HFW/Themed (supplementary), less obviously useful in the reverse direction. Recommend: Core gateway may link to its grade's HFW and Themed gateways; HFW/Themed gateways link back to Core (as "the main sequence") and to each other only if genuinely useful — decide per-gateway during implementation, not force symmetric linking for its own sake (explicit prohibition already established at the member-page level and equally applicable here).
- **Do not add:** cross-grade gateway links (e.g., Kindergarten Core → Grade 1 Core) — this is a real, valuable relationship, but it already exists at the *member*-page level (the K→1 boundary transition in `CANONICAL_NAVIGATION_RELATIONSHIPS.md`) and duplicating it at the gateway level would be exactly the kind of automatic-symmetry link-farming the task prohibits (§23). A future "Continue exploring" grade-orientation feature is separately flagged as deferred in that same document — gateway cross-grade linking should wait for that decision, not preempt it.
- **Do not add:** links to individual Skill pages from HFW or Themed gateways (Skill pages are Core's counterpart, per the roadmap's Layer 1/Layer 2 model — forcing HFW/Themed to link to Skills would blur a boundary the roadmap already drew carefully).

---

## 22. Presentation-independence requirements

Per the task's explicit instruction, this standard freezes **semantic content, information hierarchy, instructional responsibilities, and navigation relationships** — not any visual treatment. Concretely, for the pilot and future implementation:

- Editorial copy must never reference cards, boxes, columns, colors, or screen position (e.g., never "see the cards below" — say "see the eight Kindergarten Core Spelling units" instead, letting the renderer decide how "the eight units" are visually presented).
- The synthesis/progression content for Core must be written as **sequential, ordered prose or a plain ordered structure** (not visual-timeline-dependent language), so a future redesign can choose to render it as a visual timeline, a numbered list, or something else entirely without requiring a copy rewrite.
- HFW's "cumulative inventory" framing should be written as **countable facts** (set count, word count) rather than assuming any particular chart/badge presentation.
- Themed's "how to choose" framing should be written as **descriptive grouping of theme names**, not assuming a particular grid/accordion/filter UI.

---

## 23. Future visual-design opportunities (explicitly not implemented now)

Recorded per task §16/§22 as things the semantic architecture proposed here should make *possible* later, without committing to any of them now:

- **Core:** a genuine visual progression/timeline representation (rather than identical numbered cards) — the semantic model already treats Core as an ordered sequence, so this would be a presentation change only, not a content-model change.
- **HFW:** a visual "cumulative total" indicator (e.g., "40 of 316 K–5 words" framing) — again, purely presentational; the underlying counts already exist and are already computed.
- **Themed:** a browsing/filtering UI for themes (since they're peers, not a sequence) — e.g., grouping by subject area — would be a natural fit for the "how to choose" framing this document proposes, but is explicitly a future visual decision, not something authored copy should assume exists.
- **Cross-strand navigation:** if same-grade cross-strand links are added (§21), a future redesign might present them as a small "explore this grade" module rather than inline prose links — again, presentational only.

None of these are implemented, specified in code, or required by the semantic standard proposed here.

---

## 24. Anti-patterns (explicit prohibitions for the pilot and future gateways)

Confirmed and extended from the task brief's own list, checked against this specific corpus:

- Giant SEO essays before curriculum links — rejected; §12 requires the child list stay dominant.
- Keyword stuffing — rejected; no keyword-density target proposed anywhere in this document.
- Generic grade-level filler ("Spelling is important! Practice makes perfect!") — rejected; every proposed content element in §18 must be grounded in real, grade-specific facts already in the data.
- Vocabulary definitions — rejected; explicitly out of scope for a spelling-only site (task §1), and doubly so for Themed, which has its own strict subject-boundary rule already.
- Duplicated child-page instruction — rejected throughout §12–§15.
- Generic FAQs on every page / forced FAQ schema / FAQ quotas — rejected in §18/§20.
- Fake "mastery" claims / invented statistics — rejected in §17, consistent with every existing frozen standard reviewed.
- Excessive jargon — rejected in §17.
- Treating every gateway identically — this entire document's central thesis is the opposite (§13–§15 differentiate all three explicitly).
- Artificial content-length quotas — rejected in §18; depth is component-justified, not word-count-driven.
- Automatic links inserted merely for SEO — rejected in §21 (reasonable-parent test required for every added link).
- Renderer-dependent editorial copy — rejected in §22 (no "below," "card," "column" language).
- Repeating the same opening formula 18 times — rejected in §17/§18 (the current implementation's own three-template-sentence approach is the exact anti-pattern being corrected).
- Hiding practice destinations beneath explanatory prose — rejected in §12 (component 5).

**Additional anti-pattern discovered during this research, not in the original list:** **manufacturing a false "gateway = mini Skill page" identity for Core.** Because Core's governing question ("how does the progression develop") sounds adjacent to a Skill page's job ("what is this pattern"), there's a real risk of a Core gateway drifting into re-explaining spelling *patterns* (Layer 1's job) rather than staying focused on *sequence and organization* (its own job). The proposed standard's Core section (§13) is written specifically to guard against this — progression narrative, not pattern explanation.

---

## 25. Kindergarten Core Spelling case study (`/kindergarten/core-spelling`)

**What it currently provides** (verbatim, per §4 audit): breadcrumb (Home → Kindergarten → Core Spelling); H1 "Kindergarten Core Spelling"; one templated sentence ("Explore the Core Spelling sequence for Kindergarten across 8 carefully ordered spelling units."); a numbered list of 8 `SpellingListCard`s (First Words, Short A, Short I, Short O, Short U, Short E, Mixed Vowel Review, Consonant Digraphs); footer.

**Already useful:** the numbering itself already implies sequence (a real, accurate signal — Kindergarten Core genuinely is ordered); the one sentence at least names the exact count; breadcrumb and JSON-LD are already correct and complete.

**Missing, per this document's proposed standard:**
- No synthesis of *why* the order is what it is (First Words → single-vowel units in sequence → Mixed Vowel Review → Consonant Digraphs is a real pedagogical shape — sounds first, then discrimination, then digraphs — worth one or two sentences).
- No explicit "start here" statement (though the numbering implies it, it's never stated in words for a skimming parent).
- No mention that this is the *default*/systematic path, distinguishing it from the grade's other two strands (a reader arriving directly from search, bypassing the Hub, has no way to know this from the gateway itself).
- No link to the grade's HFW or Themed gateway.

**Redundant:** none of the current content is redundant — it's minimal, not bloated, which confirms this is a thin-index problem, not a duplication problem.

**What should remain renderer-owned:** the `SpellingListCard` list itself, its metadata badges, breadcrumb, JSON-LD generation.

**What should become authored, grade-specific content:** the orientation sentence (already exists but should be freshly composed rather than templated) and the new progression-synthesis paragraph (§13).

**Future visual-redesign opportunity specific to this page:** the "8 carefully ordered spelling units" framing is an obvious candidate for a future visual sequence/timeline treatment (§23) — not implemented now.

---

## 26. Pilot recommendation

**Recommended: Option B — pilot all three Kindergarten gateways together, not Kindergarten Core alone.**

Reasoning: Kindergarten Core alone (Option A) would validate the Core model but leave the HFW and Themed models — which this document argues are *meaningfully different*, not reskins of Core — completely unvalidated until a second pilot round. Since the central finding of this research is that the three strands need genuinely different content models (§13–§15), a pilot that only exercises one of the three models risks the later Grade 1–5 rollout discovering strand-specific problems (e.g., the HFW "cumulative inventory" framing, or the Themed "how to choose" framing) only after they've already been baked into a template used across 15 more pages. Piloting all three Kindergarten gateways together directly tests the differentiated-template thesis this document exists to establish, at the smallest possible scope (3 pages, 1 grade, smallest word/unit counts in the whole corpus — easiest to review carefully).

Option C (one representative gateway per strand, but from different grades) was considered and rejected: it would validate strand differentiation but not grade-level consistency within one grade's three gateways read together by the same parent — a real reader scenario (a Kindergarten parent reading all three of their grade's gateways back to back) that Option B tests directly and Option C does not.

Kindergarten remains the right *grade* to pilot regardless of strand scope, for the reasons the task brief itself already gives: clearest progression (8 short units), easiest to review exhaustively, and starkest current gap between "thin index" and "useful gateway" (smallest page, so the improvement is most visible and cheapest to iterate on).

---

## 27. Proposed canonical standard (concrete, implementation-ready)

### Shared gateway architecture (all 18 pages)

| Component | Purpose | Authored/renderer | Required/conditional | Depth | Changes by grade? | Internal links? | Must not duplicate |
|---|---|---|---|---|---|---|---|
| Breadcrumb | Orientation, structured data | Renderer-owned | Required | N/A | No (mechanical) | Up to Grade Hub | — |
| H1 | Identity | Renderer-owned (composed from grade+strand labels) | Required | 1 line | Mechanical | — | — |
| Orientation sentence(s) | Answer "what is this page" fast | **Authored** | Required | 1–2 sentences | Yes (real counts/units differ) | 0 | Grade Hub's own 3-section overview |
| Synthesis (strand-specific, see below) | Information gain across the strand | **Authored** | Required | 1 short paragraph (~2–4 sentences) | Yes | 0–2, capped, same-grade cross-strand only | Member-page content |
| Complete child list | Navigation, crawlability | Renderer-owned (`SpellingListCard` loop) | Required | N/A | Mechanical (count varies) | Down to every member | — |
| BreadcrumbList + ItemList JSON-LD | Structured data | Renderer-owned | Required | N/A | Mechanical | — | — |

### Core-specific architecture

- Orientation: names the grade, the word "sequence," and the real unit count.
- Synthesis: 2–4 sentences narrating the real order (why short vowels precede digraphs, etc.) and a one-clause "start here" pointer.
- Optional (conditional): one sentence noting continuity with the adjacent grade's Core sequence, only if it adds real value beyond the breadcrumb.
- Cross-strand link: to this grade's HFW and Themed gateways (Core is the natural jumping-off point).

### HFW-specific architecture

- Orientation: names the grade, the real set count, and the real total word count.
- Synthesis: 2–4 sentences stating what "high-frequency word spelling" means at this grade (reusing the frequency≠irregularity framing already approved for member pages) and noting the sets build cumulatively across the grade.
- No "start here" pointer beyond "Set 1" (implicit in the list order — do not over-author this).
- Cross-strand link: back to Core (as the grade's main sequence); Themed link optional.

### Themed-specific architecture

- Orientation: names the grade, the real theme count, and states plainly that themes are optional/non-sequential.
- Synthesis: 2–3 sentences on why themed context helps (measured, not overclaimed per §6) and a light, descriptive grouping of the actual theme titles to aid selection (not a new taxonomy — just organizing what exists).
- No "start here" pointer (contradicts non-sequential framing).
- Cross-strand link: back to Core; HFW link optional.

---

## 28. Required/conditional/shared/not-recommended matrix

See §18 (already presented in full required format) — not duplicated here.

---

## 29. Implementation prerequisites

Before a pilot implementation session begins, it should have:

1. This document, reviewed and accepted (or revised) by a human owner.
2. A decision on the smallest-viable data model (§19 recommends a new `gradeStrandGatewayCopy.ts`-style module; confirm before writing code).
3. Draft orientation + synthesis copy for the 3 Kindergarten gateways specifically (Core, HFW, Themed) — writing this is itself editorial work, not covered by this research task, and should be done with the same care as the 105 deepest pages (draft → self-review → adversarial review, per the pattern already established in `CONTENT_IMPROVEMENT_ROADMAP.md`).
4. A decision on whether to add a gateway-rendering test (recommended, given §3's finding that no such test exists today) — e.g., asserting each of the 3 piloted pages renders its required components and that the child list stays complete.
5. Confirmation that visual/component work remains explicitly out of scope for the pilot (per this task's constraints) — the pilot should ship using the *existing* `SpellingListCard`/`Breadcrumbs`/`Layout` components, proving out the content model without touching presentation.

---

## 30. Open questions

- Whether cross-strand gateway links (§21) should be mutual/symmetric within a grade, or intentionally asymmetric (e.g., Core → HFW/Themed but not the reverse) — this document recommends deciding per-gateway using the reasonable-parent test rather than a blanket rule, but a human editorial call is needed before the pilot ships all three Kindergarten gateways with any cross-links.
- Whether the future "Continue exploring" grade-orientation feature (flagged as deferred in `CANONICAL_NAVIGATION_RELATIONSHIPS.md`) should eventually subsume any gateway-level cross-grade linking, or remain a separate, later feature — flagged for whoever owns that deferred item, not resolved here.
- Exact wording/voice calibration for the 3 Kindergarten pilot pages is unwritten — intentionally, since this document is architecture/standard, not the editorial draft itself.

---

## Direct answers to the required closing questions

1. **What is the unique purpose of a grade-level strand gateway?** To fill the one genuine gap between the Grade Hub (correctly thin, three-strand-wide) and the member pages (correctly narrow, single-unit) — synthesizing how one strand's member pages relate to each other as a group (sequence for Core, cumulative inventory for HFW, purpose/selection for Themed) — while providing complete, dominant navigation into every member page. It is not a lesson, not a second Grade Hub, and not a thin index. See §11 for the full structural argument that this gap is real, not manufactured.

2. **What should ALL such gateways contain?** A freshly composed 1–2 sentence orientation stating what the page is and its real counts; a short strand-specific synthesis paragraph providing genuine information gain; the complete, renderer-owned crawlable list of every member page; and the existing accurate Breadcrumb + ItemList structured data. See §12/§27.

3. **What should Core gateways contain that HFW/Themed should not?** A progression/sequence narrative explaining the real instructional order, and an explicit "where to begin" pointer. See §13.

4. **What should HFW gateways contain that Core/Themed should not?** The complete numeric grade-level inventory (sets + total words) framed as cumulative across sets, and a brief statement of what "high-frequency word spelling" means at this grade (reusing already-approved member-standard framing, stated once at the gateway level). See §14.

5. **What should Themed gateways contain that Core/HFW should not?** An explicit statement that themes are optional and non-sequential, a modest (non-overclaimed) explanation of why themed context helps, and a selection aid organizing the actual theme titles descriptively. See §15.

6. **How much explanatory content is enough?** Enough to include every REQUIRED component in §18/§27 and no more — judged by which components are genuinely justified for that specific grade+strand's real facts, never by a word-count target. Expect roughly one short orientation passage plus one short synthesis paragraph beyond what's rendered today; not a multi-section article.

7. **How do we keep the actual practice destinations prominent?** The complete child list stays renderer-owned, unchanged in position and prominence, and every new authored component (§12 rule 5) must sit above or beside it, never push it down or replace its visual weight. No word-count or component addition may compromise this.

8. **What information belongs at the Grade Hub instead?** The three-section overview explaining that Core/HFW/Themed exist and briefly what each is, plus (for K–3 HFW today) direct convenience cards into sets — the gateway should not re-derive the overview; it can assume either the reader arrived from the Hub (already oriented) or needs only a one-sentence refresher, not a restatement. The full component-by-component boundary is §11's central matrix (§11.1), with the structural reasoning for why this boundary is real in §11.2.

9. **How should these pages target SEO without cannibalizing Grade Hubs or member pages?** By strict intent ownership per §8.1's three-layer matrix (itself a direct application of §11's responsibility boundary to search demand) — gateways own "[grade] [strand] curriculum/list/inventory/practice" aggregate intent that neither the deliberately-thin Grade Hub nor any single narrow member page can honestly claim; they never compete for the narrowest ("[grade] [specific unit] words") or broadest ("[grade] spelling words," ambiguous strand) intent, which belong to member pages and the Grade Hub respectively.

10. **What makes them strong for GEO/AEO without AI-specific gimmicks?** The same things that make them good for a human reader and traditional search: accurate, self-contained, well-structured prose; headings that describe real content; structured data that matches what's visible; no `llms.txt`-based decisions (rejected on first-party evidence, §9); no hidden or AI-only content, ever.

11. **How do they contribute to topical authority?** They fill the one missing rung in the existing knowledge graph (Grade Hub → **gateway** → member page) with real synthesis content that only exists at that rung, strengthening the site's demonstrated depth on "grade-level spelling organization" as a topic distinct from both "what is this spelling pattern" (Skill pages) and "what does this specific unit teach" (member pages). See §10.

12. **How should they serve parents, teachers, and students simultaneously?** Through the same components, not separate sections or pages — orientation and synthesis serve the parent's "what/where" and teacher's "what's covered, how sequenced" questions simultaneously (both read the same paragraph differently), while the unchanged, dominant child list serves the student's "where do I click" need directly. See §7.

13. **How can they feel warmer and more human without adding filler?** By abandoning the current one-template-per-strand approach (§4) in favor of freshly composed, grade-specific orientation and synthesis prose grounded in real facts about that grade's actual units/sets/themes — warmth comes from specificity and directness, not from added sentences, mascots, or reassurance language. See §17.

14. **What schema/renderer changes, if any, are actually necessary?** No Content Collection or Zod schema change. The smallest viable change is a new small TypeScript copy module (parallel to the existing `gradeHubCopy.ts` pattern) holding per-grade-per-strand orientation/synthesis copy, consumed by the existing shared `[strand].astro` renderer, which already branches per strand for its one sentence today. See §19.

15. **What should the first pilot be?** All three Kindergarten gateways (Core, HFW, Themed) together — not Kindergarten Core alone — to validate the differentiated three-strand model at the smallest, most reviewable scope before scaling to Grades 1–5. See §26.

16. **What should remain explicitly unfrozen for the later visual redesign?** Every component's presentation — cards, colors, typography, spacing, numbering style, any timeline/progress-indicator treatment, columns, accordions, and desktop/mobile layout. Only the semantic content, information hierarchy, and navigation relationships in §27 are proposed as the standard; §22/§23 explicitly reserve everything visual. See §22, §23.

17. **Are there any factual/documentation/repository discrepancies that must be corrected before implementation?** No blocking discrepancy. Three non-blocking documentation gaps were found and are reported, not fixed, in §5: (a) `K5_FINAL_CONTENT_ARCHITECTURE.md`'s gateway URL model is stale against the current `PUBLIC_URL_ARCHITECTURE.md`; (b) `CONTENT_IMPROVEMENT_ROADMAP.md` never names Core or Themed gateways as their own layer/phase, unlike HFW; (c) two previously-flagged companion inventory files are still missing from the repository (unrelated to gateways specifically). None blocks piloting the standard proposed here.

---

## Sources / references

**Educational:**
- Reading Rockets, [Word Study Instruction in the K-2 Classroom](https://www.readingrockets.org/topics/curriculum-and-instruction/articles/word-study-instruction-k-2-classroom)
- Reading Rockets, [Word Study: Learning Word Patterns](https://www.readingrockets.org/topics/spelling-and-word-study/articles/word-study-learning-word-patterns)
- Reading Rockets, [Spelling: In Depth](https://www.readingrockets.org/reading-101/reading-101-learning-modules/course-modules/spelling/depth)
- Reading Rockets, [Spelling: In Practice](https://www.readingrockets.org/reading-101/reading-101-learning-modules/course-modules/spelling/practice)
- Reading Rockets, [Spelling: Instructional Guidelines](https://www.readingrockets.org/topics/spelling-and-word-study/articles/spelling-instructional-guidelines)

**SEO / search architecture:**
- [Category Pages vs Product Pages: Where Should You Focus Your SEO Efforts?](https://www.thebusinessscroll.com/category-pages-vs-product-pages/)
- [Your Category Pages Are Thin: A Hub Depth Diagnostic](https://www.digitalapplied.com/blog/thin-hub-pages-site-architecture-diagnostic-2026)

**GEO/AEO (skeptical review):**
- [Should I Create an llms.txt File? 2026 Guide](https://www.getpassionfruit.com/blog/should-i-create-an-llms.txt-file-google-s-2026-guidance-explained) — cites Google's Gary Illyes/John Mueller statements against `llms.txt`
- [LLMs.txt in Practice: Adoption Data, Evidence, and Setup](https://www.digitalapplied.com/blog/llms-txt-in-practice-adoption-evidence-2026) — independent crawler-traffic monitoring data

**Repository documents (internal, cited throughout, primary evidence for all repository-state claims):**
`docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`, `docs/content/CANONICAL_HIGH_FREQUENCY_WORD_SET_PAGE_STANDARD.md`, `docs/content/CANONICAL_THEMED_SPELLING_PRACTICE_PAGE_STANDARD.md`, `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md`, `docs/architecture/PUBLIC_URL_ARCHITECTURE.md`, `docs/planning/CANONICAL_NAVIGATION_RELATIONSHIPS.md`, `docs/content/inventory/high-frequency-words.md`, `src/pages/[gradeSlug]/[strand].astro`, `src/lib/content/canonicalGradeRoutes.ts`, `src/lib/content/gradeConfig.ts`.
