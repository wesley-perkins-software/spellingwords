# Homepage Content Standard — Research V2 (Reopening Pass)

**Status:** Research and recommendation only. Does not freeze a production standard and does not modify `CANONICAL_HOMEPAGE_STANDARD.md`. Written to be read alongside that document and its own research predecessor, `CANONICAL_HOMEPAGE_STANDARD_RESEARCH.md` ("v1/v2" below).

**Trigger:** The homepage was implemented to conform to the frozen standard. Seeing it rendered exposed a real problem: the page reads as too sparse, too generic, and too much like a custom-word practice widget to communicate that SpellingWords.app is also a structured K–5 curriculum and a 41-skill reference library. This document reopens the homepage's editorial decisions — including decisions the prior research treated as settled — evaluates them from first principles against the current implementation as new evidence, and proposes a complete replacement homepage narrative and copy.

---

## 1. Executive verdict

**The homepage is too sparse and needs substantial content revision. It is not fundamentally sound as copy, but it is fundamentally sound as architecture.**

The three-journey structure (Practice Your Own Words / Browse by Grade / Browse by Skill), the one-layer-deep linking rule, and the principle that the homepage must not reproduce a Grade Hub's or Skill page's actual explanations are all correct and should remain frozen. What failed is narrower and more specific than "the page is too short": the frozen standard drew its no-duplication line in the wrong place. It correctly protects deeper pages from having their *content* (explanations, sequencing, pattern instruction) duplicated, but it also — as an unnecessary side effect — bars the homepage from stating the *names* of the things it routes to. A visitor can be told "Browse by Grade" and "Browse by Skill" but not that grade practice includes Core Spelling, High-Frequency Words, and Themed Spelling Practice, and not that skill practice covers 41 skills across families like Vowel Teams or Prefixes. That is not a duplication-prevention rule; it is a naming ban, and it is the single biggest reason the page reads as thin. This document's central recommendation is to lift that specific ban while leaving everything else the ban was built alongside — the linking-depth limit, the rejection of full explanations, the rejection of FAQ/testimonials/audience-segmented sections — intact.

Secondary verdict: the current hero and trust section are weak on their own terms, independent of the naming question, and should be substantially rewritten.

---

## 2. Current homepage audit

| Block | Current content | Classification | Why |
|---|---|---|---|
| `<title>` / meta description | "Free Spelling Practice by Grade or Skill—No Account \| SpellingWords.app" / "Free spelling practice for children with no account required..." | KEEP BUT REWRITE | Structure and required keywords (free, no account, grade or spelling skill) are sound and test-locked in shape; "for children" should become "for K–5 students," see §3. |
| H1 "Practice spelling, starting now." | Hero heading | REPLACE | Test-locks only the fragment `Practice <span>spelling</span>`; that literal fragment is a design/brand element (the red "spelling" wordmark), not a content requirement. The full sentence around it undersells the product — see §5. |
| Hero paragraph | "Free spelling practice for children, with no account required. Use your own words or find structured practice from Kindergarten through 5th Grade by grade or spelling skill." | REPLACE | Not test-locked. "Find structured practice... by grade or spelling skill" is the exact spot where the product's real depth (curriculum + reference library) should be asserted and currently is not. |
| Custom-word practice card | Textarea + "Start Practicing →" | KEEP | §5.1 of the frozen standard requires this to remain the dominant, directly-hosted action. Nothing in this reopening challenges that requirement. |
| "Browse by Grade" H2 + one-line body + 6 grade cards | Bare grade labels only (Kindergarten, 1st Grade, ... 5th Grade) | KEEP BUT REWRITE | Heading and card count/links are test-locked and correct. The body copy and per-grade cards currently carry zero information beyond the label — this is the second biggest content gap. See §6. |
| "Browse by Skill" H2 + generic paragraph + single CTA | "Go directly to a known spelling sound, pattern, convention, or word-building concept—such as short vowels, prefixes, or homophones." | KEEP BUT REWRITE | Heading is test-locked and the single-destination-to-`/skills` rule is correct. The paragraph is accurate but reads as internal taxonomy language, not a reason to click. See §7. |
| "Simple, focused spelling practice" trust section (4 items: Free / No account / No gamification / Curated) | Four short trust facts | REPLACE | Not test-locked. Weakest section on the page — see §8. One fact ("curated and structured") is worth keeping in substance but not as a standalone card; the rest are true but not homepage-band-worthy on their own. |
| Product identity/scope statement (frozen standard §4 requirement) | Effectively absent — folded into the generic hero paragraph, never stated as a distinct claim | ADD | The frozen standard requires this as a distinct one-to-two-sentence claim. The current implementation blends it into the hero paragraph so thinly it doesn't register as a claim at all. |
| Named curriculum strands (Core Spelling / High-Frequency Words / Themed Spelling Practice) | Absent | ADD (reopened) | See §1 and §6. |
| Skill family names / 41-skill count | Absent | ADD (reopened) | See §7. |
| Audience-segmented sections (For Parents / For Teachers / For Students) | Absent | KEEP ABSENT | Evaluated in §3; prior rejection holds. |
| FAQ | Absent | KEEP ABSENT | Still correct — a homepage FAQ answers questions better answered by using the product, and it invites scope creep the site doesn't need. |
| K–5 progression map / full cross-grade sequence | Absent | KEEP ABSENT | Still correct — this is genuinely Grade-Hub/Gateway territory; see §6 for the boundary between "name the arc" and "map the arc." |
| Testimonials / stats / "trusted by" | Absent | KEEP ABSENT | No genuine data exists to support this; would violate the standard's own credibility requirements. |
| Internal linking depth (Grade Hubs + Skills Hub only) | Correct | KEEP | No evidence found to reopen this; see §11. |

---

## 3. Audience analysis

**Parent.** Arrives with a specific, often anxious trigger: a spelling list came home, a child is stuck on a pattern, a search for "3rd grade spelling words." A parent does not need to be taught what "Core Spelling" pedagogically means, but they benefit from seeing that grade practice isn't one undifferentiated pile of words — that there's a main sequence, everyday high-frequency words, and optional themed extras, because that distinction directly answers "is this list actually what my kid needs, or just something I found." A parent does not need jargon-free euphemism; they need three short, real nouns instead of the word "structured" doing all the work.

**Teacher.** Arrives wanting to know, fast, whether this is a serious resource or a gimmick site. Teachers are the audience most likely to be reassured, not overwhelmed, by specific curriculum language (grade progression, skill families) because it signals the site was built by someone who understands scope and sequence. Teachers are also the audience most likely to use Browse by Skill directly ("my class needs work on vowel teams") — so skill-family examples serve them more than any other group.

**Student.** Arrives with the least patience for prose and the most need for a single obvious next action. A student should be able to ignore all of the curriculum language entirely and still succeed: type or paste words, press start. This is why the practice interaction stays dominant and why curriculum/skill language must stay in short supporting text, never blocking the primary action.

**Decision: do not add "For Parents / For Teachers / For Students" sections.** The task explicitly asks this to be evaluated, not assumed. It fails on its own terms here: the three journeys already map cleanly onto what each audience wants (a parent wanting grade-appropriate words and a teacher wanting grade-appropriate words are doing the same click), so segmenting by audience would either duplicate the three-journey structure under new headings or force artificial differences between audiences who actually want the same thing. A single narrative that speaks in plain, non-condescending language serves all three without the redundancy. This matches the prior research's conclusion and there is no new evidence to overturn it.

**"Students" vs. "children":** recommend **"students."** "Children" is accurate but slightly infantilizing for the 4th/5th-grade end of the K–5 range and reads more like a marketing category than the product's own vocabulary; "students" is what teachers and the product's own content model already call this audience (see Constitution's "Grade Unit," "curriculum" language) and it is neutral enough not to feel clinical to a parent.

---

## 4. Product-positioning analysis

What SpellingWords.app is actually selling is **a single, unusually well-organized place to do all of a K–5 student's spelling work** — instead of the status quo, which is a parent or teacher improvising with a random Google result, a photocopied list, or a general ELA app that treats spelling as an afterthought to vocabulary and grammar. The product's real differentiators, in order of strength:

1. **Narrow focus.** It is only spelling — not vocabulary, not grammar, not reading comprehension. This is a genuine differentiator against IXL (spelling is one of many ELA categories) and against most general "language arts" sites.
2. **Two independent, complete organizing systems.** Most spelling resources are grade-first only, or skill-first only, or an unstructured search box. SpellingWords.app is deliberately both — a full K–5 grade path and a full skill library — and neither is a stub of the other.
3. **No friction.** No account, no login, works immediately with a student's own list.
4. **Calm design.** No gamification is a real product decision, not just an absence of features (see §8 on whether to sell this).

What it is *not* selling, and should not imply: efficacy claims ("proven," "research-based" without sourcing), completeness beyond spelling ("all your child's literacy needs"), or competitive/gamified motivation.

---

## 5. Hero analysis

The hero must answer, in the time it takes to glance: what is this, who for, what can I do, why stay. The current hero answers "what can I do" well (there's a working textarea right there) and "who for" adequately, but fails "what is this" — a visitor who doesn't read the full paragraph could reasonably conclude this is only a text-to-speech practice tool.

### Candidate directions

**A. Practice-first (status quo direction).** *"Practice spelling, starting now."* Strength: matches the dominant on-page action exactly, zero ambiguity about what happens when you scroll. Weakness: says nothing about curriculum depth; the word "spelling" appears but not what kind of resource this is; already tested as an approach and is the thing under review because it under-communicates.

**B. Learning + practice positioning.** *"Learn a spelling pattern, then practice it."* Strength: signals instructional depth, teacher-friendly. Weakness: overstates a "learn" step that isn't the homepage's actual first action (the homepage hosts practice directly, not instruction) — this would misrepresent what happens when a visitor uses the hero's own interaction, and risks implying a Skill-page detour before someone can practice their own list.

**C. K–5 curriculum positioning.** *"A complete K–5 spelling curriculum, plus practice for any list."* Strength: leads with the site's structural scope, appeals strongly to teachers. Weakness: "curriculum" is a heavier, more institutional word than the product's own tone elsewhere, and leading with grade structure buries the immediate-practice action, which the frozen standard (correctly) still wants dominant.

**D. "Your words or ours" positioning.** *"Practice any spelling list — yours, or ours from Kindergarten through 5th Grade."* Strength: cleanly states both halves of the product (custom + curated) in one sentence, keeps practice as the verb. Weakness: still doesn't surface the skill-library half of the product; reads as grade-only.

**E. Spelling-resource positioning (recommended).** *"Spelling practice, built to grow with your student."* — paired with a supporting sentence that does the naming work the H1 doesn't need to carry. Strength: keeps the H1 short, warm, and action-oriented (satisfies §5.1's practice-first requirement and preserves the existing test-locked "Practice ... spelling" wordmark treatment if desired, or can drop it — see recommendation below) while pushing the curriculum/skill claim into a hero paragraph built to carry it. Weakness: slightly more abstract than A or D on its own; depends on the supporting sentence actually landing.

### Recommendation

Keep a practice-first H1 (direction A/E hybrid) — the frozen standard's requirement that Practice Your Own Words remain the dominant, most immediate action is correct and this reopening found no reason to disturb it. But retire "starting now," which adds urgency without adding information, and let the hero paragraph carry the identity/scope statement explicitly instead of gesturing at "structured practice."

**Proposed H1:** "Practice spelling — your words, or ours."

**Proposed hero paragraph:** "Type or paste any list and start practicing in seconds, free and with no account. Or explore SpellingWords.app's structured spelling curriculum for Kindergarten through 5th Grade — Core Spelling, High-Frequency Words, and Themed Spelling Practice — or go straight to one of 41 spelling skills, from short vowels to Greek and Latin roots."

This single paragraph does the work the current implementation spreads thin across three under-informative sections: it states the free/no-account facts once (satisfying §6 trust requirements without a separate band for them), names the three strands (the reopened decision), and names the skill library's scope and range (the reopened decision) — all as a supporting sentence beneath a still-dominant practice action.

---

## 6. Curriculum communication analysis

**Should Core Spelling, High-Frequency Words, and Themed Spelling Practice be named on the homepage? Yes — reopening the prior "no" and reversing it, with a narrow scope.**

The prior research's reasoning for banning strand names was that naming them risks explaining them, and explaining them duplicates the Grade Hub. That reasoning conflates two different acts: **naming** (this grade's practice has three parts, called X, Y, and Z) and **explaining** (X works like this, Y is different from Z because...). The Grade Hub's actual job — per `CANONICAL_GRADE_HUB_STANDARD.md` — is the "concise summary of each of the three strands" and "brief cross-strand synthesis." The homepage doing neither of those, while still using the three correct nouns once, does not compete with the Hub's job; it makes the Hub's job legible before a visitor gets there. A visitor who has never heard the phrase "Core Spelling" has no way to know the Grade Hub is worth a click. This is the specific, non-generic reason the frozen standard's own §7 amendment clause asks for.

Guardrails to keep this from sliding into duplication:
- Name the three strands **once**, in a single sentence, with no adjective-per-strand explanation (no "Core Spelling teaches phonics patterns in sequence" — that's the Hub's sentence, not the homepage's).
- Do not state per-strand counts (51 Core units, 27 HFW sets, 27 Themed pages) — that is Gateway territory (`CANONICAL_GRADE_STRAND_GATEWAY_STANDARD.md` explicitly owns "complete numeric inventory").
- Do not describe the cross-strand relationship beyond what's already implicit in listing them in a stable order (Core, then High-Frequency Words, then Themed) — no "Core is primary, HFW is secondary" framing on the homepage; that judgment belongs to the Hub's required synthesis sentence.

**Should the K–5 developmental arc be communicated?** Partially, and only at the shallowest possible altitude. The task's example language ("progresses from foundational sound-spelling patterns into increasingly sophisticated... syllable knowledge, morphology, roots") is accurate to the curriculum but is exactly the "K–5 progression map" the frozen standard correctly bans as homepage content — it's Gateway/Hub-level detail. What the homepage can do instead is imply the arc through the per-grade teasers (below) without ever stating it as a standalone claim.

**Per-grade teasers.** The frozen standard already permits "one short differentiating phrase per grade" (§5.2) — this permission exists today and is simply unused. Recommended teasers, each short enough to sit under a grade card label without becoming a Hub-level summary:

| Grade | Card label | Teaser |
|---|---|---|
| Kindergarten | Kindergarten | Letters, sounds, and first words |
| 1st Grade | 1st Grade | Blends, silent e, and vowel teams |
| 2nd Grade | 2nd Grade | R-controlled vowels and longer words |
| 3rd Grade | 3rd Grade | Prefixes, suffixes, and homophones |
| 4th Grade | 4th Grade | Greek and Latin roots |
| 5th Grade | 5th Grade | Advanced patterns and academic words |

Each teaser names real, verifiable Grade Unit topics (cross-checked against the canonical Grade Unit table) without narrating the arc between grades, without claiming a sequence beyond what the card order already implies, and without touching strand structure (these are Core Spelling topics specifically, stated as plain descriptive phrases, not attributed to a named strand — attributing every grade's teaser to "Core Spelling" would be redundant once the hero has already named the three strands once).

**Recommended Browse by Grade section copy:**

> ## Browse by Grade
> Follow a Kindergarten–5th Grade spelling path built around Core Spelling, High-Frequency Words, and Themed Spelling Practice — a main sequence of spelling patterns, the everyday words students need most, and optional themed lists to explore.

(Grade cards + teasers as above follow beneath.)

---

## 7. Browse-by-Skill analysis

**What problem does this solve, per audience?** A parent whose child is stuck on one specific thing ("she keeps missing words with -tch") wants to skip grade browsing entirely. A teacher planning a small-group lesson on a single pattern wants the same. A student directed here by a teacher wants to find one named thing quickly. None of these are well served by the current paragraph, which describes the *category* of things Browse by Skill contains ("a known spelling sound, pattern, convention, or word-building concept") rather than making the destination sound concrete and substantial.

**Should the 41-skill count appear? Yes** — the frozen standard already explicitly permits this ("MAY state the real count... as a concrete orientation fact, not a promoted statistic," §5.3) and the current implementation simply doesn't use the permission. Stating "41 spelling skills" is not a promotional superlative; it's a factual scale signal that answers "is this a real library or three placeholder links."

**Should family names appear?** The prior research rejected naming all 12 families (correctly — that's a directory-scale block) and rejected a family list, plural, as "editorially arbitrary" and prone to drift. This document agrees with both of those specific rejections. But the current homepage already names individual *skills* as plain-text examples ("short vowels, prefixes, or homophones") — the standard explicitly allows this (§5.3: "a small number of representative spelling concepts... named as plain text"). The reopened recommendation is narrower than "name the families": **keep naming a handful of individual skills as recognition anchors, but choose ones that visibly span the range from early to advanced**, so the examples themselves imply breadth without listing any family as a structural category. This uses an already-approved mechanism more effectively rather than reopening the family-naming ban.

**Recommended examples:** short vowels (early), silent e (early-mid), vowel teams (mid), prefixes and suffixes (mid-late), Greek and Latin roots (late), homophones (cross-grade). Six examples, not three, because the goal here is explicitly to signal *range* across the K–5 span, which three similarly-weighted early-skill examples (the current "short vowels, prefixes, homophones") do not do as clearly.

**Recommended Browse by Skill section copy:**

> ## Browse by Skill
> Already know what to work on? Go straight to it. SpellingWords.app's skill library covers 41 spelling skills — from short vowels and silent e to vowel teams, prefixes and suffixes, Greek and Latin roots, and homophones — organized independently of grade level, so you can find the right practice whether it's this year's lesson or something from a grade behind or ahead.

The closing clause ("whether it's this year's lesson or something from a grade behind or ahead") is new and earns its place: it is the one sentence on the whole page that explains *why* a grade-independent system is useful, which is the actual product reasoning the current paragraph never states.

---

## 8. Trust/differentiation analysis

Evaluating each current fact on genuine homepage-worthiness rather than assuming the four-item structure survives:

1. **Free to use.** Matters, but as a fact, not a section — a parent deciding whether to keep scrolling needs to know this in one glance, not read a card about it. Already stated in the hero paragraph recommendation (§5); does not need its own band.
2. **No account required.** Same treatment as free — folded into the hero paragraph. Genuinely load-bearing (removes the single biggest hesitation for a parent evaluating an unfamiliar site with a child), but a one-clause mention accomplishes everything a card would.
3. **No competitive gamification.** This is real and differentiating relative to most gamified ed-tech, but stated as a bare negative ("no timers, points, streaks") it reads as a feature-absence list, not a value. It is worth one sentence, reframed as what the site *does* instead of what it lacks (calm, focused, no pressure) rather than an itemized absence.
4. **Curated and structured.** This is the fact that actually matters most and was the weakest-worded of the four ("editorially curated and organized for focused practice" says nothing a skeptical reader couldn't already assume). This is the fact that should anchor whatever replaces this section, because it's the one that supports the identity/scope claim rather than merely building generic trust.

**Should this section communicate instructional philosophy?** Yes, in one short passage, not a doctrine statement. The genuine, defensible claim (already implicit in the site's architecture, not invented for marketing) is: spelling is learned through a real progression of patterns, not a random word list, and this site's structure — grade sequence plus a skill library — exists because of that. This is not a "proven methodology" claim (which the standard correctly bars without sourcing); it's a description of what the site's own organization already demonstrates.

**Recommendation: replace the four-card "Simple, focused spelling practice" band with a shorter, two-part closing section** — one short paragraph carrying the structure/philosophy claim, plus a compact trust line (not four cards) for free/no-account/no-gamification. This demotes items 1–3 to a supporting role and promotes item 4 to the section's actual point, matching the task's own instinct that these four facts don't individually justify a major band.

**Recommended replacement copy:**

> ## Spelling, taught the way it's actually learned
> Spelling isn't a random list of words to memorize — it's built from patterns that build on each other, grade after grade. SpellingWords.app is organized the same way: a structured path by grade, a full library of individual skills, and space to practice any list a student is working on right now. It's free, requires no account, and has no timers, points, or competitions — just focused practice.

This keeps every fact from the original four items (free, no account, no gamification, curated/structured) but reorders their weight so the structural claim leads and the trust facts close as a single supporting sentence rather than four equal-weight cards.

---

## 9. Competitive / marketplace findings

Light research only; kept clearly separated from SpellingWords-specific conclusions.

**Evidence found:**
- IXL organizes its language-arts practice primarily by skill, not by a sequential curriculum, spans Pre-K–12, and treats spelling as one category among many (phonics, grammar, vocabulary, writing conventions) rather than a first-class subject. *(Source: IXL spelling pages, via web search.)*
- Learning A-Z's Vocabulary A-Z (successor product to the discontinued SpellingCity) is K–5-scoped like SpellingWords.app and explicitly organizes around vocabulary/spelling/phonics together, offering both premade and customizable lists with teacher-facing lesson materials. *(Source: Learning A-Z product pages, via web search.)*

**General UX/editorial reasoning (not competitor-specific):** Both products above lean teacher-facing and multi-subject; neither is a narrowly-scoped, parent-and-student-friendly, spelling-only resource with the specific dual grade+skill organization SpellingWords.app has. This is inference from the pattern, not a direct claim about either product's homepage copy (neither was reviewed for word-level content).

**Conclusion specific to SpellingWords.app:** The identified gap — a calm, narrowly-scoped, K–5-only spelling site organized simultaneously by grade and by independent skill, usable without an account by a parent or student directly — appears to be a genuine positioning opportunity based on this limited research, not a crowded space SpellingWords.app needs to differentiate hard against. This supports leading hero copy with scope and simplicity (§5) rather than competitive comparison language, which the standard already (correctly) bars.

This research was deliberately light — a full competitive audit was out of scope for this task and was not requested.

---

## 10. SEO / GEO / AEO implications

**Researched vs. inferred, kept separate:**

- **Researched (from repository):** the current meta description already requires the literal keywords "Free," "no account required," and "grade or spelling skill" (test-locked in `homepage.test.ts`). This is an existing, verified constraint this document's copy proposals must satisfy.
- **Inferred (editorial reasoning, not measured):** a homepage that names "Core Spelling," "High-Frequency Words," "Themed Spelling Practice," and states "41 spelling skills" gives both traditional search engines and answer-engine summarizers concrete entities to associate with the domain, beyond the generic phrase "structured practice" currently used. This is a plausible, not measured, benefit — no click-through or ranking data supports a specific claim, and none should be asserted.
- **Topical territory the homepage should establish (inference, standard SEO practice, not SpellingWords-specific research):** "K–5 spelling," "spelling practice," "spelling words by grade," "spelling skills," and the specific strand/family nouns above, stated naturally within the sentences already proposed — not as a keyword list or hidden block. No changes recommended to JSON-LD scope (§8 of the frozen standard's restrictions — WebSite + ItemList only, no FAQPage/Organization/SearchAction) since none of the new copy changes what structured data should claim.

Nothing here requires reopening §8 (metadata/structured data) of the frozen standard. The reopened content changes are additive to visible copy only.

---

## 11. Target homepage semantic architecture

Presentation-independent section order and purpose:

1. **Hero / Practice Your Own Words.** Dominant, directly-hosted action (unchanged requirement). Supporting copy carries the identity/scope statement, naming both curriculum strands and skill-library scope in one sentence (§5).
2. **Browse by Grade.** Heading, one orienting sentence naming the three strands once, six grade cards each with a short differentiating teaser (§6).
3. **Browse by Skill.** Heading, coequal document weight with Browse by Grade (heading-level parity per the frozen standard, unchanged), one orienting sentence stating the 41-skill count and six range-spanning example skills as plain text, plus the grade-independence rationale (§7).
4. **Closing / trust and philosophy.** One short section carrying the structure-not-random-list claim plus a compact free/no-account/no-gamification trust line (§8). Replaces the four-card band; not a fifth major section, closes the page.

No new sections beyond a reordering/rewriting of the four that already exist. No FAQ, no audience-segmented sections, no testimonials, no progression map, no "recently added" or "popular" content — all confirmed absent per §3, §6, §8.

---

## 12. Proposed homepage copy (top to bottom)

**Title tag:** Free K–5 Spelling Practice by Grade or Skill—No Account | SpellingWords.app
*(adds "K–5" for clarity; keeps every currently-required keyword)*

**Meta description:** Free spelling practice for K–5 students, no account required. Practice your own words, follow a structured curriculum by grade, or go straight to a spelling skill.
*(retains "Free," "no account required," "grade or spelling skill" in required order/shape)*

**H1:** Practice spelling — your words, or ours.

**Hero paragraph:** Type or paste any list and start practicing in seconds, free and with no account. Or explore SpellingWords.app's structured spelling curriculum for Kindergarten through 5th Grade — Core Spelling, High-Frequency Words, and Themed Spelling Practice — or go straight to one of 41 spelling skills, from short vowels to Greek and Latin roots.

**Primary CTA:** Start Practicing →
**Secondary link:** or browse structured spelling practice ↓ *(unchanged; still anchors to Browse by Grade)*

**Browse by Grade — H2:** Browse by Grade
**Browse by Grade — body:** Follow a Kindergarten–5th Grade spelling path built around Core Spelling, High-Frequency Words, and Themed Spelling Practice — a main sequence of spelling patterns, the everyday words students need most, and optional themed lists to explore.

**Grade cards (label / teaser):**
- Kindergarten / Letters, sounds, and first words
- 1st Grade / Blends, silent e, and vowel teams
- 2nd Grade / R-controlled vowels and longer words
- 3rd Grade / Prefixes, suffixes, and homophones
- 4th Grade / Greek and Latin roots
- 5th Grade / Advanced patterns and academic words

**Browse by Skill — H2:** Browse by Skill
**Browse by Skill — body:** Already know what to work on? Go straight to it. SpellingWords.app's skill library covers 41 spelling skills — from short vowels and silent e to vowel teams, prefixes and suffixes, Greek and Latin roots, and homophones — organized independently of grade level, so you can find the right practice whether it's this year's lesson or something from a grade behind or ahead.
**CTA:** Browse Spelling Skills →

**Closing section — H2:** Spelling, taught the way it's actually learned
**Closing section — body:** Spelling isn't a random list of words to memorize — it's built from patterns that build on each other, grade after grade. SpellingWords.app is organized the same way: a structured path by grade, a full library of individual skills, and space to practice any list a student is working on right now. It's free, requires no account, and has no timers, points, or competitions — just focused practice.

No further closing content recommended beyond this (no secondary CTA, no additional band) — the page ends here, consistent with the "shortest, least detailed page in the hierarchy" principle the roadmap correctly assigns to the homepage layer even under this expanded copy.

---

## 13. Current vs. proposed comparison

| Element | Current | Proposed | Net change |
|---|---|---|---|
| H1 | "Practice spelling, starting now." | "Practice spelling — your words, or ours." | Same practice-first intent; drops empty urgency, adds "ours" to signal curated content exists |
| Hero paragraph | Generic "structured practice... by grade or spelling skill" | Names all 3 strands + 41-skill count | Strand names and skill count now stated, once |
| Browse by Grade body | One generic sentence | One sentence naming the 3 strands | Strand names added here too (reinforces, doesn't duplicate — same single mention pattern) |
| Grade cards | Bare labels | Labels + 6 short teasers | New content, permitted but previously unused |
| Browse by Skill body | Category description, 3 early-skill examples | Purpose statement + 6 range-spanning examples + 41-skill count | Count added; examples chosen to signal K–5 breadth |
| Trust section | 4-card band, 4 separate facts | 1 philosophy paragraph + inline trust clause | Consolidated; "curated/structured" promoted to the section's actual point; free/no-account/no-gamification demoted to one clause |
| Internal linking depth | Grade Hubs + Skills Hub only | Unchanged | No change |
| JSON-LD scope | WebSite + ItemList only | Unchanged | No change |

---

## 14. Anti-patterns — explicitly not recommended

- Naming per-strand counts (51/27/27) or Gateway-level "where to begin" guidance on the homepage — still Gateway territory.
- Listing all 12 skill families as a structural taxonomy block — still rejected; only individual skill *examples*, chosen for range, are recommended.
- A full K–5 progression narrative paragraph — the per-grade teasers imply the arc without stating it as a claim.
- Audience-segmented "For Parents / For Teachers / For Students" sections.
- FAQ, testimonials, unverifiable statistics, "popular lists/skills," "recently added," or any competitive-comparison language.
- Restoring the four-card trust band structure — the facts survive, the card format does not.
- Any pedagogical-methodology label ("science of reading," "structured literacy") without a sourcing basis this repository does not currently have.
- Deep-linking from primary content to individual Gateways, Grade Units, or Skill pages — the one-layer-deep rule is unchanged and this document's proposals do not require any new links, only new text.

---

## 15. Repository conflicts

This document's central recommendation — naming Core Spelling, High-Frequency Words, and Themed Spelling Practice, and stating the 41-skill/12-family count — **directly conflicts with two provisions of the currently-frozen `CANONICAL_HOMEPAGE_STANDARD.md`:**

- **§4** (identity/scope statement): "This statement MUST NOT... name individual Grade-Strand Gateways, strands (Core Spelling / High-Frequency Words / Themed Spelling Practice), or Skill families by name."
- **§9** (anti-patterns): bars "the 12-family Skill taxonomy, or any individual family's orientation copy" and, by the same logic applied in §4, would currently read strand-naming anywhere on the page as out of scope even outside the identity statement specifically.

This document does **not** propose naming the 12 families as a taxonomy (it recommends naming individual skills as examples, which §5.3 already permits) — so the conflict is narrower than the full anti-pattern list suggests, but it is real and direct on the strand-naming point, and it is a genuine, deliberate reversal of both `CANONICAL_HOMEPAGE_STANDARD.md` §4 and the reasoning in `CANONICAL_HOMEPAGE_STANDARD_RESEARCH.md` §6.2, §6.3, §8, and §24, which explicitly rejected strand-naming as Grade-Hub-owned duplication. This document argues (§6 above) that naming without explaining is not the duplication the prior research was protecting against, and that the frozen standard's own §7 amendment clause anticipates exactly this kind of stated-reason reopening.

No conflict was found with `CONSTITUTION.md`, `CONTENT_MODEL.md`, `PUBLIC_URL_ARCHITECTURE.md`, or `SKILLS_ARCHITECTURE.md` — none of those documents prohibit naming strands or skills in prose; the prohibition originates entirely in the homepage-specific standard and its research.

---

## 16. Recommendation for the existing frozen standard

**Amend, not rewrite or supersede.** The frozen standard's architecture (three journeys, one-layer-deep linking, no-FAQ/no-testimonial/no-progression-map rules, JSON-LD scope, coequal Grade/Skill heading structure) remains correct and should stay frozen exactly as written. The amendment needed is narrow and localized:

- **§4:** remove the clause barring strand and Skill-family names from the identity/scope statement; replace with explicit permission to name the three strands once, without per-strand explanation or counts.
- **§5.2:** no structural change needed — the "one short differentiating phrase per grade" permission already covers the recommended teasers; only the guidance note should point out this permission exists and is expected to be used.
- **§5.3:** no structural change needed — permission to name representative skills and state the real count already exists; recommend adding guidance that examples should be chosen to span the K–5 range, not cluster at one difficulty level.
- **§9:** narrow the anti-pattern from "must not name... strands... or Skill families by name" to "must not enumerate the full 12-family taxonomy or any family's orientation copy" — preserving the ban on the *taxonomy as a structural block* while removing the ban on the *three strand nouns* and *individual skill names already permitted elsewhere in the standard*.
- **§6:** should note that the "structured, curated content" trust fact may be expressed as part of a philosophy statement rather than a standalone itemized fact, matching §8's recommendation.

No changes recommended to §1–§3, §5.1, §7, §8, §10, §11.

---

## 17. Next step

This document requires human review and an explicit decision on the §4/§9 reversal specifically — it is the one recommendation here that cannot be implemented without a conscious amendment to a frozen document, and it should not be treated as pre-approved by virtue of being well-argued. If approved:

1. Amend `CANONICAL_HOMEPAGE_STANDARD.md` per §16 above (separate task).
2. Implement the proposed copy in `src/pages/index.astro` (separate task), including updating the non-test-locked hero paragraph, Browse by Grade/Skill body copy, grade-card teasers, and replacing the trust band.
3. Update `homepage.test.ts` only where the new copy requires it — note that most proposed changes (hero paragraph, section bodies, trust section) are **not** currently test-locked and require no test changes; the H1 fragment, both H2 exact texts, title tag, and meta-description keyword requirements should be re-verified against the exact proposed strings in §12 before implementation, since minor wording differences (e.g. "K–5" in the title) may require a corresponding test update.
4. This document does not touch production code, the frozen standard, curriculum content, or any Grade Hub/Gateway/Skill standard — all such changes remain explicitly out of scope until the above review occurs.

---

**HOMEPAGE CONTENT RESEARCH V2 COMPLETE — READY FOR REVIEW**
