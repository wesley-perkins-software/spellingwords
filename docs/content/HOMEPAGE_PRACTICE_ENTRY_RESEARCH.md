# Homepage Practice Entry Research — Should "Practice Your Own Words" Stay on the Homepage?

**Status:** Research only. Not approved, not incorporated into any frozen standard. This document
does not amend `docs/architecture/CONSTITUTION.md` or `docs/content/CANONICAL_HOMEPAGE_STANDARD.md`.
Nothing here authorizes a code, route, or navigation change.

**Trigger:** A request to evaluate, from first principles, whether the homepage's directly-embedded
custom-word-entry widget should (A) remain fully embedded, (B) become a compact/hybrid entry that
continues to a dedicated page, or (C) move primarily to a dedicated "Practice Your Own Words" page.

---

## 1. Executive summary

**This research finds Model A — the full widget embedded directly on the homepage — is correct, and
recommends against reopening it.** This is not a default or a refusal to engage with the question;
it is the outcome of evaluating the question against evidence this repository already carries.

The determining fact is not aesthetic and not this document's own judgment: `docs/architecture/
CONSTITUTION.md` §3.1 states in plain language that Practice Your Own Words "is the flagship homepage
experience," and `docs/content/CANONICAL_HOMEPAGE_STANDARD.md` — a frozen standard whose own source
record (`CANONICAL_HOMEPAGE_STANDARD_RESEARCH.md` and its V2 reopening pass) shows this exact
question was already researched, argued, and decided — requires the interaction to be "hosted
directly on the homepage as a working interaction..., not merely linked to" and to "remain the
dominant, most immediately available action on the page" (§5.1). The V2 reopening pass, dated after
the homepage was actually built and looked at, revisited nearly everything else about the homepage
(hero copy, strand naming, trust section) and explicitly left this requirement untouched, calling the
three-journey/dominant-widget architecture "correct" and confirming "this reopening found no reason
to disturb it" (V2 §5). Model C would directly contradict both documents; Model B would weaken the
dominance requirement in §5.1 without the frozen standard's own permission to do so.

That does not mean the underlying product question was frivolous — it is a real and recurring
tension (see §4–§6), and the mobile-space concern this task raises is genuine and already visible in
the current implementation. But the correct venue for changing a frozen architectural commitment is
an explicit, reasoned amendment to the Constitution and the standard, of exactly the kind the V2 pass
already demonstrates how to do — not a new page built alongside the requirement, and not a decision
this research document is positioned to make unilaterally. Where this document differs from the V2
pass is narrower: it identifies specific, bounded ways the *existing* Model A can better communicate
the site's other two journeys without touching the widget's placement or dominance (see §16, §20).

**Recommendation: KEEP FULL PRACTICE WIDGET ON HOMEPAGE.** See §17 for the formal statement.

---

## 2. Scope and authorities

This document was produced against the actual state of the repository at `/home/user/spellingwords`
as of 2026-08-11. Authorities consulted, in the precedence order `CONSTITUTION.md` §17 itself defines:

1. `docs/architecture/CONSTITUTION.md` — exists, read in full. §3.1 and §11 are load-bearing here.
2. `docs/architecture/CONTENT_MODEL.md` — exists; opening lines confirm the same three-journey model.
3. `docs/architecture/PUBLIC_URL_ARCHITECTURE.md` — exists, read in full. Governs `/play` and the
   grade/skill URL trees; says nothing about a practice-entry route, confirming no such route is
   frozen one way or the other at the URL-architecture layer.
4. `docs/content/CANONICAL_HOMEPAGE_STANDARD.md` — exists, read in full. The direct, frozen authority
   for the homepage. **Not edited by this task**, per instructions.
5. `docs/content/CANONICAL_HOMEPAGE_STANDARD_RESEARCH.md` and `CANONICAL_HOMEPAGE_STANDARD_RESEARCH_V2.md`
   — exist, read in full. These are the supporting rationale the frozen standard's own header cites.
   V2 is dated after the current homepage was implemented and reopened multiple prior decisions —
   directly relevant precedent for "should we reopen X" reasoning.
6. `docs/architecture/SKILLS_ARCHITECTURE.md`, `SKILLS_MODEL.md` — exist; consistent with the above,
   no additional practice-entry guidance.
7. `docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`, `docs/planning/K5_SIMPLE_WEBSITE_CONTENT_PLAN.md`,
   `docs/content/CANONICAL_NAMING_AND_TERMINOLOGY_AUDIT.md` — exist; corroborate the three-journey
   model and note that "Practice Your Own Words" is frozen as a *journey concept*, with its literal
   UI wording left open (relevant to Model B's copy-only variants, not its structural question).

**Naming note:** the brief's assumed paths `docs/architecture/CONSTITUTION.md`,
`PUBLIC_URL_ARCHITECTURE.md`, and `CONTENT_MODEL.md`, and `docs/content/CANONICAL_HOMEPAGE_STANDARD.md`
all exist exactly as named — this repository's actual `docs/` structure is more developed than the
CLAUDE.md-only fallback paths the task brief anticipated as a possibility, so no fallback substitution
was needed.

---

## 3. Current implementation audit

**Homepage (`src/pages/index.astro`):** the hero (H1 + supporting paragraph + word-entry `<textarea>`
+ live word-count pill + "Start Practicing" button) is the first thing rendered, above `Browse by
Grade`, `Browse by Skill`, and a closing trust section. The textarea is pre-filled with seven sample
words so the interface is never empty. On submit, the page calls `encodeWordList()`
(`src/lib/words/serialization.ts`) and navigates to `/play?list=<payload>`. No account, no page
transition, no setup step — the interaction genuinely is "hosted directly," not a link to one.

**`/play` (`src/pages/play.astro`):** reads `?list=` from the URL, decodes it via `decodeWordList()`,
optionally recovers richer word data (example sentences) from `sessionStorage` under a
payload-keyed key (`sw:words:<payload>`, `sw:title:<payload>`), and runs the practice session state
machine (`src/modules/spellingTest/stateMachine.ts`). **`/play` is exclusively a practice-session
runtime, not a setup/entry surface** — it has no word-entry UI of its own and 404s/error-screens if no
valid `list` param is present ("No word list found. Please go back and enter your words."). This
confirms the task brief's §14 assumption: a dedicated entry page, if one existed, would sit *before*
`/play` in the flow, not replace it. **No dedicated practice-entry route exists today** — `/play`
alone cannot serve as Model C's destination; a genuine Model C would require a new route.

**Word-list transport (`src/lib/words/serialization.ts`):** a versioned, URL-safe base64url encoding
scheme (`encodeWordList`/`decodeWordList`) with explicit `MAX_WORD_COUNT` (200) and
`MAX_PAYLOAD_LENGTH` (4096) limits and typed, non-throwing error results. This layer is already
route-agnostic — it has no dependency on being called from the homepage specifically, and nothing
about it would need to change under Model B or C. It is explicitly documented as "the transport layer
behind a future shareable link," which is mildly suggestive that list-entry-as-a-destination was
anticipated as a future direction, though not committed to.

**How much setup logic lives on the homepage:** relatively little, and cleanly separated. The
homepage's inline `<script>` block (`updateStatus()`, `handleStart()`) is thin DOM-wiring — word
counting, button enable/disable, encode-and-navigate — that calls into `@/lib/words`, consistent with
CLAUDE.md's "logic belongs in `lib/`/`modules/`" rule. There is no meaningful "business logic
migration" cost to any of the three models; the practical cost is entirely about *where the same
markup and script are mounted*, not about extracting logic that's currently trapped in the page.

**Frozen documentation that already embeds a homepage-specific assumption:** this is the single most
important audit finding, addressed in full in §15.

---

## 4. User-intent analysis

**Parent with an assigned list.** The realistic task is "type or paste 12 words, then let my child
practice" — a task with essentially zero exploration intent. One extra click before reaching a
textarea is not damaging in absolute terms (well under a second of added time), but it is damaging
*relative to the value it buys*: nothing about the parent's task benefits from an interstitial page,
because they are not choosing between options — they already know what they want. A returning parent
under Model C would very plausibly bookmark or re-navigate to the entry page rather than the
homepage, meaning the extra click's cost falls almost entirely on **first-time** parents, at the exact
moment their trust in an unfamiliar children's site is least established. Under Model A that same
parent's first action *is* the whole product test-drive — they can evaluate whether this is a "real"
site while typing their child's actual list, not before it.

**Teacher.** A teacher assigning practice to a class is closer to Model C's ideal user — deliberate,
task-oriented, likely to bookmark or link the entry page directly to students. But a teacher is also
the audience CANONICAL_HOMEPAGE_STANDARD_RESEARCH_V2.md (§3) already identifies as most reassured by
seeing curriculum/skill depth, and Model A already serves that need without competing with the
practice interaction, because Browse by Grade and Browse by Skill sit immediately below the widget,
not gated behind it.

**Student.** Immediacy matters most here and patience for intermediate UI least. A large homepage
widget does not confuse a student with a specific list in hand; it is the single simplest possible
interface for that exact intent (a box, then a button).

**Curriculum-seeking visitor ("I need 3rd grade spelling words").** This is the visitor genuinely
disadvantaged by Model A's mobile weight (see §5) — they must scroll past a widget they don't want to
reach Browse by Grade. This is real friction, but it is friction of *scroll distance*, not of
*discoverability*: Browse by Grade is one scroll away, correctly labeled, and (per the V2 pass now
incorporated into the frozen standard) already names the three curriculum strands once it's reached.
Nothing about Model A hides this visitor's destination; it delays arriving at it.

**Skill-seeking visitor ("silent e help").** Same shape of friction as the curriculum-seeking
visitor, one section further down the page ("coequal" with Browse by Grade per §5.3 of the frozen
standard, though visually it follows it).

**Net finding:** the two audiences actually harmed by Model A (curriculum-seeker, skill-seeker) are
harmed by *scroll cost*, which is a visual/layout question the frozen standard explicitly leaves open
(§10, "presentation independence") — not a question that requires moving the widget off the page. The
audiences most helped by Model A (parent, student) are helped by something structural to embedding —
zero-setup first contact — that a dedicated page cannot fully replicate no matter how it is designed.

---

## 5. Mobile vs. desktop analysis

On mobile, the current implementation renders, in order: sticky header, hero heading/paragraph
(roughly 2–3 lines), the full input card (label row + 7-row textarea + status row — this alone is a
large fraction of a typical phone's first viewport), then the primary CTA button, before any
curriculum or skill content becomes visible. This matches the task brief's description precisely.

**This is a genuine, non-trivial cost, and this document does not minimize it.** A first-time mobile
visitor who does not immediately want to type words (the curriculum-seeker, the skill-seeker) may
scroll past what reads, at a glance, as "a text box app" without registering that a K–5 curriculum and
a 41-skill library exist below the fold. The product-perception risk is real: a single-screen mobile
impression genuinely can look like a narrow custom-list tool, not a structured educational resource.

**Where this analysis departs from "therefore move the widget":** the frozen standard's own governing
question (§1) is explicitly "I need spelling practice for a student. Which of this site's three ways
of practicing is mine, and can I trust this place enough to start?" — and the *fastest possible*
resolution of that question, for the majority-case visitor who does have words in hand, is not to
show them a menu of three options first. The mobile cost identified here is a **communication-density
problem in the hero region**, not evidence that the widget occupies the wrong page. The two are
separable: the hero paragraph, word-count pill, and CTA copy are not test-locked beyond the exact H1
fragment and `<title>`/meta-description keyword patterns (`homepage.test.ts`, confirmed by reading it
directly), meaning there is real room to make the *identity-signaling* text around the widget do more
work in a compact space — a smaller lever than relocating the widget, and one Model A does not
foreclose.

**Desktop tradeoff differs materially.** On desktop the widget occupies proportionally far less of the
viewport relative to available whitespace, and Browse by Grade/Browse by Skill are typically visible
either in the first viewport or one shallow scroll away. The product-perception risk identified above
is substantially a mobile-specific problem, not an inherent property of Model A — which weakens the
case for a structural fix (moving the widget everywhere) relative to a mobile-scoped layout fix
(future visual-design work, explicitly out of this task's scope, but worth flagging as the more
proportionate response).

---

## 6. Product-perception analysis

If a visitor sees only the first one to two screens:

- **Model A (current):** communicates "immediate custom practice tool" strongly and correctly (it is
  the flagship experience) but communicates "structured K–5 curriculum" and "41-skill library" only
  as promissory text in the hero paragraph ("Or explore spelling practice organized by grade and by
  skill...") unless the visitor scrolls. On mobile specifically, that promissory text competes for
  attention with a large interactive element and is easy to skim past.
- **Model B (hypothetical):** could, in principle, free enough vertical space to get Browse by Grade
  into the same first-two-screens envelope as the widget — but only if the hybrid's compact form is
  genuinely small, which is exactly the risk flagged in §12 (a hybrid that still needs a label, an
  affordance for "there's more here," and enough room to not look broken is not guaranteed to be much
  smaller than the current card).
- **Model C (hypothetical):** would let the homepage's first two screens spend their entire budget on
  identity and the three-journey menu with no widget competing for space — the cleanest communication
  of "this is a structured resource with three doors," but at the direct cost of the flagship
  journey's own immediacy, which both frozen documents currently treat as non-negotiable.

**This document does not find that equal visual prominence for all three journeys is required** —
the frozen standard explicitly says the opposite (§5.1: Practice Your Own Words "MUST remain the
dominant, most immediately available action," and this is by design, not oversight, since it is "the
flagship homepage experience," `CONSTITUTION.md` §3.1). The dominance is intentional and its
product-perception cost was already weighed once, in V2 §1 and §5, and accepted as correct.

---

## 7. Model A — Full homepage widget (current state)

**Advantages, evaluated rather than assumed:**
- True zero-friction for the highest-frequency, lowest-exploration-intent task (parent/student with a
  list in hand) — confirmed by the audit in §3 (no interstitial, no account, direct encode-and-go).
- Matches the flagship-experience framing the Constitution assigns this journey explicitly, not by
  inference.
- Requires no new route, no new test surface, no new IA decision — zero implementation or
  maintenance delta from today.
- Already the subject of one full architectural review-and-reaffirmation cycle (V2), reducing the
  risk that revisiting it again surfaces genuinely new information rather than re-litigating settled
  ground.

**Disadvantages, evaluated rather than assumed:**
- Confirmed mobile vertical-space cost (§5) — real, not hypothetical.
- Confirmed risk of a first-time, exploration-intent mobile visitor under-registering the curriculum
  and skill systems (§6) — real, but bounded by the fact that Browse by Grade/Skill are one scroll
  away and, per the now-incorporated V2 changes, carry real orientation content (strand names, skill
  count) once reached.
- Ceiling on future growth: if the practice-setup experience genuinely needs to grow (more input
  affordances, mode choices, list management), the homepage has a hard ceiling on how much of that it
  can absorb before violating its own "not a marketing paragraph, not a feature list" tone constraints
  (§5.1: "MUST NOT carry feature enumeration"). This is evaluated in depth in §12 as a
  future/speculative question, not a present one.

---

## 8. Model B — Compact/hybrid homepage entry

Evaluated conceptually only, per the task's explicit instruction not to design the interaction.

**What a hybrid could look like, at a level of abstraction sufficient to evaluate it:** a materially
smaller entry point (a single-line input, a "paste your list" affordance, or a 2–3 word visible
textarea that expands on focus) that still lives on the homepage and still avoids a full navigation
away, but does not commit the current widget's full vertical footprint by default.

**Genuine potential benefit:** could reclaim mobile vertical space (§5) while nominally preserving
"the interaction lives on the page." If done carefully, this is the only one of the three models that
could plausibly improve the mobile product-perception problem *without* touching the dominance
requirement in §5.1 — because a compact-but-present interaction still satisfies "hosted directly...
not merely linked to."

**Why this document does not recommend it, on inspection (see also §18):**
- A hybrid genuinely risks becoming, in the frozen standard's own words, "a link" the moment its
  compact form requires a second step (expand, then type, then a second CTA) before a user reaches
  the same textarea Model A already puts in front of them immediately. The frozen standard's
  requirement is specifically about *not requiring* an intermediate step; a hybrid that adds one,
  even a small one, is functionally closer to Model C's friction profile than Model A's, while
  offering less design clarity than either endpoint.
- It creates two visually and functionally distinct entry experiences (a compact homepage stub and
  presumably a fuller continuation surface) for the exact same task, which is real maintenance and
  design-consistency overhead this repository's CLAUDE.md and Constitution both discourage
  ("prematurely componentize," "architecture for architecture's sake").
- The specific mobile-space problem this model targets can very plausibly be solved by *tightening the
  existing widget's visual footprint* (shorter default textarea height, smaller default sample-word
  count, tighter vertical rhythm) — a presentation-layer change explicitly permitted by §10 of the
  frozen standard without any structural reclassification as "compact/hybrid," and without inventing
  a second interaction surface. If the real ask is "make the widget take less mobile space," that is
  achievable inside Model A and does not require naming a new model to get there.

---

## 9. Model C — Dedicated Practice Your Own Words page

**Journey:** Home → Practice Your Own Words (dedicated page) → enter list → `/play`.

**Applying the required architectural test (task §17):**

1. *Does it have a distinct user intent?* Partially. "I have my own words, take me to type them" is a
   real, distinct intent from "show me the whole site." But this intent is already satisfiable in one
   step under Model A — the dedicated page would not unlock an intent Model A cannot already serve; it
   would relocate where that intent gets served.
2. *Does it provide independent value?* No, on the evidence gathered here. A page whose entire content
   is the same textarea and button the homepage already hosts is exactly the failure mode the task's
   own UX/IA principles section (§12) warns against: "not merely 'click here to see the exact same
   widget one click later.'" Nothing in this repository's current word-entry flow (§3) has any content
   that would differ between a homepage-hosted and dedicated-page-hosted version of the same
   interaction — same textarea, same encode call, same navigation to `/play`.
3. *Is it more than a pass-through gateway?* By the Constitution's own definition (§11, "The
   No-Gateway Rule"), a page inserted before real content "merely to expose another directory of
   links or add another click before the user reaches useful content... remains prohibited." A
   practice-entry page with today's feature set (a textarea and a button) is, on the evidence in this
   repository, indistinguishable in substance from the pattern the Constitution names and rejects
   elsewhere in the architecture.
4. *Can it naturally support the full custom-list setup experience [as it grows]?* Yes — this is the
   strongest argument in Model C's favor, addressed fully in §12.
5. *Does it simplify the homepage enough to justify the extra click?* Only if the widget is fully
   removed from the homepage, which directly conflicts with the frozen standard's dominance
   requirement (§5.1) — this is not a simplification decision this research is positioned to make.
6. *Does the user still reach practice easily?* Yes, mechanically — one click is not a severe UX
   tax. But "easily" is not the frozen standard's bar; its bar is "no account, login, or any setup
   step before use" (§5.1), which a dedicated-page click, however light, technically is.
7. *Is it likely to remain useful as the practice system grows?* Plausibly yes, later — but "plausibly
   useful later" is explicitly not this test's bar; the test is cumulative, and items 2, 3, and 5 do
   not pass today.

**Conclusion applying the test:** the architectural test itself, run honestly against the *current*
feature set, does not clear its own bar. Model C fails primarily on items 2 and 3 (independent value,
more-than-pass-through) — not on friction or feasibility, which are the areas most homepage debates
focus on but which turn out not to be where this model actually loses.

**Direct conflict, stated plainly:** independent of the test above, Model C as the task frames it
("the homepage linking to it as one of three primary journeys," implying the widget is no longer
directly hosted) contradicts `CANONICAL_HOMEPAGE_STANDARD.md` §5.1's "hosted directly... not merely
linked to" and §3's "no other page owns... the Practice Your Own Words interaction as a directly
hosted, on-page experience." Adopting Model C without first amending that standard (and, upstream of
it, `CONSTITUTION.md` §3.1's "flagship homepage experience" framing) would be implementing against a
currently-frozen requirement, not filling an architectural gap.

---

## 10. Competitive / adjacent-product findings

Light, non-exhaustive web research, kept separate from this document's own conclusions per the task's
instruction not to copy competitors automatically.

**Pattern observed:** several adjacent products with a "practice your own spelling words" capability —
[Home Spelling Words](https://www.homespellingwords.com/make-spelling-test-online),
[Spelling Test Buddy](https://spellingtestbuddy.com/blog/creating-online-spelling-tests-with-your-own-words/),
[ESLDesk's WordSpell](http://www.esldesk.com/spelling/word), and worksheet-generator tools like
[Education.com's Spelling Test Generator](https://www.education.com/worksheet-generator/reading/spelling-test/) —
place custom-list entry on a distinct page or flow (often behind login/account creation), not embedded
directly on their marketing homepage.

**Why this pattern exists for those products, not why it should be copied here (the task's own
instruction):** each of the products above is either account-gated (Home Spelling Words requires
login to save/manage lists), multi-mode (games, printable worksheets, and tests as separate
destinations that a single homepage widget genuinely could not represent), or teacher/classroom-
administration-oriented (list assignment, progress tracking) — none of which describes
SpellingWords.app, whose Constitution explicitly rejects accounts, gradebooks, and administrative
overhead (§2, §13). Those products route to a dedicated page because their custom-list feature is one
of *several* distinct modes needing its own space and its own account-scoped state — a genuinely
different problem shape than a single, stateless, no-account textarea. This is a case where the
common competitive pattern exists for reasons that don't transfer, which is exactly the kind of
finding the task asked this section to surface rather than a shallow "competitor X does A" match.

**General relevant reasoning, not competitor-specific:** homepages for narrowly-scoped, single-mode
interactive tools (a converter, a calculator, a single-purpose generator) commonly embed the tool
directly on the homepage precisely because there is no second mode competing for the same space — this
matches SpellingWords.app's actual shape (one interaction: type words, practice them) more closely
than the multi-mode competitors surveyed above.

This research was deliberately light, consistent with the task's own instruction that a full
competitive audit was not the goal.

---

## 11. Friction and repeat-use analysis

Exact task paths, as the task requests:

- **Model A:** Home → enter words → `/play`. Zero intermediate navigation.
- **Model C:** Home → Practice Your Own Words (dedicated page) → enter words → `/play`. One
  intermediate navigation, to a page whose content (per §9, item 2) would be materially identical to
  what Model A already shows on Home.
- **Model B (conceptual only):** Home → (compact interaction, possibly itself sufficient for very
  short lists, or an expand/continue step) → `/play`. Cost is genuinely between A and C and depends
  entirely on implementation choices this task is not permitted to make.

**Is one click "significant"?** In isolated UX terms, no — a single click is not a meaningful tax for
a deliberate, task-oriented visitor (the teacher persona in particular). But the correct comparison
is not "is one click costly in general," it is "does this specific click buy anything," and per §9
item 2, in the current feature set it does not — the destination page would show the same UI the
homepage already shows. A click that buys nothing is worse than a click that buys something small,
because it reads to a returning user as an unexplained detour rather than a deliberate step.

**Bookmarking / repeat use:** a teacher or parent who uses the tool regularly will bookmark whatever
URL gets them to a blank textarea fastest — under Model A that is the homepage itself (`/`), which is
already the URL every visitor's browser autocompletes to first; under Model C it would be a
new, less-memorable URL competing with the homepage for that same autocomplete slot. **Model A already
gives repeat users the shortest possible bookmarkable path for free, without any new route.** This
significantly weakens the "repeat users would bookmark the dedicated page anyway" argument sometimes
used to justify Model C — repeat users already have the shortest path, and Model C would not shorten
it further; it would only add a page for first-time visitors to pass through.

---

## 12. Future practice-workspace analysis

The task is explicit that the future feature list here (feedback settings, missed-word review,
targeted repetition, session completion/review, test mode, shareable/custom lists, local persistence,
skill-page-originated practice) is not approved and must not be designed. This section evaluates only
whether that *likely trajectory* changes today's placement decision.

**Distinguishing current / likely-future / speculative, as the task requires:**

- **Current need:** a single textarea and a submit button. Fully served by Model A today, with no
  ceiling being approached.
- **Likely future need (a claim this document treats as probable but not certain, based on the
  product's own stated direction toward richer feedback and review):** some amount of additional
  practice-setup surface — at minimum, missed-word review and "practice again" already exist *inside*
  `/play`'s results screen (`btn-retry`, `btn-choose-list` in `play.astro`, confirmed by reading the
  file), showing the product is already comfortable growing setup/review affordances *without* moving
  them onto the homepage. This is meaningful precedent: the pattern this codebase already uses for
  "the practice experience needs more surface area" is to grow `/play` itself (pre-session and
  post-session screens within the same route), not to spin up a second, separate entry page.
- **Speculative:** list management, sharing, saved lists, account-adjacent persistence. These would be
  the strongest genuine drivers toward a dedicated setup surface, because they involve state and
  interactions (a list of saved lists, a share action) that do not fit comfortably inside either the
  homepage hero or `/play`'s existing screen set. But per the Constitution (§13, "Privacy... Any
  future account system would require strong product justification") and CLAUDE.md ("No backend/
  database... future progress tracking is planned as `localStorage`"), none of this is committed
  product direction today — it is explicitly one of several "potential future improvements," not a
  roadmap item with a stated implementation intent.

**Does the likely future strengthen the case for a dedicated page? Partially, but not yet
decisively.** If richer setup genuinely arrives (multiple list-entry modes, saved-list management,
sharing), a dedicated workspace becomes structurally superior to cramming that into the homepage hero
— this document agrees with the task's own instinct here. But the evidence in this repository (the
existing `/play` pre/post-session screens already absorbing session-level complexity without a second
page) suggests the *first* place additional complexity would naturally land is `/play` itself, not a
new pre-`/play` page — meaning the dedicated-page trigger point is more specifically "the setup step
itself needs independent state or multiple distinct entry modes," not merely "the practice experience
gets richer in general." That trigger has not been reached. Building the dedicated page now, ahead of
a concrete feature that needs it, would be exactly the "premature implementation of every future
possibility" `CONSTITUTION.md` §12 warns against.

---

## 13. SEO / IA / URL analysis

**Researched, not fabricated:** a light search for "practice your own spelling words" / "custom
spelling practice" surfaces competitor pages built around exactly that intent (§10) — confirming the
*intent itself* is real and search-visible, addressed by multiple existing products. No search-volume
or ranking data was available through the tools used here, and none is asserted.

**Does the phrase deserve a distinct canonical URL, if the model were adopted?** This document does
not choose a slug (out of scope, and the task explicitly says not to freeze one), but evaluates the
concept: `PUBLIC_URL_ARCHITECTURE.md` establishes `/play` as strictly the active-session runtime (§3
audit) — no existing route currently represents "custom list setup" as distinct from "grade/skill
browsing" or "active practice." A concept like `/practice` would not collide with any existing route
today, and would sit conceptually parallel to `/skills` (a flat, grade-independent top-level path) —
technically clean, if it were ever needed.

**Should SEO drive this decision? No, and this document does not treat it as a deciding factor,**
consistent with both the task's explicit instruction (§13: "SEO must not be the primary reason to
create the route") and `CONSTITUTION.md` §15 ("SEO must not dictate the product... Pages should not be
created solely to target a keyword"). The homepage itself is already positioned, per its own
`<title>`/meta description, to own the broad "free spelling practice, K–5, by grade or skill" intent;
a separate custom-practice page would compete for a narrower, already-served slice of that same
intent rather than opening new territory, which is a weak SEO case even before the architectural
question is considered.

---

## 14. Analytics / experiment strategy (evaluated conceptually, not implemented)

If this question is revisited with production traffic in the future, the following instrumentation
would let it be answered with evidence instead of argument. **None of this is implemented by this
task.**

- **Funnel events:** homepage widget focus/first-keystroke rate; homepage "Start Practicing" click
  rate; `/play` session-start rate (words successfully decoded); `/play` session-completion rate.
- **Scroll depth:** percentage of mobile sessions reaching the Browse by Grade heading; percentage
  reaching Browse by Skill; correlated against whether the visitor ever interacted with the widget.
- **Grade/Skill engagement:** click-through rate on grade cards and the Skills CTA, segmented by
  whether the visitor used the widget first (tests whether the widget genuinely displaces curriculum
  discovery, or whether the two are simply used by different visitors on different visits).
- **Direct/return traffic to `/` specifically** as a proxy for whether repeat users already treat the
  homepage as their bookmarked entry point (supports or undercuts §11's bookmarking argument with real
  data instead of inference).

**A/B concept:** three arms — current Model A; a mobile-only compact-hero variant (a bounded, narrow
test of the presentation-layer fix suggested in §5, not full Model B); and, only if leadership decides
to reopen the frozen standard, a genuine Model C arm with a real dedicated page. Primary metric:
`/play` session-start rate per homepage visitor (does relocating or shrinking the widget change whether
people actually start practicing, not just whether they see more of the page). Secondary metric: grade/
skill click-through rate per homepage visitor (does it change discovery of the other two journeys).

**What evidence would actually change this document's recommendation:** a measured, meaningful drop
in grade/skill discovery specifically attributable to the widget's mobile footprint (not merely a
low baseline click rate, which could have many causes) — combined with confirmation that the
mobile-compact-hero variant above does *not* recover that discovery on its own. That combination would
be the first genuinely new evidence since the V2 pass and would justify reopening the frozen standard
through its own amendment process (§20).

---

## 15. Comparative scoring table

Explained tradeoffs, not an averaged score, per the task's own instruction.

| Criterion | Model A (current) | Model B (hybrid) | Model C (dedicated page) |
|---|---|---|---|
| Immediate usability | Strongest — zero setup, matches flagship framing | Weaker if any expand/continue step exists; parity with A only if truly zero-step | Weakest — one navigation before the same UI Model A shows immediately |
| Homepage product clarity | Good on desktop; weaker on first-mobile-screen | Potentially better on mobile if genuinely compact; net effect implementation-dependent | Strongest in isolation, but only by removing the flagship interaction's dominance |
| Mobile UX | Confirmed vertical-space cost (§5) | Best case improves this; worst case adds complexity without shrinking footprint | Best mobile-homepage economy, worst mobile-task economy (extra tap before typing) |
| Curriculum discoverability | One scroll away, correctly labeled once reached | Same as A if hybrid stays homepage-resident | Best, since homepage devotes more space to it |
| Skill-library discoverability | Same profile as curriculum discoverability | Same as A | Best, same reasoning as curriculum row |
| Repeat-user convenience | Best — `/` is already the shortest bookmarkable path (§11) | Comparable to A if hybrid remains on `/` | Worse — competes with `/` for the bookmark slot, no net gain shown |
| Teacher/parent convenience | Strong for both; teachers additionally served by curriculum visibility one scroll down | Same, contingent on implementation | Marginally better for deliberate teacher use; worse for first-time parent trust-building (§4) |
| Student usability | Strongest — least prose, single obvious action | Comparable if compact form stays a single step | Weaker — adds a step before the single obvious action |
| Future practice-engine scalability | Bounded by homepage tone/space constraints if setup grows substantially | No inherent advantage over A unless the "continuation" surface is itself a real dedicated page (collapses into C) | Strongest, but only once a concrete feature needs it (§12) — not yet |
| Information architecture | Consistent with `CONSTITUTION.md` §3.1 and the frozen standard as written | Ambiguous — risks two interfaces for one task (§18) | Fails the architectural test on independent value/pass-through today (§9) |
| Accessibility | No issue identified — same interaction, same accessible markup regardless of model | No inherent difference | No inherent difference |
| SEO/search-intent value | Homepage already owns the broad intent; no measured gap identified | No inherent difference | Real but narrow intent exists (§13); not a deciding factor by design |
| Implementation complexity | None — no change | Real design and build cost, output uncertain | Real cost: new route, new tests, new nav decision, standard amendment |
| Maintenance complexity | Lowest — one interaction, one surface | Higher — two related surfaces to keep consistent | Moderate — one clean surface, but two "practice" entry points (`/`'s promise + the new page) to keep from drifting apart |
| Visual-redesign flexibility | High — §10 of the frozen standard already reserves this freedom | No inherent difference | No inherent difference |

---

## 16. Risks and tradeoffs

- **Risk of the status-quo recommendation:** confirming Model A without a corresponding action item
  could read as declining to engage with a genuine, evidenced mobile problem (§5, §6). This document
  mitigates that by explicitly separating "should the widget move" (no) from "should the widget's
  mobile footprint shrink" (plausibly yes, and permitted under the frozen standard's own presentation-
  independence clause, §10) — see §20 for the concrete, in-scope next step this distinction implies.
- **Risk of the standard being wrong, not just unchallenged:** the V2 reopening pass is recent and
  rigorous, but it is not infallible, and this document's own confirmation of its conclusion should
  not be read as proof the conclusion is permanently correct — only that no new evidence surfaced here
  contradicts it (§14 states what would).
- **Risk of Model B as a "safe middle ground" trap:** the task's own §18 flags this, and this
  document's §8 analysis concurs — a hybrid chosen to avoid a hard choice, rather than because it
  independently clears a bar neither endpoint clears, is a real anti-pattern this document explicitly
  declines to fall into.
- **Risk to future scalability if Model A is over-defended:** if the practice-setup experience does
  need a dedicated workspace later (§12), waiting too long to build it could mean retrofitting under
  time pressure rather than designing it deliberately. This is mitigated by treating §12's trigger
  condition (a concrete feature requiring independent state or multiple entry modes) as the thing to
  watch for, not a fixed timeline.

---

## 17. Recommendation

**RECOMMENDATION: KEEP FULL PRACTICE WIDGET ON HOMEPAGE**

**Confidence: HIGH** for the structural question (should the widget remain directly hosted and
dominant) — this is grounded in explicit, recently-reaffirmed frozen authority, not this document's
own preference. **MODERATE** for the adjacent claim that no presentation-layer change is warranted —
the mobile vertical-space finding (§5) is real and this document does not claim it is fully solved by
today's implementation, only that the fix belongs at the presentation layer, inside Model A, not at
the architectural layer.

**The three strongest reasons:**

1. `CONSTITUTION.md` §3.1 and `CANONICAL_HOMEPAGE_STANDARD.md` §5.1/§3 already require exactly Model
   A, in explicit language ("flagship homepage experience"; "hosted directly... not merely linked to";
   "MUST remain the dominant, most immediately available action"), and the standard's own supporting
   research (V2, dated after the current build existed to critique) already re-examined this specific
   question and reaffirmed it, calling it "correct" and finding "no reason to disturb it."
2. Applying the task's own required architectural test to Model C (§9) shows it fails on independent
   value and the no-gateway/pass-through rule *today*, with the current feature set — not on
   friction, which is where most homepage debates focus. A page that shows the same textarea one click
   later is the specific anti-pattern the Constitution's own §11 already names and rejects.
3. Repeat-use analysis (§11) shows Model A already gives the highest-frequency users (parents,
   teachers with a recurring list) the shortest possible bookmarkable path — the homepage itself —
   undercutting the strongest practical argument usually made for a dedicated page (that repeat users
   would prefer to skip past homepage content).

**The strongest argument against this recommendation:** the confirmed mobile product-perception risk
(§5, §6) is real, not hypothetical, and a determined critic could reasonably argue that "one scroll
away" is not actually a small cost on a phone, especially for the exact visitors (curriculum-seekers,
skill-seekers) the site most wants to convert into feeling this is a serious educational resource, not
a one-trick tool. This document's response is that the evidence supports a presentation-layer fix
(shrink the widget's mobile footprint) over a structural fix (relocate it), but a reasonable reviewer
could weigh that same evidence differently, particularly if a future analytics pass (§14) shows the
mobile discovery gap is larger than assumed here.

**What to do next before any implementation:** nothing in this document authorizes changing
`src/pages/index.astro`, `CANONICAL_HOMEPAGE_STANDARD.md`, or `CONSTITUTION.md`. If the mobile-space
concern is judged worth acting on, the correct next step is a narrowly-scoped presentation-layer
proposal (tighter default textarea height/sample-word count on small viewports) evaluated against
§10 of the already-frozen standard — not a reopening of §5.1's dominance requirement. If, instead, a
future reviewer believes the structural question itself should be reopened (Model B or C), that
requires an explicit amendment to both `CONSTITUTION.md` §3.1 and `CANONICAL_HOMEPAGE_STANDARD.md`
§3/§5.1/§7, following the amendment standard `CONSTITUTION.md` §20 already defines — identify the
principle being changed, state the evidence, update both documents together, not implementation first.

---

## 18. Confidence level

**HIGH** on the structural recommendation (Model A over B or C), because it is derived from explicit
frozen authority already reasoned through once, not from this document's independent judgment alone.
**MODERATE** on the finer-grained claim that no visible-page change is warranted at all — see §16 and
§17's "strongest argument against" for the specific place a future reviewer could reasonably disagree.

---

## 19. What evidence could change the recommendation

- Analytics (§14) showing a measured, meaningful drop in grade/skill discovery attributable to mobile
  widget footprint specifically, not explained by a low baseline engagement rate generally.
- A concrete, approved future feature (not currently approved — see §12) that genuinely needs
  independent setup state or multiple entry modes the homepage hero cannot reasonably host — at that
  point Model C's architectural-test failure on "independent value" (§9, item 2) would resolve in its
  favor.
- Evidence that repeat users are *not*, in practice, using `/` as their bookmark (contradicting §11's
  assumption) — e.g., if analytics showed most returning practice sessions arrive via `/play` directly
  with a saved payload rather than via `/`, the repeat-use argument for Model A would weaken.
- A future amendment to `CONSTITUTION.md` §3.1 itself, made deliberately and for a stated reason
  (per §20's own amendment standard) — at which point this document's central premise (that Model A is
  currently mandated, not merely favored) would need to be re-evaluated from scratch rather than
  reused.

---

## 20. Architectural/documentation implications if adopted

Because the recommendation is to keep the current architecture, there are **no required changes** to
`CONSTITUTION.md`, `CANONICAL_HOMEPAGE_STANDARD.md`, `PUBLIC_URL_ARCHITECTURE.md`, `CONTENT_MODEL.md`,
navigation, `/play`, or any route.

The one **optional, clearly in-scope** follow-up this research surfaces, consistent with §10 of the
already-frozen standard ("presentation independence... does not prescribe... spacing"): a future
visual-design pass specifically reducing the widget's default mobile vertical footprint (e.g., a
shorter default textarea row count and/or fewer pre-filled sample words on narrow viewports) — a
change that requires no standard amendment because it does not touch content semantics, the widget's
directness, or its dominance, only its presentation. This is explicitly **not** authorized or designed
by this document; it is named here only as the most proportionate next step if the mobile concern that
motivated this whole research task is to be acted on.

---

## 21. Next step

1. Share this document for human review alongside the two existing homepage research documents it
   builds on.
2. If the mobile-footprint concern (§5, §16, §20) is judged worth acting on, scope a narrow,
   presentation-only visual-design task against `CANONICAL_HOMEPAGE_STANDARD.md` §10 — separate from
   this research and from any architectural change.
3. If a future reviewer disagrees with this document's structural conclusion, the correct venue is an
   explicit amendment proposal against `CONSTITUTION.md` §3.1 and `CANONICAL_HOMEPAGE_STANDARD.md`
   §3/§5.1/§7 together, following `CONSTITUTION.md` §20's amendment standard — not a unilateral
   implementation change.
4. No code, route, navigation, or frozen-document change should follow from this document directly;
   it is a research record, not an approval.

---

**RECOMMENDATION: KEEP FULL PRACTICE WIDGET ON HOMEPAGE**

**Confidence: HIGH**

**Three strongest reasons:** (1) explicit, recently-reaffirmed frozen authority in both
`CONSTITUTION.md` §3.1 and `CANONICAL_HOMEPAGE_STANDARD.md` §5.1/§3 already requires this model; (2)
Model C fails the task's own required architectural test today, on independent value and the
no-gateway rule, not merely on friction; (3) Model A already gives repeat users (the group most often
cited to justify a dedicated page) the shortest possible bookmarkable path, undercutting that
argument.

**Strongest argument against:** the confirmed mobile vertical-space and product-perception cost (§5,
§6) is real, and a reasonable reviewer could judge "one scroll away" insufficient for curriculum- and
skill-seeking visitors — this document's answer is a presentation-layer fix, not a structural one, but
that is a judgment call, not a certainty.

**What to do next:** if pursued, scope a narrow mobile-footprint presentation change under the
existing frozen standard's presentation-independence clause; do not reopen the structural placement
question without an explicit, evidenced amendment to both `CONSTITUTION.md` and
`CANONICAL_HOMEPAGE_STANDARD.md` together.
