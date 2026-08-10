# Canonical Skills Hub Standard — Research & Proposed Model

**Status:** Research document. Proposes conclusions for a later, separate `CANONICAL_SKILLS_HUB_STANDARD.md`. Not itself a frozen editorial standard. No production code, route, taxonomy, curriculum, or Skill page was changed to produce this document.
**Scope:** the single canonical Skills Hub page at `/skills` (`src/pages/skills/index.astro`).
**Does not govern:** the 41 canonical Skill pages (`docs/content/CANONICAL_SKILL_PAGE_STANDARD.md`, frozen), the 6 Grade Hubs (`docs/content/CANONICAL_GRADE_HUB_STANDARD.md`, frozen), the 18 Grade-Strand Gateways (`docs/content/CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md`, frozen), the 105 grade-curriculum member pages, or visual design.

---

## 1. Executive summary

The Skills Hub (`/skills`) is the single top-level landing page for the site's third primary user journey — "I know what we need to practice" (`CONSTITUTION.md` §3.3). Unlike the grade-first hierarchy, which inserts a Grade-Strand Gateway layer between the Grade Hub and its member pages, the skill-first hierarchy is frozen at two hops: Skills Hub → canonical Skill page. This research validates, rather than assumes, that this shallower structure is correct, and concludes that it is: **no Skill Family Gateway layer should be created.** The working hypothesis stated in the task brief survives scrutiny against discoverability, crawl depth, internal linking, cognitive load, scalability, and accessibility, and is adopted as this research's recommendation (§8).

The current `/skills` implementation is architecturally sound and close to its target shape already: one H1, one short orientation paragraph, 12 family sections each with a short description and a flat list of direct links to canonical Skill pages, one line pointing to grade browsing, `BreadcrumbList` + `ItemList` structured data. Its central gap is not structural — it is that eleven of twelve family-level descriptions are a single generic template sentence pair ("Practice X." / "Choose the Y your child needs to practice.") that could be swapped between families with only nouns changed, which does not yet satisfy this document's proposed family-content-contract (§9). The page is **architecturally sound but editorially underdeveloped**, not structurally broken (§18).

This document also finds and reports (without silently correcting) several documentation/code discrepancies between the frozen `SKILLS_ARCHITECTURE.md` taxonomy and the currently-registered `SPELLING_SKILL_FAMILIES` data structure — most notably that two family titles differ between the architecture doc and the live code, and that two family descriptions in the architecture doc do not match the live family `description` strings (§4, §21).

**Verdict for this research pass:** the direct-Skill-link, family-grouped architecture should be preserved as the frozen target model for `/skills`; the outstanding work is editorial (family synthesis content, individual entry-description standard) and structured-data refinement (narrow `ItemList` semantics, evaluate nested family/skill grouping), not a redesign.

---

## 2. Scope and authorities

This document's factual claims are sourced from, in order of authority:

1. **Frozen project facts** — `docs/architecture/CONSTITUTION.md`, `docs/architecture/SKILLS_ARCHITECTURE.md`, `docs/architecture/SKILLS_MODEL.md` (subordinate to `SKILLS_ARCHITECTURE.md` for families/taxonomy, still governing for the Skill/Focused-Skill/Practice-Set model and editorial philosophy), `docs/architecture/PUBLIC_URL_ARCHITECTURE.md`, `docs/architecture/CONTENT_MODEL.md`.
2. **Repository-derived observations** — direct reads of `src/pages/skills/index.astro`, `src/pages/skills/[slug].astro`, `src/lib/content/spellingSkills.ts`, `src/lib/content/canonicalSkillRoutes.ts`, `src/lib/content/spellingSkills.test.ts`, `docs/content/inventory/skill-pages.md`, and representative Skill pages (`short-a-words.md` and others referenced throughout).
3. **General external/educational knowledge** — structured-literacy scope-and-sequence conventions, Schema.org's `ItemList`/`BreadcrumbList` guidance, and IA/usability principles, described generally rather than cited to a specific unverifiable source, per this task's research standard.
4. **This document's own recommendation/inference** — explicitly marked as such throughout, especially in §8, §9, §17.

Where these conflict, frozen project facts govern, and any conflict is reported in §21 rather than silently resolved.

This document does not redesign the Skill taxonomy, does not create a Skill Family Gateway layer, does not modify production code, and does not freeze the eventual `CANONICAL_SKILLS_HUB_STANDARD.md` — that is separate future work this research feeds into.

---

## 3. Current repository state

**Governing architecture documents, read in full for this research:**

- `docs/architecture/CONSTITUTION.md` — defines the three user journeys (§3), including "Choose Specific Practice" (§3.3, the journey `/skills` serves), the No-Gateway Rule (§11), and SEO/GEO/AEO principles (§15). Does not name `/skills` by URL (URLs are explicitly not frozen at the Constitution level) but does establish that Skills is a parallel, not subordinate, navigation system (§4, §7).
- `docs/architecture/SKILLS_ARCHITECTURE.md` — the frozen, final taxonomy: 12 families, 41 canonical Skills, exact family order, exact skill order within each family, and the "Final Skills Hub (canonical navigation)" section (§4) that already describes the intended Hub shape in prose: a flat list of family headings each followed by its member Skill titles, with single-skill families (Multisyllabic Words, Greek and Latin Roots) rendered as one direct destination rather than an extra intermediate page.
- `docs/architecture/SKILLS_MODEL.md` — superseded for family/taxonomy specifics (§7, §8, §10) by `SKILLS_ARCHITECTURE.md`, but still governs the Skill/Focused-Skill/Practice-Set layering model, the autonomy rule, and — critically for this research — explicitly frames Skills as one of three layers (broad family, focused skill, practice set/filter) and states that "even canonical Focused Skills are not automatically guaranteed URLs... those decisions still require later autonomy and implementation review," which has since been settled by `SKILLS_ARCHITECTURE.md` for all 41 slots.
- `docs/architecture/PUBLIC_URL_ARCHITECTURE.md` — freezes the flat, grade-independent URL shape `/skills` and `/skills/{skill-slug}` (no intermediate family segment), calling `/skills` "a first-class top-level public journey... parallel to the grade-first journey." This is strong direct evidence against inserting a family-level URL segment or gateway page between Hub and Skill.
- `docs/content/CANONICAL_SKILL_PAGE_STANDARD.md` — governs what an individual canonical Skill page contains (§3 defines its required elements: direct answer, demonstration set, bounded scope, explanation, "what to notice," mistakes/exceptions, teaching routine, diagnostic response, "signs of security," curriculum placement, related Skills, FAQ, metadata, structured data). This is the primary evidence for what the Hub must **not** duplicate (§16).
- `docs/content/CANONICAL_GRADE_HUB_STANDARD.md` and its research doc — the closest structural analogue, describing a page that "orients... then routes" without listing member inventories, because an intermediate Grade-Strand Gateway layer exists to own that inventory. Used throughout as the comparison case for why the Skills Hub's situation is different (§8).
- `docs/content/CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` and its research doc — describes the one intermediate-layer page family that exists in the grade-first hierarchy and does not exist in the skill-first hierarchy. Its own "why this gap is real, not manufactured" reasoning (research doc §11.2) is the direct template this document applies, in reverse, to conclude the Skills Hub does *not* need an equivalent layer (§8).
- `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md` — Layer 4 (§2) defines the Skills Hub's purpose ("brief family descriptions and a clear path into each Skill page... must not duplicate any single Skill page's explanation") and schedules its content work as Phase 4, dependent on Phase 1 (Skill pages) being substantially complete across all 12 families (§3). Also documents that `contentRole`, not category or route, determines Skill identity, and that Skill pages are Layer 1's "grade-independent anchor."
- `docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md` (skimmed per task instruction) — confirms the Grade Unit ↔ Skill relationship model: a Skill may be linked from several Grade Units; no grade owns a Skill.
- `docs/research/canonical-curriculum-and-skills-summary.md` — a plain enumeration of the frozen 41-Skill/12-family library plus the full Grade Unit curriculum; consistent with `SKILLS_ARCHITECTURE.md` and used to cross-check family/skill counts.
- `docs/planning/CANONICAL_NAVIGATION_RELATIONSHIPS.md` — governs `relatedLists`/`prerequisiteLists`/`nextLists` internal-linking rules for Grade Unit/HFW/Themed pages; Skills are referenced only as Explore More/relationship targets, never as chain members, confirming Skills sit outside the Core/HFW/Themed navigation graph entirely — consistent with Skills being a parallel system.
- `docs/content/CANONICAL_GRADE_HUB_STANDARD_RESEARCH.md` §9.3 and `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §9 anti-patterns — both explicitly state that Grade Hubs and Grade-Strand Gateways should **not** link to Skills, reserving that relationship for wherever it is separately decided (i.e., here). This research's job includes deciding the Skills Hub's own outbound link to grade browsing, which is the mirror-image relationship (§11).

**Current `/skills` implementation** (`src/pages/skills/index.astro`, read in full):

- Breadcrumb: Home → Skills (2 levels — matches Grade Hub depth, not Grade-Strand Gateway's 3 levels).
- H1: "Spelling Practice by Skill."
- One intro paragraph (2 sentences): states the journey ("choose a specific spelling sound or pattern") and one example nudge ("Start with short vowels and simple CVC words").
- 12 family `<section>`s, each: an `<h2>` (family title, sometimes with a stable `anchorId` — only Silent E has one today, for the retired Long E redirect target), one paragraph combining `family.description` + `family.guidance` (two authored strings concatenated with a space), then a flat divided list of every member Skill as a direct `<a href>` to its canonical Skill page, each link showing the Skill's title and its frontmatter `description` (not a Hub-specific summary — this reuses the Skill page's own metadata description verbatim).
- One closing sentence: "Not sure what to choose? Browse by grade." linking to `/#grades`.
- Metadata: static `<title>`/`description` on `Layout`, not derived from family data.
- Structured data: `BreadcrumbList` (2 items) + `ItemList` (`name: "Spelling Practice by Skill"`, `numberOfItems` = all 41 resolved entries across all 12 families, each a flat `ListItem` with `url`/`name` — no nested family grouping, no `ItemList`-of-`ItemList`s).

**Data source:** `src/lib/content/spellingSkills.ts` defines `SPELLING_SKILL_FAMILIES` — 12 `as const` objects, each with `title`, `description`, `guidance`, `skillIds` (and Silent E additionally has `anchorId`). `CURATED_SPELLING_SKILL_IDS` is derived by flattening every family's `skillIds` in order — this is the actual runtime source of truth for "which 41 Skills are on the Hub, in what order," not `SKILLS_ARCHITECTURE.md` directly (though the two are kept in sync by `spellingSkills.test.ts`, see §4). Routing is resolved per-entry via `getSpellingSkillPath` → `canonicalSkillRoutes.ts`'s explicit id→slug manifest — never derived from frontmatter `urlSlug`, category, or folder.

**Representative canonical Skill pages already read for this research** (to establish what the Hub must not duplicate): `short-a-words.md` (Variant 1 reference implementation — word-family tables, sound-vs-letter-name framing, teaching routine, neighbor contrast with Long A) plus, via `CANONICAL_SKILL_PAGE_STANDARD.md` §4's variant descriptions and `inventory/skill-pages.md`'s per-page editorial-status notes, the shape of Variant 2 (`ck-tch-dge-word-endings.md`, rule/condition pages), Variant 3 (`common-prefixes.md`, morpheme/word-equation pages), and Variant 4 (`homophones.md`, meaning/usage-distinction pages). Every canonical Skill page already independently owns: a direct answer, a demonstration word set, full concept explanation, "what to notice," mistakes/exceptions, a teaching routine, a diagnostic response, "signs of security," curriculum placement (reverse `skillIds` lookup), related-Skill links, 0–5 FAQs, and its own `BreadcrumbList` (+ conditional `FAQPage`) structured data (verified directly in `src/pages/skills/[slug].astro`). This is the complete inventory of what the Hub must never re-derive (§16).

---

## 4. Canonical Skill inventory

Pulled from **executable/canonical sources** — `src/lib/content/spellingSkills.ts` and `src/lib/content/spellingSkills.test.ts` — not from prose documentation, per this task's instruction that code wins over stale docs.

**Totals:** 12 canonical families, 41 canonical Skill pages, exactly as `SKILLS_ARCHITECTURE.md` §4 states and as `spellingSkills.test.ts` locks in an executable assertion (`CURATED_SPELLING_SKILL_IDS` has length 41, `SPELLING_SKILL_FAMILIES` has 12 entries in the exact order below).

**Exact public family order and member Skills (live code, `SPELLING_SKILL_FAMILIES`):**

1. **Short Vowels** *(code title)* — Short A Words, Short E Words, Short I Words, Short O Words, Short U Words (5)
2. **Consonant Digraphs** — SH, CH, TH, WH Digraph Words (4)
3. **Consonant Blends** — Beginning Blends, Ending Blends (2)
4. **Common Spelling Patterns** — CK/Double Letters/TCH-DGE Word Endings, Silent Letters, Soft C and Soft G (3)
5. **Silent E** — Long A/I/O/U Silent E Words (4)
6. **Vowel Teams** — AI and AY, EE and EA, OA and OW, OI and OY, OU and OW, IE and IGH, OO, AU and AW Words (8)
7. **R-Controlled Vowels** — AR, OR, ER/IR/UR Words (3)
8. **Multisyllabic Words** — single-skill family (1)
9. **Word Building and Endings** — Plurals, -ed/-ing, Common Suffixes, Spelling Rules for Adding Suffixes, Compound Words, Contractions (6)
10. **Prefixes** — Un- and Re- Prefixes, Common Prefixes (2)
11. **Greek and Latin Roots** — single-skill family (1)
12. **Homophones and Commonly Confused Words** — Homophones, Commonly Confused Words (2)

5+4+2+3+4+8+3+1+6+2+1+2 = **41**, matching the test's explicit `toHaveLength(41)` assertions.

**Discrepancies between `SKILLS_ARCHITECTURE.md` (doc) and `spellingSkills.ts` (code) — reported, not silently reconciled, per this task's instruction:**

- **Family 1 title.** `SKILLS_ARCHITECTURE.md` §2/§4 names it "**Short Vowels and CVC Words**." The live code (`SHORT_VOWELS_AND_CVC_SKILL_FAMILY.title`) is "**Short Vowels**" — shorter, CVC dropped from the public label. `spellingSkills.test.ts` locks in "Short Vowels" as the tested, executable title. This is the code's actual public output today; the architecture doc's fuller name is not what renders.
- **Family 4 title.** `SKILLS_ARCHITECTURE.md` names it "Common Spelling Patterns" *(editorial name: One-Syllable Spelling Patterns)." The code's title is "Common Spelling Patterns" — matches the doc's primary name, not its parenthetical alternate. No discrepancy here; noted only because the doc's own phrasing could read ambiguously about which name is canonical.
- **Family 1 description text.** `SKILLS_ARCHITECTURE.md` gives no single canonical description sentence to check against (it states "purpose:" prose per family in §2, not a verbatim public string), so the code's `description`/`guidance` strings are original public copy, not a doc-to-code transcription mismatch — flagged here as a documentation gap (the architecture doc never specifies exact family-description copy) rather than a contradiction.
- **Skill titles vs. the code's Hub-rendered `entry.data.title`.** The Hub renders each canonical Skill's own frontmatter `title`, not a value from `spellingSkills.ts`. Spot-checking `SKILLS_ARCHITECTURE.md` §3's "Final Title" column against `inventory/skill-pages.md`'s "Title" column shows these already agree for every one of the 41 rows checked — no discrepancy found at the individual-Skill-title level.
- **`docs/content/K5_CURRICULUM_COVERAGE.md`** (superseded, read per task instruction) still describes only 4 registered public families (Short Vowels, Consonant Digraphs, Silent E, Vowel Teams) — this is stale historical evidence of an earlier implementation state, explicitly marked superseded at the top of that file, and is not in conflict with the current, later `SKILLS_ARCHITECTURE.md`/code state. Reported for completeness, not as a live contradiction.

**Provisional/legacy/exceptional Skill pages:** none currently exposed on `/skills`. `spellingSkills.test.ts` explicitly asserts the Hub "exposes only published reusable Skills, not Grade Units or archived content" — every one of the 41 curated ids resolves to `status: published` + `contentRole: skill`, and the test explicitly checks that Grade Unit ids (e.g. `kindergarten-short-a-words`), the archived pre-taxonomy page (`short-vowels-cvc-words`), and the retired `silent-e-long-e` page are all excluded from `CURATED_SPELLING_SKILL_IDS`. `inventory/skill-pages.md` independently confirms "0 non-taxonomy `contentRole: skill` pages remaining" — the two formerly-exceptional pages (`grade-4-final-stable-syllables`, `grade-5-spelling-rules`) were deleted outright during legacy-architecture removal, not merely excluded from the Hub.

**Frozen taxonomy decisions preserved, not reopened:** this document does not propose adding, removing, renaming, reordering, splitting, or merging any family or Skill. Every count and order above is taken as fixed input.

---

## 5. Governing reader question

The task brief's working hypothesis — *"I know the spelling pattern or concept I want to work on. Where should I go?"* — is close but slightly underspecifies the actual population landing on `/skills`. Refined:

> **"I already know (or can recognize by name) a specific spelling sound, pattern, or word-building concept my child needs — which page teaches and demonstrates it, and where do I click?"**

This refinement matters for two reasons. First, `CONSTITUTION.md` §3.3 frames the journey as starting from *recognizing* a concept ("The user searches or browses for a recognizable spelling concept"), not necessarily *already knowing its name* — a parent may recognize "the two-letter sound in ship" without knowing the word "digraph." The Hub therefore needs family groupings a parent can browse into by recognition, not only a search box for a term they'd need to already know. Second, `SKILLS_MODEL.md` §1 states the Skills system "must not expose the full technical curriculum taxonomy" — the reader question is not "show me the taxonomy," it is "get me to the right practice concept fast."

**What `/skills` should primarily be:** a **canonical directory with light family-level orientation** — closer to a well-organized table of contents than to an explanatory landing page. It is not primarily:
- an *orientation* page in the Grade Hub sense (Grade Hubs orient across three heterogeneous strands with genuinely different content types; the Skills Hub's 12 families are homogeneous — all are "reusable spelling concept" destinations, so there is no cross-strand relationship to synthesize the way a Grade Hub must synthesize Core/HFW/Themed);
- a *taxonomy explanation* page (per `SKILLS_MODEL.md` §1, the internal taxonomy should stay mostly invisible to the public);
- a *family-level synthesis* page in the sense the Grade-Strand Gateway is (that page type exists specifically because Core/HFW/Themed each need a "how do these members relate as a group, and where do I start" treatment a thin Hub can't carry — see §8 for why the Skills Hub's families don't need the equivalent).

It is a **browse/discovery interface functioning as a canonical directory**, with just enough family-level framing (§9) to help a reader who recognizes a category but not yet a specific Skill title choose correctly, and no more.

---

## 6. Unique responsibility of the Skills Hub

**Owns, and no other page owns:**
- The complete, canonical, single list of all 41 Skills grouped by family, in frozen public order — the one page a reader or crawler should trust as the complete Skill directory (mirroring, at one layer, the same "unconditional completeness" role a Grade-Strand Gateway plays for its member pages, per that standard's own duplication table).
- The 12-family grouping itself as a *browsable structure* — no other page presents the family taxonomy to a public reader.
- The single outbound bridge from skill-first discovery to grade-first discovery (§11) — no Skill page and no family section should individually carry this; it's a Hub-level, once-stated fact.

**Must not own:**
- Any individual pattern's mechanics, examples, exceptions, or teaching routine — that is exclusively the canonical Skill page's job (`CANONICAL_SKILL_PAGE_STANDARD.md` §2).
- A grade-by-grade curriculum sequence — that is the Grade Hub/Grade-Strand Gateway/Grade Unit layers' job; the Skills Hub is explicitly grade-neutral (`CONTENT_MODEL.md` §3: "A Skill must not be owned by one grade").
- Practice itself — no word list, no practice CTA, matching the frozen rule that only a Grade Unit's Practice Set launches `/play` (`CONTENT_MODEL.md` §4).

---

## 7. Current-page audit

Classified per element, semantic/IA grounds only (not visual aesthetics), per the task's explicit instruction.

| Element | Classification | Rationale |
|---|---|---|
| H1 ("Spelling Practice by Skill") | **KEEP** | Accurately names the page's job; matches the "Choose Specific Practice" journey's plain-language framing (`CONSTITUTION.md` §3.3 explicitly leaves the exact label untested/undecided, but this one is clear and non-technical). |
| Intro copy (2 sentences) | **KEEP BUT REFINE** | Correctly short and non-taxonomic. Could more directly state the reader question (§5) and gesture at the grade-browsing alternative earlier — see §11 on placement. |
| Explanation of "browsing by skill" as a concept | **KEEP BUT REFINE** | Currently implicit only (the intro's first sentence functions as this). A single additional clause distinguishing "you already know the pattern" from "you want a grade sequence" would resolve §11's requirement without adding a new section. |
| Family headings (H2 × 12) | **KEEP** | Correct unit of grouping; matches the frozen taxonomy exactly (§4). |
| Family descriptions (`description` + `guidance`, concatenated) | **KEEP BUT REFINE** | Structurally sound (every family has one), but eleven of twelve currently read as a shared template with nouns swapped ("Practice X." / "Choose the Y your child needs to practice.") — see §9 for the required contract. Silent E is the sole family with materially differentiated guidance today (its Long E clause), proving the pattern is achievable, not that it's already done everywhere. |
| Individual Skill links (41 × `<a>`) | **KEEP** | This is the central, load-bearing element of the page and the subject of §8's direct-link validation. |
| Descriptions accompanying individual Skill links (reused Skill-page `description` field) | **KEEP BUT REFINE** | Reusing the canonical Skill's own `description` avoids inventing a second description to maintain, which is efficient — but that field was written for the Skill page's own `<meta description>`/search-snippet purpose (`CANONICAL_SKILL_PAGE_STANDARD.md` §17), not for a Hub list-item context, and several are already long enough to read as a mini-abstract rather than a scan-friendly directory line (`short-a-words.md`'s `description` is 32 words). See §10 for the standard this element should meet. |
| Family ordering | **KEEP** | Frozen by `SKILLS_ARCHITECTURE.md` §4; not an editorial decision this document or a future Hub redesign should touch. |
| Skill ordering within family | **KEEP** | Same — frozen. |
| Grade references | **KEEP (absence is correct)** | The Hub currently carries no grade metadata per Skill link, which is correct: Skills are explicitly grade-neutral (`CONTENT_MODEL.md` §3), and a grade badge risks implying ownership by one grade. No change recommended (§9, §10 discuss whether grade-range info belongs here at all — verdict: no). |
| Navigation to grade browsing | **KEEP BUT REFINE** | Present today as one closing sentence ("Not sure what to choose? Browse by grade."), linking to `/#grades`. Correct in kind; see §11 for placement/wording refinement (a link earlier, near the opening, in addition to or instead of only at the very end, may serve readers who land skill-first but actually wanted grade-first). |
| Metadata (`<title>`/`<meta description>`) | **KEEP BUT REFINE** | Present and accurate today, but static rather than data-driven (hand-written strings in the `.astro` file rather than composed from `SPELLING_SKILL_FAMILIES`/count data) — a minor implementation-quality note, not a content defect. |
| Structured data (`BreadcrumbList` + `ItemList`) | **KEEP BUT REFINE** | `BreadcrumbList` is correct as-is. The flat `ItemList` (41 items, no family nesting) is evaluated in depth in §15 — recommendation is to evaluate nested representation, not to remove it. |
| Footer/nav relationships | **DEFER TO FUTURE VISUAL DESIGN** | `SiteHeader`/`SiteFooter` presence and styling are visual-layer concerns outside this document's semantic-content scope. |

No element was found that should be **REMOVE**d outright or that requires a wholly new **ADD**ed section beyond the refinements above — consistent with §18's "sound but underdeveloped" conclusion.

---

## 8. Direct Skill-link architecture

**The task's working hypothesis is validated: `/skills` should continue to expose direct links to canonical individual Skill pages, organized by Skill Family, with no intermediate Skill Family Gateway layer.** This is evaluated, not assumed, against each of the named considerations:

**Discoverability.** A Skill Family Gateway would add a click between the Hub and every one of the 41 destinations without adding proportional value, because — unlike a Grade-Strand Gateway — a Skill family has no genuine cross-member synthesis to carry. The Grade-Strand Gateway's actual justification (per its own research doc §11.2) is that Core is a genuine *ordered sequence* worth narrating, HFW has a genuine *cumulative inventory* worth stating, and Themed has a genuine *selection-among-peers* problem worth helping with. A Skill family has none of these: its members are usually either (a) a small set of parallel, non-sequential variants of one linguistic idea (Short A/E/I/O/U; SH/CH/TH/WH; AR/OR/ER-IR-UR) where there is no "which comes first" question worth a dedicated page to answer, or (b) a single-skill family (Multisyllabic Words, Greek and Latin Roots) where a gateway would definitionally have nothing to synthesize across, since there is only one member. `SKILLS_ARCHITECTURE.md` §4 itself states this explicitly for the two single-skill families: rendering them "as a single direct destination rather than an extra family-level page whose only job would be to link to its one child" is a deliberate simplification, not an oversight.

**Crawl depth.** Home → Skills Hub (1 click) → Skill page (2 clicks) is shallower than the grade-first Home → Grade Hub (1) → Gateway (2) → Member (3), and this asymmetry is *architecturally correct*, not an inconsistency to fix, because the two hierarchies solve different problems: the grade-first hierarchy must partition 105 member pages into three heterogeneous strands per grade (36 partitions total) before a reader can find one, while the skill-first hierarchy needs only one partition (12 families) to reach any of 41 destinations. Inserting a third hop would make the shallower, already-adequate hierarchy artificially deep to match a pattern designed to solve a harder partitioning problem it doesn't have.

**Internal linking / topical-authority graph.** A direct-link model produces a clean two-level semantic graph — `/skills` → 12 family anchors → 41 Skill pages — which is exactly the shape `ItemList`/breadcrumb structured data represents well (§15) and exactly the shape a search or answer engine can traverse without an extra, content-thin hop. Inserting a gateway page per family would create 12 new pages whose primary content (per the No-Gateway Rule test, `CONSTITUTION.md` §11) would have to independently clear the "real value for its primary user intent" bar — and for the single-skill and small (2–3 member) families, it plainly could not, since there would be nothing to say beyond re-listing the same 1–3 links the Hub already shows.

**Cognitive load.** A flat, divided list of 2–8 links per family (median family size is 3; the largest, Vowel Teams, has 8) is well within ordinary scanning capacity for a parent browsing a directory — this is not the kind of list-length problem that motivated removing member cards from Grade Hubs (which had 11–25 items *per strand*, three strands, no grouping). The Skills Hub is already the "gateway-equivalent" page for its own hierarchy: it *is* the layer that groups, the same job a Grade-Strand Gateway does one layer down in the other hierarchy. Recreating that job a second time inside the Skills Hub's own families would be duplicating the Hub's own function against itself.

**Scalability.** The taxonomy is frozen at 12 families/41 Skills (`SKILLS_ARCHITECTURE.md` §7: "the architecture itself has no open questions... all 41 canonical destinations now have content"). There is no near-term scaling pressure this document is aware of that would justify pre-building a gateway layer for growth that isn't planned. If the taxonomy is ever revisited, that would be a taxonomy decision (out of scope here), not a Hub-presentation decision.

**Accessibility.** A flat, semantically-grouped (`<section>`/`<h2>`) link list is more accessible than an equivalent gateway-per-family model, which would force an extra keyboard/screen-reader traversal step for every single Skill reached, with no compensating orientation value for most families (single-skill and 2-member families especially).

**Duplication.** The clearest disqualifying case against a gateway layer: for the two single-skill families and the three 2-member families (Consonant Blends, Prefixes, Homophones and Commonly Confused Words — 5 of 12 families, 41% of all families), a gateway page's entire content would necessarily restate what the Hub section already says, since there is nothing at the family level to add that isn't already said in one or two sentences today.

**Conclusion:** the direct-link, no-gateway model is correct on every dimension evaluated, not merely inherited from convenience. The single legitimate remaining question is whether family-level content (§9) is developed enough to make the "browse by family" step meaningfully more than a label — which is a content-depth question the next section addresses, not an architecture question this section leaves open.

---

## 9. Skill-family content standard

**What each family section should do, without becoming a miniature Skill article:**

A family section's job is **orientation and differentiation among its own members**, not concept teaching. Concretely, a family's synthesis content should answer, briefly:

1. **What concept unites this family?** One sentence naming the shared linguistic idea (e.g., "adjacent consonants where both sounds are heard" for Consonant Blends — already present almost verbatim in the live `description` field for that family).
2. **What distinguishes the members from each other?** Enough to help a reader who knows the family but not yet which member they need choose correctly — e.g., "beginning" vs. "ending" position for blends; which vowel sound for Short Vowels; which two letters spell the same sound for Vowel Teams.
3. **When would a parent browse this family?** An implicit answer through plain framing ("choose the vowel sound your child needs to practice") rather than an explicit "when to use this" paragraph — the existing `guidance` field already does this compactly and correctly in form, if not always distinctively in content.
4. **How does it fit into spelling development broadly, if that context is genuinely useful?** Optional, and only where it adds real orientation value without becoming a curriculum summary — e.g., Silent E's existing Long E clause is a good model: it resolves a real "why isn't Long E here" question concisely, not a general "spelling develops in this order" explanation, which would drift toward the Grade Hub/Gateway's job.

**Determinations:**

- **Does every family need authored intro copy?** Yes — every family already has a `description` and `guidance` string, and none should be blank or auto-generated from the Skill list alone; a bare list of links with no framing at all would fail the "why am I looking at this group" test for a reader who lands on the page without prior context.
- **Approximate semantic depth.** One to two sentences of framing per family, roughly the length already present, is correct and should not be significantly expanded. This is deliberately much shallower than a Grade-Strand Gateway's synthesis (which must narrate a real sequence or a real cumulative inventory) — a Skill family usually has neither.
- **Should descriptions be unique per family, not a shared template?** Yes, explicitly. The current pattern — `"Practice {noun phrase}." "Choose the {dimension} your child needs to practice."` — is close to templated for 11 of 12 families (only Silent E currently diverges meaningfully, with its Long E clause). This is this section's central, actionable finding: family copy should read as if written for that specific family's actual distinguishing quality (e.g., naming the real reason Consonant Blends differs from Consonant Digraphs — sounds stay separately audible vs. fuse into one sound — the same contrast `CANONICAL_SKILL_PAGE_STANDARD.md` §4.1 already requires *within* the Beginning Blends Skill page itself), not a mad-libs template with the family noun swapped in.
- **Data-driven vs. editorially authored?** Editorially authored, same as today — the count of members and the frozen order are the only parts that should be treated as derived/structural; the framing sentences are genuinely editorial content and should be written, not generated.
- **Are member counts useful?** Marginally, and optional — a bare "(5 skills)" style count adds little beyond what a reader can see by scanning the list itself (unlike a Grade-Strand Gateway, where the count is a genuine synthesis fact about an inventory the reader can't otherwise see at a glance, because member cards were removed). Not required; may be included inline in prose if it reads naturally, never as a separate stat badge (consistent with the site-wide "counts inline in prose, never as a UI stat element" pattern already established at the Grade Hub/Gateway layers).
- **Is grade-range info useful or misleading at the family level?** **Misleading — do not add it.** A family like Vowel Teams spans Grade 1 (AI/AY, EE/EA, OA/OW) through Grade 2 (OI/OY, OU/OW, IE/IGH, OO, AU/AW) members with no single "this family belongs to grade N" fact that wouldn't misstate the family's actual grade-neutral identity (`CONTENT_MODEL.md` §3's core rule: "A Skill must not be owned by one grade"). A family-level grade range would risk exactly the "grade metadata treated as page identity" anti-pattern `CONSTITUTION.md` §14 warns against, one level up.
- **Should family summaries mention individual patterns by name?** Only incidentally, where it aids differentiation (e.g., naming "sh, ch, th, wh" briefly for Consonant Digraphs is differentiation, not duplication) — never to the point of explaining how a pattern works, which is exclusively the Skill page's job.
- **What belongs exclusively on individual Skill pages, never here?** Everything in `CANONICAL_SKILL_PAGE_STANDARD.md` §3's required-elements table: bounded scope statements, full concept explanation, "what to notice," mistakes/exceptions, teaching routines, diagnostic responses, "signs of security," curriculum placement, and FAQs. None of this belongs at the family level even in summary form.

**Reusable content contract (presentation-independent):** each family section = **one short paragraph** (roughly 20–45 words, matching the live pattern's approximate length) containing (a) the shared concept in plain language, (b) enough differentiation among members that a reader can select correctly, and (c) — only when genuinely needed — one clause resolving a real "why isn't X here" or "how does this relate to Y" question specific to that family. No fixed sentence-count template should be enforced across all 12; some families (single-skill, or with an unusually clean distinguishing test) may need less; none should need substantially more.

---

## 10. Individual Skill-entry content standard

**Current state audited:** the Hub currently pairs every Skill's `title` with its frontmatter `description` — the same string that also feeds that Skill page's own `<meta description>` (`CANONICAL_SKILL_PAGE_STANDARD.md` §17). This is efficient (no second field to maintain) but not purpose-built for a directory-list context: `short-a-words.md`'s `description` is a 32-word sentence written to summarize the whole page for a search snippet, not to help someone scanning a list of 5 sibling short-vowel links pick the right one quickly.

**Determination — what a Hub entry needs:** **title + a concise, differentiating description**, not title-only and not the full search-snippet description reused verbatim. Reasoning:

- **Title-only** would fail usability: several sibling titles within a family differ by only one letter or word (Short A/E/I/O/U Words; AR/OR/ER-IR-UR Words), so a reader benefits from at least a few differentiating words, not just the bare pattern name.
- **The full existing `description` field**, reused as-is, is longer than a directory line needs and is optimized for a different job (search-result summary) — it is *usable*, not *wrong*, but it is not the ideal-length unit for this specific placement.
- **Pattern examples inline in the Hub list** would begin duplicating the Skill page's own demonstration set (`CANONICAL_SKILL_PAGE_STANDARD.md` §5) — a directory entry should tell a reader *that* examples exist and roughly *what kind* of pattern this is, not reproduce them.
- **Grade info on the entry** — rejected for the same reason as at the family level (§9): Skills are grade-neutral by design, and per-entry grade badges would misstate that identity for Skills that span multiple grades.

**What a differentiating entry-level description must accomplish:** in roughly one short clause or sentence, name the specific sound/pattern/concept distinctly enough from its siblings that a reader who already knows the family can select correctly without opening the page — functionally the "elevator differentiation," not a summary of the whole page.

**What it must avoid:** restating the family description (redundant one line below); introducing a technical term not already used in the family framing; claiming completeness ("everything about X"); or growing long enough to compete with the family's own paragraph for visual/scanning priority.

**Demonstrating the standard (1–2 examples, not a full rewrite — per the task's explicit instruction not to rewrite all descriptions):**

- **Short A Words**, current Hub-rendered text (reused `description`): *"How to recognize, group, and teach the short 'a' sound — the quick vowel in cat, hat, and pan — with word families, what to notice, and common mix-ups, for parents, teachers, and tutors."* This is accurate but written for a search snippet — the "for parents, teachers, and tutors" clause and "with word families, what to notice, and common mix-ups" clause are search-completeness framing, not directory differentiation.
- **A directory-appropriate alternative** (illustrative only, not a directive to rewrite the field): *"The short, quick vowel sound in cat and hat — the first vowel pattern most children practice."* This keeps the differentiating fact (which vowel, with concrete examples) and drops the meta-framing that belongs to the search-snippet context, not the directory-list context.

This illustrates the target without asserting that every one of the 41 entries must be individually rewritten as part of this research — that is future editorial work, scoped by whatever standard eventually adopts this section's conclusion (§22).

---

## 11. Grade browsing vs. skill browsing

**Should `/skills` explain the distinction, and where?** Yes, briefly, and the explanation should appear **near the opening**, not only as a closing afterthought as it does today. The conceptual distinction worth conveying (not necessarily this exact wording) is close to:

> Browse by grade when you want a sequenced, grade-level learning path. Browse by Skill when you already know which sound or pattern to practice.

This directly operationalizes `CONSTITUTION.md` §3.2 vs. §3.3's own framing of the two journeys ("Show me a sensible grade-level learning path" vs. "I know what we need to practice") — the Hub should make this same distinction legible to a reader who may have arrived at `/skills` by mistake (wanting a grade sequence) or who would benefit from knowing the alternative exists.

**Should `/skills` link to grade browsing, and where?** Yes — the existing closing-sentence link to `/#grades` should be kept (it costs nothing and serves a reader who reaches the bottom without finding what they wanted), but an **earlier** mention — ideally folded into the opening orientation paragraph itself, one clause, not a second section — better serves a reader who would benefit from redirecting immediately rather than scrolling through 12 families first. This is a refinement of placement and wording, not a new element (§7 already classifies this KEEP BUT REFINE).

**Should Grade Hubs link back to `/skills`?** No — this mirrors and confirms the frozen finding already established one layer down: `CANONICAL_GRADE_HUB_STANDARD.md` §8 states explicitly "Skills: Grade Hub → Skills linkage is not a Grade Hub responsibility. Skills remain a parallel, skill-first navigation system, not a child of a Grade Hub," and its research doc §9.3 gives the reasoning (Skills sit alongside, not beneath, Grade Hubs; extending a link there would invent a new cross-layer relationship with no positive evidence for it). This research does not reopen that finding — it is frozen from the Grade Hub side and this document treats it as settled. Global site navigation (header/footer, out of this document's scope) is the appropriate place for a persistent, symmetric Grades ↔ Skills relationship, not page-body content on either page family.

**Respecting the frozen parallel-system decision:** nothing in this section's recommendation treats Skills as a child of, or gateway into, the grade-first hierarchy, or vice versa — both links described here are peer-to-peer wayfinding between two parallel top-level journeys, consistent with `CONSTITUTION.md` §4's explicit statement that "these systems must not automatically become top-level navigation" hierarchies subordinate to one another.

---

## 12. Educational analysis

Evaluated through a structured-literacy lens, strictly bounded to spelling (per this task's explicit scope restriction — no reading comprehension, vocabulary, handwriting, or general grammar).

**Does the family organization communicate a coherent spelling knowledge system?** Broadly yes, and this is a genuine strength worth preserving rather than an accident: the 12 families correspond closely to a standard structured-literacy progression — phoneme-level closed-syllable spelling (Short Vowels, Digraphs, Blends) → common single-syllable conventions (Common Spelling Patterns) → long-vowel patterns (Silent E, Vowel Teams) → r-controlled vowels → multisyllabic strategies → morphology (Word Building and Endings, Prefixes, Greek and Latin Roots) → meaning-based spelling (Homophones and Commonly Confused Words). `SKILLS_ARCHITECTURE.md`'s own construction process (§1) cites Orton-Gillingham, Words Their Way, UFLI, and Fundations scope-and-sequence conventions directly, so this is not merely a coincidental resemblance.

**Does the Hub risk pretending to be a complete sequential curriculum?** Currently, no — and this must be actively preserved, not merely assumed safe. The Hub's family order happens to roughly track a developmental progression, which creates a real risk that a family redesign could accidentally start implying sequence (e.g., numbering families 1–12 as if they were "step 1, step 2...") where none is claimed. The current implementation avoids this correctly: no numbering, no "start here and work through" framing beyond the single "start with short vowels" nudge in the intro (which is a reasonable, bounded suggestion, not a claimed sequence). Any future content work must preserve this — the grade curriculum, not the Skills Hub, owns sequence (`CONTENT_MODEL.md` §3; `SKILLS_MODEL.md` §2).

**General external/educational-knowledge note (not a repository fact):** per general structured-literacy scope-and-sequence convention, presenting spelling patterns grouped by shared linguistic feature (sound-spelling correspondence, common convention, morphology, meaning) rather than by grade or by frequency is itself pedagogically defensible as an organizing principle for a *reference* directory — it mirrors how many structured-literacy programs organize their own skill-reference materials, distinct from (and complementary to) their grade-paced lesson sequence. This supports the family-taxonomy shape generally; it is general knowledge, not a specific citable source.

---

## 13. SEO/topical-authority analysis

**What broad territory should `/skills` own, relative to the 41 narrower Skill pages?** `/skills` should own the entity/topic territory of "the complete public directory of spelling skills/patterns taught K–5 on this site" — a hub-level topical claim, not a claim to explain any pattern itself. Concretely: broad, unqualified queries like "spelling skills," "spelling patterns list," "K-5 spelling concepts" are the Hub's legitimate territory; queries naming a specific pattern ("short a words," "consonant blends spelling") belong to the narrower Skill or family-adjacent pages. This mirrors, one layer up, the same intent-ownership logic already validated for the Grade Hub vs. Gateway vs. Member layers in the Grade-Strand Gateway research (§8 there) — broad/aggregate intent to the broadest page, narrow/specific intent to the narrowest page, with the middle layer (here, the family section, not a separate page) owning the "which broad-family umbrella does my specific interest fall under" middle ground.

**No keyword stuffing; unique informational value beyond a link directory.** The Hub's unique, non-duplicative value is exactly the family-level differentiation content specified in §9 — a reader (or crawler) gets *organizing information* ("these are the families, and here's what distinguishes members within each") that exists nowhere else on the site, since no Skill page explains its own family's internal structure (that would itself be a duplication risk the Skill Page Standard would reject). This is the Hub's legitimate "more than a link directory" claim, and it should not reach further than that — inventing broader spelling-pedagogy content (e.g., "why spelling matters," general phonics essays) would exceed the Hub's actual job and risk the exact anti-pattern rejected in §20.

**Internal linking as a semantic graph.** The intended graph is exactly: `SpellingWords.app` (site root / homepage) → `/skills` (Skills Hub) → 12 family sections (in-page anchors, not separate pages, per §8's conclusion) → 41 canonical Skill pages → (via each Skill's own `skillIds` reverse lookup and `relatedLists`/`prerequisiteLists`/`nextLists`) → relevant Grade Units and sibling Skills. This is a clean, shallow, two-hop graph from the Hub to any Skill, with the richer cross-referencing (Skill ↔ Grade Unit, Skill ↔ Skill) correctly delegated to the Skill-page layer itself, not duplicated at the Hub.

---

## 14. GEO/AEO analysis

Applying this task's explicit instruction not to recommend content or schema solely because "LLMs like it" — the same discipline already applied at the Grade Hub and Grade-Strand Gateway layers in their own research documents (both of which found "no case for any [layer]-specific AI-optimization tactic beyond what plain, well-structured, accurate content already provides").

**What genuinely makes `/skills` useful/citable to an AI answer system:** exactly the same things that make it useful to a human skimmer — an accurate, complete, well-labeled directory of family names and member Skill titles, with enough differentiating text per family and per entry (§9, §10) that an answer engine excerpting the page could correctly state "SpellingWords.app organizes spelling skills into 12 families, including X, Y, Z" without needing to infer structure from an undifferentiated flat list. This is a byproduct of doing the ordinary content work well, not a separately engineered "AI-facing" feature.

**Explicitly not recommended, and why:**
- **Hidden or AI-only summary blocks** — no evidence anywhere in this research (or in the two analogous, more thoroughly AI-research-sourced layer documents this document builds on) supports these; they would also violate `CANONICAL_SKILL_PAGE_STANDARD.md` §15's explicit rejection of "hidden text aimed at crawlers or AI systems rather than readers," which this document treats as the site's settled position at every content layer, including this one.
- **`llms.txt`-driven content decisions** — the Grade-Strand Gateway research already investigated this directly and found Google's own documentation states no special AI-facing files are used by Google Search, with Google personnel on record rejecting `llms.txt` specifically; this document adopts that same finding rather than re-investigating it, since nothing about the Skills Hub changes the underlying facts about how these files are (not) used.
- **Schema added "for AI"** — see §15; any structured-data recommendation in this document is justified by matching visible content, never by an LLM-specific rationale.

---

## 15. Structured-data analysis

**Current structured data on `/skills`, read directly from source** (`src/pages/skills/index.astro`):

- `BreadcrumbList`: `Home → Skills` (2 items). Accurate to the visible breadcrumb; no change needed.
- `ItemList`: `name: "Spelling Practice by Skill"`, `numberOfItems` = 41 (every resolved Skill entry across all 12 families), `itemListElement` = a single flat array of 41 `ListItem`s (`url` + `name` per Skill), position numbered 1–41 continuously across family boundaries — the family grouping visible on the page (12 `<h2>` sections) is **not** represented in the structured data at all today.

**Does the existing schema match the visible hierarchy?** Partially. The flat `ItemList` correctly represents "this page links to 41 things," which is true and matches the visible link count, but it does not represent the two-level structure (12 families, each containing several Skills) that is the page's actual visible organizing principle — a reader sees family groupings; the structured data sees one undifferentiated list.

**Recommendation — evaluate nested representation, do not add by default.** Per Schema.org's general `ItemList` guidance, an `ItemList` is meant to describe "a list of related items" as they actually appear; where a page visibly groups items into subsections, a more accurate representation nests that grouping (either via multiple `ItemList`s, one per family, or via `ItemList`-of-`ItemList`s / an `ItemList` whose items are family-labeled sub-groups) rather than flattening it. This document recommends that a future implementation **evaluate** (not commit to sight-unseen) representing the 12 families as the primary structural unit in structured data — e.g., 12 `ItemList`s (one per family, matching the visible sections) rather than 1 flat 41-item list — because that would make the structured data actually reflect the page's real visible hierarchy, consistent with `CANONICAL_GRADE_UNIT_PAGE_STANDARD.md`'s general principle (cited in the Gateway research, §16 there) that "structured data must reflect visible page content exactly." This document does not mandate the exact JSON-LD shape (multiple `ItemList`s vs. a nested structure vs. keeping one flat list with an added grouping property) — that is an implementation decision for whoever builds the frozen standard, informed by whichever schema.org pattern best matches the eventual chosen markup, not frozen here.

**`FAQPage`:** **not recommended by default**, matching every other layer's frozen policy (`CANONICAL_GRADE_HUB_STANDARD.md` §9, `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §2) — no genuine, non-generic FAQ content is proposed anywhere in this document for the Hub (§20 explicitly rejects manufacturing one), so no `FAQPage` schema should exist either.

**No schema not corresponding to visible content.** This document does not recommend any schema type (`CollectionPage`, `WebPage`, `Course`, etc.) beyond evaluating the `ItemList` nesting question above — consistent with this task's explicit instruction and with the pattern already set at the Grade Hub and Gateway layers, both of which explicitly declined to add unproven schema types.

**Separation of recommendation types, made explicit per the task's instruction:**
- *Semantic architecture recommendation:* keep the 12-family grouping as the page's primary structural unit (already true).
- *Schema recommendation:* evaluate representing that same 12-family grouping in structured data, rather than flattening it (not yet true; a gap, not a defect requiring urgent fix).
- *Visual presentation recommendation:* none — how families are visually distinguished (cards, accordions, columns) is explicitly out of scope (§19).

---

## 16. Skills Hub vs. Skill page responsibility boundary

| Information | Skills Hub | Family section | Individual Skill page |
|---|---|---|---|
| Concept definition (what the pattern *is*) | ❌ | ❌ (only enough to differentiate members, §9) | ✅ owns fully |
| Family definition (what unites this group) | ❌ (only names families exist) | ✅ owns | ❌ (never re-explains family membership) |
| Individual spelling-rule explanation | ❌ | ❌ | ✅ owns exclusively |
| Examples (word lists, demonstration sets) | ❌ | ❌ | ✅ owns exclusively (demonstration set + instructional example system) |
| Common mistakes | ❌ | ❌ | ✅ owns exclusively |
| Teaching guidance (routine, diagnostic response) | ❌ | ❌ | ✅ owns exclusively |
| Grade relevance | ❌ (Skills are grade-neutral at every layer) | ❌ | ✅ owns, via the reverse `skillIds` "Where this fits in the curriculum" lookup only — never a claimed single grade |
| Practice links | ❌ (no practice CTA anywhere in the skill-first hierarchy) | ❌ | ❌ — a Skill page routes to the Grade Unit(s) that assign practice; it does not launch practice itself (`CONTENT_MODEL.md` §4) |
| Related Skills | ❌ | ❌ (differentiation among its own members only, not cross-family relationships) | ✅ owns, via `relatedLists`/`prerequisiteLists`/`nextLists` |
| Taxonomy/browse relationships (which family this Skill belongs to; which Skills are siblings) | ✅ owns — the only page that presents the full taxonomy as a browsable structure | ✅ (locally, for its own members) | ⚠️ may mention its own family in prose (per `CANONICAL_SKILL_PAGE_STANDARD.md` §12: "Parent Skill family → contextual mention in prose; the Skills Hub... is the actual family-navigation surface, not a per-page field") but does not own the family's definition |

---

## 17. Target semantic architecture

A presentation-independent semantic wireframe — heading hierarchy and content blocks, not visual components — derived from this research's findings above, not a copy of the task brief's illustrative skeleton:

```
Breadcrumb: Home → Skills

H1: [page title naming the skill-browsing journey]

Orientation block (no heading required; opening paragraph(s)):
  - States the governing reader question in plain language (§5)
  - Distinguishes skill-first browsing from grade-first browsing in one clause,
    with an early link to grade browsing (§11) — not only a closing link
  - Optionally names a reasonable starting point for a reader with no
    prior signal (e.g., "start with short vowels") — bounded, not a claimed
    universal sequence (§12)

For each of the 12 canonical families, in frozen order (§4), a family block:
  H2: [Frozen family title]
  Family synthesis paragraph (§9's content contract):
    - names the shared concept
    - differentiates members from each other
    - optionally resolves one real "why/how" question specific to this family
  List of direct links to every member Skill, in frozen order:
    - Skill title (exact canonical title, unmodified)
    - a concise, differentiating entry description (§10) — distinct from,
      and shorter than, that Skill page's own <meta description>
    - no grade badge, no example word list, no practice CTA

Closing or structural element (not necessarily prose):
  - A route to grade browsing, restated or reinforced if not already
    satisfied by the earlier orientation-block mention (§11)

Structural data layer (not visible content):
  - BreadcrumbList matching the visible breadcrumb
  - Structured data reflecting the 12-family grouping as the primary
    structural unit, evaluated for the best-fit schema.org shape (§15)
  - No FAQPage; no schema without matching visible content
```

This wireframe intentionally omits any grade-range indicator, member count badge, FAQ section, or any content element rejected in §20 — their absence here is deliberate, not an oversight.

---

## 18. Current vs. target comparison

| Dimension | Current | Target | Verdict |
|---|---|---|---|
| Overall architecture (breadcrumb → H1 → orientation → 12 family sections → grade-browsing link) | Present | Same | **Remains unchanged** — the architecture is already correct |
| Family grouping and order | 12 families, frozen order | Same | **Remains unchanged** |
| Direct-Skill-link model (no gateway layer) | Present | Same | **Remains unchanged**, now explicitly validated rather than merely inherited (§8) |
| Family synthesis copy | Largely templated (11/12 families) | Differentiated per family (§9) | **Rewritten** — the central editorial gap |
| Individual entry descriptions | Reused Skill-page `description` verbatim | Concise, directory-purpose-built differentiation (§10) | **Rewritten** — secondary editorial gap |
| Grade-browsing link placement | Closing sentence only | Early mention + (optionally retained) closing link (§11) | **Refined**, not newly added |
| Metadata (`<title>`/description) | Static, accurate | Same content, optionally data-derived | **Minor implementation refinement**, not a content change |
| `BreadcrumbList` schema | Correct | Same | **Remains unchanged** |
| `ItemList` schema | Flat, 41 items, no family nesting | Evaluate nested/grouped representation (§15) | **Newly evaluated gap** — not previously identified as incorrect, but not previously examined either |
| `FAQPage`, member counts, grade badges, practice CTA, etc. | Absent | Remain absent (§20) | **Confirmed absent by design**, not a gap |
| Visual presentation (cards, accordions, colors) | Current card-like styling | Unconstrained by this document (§19) | **Explicitly deferred**, future visual-design-only concern |

**Is the current page architecturally sound-but-editorially-underdeveloped, or structurally broken?** **Architecturally sound but editorially underdeveloped.** No element requires removal; no new page-level section is missing; the direct-link, no-gateway, 12-family architecture is validated as correct (§8). The real work is textual: differentiate the family and entry copy, refine the grade-browsing link's placement, and evaluate — separately, as a schema question — whether `ItemList` should represent the family grouping.

---

## 19. Future visual-redesign constraints

All recommendations in this document must remain valid regardless of how a future visual redesign renders the page — as cards, as a simple list, as an accordion, as tabbed panels, with icons, without icons, in one column or several, on desktop or mobile. This document does not freeze, and a future visual pass remains free to decide:

- card design, borders, shadows, spacing;
- color treatment per family or per Skill;
- iconography (per-family or per-Skill icons);
- whether families render as always-expanded sections, an accordion, tabs, or a filterable list;
- CTA/link affordance styling (arrow glyphs, button vs. plain link, hover states);
- desktop vs. mobile layout differences, column counts, or responsive breakpoints;
- whether the 41-entry list is paginated, virtualized, or rendered flat (a technical/performance concern, not a content one).

The only structural requirement this document treats as load-bearing regardless of visual form is the **heading hierarchy** — one H1, one H2 per family, in frozen order — because that hierarchy is what makes the page navigable by assistive technology and legible to a crawler independent of any particular visual treatment. Everything else in §17's wireframe is expressible as plain content blocks that a future visual system can arrange freely.

---

## 20. Anti-patterns / rejected additions

Each evaluated and rejected with rationale, per the task's explicit list:

- **Giant FAQ section** — rejected. No genuine, non-generic FAQ content is proposed anywhere in this document; adding one would violate the same no-FAQ-by-default policy already frozen at the Grade Hub and Grade-Strand Gateway layers, and would risk restating content that belongs on individual Skill pages (which already carry their own, per-Skill FAQs where genuinely warranted, per `CANONICAL_SKILL_PAGE_STANDARD.md` §13).
- **Full explanations of every spelling rule** — rejected. This is precisely the duplication `CANONICAL_SKILL_PAGE_STANDARD.md` §2 forbids a Skill page's Hub-level surface from pre-empting; the Hub's family paragraphs (§9) are deliberately capped at differentiation, not explanation.
- **Grade-by-grade curriculum summaries on the Hub** — rejected. Skills are explicitly grade-neutral (`CONTENT_MODEL.md` §3); a curriculum summary belongs to the Grade Hub/Gateway layer, which already owns it, and repeating it here would misstate Skills' actual grade-independent identity.
- **"For Parents/For Teachers/For Students" duplicate sections** — rejected, consistent with the same rejection already made at the Grade Hub layer (`CANONICAL_GRADE_HUB_STANDARD.md` §11) and its stated rationale (`CONSTITUTION.md` §2 frames the product as serving parents and teachers through one unified experience, not audience-forked content).
- **Full K–5 progression maps** — rejected. Already explicitly deferred as "a site-wide feature, not this page's job" at both the Grade Hub and Grade-Strand Gateway layers; nothing about the Skills Hub changes that calculus, and a K–5 map would misrepresent Skills' grade-neutral identity in the same way a grade-range badge would (§9).
- **Arbitrary stats** (e.g., a "41 Skills across 12 Families!" badge treated as a marketing stat rather than plain inline prose) — rejected as a UI stat/badge element; a bare inline count in ordinary prose, if it reads naturally, is not itself objectionable (§9), but a promoted, boxed, or emphasized statistic is rejected as inconsistent with the site's calm, non-gamified tone (`CLAUDE.md`: "no timers, points, streaks... loud celebratory UI").
- **Keyword blocks** — rejected outright; no keyword-stuffing recommendation appears anywhere in this document (§13, §14).
- **Hidden AI summaries** — rejected (§14).
- **Excessive instructional prose** — rejected; §9's content contract explicitly caps family-level prose at one short paragraph.
- **Direct practice widgets** — rejected. No Skill page launches practice directly (`CONTENT_MODEL.md` §4); the Hub, one layer further from practice, certainly should not either.
- **New taxonomy levels** — rejected. This document does not propose any addition to the frozen 12-family/41-Skill taxonomy.
- **Skill Family Gateway pages** — rejected, at length, in §8. This is the single most consequential rejection in this document and is treated as the central architectural finding.

---

## 21. Repository conflicts and required reconciliations

**Conflicts found, checked against every named authority:**

1. **Family-title mismatch** (§4): `SKILLS_ARCHITECTURE.md` names Family 1 "Short Vowels and CVC Words"; the live, tested code (`spellingSkills.ts`, locked by `spellingSkills.test.ts`) renders "Short Vowels." **Controlling authority:** per `CONSTITUTION.md` §17's documentation-precedence hierarchy, `SKILLS_ARCHITECTURE.md` (an architecture document, tier 1-adjacent) would ordinarily control over an implementation detail — but per this task's own explicit instruction ("code wins" for the canonical inventory), and because the shorter "Short Vowels" title is what actually renders and is executable-test-locked, the live code is the operative public fact today. **Smallest reconciliation:** a future editorial pass should either (a) update the code's `title` string to match the architecture doc's full name, or (b) add a short note to `SKILLS_ARCHITECTURE.md` acknowledging the intentionally shortened public label — either resolves the ambiguity without touching frozen taxonomy content (family membership, order, or skill count are unaffected either way). This document does not choose between (a) and (b) — that is an editorial decision for whoever authors the frozen `CANONICAL_SKILLS_HUB_STANDARD.md`.
2. **No canonical family-description source text exists** (§4): `SKILLS_ARCHITECTURE.md` states each family's *purpose* in prose (§2) but never specifies an exact public-facing description string, leaving `spellingSkills.ts`'s `description`/`guidance` fields as original, unreconciled public copy. **Controlling authority:** none conflicts, because none exists at the doc level — this is a documentation gap, not a contradiction. **Recommended reconciliation:** the future frozen Skills Hub standard should adopt this research's §9 content contract as the authoritative source for family-copy requirements going forward, since no earlier document fills this role.
3. **`K5_CURRICULUM_COVERAGE.md`'s stale 4-family snapshot** (§4): explicitly marked `Superseded` at the top of that file; not a live conflict, reported only for completeness per the task's instruction to surface discrepancies.

**No frozen-authority file was modified to produce this document**, consistent with the task's explicit constraint.

**Docs/inventories that would eventually need a status update after a future Skills Hub implementation** (listed only, not updated here, per the task's explicit prohibition on editing `CONTENT_IMPROVEMENT_ROADMAP.md` and other roadmap/inventory docs as part of this research):

- `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md` §2 (Layer 4 definition) and §3 (Phase 4) — would need to reference the eventual frozen `CANONICAL_SKILLS_HUB_STANDARD.md` once it exists, the same way Phase 1 already references `CANONICAL_SKILL_PAGE_STANDARD.md`.
- `docs/content/inventory/skill-pages.md` — unaffected in content, but its introductory cross-reference list could eventually note the Skills Hub standard's existence alongside the Skill Page Standard it already cites.

---

## 22. Implementation implications

Informational only — nothing here is performed as part of this research task.

- **Family-copy rewrite:** 11 of 12 family `description`/`guidance` string pairs in `src/lib/content/spellingSkills.ts` would need editorial rewriting to satisfy §9's differentiation contract; this is a content change to existing `as const` string literals, not a schema or architecture change.
- **Entry-description standard:** deciding whether Hub entries continue reusing each Skill's `description` field verbatim, or whether a new, Hub-specific short field is introduced, is a real implementation choice with a schema implication (a new optional frontmatter field vs. continued field reuse) that a future standard would need to resolve explicitly — this document recommends the *content standard* (§10) but does not choose the *field-level implementation mechanism*.
- **Grade-browsing link placement:** a small `.astro` template change to surface the existing `/#grades` link earlier (or restate it) in addition to its current closing position.
- **`ItemList` nesting evaluation:** a schema-shape decision (§15) that would require choosing among several valid `ItemList`/nested-list JSON-LD patterns — deferred to implementation, not decided here.
- **Metadata data-derivation:** optionally compute `<title>`/`<meta description>` counts from `SPELLING_SKILL_FAMILIES` rather than hand-writing them, a minor DRY-ing of existing accurate content, not a content correction.
- **Family-title reconciliation** (§21 item 1): a one-line decision between updating the code string or annotating the architecture doc — small either way, but should be made deliberately rather than left ambiguous once a frozen standard exists.

---

## 23. Open questions

Genuine unresolved items for the human reviewer, not resolved by this research:

1. Should the family-title mismatch (§21 item 1) be resolved by lengthening the code's title back to "Short Vowels and CVC Words," or by treating "Short Vowels" as an intentional, permanent public shortening with `SKILLS_ARCHITECTURE.md` annotated accordingly? This research surfaces the discrepancy but does not have the authority (or a strong evidence-based reason) to pick one side.
2. Should individual Hub-entry descriptions get a dedicated frontmatter field, or continue reusing each Skill's existing `description`? §10 specifies the content standard either way, but the underlying schema decision (new field vs. field reuse) has real implementation cost and should be made explicitly by whoever authors the frozen standard.
3. Exactly what shape should the evaluated `ItemList` nesting (§15) take — multiple sibling `ItemList`s, one per family, vs. some other schema.org-valid nested pattern? This document deliberately leaves the specific markup open pending implementation-time evaluation.
4. Should the grade-browsing link's earlier placement (§11) be a rewritten first sentence, a second short sentence appended to the current intro, or a distinct small navigational element? This is bounded by §19 (presentation-independent) but the exact editorial execution is left to the future standard.

---

## 24. Final recommendation

The Skills Hub's direct-link, 12-family, no-gateway architecture should be **frozen as-is** in the eventual `CANONICAL_SKILLS_HUB_STANDARD.md` — it is validated, not merely inherited, against discoverability, crawl depth, cognitive load, scalability, accessibility, and duplication (§8), and no Skill Family Gateway layer should be introduced. The page's real, actionable work is editorial: replace the largely templated family-level copy with genuinely differentiated per-family synthesis (§9), define and apply a directory-purpose-built entry-description standard distinct from each Skill's own search-snippet description (§10), surface the existing grade-browsing link earlier rather than only at the page's end (§11), and evaluate — as a separate, bounded schema question — whether `ItemList` structured data should represent the visible 12-family grouping rather than one flat 41-item list (§15). None of this requires new pages, new taxonomy, new routes, or a visual redesign; the current page is architecturally sound but editorially underdeveloped, and the path from here to a frozen production standard is a content and structured-data refinement pass, not a rebuild.

**SKILLS HUB RESEARCH COMPLETE — READY FOR REVIEW**
