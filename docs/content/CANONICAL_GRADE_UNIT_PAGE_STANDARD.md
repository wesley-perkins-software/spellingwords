
> **Final three-type navigation rule:** Core Spelling uses Review first and Next step only, with no Explore more. High-Frequency Words uses Explore more only, showing the previous and/or next set inside the same grade (one or two cards; no cross-grade continuation). Additional Practice uses Explore more only, showing exactly three editorially curated same-grade Additional Practice peers without sequence implication. Every outer section says **“Where to go from here”**; cards use exact canonical destination titles with grade metadata separate. No model places a Grade Hub card in this section. A future **Continue exploring** orientation section is separate and deferred. Canonical route classification—not folder, filename, role, title, or URL inference—is authoritative.
# Canonical Grade Unit Page Standard — spellingwords.app

*Status: canonical editorial standard. Governs the writing and review of content for Grade Unit curriculum pages. Does not redesign, retaxonomize, re-route, or re-render anything.*

> **Final Core navigation rule:** Core Spelling is one continuous K–5 sequence. The bottom section is headed **“Where to go from here”** and contains **Review first** (the previous `CORE_SPELLING_SEQUENCE` unit) followed by **Next step** (the next unit). Core pages never render **Explore more**. Only `kindergarten-first-words` omits Review first; only `grade-5-spelling-changes-related-words` omits Next step. High-Frequency Words and Additional Practice now follow the finalized non-Core rules above.
>
> **Core title rule:** a Core entry's `title` is its canonical page title and is used unchanged by its H1, breadcrumb, and Review first / Next step cards. Grade context is separate presentation metadata, never prefixed to that string. The same title is the Grade Hub card default; a Hub-only override is permitted only as an explicit reviewed exception with a documented usability rationale. Canonical URL slugs may remain shorter and need not reproduce the title exactly.

---

## 1. Status, purpose, and authority

This document governs the **editorial content** of three page types:

- **Core Spelling Grade Units** (`contentRole: grade-unit`) — sequence-critical, pattern- or concept-based milestones.
- **Curriculum on-ramp and review units** — a subtype with no single canonical Skill (e.g. Kindergarten First Words, Mixed CVC Review).
- **Additional Practice / vocabulary-theme pages** (`contentRole: vocabulary-theme`) — optional, bounded, topic-organized supplemental pages.

For traceability, this is the page set `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md` §2 calls "Layer 2" (78 canonical-active pages with their own Grade Hub card). That roadmap terminology is cited here once for cross-reference; it is not this document's everyday editorial vocabulary.

**Not governed by this standard:**

- **Skill pages** — `docs/content/CANONICAL_SKILL_PAGE_STANDARD.md`.
- **Grade Hub pages** — `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md`.
- **Common Words (High-Frequency Words) gateways and member sets** — a distinct reference category with its own content model (`K5_FINAL_CONTENT_ARCHITECTURE.md` §9). Not altered or extended here.
- Renderer selection, `contentRole` assignment, template structure, CSS, visual design, curriculum sequencing, navigation architecture.

**Frozen and out of scope for this document** (subordinate to these for any question of page existence, identity, URL, role, or placement):

- `docs/architecture/CONSTITUTION.md` — product purpose, user journeys, conceptual content identities, and non-negotiable principles, including the Grade Unit definition (§5.3, §9).
- `docs/architecture/CONTENT_MODEL.md` — content identity and the Skill/Grade Unit relationship model.
- `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md` — the frozen Grade Hub architecture and K–5 curriculum.
- `docs/architecture/PUBLIC_URL_ARCHITECTURE.md` — routes and canonical URLs.

If applying this standard ever seems to require a new page, a slug change, a taxonomy change, a renderer migration, or a `contentRole` change, that is a signal the standard is being misapplied — stop and flag it rather than making the change.

**How this document relates to the rest of the editorial system:**

- **`docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`** owns scope, phase sequencing, priority, and the page-level definition of done. This standard owns *what "done" looks like for a Grade Unit page's content specifically* — the detailed specification the roadmap's Phase 2 points to.
- **`docs/content/inventory/grade-curriculum-pages.md`** is the per-page tracking surface. This standard defines what that tracking surface should be checked against.
- **`docs/content/CANONICAL_SKILL_PAGE_STANDARD.md`** governs the sibling Layer 1 pages this standard's pages link out to; §2 below reuses its boundary language for consistency between the two documents.

This document authorizes nothing beyond editorial content: no visual redesign, no new pages, no slug or taxonomy changes, no Skill-page rewrites, no schema changes, no renderer or `contentRole` migration.

---

## 2. Grade-Unit purpose and boundary

Per `docs/content/CANONICAL_SKILL_PAGE_STANDARD.md` §2, for contrast:

**A Skill page answers:**
- What is this concept? How does it work? What should the learner notice? What are representative examples? What mistakes or overgeneralizations should an adult watch for? How can an adult teach or practice it? What concepts are related?

**A Grade Unit page answers** (this standard's subject):
- What does this grade practice?
- Why was this word set selected at this level?
- How does the concept fit the grade sequence?
- What curricular practice should the learner complete?

The organizing distinction: **a Skill page teaches the concept; a Grade Unit page teaches the child, right now, in this grade.** Where a Skill page and a Grade Unit page cover the same pattern, they must read as complements, not clones — the Skill page is the durable "what and why," the Grade Unit is "what for this grade, right now." A Grade Unit must remain useful even if the reader never follows the optional Skill link, so it may include a concise, bounded pattern reminder — but it must not reproduce the Skill page's full conceptual treatment. §9 gives the precise, sentence-by-sentence test for this boundary.

---

## 3. Universal content obligations

Two tiers, kept explicitly distinct.

### 3.1 — Universal to every page this standard governs

| # | Obligation | Notes |
|---|---|---|
| 1 | What is this list? | Identity: grade, title, the words themselves |
| 2 | Why were these words selected? | Selection rationale |
| 3 | What is the learner practicing or gaining from the list? | Plain, grade-appropriate terms, with enough local pattern context to stand alone (§9) |
| 4 | How should an adult use the list? | Session-level practice guidance |

These four apply identically to all three page types — §4 governs depth per type, not whether they apply.

### 3.2 — Additional, for Core Spelling Grade Units and on-ramp/review units only

| # | Obligation | Notes |
|---|---|---|
| 5 | Why does this list sit at this point in the curriculum? | Sequence-position rationale — a curriculum-position claim (§9.3), not a developmental claim |
| 6 | What observable evidence suggests the learner is ready to continue? | Folded into the end of "How to practice this list" — see §5, §8; not a separate section |
| 7 | What comes next, when a genuine next step exists? | §10 — never manufactured |

Additional Practice / vocabulary-theme pages do not carry obligations 5–7.

## 4. Page variants

Three first-class editorial variants. Each is defined by what it does with the §3.1 core and whether §3.2 applies.

### Core Spelling Grade Units
- §3.1 at full depth, plus §3.2 in full.

### Curriculum on-ramp and review units
(Kindergarten First Words, Mixed CVC Review, and similar units that establish or check a broad capability rather than one narrow pattern, and legitimately have no canonical Skill — `skillIds` empty by design.)
- §3.1 at full depth, plus §3.2 in full, except: obligation 3 is framed around the broad capability rather than a named pattern, and "go deeper on the pattern" (§6) is correctly absent, not forced.
- Obligation 5 (sequence-position rationale) tends to carry more weight here, since the unit's reason for existing *is* its sequence position rather than a discrete new pattern.

### Additional Practice / vocabulary-theme pages
- **§3.1 only**, at reduced depth: identity (word list), a short topical-usefulness rationale, and brief practice guidance (no move-on evidence — §3.2 doesn't apply).
- **§3.2 does not apply**: no sequence-position rationale, no move-on guidance, no Review First / Ready for Next forward-curriculum framing.
- **Skill link:** not forced by default; permitted only when the page *intentionally* practices a canonical concept and the body explains the relationship. Topical membership alone does not earn a link.
- May use "Also Worth Practicing" when a genuine optional relationship exists.
- Must not be padded to imitate a full Core Spelling unit's depth.

---

## 5. Canonical section order

For a **Core Spelling Grade Unit or on-ramp/review unit**:

1. Hero and practice action
2. "These spelling words are a good fit for students who…" *(conditional)*
3. Word list
4. Why these words? *(rationale prose; covers §3.1.2–3 and §3.2.5)*
5. How to practice this list *(covers §3.1.4; ends with concise, observable move-on guidance per §3.2.6 — see §8; no separate "ready to move on" section)*
6. Go deeper on the pattern *(conditional)*
7. FAQ *(conditional — zero is normal)*
8. Where to go from here
   - Review first *(all except the first Core unit)*
   - Next step *(all except the final Core unit)*
11. Source attribution *(conditional)*

For an **Additional Practice / vocabulary-theme page** (§3.1 only): positions 1, 3, 4 (reduced), 5 (brief, no move-on guidance), plus conditionally 6 (narrow), 7, 10, 11. Positions 2, 8, 9 do not apply.

**Fixed rules, both variants:**

- The heading in position 2, where present, is preserved verbatim: **"These spelling words are a good fit for students who…"** Never renamed.
- Core navigation order is always Review first → Next step. Explore more is prohibited on Core pages even when `relatedLists` is populated.
- “Go deeper on the pattern” remains a separate Skill-support feature and is unaffected by the bottom navigation rule.

---

## 6. Required, conditional, and prohibited content

| Content | Core Spelling Grade Unit | On-ramp/review unit | Additional Practice |
|---|---|---|---|
| Hero + practice action | Required | Required | Required |
| "Good fit for students who…" | Conditional (genuine signal) | Conditional | Not applicable |
| Word list | Required | Required | Required |
| Why these words? | Required | Required | Required, reduced — topical rationale only |
| — sequence-position rationale within it | Required | Required (often primary reason) | Not applicable |
| How to practice this list | Required | Required | Required, brief |
| — move-on guidance at its end | Required | Required | Not applicable |
| Go deeper on the pattern | Conditional (`skillIds` resolves) | Not applicable (no Skill) | Conditional, narrow (§4) |
| FAQ | Conditional, no floor | Conditional, no floor | Conditional, no floor |
| Review First | Conditional (`prerequisiteLists` populated) | Conditional | Not applicable by default |
| Ready for Next | Conditional (genuine destination, §10) | Conditional | Not applicable |
| Also Worth Practicing | Conditional (`relatedLists` populated) | Conditional | Conditional |
| Source attribution | Conditional (`canonicalSource` set) | Conditional | Conditional |

**Never include on any page this standard governs:**

- A second/bonus word list beyond the one 8–16-word Practice Set.
- A full concept explainer reproducing the Skill page's exception system, teaching routine, history, or comprehensive example set (§9).
- A restatement of the whole grade's curriculum journey (the Grade Hub's job).
- Mastery claims, gamification language, rankings, or curriculum comparisons.
- FAQs added to hit a count target rather than to answer a genuine residual question (§7).
- A generic "explore more" block distinct from the three named navigation buckets.
- Invented navigation — a "Ready for Next" pointing somewhere the frozen curriculum/`nextLists` doesn't actually establish (§10).
- A visible score, percentage, speed target, or mastery-threshold figure of any kind — including inside the move-on guidance at the end of "How to practice this list" (§8).

---

## 7. Direct-answer, metadata, and structured-data requirements

Editorial content requirements expressed through existing frontmatter and body content — not template or rendering instructions.

- **`shortAnswer`:** must directly and concisely state what the list teaches and why it belongs at this grade/curriculum point (Additional Practice pages: why the topic is useful) — one or two sentences, not a teaser.
- **`description`:** must accurately summarize what the page actually contains. Never promise a section, example, or explanation the page doesn't have.
- **Internal scope agreement:** `title`, `description`, `shortAnswer`, the markdown body, the visible word list, and the FAQ must all describe the same page — no field implies broader or different content than what's actually rendered.
- **Structured data (`FAQPage` JSON-LD, etc.):** must reflect visible page content exactly. FAQ structured data must never contain a question that isn't also visible in the page's rendered FAQ section.
- **Primary search intent:** should be documented during each page's editorial audit, even though where that record is persisted is an implementation detail left open, not decided here.
- **Headings:** must reflect a real parent question or instructional job (matching §5's canonical section list), never generic SEO filler.
- **General restraint:** no section, heading, or content block should be added because it is assumed to influence AI/answer-engine retrieval. The governing test is genuine reader and search-intent value: direct answers improve extractability, clear headings improve comprehension, unique curriculum rationale differentiates the page, structured internal linking clarifies real relationships, and a complete visible word list satisfies the literal query.

---

## 8. Section-by-section specifications

Applies to Core Spelling / on-ramp-review units; Additional Practice pages use only the rows marked "universal."

| Section | Tier | Parent question | Depth guidance | Must not duplicate | Schema support |
|---|---|---|---|---|---|
| Hero + practice action | Universal | What is this, how do I start? | Minimal — no paragraph copy | Rationale reasoning | `title`, `description`, `grade`, `category` |
| "Good fit for students who…" | Conditional | Is my child ready to *start* this list? | 2–4 observable bullets | The move-on guidance at the end of "How to practice" (entry vs. exit — never merge) | `readinessSignals` |
| Word list | Universal | What exactly will my child practice? | Complete, crawlable 8–16 words | Per-word practice instructions | `words` |
| Why these words? | Universal + sequence-critical | Why these words, why this sequence point, what's being practiced? | Functional, not fixed-length: long enough to cover selection + sequence position + instructional purpose; short enough not to become a second Skill article. On-ramp/review units may need more; narrow, familiar-pattern units may need less. No padding for consistency. | The Skill page's full conceptual treatment (§9) | Markdown body |
| How to practice this list (including move-on guidance at its end) | Universal (+ sequence-critical for the closing guidance) | What do we do in a session, and how do we know we're ready to continue? | Functional — as short as the guidance genuinely is. The section opens with session-level guidance (what the adult/child do) and closes with a few concise, qualitative sentences on observable readiness to move on. Both live under this one heading; do not split into two visible sections. | The rationale's "why"; the Skill page's general pedagogy; the entry-readiness bullets above | Markdown body |
| Go deeper on the pattern | Conditional | Where can I learn the general concept? | One line + link | The Skill page's explanation itself | `skillIds` |
| FAQ | Conditional | Whatever genuine question remains unanswered | Zero to a small number; no floor, no ceiling target | Any section already answering the same question in the same form | `faq` |
| Review First / Ready for Next / Also Worth Practicing | Sequence-critical (Review/Ready) + conditional (Also) | What came before, what's next, what else helps? | One line of framing per bucket + link cards | The Grade Hub's full roadmap | `prerequisiteLists`, `nextLists`, `relatedLists` |
| Source attribution | Conditional | Where does this come from? | One line | — | `canonicalSource` |

**Note on move-on guidance:** define readiness-to-continue through qualitative, observable evidence only — increasing independence, reasonable accuracy across more than one attempt, strategy use, and transfer to an unfamiliar example where appropriate. Do **not** tie it to `masteryThreshold` or any hidden score/percentage, and never state a speed target. This guidance stays distinct in substance from the entry-readiness bullets even though both are qualitative and observable — one describes readiness to *start*, the other readiness to *continue* — and it must not be merged with them into one list.

---

## 9. Grade Unit vs. Skill vs. Grade Hub vs. Additional Practice — differentiation test

The boundary is not "any grade-neutral sentence is disallowed." A Grade Unit must remain useful if the reader never clicks the Skill link, so it may include a concise, bounded pattern reminder. The test is whether a sentence supplies *essential local context* or *duplicates the canonical explanation*.

1. **Local-context vs. duplication test:** Does this sentence give the minimum pattern context needed to understand what these specific words demonstrate? → Keep it, bounded to one or two sentences, inside "Why these words?" Does it reproduce the Skill page's exception system, full teaching routine, historical/etymological detail, or comprehensive example set? → Cut it; link to the Skill page instead.
2. **Sequence-specificity test:** Does this sentence explain why *this* list, with *these* words, belongs at *this* point in *this* grade's sequence? → Belongs in "Why these words?" (sequence-critical units only).
3. **Curriculum-position vs. developmental-claim test:** Is this sentence explaining the list's position in *this site's* curriculum (prior capability it builds on, later work it prepares for, why these examples fit this grade's expected difficulty)? → Keep, framed as curriculum-position rationale. Is it instead an unsupported general claim about what children at a given age can or should do developmentally? → Cut or soften unless independently supportable; default to curriculum-position framing.
4. **Whole-grade test:** Does this sentence describe the grade's overall journey across multiple units rather than this one milestone? → Belongs on the Grade Hub, not here.
5. **Topical-vocabulary test:** Does this sentence justify word choice by topic/subject/enrichment value rather than by phonics/orthographic/morphological progression? → Belongs on an Additional Practice page instead.
6. **Session vs. reasoning test:** Is the sentence telling the adult what to *do right now* vs. explaining *why* the list is designed this way? "Do right now" → "How to practice this list." "Why designed this way" → "Why these words?" Sentences that drift between the two within one paragraph should be physically relocated.
7. **Entry vs. exit test:** Is the sentence describing what a child needs *before* starting (→ "good fit for" section) or what a child demonstrates *after* practicing (→ the move-on guidance closing "How to practice this list")? Never merge these, even though both are qualitative content — they answer opposite-direction questions and live in different sections.
8. **Claim-strength test:** Does the sentence claim mastery, completion, or a guaranteed outcome from one session? → Cut or soften.

**Applying the checklist:** read the body top to bottom, tag each sentence against tests 1–7, then physically move or cut any sentence whose current placement doesn't match its tag. This is the literal review procedure to run on every page.

---

## 10. Internal-linking and navigation rules

- **Ready for Next** is required *only when a genuine destination already exists* — either `nextLists` is populated, or the frozen curriculum explicitly identifies the forward step. When no truthful forward destination exists, **omit the card**; do not assume a terminal unit automatically links to the next grade's Hub or first unit unless the frozen navigation model already specifies that relationship.
- **Also Worth Practicing** draws only from a populated `relatedLists`.
- **Review First** draws only from a populated `prerequisiteLists`.
- **Ordering, when multiple buckets are present:** Review First → Ready for Next → Also Worth Practicing, always; Ready for Next never appears after Also Worth Practicing.
- **Go deeper on the pattern** is the only up-link (to the Skill layer); it never doubles as a "what's next" destination.
- No fourth, generic linking block is permitted (§6).
- The move-on guidance at the end of "How to practice this list" (§8) may name which upcoming unit the evidence prepares the learner for, bridging naturally into the Ready for Next card immediately below it — this is a content link, not a navigation section of its own.

---

## 11. Worked example: Kindergarten First Words

This section is a worked application of the standard, not an independent source of requirements. It is subordinate to §1–§10; if anything here appears to conflict with those sections, the general rule governs. It should be updated when the page is actually implemented, rather than read as a permanent rule about this specific page.

**Content-file editorial edits** (prose/frontmatter changes only, no rendering implications):

- Relocate the closing rationale paragraph ("Success at this stage looks slow, not fast…") from "Why these words?" to the end of "How to practice this list" — by the session-vs-reasoning test (§9.6) it's practice/move-on guidance, not rationale, and by the merge decision in §5/§8 it belongs inside that one section rather than a separate heading, essentially unchanged once moved.
- Confirm the existing paragraph, once moved, functions as both session guidance and move-on evidence (§3.2.6) — it already describes what a slow, sound-by-sound session looks like; it may need one added sentence naming the observable evidence of readiness to continue (e.g., increasing independence sounding out and writing most of the eight words) if that isn't already implicit in the current wording.
- Re-evaluate each FAQ strictly against the no-floor policy (§7): Q1 (scope) is genuine and non-redundant, keep. Q2 (why mixed vowels) may already be fully answered by "Why these words?" — sharpen it into a genuinely distinct question or remove it; do not keep it to preserve count. Q3 (memorized vs. practiced) becomes redundant once the relocated guidance exists inside "How to practice this list" — remove it. Q4 (what comes next) — remove unless it answers something the Ready-for-Next card genuinely doesn't.
- Preserve the word list and overall page scope unchanged; the identity, hero, and entry-readiness bullet content are already correct.

**Renderer/presentation implementation implications** (outcomes this standard requires but does not itself authorize implementing):

- Displaying the exact approved readiness heading text.
- Rendering Ready for Next before Also Worth Practicing.
- Preserving separate Review First / Ready for Next / Also Worth Practicing headings rather than one collapsed block.
- Whether "How to practice this list" (now inclusive of move-on guidance) renders as its own distinct visible section.

This standard defines the required editorial *outcome* for each of the above; it does not authorize the renderer, component, or template change that may be needed to display it. A later, separate implementation plan must inspect both existing rendering paths (`[slug].astro`'s classic stack and `GradeUnitWorldPage.astro`) and make the narrowest necessary change to satisfy the outcome — without migrating this page between renderers or altering its `contentRole`. **Net status:** the required editorial changes are fully defined above; some can be made in page content alone, while the approved heading and navigation-order outcomes may require a separate, narrowly scoped renderer implementation. No `contentRole` or renderer migration is authorized by this standard.

---

## 12. Relationship to rendering

This standard is renderer-agnostic. It defines what information a Grade Unit page must contain and what job each section does — not which Astro component renders it, which `contentRole` value it carries, or which of the two current rendering paths (`[slug].astro`'s classic stack or `GradeUnitWorldPage.astro`) expresses it. Either current renderer, or a future unified one, is responsible for expressing this content faithfully. Changes to `contentRole` or template selection are separate, later implementation decisions and are not authorized by this document.

---

## 13. Implementation acceptance checklist

Copyable into every future Grade Unit content task. **Start by identifying the page's variant** (Core Spelling Grade Unit / on-ramp-review unit / Additional Practice) — apply only the checklist items that variant carries, per §4, §6.

- [ ] **Variant identified**, and only that variant's obligation set (§4, §6) applied below.
- [ ] `title` / `description` / `shortAnswer` / body / word list / FAQ all describe the same actual page content — no field promises something the page doesn't have.
- [ ] Word list is 8–16 words, complete, crawlable; example sentences present only where a word is genuinely ambiguous without one.
- [ ] "Why these words?" covers selection + what's practiced (all variants); for Core Spelling and on-ramp/review units, also covers sequence-position rationale (not unsupported developmental claims).
- [ ] "Why these words?"'s pattern context is bounded — passes the local-context-vs-duplication test (§9.1); no reproduction of the Skill page's exception system, teaching routine, or full example set.
- [ ] "How to practice this list" contains only session-level guidance, at a depth matching the variant; every sentence passes the session-vs-reasoning test (§9.6).
- [ ] **For Core Spelling and on-ramp/review units only:** "How to practice this list" ends with concise, qualitative move-on guidance (no separate heading) — no score, percentage, speed target, or `masteryThreshold` reference. Not applicable to Additional Practice pages.
- [ ] **When readiness signals genuinely exist:** "Good fit for students who…" heading text is exact, and its bullets are entry-only (not duplicating the move-on guidance).
- [ ] **When a genuine Skill relationship exists:** "Go deeper on the pattern" appears; absent otherwise, and never forced on an Additional Practice page by topical overlap alone.
- [ ] Every FAQ answers something no other visible section already answers in the same form; zero FAQs is acceptable; none were added to hit a count.
- [ ] FAQ structured data contains only questions also visible on the page.
- [ ] **When a genuine forward curriculum step exists (Core Spelling / on-ramp-review units):** Ready for Next appears and is never invented. **When genuine prerequisite/related relationships exist:** Review First / Also Worth Practicing appear. When multiple are present, order is Review First → Ready for Next → Also Worth Practicing.
- [ ] Source attribution appears only if `canonicalSource` is set.
- [ ] No mastery claims, gamification language, comparisons, or hidden metrics anywhere on the page.

---

## 14. Amendment note

This standard should guide evolution without pretending it can never change, mirroring `docs/architecture/CONSTITUTION.md` §20. A foundational change to this standard must be explicit: it should identify the principle being changed, explain the editorial or product reason for the change, and update this document directly rather than being introduced silently through individual page implementations. Implementation should not become standard by accident — if the editorial model for Grade Unit pages changes, this document must change with it.
