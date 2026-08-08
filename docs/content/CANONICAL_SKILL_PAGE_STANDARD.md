# Canonical Skill Page Standard — spellingwords.app

*Status: canonical editorial standard. Governs the writing and review of content for canonical Skill pages. Does not redesign, retaxonomize, or re-route anything.*

---

## 1. Status, purpose, and authority

This document governs **editorial content** for the 41 canonical Skill pages defined in `docs/architecture/SKILLS_ARCHITECTURE.md`. It answers *what should be on a Skill page and how should it read* — never *which pages exist, what they're called, or where they live*.

**Frozen and out of scope for this document** (subordinate to these for any question of page existence, identity, URL, role, or placement):

- `docs/architecture/SKILLS_ARCHITECTURE.md` — the 12-family, 41-slot taxonomy, titles, slugs, family membership.
- `docs/architecture/PUBLIC_URL_ARCHITECTURE.md` — routes and canonical URLs.
- `docs/planning/K5_FINAL_CONTENT_ARCHITECTURE.md` — the Grade Hub architecture and K–5 curriculum.
- `docs/architecture/CONTENT_MODEL.md` — content identity (Skill vs. Grade Unit vs. High-Frequency Word Set, etc.) and the Skill/Grade Unit relationship model.

If applying this standard ever seems to require a new page, a slug change, a taxonomy change, or a Grade Unit rewrite, that is a signal the standard is being misapplied — stop and flag it rather than making the change.

**How this document relates to the rest of the editorial system:**

- **`docs/content/CONTENT_IMPROVEMENT_ROADMAP.md`** owns scope, phase sequencing, priority, and the page-level definition of done (§8 of the roadmap). This standard owns *what "done" looks like for a Skill page's content specifically* — it is the detailed specification the roadmap's Phase 1 points to.
- **`docs/content/inventory/skill-pages.md`** is the per-page tracking surface (id, title, slug, source file, editorial status). This standard adds two more per-page facts the inventory tracks: instructional variant and content-brief status (§21, §8 below).
- **`docs/architecture/SKILLS_ARCHITECTURE.md`** decided *that* these 41 pages exist and what they're called. This standard decides *what they say*.
- **The Grade Unit layer** (`CONTENT_MODEL.md` §3, roadmap Layer 2) is explicitly out of this standard's authority — Grade Unit prose, word selection, and pacing are untouched by anything here. §2 below defines the boundary precisely.

This document authorizes nothing beyond editorial content: no visual redesign, no new pages, no slug or taxonomy changes, no Grade Unit rewrites, no schema changes. Where the standard's recommendations exceed current technical capability, §18 documents that as a gap, not as license to build it here.

---

## 2. Skill-page purpose and boundary

A **Skill page** is the canonical, grade-independent explanation of one spelling concept. Per `CONTENT_MODEL.md` §3, a Skill exists to provide "reusable focused concept practice" — its primary user is a parent or teacher who wants to understand and teach a pattern, not a student mid-lesson at a specific grade.

**A Skill page answers:**
- What is this concept?
- How does it work?
- What should the learner notice?
- What are representative examples?
- What mistakes or overgeneralizations should an adult watch for?
- How can an adult teach or practice it?
- What concepts are related?

**A Grade Unit page answers** (untouched by this standard — for contrast only):
- What does this grade practice?
- Why was this word set selected at this level?
- How does the concept fit the grade sequence?
- What curricular practice should the learner complete?

**Prohibited:** a Skill page must not become a grade-specific lesson, must not adopt one grade's framing as if it were universal, and must not duplicate a Grade Unit's full practice treatment (§5). Per `CONTENT_MODEL.md` §3, a Skill's word set is a *demonstration*, not a *Practice Set* — it does not launch the practice experience and must never read as a second assignment. Where a Skill page and a Grade Unit page cover the same pattern, they must read as complements (roadmap §2's "one most at risk of duplication" rule): the Skill page is the durable "what and why," the Grade Unit is "what for this grade, right now."

---

## 3. Universal Skill-page framework

Every canonical element below applies across all 41 Skill pages. Each is labeled:

- **Required** — every Skill page needs this.
- **Required when applicable** — needed whenever the underlying fact exists for that Skill (e.g. a real exception), omitted otherwise.
- **Optional** — strengthens a page but is not mandatory.
- **Not applicable for some variants** — genuinely doesn't fit certain variants; see §4.

These are content elements, not a mandated visible heading sequence — recommended order and default flow are §6's job, not this list's. A content-model-fit tag shows whether the repository already supports the element today:
- **Supported now** — an existing schema field or template section carries it.
- **Supported through Markdown** — no dedicated field exists, but it belongs in the entry's Markdown body under the existing rendering.
- **Future component opportunity** — the repository has no current mechanism for this; documented as a gap, not built here.

| Element | Requirement | Content-model fit |
|---|---|---|
| Canonical title and page identity | Required | Supported now — `title`, `id`, `urlSlug` (frozen by `SKILLS_ARCHITECTURE.md`, not editorial) |
| Direct answer near the top | Required | Supported now — `shortAnswer` |
| Immediately useful instructional resource (demonstration set) | Required | Supported now — `words` (§5) |
| Bounded scope statement | Required | Supported through Markdown |
| Precise explanation of the concept | Required | Supported through Markdown |
| Organized examples (instructional example system) | Required | Supported through Markdown (§5, §8) |
| Explicit learner-attention statement ("what to notice") | Required | Supported through Markdown |
| Meaningful distinctions, mistakes, or exceptions | Required when applicable | Supported through Markdown (§9) |
| Concise teaching routine | Required | Supported through Markdown (§10) |
| Diagnostic response for a struggling learner | Required | Supported through Markdown (§10) |
| Observable signs the skill is becoming secure | Required | Supported through Markdown (§11) |
| Curriculum placement ("where this fits") | Required when applicable | Supported now — reverse `skillIds` lookup, template's "Where this fits in the curriculum" section |
| Related canonical Skills | Required when applicable | Supported now — `relatedLists`/`prerequisiteLists`/`nextLists` |
| Selective FAQs | Optional | Supported now — `faq` |
| Source attribution | Required when applicable | Supported now — `canonicalSource` |
| Editorial reviewer and meaningful review date | Required when the real editorial process supports it | Future component opportunity — no dedicated reviewer or review-date field exists today (§14, §17) |
| Metadata (title tag, description) | Required | Supported now — `Layout.astro`'s `title`/`description` props, sourced from `data.title`/`data.description` |
| Structured data | Required when applicable | Partially supported — `BreadcrumbList` and `FAQPage` exist; `WebPage`/`Article`/`LearningResource` do not (§18) |

**Gap found during the Short I/O/U implementation (documented for the next Skill family, not yet resolved here):** "Curriculum placement" is computed entirely from the *Grade Unit* side — a Skill only gets a "Where this fits in the curriculum" section if some published Grade Unit's `skillIds` array names it. `CONTENT_IMPROVEMENT_ROADMAP.md` §13 scopes a Skill-family batch to "the Skill pages only... not their corresponding Kindergarten Grade Units," which reads as license to leave Grade Units untouched. But Short A's and Short E's Kindergarten Grade Units already carried `skillIds` back to their Skill (added incidentally during those earlier batches), while Kindergarten Short I/O/U did not — so, without a fix, three of the five reference-quality Skill pages in this same family would have silently rendered with an empty curriculum-placement section despite the element being "Required when applicable" and clearly applicable. This PR added the missing one-line `skillIds` back-reference to the three Kindergarten Grade Unit files (no other change to those files) to close the gap for this batch. **Recommendation:** future Skill-family batches should explicitly verify, as part of the audit step, that every in-scope Skill already has at least one resolvable reverse `skillIds` link before drafting — and the Roadmap's per-family scope note should say so, since "Skill pages only" should not be read as "the Grade Unit `skillIds` field is off-limits even when it's the only thing a required element depends on."

---

## 4. The four instructional variants

Every live Skill belongs to exactly one of four variants, or to the documented Multisyllabic Words hybrid (§4.5). Variant assignment for all 41 slots is in §21.

A variant is a **content shape**, not a rigid template — a variant's "required middle-page elements" are what §3's universal elements look like *for that kind of concept*; they replace, not duplicate, the generic list in §3.

### 4.1 Variant 1 — Sound–spelling patterns

**Canonical Skills:** Short Vowels and CVC Words (5), Consonant Digraphs (4), Consonant Blends (2), Silent E (4), Vowel Teams (8), R-Controlled Vowels (3). 26 of 41 slots.

**Linguistic focus:** one or more closely related speech sounds and the spelling pattern or letter sequence being taught, including cases where a spelling has multiple common pronunciations (e.g. OO Words) or where the component consonant sounds remain audible (e.g. consonant blends, where each letter still represents its own sound, unlike a digraph's single fused sound).

**Required middle-page elements:**
- The target sound or sound relationship, described in plain terms a parent can say aloud (not just IPA).
- The target spelling(s), and — where the family has more than one spelling for the sound (e.g. AI/AY, OI/OY) — the spelling-choice condition (word position, neighboring letters).
- Explicit sound-versus-letter-name framing wherever confusion is likely (short a vs. the letter name "a").
- Pronunciation/hearing guidance an adult can use with a child (e.g. "stretch the word and listen to the middle sound").
- Representative word groupings (§8), not an alphabetical dump.
- A contrast with the pattern's nearest neighbor (e.g. short a vs. short e; OI/OY vs. OU/OW).
- Regularity and bounded exceptions, sized by the three-level system in §9.

**Useful example formats:** minimal pairs, sound-first word lists grouped by spelling, "listen and compare" contrasts.

**Common mistakes to avoid:** conflating a letter's name with its sound; treating a spelling choice as arbitrary when it's actually conditioned by position; listing exceptions before the regular pattern is secure.

**Variant-specific editorial checks:** does the page let a parent *hear* the difference, not just read about it; is the neighboring-pattern contrast present where confusion is common; are irregular or borderline words kept out of the demonstration set (§8)?

**When sections may be omitted:** pages that teach only one spelling within their bounded instructional scope — such as the canonical Short A page's focus on the letter *a* — can omit the spelling-choice-condition element entirely, since there is no choice to explain within that scope. They must not imply that the page catalogues every possible spelling or pronunciation found elsewhere in English.

### 4.2 Variant 2 — Spelling conventions and rules

**Canonical Skills:** Common Spelling Patterns family (`ck-tch-dge-word-endings`, `silent-letters`, `soft-c-soft-g`), `plurals`, `ed-and-ing`, `suffix-spelling-changes`. 6 of 41 slots.

**Linguistic focus:** a condition that determines a spelling decision or transformation, not a single fixed sound.

**Required middle-page elements:**
- The condition(s) that trigger the rule (e.g. "double the final consonant when a short-vowel, one-syllable word ends in a single consonant").
- The transformation itself, shown before-and-after (*run → running*).
- When the convention applies, stated as a positive rule.
- When it does not apply, stated as an explicit boundary — not just implied by silence.
- Before-and-after word pairs, grouped by which condition they illustrate (§8).
- Common overgeneralizations (a child applying the rule where it doesn't belong) — this is usually the page's most valuable Level 1/2 content (§9).

**Useful example formats:** two-column before/after tables, grouped by triggering condition rather than alphabetically.

**Common mistakes to avoid:** presenting the rule as universal without its condition; omitting the negative case (when the rule doesn't apply); mixing multiple unrelated conventions on one page without clearly separating them (see `suffix-spelling-changes`, which already separates doubling, e-dropping, and y-to-i as three distinct conditions).

**Variant-specific editorial checks:** can a parent apply the condition test to a brand-new word after reading the page; is the overgeneralization risk named explicitly rather than left implicit?

**When sections may be omitted:** a convention with essentially no exceptions (e.g. -s/-es plural spelling for regular nouns) can compress the exceptions element to a brief note rather than a full Level 2 treatment.

### 4.3 Variant 3 — Morphology and word structure

**Canonical Skills:** `common-suffixes`, `compound-words`, `contractions`, `un-and-re-prefixes`, `common-prefixes`, `greek-and-latin-roots`. 6 of 41 slots.

**Linguistic focus:** morphemes — base words, roots, prefixes, suffixes — and how they combine to build spelling and meaning.

**Required middle-page elements:**
- The base word or root, isolated clearly from the affix.
- The morpheme's meaning (a prefix or suffix's meaning, a root's meaning) — this is the element that most distinguishes Variant 3 from Variant 2's purely mechanical transformations.
- How the parts combine to build the whole word (word equations: *un- + happy = unhappy*).
- Spelling or meaning changes at the boundary, where relevant (cross-reference `suffix-spelling-changes` rather than re-explaining it, per §12).
- Representative word families sharing the same morpheme.
- Meaning transfer — showing that knowing one root/affix unlocks multiple words.

**Useful example formats:** word equations, root/affix + meaning tables, word families grouped by shared morpheme.

**Common mistakes to avoid:** treating a morphological pattern as a spelling-only rule and skipping meaning; conflating "base word" (a word-formation term) with "root" (a morphological/etymological term) — see §7's terminology rules; presenting a root's family as exhaustive.

**Variant-specific editorial checks:** does every example word's meaning connection to the morpheme actually hold up (§8's conceptual-fit screen is stricter here — "hidden morphology" is a named risk); is base word vs. root used correctly and consistently?

**When sections may be omitted:** single-morpheme families with no productive combination pattern (rare in this taxonomy) could compress the word-equation element, but none of the current 6 slots need this.

### 4.4 Variant 4 — Meaning and usage distinctions

**Canonical Skills:** `homophones`, `commonly-confused-words`. 2 of 41 slots.

**Linguistic focus:** choosing the correct spelling based on meaning or grammatical role, not sound or word-building.

**Required middle-page elements:**
- Brief definitions for each word in a confusable set.
- Grammatical role, when it's the actual distinguishing factor (e.g. *their* is possessive, *there* is locative, *they're* is a contraction).
- Sentence context showing each word used correctly.
- A contrast table or side-by-side listing of the confusable set.
- A decision method — a question the learner can ask themselves to pick the right spelling.
- Meaning-based memory support (a mnemonic tied to meaning, not just sound).
- Editing or sentence-completion practice guidance.

**Useful example formats:** contrast tables (word / meaning / example sentence), fill-in-the-blank sentence pairs.

**Common mistakes to avoid:** listing words with no sentence context; relying on sound-based tricks when the actual confusion is meaning-based; treating `homophones` (true sound-alikes) and `commonly-confused-words` (meaning/usage confusions that are not true homophones — see `SKILLS_ARCHITECTURE.md` §3's scope boundary) as interchangeable.

**Variant-specific editorial checks:** does every confusable pair get a real sentence, not just an isolated definition; is the decision method concrete enough that a child can apply it independently?

**When sections may be omitted:** grammatical-role framing can be dropped for confusable pairs where the distinction is purely semantic (e.g. *accept*/*except*) rather than grammatical.

### 4.5 Hybrid — Multisyllabic Words

`multisyllabic-words` is a documented **hybrid**, not a fifth formal variant — the frozen taxonomy defines it as a single skill spanning multiple analysis strategies (`SKILLS_ARCHITECTURE.md` §2, §4), and nothing in that architecture calls for a fifth variant slot.

It combines, per its required named sections (Open Syllables, Consonant-LE, from `SKILLS_ARCHITECTURE.md` §3):
- **Syllable structure** (Variant-1-like): syllable types, how to divide a word into syllables.
- **Sound–spelling analysis** (Variant-1-like): how vowel sound changes with syllable type (open vs. closed).
- **Meaningful word parts** (Variant-3-like): where a multisyllabic word is also morphologically complex, note the overlap rather than re-deriving morphology from scratch.
- **Flexible word-analysis strategies**: a decision process for approaching an unfamiliar long word (chunk by syllable, look for known parts, check for affixes).

Author this page using Variant 1's example-and-contrast conventions for syllable-type content and Variant 3's word-equation conventions where morphology is genuinely present, rather than inventing new conventions. Do not split it into two pages or promote it to a fifth variant.

---

## 5. Immediate instructional resource

Three distinct kinds of word content exist across the site. They are easy to conflate; keeping them distinct is the main defense against a Skill page turning into an unstructured word dump or a duplicate Grade Unit.

1. **Demonstration set** — the small, controlled word list in a Skill entry's `words` field. Per `CONTENT_MODEL.md` §3, "the smallest set that clearly teaches the concept, not a target word count," deliberately smaller than a Practice Set and explicitly *not* one — it does not launch the practice experience (`CONTENT_MODEL.md` §4). Rendered by the existing `WordListPreview` component.
2. **Instructional example system** — the fuller set of examples, tables, contrasts, word families, or diagrams used in the Markdown body to actually teach the concept (§8). This is where most of a Skill page's examples should live — not in `words`.
3. **Grade practice list** — a Grade Unit's practice set (8–16 words per `CONTENT_MODEL.md` §3), which belongs entirely to Layer 2 and is out of this standard's authority.

**Explicit rules:**
- These sets may overlap. A word may legitimately anchor both a Grade Unit's Practice Set and its Skill's demonstration when it's genuinely one of the clearest examples (`CONTENT_MODEL.md` §3).
- They do not need to be identical, and usually won't be.
- The Skill page must **not** duplicate a Grade Unit's complete practice treatment — that violates the Skill/Grade Unit boundary in §2.
- The Skill page must still provide enough examples, via its instructional example system, to satisfy the topic's full informational intent — the demonstration set alone is not sufficient content.
- Giant, unstructured word dumps are never acceptable, in the demonstration set or the instructional example system. Every list must be curated and grouped instructionally (§8).
- Not every Skill page launches practice — per `CONTENT_MODEL.md` §4, the practice experience is reached only through a Grade Unit's Practice Set; a Skill routes there via its curriculum-placement links. Do not add or imply a direct "practice these words" action for a Skill page's demonstration set — the current template correctly omits the practice CTA on Skill pages, and content must not work around that.

---

## 6. Content-order guidance

Recommended default editorial flow (not a mandatory identical heading sequence — see §3):

1. Direct answer
2. Immediately useful examples or instructional display (demonstration set)
3. Explanation of how the concept works
4. What the learner should notice
5. Relevant distinctions or mistakes
6. Teaching and practice routine
7. Signs the concept is becoming secure
8. Curriculum placement
9. Related concepts
10. Residual FAQs

**Current rendering reality vs. this recommendation:** today's `[category]/[slug].astro` template renders, in fixed order: Breadcrumbs → Hero → `shortAnswer` block ("What are {title}?") → readiness signals (rare on Skills) → word list ("Hear the pattern in these words") → Markdown body (single "Understanding the pattern" heading) → "Where this fits in the curriculum" → FAQ → related/next cards → source attribution. That is **implementation reality**, not this standard's required structure. The template's single generic "Understanding the pattern" heading is where items 3–7 above currently have to live as sub-headings within one Markdown body section; it does not mean this standard only requires one section. Where the template's fixed order and this standard's recommended flow diverge (e.g. curriculum placement rendering after the body rather than near the end of it), follow this standard's content organization *within* the Markdown body and treat the template's section order as a future implementation opportunity (§18), not a reason to compress content.

**Note on the generated direct-answer heading:** the current automatically generated "What are {title}?" heading may not read naturally for every variant (e.g. it fits "What are Short A Words?" better than it fits a Variant 2/3/4 concept phrased as a rule or distinction rather than a noun phrase). Authors should still write `shortAnswer` as a direct response to the concept regardless of how the surrounding heading reads; improving the generated heading logic is a future template opportunity, not something this task or a content draft should work around.

---

## 7. Writing and terminology standards

**Voice:** calm, capable, parent-friendly, educationally precise. Written to the adult helping a child, not to the child. Neither clinical (dense linguistics jargon with no support) nor childish (talking down, gamified tone) — see `CLAUDE.md`'s "Warm Workbook" aesthetic and no-gamification rule, which governs prose tone here exactly as it governs UI.

**Paragraph and sentence standards:**
- Short paragraphs (2–5 sentences); one idea per paragraph.
- Sentences should be readable aloud in one breath; avoid stacked subordinate clauses.
- Define technical terms at first use, in the same sentence or the next one — never assume prior knowledge of *phoneme*, *digraph*, *syllable*, *base word*, *prefix*, *suffix*, *morpheme*, *closed syllable*, or any other term used.

**`shortAnswer` must stand alone:** `shortAnswer` renders before the Markdown body and is the unit most likely to be read in isolation — by a reader who never scrolls further, a search snippet, or an AI system quoting or summarizing the page. Because of that, every term used inside `shortAnswer` must already be defined or avoided within `shortAnswer` itself; do not introduce a technical term there and rely on a later body section to complete the explanation. (The Short A page's first draft introduced "closed-syllable (CVC)" in `shortAnswer` without unpacking it — the definition didn't arrive until several body sections later, which meant the answer failed the standalone test even though the full page was accurate.)

**Presentation format:** prose is the default, but use a short bullet list, checklist, or compact table where it genuinely improves scanning — observational lists (e.g. "what to notice," "signs the pattern is becoming secure"), minimal-pair or before/after comparisons, and word groupings are the clearest cases. This is guidance, not a mandated structure: don't convert working prose into bullets purely to break it up, and don't let a page become entirely bulleted.

**Terminology precision — do not loosely interchange:**
- *Sound* and *letter*. A sound is heard; a letter is written. "The short a sound" and "the letter a" are not interchangeable.
- *Silent e* and *vowel-consonant-e (VCe)*. "Silent e" names what's silent; VCe names the spelling pattern. Use consistently within a page; if both are used, define the relationship once.
- *Base word* and *root*. A base word is a word-formation term (a whole word an affix attaches to, e.g. *happy* in *unhappy*); a root is a morphological/etymological term, often not a standalone word (e.g. *-spect-* in *inspect*). Variant 3 pages must not use these interchangeably (§4.3).
- *Phonographic word family* (words sharing a rime, e.g. *-at*: cat, hat, bat) and *morphological word family* (words sharing a morpheme, e.g. *nation, national, nationality*). These are different groupings and must be labeled as what they are.

**Sound and letter notation:**
- When notation helps, use the notation most understandable for the audience and define it. Parent-facing phonics notation such as `/ă/` may be used for accessibility; IPA such as `/æ/` may be added where greater linguistic precision is useful. Always pair either notation with a familiar example word, such as "the vowel sound in *cat*."
- Letters/spellings referenced as letters should be visually distinguished from words (e.g. italics or quotation marks — match existing page conventions, such as `short-a-words.md`'s *c... a... t* stretching example).

**Capitalization:** Skill titles and canonical concept names follow `SKILLS_ARCHITECTURE.md`'s exact casing (e.g. "Short A Words," not "short a words," when referring to the canonical Skill); mid-sentence references to the sound or letter itself are lowercase ("the short a sound").

**Dialect and accent notes:** where a pattern's pronunciation genuinely varies by dialect (e.g. some vowel-team or r-controlled distinctions), say so briefly rather than presenting one accent as the only correct pronunciation. This is a Level 3 nuance (§9) in most cases — a short note, not an extended treatment.

**Conditional language and unsupported universal claims:** avoid "always," "never," "every," and "all children" outside of genuinely exceptionless statements. Prefer bounded phrasing ("most," "typically," "in this word set"). This mirrors the roadmap's existing definition-of-done rule (`CONTENT_IMPROVEMENT_ROADMAP.md` §8: "no unsupported universal claims").

---

## 8. Example and word-list standards

Screen every candidate example for:
- Conceptual fit — does it actually illustrate the target pattern, not a near-miss?
- Familiarity — is it a word an elementary-aged child (or the parent reading with them) is likely to know?
- Instructional usefulness — does it teach something the neighboring examples don't already show?
- Distracting untaught patterns — does the word introduce a second, unrelated difficulty (e.g. an untaught vowel team appearing inside a consonant-blend example)?
- Irregular spelling — exclude words that don't actually follow the stated pattern, unless deliberately presented as a Level 2/3 exception (§9).
- Dialect sensitivity — avoid examples whose target sound only works in one regional accent, unless flagged as such.
- Hidden morphology — a word that looks like a simple phonics example but is actually morphologically complex (relevant especially to Variant 1/hybrid pages).
- Advanced clusters or endings that exceed the page's scope.

**Grouping:** group by whichever instructional feature is most useful for the variant — sound, spelling, word position, word family, syllable structure, base word, meaning, grammatical function, regularity, or difficulty (see each variant's "required middle-page elements" in §4). **Alphabetical order is appropriate only for lookup convenience, and only when it does not weaken instruction** — never as the primary organizing principle for teaching examples.

**Never claim completeness.** Do not use phrases like "complete list" or "every word with this pattern." Every list on these pages is representative and curated by design (§5).

---

## 9. Mistakes, boundaries, and exceptions — the three-level system

Adopt this caution ladder for every Skill page; the goal is preventing misconceptions without overwhelming the primary instruction.

- **Level 1 — Essential distinction.** Required whenever misunderstanding would damage the concept itself (e.g. short a vs. letter name; homophones vs. commonly confused words). Give this real space in the main explanation.
- **Level 2 — Common exception.** Include when a familiar elementary word or pattern could cause overgeneralization (e.g. a common short-vowel word that looks like it should follow a rule but doesn't). Give this a clearly labeled but brief treatment.
- **Level 3 — Advanced linguistic nuance.** Include only when needed, usually as a single brief note (e.g. a dialect variation, a rare exception unlikely to come up in elementary practice). Do not let Level 3 content crowd out Levels 1–2.

Do not include a level's content merely because it exists — include it because it prevents a real, likely misconception for this specific concept at this level.

---

## 10. Teaching routine and learner response

**One concise primary routine per page** (not a long menu of generic activities), adapted by variant from this default sequence:
1. Say or identify the target (sound, spelling, meaning, or word part).
2. Notice the defining feature.
3. Build, sort, or compare examples.
4. Read examples.
5. Spell or construct examples.
6. Use selected examples in context (especially important for Variant 4).

**Diagnostic response (required):** when a learner struggles, the page must guide the adult toward helping the learner isolate the specific difficulty — the sound, the spelling condition, the word part, or the context — rather than supplying the correct answer immediately. `short-a-words.md`'s existing practice tip ("read back exactly what was written... and let your child find the sound that needs fixing, rather than correcting the letter directly") is the model to follow.

---

## 11. Signs the skill is becoming secure

A brief, observable, grade-independent closing section. Possible evidence: identifying the target in a new example; reading an unfamiliar regular example; spelling representative examples from dictation; explaining the pattern or meaning in the learner's own words; applying the concept to a new word; choosing the correct word in context (Variant 4).

Use bounded language: "Signs the pattern is becoming secure include…" — never define universal mastery, grade promotion, or readiness criteria. **Do not map this section to `readinessSignals`.** That field is atypical on Skill pages (it's designed for a Grade Unit's "Is this the right list?" parent-facing check, per the template's conditional rendering) and the current schema does not require or expect it for Skills — write this section as Markdown prose, not frontmatter.

---

## 12. Internal-linking standard

Link only to canonical, active destinations — no invented destinations, no links to deprecated/legacy or unresolved content (`docs/content/inventory/deprecated-and-legacy-pages.md`, `untagged-and-data-quality.md`).

**Useful relationship types, mapped to existing fields:**
- Parent Skill family → contextual mention in prose; the Skills Hub (`src/lib/content/spellingSkills.ts`'s `SPELLING_SKILL_FAMILIES`) is the actual family-navigation surface, not a per-page field.
- Prerequisite concept → `prerequisiteLists`.
- Related concept → `relatedLists`.
- Logical next concept → `nextLists`.
- Relevant Grade Unit placement → automatic, via the reverse `skillIds` lookup (`curriculumPlacements` in the template) — a Skill page never declares this itself; it is derived from every Grade Unit that lists the Skill's id in its own `skillIds` (`CONTENT_MODEL.md` §3, §7).
- Contrast → prose reference to the neighboring Skill (e.g. Variant 1's "neighboring pattern contrasts," §4.1), which may or may not also warrant a `relatedLists` entry.

Every link must explain *why* the relationship matters in the surrounding prose — do not add a link purely to raise link count, and do not reuse an identical related-link block across every sibling in a family when the actual relationships differ (e.g. Short A's nearest contrast is Short E, not every other short vowel equally).

When prose names another canonical Skill (whether or not it's also linked via `relatedLists`/`prerequisiteLists`/`nextLists`), use that Skill's exact canonical title from `SKILLS_ARCHITECTURE.md` (e.g. "Long A Silent E Words," not a shortened "Long A Silent E") unless a specific readability reason justifies a deviation.

When a useful concept lacks a canonical standalone page (e.g. a sub-pattern folded into a larger Skill, like Open Syllables inside Multisyllabic Words), explain it locally in prose or link to the closest legitimate destination — never invent a page or link to something outside the 41-slot taxonomy.

---

## 13. FAQ policy

0–5 FAQs per page, using the existing `faq` field (which also drives `FAQPage` structured data). Every FAQ must add information not already adequately covered in the body, by doing at least one of:
- resolving a common misunderstanding;
- clarifying scope;
- addressing an important exception;
- helping an adult decide what to teach or do;
- answering a meaningful adjacent search intent.

**Prohibited:** repeating a definition, example, or explanation already given in the body — including restating the same example words in Q&A form, which is repetition even when it isn't a literal repeated definition; keyword-variant questions that exist only to catch search phrasing; questions manufactured to pad schema; forcing every page in a family to carry the same FAQ count. When a candidate FAQ turns out to duplicate the body, remove it rather than keep it to preserve a target count — there is no FAQ-count floor. FAQ content exists for user value — it is not a guaranteed rich-result tactic, and should never be treated as one.

---

## 14. Research, sourcing, and trust

This section applies the roadmap's research policy (`CONTENT_IMPROVEMENT_ROADMAP.md` §11) specifically to Skill pages, via an internal evidence ladder:

| Claim type | Verification need |
|---|---|
| Basic linguistic description (what the pattern is, how it's spelled) | Directly supportable from the repository and standard linguistic knowledge; no external check needed. |
| Instructional recommendation (how to teach/practice it) | Editorial judgment from this site's own pedagogical stance — label as guidance, not as a claimed universal fact. |
| Developmental or grade claim (when children typically learn this) | Check against authoritative literacy sources before publishing, unless the claim is scoped to this site's own frozen curriculum sequence (which needs no external check). |
| Frequency or prevalence claim ("most common," "most words with this pattern") | Requires verification or must be dropped — do not assert prevalence without a basis. |
| Etymological or historical claim (root origin, word history) | Requires verification — see `SKILLS_ARCHITECTURE.md` §3's existing safeguard for Greek and Latin Roots derived-word examples as the model. |
| Exception or dialect claim | Requires verification if presented as a general linguistic fact rather than this site's own bounded observation. |

**Restrained public sourcing:** attribute sitewide editorial methodology and reviewer/organization generically (e.g. "reviewed by the spellingwords.app editorial team") rather than naming unverifiable external credentials; keep a `dateModified`/last-reviewed date accurate (§17); cite direct sources only when a claim on the evidence ladder actually requires one. Internal content briefs (§20) may carry fuller sourcing notes than the public page. Do not require a citation for every basic definition or example — that would overengineer otherwise straightforward parent-facing content and reduce readability without adding meaningful trust.

**Review-language safeguard:** public authorship or review language must describe the real editorial process. Use "reviewed by the spellingwords.app editorial team" only after the page has completed the project's documented review workflow; do not add generic review claims merely as trust signals.

**On this standard's own research basis:** recommendations in this document originate from the project's internal Skill-page research review and are adopted here as project editorial policy — no external Deep Research artifact is preserved in this repository to cite directly (checked: no such file exists under `docs/`). Do not attribute claims in this standard, or in any Skill page written to it, to an unnamed or unverifiable external source.

---

## 15. SEO, GEO, AEO, and topical-authority policy

**Required:** direct answers; descriptive headings; accurate scope; concrete, curated examples; semantically complete coverage of the concept; logically grouped information; clear authorship/review signals where the content model supports them; meaningful internal links (§12); crawlable visible content (all of the above lives in visible Markdown/frontmatter, never hidden); structured data that matches visible content exactly (§18).

**Rejected, explicitly:** keyword stuffing; fixed word-count targets (§16); mass-generated interchangeable prose across sibling pages; artificial "AI chunk" formatting; repetitive question-headings used as a structural gimmick; hidden text aimed at crawlers or AI systems rather than readers; inflated FAQ sections (§13); treating a special AI-facing file as a ranking solution; fake or unverifiable citations (§14); writing structured data before the visible content it's supposed to describe (§18) exists.

**Governing principle:** these pages must be excellent educational resources first. Every technique above is a byproduct of doing the content right, not a target pursued independently of educational quality.

---

## 16. Length guidance

No quotas. These ranges are nonbinding planning guidance only — completeness and usefulness determine when a page is done, never a word count:

- Narrow Skill (e.g. a single sound-spelling pair with few exceptions): roughly 700–1,100 words.
- Moderately complex concept (e.g. most convention or morphology Skills): roughly 1,000–1,600 words.
- Broad reference topic (e.g. Multisyllabic Words, Vowel Teams' overview framing, Greek and Latin Roots): roughly 1,400–2,200 words.

A page that satisfies §3's required elements at 900 words is done; a page that hits 1,600 words while still missing a required element is not.

---

## 17. Metadata standard

**Current behavior** (documented, not changed by this task): `<title>` renders as `${data.title} — spellingwords`; the meta description renders `data.description` verbatim (not `shortAnswer`); canonical URL is auto-derived from the route path (`Astro.url.pathname`), with no manual override; both are emitted centrally by `Layout.astro`.

**Recommendations for future editorial passes** (do not implement live changes as part of this task):
- **H1:** should match the frozen `title` exactly — do not editorialize the H1 independently of the canonical title.
- **Title tag:** the current `${title} — spellingwords` pattern is acceptable; avoid adding keyword chains to the frontmatter `title` field itself, since `title` also drives the visible H1 and breadcrumb — a title tag written purely for search should not distort the reader-facing heading.
- **Meta description:** `description` should be a specific, natural summary of the page rather than a keyword list. It should complement, not mechanically duplicate, the visible `shortAnswer`. Because it currently feeds the meta tag directly, write it primarily as an accurate search-result summary.
- **Canonical topic naming:** stay consistent with the exact Skill title from `SKILLS_ARCHITECTURE.md` — do not introduce a synonym-based alternate name in metadata that isn't also used on the page itself.
- **`dateModified`-equivalent accuracy:** no field currently exists for this (§18 gap); when one exists, it must reflect genuine content review dates, not be refreshed artificially to appear current (§19).

---

## 18. Structured-data standard

**Current repository support** (verified in the template and `Layout.astro`): `BreadcrumbList` (always) and `FAQPage` (when `faq` is non-empty) are the only schema.org types emitted on Skill pages today. No `WebPage`, `Article`, or `LearningResource` type exists anywhere in the current implementation.

**Intended semantic approach, documented for future implementation — not built here:**
- **`WebPage`** is appropriate as the base type for every Skill page.
- **`Article`** may be appropriate for substantial authored explanatory content (true of essentially every Skill page under this standard). Future implementation should determine whether it is represented as the primary type, an additional type, or a related entity within the page graph. Do not assume that every Skill page needs both `WebPage` and `Article`.
- **`LearningResource`** is an optional semantic possibility, not an eventual requirement — appropriate only where it can be evaluated honestly and filled out from real page content (e.g. `teaches`, `educationalLevel`), never added by default.
- **`BreadcrumbList`** — already correctly implemented; no change needed.
- **Author or publisher** — should reflect the site's actual editorial process once §14's sourcing note exists as real content, not a placeholder.
- **Accurate dates** — `datePublished`/`dateModified` should be added only once the underlying field/process exists (§17 gap) — do not fabricate dates in schema that visible content doesn't support.
- **`about`** — should name the Skill concept itself, matching the page's actual `title`/`description`.
- **`teaches`** — appropriate for `LearningResource`, again only when genuinely supportable from body content.
- **`isPartOf`** — could reference the Skills Hub or family grouping once that relationship has a stable identifier to point to.
- **`educationalLevel`** — use only in a way that does not misrepresent a Skill's grade-independence; since Skills are explicitly not owned by one grade (`CONTENT_MODEL.md` §3), do not set a single rigid grade level here even though the frontmatter carries an incidental `grade` field for other purposes.

**Prohibited, regardless of future implementation:** `QAPage`, `Course`, `HowTo`, ratings/reviews, or any claimed standards alignment the site does not actually maintain. Structured data must always describe what's visibly on the page — never write schema ahead of the prose it's meant to describe.

**This is a documented gap for future implementation work, not something this task builds.**

---

## 19. Anti-patterns

- AI-style throat-clearing introductions ("In today's world, spelling is important...").
- Filler sentences that restate the concept without adding information.
- Keyword repetition beyond what natural prose requires.
- Synthetic comprehensiveness — padding to look thorough rather than being thorough.
- Identical visible scaffolding copy-pasted across every sibling page in a family, regardless of whether the relationships or exceptions are actually the same.
- Rule absolutism — stating a convention as exceptionless when it isn't (§9, §7).
- Exception overload — burying the core pattern under too many Level 2/3 caveats.
- Uncurated word lists / word dumps (§8).
- Memorization-only advice where a pattern is actually decodable (`short-a-words.md`'s existing "sounded out, not memorized" stance is the model).
- Unexplained jargon (§7).
- FAQ inflation (§13).
- Grade Unit duplication (§2, §5).
- Generic "why it matters" paragraphs that could apply to any Skill page interchangeably.
- Artificial freshness signals (a review date bumped with no actual review).
- Structured-data overengineering — adding schema types or properties the visible content doesn't support (§18).
- Hidden terminology inconsistency — using two terms for the same thing (or the same term for two things) across a page or a family without noticing (§7).

---

## 20. Page brief template

The copyable brief lives at `docs/content/templates/SKILL_PAGE_CONTENT_BRIEF.md`. Fill one out and get it approved (acceptance checklist below) before drafting any Skill page under this standard.

**Acceptance checklist — a brief is approved and ready for drafting when:**
- [ ] Instructional variant is assigned and matches §21's mapping table (or a documented, reasoned deviation is noted).
- [ ] Conceptual scope and out-of-scope concepts are both stated, and the boundary between them is unambiguous.
- [ ] The demonstration set is described and distinguished from the instructional example system (§5) — no plan to simply reuse a Grade Unit's Practice Set as-is.
- [ ] At least one Level 1 essential distinction is identified, if one exists for this concept (§9).
- [ ] A single primary teaching routine and a diagnostic response are both specified (§10).
- [ ] Canonical internal links are named and each has a stated reason (§12) — no placeholder "link to related Skills" without specifics.
- [ ] FAQ candidates, if any, each pass at least one test in §13 and are not duplicative of the planned body.
- [ ] Any claim requiring verification (§14) is flagged with what needs checking.
- [ ] Metadata and structured-data notes describe current-capability behavior accurately (§17, §18) rather than assuming unbuilt features.
- [ ] Duplication risk against the corresponding Grade Unit(s) has been explicitly considered, not just assumed away.
- [ ] Demonstration words and planned instructional examples have been screened for conceptual fit, distracting patterns, irregularity, dialect sensitivity, and hidden morphology under §8.

---

## 21. Variant mapping for all 41 canonical Skills

Source of truth for id/title/urlSlug/source-file cross-checked directly against `docs/content/inventory/skill-pages.md` and `docs/architecture/SKILLS_ARCHITECTURE.md` §3–4. All 41 taxonomy slots appear exactly once and are live. The two published non-taxonomy pages (`grade-4-final-stable-syllables`, `grade-5-spelling-rules`) are intentionally **excluded** from this mapping and settled as not canonical Skills; their stored `contentRole: skill` is a documented legacy-role exception, not a Skill-taxonomy claim — see `docs/content/inventory/skill-pages.md` for the resolution and why the frontmatter value is deliberately retained rather than corrected. `silent-e-long-e` is merged into the Silent E family overview, archived, and redirected.

| Canonical id | Title | Family | Variant | Status | Source file | Note |
|---|---|---|---|---|---|---|
| `short-a-words` | Short A Words | Short Vowels and CVC Words | 1 | Live | `src/content/spelling-lists/phonics/short-a-words.md` | Reference implementation — drafted and merged; see §22 |
| `short-e-words` | Short E Words | Short Vowels and CVC Words | 1 | Live | `src/content/spelling-lists/phonics/short-e-words.md` | |
| `short-i-words` | Short I Words | Short Vowels and CVC Words | 1 | Live | `src/content/spelling-lists/phonics/short-i-words.md` | |
| `short-o-words` | Short O Words | Short Vowels and CVC Words | 1 | Live | `src/content/spelling-lists/phonics/short-o-words.md` | |
| `short-u-words` | Short U Words | Short Vowels and CVC Words | 1 | Live | `src/content/spelling-lists/phonics/short-u-words.md` | |
| `digraph-ch-words` | CH Digraph Words | Consonant Digraphs | 1 | Live | `src/content/spelling-lists/phonics/digraph-ch-words.md` | |
| `digraph-sh-words` | SH Digraph Words | Consonant Digraphs | 1 | Live | `src/content/spelling-lists/phonics/digraph-sh-words.md` | |
| `digraph-th-words` | TH Digraph Words | Consonant Digraphs | 1 | Live | `src/content/spelling-lists/phonics/digraph-th-words.md` | |
| `digraph-wh-words` | WH Digraph Words | Consonant Digraphs | 1 | Live | `src/content/spelling-lists/phonics/digraph-wh-words.md` | |
| `beginning-blends` | Beginning Blends | Consonant Blends | 1 | Live | `src/content/spelling-lists/phonics/beginning-blends.md` | |
| `ending-blends` | Ending Blends | Consonant Blends | 1 | Live | `src/content/spelling-lists/phonics/ending-blends.md` | |
| `ck-tch-dge-word-endings` | CK, Double Letters, and TCH/DGE Word Endings | Common Spelling Patterns | 2 | Live | `src/content/spelling-lists/phonics/ck-tch-dge-word-endings.md` | Merges three prior conventions (final CK, FLOSS, TCH/DGE) — keep the three conditions clearly separated (§4.2) |
| `silent-letters` | Silent Letters | Common Spelling Patterns | 2 | Live | `src/content/spelling-lists/grade-level/silent-letters.md` | |
| `soft-c-soft-g` | Soft C and Soft G | Common Spelling Patterns | 2 | Live | `src/content/spelling-lists/phonics/soft-c-soft-g.md` | |
| `silent-e-long-a` | Long A Silent E Words | Silent E | 1 | Live | `src/content/spelling-lists/phonics/silent-e-long-a.md` | |
| `silent-e-long-i` | Long I Silent E Words | Silent E | 1 | Live | `src/content/spelling-lists/phonics/silent-e-long-i.md` | |
| `silent-e-long-o` | Long O Silent E Words | Silent E | 1 | Live | `src/content/spelling-lists/phonics/silent-e-long-o.md` | |
| `silent-e-long-u` | Long U Silent E Words | Silent E | 1 | Live | `src/content/spelling-lists/phonics/silent-e-long-u.md` | Long E Silent E is concise family-overview guidance per `SKILLS_ARCHITECTURE.md` §5, not a peer taxonomy slot; its source entry remains archived and redirected |
| `vowel-teams-ai-ay` | AI and AY Words | Vowel Teams | 1 | Live | `src/content/spelling-lists/phonics/vowel-teams-ai-ay.md` | |
| `vowel-teams-ee-ea` | EE and EA Words | Vowel Teams | 1 | Live | `src/content/spelling-lists/phonics/vowel-teams-ee-ea.md` | |
| `vowel-teams-oa-ow` | OA and OW Words | Vowel Teams | 1 | Live | `src/content/spelling-lists/phonics/vowel-teams-oa-ow.md` | |
| `oi-and-oy-words` | OI and OY Words | Vowel Teams | 1 | Live | `src/content/spelling-lists/phonics/oi-and-oy-words.md` | |
| `ou-and-ow-words` | OU and OW Words | Vowel Teams | 1 | Live | `src/content/spelling-lists/phonics/ou-and-ow-words.md` | |
| `ie-and-igh-words` | IE and IGH Words | Vowel Teams | 1 | Live | `src/content/spelling-lists/phonics/ie-and-igh-words.md` | Approved persisted brief completed before drafting. Grade Unit placement resolved as intentionally absent — no current Grade 1 or Grade 2 unit teaches the IE/IGH pattern, and no `skillIds` back-reference was fabricated to manufacture one. This is a settled, permanent state, not an open item pending a future decision. |
| `oo-words` | OO Words | Vowel Teams | 1 | Live | `src/content/spelling-lists/phonics/oo-words.md` | |
| `au-and-aw-words` | AU and AW Words | Vowel Teams | 1 | Live | `src/content/spelling-lists/phonics/au-and-aw-words.md` | |
| `r-controlled-ar` | R-Controlled AR Words | R-Controlled Vowels | 1 | Live | `src/content/spelling-lists/phonics/r-controlled-ar.md` | |
| `r-controlled-or` | R-Controlled OR Words | R-Controlled Vowels | 1 | Live | `src/content/spelling-lists/phonics/r-controlled-or.md` | |
| `r-controlled-er-ir-ur` | R-Controlled ER, IR, and UR Words | R-Controlled Vowels | 1 | Live | `src/content/spelling-lists/phonics/r-controlled-er-ir-ur.md` | |
| `multisyllabic-words` | Multisyllabic Words | Multisyllabic Words | Hybrid | Live | `src/content/spelling-lists/phonics/multisyllabic-words.md` | See §4.5; must include named Open Syllables and Consonant-LE sections per `SKILLS_ARCHITECTURE.md` §3 |
| `plurals` | Plural Words with -s and -es | Word Building and Endings | 2 | Live | `src/content/spelling-lists/grade-level/plurals.md` | |
| `ed-and-ing` | Words Ending in -ed and -ing | Word Building and Endings | 2 | Live | `src/content/spelling-lists/phonics/ed-and-ing.md` | |
| `common-suffixes` | Common Suffixes | Word Building and Endings | 3 | Live | `src/content/spelling-lists/grade-level/common-suffixes.md` | Decision: suffix *meaning* → Variant 3, distinct from `suffix-spelling-changes`' mechanical transformations (Variant 2). Cross-reference rather than re-explain (§12) |
| `suffix-spelling-changes` | Spelling Rules for Adding Suffixes | Word Building and Endings | 2 | Live | `src/content/spelling-lists/grade-level/suffix-spelling-changes.md` | Decision: mechanical base-word transformation conditions (doubling, e-drop, y→i) → Variant 2, not Variant 3 |
| `compound-words` | Compound Words | Word Building and Endings | 3 | Live | `src/content/spelling-lists/grade-level/compound-words.md` | |
| `contractions` | Contractions | Word Building and Endings | 3 | Live | `src/content/spelling-lists/grade-level/contractions.md` | |
| `un-and-re-prefixes` | Un- and Re- Prefixes | Prefixes | 3 | Live | `src/content/spelling-lists/grade-level/un-and-re-prefixes.md` | |
| `common-prefixes` | Common Prefixes | Prefixes | 3 | Live | `src/content/spelling-lists/grade-level/common-prefixes.md` | |
| `greek-and-latin-roots` | Greek and Latin Roots | Greek and Latin Roots | 3 | Live | `src/content/spelling-lists/grade-level/greek-and-latin-roots.md` | Apply `SKILLS_ARCHITECTURE.md` §3's classical-origin editorial safeguard to every derived-word example |
| `homophones` | Homophones | Homophones and Commonly Confused Words | 4 | Live | `src/content/spelling-lists/grade-level/homophones.md` | Scope: true sound-alikes only (`SKILLS_ARCHITECTURE.md` §3) |
| `commonly-confused-words` | Commonly Confused Words | Homophones and Commonly Confused Words | 4 | Live | `src/content/spelling-lists/grade-level/commonly-confused-words.md` | Scope: meaning/usage confusions that are not true homophones |

**Count check:** 26 (Variant 1) + 6 (Variant 2) + 6 (Variant 3) + 2 (Variant 4) + 1 (Hybrid) = 41 Live.

---

## 22. Short A worked brief

A completed example content brief for `short-a-words` lives at `docs/content/examples/SHORT_A_SKILL_PAGE_BRIEF.md`. It is an implementation planning document, not final public prose — drafting `short-a-words.md` itself was Phase 1 editorial work under the roadmap, not something this standard performs.

**Status:** `short-a-words.md` has since been drafted against this standard and merged. It is the project's first live Variant 1 implementation — treat the live file itself, not just the brief, as the concrete model for the remaining Variant 1 pages' structure, section flow, and tone. This is a pointer to the file, not a license to copy its exact word lists, headings, or FAQ content verbatim into a different Skill's page; each page's specifics still come from its own content, screened per §8.
