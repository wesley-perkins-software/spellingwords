# Canonical Themed Spelling Practice Page Standard — Research and Current-State Audit

**Status:** proposed standard; ready for one pilot, not yet frozen for production  
**Scope:** deepest `/{grade}/themed-spelling-practice/{resource}` pages only  
**Audit date:** 2026-08-08  
**Repository authority:** executable content, route manifests, renderer code, and tests take precedence over older planning prose.

## A. Executive recommendation

A canonical Themed Spelling Practice page should be **a bounded spelling-practice lesson whose semantic theme supplies an accessible context and retrieval cue, while explicit attention remains on the spellings in the actual inventory**. Its governing question should be:

> **What can I notice, say, and retrieve to spell the words in this theme accurately?**

This formulation is preferable to “How does this pattern work?” (Core) and “What should I notice in these frequently encountered words?” (HFW). It permits several real spelling structures in one theme without pretending the inventory represents a single phonics concept. It also makes retrieval an outcome rather than claiming that semantic grouping itself teaches orthography.

Every page should contain a theme- and inventory-specific summary, the authoritative word inventory, two to four useful spelling observations grounded in that inventory, brief practice/review guidance, and peer/owner navigation. Selective word notes should be optional. Definitions, subject teaching, trivia, exhaustive word notes, and forced common patterns should be excluded.

The evidence supports explicit attention to sound–spelling relations, syllables, meaningful word parts, accurate production from memory, feedback, and later review. It does **not** establish semantic themes as a superior sequence for spelling instruction. The defensible position is therefore: **the theme is primarily a motivating, comprehensible practice context; spelling value comes from orthographic analysis and retrieval**.

## B. Current implementation audit

### Inventory and ordering

The canonical route manifest contains **27 pages: K 5, Grade 1 5, Grade 2 5, Grade 3 4, Grade 4 4, Grade 5 4**. There are **237 word entries and 236 distinct case-normalized spellings**; `foot` is the only cross-page repeat (Kindergarten Body and Grade 4 Measurement). The table follows canonical-manifest order. `order` is frontmatter order, not a themed learning sequence.

| # | Grade | File; stable ID | Canonical route | Current title | Count; exact inventory | `order` |
|---:|:---:|---|---|---|---|---:|
| 1 | K | `kindergarten-animal-words.md`; `kindergarten-animal-words` | `/kindergarten/themed-spelling-practice/animal-words` | Kindergarten Animal Words | 8: `bug`, `cat`, `dog`, `duck`, `fish`, `frog`, `hen`, `pig` | 5 |
| 2 | K | `kindergarten-body-words.md`; `kindergarten-body-words` | `/kindergarten/themed-spelling-practice/body-words` | Kindergarten Body Words | 8: `eyes`, `ears`, `nose`, `hand`, `foot`, `arm`, `leg`, `head` | 8 |
| 3 | K | `kindergarten-number-words.md`; `kindergarten-number-words` | `/kindergarten/themed-spelling-practice/number-words` | Kindergarten Number Words | 10: `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten` | 2 |
| 4 | K | `kindergarten-color-words.md`; `kindergarten-color-words` | `/kindergarten/themed-spelling-practice/color-words` | Kindergarten Color Words | 8: `red`, `blue`, `green`, `yellow`, `black`, `white`, `brown`, `pink` | 3 |
| 5 | K | `kindergarten-family-words.md`; `kindergarten-family-words` | `/kindergarten/themed-spelling-practice/family-words` | Kindergarten Family Words | 8: `mom`, `dad`, `sister`, `brother`, `baby`, `grandma`, `grandpa`, `family` | 9 |
| 6 | 1 | `grade-1-weather-words.md`; `grade-1-weather-words` | `/1st-grade/themed-spelling-practice/weather-words` | Grade 1 Weather Words | 9: `sunny`, `rainy`, `cloudy`, `windy`, `snowy`, `stormy`, `foggy`, `hot`, `cold` | 6 |
| 7 | 1 | `grade-1-clothing-words.md`; `grade-1-clothing-words` | `/1st-grade/themed-spelling-practice/clothing-words` | Grade 1 Clothing Words | 8: `shirt`, `pants`, `shoes`, `socks`, `jacket`, `hat`, `mittens`, `boots` | 7 |
| 8 | 1 | `grade-1-shape-words.md`; `grade-1-shape-words` | `/1st-grade/themed-spelling-practice/shape-words` | Grade 1 Shape Words | 8: `circle`, `square`, `triangle`, `rectangle`, `oval`, `diamond`, `star`, `heart` | 8 |
| 9 | 1 | `grade-1-number-words-11-20.md`; `grade-1-number-words-11-20` | `/1st-grade/themed-spelling-practice/number-words-11-20` | Grade 1 Number Words 11–20 | 10: `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty` | 4 |
| 10 | 1 | `grade-1-days-of-the-week.md`; `grade-1-days-of-the-week` | `/1st-grade/themed-spelling-practice/days-of-the-week` | Grade 1 Days of the Week | 7: `Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday` | 5 |
| 11 | 2 | `grade-2-transportation-words.md`; `grade-2-transportation-words` | `/2nd-grade/themed-spelling-practice/transportation-words` | Grade 2 Transportation Words | 8: `car`, `bus`, `train`, `airplane`, `boat`, `bicycle`, `truck`, `subway` | 11 |
| 12 | 2 | `grade-2-money-words.md`; `grade-2-money-words` | `/2nd-grade/themed-spelling-practice/money-words` | Grade 2 Money Words | 8: `penny`, `nickel`, `dime`, `quarter`, `dollar`, `cent`, `coin`, `change` | 13 |
| 13 | 2 | `grade-2-number-words-20-100.md`; `grade-2-number-words-20-100` | `/2nd-grade/themed-spelling-practice/number-words-20-100` | Grade 2 Number Words 20–100 | 8: `thirty`, `forty`, `fifty`, `sixty`, `seventy`, `eighty`, `ninety`, `hundred` | 14 |
| 14 | 2 | `grade-2-community-helpers.md`; `grade-2-community-helpers` | `/2nd-grade/themed-spelling-practice/community-helpers` | Grade 2 Community Helpers | 8: `doctor`, `teacher`, `firefighter`, `nurse`, `farmer`, `dentist`, `librarian`, `baker` | 15 |
| 15 | 2 | `grade-2-months-of-the-year.md`; `grade-2-months-of-the-year` | `/2nd-grade/themed-spelling-practice/months-of-the-year` | Grade 2 Months of the Year | 12: `January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December` | 12 |
| 16 | 3 | `3rd-grade-map-globe-words.md`; `grade-3-map-globe-words` | `/3rd-grade/themed-spelling-practice/map-globe-words` | 3rd Grade Map & Globe Words | 8: `compass`, `continent`, `ocean`, `border`, `region`, `direction`, `scale`, `legend` | 8 |
| 17 | 3 | `3rd-grade-life-cycle-words.md`; `grade-3-life-cycle-words` | `/3rd-grade/themed-spelling-practice/life-cycle-words` | 3rd Grade Life Cycle Words | 8: `egg`, `larva`, `caterpillar`, `cocoon`, `pupa`, `tadpole`, `hatch`, `cycle` | 9 |
| 18 | 3 | `3rd-grade-time-words.md`; `grade-3-time-words` | `/3rd-grade/themed-spelling-practice/time-words` | 3rd Grade Time Words | 8: `hour`, `minute`, `second`, `o'clock`, `digital`, `analog`, `clock`, `elapsed` | 10 |
| 19 | 3 | `3rd-grade-multiplication-division-words.md`; `grade-3-multiplication-division-words` | `/3rd-grade/themed-spelling-practice/multiplication-division-words` | 3rd Grade Multiplication & Division Words | 8: `multiply`, `divide`, `product`, `factor`, `multiple`, `quotient`, `array`, `equation` | 11 |
| 20 | 4 | `4th-grade-measurement-words.md`; `grade-4-measurement-words` | `/4th-grade/themed-spelling-practice/measurement-words` | 4th Grade Measurement Words | 11: `inch`, `foot`, `yard`, `mile`, `ounce`, `pound`, `ton`, `cup`, `pint`, `quart`, `gallon` | 12 |
| 21 | 4 | `4th-grade-solar-system-words.md`; `grade-4-solar-system-words` | `/4th-grade/themed-spelling-practice/solar-system-words` | 4th Grade Solar System Words | 10: `planet`, `orbit`, `gravity`, `astronaut`, `galaxy`, `satellite`, `comet`, `asteroid`, `eclipse`, `meteor` | 13 |
| 22 | 4 | `4th-grade-career-occupation-words.md`; `grade-4-career-occupation-words` | `/4th-grade/themed-spelling-practice/career-occupation-words` | 4th Grade Career & Occupation Words | 8: `engineer`, `journalist`, `architect`, `scientist`, `plumber`, `mechanic`, `photographer`, `chef` | 14 |
| 23 | 4 | `4th-grade-geometry-words.md`; `grade-4-geometry-words` | `/4th-grade/themed-spelling-practice/geometry-words` | 4th Grade Geometry Words | 8: `perimeter`, `area`, `quadrilateral`, `vertex`, `perpendicular`, `symmetry`, `angle`, `polygon` | 15 |
| 24 | 5 | `5th-grade-money-management-words.md`; `grade-5-money-management-words` | `/5th-grade/themed-spelling-practice/money-management-words` | 5th Grade Money Management Words | 12: `budget`, `income`, `expense`, `savings`, `interest`, `deposit`, `withdraw`, `credit`, `debit`, `borrow`, `balance`, `tax` | 14 |
| 25 | 5 | `5th-grade-ecosystem-environment-words.md`; `grade-5-ecosystem-environment-words` | `/5th-grade/themed-spelling-practice/ecosystem-environment-words` | 5th Grade Ecosystem & Environment Words | 8: `habitat`, `ecosystem`, `organism`, `adaptation`, `population`, `predator`, `prey`, `extinct` | 15 |
| 26 | 5 | `5th-grade-fraction-decimal-words.md`; `grade-5-fraction-decimal-words` | `/5th-grade/themed-spelling-practice/fraction-decimal-words` | 5th Grade Fraction & Decimal Words | 8: `numerator`, `denominator`, `decimal`, `equivalent`, `percent`, `ratio`, `fraction`, `hundredths` | 16 |
| 27 | 5 | `5th-grade-community-civics-words.md`; `grade-5-community-civics-words` | `/5th-grade/themed-spelling-practice/community-civics-words` | 5th Grade Civics and Government Words | 12: `citizen`, `law`, `amendment`, `justice`, `constitution`, `congress`, `election`, `representative`, `liberty`, `rights`, `independence`, `capital` | 12 |

### Content model

All 27 use the shared `spelling-lists` collection schema rather than a themed schema. Present on every page: `id`, `urlSlug`, `title`, `description`, `shortAnswer`, `category: grade-level`, `grade`, `difficulty`, `skillTags`, `tags`, `order`, `estimatedDurationMinutes`, `status`, `masteryThreshold`, `sourceType`, `relatedLists`, `prerequisiteLists`, `nextLists`, `featured`, `words`, and Markdown body. Twenty-four declare `contentRole: vocabulary-theme`; the three older K files (Animal, Body, Family) omit it. Twenty pages have `readinessSignals` and `faq`; seven do not (Grade 1 Numbers/Days, Grade 2 Money/Numbers/Months, Grade 4 Measurement). None has `canonicalSource`, `skillIds`, `hfwWordNotes`, word-object hints/patterns, or authored mastery prose.

The schema defaults relationship arrays, readiness, FAQ, `skillIds`, and HFW notes. `masteryThreshold` is required and is `90` throughout this inventory, but the themed renderer neither explains nor displays it. `sourceType` is `curated`; no public attribution is available. `shortAnswer` exists but only Skill pages render it, so every themed `shortAnswer` is currently inert. The Markdown ranges from two generic paragraphs to topic-heavy prose and tables. Frontmatter `relatedLists`/`prerequisiteLists`/`nextLists` are not the public themed navigation source.

`contentRole: vocabulary-theme` accurately describes the historical form but now nudges authors and metadata toward vocabulary rather than spelling practice, and inconsistent omission makes it unreliable. **Recommendation, not migration in this task:** before production, decide whether to retain it as a legacy form label or add a semantically accurate role such as `themed-spelling-practice-page`; never use it to determine strand or route. The canonical manifest must remain the strand authority.

### Renderer behavior

The deepest route is one shared renderer with a separate Core branch (`GradeUnitWorldPage`) and a common non-Core branch:

1. Static paths come only from published entries resolved through the canonical route manifest.
2. Layout metadata is `${title} — spellingwords`, the description, `ogType="article"`, BreadcrumbList JSON-LD, and conditional FAQPage JSON-LD.
3. Breadcrumbs are Home → Grade Hub → Themed Spelling Practice gateway → current `title`.
4. Hero shows Grade and a category badge. Because themed pages use `category: grade-level`, the badge currently says **Grade Level**, not Themed Spelling Practice. There is no role badge. Hero displays title, description, and “Practice these words.”
5. Core roadmap UI cannot render on themed pages. The practice button serializes playable inventory, stores rich data in session storage, and opens `/play`.
6. Readiness renders for any non-HFW page with signals. This is Core-style leakage: themed pages inherit “These spelling words are a good fit for students who...” despite being optional, nonsequential practice.
7. Inventory heading is `All N words in this list`; `WordListPreview` is shared, with no sentence display for themed pages.
8. Markdown is always introduced by **“Why these words — and what they teach”**. This encourages subject/vocabulary justification and implies a lesson those pages should not own.
9. `hfwWordNotes` and the renderer-owned HFW “Practice and review” section are HFW-only. Themed pages consequently have neither selective structured notes nor shared practice/review guidance.
10. Grade Unit→Skill and Skill→placement sections cannot normally activate because themed pages have no `skillIds` and are not Skills.
11. Authored FAQs render and produce FAQPage JSON-LD. Some current FAQs describe meanings or obsolete “additional practice” taxonomy.
12. Themed navigation renders “Where to go from here” / “Explore more,” based on an explicit, reviewed map of exactly three same-grade peers. It is not sequence navigation and ignores scattered frontmatter relationships. Unlike HFW, themed pages have no explicit “all [grade] Themed Spelling Practice” link at the bottom, although the breadcrumb links to the owner gateway.
13. Source attribution renders only when `canonicalSource.publicAttribution` is true; none qualifies.

**Leakage summary:** Core-style readiness and progression wording (`Where to go from here`) leak into a peer practice strand; generic `Grade Level` labeling obscures the active strand; the body heading promotes vocabulary/subject rationale. HFW-specific UI is correctly gated, but the absence of a themed practice/review equivalent exposes an overly binary Core/HFW renderer design.

### Existing regression coverage

- **Strong:** canonical manifest totals (105 overall; exactly 27 themed), grade distribution, stable IDs/routes, no duplicate route, three strand gateways per grade, and hub-card/manifest equality.
- **Strong:** the explicit Explore More map covers all 27 exactly once; each page has three unique canonical same-grade themed peers; four-page grades link every other peer; five-page grades have balanced inbound coverage; the map is explicitly nonsequential.
- **Strong but indirect:** sitemap generation includes every canonical manifest route and asserts 173 unique URLs; it does not name a themed sample.
- **Reviewed overlap:** HFW tests explicitly permit six case-normalized themed/HFW overlaps: `family`, `interest`, `one`, `three`, `two`, `white`.
- **Missing:** no themed equivalent of the HFW foundation test freezes the exact 27 filenames, IDs, titles, roles, inventories, or body conventions. No test freezes all 237 entries, rejects duplicates inside a themed list, or documents the one peer repeat. No test audits Core/themed overlap. No test verifies themed badge, body heading, readiness policy, gateway backlink, structured-data policy, or obsolete “Additional Practice” prose across themed content.

### Ownership, coherence, and difficulty audit

**Overlap.** Across the full canonical collections, themed/HFW overlap is the six reviewed words above and is useful or harmless: a word can receive automatic-retrieval practice in HFW and theme-bounded retrieval elsewhere. A repository audit found eight themed/Core overlaps (`airplane`, `bug`, `cat`, `cup`, `dog`, `hen`, `pig`, `subway`); five K animal words overlap same-grade Core. These are useful reinforcement because Core owns a sound/pattern and Themed owns application in a recognizable set. `foot` on K Body and Grade 4 Measurement is harmless polysemy and spaced reuse. There is no pedagogical case for a global zero-overlap rule.

**Coherence.** The concrete K–2 categories are generally coherent. Grades 3–5 shift toward curricular-domain terminology (maps, life cycles, multiplication, geometry, ecosystems, civics). Those sets remain coherent spelling-practice contexts, but their current prose often teaches or sells the subject, creating the strongest vocabulary/SEO drift risk. `Career & Occupation` is redundant naming; its inventory is coherent. `Civics and Government` is broader than its route/resource name but coherent enough to retain.

**Difficulty.** Inventory difficulty is uneven but not seriously unsafe: K Animal is mostly decodable CVC/CCVC, while K Numbers and Colors contain advanced spellings (`one`, `two`, `three`, `eight`, `white`) that require substantial support. Grade 1 Shapes contains long multisyllabic terms (`triangle`, `rectangle`) and Grade 1 Days contains conventional capitalization plus difficult spellings (`Wednesday`, `Thursday`). Grade 2 Months includes very long calendar names. Upper-grade domain words appropriately permit multisyllabic and morphological analysis, though `quadrilateral`, `perpendicular`, `denominator`, `representative`, and `independence` are substantial challenges. These are reasons for honest fit guidance and selective notes, not inventory redesign. No serious educational problem requiring a frozen-inventory change was found.

### Current editorial weaknesses

- Many descriptions and bodies emphasize “vocabulary,” topic usefulness, excitement, or background knowledge rather than spelling decisions.
- Repeated formulations (“practice spelling... optional vocabulary”) underserve both people and search intent.
- Several pages explain subject content (bank accounts, government, geometry, life cycles) beyond what identifies the words.
- K Animal/Body/Family are inconsistent in `contentRole` and retain “additional vocabulary/practice” language.
- Existing readiness often measures topic familiarity rather than spelling prerequisites.
- `masteryThreshold: 90` implies precision unsupported by visible product behavior; no authored review model exists.
- FAQs are often generic, vocabulary-oriented, or created because the renderer permits them rather than because users need answers.
- Markdown links include obsolete flat routes in at least the Grade 2 number body, demonstrating why relationships should be executable rather than hand-maintained inline links.

## C. Purpose and strand distinction

| Strand | Organizing logic | Governing instructional question | What the inventory does | What the page must not become |
|---|---|---|---|---|
| Core Spelling | Concept-driven, systematic, cumulative | **How does this spelling system or pattern work, and when do I use it?** | Deliberately exemplifies and practices the taught concept | A miscellaneous list or isolated exceptions catalog |
| High-Frequency Words | Frequency-inventory-driven | **What should I notice and retrieve to spell these frequently encountered words accurately?** | Defines the exact frequently encountered spellings to secure | A phonics scope-and-sequence lesson or “memorize by sight” list |
| Themed Spelling Practice | Practice-context-driven | **What can I notice, say, and retrieve to spell the words in this theme accurately?** | Supplies a meaningful but orthographically mixed practice set | A topic/vocabulary lesson, fake single-pattern lesson, or required sequence |

Themed pages apply previously developing spelling knowledge to a mixed set. They may name patterns, syllables, morphemes, capitalization, compounds, or unusual letter sequences, but must not reteach every underlying system. Their distinct contribution is **transfer and accurate retrieval inside an accessible context**, not conceptual coverage or word-frequency coverage.

## D. Educational research findings

### What evidence supports strongly

1. **Spelling should be taught explicitly, not reduced to visual memorization.** The U.S. Institute of Education Sciences foundational-reading practice guide recommends teaching sound segments and their links to letters, decoding, and word analysis; the upper-elementary guide recommends decoding multisyllabic words and attention to morphology. These are adjacent reading recommendations, but directly support the page's restrained use of phoneme–grapheme, syllable, and morpheme observations ([IES K–3 guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/21), [IES Grades 4–9 guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/29)).
2. **Orthographic learning connects pronunciation, spelling, and meaning.** Ehri's orthographic-mapping account explains how grapheme–phoneme connections support word memory; it does not justify treating an irregular word as an unanalyzed picture ([Ehri, 2014](https://doi.org/10.1080/10888438.2013.819356)).
3. **Morphology deserves increasing attention.** A meta-analysis found morphological instruction benefits literacy outcomes, including spelling, with important variation by learner and intervention ([Goodwin & Ahn, 2010](https://doi.org/10.3102/0034654310362493)). This supports selective bases/affixes/related-word reasoning, particularly in Grades 3–5—not morphology theater on every page.
4. **Producing an answer from memory, checking it, and revisiting it is more defensible than repeated looking/copying.** Retrieval-practice research demonstrates durable learning advantages across many settings, while the spelling-specific transfer must be stated conservatively ([Roediger & Karpicke, 2006](https://doi.org/10.1111/j.1467-9280.2006.01693.x)).
5. **Grade expectations mature from basic conventions to patterns and morphology.** The Common Core Language standards, used here as a widely recognizable benchmark rather than a universal mandate, progress through conventional spelling, consulted references, and roots/affixes ([CCSS Language standards](https://www.thecorestandards.org/ELA-Literacy/L/)).

Commercial programs such as Words Their Way, Fundations, UFLI, and Core Knowledge can inform workflow and age-appropriate language, but they are not evidence that SpellingWords.app should reproduce proprietary sequences or label a semantic list as a phonics lesson. Program names are not endorsements and proprietary wording/content must not be copied.

### Reasonable instructional inference

- A recognizable theme can increase approachability, give a learner a cue for recalling which inventory is under practice, and make the words easier to use in brief writing. This is a practical design inference, not proof of superior spelling learning.
- Comparing heterogeneous words can promote transfer: learners identify which known tools fit which word rather than assuming one rule applies to all.
- Category recall can be a low-load way to prompt words (for example, “spell two weather words from the set”) after exact inventory practice. It should supplement, not replace, hearing each target word.
- A short themed set can support motivation and choice. Claims that it inherently improves memory, engagement, or achievement require direct testing.

### Claims the product should not make

- Semantic grouping is evidence-based as the best way to sequence spelling.
- Knowing the category or definition causes orthographic learning.
- A learner “masters” a list after one session, a fixed number of minutes, or an arbitrary 90% score.
- Every word in a theme shares one phonics rule.
- Theme pages teach the associated science, math, social-studies, or social concept.
- A branded curriculum's existence validates this particular inventory.

## E. Canonical individual-page specification

### Semantic information order

The order below freezes meaning and responsibility, not visual placement.

1. **Identity and concise summary — required, authored.** Name grade, theme, exact number of words, and the most useful spelling character of this inventory in about 35–70 words. It must be unique and answer what the page is for. Avoid enumerating every word when the inventory immediately follows.
2. **Practice action — required, renderer-owned.** Provide a clear route to hear and spell the authoritative inventory. Do not duplicate player instructions in prose.
3. **Exact word inventory — required, executable data.** Preserve spelling, apostrophes, and required capitalization. Frontmatter remains the single source for display and practice.
4. **“What to notice while spelling these words” — required, authored.** Usually 2–4 concise observations (roughly 120–250 words total), each grounded in named inventory examples. Across observations, select only what earns attention: sound–letter mapping, vowel/consonant contrast, syllable chunks, stable sequences, capitalization, compounds, bases/affixes, inflections, or a small number of unexpected spellings. Explicitly allow “these words use several patterns.”
5. **Selective word notes — conditional, authored.** Zero to approximately four notes, with no quota. A note names a retrieval-helpful spelling fact that does not fit a shared observation. A rare pronunciation/context line is allowed only to identify the intended spoken word or spelling; it must not become a definition/example-sentence program.
6. **Practice and later review — required, primarily renderer-owned.** Shared method: hear/say the word; segment or identify meaningful chunks as appropriate; write/type without seeing; compare and correct; retrieve later in mixed practice. An authored one-sentence variation may use the theme as a prompt (for example, recall two list words before hearing the remainder) without testing subject knowledge.
7. **Practice-success guidance — required shared copy, non-gating.** Success means accurate spelling from a spoken prompt without looking and successful retrieval again in later mixed practice. Carry difficult words forward. Do not label completion a prerequisite or expose an unsupported percentage.
8. **Relationships — required, renderer-owned from executable maps.** Link the owner grade gateway and reviewed same-grade peers. Link a Core concept or Skill only when one observation genuinely depends on it and the destination helps the learner; one or occasionally two is enough. No automatic pattern mining.
9. **FAQ — conditional, authored.** Include only real page-specific spelling/capitalization/pronunciation questions not already answered. No FAQ quota and no schema motivation.
10. **Attribution — conditional, renderer-owned from source metadata.** Public only when useful and properly declared.

### Depth and presentation independence

A typical page needs 200–400 authored words beyond its inventory; K can be 100–220, while a genuinely complex Grade 4–5 set may reach 450. Depth follows the inventory, not a word-count target. The standard freezes headings' semantic jobs, not exact labels, components, cards, colors, columns, accordions, typography, or screen order. Content must remain intelligible if rendered as plain text.

### Theme-specific prose guardrails

**Allowed:** identify the category in one sentence; compare actual spellings; discuss syllables, graphemes, meaningful parts, compounds, endings, capitalization, and selective irregularities; use the theme for a bounded recall or writing prompt; disambiguate a word only when needed to prompt it.

**Not allowed:** definitions for each animal/body part/color/relative; anatomy, color theory, family norms, science explanations, math instruction, civics instruction, career descriptions, trivia, or “fun facts”; testing whether a learner understands the domain rather than can spell its words. Family prose should use inclusive, neutral language and never prescribe family structure; spelling does not require doing so.

## F. Readiness recommendation

Remove Core-style readiness as a canonical themed component. The strand is optional and peer-based, so prerequisite signals falsely imply progression and frequently test theme familiarity. Replace it, only when needed, with optional **“A good practice fit”** guidance based on observable word difficulty: for example, “best after the learner can spell short-vowel words and is ready to compare a few less regular number spellings.” This is not a gate, sequence, or requirement.

Most pages need no fit block because grade, summary, inventory, and word count already expose difficulty. Use it for outlier inventories such as K Numbers, Grade 1 Shapes/Days, Grade 2 Months, or Grade 4 Geometry. Renderer policy must stop automatically treating themed `readinessSignals` as Core readiness; existing signals require editorial review before reuse.

## G. Mastery/review recommendation

Do not frame this strand as formal progression or require “mastery.” Use **practice success**:

> A learner can hear a target word, spell it accurately without seeing it, explain or use a helpful spelling feature when appropriate, and retrieve the spelling again in later mixed practice.

This standard is evidence-aligned but intentionally has no fixed percentage, session count, or interval. A first correct response is evidence of current performance, not durable learning. Renderer-owned guidance should tell adults to mix previously difficult words into later practice and let learners revisit any peer theme. Retire or reinterpret the inert `masteryThreshold: 90` for this role through a later schema/product decision; do not silently change it during editorial production.

## H. Word-specific treatment model

A word earns a note only when the note changes how a grade-appropriate learner can analyze, remember, or retrieve its spelling. Good reasons include:

- a less expected grapheme or silent letter (`Wednesday`, `two`, `eight`);
- capitalization or apostrophe (`January`, `o'clock`);
- a useful morpheme/base/affix (`adapt` in `adaptation`, `represent` in `representative`);
- a stable multisyllabic chunk (`-tion`, `-ture`, `-meter`) or syllable boundary;
- doubling, inflection, compound structure, or spelling change (`sun` + `-y` → `sunny`; `fire` + `fighter`);
- a confusable letter sequence or locally relevant pronunciation difference.

Do not note a word merely to restate its letters, define it, supply decorative context, or reach coverage. Prefer a shared observation when two or more words support the same useful comparison. Straightforward words remain inventory-only.

## I. Grade-maturation standard

This is a **response-to-inventory ladder**, not a parallel scope and sequence.

| Grade | Default analytical lens | Language and practice | Themed-specific difference from Core/HFW |
|---|---|---|---|
| K | First/final sounds, short-vowel mapping, simple digraphs; acknowledge rather than over-explain surprising spellings | Very short sentences; say, stretch, map, spell, check; adult mediation assumed | Concrete theme supports prompt recognition. Do not pretend `one`, `two`, or `eight` is beginner-decodable or analyze every exception. |
| 1 | Blends/digraphs, silent-e/vowel teams, inflectional endings, simple syllable chunks, capitalization | Compare small groups and spell from dictation; retain plain wording | Mixed sets can demonstrate choosing among known tools; Core remains responsible for teaching the rules. |
| 2 | Two-syllable division, compounds, vowel alternatives, stable endings, capitalization | Chunk longer calendar/occupation words; selective difficult-word carryover | Theme helps bound a longer inventory, not teach money/calendar/community concepts. |
| 3 | Multisyllabic chunks, compounds, bases/endings, common suffixes and apostrophes | Ask which part is regular and which needs special attention | Domain terms justify orthographic transfer; definitions stay outside scope. |
| 4 | Stable written chunks, stress/reduced vowels where useful, roots/affixes and related words | Compare structures across genuinely related spellings; use pronunciation cautions selectively | Longer domain words permit morphology, but no automatic etymology or concept essay. |
| 5 | Productive morphology, spelling changes in related words, Greek/Latin elements only when transparent, multisyllabic retrieval | Explain a useful structure, then retrieve whole words in mixed review | Analysis can be deeper than lower grades but remains bounded to the list, not a Core morphology lesson. |

## J. SEO strategy

### Individual-page intent

Each member page should own the intersection **grade + theme + spelling words/practice**: e.g., “kindergarten animal spelling words,” “Grade 3 time spelling words,” or “5th grade ecosystem spelling practice.” It should satisfy the intent with an immediately visible exact list, grade-appropriate spelling observations unique to those words, and a genuine practice action. It should not target generic “animal vocabulary,” “what is an ecosystem,” or subject worksheets.

### Future gateway intent

The grade Themed Spelling Practice gateway should later own broad discovery intent such as “Kindergarten themed spelling lists” and compare/select themes. Member pages should not duplicate a gateway overview or list every grade peer in prose. Gateways should summarize and link; members should analyze and practice one inventory. The existing hierarchy provides the correct differentiation and should not change.

### Metadata and cannibalization

- Recommended H1/title semantic pattern: **`[Grade label] [Theme] Spelling Words`**. It leads with the common query noun and clearly states spelling purpose. Examples: “Kindergarten Animal Spelling Words”; “Grade 4 Geometry Spelling Words.”
- A natural alternative (“[Grade] [Theme] Words for Spelling Practice”) may be used only if a title becomes awkward, but consistency is more valuable than gratuitous variation.
- Description: unique, accurate summary with count and one or two real spelling features; do not dump the inventory or repeat keyword variants.
- Keep current routes unchanged. Route labels need not exactly mirror H1 wording.
- Avoid making both gateway and member pages target “[grade] themed spelling words” without theme differentiation.

Google's documented priorities support people-first content, descriptive and concise title text, crawlable links, and structured data that matches visible content ([helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [title links](https://developers.google.com/search/docs/appearance/title-link), [crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)). Search performance claims should be evaluated after release, not encoded as educational requirements.

## K. GEO/AEO strategy

### Well-supported requirements

- Answer the page's purpose in a direct, self-contained summary.
- Use descriptive headings, exact inventories, precise terminology, and unique examples.
- Maintain crawlable hierarchical and contextual internal links.
- Keep metadata consistent with visible content and JSON-LD consistent with what users can read.
- Preserve authorship/provenance internally and show attribution only when useful.

### Reasonable hypotheses to test

- Consistent grade/theme/spelling terminology and self-contained observation passages may make content easier for both people and retrieval systems to interpret.
- Explicit semantic relationships (grade owner, peer themes, selectively relevant concept) may clarify topical relationships.
- Concise answers followed by evidence/examples may work well in answer surfaces.

### Speculative and therefore not requirements

No AI-specific schema, FAQ quota/stuffing, arbitrary answer length, keyword density, “table for AI,” hidden machine-targeted text, or claim that schema guarantees citation. FAQPage markup must appear only for genuine visible FAQs; Google currently limits FAQ rich-result eligibility largely to authoritative government and health sites, further undermining FAQ production as an SEO tactic ([FAQ structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/faqpage)).

## L. Topical-authority/internal-linking model

The primary graph is:

`Elementary Spelling → Grade → Themed Spelling Practice gateway → Theme member page`

Every member must expose its owning gateway through breadcrumbs and a clear return link; the gateway owns discovery, while the member owns its theme inventory and analysis. Reviewed same-grade peers support lateral exploration without “next lesson” language.

A member may link to one or exceptionally two Core/Skill resources when (1) the authored observation materially uses that concept, (2) the concept is central enough to help, and (3) the target is canonical and age-relevant. Relationship data should be authored/reviewed and executable. Do not infer links from every matching word, repeat the same boilerplate links on all pages, or link to subject-area definitions. Cross-grade themed links should be rare and purposeful (the number/calendar ladder is a plausible case) and must not imply prerequisites.

## M. Naming recommendation

- **Public strand:** keep **Themed Spelling Practice** exactly. Never restore “Additional Practice.”
- **Member H1/page title:** migrate editorially, page by page, toward `[Grade label] [Theme] Spelling Words`; this is clearer than current “Animal Words” and less awkward than placing “for Spelling Practice” in every H1.
- **Browser title:** renderer may add the site name; avoid hard-coded duplicate brand text in authored titles.
- **Theme label:** derive/display a human-edited theme name rather than guessing from the URL. Ampersand versus “and” should be editorially consistent, but routes stay frozen.
- **Internal role:** `vocabulary-theme` is semantically misleading as the sole role name and inconsistently applied. Recommend a separately reviewed migration to `themed-spelling-practice-page` (or omission if manifest classification is sufficient). Do not conflate `contentRole` with strand classification.

## N. Core vs HFW vs Themed comparison table

| Responsibility/component | Core | HFW | Themed |
|---|---|---|---|
| Organizing authority | Orthographic concept/scope | Frozen frequency inventory | Frozen semantic-theme inventory |
| Primary teaching | Explain and generalize a system | Secure exact frequent spellings | Apply spelling knowledge and retrieve a mixed themed set |
| Summary | Concept definition/outcome | Grade, set, count, inventory character | Grade, theme, count, spelling value |
| Inventory | Curated examples/practice | Central and exhaustive for set | Central and exhaustive for theme |
| Shared observations | Required concept exposition | Required inventory observations | Required, brief, plural/heterogeneous |
| Individual notes | Only if concept needs | Selective irregular/structural | Selective retrieval-helpful only |
| Readiness | Appropriate for sequence placement | Omitted by current frozen standard | Generally none; optional non-gating fit guidance |
| Practice/review | Concept application and cumulative progression | Shared retrieval and carry-forward | Shared retrieval and later mixed review, lighter/nonsequential |
| Success/mastery | Concept use in current and later contexts | Accurate automatic retrieval across reviews | Accurate retrieval now and later; not a progression gate |
| Navigation | Sequence and concept relationships | Previous/next within grade plus owner | Owner gateway plus same-grade peers; no sequence language |
| Context/examples | Demonstrate concept | Rare disambiguation | Rare prompt/disambiguation; no subject teaching |
| Structured data | Visible-content-derived | Visible-content-derived | Breadcrumb always; FAQ only when genuine; no special AI schema |

## O. Recommended content schema

### Smallest model for the pilot

Do **not** add spelling groups, context, pronunciation, or note fields before the pilot proves they are needed. The existing inventory plus Markdown can express the required summary and 2–4 shared observations. Add only one new optional semantic field for selective notes:

```ts
wordNotes: Array<{
  word: string;                 // must resolve exactly to inventory
  note: string;                 // spelling-focused
  pronunciationNote?: string;  // rare; identification/dialect only
  contextExample?: string;      // rare; disambiguation only
}>
```

Prefer **generic `wordNotes`** over `themedWordNotes` because the semantics are genuinely cross-inventory and presentation-independent. In a later migration, generalize `hfwWordNotes` to `wordNotes` while retaining strand-specific editorial validation and renderer headings. Do not simply author themed content into `hfwWordNotes`: its name is false and its current renderer is HFW-gated. The pilot should validate zero, one, and several notes without requiring notes for all words.

No `spellingGroups` field is recommended initially: groups are explanatory prose, may overlap, and can falsely imply exhaustive taxonomy. No stored example sentences are recommended: playable sentences remain sentence-bank-owned, and authored context is rare. Keep `words` authoritative. Add validation that every note word occurs exactly once in `words`, note words are unique, and notes appear only on supported roles.

Separately decide `contentRole`, readiness semantics, and whether `masteryThreshold` can become optional/non-applicable for themed pages. Those are prerequisites for scale but not reasons to inflate the editorial schema.

### Shared renderer implications

**Can remain shared:** canonical routing, breadcrumbs, Layout metadata, practice serialization/CTA, word inventory, FAQ rendering/JSON-LD, source attribution, card/list primitives, and relationship resolution.

**Must become strand-specific before production:** correct Themed Spelling Practice badge; body semantic heading; non-gating fit behavior; selective generic notes; shared themed practice-success copy; peer navigation heading and owner-gateway link. Themed pages must be identified from route classification, not category/content role.

**Authored:** unique summary/description, shared observations, selective notes, rare fit guidance/FAQ, and reviewed concept relationships. **Renderer-owned:** generic practice mechanics, success/review language, count, navigation labels, breadcrumbs, CTA, schema emission, and attribution display. Never duplicate renderer-owned sections in Markdown.

## P. Representative real-page examples

These are treatment sketches, not production edits.

### K — `kindergarten-animal-words`

**Inventory:** `bug`, `cat`, `dog`, `duck`, `fish`, `frog`, `hen`, `pig`.

**Useful treatment:** state that eight animal names provide mostly short-vowel practice. Group `bug/cat/dog/hen/pig` as three-sound CVC spellings; compare final digraph `sh` in `fish`, final `ck` in `duck`, and blend `fr` in `frog`. A short prompt can ask the learner to hear each sound and spell without seeing. No individual notes are necessary if `sh`, `ck`, and `fr` are handled in shared observations.

**Vocabulary drift risk:** defining animals, describing habitats, or saying familiar animals are educational because they are “fun.” Current prose largely sells familiarity instead of explaining spelling.

**Production depth:** about 120–170 authored words, plain language, no formal readiness. This is an unusually clean set, so it is not the best schema pilot despite being easy to improve.

### Grade 1 — `grade-1-weather-words`

**Inventory:** `sunny`, `rainy`, `cloudy`, `windy`, `snowy`, `stormy`, `foggy`, `hot`, `cold`.

**Useful treatment:** compare the recurring `-y` ending in seven words and clarify that shared meaning/ending does not make every base spell alike. Show doubled consonants in `sunny` and `foggy`; preserve base spellings in `rainy`, `cloudy`, `windy`, `snowy`, `stormy`; contrast short `o` in `hot` with `old` in `cold`. A theme-specific recall variation can prompt “spell three `-y` weather words from the list,” followed by normal dictated practice.

**Vocabulary drift risk:** explaining clouds, storms, temperature, or the weather cycle. A picture may identify the intended word in a future design, but prose should analyze spelling.

**Production depth:** about 180–240 words; likely no individual notes because group comparisons do the work.

### Grade 3 — `grade-3-time-words`

**Inventory:** `hour`, `minute`, `second`, `o'clock`, `digital`, `analog`, `clock`, `elapsed`.

**Useful treatment:** give `o'clock` a selective note for apostrophe placement and `hour` a note for its silent initial letter/pronunciation. Compare `clock/o'clock`, chunk `min-ute`, `sec-ond`, `dig-it-al`, `an-a-log`, and `e-lapsed` cautiously without presenting one universal division method. Name stable `-al` in `digital` and `analog` only as a comparison, not a rule. Practice should dictate the word, including an explicit reminder to preserve punctuation for `o'clock`.

**Vocabulary drift risk:** teaching analog versus digital clocks or elapsed-time calculation. Context is needed only to identify `o'clock`; definitions belong elsewhere.

**Production depth:** about 220–300 words and two selective notes. This page usefully tests apostrophe and pronunciation support.

### Grade 4 — `grade-4-geometry-words`

**Inventory:** `perimeter`, `area`, `quadrilateral`, `vertex`, `perpendicular`, `symmetry`, `angle`, `polygon`.

**Useful treatment:** group stable chunks (`peri-meter`, `poly-gon`) only where instructionally honest; compare `quadrilateral` and `perpendicular` as long words best retrieved in spoken/written chunks; call attention to double `m` in `symmetry`; note final `-le` in `angle`; contrast singular `vertex` without teaching the geometry concept. A link to a genuinely relevant multisyllabic Core/Skill page could be reviewed.

**Vocabulary drift risk:** defining shapes, calculating perimeter, or describing lines. These terms tempt subject teaching more than K themes do.

**Production depth:** about 280–400 words; two or three selective notes. Fit guidance may honestly flag a demanding multisyllabic set without making it sequential.

### Grade 5 — `grade-5-ecosystem-environment-words`

**Inventory:** `habitat`, `ecosystem`, `organism`, `adaptation`, `population`, `predator`, `prey`, `extinct`.

**Useful treatment:** compare `adapt`/`adaptation`; notice shared `-ation` in `adaptation` and `population` without implying identical bases; chunk `eco-system` and recognize `system` as a stable written part; contrast multisyllabic `organism` and `predator`; note `ey` spelling in `prey` and final consonant cluster in `extinct`. Related-word reasoning can support `adaptation`, but definitions of ecosystem relationships are unnecessary.

**Vocabulary drift risk:** current-topic exposition about organisms and environments. The theme identifies the set; it does not license a science lesson.

**Production depth:** about 250–350 words and perhaps one note for `prey`; most value belongs in shared morphology/chunk observations.

## Q. Pilot recommendation

Pilot **Grade 1 Weather Words** (`grade-1-weather-words.md`, `/1st-grade/themed-spelling-practice/weather-words`). It is representative rather than trivial: nine coherent words, a genuine recurring ending, two doubling cases, several base-spelling contrasts, and two non-`-y` words. It tests the core editorial challenge—finding real cross-word observations without claiming one pattern—while avoiding the heavy subject-definition pressure of upper-grade domain sets.

The pilot should validate:

1. a spelling-first title/summary and new body semantic heading;
2. 2–4 authored observations with no forced per-word note coverage;
3. zero structured notes as a valid outcome (then a second fixture or review can test note rendering);
4. theme-specific retrieval variation plus shared renderer-owned review copy;
5. no Core readiness or HFW sequence language;
6. correct strand badge, owner-gateway link, and nonsequential peer links;
7. schema/content validation without changing its frozen inventory or route;
8. editorial tests that distinguish authored from renderer-owned copy.

Do not start this pilot until the prerequisites below are accepted.

## R. Anti-patterns

1. Turning the theme into vocabulary, anatomy, math, science, social-studies, financial-literacy, or reading-comprehension instruction.
2. Generic enthusiasm (“fun,” “exciting,” “words kids love”) without inventory-specific spelling value.
3. Restoring “Additional Practice” or using `additional-practice` as active taxonomy.
4. Calling mixed theme words a single spelling pattern or forcing every word under one rule.
5. Writing a Core-style concept essay or duplicating a linked Core lesson.
6. Applying HFW-style irregularity analysis to every themed word.
7. Notes, definitions, sentences, pronunciation guides, or etymologies for every word.
8. Treating a note quota, paragraph count, or word count as quality.
9. Subject trivia or factual claims unnecessary to identify/spell targets.
10. Readiness bullets based on knowing the topic; sequential “next”/“master before moving on” language.
11. Unsupported 90%, minutes-to-mastery, session-count, engagement, memory, or “science of reading” claims.
12. Automatic links to every detectable pattern or Skill; inline hard-coded legacy routes.
13. FAQ stuffing, keyword variants, definitions written for snippets, or schema unsupported by visible content.
14. Generic duplicated introductions across 27 pages.
15. Visual-layout-dependent directions (“blue box,” “three cards,” “below the list”).
16. Moving the inventory into Markdown or allowing display/practice copies to diverge.
17. Silently changing inventory, route, gateway, Grade Hub, content role, or shared schema during editorial work.
18. Assuming theme familiarity is universal or using exclusionary family/culture examples.

## S. Implementation prerequisites

Before production editing begins:

1. Approve/freeze this semantic standard and the governing question.
2. Decide the internal `contentRole` migration separately; confirm route manifest remains strand authority.
3. Decide whether `masteryThreshold` is optional/inapplicable for themed pages and document product scoring semantics.
4. Specify the generic optional `wordNotes` migration and exact validators; do not add spelling groups prematurely.
5. Make the renderer strand-aware for badge, body heading, fit/readiness, notes, shared review/success copy, peer wording, and explicit owner link.
6. Review/remove current themed FAQs and readiness signals that test vocabulary/topic familiarity or repeat obsolete taxonomy.
7. Add a frozen themed curriculum manifest/test covering 27 files, routes, exact inventories/order/case/punctuation, unique words inside each page, approved `foot` peer repeat, and reviewed cross-strand overlaps.
8. Add renderer regression tests for no Core/HFW leakage and tests ensuring authored Markdown does not duplicate renderer-owned sections.
9. Add an explicit themed route assertion to sitemap tests and validate every executable relationship.
10. Run the single Grade 1 Weather pilot, editorial/technical/age review it, and adjust the standard before scaling. Complete all member pages before later gateway enhancement.

## T. Canonical Themed Spelling Practice Page Standard — Proposed

1. A member page is spelling practice in a meaningful theme, not a vocabulary or subject lesson.
2. Its governing question is: **What can I notice, say, and retrieve to spell the words in this theme accurately?**
3. The canonical route manifest owns strand identity; frontmatter `words` owns exact inventory and practice data.
4. Required authored content: unique grade/theme/count/spelling summary and 2–4 concise, inventory-grounded spelling observations.
5. Required shared behavior: exact inventory, hear-and-spell practice, feedback, later mixed review, practice-success guidance, owner gateway, and reviewed same-grade peers.
6. Selective notes are optional and justified only by retrieval-helpful spelling, morphology, capitalization/punctuation, or necessary pronunciation/context; straightforward words receive none.
7. Theme context may identify or cue targets but may not teach definitions, domain content, trivia, or social norms.
8. Pages may contain several spelling structures and must never invent a common pattern.
9. Core-style readiness is absent by default; rare fit guidance is non-gating and based on spelling difficulty.
10. Success means accurate spelling from a spoken prompt without looking and retention in later mixed practice; no arbitrary score or timing claim.
11. Analysis matures from simple sound–letter attention to selective syllable/morpheme reasoning according to the actual K–5 inventories; it does not create a second scope and sequence.
12. Titles should clearly own grade + theme + spelling intent; routes and public strand name remain unchanged.
13. Internal links follow Grade → gateway → member, plus reviewed peer links and only selectively relevant Core/Skill links.
14. Semantic content and relationships are frozen independently of cards, colors, columns, accordions, typography, or future layout.
15. Research claims remain conservative: themes provide accessible practice context; orthographic analysis, retrieval, feedback, and review provide the instructional mechanism.

**THEMED SPELLING PRACTICE STANDARD READY FOR PILOT IMPLEMENTATION**
