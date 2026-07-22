# Final K–5 Spelling Website Content Plan

## Executive recommendation

The three-section model is sound and should be kept. It matches what parents actually need from a grade-level spelling page: a clear starting path, a place for commonly assigned everyday words, and a place for optional topic-based review. The problem was not the three-part structure itself; the problem was vague labeling and an unclear boundary between transferable spelling instruction and miscellaneous word lists. A stable architecture for SpellingWords.app should therefore use these section names across all grades: Learn in Order, Common Words to Spell, and Practice by Topic. Those labels are clearer than Core Progression, High-Frequency Words, and Additional Practice because they use everyday search language, describe what the parent can do next, and avoid low-information-scent labels that usability research consistently warns against.

Use Learn in Order consistently from Kindergarten through Grade 5. It is stronger than Spelling Lessons because it conveys sequence, which is the defining feature of this section. Use Common Words to Spell consistently across all grades as well. It is broader and more accurate than Sight Words or High-Frequency Words because early grades include high-frequency and Heart Word work, while upper grades shift toward persistent everyday trouble words and commonly misspelled forms. Use Practice by Topic across all grades for optional collections; it is clearer than Additional Practice or More Practice because it tells parents that these are browsable topic pages rather than the main sequence.

This architecture is stable enough to implement now. The site should treat grade pages as recommended routes and skill pages as alternate routes to the same canonical practice pages. In other words, "Short A Words" or "Prefixes Un-, Re-, and Dis-" should exist once, with one canonical URL, and appear wherever they are relevant: in a grade sequence, in a skill browse page, and in search. That approach fits both literacy instruction and clean information architecture.

The high-frequency-word section should not disappear in Grades 3–5, but its meaning should change. In Kindergarten through Grade 2, it should primarily cover high-utility common words, including irregular and temporarily irregular words taught with Heart Word logic. In Grades 3–5, it should narrow to everyday words that continue to matter in children's writing and are often misspelled, while homophones and concept-driven conventional choices should live primarily in Learn in Order. That division better reflects how orthographic mapping, phonics, morphology, and conventional spelling develop over time.

## Evidence base and decision rules

There is no single nationally mandated K–5 spelling sequence. U.S. standards and frameworks differ in pacing, especially around late-Kindergarten blends and digraphs, the precise handoff from Grade 2 to Grade 3 for spelling changes with suffixes, and how early Greek and Latin roots are introduced. But the broad mainstream pattern is remarkably consistent: early grades focus on phoneme-grapheme correspondences and one-syllable spelling; the next phase adds long-vowel patterns, r-controlled vowels, inflectional endings, and multisyllabic word work; upper elementary shifts more heavily into syllable division, prefixes, suffixes, morphology, roots, and conventional spelling distinctions such as homophones and related-word spelling changes.

That progression is also consistent with spelling research. Ehri's orthographic-mapping work explains that stored word memory for both reading and spelling depends on secure letter-sound connections rather than visual memorization alone. Moats argues that spelling instruction should continue beyond early phonics into inflections, syllables, prefixes, suffixes, and later Latin- and Greek-based forms. Kentucky's literacy guidance similarly states that more complex phonics should continue through Grade 3 and beyond, not end after Grade 1.

A sound spelling architecture for a parent-facing website should therefore follow these rules.

First, Learn in Order must be based on encoding expectations, not merely decoding, vocabulary, or broad ELA topics. Texas's TEKS guide explicitly defines encoding as using letter-sound knowledge to write or spell words and separates that from decoding, while the Common Core language standards separately treat spelling as part of writing conventions. That distinction matters. A grade-page sequence should not be built from reading-only skills unless there is good reason to believe those patterns also belong in mainstream spelling instruction.

Second, the site should distinguish transferable spelling skills from topic collections. If a lesson generalizes to many new words, it belongs in Learn in Order: short-vowel spelling, silent e, vowel teams, r-controlled vowels, inflectional endings, syllable division, prefixes, suffixes, roots, homophones, related-word spelling changes. If a page is a bounded vocabulary collection such as Color Words or Science Words: Matter and Space, it belongs in Practice by Topic. That distinction is consistent with structured phonics guidance, multisyllabic-word guidance, and morphology research.

Third, gateways are justified only when the parent-facing umbrella is already meaningful and the underlying pages are tightly related. Silent E Long Vowels or Greek Root Words are good gateway cards. Vowel Practice or More Topics are not. Usability research favors descriptive, concrete labels with strong information scent; vague buckets make users skip or mistrust navigation.

Fourth, a calm grade page does not mean an artificially tiny page. The right target is about 14–16 visible cards per grade page, occasionally a little lower or higher, so long as they are grouped within the three sections and the card titles are specific. That is a product judgment, not a standards requirement, but it is consistent with usability guidance favoring specific labels and clear, scannable information architecture.

## Source base

Standards and state guidance. Common Core Language and Foundational Skills; Kentucky literacy guidance; Texas TEKS guide vertical alignment; South Carolina vertical articulations.

Phonics and spelling progression. Reading Rockets early-reading guidelines; UFLI scope and sequence; Moats on spelling development.

High-frequency words and orthographic mapping. Ehri; Reading Rockets on sight words and orthographic mapping; Reading Rockets' high-frequency-word model; UFLI irregular and Heart Word guidance.

Morphology and multisyllabic spelling. Manyak, Baumann, and Manyak; Louisiana multisyllabic word guide; South Carolina morphology progression.

Plain-language and IA guidance. Nielsen Norman Group and Digital.gov plain-language guidance.

## What is evidence-supported, what is a product judgment, and what remains uncertain

The following conclusions are strongly supported: K–2 spelling should follow a systematic phonics/encoding sequence; high-frequency words should not be taught primarily as unanalyzed wholes; irregular portions should be marked and learned "by heart" while regular parts stay connected to phonics; focused morphology becomes more important beginning in Grade 3 and is clearly expected in Grades 4–5.

The following are product judgments made for website clarity rather than dictated by standards: the exact section labels; the target number of visible cards per grade; the decision to use one common-word gateway per grade page; the exact number of common-word pages; and the final optional-topic lineup. Those decisions are designed to make the site implementable and calm without flattening the curriculum.

The main uncertainties that should remain flexible only at the margin are these: whether late-Kindergarten includes blends and digraphs as essential or preview content; whether some suffix-spelling-change work appears in Grade 2 or Grade 3; and the exact root sets used in Grades 4 and 5. The architecture below already absorbs those uncertainties by placing borderline content either late in a grade, as preview/review, or in reusable skill routes.

## High-frequency words, sight words, and Heart Words

A modern evidence-based spelling website should not use sight words as its main public architecture term. In research-based reading instruction, a sight word is any word a reader can recognize instantly from memory; that is an outcome, not a curriculum category. A high-frequency word is a word that appears often in print. Some high-frequency words are fully decodable; some are irregular or only temporarily irregular because students have not yet learned the relevant pattern. Heart Words are a teaching routine for drawing attention to the irregular part that must be learned "by heart," while still analyzing the regular part through phonics.

That distinction matters for SpellingWords.app. Reading Rockets' overview explains that memorizing lists does not create a sight-word vocabulary unless phonics and phonemic awareness are also present. Its "new model" article recommends dividing common words into decodable Flash Words and irregular Heart Words, grouping them by teachable patterns rather than treating them as raw frequency lists. UFLI similarly distinguishes permanently irregular and temporarily irregular words and teaches only the unexpected part as the "heart" part.

For list sources, Dolch and Fry should be treated as reference pools, not as the site's visible organizing system. The Dolch 220 list comes from Edward Dolch's basic sight-vocabulary work; Fry's list is a later and much larger "Instant Words" list divided into hundreds. Both are widely used, but neither should dictate public page titles or a strict grade architecture. Instead, the site should use a hybrid: draw from high-frequency lists and school-common words, sequence words by instructional usefulness and teachability, and tag individual words internally as decodable, temporarily irregular, or permanently irregular.

This also answers the "all taught as wholes?" question: no. Farrell, Osenga, and Hunter's model explicitly argues that high-frequency words should be sorted by whether they are regular or irregular, and many words can move from Heart Word status to decodable status after a child learns more phonics. Reading Rockets' broad phonics guidance likewise recommends only a limited set of early sight words and says that irregular words should not overshadow word-identification strategies.

The public section heading should therefore be Common Words to Spell. That heading is parent-understandable, still compatible with search queries like kindergarten sight words and 1st grade sight words, and broad enough to remain useful in Grades 3–5 when the focus shifts away from classic sight-word acquisition. The site should preserve familiar terminology in helper copy, internal tags, page metadata, and optional explanatory notes such as "Includes kindergarten sight words and Heart Words."

In Grades 3–5, this section should not simply continue raw Dolch/Fry coverage. Instead, it should pivot toward high-utility everyday words and conventionally difficult spellings that children still need in writing, while homophone pairs and contrastive spelling decisions belong mainly in Learn in Order because they are concept-based conventional choices, not just word-frequency problems. Texas explicitly identifies homophone spelling in Grade 3 foundational spelling expectations, and upper-grade standards increasingly foreground affixes, roots, and word analysis.

## Recommended high-frequency-word plan

| Grade | Recommended public label | Approximate total words | Number of 8–16-word practice pages | Organizational method | Relationship to Dolch, Fry, and Heart Words | Notes |
|---|---|---|---|---|---|---|
| Kindergarten | Common Words to Spell | 50 | 5 | Hybrid sequence: highest-utility everyday words first; within pages, group similar spellings when possible | Draw from early Dolch/Fry-style words; mark irregular parts as Heart Word features | Includes a very small pre-decoding core, then simple common words tied to phonics |
| Grade 1 | Common Words to Spell | 84 | 7 | Hybrid sequence by usefulness and teachability | Continue common Dolch/Fry pool; Heart Word marking used when needed | Many words will also become fully decodable as phonics expands |
| Grade 2 | Common Words to Spell | 96 | 8 | Hybrid sequence, cumulative across school writing needs | Remaining high-utility K–2 common words, contractions, and irregular forms | Final heavy year for classic common-word acquisition |
| Grade 3 | Common Words to Spell | 72 | 6 | Everyday writing words, not pure frequency order | Mix of remaining high-utility common words and frequent trouble words | Shift away from "sight words" as a visible concept |
| Grade 4 | Common Words to Spell | 60 | 5 | Everyday/tricky words grouped into usable writing sets | Only light use of Dolch/Fry as background pools | Exclude words already taught in dedicated homophone core pages |
| Grade 5 | Common Words to Spell | 60 | 5 | Everyday/tricky words and persistent misspellings | High-frequency lists are background only | Keep distinct from morphology-heavy core lessons |

The site should use one gateway card on each grade page for this section, with the individual sets listed on the gateway page. That keeps the grade page calm while still allowing full coverage. This is a justified gateway because the underlying pages are tightly related and sequential, not a miscellaneous bucket.

### Recommended sample sequence of page titles

**Kindergarten:**
- Kindergarten Common Words 1
- Kindergarten Common Words 2
- Kindergarten Common Words 3
- Kindergarten Common Words 4
- Kindergarten Common Words 5

**Grade 1:**
- Grade 1 Common Words 1
- Grade 1 Common Words 2
- Grade 1 Common Words 3
- Grade 1 Common Words 4
- Grade 1 Common Words 5
- Grade 1 Common Words 6
- Grade 1 Common Words 7

**Grade 2:**
- Grade 2 Common Words 1
- Grade 2 Common Words 2
- Grade 2 Common Words 3
- Grade 2 Common Words 4
- Grade 2 Common Words 5
- Grade 2 Common Words 6
- Grade 2 Common Words 7
- Grade 2 Common Words 8

**Grade 3:**
- Grade 3 Common Words 1
- Grade 3 Common Words 2
- Grade 3 Common Words 3
- Grade 3 Common Words 4
- Grade 3 Common Words 5
- Grade 3 Common Words 6

**Grade 4:**
- Grade 4 Common Words 1
- Grade 4 Common Words 2
- Grade 4 Common Words 3
- Grade 4 Common Words 4
- Grade 4 Common Words 5

**Grade 5:**
- Grade 5 Common Words 1
- Grade 5 Common Words 2
- Grade 5 Common Words 3
- Grade 5 Common Words 4
- Grade 5 Common Words 5

### Exact common-word page philosophy

Use numbered sets, not theme names, for the common-word pages themselves. Numbering is clearer because the section is cumulative and sequential. Within each set, group words by spelling feature wherever possible so children can notice patterns and Heart Word features rather than memorizing disconnected word strings. That recommendation aligns with Reading Rockets' high-frequency-word model and still preserves the familiar parent expectation of "word sets."

Do not duplicate the same word across multiple common-word pages unless there is a purposeful review page. Decodable common words may show up as examples elsewhere in core practice, but they should have only one canonical home in the common-word sequence. Heart Word status should be handled as an instructional note, not as a separate public page type. A word can move from "temporarily irregular" to "fully decodable" as the child learns more spelling patterns.

## Final K–5 grade-page plan

### Kindergarten

Kindergarten standards and mainstream early-literacy guidance emphasize letter-sound correspondences and simple phonetic spelling, not a full menu of advanced phonics topics. That means the Kindergarten core should focus on short-vowel VC/CVC spelling and simple phonetic encoding, with blends and digraphs available near the end of the grade as preview content rather than the center of the year.

| Section | Exact card title | Purpose | Recommended order | Page type | Estimated underlying 8–16-word pages | Example spelling content | Status | Evidence-based rationale |
|---|---|---|---|---|---|---|---|---|
| Learn in Order | Short A Words | Establish first dependable CVC spelling pattern | 1 | Individual practice page | 1 | cat, map, fan | Essential | Simple phonetic spelling and short-vowel encoding are the clearest mainstream Kindergarten targets |
| Learn in Order | Short I Words | Continue one-vowel-at-a-time short-vowel spelling | 2 | Individual practice page | 1 | sit, pig, fin | Essential | Keeps contrast load manageable |
| Learn in Order | Short O Words | Build flexibility across short-vowel CVC words | 3 | Individual practice page | 1 | hot, box, mop | Essential | Extends phonetic spelling without adding multiple new concepts |
| Learn in Order | Short E Words | Add less salient short e in a controlled way | 4 | Individual practice page | 1 | bed, net, pen | Essential | Short e often benefits from deliberate isolated practice |
| Learn in Order | Short U Words | Complete the basic short-vowel set | 5 | Individual practice page | 1 | sun, bug, cup | Essential | Completes core CVC short-vowel coverage |
| Learn in Order | Mixed CVC Words | Review across all five short vowels | 6 | Review page | 1 | cat, sit, mop | Review | Helps parents see whether the child can choose the right vowel, not just match a list |
| Learn in Order | Beginning Blends | Offer late-year practice with simple consonant clusters | 7 | Individual practice page | 1 | flag, step, drum | Preview | Blend timing varies across programs, so late-K preview is safer than making it central |
| Learn in Order | Digraph Words | Offer late-year practice with common digraphs | 8 | Individual practice page | 1 | ship, chop, that | Preview | Digraphs often arrive late in K or early in Grade 1 depending on curriculum |
| Common Words to Spell | Kindergarten Common Words | Provide the full Kindergarten common-word sequence | 1 | Gateway page | 5 | the, a, I, and, is | Essential | K needs more than one "sight word" page, but a single gateway keeps the grade page calm |
| Practice by Topic | Color Words | Meet one of the most common parent requests | 1 | Individual practice page | 1 | red, blue, green | Optional high-value | Useful, concrete, and age-appropriate |
| Practice by Topic | Number Words 1–10 | Support school-home practice for early number words | 2 | Individual practice page | 1 | one, two, three | Optional high-value | Frequently requested and worthwhile for early spelling |
| Practice by Topic | Family Words | Support everyday writing vocabulary | 3 | Individual practice page | 1 | mom, dad, sister | Optional high-value | High relevance in early writing |
| Practice by Topic | School Words | Reinforce words children use immediately | 4 | Individual practice page | 1 | bus, class, desk | Optional high-value | Concrete and functional |
| Practice by Topic | Animal Words | Provide motivating, useful early practice | 5 | Individual practice page | 1 | dog, cat, fish | Optional high-value | Popular with families and still real spelling practice |

### Grade One

Grade 1 is the heaviest one-syllable spelling year. Across major guidance, it is where children consolidate short vowels, add blends and digraphs, learn silent-e long vowels, add common vowel teams and r-controlled vowels, and begin working with frequent inflectional endings and a limited but important set of common irregular words.

| Section | Exact card title | Purpose | Recommended order | Page type | Estimated underlying 8–16-word pages | Example spelling content | Status | Evidence-based rationale |
|---|---|---|---|---|---|---|---|---|
| Learn in Order | Short Vowel Review | Confirm Grade 1 readiness for the rest of the sequence | 1 | Review page | 1 | cat, bed, pig | Review | Many Grade 1 students still need quick short-vowel consolidation |
| Learn in Order | Blends | Practice cluster spelling without mixing in multiple new vowel ideas | 2 | Individual practice page | 1 | flag, hand, jump | Essential | Blends are a mainstream Grade 1 expectation |
| Learn in Order | Digraphs | Group the most common consonant digraph spellings | 3 | Gateway page | 2 | ship, chop, thin | Essential | Coherent umbrella with only two tightly related child pages |
| Learn in Order | Special Endings ff, ll, ss, zz and ck | Teach common final spelling conventions | 4 | Individual practice page | 1 | hill, miss, back | Essential | These conventions strongly support accurate one-syllable spelling |
| Learn in Order | Silent E Long Vowels | Introduce the high-utility VCe pattern | 5 | Gateway page | 3 | cake, bike, home | Essential | Silent e is a major Grade 1 turning point and needs multiple pages |
| Learn in Order | Long Vowel Teams | Expand long-vowel spelling beyond VCe | 6 | Gateway page | 4 | rain, seed, boat | Essential | Vowel teams are explicitly mainstream in Grade 1 and early Grade 2 |
| Learn in Order | R-Controlled Vowels | Teach common vowel-r spellings in manageable chunks | 7 | Gateway page | 3 | farm, storm, bird | Essential | Common, useful, and better broken apart than lumped together |
| Learn in Order | Plurals with -S and -Es | Begin spelling with simple inflectional endings | 8 | Individual practice page | 1 | cats, wishes, boxes | Essential | Grade 1/2 standards increasingly connect morphology with spelling |
| Learn in Order | Endings -Ing and -Ed | Practice frequent endings used in everyday writing | 9 | Individual practice page | 1 | jumping, jumped, rested | Essential | Inflectional endings support both reading and writing transfer |
| Learn in Order | Final V Spelled Ve | Teach a reliable English spelling convention | 10 | Individual practice page | 1 | have, give, solve | Essential | This convention is high utility and reduces persistent errors |
| Common Words to Spell | Grade 1 Common Words | Provide the full Grade 1 common-word sequence | 1 | Gateway page | 7 | was, you, for, said | Essential | Grade 1 needs sustained common-word instruction, not a token list |
| Practice by Topic | Days of the Week | Support immediate school writing needs | 1 | Individual practice page | 1 | Monday, Tuesday | Optional high-value | Common teacher/parent request |
| Practice by Topic | Family and Home Words | Extend everyday writing vocabulary | 2 | Individual practice page | 1 | kitchen, bedroom, family | Optional high-value | Real writing relevance |
| Practice by Topic | School Words | Reinforce classroom vocabulary | 3 | Individual practice page | 1 | pencil, teacher, recess | Optional high-value | Practical and frequently needed |
| Practice by Topic | Animal Words | Provide motivating one- and two-syllable practice | 4 | Individual practice page | 1 | rabbit, tiger, pony | Optional high-value | Engaging and still useful |
| Practice by Topic | Seasons and Weather Words | Add common topical vocabulary | 5 | Individual practice page | 1 | spring, windy, sunny | Optional high-value | Common request with manageable spelling load |

### Grade Two

Grade 2 is the bridge from one-syllable mastery to dependable multisyllabic spelling. Mainstream expectations now include more advanced vowel teams and diphthongs, silent letters, final stable syllables, compound words, contractions, and the beginning of explicit spelling changes when endings are added.

| Section | Exact card title | Purpose | Recommended order | Page type | Estimated underlying 8–16-word pages | Example spelling content | Status | Evidence-based rationale |
|---|---|---|---|---|---|---|---|---|
| Learn in Order | Vowel Teams and Diphthongs | Cover the less basic long/variant vowel spellings | 1 | Gateway page | 4 | coin, house, moon | Essential | Grade 2 typically widens vowel-team coverage |
| Learn in Order | Soft C and Soft G | Teach common context-based spellings | 2 | Individual practice page | 1 | face, giant, page | Essential | High utility and common error source |
| Learn in Order | Final Ch and J Spellings | Distinguish tch/ch and dge/ge endings | 3 | Individual practice page | 1 | catch, badge, huge | Essential | Better taught as a dedicated spelling choice lesson |
| Learn in Order | Silent Letters | Teach common printable-but-unsounded letters | 4 | Individual practice page | 1 | knock, write, lamb | Essential | Explicitly common in Grade 2 standards and curricula |
| Learn in Order | Final Stable Syllables with -Le | Introduce a dependable multisyllabic pattern | 5 | Individual practice page | 1 | table, puzzle, simple | Essential | Final stable syllables are a mainstream Grade 2–3 bridge |
| Learn in Order | Compound Words | Practice spelling meaningful word parts together | 6 | Individual practice page | 1 | sunset, raincoat, toothbrush | Essential | Useful transition into morphology and longer-word spelling |
| Learn in Order | Contractions | Teach apostrophe forms children frequently write | 7 | Individual practice page | 1 | can't, don't, it's | Essential | Legitimate spelling/convention topic, not just grammar |
| Learn in Order | Two-Syllable Words | Begin explicit longer-word spelling in small steps | 8 | Gateway page | 2 | robot, napkin, sunset | Essential | Moves children beyond one-syllable dependence |
| Learn in Order | Plurals and Past-Tense Endings | Build the most common spelling-change patterns | 9 | Gateway page | 3 | babies, boxes, jumped | Essential | South Carolina's grade progression specifically moves into spelling changes by Grade 2 |
| Learn in Order | Harder Sound Spellings | Gather common multiple-spelling trouble spots | 10 | Individual practice page | 1 | city, gem, bridge | Essential | Prevents core conventions from being lost in miscues |
| Common Words to Spell | Grade 2 Common Words | Provide the full Grade 2 common-word sequence | 1 | Gateway page | 8 | because, together, again | Essential | Still a major year for high-utility common-word coverage |
| Practice by Topic | Months of the Year | Meet a frequent school-home practice need | 1 | Individual practice page | 1 | January, April, July | Optional high-value | Common assignment content |
| Practice by Topic | Math Words | Reinforce useful school vocabulary | 2 | Individual practice page | 1 | number, plus, equal | Optional high-value | Early content-area spelling starts to make sense here |
| Practice by Topic | Science Words: Plants and Animals | Add meaningful topic practice | 3 | Individual practice page | 1 | stem, roots, habitat | Optional high-value | Useful and age-appropriate |
| Practice by Topic | Writing Words for Stories | Support children's own compositions | 4 | Individual practice page | 1 | first, next, finally | Optional high-value | Strong transfer to writing |
| Practice by Topic | School Words | Continue practical school vocabulary | 5 | Individual practice page | 1 | library, backpack, homework | Optional high-value | High real-world relevance |

### Grade Three

Grade 3 is the real transition year into multisyllabic spelling, derivational morphology, and contrastive conventions such as homophones. Research and state articulations converge here: focused affix instruction begins to make sense, syllable-division work becomes more important, and multisyllabic words should be taught explicitly rather than presumed to develop on their own.

| Section | Exact card title | Purpose | Recommended order | Page type | Estimated underlying 8–16-word pages | Example spelling content | Status | Evidence-based rationale |
|---|---|---|---|---|---|---|---|---|
| Learn in Order | Longer Words with Common Syllable Types | Extend known patterns into two-syllable words | 1 | Gateway page | 3 | napkin, tiger, sunshine | Essential | Multisyllabic spelling should now be explicit |
| Learn in Order | Syllable Division Patterns | Teach practical ways to break longer words | 2 | Gateway page | 2 | magnet, robot, complex | Essential | Supports both reading and spelling of new words |
| Learn in Order | Prefixes | Start high-utility prefixes with clear meanings | 3 | Gateway page | 2 | replay, disagree, misplace | Essential | Grade 3 is an appropriate start for focused derivational morphology |
| Learn in Order | Suffixes | Teach common derivational suffixes | 4 | Gateway page | 2 | careful, hopeful, kindness | Essential | Helps spelling, vocabulary, and word analysis together |
| Learn in Order | Base-Word Spelling Changes | Make suffix-addition rules explicit | 5 | Individual practice page | 1 | hoped, studied, running | Essential | These changes are too important to leave implicit |
| Learn in Order | Common Homophones | Teach sound-alike word choices as spelling decisions | 6 | Gateway page | 2 | to/too/two, there/their | Essential | Texas explicitly places homophone spelling in Grade 3 |
| Learn in Order | Compound Words and Contractions Review | Keep earlier conventions active in longer writing | 7 | Review page | 1 | playground, won't, sunflower | Review | Still useful, but no longer the center of instruction |
| Learn in Order | Tricky Spellings in Longer Words | Cover unstable-looking common spellings | 8 | Individual practice page | 1 | eight, rough, listen | Essential | Prevents upper-elementary errors from accumulating |
| Learn in Order | Final Ch and J in Longer Words | Revisit ending spellings in harder words | 9 | Individual practice page | 1 | stretch, village, courage | Essential | Good placement once longer words are established |
| Common Words to Spell | Grade 3 Common Words | Provide the full Grade 3 common-word sequence | 1 | Gateway page | 6 | enough, through, answer | Essential | By Grade 3 this section shifts from classic sight words toward everyday writing words |
| Practice by Topic | Math Words | Reinforce school math vocabulary | 1 | Individual practice page | 1 | multiply, fraction, measure | Optional high-value | High utility in school texts |
| Practice by Topic | Science Words: Earth and Weather | Support content-area spelling | 2 | Individual practice page | 1 | climate, thunder, forecast | Optional high-value | Useful and motivating |
| Practice by Topic | Science Words: Plants and Animals | Continue meaningful science vocabulary | 3 | Individual practice page | 1 | blossom, mammal, habitat | Optional high-value | Good school-home fit |
| Practice by Topic | Social Studies Words: Maps and Communities | Add useful social-studies vocabulary | 4 | Individual practice page | 1 | region, border, citizen | Optional high-value | Clear topic and relevant |
| Practice by Topic | Writing Transition Words | Support paragraph-level writing | 5 | Individual practice page | 1 | however, also, finally | Optional high-value | Strong transfer to composition |

### Grade Four

Grade 4 is the year when morphology should become visibly prominent on the site. Common Core, South Carolina, and upper-elementary morphology research all support moving beyond basic affixes and into common Greek and Latin roots, while continuing multisyllabic spelling and conventional choice work.

| Section | Exact card title | Purpose | Recommended order | Page type | Estimated underlying 8–16-word pages | Example spelling content | Status | Evidence-based rationale |
|---|---|---|---|---|---|---|---|---|
| Learn in Order | Multisyllable Review | Refresh earlier syllable types in longer words | 1 | Gateway page | 2 | dentist, reptile, little | Review | Still needed for many writers |
| Learn in Order | Prefixes That Change Meaning | Expand meaning-bearing prefixes in common words | 2 | Gateway page | 2 | preview, nonprofit, transport | Essential | Upper elementary should now use prefixes systematically |
| Learn in Order | Suffixes That Build New Words | Add productive derivational suffixes | 3 | Gateway page | 2 | movement, possible, active | Essential | Supports spelling and vocabulary growth together |
| Learn in Order | Latin Root Words | Introduce common Latin-root families | 4 | Gateway page | 3 | import, inspect, construction | Essential | Strong Grade 4 fit in standards and morphology research |
| Learn in Order | Greek Root Words | Add the most usable school-related Greek roots | 5 | Gateway page | 2 | autograph, thermometer, bicycle | Essential | Common in science and academic vocabulary |
| Learn in Order | Hard-to-Hear Vowels in Longer Words | Address unstressed-vowel trouble spots in plain language | 6 | Individual practice page | 1 | separate, family, memory | Essential | Important, but parent-facing naming should avoid jargon |
| Learn in Order | Homophones and Commonly Confused Words | Continue convention-based spelling choices | 7 | Gateway page | 2 | rain/rein, accept/except | Essential | These belong in core because the skill is discriminating between spellings |
| Learn in Order | Base-Word Changes Review | Keep earlier suffix rules active | 8 | Review page | 1 | studied, hoping, running | Review | Prevents regression in longer writing |
| Common Words to Spell | Grade 4 Common Words | Provide the full Grade 4 common-word sequence | 1 | Gateway page | 5 | separate, finally, probably | Essential | Upper-grade common-word practice should narrow, not disappear |
| Practice by Topic | Math Words | Provide content-area support | 1 | Individual practice page | 1 | decimal, quotient, perimeter | Optional high-value | Real curricular relevance |
| Practice by Topic | Science Words: Energy and Ecosystems | Provide useful science vocabulary | 2 | Individual practice page | 1 | energy, habitat, predator | Optional high-value | Fits upper-elementary content |
| Practice by Topic | Social Studies Words: Regions and Government | Support content-area writing | 3 | Individual practice page | 1 | region, governor, election | Optional high-value | Clear and school-relevant |
| Practice by Topic | Writing Words for Opinions and Explanations | Support stronger expository writing | 4 | Individual practice page | 1 | therefore, because, for example | Optional high-value | Strong writing transfer |
| Practice by Topic | Geography Words | Add concrete map-and-place vocabulary | 5 | Individual practice page | 1 | equator, canyon, island | Optional high-value | Useful and distinct |

### Grade Five

Grade 5 should continue the upper-elementary pattern: advanced multisyllabic spelling, affixes and roots in academic words, related-word spelling changes, and explicit conventional spelling for editing and school writing. This is not the place to return to giant generic "fifth grade spelling words" lists.

| Section | Exact card title | Purpose | Recommended order | Page type | Estimated underlying 8–16-word pages | Example spelling content | Status | Evidence-based rationale |
|---|---|---|---|---|---|---|---|---|
| Learn in Order | Advanced Multisyllable Spelling | Strengthen long-word spelling patterns and divisions | 1 | Gateway page | 2 | poet, musician, environment | Essential | Grade 5 writers need direct support with longer forms |
| Learn in Order | Prefixes in Academic Words | Continue meaning-bearing prefixes in school words | 2 | Gateway page | 2 | submarine, interact, antibiotic | Essential | Fits upper-grade morphology expectations |
| Learn in Order | Suffixes in Academic Words | Focus on productive upper-elementary suffixes | 3 | Gateway page | 2 | division, creative, visible | Essential | Needed for academic writing vocabulary |
| Learn in Order | Greek Root Words | Continue major Greek academic roots | 4 | Gateway page | 2 | geography, photograph, microscope | Essential | Particularly useful in science and math |
| Learn in Order | Latin Root Words | Continue major Latin academic roots | 5 | Gateway page | 2 | inspection, transport, construction | Essential | Important in social studies and formal writing |
| Learn in Order | Related Words with Sound Changes | Teach how word families preserve spelling across sound changes | 6 | Individual practice page | 1 | music/musician, act/action | Essential | A true upper-elementary spelling insight |
| Learn in Order | Word-Origin Spellings Tion, Sion, and Cian | Give a clean parent-facing entry to major derived-word endings | 7 | Individual practice page | 1 | station, expression, magician | Essential | High-utility upper-grade pattern family |
| Learn in Order | Homophones and Commonly Confused Words | Cover persistent high-level conventional choices | 8 | Gateway page | 2 | principle/principal, stationary/stationery | Essential | Conventional choice remains core spelling work |
| Learn in Order | Editing for Correct Spelling | Connect learned patterns to authentic proofreading | 9 | Review page | 1 | their/there, separate | Review | CCSS expects correct grade-appropriate spelling with references as needed |
| Common Words to Spell | Grade 5 Common Words | Provide the full Grade 5 common-word sequence | 1 | Gateway page | 5 | necessary, different, business | Essential | By Grade 5 this section is a targeted support section, not a giant list |
| Practice by Topic | Math Words | Support upper-elementary math vocabulary | 1 | Individual practice page | 1 | numerator, equation, volume | Optional high-value | Useful and relevant |
| Practice by Topic | Science Words: Matter and Space | Provide content-area spelling support | 2 | Individual practice page | 1 | matter, orbit, gravity | Optional high-value | Good school fit |
| Practice by Topic | Social Studies Words: U.S. History | Add relevant social-studies vocabulary | 3 | Individual practice page | 1 | colony, revolution, constitution | Optional high-value | Common classroom crossover |
| Practice by Topic | Writing Words for Research and Transitions | Support formal school writing | 4 | Individual practice page | 1 | according, evidence, therefore | Optional high-value | Strong transfer to composition |
| Practice by Topic | Geography Words | Continue useful content-area vocabulary | 5 | Individual practice page | 1 | peninsula, continent, climate | Optional high-value | Clear topic and continuing relevance |

## Full practice-page inventory and publishing totals

### Minimum complete curriculum

This inventory includes the recommended minimum complete curriculum: all core pages, all common-word pages, all visible gateway pages, and the high-value Practice by Topic pages. Secondary optional topic pages are listed later and are not included in this minimum inventory.

#### Kindergarten inventory

| Grade | Section | Sequence number | Exact page title | Page type | Main spelling focus | Estimated word count | Essential or optional | Notes |
|---|---|---|---|---|---|---|---|---|
| Kindergarten | Learn in Order | 1 | Short A Words | Individual practice page | short a CVC spelling | 8–10 | Essential | First dependable short-vowel page |
| Kindergarten | Learn in Order | 2 | Short I Words | Individual practice page | short i CVC spelling | 8–10 | Essential | One vowel at a time |
| Kindergarten | Learn in Order | 3 | Short O Words | Individual practice page | short o CVC spelling | 8–10 | Essential | One vowel at a time |
| Kindergarten | Learn in Order | 4 | Short E Words | Individual practice page | short e CVC spelling | 8–10 | Essential | One vowel at a time |
| Kindergarten | Learn in Order | 5 | Short U Words | Individual practice page | short u CVC spelling | 8–10 | Essential | One vowel at a time |
| Kindergarten | Learn in Order | 6 | Mixed CVC Words | Review page | mixed short vowels | 8–10 | Review | Cross-vowel review |
| Kindergarten | Learn in Order | 7 | Beginning Blends | Optional preview page | early CCVC/CVCC blend spelling | 8–10 | Optional preview | Late-K preview |
| Kindergarten | Learn in Order | 8 | Digraph Words | Optional preview page | sh, ch, th, wh | 8–10 | Optional preview | Late-K preview |
| Kindergarten | Common Words to Spell | 1 | Kindergarten Common Words | Gateway page | gateway to all K common-word sets | — | Essential | Parent-facing hub |
| Kindergarten | Common Words to Spell | 1a | Kindergarten Common Words 1 | Individual practice page | earliest common words | 10 | Essential | includes the, a, I, to |
| Kindergarten | Common Words to Spell | 1b | Kindergarten Common Words 2 | Individual practice page | simple high-utility words | 10 | Essential | includes and, is, in |
| Kindergarten | Common Words to Spell | 1c | Kindergarten Common Words 3 | Individual practice page | mixed regular/temporary Heart Words | 10 | Essential | cumulative set |
| Kindergarten | Common Words to Spell | 1d | Kindergarten Common Words 4 | Individual practice page | common classroom words | 10 | Essential | cumulative set |
| Kindergarten | Common Words to Spell | 1e | Kindergarten Common Words 5 | Individual practice page | end-of-year common words | 10 | Essential | cumulative set |
| Kindergarten | Practice by Topic | 1 | Color Words | Individual practice page | common color names | 8–10 | Optional high-value | High parent demand |
| Kindergarten | Practice by Topic | 2 | Number Words 1–10 | Individual practice page | number words | 8–10 | Optional high-value | Useful for school-home practice |
| Kindergarten | Practice by Topic | 3 | Family Words | Individual practice page | family vocabulary | 8–10 | Optional high-value | Everyday writing words |
| Kindergarten | Practice by Topic | 4 | School Words | Individual practice page | early school vocabulary | 8–10 | Optional high-value | Functional classroom words |
| Kindergarten | Practice by Topic | 5 | Animal Words | Individual practice page | simple animal names | 8–10 | Optional high-value | Motivating, concrete set |

#### Grade One inventory

| Grade | Section | Sequence number | Exact page title | Page type | Main spelling focus | Estimated word count | Essential or optional | Notes |
|---|---|---|---|---|---|---|---|---|
| Grade 1 | Learn in Order | 1 | Short Vowel Review | Review page | short-vowel review | 10–12 | Review | Quick readiness check |
| Grade 1 | Learn in Order | 2 | Blends | Individual practice page | beginning and ending blends | 10–12 | Essential | One blend page on grade route |
| Grade 1 | Learn in Order | 3 | Digraphs | Gateway page | gateway to digraph pages | — | Essential | Parent-friendly grouping |
| Grade 1 | Learn in Order | 3a | Digraphs: Sh and Ch | Individual practice page | sh, ch | 10–12 | Essential | Common Grade 1 digraphs |
| Grade 1 | Learn in Order | 3b | Digraphs: Th and Wh | Individual practice page | th, wh | 10–12 | Essential | Common Grade 1 digraphs |
| Grade 1 | Learn in Order | 4 | Special Endings ff, ll, ss, zz and ck | Individual practice page | final spelling conventions | 10–12 | Essential | Covers common final patterns |
| Grade 1 | Learn in Order | 5 | Silent E Long Vowels | Gateway page | gateway to VCe pages | — | Essential | High-utility pattern family |
| Grade 1 | Learn in Order | 5a | Silent E Long A | Individual practice page | a_e | 10–12 | Essential | long a with silent e |
| Grade 1 | Learn in Order | 5b | Silent E Long I | Individual practice page | i_e | 10–12 | Essential | long i with silent e |
| Grade 1 | Learn in Order | 5c | Silent E Long O and U | Individual practice page | o_e, u_e | 10–12 | Essential | combined for manageability |
| Grade 1 | Learn in Order | 6 | Long Vowel Teams | Gateway page | gateway to vowel-team pages | — | Essential | Strong family gateway |
| Grade 1 | Learn in Order | 6a | Long A Vowel Teams ai and ay | Individual practice page | ai, ay | 10–12 | Essential | grouped by sound |
| Grade 1 | Learn in Order | 6b | Long E Vowel Teams ee, ea, y | Individual practice page | ee, ea, final y | 10–12 | Essential | grouped by sound |
| Grade 1 | Learn in Order | 6c | Long O and U Vowel Teams oa, ow, ue | Individual practice page | oa, ow, ue | 10–12 | Essential | grouped by sound |
| Grade 1 | Learn in Order | 6d | Long I Spellings igh and ie | Individual practice page | igh, ie | 10–12 | Essential | enough material for one page |
| Grade 1 | Learn in Order | 7 | R-Controlled Vowels | Gateway page | gateway to r-controlled pages | — | Essential | Strong pattern family |
| Grade 1 | Learn in Order | 7a | R-Controlled Ar | Individual practice page | ar | 10–12 | Essential | separate for clarity |
| Grade 1 | Learn in Order | 7b | R-Controlled Or and Ore | Individual practice page | or, ore | 10–12 | Essential | close family |
| Grade 1 | Learn in Order | 7c | R-Controlled Er, Ir, Ur | Individual practice page | er, ir, ur | 10–12 | Essential | natural grouping |
| Grade 1 | Learn in Order | 8 | Plurals with -S and -Es | Individual practice page | simple plural endings | 10–12 | Essential | frequent writing forms |
| Grade 1 | Learn in Order | 9 | Endings -Ing and -Ed | Individual practice page | common inflectional endings | 10–12 | Essential | frequent writing forms |
| Grade 1 | Learn in Order | 10 | Final V Spelled Ve | Individual practice page | word-final v convention | 8–10 | Essential | have, give, live |
| Grade 1 | Common Words to Spell | 1 | Grade 1 Common Words | Gateway page | gateway to all Grade 1 common-word sets | — | Essential | Parent-facing hub |
| Grade 1 | Common Words to Spell | 1a | Grade 1 Common Words 1 | Individual practice page | common function words | 12 | Essential | early Grade 1 set |
| Grade 1 | Common Words to Spell | 1b | Grade 1 Common Words 2 | Individual practice page | common school words | 12 | Essential | cumulative set |
| Grade 1 | Common Words to Spell | 1c | Grade 1 Common Words 3 | Individual practice page | mixed regular/Heart Words | 12 | Essential | cumulative set |
| Grade 1 | Common Words to Spell | 1d | Grade 1 Common Words 4 | Individual practice page | mixed regular/Heart Words | 12 | Essential | cumulative set |
| Grade 1 | Common Words to Spell | 1e | Grade 1 Common Words 5 | Individual practice page | mixed regular/Heart Words | 12 | Essential | cumulative set |
| Grade 1 | Common Words to Spell | 1f | Grade 1 Common Words 6 | Individual practice page | end-of-year common words | 12 | Essential | cumulative set |
| Grade 1 | Common Words to Spell | 1g | Grade 1 Common Words 7 | Individual practice page | end-of-year common words | 12 | Essential | cumulative set |
| Grade 1 | Practice by Topic | 1 | Days of the Week | Individual practice page | day names | 8–10 | Optional high-value | Common request |
| Grade 1 | Practice by Topic | 2 | Family and Home Words | Individual practice page | family/home vocabulary | 8–10 | Optional high-value | Everyday relevance |
| Grade 1 | Practice by Topic | 3 | School Words | Individual practice page | school vocabulary | 8–10 | Optional high-value | Practical use |
| Grade 1 | Practice by Topic | 4 | Animal Words | Individual practice page | animal names | 8–10 | Optional high-value | Motivating |
| Grade 1 | Practice by Topic | 5 | Seasons and Weather Words | Individual practice page | season/weather vocabulary | 8–10 | Optional high-value | Common curriculum crossover |

#### Grade Two inventory

| Grade | Section | Sequence number | Exact page title | Page type | Main spelling focus | Estimated word count | Essential or optional | Notes |
|---|---|---|---|---|---|---|---|---|
| Grade 2 | Learn in Order | 1 | Vowel Teams and Diphthongs | Gateway page | gateway to advanced vowel pages | — | Essential | Tight pattern family |
| Grade 2 | Learn in Order | 1a | Oi and Oy Words | Individual practice page | oi, oy | 10–12 | Essential | common diphthong spellings |
| Grade 2 | Learn in Order | 1b | Ou and Ow Words | Individual practice page | ou, ow | 10–12 | Essential | common diphthong spellings |
| Grade 2 | Learn in Order | 1c | Oo, Ew, and Ue Words | Individual practice page | oo, ew, ue | 10–12 | Essential | grouped by sound family |
| Grade 2 | Learn in Order | 1d | Au and Aw Words | Individual practice page | au, aw | 10–12 | Essential | common variant-vowel page |
| Grade 2 | Learn in Order | 2 | Soft C and Soft G | Individual practice page | c, g before e/i/y | 10–12 | Essential | context-based spellings |
| Grade 2 | Learn in Order | 3 | Final Ch and J Spellings | Individual practice page | tch/ch and dge/ge | 10–12 | Essential | spelling-choice lesson |
| Grade 2 | Learn in Order | 4 | Silent Letters | Individual practice page | k, w, b, etc. silent | 10–12 | Essential | knife, write, lamb |
| Grade 2 | Learn in Order | 5 | Final Stable Syllables with -Le | Individual practice page | consonant-le endings | 10–12 | Essential | table, little, puzzle |
| Grade 2 | Learn in Order | 6 | Compound Words | Individual practice page | compounds | 10–12 | Essential | meaningful parts stay visible |
| Grade 2 | Learn in Order | 7 | Contractions | Individual practice page | apostrophe spellings | 10–12 | Essential | can't, won't, they're |
| Grade 2 | Learn in Order | 8 | Two-Syllable Words | Gateway page | gateway to two-syllable pages | — | Essential | bridge to longer words |
| Grade 2 | Learn in Order | 8a | Two-Syllable Words with Closed and Open Syllables | Individual practice page | common two-syllable patterns | 10–12 | Essential | robot, napkin |
| Grade 2 | Learn in Order | 8b | Two-Syllable Words with VCe, Vowel Teams, and R-Controlled Vowels | Individual practice page | longer words using known patterns | 10–12 | Essential | pilot, rainbow, market |
| Grade 2 | Learn in Order | 9 | Plurals and Past-Tense Endings | Gateway page | gateway to ending pages | — | Essential | morphology bridge |
| Grade 2 | Learn in Order | 9a | Plurals with -S and -Es | Individual practice page | plural endings | 10–12 | Essential | boxes, wishes |
| Grade 2 | Learn in Order | 9b | Past-Tense -Ed | Individual practice page | past tense ending | 10–12 | Essential | jumped, landed |
| Grade 2 | Learn in Order | 9c | Changing Y to Ies | Individual practice page | y to ies in plurals | 8–10 | Essential | babies, puppies |
| Grade 2 | Learn in Order | 10 | Harder Sound Spellings | Individual practice page | tougher sound-spelling choices | 10–12 | Essential | city, gem, badge |
| Grade 2 | Common Words to Spell | 1 | Grade 2 Common Words | Gateway page | gateway to all Grade 2 common-word sets | — | Essential | Parent-facing hub |
| Grade 2 | Common Words to Spell | 1a | Grade 2 Common Words 1 | Individual practice page | high-utility common words | 12 | Essential | early set |
| Grade 2 | Common Words to Spell | 1b | Grade 2 Common Words 2 | Individual practice page | high-utility common words | 12 | Essential | cumulative set |
| Grade 2 | Common Words to Spell | 1c | Grade 2 Common Words 3 | Individual practice page | high-utility common words | 12 | Essential | cumulative set |
| Grade 2 | Common Words to Spell | 1d | Grade 2 Common Words 4 | Individual practice page | mixed regular/Heart Words | 12 | Essential | cumulative set |
| Grade 2 | Common Words to Spell | 1e | Grade 2 Common Words 5 | Individual practice page | mixed regular/Heart Words | 12 | Essential | cumulative set |
| Grade 2 | Common Words to Spell | 1f | Grade 2 Common Words 6 | Individual practice page | mixed regular/Heart Words | 12 | Essential | cumulative set |
| Grade 2 | Common Words to Spell | 1g | Grade 2 Common Words 7 | Individual practice page | end-of-year common words | 12 | Essential | cumulative set |
| Grade 2 | Common Words to Spell | 1h | Grade 2 Common Words 8 | Individual practice page | end-of-year common words | 12 | Essential | cumulative set |
| Grade 2 | Practice by Topic | 1 | Months of the Year | Individual practice page | month names | 8–10 | Optional high-value | Common school need |
| Grade 2 | Practice by Topic | 2 | Math Words | Individual practice page | basic math vocabulary | 8–10 | Optional high-value | Content-area support |
| Grade 2 | Practice by Topic | 3 | Science Words: Plants and Animals | Individual practice page | science vocabulary | 8–10 | Optional high-value | Useful and concrete |
| Grade 2 | Practice by Topic | 4 | Writing Words for Stories | Individual practice page | sequencing/story words | 8–10 | Optional high-value | Writing transfer |
| Grade 2 | Practice by Topic | 5 | School Words | Individual practice page | school vocabulary | 8–10 | Optional high-value | Practical use |

#### Grade Three inventory

| Grade | Section | Sequence number | Exact page title | Page type | Main spelling focus | Estimated word count | Essential or optional | Notes |
|---|---|---|---|---|---|---|---|---|
| Grade 3 | Learn in Order | 1 | Longer Words with Common Syllable Types | Gateway page | gateway to two-syllable pattern pages | — | Essential | critical transition gateway |
| Grade 3 | Learn in Order | 1a | Two-Syllable Words with Closed and Open Syllables | Individual practice page | closed/open syllable words | 10–12 | Essential | napkin, robot |
| Grade 3 | Learn in Order | 1b | Two-Syllable Words with VCe and Vowel Teams | Individual practice page | known long-vowel patterns in longer words | 10–12 | Essential | pilot, rainbow |
| Grade 3 | Learn in Order | 1c | Two-Syllable Words with R-Controlled and Final Stable Syllables | Individual practice page | r-controlled and -le in longer words | 10–12 | Essential | market, little |
| Grade 3 | Learn in Order | 2 | Syllable Division Patterns | Gateway page | gateway to syllable-division pages | — | Essential | major Grade 3 move |
| Grade 3 | Learn in Order | 2a | Syllable Division Pattern VCCV | Individual practice page | VCCV division | 10–12 | Essential | magnet, basket |
| Grade 3 | Learn in Order | 2b | Syllable Division Patterns VCV and VCCCV | Individual practice page | VCV, VCCCV | 10–12 | Essential | tiger, complex |
| Grade 3 | Learn in Order | 3 | Prefixes | Gateway page | gateway to prefix pages | — | Essential | morphology begins in earnest |
| Grade 3 | Learn in Order | 3a | Prefixes Un, Re, Dis, and Pre | Individual practice page | high-utility prefixes | 10–12 | Essential | replay, dislike |
| Grade 3 | Learn in Order | 3b | Prefixes Mis, Non, Over, and Under | Individual practice page | high-utility prefixes | 10–12 | Essential | misspell, underpay |
| Grade 3 | Learn in Order | 4 | Suffixes | Gateway page | gateway to suffix pages | — | Essential | morphology begins in earnest |
| Grade 3 | Learn in Order | 4a | Suffixes -Ful, -Less, and -Ness | Individual practice page | common derivational suffixes | 10–12 | Essential | helpful, careless |
| Grade 3 | Learn in Order | 4b | Suffixes -Ly and -Able | Individual practice page | common derivational suffixes | 10–12 | Essential | safely, washable |
| Grade 3 | Learn in Order | 5 | Base-Word Spelling Changes | Individual practice page | doubling, drop e, y to i | 10–12 | Essential | hoped, studied, running |
| Grade 3 | Learn in Order | 6 | Common Homophones | Gateway page | gateway to homophone pages | — | Essential | conventional spelling choices |
| Grade 3 | Learn in Order | 6a | Common Homophones 1 | Individual practice page | basic common homophones | 10–12 | Essential | to/too/two |
| Grade 3 | Learn in Order | 6b | Common Homophones 2 | Individual practice page | basic common homophones | 10–12 | Essential | there/their, hear/here |
| Grade 3 | Learn in Order | 7 | Compound Words and Contractions Review | Review page | review of earlier conventions | 10–12 | Review | keeps prior knowledge active |
| Grade 3 | Learn in Order | 8 | Tricky Spellings in Longer Words | Individual practice page | eigh, ough, and similar trouble spots | 10–12 | Essential | transition trouble words |
| Grade 3 | Learn in Order | 9 | Final Ch and J in Longer Words | Individual practice page | final /ch/ and /j/ spellings | 10–12 | Essential | village, stretch |
| Grade 3 | Common Words to Spell | 1 | Grade 3 Common Words | Gateway page | gateway to all Grade 3 common-word sets | — | Essential | Parent-facing hub |
| Grade 3 | Common Words to Spell | 1a | Grade 3 Common Words 1 | Individual practice page | everyday common words | 12 | Essential | includes tricky but useful words |
| Grade 3 | Common Words to Spell | 1b | Grade 3 Common Words 2 | Individual practice page | everyday common words | 12 | Essential | cumulative set |
| Grade 3 | Common Words to Spell | 1c | Grade 3 Common Words 3 | Individual practice page | everyday common words | 12 | Essential | cumulative set |
| Grade 3 | Common Words to Spell | 1d | Grade 3 Common Words 4 | Individual practice page | everyday common words | 12 | Essential | cumulative set |
| Grade 3 | Common Words to Spell | 1e | Grade 3 Common Words 5 | Individual practice page | everyday common words | 12 | Essential | cumulative set |
| Grade 3 | Common Words to Spell | 1f | Grade 3 Common Words 6 | Individual practice page | everyday common words | 12 | Essential | cumulative set |
| Grade 3 | Practice by Topic | 1 | Math Words | Individual practice page | math vocabulary | 8–10 | Optional high-value | content-area set |
| Grade 3 | Practice by Topic | 2 | Science Words: Earth and Weather | Individual practice page | science vocabulary | 8–10 | Optional high-value | content-area set |
| Grade 3 | Practice by Topic | 3 | Science Words: Plants and Animals | Individual practice page | science vocabulary | 8–10 | Optional high-value | content-area set |
| Grade 3 | Practice by Topic | 4 | Social Studies Words: Maps and Communities | Individual practice page | social-studies vocabulary | 8–10 | Optional high-value | content-area set |
| Grade 3 | Practice by Topic | 5 | Writing Transition Words | Individual practice page | transition words | 8–10 | Optional high-value | direct writing transfer |

#### Grade Four inventory

| Grade | Section | Sequence number | Exact page title | Page type | Main spelling focus | Estimated word count | Essential or optional | Notes |
|---|---|---|---|---|---|---|---|---|
| Grade 4 | Learn in Order | 1 | Multisyllable Review | Gateway page | gateway to review pages | — | Review | refresh earlier patterns |
| Grade 4 | Learn in Order | 1a | Multisyllable Review: Closed, Open, and VCe | Review page | earlier syllable types in longer words | 10–12 | Review | keeps prior knowledge active |
| Grade 4 | Learn in Order | 1b | Multisyllable Review: Vowel Teams, R-Controlled, and Final Stable Syllables | Review page | earlier syllable types in longer words | 10–12 | Review | keeps prior knowledge active |
| Grade 4 | Learn in Order | 2 | Prefixes That Change Meaning | Gateway page | gateway to prefix pages | — | Essential | upper-elementary morphology |
| Grade 4 | Learn in Order | 2a | Prefixes with Re-, Pre-, and Non- | Individual practice page | common prefixes | 10–12 | Essential | high-utility set |
| Grade 4 | Learn in Order | 2b | Prefixes with Inter-, Sub-, Trans-, and Anti- | Individual practice page | common prefixes | 10–12 | Essential | high-utility set |
| Grade 4 | Learn in Order | 3 | Suffixes That Build New Words | Gateway page | gateway to suffix pages | — | Essential | upper-elementary morphology |
| Grade 4 | Learn in Order | 3a | Suffixes -Ful, -Less, -Ment, and -Ness | Individual practice page | derivational suffixes | 10–12 | Essential | noun/adjective builders |
| Grade 4 | Learn in Order | 3b | Suffixes -Able, -Ible, -Ive, and -Ly | Individual practice page | derivational suffixes | 10–12 | Essential | adjective/adverb builders |
| Grade 4 | Learn in Order | 4 | Latin Root Words | Gateway page | gateway to Latin-root pages | — | Essential | roots now central |
| Grade 4 | Learn in Order | 4a | Latin Roots form, port, and struct | Individual practice page | Latin root families | 10–12 | Essential | import, transport, structure |
| Grade 4 | Learn in Order | 4b | Latin Roots dict, tract, and spect | Individual practice page | Latin root families | 10–12 | Essential | dictionary, tractor, inspect |
| Grade 4 | Learn in Order | 4c | Latin Roots ject, rupt, and vis | Individual practice page | Latin root families | 10–12 | Essential | reject, erupt, visible |
| Grade 4 | Learn in Order | 5 | Greek Root Words | Gateway page | gateway to Greek-root pages | — | Essential | roots now central |
| Grade 4 | Learn in Order | 5a | Greek Roots auto, graph, and meter | Individual practice page | Greek root families | 10–12 | Essential | autograph, thermometer |
| Grade 4 | Learn in Order | 5b | Greek Roots photo, tele, and cycle | Individual practice page | Greek root families | 10–12 | Essential | photograph, telephone |
| Grade 4 | Learn in Order | 6 | Hard-to-Hear Vowels in Longer Words | Individual practice page | unstressed-vowel trouble spots | 10–12 | Essential | separate, family |
| Grade 4 | Learn in Order | 7 | Homophones and Commonly Confused Words | Gateway page | gateway to contrastive pages | — | Essential | convention-based choices |
| Grade 4 | Learn in Order | 7a | Homophones and Commonly Confused Words 1 | Individual practice page | homophones/confusions | 10–12 | Essential | rain/rein |
| Grade 4 | Learn in Order | 7b | Homophones and Commonly Confused Words 2 | Individual practice page | homophones/confusions | 10–12 | Essential | accept/except |
| Grade 4 | Learn in Order | 8 | Base-Word Changes Review | Review page | suffix-rule review | 10–12 | Review | protects earlier learning |
| Grade 4 | Common Words to Spell | 1 | Grade 4 Common Words | Gateway page | gateway to all Grade 4 common-word sets | — | Essential | Parent-facing hub |
| Grade 4 | Common Words to Spell | 1a | Grade 4 Common Words 1 | Individual practice page | everyday/tricky common words | 12 | Essential | narrowed upper-grade focus |
| Grade 4 | Common Words to Spell | 1b | Grade 4 Common Words 2 | Individual practice page | everyday/tricky common words | 12 | Essential | cumulative set |
| Grade 4 | Common Words to Spell | 1c | Grade 4 Common Words 3 | Individual practice page | everyday/tricky common words | 12 | Essential | cumulative set |
| Grade 4 | Common Words to Spell | 1d | Grade 4 Common Words 4 | Individual practice page | everyday/tricky common words | 12 | Essential | cumulative set |
| Grade 4 | Common Words to Spell | 1e | Grade 4 Common Words 5 | Individual practice page | everyday/tricky common words | 12 | Essential | cumulative set |
| Grade 4 | Practice by Topic | 1 | Math Words | Individual practice page | math vocabulary | 8–10 | Optional high-value | content-area set |
| Grade 4 | Practice by Topic | 2 | Science Words: Energy and Ecosystems | Individual practice page | science vocabulary | 8–10 | Optional high-value | content-area set |
| Grade 4 | Practice by Topic | 3 | Social Studies Words: Regions and Government | Individual practice page | social-studies vocabulary | 8–10 | Optional high-value | content-area set |
| Grade 4 | Practice by Topic | 4 | Writing Words for Opinions and Explanations | Individual practice page | writing vocabulary | 8–10 | Optional high-value | strong composition transfer |
| Grade 4 | Practice by Topic | 5 | Geography Words | Individual practice page | geography vocabulary | 8–10 | Optional high-value | clear topic set |

#### Grade Five inventory

| Grade | Section | Sequence number | Exact page title | Page type | Main spelling focus | Estimated word count | Essential or optional | Notes |
|---|---|---|---|---|---|---|---|---|
| Grade 5 | Learn in Order | 1 | Advanced Multisyllable Spelling | Gateway page | gateway to advanced long-word pages | — | Essential | advanced word work |
| Grade 5 | Learn in Order | 1a | Advanced Multisyllable Patterns | Individual practice page | advanced multisyllabic patterns | 10–12 | Essential | environment, curious |
| Grade 5 | Learn in Order | 1b | Advanced Syllable Division | Individual practice page | harder division patterns | 10–12 | Essential | biology, athlete |
| Grade 5 | Learn in Order | 2 | Prefixes in Academic Words | Gateway page | gateway to academic prefix pages | — | Essential | morphology-heavy year |
| Grade 5 | Learn in Order | 2a | Prefixes Inter-, Sub-, Trans-, and Anti- | Individual practice page | academic prefixes | 10–12 | Essential | interact, submarine |
| Grade 5 | Learn in Order | 2b | Prefixes Super-, Non-, and Counter- | Individual practice page | academic prefixes | 10–12 | Essential | supernatural, nonfiction |
| Grade 5 | Learn in Order | 3 | Suffixes in Academic Words | Gateway page | gateway to academic suffix pages | — | Essential | morphology-heavy year |
| Grade 5 | Learn in Order | 3a | Suffixes -Tion and -Sion | Individual practice page | academic suffixes | 10–12 | Essential | action, division |
| Grade 5 | Learn in Order | 3b | Suffixes -Ive, -Able, and -Ible | Individual practice page | academic suffixes | 10–12 | Essential | active, reliable, visible |
| Grade 5 | Learn in Order | 4 | Greek Root Words | Gateway page | gateway to Greek-root pages | — | Essential | academic roots |
| Grade 5 | Learn in Order | 4a | Greek Roots geo, graph, and photo | Individual practice page | Greek root families | 10–12 | Essential | geography, photograph |
| Grade 5 | Learn in Order | 4b | Greek Roots tele, micro, and cycle | Individual practice page | Greek root families | 10–12 | Essential | telephone, microscope |
| Grade 5 | Learn in Order | 5 | Latin Root Words | Gateway page | gateway to Latin-root pages | — | Essential | academic roots |
| Grade 5 | Learn in Order | 5a | Latin Roots port, struct, and tract | Individual practice page | Latin root families | 10–12 | Essential | transport, structure |
| Grade 5 | Learn in Order | 5b | Latin Roots dict, spect, and vis | Individual practice page | Latin root families | 10–12 | Essential | dictionary, inspect |
| Grade 5 | Learn in Order | 6 | Related Words with Sound Changes | Individual practice page | preserved spellings in families | 10–12 | Essential | music/musician |
| Grade 5 | Learn in Order | 7 | Word-Origin Spellings Tion, Sion, and Cian | Individual practice page | derived-word ending spellings | 10–12 | Essential | station, expression, magician |
| Grade 5 | Learn in Order | 8 | Homophones and Commonly Confused Words | Gateway page | gateway to contrastive pages | — | Essential | convention-based choices |
| Grade 5 | Learn in Order | 8a | Homophones and Commonly Confused Words 1 | Individual practice page | upper-grade confusions | 10–12 | Essential | principle/principal |
| Grade 5 | Learn in Order | 8b | Homophones and Commonly Confused Words 2 | Individual practice page | upper-grade confusions | 10–12 | Essential | stationary/stationery |
| Grade 5 | Learn in Order | 9 | Editing for Correct Spelling | Review page | proofreading and application | 10–12 | Review | authentic writing transfer |
| Grade 5 | Common Words to Spell | 1 | Grade 5 Common Words | Gateway page | gateway to all Grade 5 common-word sets | — | Essential | Parent-facing hub |
| Grade 5 | Common Words to Spell | 1a | Grade 5 Common Words 1 | Individual practice page | everyday/tricky common words | 12 | Essential | narrowed upper-grade focus |
| Grade 5 | Common Words to Spell | 1b | Grade 5 Common Words 2 | Individual practice page | everyday/tricky common words | 12 | Essential | cumulative set |
| Grade 5 | Common Words to Spell | 1c | Grade 5 Common Words 3 | Individual practice page | everyday/tricky common words | 12 | Essential | cumulative set |
| Grade 5 | Common Words to Spell | 1d | Grade 5 Common Words 4 | Individual practice page | everyday/tricky common words | 12 | Essential | cumulative set |
| Grade 5 | Common Words to Spell | 1e | Grade 5 Common Words 5 | Individual practice page | everyday/tricky common words | 12 | Essential | cumulative set |
| Grade 5 | Practice by Topic | 1 | Math Words | Individual practice page | math vocabulary | 8–10 | Optional high-value | content-area set |
| Grade 5 | Practice by Topic | 2 | Science Words: Matter and Space | Individual practice page | science vocabulary | 8–10 | Optional high-value | content-area set |
| Grade 5 | Practice by Topic | 3 | Social Studies Words: U.S. History | Individual practice page | social-studies vocabulary | 8–10 | Optional high-value | content-area set |
| Grade 5 | Practice by Topic | 4 | Writing Words for Research and Transitions | Individual practice page | writing vocabulary | 8–10 | Optional high-value | strong composition transfer |
| Grade 5 | Practice by Topic | 5 | Geography Words | Individual practice page | geography vocabulary | 8–10 | Optional high-value | clear topic set |

### Final publishing totals

| Grade | Core Progression practice pages | Common Words practice pages | Additional Practice pages | Gateway pages | Total practice pages | Total pages including gateways |
|---|---|---|---|---|---|---|
| Kindergarten | 8 | 5 | 5 | 1 | 18 | 19 |
| Grade 1 | 18 | 7 | 5 | 5 | 30 | 35 |
| Grade 2 | 16 | 8 | 5 | 4 | 29 | 33 |
| Grade 3 | 15 | 6 | 5 | 5 | 26 | 31 |
| Grade 4 | 15 | 5 | 5 | 6 | 25 | 31 |
| Grade 5 | 15 | 5 | 5 | 6 | 25 | 31 |
| Total | 87 | 36 | 30 | 27 | 153 | 180 |

### Expanded but still manageable website

The expanded version keeps the same architecture and adds only the secondary Practice by Topic pages recommended below.

| Grade | Added secondary Additional Practice pages | Expanded practice-page total | Expanded total including gateways |
|---|---|---|---|
| Kindergarten | 3 | 21 | 22 |
| Grade 1 | 3 | 33 | 38 |
| Grade 2 | 3 | 32 | 36 |
| Grade 3 | 3 | 29 | 34 |
| Grade 4 | 3 | 28 | 34 |
| Grade 5 | 3 | 28 | 34 |
| Total | 18 | 171 | 198 |

The recommended publishing target is the minimum complete curriculum first. It is complete enough to stop redesigning the architecture, but still restrained enough to produce cleanly. The expanded version should be a phase-two build, not a reason to delay implementation.

## Curriculum audit, additional practice, and duplication rules

### Core curriculum audit

| Grade | Essential concepts included | Intentionally deferred | Treated as review | Excluded from core because they are not really spelling instruction | Mixed-evidence or variable areas |
|---|---|---|---|---|---|
| Kindergarten | short-vowel VC/CVC spelling; simple phonetic encoding | systematic silent e, vowel teams, r-controlled vowels, suffix spelling changes, roots | mixed CVC review | handwriting, alphabet drills as standalone page sets, broad phonemic-awareness games without spelling words | blends and digraphs vary by late K vs early Grade 1 |
| Grade 1 | blends, digraphs, final spelling conventions, silent e, common vowel teams, r-controlled vowels, simple plural and verb endings, final -ve | two-syllable systematic work, silent letters, final stable syllables, derivational morphology | short-vowel review | broad grammar lessons, punctuation-only pages, themed word lists disguised as "skills" | exact pacing of vowel teams and endings varies |
| Grade 2 | advanced vowel teams and diphthongs, soft c/g, tch/ch and dge/ge, silent letters, -le, compound words, contractions, two-syllable word practice, plural/past-tense spelling changes | focused derivational suffix work, large root-word sets, full homophone sequence | earlier one-syllable patterns as needed | general vocabulary-only pages, handwriting, broad reading-comprehension tasks | some programs start spelling changes in late Grade 2, others push more into Grade 3 |
| Grade 3 | multisyllabic word patterns, syllable division, prefixes, suffixes, base-word spelling changes, homophones, tricky longer-word spellings | full Greek/Latin root programs, highly technical etymology | compounds/contractions | grammar categories such as "nouns and verbs," broad writing traits, generic "vocabulary words" | exact affix list and schwa treatment vary |
| Grade 4 | prefixes, derivational suffixes, Latin and Greek roots, hard-to-hear vowels in longer words, homophones/common confusions | highly specialized roots and etymology sets better suited for later grades | multisyllable review, base-word-change review | literature vocabulary, comprehension questions, subject-area concept teaching without spelling purpose | exact root families and sequence differ among states/curricula |
| Grade 5 | advanced multisyllabic spelling, academic affixes, Greek/Latin roots, related-word sound changes, tion/sion/cian, upper-grade confusions, editing for spelling | middle-school-level classical-combining-form breadth | continued review of earlier patterns | essay-writing instruction, grammar-only editing, pure vocabulary study without spelling transfer | some curricula move more heavily into morphology, others keep longer-word orthography central |

The most important audit choice is this: homophones, commonly confused pairs, and related-word spelling changes belong in core beginning in Grade 3, because they are instruction in conventional spelling decisions. By contrast, random thematic collections and school-topic lists belong outside core even if they are useful.

### Additional Practice plan

The high-value pages below are the ones worth publishing on the main grade pages. The secondary pages are worthwhile but can wait. The rejected pages are the kinds of pages the site should actively avoid because they are too vague, too duplicative, or too weakly related to spelling instruction.

| Grade | High-value pages to publish on the main grade page | Secondary pages that can wait | Pages not recommended |
|---|---|---|---|
| Kindergarten | Color Words; Number Words 1–10; Family Words; School Words; Animal Words | Food Words; Body Words; Season Words | Everyday Words; More Kindergarten Topics; Theme Mix |
| Grade 1 | Days of the Week; Family and Home Words; School Words; Animal Words; Seasons and Weather Words | Number Words 11–20; Community Helper Words; Holiday Words | First Grade Vocabulary; Writing Words; Fun Words |
| Grade 2 | Months of the Year; Math Words; Science Words: Plants and Animals; Writing Words for Stories; School Words | Geography Words; Challenge Words; Holiday and Celebration Words | 2nd Grade Vocabulary; Smart Words; Reading Words |
| Grade 3 | Math Words; Science Words: Earth and Weather; Science Words: Plants and Animals; Social Studies Words: Maps and Communities; Writing Transition Words | Challenge Words; Commonly Misspelled School Words; Science Words: Life Cycles | Academic Vocabulary; Content Words; Upper-Level Words |
| Grade 4 | Math Words; Science Words: Energy and Ecosystems; Social Studies Words: Regions and Government; Writing Words for Opinions and Explanations; Geography Words | Challenge Words; Commonly Misspelled School Words; Science Words: Weather and Water Cycle | 4th Grade Vocabulary; Enrichment; More Topics |
| Grade 5 | Math Words; Science Words: Matter and Space; Social Studies Words: U.S. History; Writing Words for Research and Transitions; Geography Words | Challenge Words; Commonly Misspelled School Words; Science Words: Earth and Space Review | 5th Grade Vocabulary; Advanced Words; Other Practice |

The logic is straightforward: publish optional pages that are either repeatedly asked for by families and teachers or that transfer cleanly into school writing. Delay pages that are useful but less universal. Do not publish generic buckets or giant vocabulary bins with no clear spelling purpose. That follows both plain-language IA guidance and the instructional principle that the site should distinguish pattern instruction from topical collections.

### Duplication and reuse rules

Every practice page should have one canonical home and one canonical URL. A grade page may feature it, and a skill page may also feature it, but both should point to the same page. For example, R-Controlled Ar may appear under Grade 1 → Learn in Order and also under a reusable R-Controlled Vowels skills route, but the content object should be identical. That avoids drift and duplicated maintenance work.

Dolch and Fry overlap should not create separate duplicate pages. Use them as source pools when selecting words, then publish only one common-word sequence per grade. Likewise, do not create both a Sight Words page and a Heart Words page for the same word set. Heart Word status should be a teaching note inside the common-word pages, not a parallel content taxonomy.

Homophones should appear in only one main place: Learn in Order from Grade 3 upward. Do not repeat the same homophone pairs in Common Words to Spell unless a very small overlap is unavoidable for search reasons. If a word such as their happens to appear in a common-word list, it should not generate a second full practice page that duplicates the homophone lesson.

Themed pages may reuse a few words already seen in core, but only if the thematic goal is genuinely useful and the overlap is limited. A Color Words page will naturally contain red or blue, which may also have appeared elsewhere; that is acceptable. What should be avoided is building themed pages that are mostly recycled core words with no new purpose. Review pages are acceptable only when they are clearly labeled as review and gather closely related previously taught content.

Gateway pages should be stable navigational hubs, not alternate content. A gateway such as Long Vowel Teams or Grade 2 Common Words should never contain a second independent set of words that competes with the child pages. Its job is to explain, orient, and link. That rule will make canonical URLs, analytics, and future maintenance much cleaner.

## Implementation order and Final Recommended Content Architecture

### Implementation order

Finalize Grade 1 first. It establishes the site's most reusable lesson templates: a simple single-pattern page, a gateway-to-related-patterns page, a common-word set page, and a small optional topic page. It also contains the largest concentration of reusable orthographic patterns used elsewhere on the site: short-vowel review, blends, digraphs, silent e, vowel teams, r-controlled vowels, endings, and common words.

Build Kindergarten immediately afterward. Kindergarten reuses the same page template with simpler content and clarifies the site's policy on preview content. Then build Grade 2, which extends the system into two-syllable words, silent letters, and spelling changes. Only after those three grades are fully templated should implementation move into Grades 3–5, where the morphology-heavy gateways and root pages can reuse the same structural model.

The first high-frequency/common-word sequence to produce should be Kindergarten Common Words, followed by Grade 1 Common Words, then Grade 2 Common Words. Those pages set the site-wide conventions for handling regular words, temporarily irregular words, permanently irregular words, and Heart Word marking. Once those conventions are stable, the Grade 3–5 common-word pages can be produced much faster because they are conceptually simpler.

Optional topic pages should wait until all minimum-sequence pages are complete for Kindergarten through Grade 2 and at least one upper-elementary grade is implemented. In practice, that means the site owner should not let Practice by Topic reopen the architecture debate. The architecture is already decided; optional pages simply plug into the existing third section later.

### Final Recommended Content Architecture

The final three section names should be:

- Learn in Order
- Common Words to Spell
- Practice by Topic

Recommended visible card counts on each main grade page:

| Grade | Visible cards on the grade page | Underlying practice pages | Gateway pages |
|---|---|---|---|
| Kindergarten | 14 | 18 | 1 |
| Grade 1 | 16 | 30 | 5 |
| Grade 2 | 16 | 29 | 4 |
| Grade 3 | 15 | 26 | 5 |
| Grade 4 | 14 | 25 | 6 |
| Grade 5 | 15 | 25 | 6 |

How sight words and Heart Words are handled:

The public heading should not be Sight Words or Heart Words. The public heading should be Common Words to Spell. The site should preserve search language such as kindergarten sight words in metadata and helper copy. Within K–2 common-word pages, individual words may be marked as Heart Words when only part of the spelling is irregular or temporarily irregular. Heart Word status is an instructional note, not a separate public architecture.

What belongs in Learn in Order:

Reusable orthographic and morphological instruction: short vowels, blends, digraphs, final spelling conventions, silent e, vowel teams, r-controlled vowels, silent letters, final stable syllables, compound words, contractions, inflectional endings, suffix spelling changes, multisyllabic spelling, syllable division, prefixes, suffixes, roots, related-word spelling changes, homophones, commonly confused words, and spelling-for-editing review.

What belongs outside it:

Themed collections, school-subject vocabulary collections, seasonal or family-requested topical lists, and optional challenge/review collections. Those belong in Practice by Topic. Broad grammar instruction, handwriting, reading-comprehension work, and pure vocabulary study do not belong in the core spelling route.

Which decisions are firm:

The three-section architecture; the three public section names; the use of one common-word gateway per grade; the decision to keep common words visible through Grade 5 but narrower in the upper grades; the placement of homophones in core beginning in Grade 3; the role of roots and affixes in Grades 4–5; and the canonical-URL rule for reuse.

Which minor details can remain flexible during implementation:

The exact word lists on individual pages; the precise split of late-K preview vs early-Grade-1 review for blends and digraphs; small revisions to the root families in Grades 4 and 5; and the order of secondary optional topic pages. Those are implementation details, not architecture questions.

This is the durable recommendation: SpellingWords.app should publish a national parent-facing K–5 spelling plan built around Learn in Order, Common Words to Spell, and Practice by Topic, with 153 minimum practice pages and 27 gateway pages across Kindergarten through Grade 5, and an optional expansion path to 171 practice pages without changing the architecture.
