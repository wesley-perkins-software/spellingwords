# Canonical Grade Hub Page Standard — Research & Proposed Model

**Status:** Research document. Proposes a canonical standard for later pilot implementation. Not
itself a frozen editorial standard, and not implemented. No production Grade Hub page, route,
component, or schema was changed to produce this document.
**Scope:** The six Grade Hub pages — `/kindergarten`, `/1st-grade`, `/2nd-grade`, `/3rd-grade`,
`/4th-grade`, `/5th-grade`.
**Does not govern:** the 18 Grade-Strand Gateways (`docs/content/CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md`,
frozen), the 105 member pages (each governed by its own frozen standard), Skill pages, the Skills
Hub, or the main `/spelling-lists` browse page.

---

## 1. Executive summary

The Grade Hub layer is the one piece of the K–5 content architecture that has **not** been
re-examined since the Grade-Strand Gateway layer was built and frozen underneath it. All six live
Hubs still implement the pre-gateway, three-section "flattened directory" model from
`K5_FINAL_CONTENT_ARCHITECTURE.md`: every individual Core, HFW, and Themed member page appears as
its own numbered card directly on the Hub (K=17 cards, 1st=24, 2nd=25, 3rd=16, 4th=12, 5th=11).
Meanwhile, the frozen Gateway standard already states, as a settled premise of its own scope note,
that the Grade Hub is "correctly thin, three-strand-wide" and "never carries a per-strand
progression narrative, cumulative inventory framing, or theme selection guidance" — because that is
now the Gateway's job. The Hub has not yet been rewritten to actually be that thin page; it still
does the Gateway's old job as well as its own.

This research concludes the central hypothesis is **sound and should be implemented**: a Grade Hub
should shed its 105 direct member-page links entirely and become a genuinely thin orientation page
— grade-level framing plus three strand summaries, each providing a clear, crawlable, mechanically
generated route into that strand's Gateway, plus adjacent-grade navigation. The requirement is a
route, not a specific link count or markup shape — see §7 and §13 for why this standard deliberately
does not prescribe "exactly one link," a presentation-coupled requirement corrected during this
refinement pass. This is not a minimalism preference; it is required to
stop the Hub and Gateway layers from saying the same three things in different words, which is
precisely the failure mode the site's own editorial system elsewhere works hard to avoid (see the
Skill-vs-Grade-Unit boundary in `CONTENT_IMPROVEMENT_ROADMAP.md` §2, and the Grade-Unit-vs-Skill
differentiation tests in `CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` §9).

A real, load-bearing tension surfaced during this research and is treated in full in §5: the site's
highest-precedence document, `docs/architecture/CONSTITUTION.md`, defines a two-hop journey ("Grade
Roadmap → Grade Unit → Practice," §5.3, §11's "No-Gateway Rule") that on its face does not
anticipate a Gateway layer at all, and was not explicitly amended when that layer was built and
frozen. This document does not resolve that tension by fiat — it documents it, argues the Gateway
survives the Constitution's actual test (real value per its primary user intent, not link-count),
and specifies (§5.2) a precise, implementation-ready three-point amendment — distinguishing a
prohibited empty/pass-through gateway from a substantive Grade-Strand Gateway that independently
clears the Constitution's real-value bar, and updating the canonical journey to "Grade Hub →
Grade-Strand Gateway → Member Page → Practice" — as a **required companion task**, to be carried
out as its own reviewed change rather than inside this research document, before or alongside
freezing the Grade Hub standard.

This refinement pass also completed the K–5 maturation validation left partial in the prior draft:
Grade 4 and Grade 5 have now been checked in full against the authoritative curriculum document
(§10), and both existing Hub framings hold up at full confidence, with no correction required. And
it corrected one internal error in the prior draft's own presentation-independence claim: the
gateway-routing requirement was previously stated as "exactly one link" per strand, which is itself
a presentation decision this standard should not freeze; §7 and §13 now state the requirement as a
route, independent of link count or markup form.

**Verdict: GRADE HUB MODEL READY FOR PILOT**, with 3rd Grade recommended as the pilot (§20), subject
to the Constitution amendment above being completed as a companion task, not a blocker.

---

## 2. Repository-state verification

- `origin/development` fetched and audited at **`d040c73ba3313e3f517d5aa4f9e413523270d973`**
  ("Merge pull request #275 from wesley-perkins-software/claude/grade-3-5-strand-gateways-qp4967").
- Working branch `claude/grade-hub-standard-research-ddrjfe` was already at that same commit at the
  start of this task, both locally and on `origin`. Working tree was clean before this document was
  added. No merge, rebase, or conflict resolution was required.
- All 18 Grade-Strand Gateways confirmed authored and complete: `src/lib/content/gradeStrandGatewayCopy.ts`
  contains distinct, hand-authored orientation/synthesis/guidance copy for every grade × strand
  combination (verified by direct read, not sampled) — no gateway uses a generic fallback. Covered
  by `canonicalGradeRoutes.test.ts` (18 unique paths, 3 per grade) and `gradeStrandGatewayCopy.test.ts`.
- The frozen Gateway standard, `docs/content/CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md`, is
  current and load-bearing for this research; it is treated as authoritative for everything it
  covers and is not reopened here.

---

## 3. Current Grade Hub implementation (repository fact)

All six Hubs are rendered by **one shared dynamic route**, not six separate files:

- **Route:** `src/pages/[gradeSlug].astro` (213 lines). `getStaticPaths()` maps the 6-entry
  `gradeConfig` (`src/lib/content/gradeConfig.ts`) to `/kindergarten`, `/1st-grade`, `/2nd-grade`,
  `/3rd-grade`, `/4th-grade`, `/5th-grade`.
- **Identity data:** `gradeConfig.ts` — grade code, `label`, `shortLabel`, `slug`, `hubHref`,
  `getAdjacentGrades()`.
- **Prose copy:** `src/lib/content/gradeHubCopy.ts` — per grade: `metaDescription`, two
  `heroParagraphs`, `guidanceBody`, `emptyStateLabel`.
- **Card/section data:** `src/lib/content/gradeHubCards.ts` (994 lines) — six hand-curated arrays
  (`KINDERGARTEN_HUB_SECTIONS` … `GRADE_5_HUB_SECTIONS`), each with 3 sections (Core Spelling /
  High-Frequency Words / Themed Spelling Practice), each section a list of member-page card
  definitions joined against the `spelling-lists` content collection for real title/href/
  category/difficulty/duration/word-count.
- **Gateway links:** `getGradeHubGatewayLinks()` in `canonicalGradeRoutes.ts` resolves the 3
  same-grade Gateway hrefs consumed by each section's `<h2>`.
- **Shared components:** `Layout.astro`, `SiteHeader.astro`, `SiteFooter.astro`,
  `Breadcrumbs.astro`, `SpellingListCard.astro` — the same component set the Gateway layer uses,
  which already gives Hub and Gateway visual consistency today (a fact worth preserving in spirit
  through any redesign, though visual design is out of scope here).

**Common structure on all six today** (verified by direct code read and cross-checked against
`gradeHubCards.test.ts`, `gradeHubCopy.test.ts`, `gradeHubGatewayLinks.test.ts`):

| Element | Behavior today |
|---|---|
| Breadcrumb | `Home > {grade label}` — 2 levels (shallower than the Gateway's 3-level breadcrumb) |
| H1 | `"{label} Spelling Words"` |
| Opening prose | 2 hero paragraphs, grade-specific, authored |
| 3 sections | Each headed by a linked strand name (`<h2><a href={gatewayHref}>`) — **the only** Hub→Gateway link, structurally enforced by `gradeHubGatewayLinks.test.ts` forbidding hardcoded gateway URLs elsewhere in the template |
| Section body | Every individual member page as a numbered `SpellingListCard` (`<ol>` for all three sections on the Hub — note Themed renders `<ol>` here but `<ul>` on its own Gateway, an inconsistency worth resolving during implementation) |
| Guidance box | "How to choose a list" — conditional on >1 displayed item (always true today) |
| Adjacent-grade nav | `getAdjacentGrades()` — prev/next Hub links |
| "Back to all grades" | Links to `/#grades` |
| Skills link | Only inside an empty-state fallback that **never fires today** (0 of 6 grades has an empty section) — the Hub does not, in practice, link to Skills at all |
| Metadata | `<title>`, meta description from `gradeHubCopy[grade].metaDescription`, OG tags |
| Structured data | `BreadcrumbList` + `ItemList` (`numberOfItems` = full flattened card count across all 3 sections, every card a `ListItem`). No `CollectionPage`/`WebPage` type, no `FAQPage`. |
| Test coverage | Data/contract-level only (`gradeHubCards.test.ts`, `gradeHubCopy.test.ts`, `gradeHubGatewayLinks.test.ts`) — no rendered/e2e test exists for any Hub page today |

**Existing hero/guidance prose already demonstrates real K–5 voice maturation** and should be
treated as a valuable starting asset, not discarded wholesale:

| Grade | Existing framing (verbatim excerpt) |
|---|---|
| K | "simple, encouraging, and concrete" |
| 1st | "about learning how words work, not memorizing giant vocabulary lists" |
| 2nd | "the year spelling stops being one syllable at a time" |
| 3rd | "the bridge from phonics into morphology" |
| 4th | "the expansion year after introductory morphology" |
| 5th | "the capstone of elementary spelling… bringing every earlier skill together" |

---

## 4. Six-hub audit

Per-grade card totals confirm the flattened-directory pattern is uniform, not a Kindergarten-only
or 3rd-Grade-only artifact:

| Grade | Core cards | HFW cards | Themed cards | Total member cards on Hub |
|---|---:|---:|---:|---:|
| Kindergarten | 8 | 4 | 5 | 17 |
| 1st Grade | 12 | 7 | 5 | 24 |
| 2nd Grade | 13 | 7 | 5 | 25 |
| 3rd Grade | 7 | 5 | 4 | 16 |
| 4th Grade | 6 | 2 | 4 | 12 |
| 5th Grade | 5 | 2 | 4 | 11 |

**Element-by-element classification** (applies uniformly across all six grades — none diverges in
structure, only in prose/counts):

| Element | Classification | Rationale |
|---|---|---|
| H1 (`"{grade} Spelling Words"`) | **KEEP AT HUB** | Correctly grade-wide, not strand-specific; matches the site's public grade-label convention |
| Breadcrumb (Home → Grade) | **KEEP AT HUB** | Renderer-owned, correct depth for this layer |
| 2-paragraph hero prose | **KEEP AT HUB, REWRITE** | Belongs here (grade-wide orientation), but needs restructuring once it no longer has to gesture at "which cards below" — see §7 |
| Core section: linked heading (today's specific markup for the Hub→Core-Gateway route) | **KEEP THE ROUTE AT HUB; markup form not frozen** | Today's implementation happens to use a linked `<h2>` as the sole down-link to the Core Gateway; the requirement going forward is the route itself, not this specific one-link-per-heading markup — see §7 |
| Core section: individual member cards (5–13 per grade) | **REMOVE** | Exact duplicate of what the Core Gateway now owns completely and authoritatively; violates the Gateway standard's own duplication table (§1) |
| HFW section: linked heading + summary string | **KEEP THE ROUTE + SUMMARY AT HUB, REWRITE SUMMARY (lighter)** | The count-and-purpose summary is legitimate Hub-level content in reduced form; full cumulative-inventory framing moves to the Gateway; markup form of the route is not frozen, same as Core above |
| HFW section: individual set cards | **REMOVE** | Same reasoning as Core; the HFW Gateway is the frozen, unconditional, complete list owner |
| Themed section: linked heading + count | **KEEP THE ROUTE + COUNT AT HUB, REWRITE (lighter)** | Same treatment as HFW |
| Themed section: individual theme cards | **REMOVE** | Same reasoning; the Themed Gateway already owns "light descriptive grouping of theme titles" per its own standard §3 |
| "How to choose a list" guidance box | **REWRITE → "how the three strands work together / where to begin"** | The existing box mixes Hub-appropriate content (start with Core) with Gateway-appropriate content (in-order progression narrative per grade); split responsibility per §6 |
| Adjacent-grade nav (prev/next) | **KEEP AT HUB** | Legitimately Hub-level; not duplicated anywhere else in the architecture (§9) |
| "Back to all grades" link | **KEEP AT HUB** | Cheap, correct, non-duplicative |
| Skills link (empty-state only) | **REMOVE the empty-state coupling; DEFER a real Skills link decision** | Currently dead code in practice; §9 addresses whether a Hub→Skills link should exist at all, independent of this defunct fallback |
| `BreadcrumbList` JSON-LD | **KEEP AT HUB** | Matches Gateway's own pattern; no change needed |
| `ItemList` JSON-LD (currently: every member card) | **REWRITE** | Must shrink to reflect whatever list actually remains on the page — see §18 |
| 2-level breadcrumb depth | **KEEP AT HUB** | Correct; Hub is one level shallower than Gateway by design |

No element found needs **DEFER TO VISUAL REDESIGN** as a distinct bucket — every current Hub
element is a content/semantic decision, not a presentation one requiring a future redesign to
resolve first. This absence is itself useful: it means the Hub's problem today is entirely
architectural (too much content, wrong layer), not visual.

---

## 5. Architectural boundary findings

### 5.1 The four-layer hierarchy is real and mostly already documented

`CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` §1 already states the hierarchy as settled fact:
"Grade Hub → Grade-Strand Gateway → Member Page," with an explicit duplication table. This research
does not invent that hierarchy; it extends it one layer up (adding Home/Grades-discovery as the
zeroth layer) and — critically — actually implements the Hub side of a boundary the Gateway side
has already been living by since it was frozen.

### 5.2 The Constitution's "No-Gateway Rule" — a genuine unresolved tension, not a false alarm

`docs/architecture/CONSTITUTION.md` is documentation-precedence rank #1 (§17) and states in §11:

> A page should not be inserted into the normal learning or practice path merely to expose another
> directory of links. Undesirable: Grade Roadmap → Practice Gateway → More choices → Actual
> practice. Preferred: Grade Roadmap → Grade Unit → Immediate practice → Optional focused practice.

And in §5.3: "A Grade Unit experience should not primarily be a gateway to other pages. The normal
journey should be: Grade Roadmap → Grade Unit → Practice." Read literally, this describes a
**two-hop** journey with no room for a Gateway layer between Hub ("Grade Roadmap") and member page
("Grade Unit") at all.

The Constitution's own §20 ("Amendment Standard") requires that when the product model changes, "the
constitution must change with it" and that implementation "should not become architecture by
accident." The Grade-Strand Gateway layer was designed, implemented, tested, and frozen (18 pages,
one standard document) without an accompanying, explicit Constitution amendment addressing §5.3/§11.
That is a real process gap, independent of whether the Gateway itself is good architecture.

**This research's position:** the Gateway survives the Constitution's actual substantive test, which
is not hop-count but *value*: §11 itself says "every page must provide real value for its primary
user intent through at least one of: practice, a useful Grade Roadmap, a meaningful word set, a
substantive explanation, a recognized collection, a legitimate browse or search experience." A
Grade-Strand Gateway is a "substantive explanation" page (progression narrative for Core, cumulative
inventory for HFW, theme purpose for Themed) with a "legitimate browse" function (the complete,
crawlable member list) — not "another directory of links" in the sense §11 condemns, which is
specifically a page that adds a hop while adding *no* value. The Gateway standard's own reference
implementation and required orientation/synthesis content (§2–§3 of that standard) are exactly the
kind of "substantive explanation" §11 exempts.

**Recommendation, stated plainly and not glossed over, and made implementation-ready in this
refinement pass:** treat the Gateway layer as **defensible under the spirit, but not the literal
example journey, of the current Constitution**, and require — as an explicit companion task,
scheduled alongside or before freezing/implementing the Grade Hub standard, not performed silently
inside this research document — a targeted Constitution amendment with the following content:

1. **Distinguish two things §11 currently conflates under one label ("gateway"):** an *empty or
   pass-through* directory page (no orientation, no synthesis, existing solely to add a hop before
   the reader reaches something useful) — which §11 is right to prohibit and which this research
   does not ask the Constitution to permit — versus a *substantive* Grade-Strand Gateway that
   independently provides (a) real orientation/synthesis content (the progression narrative, the
   cumulative inventory framing, or the theme-purpose explanation the frozen Gateway standard
   already requires per grade+strand) and (b) an authoritative, complete browse experience for that
   strand's member pages. The amendment should state explicitly that §11's prohibition targets the
   first case, not the second, and that a page must independently satisfy §11's own "real value for
   its primary user intent" test (practice, a useful roadmap, a meaningful word set, a substantive
   explanation, a recognized collection, or a legitimate browse/search experience) to qualify as the
   second case — this is not a blanket exemption for anything calling itself a "gateway."
2. **Update the canonical journey example** in §5.3 and §11 from the current two-hop "Grade Roadmap
   → Grade Unit → Practice" to the explicit four-stage form:
   > Grade Hub → Grade-Strand Gateway → Member Page → Practice
   with a note that the Grade-Strand Gateway stage is permitted only because it independently
   satisfies §11's real-value requirement (point 1 above) — the amendment should not read as
   "gateways are now allowed," but as "this specific, already-frozen Gateway layer was checked
   against the existing rule and passes it, and the rule's language should say so precisely enough
   that future contributors don't have to re-derive that finding from scratch the way this research
   document had to."
3. **Do not weaken §11's general prohibition.** The amendment's job is narrow: reconcile the
   Constitution's stated example journey with an already-shipped, already-frozen architectural
   layer that this research independently verifies clears the Constitution's own bar — not to open
   the door to inserting new directory pages elsewhere in the site without the same scrutiny.

**Scope discipline for this document specifically:** this research repository has no established
convention of a research document normatively amending `CONSTITUTION.md` itself — reviewing the
Constitution's own git history shows no case of a research/planning document editing it directly;
amendments happen as their own explicit, reviewed change (`CONSTITUTION.md` §20's own amendment
procedure: "identify the principle being changed, explain the... reason, update this constitution,
update any conflicting canonical documents"). Consistent with that convention and with this task's
explicit instruction, **this document does not amend `CONSTITUTION.md`.** The three-point amendment
specified above is recorded here as a fully-specified, implementation-ready companion task, to be
carried out as its own reviewed change before or alongside freezing the canonical Grade Hub
standard — not silently, and not deferred indefinitely.

### 5.3 Stale documentation, separated from current authority

| Document | Status |
|---|---|
| `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md` §2 (Layer 3 — Grade Hub pages) | **Stale.** Written before the Gateway layer existed; still says the Hub's linking role is "routes down into every Grade Unit/High-Frequency Words/Additional Practice page for that grade." This directly contradicts the now-frozen Gateway standard's model and should be updated once a Hub standard exists, not treated as current authority for this research. |
| `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md` | **Frozen at the architecture level for its three-section decision** (Core/HFW/Themed as the grade's three parts), but its own top-of-file correction note already flags its gateway URL model as stale/superseded by `PUBLIC_URL_ARCHITECTURE.md` and the Gateway standard. Its per-grade Hub card tables describe exactly the flattened state this research proposes changing — historically accurate, not a current target. |
| `docs/architecture/CONSTITUTION.md` §5.3, §11 | **Not stale in the sense of being wrong**, but unamended against a real architecture change — see §5.2 above. Everything else in the Constitution (three user journeys, "no giant word bank," accessibility/privacy principles, the general §11 value test) remains fully authoritative and is not questioned by this research. |
| `docs/content/CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` | **Current, frozen, authoritative.** The anchor document for this research. |
| `docs/content/CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` §1 | **Current.** Explicitly scopes itself away from Grade Hub pages ("Grade Hub pages — `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md`") — confirms no member-page standard claims Hub jurisdiction, leaving the gap this research fills. |
| Two roadmap-referenced companion inventory files (`deprecated-and-legacy-pages.md`, `untagged-and-data-quality.md`) | **Missing from the repository**, independently confirmed by directory listing. Pre-existing, already-flagged gap, unrelated to Grade Hubs; noted for completeness only. |

### 5.4 Four-layer responsibility matrix

"Home/Grades" below refers to the top-level `/` grade-discovery experience (§3.2 of
`CONSTITUTION.md`'s "Learn by Grade" journey entry point), not a separate page family this research
redesigns.

| Content item | Owned by | Why here | Why not elsewhere |
|---|---|---|---|
| Grade-level spelling overview (what changes at this grade) | **Grade Hub** | This is literally the Hub's governing question; no other layer is grade-wide but sub-curriculum-wide | Not Home (too deep for a 6-way grade chooser); not Gateway (strand-specific, not grade-wide); not Member (too narrow) |
| Explanation of the three strands existing | **Grade Hub** | Matches the Gateway standard's own duplication table (§1): "this grade has three strands; here's what each covers" is explicitly Hub-owned there already | Not Gateway (§1 of that standard forbids gateways re-explaining sibling strands) |
| Relationship among the three strands ("how these work together") | **Grade Hub** | A cross-strand synthesis question only the Hub can answer without triple-authoring the same sentence on all three gateways | Not Gateway (a single gateway can't speak for its siblings without violating its own no-re-explain rule) |
| "Where should I start?" | **Grade Hub (points to Core) + Core Gateway (states the specific first unit)** | Split intentionally: the Hub answers "start with Core, here's why," the Core Gateway states the literal first unit name — this mirrors the existing Core Gateway's required "where to begin" pointer (§3 of the Gateway standard) so the two layers complement rather than duplicate | Not Home (too specific); not other Gateways (Core owns "where to begin" by design, not HFW/Themed) |
| Core progression narrative/detail | **Core Gateway** | Explicitly the Gateway's required synthesis content (§3) | Not Hub (§1 of the Gateway standard: "never carries a per-strand progression narrative") |
| Core unit list (complete) | **Core Gateway** | Explicitly the Gateway's unconditional required content | Not Hub (this is exactly the duplication this research recommends removing) |
| HFW definition (frequency ≠ irregularity) | **HFW Gateway** | Explicitly required there (§3); reuses the member-standard's own framing, never re-derived | Not Hub (would be a third restatement of the same one-sentence framing site-wide) |
| HFW aggregate counts (sets/words) | **Grade Hub (one summary line) + HFW Gateway (full synthesis)** | The Hub's existing summary strings ("4 sets · 40 words") are already a legitimate, lightweight orientation fact; the Gateway is where that number becomes a *synthesis claim* about cumulative building | Counts as bare numbers are cheap and useful at both layers in different depths — see §17 for how deep each goes |
| HFW set list (complete) | **HFW Gateway** | Same reasoning as Core unit list | Not Hub |
| Themed purpose (optional/non-sequential) | **Themed Gateway** | Required there (§3); a one-line acknowledgment that Themed exists and is optional is separately owned by the Hub (see three-strand explanation row above), but the *reasoning* for why it's optional belongs to the Gateway | — |
| Themed theme list (complete) | **Themed Gateway** | Same reasoning as Core/HFW lists | Not Hub |
| Direct member links | **Member layer only, reached via Gateway** | See §6 for the full dedicated argument | Not Hub — this is the central finding of this research |
| Links to strand gateways | **Grade Hub** | The Hub's most important structural job — routing into all three gateways | — |
| Grade-level curriculum synthesis (cross-strand) | **Grade Hub** | Same as "relationship among strands" above | Not Gateway (strand-scoped by design) |
| Previous/next grade navigation | **Grade Hub** | Legitimately grade-wide, not strand-scoped; no other layer has a natural place for it (member pages have their own separate, curriculum-internal Review-First/Next-Step chain that already crosses grade boundaries where the *sequence itself* crosses — see `CANONICAL_NAVIGATION_RELATIONSHIPS.md` §"Grade-boundary transitions" — a Hub-level "next grade" link is deliberately a different, coarser relationship and should not be confused with or replace that member-level chain) | Not Gateway (the Gateway standard's own anti-patterns list explicitly rejects cross-grade gateway links as failing the reasonable-parent test, §9) |
| Cross-grade progression (K–5 sweep) | **Not owned by any single page today; explicitly out of scope for the Hub** | A full K–5 map is called out as "a site-wide feature, not this page's job" already in the Gateway standard's own Core-continuity guidance (§3) — the same reasoning applies one layer up | — |
| Skill links | **Not the Grade Hub, in the current architecture** — see §9.3 | Skills are explicitly the Core layer's counterpart per the Gateway standard's own anti-pattern ("Link HFW or Themed gateways directly to individual Skill pages… Skill pages are Core's counterpart") | — |
| Practice instructions | **Member page only** | Owned unconditionally by the member-page standards (word-level practice mechanics) | Not Hub or Gateway — neither layer runs a practice session |
| Educational explanations (pattern mechanics) | **Skill page** (Layer 1) or **Member page** (bounded local context) | Per `CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` §9's local-context-vs-duplication test | Not Hub — grade-wide orientation is not the same as pattern explanation |
| FAQs | **PROHIBITED by default at the Hub, same as the Gateway's own rule** | See §21 GEO/AEO findings — no evidence supports FAQ quotas at any layer of this architecture; the Gateway standard already rejects them absent genuine content (§2, §9), and nothing about the Hub layer changes that calculus | — |
| Parent/teacher/student guidance | **Universal task-oriented language across all layers, not audience-segmented sections** | See §19 | — |

---

## 6. Direct-member-card question — dedicated conclusion

**Should the final Grade Hub continue to list individual member pages? No.**

This is the central, load-bearing recommendation of this research, and it is argued from the site's
own existing rules, not imported minimalism:

1. **The Gateway standard already claims unconditional, complete ownership of the member list.**
   §1's duplication table states plainly: "Complete, authoritative list of every member in one
   grade+strand — Owned by: Gateway, unconditionally... The Grade Hub may additionally surface
   convenience cards for some strands... without this becoming the canonical list — the gateway
   remains the page a reader or crawler should trust as complete." Read carefully, this sentence
   already anticipates and permits Hub convenience cards existing *without contradicting* Gateway
   completeness — but it does not require them, and the current implementation goes far beyond
   "convenience": it reproduces the *entire* member list, every time, on every Hub, which is not a
   convenience shortcut but a second complete index maintained in parallel with the first.

2. **Click-depth is unaffected.** The task's own framing worried that removing direct cards might
   hurt discoverability by adding a click. It does not: Home → Hub (1 click) → Gateway (2 clicks) →
   Member (3 clicks) is *already* the audited, intended architecture per the Gateway standard's own
   §7: "The audited hierarchy — Home → Grade Hub (1 click) → Gateway (2 clicks) → Member (3 clicks)
   — is the intended and correct architecture." Removing direct Hub member cards does not add a
   click that wasn't already the frozen target depth; it removes a *second, shorter path that
   competes with* the intended depth, which is not the same thing as "making the site harder to use"
   — it is closing an accidental shortcut that undermines the Gateway's claimed completeness role.

3. **Duplication cost compounds with every future editorial pass.** Every Core/HFW/Themed title
   or ordering change currently must be kept in sync in two places (`gradeHubCards.ts`'s hand-curated
   arrays and the canonical route/content-collection source of truth) — exactly the class of drift
   `CANONICAL_NAVIGATION_RELATIONSHIPS.md`'s own history documents happening for the Review-
   First/Next-Step chain when relationship data was hand-authored per page instead of derived. The
   current `gradeHubCards.ts` file (994 lines) is precisely that kind of hand-authored parallel
   structure the site has already learned, the hard way, is a maintenance liability.

4. **Google Search Central's own general guidance** — "make a site with a clear hierarchy and text
   links; every page should be reachable from at least one static text link" — is satisfied by the
   Hub→Gateway→Member chain on its own; it does not require every page to be *additionally*
   reachable one hop earlier. A "pillar page with topic clusters linked to it" model (the same
   source material) maps naturally onto Gateway-as-pillar-for-its-strand, Hub-as-pillar-for-the-
   grade — not onto the Hub also individually enumerating every leaf. ([Siege Media: Internal
   Linking Structure](https://www.siegemedia.com/seo/internal-linking-structure))

5. **User comprehension and page length favor removal, not preservation.** A reader landing on
   `/3rd-grade` today sees 16 near-identical numbered cards before any synthesis — the least useful
   possible first impression of "what does 3rd grade spelling look like." Removing them and
   replacing each section with a short summary + one clear gateway link is a strict comprehension
   improvement, not a tradeoff against it.

**What survives, explicitly:** count-and-purpose summary lines per strand (e.g. "5 sets · 60
words," matching the site's existing precedent of stating counts only inline in prose, never as a
separate stat/badge UI element — see §17) remain legitimate, lightweight Hub content. What is
removed is the *individual, per-member* card — not every mention of scale or scope.

---

## 7. Three-strand model conclusion

The three-strand model (Core / HFW / Themed, each providing a clear, crawlable route into its own
Grade-Strand Gateway) should be the Hub's entire structural spine. Per §6 and the responsibility
matrix in §5.4:

- **Core Spelling:** the Hub states, in one or two sentences, that Core is the grade's main,
  systematic, recommended path, states the unit count as a bare fact, and routes into the Core
  Gateway. It does not narrate the sequence (that's the Gateway's required synthesis) and does not
  list units.
- **High-Frequency Words:** the Hub states the aggregate count ("N sets · M words") and a one-
  sentence purpose (practiced alongside Core, not a substitute for it), and routes into the HFW
  Gateway. It does not restate the frequency-vs-irregularity distinction in full (that's the
  Gateway's required, once-stated framing) and does not list sets.
- **Themed Spelling Practice:** the Hub states it is optional, states the theme count, and routes
  into the Themed Gateway. It does not describe individual themes or provide selection guidance
  beyond "optional, explore if useful" (the Gateway's job per its own §3).

This is not "treat all three strands identically" (an anti-pattern the Gateway standard itself
already names, §9) — each strand summary is sized and worded to its own role (Core gets a
recommendation-with-reason; HFW gets an inventory-with-purpose; Themed gets a permission-with-
scope), even though structurally each performs the same function (a route to its Gateway).

**On link cardinality, corrected from the prior research pass:** this standard requires that each
strand section provide a clear, crawlable route to its corresponding same-grade Gateway — it does
**not** require, and should not be read to require, that this route take the form of exactly one
visible link. "Exactly one link" is a presentation decision (how many visible affordances a future
design renders for one relationship), not a content-architecture requirement, and freezing it here
would violate this standard's own presentation-independence mandate (§15). The architectural
requirement, restated precisely, is: every Grade Hub must provide a clear, crawlable route from
each of its three strand sections to the corresponding canonical same-grade Gateway; that
destination must be mechanically generated from the existing route source of truth (the same
`getGradeHubGatewayLinks`-style derivation already used today, not hand-authored per grade); the
standard does not prescribe whether a future presentation renders that route as a linked heading, a
CTA button, a card, or another accessible treatment; and multiple visible links to the same Gateway
from one strand section are not inherently prohibited if a future design has a legitimate UX reason
for them (e.g. a heading link plus a separate "explore all Core units" button) — though unnecessary
duplication with no distinct purpose should still be avoided on ordinary economy-of-content grounds,
not because a second link is architecturally forbidden.

---

## 8. Grade-level orientation conclusion

The Hub's opening prose should answer, briefly and in parent-readable language, exactly the four
questions the task posed: what changes at this grade, what broad spelling knowledge the grade
emphasizes, how it relates to what came before, and what students are building toward — **without**
duplicating the Core Gateway's specific unit-by-unit sequence narrative. The existing hero
paragraphs already do a version of this reasonably well (§3's table of excerpts) and should be the
starting draft, not discarded; the main correction needed is removing any residual language that
gestures at "the cards below" (a presentation-coupling issue, §16) and ensuring the paragraph
doesn't drift into restating Core Gateway content verbatim.

The useful distinction the task proposed — **Grade Hub: broad grade-level spelling maturation
across all three strands; Core Gateway: the specific ordered Core progression** — holds up against
the frozen Gateway standard's own language ("Grade Hub… never carries a per-strand progression
narrative") and is adopted as-is.

---

## 9. "Where to start / how these work together" conclusion

### 9.1 Where to start

Every Hub should state, in one sentence, that Core is the recommended starting point, and let the
Core Gateway's own required "where to begin" pointer (already frozen, §3 of that standard) supply
the specific first unit. This avoids the Hub inventing or duplicating a fact the Gateway already
owns authoritatively, while still answering the parent's most immediate question without a click.

### 9.2 How the three strands work together

The task's working hypothesis — Core is the main systematic sequence, HFW is practiced alongside
Core, Themed is optional additional practice — holds up against `CONSTITUTION.md` §5.5's framing:
"Core Spelling may teach a structure represented by an HFW word while HFW practice builds accurate
and increasingly automatic retrieval… Overlap across strands is therefore not inherently a defect."
This directly supports "practiced alongside," not "practiced after" or "mechanically aligned
unit-for-unit" — the research explicitly should **not**, and this document explicitly does not,
imply a forced one-to-one mapping between Core units and HFW sets, since the Constitution itself
states overlap is incidental to shared frequency/curriculum-fit criteria, not a designed
lockstep pairing. Themed's "optional, not required" framing is already required, verbatim in spirit,
at the Themed Gateway layer (§3 of that standard: "state plainly that the strand is optional and
non-sequential") — the Hub's version should be a compressed echo of that same fact, not a new claim.

A short "how these three work together" sentence or two belongs in the Hub's guidance area (the
current "How to choose a list" box, retitled — see §4's REWRITE classification) precisely because it
is a genuine cross-strand synthesis question no single Gateway can answer without re-explaining its
siblings, which the Gateway standard already forbids (§9 anti-patterns: "Re-explain what the other
two strands are on a gateway — that stays the Grade Hub's job").

### 9.3 Skills

The current Hub links to Skills only through dead empty-state code. This research recommends **not**
adding a permanent Hub→Skills link as part of this standard. Reasoning: `CONSTITUTION.md` §4 states
Skills is a parallel, skill-first way to reach the same content, "sitting alongside (not beneath)
the Grade Hubs," and the Gateway standard's own anti-pattern list explicitly forbids HFW/Themed
gateways linking directly to Skills ("Skill pages are Core's counterpart in the site's layer
model"). Extending a Skills link to the Grade Hub layer would be inventing a new cross-layer
relationship this research has no positive evidence for and the existing rules actively discourage
one layer down. If a future product decision wants Grade Hub ↔ Skills Hub linkage, it should be
argued and decided as a Skills-layer standard question, not smuggled into a Grade Hub content
standard as a byproduct.

---

## 10. K–5 maturation conclusion

The task's grade-by-grade hypotheses were checked against `docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`,
the frozen educational-research source (itself cross-verified against Common Core, state standards,
and structured-literacy programs). They hold up well, with corrections:

- **Kindergarten:** confirmed — "establishing the alphabetic principle," short-vowel CVC spelling,
  early HFW ownership. The curriculum doc's own three broad units (Sounds/Letters/Early Encoding →
  Short Vowels and CVC → High-Frequency Words) map onto the Hub's existing "simple, encouraging,
  concrete" framing correctly.
- **Grade 1:** the task's "consolidation/expansion... introduction of broader patterns/endings" is
  correct but slightly underspecifies; the curriculum doc names five broad units (digraphs/blends,
  inflectional endings, silent-e/long vowels, vowel teams, syllables) — the Hub's existing "learning
  how words work, not memorizing" framing is apt and should be kept.
- **Grade 2:** confirmed almost verbatim — the curriculum doc's own framing ("Grade 2 is where the
  curriculum typically consolidates the full basic phonics code and begins systematic multisyllabic
  spelling") is close enough to the existing Hub prose ("the year spelling stops being one syllable
  at a time") that no correction is needed.
- **Grade 3:** confirmed — "the clearest transition point from phonics-heavy spelling into formal
  morphology and conventions" per the curriculum doc, matching the existing Hub's "bridge from
  phonics into morphology" almost exactly.
- **Grade 4 — now fully validated (refinement pass):** the curriculum doc's complete Grade 4 section
  states standards "stop listing many small phonics topics separately and instead expect integrated
  use of sound-spelling correspondences, syllabication, and morphology," with four broad canonical
  units (Greek and Latin Roots; Advanced Multisyllabic Words; Final Stable Syllables and
  High-Frequency Word Endings; Derived Words and Word Meaning) explicitly framed as continuing and
  expanding the morphology work Grade 3 introduces, not starting a new strand. This confirms the
  existing Hub framing, "the expansion year after introductory morphology," precisely — Grade 4 is
  not a new phase but the deepening of the phase Grade 3 opens, exactly as that phrase claims. No
  correction needed.
- **Grade 5 — now fully validated (refinement pass):** the curriculum doc's complete Grade 5 section
  states the work "becomes even more integrated" and is "better thought of as advanced integrated
  word study than as a return to many new isolated phonics units," with a deliberately smaller
  three-unit set (Advanced Roots, Affixes, and Academic Words; Spelling Changes in Related Words;
  Meaning-Based and Conventional Spelling) because Grade 5 is "less about many brand-new elementary
  concepts and more about advanced integration of what has already been built." This confirms the
  existing Hub framing, "the capstone of elementary spelling… bringing every earlier skill together,"
  precisely — "capstone" and "integration of what has already been built" are the same claim in
  different words. No correction needed.
- **Net result:** all six grades' existing hero-paragraph framing is now validated against the full,
  authoritative curriculum document at full confidence, not sampled or partial confidence. No
  maturation hypothesis from the original task required correction; the only refinement was
  completing verification of the two grades left unread in the prior research pass.

How much cross-grade comparison belongs on each Hub: **very little, one sentence at most, optional.**
The Gateway standard's own precedent for the analogous question (Core Gateway noting continuity with
the adjacent grade) caps it at "one sentence, only if it adds real value beyond the breadcrumb —
never a full K–5 map (that's a site-wide feature, not this page's job)." The same cap applies one
layer up, for the same reason: a full progression map is legitimately nobody's job today, and
inventing it as Hub content would be scope creep.

---

## 11. SEO and search-intent findings

**Evidence, not inference, is separated explicitly below.**

**Evidence:** Google's own general hierarchy guidance is "make a site with a clear hierarchy and
text links; every page should be reachable from at least one static text link," with a pillar-page/
topic-cluster model as the standard mental model for organizing a hierarchy (source:
[Siege Media, summarizing Google Search Central guidance](https://www.siegemedia.com/seo/internal-linking-structure)).
This is general SEO guidance, not spelling-specific, and does not itself rank pages or prescribe
Hub-vs-Gateway content depth — it only supports the general shape (clear hierarchy, reachability via
static links), which the proposed Hub→Gateway→Member structure already satisfies.

**Evidence:** a light search-intent check on "3rd grade spelling words" — a representative broad
grade query — shows mixed but predominantly **list-seeking** intent (parents/teachers wanting an
actual word list they can use immediately), with a secondary, smaller cluster of curriculum-
structure-seeking intent (source: search result survey, see citation list at end of document). This
is evidence for one specific design decision: **the Hub's strand summaries should state real counts
and a real starting point immediately**, not bury them under abstract framing, because a meaningful
fraction of the Hub's actual traffic is impatient, list-seeking traffic that wants to confirm "yes,
this is the right page" within a few seconds before either continuing to a gateway/member page or
leaving.

**Inference (not evidence-backed, explicitly labeled):** this research does **not** claim the Hub
"ranks better" or "worse" for any specific query by removing direct member cards — no ranking data
was available or sought, and the task explicitly forbids such claims without evidence. The
defensible claim is narrower and structural: the broad query family ("[grade] spelling words," "
[grade] spelling curriculum") is a plausible match for the Hub's orientation-and-routing role, while
narrower queries ("[grade] core spelling sequence," "[grade] high frequency words list," "[grade]
[specific pattern] words") are better matches for the Gateway and Member layers respectively — this
is intent-shape reasoning, consistent with the Gateway standard's own stated intent-ownership claims
for its three strands, not a ranking prediction.

---

## 12. GEO/AEO findings

Per the task's explicit instruction to be skeptical and reject gimmicks absent evidence, this
research finds **no case for any Grade-Hub-specific AI-optimization tactic** beyond what plain,
well-structured, accurate content already provides. Specifically rejected, consistent with the
Gateway standard's own §9 precedent (which already rejects the same list one layer down):

- AI keyword blocks — no evidence found supporting this as distinct from normal on-page clarity.
- Arbitrary FAQs — the Hub has no genuine, non-generic FAQ content today, and manufacturing some
  would violate the same no-floor/no-ceiling FAQ rule already frozen at the Gateway and member
  layers (`CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` §6: "FAQs added to hit a count target… ").
- Hidden answer summaries, "AI-optimized" prose variants, schema created solely for LLMs, or
  llms.txt-dependent content decisions — none supported by any source consulted in this research.

**What genuinely helps an answer system** (and a human skimmer equally, which is the actual test):
explicitly stating what the grade covers, naming the three strands and what each does, stating an
explicit starting point, and using verified, exact counts rather than vague language ("several
sets" vs. "5 sets · 60 words"). This is not a GEO-specific recommendation — it is the same content
standard already being proposed on ordinary UX/clarity grounds in §7–§8, which happens to also serve
answer-engine extractability as a byproduct, not as a separately engineered feature.

---

## 13. Internal-link architecture

Evaluated against the task's own candidate list and the existing frozen precedent one layer down
(the Gateway standard's §5 and §7):

| Link | Required? | Rationale |
|---|---|---|
| Home/Grades browse → Grade Hub | **Required, already true and mechanical** | Unaffected by this research |
| Grade Hub → all 3 strand Gateways | **Required, already true and mechanical** (`getGradeHubGatewayLinks`) | Becomes the Hub's single most important structural job once member cards are removed |
| Grade Hub → individual member pages | **Prohibited** | See §6 |
| Grade Hub ↔ adjacent Grade Hubs | **Required, already true and mechanical** | Legitimately Hub-owned per §5.4; no change |
| Grade Hub → Skills | **Not required; do not add** | See §9.3 |
| Each strand section → its same-grade Gateway | **Required: a clear, crawlable route, mechanically generated from the existing route source of truth** | The relationship (strand section → owning Gateway) is required and structural; the number and visible form of links expressing it is a presentation decision, not part of this content standard — see §7's corrected cardinality language |
| Multiple visible links to the same Gateway from one strand section | **Not inherently prohibited** | Permitted when a future design has a legitimate UX reason (e.g. a heading link plus a separate CTA); unnecessary duplication with no distinct purpose should still be avoided, but this is ordinary content economy, not an architectural prohibition |

**Cross-grade gateway links** (e.g., Kindergarten Core Gateway → 1st Grade Core Gateway) remain
explicitly out of scope for the Hub layer too, for the same reason the Gateway standard already
forbids them one layer down (§9 there: "duplicate the real transition already encoded at the
member-page boundary"). The Hub's adjacent-grade nav is a different, coarser relationship (Hub-to-
Hub) and should not be confused with or used to justify a Gateway-to-Gateway or Member-to-Member
cross-grade link that doesn't already exist in `CANONICAL_NAVIGATION_RELATIONSHIPS.md`.

---

## 14. Content-depth standard

Per the task's explicit instruction, this is a **semantic depth** standard, not a word-count target.

| Component | Status |
|---|---|
| Breadcrumb (Home → Grade) | **Required** |
| H1 (`"{grade} Spelling Words"`) | **Required** |
| Grade-level orientation (what changes, what's emphasized, relation to prior grade, what's ahead) | **Required** — one to a few sentences, functional depth per grade, not fixed length |
| Core Spelling strand summary + a route to the Core Gateway | **Required** — route form (link/CTA/card) not prescribed |
| HFW strand summary + a route to the HFW Gateway | **Required** — route form not prescribed |
| Themed strand summary + a route to the Themed Gateway | **Required** — route form not prescribed |
| "How these three work together / where to begin" synthesis | **Required** |
| Adjacent-grade navigation | **Required** |
| Individual member-page cards, any strand | **Prohibited** |
| Full Core progression narrative (unit-by-unit reasoning) | **Prohibited at Hub** — Gateway-owned |
| Full HFW cumulative-inventory framing beyond a bare count-and-purpose line | **Prohibited at Hub** — Gateway-owned |
| Individual theme descriptions or selection guidance beyond "optional, explore if useful" | **Prohibited at Hub** — Gateway-owned |
| FAQ section | **Prohibited by default**, same standard as Gateway layer (§12) |
| Audience-segmented ("For Parents"/"For Teachers"/"For Students") sub-sections | **Prohibited** — see §19 |
| Skills link | **Prohibited** — see §9.3 |
| Cross-grade K–5 progression map | **Prohibited** — explicitly deferred site-wide feature, not this page's job |
| Exact counts (unit/set/theme totals, word totals) stated inline in prose | **Optional, recommended** — see §17 |
| Source attribution | **Not applicable at Hub** — this is a member-page-only concern (`canonicalSource.publicAttribution`) |

---

## 15. Future visual-redesign compatibility

**Current content decisions accidentally coupled to today's card layout, to be corrected during
implementation:**

- Section headings currently function as both a semantic strand label *and* the sole markup
  mechanism carrying the link to the Gateway (a `<h2><a href=…>` pattern). That specific
  implementation choice — one heading, one link, no separate CTA — is itself a presentation
  decision this standard should not freeze, and the prior research pass incorrectly elevated it into
  an "exactly one link" architectural requirement; corrected in §7 and §13. Once cards are removed,
  the standard's actual requirement is only that each strand section provide a clear, crawlable
  route to its Gateway; whether a future redesign expresses that as a linked heading, a separate CTA
  button, a card, or multiple accessible treatments is a design-system decision, not a content
  requirement.
- The "How to choose a list" guidance box's name and content currently assume a literal set of
  visible list cards to choose among ("choose *a list*"). Retitling it (§4) to something like "how
  these three work together" removes this coupling and makes the content survive a future redesign
  that might not render "lists" as discrete visual objects at all.
- Per-strand summary strings ("4 sets · 40 words") are already written as countable facts, not
  layout-dependent language — this pattern should be preserved and extended, not changed, since it
  already satisfies the presentation-independence bar the Gateway standard sets for itself (§8).

**No other coupling was found.** The proposed standard (breadcrumb, H1, orientation prose, three
strand summaries each ending in one link, a synthesis section, adjacent-grade nav) is expressible as
plain text and survives any future layout — cards, a roadmap timeline, tabs, an accordion, or
something not yet designed — without a copy rewrite, matching the Gateway standard's own §8
requirement one layer up.

---

## 16. Structured-data findings

**Current state (repository fact, §3):** `BreadcrumbList` + `ItemList` (every member card as a
`ListItem`) — no `CollectionPage`/`WebPage` type, no `FAQPage`.

**Recommendation:** keep `BreadcrumbList` unchanged. For `ItemList`, the direct answer to the task's
explicit open question:

**Yes — a post-redesign Grade Hub `ItemList` should contain exactly the three strand gateways, not
the individual member pages, once direct member cards are removed.** Reasoning:

1. `ItemList` schema's purpose is to mark up "a list of related items" a page genuinely presents as
   its primary content. Once the Hub's primary content *is* three strand summaries-with-links, the
   accurate, non-misleading `ItemList` is exactly those three items — continuing to emit a 105-item
   (or per-grade 11–25-item) `ItemList` for links that no longer visibly exist on the page would be
   schema describing content the page doesn't actually show, which is the kind of structured-data/
   visible-content mismatch the Grade Unit standard explicitly prohibits one layer down
   (`CANONICAL_GRADE_UNIT_PAGE_STANDARD.md` §7: "structured data… must reflect visible page content
   exactly").
2. This is not adding schema merely because a type exists (a practice this research was explicitly
   told to avoid) — it is *narrowing* existing schema to match the page's actual, redesigned content,
   which is the minimal-correct-change, not a new feature.
3. Completeness/crawlability is not lost: the Gateway pages already carry their own complete,
   correct `ItemList` for every member page in that strand (confirmed in §3's gateway-sample
   findings), and the Hub's sitemap presence plus its three gateway links already give a crawler a
   direct, shallow path to that completeness one hop away. Nothing about narrowing the Hub's
   `ItemList` reduces overall site crawlability — it relocates the authoritative list-markup to the
   layer that already, unconditionally, owns list completeness (§1 of the Gateway standard).
4. No `FAQPage` schema — same reasoning as the Gateway layer: no genuine, non-generic FAQ content
   exists or is recommended for the Hub (§12).
5. `CollectionPage`/`WebPage` type: no evidence found that adding one improves anything the current
   `Layout.astro`-driven `<title>`/meta-description/OG-tag/`BreadcrumbList` combination doesn't
   already provide; not recommended, consistent with the Gateway layer not using it either.

---

## 17. Counts

Which counts genuinely help users, and at what depth:

| Count | Belongs at Hub? | Depth |
|---|---|---|
| Core unit count (e.g. "7 units") | Yes | Bare number, inline in the strand summary sentence — no separate stat/badge UI element, matching the existing, verified site-wide pattern that counts appear only inline in authored prose (confirmed at both Hub and Gateway layers today) |
| HFW set count + word count (e.g. "5 sets · 60 words") | Yes | Same — the existing summary-string pattern already does this correctly and should be kept |
| Themed theme count (e.g. "4 optional lists") | Yes | Same |
| Full HFW cumulative build-up narrative (which set introduces what) | No | Gateway-owned |
| Per-unit or per-set word counts | No | Member-page-owned |

**Sourcing:** counts should be **derived programmatically**, not hand-authored, for the same reason
the site already moved Core's Review-First/Next-Step relationships from hand-authored frontmatter to
a single derived array (`CORE_SPELLING_SEQUENCE`) after the original stale-reference bug that
prompted `CANONICAL_NAVIGATION_RELATIONSHIPS.md`'s entire review. `gradeHubCards.ts` and
`canonicalGradeRoutes.ts`'s `CANONICAL_GRADE_ROUTE_DEFS` are the existing sources of truth; a future
implementation should compute counts from those (or from the same source the Gateway pages already
use for their own synthesis prose, `gradeStrandGatewayCopy.ts`, to guarantee the two layers never
silently disagree on a number) rather than hand-typing a count into `gradeHubCopy.ts` a second time.

---

## 18. Audience

No audience-segmented sub-sections ("For Parents"/"For Teachers"/"For Students") are recommended.
No compelling reason was found during this research to depart from the existing site-wide pattern
(no such sections exist anywhere in the current Hub, Gateway, or member-page standards), and
`CONSTITUTION.md` §2 already frames the product as "useful to parents and teachers" through one
unified, plain-language experience, not through audience-forked content. Universal, task-oriented
language — "start with Core Spelling," "these five sets build on each other," "these lists are
optional" — already serves a parent deciding what to click, a teacher confirming curriculum fit, and
an older student reading independently, without any of the three needing a dedicated section.

---

## 19. Tone

The existing Hub hero prose (§3's excerpt table) is already close to the right register: warm
without being saccharine, precise without being jargon-heavy ("the year spelling stops being one
syllable at a time" is a genuinely good sentence — concrete, accurate, and warm without a single
adjective doing the work). The main correction needed is not a tone rewrite but a **scope**
correction: removing the parts of the current guidance box that drift into Gateway-level
progression narrative ("work through the seven steps in order — Prefixes and Suffixes come first…")
and keeping only the Hub-appropriate register (grade-wide framing, a start-here nudge, a synthesis
sentence about the three strands). Warmth in this architecture should come from useful orientation
and clear guidance — exactly the pattern the existing prose already demonstrates — not from added
motivational language, reassurance filler, or marketing copy, none of which the current prose
exhibits and none of which this research recommends introducing.

---

## 20. Third Grade case study

### 20.1 Current state (repository fact)

`/3rd-grade` today: grade overview (2 hero paragraphs) + 7 Core member cards + 5 HFW member cards +
4 Themed member cards + a "How to choose a list" guidance box that narrates the in-order Core
sequence ("Prefixes and Suffixes come first… Root Word Families closes the sequence and previews the
Greek and Latin root study that begins in Grade 4") + adjacent-grade nav + `BreadcrumbList`/
`ItemList` JSON-LD covering all 16 member cards.

### 20.2 Proposed semantic wireframe (non-final, illustrative only)

> **Breadcrumb:** Home → 3rd Grade
>
> **H1:** 3rd Grade Spelling Words
>
> **Grade-level orientation** (1–2 short paragraphs): what changes in 3rd grade spelling (the shift
> from phonics-heavy patterns into prefixes, suffixes, and early morphology), what it builds toward,
> one sentence of continuity with 2nd grade if genuinely useful. *Content source: adapt/trim the
> existing hero paragraphs; do not invent new claims.*
>
> **Core Spelling** (strand summary): states Core is the main path, states "7 ordered units," states
> the topic arc in one sentence at most (prefixes/suffixes → morphology → homophones), a route to
> `/3rd-grade/core-spelling` (illustrated here as one link; the actual form is a future design
> decision — see §7). *Does not* name all 7 units or narrate why each follows the last — that
> full narrative already exists, authored, at the Core Gateway.
>
> **High-Frequency Words** (strand summary): "5 sets · 60 words," one sentence on purpose (practiced
> alongside Core), a route to `/3rd-grade/high-frequency-words`. *Does not* list the 5 sets.
>
> **Themed Spelling Practice** (strand summary): "4 optional lists," one sentence (optional,
> explore based on classroom relevance), a route to `/3rd-grade/themed-spelling-practice`. *Does
> not* name the 4 themes or explain each one — that's the Themed Gateway's job.
>
> **How these three work together / where to begin:** one short paragraph — start with Core Spelling
> in order; use High-Frequency Words alongside it; explore Themed Spelling Practice whenever it's
> useful, in any order.
>
> **Adjacent grades:** ← 2nd Grade · 4th Grade →
>
> **Footer**

### 20.3 What disappears, and where it now lives

| Disappears from Hub | Now lives at |
|---|---|
| 7 individual Core unit cards | `/3rd-grade/core-spelling` (already authored, complete, frozen) |
| 5 individual HFW set cards | `/3rd-grade/high-frequency-words` (already authored, complete, frozen) |
| 4 individual Themed cards | `/3rd-grade/themed-spelling-practice` (already authored, complete, frozen) |
| "Start with Prefixes and Suffixes... Root Word Families closes the sequence..." full progression narrative | `/3rd-grade/core-spelling`'s own required synthesis content (already authored, matches this almost verbatim per the gateway-sample findings in §3) |
| Full `ItemList` of 16 members | Narrowed to 3 items (the strand gateways) — see §16 |

Nothing is lost — every piece of removed Hub content already exists, in equal or greater depth,
one click away at its properly-owning layer.

---

## 21. Pilot recommendation

**Kindergarten vs. 3rd Grade, compared directly:**

| Factor | Kindergarten | 3rd Grade |
|---|---|---|
| Historical pilot precedent | Yes — was the Gateway layer's own pilot grade | No |
| Demonstrates the flattened-directory problem | Weakly — only 17 cards, the smallest of any grade | Strongly — 16 cards is mid-range, but 3rd Grade's guidance box is the most narrative-heavy example of Gateway content leaking into the Hub (the full in-order unit walkthrough quoted in §20.1) |
| Card count / complexity as a stress test | Low (17 total, smallest HFW section at 4 sets) | Moderate (16 total, but spans all three strand types at meaningfully different scales: 7/5/4) |
| Existing gateway-copy quality to build from | Strong (reference implementation for the Gateway standard) | Strong (also directly sampled and quoted in this research, §3) |
| Represents a "typical" middle grade, not an edge case (K has unique early-literacy framing; 5th is a capstone) | No — K's "first words," digraph-preview, and heaviest Heart-Word framing are genuinely atypical of the other five grades | Yes — 3rd Grade sits at the curriculum's own stated "clearest transition point" (§10), representative of the mid-K–5 pattern other grades will need to replicate |

**Recommendation: 3rd Grade**, matching the task author's stated preference, on the evidence, not by
default deference to that preference. The decisive factor is representativeness: Kindergarten's
gateway pilot value was earned by being the *simplest* grade to validate a new content model against
before scaling complexity; the Grade Hub problem is different in kind — it's not about validating a
new content shape from zero, it's about validating a *removal and re-routing* against a page that is
currently doing the most Gateway-duplicating work, in the most legible way (§20.1's quoted guidance
box is the clearest single piece of evidence in the entire six-hub audit that the current model has
drifted). 3rd Grade is also, per the curriculum research (§10), the grade the site's own educational
sourcing already identifies as the pivot point of K–5 spelling instruction — a reasonable
proxy for "typical," rather than either K–5 boundary's edge-case framing. Piloting there produces a
result more likely to generalize cleanly to Grades 1, 2, 4, and 5 than a Kindergarten pilot would.

---

## 22. Proposed canonical Grade Hub standard (implementation-ready summary)

**Page purpose:** orient a reader to one grade's spelling practice as a whole and route them into
exactly three strand destinations.

**Governing reader question:** "What does spelling look like in this grade, what are the three ways
to practice it, and where should I go?"

**Responsibilities:** grade-level orientation (what changes, what's emphasized, brief continuity
with the prior grade); naming and briefly explaining the three strands; a synthesis of how the three
strands relate and where to begin; routing to all three Grade-Strand Gateways; adjacent-grade
navigation.

**Non-responsibilities:** strand-wide synthesis of any kind (progression narrative, cumulative
inventory framing, theme purpose/selection) — Gateway-owned; individual member-page listing or
linking — Gateway-owned; pattern/concept teaching — Skill/Member-owned; full K–5 cross-grade mapping
— not owned by any current page; audience-segmented guidance; FAQ content by default; Skills
linkage.

**Required components:** breadcrumb (Home → Grade); H1; grade-level orientation prose; three strand
summaries, each with a count-and-purpose statement and a clear, crawlable, mechanically-generated
route to that strand's Gateway (link count and visible form not prescribed — see §7, §13); a "how
these three work together / where to begin" synthesis; adjacent-grade navigation; standard
metadata (title/description/OG); `BreadcrumbList` + narrowed `ItemList` (three strand items) JSON-LD.

**Optional components:** a one-sentence continuity note with the prior grade (only if it adds real
value beyond the breadcrumb); a "back to all grades" link.

**Prohibited/anti-pattern components:** individual member-page cards of any kind, any strand;
full progression/inventory/theme-selection narrative; FAQ sections absent genuine content; audience-
segmented sub-sections; Skills links; cross-grade Gateway or Member links; a full K–5 progression
map; visible scores, mastery claims, or gamification language (inherited, unconditionally, from the
site-wide `CONSTITUTION.md` §13 rejection of these).

**Relationship to Home/Grades browse:** the Hub is Home's one-hop destination for the "Learn by
Grade" journey (`CONSTITUTION.md` §3.2); Home does not need deep links past the Hub.

**Relationship to strand gateways:** the Hub's primary output is a route into each of the three
Gateways, one relationship per strand, with destinations generated (not hand-authored) the same way
the Gateway layer already generates its own cross-strand links, to prevent the same class of drift
`CANONICAL_NAVIGATION_RELATIONSHIPS.md` documents happening when relationship data is hand-authored
per page. The number and visible form of links expressing each relationship is left to the future
design system — see §7, §13, §15.

**Relationship to `CONSTITUTION.md`:** this standard's Gateway-routing responsibility depends on the
Grade-Strand Gateway layer being constitutionally sound. Per §5.2, that dependency currently rests
on this research's own value-test analysis, not on an explicit Constitution amendment — the
three-point amendment specified in §5.2 is a **required companion task**, to be completed before or
alongside freezing this standard into `CANONICAL_GRADE_HUB_STANDARD.md`, not an optional follow-up.

**Relationship to member pages:** none, directly. All member-page access flows through the owning
Gateway.

**Internal-link rules:** see §13.

**Grade-level maturation:** see §10; existing hero-paragraph voice differences across the six grades
should be preserved and extended, not replaced with a shared template.

**Editorial tone:** warm through useful orientation and clear guidance, not through added
reassurance or marketing language; see §19.

**Count handling:** bare, programmatically-derived counts inline in strand-summary prose; no
separate stat/badge UI elements; see §17.

**Structured-data recommendations:** `BreadcrumbList` unchanged; `ItemList` narrowed to the three
strand gateways; no `FAQPage`; no `CollectionPage`/`WebPage` type addition; see §16.

**SEO intent:** the Hub should own broad "[grade] spelling words/curriculum" discovery and
orientation intent, deferring narrower strand- and pattern-specific intent to the Gateway and Member
layers respectively; see §11.

**GEO/AEO implications:** none beyond ordinary content clarity; no AI-specific tactics recommended;
see §12.

**Presentation independence:** fully presentation-independent as specified; see §15 for the two
existing coupling points to correct during implementation.

---

## 23. Questions that must be answered explicitly

1. **What is the canonical purpose of a Grade Hub?** To orient a reader to one grade's spelling
   practice as a whole and route them into exactly three strand destinations (§22).
2. **What reader question does it own?** "What does spelling look like in this grade, what are the
   three ways to practice it, and where should I go?" (§22).
3. **How is it different from a Grade-Strand Gateway?** The Hub is grade-wide and strand-summarizing;
   the Gateway is strand-specific and member-list-complete. The Hub never carries a progression
   narrative, cumulative inventory framing, or theme-selection guidance — that's exactly and
   exclusively the Gateway's job (§5.1, §7).
4. **How is it different from a member page?** The Hub never teaches or provides practice for a
   specific unit/set/theme; it never appears in the Review-First/Next-Step/Explore-More chain
   member pages use (§5.4).
5. **Should Grade Hubs continue listing individual member pages?** No — see the dedicated
   conclusion in §6.
6. **Should each Hub have exactly three primary strand destinations?** Yes — Core, HFW, Themed, each
   providing a clear, crawlable, mechanically-generated route into its Gateway; the number and
   visible form of links expressing each route is a future design-system decision, not part of this
   content standard (§7).
7. **Should Core Spelling be presented as the main/default path?** Yes, with a one-sentence "why"
   and a pointer to the Core Gateway's own "where to begin" fact, not a duplicated version of it
   (§9.1).
8. **How should HFW relate to Core at Hub level?** Practiced alongside Core, not mechanically
   aligned unit-for-unit and not framed as a prerequisite or sequel to Core (§9.2).
9. **How should Themed practice relate to Core/HFW?** Optional, non-sequential, explored based on
   interest or usefulness — never implied as required or ordered (§9.2).
10. **What grade-level orientation belongs above the strand destinations?** What changes at this
    grade, what's broadly emphasized, brief continuity with the prior grade, what's ahead — without
    duplicating the Core Gateway's specific unit sequence (§8).
11. **Should exact unit/set/list/word counts appear?** Yes, as bare, programmatically-derived
    numbers inline in prose — never as a separate stat/badge element, never hand-typed a second time
    against a source of truth that could drift (§17).
12. **What "where to start" guidance belongs at Hub level?** A one-sentence recommendation to begin
    with Core, deferring the specific first-unit name to the Core Gateway's own required pointer
    (§9.1).
13. **Should Grade Hubs link to Skills?** No — not part of this standard; see the dedicated
    reasoning in §9.3.
14. **Should Grade Hubs link to adjacent grades?** Yes — already correctly implemented and
    unaffected by this research (§5.4, §13).
15. **What structured data should a Grade Hub use?** `BreadcrumbList` unchanged; `ItemList` narrowed
    to exactly the three strand gateways; no `FAQPage`; no new schema type (§16).
16. **What broad search intent should the Hub own?** Broad "[grade] spelling words/curriculum"
    orientation and discovery intent, distinct from the Gateway's narrower per-strand intent and the
    Member layer's narrowest per-pattern/per-set intent (§11).
17. **How should Hub copy mature K–5?** Each grade keeps its own distinct voice (already
    demonstrated in the existing hero prose, §3, §10) rather than a shared template with only numbers
    swapped — the same anti-pattern the Gateway standard already rejects for its own layer (§9 of
    that standard), applied consistently one layer up.
18. **How much content is enough?** See the required/optional/prohibited table in §14 — semantic
    completeness, not a word-count target.
19. **What content would constitute duplication or SEO padding?** Any strand-wide synthesis,
    progression narrative, or member listing already owned by a Gateway; any FAQ added without
    genuine content; any AI-specific formatting gimmick without evidence of benefit (§6, §12, §14).
20. **Which grade should be the implementation pilot?** 3rd Grade — see the dedicated comparison and
    reasoning in §21.
21. **Is the proposed standard sufficiently presentation-independent for the future visual
    overhaul?** Yes, including after this refinement pass corrected one coupling error in the prior
    research draft itself (an "exactly one link" cardinality requirement, now replaced with a route
    requirement independent of link count/form) plus the two content-coupling points already
    identified and to be corrected during implementation (the "How to choose a list" heading's
    literal-list assumption, and today's specific heading-as-sole-link markup pattern not being
    treated as required going forward) — see §7, §13, §15.

---

## Sources

- [Siege Media — Internal Linking Structure: Importance + Best Practices](https://www.siegemedia.com/seo/internal-linking-structure) (summarizing Google Search Central general hierarchy/internal-linking guidance)
- [Reading Rockets — How Spelling Supports Reading](https://www.readingrockets.org/topics/early-literacy-development/articles/how-spelling-supports-reading)
- [Reading Rockets — Spelling: Instructional Guidelines](https://www.readingrockets.org/topics/spelling-and-word-study/articles/spelling-instructional-guidelines)
- [Reading Rockets — Goals for First Grade: Early Reading and Writing](https://www.readingrockets.org/topics/early-literacy-development/articles/goals-first-grade-early-reading-and-writing)
- Search-intent survey for "3rd grade spelling words" (general web search, August 2026) — used only
  to characterize broad list-seeking vs. curriculum-structure-seeking intent mix, not as a ranking
  or traffic claim.
- Repository sources (primary, authoritative for all repository-fact claims in this document):
  `docs/content/CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md`,
  `docs/content/CANONICAL_GRADE_STRAND_GATEWAY_STANDARD_RESEARCH.md`,
  `docs/content/CANONICAL_GRADE_UNIT_PAGE_STANDARD.md`,
  `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`,
  `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md`,
  `docs/planning/CANONICAL_NAVIGATION_RELATIONSHIPS.md`,
  `docs/architecture/CONSTITUTION.md`,
  `docs/architecture/PUBLIC_URL_ARCHITECTURE.md`,
  `docs/curriculum/CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`,
  `src/pages/[gradeSlug].astro`, `src/pages/[gradeSlug]/[strand].astro`,
  `src/lib/content/gradeConfig.ts`, `src/lib/content/gradeHubCopy.ts`,
  `src/lib/content/gradeHubCards.ts`, `src/lib/content/canonicalGradeRoutes.ts`,
  `src/lib/content/gradeStrandGatewayCopy.ts`, `src/lib/content/coreSpellingSequence.ts`,
  and their associated test files (`gradeHubCards.test.ts`, `gradeHubCopy.test.ts`,
  `gradeHubGatewayLinks.test.ts`, `canonicalGradeRoutes.test.ts`, `gradeStrandGatewayCopy.test.ts`).
