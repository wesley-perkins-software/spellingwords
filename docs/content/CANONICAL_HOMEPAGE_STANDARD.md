# Canonical Homepage Standard

**Status:** Frozen production editorial and architecture authority. Production conformance is
pending; this standard does not itself authorize renderer, component, schema, or visual changes.
**Source:** Approved conclusions in `docs/content/CANONICAL_HOMEPAGE_STANDARD_RESEARCH.md`
(v1 research plus the v2 adversarial stress-test pass, §24 of that document). That document is
supporting rationale, not a duplicate authority — consult it for *why* a requirement below exists;
this standard states only what is required.
**Scope:** Exactly `/` (`src/pages/index.astro`), the single canonical homepage.
**Does not govern:** the 6 Grade Hubs, the 18 Grade-Strand Gateways, the 105 Grade Unit/member
pages, the Skills Hub, the 41 canonical Skill pages, the practice experience (`/play`), or visual
design. Those page families retain their own authorities and are not reopened here.

---

## 1. Purpose and canonical hierarchy

The homepage is the site's entry point and its **routing/orientation and confidence page** — it
also directly hosts one interaction (Practice Your Own Words) rather than merely routing to it.
It answers:

> I need spelling practice for a child. Which of this site's three ways of practicing is mine, and
> can I trust this place enough to start?

The homepage sits above all three of the site's primary journeys:

> Home → **Practice Your Own Words** (hosted directly on the homepage)
> Home → **Grade Hub** → Grade-Strand Gateway → Member Page → Practice
> Home → **Skills Hub** → canonical Skill page

The homepage owns first-impression product identity and top-level routing. It does not own
curriculum depth, pattern instruction, strand synthesis, or the Skill taxonomy — each belongs to
the layer that already owns it (`docs/content/CONTENT_IMPROVEMENT_ROADMAP.md` §2).

## 2. Required semantic content

Every homepage implementation must provide:

- a page-level H1 establishing product category and immediacy;
- a concise product identity/scope statement (§4);
- the Practice Your Own Words interaction, hosted directly on the page, not merely linked (§5.1);
- a Browse by Grade section exposing all six Grade Hubs (§5.2);
- a Browse by Skill section, coequal in document structure with Browse by Grade, routing to the
  Skills Hub (§5.3);
- concise trust/credibility content using concrete, falsifiable product facts (§6);
- standard metadata that accurately describes the visible page (§8);
- structured data appropriate to the visible content (§8).

## 3. Homepage responsibility boundaries

**OWNS, and no other page owns:**

- First introduction of the product to a first-time visitor.
- The Practice Your Own Words interaction as a directly hosted, on-page experience (every other
  journey routes to a destination; this one does not).
- The single top-level statement that Browse by Grade and Browse by Skill are two distinct,
  coequal ways of finding practice.
- The product identity/scope statement (§4).

**DOES NOT OWN, and must not duplicate:**

- Grade-wide orientation, the Core/High-Frequency Words/Themed Spelling Practice relationship, or
  any grade's curriculum sequence — owned by the Grade Hub (`CANONICAL_GRADE_HUB_STANDARD.md`) and
  the Grade-Strand Gateways (`CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md`).
- The 12-family/41-Skill taxonomy, family-level orientation, or any individual Skill's
  description — owned exclusively by the Skills Hub (`CANONICAL_SKILLS_HUB_STANDARD.md`).
- Pattern explanations, teaching routines, mistakes/exceptions, or word-list instruction — owned
  by individual Skill pages (`CANONICAL_SKILL_PAGE_STANDARD.md`) and Grade Unit/member pages.
- Practice mechanics themselves — owned by the practice experience (`/play`).

A homepage implementation that reproduces any of the above — even briefly, even "just a summary"
— fails this standard regardless of how accurate the summary is. Route to the owning layer instead.

## 4. Product identity and scope statement

The homepage **MUST** include a concise statement, at or adjacent to the hero, that establishes:

- what the product is (a spelling-practice site for children);
- that it is free and requires no account;
- that practice is organized across Kindergarten through 5th Grade **and** by spelling skill —
  i.e., that this is a **structured K–5 spelling resource**, not merely a single-purpose
  custom-word widget.

This is a scope claim, not a marketing claim, and not educational prose. It should read as one to
two sentences, stated plainly, not as a paragraph, a numbered feature list, or a "why choose us"
framing.

**Wording guidance (not frozen copy):** prefer language such as "a structured K–5 spelling
resource" or equivalent over an absolute claim that the site is a "complete" curriculum — no
frozen authority requires the stronger wording, and "structured" is accurate to what the frozen
architecture actually provides (a curated, organized progression) without overclaiming totality.

This statement **MUST NOT**:

- duplicate a Grade Hub's grade-wide orientation or a Gateway's strand synthesis;
- name individual Grade-Strand Gateways, strands (Core Spelling / High-Frequency Words / Themed
  Spelling Practice), or Skill families by name;
- assert a pedagogical framework or methodology label (e.g. "structured literacy") — that claim,
  if made anywhere, requires the sourcing rigor `CANONICAL_SKILL_PAGE_STANDARD.md` §14 imposes at
  a deeper, citable layer, which the homepage does not have.

## 5. The three primary journeys

Per `docs/architecture/CONSTITUTION.md` §3, the homepage **MUST** expose exactly three primary
journeys. No fourth journey may be added by this standard or by homepage implementation.

### 5.1 Practice Your Own Words

- **MUST** be hosted directly on the homepage as a working interaction (word entry, at minimum),
  not merely linked to.
- **MUST** remain the dominant, most immediately available action on the page — no other journey
  may be positioned or weighted to compete with it for primacy in the first viewport.
- **MUST NOT** require an account, login, or any setup step before use.
- **SHOULD** be understandable through the interaction itself (showing, not describing) rather
  than through explanatory prose; at most one short supporting sentence is warranted if the
  mechanic is not already obvious from the interface.
- **MUST NOT** carry feature enumeration, comparisons to other products, or marketing superlatives.

### 5.2 Browse by Grade

- **MUST** expose all six Grade Hubs (Kindergarten, 1st–5th Grade) as direct, crawlable links from
  the homepage — this satisfies both the Constitution's 30-second legibility requirement and
  `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §7's confirmed "Home → Grade Hub, one click"
  architecture.
- **MAY** include one short differentiating phrase per grade (what changes at that grade) —
  genuinely differentiating, not filler.
- **MUST NOT** reproduce a Grade Hub's three-strand structure, unit counts, "where to begin"
  guidance, or any grade-wide orientation beyond a one-line teaser.

### 5.3 Browse by Skill

- **MUST** route to `/skills` as the sole homepage destination for skill-first browsing. The
  homepage **MUST NOT** link to individual Skill pages, individual Skill families, or invent any
  Skill Family Gateway layer — `/skills` remains, per `CANONICAL_SKILLS_HUB_STANDARD.md` §2, "the
  single canonical Skills Hub."
- **MUST** receive **coequal document-structure treatment with Browse by Grade**: its own heading
  (comparable outline depth to Browse by Grade — e.g. both as H2s, or both as labeled subsections
  of one shared "ways to browse" heading) and its own orientation content, so that a
  screen-reader user navigating by heading, an AI system extracting page structure, and a sighted
  visitor scanning the page all encounter the same two-systems distinction.

  **Coequal means semantic/document parity, not visual parity.** This standard does not require
  equal card count, equal visual size, equal pixel area, or a forced six-versus-six symmetry.
  Browse by Grade legitimately has six primary destinations; Browse by Skill legitimately has one
  (`/skills`). A future visual redesign may render these asymmetrically — six panels beside one
  larger panel, an illustration, a distinct treatment — provided both remain reachable via a
  proper heading, both carry real orientation content, and neither is nested inside or
  subordinate to the other in the underlying markup.

- **SHOULD** include a short orientation sentence naming when to choose skill-first browsing over
  grade-first browsing (e.g., already knowing the specific pattern a child needs).
- **SHOULD** use a small number of representative spelling concepts (e.g., short vowels, prefixes,
  homophones) as recognition anchors, named as plain text — **MUST NOT** hyperlink these names to
  individual Skill pages, since that would create an unauthorized second entry point into Skill
  content outside the Skills Hub. No specific count is frozen by this standard; use as many as
  make skill-first browsing concrete without becoming a partial directory.
- **MAY** state the real, programmatically sourced count of Skills and/or families (e.g., "41
  spelling skills across 12 families") as a concrete orientation fact, not a promoted statistic.

## 6. Trust and credibility content

The homepage **MUST** include a small set of concrete, falsifiable statements about the product —
not a marketing pitch, not an essay, not a labeled "why choose us" section implying comparison to
unnamed competitors.

Required content areas (each **MUST** be represented; exact count and exact wording are not
frozen — keep the set small and restrained):

- **Privacy / no account:** no login, no account creation, no personal data collection required
  to use the product.
- **No gamification:** no timers, points, streaks, or competitive mechanics — consistent with
  `CLAUDE.md`'s no-gamification rule.
- **Free:** the product is free to use.
- **Structured, curated content:** the practice content is organized and editorially curated, not
  algorithmically generated or an unstructured word dump — this is the one trust fact tying
  directly to the product identity/scope statement in §4, and it **MUST NOT** be dropped in favor
  of only device/feature facts (audio playback, cross-device compatibility). Facts of that kind
  are permitted as supporting or supplementary content but are not, on their own, sufficient
  trust content — they describe implementation details, not product values or credibility.

**MUST NOT:**

- claim unverifiable social proof (usage numbers, "trusted by X families," testimonials);
- claim a pedagogical framework, standards alignment, or efficacy outcome without sourcing that
  meets the evidence standard used elsewhere in this repository (`CANONICAL_SKILL_PAGE_STANDARD.md`
  §14);
- frame trust content comparatively against unnamed competitors or other products ("why families
  choose us");
- hide the section's real heading from sighted users while exposing a different, more
  comparative-sounding heading to assistive technology (or vice versa) — whatever heading exists
  must be the same for all users.

## 7. Internal-linking boundaries

The homepage's primary content **MUST** link exactly one architectural layer down and no deeper:

- all six Grade Hubs;
- the Skills Hub (`/skills`).

The homepage **MUST NOT** link, from primary content, to:

- individual Grade-Strand Gateways;
- individual Grade Unit / High-Frequency Words / Themed Spelling Practice member pages;
- individual Skill pages or Skill families;
- the practice experience (`/play`) directly, absent user-entered words (a session without words
  has no purpose).

This rule is frozen, not a discretionary default. `CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §7
states directly that deeper homepage links "would blur, not clarify, layer responsibility" —
authority this standard inherits rather than re-derives. Revisiting this rule requires an explicit
future amendment to this standard with a stated, non-generic reason; it is not a decision an
implementation may make case by case.

Secondary/footer-level navigation (e.g., a future About or Privacy page) is outside this rule's
scope — it governs primary homepage content, not global site chrome.

## 8. Metadata and structured data

**Metadata:**

- `<title>` and meta description **MUST** accurately describe the visible page and **MUST** state,
  at minimum, that the product is free and requires no account.
- Meta description **SHOULD** reflect the site's actual structure (grades and skills) rather than
  an imprecise raw content-count framing (e.g., avoid "hundreds of lists"-style phrasing that
  overstates what a visitor experiences at homepage depth).

**Structured data** — the governing test for every item below is: *does this accurately and
usefully represent meaningful visible homepage content?* Not "does a matching schema.org type
exist," and never solely for SEO/GEO/AEO/LLM consumption.

- **`WebSite`** (name, url) — **MUST** be present. Homepage-appropriate specifically because it
  describes the site as a whole, which only the homepage can legitimately assert.
- **`ItemList`** representing the six Grade Hub links — **SHOULD** be present, as an accurate
  representation of the visible, enumerable Grade Hub list (the same pattern already used one
  layer down by each Grade Hub's own Gateway `ItemList`). This is a recommended representation of
  real visible content, not a required centerpiece of homepage quality — its absence does not by
  itself fail this standard, but its presence must not misrepresent the page if implemented.
- The single Skills Hub link **MUST NOT** be wrapped in its own `ItemList` — a list of one item
  adds a schema type without adding real information; a plain link is sufficient.
- **`BreadcrumbList`** — **NOT APPLICABLE**. The homepage is the root; there is no breadcrumb to
  represent.
- **`FAQPage`** — **MUST NOT** be added, since this standard does not permit a homepage FAQ (§9).
- **`SearchAction`** — **MUST NOT** be added unless a real, functioning site-search feature
  exists. Do not describe a capability the page does not have.
- **`Organization`** — **MUST NOT** be added. The site is a product, not a distinct
  organizational entity with supporting facts (founding date, legal entity, address) this type
  would normally carry.

## 9. Anti-patterns (prohibited or default-rejected content)

The homepage **MUST NOT** contain:

- a general "why spelling matters" essay or any spelling-education article content;
- full explanations of Core Spelling, High-Frequency Words, or Themed Spelling Practice;
- a K–5 curriculum progression map or any full cross-grade sequence;
- the 12-family Skill taxonomy, or any individual family's orientation copy;
- individual Skill-page or individual member-page links;
- audience-segmented "For Parents," "For Teachers," or "For Students" sections;
- an FAQ section of any size;
- testimonials, unverifiable usage statistics, or "trusted by X" claims;
- "popular lists" / "popular skills" sections (no genuine popularity signal exists in this
  repository to support one);
- a blog-like content feed, "recently added," or editorial news section;
- keyword-heavy or keyword-stuffed SEO prose;
- hidden AI-facing summaries, keyword blocks, or schema added solely for LLM consumption;
- gamification of any kind (timers, points, streaks, badges) — inherited from `CLAUDE.md` and
  restated here because the homepage is the highest-visibility surface where this rule could be
  violated first;
- copy that references its own presentation ("the cards below," "the icons above") — see §10.

## 10. Presentation independence

This standard freezes content semantics and responsibilities, not presentation. It does **not**
prescribe cards, columns, colors, icons, illustrations, animation, spacing, typography, grid
layout, or any other visual-design decision. A future visual redesign satisfies this standard as
long as it preserves:

- the three primary journeys, each fully represented;
- Practice Your Own Words hosted directly and given dominant/immediate weight;
- all six Grade Hubs directly linked;
- Browse by Grade and Browse by Skill each reachable via a proper, coequal heading, regardless of
  their relative visual size or treatment (§5.3);
- the product identity/scope statement (§4);
- the trust/credibility content areas (§6);
- the internal-linking boundary (§7);
- accessibility (semantic headings, keyboard access, no information conveyed by color alone).

Editorial copy written to this standard **MUST NOT** reference implementation details ("the grid
below," "these seven cards") — write toward destinations and facts ("the six grades," "Browse by
Skill"), not toward a specific visual arrangement, so that copy survives a complete visual
redesign without requiring a rewrite.

## 11. Implementation acceptance checklist

- [ ] The page answers the governing reader question (§1) within the first viewport or the very
      next scroll step.
- [ ] Practice Your Own Words is hosted directly on the page as a working interaction, not a link.
- [ ] The product identity/scope statement (§4) is present, concise, and does not overclaim
      totality or assert an unsourced methodology label.
- [ ] All six Grade Hubs are directly linked.
- [ ] Browse by Skill routes solely to `/skills`; no individual Skill or Skill-family link exists
      in primary homepage content.
- [ ] Browse by Grade and Browse by Skill each have their own heading and orientation content, at
      comparable document-outline depth.
- [ ] Any illustrative Skill-concept names are plain text, not hyperlinks.
- [ ] Trust/credibility content covers privacy, no gamification, free, and structured/curated
      content, stated as concrete facts, not comparative marketing.
- [ ] No content owned by a Grade Hub, Gateway, Skill page, or Skills Hub is duplicated.
- [ ] No FAQ, testimonial, methodology essay, curriculum map, or audience-segmented section is
      present.
- [ ] Internal links from primary content go exactly one layer down (Grade Hubs, Skills Hub) and
      no deeper.
- [ ] `<title>` and meta description are accurate and reflect the site's real structure.
- [ ] `WebSite` structured data is present; `BreadcrumbList`, `FAQPage`, `SearchAction`, and
      `Organization` are absent (absent `SearchAction`/`Organization` unless a genuine
      corresponding feature/entity exists).
- [ ] If implemented, the Grade Hub `ItemList` matches the six visible Grade Hub links exactly,
      and the single Skills Hub link is not wrapped in its own `ItemList`.
- [ ] No visual layout, card count, CTA form, or styling decision has been inferred from this
      standard as a requirement.

---

**Status:** Frozen. Production conformance to this standard is pending implementation.
