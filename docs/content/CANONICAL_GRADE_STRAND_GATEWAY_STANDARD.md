# Canonical Grade-Level Strand Gateway Standard

**Status:** Frozen production editorial authority
**Scope:** All 18 canonical Grade-Strand Gateway pages — `/{grade}/core-spelling`,
`/{grade}/high-frequency-words`, `/{grade}/themed-spelling-practice` for each of the six grades
K–5.
**Reference implementation:** the three Kindergarten gateways (`/kindergarten/core-spelling`,
`/kindergarten/high-frequency-words`, `/kindergarten/themed-spelling-practice`).

This standard governs semantic content, information hierarchy, instructional responsibilities,
and navigation relationships — not visual presentation. The supporting research, educational
literature review, SEO/GEO/AEO analysis, and the full responsibility-matrix derivation remain in
`CANONICAL_GRADE_STRAND_GATEWAY_STANDARD_RESEARCH.md`. This document distills that research into
production direction; it does not reproduce its reasoning and should not be read as a substitute
for it if a future contributor needs the "why."

This standard does **not** govern Grade Hubs (`/{grade}`), Skill pages, the Skills Hub, the main
browse page, or any of the 105 canonical member pages (51 Core Spelling units, 27 High-Frequency
Words sets, 27 Themed Spelling Practice pages) — all of which remain governed by their own frozen
standards and are not reopened here.

## 1. Page-family purpose

A Grade-Strand Gateway fills the one genuine gap between the Grade Hub (correctly thin,
three-strand-wide) and a member page (correctly narrow, single-unit): it synthesizes how one
strand's member pages relate to each other as a group, and it is the complete, authoritative,
crawlable entry point into every member page in that grade+strand. It is not a lesson, not a
second Grade Hub, and not a thin index of cards with no voice of its own.

The canonical hierarchy is:

> Grade Hub → Grade-Strand Gateway → Member Page

- **Grade Hub** orients a reader to the grade as a whole — that Core, High-Frequency Words, and
  Themed Spelling Practice exist, and briefly what each is. It stays broad and thin by design; it
  never carries a per-strand progression narrative, cumulative inventory framing, or theme
  selection guidance — that is exactly the gateway's job.
- **Grade-Strand Gateway** orients a reader to one complete strand within that grade: what the
  strand contains as a whole, how its members relate to each other, and — for Core specifically —
  where to begin. It never re-explains what the other two strands are (that stays the Grade Hub's
  job) and never teaches or restates the content of any individual member page.
- **Member Page** teaches or provides practice for one particular unit, HFW set, or themed list.
  It never speaks for its siblings as a group and never restates gateway-level synthesis.

**What must not be duplicated across layers:**

| Content | Owned by | Must not also appear on |
|---|---|---|
| "This grade has three strands; here's what each covers" | Grade Hub | Gateway (gateway may assume the reader is either already oriented or needs only a one-sentence refresher, not a re-explanation) |
| Strand-wide synthesis (progression order, cumulative inventory, theme purpose/selection) | Gateway | Grade Hub (too deep for its thin, three-strand-wide mandate); member page (would require every sibling to repeat it, or none to state it) |
| Word lists, word-level notes, practice mechanics | Member page | Gateway (a gateway lists members via `SpellingListCard`; it never inlines a member's instructional content) |
| Complete, authoritative list of every member in one grade+strand | Gateway, unconditionally | The Grade Hub may additionally surface convenience cards for some strands (the existing K–3 HFW pattern) without this becoming the canonical list — the gateway remains the page a reader or crawler should trust as complete for that strand |

## 2. Shared gateway architecture (all 18 pages)

| Component | Authored / renderer-owned | Required / conditional |
|---|---|---|
| Breadcrumb (Home → Grade → Strand) | Renderer-owned | Required |
| H1 (`{grade label} {strand label}`, using the grade's existing public label — see §6) | Renderer-owned | Required |
| Orientation (1–2 sentences answering "what is this page," grounded in the real member/word counts) | **Authored**, or the renderer's fallback sentence where authored copy does not yet exist | Required |
| Synthesis (strand-specific information gain — see §3) | **Authored** | Required where authored copy exists; grades without authored copy render the fallback orientation only, which is an accepted interim state, not a standard violation (see §7) |
| Complete crawlable member list | Renderer-owned (`SpellingListCard` loop over every canonical route in that grade+strand) | Required, unconditionally, regardless of how authored copy is laid out around it |
| Cross-strand wayfinding (same-grade sibling gateway links) | Renderer-owned, generated from `GRADE_STRANDS`/`getGradeStrandPath` | Required on all 18 gateways — see §5 |
| Metadata/SEO (title, meta description, canonical `<link>`, OG tags) | Renderer-owned, description sourced from the orientation text | Required |
| `BreadcrumbList` + `ItemList` JSON-LD | Renderer-owned | Required |
| `FAQPage` JSON-LD | N/A | Not recommended by default; add only alongside genuine, non-generic authored FAQ content |

No visual layout, card style, numbering treatment, or component arrangement is prescribed beyond
what's needed to satisfy the semantic requirements above (see §8).

## 3. Strand-specific responsibilities

### Core Spelling

Governing questions: *What does this grade's Core Spelling sequence teach? How does the sequence
progress? Where should a child begin? What are the units, and in what order?*

Core is sequential. A Core gateway's synthesis must:

- Narrate the real instructional order across the grade's units (e.g., why short vowels precede
  digraphs) — grounded in the actual unit titles and order, never invented.
- State an explicit "where to begin" pointer for a family new to the grade.
- Legitimately own "[grade] spelling curriculum/sequence" search intent; a Core gateway must never
  drift into re-explaining a spelling *pattern* itself (that is a Skill page's job) — it stays
  focused on sequence and organization, not pattern mechanics.
- May optionally note continuity with the adjacent grade's Core sequence in one sentence, only if
  it adds real value beyond the breadcrumb — never a full K–5 map (that's a site-wide feature, not
  this page's job).

### High-Frequency Words

Governing questions: *What are High-Frequency Words at this grade? How many words/sets are
included? How are the words organized? What should a parent/teacher understand about frequency
versus spelling regularity? What sets are available?*

An HFW gateway's synthesis must:

- State the complete numeric inventory for the grade — total sets and total words — as a real
  synthesis fact, not just implied by list length.
- Explain, briefly and once, that high-frequency describes how often a word is encountered or
  used, not that every high-frequency word has an irregular spelling — reusing the
  frequency-versus-irregularity framing already approved in
  `CANONICAL_HIGH_FREQUENCY_WORD_SET_PAGE_STANDARD.md`, not re-deriving it.
- Note that sets build cumulatively across the grade.
- **Never** use deprecated terminology — *sight words*, *Heart Words*, *common words* — in
  authored gateway copy. This prohibition extends the member-page standard's own terminology rule
  to gateway copy; there is no principled reason gateway prose should be allowed language the
  member-page standard removed.

### Themed Spelling Practice

Governing questions: *What is themed spelling practice? What themes are available? How should
someone choose a theme? Is there a required order?*

Themed lists are optional, nonsequential peers. A Themed gateway's synthesis must:

- State plainly that the strand is optional and non-sequential — themes are peers, not a
  required sequence.
- Describe themed practice modestly, as a recognizable, coherent context for additional spelling
  practice. **Do not claim** that semantic/thematic grouping itself improves spelling retention or
  retrieval — no evidence reviewed in the research document establishes that effect for spelling
  specifically. The defensible claim is narrower: a theme is a recognizable, motivating organizing
  frame, not a retrieval mechanism.
- Provide a light, descriptive grouping or ordering of the actual theme titles to help a reader
  choose — organizing what exists, never inventing a new taxonomy.
- Never imply an order or prerequisite relationship between themes.

## 4. Lessons learned from the Kindergarten pilot

These are validated production decisions, not merely a visual preference, and apply to all 18
gateways going forward:

**Category badges.** Gateway member cards do not expose repository category badges (e.g.
"Grade-Level," "Phonics," "High-Frequency Words") — implemented as `showCategoryBadge={false}` on
every `SpellingListCard` rendered by the gateway. The audit found these badges leaked internal
taxonomy splits with no public comparison value (Core's "Grade-Level" vs. "Phonics" split) or
repeated information the page's own title/H1 already supplies (every HFW card repeating
"High-Frequency Words"). The gateway itself already supplies the relevant relationship and
context, so the badge is redundant there specifically — this does not change how badges behave on
any other page (e.g. the Grade Hub keeps its own explicit `badge` prop behavior), and it does not
alter any underlying repository category metadata.

**HFW card summaries.** All 27 HFW member `description` values begin by repeating their own title
verbatim (useful on the member page itself, redundant one line below the same title on a gateway
card). All 27 also carry a `shortAnswer` that states the differentiating spelling content without
that repetition. HFW gateway cards use `shortAnswer` in place of `description`
(`getGatewayCardDescription` in `src/lib/content/gradeStrandGatewayCopy.ts`); Core and Themed
cards continue to use `description`, since their descriptions do not exhibit the same redundancy.
Member-page content and frontmatter are unchanged. Do not introduce brittle title-stripping logic
as an alternative — reuse the existing `shortAnswer` field.

**List semantics.** Core and High-Frequency Words render as an ordered list (`<ol>`) — Core
because it is a genuine sequence, HFW because sets build cumulatively and are presented set-1-first.
Themed Spelling Practice renders as an unordered list (`<ul>`), since its members are nonsequential
peers. Preserve this mapping.

**Cross-strand wayfinding.** See §5 — the responsibility and the full same-grade symmetry are both
frozen; the visual treatment of the wayfinding link is not.

## 5. Cross-strand wayfinding

Every gateway must render a lightweight, same-grade link to its sibling strand gateway(s) —
a short, factual label only (e.g., "this grade's High-Frequency Words"), never a re-explanation of
what the sibling strand is or why it matters. That fuller explanation stays the Grade Hub's job;
duplicating it at the gateway would re-derive content the Hub already owns.

**Every grade-strand gateway links to the other two same-grade strand gateways.** Core links to
its grade's High-Frequency Words and Themed Spelling Practice gateways; High-Frequency Words links
to its grade's Core Spelling and Themed Spelling Practice gateways; Themed Spelling Practice links
to its grade's Core Spelling and High-Frequency Words gateways. This supersedes the asymmetric
Core-hub model from the Kindergarten pilot: reviewing the rendered Kindergarten and Grade 1
gateways showed the asymmetry to be unnecessarily restrictive — a reader on High-Frequency Words
or Themed Spelling Practice benefits from a direct path to the other supplementary strand just as
much as a path back to Core, and nothing about the gateway's role argues for withholding it.

This link's destination and label must be **generated** from the existing canonical route data
(`GRADE_STRANDS` and `getGradeStrandPath` in `src/lib/content/canonicalGradeRoutes.ts`) — computed
as "every strand in `GRADE_STRANDS` other than the current one," never a hand-authored per-gateway
list and never a hardcoded 18-link matrix. This is a structural navigation requirement, independent
of whether a grade+strand has authored orientation/synthesis copy yet — **it must render on all 18
gateways today, including any that still use the generic renderer fallback for their orientation
sentence.** Gating this navigation on the presence of authored editorial copy is an implementation
defect, not a valid interim state; see §7.

## 6. Public grade-label convention

Authored gateway copy must refer to the grade using the site's existing public label convention —
`Kindergarten`, `1st Grade`, `2nd Grade`, `3rd Grade`, `4th Grade`, `5th Grade` — exactly as
already defined in `gradeConfig.ts`'s `label` field and already used to compose every gateway's
H1, title tag, and breadcrumb. Never use an internal code (`K`, `grade-1`) or an invented variant
in visible copy. This is a confirmation of existing behavior, not a change: it does not touch any
`GradeCode` value, route slug, content ID, or canonical path, and it does not implement the
broader cross-site grade-label reconciliation `CANONICAL_THEMED_SPELLING_PRACTICE_PAGE_STANDARD.md`
§10 defers separately.

## 7. Internal-link responsibilities

A gateway is only doing its job if it is properly connected to the rest of the canonical
architecture. This standard requires:

1. **Owning Grade Hub → gateway.** Every Grade Hub links to all three of its strand gateways.
   Already true and mechanical (`getGradeStrandPath` in `src/pages/[gradeSlug].astro`), uniformly
   across all six grades.
2. **Gateway → every owned member page.** Already true and mechanical, via the renderer-owned
   `SpellingListCard` loop.
3. **Gateway → owning Grade Hub** via breadcrumb. Already true and mechanical.
4. **Gateway → sibling-strand gateway(s)**, per §5 — required on all 18 gateways, generated, not
   authored.
5. **Member → gateway** relationship, via breadcrumb (Home → Grade → Strand → Member) on every
   member page, and via an explicit link back to the owning gateway in each member page's
   navigation region (already implemented for HFW/Themed via `nonCoreNavigation.ts`; Core member
   pages must carry the same four-level breadcrumb).
6. **Sitemap inclusion is supplemental, never primary.** Every gateway must remain reachable
   through ordinary server-rendered `<a href>` navigation from its Grade Hub; sitemap inclusion
   exists as a secondary discovery mechanism only, never the sole path to a canonical gateway.

This standard does **not** require homepage links to any individual gateway. The audited hierarchy
— Home → Grade Hub (1 click) → Gateway (2 clicks) → Member (3 clicks) — is the intended and
correct architecture; adding deep homepage links would blur, not clarify, layer responsibility.

## 8. Presentation independence

This standard does not freeze cards, colors, spacing, typography, numbering style, or layout.
Content must remain coherent as plain text and through a future redesign:

- Editorial copy must never reference cards, boxes, columns, colors, or screen position (never
  "see the cards below" — say "the eight Kindergarten Core Spelling units" instead).
- Core's progression synthesis must be written as sequential, ordered prose, not
  visual-timeline-dependent language, so a future redesign can render it as a timeline, a numbered
  list, or something else without a copy rewrite.
- HFW's cumulative-inventory framing must be written as countable facts (set count, word count),
  not assuming any particular chart/badge presentation.
- Themed's selection framing must be written as descriptive grouping of theme names, not assuming
  a particular grid/accordion/filter UI.
- The complete member list's primacy is a functional requirement, not a layout instruction: it
  must remain complete, unabbreviated, and structurally central to the page's purpose regardless
  of visual position, ordering, or size.

## 9. Anti-patterns

Do not:

- Treat all three strands identically — this standard's central thesis is that they are not.
- Ship a fixed opening formula repeated across grades with only numbers swapped in (the pre-pilot
  state this standard corrects).
- Duplicate member-page instructional content (word lists, word notes, practice mechanics) on a
  gateway.
- Re-explain what the other two strands are on a gateway — that stays the Grade Hub's job.
- Add FAQ sections, FAQ quotas, or `FAQPage` schema without genuine, non-generic content behind
  them.
- Use deprecated HFW terminology (sight words, Heart Words, common words) in gateway copy.
- Claim a retrieval, retention, or mastery benefit not supported by evidence (themed grouping,
  percentage-based mastery framing, etc.).
- Add automatic links "for SEO" that fail the reasonable-parent test — including cross-grade
  gateway links (e.g., Kindergarten Core → 1st Grade Core), which duplicate the real transition
  already encoded at the member-page boundary in
  `docs/planning/CANONICAL_NAVIGATION_RELATIONSHIPS.md`.
- Link HFW or Themed gateways directly to individual Skill pages (Skill pages are Core's
  counterpart in the site's layer model).
- Gate structural navigation (§5's cross-strand wayfinding) on the presence of authored editorial
  copy.
- Change any curriculum, member inventory, stable ID, canonical URL, or public strand taxonomy
  while doing gateway editorial work.

## 10. Editorial workflow and acceptance

For every future grade+strand editorial batch (Grades 1–5):

1. Confirm the grade's real member counts, word counts, and unit/set/theme order from
   `canonicalGradeRoutes.ts` and the `spelling-lists` content collection — never invent or round
   a number.
2. Draft the orientation sentence(s) freshly for that grade+strand's real facts; do not adapt the
   generic fallback template into "authored" copy by lightly rewording it.
3. Draft the strand-specific synthesis per §3, grounded in that grade's actual unit titles/set
   structure/theme titles.
4. Verify terminology compliance (§3 HFW prohibition) and no overclaiming (§3 Themed prohibition).
5. Verify presentation independence (§8) — no layout-referencing language.
6. Verify the cross-strand wayfinding links (§5) render correctly and link to both same-grade
   sibling gateways.
7. Verify the complete member list remains unabbreviated and unmodified by the editorial pass.
8. Run the gateway content-shape tests and confirm no regression to the 18-gateway route
   inventory, the per-grade 3-gateway structure, or any frozen member-page standard.

If a frozen identity, route, or inventory appears wrong during this work, stop and escalate it as
a separate curriculum decision — do not repair it inside gateway editorial implementation.
