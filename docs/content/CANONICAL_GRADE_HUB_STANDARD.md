# Canonical Grade Hub Standard

**Status:** Frozen production editorial and architecture authority. Production conformance is
pending; this standard does not itself authorize renderer, component, schema, or visual changes,
**except** for the narrow, dated representative-preview exception recorded in §6.1, which does
authorize the specific renderer change it describes.
**Source:** Approved conclusions in
`docs/content/CANONICAL_GRADE_HUB_STANDARD_RESEARCH.md`.
**Scope:** Exactly `/grades/kindergarten`, `/grades/1st-grade`, `/grades/2nd-grade`, `/grades/3rd-grade`, `/grades/4th-grade`, and
`/grades/5th-grade`.
**Does not govern:** the 18 Grade-Strand Gateways, the 105 member pages, Skill pages, the Skills
Hub, the main browse page, or visual design. Those page families retain their own authorities.

---

## 1. Purpose and canonical hierarchy

A Grade Hub orients a reader to one grade's spelling curriculum and practice as a whole, then
routes the reader into the three canonical strand destinations. It answers:

> What does spelling look like in this grade, what are the three ways to practice it, and where
> should I go?

The canonical grade-first hierarchy is:

> Home / grade discovery → Grade Hub → Grade-Strand Gateway → Member Page → Practice

Each Hub has exactly three primary strand destinations, in this conceptual order:

1. **Core Spelling**
2. **High-Frequency Words**
3. **Themed Spelling Practice**

The Hub owns grade-wide orientation and cross-strand synthesis. A Gateway owns strand-wide
orientation or synthesis and the complete inventory for one grade and strand. A member page owns
one unit, set, or themed list and its practice path.

## 2. Required semantic content

Every Grade Hub must provide:

- a Home → Grade breadcrumb;
- a grade-level H1;
- grade-wide orientation (§3);
- a concise summary of each of the three strands (§4);
- from each strand section, a clear, crawlable route to its corresponding canonical same-grade
  Grade-Strand Gateway;
- a brief synthesis explaining how the three strands work together and where to begin (§5);
- adjacent-grade Hub navigation;
- standard metadata that accurately describes the visible page; and
- structured data appropriate to the visible content (§9).

Gateway destinations must be generated mechanically from the canonical route source of truth. The
architectural route is required; its visible treatment and link count are not frozen. A linked
heading, text link, CTA, card, or another accessible treatment may express it, and a future design
may provide multiple visible links to the same Gateway for a legitimate UX reason.

## 3. Grade-wide orientation

The opening explains, at depth appropriate to the grade:

- what changes in spelling at this grade;
- the broad spelling knowledge emphasized;
- how it relates to earlier learning when useful; and
- what students are building toward.

It remains grade-wide and must not duplicate the Core Gateway's detailed ordered progression.
Exact curriculum claims must follow the authoritative curriculum documents. The six openings must
preserve genuine maturation and voice rather than becoming mechanically templated:

| Hub | Broad maturation frame |
|---|---|
| Kindergarten | Foundational, alphabetic, and early spelling work |
| 1st Grade | Consolidation and expansion of foundational spelling patterns |
| 2nd Grade | Broader code and transition toward multisyllabic spelling |
| 3rd Grade | Bridge from phonics-heavy spelling into morphology |
| 4th Grade | Expansion and deepening of morphology and integrated spelling knowledge |
| 5th Grade | Capstone integration of prior elementary spelling knowledge |

## 4. Strand responsibilities at Hub level

### Core Spelling

Present Core as the main, systematic, recommended path; briefly explain its role; state its unit
count when useful; and route to the Core Gateway. Tell the reader to begin with Core. Do not list
individual units, reproduce the Gateway's progression narrative, or prescribe a specific first
unit—the Core Gateway owns the specific starting guidance.

### High-Frequency Words

Explain that HFW practice complements and is practiced alongside Core; state the set count and
total word count when useful; and route to the HFW Gateway. Do not list individual sets, reproduce
the Gateway's full frequency-versus-irregularity explanation or cumulative inventory synthesis, or
imply Core and HFW align mechanically unit for unit.

### Themed Spelling Practice

Identify Themed Spelling Practice as optional additional practice; state its list count when useful;
and route to the Themed Gateway. Do not list individual themes, reproduce the Gateway's
theme-selection guidance, or imply that Themed practice is sequential or required.

## 5. Required cross-strand synthesis

Every Hub must communicate this relationship concisely:

- **Core Spelling** is the main systematic path.
- **High-Frequency Words** are practiced alongside Core.
- **Themed Spelling Practice** is optional additional practice to explore when useful.

This is required because it is genuinely cross-strand information that no one Gateway can own
without re-explaining its siblings. No particular heading or presentation is required.

## 6. Member-inventory boundary

A Grade Hub must not list or directly route to individual Core units, HFW sets, or Themed lists.
It must not render member cards or another flattened member directory. Each corresponding Gateway
is the authoritative, complete, crawlable member inventory.

This freezes the target architecture only. The current production Hubs still contain flattened
member directories; removing them is pending implementation and is not authorized by this
documentation task.

### 6.1 Narrow representative-preview exception (amendment, 2026-08-21)

**Status of this amendment: authorized and implemented as of this dated entry.** Grade Hub V2
adds two bounded, non-linked preview elements per Hub, in addition to everything §2–§5 already
require:

- one grade-wide curriculum **fingerprint** — 5–6 short plain-text phrases naming the curriculum
  concepts a student works on at that grade (not new Skill links, not a Gateway substitute);
- up to **four non-linked representative previews per strand card** — up to four curated Core
  unit titles, up to four curated HFW words, and up to four curated Themed topic labels, rendered
  as plain text within the existing single-destination card.

These previews remain subject to every other prohibition in this document: they are not member
cards, not individually linked, not a complete inventory, and do not replace the same-grade
Gateway as the authoritative destination. A strand card remains exactly one clickable destination
(`<a href={gateway}>`); the representative items sit inside that same anchor as plain text, never
as nested links or a second destination.

**Why:** a visitor comparing, say, the 2nd Grade Hub and the 4th Grade Hub could not previously
tell the curriculum substance apart — only the grade name and counts differed. Visitors need
enough concrete curriculum context (real unit titles, real words, real topics) to understand what
distinguishes one grade from another *before* committing to a strand, without turning the Hub into
a second inventory. This narrow exception exists to solve exactly that problem and no more.

### 6.2 Cross-grade strand gateways are now complete linked indexes (amendment, 2026-08-21)

**Status of this amendment: authorized and implemented as of this dated entry.** This §6 boundary
governs Grade Hubs only (`/grades/kindergarten` … `/grades/5th-grade`) and continues to do so unchanged: Grade
Hubs remain bounded, non-linked previews per §6.1, never a directory.

The three cross-grade strand gateways — `/core-spelling`, `/high-frequency-words`,
`/themed-spelling-practice` — are a distinct page family this document does not govern (see the
Scope note at the top of this file). They were introduced as orientation-level summaries; this
amendment records that their role has been refined to **complete linked indexes** of their direct
child resources:

- `/core-spelling` links every canonical Core Spelling unit across K–5 (in curriculum order, with
  curated sample words per unit);
- `/high-frequency-words` links every canonical HFW set across K–5 (with curated sample words per
  set);
- `/themed-spelling-practice` links every canonical Themed topic across K–5 (topic titles are
  self-descriptive, so no sample words are added there).

This is a deliberate, intentional distinction from the Grade Hub rule directly above it, not a
weakening of it: a Grade Hub answers "what should a student in this grade practice?" and stays a
bounded preview; a cross-grade strand gateway answers "what content exists in this strand across
K–5?" and is meant to be a comprehensive map. The grade-specific Grade-Strand Gateway
(`/{grade}/{strand}`) remains available from each cross-grade section as an additional contextual
path — it is not bypassed, only no longer the sole route to an individual unit/set/topic page.
Historical context: earlier planning explicitly avoided direct member links on any gateway-family
page precisely because that scope was undefined; this amendment resolves that ambiguity for the
cross-grade family specifically, having named a real content-inventory job for it to do.

## 7. Counts

Useful grade-and-strand facts may appear inline, including the Core unit count, HFW set and total
word counts, and Themed list count. Wherever feasible, derive them programmatically from canonical
data rather than maintaining independently authored numbers.

Counts are semantic facts, not required badges, cards, or stat blocks. Do not show individual unit
or set word counts on the Hub.

## 8. Navigation relationships

- **Hub → Gateway:** each strand section provides a clear, crawlable route to its canonical
  same-grade Gateway, generated from canonical route data.
- **Hub ↔ adjacent Hub:** adjacent-grade navigation is required and connects Grade Hubs to Grade
  Hubs only.
- **Gateway cross-grade navigation:** not created by this standard.
- **Member progression:** Review First / Next Step remains member-page navigation and is not an
  adjacent-grade Hub mechanism.
- **Skills:** Grade Hub → Skills linkage is not a Grade Hub responsibility. Skills remain a
  parallel, skill-first navigation system, not a child of a Grade Hub.

## 9. Structured data

- Retain `BreadcrumbList` matching the visible Home → Grade breadcrumb.
- Once production stops listing individual members, the Hub's `ItemList` must represent the three
  Grade-Strand Gateway destinations actually surfaced by the page.
- Do not emit member-page `ListItem`s for content no longer visible on the Hub.
- Do not add `FAQPage` by default.
- Do not add schema merely because a type exists or solely for an LLM.
- No new `CollectionPage` or `WebPage` requirement is frozen absent a separate evidence-based
  reason.

These are future production conformance requirements; this standard does not implement schema.

## 10. Tone and presentation independence

Copy should be warm through useful orientation, parent-readable, and educationally precise. Avoid
marketing filler, reassurance padding, and unnecessary jargon. It must remain substantively valid
through a future visual redesign.

This standard does not prescribe cards, panels, icons, illustrations, CTA styling, tabs,
accordions, roadmaps, spacing, typography, responsive layout, or any other visual system. It also
does not prescribe linked-heading markup, button markup, or a number of visible links to a Gateway.

## 11. Prohibited or default-rejected Hub content

- individual member cards or inventories (the §6.1 exception permits only up to four non-linked,
  plain-text representative previews per strand card plus one plain-text grade fingerprint — not a
  card, not a link, not a complete inventory);
- full Core progression narratives;
- complete HFW set inventories;
- individual Themed-list inventories or Gateway-level theme-selection guidance;
- arbitrary FAQs;
- audience-segmented "For Parents," "For Teachers," or "For Students" sections;
- Skills linkage as a Hub requirement;
- full K–5 progression maps;
- AI-keyword blocks or hidden AI answer summaries;
- schema added solely for LLMs;
- visual scores, mastery claims, or gamification claims prohibited by existing authorities; and
- copy tied to implementation details, such as "cards below."

## 12. Implementation acceptance checklist

- [ ] The page answers the governing reader question at grade-wide scope.
- [ ] Home → Grade breadcrumb, grade H1, orientation, metadata, and visible-content-matched schema
      are present.
- [ ] Core, HFW, and Themed each have a concise, correctly bounded summary and a crawlable route to
      the same-grade Gateway from canonical route data.
- [ ] Cross-strand synthesis states Core first, HFW alongside, and Themed as optional.
- [ ] No individual member inventory or direct member route remains on the Hub.
- [ ] The Hub does not reproduce Gateway-owned progression, cumulative inventory, or theme-choice
      guidance.
- [ ] Counts, when used, come from canonical data where feasible and are not presentation-bound.
- [ ] Adjacent-grade links connect Hub to Hub; no new cross-grade Gateway relationship is added.
- [ ] Skills remain parallel rather than a required Hub child.
- [ ] No visual layout, CTA form, or link-count contract has been inferred from this standard.

