# Canonical Homepage Standard

**Status:** Frozen production editorial and architecture authority. Revised following an approved
reopening pass (see Source). Production conformance is pending; this standard does not itself
authorize renderer, component, schema, or visual changes.
**Source:** Approved conclusions in `docs/content/CANONICAL_HOMEPAGE_STANDARD_RESEARCH.md`
(v1 research plus the v2 adversarial stress-test pass, §24 of that document), as amended by the
approved conclusions in `docs/content/CANONICAL_HOMEPAGE_STANDARD_RESEARCH_V2.md` (the reopening
pass, §16 and §18 of that document). Those documents are supporting rationale, not a duplicate
authority — consult them for *why* a requirement below exists; this standard states only what is
required. Where the two research documents differ, the V2 reopening pass governs, since it is the
later, approved amendment.
**Scope:** Exactly `/` (`src/pages/index.astro`), the single canonical homepage.
**Does not govern:** the 6 Grade Hubs, the 18 Grade-Strand Gateways, the 105 Grade Unit/member
pages, the Skills Hub, the 41 canonical Skill pages, the practice experience (`/play`), or visual
design. Those page families retain their own authorities and are not reopened here.

---

## 1. Purpose and canonical hierarchy

The homepage is the site's entry point and its **routing/orientation and confidence page** — it
also directly hosts one interaction (Practice Your Own Words) rather than merely routing to it.
It answers:

> I need spelling practice for a student. Which of this site's three ways of practicing is mine,
> and can I trust this place enough to start?

The homepage sits above all three of the site's primary journeys:

> Home → **Practice Your Own Words** (hosted directly on the homepage)
> Home → **Grade Hub** → Grade-Strand Gateway → Member Page → Practice
> Home → **Skills Hub** → canonical Skill page

The homepage owns first-impression product identity and top-level routing. It does not own
curriculum depth, pattern instruction, strand synthesis, or the Skill taxonomy — each belongs to
the layer that already owns it (`docs/content/CONTENT_IMPROVEMENT_ROADMAP.md` §2).

Homepage copy directed at visitors **MUST** refer to the audience as "students," not "children" —
the product serves the full K–5 range, and "students" is neutral across that range and matches the
vocabulary the rest of the content model already uses (Grade Unit, curriculum, grade-level
practice). This applies to visible copy; it does not require rewriting unrelated internal
documentation.

### Section information ownership

To prevent the same fact from drifting back into multiple sections over successive edits, each
required content area below is owned by exactly one section, and **MUST** appear there and nowhere
else on the page, with one stated exception:

| Section | Owns (states once, here only) |
|---|---|
| Hero (Practice Your Own Words) | Product identity/scope statement (§4); free and no-account facts, stated once as an opening reassurance |
| Browse by Grade | The three canonical curriculum strand names (§5.2); the six per-grade curriculum-grounded teasers |
| Browse by Skill | The real Skill/family count; the representative Skill examples (§5.3) |
| Closing/trust content | The structured-organization claim (§6); free, no-account, and no-gamification facts, stated once more as a closing reinforcement |

**Exception:** the free and no-account facts are the one pair of facts that **MAY** appear twice —
once in the hero as an opening reassurance, once in the closing content as a reinforcement
alongside the no-gamification fact. Every other required fact governed by this table (the strand
names, the Skill count, the representative Skill examples, the structured-organization claim)
**MUST** appear in exactly one place. An implementation that states the strand names in both the
hero and Browse by Grade, or the Skill count in both the hero and Browse by Skill, fails this
standard even if each individual section is otherwise compliant.

## 2. Required semantic content

Every homepage implementation must provide:

- a page-level H1 establishing product category and immediacy;
- a concise product identity/scope statement (§4);
- the Practice Your Own Words interaction, hosted directly on the page, not merely linked (§5.1);
- a Browse by Grade section exposing all six Grade Hubs, naming the three canonical curriculum
  strands once, and giving each grade a short curriculum-grounded teaser (§5.2);
- a Browse by Skill section, coequal in document structure with Browse by Grade, routing to the
  Skills Hub, stating the real Skill count, and naming a small set of representative Skills
  spanning the K–5 range (§5.3);
- closing trust/credibility content led by the product's structured-organization claim, with
  free/no-account/no-gamification facts present as supporting content (§6);
- standard metadata that accurately describes the visible page (§8);
- structured data appropriate to the visible content (§8);
- conformance to the section information-ownership hierarchy (§1): each required fact above stated
  in exactly one section, with only the free/no-account exception permitted twice.

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

**Narrow naming exception (added by the V2 reopening pass):** duplication, as governed by this
section, begins at *explanation* — describing what a strand or Skill is, how it works, its
counts, or its relationship to its siblings. It does not begin at *naming*. Stating the three
strand names once in Browse by Grade (§5.2), or stating the real Skill/family count and a small
set of representative Skill names once in Browse by Skill (§5.3), is not duplication of Grade Hub
or Skills Hub content under this standard, because neither act explains, sequences, or
synthesizes what those names mean — it only tells a visitor the names exist, which is what makes
the deeper Hub worth clicking. Anything beyond bare naming (a description of what a strand
teaches, a per-strand count, a stated relationship between strands, or the full 12-family
taxonomy) remains owned exclusively by the deeper layer and remains prohibited here.

## 4. Product identity and scope statement

The homepage **MUST** include a concise statement, at or adjacent to the hero, that establishes:

- what the product is (a spelling-practice site for K–5 students);
- that it is free and requires no account;
- that practice is organized across Kindergarten through 5th Grade **and** by spelling skill —
  i.e., that this is a **structured K–5 spelling resource**, not merely a single-purpose
  custom-word widget.

This is a scope claim, not a marketing claim, and not educational prose. It should read as one to
two short sentences, stated plainly, not as a paragraph, a numbered feature list, or a "why choose
us" framing. Per the section information-ownership hierarchy (§1), this statement is the hero's
entire content job beyond the Practice Your Own Words interaction itself — it should signal that a
graded curriculum and a Skill library both exist without yet naming either one's specifics; the
strand names belong to Browse by Grade (§5.2) and the Skill count belongs to Browse by Skill
(§5.3), not here.

**Wording guidance (not frozen copy):** prefer language such as "a structured K–5 spelling
resource" or equivalent over an absolute claim that the site is a "complete" curriculum — no
frozen authority requires the stronger wording, and "structured" is accurate to what the frozen
architecture actually provides (a curated, organized progression) without overclaiming totality.

This statement **MUST NOT**:

- duplicate a Grade Hub's grade-wide orientation or a Gateway's strand synthesis;
- enumerate the full 12-family Skill taxonomy, or provide any individual Skill family's
  orientation copy;
- assert a pedagogical framework or methodology label (e.g. "structured literacy") — that claim,
  if made anywhere, requires the sourcing rigor `CANONICAL_SKILL_PAGE_STANDARD.md` §14 imposes at
  a deeper, citable layer, which the homepage does not have.

**Revision note (V2 reopening pass):** this statement previously also barred naming individual
Grade-Strand Gateways, strands, or Skill families anywhere on this statement. That blanket bar has
been narrowed: the identity/scope statement itself still should not enumerate strand or family
names (see the ownership guidance above — that specificity belongs to Browse by Grade and Browse
by Skill), but the homepage as a whole is no longer barred from ever naming the three strands or a
small set of representative Skills; see §3's narrow naming exception, §5.2, and §5.3.

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
- **SHOULD** name, once, in this section's orienting copy, the three canonical curriculum strands
  — Core Spelling, High-Frequency Words, and Themed Spelling Practice — as plain-text proper
  nouns, with no per-strand explanation, no per-strand counts, and no stated priority or
  relationship between them beyond the order in which they are listed. This is the sole homepage
  location where these three names appear (§1). *(Added by the V2 reopening pass — previously
  this section, and §4, treated any mention of the strand names as prohibited; §3's narrow naming
  exception now governs this distinction.)*
- **SHOULD** include one short, genuinely differentiating phrase per grade (a "teaser") describing
  what is distinctive about that grade's practice. Each teaser **MUST** be traceable to actual
  content in the canonical K–5 Grade Unit curriculum
  (`docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`) — chosen for accuracy and
  representativeness, not for how marketable a phrase sounds. Inventing a phrase not grounded in
  an actual Grade Unit fails this requirement even if it reads well. *(Elevated from MAY to SHOULD
  by the V2 reopening pass — this permission existed before but was unused; see the Appendix for
  reference teaser copy already verified against the canonical curriculum table.)*
- **MUST NOT** reproduce a Grade Hub's three-strand structure, unit counts, "where to begin"
  guidance, or any grade-wide orientation beyond a one-line teaser. Naming the three strands once,
  as permitted above, is not "reproducing the three-strand structure" for purposes of this rule —
  reproduction means explaining what each strand contains or how they relate, not stating their
  names.

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
  grade-first browsing (e.g., already knowing the specific pattern a student needs).
- **SHOULD** use a small number of representative spelling concepts (e.g., short vowels, silent e,
  prefixes, suffixes, Greek and Latin roots, homophones) as recognition anchors, named as plain
  text — **MUST NOT** hyperlink these names to individual Skill pages, since that would create an
  unauthorized second entry point into Skill content outside the Skills Hub. No specific count is
  frozen by this standard; use as many as make skill-first browsing concrete without becoming a
  partial directory. The chosen examples **SHOULD** span the K–5 difficulty range (early skills
  through late-elementary skills) rather than clustering at one difficulty level, so the examples
  themselves signal breadth. *(Range requirement added by the V2 reopening pass.)*
- **SHOULD** state the real, programmatically sourced count of Skills and/or families (e.g., "41
  spelling skills") as a concrete orientation fact, not a promoted statistic. This is the sole
  homepage location where this count appears (§1). *(Elevated from MAY to SHOULD by the V2
  reopening pass — the frozen standard previously permitted this without expecting it; stating
  the real scale of the Skill library is now the expected default, not merely an option.)*

## 6. Closing content: product organization and trust

*(Retitled by the V2 reopening pass from "Trust and credibility content." The underlying facts
this section must cover are unchanged; the required framing and presentation model are revised.)*

The homepage **MUST** close with a short section led by a claim about the product's own
organization — that it is built from real, distinct categories of spelling knowledge rather than
an arbitrary or unstructured word list — with the free, no-account, and no-gamification facts
present as supporting trust content beneath or alongside that claim, not as an independent,
equal-weight major section.

**Structural requirement (revised by the V2 reopening pass):** the four facts formerly required as
independent, equally-weighted items (structured/curated content, privacy/no account, no
gamification, free) are no longer required to be presented as four separate, parallel items (e.g.
a four-card grid). They **MUST** still all be present, but the **structured, curated organization**
fact **MUST** lead — it is the section's primary claim, not one of four peers — with the remaining
three facts (free, no account, no gamification) permitted to be consolidated into a single
supporting sentence or clause. This is the one place on the page (besides the hero) where the
free/no-account facts may appear, per §1's stated exception.

Required content areas (each **MUST** be represented; exact wording is not frozen):

- **Structured, curated organization (leads the section):** the practice content is organized
  around real, distinct categories of spelling knowledge — such as sound-spelling patterns,
  spelling conventions, word structure, and high-frequency words — not algorithmically generated
  or an unstructured word dump. This claim **MUST** describe what the site's own architecture
  already demonstrates and **MUST NOT** assert that this is *the* correct or exclusive way spelling
  is learned — a claim about one correct pedagogical theory is stronger than this repository can
  currently support and is barred by the pedagogical-framework restriction below. Contrast the
  product against "just a random list of words," not against a claimed universal learning theory.
- **Privacy / no account:** no login, no account creation, no personal data collection required
  to use the product.
- **Free:** the product is free to use.
- **No gamification:** no timers, points, streaks, or competitive mechanics — consistent with
  `CLAUDE.md`'s no-gamification rule.

**MUST NOT:**

- claim unverifiable social proof (usage numbers, "trusted by X families," testimonials);
- claim a pedagogical framework, standards alignment, efficacy outcome, or a single "correct" or
  "actual" way spelling is learned, without sourcing that meets the evidence standard used
  elsewhere in this repository (`CANONICAL_SKILL_PAGE_STANDARD.md` §14) — this explicitly includes
  headings or opening claims of the form "the way spelling is actually learned" or equivalent
  absolute framing, which the V2 reopening pass identified as overreaching and replaced;
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
- full explanations of Core Spelling, High-Frequency Words, or Themed Spelling Practice — this
  bars *explaining* what a strand is or how it works; it does not bar the single, unexplained
  naming of the three strands permitted by §3 and §5.2;
- a K–5 curriculum progression map or any full cross-grade sequence;
- the full 12-family Skill taxonomy as a structural block, or any individual family's orientation
  copy — this bars enumerating all 12 families or explaining any one family; it does not bar
  stating the real Skill/family count, or naming a small set of individual representative Skills,
  both permitted by §5.3;
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
- copy that references its own presentation ("the cards below," "the icons above") — see §10;
- a claim that the site reflects the single correct or "actual" way spelling is learned — see §6.

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
- the closing content areas — the structured-organization claim and supporting trust facts (§6);
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
- [ ] Any illustrative Skill-concept names are plain text, not hyperlinks, and span the K–5
      difficulty range rather than clustering at one level.
- [ ] Closing content leads with the structured-organization claim, with privacy/no-account/free/
      no-gamification present as supporting facts, stated as concrete facts, not comparative
      marketing, and with no claim that the site reflects the single correct way spelling is
      learned.
- [ ] No content owned by a Grade Hub, Gateway, Skill page, or Skills Hub is duplicated — bare
      naming of the three strand names (Browse by Grade) and the Skill count plus representative
      Skill names (Browse by Skill) is permitted; explanation, counts-per-strand, and the full
      12-family taxonomy are not.
- [ ] The three curriculum strand names (Core Spelling, High-Frequency Words, Themed Spelling
      Practice) appear exactly once on the page, in Browse by Grade.
- [ ] The real Skill count appears exactly once on the page, in Browse by Skill.
- [ ] Each grade card includes a short teaser traceable to the canonical K–5 Grade Unit curriculum,
      not an invented phrase chosen for how it sounds.
- [ ] Visible homepage copy refers to "students," not "children."
- [ ] No required fact is repeated across sections beyond the one stated free/no-account exception
      (§1).
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

## Appendix: Reference homepage copy (non-frozen)

**Status of this appendix: illustrative, not literal-frozen requirement.** Everything above this
appendix (structural requirements, content ownership, MUST/SHOULD/MUST NOT rules) is the frozen
standard. The copy below is the approved reference example from
`docs/content/CANONICAL_HOMEPAGE_STANDARD_RESEARCH_V2.md` §12, reproduced here so implementers have
a concrete, vetted starting point. An implementation **MAY** use different exact wording as long as
it satisfies the structural and factual requirements above (correct facts, correct section
ownership, no repetition beyond the stated exception, no anti-pattern). Two exceptions are already
governed elsewhere and are not loosened by this appendix's non-frozen status: the `<title>`/meta
description keyword requirements (§8) and the H1's practice-first, dominant-action requirement
(§5.1) — code-level test locks on exact fragments, where they exist, are an implementation detail
outside this standard's scope and are not restated here.

**Title tag:** Free K–5 Spelling Practice by Grade or Skill—No Account | SpellingWords.app

**Meta description:** Free spelling practice for K–5 students, with no account required. Practice
your own words, or find structured curriculum practice by grade or spelling skill.

**H1:** Practice spelling — your words, or ours.

**Hero paragraph:** Type or paste any list and start practicing in seconds — free, with no
account. Or explore a structured K–5 spelling curriculum and a full library of spelling skills.

**Primary CTA:** Start Practicing →
**Secondary link:** or browse structured spelling practice ↓

**Browse by Grade — heading:** Browse by Grade
**Browse by Grade — body:** Follow a Kindergarten–5th Grade spelling curriculum built around Core
Spelling, High-Frequency Words, and Themed Spelling Practice.

**Grade cards (label / teaser):**
- Kindergarten / Letters, sounds, and first words
- 1st Grade / Blends, silent e, and vowel teams
- 2nd Grade / R-controlled vowels and multisyllabic words
- 3rd Grade / Prefixes, suffixes, and homophones
- 4th Grade / Greek and Latin roots and derived words
- 5th Grade / Advanced roots, affixes, and academic words

**Browse by Skill — heading:** Browse by Skill
**Browse by Skill — body:** Already know what to work on? SpellingWords.app's skill library covers
41 spelling skills — from short vowels and silent e to prefixes, suffixes, Greek and Latin roots,
and homophones — organized independently of grade level so students can practice the specific
spelling skill they need.
**CTA:** Browse Spelling Skills →

**Closing section — heading:** More than a list of spelling words
**Closing section — body:** SpellingWords.app is organized around real spelling knowledge —
sound-spelling patterns, spelling conventions, word structure, and the high-frequency words
students see every day — not just a random list to memorize. It's free, with no account, and has
no timers, points, or competitions: just focused, structured practice.

---

**Status:** Frozen, as revised by the V2 reopening pass. Production conformance to this standard,
including the amendments above, is pending implementation.
