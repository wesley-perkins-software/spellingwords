# Grade-Level Strategy

> **Superseded.** Superseded for K–5 grade-hub architecture: use [K5_FINAL_CONTENT_ARCHITECTURE.md](./planning/K5_FINAL_CONTENT_ARCHITECTURE.md). Retain this document as historical grade-level discovery research.

> **The central question this document answers:**
> How should grade-level spelling lists be organized, named, and sized — and how many should exist per grade at launch?

---

## 1. What Is a Grade-Level List?

A grade-level spelling list is the answer to one of the most common questions parents ask about early literacy:

> *What words should my child be practicing this year?*

Parents searching for spelling help think in grades, not phonics patterns. They do not know what "vowel teams" are. They do know that their child is in second grade. A grade-level list meets them at that level of knowledge.

**What parents expect when they find a grade-level list:**

- Words their child's teacher might assign
- Words that appear in books and classroom writing at that grade
- Words that are appropriately challenging — not too easy, not frustrating
- A list they can work through in a single sitting without it feeling overwhelming or never-ending

Grade-level lists are not a phonics curriculum in disguise. They do not need to cover every pattern a child learns that year. Their job is to give families a set of genuinely useful, grade-appropriate words to practice — and to give the site an authoritative, findable presence at every grade from kindergarten through fifth grade.

**Why grade-level lists are the foundation of the curriculum:**

Phonics lists serve teachers and tutors who know phonics terminology. High-Frequency Words lists serve parents who have been introduced to Dolch or Fry by their child's school. Grade-level lists serve everyone else — the majority of parents who simply want to help their child practice spelling without learning a new framework first.

This is why grade-level is the highest-priority family in the library. It is the most-searched, most-shared, and most-expected category of spelling content on the web.

---

## 2. Organizing Principles

Every grade-level list must answer a simple question: *why do these words belong together?*

Four organizing approaches are available. Each has strengths and weaknesses.

---

### A. Word Type (Nouns, Verbs, Descriptors)

Lists organized by grammatical role: action words, describing words, naming words, connecting words.

**Strengths:**
- Names are parent-legible. "2nd Grade Action Words" is immediately understandable.
- Word type maps to how teachers talk about writing. Describing words, action words, and naming words are familiar classroom terms.
- Internally coherent. A list of verbs stays focused.

**Weaknesses:**
- Some words resist clean categorization. Many high-frequency words are connectives, prepositions, or pronouns — useful but awkward to name.
- A strict noun/verb/adjective template becomes mechanical across grades. Not every grade needs the same set of word-type lists.
- Word type alone says nothing about why a particular word is at a particular grade level.

---

### B. Content Theme (School Words, Community Words, Home Words)

Lists organized by subject or setting: nature words, community helpers, food words, weather words.

**Strengths:**
- Engaging and concrete. A child can see the theme as they practice.
- Can tie to classroom units — community words, weather words.

**Weaknesses:**
- Thematic logic is weak curriculum logic. A list of "school words" does not explain why *pencil* belongs in second grade but not fourth.
- Themes multiply without bound. Every subject becomes a potential list: animals, oceans, sports, holidays. This is the definition of scope creep.
- The site's architecture warns explicitly against thematic content that lacks curriculum rationale (`LIST_ARCHITECTURE.md` §10). A grade-level list that is purely thematic is one step away from filler.
- Themes invite seasonal drift — "Fall Spelling Words," "Spring Words" — content the site's editorial standards explicitly reject.

**Verdict:** Content themes are acceptable as a secondary signal but should not be the primary organizing principle for grade-level lists.

---

### C. Phonics Alignment (Short Vowels, Silent E, Vowel Teams)

Lists organized by the phonics pattern that explains why the words are spelled the way they are.

**Strengths:**
- Strongest pedagogical coherence. Every word on the list reinforces the same skill.
- Maps directly to what a reading specialist or literacy tutor would design.
- Creates natural overlap with the phonics family, which is healthy (see §6).

**Weaknesses:**
- Requires parents to know phonics terminology. Most do not.
- Phonics-organized lists within the grade-level family duplicate the phonics family. The phonics family already handles this work with more specificity.
- A grade-level list that is just a phonics list with a grade label pasted on it is not a grade-level list — it is a mislabeled phonics list.

**Verdict:** Phonics alignment is useful as an annotation and as a secondary signal when naming a list (e.g., "2nd Grade Long Vowel Words"). It is not the right primary organizing principle for the grade-level family.

---

### D. Word Purpose / Classroom Usefulness (Recommended)

Lists organized by the *role the words play in a child's reading and writing life* at that grade.

Examples of purpose-driven framing:
- Everyday Words — words a child reads and writes constantly at this grade
- Action Words — verbs that appear in stories, instructions, and journal writing
- Describing Words — adjectives and adverbs that enrich classroom writing
- Reading & Writing Words — academic vocabulary that appears across subjects
- Community Words — words tied to the world around a child: helpers, places, roles

**Strengths:**
- Names are parent-legible without being pedagogically vague.
- Purpose adapts gracefully across grades. A list can be "Everyday Words" at any grade and feel genuinely different, because the words that are everyday at kindergarten are not the same words that are everyday at fourth grade.
- Allows word type and phonics alignment to serve as secondary signals rather than rigid constraints. An "Everyday Words" list can include nouns, verbs, and adjectives without the name feeling dishonest.
- Avoids the jargon problem of phonics-first naming and the scope-creep problem of theme-first naming.

**Weaknesses:**
- Requires editorial judgment. "Classroom usefulness" is not a mechanical filter. Someone has to decide what a second grader actually encounters in reading and writing.
- "Everyday Words" can become a catch-all if not curated carefully. It must not become a miscellaneous bucket.

---

## 3. Recommendation

**Primary organizing principle: word purpose and classroom usefulness.**

**Secondary signals: word type, phonics pattern, and content area** — used to differentiate lists within a grade when more specificity helps.

In practice, this means:

| Good list name | Why it works |
|---|---|
| Kindergarten First Words | Clear purpose: the words a new reader meets first |
| 1st Grade Everyday Words | Purpose-first; no jargon |
| 1st Grade Action Words | Word type as a secondary signal; immediately clear |
| 2nd Grade Describing Words | Word type as secondary signal; maps to classroom writing instruction |
| 3rd Grade Compound Words | Phonics pattern as secondary signal; compound words are a named concept at grade 3 |
| 4th Grade Reading & Writing Words | Purpose-first; signals academic vocabulary without intimidating |
| 5th Grade Commonly Misspelled Words | Purpose-first; useful to parents who recognize this framing |

This approach does not force every grade into an identical word-type template. Kindergarten needs "First Words" and "Number and Color Words," not a strict noun/verb split. Fifth grade needs "Reading & Writing Words" more than it needs "5th Grade Nouns." The organizing principle is the question *what do children at this grade level need to know and write?* — not a grammatical taxonomy imposed from outside.

Every grade-level list name should pass this test: **can a parent understand it in three seconds without any background knowledge?** If the name requires explanation, it is the wrong name.

---

## 4. List Size

**Recommended size: 12–15 words per list.**

The reasoning:

- The session model draws 10 words by default. A list of exactly 10 words gives a child no replay variety — they practice the same 10 words every session. A list of 12–15 provides modest variation on replay while still feeling finite.
- A 12–15 word list is completable in a single sitting. A child can finish it, feel accomplished, and move on. This aligns with the site's calm, workbook-style UX — no timers, no pressure, a sense of natural completion.
- Lists shorter than 10 words feel thin and low-value to parents browsing the library. Lists longer than 20 words feel like a wall. The 12–15 range hits the target where the list feels like a real resource without feeling overwhelming.
- This size also constrains quality. It is easier to write excellent example sentences for 12–15 words than for 30. A smaller, well-curated list is worth more than a large, hastily assembled one.

**What to avoid:**

- **10-word lists** that exactly match the session default — no replay variety, no sense of the list being bigger than one practice.
- **20+ word lists** unless the content genuinely requires it and has been fully vetted. A 30-word list that "covers everything" in a grade is a 30-word list where the editorial bar slips for the words at the end.
- **Giant reference lists** (50+ words) — these are not practice lists. They are reference documents. If a grade's full vocabulary is 80 words, that is not one list. It is six or seven lists organized by purpose and introduced over time.

---

## 5. Number of Lists Per Grade

Grade-level lists are the highest-traffic entry point, but not all grades have equal search volume, equal vocabulary coverage, or equal audience size.

### Kindergarten

**Target at launch: 3–4 lists.**

Kindergarten is among the highest-searched grades. Parents of young children are often new to the site and new to spelling practice. These lists must feel welcoming, simple, and achievable. Kindergarten lists should average 10–12 words (slightly below the standard range, given attention span). A child who finishes "Kindergarten First Words" should feel ready to try the next one.

### Grade 1

**Target at launch: 3–4 lists.**

First grade is when formal spelling instruction begins in most schools. Parents are actively looking for grade-aligned practice. The vocabulary at grade 1 is rich enough to support multiple distinct lists without repetition. Word type is a useful secondary signal here — action words and everyday words are both meaningful categories at this level.

### Grade 2

**Target at launch: 4 lists.**

Grade 2 is the most developed category in the current library. It is also the grade where children begin writing in more complex ways — compound words, contractions, longer words. The grade 2 family should be the deepest at launch, serving as a proof-of-concept for what a complete grade-level presence looks like.

### Grade 3

**Target at launch: 3 lists.**

Grade 3 is a transition year. Children are moving from "learning to read" to "reading to learn." Vocabulary grows in complexity. Phonics patterns become more sophisticated (vowel teams, multisyllable words, compound words). Three lists at launch provides a real presence without overpromising on coverage.

### Grade 4

**Target at launch: 2–3 lists.**

Grade 4 represents a vocabulary shift toward academic and multisyllable words. The site's current vocabulary bank is thinnest in the Grade 4–5 band. Two strong, well-curated lists are worth more than three thin ones. A "Reading & Writing Words" list and a "Community Words" or "Everyday Words" list are the right anchors. Expand once the vocabulary bank supports it.

### Grade 5

**Target at launch: 2 lists, or defer.**

Grade 5 is the ceiling of the K–5 curriculum. It is also where the current vocabulary gap is most acute. A single Grade 5 list makes the site feel incomplete — a parent who clicks "5th Grade" and finds one list will not return.

**Recommendation:** Launch Grade 5 only if two strong lists can be published simultaneously. If the vocabulary cannot support two well-curated lists (12–15 words each, all with example sentences), defer Grade 5 to a post-launch update rather than publish a thin or underbuilt presence.

Possible Grade 5 anchors when ready:
- 5th Grade Reading & Writing Words
- 5th Grade Commonly Misspelled Words

### Summary

| Grade | Target at Launch |
|---|---|
| Kindergarten | 3–4 lists |
| Grade 1 | 3–4 lists |
| Grade 2 | 4 lists (deepest coverage) |
| Grade 3 | 3 lists |
| Grade 4 | 2–3 lists |
| Grade 5 | 2 lists, or defer |
| **Total** | **~17–22 lists** |

**K–3 receives the deepest emphasis.** This is where the largest audience is, where the vocabulary bank is strongest, and where the curriculum payoff is highest. Grade 4–5 can and should grow over time as the vocabulary bank expands, but it should not be rushed.

---

## 6. Relationship to Other Families

Grade-level lists are not isolated from the rest of the library. They exist alongside phonics lists, high-frequency word lists, and challenge lists — and they will share words with all of them.

**This overlap is healthy. It is not a problem to fix.**

The architecture established in `LIST_ARCHITECTURE.md` §3 is explicit: *words exist once* (in the sentence bank), and *lists are views of the word universe*. A word like *rain* can appear in a kindergarten grade-level list and in a short-vowel phonics list without any conflict. The word is not duplicated — it simply has multiple curriculum contexts.

**Specific overlap relationships:**

- **Grade-level and phonics:** A second-grade grade-level list about long vowel words will share many words with the silent-e and vowel team phonics lists. A third-grade grade-level list about compound words will share words with any future compound-words phonics list. This is expected and good. A parent who completes the "2nd Grade Long Vowel Words" list and then discovers the "Silent E: Long A Words" phonics list should feel like the site is coherent, not redundant.

- **Grade-level and high-frequency words:** Many high-frequency words (from Dolch or Fry) will appear in grade-level everyday-words lists. *said*, *want*, *because*, *different* — these are both high-frequency words and legitimate candidates for grade-level everyday-words lists. The site does not need to exclude high-frequency words from grade-level lists to avoid overlap. It may be worth noting in list descriptions when a word is a known high-frequency word, but that is editorial polish, not an architectural constraint.

- **Grade-level and challenge:** The grade-level family ends at Grade 5. Challenge lists extend beyond that ceiling, serving stronger spellers and older students. A Grade 5 grade-level list and a Tier 1 challenge list may share some words. This is fine. The framing is different (grade-appropriate vs. competitive enrichment) and the audience need not be the same.

**The practical implication:** When building a new grade-level list, do not filter out words simply because they also appear on a phonics list or a high-frequency word list. Choose the best words for the grade-level purpose. Overlap is a feature of a coherent curriculum, not an editorial failure.

---

## 7. SEO Considerations

Grade-level spelling lists are the highest-traffic category on the site not because the site has optimized for search volume, but because they match the most common way parents think about spelling practice.

**Search intent is grade-based, not pattern-based.**

A parent sitting down to help their child with spelling thinks: *my child is in third grade. What should they be practicing?* They do not think: *my child needs vowel team reinforcement.* The site's grade-level pages meet parents at the level of knowledge they already have.

**What this means for content:**

- Grade-level pages should be clearly labeled with the grade ("2nd Grade Spelling Words," not "Elementary Level 2 Spelling List").
- List titles should match the natural language of parent search: "Kindergarten Spelling Words," "1st Grade Spelling Words," etc.
- Each grade-level landing page should have enough depth (multiple lists, clear organization) to feel like a real resource, not a stub. A parent who lands on the Grade 3 page via search should find three or four distinct, well-curated lists — not one list and a promise of more later.

**What this does not mean:**

- Grade-level pages should not exist primarily to rank for search queries. A list created because a keyword exists, not because it serves children practicing spelling, is filler. The content standards (`CONTENT_STANDARDS.md`) are explicit: educational usefulness comes before search traffic.
- The site should not publish fifty grade-level lists in the hope that quantity drives rankings. Ten excellent, well-curated lists will serve users better than fifty mediocre ones — and will build more durable credibility with search engines and with parents.
- Grade-level pages should not include keyword-stuffed copy, redundant list names ("2nd Grade Second Grade Spelling Words for Second Graders"), or thin content designed to fill space.

The right approach: publish grade-level lists that are genuinely useful to children and families. If they are genuinely useful, they will be found.

---

## 8. What Grade-Level Lists Should NOT Become

This section names failure modes explicitly, because grade-level is the category most vulnerable to each of them.

**Miscellaneous buckets.** A list is not a grade-level list simply because it is labeled with a grade. If there is no coherent reason why these particular words are on this particular list — if the answer to "why do these words belong together?" is "we needed to fill the list" — the list should not be published.

**Giant word dumps.** A 50-word "complete 2nd grade word list" is not a spelling practice resource. It is a reference document wearing a list's clothing. Children do not practice by scrolling through 50 words. They practice in focused sessions of 10–15. A giant list serves no one's learning goals. Break it into smaller, purpose-driven lists with coherent identities.

**Arbitrary collections.** Words should not be grouped by convenience (whatever words were available, whatever words happened to fit an alphabetical range). Every word on a grade-level list should belong there because a child at that grade level genuinely needs to know it — not because the word was easy to source or happened to have an example sentence already written.

**Phonics lists relabeled as grade-level lists.** A list of silent-e long-a words is a phonics list. Calling it "2nd Grade Long Vowel Words" does not make it a grade-level list — it makes it a mislabeled phonics list. Grade-level lists may include words that follow a phonics pattern, but the organizing principle should be grade appropriateness and classroom usefulness, not phonics pattern.

**Near-duplicates of other grade-level lists.** Two second-grade "everyday words" lists that share 70% of their vocabulary are not two lists — they are one list with filler padding. If a new grade-level list would duplicate more than a third of an existing list's words or would serve the same purpose under a different name, merge or replace rather than multiply.

**Seasonal filler.** "Spring Spelling Words" or "Back to School Words" do not belong in the grade-level family. They are seasonal content dressed as curriculum. The site's editorial standards reject this explicitly.

---

## 9. Naming Rules

List names are the first thing a parent reads. They determine whether a parent clicks or leaves.

**Principles:**

- Parents should understand the list name immediately, with zero background knowledge.
- Names should describe what the words are, not what skill they teach.
- Grade labels belong in the name, not just the metadata.
- Names should be modest and honest. "Everyday Words" is better than "Essential High-Frequency Academic Vocabulary."

**Good examples:**

| Name | Why it works |
|---|---|
| Kindergarten First Words | Clear, warm, describes the words |
| 2nd Grade Everyday Words | Purpose-first, grade-labeled, no jargon |
| 2nd Grade Action Words | Word type as secondary signal; classroom-familiar term |
| 3rd Grade Describing Words | Same — "describing words" is a classroom term |
| 3rd Grade Compound Words | Phonics concept that parents recognize |
| 4th Grade Reading & Writing Words | Purpose-first, signals academic vocabulary accessibly |
| 5th Grade Commonly Misspelled Words | Direct, useful, honest |

**Names to avoid:**

| Name | Why it fails |
|---|---|
| Grade 3 Tier 2 Vocabulary | "Tier 2" is academic jargon; parents do not know this |
| Morphosyntactic Practice Set | No parent will click this |
| Level 4B Word Set | Mechanical and opaque |
| 2nd Grade Phonological Awareness Words | Correct as a concept; alienating as a name |
| Spelling List 3 | Describes the list's position, not its purpose |

**The three-second test:** Read the list name. If a parent cannot tell in three seconds what kind of words are on this list and who it is for, the name is wrong.

---

## 10. Draft Launch Recommendation

This is a recommendation, not a final commitment. Numbers should be treated as targets, not quotas.

| Grade | Lists at Launch | Approximate Names |
|---|---|---|
| Kindergarten | 3–4 | First Words, Number & Color Words, Everyday Words, (Describing Words) |
| Grade 1 | 3–4 | Everyday Words, Action Words, Describing Words, (Short Vowel Words) |
| Grade 2 | 4 | Everyday Words, Action Words, Describing Words, Compound Words |
| Grade 3 | 3 | Everyday Words, Describing Words, Reading & Writing Words |
| Grade 4 | 2–3 | Everyday Words, Community Words, (Reading & Writing Words) |
| Grade 5 | 2, or defer | Reading & Writing Words, Commonly Misspelled Words |
| **Total** | **~17–22** | |

**Word count per list:** 12–15 words standard; 10–12 for kindergarten.

**Prioritization for authoring:**

1. Grade 2 (complete first — deepest coverage, best vocabulary bank support)
2. Kindergarten and Grade 1 (highest search volume, most new-parent traffic)
3. Grade 3 (strong vocabulary bank, transition-year coverage)
4. Grade 4 (limited vocabulary bank — curate carefully, do not overpromise)
5. Grade 5 (defer until two strong lists can be published simultaneously)

**What "launch-ready" means for a grade:** at least 2 strong, fully curated lists with complete example sentences, a coherent organizing principle, and names that pass the three-second test. A grade with one list is not ready to launch. A grade with two or more strong lists is.

---

## 11. Open Questions

These questions are not resolved in this document. They are the right questions to address before or during content authoring.

1. **Vocabulary gap at Grade 4–5.** The sentence bank is thinnest in the Grade 4–5 band. Before authoring Grade 4 and Grade 5 lists, the vocabulary bank may need a targeted expansion. Who is responsible for identifying and adding Grade 4–5 words, and when does that happen relative to list authoring?

2. **Phonics-aligned grade-level lists.** When a grade-level list is organized primarily around a phonics pattern (e.g., "2nd Grade Long Vowel Words" or "3rd Grade Compound Words"), should it also appear in the phonics family's cross-reference metadata? The architecture supports this via `relatedLists` and `skillTags`, but the policy has not been explicitly stated.

3. **Cross-grade progression metadata.** The LIBRARY_ROADMAP recommended soft cross-grade bridges via `relatedLists` (e.g., the last Grade 2 list pointing to the first Grade 3 list). Should this be formalized across all grades, or left as an editorial decision per list?

4. **Kindergarten list size.** The recommendation is 10–12 words for kindergarten (below the standard 12–15). Should this be a formal policy, or should kindergarten lists be allowed to reach 15 words if the words are strong enough?

5. **When does Grade 5 launch?** The vocabulary bank and authoring capacity will determine this. The recommendation is to defer rather than launch thin. What is the specific trigger: number of available Grade 5 words with sentences? A time-based milestone? An explicit decision?

6. **Grade label in frontmatter vs. name.** Current lists use `grade: "K"`, `grade: "1"` etc. in frontmatter. Should the display name always include the grade (e.g., "2nd Grade Everyday Words") or is it acceptable to omit the grade from the title when the grade is clear from context (e.g., on a grade-filtered page)?

---

*This document is a curriculum planning artifact. It is the authoritative guide for grade-level list design, naming, and sizing. Before any new grade-level list is created, its organizing principle, name, and word count should be checked against this document. Update this document when significant decisions are made that alter the recommendations above.*
