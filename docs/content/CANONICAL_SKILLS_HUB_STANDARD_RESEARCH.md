# Canonical Skills Hub Standard — Research & Proposed Model

**Status:** Research document. Proposes conclusions for a later, separate `CANONICAL_SKILLS_HUB_STANDARD.md`. Not itself a frozen editorial standard. No production code, route, taxonomy, curriculum, or Skill page was changed to produce this document.
**Scope:** the single canonical Skills Hub page at `/skills` (`src/pages/skills/index.astro`).
**Does not govern:** the 41 canonical Skill pages (`docs/content/CANONICAL_SKILL_PAGE_STANDARD.md`, frozen), the 6 Grade Hubs (`docs/content/CANONICAL_GRADE_HUB_STANDARD.md`, frozen), the 18 Grade-Strand Gateways (`docs/content/CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md`, frozen), the 105 grade-curriculum member pages, or visual design.

---

## 1. Executive summary

The Skills Hub (`/skills`) is the single top-level landing page for the site's third primary user journey — "I know what we need to practice" (`CONSTITUTION.md` §3.3). Unlike the grade-first hierarchy, which inserts a Grade-Strand Gateway layer between the Grade Hub and its member pages, the skill-first hierarchy is frozen at two hops: Skills Hub → canonical Skill page. This research validates, rather than assumes, that this shallower structure is correct, and concludes that it is: **no Skill Family Gateway layer should be created.** The working hypothesis stated in the task brief survives scrutiny against discoverability, crawl depth, internal linking, cognitive load, scalability, and accessibility, and is adopted as this research's recommendation (§8).

The current `/skills` implementation is architecturally sound and close to its target shape already: one H1, one short orientation paragraph, 12 family sections each with a short description and a flat list of direct links to canonical Skill pages, one line pointing to grade browsing, `BreadcrumbList` + `ItemList` structured data. Its central gap is not structural — it is that eleven of twelve family-level descriptions are a single generic template sentence pair ("Practice X." / "Choose the Y your child needs to practice.") that could be swapped between families with only nouns changed, which does not yet satisfy this document's proposed family-content-contract (§9). The page is **architecturally sound but editorially underdeveloped**, not structurally broken (§18).

This document also finds and reports (without silently correcting) a documentation/code discrepancy between the frozen `SKILLS_ARCHITECTURE.md` taxonomy and the currently-registered `SPELLING_SKILL_FAMILIES` data structure — Family 1's title differs between the architecture doc ("Short Vowels and CVC Words") and the live, tested code ("Short Vowels") — investigated via git history in this refinement pass and resolved with a specific recommendation to update the architecture doc (§4, §21).

**Verdict for this research pass:** the direct-Skill-link, family-grouped architecture should be preserved as the frozen target model for `/skills`; the outstanding work is editorial (family synthesis content per an editorial principle, not a fixed template; individual entry-description tightening within the existing reused field), a grade-browsing placement refinement, and a small `SKILLS_ARCHITECTURE.md` naming fix — not a redesign, and not (per this refinement pass's firm §15 conclusion) a structured-data change.

---

## 2. Scope and authorities

This document's factual claims are sourced from, in order of authority:

1. **Frozen project facts** — `docs/architecture/CONSTITUTION.md`, `docs/architecture/SKILLS_ARCHITECTURE.md`, `docs/architecture/SKILLS_MODEL.md` (subordinate to `SKILLS_ARCHITECTURE.md` for families/taxonomy, still governing for the Skill/Focused-Skill/Practice-Set model and editorial philosophy), `docs/architecture/PUBLIC_URL_ARCHITECTURE.md`, `docs/architecture/CONTENT_MODEL.md`.
2. **Repository-derived observations** — direct reads of `src/pages/skills/index.astro`, `src/pages/skills/[slug].astro`, `src/lib/content/spellingSkills.ts`, `src/lib/content/canonicalSkillRoutes.ts`, `src/lib/content/spellingSkills.test.ts`, `docs/content/inventory/skill-pages.md`, and representative Skill pages (`short-a-words.md` and others referenced throughout).
3. **General professional knowledge, held by this agent without live web access** — structured-literacy scope-and-sequence conventions, Schema.org's `ItemList`/`BreadcrumbList` type semantics, and WCAG heading-structure/accessibility guidance. Stated in prose as general principle, never attached to a fabricated specific citation or URL — a specific-looking but unverifiable citation would be worse than honest general-knowledge framing. No keyword research, search-query data, or measured AI-citation behavior was performed or is claimed anywhere in this document (see §13-14).
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

**Opening-framing wording check (this refinement pass).** The live page's opening ("choose a specific spelling sound or pattern") and this document's own earlier draft repeatedly used "sound or pattern" as shorthand for what the Hub covers. Checked against the actual 41-Skill library (§4), that phrase understates real breadth: the library includes phoneme-level sound patterns (Short Vowels, Digraphs), but also morphology (Word Building and Endings, Prefixes, Greek and Latin Roots), whole-word strategy (Multisyllabic Words), and meaning-based distinctions with no shared sound at all (Homophones and Commonly Confused Words — by definition these words already sound alike or are otherwise confused, so "sound or pattern" is actively inaccurate for that family). "Sound or pattern" is accurate for roughly half the taxonomy and misleading, not merely incomplete, for the rest. **Recommended framing vocabulary:** "spelling skill" or "spelling concept" — both are accurate across the full library (phonics, morphology, and meaning-based families alike), parent-readable, and no more jargon-heavy than the current phrase; "word-building concept" is accurate but skews toward the morphology families and reads oddly applied to Short Vowels, so it is not the primary recommendation. This document's own §5 governing-question refinement above already models the target vocabulary ("a specific spelling sound, pattern, or word-building concept") in the more careful context of a single sentence describing the whole library; the live page's shorter, repeated "sound or pattern" phrasing is the one that should change. The opening sentence should use "spelling skill" or "spelling concept" as its primary term, consistent with the page's own H1 ("Spelling Practice by Skill").

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
| Intro copy (2 sentences) | **KEEP BUT REFINE** | Correctly short and non-taxonomic. Could more directly state the reader question (§5) and the grade-browsing distinction/route (§11). The current "Start with short vowels..." nudge should be removed rather than kept — see §12's revised analysis. |
| Explanation of "browsing by skill" as a concept | **KEEP BUT REFINE** | Currently implicit only (the intro's first sentence functions as this). A single additional clause distinguishing "you already know the pattern" from "you want a grade sequence" would resolve §11's requirement without adding a new section. |
| Family headings (H2 × 12) | **KEEP** | Correct unit of grouping; matches the frozen taxonomy exactly (§4). |
| Family descriptions (`description` + `guidance`, concatenated) | **KEEP BUT REFINE** | Structurally sound (every family has one), but eleven of twelve currently read as a shared template with nouns swapped ("Practice X." / "Choose the Y your child needs to practice.") — see §9 for the required contract. Silent E is the sole family with materially differentiated guidance today (its Long E clause), proving the pattern is achievable, not that it's already done everywhere. |
| Individual Skill links (41 × `<a>`) | **KEEP** | This is the central, load-bearing element of the page and the subject of §8's direct-link validation. |
| Descriptions accompanying individual Skill links (reused Skill-page `description` field) | **KEEP** | Reusing the canonical Skill's own `description` is not merely efficient — on inspection across eight contrasting families (§10), the field already functions as workable, differentiating directory-scan copy in every case checked. A handful of entries carry excess search-snippet framing clauses worth tightening, but the field itself, not a new one, is the correct long-term source. See §10 for the full evaluation and final recommendation (Option C). |
| Family ordering | **KEEP** | Frozen by `SKILLS_ARCHITECTURE.md` §4; not an editorial decision this document or a future Hub redesign should touch. |
| Skill ordering within family | **KEEP** | Same — frozen. |
| Grade references | **KEEP (absence is correct)** | The Hub currently carries no grade metadata per Skill link, which is correct: Skills are explicitly grade-neutral (`CONTENT_MODEL.md` §3), and a grade badge risks implying ownership by one grade. No change recommended (§9, §10 discuss whether grade-range info belongs here at all — verdict: no). |
| Navigation to grade browsing | **KEEP BUT REFINE** | Present today as one closing sentence ("Not sure what to choose? Browse by grade."), linking to `/#grades`. The required element is the semantic route, not two link instances — see §11's revised recommendation (one clear mention near the opening that both establishes the grade-vs-skill distinction and serves as the route; exact count/placement left open, matching the Grade Hub standard's precedent). |
| Metadata (`<title>`/`<meta description>`) | **KEEP BUT REFINE** | Present and accurate today, but static rather than data-driven (hand-written strings in the `.astro` file rather than composed from `SPELLING_SKILL_FAMILIES`/count data) — a minor implementation-quality note, not a content defect. |
| Structured data (`BreadcrumbList` + `ItemList`) | **KEEP** | `BreadcrumbList` is correct as-is. The flat `ItemList` (41 items, no family nesting) is evaluated in depth in §15 — this refinement pass reaches a firm recommendation to retain it unchanged; the family hierarchy is already fully expressed in visible H2/section HTML. |
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

**Revised approach (this refinement pass):** the original draft of this section specified a 4-part sentence template (unifying concept / member differentiation / when to browse / optional developmental context). On reflection, mandating fixed ingredients for all 12 families risks reproducing the exact templated-sentence problem this document identifies as the page's central editorial weakness (§7, §18) — a 4-slot formula is still a formula, just a longer one, and would likely still fill 11 family paragraphs with structurally identical sentences differing only in nouns. This section is rewritten as an **editorial principle**, not a template.

**What each family section should do, without becoming a miniature Skill article:**

A family section's job is **orientation and differentiation among its own members** — not concept teaching. The purpose of family copy is narrow and testable: help a parent who has landed on this section quickly confirm *"yes, this family contains the kind of thing I'm looking for"* and, where the family has more than one member, tell those members apart well enough to click the right one. Everything else is optional and should be included only when it genuinely serves that purpose for that specific family, not by default.

That purpose implies different amounts of copy for different families, not a fixed shape:

- **Does every family need explicit member-differentiation language?** No. Some families are close to self-evident once named — Short Vowels' five members already differentiate themselves by the vowel letter in each title (Short A/E/I/O/U Words); little or no additional prose is needed to help a reader tell them apart, because the titles already do that work. Differentiation language earns its place only where the titles alone leave a real ambiguity (e.g., Consonant Blends' "beginning" vs. "ending" position is not obvious from the family name itself, so a clause naming that axis adds real value; Consonant Digraphs' four two-letter sounds similarly benefit from being named, since "digraph" alone doesn't tell a parent which sound they need).
- **How should single-Skill families' copy differ?** Much lighter. Multisyllabic Words and Greek and Latin Roots have nothing to differentiate among, because there is only one member — a "which one do you need" sentence would be actively pointless there. Their existing copy already reflects this correctly (each states what the one destination covers, not how to choose among options that don't exist); this pattern should be preserved as the model for single-Skill families rather than forced into the same shape as an 8-member family like Vowel Teams.
- **Should the contract require formula compliance, or genuine informational value?** Genuine informational value keyed to what is actually distinctive about that family. A family's copy should be judged by whether it tells a reader something true and specific about that family that helps them decide "yes, keep reading this section" or "no, skip to the next one" — not by whether it hits a checklist of required sentence types. Optional context (e.g., Silent E's existing clause resolving "why isn't Long E here") belongs only where it resolves a real question specific to that family; it should not be manufactured for families that have no such question, and its absence there is not a defect.

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

**This section supersedes the earlier draft's conclusion.** The earlier draft called the reused canonical `description` field "not ideal" and moved toward recommending a new, Hub-specific short-description field. On closer, more critical evaluation against real data — pulling the actual current `description` strings for eight families spanning contrasting shapes, rather than reasoning about the field in the abstract — that conclusion does not hold up, and this section reverses it.

**The five options, evaluated:**

| Option | Scanability | Parent comprehension | Sibling differentiation | Duplication / copy-drift risk | Editorial maintenance | Content-model complexity | Metadata responsibility clarity | Redesign compatibility | SEO/GEO/AEO |
|---|---|---|---|---|---|---|---|---|---|
| A. Title only | High (shortest) | Low — several sibling titles differ by one letter/word only | Poor — no way to tell Short A from Short E beyond the letter | None | Lowest | None | Clean | Compatible | Neutral |
| B. Reuse `description` verbatim (current) | Medium — some entries run long | Generally good; a few entries carry search-snippet framing clauses that add length without adding differentiation | Good — every entry already names its specific sound/pattern | None — single field | Lowest (one field already maintained for the Skill page) | None — no new field | Single, unambiguous owner (the Skill page's own metadata) | Fully compatible — plain text, no format assumptions | The field is already written to be a strong standalone summary; reuse costs nothing incremental |
| C. Reuse `description`, tightened only where independently warranted | High once tightened | Best of the reuse options | Good, same as B | None — still one field, edited for its own sake | Low — targeted edits to a handful of entries, not a systemic new-field rollout | None — no new field | Same as B | Same as B | Same as B, plus tightened entries also improve as search snippets |
| D. New Hub-specific short description field | High by construction | Good, if written well | Good, if written well | New duplication axis: two descriptions per Skill that must be kept from drifting apart in meaning as either page is edited | Highest — 41 new strings to write, and a second field to keep current on every future Skill edit | New optional frontmatter field, new schema surface, new "which field renders where" rule to document and test | Splits metadata responsibility across two fields for the same entity — a new ambiguity `CANONICAL_SKILL_PAGE_STANDARD.md` does not currently need to resolve | Compatible, but is the only option that adds a content-model change alongside the visual one | No material gain over C — the differentiating information is the same either way |
| E. Mixed/data-driven length by need | Variable by design | Good if executed well | Good if executed well | Same drift risk as D for whichever entries get a dedicated field | Highest — same 41-string burden as D, plus a rule for which entries qualify | Same new-field complexity as D, plus a conditional-rendering rule | Same ambiguity as D | Compatible | Same as D |

**Data actually inspected** (`src/lib/content/spellingSkills.ts` skill ids cross-referenced against `src/content/spelling-lists/**/*.md` frontmatter `description`), across contrasting families:

- **Short Vowels** — e.g. Short A: *"How to recognize, group, and teach the short 'a' sound — the quick vowel in cat, hat, and pan — with word families, what to notice, and common mix-ups, for parents, teachers, and tutors."* Short E: *"How to recognize, group, and teach the short 'e' sound — the quick vowel in bed, hen, and leg — including word families, the short e/short i mix-up, and teaching guidance, for parents and teachers."* Both already name the specific sound with concrete examples in the first clause — the differentiating information a directory reader needs is at the front of the sentence, not buried. The "for parents, teachers, and tutors" tail is the only clearly excess clause.
- **Consonant Digraphs** — CH: *"...the single sound at the start of chin and the end of lunch — including how it differs from a consonant blend, a comparison with SH, and common mix-ups..."* SH: *"...the smooth, continuous sound at the start of ship and the end of wish — including a comparison with CH..."* These two already differentiate each other better than a from-scratch Hub summary likely would, because each already names its contrast with its nearest sibling.
- **Common Spelling Patterns** — CK/TCH/DGE endings: *"Four related one-syllable ending spellings, right after a short vowel: ck for /k/ (back, duck)..."* Silent Letters: *"How the wr, kn, and mb spelling patterns work..."* Soft C and Soft G: *"Why city sounds different from cat, and page sounds different from game..."* — three structurally different opening styles, each immediately legible as distinct at a glance; no drift or mismatch found.
- **Vowel Teams** — AI/AY: *"How the AI and AY vowel teams spell the long 'a' sound..."* EE/EA: *"Why EE and EA both commonly spell the long 'e' sound with no reliable rule for choosing between them..."* — both open by naming the exact letter pair, which is exactly what a reader scanning 8 sibling entries needs first.
- **Word Building and Endings** — Plurals: *"Learn how regular nouns form plurals with -s or -es..."* -ed/-ing: *"Learn how -ed and -ing attach to action-word bases..."* Common Suffixes: *"Learn how common suffixes build words: -ful and -less add meaning..."* — a shared "Learn how..." opening across three of six members is the closest thing to a real templating concern found in this data, but it does not block differentiation (the noun phrase that follows is always distinct and specific), so it is a minor tightening opportunity, not a duplication defect.
- **Prefixes** — Un- and Re-: *"What a prefix is and how the un- and re- prefixes change meaning..."* Common Prefixes: *"Prefixes beyond un- and re- — pre-, dis-, mis-, inter-, sub-, super-, trans-, and anti-..."* — the second entry explicitly names its relationship to the first ("beyond un- and re-"), which is stronger sibling differentiation than a generic Hub-authored line would likely produce without deliberate cross-referencing.
- **Homophones and Commonly Confused Words** — Homophones: *"How to spell true homophones — words that sound exactly alike but have different spellings and meanings, such as to/too/two..."* Commonly Confused Words: *"How to tell apart commonly confused word pairs — such as affect/effect, principal/principle..."* — both name the category and give concrete example pairs in the same clause; well differentiated.
- **Multisyllabic Words** (single-Skill family): *"Learn how syllables, familiar spelling patterns, and meaningful word parts work together when spelling longer words."* **Greek and Latin Roots** (single-Skill family): *"How Greek and Latin roots carry a word's core meaning across related words — Latin roots such as port, dict, and spect..."* Neither needs sibling differentiation (there is none to do), and both already read as clear, self-contained directory copy.

**Finding:** across all eight families inspected, the existing canonical `description` field already functions as workable, differentiating directory-scan copy in every case checked. No real duplication or mismatch problem was found that reuse cannot fix by editing the shared field itself. The only recurring soft issue is length/framing clauses written for a search-snippet job ("for parents, teachers, and tutors"; "Learn how..." openers) that add words without adding differentiating information for a directory-list reader — a tightening problem, not a wrong-field problem.

**Final recommendation: Option C — reuse the existing canonical `description` field as the Hub entry's description, tightened where independently warranted, rather than forked into a new field.** Do not add a dedicated Hub-specific description field (Option D) or a mixed data-driven model (Option E); the evidence does not support the added content-model complexity, duplication surface, and copy-drift risk against a demonstrated-workable single field. Do not go title-only (Option A); several sibling titles differ by only one word (Short A/E/I/O/U Words; AR/OR/ER-IR-UR Words) and a reader benefits from at least the differentiating clause already present in `description`. This is a firm conclusion, not an open question left to a future implementer.

**What "tightened where independently warranted" means in practice:** where a `description` string carries a clause written purely for search-snippet completeness and adds no differentiating value in a directory context (e.g. a trailing "for parents, teachers, and tutors" audience tag, or a "Learn how..." opener repeated near-identically across several siblings in one family), that clause is a reasonable target for editing — but the edit improves the one shared field for both its Skill-page and Hub uses at once, rather than forking a second field. This is a light copy-editing pass over a demonstrated-mostly-fine field, not a rewrite project.

**What must still be avoided regardless of source field:** restating the family description redundantly; introducing a technical term not already used in the family framing; claiming completeness ("everything about X"); reproducing the Skill page's own demonstration word set at Hub-entry length (`CANONICAL_SKILL_PAGE_STANDARD.md` §5 owns that); and adding grade info on the entry — rejected for the same reason as at the family level (§9): Skills are grade-neutral by design, and per-entry grade badges would misstate that identity for Skills that span multiple grades.

This does not assert that every one of the 41 `description` strings is already perfect — a handful of tightening candidates are identified above — only that the field itself, not a new one, is the correct long-term source for this Hub element. Which specific strings get tightened, and when, is future editorial work (§22), not performed as part of this research.

---

## 11. Grade browsing vs. skill browsing

**Revised approach (this refinement pass):** the earlier draft recommended both an early mention/link and keeping the existing closing link, effectively two separate link instances. Following the precedent already frozen one layer up — `CANONICAL_GRADE_HUB_STANDARD.md` §2's explicit separation of the *required architectural route* ("a clear, crawlable route to its corresponding canonical same-grade Grade-Strand Gateway") from its *visible treatment and link count*, which that standard explicitly declines to freeze ("The architectural route is required; its visible treatment and link count are not frozen. A linked heading, text link, CTA, card, or another accessible treatment may express it...") — this section now applies the same separation here rather than mandating two link instances.

**What is required (semantic relationship, frozen by this recommendation):** `/skills` must make the grade-vs-skill distinction legible to a reader who may have arrived wanting the other journey, and must provide a working route to grade browsing. The conceptual distinction worth conveying (not necessarily this exact wording) is close to:

> Browse by grade when you want a sequenced, grade-level learning path. Browse by Skill when you already know which spelling skill to practice.

This directly operationalizes `CONSTITUTION.md` §3.2 vs. §3.3's own framing of the two journeys ("Show me a sensible grade-level learning path" vs. "I know what we need to practice").

**What is left open (placement/count, not frozen by this recommendation):** exactly how many links to `/#grades` appear, and where. The **most defensible specific recommendation** is a single clear mention near the opening that both establishes the distinction and doubles as the route to grade browsing — one clause in the orientation paragraph, not two separate link instances (an early distinguishing mention plus a separate closing link). This keeps the page economical and avoids treating link redundancy as a requirement the way the earlier draft implied. Whether that single mention is the *only* link, or whether a future implementer also finds a closing-position link useful for a reader who scrolls to the bottom without finding what they wanted, is a placement/visual-treatment decision this document does not freeze — consistent with §19's redesign-compatibility posture. The current page's existing closing-sentence link is not wrong; it simply should not be treated as a second *required* element alongside a new opening one.

**Should Grade Hubs link back to `/skills`?** No — this mirrors and confirms the frozen finding already established one layer down: `CANONICAL_GRADE_HUB_STANDARD.md` §8 states explicitly "Skills: Grade Hub → Skills linkage is not a Grade Hub responsibility. Skills remain a parallel, skill-first navigation system, not a child of a Grade Hub," and its research doc §9.3 gives the reasoning (Skills sit alongside, not beneath, Grade Hubs; extending a link there would invent a new cross-layer relationship with no positive evidence for it). This research does not reopen that finding — it is frozen from the Grade Hub side and this document treats it as settled. Global site navigation (header/footer, out of this document's scope) is the appropriate place for a persistent, symmetric Grades ↔ Skills relationship, not page-body content on either page family.

**Respecting the frozen parallel-system decision:** nothing in this section's recommendation treats Skills as a child of, or gateway into, the grade-first hierarchy, or vice versa — both links described here are peer-to-peer wayfinding between two parallel top-level journeys, consistent with `CONSTITUTION.md` §4's explicit statement that "these systems must not automatically become top-level navigation" hierarchies subordinate to one another.

---

## 12. Educational analysis

Evaluated through a structured-literacy lens, strictly bounded to spelling (per this task's explicit scope restriction — no reading comprehension, vocabulary, handwriting, or general grammar).

**Does the family organization communicate a coherent spelling knowledge system?** Broadly yes, and this is a genuine strength worth preserving rather than an accident: the 12 families correspond closely to a standard structured-literacy progression — phoneme-level closed-syllable spelling (Short Vowels, Digraphs, Blends) → common single-syllable conventions (Common Spelling Patterns) → long-vowel patterns (Silent E, Vowel Teams) → r-controlled vowels → multisyllabic strategies → morphology (Word Building and Endings, Prefixes, Greek and Latin Roots) → meaning-based spelling (Homophones and Commonly Confused Words). `SKILLS_ARCHITECTURE.md`'s own construction process (§1) cites Orton-Gillingham, Words Their Way, UFLI, and Fundations scope-and-sequence conventions directly, so this is not merely a coincidental resemblance.

**Does the Hub risk pretending to be a complete sequential curriculum?** Currently, no in the broad sense — no numbering, no "step 1, step 2" framing across the 12 families. But the intro's specific "Start with short vowels and simple CVC words" nudge deserves its own re-examination, revised in this pass from the earlier draft's "reasonable, bounded suggestion" characterization.

**Re-examining "Start with short vowels" (revised in this refinement pass).** The tension: the Skills Hub is explicitly *not* a sequential curriculum — that is the Grade system's job (`CONTENT_MODEL.md` §3; `SKILLS_MODEL.md` §2; §6 of this document: "Must not own... a grade-by-grade curriculum sequence"). A hard-coded "start here" instruction, even a single clause, is a sequencing claim, and the Skills Hub's own frozen positioning is grade-neutral and non-sequential by design. Three options:

- **(A) Keep as-is** — a single bounded nudge, not a full sequence. Defensible in isolation, but it sits awkwardly next to this document's own repeated insistence (§6, §9, §12 elsewhere, §20) that the Hub must not imply ownership of sequence, and it is the one piece of copy on the page that most resembles a "start here" curriculum claim, however small.
- **(B) Soften the language** — reframe as an example rather than a prescribed starting point (e.g., "for example, many families begin with short vowels" or similar framing that reads as illustrative, not directive).
- **(C) Remove it and replace with a pointer to grade browsing** — for a reader who actually wants sequence, route them to the system that owns sequence (§11) rather than having the Skills Hub improvise a one-line substitute for it.

**Recommendation: (C).** The Skills Hub's own governing principle, established and not reopened elsewhere in this document (§6, §11), is that sequence belongs to grade browsing and the Skills Hub is the destination for readers who already know what they want. A "start here" suggestion — even softened — still answers a sequencing question the page has no authority to answer, and a reader who needs that kind of guidance is better served by the explicit grade-vs-skill distinction and route recommended in §11 than by a single hard-coded family name that may or may not match their child's actual need. Removing it also removes the one piece of copy that could be read as contradicting the Hub's own "architecturally sound... grade-neutral" self-description. This is a clear call, not a hedge: the opening should state the reader question and the grade-browsing alternative (§11), and should not additionally suggest a specific starting family.

Any future content work must preserve the broader no-sequence finding — the grade curriculum, not the Skills Hub, owns sequence (`CONTENT_MODEL.md` §3; `SKILLS_MODEL.md` §2).

**General professional knowledge (not a repository fact, not a specific citable source):** per general structured-literacy scope-and-sequence convention — the same family of conventions `SKILLS_ARCHITECTURE.md` §1 itself cites (Orton-Gillingham, Words Their Way, UFLI, Fundations) — presenting spelling patterns grouped by shared linguistic feature (sound-spelling correspondence, common convention, morphology, meaning) rather than by grade or by frequency is a defensible organizing principle for a *reference* directory; it mirrors how several structured-literacy programs organize their own skill-reference materials, distinct from (and complementary to) their grade-paced lesson sequence. This is offered as general professional context supporting the already-frozen family-taxonomy shape, not as a specific citable source and not as evidence this document independently gathered.

---

## 13. SEO/topical-authority analysis

**Scope-of-evidence note (added in this refinement pass):** no keyword research, search-console data, ranking data, or query-volume evidence was gathered or is available to this research. Everything in this section is **inference from the site's information architecture** — how the page's content and internal-linking shape maps onto general SEO principles (topical clarity, intent-matching, non-duplication) — not a measured claim about actual search demand, actual query ownership, or actual ranking behavior. Where language below reads as if it were an established fact about search performance, it should be read as this document's IA-based inference instead.

**What broad territory `/skills` should plausibly own, relative to the 41 narrower Skill pages (inference, not measured):** by IA logic, `/skills` should own the entity/topic territory of "the complete public directory of spelling skills/patterns taught K–5 on this site" — a hub-level topical claim, not a claim to explain any pattern itself. By the same inference: broad, unqualified query shapes like "spelling skills," "spelling patterns list," "K-5 spelling concepts" plausibly belong to the Hub; query shapes naming a specific pattern ("short a words," "consonant blends spelling") plausibly belong to the narrower Skill pages. No actual query data was reviewed to confirm this pattern exists or matters for this site. This mirrors, one layer up, the same intent-ownership *logic* already applied for the Grade Hub vs. Gateway vs. Member layers in the Grade-Strand Gateway research (§8 there) — broad/aggregate intent to the broadest page, narrow/specific intent to the narrowest page, with the middle layer (here, the family section, not a separate page) owning the "which broad-family umbrella does my specific interest fall under" middle ground. That precedent is itself the same kind of IA-based inference, not measured evidence.

**No keyword stuffing; unique informational value beyond a link directory.** The Hub's unique, non-duplicative value is exactly the family-level differentiation content specified in §9 — a reader (or crawler) gets *organizing information* ("these are the families, and here's what distinguishes members within each") that exists nowhere else on the site, since no Skill page explains its own family's internal structure (that would itself be a duplication risk the Skill Page Standard would reject). This is the Hub's legitimate "more than a link directory" claim, and it should not reach further than that — inventing broader spelling-pedagogy content (e.g., "why spelling matters," general phonics essays) would exceed the Hub's actual job and risk the exact anti-pattern rejected in §20.

**Internal linking as a semantic graph.** The intended graph is exactly: `SpellingWords.app` (site root / homepage) → `/skills` (Skills Hub) → 12 family sections (in-page anchors, not separate pages, per §8's conclusion) → 41 canonical Skill pages → (via each Skill's own `skillIds` reverse lookup and `relatedLists`/`prerequisiteLists`/`nextLists`) → relevant Grade Units and sibling Skills. This is a clean, shallow, two-hop graph from the Hub to any Skill, with the richer cross-referencing (Skill ↔ Grade Unit, Skill ↔ Skill) correctly delegated to the Skill-page layer itself, not duplicated at the Hub.

---

## 14. GEO/AEO analysis

Applying this task's explicit instruction not to recommend content or schema solely because "LLMs like it" — the same discipline already applied at the Grade Hub and Grade-Strand Gateway layers in their own research documents (both of which found "no case for any [layer]-specific AI-optimization tactic beyond what plain, well-structured, accurate content already provides"). **No AI-citation behavior was tested or observed for this or any comparable page** — nothing in this section claims to know how any AI answer system actually treats this page today; it states a design principle (clear, well-structured, non-duplicative content plausibly serves both human scanning and machine retrieval) as inference, not as measured or predicted AI-citation fact.

**What plausibly makes `/skills` useful/citable to an AI answer system (inference, not a tested or measured claim):** by the same reasoning that makes a page useful to a human skimmer — an accurate, complete, well-labeled directory of family names and member Skill titles, with enough differentiating text per family and per entry (§9, §10) that an answer engine excerpting the page could plausibly state "SpellingWords.app organizes spelling skills into 12 families, including X, Y, Z" without needing to infer structure from an undifferentiated flat list. This is presented as a reasonable byproduct of doing the ordinary content work well, not as a verified outcome or a separately engineered "AI-facing" feature.

**Explicitly not recommended, and why:**
- **Hidden or AI-only summary blocks** — no evidence anywhere in this research (or in the two analogous, more thoroughly AI-research-sourced layer documents this document builds on) supports these; they would also violate `CANONICAL_SKILL_PAGE_STANDARD.md` §15's explicit rejection of "hidden text aimed at crawlers or AI systems rather than readers," which this document treats as the site's settled position at every content layer, including this one.
- **`llms.txt`-driven content decisions** — the Grade-Strand Gateway research already investigated this directly and found Google's own documentation states no special AI-facing files are used by Google Search, with Google personnel on record rejecting `llms.txt` specifically; this document adopts that same finding rather than re-investigating it, since nothing about the Skills Hub changes the underlying facts about how these files are (not) used.
- **Schema added "for AI"** — see §15; any structured-data recommendation in this document is justified by matching visible content, never by an LLM-specific rationale.

---

## 15. Structured-data analysis

**Current structured data on `/skills`, read directly from source** (`src/pages/skills/index.astro`):

- `BreadcrumbList`: `Home → Skills` (2 items). Accurate to the visible breadcrumb; no change needed.
- `ItemList`: `name: "Spelling Practice by Skill"`, `numberOfItems` = 41 (every resolved Skill entry across all 12 families), `itemListElement` = a single flat array of 41 `ListItem`s (`url` + `name` per Skill), position numbered 1–41 continuously across family boundaries — the family grouping visible on the page (12 `<h2>` sections) is **not** represented in the structured data at all today.

**Does the existing schema match the visible hierarchy?** Partially, and this section now reaches a firm conclusion about whether that partial match is actually a problem — the earlier draft deferred this to "evaluate at implementation"; this refinement pass decides it.

**Recommendation (firm, revised in this refinement pass): retain the existing flat `ItemList`. Do not introduce nested/grouped or multiple `ItemList`s.**

Reasoning, addressing Schema.org `ItemList` semantics directly (general type-semantics knowledge, no live web access — described in prose, not attached to a specific citation URL, per §2's sourcing standard): Schema.org's `ItemList` type models a single ordered or unordered collection of items (`itemListElement`, each a `ListItem` with a `position`). It does not define a standard, widely-supported convention for representing a *list of lists* — nesting one `ItemList` inside another's `ListItem`, or emitting 12 sibling `ItemList`s meant to be read together as one hierarchical structure, is not a documented, commonly-recognized `ItemList` pattern, and there is no basis in this research to assert that major search engines or answer systems reliably parse such a shape as "one hierarchy" rather than as 12 unrelated lists or one list with unusual nesting. Introducing it would add real implementation complexity (which shape: 12 sibling `ItemList`s? one `ItemList` whose `ListItem`s each wrap a nested `ItemList`? a custom grouping property?) to represent a fact that is already fully and unambiguously expressed in the page's **visible HTML**: 12 `<h2>`-labeled `<section>`s, each containing its own member links, in DOM order. A crawler or answer engine reading the rendered page already has the family hierarchy from the heading structure itself — structured data's job is to describe visible content unambiguously, not to re-encode a hierarchy that visible HTML already states clearly, and this document's own governing principle (§14, applied consistently here) is that schema should not be elaborated merely because a fancier representation is technically possible. The flat `ItemList` correctly and simply states "this page links to these 41 things, in this order" — an accurate, minimal, low-maintenance claim that matches what a flat `ItemList` is actually good at representing. **This closes the open question the earlier draft left for "implementation-time evaluation" (§23 item 3, updated accordingly below).**

**`FAQPage`:** **not recommended by default**, matching every other layer's frozen policy (`CANONICAL_GRADE_HUB_STANDARD.md` §9, `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §2) — no genuine, non-generic FAQ content is proposed anywhere in this document for the Hub (§20 explicitly rejects manufacturing one), so no `FAQPage` schema should exist either.

**No schema not corresponding to visible content.** This document does not recommend any schema type (`CollectionPage`, `WebPage`, `Course`, etc.) beyond evaluating the `ItemList` nesting question above — consistent with this task's explicit instruction and with the pattern already set at the Grade Hub and Gateway layers, both of which explicitly declined to add unproven schema types.

**Separation of recommendation types, made explicit per the task's instruction:**
- *Semantic architecture recommendation:* keep the 12-family grouping as the page's primary structural unit, expressed in visible, accessible HTML (already true; see §19's revised heading-structure requirement).
- *Schema recommendation:* keep the existing flat `ItemList` as-is; do not add nested/grouped representation (firm, this pass).
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
    which also functions as the page's route to grade browsing (§11) —
    exact link count/placement not frozen beyond this one required mention
  - Does not suggest a specific starting family (e.g., "start with short
    vowels") — a reader who wants a sequence is routed to grade browsing
    instead (§12)

For each of the 12 canonical families, in frozen order (§4), a family block:
  H2 or an equivalent single page-level-subordinate heading, forming its own
  clearly labeled, programmatically-associated section in reading order (§19):
    [Frozen family title]
  Family synthesis paragraph, written to the editorial purpose in §9
  (confirm "this family has what I'm looking for," differentiate members only
  where titles alone leave real ambiguity, resolve a real family-specific
  question only where one exists — no fixed sentence template)
  List of direct links to every member Skill, in frozen order:
    - Skill title (exact canonical title, unmodified)
    - the Skill's existing canonical `description` field, tightened where
      independently warranted (§10) — not a new dedicated Hub field
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
| Family synthesis copy | Largely templated (11/12 families) | Differentiated per family, per the editorial principle in §9 (not a new fixed template) | **Rewritten** — the central editorial gap |
| Individual entry descriptions | Reused Skill-page `description` verbatim | Same field, tightened where independently warranted (§10) | **Lightly tightened**, not forked into a new field — a smaller gap than the earlier draft assumed |
| Grade-browsing link placement | Closing sentence only | One clear mention near the opening establishing the distinction and serving as the route (§11); exact count/placement not frozen | **Refined**, not newly added |
| "Start with short vowels" opening nudge | Present | Removed; sequence-seeking readers routed to grade browsing instead (§12) | **Removed** — resolves a tension with the Hub's own grade-neutral positioning |
| Metadata (`<title>`/description) | Static, accurate | Same content, optionally data-derived | **Minor implementation refinement**, not a content change |
| `BreadcrumbList` schema | Correct | Same | **Remains unchanged** |
| `ItemList` schema | Flat, 41 items, no family nesting | Same — retained unchanged (§15) | **Remains unchanged** — firmly evaluated and confirmed correct as-is, not a gap |
| `FAQPage`, member counts, grade badges, practice CTA, etc. | Absent | Remain absent (§20) | **Confirmed absent by design**, not a gap |
| Visual presentation (cards, accordions, colors) | Current card-like styling | Unconstrained by this document (§19) | **Explicitly deferred**, future visual-design-only concern |
| `SKILLS_ARCHITECTURE.md` Family 1 title | "Short Vowels and CVC Words" (doc) vs. "Short Vowels" (code) | Doc updated to "Short Vowels" to match code (§21) | **Doc fix recommended**, no code change |

**Is the current page architecturally sound-but-editorially-underdeveloped, or structurally broken?** **Architecturally sound but editorially underdeveloped.** No element requires removal; no new page-level section is missing; the direct-link, no-gateway, 12-family architecture is validated as correct (§8). The real work is textual and small: differentiate the family copy per §9's principle, tighten (not replace) entry descriptions, refine the grade-browsing mention's placement, remove the "start with short vowels" nudge, and fix one documentation label — structured data needs no change.

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

**Revised (this refinement pass):** the earlier draft froze literal heading levels — "one H1, one H2 per family." On reconsideration, freezing exact tag names is stricter than the actual requirement and risks conflicting with a future visual treatment that has good reason to structure headings differently (e.g., an accordion or tabbed implementation where each family panel is technically an `H3` under a wrapping heading, or a component library that manages heading depth programmatically).

The load-bearing requirement this document treats as frozen, stated at the correct level of strictness, is **semantic/accessible document structure**, not specific heading tag numbers: a single page-level heading identifying the page (per general WCAG heading-structure guidance — one clear top-level heading per page, general accessibility knowledge held without live web access, not a specific citable source), and each of the 12 families forming its own clearly labeled, programmatically-associated section in reading order (a heading element or equivalent accessible label, e.g. `aria-labelledby`, associated with its section's content, in a logical, sequential heading structure that assistive technology can traverse). This requirement is satisfiable under any future visual treatment — tabs, accordions, cards — provided the underlying markup still exposes one page-level heading and 12 properly-labeled family sections in document order; a visual redesign is free to choose its own heading depth (H2, H3, or an ARIA-labelled equivalent) as long as the resulting structure remains logical and complete. Everything else in §17's wireframe is expressible as plain content blocks that a future visual system can arrange freely.

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

1. **Family-title mismatch — investigated via git history and resolved with a specific recommendation (this refinement pass).** `SKILLS_ARCHITECTURE.md` names Family 1 "Short Vowels and CVC Words"; the live, tested code (`spellingSkills.ts`, locked by `spellingSkills.test.ts`) renders "Short Vowels."

   **What is live (code):** `SHORT_VOWELS_AND_CVC_SKILL_FAMILY.title` is `'Short Vowels'` — this has been true since the constant's introduction; `spellingSkills.test.ts` locks in "Short Vowels" as the tested, executable title.

   **What the frozen architecture doc says:** `SKILLS_ARCHITECTURE.md` §2/§4 names the family "Short Vowels and CVC Words" throughout, including in a line describing it as "*already live, no change*."

   **What git history shows about intent:** `git log --oneline --all -- docs/architecture/SKILLS_ARCHITECTURE.md` shows only two commits ever touched the file: its introduction (merge commit `0649b0b`) and one later unrelated terminology cleanup (`fcbd849`, "Remove legacy HFW terminology," which does not touch the "Short Vowels" text). Critically, `git log -p -S "SHORT_VOWELS_AND_CVC_SKILL_FAMILY" -- src/lib/content/spellingSkills.ts` shows `spellingSkills.ts` was **also** introduced in that same commit `0649b0b`, already with `title: 'Short Vowels'` — the shorter title was not a later edit or simplification; it was present from the very first commit that created the file, in the same merge as `SKILLS_ARCHITECTURE.md`'s "Short Vowels and CVC Words" naming. This is the key evidentiary fact: the two names diverged **at their common point of origin**, not through later drift. Reinforcing this, `SKILLS_ARCHITECTURE.md`'s own text at that commit describes the family as "*already live, no change*" — language that reads as the document *recording an existing implementation fact*, not proposing a rename. Read literally, the doc's own words assert that "Short Vowels and CVC Words" was already the live title at the time it was written — which was not accurate even at that commit, since the code introduced in the same change used "Short Vowels." The most consistent reading of this evidence is that the architecture doc's fuller name reflects the family's internal/editorial description (matching how §2's "purpose" prose frames it) rather than a deliberately different, intentionally-shortened public UI label; the doc's own "already live" framing is the strongest evidence it was not trying to introduce a new public string. The history does not contain an explicit commit message or PR discussion confirming this intent either way — no comment says "shortening for UI" or "doc uses full name, code uses short name on purpose" — so this reading is a reasoned inference from same-commit textual evidence, not a certainty, but it is not genuinely inconclusive either: nothing in the history supports the alternative reading (that "Short Vowels" was a later, unauthorized simplification that drifted from an intentional fuller name), since the two names never actually agreed at any point in history.

   **Recommendation: update `SKILLS_ARCHITECTURE.md`'s label to match the live/tested code ("Short Vowels"), not the reverse.** This is the smallest correct fix: it resolves the doc's own internal inconsistency (a line claiming "already live, no change" next to a name that was never live), requires no change to executable, test-locked, publicly-rendered code, and does not touch family membership, order, or skill count. The doc's §2 "purpose" prose can continue to reference "short vowels and CVC words" as descriptive language explaining the family's scope — only the family's stated *title* in §2/§4 needs to change to "Short Vowels" to match what actually renders. This document does not perform that doc edit (out of scope, §21 constraint), but the recommendation itself is firm, not left open — this resolves what the earlier draft of this section (and §23 open question 1) left unresolved.
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
- **Entry-description standard:** resolved in this refinement pass (§10) — Hub entries continue reusing each Skill's existing `description` field, tightened where independently warranted, rather than a new Hub-specific field. No new frontmatter field or schema surface is needed. Remaining implementation work is a light copy-editing pass on a handful of `description` strings (identified illustratively in §10), not a field-level decision.
- **Grade-browsing link placement:** a small `.astro` template change to surface the existing `/#grades` link earlier (or restate it) in addition to its current closing position.
- **`ItemList`:** resolved in this refinement pass (§15) — keep the existing flat `ItemList` unchanged; no nesting work required.
- **Metadata data-derivation:** optionally compute `<title>`/`<meta description>` counts from `SPELLING_SKILL_FAMILIES` rather than hand-writing them, a minor DRY-ing of existing accurate content, not a content correction.
- **Family-title reconciliation** (§21 item 1): resolved in this refinement pass — update `SKILLS_ARCHITECTURE.md`'s label to "Short Vowels" to match live/tested code; no code change needed.

---

## 23. Open questions

Genuine unresolved items for the human reviewer, most of the earlier draft's open questions having been resolved with firm recommendations in this refinement pass (§9, §10, §11, §12, §15, §21):

1. **Exact editorial execution of the grade-browsing mention (§11).** This document is firm that one clear mention near the opening should establish the grade-vs-skill distinction and serve as the route, but leaves the precise sentence-level wording and whether it doubles as the page's only grade-browsing link (vs. also retaining a closing-position link) to editorial/implementation judgment — bounded by §19's redesign-compatibility posture, not a placement count this document freezes.
2. **`SKILLS_ARCHITECTURE.md` §2 "purpose" prose wording.** §21 recommends updating the doc's stated family *title* to "Short Vowels" but leaves open exactly how much of the surrounding "purpose" prose (which currently reads fluently around "Short Vowels and CVC Words") should be lightly re-worded for consistency once the title changes — a copy-editing detail, not a substantive open question.
3. **Whether any of the family-copy tightening candidates identified illustratively in §10** (e.g., trailing audience-tag clauses, repeated "Learn how..." openers in Word Building and Endings) should be batched into one editorial pass or handled incrementally — a scheduling question, not a content-standard question.

---

## 24. Decision table

A mechanical summary of this document's final positions, for direct conversion into the frozen `CANONICAL_SKILLS_HUB_STANDARD.md`. Confidence reflects evidence strength honestly, not consensus-seeking.

| Question | Final recommendation | Confidence | Basis |
|---|---|---|---|
| Direct Skill links (no gateway layer) | Keep — direct links from Hub to all 41 canonical Skill pages, grouped by family, no intermediate page | High | §8: evaluated against discoverability, crawl depth, cognitive load, scalability, accessibility, duplication; `SKILLS_ARCHITECTURE.md` §4 itself states single-skill families should render as direct destinations |
| Skill Family Gateways | Do not create | High | §8, §20: no genuine cross-member synthesis exists for most families (5 of 12 are single- or 2-member); would fail the No-Gateway Rule test (`CONSTITUTION.md` §11) |
| Family-copy contract | Editorial principle (confirm "this family has what I'm looking for" + differentiate only where titles leave real ambiguity), not a fixed 4-part sentence template | High | §9: a fixed template risks reproducing the exact templated-sentence problem identified as the page's core weakness; repository evidence shows single-Skill families and title-self-evident families (Short Vowels) need less, not more |
| Skill-entry descriptions | Reuse existing canonical `description` field, tightened where independently warranted (Option C); no new Hub-specific field | High | §10: inspected actual `description` data across 8 contrasting families — the field already functions as workable differentiating directory copy in every case checked; a new field adds duplication/drift risk with no demonstrated need |
| Family/Skill counts | 12 families, 41 Skills — frozen, not reopened | High | §4: executable-test-locked (`spellingSkills.test.ts`), matches `SKILLS_ARCHITECTURE.md` §4; explicitly out of this research's scope to reopen |
| Grade metadata on Hub (family- or entry-level) | Do not add | High | §9, §10: Skills are grade-neutral by design (`CONTENT_MODEL.md` §3); a grade badge at either level would misstate that identity, the same anti-pattern `CONSTITUTION.md` §14 warns against |
| Grade-browsing relationship | Required: the Hub must state the grade-vs-skill distinction and provide a route to grade browsing. Not required: two separate link instances (early + closing) — one clear mention near the opening suffices, consistent with the Grade Hub standard's own separation of required route from unfrozen link count/placement | High | §11: direct precedent in `CANONICAL_GRADE_HUB_STANDARD.md` §2 ("architectural route is required; its visible treatment and link count are not frozen") |
| "Start with short vowels" guidance | Remove; do not soften-and-keep. Point a reader who wants sequence to grade browsing instead | Medium-High | §12: the Hub's own frozen positioning is grade-neutral/non-sequential; a hard-coded starting-family suggestion is in tension with that positioning regardless of how it's worded. Medium-High rather than High because reasonable editors could defend a softened (Option B) version; this document's call is that removal best fits the Hub's own stated identity |
| Structured data — `ItemList` shape | Retain existing flat `ItemList` (41 items); do not add nested/grouped or multiple `ItemList`s | Medium-High | §15: Schema.org `ItemList` general type semantics (no live-web-access citation; general schema knowledge) have no standard, widely-supported nested-list-of-lists convention; the family hierarchy is already fully expressed in visible H2/section HTML, so duplicating it in JSON-LD adds complexity without demonstrated benefit. Not High because no direct test of search-engine parsing behavior was possible |
| `FAQPage` | Do not add | High | §15, §20: no genuine, non-generic FAQ content proposed anywhere in this document; matches frozen policy at Grade Hub and Grade-Strand Gateway layers |
| Visual-design constraints | None frozen beyond semantic/accessible structure (one page-level heading; 12 clearly-labeled, programmatically-associated family sections in reading order) — exact heading tags, cards/accordions/tabs, styling all left open | High | §19: revised this pass — the real requirement is accessibility/structural semantics (general WCAG heading-structure knowledge), not literal H1/H2 tag freezing, so any future visual system remains compatible |
| Family naming discrepancy ("Short Vowels") | Update `SKILLS_ARCHITECTURE.md`'s stated family title to "Short Vowels" to match live, test-locked code; do not change code | Medium-High | §21: git history shows both names originated in the same commit (`0649b0b`), not through later drift; the doc's own "already live, no change" phrasing is inconsistent with a name that was never live, suggesting the doc intended to record existing state rather than introduce a new one. No explicit commit-message confirmation exists, so this is a reasoned inference from same-commit textual evidence, not certainty — hence Medium-High, not High |

---

## 25. Final recommendation

The Skills Hub's direct-link, 12-family, no-gateway architecture should be **frozen as-is** in the eventual `CANONICAL_SKILLS_HUB_STANDARD.md` — it is validated, not merely inherited, against discoverability, crawl depth, cognitive load, scalability, accessibility, and duplication (§8), and no Skill Family Gateway layer should be introduced. The page's real, actionable work is editorial: replace the largely templated family-level copy with genuinely differentiated per-family synthesis guided by an editorial principle rather than a fixed template (§9); continue reusing each Skill's existing canonical `description` as the Hub entry's description, tightened where independently warranted, rather than introducing a new field (§10); state the grade-vs-skill distinction with one clear route to grade browsing near the opening, without mandating a second link instance (§11); remove the "start with short vowels" sequencing nudge in favor of routing sequence-seeking readers to grade browsing (§12); retain the existing flat `ItemList` unchanged (§15); and update `SKILLS_ARCHITECTURE.md`'s Family 1 title to match live, tested code (§21). None of this requires new pages, new taxonomy, new routes, or a visual redesign; the current page is architecturally sound but editorially underdeveloped, and the path from here to a frozen production standard is a content and structured-data refinement pass, not a rebuild. The decision table (§24) makes this refinement's conclusions directly convertible into the frozen standard.

**SKILLS HUB RESEARCH REFINED — READY FOR REVIEW**
