# Canonical Homepage Standard — Research

**Status:** Research and recommendation only. This document does **not** freeze a production standard, does not authorize implementation, and does not modify `src/pages/index.astro` or any other production code. A future `CANONICAL_HOMEPAGE_STANDARD.md` may be written from this research once it is reviewed and approved, following the pattern already established by the Grade Hub, Grade-Strand Gateway, and Skills Hub standards.

**Scope:** The public homepage at `/` (`src/pages/index.astro`) only. This document does not redesign the Grade Hubs, Grade-Strand Gateways, Skills Hub, Skill pages, member pages, practice experience, curriculum, or taxonomy — all of which are frozen elsewhere and are treated here as settled context.

---

## 1. Executive summary

The homepage's job is narrower than its current implementation or its own specification (`docs/HOMEPAGE_SPEC.md`) assumes. It is a **routing and confidence page**, not an educational resource and not a content hub. Its governing question is not "how do I begin?" in the abstract — it is more precisely: *"I need spelling practice for a child — which of this site's three ways of getting there is mine, and can I trust this place enough to start?"*

The current implementation (`src/pages/index.astro`) is **architecturally closer to correct than `docs/HOMEPAGE_SPEC.md` and `docs/architecture/CONSTITUTION.md` §19 might suggest**, but it is editorially thin and, in one respect, architecturally incomplete: it exposes only 7 routing tiles (6 grades + one Skills tile) with no differentiation of what "Browse by Skill" means, no product-identity paragraph beyond the H1, and no structured data at all. It also inherits stale internal-linking assumptions from `docs/HOMEPAGE_SPEC.md`, which still describes a `/spelling-lists` "Spelling Library," `/about`, and `/guides` — none of which exist in the current, frozen `PUBLIC_URL_ARCHITECTURE.md`.

The recommended target content architecture keeps the homepage short: a hero that states product identity and puts the custom-practice interaction directly on the page; a routing block exposing all three primary journeys as co-equal, semantically real (not merely decorative) destinations; one to three sentences of trust/credibility framing; and a closing orientation band with adjacent navigation. No FAQ, no methodology essay, no testimonials, no stats, no curriculum map. This is deliberately closer to the current page's actual length than to `docs/HOMEPAGE_SPEC.md`'s much longer four-tier information hierarchy — the research in §9 rejects most of the additional content that document treats as required.

The most consequential open architectural question this research surfaces (§22) is **whether `/skills` needs a homepage-visible identity distinct from a grade tile** — today's implementation renders it as one card among seven grade-shaped cards, which under-communicates a first-class parallel journey the Constitution requires be understandable "within about 30 seconds."

**HOMEPAGE RESEARCH COMPLETE — READY FOR REVIEW**

---

## 2. Scope and authorities

Authority precedence for this research, per `docs/architecture/CONSTITUTION.md` §17, extended to the homepage layer:

1. `docs/architecture/CONSTITUTION.md` — product purpose, the three journeys, non-negotiable principles (no gamification, no accounts, calm UX).
2. `docs/architecture/CONTENT_MODEL.md` — content identity boundaries (Grade Unit vs. Skill vs. Grade Roadmap, etc.).
3. `docs/architecture/PUBLIC_URL_ARCHITECTURE.md` — the actual, current routes the homepage may link to.
4. `docs/architecture/SKILLS_ARCHITECTURE.md` — the frozen 12-family/41-skill taxonomy (referenced, not modified).
5. `docs/content/CANONICAL_GRADE_HUB_STANDARD.md`, `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md`, `CANONICAL_SKILL_PAGE_STANDARD.md`, `CANONICAL_SKILLS_HUB_STANDARD.md` — sibling canonical content standards; used here as the model for structure, tone, and precedent, and as the authority for what the homepage must **not** duplicate.
6. `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md` — the five-layer content model (§2) and its explicit note that a "Layer 5... main spelling-list browse page" exists at `src/pages/spelling-lists/index.astro`. **This is stale** — see §22.
7. `docs/HOMEPAGE_SPEC.md` and `docs/PRODUCT_VISION.md`/`docs/SITE_ARCHITECTURE.md`/`docs/UX_ARCHITECTURE.md` (which it cites as upstream) — an older, pre-Constitution homepage specification, used here as **historical input, not controlling authority**, because it conflicts with the frozen architecture in ways detailed in §22.
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

**Legacy/stale linkage confirmed removed:** `src/pages/spelling-lists/` does not exist in the current `src/pages/` tree. `PUBLIC_URL_ARCHITECTURE.md` confirms this explicitly ("the legacy `/spelling-lists` and `/learning-paths` route trees have been removed entirely"). This directly contradicts `CONTENT_IMPROVEMENT_ROADMAP.md` §2 Layer 5's description of "the main spelling-list browse page" living at `src/pages/spelling-lists/index.astro` — that page is gone, and **the homepage has already absorbed Layer 5's role** without any document saying so explicitly. See §22.

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
| 1 "Practice by Skill" card (linking to `/skills`) | **KEEP BUT REFINE** | Structurally present and correctly linked, but visually and semantically undifferentiated from the six grade cards it sits beside — it reads as "a seventh grade," not as the second of two co-equal top-level browsing systems. See §7.3 and §22. |
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
- **How to explain when someone should choose Skill browsing rather than Grade browsing:** a single clause is sufficient — "already know the skill your child needs (like short vowels or prefixes)?" as a qualifier next to the grade-browsing invitation. This should use one or two illustrative concept names (not full family names, not a comprehensive list) purely as recognition anchors, the same technique `CANONICAL_SKILLS_HUB_STANDARD.md` §4 requires of the Skills Hub's own opening ("terminology broad enough to describe the whole library").
- **What must remain owned by the Skills Hub:** the complete 12-family/41-skill directory, family-level orientation copy, and every individual Skill's description — all explicitly owned exclusively by `/skills` per `CANONICAL_SKILLS_HUB_STANDARD.md` §3's "DOES NOT OWN" list, which the homepage must not pre-empt.

**Preserving the three-journey model:** nothing found in this audit or in the current implementation suggests a fourth journey is missing, consistent with the brief's note that a separate feature-gap pass already reached that conclusion. This research treats the three-journey model as settled and does not revisit it.

---

## 7. Hero/content-priority analysis

**Appropriate H1 territory:** the H1 should establish, in one clause, what the product *is* (a spelling-practice site) and its posture (calm, free, for children/K–5), without needing "spelling words," "K–5," and "parents/teachers" all crammed into the same seven words. The current H1 ("Practice spelling, starting now.") gets posture and action right but identity only partially — a visitor with zero context learns *what to do* (practice) faster than *what this is* (a children's spelling-practice product, not, say, a spelling-bee competition site or a dictionary tool). Recommendation: the H1 territory should cover product category and immediacy; a short subhead/kicker beneath it — already structurally present as unused whitespace in the current design — is the natural place for the "K–5, free, no account" identity clause the H1 doesn't carry alone. This is a content-contract recommendation, not final copy (per the brief's instruction not to write polished hero copy).

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
| Explanation of browsing by Skill | **REQUIRED** (at the single-clause scale described in §6.3) | Without it, "Browse by Skill" reads as a mislabeled seventh grade tile — see §5's audit finding and §22's open question. |
| Explanation of custom spelling practice | **USEFUL BUT OPTIONAL** | Largely satisfied by the interface itself (§6.1); a short accompanying clause is enough if used at all. |
| K–5 curriculum overview (progression map) | **REJECT** | Explicitly prohibited even at the Grade Hub level by `CANONICAL_GRADE_HUB_STANDARD.md` §11 ("full K–5 progression maps") and by `CANONICAL_SKILLS_HUB_STANDARD.md` §12; a fortiori rejected at homepage depth. |
| Structured-literacy/evidence-based methodology language | **DEFER** | Legitimate content, but belongs at the level where it can be specific and honest (a future About/Methodology page, or the Grade Hub/Skill-page evidence ladder already defined in `CANONICAL_SKILL_PAGE_STANDARD.md` §14) rather than as an unsupported homepage claim. A bare, unqualified "structured literacy" label at homepage depth risks the exact "developmental or grade claim... check against authoritative literacy sources before publishing" requirement that standard imposes on Skill pages — the homepage has no comparable sourcing mechanism today. |
| Parent guidance | **REJECT** | `CANONICAL_GRADE_HUB_STANDARD.md` §11 and `CANONICAL_SKILLS_HUB_STANDARD.md` §12 both explicitly prohibit audience-segmented "For Parents/Teachers/Students" sections at their respective layers; the same reasoning applies with equal or greater force at homepage depth, where audience-segmentation would triple content for no routing benefit. |
| Teacher guidance | **REJECT** | Same reasoning. |
| Student-facing guidance | **REJECT** | Same reasoning; also, per `docs/HOMEPAGE_SPEC.md`'s own (retained-as-correct) observation, children rarely read homepage copy directly. |
| Trust/credibility section | **REQUIRED**, at the current implementation's scale | Already present and correctly scoped (no account, free, calm/no gamification); should stay 2–3 concrete, falsifiable statements, not an essay. |
| Educational philosophy | **REJECT** | Belongs to a future About/Methodology page if one is built; not homepage-scoped. |
| FAQ | **REJECT** | See §19; no genuine homepage-scale FAQ content has been identified that isn't better owned by a deeper page, and the brief explicitly flags "giant FAQ sections" as a default anti-pattern to justify, not assume. |
| Testimonials/social proof | **REJECT** | No genuine testimonials exist; `docs/HOMEPAGE_SPEC.md` itself already correctly rejects fabricated or unverifiable social proof, and this research concurs. |
| Statistics/counts | **USEFUL BUT OPTIONAL, narrowly** | A true, cheaply-derived count (e.g., "41 spelling skills," already rendered live today via `CURATED_SPELLING_SKILL_IDS.length`) is fine as an incidental fact inside a routing card — it is not a "marketing-stat block" (§19) when it is a real, programmatically sourced inventory count used for orientation, not persuasion. A promoted, boxed, emphasized "trusted by X families" style stat is REJECT. |
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
| Grade-level orientation (that six grades exist, one-line differentiation) | **Homepage** (teaser) → **Grade Hub** (full orientation) |
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

**What should be added, evaluated against "every recommendation must correspond to actual visible content or a genuine site-level entity relationship" (per the brief's instruction):**
- A `WebSite` entity (name, url) — a legitimate, minimal, honest site-level fact; does not overclaim anything.
- Optionally, a `SearchAction` (`potentialAction`) **only if** a real site-search feature exists — it does not today, so this should **not** be added speculatively; flagged here as conditional, not recommended.
- An `Organization`-shaped entity is **not clearly warranted** — the site is a product, not a company with a public-facing organizational identity distinct from the product itself; adding one would be schema added because a type exists, which every sibling standard in this repository explicitly rejects (`CANONICAL_SKILLS_HUB_STANDARD.md` §9: "Add any schema type or property solely for SEO/GEO/AEO/AI-consumption reasons rather than to describe visible content").
- A homepage-level `ItemList` naming the six Grade Hubs and the Skills Hub as the page's real, complete, visible link set is defensible **once** the homepage's routing content is finalized under a future standard — this mirrors the pattern already used by Grade Hubs (`ItemList` of the three Gateway destinations) and the Skills Hub (`ItemList` of all 41 Skills), applied one layer higher (`ItemList` of the seven top-level browsing destinations). This should not be built as part of this research, but is flagged as the one schema addition with clear precedent and clear correspondence to real, already-planned visible content.
- `BreadcrumbList` is **not applicable** — the homepage has no breadcrumb (it is the root), consistent with every other page family's breadcrumb starting at Home.
- `FAQPage` — **not recommended**, since §9 rejects a homepage FAQ outright.

**Whether any site-level schema belongs on the homepage that doesn't belong on deeper pages:** yes — `WebSite` is the one type that is homepage-appropriate specifically *because* it describes the site as a whole, which only the homepage (or a dedicated site-level entity, which doesn't exist here) can legitimately assert. This is the only schema recommendation in this document scoped as "belongs uniquely at this layer."

---

## 15. Internal-linking architecture

| Destination | Priority | Reasoning |
|---|---|---|
| Practice Your Own Words (the interface itself, not a link) | **Primary** | The flagship interaction lives on the page; the "link" is the CTA button to `/play?list=...`, generated dynamically from entered words. |
| Six Grade Hubs | **Primary** | Constitution-required, already implemented, matches the "Home → Grade Hub, 1 click" architecture. |
| Skills Hub (`/skills`) | **Primary** | Co-equal third journey per the Constitution; must not be demoted to secondary status even though it is visually one card among seven today (see §22). |
| Individual Grade-Strand Gateways | **Omitted** | `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §7 explicitly states homepage links to individual Gateways are not required and that adding them "would blur, not clarify, layer responsibility." |
| Individual Skills | **Omitted** | `CANONICAL_SKILLS_HUB_STANDARD.md` reserves individual Skill links to the Hub exclusively. |
| Individual member pages | **Omitted** | No standard anywhere in the repository supports homepage-level links this deep; would violate every layer boundary cited in §9. |
| Informational/supporting pages (About, Methodology, Guides) | **Omitted today** | None of these pages currently exist in the live route set (`docs/HOMEPAGE_SPEC.md`'s references to `/about` and `/guides` are stale — see §22). If such pages are built in the future, a secondary/footer-level link (not primary decision-zone placement) would be appropriate, consistent with that document's own original guidance on placement. |

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
  Optional short identity clause — K–5, free, no account (only if not already
    covered by H1; may live as a subhead/kicker)
  Practice Your Own Words interaction (word entry, live count, primary CTA)
  Secondary bridge to the two browsing journeys

Browsing journeys
  Section-level framing distinguishing "know your child's grade" from
    "know the skill" as two different, equally legitimate ways to find practice
  Browse by Grade
    Six Grade Hub destinations, each with a single differentiating clause
  Browse by Skill
    One Skills Hub destination, with enough framing (a sentence, one or two
      illustrative concept names) to read as a co-equal system, not a stray
      seventh grade tile

Trust / product-identity band
  2–3 concrete, falsifiable statements: no accounts, no timers/points/streaks,
    free — framed as facts about the product, not as a comparative "why choose
    us" claim

Closing navigation / orientation
  Footer-level wayfinding (existing SiteFooter — out of this research's scope)
```

**Per-block specification:**

| Block | Purpose | Owns | Semantic depth | Primary link destinations | Must not duplicate | Required/Optional |
|---|---|---|---|---|---|---|
| Hero identity | Establish what the product is and its posture in one glance | Product identity statement (uniquely — no other page re-introduces the product this way) | ~1 sentence beyond the H1 | none (identity only) | Grade Hub/Gateway orientation language | **Required** |
| Hero interaction | Deliver journey 1 completely on-page | The custom-practice entry point | Interactive component, not prose | `/play?list=...` (generated) | Nothing — this is the unique homepage responsibility | **Required** |
| Browsing-journeys framing | Distinguish "know the grade" from "know the skill" as two systems, not one grid | The one sentence that makes Browse-by-Skill legible as co-equal (§6.3, §22) | ~1 sentence | n/a (framing only) | Skills Hub's own opening orientation | **Required** |
| Browse by Grade | Route to all six grades with minimal differentiation | Six one-line grade teasers | ~6 short phrases | Six Grade Hubs | Grade Hub's full orientation, strand structure | **Required** |
| Browse by Skill | Route to the Skills Hub as a co-equal system | One teaser plus 1–2 illustrative concept names | ~1–2 sentences | Skills Hub | Skills Hub's family/skill directory | **Required** |
| Trust/identity band | Supply the minimum facts needed to commit to a journey | 2–3 falsifiable product facts | ~3 short statements | none (or implicit reinforcement of primary CTAs) | Nothing owned elsewhere; must not overlap with a future About/Methodology page's fuller claims | **Required** |
| Closing navigation | Wayfinding for a visitor who reached the bottom without acting | Footer-owned; not new homepage content | n/a | Footer's existing scope | Nothing new | **Optional / already exists** |

---

## 18. Current vs. target comparison

| Element | Current homepage | Recommended target | Reason for change |
|---|---|---|---|
| H1 | "Practice spelling, starting now." | Same territory; consider a short adjacent identity clause | H1 alone under-delivers product identity for a zero-context visitor (§7) |
| Practice interaction | Present, correct | Unchanged | Already meets the Constitution's flagship-journey requirement |
| Routing section heading | "Ready-Made Lists" / undifferentiated grid | Explicit framing distinguishing grade-first from skill-first browsing | Current heading flattens two structurally distinct journeys into one "lists" category (§5, §6.3) |
| Skills tile | One card, visually identical to a grade card | Framed as a co-equal second system, not a seventh grade | Under-communicates a Constitution-frozen primary journey (§22) |
| Trust band | Present, `sr-only` "why choose us" framing | Present, reframed as plain product facts without a hidden comparative claim | Accessibility/framing mismatch between sighted and screen-reader users; comparative framing risk (§5) |
| Structured data | None | `WebSite` at minimum; homepage-level `ItemList` as a future option | Total absence is inconsistent with every other canonical page family (§14) |
| Metadata | Accurate, concise | Unchanged | Already correct |
| Internal links | Six Grade Hubs + Skills Hub, correctly scoped | Unchanged | Already correct depth and restraint |
| Returning-visitor logic | None | Not addressed by this research | Out of scope; requires separate product/data decisions |
| Overall length | Short | Modestly longer (one framing sentence, one skill-journey clause, no new sections) | §16's diminishing-returns analysis finds almost no case for material lengthening |

**Determination:** the current homepage is **architecturally sound but editorially thin and, in one place, under-differentiated** — not structurally outdated, not overly broad, and not overly thin at the section level (it has the right sections; several just need one or two more sentences and one heading correction). The single architectural (not merely editorial) question this comparison surfaces is §22's Skills-parity question.

---

## 19. Future visual-redesign constraints

Every block in §17 was tested against "would this content still make sense if the visual presentation were completely redesigned?" None of the recommended content assumes cards, a particular grid, icons, or color-coding. Specifically:

- The hero's identity clause and interaction are presentation-neutral prose/interaction, not "the card at the top."
- The browsing-journeys framing is written as "two ways to browse," not "the two columns below" or "the cards in this row" — consistent with the presentation-independence language `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §8 and `CANONICAL_SKILLS_HUB_STANDARD.md` §13 already require of their own layers, extended here to the homepage.
- Six grade teasers and one skill teaser are described as a list of destinations with short accompanying phrases — renderable as cards, a table, a list, an illustrated panel system, or anything else a future designer chooses, without any copy rewrite.
- The trust band's 2–3 statements are self-contained facts, not visually-dependent ("see below," "the icons above") language.

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
- The clearest concrete editorial gap is the **undifferentiated grade/skill grid** (§5, §22 open question below) — this is a content and (secondarily) an information-architecture question, not a visual one, and is the one place this research finds the current implementation genuinely under-serves a Constitution-frozen requirement rather than merely being thin.
- A future `CANONICAL_HOMEPAGE_STANDARD.md`, if written from this research, should follow the same shape as its three siblings: frozen semantic requirements, explicit anti-patterns, presentation-independence language, and an implementation acceptance checklist — not prescribe markup, components, or visual treatment.

---

## 23. Open questions

Only genuine unresolved questions, per the brief's instruction not to manufacture items for completeness.

1. **Does `/skills` need a homepage-visible identity distinct from a grade tile, and if so, how much?** This research concludes (§6.3, §17–18) that the current implementation under-communicates Browse by Skill as a co-equal journey, and recommends a differentiating sentence/framing as the fix. But *how much* differentiation is enough — a single sentence, a distinct visual treatment (out of this research's scope), or something else — is a product judgment about how much homepage real estate a single, high-value but singular destination (`/skills`, one link) deserves relative to six individual destinations (the Grade Hubs). This research cannot resolve the *degree* of treatment from content principles alone; it requires a human product decision, informed by whatever future visual redesign work does with the routing section. **Not blocking**: the content-level recommendation (a differentiating sentence) is actionable regardless of how this resolves.

2. **Should the homepage's meta description be revised for the "hundreds of curated spelling lists" phrasing noted in §14?** This is a minor, non-blocking precision question (the claim is true in aggregate page count but slightly overstates the visitor-facing experience at homepage depth) that a future editorial pass can resolve without requiring this research to adjudicate exact wording, which is out of this document's scope per the brief ("do not write the final polished hero copy").

3. **Should a homepage-level `ItemList` (§14) be added now, or deferred until a `CANONICAL_HOMEPAGE_STANDARD.md` exists to govern it formally?** This research finds the addition defensible and low-risk but does not have standing authority to add production schema on its own initiative; whether to implement it opportunistically or wait for the formal standard is a sequencing decision, not a content question. **Not blocking.**

None of these three questions blocks freezing a homepage content standard from this research — each has either a clear directional answer already stated above, or is explicitly a downstream implementation-sequencing question rather than a content-architecture question.

---

## 24. Final recommendation

If SpellingWords.app wants to become one of the best K–5 spelling resources on the web, its homepage should communicate exactly four things and nothing more: **what the product is, that a visitor can start practicing with their own words right now, that curriculum-organized practice exists by grade, and that focused practice exists by skill** — each stated once, plainly, and backed by real, restrained trust facts rather than persuasion. Everything this research recommends adding to the current implementation (a differentiating framing for the two browsing journeys, a short identity clause, minimal structured data) is in service of making those four things land clearly for a first-time, zero-context visitor in under thirty seconds — not in service of making the page longer, more persuasive, or more comprehensive.

Everything this research recommends *against* adding — methodology essays, FAQs, testimonials, curriculum maps, audience-segmented sections, popularity claims — was rejected not because it is inherently bad content, but because a deeper, purpose-built page in this site's already-careful layer architecture owns it better, and duplicating it at the homepage would blur exactly the layer boundaries the Grade Hub, Grade-Strand Gateway, and Skills Hub standards were each written to protect.

The current homepage already gets most of this right. The strongest available result is not a longer homepage; it is the current homepage's shape, sharpened in the two or three specific places this research identifies, and left alone everywhere else.

**HOMEPAGE RESEARCH COMPLETE — READY FOR REVIEW**
