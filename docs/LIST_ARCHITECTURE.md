# List Architecture

> **Superseded.** Superseded for K–5 curriculum/list architecture decisions: use [K5_FINAL_CONTENT_ARCHITECTURE.md](./planning/K5_FINAL_CONTENT_ARCHITECTURE.md). Retain this document as historical taxonomy rationale.

> **The central question this document answers:**
> If a parent lands on spellingwords.app today, what families of lists should exist and how should they be organized?

---

## 1. Purpose

spellingwords.app began as a simple spelling test tool. A child types words they hear. No timers. No points. No pressure.

The word library began as a convenience — a few curated lists so families didn't have to paste their own. It is now something more ambitious: the beginning of a structured spelling curriculum for K–5 children.

This document describes the architecture of that curriculum. It is a planning document, not a finished specification. Some decisions are made here. Others are surfaced as tradeoffs and left open for the next planning stage.

**Who the curriculum serves:**

- Parents helping children practice spelling at home
- Teachers looking for classroom-ready lists
- Homeschool families who want organized, grade-appropriate content
- Children ages 5–11, learning to spell English words

The vocabulary foundation is now largely complete. The bottleneck is no longer words. The bottleneck is how to present them.

---

## 2. Current State

As of this writing, the project has:

| Metric | Count |
|---|---|
| Words in sentence bank | ~932 |
| K–1 words | 352 |
| Grade 2–3 words | 497 |
| Grade 4–5 words | Smallest band (underrepresented relative to lower grades) |
| Published lists | 32 |
| Estimated words surfaced | ~38% |

That means roughly **62% of the sentence bank is not yet in any published list.** Most of the undeployed vocabulary sits in the Grade 2–3 band, which has deep coverage but underrepresented list count relative to K–1.

Grade 4–5 remains the smallest band — thin by design, pending a second vocabulary expansion — but list architecture should not wait on that expansion. The architecture can be planned now and populated incrementally.

**Why architecture matters more than word expansion right now:**

More words added without more structure just deepens the invisibility problem. The sentence bank already has more vocabulary than the library can surface. Designing the list families first gives every future word a home.

---

## 3. Curriculum Layers

Before describing the list families, it helps to name the three distinct layers of the curriculum system. These layers are not yet fully separated in the codebase, but clarifying them here makes every future decision easier.

### Layer 1: Word Universe

The sentence bank. Every approved word, with at least one hand-written example sentence. Words exist here first.

- Source of truth for spelling and sentence content
- Words do not belong to any list; they live independently
- A word may appear in multiple lists without duplication conflict
- Governed by `WORD_UNIVERSE.md` and `SOURCE_MAP.md`

### Layer 2: List Library

Curated collections, visible to users in the library browser.

- The lists parents and teachers discover and assign
- Each list is a *view* of the Word Universe, not a container of words
- Quality, editorial voice, and curriculum alignment are enforced here
- Governed by `CONTENT_STANDARDS.md` and this document

### Layer 3: Learning Paths (future)

Structured progression through lists. A recommended sequence.

- Not yet implemented
- Would allow a parent to say: "Start here and work through this sequence"
- Could be as simple as a recommended order (e.g., Dolch Pre-Primer → Primer → First Grade) or as rich as a branching skill tree
- The architecture of the List Library should not block this layer — list families and slugs should be designed with eventual pathfinding in mind

**Why this matters:** Without this distinction, it is easy to conflate "adding a word to the bank" with "publishing it to users." The Word Universe is where vocabulary lives. The List Library is how curriculum is organized. Learning Paths are how progression is experienced. These are three different problems.

---

## 4. Proposed List Families

Eight families are discussed here. Not all should launch at the same time or with the same depth.

---

### Grade-Level Lists

**Educational purpose:** Grade-level lists are the backbone of any spelling curriculum. They give parents and teachers a clear answer to "What words should my second grader be practicing?" They align to school expectations without requiring parents to know phonics terminology.

**SEO value:** High. Parents search "2nd grade spelling words," "kindergarten spelling list," and similar phrases constantly. Grade-level pages indexed by Google can become the most-visited pages on the site. This is the highest-ROI category for organic discovery.

**Long-term maintenance burden:** Moderate. Grade-level vocabulary is relatively stable. Once a list is published and well-reviewed, it does not change frequently. The main maintenance risk is that the lists feel thin or incomplete — a grade with only two or three small lists reads as less authoritative than a grade with six or eight.

**Launch or later:** **Launch.** Grade-level is the first thing a parent reaching for a spelling app will look for. It must be present, even if not fully complete, at launch.

---

### Sight Words

**Educational purpose:** High-frequency words that children are expected to recognize and spell automatically. These do not decode phonetically — they must be memorized. They are foundational for early readers and writers.

**SEO value:** High. "Dolch sight words," "Fry sight words," and "kindergarten sight words" are among the most-searched spelling-related terms online. Parents and teachers know these names. This category has strong brand recognition in the education market.

**Long-term maintenance burden:** Low. The Dolch and Fry lists are stable, well-known, and finite. Once published, these lists require almost no editorial maintenance.

**Launch or later:** **Launch.** Sight words may be the single most-recognized category to parents of early readers. They should be present and complete at launch.

---

### Phonics Lists

**Educational purpose:** Pattern-based decoding lists. Rather than organizing by grade or frequency, phonics lists group words by the spelling pattern being practiced: short vowels, silent-e long vowels, vowel teams, blends, digraphs, r-controlled vowels. These serve children who are learning *how English works*, not just which words to memorize.

**SEO value:** Moderate to high. "Short vowel spelling words," "silent e words," and "vowel team practice" are searched by teachers, tutors, and parents familiar with phonics instruction. The audience is somewhat more specialized than grade-level search, but the intent is strong.

**Long-term maintenance burden:** Low to moderate. Phonics patterns are stable and well-documented. The main editorial burden is ensuring the word selection genuinely illustrates the target pattern without contaminating it with exceptions.

**Launch or later:** **Launch.** Phonics lists are already the best-developed category in the current library (9 published lists). They should remain prominent and grow at launch.

---

### Challenge Words

**Educational purpose:** Upper-level enrichment for strong spellers, gifted students, or children who have outpaced their grade-level lists. These words are typically longer, less phonetically predictable, or drawn from academic and literary vocabulary.

**SEO value:** Moderate. Parents searching for "hard spelling words" or "advanced spelling lists" represent a real segment. Less volume than grade-level or sight words, but meaningful.

**Long-term maintenance burden:** Moderate. Challenge content requires more editorial judgment — the bar for what counts as "challenging but fair" is less standardized than phonics patterns or grade expectations.

**Launch or later:** **Launch, but limited.** A few well-curated challenge lists signal that the library extends past early grades. They do not need to be a full family at launch — two to four lists are sufficient.

---

### Morphology

**Educational purpose:** Prefixes, suffixes, Greek roots, Latin roots. Morphology instruction teaches children that words are built from parts — that *un-* means "not," that *-tion* signals a noun, that *bio-* relates to life. This is vocabulary-building as much as spelling instruction.

**SEO value:** Moderate, long-tail. Parents and teachers searching for "prefix spelling words," "Latin root words for kids," and similar terms are highly motivated. This content also establishes topical authority in a way few competitors have done well.

**Long-term maintenance burden:** High. Morphology requires more editorial infrastructure — deciding which roots to feature, sequencing root introduction, avoiding overwhelming younger students. It is the category most likely to require a dedicated planning document before implementation.

**Launch or later:** **Later.** Morphology should not be skipped, but it should not delay launch. The category is best built with a dedicated strategy document guiding it (`MORPHOLOGY_STRATEGY.md`).

---

### Academic Vocabulary

**Educational purpose:** Words from science, social studies, mathematics, and writing instruction that appear across classroom content areas. These are not necessarily hard to spell, but they appear frequently in school contexts and carry academic meaning children need.

**SEO value:** Moderate, niche. Parents and teachers looking for "science vocabulary spelling words" or "social studies spelling list" represent a specific intent. This content differentiates the library from competitors whose vocabulary is mostly sight words and phonics.

**Long-term maintenance burden:** High. Academic vocabulary is broad and subjective. Deciding which science words belong in a 2nd-grade list vs a 4th-grade list requires editorial judgment. Subject areas (science, social studies, math, writing) may each eventually warrant their own family.

**Launch or later:** **Later.** Like morphology, academic vocabulary offers long-term authority but requires planning infrastructure that should not delay launch.

---

### Seasonal Lists (optional)

**Educational purpose:** Holiday words, weather vocabulary, seasonal themes. These tap into what children are experiencing in the world around them and can increase motivation.

**SEO value:** Moderate but seasonal — traffic spikes around relevant dates and falls flat otherwise. A "Halloween spelling words" page may receive significant traffic in October and near-zero the rest of the year.

**Long-term maintenance burden:** Low per list, but cumulative. Seasonal content multiplies quickly and can crowd the library with content that feels disposable rather than educational. Every seasonal list published is one more list that must be reviewed and maintained.

**Launch or later:** **Optional.** One or two seasonal lists (e.g., "Winter Words") are unlikely to hurt the library and may serve as a light-traffic entry point. But seasonal content should not be a launch priority, and the library should not publish holiday-themed content that conflicts with the site's non-exclusionary, cross-cultural tone.

---

### Thematic Lists (optional)

**Educational purpose:** Animals, food, transportation, community helpers. Thematic lists group words by subject rather than curriculum skill. They are engaging and accessible but do not build a sequential skill.

**SEO value:** Low to moderate. Thematic search is diffuse — "animal spelling words" is searched, but the volume is much lower than grade-level or sight-word terms.

**Long-term maintenance burden:** High risk of scope creep. Thematic content has no natural boundary. Once animals are published, the implicit question is: why not weather? Plants? Sports? The family can grow indefinitely without clear curriculum payoff.

**Launch or later:** **Probably not.** Thematic lists may be the lowest priority of all proposed families. If thematic content is published at all, it should serve a curriculum purpose beyond novelty (e.g., content area science vocabulary), not simply exist as subject-grouped words.

---

## 5. Recommended Launch Library

This is a recommendation, not a final decision. The goal is to avoid deferring every choice.

**Launch with:**

| Family | Depth |
|---|---|
| Grade-Level | At least 2–3 lists per grade, K–5 |
| Sight Words | Dolch tiers complete; Fry as secondary |
| Phonics | Core patterns: short vowels, silent-e, vowel teams, blends, digraphs, r-controlled |
| Challenge Words | 2–4 lists minimum |

**Build after launch:**

| Family | Trigger |
|---|---|
| Morphology | After a dedicated `MORPHOLOGY_STRATEGY.md` is written |
| Academic Vocabulary | After grade-level lists reach full depth |
| Seasonal | Optional; only with high editorial bar |
| Thematic | Low priority; only if a clear curriculum rationale exists |

**The reasoning:** Parents looking for a spelling practice app will evaluate the site in roughly this order — grade-level content, then sight words, then phonics, then enrichment. A site with strong coverage of those three core areas will feel authoritative and complete. A site that launches with morphology but thin grade-level content will feel unfinished to most visitors.

---

## 6. Grade-Level Strategy

This is likely the most consequential curriculum decision in this document.

**Option A: Few large lists**

Each grade has one or two large lists (30–50 words each). Parents pick a grade and get a comprehensive word set. Simple to browse. Easy to understand. Fewer pages to maintain.

*Risks:* A 40-word list is too long for a single practice session (the default session draws 10 words). The full list may feel overwhelming. It is harder to ensure quality and balance across a large list. Navigation provides no curriculum context — what is the *point* of all these words together?

**Option B: Many small lists**

Each grade has 5–10 lists of 10–20 words each, organized by theme or skill (e.g., "2nd Grade: Action Words," "2nd Grade: Describing Words"). The lists feel approachable. Each one has a clear purpose. Children can complete a list and feel accomplished without the pace being gamified.

*Risks:* More lists means more maintenance. If the organizing principle within a grade is arbitrary, the structure misleads users about curriculum meaning. A parent may wonder why their child is doing "2nd Grade: Action Words" vs "2nd Grade: Community Words" and find no clear answer.

**Recommendation (tentative):** Option B, with discipline. Small lists organized by a coherent principle — word type, content theme, or phonics alignment — are more useful to both teachers and children than large undifferentiated lists. But the organizing principle must be honest. If a list is called "2nd Grade: Everyday Words," those words should genuinely be everyday words a 2nd grader encounters, not a miscellaneous spillover bucket.

A target of **10–20 words per grade-level list** aligns with the session model: a child can complete one list in a single session without artificial repetition.

**K–5 depth parity:** All six grades do not need equal depth at launch. K–1 content is most frequently searched and most frequently practiced. Grade 4–5 content serves a smaller audience and is more difficult to source well given the current vocabulary gap in that band. Prioritizing K–3 depth at launch, with Grade 4–5 as a known gap to close, is more honest than spreading thinly across all grades.

---

## 7. Phonics Strategy

**Option A: A handful of major phonics lists**

Short vowels, long vowels, blends, digraphs — broad categories, each holding 20–40 words. Simple to browse. Easy to maintain.

*Risks:* "Long vowels" is not a single teaching moment. Silent-e long-a words behave differently from vowel-team long-a words. Grouping them together muddies the phonics instruction.

**Option B: A complete phonics progression**

One list per pattern (short-a CVC words, short-e CVC words, silent-e long-a, silent-e long-i, AI/AY vowel teams, EE/EA vowel teams, etc.). 30–50 lists total. Granular and curriculum-aligned.

*Risks:* The library becomes hard to browse. Parents who do not know phonics terminology (most of them) will not know where to start. The family feels overwhelming even to teachers.

**Recommendation (tentative):** A tiered approach. The top-level browsing experience shows broad phonics categories (short vowels, long vowels via silent-e, vowel teams, consonant blends, etc.). Within each broad category, more specific lists are available for those who want them. This preserves both accessibility and pedagogical granularity.

The current library is already moving toward this — there are individual lists for AI/AY, EE/EA, OA/OW, OI/OY, and OU/OW vowel teams, grouped under a parent category. That pattern is right. The question is how far to take it and whether a dedicated `PHONICS_STRATEGY.md` should specify the full progression before building further.

---

## 8. Sight Word Strategy

**Dolch vs Fry:**

Both lists are widely used in elementary education, but they differ in origin and composition:

- **Dolch** (1936) — 220 service words + 95 nouns, organized into 5 grade-level tiers (Pre-Primer, Primer, 1st Grade, 2nd Grade, 3rd Grade). The most cited sight word list in primary education. Familiar to most parents and teachers.
- **Fry** (1957, updated) — 1,000 words organized by frequency of appearance in written English, divided into sets of 100. Broader than Dolch. More modern. Less universally known by parents.

**Overlap:** The two lists have substantial overlap, particularly in the lower tiers. Pre-Primer Dolch words like *the*, *a*, *is*, *in*, *and* appear in Fry's first 25 words. Estimating overlap at 60–70% for the most common tiers is reasonable.

**Duplication concerns:** If both lists are published on the site, the same word may appear in a Dolch list and a Fry list. This is not architecturally problematic — the Word Universe model allows a word to appear in multiple lists — but it may confuse users who see the same word on "Dolch Primer" and "Fry Words 1–100."

**Whether users should see both:**

Publishing both Dolch and Fry gives users more choice and better SEO coverage. A parent who knows "Dolch" will find Dolch. A teacher who uses Fry words will find Fry. But both should not be presented as equivalent starting points — they should be introduced with context: "Dolch is the classic sight word list. Fry extends Dolch with more words."

**Recommendation:** Publish Dolch first and completely. Add Fry tiers as secondary coverage. In the UI, consider a note explaining the relationship between the two lists. Do not hide duplication — acknowledge that the same high-frequency words appear across multiple lists and that this is expected.

---

## 9. Future Categories

**Morphology** and **Academic Vocabulary** are not launch categories, but they are among the most strategically important the site could eventually build.

**Morphology** (prefixes, suffixes, Greek roots, Latin roots) teaches children that words are composed of meaning-bearing parts. A child who knows that *-tion* makes nouns, that *re-* means again, and that *port* means to carry can decode thousands of words they have never seen. No other spelling practice site does morphology well. This is a meaningful differentiator.

**Academic Vocabulary** (content-area words from science, social studies, math, and writing instruction) fills a gap that pure phonics and grade-level lists leave open. Children who can spell *experiment*, *community*, *equation*, and *paragraph* are better prepared for school. This category also provides natural SEO coverage in subject-specific searches.

Both categories require more planning infrastructure before implementation. A dedicated strategy document for each is the right prerequisite.

---

## 10. What We Should Not Build

The library must not become:

- **Random word lists.** Lists without a curriculum rationale dilute the library. Every list should answer: *why does this word belong here?*
- **SEO-driven list spam.** A list created primarily to rank for a search query rather than to serve a child practicing spelling is not worth publishing. The CONTENT_STANDARDS editorial constitution forbids this explicitly.
- **Thousands of tiny categories.** Thematic content (animals, food, sports, colors) can multiply indefinitely with little curriculum payoff. The test is: does this list teach a skill, or does it just group words by a common topic?
- **Low-quality thematic collections.** "Thanksgiving Words" or "Summer Vocabulary" may generate seasonal traffic but undermine the site's identity as a serious curriculum resource. Seasonal and thematic content should only be published if it meets the same editorial standards as the core library.
- **Lists that skip example sentences without reason.** Published lists should primarily consist of words with hand-written example sentences. Spelling-only heteronym entries are the documented exception — all other words require a sentence before they can be published.

The right model is depth over breadth. Twenty well-curated phonics lists are worth more than 200 shallow thematic ones.

---

## 11. Design Principles

These are not new — most are implicit in the existing architecture. Stating them here makes them durable.

1. **Words exist once.** The sentence bank is the source of truth. A word lives there once, with its sentence. Lists reference words; they do not own them.
2. **Lists are views of the word universe.** Adding a word to a list is a curation decision, not a vocabulary decision.
3. **Small lists are easier for children.** A 10–20 word list feels completable. A 50-word list feels like a wall. Lists should be sized for a child's session, not for an adult's convenience.
4. **Curriculum should be understandable.** Parents and teachers should be able to explain why a word is on a list. If the list rationale is unclear, the list is probably wrong.
5. **Quality over quantity.** Fewer lists with every word having a sentence and clear rationale is better than many lists with placeholder content.
6. **Categories should grow gradually.** A category that launches with 2–3 strong lists and expands to 10 over time is more trustworthy than one that launches with 30 mediocre lists at once.
7. **Cross-family overlap is expected and healthy.** A word may appear in both a grade-level list and a phonics list without violating the "words exist once" philosophy. Lists are views; overlap reflects that a word has multiple curriculum contexts, not that it is duplicated.
8. **The library is calm.** Consistent with the product's anti-gamification values, the library should feel like a well-organized workbook, not a marketplace. Lists should not compete for attention through novelty.

---

## 12. Open Questions

These questions are not resolved in this document. They are the right questions to resolve next.

1. **Grade-level list organization principle:** Should grade-level lists be organized by word type (nouns, verbs, descriptors), by content theme (school words, home words, community words), or by phonics alignment? Any of these is defensible, but mixing them within a grade will feel incoherent.

2. **Fry tier granularity:** Should Fry words be published as sets of 100 (1–100, 101–200, etc.), grouped by grade-level alignment, or by some other principle? The Fry list was designed for frequency, not instruction — its tier structure requires editorial judgment.

3. **K–5 depth parity target:** When is the Grade 4–5 vocabulary bank large enough to support a full grade-level presence? Grade 4–5 remains the smallest band. A meaningful word expansion in that band may be a prerequisite for serious Grade 4–5 lists.

4. **Phonics progression completeness:** Should the phonics family eventually aim to cover every major phonics pattern in the English spelling system, or should it remain a curated selection of the most important and teachable patterns? A complete progression is more authoritative; a curated selection is more maintainable.

5. **Learning paths design:** When is the right time to begin designing the Learning Paths layer? Should it be designed in parallel with the list library, or after the library reaches a critical mass of content?

6. **Morphology sequencing:** Which morphology categories are most appropriate for the K–5 age range, and in what order should they be introduced? Prefixes and suffixes are likely appropriate by Grade 3. Greek and Latin roots may skew toward Grade 4–5.

---

## 13. Recommended Next Step

This document establishes the overall list architecture. The next planning artifact should be:

### `docs/GRADE_LEVEL_STRATEGY.md`

**Why first:** Grade-level content is the highest-traffic, highest-priority launch category. The single most consequential open question from this document is whether grade-level lists should be organized by word type, content theme, or phonics alignment. That decision must be made before any new grade-level lists are created.

A `GRADE_LEVEL_STRATEGY.md` should specify:
- The organizing principle for each grade
- Target list count per grade at launch
- Which grades are prioritized
- Word selection criteria within each grade band
- How grade-level lists relate to phonics lists (should they overlap? are phonics words also in grade-level lists?)

**After that:**

- `PHONICS_STRATEGY.md` — the complete phonics progression, scope decisions, and pattern sequencing
- `SIGHT_WORD_STRATEGY.md` — the Dolch/Fry relationship, tier presentation, and duplication policy
- `MORPHOLOGY_STRATEGY.md` — when morphology is ready to build

The planning sequence mirrors the recommended launch priority: grade-level first, phonics and sight words second, morphology and academic vocabulary third.

---

*This document is a curriculum planning artifact. It should be updated as decisions in the open questions section are resolved and as strategy documents for each family are written. It is not a content specification — for list-level specifications, see `LIST_SPECIFICATIONS.md`.*
