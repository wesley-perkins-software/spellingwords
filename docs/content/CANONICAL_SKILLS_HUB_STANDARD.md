# Canonical Skills Hub Standard

**Status:** Frozen production editorial and architecture authority. Production conformance is
pending; this standard does not itself authorize renderer, component, schema, or visual changes.
**Source:** Approved conclusions in `docs/content/CANONICAL_SKILLS_HUB_STANDARD_RESEARCH.md`.
That document is supporting rationale, not a duplicate authority — consult it for *why* a
requirement below exists; this standard states only what is required.
**Scope:** Exactly `/skills` (`src/pages/skills/index.astro`), the single canonical Skills Hub.
**Does not govern:** the 41 individual canonical Skill pages, the 6 Grade Hubs, the 18
Grade-Strand Gateways, the 105 Grade Unit pages, visual design, or the underlying frozen Skill
taxonomy (family/skill membership and canonical order are frozen elsewhere and merely reflected
here). Those page families and that taxonomy retain their own authorities.

**Other authorities referenced, not reproduced:** `docs/architecture/CONSTITUTION.md`,
`docs/architecture/SKILLS_ARCHITECTURE.md`, `docs/architecture/CONTENT_MODEL.md`,
`docs/architecture/PUBLIC_URL_ARCHITECTURE.md`, `docs/content/CANONICAL_SKILL_PAGE_STANDARD.md`,
`docs/content/CANONICAL_GRADE_HUB_STANDARD.md`,
`docs/content/CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md`. Where this standard states a
requirement grounded in one of those documents, that document governs the underlying fact; this
standard governs only how `/skills` expresses it.

---

## 1. Purpose and canonical hierarchy

The Skills Hub orients a reader who already recognizes a spelling skill or concept — not a grade
level — and routes them directly to the one canonical page that teaches it. It answers:

> I already know (or can recognize by name) a specific spelling skill my child needs — which page
> teaches it, and where do I click?

The canonical skill-first hierarchy is:

> Home → Skills Hub → canonical Skill page

Unlike the grade-first hierarchy, this hierarchy has no intermediate gateway layer. The Hub links
directly to all 41 canonical Skill pages.

## 2. Frozen architecture

These are requirements, not proposals. Each carries at most one sentence of rationale; see the
research document for the full evaluation.

- `/skills` **MUST** be the single canonical Skills Hub — no other page presents the Skill taxonomy
  as a browsable structure.
- The Hub **MUST** serve the skill-first journey: a reader who recognizes a spelling skill or
  concept and needs the right canonical Skill page, distinct from the grade-first journey.
- The Hub **MUST** function as a canonical directory with light orientation, not an instructional
  article — its families have no genuine cross-member synthesis to carry the way a Grade-Strand
  Gateway's strands do.
- The Hub **MUST** expose all 12 canonical Skill families, in frozen canonical order.
- The Hub **MUST** expose all 41 canonical Skills, in frozen canonical order within each family.
- Every Skill **MUST** be linked directly from `/skills` — no gateway layer.
- No Skill Family Gateway layer **MUST** be introduced; a family-level intermediate page would add
  a click with no proportional synthesis value for most families.
- Skills **MUST** remain grade-independent on the Hub — no family or Skill is owned by one grade.
- The Hub **MUST NOT** imply that its family order is a complete, sequential K–5 curriculum —
  sequence belongs to the grade-first hierarchy.
- The Hub **MUST NOT** launch practice — only a Grade Unit's Practice Set does that.
- Individual canonical Skill pages **REMAIN** the sole instructional authorities for their
  concepts; the Hub never substitutes for them.

## 3. Unique responsibility

**OWNS, and no other page owns:**

- The complete public directory of all 41 canonical Skills, grouped by family, in frozen order.
- The visible grouping of Skills into the 12 canonical families as a browsable structure.
- Brief orientation helping a reader determine where to go.
- One clear route from skill-first browsing to grade-first browsing.

**DOES NOT OWN:**

- Full pattern explanations, rule instruction, or word-list demonstrations.
- Teaching routines, mistakes/exceptions, or diagnostic guidance.
- Per-concept FAQs.
- Grade-by-grade curriculum explanations or any Skill-to-grade ownership claim.
- Practice launchers of any kind.
- Full K–5 progression maps.

This boundary aligns with `CANONICAL_SKILL_PAGE_STANDARD.md` §2's own statement of what a Skill
page owns: everything in the list above belongs exclusively to the Skill page, never to the Hub,
even in summary form.

## 4. Opening and orientation standard

The opening **MUST**:

- Explain, in plain parent-readable language, what browsing by skill means.
- Use terminology broad enough to describe the whole library — the 41 Skills span phonics-based
  sound-spelling patterns, spelling conventions, morphology, multisyllabic strategies, roots, and
  meaning-based distinctions (homophones, commonly confused words). "Spelling skill" or "spelling
  concept" are accurate across the full library; "sound or pattern" is not, since several families
  (Word Building and Endings, Prefixes, Greek and Latin Roots, Homophones and Commonly Confused
  Words) are not sound-based.
- Distinguish skill-first browsing from grade-first browsing.
- Provide one clear route to grade browsing, placed near the opening.

The opening **MUST NOT**:

- Suggest a specific starting family or Skill (e.g. "Start with short vowels") or otherwise imply
  a recommended sequence — sequence-seeking readers belong on the grade-first path, not on a
  Hub-improvised substitute for it.
- Be required to repeat the grade-browsing route a second time at the bottom of the page. One
  clear, working route is sufficient; a second instance is permitted but not required.

This section freezes semantic requirements, not exact prose. No specific wording is frozen.

## 5. Family-section standard

Each of the 12 canonical families **MUST** get:

- A semantic family heading, using the family's frozen canonical title (§7).
- Brief, editorially-authored, family-specific orientation.
- The complete list of that family's member Skills, in frozen order, each linked directly.

**Guiding principle:** family copy exists so a parent can confirm *"this family contains what I'm
looking for"* — and, where the family has more than one member, tell those members apart well
enough to click the right one. Nothing more.

- Family copy **MUST NOT** follow a rigid sentence template, and different families **MAY** carry
  different amounts of copy. A family whose members already self-differentiate by title (e.g.
  Short Vowels) needs little or no differentiation language; a family whose members share a less
  obvious axis (e.g. Consonant Blends' beginning-vs-ending distinction) needs more.
- Single-Skill families (Multisyllabic Words, Greek and Latin Roots) **MUST** get lighter
  treatment — there is nothing to differentiate among, and manufacturing a "which one do you need"
  sentence for a one-member family is prohibited.
- Family copy **MUST NOT** read as though only the family noun changes between families — the
  "Mad-Libs" pattern (e.g. a fixed "Practice X." / "Choose the Y your child needs to practice."
  template applied verbatim across families) is explicitly rejected.
- Family copy **MUST NOT** include: grade ranges or badges, promoted member-count statistics
  (a bare count in ordinary prose is acceptable; a boxed or emphasized stat is not), example word
  inventories, instructional routines, or detailed rule explanations.

## 6. Individual Skill-entry standard

*Amended — see §13a.* Each Skill entry **MUST** use, unmodified where shown:

- The canonical Skill title.
- Where a description is shown, the Skill's existing canonical `description` field from
  `spellingSkills.ts` / the Skill page's own frontmatter, or the narrow Hub-only clarifier
  permitted below — never a rewrite of the canonical field into a third form.

Showing a description on every entry is no longer required (§13a). The Hub's canonical entry
descriptions field is still the shared `description` field: where the Hub does display
descriptive text below a title, it **MUST** reuse that field verbatim rather than fork a new
general-purpose Hub description. The one narrow exception is a **clarifier**: a short (under ~90
characters), hand-authored phrase used only for a Skill whose title and example words together
remain genuinely ambiguous (e.g. distinguishing a spelling-change rule from a same-family sibling
that also produces suffixed words). A clarifier is not a second description field — it is not
written for every entry, does not restate the canonical `description`, and stays too short to
carry instructional content (that remains the Skill page's exclusive territory).

The shared `description` field **MAY** still be tightened where independently warranted (e.g.
trimming a search-snippet audience tag or a repeated generic opener) — such edits improve the one
shared field for both its canonical and Hub-directory uses at once; they do not fork a second
field.

**Desired quality** for each entry description, where shown: accurate; concise and scannable;
differentiates the Skill from its siblings; parent-readable; not redundant with its family's
orientation paragraph; not a substitute for the Skill page's own instructional content.

Skill entries **MUST NOT** add: grade metadata, a practice CTA, a full demonstration word grid, or
a separate Hub-only summary distinct from the canonical `description` and the narrow clarifier
exception above.

A Skill entry **MAY** show a small set of representative example words — 3 by default, 4 only
where the fourth demonstrates a distinct sub-pattern the title itself names — drawn *only* from
that Skill's own canonical word list (never invented, never merely the first N in list order).
This is a curated, editorially-selected subset, not the full demonstration word grid a Skill page
shows (that stays exclusive to the Skill page). See §13a for why this is now permitted.

## 7. Taxonomy and naming

The frozen inventory is 12 canonical families and 41 canonical Skills, in canonical order, per
`docs/architecture/SKILLS_ARCHITECTURE.md` and the `SPELLING_SKILL_FAMILIES` /
`CURATED_SPELLING_SKILL_IDS` structures in `src/lib/content/spellingSkills.ts` — the executable
source of truth, locked by `spellingSkills.test.ts`. This standard does not reproduce the full
family/Skill list; consult those sources directly.

**Naming reconciliation:** the public family label for Family 1 is **"Short Vowels"**, not "Short
Vowels and CVC Words." Both variants originated in the same commit that introduced the taxonomy,
rather than through later drift, so the live, test-locked public label controls.
`SKILLS_ARCHITECTURE.md` has been updated to state "Short Vowels" as the family's title throughout
(§2, §3, §4) to match; its purpose prose may still describe the family's scope using
"short vowels and CVC words" as descriptive language — only the stated family *title* changed.

## 8. Grade relationship

Skills are grade-independent. Accordingly:

- No family-level or Skill-entry grade badge, range, or metadata **MUST** appear on `/skills`.
- The Hub **MUST** provide one clear route to grade browsing for readers who need a sequenced
  path (§4).
- Grade Hubs are **NOT** required to reciprocally link to `/skills` — that relationship is governed
  by `CANONICAL_GRADE_HUB_STANDARD.md` §8, not by this document.

## 9. Structured data

The Hub **MUST** retain:

- A `BreadcrumbList` matching the visible Home → Skills breadcrumb.
- One flat `ItemList` representing the complete canonical Skill directory (all 41 Skills), matching
  the visible content.

The Hub **MUST NOT**:

- Emit nested family `ItemList`s merely to mirror the visible family (H2) grouping — the family
  hierarchy is already fully expressed in visible HTML, and Schema.org's `ItemList` has no
  standard, widely-supported list-of-lists convention.
- Add `FAQPage` by default.
- Add any schema type or property solely for SEO/GEO/AEO/AI-consumption reasons rather than to
  describe visible content.

Structured data **MUST** correspond to visible content at all times.

## 10. SEO/GEO/AEO discipline

The Hub's legitimate SEO/GEO/AEO value comes from: complete canonical coverage of the Skill
taxonomy; explicit semantic organization into families; descriptive headings; useful,
differentiated family framing; clear Skill titles and descriptions; shallow, direct internal
links to every Skill; accurate structured data; and genuinely useful human-readable content.

The Hub **MUST NOT** claim validated query ownership, measured keyword demand, or demonstrated
AI-citation behavior — none of this has been researched or measured for this page. The Hub
**MUST NOT** carry keyword blocks, hidden AI-facing summaries, or crawler-only prose.

## 11. Semantic structure

The Hub **MUST** have:

- One primary page-level heading (H1).
- Clear, subordinate family headings (H2, or another heading level that preserves a correct
  document outline), each programmatically associated with its own family's copy and Skill list,
  in reading order.
- Direct canonical links from each family's list to each of its member Skill pages.

This requirement is stated as document hierarchy and accessibility (general WCAG
heading-structure conventions), not as a visual styling constraint. A future accordion, tab, or
other interactive treatment is compatible with this standard as long as the underlying heading
structure and reading order are preserved. This standard does not prescribe cards, columns, icons,
accordions, tabs, colors, borders, spacing, or any other visual decision.

## 12. Anti-patterns

The following are explicitly rejected on `/skills`:

- Skill Family Gateway pages.
- Giant FAQ sections.
- Full spelling-rule explanations on the Hub.
- Full Skill-page content reproduced on the Hub.
- Grade-by-grade curriculum summaries.
- Grade badges or ranges attached to Skills.
- Full K–5 progression maps.
- Audience-duplicated Parent/Teacher/Student sections.
- Arbitrary marketing-stat blocks or promoted count badges.
- Keyword blocks.
- Hidden AI-facing summaries.
- Excessive instructional prose.
- Direct practice widgets or CTAs.
- New taxonomy levels.
- Sequencing language implying `/skills` is the canonical K–5 learning sequence.
- A new Hub-specific Skill description field, absent a future explicit revision of this standard.

## 13. Future visual redesign

This standard freezes content semantics and responsibilities, not presentation. A future redesign
may change cards, lists, columns, icons, spacing, colors, borders, responsive behavior, or
interaction treatment, provided it preserves:

- Complete 12-family / 41-Skill coverage.
- Canonical family and Skill order.
- Semantic heading hierarchy (§11).
- Direct links to every Skill.
- Family-level orientation (§5).
- Accessibility.
- Every responsibility boundary stated in this standard (§3, §6, §12).

## 13a. Amendment record: 2026-08 visual/editorial redesign

This standard was reopened, as authorized by §13, to implement a Skills Hub visual/editorial
redesign that moves the page away from `rounded-full` pill links (for both family headings and
Skill destinations) toward compact editorial reference tiles. The canonical 12-family / 41-Skill
taxonomy, order, direct linking, and every responsibility boundary in §3 are unchanged.

Two clauses in the original text were broader than the redesign needs and are amended here rather
than silently violated:

- **§6 previously required every Skill entry to display its canonical `description`.** The
  pill-only Hub that shipped before this amendment never actually did this (a known,
  documented gap). Rather than close the gap by forcing a description onto all 41 entries — which
  would make most tiles taller than their content needs, since a title plus a few example words is
  already sufficient for most Skills — §6 now makes per-entry descriptive text optional, reusing
  the canonical `description` field verbatim wherever shown, plus a narrow hand-authored
  "clarifier" exception for the rare Skill that needs a short disambiguating phrase beyond its
  title and examples.
- **§6 previously banned "a duplicate demonstration word set" on every Skill entry**, read broadly
  enough to also forbid a small set of representative example words. §6 now distinguishes that
  banned case (a full demonstration word grid, functionally reproducing the Skill page's practice
  list) from a curated 3-4 word example set drawn from the Skill's own canonical word list —
  informational, non-interactive, and capped, not a substitute for the Skill page's own word-list
  demonstration.

Four purely editorial "chapter" dividers (grouping the 12 families for scanability — e.g.
"Foundational sounds and spelling patterns") were added as a rendering-only convenience: no anchor
ids, no structured-data representation, no heading level between the page H1 and each family's H2,
and no change to canonical family order. They are not a new taxonomy level and nothing in §2, §7,
or §9 changes as a result.

## 14. Implementation checklist

- [ ] Exactly 12 family sections are present.
- [ ] Exactly 41 Skills are present across those families.
- [ ] Canonical family order and canonical Skill order within each family are preserved.
- [ ] Every Skill has a direct link to its canonical Skill page.
- [ ] Opening orientation is present and its terminology covers the full library (not just "sound
      or pattern").
- [ ] A working route to grade browsing is present.
- [ ] No sequencing or "start with X" language appears anywhere on the page.
- [ ] Every family has authored, non-templated orientation copy.
- [ ] Where a Skill entry shows descriptive text, it reuses the canonical `description` field
      verbatim, or is one of the narrow hand-authored clarifiers permitted by §6/§13a — no
      general-purpose Hub-only description field exists.
- [ ] Where a Skill entry shows example words, there are 3 (occasionally 4, only where the fourth
      demonstrates a distinct sub-pattern), every one drawn from that Skill's own canonical word
      list (§6/§13a) — never a full demonstration word grid.
- [ ] No grade metadata (badge, range, or otherwise) is attached to any family or Skill on the Hub.
- [ ] No direct practice widget or CTA is present.
- [ ] `BreadcrumbList` structured data is present and matches the visible breadcrumb.
- [ ] A single flat `ItemList` (41 items, no family nesting) is present and matches visible
      content.
- [ ] Page metadata (`<title>`, description) is present and accurate.
- [ ] Heading structure is correct and accessible (§11); any chapter divider is a visual label only
      (no heading level, no anchor id, no structured-data representation) per §13a.
- [ ] No Skill page's instructional content (explanation, examples, mistakes, teaching routine,
      FAQ) is duplicated on the Hub.

---

**Status:** Frozen, as amended by §13a. Production conformance to this standard is pending
implementation.
