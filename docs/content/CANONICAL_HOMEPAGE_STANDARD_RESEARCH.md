# Canonical Homepage Standard — Research

**Status:** Research and recommendation only. This document does **not** freeze a production standard, does not authorize implementation, and does not modify `src/pages/index.astro` or any other production code. A future `CANONICAL_HOMEPAGE_STANDARD.md` may be written from this research once it is reviewed and approved, following the pattern already established by the Grade Hub, Grade-Strand Gateway, and Skills Hub standards.

**Revision note (v2 — adversarial stress-test pass):** the initial research pass (v1) was reviewed against a deliberately skeptical brief asking whether it had become too minimalist, whether the three journeys carried genuinely equal semantic weight, and whether the homepage sufficiently communicates that SpellingWords.app is a substantial K–5 resource and not merely a custom-word widget. That review is **incorporated directly into the sections below** rather than kept as a separate addendum, so the document reads as one internally consistent set of conclusions. §24 records the decision table produced by that pass, and the "Refined" language throughout §1, §6.3, §8, §9, §14, §15, and §17 reflects its outcome. The most consequential change: **Browse by Skill is elevated from a single differentiating sentence to a coequal, heading-level section** — v1 treated this as an open question; v2 resolves it.

**Scope:** The public homepage at `/` (`src/pages/index.astro`) only. This document does not redesign the Grade Hubs, Grade-Strand Gateways, Skills Hub, Skill pages, member pages, practice experience, curriculum, or taxonomy — all of which are frozen elsewhere and are treated here as settled context.

---

## 1. Executive summary

The homepage's job is narrower than its current implementation or its own specification (`docs/HOMEPAGE_SPEC.md`) assumes. It is a **routing and confidence page**, not an educational resource and not a content hub. Its governing question is not "how do I begin?" in the abstract — it is more precisely: *"I need spelling practice for a child — which of this site's three ways of getting there is mine, and can I trust this place enough to start?"*

The current implementation (`src/pages/index.astro`) is **architecturally closer to correct than `docs/HOMEPAGE_SPEC.md` and `docs/architecture/CONSTITUTION.md` §19 might suggest**, but it is editorially thin and, in two respects, architecturally incomplete: it exposes only 7 routing tiles (6 grades + one Skills tile) with **Browse by Skill visually and semantically demoted to a seventh grade-shaped card** rather than a coequal second browsing system, and it contains no explicit statement that the site is a complete, structured K–5 curriculum rather than a single-purpose custom-word widget — the three journeys imply this but do not say it. It has no product-identity paragraph beyond the H1, and no structured data at all. It also inherits stale internal-linking assumptions from `docs/HOMEPAGE_SPEC.md`, which still describes a `/spelling-lists` "Spelling Library," `/about`, and `/guides` — none of which exist in the current, frozen `PUBLIC_URL_ARCHITECTURE.md`.

**Adversarial stress-test finding (v2):** the v1 pass correctly rejected content bloat (FAQs, methodology essays, testimonials, curriculum maps) but, in doing so, under-corrected in the opposite direction on two specific points rather than being uniformly too minimalist elsewhere: (1) it left Browse by Skill's parity with Browse by Grade as an *open question* when the repository evidence (`CONSTITUTION.md` §3, `CANONICAL_SKILLS_HUB_STANDARD.md` §1) actually resolves it — Skills is a frozen, coequal, first-class journey and the homepage must say so structurally, not just gesture at it in a clause; and (2) it treated the homepage's "substantial resource" identity as adequately implied by the three journeys alone, when a single required orientation sentence is warranted to make that identity explicit and citable, without becoming an educational article. Neither correction adds a new section, a longer page, or any content this document previously rejected — both are resolved by strengthening content already recommended in v1, not by adding new content types. See §24 for the full decision table.

The recommended target content architecture keeps the homepage short: a hero that states product identity and puts the custom-practice interaction directly on the page; a routing block exposing all three primary journeys as **coequal, heading-level, semantically real destinations**; two to four concrete, falsifiable statements combining trust and structural credibility; and a closing orientation band with adjacent navigation. No FAQ, no methodology essay, no testimonials, no stats block, no curriculum map. This is deliberately closer to the current page's actual length than to `docs/HOMEPAGE_SPEC.md`'s much longer four-tier information hierarchy, and only modestly longer than the current implementation — see §16, §24.

**HOMEPAGE RESEARCH COMPLETE — READY FOR REVIEW**

---

## 2. Scope and authorities

Authority precedence for this research, per `docs/architecture/CONSTITUTION.md` §17, extended to the homepage layer:

1. `docs/architecture/CONSTITUTION.md` — product purpose, the three journeys, non-negotiable principles (no gamification, no accounts, calm UX).
2. `docs/architecture/CONTENT_MODEL.md` — content identity boundaries (Grade Unit vs. Skill vs. Grade Roadmap, etc.).
3. `docs/architecture/PUBLIC_URL_ARCHITECTURE.md` — the actual, current routes the homepage may link to.
4. `docs/architecture/SKILLS_ARCHITECTURE.md` — the frozen 12-family/41-skill taxonomy (referenced, not modified).
5. `docs/content/CANONICAL_GRADE_HUB_STANDARD.md`, `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md`, `CANONICAL_SKILL_PAGE_STANDARD.md`, `CANONICAL_SKILLS_HUB_STANDARD.md` — sibling canonical content standards; used here as the model for structure, tone, and precedent, and as the authority for what the homepage must **not** duplicate.
6. `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md` — the five-layer content model (§2) and its explicit note that a "Layer 5... main spelling-list browse page" exists at `src/pages/spelling-lists/index.astro`. **This is stale** — see §21.
7. `docs/HOMEPAGE_SPEC.md` and `docs/PRODUCT_VISION.md`/`docs/SITE_ARCHITECTURE.md`/`docs/UX_ARCHITECTURE.md` (which it cites as upstream) — an older, pre-Constitution homepage specification, used here as **historical input, not controlling authority**, because it conflicts with the frozen architecture in ways detailed in §21.
8. `CLAUDE.md` — tone, tech stack, and coding-standard constraints (no gamification, Tailwind tokens only, accessibility non-negotiable).

Where these conflict, the Constitution and the frozen `docs/content/CANONICAL_*_STANDARD.md` documents govern; `docs/HOMEPAGE_SPEC.md` is treated as informative prior art, not as a document this research is bound to preserve.

---

## 3. Current repository/homepage state (repository-derived fact)

**Route and file:** `/` renders from `src/pages/index.astro`. It is a single Astro page with an inline `<script>` for interactivity; no homepage-specific component exists outside `SiteHeader.astro`/`SiteFooter.astro`.

**Current semantic content, top to bottom:**

1. **Hero** — H1 "Practice spelling, starting now." (the word "spelling" in the brand red accent color). Below it, a live word-entry `<textarea>` pre-filled with 7 sample words ("friend, because, different, people, every, school, always"), a live word-count pill, a status line, a "Start Practicing →" button that encodes the textarea's contents and navigates to `/play?list=...`, and a text link "or choose from our spelling lists" that anchor-scrolls to the routing section below.
2. **Routing grid** (`id="grades"`) — labeled "Ready-Made Lists" / "Hundreds of spelling lists, ready to use." Renders 7 cards: the 6 Grade Hubs (Kindergarten through 5th Grade, each with a short hand-written description like "Building blocks for confident spellers") plus one "Practice by Skill" card linking to `/skills`, described as "Choose focused sounds and spelling patterns" with a live count of the 41 skills.
3. **Trust band** (`id="how-it-works"`) — an `sr-only` H2 ("Why families and teachers choose spellingwords") over three unlabeled cards: "No account needed," "Hear every word," "Works everywhere," each one sentence.
4. Footer (`SiteFooter.astro`): wordmark, nav (Grades / Skills / How it Works / Privacy), tagline "No accounts. No timers. Just spelling."

**What is absent:** no JSON-LD/structured data of any kind (confirmed: `index.astro` does not pass a `jsonLd` prop to `Layout.astro`, unlike every Grade Hub, Gateway, and Skill page); no `/about`, `/guides`, or `/privacy`-adjacent explanatory content beyond the footer's Privacy link; no FAQ; no returning-visitor logic (no `localStorage` read anywhere in `index.astro`); no featured/sample list links; no explicit statement of the three journeys as three journeys (the "Practice Your Own Words" journey is the hero itself, implicit; "Browse by Grade" and "Browse by Skill" are both flattened into one undifferentiated 7-card grid with no heading distinguishing them).

**Metadata:** `<title>` is "spellingwords — Practice spelling words"; meta description is "Practice spelling with your own words or choose from hundreds of curated spelling lists. Free, no account needed." Both are accurate and reasonably concise; see §14 for evaluation.

**Navigation exposed:** `SiteHeader.astro`'s discovery-variant nav is Grades (anchor to `/#grades`) / Skills (`/skills`) / How it Works (anchor to `/#how-it-works`) — i.e., the header nav for the *entire site* routes two of its three items back to homepage anchors, not to distinct pages. This is a homepage-adjacent fact worth flagging: the site currently has no dedicated `/grades` (plural, browse-all) page — the homepage's routing grid **is** that page, dual-purposed as both homepage content and the header's "Grades" nav destination.

**Legacy/stale linkage confirmed removed:** `src/pages/spelling-lists/` does not exist in the current `src/pages/` tree. `PUBLIC_URL_ARCHITECTURE.md` confirms this explicitly ("the legacy `/spelling-lists` and `/learning-paths` route trees have been removed entirely"). This directly contradicts `CONTENT_IMPROVEMENT_ROADMAP.md` §2 Layer 5's description of "the main spelling-list browse page" living at `src/pages/spelling-lists/index.astro` — that page is gone, and **the homepage has already absorbed Layer 5's role** without any document saying so explicitly. See §21.

---

## 4. Governing reader question

**Recommended formulation:**

> I need spelling practice for a child. Which of this site's three ways of practicing is mine, and can I trust this place enough to start?

This is deliberately more specific than the brief's example framing ("I need spelling practice for a child. What can I do here?") in two ways: it names that there are exactly three ways (matching `CONSTITUTION.md` §3's frozen model), and it makes trust an explicit second clause rather than an implied afterthought — because the homepage is disproportionately likely to be a *first* visit (branded search, AI referral, word-of-mouth), where trust-formation and routing happen in the same glance, not sequentially.

**What the homepage primarily functions as:** a combination of **routing/orientation page** and **interactive practice surface**, with **product landing page** (identity + trust) as a supporting function threaded through both, and explicitly **not** a general educational resource.

- It is a routing page because its dominant job, per `CONSTITUTION.md` §3–4, is exposing three user-intent journeys and moving the visitor into the correct one within about 30 seconds.
- It is simultaneously an interactive practice surface because the flagship journey — Practice Your Own Words — is "the flagship homepage experience" per the Constitution, meaning the interaction itself (not a card linking to it) belongs on the page.
- It carries landing-page responsibility only insofar as identity and trust are prerequisites to routing working at all — a visitor who does not believe the product is calm, free, and account-free will not commit to any of the three journeys regardless of how clearly they are presented.
- It is explicitly not an educational resource: `CONSTITUTION.md` §2 states the product is "not... a broad vocabulary encyclopedia," and the roadmap's Layer 1 (Skill pages) already owns "the strongest possible explanation of the pattern"; duplicating any of that here would violate the layer boundaries every other canonical standard in this repository protects.

**Constraint this places on content:** because routing is the primary job and trust is a fast, glanceable prerequisite rather than a persuasion arc, the homepage should not contain an argument, a narrative, or sequential trust-building of the kind `docs/HOMEPAGE_SPEC.md`'s four-tier "Information Hierarchy" implies (Entry → Library Invitation → Trust and Values → Supporting Discovery, each described as needing its own section with "required content" lists). A parent deciding whether to trust a children's product forms that judgment nearly instantly from tone, restraint, and the absence of red flags (ads, logins, hype) — not from reading a dedicated "Trust and Values" section. The homepage should *demonstrate* trustworthiness through what it doesn't do, more than it *states* trustworthiness through a labeled section.

---

## 5. Current-page audit

Element-by-element, using the classification scheme required by the brief.

| Element | Classification | Reasoning |
|---|---|---|
| H1 "Practice spelling, starting now." | **KEEP BUT REFINE** | Correctly action-oriented and short; but it names neither "spelling words," grade range, nor audience, so it under-delivers on hero responsibility (§8). It also doesn't establish product identity for a visitor who has never heard of the site — see §8. |
| Word-entry textarea + live count + status line | **KEEP** | This *is* the "Practice Your Own Words" journey rendered directly, which the Constitution requires as "the flagship homepage experience." Pre-filling with sample words so the interface is never empty is a legitimate implementation choice that belongs to visual/UX design, not this research. |
| "Start Practicing →" primary CTA | **KEEP** | Single, unambiguous primary action; correctly the only button-styled CTA on the page. |
| "or choose from our spelling lists" secondary link | **KEEP BUT REFINE** | Correctly present as a secondary path, but "spelling lists" undersells that this link leads to *two* distinct journeys (grade and skill), not one library. Wording should acknowledge both without turning into a mini-navigation menu. |
| Routing grid heading "Ready-Made Lists" / "Hundreds of spelling lists, ready to use." | **REPLACE** | "Ready-Made Lists" frames Browse by Grade and Browse by Skill as one undifferentiated content category ("lists"), which flattens two structurally distinct journeys the Constitution requires stay legible as separate choices. The eyebrow and subhead should instead name the two journeys. |
| 6 Grade Hub cards | **KEEP** | Correct: all six grades directly visible and crawlable from the homepage matches §7's Browse-by-Grade analysis and is the frozen "Home → Grade Hub" one-click distance required by `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §7. |
| 1 "Practice by Skill" card (linking to `/skills`) | **REPLACE** (v2, was KEEP BUT REFINE) | Structurally present and correctly linked, but visually and semantically undifferentiated from the six grade cards it sits beside — it reads as "a seventh grade," not as the second of two coequal top-level browsing systems. Resolved to a firm requirement (heading-level coequal section) in §6.3 and §24, not left as an open differentiation question. |
| Trust band (3 unlabeled cards: no account / hear every word / works everywhere) | **KEEP BUT REFINE** | Content is accurate, calm, and appropriately brief — not marketing superlative, not a stats claim. But it is currently the page's third and final content section with no framing sentence tying the three facts together, and "Hear every word" reads as a feature callout more than a trust signal; it belongs (see §9) but should be reframed as answering "is this safe/simple/free," not as a mini feature list. |
| `sr-only` H2 "Why families and teachers choose spellingwords" | **REMOVE OR REFINE** | The visible heading is intentionally hidden, meaning sighted and screen-reader users get different framings of the same section — screen-reader users hear a "why choose us" marketing framing nothing else on the page uses. Either make a modest visible heading real, or drop the implied comparative claim ("why families... choose") the invisible text makes, since `docs/HOMEPAGE_SPEC.md` itself explicitly rejects that framing ("any framing that positions the absence of gamification as a feature by criticizing gamification elsewhere") and an unverifiable "why people choose us" framing is adjacent to that rejected pattern. |
| Footer | **DEFER TO VISUAL DESIGN** | Content (wordmark, Grades/Skills/How it Works/Privacy, tagline, copyright) is appropriately minimal; not homepage-specific research scope beyond confirming it does not duplicate primary homepage content, which it does not. |
| Metadata (`<title>`, meta description) | **KEEP** | Accurate, concise, not keyword-stuffed; see §14. |
| Structured data | **REPLACE (add)** | Currently none. Every other canonical page family in this repository emits `BreadcrumbList` at minimum; the homepage's complete absence of structured data is a gap, not a considered decision — see §14–15. |
| Internal links | **KEEP BUT REFINE** | Correctly links to all 6 Grade Hubs and `/skills`; correctly does **not** link to individual member pages, individual Skills, or `/play` directly (consistent with `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §7's "this standard does not require homepage links to any individual gateway" principle, generalized). Missing: any link that helps a visitor understand what "Browse by Skill" *contains* before committing a click (see §16). |
| SEO-oriented prose | **N/A (none present)** | The current page contains no long-form SEO prose of any kind — no paragraphs targeting "spelling words," "spelling practice for kids," etc. beyond the meta description. This is correct restraint, not a gap; see §13, §19. |
| Returning-visitor logic | **DEFER** | `docs/HOMEPAGE_SPEC.md` specifies an entire "Returning Visitor Experience" (localStorage-based recent-lists surface). None exists today. This research treats it as a genuine future enhancement (§9), not as something missing from *this* pass — it requires product/localStorage-schema decisions outside this research's scope. |

**Overall verdict:** the current homepage is **architecturally sound and editorially thin**, not structurally outdated or overly broad. It already gets the hard part right (flagship practice interaction on the page, no gamification, no accounts, restrained length, correct link scope) and is under-differentiated in exactly one place that matters (Grade vs. Skill journeys reading as one undifferentiated grid) plus missing the connective and trust prose that would make the page self-explanatory to a first-time, zero-context visitor. See §21 for the full current-vs-target comparison.

---

## 6. Three-primary-journey analysis

### 6.1 Practice Your Own Words

- **Should remain the strongest/immediate homepage action.** Confirmed by `CONSTITUTION.md` §3.1 ("This is the flagship homepage experience") and by the current implementation, which already does this correctly.
- **What a first-time visitor needs to understand before using it:** that it is free, that no account is required, and — implicitly, from the interface itself — that they type or paste words and the site will read them aloud and check spelling. The current pre-filled textarea communicates the mechanic without needing separate explanatory prose, consistent with `docs/HOMEPAGE_SPEC.md`'s (correct) observation that "the product is best explained by showing it, not describing it."
- **Should the practice input remain directly on the homepage, or merely be linked?** Directly on the homepage. This is not a close call: it is the Constitution's explicit flagship-journey requirement, and moving it behind a link would make the homepage's fastest path slower than its second-fastest path (grade browsing), inverting the intended priority.
- **Supporting explanation that is useful:** a one-sentence statement of mechanic ("type or paste your words, hear each one, and spell it back") is useful if the H1/subhead doesn't already convey it; anything longer duplicates what the interface itself demonstrates.
- **What becomes unnecessary product-marketing copy:** any copy explaining *why* typing your own words is valuable, any comparison to "other apps," any feature enumeration (session review, print support, etc.) — all explicitly rejected by `docs/HOMEPAGE_SPEC.md`'s own "What should never appear" list for this section, and consistent with the Constitution's rejection of "architecture for architecture's sake" applied to content.

### 6.2 Browse by Grade

- **What the homepage needs to say:** that curriculum-organized practice exists for Kindergarten through 5th Grade, and that choosing a grade is the second path for a visitor without their own list.
- **Should all six grades be directly visible/crawlable from the homepage?** Yes — already true today, and correct. This matches `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §7's confirmation that the Home → Grade Hub link is expected, mechanical, and already implemented uniformly, and it satisfies the "30-second test" better than a single "Browse by Grade" link would, since a parent typically already knows their child's grade and benefits from not needing an extra click to state it.
- **Should grade descriptions belong here?** Yes, in the minimal form already present — a few words distinguishing what changes at each grade (the current implementation's per-grade one-liners are reasonable; e.g. "Building blocks for confident spellers" for 2nd Grade). These must stay genuinely differentiating, not filler — see §9's evaluation of "K–5 curriculum overview" as REJECT for anything beyond this scale.
- **How much distinction among K–5 is useful at homepage depth?** Minimal — a single differentiating phrase per grade, not a paragraph, not the three-strand (Core/HFW/Themed) explanation, which is `CANONICAL_GRADE_HUB_STANDARD.md`'s job one click deeper.
- **What must instead be delegated to Grade Hubs:** the three-strand structure (Core Spelling / High-Frequency Words / Themed Spelling Practice), unit counts, "where to begin" guidance, and any grade-wide orientation prose beyond a one-line teaser — all explicitly owned by `CANONICAL_GRADE_HUB_STANDARD.md` §3–5 and prohibited from being pre-empted here.

### 6.3 Browse by Skill

- **What the homepage needs to say:** that a second, independent way to find practice exists for a visitor who already recognizes the specific concept their child needs (e.g., "short vowels," "prefixes," "homophones") rather than knowing their child's grade — the Constitution's exact framing ("I know what we need to practice").
- **Should `/skills` be the primary homepage destination rather than exposing individual Skill families or Skills?** Yes. `CANONICAL_SKILLS_HUB_STANDARD.md` §2 states plainly that `/skills` "MUST be the single canonical Skills Hub — no other page presents the Skill taxonomy as a browsable structure," and the same document's §12 anti-pattern list rejects "Skill Family Gateway pages." The homepage linking to individual Skill families or Skills would create exactly the kind of Hub-bypassing shortcut that standard was written to prevent, and would also fail the "every indexable destination should provide value... through a legitimate browse experience" test in `CONSTITUTION.md` §11 by duplicating the Hub's own reason to exist.
- **Should the 12 families appear anywhere on the homepage?** No. Naming individual families (Short Vowels, Consonant Digraphs, etc.) at homepage depth would either (a) list all 12, which is a directory-scale content block inappropriate for a routing page, or (b) list a partial, editorially arbitrary subset, which misrepresents completeness and creates a maintenance-drift risk if the frozen taxonomy is ever revisited. The homepage's job is to establish that skill-first browsing *exists as a coherent alternative to grade browsing*, not to preview its contents.

**Refined (v2 — resolved, was an open question in v1):** a single bridging clause is **not** sufficient. `CONSTITUTION.md` §3 defines Browse by Skill as one of exactly three primary journeys, on equal footing with Browse by Grade — not a subordinate or "secondary" path discovered only by reading a qualifier attached to the grade invitation. A visually and structurally identical treatment (six grade cards plus one stray skill card, as today) fails the Constitution's own 30-second legibility test: a first-time visitor scanning seven same-shaped cards has no signal that one of them represents a fundamentally different, coequal browsing system with its own 41-page directory behind it, while the other six represent one system (grades) they can already tell apart by number. This is a content/information-architecture defect, not a visual one — no amount of future card styling fixes an absent structural distinction in the underlying copy.

The resolved requirement: **Browse by Grade and Browse by Skill must each get their own heading-level treatment** (comparable document-outline depth — e.g., both as H2s, or both as labeled subsections of one "ways to browse" H2 — the exact heading level is a template decision, not frozen here), each with its own short orientation sentence stating what it is and when to choose it, so that a screen-reader user navigating by heading, an AI system extracting page structure, and a sighted visitor scanning the page all encounter the same two-systems distinction. This does **not** mean equal visual weight, equal card count, equal pixel area, or a forced parity of six-vs-six — Browse by Skill legitimately has one primary destination (`/skills`) where Browse by Grade has six (the Grade Hubs), and the content contract must not force an artificial symmetry the underlying architecture doesn't have. See §17, §19 for how this stays presentation-independent.

- **How to explain when someone should choose Skill browsing rather than Grade browsing:** the Skill section's orientation sentence should state the qualifying condition directly ("already know the specific pattern your child needs?") and use a small number of illustrative concept names (e.g., two to four — short vowels, prefixes, homophones) purely as recognition anchors, the same technique `CANONICAL_SKILLS_HUB_STANDARD.md` §4 requires of the Skills Hub's own opening ("terminology broad enough to describe the whole library"). **These illustrative names must remain plain text, not individual hyperlinks** — naming a Skill for recognition is not the same as exposing it as a homepage destination, and linking it directly would violate the same Hub-bypass prohibition discussed above (§15 makes this explicit). A true, cheaply-derived count (41 skills across 12 families, already computed live via `CURATED_SPELLING_SKILL_IDS.length`) belongs in this same sentence as a concrete, falsifiable scale signal — this is exactly the kind of orientation content §8's "Statistics/counts" analysis already treats as legitimate, not a new content type.
- **What must remain owned by the Skills Hub:** the complete 12-family/41-skill directory, family-level orientation copy, and every individual Skill's description — all explicitly owned exclusively by `/skills` per `CANONICAL_SKILLS_HUB_STANDARD.md` §3's "DOES NOT OWN" list, which the homepage must not pre-empt.

**Preserving the three-journey model:** nothing found in this audit or in the current implementation suggests a fourth journey is missing, consistent with the brief's note that a separate feature-gap pass already reached that conclusion. This research treats the three-journey model as settled and does not revisit it.

---

## 7. Hero/content-priority analysis

**Appropriate H1 territory:** the H1 should establish, in one clause, what the product *is* (a spelling-practice site) and its posture (calm, free, for children/K–5), without needing "spelling words," "K–5," and "parents/teachers" all crammed into the same seven words. The current H1 ("Practice spelling, starting now.") gets posture and action right but identity only partially — a visitor with zero context learns *what to do* (practice) faster than *what this is* (a children's spelling-practice product, not, say, a spelling-bee competition site or a dictionary tool). Recommendation: the H1 territory should cover product category and immediacy; a short subhead/kicker beneath it — already structurally present as unused whitespace in the current design — is the natural place for the identity clause the H1 doesn't carry alone. This is a content-contract recommendation, not final copy (per the brief's instruction not to write polished hero copy).

**Refined (v2):** this identity clause is **required**, not optional, and it carries a second job beyond naming K–5/free/no-account: it is the one sentence responsible for establishing that SpellingWords.app is a *structured, complete resource*, not merely a text box that reads words aloud. Without it, a visitor who never scrolls past the hero has no way to distinguish this product from a generic single-purpose "read my words aloud" utility — the hero interaction alone demonstrates the mechanic, but a mechanic demonstration does not, by itself, communicate scope or curriculum depth. One clause discharges this (e.g., naming that practice is organized by grade and by skill across Kindergarten through 5th Grade) without turning the hero into an educational pitch — see §10's evaluation of this exact question.

**Do "spelling words," "spelling practice," "spelling lists," K–5, parents/teachers belong in the opening?** "Spelling practice" or "spelling words" — yes, at least one, since it is the product's own name-adjacent core term and the plainest possible self-description. "K–5" as a literal phrase is not required in the H1 itself (grade cards make grade-range obvious one glance below the fold), but the concept of a bounded, appropriate age range should be recoverable from the hero region as a whole (subhead or the grade grid immediately following). "Parents/teachers" as an explicit phrase is unnecessary — the product's tone and lack of gamification already signal "this is adult-facing tooling for a child," and naming the audience explicitly risks reading as segmented "for parents / for teachers" framing, which §19's anti-pattern analysis rejects.

**How quickly should the three journeys become apparent?** Within the hero viewport or the very next scroll step — currently achieved: the hero *is* journey 1, and the secondary link ("or choose from our spelling lists") is the bridge to journeys 2–3, visible without scrolling on most viewports. This satisfies `docs/HOMEPAGE_SPEC.md`'s own three-click/ten-second first-time-visitor test, which remains a reasonable UX bar independent of that document's other, now-stale content.

**Does the custom-practice interaction belong inside or immediately adjacent to the hero?** Inside. Already correct in the current implementation; reaffirmed by the Constitution's flagship-journey framing (§6.1 above).

**One dominant action or multiple paths?** One dominant action (Start Practicing) with one clearly secondary path (the "or..." link) is correct hero-region grammar. The grid of three journeys should not all compete for primacy inside the hero itself — the hero's job is to deliver journey 1 completely and gesture at "there's more below," not to enumerate all three journeys with equal visual weight in the first viewport. This is a content-priority conclusion the visual redesign should honor, not a layout instruction.

**How much educational credibility belongs above the fold?** Very little — at most an implicit signal (calm tone, absence of hype, accurate specific claims like "no account needed" rather than vague superlatives). A dedicated credibility/methodology statement does not belong in the hero; see §9 and §11 on where (if anywhere) methodology language belongs.

---

## 8. Supporting-content analysis

Each candidate evaluated independently, per the brief's instruction to resist "the homepage should be longer" as a default.

| Candidate | Classification | Reasoning |
|---|---|---|
| Brief "how it works" explanation | **USEFUL BUT OPTIONAL** | A one-sentence mechanic statement (type → hear → spell) is useful if the hero doesn't already make it obvious through the live interface; it should never become a numbered "Step 1/2/3" feature walkthrough. |
| Why spelling practice matters (general essay) | **REJECT** | Exactly the "generic 'why spelling is important' essay" the brief's own anti-pattern list (§19) names; also outside the product's scope per `CONSTITUTION.md` §2 (spelling practice, not literacy education broadly). |
| How the site's curriculum is organized (Core/HFW/Themed) | **REJECT** | Owned exclusively by Grade Hubs (`CANONICAL_GRADE_HUB_STANDARD.md` §4) one click deeper; homepage-depth exposure would duplicate Hub content the Constitution's layer model exists specifically to prevent. |
| Explanation of Core Spelling | **REJECT** | Same reasoning; Grade Hub/Gateway-owned. |
| Explanation of High-Frequency Words | **REJECT** | Same; also risks the exact terminology precision problem (`CONSTITUTION.md` §5.5's HFW/irregular/heart-word distinctions) that only the Gateway-level content is equipped to handle correctly at any length. |
| Explanation of Themed Spelling Practice | **REJECT** | Same; Gateway-owned. |
| Explanation of browsing by Skill | **REQUIRED** (refined v2 to heading-level scale, not a single clause — see §6.3) | Without it, "Browse by Skill" reads as a mislabeled seventh grade tile — see §5's audit finding; resolved, not left open, in §6.3 and §24. |
| Explanation of custom spelling practice | **USEFUL BUT OPTIONAL** | Largely satisfied by the interface itself (§6.1); a short accompanying clause is enough if used at all. |
| K–5 curriculum overview (progression map) | **REJECT** | Explicitly prohibited even at the Grade Hub level by `CANONICAL_GRADE_HUB_STANDARD.md` §11 ("full K–5 progression maps") and by `CANONICAL_SKILLS_HUB_STANDARD.md` §12; a fortiori rejected at homepage depth. |
| Structured-literacy/evidence-based methodology language | **DEFER** | Legitimate content, but belongs at the level where it can be specific and honest (a future About/Methodology page, or the Grade Hub/Skill-page evidence ladder already defined in `CANONICAL_SKILL_PAGE_STANDARD.md` §14) rather than as an unsupported homepage claim. A bare, unqualified "structured literacy" label at homepage depth risks the exact "developmental or grade claim... check against authoritative literacy sources before publishing" requirement that standard imposes on Skill pages — the homepage has no comparable sourcing mechanism today. |
| Parent guidance | **REJECT** | `CANONICAL_GRADE_HUB_STANDARD.md` §11 and `CANONICAL_SKILLS_HUB_STANDARD.md` §12 both explicitly prohibit audience-segmented "For Parents/Teachers/Students" sections at their respective layers; the same reasoning applies with equal or greater force at homepage depth, where audience-segmentation would triple content for no routing benefit. |
| Teacher guidance | **REJECT** | Same reasoning. |
| Student-facing guidance | **REJECT** | Same reasoning; also, per `docs/HOMEPAGE_SPEC.md`'s own (retained-as-correct) observation, children rarely read homepage copy directly. |
| Trust/credibility section | **REQUIRED**, refined scope (v2) | See §24's dedicated re-evaluation: the current three facts (no account, hear every word, works everywhere) mix genuine trust signals with implementation/feature trivia. Refined required content is privacy (no account/no data collection), calm design (no gamification), and free — plus one fact that v1 omitted entirely: that the practice content itself is a curated, structured K–5 resource, not merely a mechanic. Device compatibility and audio playback move to optional/visual-design material (§24). Still 2–4 concrete, falsifiable statements, not an essay. |
| Product identity / scope statement ("this is a real curriculum, not just a widget") | **REQUIRED (new in v2)** | Distinct from the trust band: this is a single orientation sentence (hero-adjacent, per §7's refinement) stating that practice is organized across all of Kindergarten through 5th Grade and by spelling skill — not a claim about safety or values, but a claim about scope and structure. Without it, the three-journey grid alone requires a visitor to infer scope from card-counting rather than being told directly; see §7 (Full analysis: §24). |
| Educational philosophy | **REJECT** | Belongs to a future About/Methodology page if one is built; not homepage-scoped. |
| FAQ | **REJECT** | See §19; no genuine homepage-scale FAQ content has been identified that isn't better owned by a deeper page, and the brief explicitly flags "giant FAQ sections" as a default anti-pattern to justify, not assume. |
| Testimonials/social proof | **REJECT** | No genuine testimonials exist; `docs/HOMEPAGE_SPEC.md` itself already correctly rejects fabricated or unverifiable social proof, and this research concurs. |
| Statistics/counts | **USEFUL, encouraged where real and orientation-relevant (refined v2)** | A true, cheaply-derived count (e.g., "41 spelling skills," "six grade levels," already computable live via `CURATED_SPELLING_SKILL_IDS.length`/`gradeConfig.length`) is not merely tolerated but actively useful inside the Browse-by-Skill orientation sentence (§6.3) and the identity/scope statement (this table, above) — it is not a "marketing-stat block" (§19) when it is a real, programmatically sourced inventory count used for orientation and scale-signaling, not persuasion. A promoted, boxed, emphasized "trusted by X families" style stat remains REJECT. |
| Sample spelling words | **KEEP (already present)** | The pre-filled textarea's sample words serve the interaction, not marketing; no separate "sample words" content block is needed beyond this. |
| Popular spelling lists | **REJECT** | No genuine "popularity" signal exists (no analytics-driven ranking is described anywhere in the repository); fabricating a "popular" framing would be an unverifiable claim of the kind §9/§19 reject. |
| Popular Skills | **REJECT** | Same reasoning; also would pre-empt the Skills Hub's complete, order-preserving presentation with an arbitrary subset. |
| Recent content | **REJECT** | The brief's own anti-pattern list rejects "blog-like content feeds unless there is a real reason"; no such reason exists — this is not a publication. |
| "Why choose us" marketing | **REJECT** | See §5's audit finding on the `sr-only` heading; a comparative "why choose us" framing implies competitors are being characterized, which `docs/HOMEPAGE_SPEC.md` itself already correctly forbids. |
| Site-wide spelling progression | **REJECT** | Same as K–5 curriculum overview above. |
| Related resources | **REJECT (as a distinct section)** | Nothing currently qualifies (no Teaching Guides content system is live per `CONTENT_MODEL.md` §5.7's description of it as supporting, not yet built out); revisit only if/when such a system exists. |

---

## 9. Homepage responsibility boundaries

| Information type | Owner |
|---|---|
| Site/product explanation ("what is this") | **Homepage** (uniquely — no deeper page re-introduces the product) |
| Product scope/identity claim ("a complete K–5 resource, not just a widget") | **Homepage** (uniquely, refined v2 — one sentence; see §7, §8, §24) |
| Grade-level orientation (that six grades exist, one-line differentiation) | **Homepage** (teaser) → **Grade Hub** (full orientation) |
| Skill-first orientation (that skill browsing exists as a coequal system, with illustrative concept names) | **Homepage** (teaser, refined v2 — heading-level, not a subordinate clause; see §6.3) → **Skills Hub** (full directory) |
| Curriculum progression (why short vowels precede digraphs, etc.) | **Grade-Strand Gateway** (Core specifically) |
| Core/HFW/Themed relationship | **Grade Hub** |
| Full grade-strand inventories (every unit/set/theme) | **Grade-Strand Gateway** |
| Skill-family taxonomy (12 families, 41 skills, in full) | **Skills Hub** |
| Spelling-pattern explanations (what a pattern is, how it works) | **Skill page** |
| Examples (word lists, demonstration sets) | **Skill page** (demonstration) / **Grade Unit / member page** (practice set) — never the Homepage |
| Teaching guidance (routines, diagnostic response, mistakes) | **Skill page** |
| Practice instructions (mechanics of the session) | **Practice experience** (`/play`) itself, plus the homepage's own interface for journey 1 |
| Custom-word entry | **Homepage** (uniquely, per Constitution §3.1 — this is the one interaction the homepage itself hosts rather than routes to) |
| Actual practice interaction | **Practice experience** (`/play`) |
| Grade selection | **Homepage** (all 6, one click) |
| Skill selection | **Skills Hub** (all 41); Homepage only routes to the Hub, does not select |
| FAQs | **No current owner site-wide**; if introduced anywhere, Skill pages already have a defined, restrained FAQ policy (`CANONICAL_SKILL_PAGE_STANDARD.md` §13) that should be the model — not the homepage |
| Educational methodology/trust explanation | **Homepage** (a few restrained, falsifiable sentences) → any future About/Methodology page (fuller treatment, out of current scope) |

**Where the homepage must not duplicate a deeper layer:** Core/HFW/Themed explanation, full grade-strand inventories, the 12-family taxonomy, any individual Skill's pattern explanation, any Grade Unit's word list or practice mechanics. Every one of these is explicitly and repeatedly reserved to its owning layer by the frozen standards cited in §2 — the homepage research finds no new justification to reopen any of those boundaries.

---

## 10. Educational analysis

**Should the homepage explicitly describe the curriculum as systematic?** A brief, true, non-technical characterization ("organized by grade, Kindergarten through 5th") is appropriate; the word "systematic" itself is unnecessary homepage-depth jargon that adds a claim (rigor) without adding information a parent can act on. Leave systematicity as something the Grade Hub demonstrates through content, not something the homepage asserts through adjective choice.

**Should it mention structured literacy?** No, not as a named framework/label at homepage depth. This is a professional-inference recommendation, not a repository fact: "structured literacy" is a specific, contestable pedagogical term with its own evidence and advocacy history; asserting alignment with it on the homepage — the page with the least room for nuance or citation — creates a claim `CANONICAL_SKILL_PAGE_STANDARD.md`'s own evidence ladder (§14) would require verification for at a deeper page, and the homepage has no comparable sourcing mechanism. If the site wants to make this claim anywhere, a future About/Methodology page is the appropriate, citable location.

**Should it explain sound-spelling patterns, morphology, high-frequency words, etc.?** No — see §8; each is Skill-page- or Gateway-owned.

**How can the homepage demonstrate educational credibility without becoming an educational article?** Through restraint and precision rather than assertion: accurate, specific, falsifiable statements ("no accounts," "no timers," "K–5 curriculum organized into grade-by-grade practice") read as more credible to an informed parent or teacher than an unsupported claim of rigor, and cost nothing in length. This mirrors `docs/HOMEPAGE_SPEC.md`'s own correct observation that "specific, accurate claims... are exactly what AI systems cite" (§14 below extends this to human trust-formation as well).

**What claims would require stronger sourcing?** Any claim about *efficacy* ("children learn faster this way," "proven method") or *prevalence* ("the most common spelling app," "trusted by X families") — both categories the repository has no evidence for today and both explicitly rejected in §19.

**What terminology is parent-readable versus unnecessarily technical?** Parent-readable and appropriate at homepage depth: "spelling practice," "grade," "skill" or "spelling pattern," "high-frequency words" (as a plain descriptive phrase, not a technical claim). Unnecessarily technical at homepage depth: "structured literacy," "orthography," "morphology," "phoneme-grapheme correspondence," "Core Spelling"/"Themed Spelling Practice" as capitalized proper-noun strand names (these are Grade Hub-level vocabulary, not homepage vocabulary).

**Distinguishing fact types used in this analysis:**
1. Repository/project fact: the taxonomy counts (12 families, 41 skills, six grades), the absence of any efficacy claim or sourced pedagogical framework anywhere in the current content model.
2. Externally supported educational finding: none is asserted in this section as a homepage requirement — this research deliberately does not introduce new pedagogical claims requiring citation.
3. Professional inference/recommendation: the "structured literacy" avoidance recommendation above, and the general claim that specific/falsifiable statements read as more credible than assertions of rigor — both are editorial judgment, not measured findings.

---

## 11. Competitive/marketplace research

**Method and limitation, stated explicitly:** two bounded web searches were run (not a systematic competitive audit, not direct hands-on navigation of competitor homepages, no A/B or analytics data). Results were thin and mostly pointed to secondary aggregator/roundup content (e.g., "best spelling app" listicles) rather than primary source material about competitor homepage IA. This section's findings should be read as **directionally useful, not authoritative** — a genuine competitive audit would require live navigation of specific competitor homepages, which this research pass did not perform.

**Observed facts (from search results, not verified firsthand):**
- VocabularySpellingCity, historically a well-known K–12 spelling/vocabulary site, was acquired by Learning A-Z and rebranded to Vocabulary A-Z with a classroom-license pricing model — i.e., a shift toward institutional/paid positioning rather than a free consumer tool.
- General education-website UX guidance (not spelling-specific) consistently emphasizes: reaching key content within three clicks, clear information hierarchy organized around user goals, and prominent, repeated calls to action — all directionally consistent with this document's own three-click, routing-first recommendation, though the source material was aimed at institutional/school websites, not consumer edtech products, so its transfer value is partial.

**Professional inference drawn from this limited research (not a verified competitive finding):** consumer spelling/literacy products in this space skew toward either (a) gamified, account-gated platforms (points, streaks, avatars) or (b) institutional/classroom-license tools whose homepages are built to sell to administrators, not to serve a parent in one sitting. SpellingWords.app's positioning — free, account-free, no gamification, immediately usable — is a genuine differentiator *if the homepage demonstrates it rather than claims it*, which reinforces this document's restraint-over-assertion recommendation in §10. This inference should not be treated as validated; it is offered as a plausible reading of thin evidence, not a competitive-analysis conclusion the team should cite externally.

**No fabricated competitor facts, screenshots, or specific-page claims are included in this section**, per the brief's explicit prohibition.

---

## 12. SEO/topical-authority findings

**No keyword-volume or SERP tooling was used.** This research had access to general web search only, not a keyword-research or rank-tracking tool, and no search-volume figures are asserted anywhere in this document. This is stated explicitly per the brief's requirement rather than fabricating numbers.

**What belongs in H1/title/meta-description territory:** the homepage's own identity — "spelling practice," "spelling words," a plain statement that it is free and account-free. This is already substantially achieved by the current title/description (§14).

**Which broad concepts should appear naturally in visible copy:** "spelling practice," "spelling words," "grade" (K–5), "spelling skill"/"spelling pattern" — each already has, or under this research's recommendations will have, a natural, non-keyword-stuffed home in the hero, routing headings, or card copy.

**What queries should instead be owned by deeper pages:** any grade-specific query ("2nd grade spelling words," "3rd grade spelling list") belongs to the corresponding Grade Hub/Gateway/member page; any pattern-specific query ("short vowel words," "silent e words," "homophones list") belongs to the corresponding Skill page. The homepage should not contain enough grade- or pattern-specific prose to compete with those pages for the same query — doing so would be homepage/deeper-page cannibalization, which `CONSTITUTION.md` §15 already names as a risk to avoid sitewide ("the same user intent should have one canonical destination").

**Does homepage content need to be long to perform well?** No assumption of that kind is made here. `CONSTITUTION.md` §15 states discoverability "must not dictate the product," and nothing in this research finds a case where homepage length would meaningfully improve topical authority that isn't already, and more appropriately, carried by the Grade Hub/Gateway/Skill layers, which exist specifically to own depth. A short, precise, well-linked homepage is the recommended target (§16–17).

**How internal linking from the homepage should reinforce the canonical architecture:** by linking only to the layer immediately below it — all 6 Grade Hubs and the Skills Hub — and not skipping layers to link individual Gateways, member pages, or Skills directly. This preserves the "Home → Grade Hub (1 click) → Gateway (2 clicks) → Member (3 clicks)" distance `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §7 explicitly calls "the intended and correct architecture," and the parallel "Home → Skills Hub → Skill" distance `CANONICAL_SKILLS_HUB_STANDARD.md` §1 defines for the skill-first path.

---

## 13. GEO/AEO findings

**No AI-citation testing was performed.** No queries were run against a live AI answer engine to observe whether or how it cites this site's homepage; this section is qualitative content-quality guidance only, consistent with the brief's requirement to state this limitation explicitly.

**What would genuinely make the homepage understandable and citable, based on ordinary content-quality principles (not AI-specific tactics):**
- An explicit, unambiguous statement of product identity in visible prose (not just implied by the interface) — e.g., a sentence stating plainly that this is a free, no-account spelling-practice website for grades K–5. This is the single highest-value AEO/GEO addition this research identifies, because it is also independently required for the human "governing reader question" in §4 — the same content serves both purposes, which is the correct outcome (content written for people, not manufactured for machines).
- Clear hierarchy: one H1, clearly labeled H2s for the two browsing journeys, matching heading structure used consistently elsewhere in the canonical architecture.
- Factual, specific statements ("no account required," "K–5," "41 spelling skills," "six grade levels") rather than vague claims — directly reusable, quotable facts.
- Stable entities: "spellingwords.app," "Grade Hub," "Skill," and the six grade names are already consistent, stable terms across the site; the homepage should use the same terms rather than inventing homepage-only synonyms.
- Useful internal links to the Grade Hubs and Skills Hub, which is also already a GEO-relevant signal of a genuinely structured site rather than a single orphan page.
- Fully crawlable, server-rendered HTML — already true (Astro static output, no client-only content gating).

**Explicitly not recommended, per the brief's own prohibitions and consistent with every other canonical standard in this repository:** hidden AI-facing summaries, keyword blocks, schema added solely because an LLM might read it, or any "AI chunk" formatting gimmick. `CANONICAL_SKILLS_HUB_STANDARD.md` §10 and `CANONICAL_GRADE_HUB_STANDARD.md` §11 already reject these at their own layers in near-identical language; this research applies the same standard to the homepage rather than inventing a homepage-specific exception.

---

## 14. Metadata and structured-data analysis

**Current `<title>`:** "spellingwords — Practice spelling words." Accurate, appropriately short, matches the brand name convention used elsewhere. **KEEP.**

**Current meta description:** "Practice spelling with your own words or choose from hundreds of curated spelling lists. Free, no account needed." Accurate, specific, matches actual visible content, states the two core differentiators (free, no account) in exactly the terse, falsifiable way §10/§13 recommend. **KEEP.** One precision note for a future editorial pass: "hundreds of curated spelling lists" is true in raw page count (152 canonical-active pages) but slightly overstates what a visitor experiences as "lists" at homepage depth (six grades + one skill directory); this is a minor wording risk, not a factual error, and does not require action as part of this research.

**Canonical handling:** `Layout.astro` derives canonical URL centrally from `Astro.url.pathname`; homepage inherits this correctly with no override needed.

**Heading hierarchy:** currently H1 (hero) → H2 (`#curated-heading`, "Hundreds of spelling lists, ready to use.") → H2 (`sr-only`, trust band). This is structurally valid HTML outline but semantically under-labels the two distinct journeys inside the single "curated lists" H2 — see §5's audit finding.

**JSON-LD / structured data:** **currently absent entirely.** This is the clearest concrete gap in this analysis. Every other canonical page family in the repository (Grade Hub, Gateway, Skill page, Skills Hub) emits at minimum a `BreadcrumbList`, and several emit `ItemList`/`FAQPage` where genuinely warranted. The homepage's total absence of structured data is inconsistent with the rest of the site, not a deliberate minimalist choice recorded anywhere.

**Refined (v2) — firm, per-type recommendations.** The governing test applied to each: *does this structured data accurately and usefully represent meaningful visible homepage content?* Not "does a matching schema.org type exist," not "would this help an LLM."

- **`WebSite` (name, url): RECOMMENDED.** A legitimate, minimal, honest site-level fact that only the homepage (or a dedicated site-level entity, which doesn't exist here) can legitimately assert — this is the one type genuinely homepage-unique, for the same reason a Grade Hub uniquely emits grade-wide `BreadcrumbList` starting points. Does not overclaim anything; corresponds to real, stable visible content (the site's own name and root URL).
- **`SearchAction` (`potentialAction`): REJECTED, not merely deferred.** No real site-search feature exists today. Adding this schema would describe a capability the page does not have — exactly the "writing structured data before the visible content it's supposed to describe exists" anti-pattern `CANONICAL_SKILL_PAGE_STANDARD.md` §18 names. If a genuine site-search feature is ever built, this should be reconsidered then, grounded in that real feature — not spec'd speculatively now.
- **`Organization`: REJECTED.** The site is a product, not a company with a public-facing organizational identity distinct from the product itself; nothing on the homepage (or anywhere else in the repository) currently supports organization-level facts (founding date, legal entity, address) an `Organization` type would normally carry. Adding one would be schema added because a type exists — explicitly rejected by every sibling standard's structured-data section.
- **`ItemList`: RECOMMENDED, but narrower than v1 proposed.** v1 recommended one `ItemList` spanning all seven destinations (six Grade Hubs + the Skills Hub). Re-examined against the refined §6.3 conclusion that Grade and Skill are two *different kinds* of browsing system, not one flat list of seven peers, a single mixed-cardinality `ItemList` would misrepresent the page's own (refined) visible structure — it would imply seven interchangeable list items where the visible content now clearly presents "six grades" and "one skill directory" as two distinct groups. The corrected recommendation: **one `ItemList` for the six Grade Hub destinations only** (a genuine, visible, enumerable list — directly analogous to how a Grade Hub's own `ItemList` represents its three Gateway destinations). The single Skills Hub link does not need or benefit from `ItemList` wrapping — schema.org's `ItemList` exists to represent a *list*, and a list of one item adds a schema type without adding real information; a plain link is sufficient and more accurate.
- **`BreadcrumbList`: NOT APPLICABLE**, confirmed — the homepage has no breadcrumb (it is the root), consistent with every other page family's breadcrumb starting at Home.
- **`FAQPage`: REJECTED**, confirmed — §8 rejects a homepage FAQ outright; no schema should describe content that doesn't exist.

**Whether any site-level schema belongs on the homepage that doesn't belong on deeper pages:** yes — `WebSite` is the one type that is homepage-appropriate specifically *because* it describes the site as a whole. This remains the only schema recommendation in this document scoped as "belongs uniquely at this layer"; the `ItemList` recommendation above is the same pattern already used one layer down, not a new pattern.

---

## 15. Internal-linking architecture

| Destination | Priority | Reasoning |
|---|---|---|
| Practice Your Own Words (the interface itself, not a link) | **Primary** | The flagship interaction lives on the page; the "link" is the CTA button to `/play?list=...`, generated dynamically from entered words. |
| Six Grade Hubs | **Primary** | Constitution-required, already implemented, matches the "Home → Grade Hub, 1 click" architecture. |
| Skills Hub (`/skills`) | **Primary** | Coequal third journey per the Constitution; refined (v2) to require heading-level, not card-level, treatment distinct from the six grade links (§6.3) — the link itself was already correct in v1, but its surrounding structure was not. |
| Individual Grade-Strand Gateways | **Omitted** | `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §7 explicitly states homepage links to individual Gateways are not required and that adding them "would blur, not clarify, layer responsibility." |
| Individual Skills (including the illustrative concept names named in the Browse-by-Skill orientation, §6.3) | **Omitted / named-but-unlinked** | `CANONICAL_SKILLS_HUB_STANDARD.md` reserves individual Skill links to the Hub exclusively. The refined Browse-by-Skill orientation sentence (§6.3) names two to four illustrative Skill concepts as plain, non-hyperlinked text — recognition anchors, not a partial directory — so that the requirement is satisfied without creating a second, unauthorized entry point into individual Skill pages. |
| Individual member pages | **Omitted** | No standard anywhere in the repository supports homepage-level links this deep; would violate every layer boundary cited in §9. |
| Informational/supporting pages (About, Methodology, Guides) | **Omitted today** | None of these pages currently exist in the live route set (`docs/HOMEPAGE_SPEC.md`'s references to `/about` and `/guides` are stale — see §21). If such pages are built in the future, a secondary/footer-level link (not primary decision-zone placement) would be appropriate, consistent with that document's own original guidance on placement. |

**Refined (v2) — the "one layer down" rule is frozen, not merely a default.** The brief's stress test asked whether architectural purity was being mistaken for good UX here. Re-examined against the alternative (selectively exposing a small number of deeper destinations for "genuine user/search value"), the strict rule holds for this specific site, for reasons grounded in evidence rather than a general preference for restraint: `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §7 states in its own words that deeper homepage links "would blur, not clarify, layer responsibility" — this is a direct textual authority, not an inference this research is making independently. A ~150-page, six-grade, twelve-family site is not large enough that "one layer down" creates a genuine discovery gap (every Gateway and every Skill is reachable in exactly one more click from a page the homepage already links to), so the crawl-depth/topical-authority cost of staying strict is negligible, while the layer-boundary benefit (every page family's responsibility stays legible and non-duplicated) is the same benefit every other canonical standard in this repository was written to protect. **Recommendation: freeze "exactly one layer down, no exceptions" as the homepage's internal-linking rule**, revisitable only via an explicit future amendment with a stated, non-generic reason — not softened into a discretionary "selectively expose where valuable" rule, which would reopen a boundary question every sibling standard has already closed.

**Preserving crawlability while avoiding a directory:** the current seven-link routing grid plus footer links already achieves this; no additional destination should be added to the primary decision zone. This reinforces §12's finding that homepage length and link count should stay minimal by design, not as a byproduct of not having gotten to it yet.

---

## 16. Content depth and page length

**Principled recommendation, not a word-count target:**

The homepage should contain exactly enough content to: (1) let the practice interaction work end-to-end without leaving the page, (2) make both browsing journeys understandable and correctly differentiated from each other and from journey 1, and (3) supply the small number of concrete, falsifiable trust facts a first-time visitor needs before committing to any journey. Nothing beyond that has earned a place, per §8 and §9's per-candidate rejections.

**What must appear before a user reaches the three journeys:** essentially nothing extra — the three journeys *are* the first thing the page communicates, by design (§4, §7).

**What can appear below the primary decision zone:** the trust band (already present), and, potentially, a brief closing orientation for a visitor who scrolled the whole page without acting (§17 target architecture's "closing navigation/orientation" block) — kept intentionally light.

**Where the point of diminishing returns begins:** immediately after journeys 1–3 and the trust band are each represented once. A second explanation of any journey, a restated trust claim, or a "one more reason to choose us" block would all cross into diminishing returns.

**What belongs on future About/Methodology/Help pages instead of the homepage:** structured-literacy/methodology framing (§10), any fuller "how the curriculum was built" narrative, and any FAQ content that turns out to have genuine, non-duplicative value once written — all deferred, not rejected outright, but explicitly not homepage-scoped.

**Conclusion:** the desired result is **not** the longest authoritative homepage. Measured against the current implementation, the target is only modestly longer — a differentiating heading/subhead for the two browsing journeys, one or two connective sentences, and the metadata/schema additions in §14 — not a new page's worth of content.

---

## 17. Target semantic architecture

Presentation-independent. No cards, colors, icons, or layout implied by any block below; each block is evaluated against "would this content still make sense after a complete visual redesign?"

```
Header / navigation (existing SiteHeader — out of this research's scope)

Hero
  H1 — product category + immediacy ("practice spelling" territory; see §7)
  Required identity/scope clause — K–5, free, no account, AND that practice is
    organized by grade and by skill across the full K–5 span (only if not
    already covered by H1; may live as a subhead/kicker — see §7, §24)
  Practice Your Own Words interaction (word entry, live count, primary CTA)
  Secondary bridge to the two browsing journeys

Browsing journeys (two coequal, heading-level subsections — see §6.3, §24)
  Section-level framing distinguishing "know your child's grade" from
    "know the skill" as two different, equally legitimate ways to find practice
  Browse by Grade
    Six Grade Hub destinations, each with a single differentiating clause
  Browse by Skill
    One Skills Hub destination, with its own orientation sentence, a small
      number of illustrative concept names (named, not individually linked —
      see §15), and its real count (e.g. "41 skills across 12 families")

Trust / product-identity band
  2–4 concrete, falsifiable statements spanning privacy/no-account, no
    gamification, free, and structured/curated content — framed as facts
    about the product, not as a comparative "why choose us" claim (§24)

Closing navigation / orientation
  Footer-level wayfinding (existing SiteFooter — out of this research's scope)
```

**Per-block specification:**

| Block | Purpose | Owns | Semantic depth | Primary link destinations | Must not duplicate | Required/Optional |
|---|---|---|---|---|---|---|
| Hero identity/scope clause | Establish what the product is, its posture, and its scope (K–5, structured) in one glance | Product identity **and scope** statement (uniquely — no other page re-introduces the product this way; refined v2, §7–8) | ~1 sentence beyond the H1 | none (identity only) | Grade Hub/Gateway orientation language | **Required** |
| Hero interaction | Deliver journey 1 completely on-page | The custom-practice entry point | Interactive component, not prose | `/play?list=...` (generated) | Nothing — this is the unique homepage responsibility | **Required** |
| Browsing-journeys framing | Distinguish "know the grade" from "know the skill" as two coequal systems, not one grid | The heading-level structure that makes Browse-by-Skill legible as coequal, refined from a single clause in v1 (§6.3, §24) | ~1 sentence of framing plus two headed subsections | n/a (framing only) | Skills Hub's own opening orientation | **Required** |
| Browse by Grade | Route to all six grades with minimal differentiation | Six one-line grade teasers | ~6 short phrases | Six Grade Hubs | Grade Hub's full orientation, strand structure | **Required** |
| Browse by Skill | Route to the Skills Hub as a coequal system, headed distinctly from Browse by Grade | One orientation sentence, 2–4 illustrative (unlinked) concept names, and the real skill/family count | ~2–3 sentences | Skills Hub | Skills Hub's family/skill directory | **Required** |
| Trust/identity band | Supply the minimum facts needed to commit to a journey, including that the content itself is structured/curated | 2–4 falsifiable product facts (privacy, no gamification, free, structured content — refined v2, §24) | ~4 short statements | none (or implicit reinforcement of primary CTAs) | Nothing owned elsewhere; must not overlap with a future About/Methodology page's fuller claims | **Required** |
| Closing navigation | Wayfinding for a visitor who reached the bottom without acting | Footer-owned; not new homepage content | n/a | Footer's existing scope | Nothing new | **Optional / already exists** |

---

## 18. Current vs. target comparison

| Element | Current homepage | Recommended target | Reason for change |
|---|---|---|---|
| H1 | "Practice spelling, starting now." | Same territory; consider a short adjacent identity clause | H1 alone under-delivers product identity for a zero-context visitor (§7) |
| Practice interaction | Present, correct | Unchanged | Already meets the Constitution's flagship-journey requirement |
| Routing section heading | "Ready-Made Lists" / undifferentiated grid | Explicit framing distinguishing grade-first from skill-first browsing | Current heading flattens two structurally distinct journeys into one "lists" category (§5, §6.3) |
| Skills tile | One card, visually identical to a grade card | Heading-level coequal section, distinct from the six grade destinations, with its own orientation sentence and 2–4 named (unlinked) illustrative concepts | Under-communicates a Constitution-frozen primary journey; resolved in v2 from an open question to a firm requirement (§6.3, §24) |
| Trust band | Present, `sr-only` "why choose us" framing; facts are no-account / hear every word / works everywhere | Present, reframed as plain product facts without a hidden comparative claim; refined fact set is privacy, no gamification, free, and structured/curated content | Accessibility/framing mismatch (§5); refined v2 fact set replaces two feature/implementation facts with a stronger, previously-missing structural-credibility fact (§24) |
| Product identity/scope | Implicit only (three journeys, no stated claim) | One required sentence stating K–5 scope and grade+skill organization | v1 treated this as adequately implied; v2 finds it needs to be explicit (§7, §24) |
| Structured data | None | `WebSite` (required); `ItemList` scoped to the six Grade Hubs only, not all seven destinations | Total absence is inconsistent with every other canonical page family (§14); `ItemList` scope narrowed in v2 to match the refined two-systems structure (§24) |
| Metadata | Accurate, concise | Unchanged | Already correct |
| Internal links | Six Grade Hubs + Skills Hub, correctly scoped | Unchanged | Already correct depth and restraint |
| Returning-visitor logic | None | Not addressed by this research | Out of scope; requires separate product/data decisions |
| Overall length | Short | Modestly longer (one framing sentence, one skill-journey clause, no new sections) | §16's diminishing-returns analysis finds almost no case for material lengthening |

**Determination:** the current homepage is **architecturally sound but editorially thin and, in one place, under-differentiated** — not structurally outdated, not overly broad, and not overly thin at the section level (it has the right sections; several just need one or two more sentences and one heading correction). The single architectural (not merely editorial) issue this comparison surfaces is the Skills-parity requirement, resolved firmly in §6.3 and summarized in §24 — no longer an open question.

---

## 19. Future visual-redesign constraints

Every block in §17 was tested against "would this content still make sense if the visual presentation were completely redesigned?" None of the recommended content assumes cards, a particular grid, icons, or color-coding. Specifically:

- The hero's identity clause and interaction are presentation-neutral prose/interaction, not "the card at the top."
- The browsing-journeys framing is written as "two ways to browse," not "the two columns below" or "the cards in this row" — consistent with the presentation-independence language `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §8 and `CANONICAL_SKILLS_HUB_STANDARD.md` §13 already require of their own layers, extended here to the homepage.
- Six grade teasers and one skill teaser are described as a list of destinations with short accompanying phrases — renderable as cards, a table, a list, an illustrated panel system, or anything else a future designer chooses, without any copy rewrite.
- The trust band's statements are self-contained facts, not visually-dependent ("see below," "the icons above") language.
- **Coequal does not mean visually equal (v2 clarification).** §6.3's requirement that Browse by Grade and Browse by Skill each get heading-level treatment is a document-outline and content-completeness requirement, not a visual-parity one. A future designer may legitimately give the six Grade Hubs six similarly-sized panels and the Skills Hub one larger, differently-shaped panel, an illustrated diagram, a distinct color treatment, or any other asymmetric composition — as long as both sections remain reachable via a proper heading, both carry their own real orientation content, and neither is nested inside or subordinate to the other in the underlying markup. This standard freezes *that both exist as first-class, headed sections*, not *how much screen space either occupies*.

**No visual decision is made or implied by this research** — not layout, not color, not icon choice, not animation, not card shape. Where the current implementation's actual CSS/animation choices were referenced in §3 and §5 (e.g., scroll-reveal, hover states), they were described as implementation facts for audit purposes only, never as requirements this research imposes on a future redesign.

---

## 20. Anti-patterns/rejected additions

Explicitly evaluated and rejected (or, where noted, already correctly avoided by the current implementation):

- **Giant FAQ sections** — rejected; §9, no genuine homepage-scale FAQ content identified.
- **Generic "why spelling is important" essays** — rejected; outside product scope (`CONSTITUTION.md` §2), already absent today.
- **Keyword-heavy SEO copy** — rejected; already absent today, and §12 finds no case for adding it.
- **Duplicate "for parents / for teachers / for students" sections** — rejected; §9, consistent with the same prohibition already frozen for Grade Hubs and the Skills Hub.
- **Huge grade/skill directories** — rejected for skills (Skills Hub-owned exclusively); the six-grade list is not "huge" and is explicitly required (§6.2).
- **Full curriculum maps** — rejected; §8, §10.
- **Testimonials without genuine testimonials** — rejected; none exist, none should be fabricated.
- **Fabricated statistics** — rejected; the one statistic recommended for retention (41 skills) is real and already programmatically sourced, not fabricated.
- **Arbitrary "trusted by X" claims** — rejected; no such data exists.
- **Excessive methodology prose** — rejected; deferred to a future About/Methodology page (§10, §16) rather than homepage-scoped.
- **Repeating Core/HFW/Themed explanations already owned deeper** — rejected; already correctly absent today, confirmed as continuing to belong to the Grade Hub/Gateway layer (§9).
- **Individual Skill links on the homepage** — rejected; already correctly absent today (§15).
- **Individual member-page links on the homepage** — rejected; already correctly absent today (§15).
- **Blog-like content feeds** — rejected; no editorial/publication model exists for this product.
- **AI-targeted hidden content** — rejected; explicitly prohibited by every sibling standard cited in §13, and already absent today.
- **Visual decisions masquerading as content requirements** — actively guarded against throughout §17–19; this research states no visual requirement.

---

## 21. Repository conflicts and documentation implications

**Conflicts found:**

1. **`docs/HOMEPAGE_SPEC.md` vs. the frozen architecture.** This document is the homepage's only prior dedicated specification, and it conflicts with current, frozen authorities in several concrete ways:
   - It repeatedly references `/spelling-lists` as "the Spelling Library" — a route tree `PUBLIC_URL_ARCHITECTURE.md` confirms has been "removed entirely," pre-launch, with no redirect.
   - It references `/about` and `/guides` as existing internal-linking destinations; neither exists in the current `src/pages/` tree.
   - Its four-tier "Information Hierarchy" (Entry → Library Invitation → Trust and Values → Supporting Discovery), each with its own "Required content" list, is considerably heavier than this research recommends (§16) and predates the current three-journey Constitution model — it frames "the library" as a single undifferentiated destination, not as two structurally distinct journeys (grade-first and skill-first).
   - **Controlling authority:** `docs/architecture/CONSTITUTION.md` and `docs/architecture/PUBLIC_URL_ARCHITECTURE.md`, both of which postdate `docs/HOMEPAGE_SPEC.md` and explicitly claim precedence over older documentation that conflicts with them (`CONSTITUTION.md` §17).
   - **Smallest recommended reconciliation:** mark `docs/HOMEPAGE_SPEC.md` as superseded/historical once a `CANONICAL_HOMEPAGE_STANDARD.md` is written and approved from this research, the same way `CANONICAL_SKILLS_HUB_STANDARD.md` superseded specific sections of `docs/architecture/SKILLS_MODEL.md` rather than deleting it outright.
   - **Blocks homepage work?** No — this research already treats `docs/HOMEPAGE_SPEC.md` as informative, not controlling, and the frozen architecture is unambiguous on the points where they conflict.

2. **`docs/content/CONTENT_IMPROVEMENT_ROADMAP.md` §2 (Layer 5) vs. actual routing.** The roadmap describes "the main spelling-list browse page" as living at `src/pages/spelling-lists/index.astro`. That file/route does not exist. The homepage (`src/pages/index.astro`) has, in practice, already absorbed the routing responsibility the roadmap assigns to that page (link to Grade Hubs and Skills Hub, "shortest, least detailed page in the whole hierarchy"), without any document stating this explicitly.
   - **Controlling authority:** `PUBLIC_URL_ARCHITECTURE.md`'s explicit confirmation that the legacy route tree was removed; the roadmap's Layer 5 description is stale on this specific point.
   - **Smallest recommended reconciliation:** a future edit to `CONTENT_IMPROVEMENT_ROADMAP.md` §2 should update Layer 5's description to name the homepage (`src/pages/index.astro`) as its actual implementation, once a `CANONICAL_HOMEPAGE_STANDARD.md` exists to govern it — this research does not make that edit itself, per the brief's explicit instruction not to update the roadmap as part of this task.
   - **Blocks homepage work?** No — this is a documentation-accuracy gap, not a live conflict affecting what the homepage should contain.

3. **No conflict found** between the Constitution, `CONTENT_MODEL.md`, `PUBLIC_URL_ARCHITECTURE.md`, `SKILLS_ARCHITECTURE.md`, and the four `CANONICAL_*_STANDARD.md` documents on any question this research needed to resolve. They are mutually consistent on the three-journey model, the layer boundaries, and the "no homepage links below the Hub layer" principle this research relies on throughout.

**Documentation that would eventually need updating after a homepage standard is frozen** (not performed here, per the brief):
- `docs/HOMEPAGE_SPEC.md` — mark superseded/historical, per conflict 1 above.
- `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md` §2 (Layer 5 description) and §3 (Phase 5, "Main browse-page content") — both currently describe a `/spelling-lists` page that no longer exists; both should eventually point to the homepage instead.
- `docs/architecture/CONSTITUTION.md` §19's "Near-Term Sequence" does not mention a homepage standard at all — if the homepage standard becomes a formally tracked deliverable, a future amendment could note it, though this is not required for the research itself to be valid.
- Possibly `docs/SITE_ARCHITECTURE.md`, `docs/UX_ARCHITECTURE.md`, and `docs/PRODUCT_VISION.md`, cited by `docs/HOMEPAGE_SPEC.md` as upstream authorities — not reviewed in depth by this research pass (out of the explicitly listed minimum reading list), but likely to share some of the same staleness given they predate the Constitution; flagged for awareness, not evaluated here.

---

## 22. Implementation implications (informational only)

This section is explicitly informational — it does not authorize implementation, and none of the following should be read as a task list to execute from this document alone.

- The clearest concrete gap is the **absence of any structured data** on the homepage (§14) — every other canonical page family in the repository has at least a `BreadcrumbList`; the homepage has nothing analogous today (correctly, since it has no breadcrumb) but lacks even a minimal `WebSite` entity.
- The clearest concrete editorial gap, now resolved to a firm requirement rather than an open question (v2), is the **undifferentiated grade/skill grid** (§5, §6.3, §24) — this is a content and information-architecture fix (heading-level parity, an orientation sentence, named illustrative concepts), not a visual one.
- The second concrete gap surfaced by the v2 stress-test pass is the **absent product-identity/scope clause** (§7, §8, §24) — a single required sentence, not a new section.
- A future `CANONICAL_HOMEPAGE_STANDARD.md`, if written from this research, should follow the same shape as its three siblings: frozen semantic requirements, explicit anti-patterns, presentation-independence language, and an implementation acceptance checklist — not prescribe markup, components, or visual treatment.

---

## 23. Open questions

Per the brief's instruction to resolve everything reasonably resolvable rather than leaving multiple-implementations-are-technically-possible as an excuse, the v2 stress-test pass resolves both of v1's substantive open questions:

1. **Resolved (was open in v1): does `/skills` need a homepage-visible identity distinct from a grade tile, and how much?** §6.3 and §24 resolve this firmly: yes, and the "how much" is answered at the semantic-architecture level (heading-level treatment, its own orientation sentence, 2–4 named illustrative concepts, its real count) while deliberately *not* answering it at the visual level (§19's "coequal does not mean visually equal" clarification) — that remainder genuinely is a future visual-design decision, not a content-architecture one, and this document does not need to resolve it to be ready to freeze.

2. **Resolved (was open in v1): should the homepage-level `ItemList` be scoped to all seven destinations or fewer?** §14 resolves this: scoped to the six Grade Hubs only, once implemented; no `ItemList` for the single Skills Hub link.

**Remaining genuinely open items (non-blocking, both narrow implementation/sequencing questions, not content-architecture questions):**

1. **Exact wording for the meta description's "hundreds of curated spelling lists" phrasing (§14).** The claim is true in aggregate page count but slightly overstates the visitor-facing experience at homepage depth once the description shifts toward "grades and skills" framing (§8's new identity/scope row). This is a copywriting-level adjustment for a future editorial pass, not a decision this research needs to make — final copy is explicitly out of scope per the brief.
2. **Whether to implement the `WebSite`/`ItemList` schema additions opportunistically now or wait until a formal `CANONICAL_HOMEPAGE_STANDARD.md` exists to govern them.** A pure sequencing choice with no content-architecture consequence either way.

Neither remaining item blocks freezing a homepage content standard from this research.

---

## 24. Refinement pass: adversarial stress-test decision table

This section records the outcome of the dedicated adversarial review of the v1 research, conducted against the explicit test: *if we froze this decision today, would we still be happy with it after the site receives a major visual redesign and becomes a substantially more mature product?* Every "Refined recommendation" below is already incorporated into the numbered sections above; this table exists as the single, scannable summary the brief requested, not as a separate or competing set of conclusions.

| Decision | v1 recommendation | Refined (v2) recommendation | Confidence | Basis |
|---|---|---|---|---|
| Overall homepage depth | Short; resist lengthening | Confirmed short is correct; two specific strengthenings identified (Skill parity, identity/scope clause) — both resolved by deepening existing content, not adding new sections | High | Editorial/product judgment, checked against frozen authority (Constitution's 3-journey model, sibling standards' anti-pattern lists) |
| Custom-word practice prominence | Flagship, on-page, dominant hero action | Unchanged | High | Frozen repository authority (`CONSTITUTION.md` §3.1, explicit "flagship homepage experience" language) |
| Browse by Grade prominence | All six grades, one click, minimal differentiation | Unchanged | High | Frozen repository authority (`CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §7) + current implementation evidence (already correct) |
| Browse by Skill prominence | One card among seven; a bridging clause treated as sufficient | Elevated to a coequal, heading-level section with its own orientation sentence, illustrative unlinked concept names, and real count | High | Frozen repository authority (`CONSTITUTION.md` §3 names three coequal journeys; `CANONICAL_SKILLS_HUB_STANDARD.md` §1–2 defines Skills as a full parallel hierarchy, not a homepage footnote) |
| Grade-vs-Skill differentiation | A single undifferentiated "Ready-Made Lists" grid, implicitly two journeys | Explicit two-systems framing; both browsing journeys get their own heading and orientation sentence | High | Same as above, plus accessibility reasoning (screen-reader heading navigation must reflect the same distinction sighted users would eventually get from visual design) |
| Homepage product identity | Implied by the three journeys; no explicit scope claim | One required sentence stating K–5 scope and grade+skill organization, distinct from the trust band | Medium-high | Editorial/product judgment — a reasoned inference from the Constitution's own framing of the product as more than a widget, not a directly quoted requirement |
| Internal-link depth | One layer down (Grade Hubs + Skills Hub only) | Confirmed and frozen more firmly, with the "no exceptions absent an explicit future amendment" qualifier added | High | Frozen repository authority (`CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §7's direct textual statement that deeper links "would blur, not clarify, layer responsibility") |
| Trust/confidence content | No account, hear every word, works everywhere | Privacy/no account, no gamification, free, and structured/curated content (the last is new); device compatibility and audio playback demoted to optional/visual-design material | Medium-high | Editorial/product judgment — re-weighing which facts are genuine trust signals (safety, values, credibility) versus feature/implementation trivia |
| Homepage educational prose | Rejected beyond incidental teasers | Unchanged — confirmed rejected; the new identity/scope sentence is a scope claim, not educational prose, and does not reopen this conclusion | High | Frozen repository authority (every sibling standard's shared layer-boundary logic) |
| Structured data: `WebSite` | Recommended | Confirmed, firmly recommended (not conditional) | High | Established general schema.org/IA principle + direct correspondence to real, stable visible content |
| Structured data: `ItemList` | One list spanning all seven destinations, deferred as a future option | Firm recommendation, narrowed to the six Grade Hubs only; no `ItemList` for the single Skills Hub link | Medium-high | Editorial/product judgment applying the governing test ("does this accurately represent visible content") to the refined two-systems structure |
| SEO positioning | Branded/identity role, not keyword-targeting; one-layer-down linking | Unchanged, reaffirmed | High | Frozen repository authority (`CONSTITUTION.md` §15) + established IA principle (avoid cannibalizing deeper pages' query ownership) |
| GEO/AEO positioning | Ordinary content-quality principles; explicit product-identity sentence flagged as highest-value addition | Unchanged in principle; strengthened in practice because the now-required identity/scope sentence and the now-required Skill-section orientation both directly serve this goal | Medium | Established general content-quality principles; explicitly **not** based on AI-citation testing, which was not performed (stated plainly, not implied) |
| Visual-design independence | All recommendations presentation-neutral | Confirmed, with the added explicit clarification that "coequal" (Grade vs. Skill) means document-outline/content parity, not visual/pixel parity | High | Direct application of the brief's own redesign-compatibility test to each recommendation |

**Reading the "Basis" column:** "Frozen repository authority" means a specific cited document states the conclusion directly, not merely implies it. "Current implementation evidence" means verified by reading the live code. "Established IA/usability principle" means a general, non-product-specific web/UX convention, not something unique to this repository. "External evidence" is used nowhere in this table at high confidence, consistent with §11–13's explicit statement that no systematic competitive audit, keyword research, or AI-citation testing was performed. "Editorial/product judgment" is used honestly wherever the conclusion is this research's own reasoned inference rather than a directly quotable requirement — most visibly for the new identity/scope clause and the refined trust-content set, both of which are defensible but not mechanically derivable from a single frozen sentence elsewhere in the repository.

---

## 25. Final recommendation

If SpellingWords.app wants to become one of the best K–5 spelling resources on the web, its homepage should communicate exactly five things and nothing more: **what the product is and its K–5 scope, that a visitor can start practicing with their own words right now, that curriculum-organized practice exists by grade, that focused practice exists by skill as a genuinely coequal system, and a small set of concrete trust facts spanning both values and content credibility** — each stated once, plainly, and backed by real, restrained facts rather than persuasion. The adversarial stress-test pass in §24 added exactly one new content requirement (the identity/scope sentence) and firmed up exactly one existing requirement that had been left underspecified (Skill-journey parity) — it did not find the homepage too minimalist in general, and it did not overturn any of v1's rejections.

Everything this research recommends *against* adding — methodology essays, FAQs, testimonials, curriculum maps, audience-segmented sections, popularity claims — remains rejected, re-confirmed rather than merely carried over: a deeper, purpose-built page in this site's already-careful layer architecture owns each of these better, and duplicating them at the homepage would blur exactly the layer boundaries the Grade Hub, Grade-Strand Gateway, and Skills Hub standards were each written to protect. The stress-test pass looked specifically for content that had been wrongly excluded and found none beyond the two items above.

The current homepage already gets most of this right, and remains appropriately restrained rather than insufficiently focused. The strongest available result is still not a longer homepage; it is the current homepage's shape, sharpened in a small number of specific, now-firmly-resolved places (Skill-journey parity, an identity/scope sentence, a refined trust-fact set, scoped structured data), and left alone everywhere else. None of these refinements constrains the future visual redesign — each was tested against, and passed, the "would this still make sense after a complete visual redesign" standard (§19).

**HOMEPAGE RESEARCH COMPLETE — READY FOR REVIEW**
