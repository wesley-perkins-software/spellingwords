# Canonical Themed Spelling Practice Member-Page Standard

**Status:** Frozen production editorial authority  
**Scope:** All 27 canonical individual Themed Spelling Practice member pages  
**Reference implementation:** `1st Grade Weather Spelling Words` (`grade-1-weather-words`)

This standard governs semantic content, not visual presentation. The supporting audit and research history remains in `CANONICAL_THEMED_SPELLING_PRACTICE_PAGE_STANDARD_RESEARCH.md`.

## 1. Scope and purpose

Themed Spelling Practice is the deepest non-Core practice layer. A theme gives a recognizable, human-relevant context, organization, and retrieval cues; orthographic analysis and retrieval practice provide the instruction. Spelling must remain dominant.

This standard does **not** govern Core Spelling members, High-Frequency Words (HFW) members, Grade Hubs, or themed grade gateways. It governs a gateway only insofar as member pages link to the gateway and the gateway, rather than a member, owns broad theme discovery.

The governing editorial question is:

> **What useful spelling relationships can a learner notice and practice within this recognizable group of words?**

For comparison, Core asks how a spelling concept works. HFW asks what helps a learner spell particular high-frequency words. A themed member uses its frozen inventory to answer the question above; it does not become either kind of lesson.

## 2. Frozen identity and inventory

The 27 member identities, stable IDs, routes, grade ownership, and ordered inventories are curriculum contracts. Across the corpus there are 237 entries and 236 distinct spellings. Editorial work must not add, remove, substitute, reorder, or move words; change IDs or routes; or redesign the taxonomy.

Frontmatter `words` is the single source of truth for display and executable practice. Never duplicate an authoritative inventory in authored body copy.

## 3. Canonical semantic information architecture

The semantic order is:

> human-relevant set summary → complete word inventory and practice action → inventory-specific spelling observations → selective word notes when justified → shared practice/review → same-grade themed exploration and owning gateway

This order assigns meaning and ownership. It does not require a particular screen order or component arrangement.

### Authored per member

- title;
- unique, inventory-specific description/summary;
- `shortAnswer` when useful;
- concise spelling observations grounded in named inventory words;
- zero or more selective `wordNotes`;
- exceptional context examples, pronunciation support, fit guidance, or FAQ content only when justified.

### Shared and renderer-owned

- strand classification/badge and breadcrumbs;
- playable word-list framework, count, and practice controls;
- the primary spelling-observation region heading;
- shared practice, correction, later-review, and success guidance;
- word-note region labels and context/pronunciation labels;
- themed exploration labels, deterministic same-grade peers, and owning-gateway link;
- structural metadata and attribution display.

Authored Markdown must not recreate renderer-owned headings or instructions.

## 4. Human-context summary

A summary should normally combine:

1. a brief, natural reason the theme is recognizable or relevant in everyday or school experience; and
2. an immediate connection to the spelling work the actual inventory provides.

This is a semantic principle, not a mandatory two-sentence template. One concise human-context sentence is often sufficient. Vary the natural construction and avoid generic enthusiasm. Never turn this opening into definitions, subject teaching, trivia, comprehension prose, a contrived personal story, or an assumption that every child shares one routine, culture, family structure, or lifestyle.

The Weather reference description models the balance: it says how children can encounter the words, then immediately names the inventory's spelling value.

## 5. Inventory-specific spelling observations

Choose the few cross-word relationships that genuinely help retrieval. Depending on the inventory, useful observations may include sound–letter mappings, vowel or consonant contrasts, stable letter sequences, syllable chunks, capitalization, punctuation, compounds, bases and affixes, inflections, or a small number of unexpected spellings.

- Name the words that support each observation.
- State honestly when the set uses several patterns.
- Do not force every word into one rule or invent morphology, roots, syllable divisions, or spelling structure.
- Do not duplicate a full Core concept lesson; make the inventory-level comparison and link selectively when a Core destination genuinely helps.
- Let depth follow the inventory and grade, not a heading, paragraph, or word-count quota.

## 6. Selective word support

Generic `wordNotes` are optional. A word earns a note only when a retrieval-helpful spelling, capitalization, punctuation, morphological, or identification fact does not fit a set-level observation. Straightforward words receive no note. There is no minimum or maximum quota and never a requirement to cover every word.

An optional `contextExample` is appropriate only when meaning is genuinely needed to select or retrieve the intended spelling. It is not an example-sentence or vocabulary program. An optional `pronunciationNote` is appropriate only when pronunciation or dialect variation materially affects fair identification or spelling instruction. It must not prescribe one valid accent as superior.

Do not put themed notes into HFW-specific `hfwWordNotes`; those semantics remain separate.

## 7. K–5 maturation

Maturation follows the actual inventories rather than duplicating the Core scope and sequence:

- **Kindergarten:** concrete sound–letter attention, short word structures, digraphs/blends, and highly visible stable chunks in plain language.
- **Grades 1–2:** compare endings, vowel spellings, doubled consonants, compounds, contractions, capitalization, and manageable syllable chunks where the set supports them.
- **Grade 3:** add selective punctuation, syllable, base/affix, and less-predictable spelling reasoning without turning the theme into a concept lesson.
- **Grades 4–5:** use longer-word chunking and accurate morphology selectively; distinguish stable written parts from genuine spelling changes and acknowledge variation when relevant.

Older-grade prose is not automatically longer or more technical. Younger pages may name a complex fact simply; older pages must not manufacture sophistication that their words do not support.

## 8. Strand and subject boundaries

Theme context can identify or cue a target, but it cannot teach vocabulary, anatomy, weather, science, mathematics, social studies, financial literacy, or another subject. Do not add trivia, definitions for each word, comprehension passages, “fun facts,” or domain-knowledge questions.

Themed pages complement, but do not imitate:

- **Core Spelling:** no concept essay, default readiness gate, prerequisite sequence, or claim that this optional theme is the next required unit.
- **HFW:** no per-word irregularity quota, heart-word framing, or instruction to “begin the next set.”

Avoid rigid mastery claims. A percentage, elapsed time, or single completed session does not establish retention.

## 9. Practice, review, and navigation

Shared practice should ask learners to hear or say a word, notice a useful spelling part, spell without looking, compare and correct, and try it again later. Mixed review may include words from other practice lists. Success means increasingly accurate retrieval from a spoken prompt and later mixed practice, not completion of a mandatory themed sequence.

Members are nonsequential peers. Their relationship region should offer reviewed or deterministically selected same-grade themed practice and link to the owning grade themed gateway. Do not label peers as prerequisites or next instructional units. The gateway owns broader grade/theme discovery intent; each member owns its exact grade + theme + spelling intent.

## 10. Public naming direction

The eventual member-title convention is:

> `[Public grade label] [Theme] Spelling Words`

Public grade labels are `Kindergarten`, `1st Grade`, `2nd Grade`, `3rd Grade`, `4th Grade`, and `5th Grade`. The Weather pilot intentionally uses `1st Grade Weather Spelling Words`.

This standard records direction but **defers the sitewide migration**. A later coordinated task must reconcile Core, HFW, Themed, Grade Hubs, gateways, breadcrumbs, browser titles, navigation, and visible structured-data names. Internal grade values and canonical route slugs do not need renaming.

## 11. Search, answer engines, and topical authority

Search and answer usefulness comes from visible, learner-useful content:

- clear grade + theme + spelling identity;
- a concise direct summary;
- the exact inventory;
- original, inventory-specific spelling analysis (the page's information gain);
- descriptive headings and a coherent crawlable internal graph;
- distinct responsibilities for member pages and gateways.

Do not use keyword stuffing, FAQ quotas, hidden AI copy, AI-specific schema, speculative GEO tactics, or generic vocabulary expansion to chase theme queries. Structured data must describe visible content and genuine page purpose.

## 12. Presentation independence

This standard does not freeze cards, colors, spacing, typography, columns, accordions, or the current layout. Content must remain coherent as plain text and through a future redesign. Avoid directions such as “in the blue box,” “on the cards,” or “below.”

## 13. Canonical reference, not a clone template

`1st Grade Weather Spelling Words` is the canonical reference implementation because it demonstrates a human-relevant spelling-first summary, genuine cross-word comparisons, one selective note, shared practice behavior, and nonsequential exploration without changing its inventory.

Future pages do **not** need Weather's number of headings or notes, sentence structure, prose length, or observation types. Each page must be driven by its own frozen inventory. The goal is a consistent instructional model, not 27 cloned pages.

## 14. Concrete anti-patterns

Do not:

- define every animal or explain habitats on an Animal Words page;
- teach cloud formation on Weather Words, geometry calculations on Geometry Words, or civics concepts on Civics Words;
- claim a mixed inventory follows one pattern because its words share a theme;
- force a base, affix, root, or syllable split that is not instructionally accurate;
- add one card, sentence, pronunciation guide, etymology, or definition per word;
- write “fun words kids love,” keyword variants, or generic boilerplate instead of actual spelling value;
- use topic familiarity as readiness or theme recall as reading comprehension;
- promise mastery after 90%, one session, or a fixed number of minutes;
- add a FAQ merely for schema, or hidden/AI-targeted content;
- hard-code an ordered “next themed lesson” or duplicate renderer-owned practice/navigation copy;
- change an inventory, route, ID, grade owner, or taxonomy during editorial work.

## 15. Editorial workflow and acceptance

For every future member-page batch:

1. Verify the frozen identity, grade, canonical route, and ordered inventory.
2. Inspect the actual spelling relationships without assuming the theme supplies a pattern.
3. Select the most useful set-level observations and name supporting words.
4. Decide whether any words genuinely need selective notes.
5. Decide whether context or pronunciation support is genuinely necessary.
6. Write a natural human-relevant summary that immediately establishes spelling value.
7. Verify the language and analysis are grade-appropriate.
8. Verify spelling remains dominant and remove vocabulary/subject drift.
9. Verify authored content does not duplicate renderer-owned regions.
10. Run corpus, route, schema, navigation, rendering, and editorial-invariant tests.

If a frozen identity or inventory appears wrong, stop and escalate it as a separate curriculum decision. Do not repair it inside editorial implementation.
