# Authoritative K–5 Content Architecture

> **Status: authoritative, frozen at the architecture level.** This document is the single implementation reference for K–5 grade hubs and their curriculum-facing content. Kindergarten, Grade 1, Grade 2, Grade 3, Grade 4, and Grade 5 are all implementation-complete across all three public sections. It replaces the broad architecture recommendations in [K5_FINAL_CONTENT_PLAN.md](./K5_FINAL_CONTENT_PLAN.md), [K5_SIMPLE_WEBSITE_CONTENT_PLAN.md](./K5_SIMPLE_WEBSITE_CONTENT_PLAN.md), and [CANONICAL_CURRICULUM_IMPLEMENTATION_PLAN.md](./CANONICAL_CURRICULUM_IMPLEMENTATION_PLAN.md). Historical research remains useful evidence; it is not an implementation specification.

### Implementation status

| Grade | Status | Current public realization |
|---|---|---|
| Kindergarten | Implementation-complete | Eight Core Spelling cards, four direct High-Frequency Words sets (40 words), and three Additional Practice cards. |
| Grade 1 | Implementation-complete | Twelve Core Spelling cards, six direct High-Frequency Words sets (72 unique words), and three Additional Practice cards. |
| Grade 2 | Implementation-complete | Ten Core Spelling cards, six direct High-Frequency Words sets (72 unique words), and three Additional Practice cards. |
| Grade 3 | Implementation-complete | Seven Core Spelling cards, five direct High-Frequency Words sets (60 words), and no Additional Practice cards — three candidate topics were reviewed and rejected (Section 7). |
| Grade 4 | Implementation-complete | Six Core Spelling cards, four direct High-Frequency Words sets (48 words), and one Additional Practice card, Measurement Words (Section 8). |
| Grade 5 | Implementation-complete | Five Core Spelling cards (Section 14), four direct High-Frequency Words sets (48 words, Section 15), and two Additional Practice cards, Civics and Government Words and Money Management Words (Section 16). |

## 1. Decisions that are frozen

### Public grade-hub architecture

Every K–5 grade hub has these sections, in this order:

1. **Core Spelling** — a recommended encoding/spelling route.
2. **High-Frequency Words** — cumulative common-word sets with phonics-first Heart Word guidance.
3. **Additional Practice** — small, optional, clearly scoped vocabulary collections.

Grade hubs recommend canonical content; they do not create alternate copies of it. A focused Skill can be reached from its Grade Unit, a Skill browse surface, search, and related links, but it has one canonical practice URL.

### Content identity and URLs

- Keep the existing flat canonical-list URL shape: `/spelling-lists/{category}/{urlSlug}`.
- A gateway is an existing `spelling-collections` entry when it is only an orientation page that lists child practice sets. Its canonical URL is `/spelling-lists/collections/{urlSlug}`.
- A collection can remain the canonical explanatory landing page even when a grade hub links directly to its child practice sets.
- A practice set remains a `spelling-lists` entry, in the existing `sight-words` category for Common Words. This preserves current routes and requires no new top-level category.
- Keep stable IDs forever. A title, section placement, or helper copy can change without changing an ID or URL.
- `grade-unit` is for an instructional roadmap page; `skill` is reusable focused pattern practice; `sight-word-set` is the appropriate existing content role for a numbered Common Words set; `vocabulary-theme` is for a bounded optional topic list.
- Do not create duplicate grade-nested URLs, duplicate Sight Word pages, or duplicate Heart Word pages for the same words.

### Common Words system

Every grade has exactly one Common Words gateway and these required final numbered-set counts:

| Grade | Sets | Role |
|---|---:|---|
| Kindergarten | 4 | Early high-frequency writing words, including appropriate Heart Word annotations. |
| Grade 1 | 6 | Continued useful words and irregular/temporarily irregular spellings. |
| Grade 2 | 6 | Final heavy acquisition year for common school-writing words. |
| Grade 3 | 5 | Everyday writing words and persistent trouble words. |
| Grade 4 | 4 | Narrow corrective writing-spelling sequence. |
| Grade 5 | 4 | Narrow corrective writing-spelling sequence. |

Dolch and Fry are source/reference pools, not public curriculum taxonomies. “Sight words,” “high-frequency words,” and “Heart Words” are explanatory search and helper terms, never peer top-level architectures. Heart Word treatment is mainly K–2 and is an annotation, not a separate route family.

### What remains flexible

The following are deliberately **not** architecture decisions: exact word membership for the still-unimplemented Grade 4–5 sets, the detailed K/Grade 1/Grade 2/Grade 3 card descriptions, which later topic pages meet quality thresholds, the exact Grade 4–5 root families, and the individual visual treatment of an annotation. They require editorial curation or implementation work, but may not change the three sections, URL/identity rule, or Common Words set counts without an explicit new architecture decision.

### Deferred optional content

Do not add generic “vocabulary,” “challenge,” “more topics,” “geography,” “family,” “school,” or duplicated subject pages merely to fill a grid. K–5 optional topic pages are deferred until a page has a coherent word set, a distinct parent need, and enough original educational value.

## 2. Repository reconciliation

The repository already contains a substantial raw library: published phonics, grade-level, sight-word, and challenge lists; six grade hubs; Dolch collections; curated Kindergarten and Grade 1 progressions; reusable focused Skills; and one dynamic canonical detail route. The architecture work is therefore primarily **reclassification, linking, and selective gap filling**, not wholesale replacement.

| Existing asset | Final treatment |
|---|---|
| `spelling-lists` schema and related/prerequisite/next IDs | Retain. It already supports stable identity, grade association, list sequence, provenance, and crawlable relationships. |
| `spelling-collections` schema | Retain. Use it for Common Words gateways; no gateway-specific framework is needed. |
| Flat list route and collection route | Retain as the only canonical URLs. |
| Kindergarten curated progression | Implemented in the three frozen sections; retain underlying practice URLs. |
| Grade 1 curated progression and focused Skills | Implemented with stronger instructional distinctions and a curated set of peer grade-hub cards. |
| Dolch collections and sets | Retain as reference/discovery pages, not grade-route cards. |
| Existing Heart Word pages | Retain as source material and related practice; absorb their public curriculum role into Common Words. |

## 3. Final K–5 map

This is the final grade-level content map. “Existing” means reuse/reframe source material; “new” means author a genuine gap or gateway; “merge” means retain focused child pages while presenting one parent-facing roadmap item.

| Grade | Core Spelling | High-Frequency Words | Additional Practice |
|---|---|---|---|
| K | First Words; Short A, I, O, U, E; Mixed CVC Review; late-K Digraph preview. `-ck`/FLOSS are not required. | Four direct numbered sets on the hub; the gateway remains live. | Number Words; Color Words; Animal Words. |
| 1 | Short Vowel Review & C/K; FLOSS; Digraphs & Final `-ck`; Beginning Blends; Ending Blends; Silent E; Open Syllables & Final Y; Vowel Teams; `-s/-es`; `-ed/-ing`; R-Controlled Vowels; `-tch/-dge`. | Six direct numbered sets (72 unique words) on the hub; the gateway remains live. | Number Words 11–20; Days of the Week; Five Senses Words. |
| 2 | Diphthongs oi/oy; Diphthongs ou/ow; Two Sounds of oo; Vowel Patterns au/aw; Soft C and Soft G; Two-Syllable Words (revisits Grade 1 r-controlled vowels within longer words — see the R-Controlled Vowels decision in Section 6); Words Ending in -le; Silent Letter Words; Compound Words; Contractions. | Six direct numbered sets (72 unique words) on the hub; the gateway remains live. | Months of the Year; Money Words; Number Words 20–100. |
| 3 | Longer Words and Syllable Division; Prefixes; Suffixes; Suffix Spelling Changes (merged, see Section 7); Plurals, Possessives, and Contractions; Homophones and Commonly Confused Words; Root Word Families (review). | Five direct numbered sets (60 words) on the hub; the gateway remains live. | None — Calendar, Clothing, and Transportation Words were reviewed and rejected; see the Additional Practice decision in Section 7. |
| 4 | Advanced Multisyllabic Words; Advanced Prefixes; Advanced Suffixes and Final Stable Syllables (merged, see Section 8); Greek and Latin Roots (merged, see Section 8); Commonly Confused Words; Derived Words and Word Meaning (new, closing/bridge). | Four direct numbered sets (48 words) on the hub; the gateway remains live (Section 8). | Measurement Words (customary units only) (Section 8). |
| 5 | Advanced Multisyllabic Academic Words; Advanced Prefixes and Suffixes (merged with Spelling Rules for Word Endings, see Section 14); Greek and Latin Word Parts; Commonly Confused Words; Spelling Changes in Related Words (new, closing/capstone — see Section 14 for why the capstone slot is morphology, not the accuracy card). | 4 sets + gateway (Section 15): silent/hidden letters, doubled letters, unstressed vowels, editing and connecting words. | Civics and Government Words (existing content, corrected); Money Management Words (new) — see Section 16. Science, Math, and geography were evaluated and did not clear the bounded-set bar. |

### Publishing estimate

The prior 180-page recommendation is not a target. Reuse existing canonical practice URLs and add only coherent pages: 29 Common Words sets, 6 Common Words gateways, a small number of genuine instructional gaps per remaining grade, and later optional topic pages that clear editorial review. Kindergarten, Grade 1, Grade 2, and Grade 3 now provide 21 published sets and 4 gateways. Grades 4–5 Common Words pages remain future implementation work.

## 4. Exact Kindergarten grade-hub cards

The visible Kindergarten hub has fifteen cards: eight Core Spelling cards, four direct High-Frequency Words set cards, and three Additional Practice cards. Its High-Frequency Words section visibly explains “4 sets · 40 words” with concise phonics-first Heart Word guidance. A direct page means its listed canonical route is the card destination. The collection remains the canonical explanatory landing page even though its children appear directly on this hub.

| # | Section | Public title | Type and destination | Underlying content | Status | Parent-facing description | Role |
|---:|---|---|---|---|---|---|---|
| 1 | Learn in Order | **First Words** | Direct Grade Unit: `kindergarten-first-words` → `/spelling-lists/grade-level/kindergarten-first-words` | Existing mixed familiar CVC list. | Implemented. | Start with eight familiar, sound-out words that help a child connect spoken sounds to letters before concentrating on one vowel pattern. | Essential |
| 2 | Learn in Order | **Short A Words** | Direct Grade Unit: `kindergarten-short-a-words` | Canonical focused Short A practice. | Implemented. | Practice short-a CVC words as the first focused vowel step. | Essential |
| 3 | Learn in Order | **Short I Words** | Direct Grade Unit: `kindergarten-short-i-words` | Canonical focused Short I practice. | Implemented. | Continue the sequence with short-i CVC words. | Essential |
| 4 | Learn in Order | **Short O Words** | Direct Grade Unit: `kindergarten-short-o-words` | Canonical focused Short O practice. | Implemented. | Practice the short-o vowel sound in simple words. | Essential |
| 5 | Learn in Order | **Short U Words** | Direct Grade Unit: `kindergarten-short-u-words` | Canonical focused Short U practice. | Implemented. | Practice the short-u vowel sound in simple words. | Essential |
| 6 | Learn in Order | **Short E Words** | Direct Grade Unit: `kindergarten-short-e-words` | Canonical focused Short E practice. | Implemented. | Finish the focused short-vowel sequence with short-e words. | Essential |
| 7 | Learn in Order | **Mixed CVC Review** | Direct Grade Unit: `kindergarten-mixed-vowel-review` | Mixed-vowel CVC review. | Implemented. | Check whether a child can choose among short vowels instead of relying on one list pattern. | Review |
| 8 | Learn in Order | **Digraph Words** | Direct late-K preview Grade Unit: `kindergarten-consonant-digraphs` → `/spelling-lists/phonics/kindergarten-consonant-digraphs` | Existing K preview; link onward to canonical CH/SH/TH/WH Skills where available. | Implemented. | Try common two-letter consonant sounds after CVC work; this is a preview, not a required kindergarten milestone. | Optional preview |
| 1–4 | High-Frequency Words | **Kindergarten High-Frequency Words 1–4** | Direct canonical sets: `kindergarten-common-words-1` through `-4` | The four numbered K Common Words sets. | Implemented. | Four small cumulative sets of common sight and writing words, with phonics and Heart Word guidance. | Essential |
| 1 | Additional Practice | **Number Words** | Direct vocabulary page: `kindergarten-number-words` → `/spelling-lists/grade-level/kindergarten-number-words` | One through ten. | Implemented. | Practice useful number spellings from kindergarten math and classroom routines. | Optional |
| 2 | Additional Practice | **Color Words** | Direct vocabulary page: `kindergarten-color-words` → `/spelling-lists/grade-level/kindergarten-color-words` | Red, blue, green, yellow, black, white, brown, pink. | Implemented. | Practice familiar color spellings from art, sorting, books, and classroom routines. | Optional |
| 3 | Additional Practice | **Animal Words** | Direct vocabulary page: `kindergarten-animal-words` → `/spelling-lists/grade-level/kindergarten-animal-words` | Existing familiar animal list. | Implemented. | Practice concrete animal names while applying early sound-to-letter knowledge. | Optional |

**First Words decision:** the final visible title is **First Words**. It is plain, short, and accurately describes the existing direct on-ramp; “Spell Your First Words” is an unnecessary imperative and “First Words and Letter Sounds” overpromises a distinct letter-sound lesson. It differs from the Short Vowel cards because it deliberately mixes familiar CVC words across vowels to establish sound-based spelling transfer before focused vowel discrimination.

**Short Vowels decision:** show the five direct vowel cards, not one gateway. Their ordered presentation communicates a real sequence, preserves every canonical focused page, and avoids a thin new gateway.

**`-ck`/FLOSS decision:** neither card is visible on the Kindergarten hub. They remain published related/support practice only, with no required or preview placement on the K hub.

**High-Frequency Words decision:** one gateway card hid too much important Kindergarten high-frequency content. The four canonical sets now appear directly on the K hub, while the collection stays published as the explanatory landing page.

**Number/Color decision:** publish focused Number Words and Color Words pages because both have coherent, sentence-bank-supported Kindergarten sets. Preserve `kindergarten-number-color-words` as a published compatibility page, remove it from the hub, and direct families to the focused pages. Do not add orange or purple until sentence support exists.

## 5. Exact Grade 1 grade-hub cards

The visible Grade 1 hub is implementation-complete. It has twenty-one cards: twelve Core Spelling cards, six direct High-Frequency Words set cards, and three Additional Practice cards. The `grade-1-common-words` collection remains the canonical explanatory gateway, but the hub exposes its six children directly so families can see the complete sequence.

| # | Section | Public title | Type and destination | Status | Parent-facing purpose |
|---:|---|---|---|---|---|
| 1 | Core Spelling | **Short Vowel Review and C/K Spelling** | Direct Grade Unit: `grade-1-cvc-short-vowels-c-k-rule` | Implemented | Refresh short vowels and learn when the /k/ sound is usually spelled c or k. |
| 2 | Core Spelling | **The FLOSS Rule** | Direct Grade Unit: `grade-1-floss-rule` | Implemented | Learn the short-vowel ending pattern with doubled f, l, s, or z. |
| 3 | Core Spelling | **Digraphs and Final -ck** | Direct Grade Unit: `grade-1-consonant-digraphs-final-ck` | Implemented | Practice common two-letter consonant spellings and final -ck. |
| 4 | Core Spelling | **Beginning Consonant Blends** | Direct Grade Unit: `grade-1-beginning-consonant-blends` | Implemented | Spell words that begin with two consonant sounds. |
| 5 | Core Spelling | **Ending Consonant Blends** | Direct Grade Unit: `grade-1-ending-consonant-blends` | Implemented | Spell words that end with two consonant sounds. |
| 6 | Core Spelling | **Long Vowels with Silent E** | Direct Grade Unit: `grade-1-long-vowels-silent-e` | Implemented | Learn how final silent e can change a vowel sound. |
| 7 | Core Spelling | **Open Syllables and Final Y** | Direct Grade Unit: `grade-1-open-syllables-final-y` | Implemented | Notice short words in which an open syllable or final y makes the vowel sound long. |
| 8 | Core Spelling | **Long Vowel Teams** | Combined roadmap entry: `grade-1-long-a-long-o-vowel-teams`, with focused related practice | Implemented | Learn common vowel teams and move to focused patterns when needed. |
| 9 | Core Spelling | **Plural Endings: -s and -es** | Direct Grade Unit: `grade-1-inflectional-endings-s-es` | Implemented | Spell common plural endings. |
| 10 | Core Spelling | **Verb Endings: -ed and -ing** | Direct Grade Unit: `grade-1-inflectional-endings-ed-ing` | Implemented | Add common verb endings while preserving the base word. |
| 11 | Core Spelling | **R-Controlled Vowels** | Combined roadmap entry: `grade-1-r-controlled-ar-or`, with focused related practice | Implemented | Practice vowel sounds changed by r. |
| 12 | Core Spelling | **Final -tch and -dge** | Direct Grade Unit: `grade-1-tch-dge-ending-rules` | Implemented | Learn useful endings for final /ch/ and /j/ after a short vowel. |
| 1–6 | High-Frequency Words | **Grade 1 Common Words 1–6** | Direct canonical sets: `grade-1-common-words-1` through `-6` | Implemented | Practice 72 unique Grade 1 writing words in six cumulative, phonics-aware sets with Heart Word guidance. |
| 1 | Additional Practice | **Number Words 11–20** | Direct vocabulary page: `grade-1-number-words-11-20` | Implemented | Spell the number words eleven through twenty. |
| 2 | Additional Practice | **Days of the Week** | Direct vocabulary page: `grade-1-days-of-the-week` | Implemented | Spell and capitalize all seven days of the week. |
| 3 | Additional Practice | **Five Senses Words** | Direct vocabulary page: `grade-1-five-senses-words` | Implemented | Practice words for the five senses and the body parts used for them. |

**Common Words decision:** show all six direct set cards rather than only the gateway. The gateway remains published for orientation, collection metadata, and a crawlable complete child list. The six sets contain 72 unique words; cumulative describes the instructional sequence, not duplicated membership.

**Additional Practice decision:** Number Words 11–20, Days of the Week, and Five Senses Words are bounded, parent-recognizable topics with complete editorial and sentence support. Broader or mixed Grade 1 vocabulary pages remain library/discovery content rather than grade-hub cards.

## 6. Exact Grade 2 grade-hub cards

The visible Grade 2 hub is implementation-complete. It has nineteen cards: ten Core Spelling cards, six direct High-Frequency Words set cards, and three Additional Practice cards. The `grade-2-common-words` collection remains the canonical explanatory gateway, but the hub exposes its six children directly, matching the Kindergarten and Grade 1 convention.

| # | Section | Public title | Type and destination | Status | Parent-facing purpose |
|---:|---|---|---|---|---|
| 1 | Core Spelling | **Diphthongs: oi and oy** | Direct Grade Unit: `vowel-teams-oi-oy` → `/spelling-lists/phonics/vowel-teams-oi-oy` | Implemented | Learn the two ways to spell the vowel sound in boy and coin, and when each spelling is used. |
| 2 | Core Spelling | **Diphthongs: ou and ow** | Direct Grade Unit: `vowel-teams-ou-ow` → `/spelling-lists/phonics/vowel-teams-ou-ow` | Implemented | Practice the sound in out and cow, where two spellings share one sound with no position rule. |
| 3 | Core Spelling | **Two Sounds of oo** | Direct Grade Unit: `grade-2-oo-two-sounds` → `/spelling-lists/phonics/grade-2-oo-two-sounds` | Implemented | Learn the same two letters that spell two different sounds, in moon and in book. |
| 4 | Core Spelling | **Vowel Patterns: au and aw** | Direct Grade Unit: `grade-2-au-aw-words` → `/spelling-lists/phonics/grade-2-au-aw-words` | Implemented | Practice the vowel sound in saw and because, and where each spelling belongs in a word. |
| 5 | Core Spelling | **Soft C and Soft G** | Direct Grade Unit: `grade-2-soft-c-soft-g` → `/spelling-lists/phonics/grade-2-soft-c-soft-g` | Implemented | Learn why c sounds like /s/ in city and g sounds like /j/ in page. |
| 6 | Core Spelling | **Two-Syllable Words** | Direct Grade Unit: `grade-2-two-syllable-words` → `/spelling-lists/phonics/grade-2-two-syllable-words` | Implemented | Break longer words into two beats so a child can spell them one syllable at a time. |
| 7 | Core Spelling | **Words Ending in -le** | Direct Grade Unit: `grade-2-final-stable-le` → `/spelling-lists/phonics/grade-2-final-stable-le` | Implemented | Practice the quiet ending in little and table. |
| 8 | Core Spelling | **Silent Letter Words** | Direct Grade Unit: `grade-2-silent-letter-words` → `/spelling-lists/grade-level/2nd-grade-silent-letter-words` | Implemented | Spell words with letters you write but never say, like knee and thumb. |
| 9 | Core Spelling | **Compound Words** | Direct Grade Unit: `grade-2-list-02` → `/spelling-lists/grade-level/2nd-grade-compound-words` | Implemented | Spell big words by finding the two small words inside them. |
| 10 | Core Spelling | **Contractions** | Direct Grade Unit: `grade-2-contractions` → `/spelling-lists/grade-level/2nd-grade-contractions` | Implemented | Join two words into one with an apostrophe, and know which letters it replaces. |
| 1–6 | High-Frequency Words | **Grade 2 Common Words 1–6** | Direct canonical sets: `grade-2-common-words-1` through `-6` | Implemented | Practice 72 unique Grade 2 writing words in six cumulative, phonics-aware sets with Heart Word guidance. |
| 1 | Additional Practice | **Months of the Year** | Direct vocabulary page: `grade-2-months-of-the-year` → `/spelling-lists/grade-level/grade-2-months-of-the-year` | Implemented | Spell and capitalize all twelve months. |
| 2 | Additional Practice | **Money Words** | Direct vocabulary page: `grade-2-money-words` → `/spelling-lists/grade-level/grade-2-money-words` | Implemented | Spell the coin and dollar words second graders meet in math word problems. |
| 3 | Additional Practice | **Number Words 20–100** | Direct vocabulary page: `grade-2-number-words-20-100` → `/spelling-lists/grade-level/grade-2-number-words-20-100` | Implemented | Spell the eight number words that build every number from twenty to one hundred. |

**R-Controlled Vowels decision (D1):** the Grade 2 hub has no standalone R-Controlled Vowels card. Grade 1 already teaches ar, or, er, ir, and ur explicitly across two Core Spelling cards (`grade-1-r-controlled-ar-or`, `grade-1-r-controlled-er-ir-ur`), so Grade 2 does not repeat that instruction as a second public card. Instead, the Two-Syllable Words card declares `skillIds: ["r-controlled-ar", "r-controlled-or", "r-controlled-er-ir-ur"]`, applying the r-controlled patterns a child already knows inside longer words (*winter*, *garden*, *number*) as one of the syllable types the lesson formalizes. This matches Texas TEKS 2.2.C's framing of r-controlled syllables as one of six syllable types taught at this stage rather than a fresh pattern, and keeps the three Grade 1 R-Controlled Skills reachable from Grade 2 — through the card's "Go deeper" callout and each Skill's reverse "Where this fits" lookup — without a duplicate public card. The canonical curriculum's R-Controlled Vowels Grade Unit (documented under "Grade Two overview" in the companion curriculum document) is unchanged; this is a public-presentation decision about which grade's Core Spelling route surfaces it as a card, not a change to the educational blueprint.

**Core Spelling gap count decision (D3):** this document originally predicted two genuine Grade 2 instructional gaps (Soft C/G and a two-syllable/final-stable-`-le` bridge). Implementation found five: the two predicted gaps, plus Two Sounds of oo and Vowel Patterns: au/aw — both absent from the repository at any grade and explicitly named in Florida's Grade 2 phonics benchmark (ELA.2.F.1.3.a, variable vowel teams and diphthongs) — and Words Ending in -le shipped as its own card rather than a combined bridge with Two-Syllable Words. All five ship as new Grade 2 Core Spelling pages; the five retained/reframed cards (both diphthong pages, Silent Letter Words, Compound Words, Contractions) needed no new content, only `contentRole` and relationship metadata.

**Common Words decision:** show all six direct set cards rather than only the gateway, matching the Kindergarten and Grade 1 convention. The gateway remains published for orientation, collection metadata, and a crawlable complete child list. The six sets contain 72 unique words with zero overlap with the 112 words already owned by the Kindergarten and Grade 1 Common Words sets.

**Additional Practice decision:** Months of the Year, Money Words, and Number Words 20–100 are the three approved cards. Money Words replaces an originally-considered "Math Words" card: generic math vocabulary is an open domain (operations, shapes, measurement, time), not a closed, parent-recognizable set like Days of the Week or Months, so it does not clear the same quality bar. Money Words is bounded instead by CCSS 2.MD.C.8, which names the exact coin and dollar denominations practiced here. Number Words 20–100 deliberately excludes "twenty" from its word list — it is already the last word on the Grade 1 Number Words 11–20 card — and instead names it in the page's body copy as the bridge between the two pages.

**Legacy Grade 2 content decision:** the pre-architecture Grade 2 hub included eleven grade-level pages that predated the three-section structure. Four of them — prefix words (un-/re-), suffix words (-ful/-less), an early homophones set, and comparative words (-er/-est) — are canonically Grade 3 curriculum and are reclassified to `grade: "3"`; each was already a declared prerequisite of an existing Grade 3 page. One — regular plural words — duplicates the Grade 1 `-s/-es` lesson and is reclassified to `grade: "1"` as review practice. The remaining three (everyday words, action words, describing words) stay `grade: "2"` as non-hub library content pending later editorial review. No ID or route changed for any of the eight pages.

## 7. Exact Grade 3 grade-hub cards

The visible Grade 3 hub is implementation-complete. It has twelve cards: seven Core Spelling cards and five direct High-Frequency Words set cards. There are no Additional Practice cards. The `grade-3-common-words` collection remains the canonical explanatory gateway, but the hub exposes its five children directly, matching the Kindergarten, Grade 1, and Grade 2 convention.

| # | Section | Public title | Type and destination | Status | Parent-facing purpose |
|---:|---|---|---|---|---|
| 1 | Core Spelling | **Prefixes** | Direct Grade Unit: `grade-3-prefix-words` → `/spelling-lists/grade-level/3rd-grade-prefix-words` | Implemented | Learn common prefixes such as un-, re-, pre-, dis-, and mis- that come before a base word and change its meaning. |
| 2 | Core Spelling | **Suffixes** | Direct Grade Unit: `grade-3-suffix-words` → `/spelling-lists/grade-level/3rd-grade-suffix-words` | Implemented | Practice common suffixes such as -er, -est, -ly, -ful, -less, -ness, and -ment that come after a base word. |
| 3 | Core Spelling | **Suffix Spelling Changes** | Combined roadmap entry: `grade-3-dropping-silent-e` (anchor) → `/spelling-lists/grade-level/3rd-grade-dropping-silent-e`, with `grade-3-doubling-final-consonants` and `grade-3-changing-y-to-i` as focused related practice | Implemented | Learn the three spelling changes a base word can make before a suffix: dropping silent e, doubling the final consonant, and changing y to i. |
| 4 | Core Spelling | **Plurals, Possessives, and Contractions** | Direct Grade Unit: `grade-3-possessives` → `/spelling-lists/grade-level/3rd-grade-possessives` | Implemented | Use 's and s' to show ownership, and tell possessives apart from plurals and contractions. |
| 5 | Core Spelling | **Longer Words and Syllable Division** | Direct Grade Unit: `grade-3-multisyllabic-words` → `/spelling-lists/grade-level/3rd-grade-multisyllabic-words` | Implemented | Break two- and three-syllable words into parts so they are easier to spell. |
| 6 | Core Spelling | **Homophones and Commonly Confused Words** | Direct Grade Unit: `grade-3-homophones` → `/spelling-lists/grade-level/3rd-grade-homophones` | Implemented | Choose the correct spelling for words that sound alike but have different meanings, such as there, their, and they're. |
| 7 | Core Spelling | **Root Word Families** | Direct Grade Unit: `grade-3-root-word-families` → `/spelling-lists/grade-level/3rd-grade-root-word-families` | Implemented | Review how related words share a meaningful base, and preview the Greek and Latin root study that begins in Grade 4. |
| 1–5 | High-Frequency Words | **Grade 3 Common Words 1–5** | Direct canonical sets: `grade-3-common-words-1` through `-5` | Implemented | Practice 60 Grade 3 writing words in five cumulative sets covering position/connecting words, irregular past-tense verbs, reading/writing vocabulary, feelings and description, and time/transition words. |

**Suffix Spelling Changes decision:** rather than author a new merged page, the three existing rule pages — dropping silent e, doubling final consonants, and changing y to i — are presented as one combined roadmap entry, the same pattern used for Grade 1's Long Vowel Teams and R-Controlled Vowels cards. `grade-3-dropping-silent-e` is the anchor Grade Unit; `grade-3-doubling-final-consonants` and `grade-3-changing-y-to-i` are marked `contentRole: skill` and reached through the anchor's related-practice links. No new content was needed, only `contentRole` and relationship metadata.

**Plurals, Possessives, and Contractions decision:** matching the absorption technique used for Grade 2's R-Controlled Vowels (Section 6, D1), Grade 3 does not re-teach plurals or contractions as their own cards. Plurals are already a Grade 1 Core Spelling card (`grade-1-inflectional-endings-s-es`) and contractions are already a Grade 2 Core Spelling card (`grade-2-contractions`). The one genuine gap was possessives (singular `'s` and plural `s'`), so a single new page, `grade-3-possessives`, was authored and linked back to both existing pages via `relatedLists`.

**Longer Words and Syllable Division / Homophones and Commonly Confused Words decision:** both cards reframe existing Grade 3 pages (`grade-3-multisyllabic-words`, `grade-3-homophones`) that predated the three-section structure, promoted to `contentRole: grade-unit` with no content changes.

**Root Word Families decision:** `grade-3-root-word-families` closes the Grade 3 Core Spelling sequence as a review/bridge card rather than off-hub library content, since it already links forward into the Grade 4 root-study pages (`tier-1-roots-and-patterns`).

**Common Words decision:** show all five direct set cards rather than only the gateway, matching the Kindergarten, Grade 1, and Grade 2 convention. The five sets contain 60 words with zero overlap with the 184 words already owned by the sixteen Kindergarten, Grade 1, and Grade 2 Common Words sets. `grade-2-common-words-6`'s `nextLists` now points to `grade-3-common-words-1`, closing the sequence gap noted in Section 10.

**Additional Practice decision:** three candidate topics were evaluated — Calendar Words, Clothing Words, and Transportation Words. (Money Words was excluded from consideration because it already belongs to the completed Grade 2 implementation, per the Additional Practice decision in Section 6.) None cleared the bounded-set quality bar used at every prior grade: Calendar Words is a legitimate vocabulary category but does not add enough educational value to justify a permanent page, and Clothing Words and Transportation Words overlap earlier instruction and common vocabulary already covered elsewhere. Grade 3 therefore ships with no Additional Practice cards. This is the current implementation decision, not a permanent rule — Additional Practice may be revisited once the full K–5 curriculum is complete, when broader cross-grade enrichment opportunities can be evaluated together across grades.

## 8. Exact Grade 4 grade-hub cards

The visible Grade 4 hub is implementation-complete. Core Spelling has six cards. High-Frequency Words has four direct numbered sets (48 words); the `grade-4-common-words` gateway remains the canonical explanatory landing page, matching the Kindergarten–Grade 3 convention. Additional Practice has one card, Measurement Words. See the Grade 4 Common Words and Grade 4 Additional Practice subsections below for the full record.

| # | Section | Public title | Type and destination | Underlying content | Status | Parent-facing purpose |
|---:|---|---|---|---|---|---|
| 1 | Core Spelling | **Advanced Multisyllabic Words** | Direct Grade Unit: `grade-4-multisyllabic-academic-words` → `/spelling-lists/grade-level/4th-grade-multisyllabic-academic-words` | Existing page, reframed. | Implemented | Break longer academic words such as *communicate* and *organize* into syllables before moving into affixes and roots. |
| 2 | Core Spelling | **Advanced Prefixes** | Direct Grade Unit: `grade-4-advanced-prefixes` → `/spelling-lists/grade-level/4th-grade-advanced-prefixes` | Existing page, reframed. | Implemented | Learn prefixes such as inter-, sub-, super-, trans-, and anti- that appear in longer academic words. |
| 3 | Core Spelling | **Advanced Suffixes and Final Stable Syllables** | Combined roadmap entry: `grade-4-advanced-suffixes` (anchor) → `/spelling-lists/grade-level/4th-grade-advanced-suffixes`, with a new -ture/-sure focused Skill as related practice | Existing anchor, reframed; one new sibling page. | Implemented | Learn advanced suffixes such as -able, -ible, -ous, -ive, -tion, and -sion, then extend into the -ture/-sure endings that complete the Grade 4 final-stable-syllable set. |
| 4 | Core Spelling | **Greek and Latin Roots** | Combined roadmap entry: `tier-1-roots-and-patterns` (Latin, anchor) → `/spelling-lists/grade-level/tier-1-roots-and-patterns`, with `tier-2-greek-latin-roots` (Greek) as related practice | Existing anchor and sibling, both reframed. | Implemented | Learn Latin roots such as port, dict, spect, rupt, and struct, then Greek roots such as tele, photo, graph, bio, demo, and scope. |
| 5 | Core Spelling | **Commonly Confused Words** | Direct Grade Unit: `grade-4-commonly-confused-words` → `/spelling-lists/grade-level/4th-grade-commonly-confused-words` | Existing page, reframed. | Implemented | Choose the right spelling for words that sound alike or look similar, such as its/it's, than/then, and affect/effect. |
| 6 | Core Spelling | **Derived Words and Word Meaning** | Direct Grade Unit: new page | New content. | Implemented | See how one base word's family — such as nation, national, and nationality — keeps its spelling stable even as pronunciation and meaning shift, previewing Grade 5's related-word study. |

**Card order decision:** Advanced Multisyllabic Words opens the sequence, then Advanced Prefixes, then Advanced Suffixes and Final Stable Syllables, then Greek and Latin Roots, then Commonly Confused Words, closing with Derived Words and Word Meaning. Structured-literacy sources (Fundations Level 4, Words Their Way's Derivational Relations stage, UFLI) consistently sequence affix work before Greek/Latin root work: affixes attach to whole recognizable base words, a simpler task, while roots are bound morphemes with no independent word to anchor to, making formal root study the more abstract, later-arriving skill — consistent with the canonical curriculum document's framing of Grade 4 as the point of *formal* root study. This also keeps Roots positioned after Multisyllabic Words, since root recognition is applied inside multisyllabic decoding rather than before it. The closing position is independently motivated: Grade 3's own last card (Root Word Families) established the precedent that the final Core Spelling card bridges into the next grade's deepest concept, while an accuracy/usage card (Homophones/Confused Words) sits second-to-last as a polish step. Derived Words and Word Meaning closes Grade 4 for the same reason Root Word Families closed Grade 3 — Grade 5's frozen map (Section 3) explicitly adds "related-word spellings **new**," building on Derived Words, not on Confused Words.

**Title decision:** Advanced Prefixes, Advanced Suffixes and Final Stable Syllables, and Advanced Multisyllabic Words keep "Advanced" rather than reusing Grade 3's plain titles ("Prefixes," "Suffixes"). Within the Grade 4 hub alone this looks redundant, but read against the K–5 progression a parent has already seen, it distinguishes deeper Grade 4 content from a same-named Grade 3 card — the same reason Grade 3's bridge card is titled "Root Word Families," not "Roots," so it isn't confused with Grade 4's "Greek and Latin Roots." The published files' `title` frontmatter already carries "Advanced," making this the lower-cost choice as well.

**Advanced Suffixes and Final Stable Syllables decision:** rather than author a separate "Word Endings" hub card, the combined roadmap entry remains anchored on `grade-4-advanced-suffixes`, with the published `grade-4-final-stable-syllables` page reachable through its existing related-practice link. That sibling retains its pre-PR legacy `contentRole: skill` metadata for compatibility but is not a canonical Browse-by-Skill destination; its final role is unresolved and deferred to the Grade curriculum editorial phase.

**Greek and Latin Roots decision:** the canonical Greek and Latin Roots unit is one hub card, not two. `tier-1-roots-and-patterns` (Latin roots: port, dict, spect, rupt, struct) is the anchor Grade Unit; `tier-2-greek-latin-roots` (Greek roots: tele, photo, graph, bio, demo, scope) is marked `contentRole: skill` and reached through the anchor's related-practice link. Both pages already existed, already grade-4-tagged and sequenced (`order: 6` and `7`), and already cross-reference each other — no new content was needed, only `contentRole` and hub registration.

**Advanced Multisyllabic Words / Advanced Prefixes / Commonly Confused Words decision:** all three reframe existing Grade 4 pages that predated hub registration (`grade-4-multisyllabic-academic-words`, `grade-4-advanced-prefixes`, `grade-4-commonly-confused-words`), promoted to `contentRole: grade-unit` with no content changes. Advanced Prefixes is not one of the four canonical Grade 4 Grade Units; it is a deliberate implementation card the architecture adds beyond the canonical set, carrying forward Grade 3's parallel Prefixes/Suffixes rungs so the K–5 progression stays legible to parents, the same way Grade 3 added Longer Words and Syllable Division and Root Word Families beyond its five canonical units (Section 7). Commonly Confused Words plays the same role Grade 3's Homophones and Commonly Confused Words card played, one step before the grade's closing bridge card.

**Derived Words and Word Meaning decision:** this is the one wholly new Grade 4 Core Spelling page. Nothing existing teaches spelling-stability-across-a-derivational-family at this depth: Grade 3's Root Word Families is explicitly introductory noticing (`act/action/active/actor`, `form/inform/reform`), and Grade 4's Roots card teaches recurring meaning-bearing chunks across unrelated words (`port`, `dict`, `tele`, `bio`). Derived Words and Word Meaning is different in kind — one base word's family, preserving spelling across derivational shifts even when pronunciation changes (for example, *nation → national → nationality*, *muscle → muscular*, *human → humanity → humane*, *popular → popularity*, *origin → original → originate*). Base families already used in `grade-3-root-word-families` (`act`, `form`, `port`, `sign`) are deliberately avoided to prevent a near-duplicate list. The card closes the Grade 4 sequence and previews Grade 5's "related-word spellings" unit (Section 3).

**Off-hub Grade 4 vocabulary:** `grade-4-everyday-words`, `grade-4-reading-writing-words`, and `grade-4-list-02` (community/content vocabulary) are not part of the Core Spelling hub — direct analogues of Grade 3's off-hub vocabulary (Section 7's `GRADE_3_VOCABULARY_IDS` equivalent). They remain on-ramp content (`grade-4-everyday-words` already declares `prerequisiteLists: ["grade-3-root-word-families"]`) and future Additional Practice raw material (Section 3, "after audit"), not Core Spelling cards.

### Grade 4 Common Words

Four cumulative 12-word sets, 48 words total, zero overlap with the 184 words already owned by the sixteen Kindergarten, Grade 1, Grade 2, and Grade 3 Common Words sets (verified directly against every published set file, not from memory). Matches the frozen 4-set count (Section 1) and continues the 12-words-per-set convention every implemented grade but Kindergarten has used.

| Set | Theme | Words | Shared spelling problem |
|---|---|---|---|
| 1 | Silent and Unexpected Letters | government, environment, comfortable, island, receipt, vegetable, restaurant, neighbor, straight, weird, calendar, business | A silent or unexpected letter/cluster survives the spelling after the sound drops or shifts in speech. |
| 2 | Doubled Consonants in Everyday Words | necessary, embarrass, recommend, disappear, guarantee, occasion, opposite, exaggerate, address, apparent, possess, success | A doubled consonant that isn't suffix-triggered (unlike Grade 3's doubling-final-consonants Core Spelling skill) and is easy to mis-double from memory. |
| 3 | Words with an Unstressed Vowel | separate, chocolate, general, several, particular, hospital, president, similar, category, grammar, ordinary, laboratory | A schwa vowel spellable several plausible ways — directly embeds the schwa work `CANONICAL_K5_GRADE_UNIT_CURRICULUM.md`'s Grade 4 section says should be absorbed into word study rather than made a separate Grade Unit. |
| 4 | Confusable and Connecting Words for Longer Writing | however, furthermore, regardless, although, though, thorough, weather, whether, altogether, persuade, reason, sincerely | Deliberately echoes/contrasts earlier Common Words (`altogether` vs. Grade 2's `together`, `though` vs. `thought`, `weather` vs. `whether`) the same way Grade 3's `throughout` echoed Grade 2's `-ough` family — spiral connection, not overlap. |

**Set 4 revision decision:** the first draft used five near-synonymous formal connectors (`however`, `nevertheless`, `furthermore`, `moreover`, `regardless`) — redundant vocabulary rather than genuine spelling-pattern diversity, unlike Sets 1–3's shared-problem grouping. `nevertheless` and `moreover` were cut and replaced with `persuade` and `reason` — CCSS W.4.1 opinion-writing words that broaden the set beyond one grammatical function. `however`, `furthermore`, and `regardless` were kept because each serves a distinct linking function (contrast, addition, concession) Grade 4 writing standards call for; three is a defensible footprint where five was not.

Gateway: `grade-4-common-words` collection (`category: sight-words`, `grade: "4"`), same model as `grade-3-common-words`. Four `sight-word-set` entries, `relatedLists: []` (matching the Grade 2/3 convention — no Heart Words page to link). Set 1's `prerequisiteLists` closes the gap from `grade-3-common-words-5`, the same way `grade-2-common-words-6` → `grade-3-common-words-1` was closed.

### Grade 4 Additional Practice

One card: **Measurement Words**, customary units only — `inch, foot, yard, mile, ounce, pound, ton, cup, pint, quart, gallon` (11 words). Tied to CCSS 4.MD.A.1 (the first point in the K–5 math sequence requiring students to know and convert measurement units), which no K–3 Additional Practice card touches. Verified zero overlap with Grade 4 Core Spelling, Common Words, or off-hub vocabulary; `cup` appears once, incidentally, in a Kindergarten CVC phonics example list, which is an allowed non-conflicting appearance under the same rule that governs incidental Common Words appearances.

**Placeholder-rejection decision:** this document's earlier Grade 4 Additional Practice row read "Math; Science; Social Studies; opinion/explanation writing after audit" — a placeholder, not a frozen decision (Section 1, "What remains flexible"). Audited against the same bounded-set and no-duplication rules every prior grade's Additional Practice candidates were held to, none of it survived: "Math" and "Science" are open, ever-growing domains, the same defect that sank Grade 2's "Math Words" candidate (Section 6); "Social Studies" would duplicate Grade 4's own off-hub `4th-grade-community-words.md` almost word-for-word; "opinion/explanation writing" would duplicate the Grade 4 Common Words Set 4 theme above. Measurement Words is the one candidate that clears the bar, using the same rescue pattern that saved Grade 2's Money Words from the "Math Words" rejection — bound a math-adjacent domain to the exact closed set a specific grade-level standard names, rather than the open subject as a whole.

**Customary-only decision:** metric units were evaluated and rejected as either too thin alone (7 words: kilometer, meter, centimeter, kilogram, gram, liter, milliliter — on the same thinness edge that sank Grade 3's Calendar Words) or, combined with customary, large enough (~18 words) to break size parity with every other Additional Practice card shipped and start reading as a reference list. A second, metric-only card was also rejected as page inflation to cover both systems evenly — Grade 3 shipped zero Additional Practice cards rather than pad to three, and this document does not pad Grade 4 to two cards where one, well-justified, already satisfies the standard's educational hook. Customary units are also the stronger "practical ownership vocabulary" fit (CCSS 4.MD.A.1 only requires conversion "within a single system," not cross-system fluency) and the stronger genuine spelling-trouble-spot fit: `ounce`, `gallon`, and `pint` need real memory work, while metric terms are transparent Greek/Latin-root compounds that spell more regularly. A future Metric Measurement Words page remains open for a later grade if a genuine need emerges; nothing here forecloses it.

Rejected candidates and why: Compass Directions (reads as "geography," excluded by Section 1's "Deferred optional content" rule, and thin); Ordinal Words (`first` is Grade 1 Common Words, `eighth` is Grade 4's own off-hub vocabulary); Weather Words (open domain, and overlaps the `weather`/`whether` pair in Common Words Set 4); Calendar/Clothing/Transportation Words (already rejected at Grade 3 for the same reasons, Section 7); Family/School vocabulary (explicitly named in Section 1's blocklist).

## 9. Common Words content model and Heart Word treatment

### Model

Use the existing models with no schema change:

| Need | Representation |
|---|---|
| Gateway | `spelling-collections` entry, `category: sight-words`, grade set, ordered `listIds`. |
| Numbered set | `spelling-lists` entry with `contentRole: sight-word-set`, `category: sight-words`, grade, stable ID, `order`, and `sourceType: curated`. |
| Set number | The final numeral in the stable ID/title and collection `listIds` order; no new field is needed. |
| Sequence | `prerequisiteLists`/`nextLists` link adjacent numbered sets; the gateway lists all sets. |
| Provenance | `canonicalSource` records `Hybrid editorial` with a tier such as `K common words`; body copy names Dolch/Heart Word source overlap without claiming that a set reproduces a source list. |
| Related links | Each set links to its gateway, adjacent set, and only truly related Heart Word/Dolch/phonics pages. |
| Canonical URL | Only the existing list or collection route. Grade hubs and Skills link to it. |
| Structured data | Existing collection `ItemList` describes gateway child sets; existing list breadcrumbs remain valid. Do not add FAQ markup unless a page has real, non-repetitive questions. |

### Lightest Heart Word metadata

Use the existing object-form word entry only where a short editorial hint is useful:

```yaml
- word: said
  hint: "Heart part: ai"
```

`hint` is optional and already schema-supported. It is editorial guidance, not a new interactive teaching system. Do **not** add substring ranges, grapheme components, a state machine, or a separate Heart Word collection in the current implementation. The current practice payload reduces words to playable text, so it can practice all words now but does not display hints during the test; the introductory text and list-page body carry the annotation. A future UI improvement may expose `hint` beside a preview word without changing IDs or word membership.

Use these classifications in editorial notes only:

- **Regular/currently decodable:** the current grade’s taught patterns account for the word.
- **Temporarily irregular:** it becomes explainable after a later pattern (for example, an open-syllable long vowel or silent-e convention).
- **Permanently irregular portion:** a small spelling portion needs direct memory support at this level.

A word has one canonical numbered-set membership. Appearance in a phonics/example list is incidental; a later numbered set may review earlier words only when explicitly labeled cumulative review, never by silently duplicating membership.

### SEO, GEO, and AEO pattern

| Surface | H1 | Title tag | Visible helper language |
|---|---|---|---|
| K gateway | Kindergarten Common Words to Spell | `Kindergarten Common Words to Spell: 4 Sets | spellingwords` | “Includes kindergarten sight words and Heart Word guidance.” |
| K set | Kindergarten Common Words 1 | `Kindergarten Common Words 1 | Sight Words and Spelling` | Explain the set’s phonics-aware progression; do not repeat the gateway’s full copy. |
| Grade 1 gateway | Grade 1 Common Words to Spell | `1st Grade Common Words to Spell: 6 Sets | spellingwords` | “Includes first-grade sight-word and Heart Word support.” |
| Grade 1 set | Grade 1 Common Words 1 | `1st Grade Common Words 1 | Sight Words and Spelling` | Use “common spelling words” naturally. |
| Grade 2 gateway | Grade 2 Common Words to Spell | `2nd Grade Common Words to Spell: 6 Sets | spellingwords` | “Includes second-grade sight words and Heart Word guidance.” |
| Grade 2 set | Grade 2 Common Words 1 | `Grade 2 Common Words 1 | Sight Words and Spelling` | Use “common spelling words” naturally. |

Every gateway must server-render: (1) a concise answer block explaining what is practiced, set/approximate word count, grade fit, and regular/irregular treatment; (2) crawlable links to child sets; and (3) distinct introductory copy. The collection route’s existing breadcrumb and `ItemList` implementation is sufficient when the gateway’s visible text is authored well.

## 10. Implemented Kindergarten, Grade 1, Grade 2, and Grade 3 Common Words content

### Gateways

| Title | Stable ID | Route | Members | Parent-facing introductory copy |
|---|---|---|---|---|
| Kindergarten Common Words | `kindergarten-common-words` | `/spelling-lists/collections/kindergarten-common-words` | `kindergarten-common-words-1` through `-4`; 40 words total | “These four small sets help kindergarteners spell everyday words used in early reading and writing. Most words can be connected to sounds your child knows; when one small part does not match yet, the page points it out as a Heart Word part.” |
| Grade 1 Common Words | `grade-1-common-words` | `/spelling-lists/collections/grade-1-common-words` | `grade-1-common-words-1` through `-6`; 72 unique words total | “These six cumulative sets build useful Grade 1 writing words without treating them as a list to memorize blindly. Children use familiar phonics when possible and learn only the unexpected spelling parts by heart.” |
| Grade 2 Common Words | `grade-2-common-words` | `/spelling-lists/collections/grade-2-common-words` | `grade-2-common-words-1` through `-6`; 72 unique words total | “These six sets carry a second grader through the last heavy year of common-word learning. Most of these words can now be sounded out with the patterns your child already knows — vowel teams, syllables, and silent letters. Where one small part is still unexpected, the page names it so your child learns only that part by heart.” |
| Grade 3 Common Words | `grade-3-common-words` | `/spelling-lists/collections/grade-3-common-words` | `grade-3-common-words-1` through `-5`; 60 words total | “These five sets carry a third grader through everyday writing words and persistent trouble words: words that no longer sound out with a single phonics rule and instead need to be recognized, used correctly in context, or partly remembered. Where a word repeats a pattern already flagged as a Heart Word earlier in the K–2 sequence (such as an -ough family word), the set names the connection instead of re-teaching it as new.” |

### Kindergarten sets

| Set | ID and route | Ordered words | Classification (`R` regular, `T` temporarily irregular, `P` permanently irregular portion) | Sources, overlap, and relationship |
|---|---|---|---|---|
| Kindergarten Common Words 1 | `kindergarten-common-words-1`<br>`/spelling-lists/sight-words/kindergarten-common-words-1` | **a, I, am, at, can, in, it, is, and, the** (10) | a T; I T; am R; at R; can R; in R; it R; is T; and R; the P (`e`). | Hybrid early-writing set drawing on Dolch Pre-Primer A/B/C and existing K Heart Words. `am/at/can/in/it` are incidental phonics examples; none has another Common Words membership. First set; next `-2`. Intro: “Start with ten short words children use to label, answer, and make simple sentences. Sound out the parts that work as expected, then notice the small tricky parts in a, I, is, and the.” |
| Kindergarten Common Words 2 | `kindergarten-common-words-2`<br>`/spelling-lists/sight-words/kindergarten-common-words-2` | **he, she, we, me, my, go, to, do, you, like** (10) | he T; she T; we T; me T; my T; go T; to P (`o`); do P (`o`); you P (`ou`); like T. | Hybrid Dolch Pre-Primer/Primer plus existing K Heart Words. These are intentionally not copied into a second numbered set. Prerequisite `-1`; next `-3`. Intro: “Use these common people, action, and sentence words to write about yourself and others. Many become easier to explain as children learn long-vowel patterns; to, do, and you still need a remembered part now.” |
| Kindergarten Common Words 3 | `kindergarten-common-words-3`<br>`/spelling-lists/sight-words/kindergarten-common-words-3` | **for, of, was, said, have, are, here, come, look, see** (10) | for T; of P (`f`); was P (`a`); said P (`ai`); have T; are T; here T; come P (`o`); look T; see T. | Hybrid Dolch and K Heart Words; connects incidentally to silent-e/vowel-team knowledge taught later. Prerequisite `-2`; next `-4`. Intro: “Practice high-use words that help children explain, tell, and describe. Use the sounds that make sense and learn the small unexpected parts in words such as said, was, of, and come.” |
| Kindergarten Common Words 4 | `kindergarten-common-words-4`<br>`/spelling-lists/sight-words/kindergarten-common-words-4` | **this, that, with, they, one, two, three, where, little, play** (10) | this T; that T; with T; they T; one P (`o_e`); two P (`w`); three P (`ee`); where P (`wh/ere`); little T; play T. | Hybrid Dolch Pre-Primer/Primer and existing K topical material (`one`, `two`, `three`, `play`). Topic-page appearances are incidental; this set owns common-word membership. Prerequisite `-3`; no next K set; related to Grade 1 gateway. Intro: “Finish kindergarten common-word practice with words used in early questions, counting, and simple stories. Several spellings are not fully predictable yet, so practice the regular parts and remember only the tricky part.” |

### Grade 1 sets

All six sets are published, contain 12 words each, and form a live adjacent sequence. Word membership is unique across the sequence.

| Set | Ordered words | Sequence relationship | Editorial focus |
|---|---|---|---|
| `grade-1-common-words-1` | all, but, did, no, get, good, new, now, our, out, please, want | Next: set 2 | Useful words for sentences, directions, and everyday writing. |
| `grade-1-common-words-2` | after, again, any, ask, by, could, every, fly, from, give, going, had | Previous: set 1; next: set 3 | Words for stories, questions, and classroom writing. |
| `grade-1-common-words-3` | on, not, an, as, if, has, his, her, him, them, be, will | Previous: set 2; next: set 4 | Joining words, pronouns, action words, and helping words. |
| `grade-1-common-words-4` | what, when, who, why, how, there, your, their, were, some, more, because | Previous: set 3; next: set 5 | Questions, explanations, comparisons, and reasons. |
| `grade-1-common-words-5` | up, down, back, over, into, about, home, way, time, first, next, then | Previous: set 4; next: set 6 | Place, movement, time, and sequence words. |
| `grade-1-common-words-6` | or, so, just, us, may, make, many, very, people, know, would, should | Previous: set 5 | Choices, explanations, opinions, and fluent writing. |

The object-form `hint` field marks only the unexpected or not-yet-taught portions that benefit from Heart Word guidance. The final collection membership, exact page copy, and hint wording live in the corresponding content entries; this table freezes architecture, sequence, and word membership.

### Grade 2 sets

All six sets are published, contain 12 words each, and form a live adjacent sequence (set 1's prerequisite is `grade-1-common-words-6`; set 6's `nextLists` now points to `grade-3-common-words-1`). Word membership is unique across the sequence and has zero overlap with the 112 words owned by the ten Kindergarten and Grade 1 sets. `relatedLists` is `[]` on every set — unlike the numbered sets above, Grade 2 has no Heart Words page to point at, and inventing one would duplicate an existing page family, so the sequence relationship lives entirely in `prerequisiteLists`/`nextLists`.

| Set | Ordered words | Classification (`R` regular, `T` temporarily irregular, `P` permanently irregular portion) | Editorial focus |
|---|---|---|---|
| `grade-2-common-words-1` | always, around, before, another, between, under, until, almost, together, enough, without, through | always T (`al`); around R; before R; another P (`o`); between R; under R; until R; almost T (`al`); together P (first syllable); enough P (`ough`); without R; through P (`ough`). | The connective glue of Grade 2 sentences. Groups the two `ough` words (*enough*, *through*) so the pattern is taught once. |
| `grade-2-common-words-2` | been, does, goes, gave, made, found, told, began, took, came, went, done | been P (`ee`→short i); does P (`oes`); goes T (`oes`); gave R; made R; found R; told T (`old` family); began R; took R; came R; went R; done P (`o`). | Past-tense and irregular verbs. Pairs *does*/*goes* so the shared `-oes` spelling is contrasted, not confused. |
| `grade-2-common-words-3` | school, book, page, word, letter, sentence, story, question, answer, learn, study, never | school P (`ch`→/k/); book R; page R; word P (`or`→/er/); letter R; sentence R; story R; question P (`ti`→/sh/); answer P (silent `w`); learn T (`ear`→/er/); study R; never R. | The vocabulary of classroom instructions and writing prompts. |
| `grade-2-common-words-4` | friend, family, father, mother, sister, brother, children, everyone, someone, something, young, kind | friend P (`ie`); family R; father T (`a`→ah); mother P (`o`); sister R; brother P (`o`); children R; everyone T (compound); someone P (`o`); something R; young P (`ou`); kind T (`ind` family). | Groups *mother*/*brother*/*young* so /ʌ/-spelled-`o`/`ou` is one family, not three oddities. |
| `grade-2-common-words-5` | best, both, different, important, great, large, small, high, light, cold, fast, right | best R; both T (long o, no marker); different R; important R; great P (`ea`→long a); large R; small T (`all`); high P (`igh`); light P (`igh`); cold T (`old` family); fast R; right P (`igh`). | Groups the three `igh` words (*high*, *light*, *right*) — that pattern gets no Core Spelling card, so it is taught here. |
| `grade-2-common-words-6` | which, these, those, its, own, off, only, other, use, work, thought, read | which R; these R; those R; its R; own T (`ow`→long o); off R; only R; other P (`o`); use R; work P (`or`→/er/); thought P (`ough`); read (heteronym — no fixed classification). | Mirrors Grade 1 set 6's job one year on. Pairs *its* against the Contractions Core Spelling card. |

The gateway's introductory copy and each set's body copy are quoted in full in the content entries; this table freezes architecture, sequence, and word membership.

### Grade 3 sets

All five sets are published, contain 12 words each, and form a live adjacent sequence (set 1's prerequisite is `grade-2-common-words-6`; set 5 has no next set). Word membership is unique across the sequence and has zero overlap with the 184 words owned by the sixteen Kindergarten, Grade 1, and Grade 2 sets. `relatedLists` is `[]` on every set, matching the Grade 2 convention — the sequence relationship lives entirely in `prerequisiteLists`/`nextLists`.

| Set | Ordered words | Sequence relationship | Editorial focus |
|---|---|---|---|
| `grade-3-common-words-1` | across, above, below, beneath, beside, among, upon, toward, against, within, beyond, throughout | Prerequisite: `grade-2-common-words-6`; next: set 2 | Position and connecting words; groups *throughout* with the `ough` family already taught in Grade 2's *through* and *enough*. |
| `grade-3-common-words-2` | brought, bought, caught, taught, fought, sought, built, heard, earned, paid, laid, weighed | Previous: set 1; next: set 3 | Irregular past-tense verbs; groups the six shared `-ought`/`-aught` words as one family. |
| `grade-3-common-words-3` | library, dictionary, paragraph, subject, chapter, author, title, describe, explain, practice, opinion, nonfiction | Previous: set 2; next: set 4 | Reading and writing vocabulary for talking about books and student writing. |
| `grade-3-common-words-4` | favorite, wonderful, terrible, awful, difficult, especially, excited, nervous, curious, jealous, proud, disappointed | Previous: set 3; next: set 5 | Feelings and description words with more precision than *happy* or *sad*. |
| `grade-3-common-words-5` | finally, probably, actually, immediately, eventually, meanwhile, instead, otherwise, therefore, certainly, definitely, recently | Previous: set 4; no next set | Time and transition words that sequence ideas and connect sentences in writing. |

The gateway's introductory copy and each set's body copy are quoted in full in the content entries; this table freezes architecture, sequence, and word membership.

## 11. Completed K–5 implementation

Kindergarten, Grade 1, Grade 2, Grade 3, Grade 4, and Grade 5 now all realize the three-section architecture on their public hubs, except that Grade 3 ships with zero Additional Practice cards after its three candidate topics were reviewed and rejected (Section 7). All six Common Words gateways and all twenty-nine K–5 child sets are published. Kindergarten exposes four sets and 40 words; Grade 1 and Grade 2 each expose six sets and 72 unique words; Grade 3 exposes five sets and 60 words; Grade 4 and Grade 5 each expose four sets and 48 words. The public hubs link directly to their set cards while their collection gateways remain canonical explanatory landing pages.

Grade 4's Core Spelling section realizes the frozen hub pattern: six cards, two of them combined roadmap entries reusing existing pages, one wholly new closing page (Section 8). Grade 4's Common Words (four sets, 48 words) and Additional Practice (one card, Measurement Words) are also now implemented (Section 8), following the same audit process as every prior grade's Additional Practice decision — including, for Additional Practice, arriving at exactly one card rather than the three K–2 shipped, the same way Grade 3 arrived at zero.

Grade 5's Core Spelling section also now realizes the hub pattern: five cards, one a combined roadmap entry, one wholly new closing page (Section 14). Grade 5's Common Words are also implemented: four sets, 48 words, zero overlap with the 292 words already owned by Kindergarten–Grade 4 (Section 15). Grade 5's Additional Practice is also now implemented: two cards, Civics and Government Words and Money Management Words, after auditing five candidates and rejecting three (Section 16). The Grade 5 hub now renders all three sections — Grade 5 is implementation-complete, with no phase remaining deferred.

The completed implementation preserves existing flat canonical routes, stable IDs, parent/adjacent links, server-rendered gateway orientation, and visible-content-aligned breadcrumb and `ItemList` structured data. Focused Skills and compatibility pages retain their routes without becoming duplicate canonical curriculum pages. Grade 2's, Grade 3's, Grade 4's, and Grade 5's implementations additionally required no schema change — they reused `contentRole: grade-unit`/`skill`/`sight-word-set`/`vocabulary-theme`, `skillIds`, `prerequisiteLists`/`nextLists`, and the existing `spelling-collections` gateway model exactly as documented above.

### Maintenance contract for all six grades

Any future maintenance across Kindergarten–Grade 5 must continue to follow the frozen decisions in Sections 1–3:

- Use the three public sections in order: Core Spelling, High-Frequency Words, and Additional Practice.
- Reuse stable canonical practice URLs and add only genuine curricular gaps or approved bounded vocabulary topics.
- Publish one Common Words gateway per grade and the set counts frozen in Section 1.
- Curate exact word membership before publishing; do not expose planned-but-unpublished children in visible links or structured data.
- Use existing schema fields, adjacent-set relationships, and optional Heart Word hints; do not create duplicate route families or a parallel Heart Word taxonomy.
- Keep breadcrumbs, `ItemList` data, and internal links aligned with visible published content.
- Preserve focused Skills as reusable practice reached from Grade Units, browse surfaces, search, and related links.
- Do not reopen any grade's frozen architecture without an explicit new architecture decision.

## 12. SEO, internal linking, and documentation governance

### Durable SEO/AEO/GEO principles

- Teach a specific spelling concept or provide a bounded, useful collection; do not publish generic keyword buckets.
- Use natural familiar terms (“sight words,” “Heart Words,” “high-frequency words”) in explanatory copy and metadata while retaining the one Common Words architecture.
- Every gateway needs substantive server-rendered orientation text, unique purpose, and a complete crawlable child list.
- Each practice page needs one canonical URL, a clear answer-oriented introduction, grade/skill context, and a limited set of relevant internal links.
- Structured data must describe visible content, not planned-but-unpublished pages.

### Documentation governance

This document supersedes only prior **planning documents** whose purpose was to choose a K–5 architecture. Retain technical and evidence documents that describe the current schema, routes, audits, curriculum research, source policies, or historical rationale. When implementation changes a technical contract, update that technical document separately; do not use this architecture plan as a substitute for code-level documentation.

## 13. Implementation order for remaining grades

1. ~~Implement Grade 2 Common Words and its two genuine instructional gaps.~~ **Done.** Grade 2 shipped with its Common Words system and five genuine instructional gaps, not two — see the Core Spelling gap count decision (D3) in Section 6.
2. ~~Normalize Grade 3’s suffix-change and syllable-division route.~~ **Done.** Grade 3 shipped its full three-section hub: seven Core Spelling cards (including the merged Suffix Spelling Changes combined roadmap entry and the new Possessives page), five Common Words sets, and a reviewed-and-rejected Additional Practice pass — see Section 7.
3. ~~Reframe Grade 4's morphology and multisyllabic material.~~ **Done.** Grade 4 shipped six Core Spelling cards, including two combined roadmap entries (Advanced Suffixes and Final Stable Syllables; Greek and Latin Roots) and one new closing page (Derived Words and Word Meaning) — see Section 8.
4. ~~Curate Grade 4's narrower Common Words sequence and Additional Practice.~~ **Done.** Grade 4 shipped four Common Words sets (48 words) and one Additional Practice card (Measurement Words) — see Section 8.
5. ~~Complete Grade 5's morphology and multisyllabic reframing.~~ **Done.** Grade 5 shipped five Core Spelling cards, including one combined roadmap entry (Advanced Prefixes and Suffixes, with Spelling Rules for Word Endings as its sibling) and one new closing page (Spelling Changes in Related Words) — see Section 14.
6. ~~Curate Grade 5's Common Words sequence.~~ **Done.** Grade 5 shipped four Common Words sets (48 words), zero overlap with the 292 words already owned by Kindergarten–Grade 4 — see Section 15.
7. ~~Complete Grade 5's Additional Practice.~~ **Done.** Grade 5 shipped two Additional Practice cards (Civics and Government Words; Money Management Words) after auditing five candidates and rejecting three — see Section 16.
8. Add optional topic cards only after each grade’s core route and Common Words system are complete and the topics clear editorial review. All six K–5 grades are now implementation-complete; no grade has a pending phase.
9. Keep Kindergarten, Grade 1, Grade 2, Grade 3, Grade 4, and Grade 5 synchronized with implementation when maintenance changes their technical contracts; do not reopen their frozen architecture without an explicit architecture decision.

## 14. Exact Grade 5 grade-hub cards (Core Spelling — Phase 1)

The Grade 5 hub's Core Spelling section was implemented first, as documented below. High-Frequency Words (Section 15) and Additional Practice (Section 16) followed as later phases; all three sections are now live — Grade 5's three content-area vocabulary files (`grade-5-science-nature-words`, `grade-5-community-civics-words`, `grade-5-math-vocabulary`) were held pending that later work rather than wired in early, the same discipline Grade 3's Additional Practice review (Section 7) and Grade 4's placeholder-rejection decision (Section 8) both document. Section 16 records the outcome: two of the three were promoted (one corrected first), one pair stayed off-hub.

| # | Section | Public title | Type and destination | Underlying content | Status | Parent-facing purpose |
|---:|---|---|---|---|---|---|
| 1 | Core Spelling | **Advanced Multisyllabic Academic Words** | Direct Grade Unit: `grade-5-multisyllabic-academic-words` → `/spelling-lists/grade-level/5th-grade-multisyllabic-academic-words` | Existing page, reframed. | Implemented | Break longer academic words such as *investigation* and *responsibility* into syllables and word parts before moving into affixes and roots. |
| 2 | Core Spelling | **Advanced Prefixes and Suffixes** | Combined roadmap entry: `grade-5-prefix-suffix-words` (anchor) → `/spelling-lists/grade-level/5th-grade-prefix-suffix-words`, with `grade-5-spelling-rules` (Spelling Rules for Word Endings) as related practice | Existing anchor and sibling, both reframed. | Implemented | Combine prefixes such as inter-, trans-, and super- with suffixes such as -ive, -ible, and -ity, then extend into the -tion/-sion/-able/-ible/-ance/-ence spelling rules that complete the set. |
| 3 | Core Spelling | **Greek and Latin Word Parts** | Direct Grade Unit: `grade-5-greek-latin-word-parts` → `/spelling-lists/grade-level/5th-grade-greek-latin-word-parts` | Existing page, reframed. | Implemented | Use familiar Greek and Latin word parts such as photo, bio, geo, port, and struct inside longer Grade 5 academic vocabulary. |
| 4 | Core Spelling | **Commonly Confused Words** | Direct Grade Unit: `grade-5-commonly-confused-words` → `/spelling-lists/grade-level/5th-grade-commonly-confused-words` | Existing page, reframed. | Implemented | Choose the right spelling for words that sound alike or look similar, such as affect/effect, principal/principle, and advice/advise. |
| 5 | Core Spelling | **Spelling Changes in Related Words** | Direct Grade Unit: new page | New content. | Implemented | See how one base word's family — such as critic, critical, and criticism — keeps its spelling stable even as pronunciation shifts, the K–5 capstone. |

**Card order decision:** Advanced Multisyllabic Academic Words opens the sequence, then Advanced Prefixes and Suffixes, then Greek and Latin Word Parts, then Commonly Confused Words, closing with Spelling Changes in Related Words. Affixes are sequenced before Greek/Latin word parts for the same reason Grade 4 gives (Section 8): affixes attach to whole recognizable base words, a simpler task, while roots/word parts are more abstract. The closing-card decision was deliberately evaluated against an alternative — ending on Commonly Confused Words instead, since Grade 5 has no Grade 6 hub to preview — and rejected: Grade 3's and Grade 4's own last cards (Root Word Families; Derived Words and Word Meaning) establish that the terminal Core Spelling slot goes to the grade's most generative, novel morphological synthesis concept, with the accuracy/usage card sitting second-to-last as a polish step, not last. Commonly Confused Words is a recurring thread since Grade 3, not a novel Grade 5 idea, so it keeps its established second-to-last slot; Spelling Changes in Related Words is the direct continuation of Grade 4's closing Derived Words and Word Meaning card (Section 3's Grade 5 row calls this "related-word spellings **new**") and is also the stronger "prepares for middle school" claim, since content-area reading and writing reward generative use of word parts far more than closed-set homophone/confusable-word accuracy.

**Advanced Prefixes and Suffixes decision:** Grade 5 retains one combined hub card anchored on `grade-5-prefix-suffix-words`; `grade-5-spelling-rules` remains reachable through its exact pre-PR relationship and progression metadata. The sibling's stored `contentRole: skill` is legacy metadata, not canonical taxonomy membership. Its final role is unresolved and deferred to the Grade curriculum editorial phase; it is not added to the Skills Hub or Grade Hub by this decision.

**Advanced Multisyllabic Academic Words / Greek and Latin Word Parts / Commonly Confused Words decision:** all three reframe existing Grade 5 pages that predated hub registration, promoted to `contentRole: grade-unit` with no content changes. `grade-5-greek-latin-word-parts` keeps its existing `prerequisiteLists` reference to Grade 4's `tier-1-roots-and-patterns`/`tier-2-greek-latin-roots` rather than duplicating that root content under a Grade 5 tag — it is explicitly review-and-extend practice, consistent with `curriculum-bible.md`'s existing note that those Grade 4 pages "serve Grade 5 as prerequisites/review through relationship metadata rather than duplicate Grade 5 grade tags."

**Spelling Changes in Related Words decision:** this is the one wholly new Grade 5 Core Spelling page, and the direct sequel to Grade 4's Derived Words and Word Meaning. It uses base-word families not already used there (`nation`, `muscle`, `human`, `popular`, `origin`) — instead: `critic/critical/criticism`, `athlete/athletic/athleticism`, `magic/magician`, `music/musician`, `electric/electrician` — chosen because several of these families also demonstrate a sound change alongside the stress shift (the hard-c-to-/sh/ shift in `-ic` → `-ician`), one step past what Grade 4's card taught. The card closes the K–5 Core Spelling progression.

**Off-hub Grade 5 vocabulary:** `grade-5-list-01` (Everyday Words), `grade-5-academic-words`, `grade-5-reading-writing-words`, and `grade-5-opinion-argument-words` are not part of the Core Spelling hub — direct analogues of Grade 4's off-hub vocabulary (Section 8). `grade-5-academic-words`'s intentional word overlap with `challenge/academic-vocabulary` (documented in `curriculum-bible.md`) is unaffected by this implementation.

**Nothing remains deferred for Grade 5.** Additional Practice is no longer deferred — see Section 16.

## 16. Exact Grade 5 Additional Practice

Two cards, following an audit of five candidates against the same bounded-set, standard-anchored, non-duplicative bar every prior grade's Additional Practice candidates were held to (Sections 6–8).

| Card | Words | Anchor | Disposition |
|---|---|---|---|
| **Civics and Government Words** | citizen, law, amendment, justice, constitution, congress, election, representative, liberty, rights, independence, capital | A single coherent civic-life/government topic, the same shape as Money Words (Section 6) or Days of the Week — not "social studies" as a whole. | Implemented. Reframed from the pre-existing, never-audited `grade-5-community-civics-words` (retitled from "Social Studies & Civics Words," which read as a broader subject than the list actually covers). |
| **Money Management Words** | budget, income, expense, savings, interest, deposit, withdraw, credit, debit, borrow, balance, tax | Personal financial literacy — budgeting and banking specifically, not "money" broadly. Anchored the same way Money Words was anchored to CCSS 2.MD.C.8 and Measurement Words to CCSS 4.MD.A.1: Texas TEKS 5.10 (Personal Financial Literacy) names this exact closed vocabulary (income vs. expense, methods of payment, balancing a budget). | Implemented. New page — a genuine, non-duplicative extension of Grade 2's Money Words (that card teaches what money *is*, coin/dollar names; this teaches what you *do* with money). |

**Audit findings on the three pre-existing, unwired Grade 5 files:** `grade-5-science-nature-words` and `grade-5-math-vocabulary` were rejected as Additional Practice candidates. Both read as "one word per subject strand" grab-bags rather than a genuinely closed set — the identical defect that sank Grade 2's and Grade 4's generic "Math"/"Science" placeholders (Sections 6, 8) — so promoting them as written would have applied a looser standard to Grade 5 than every other grade was held to. They remain published as off-hub vocabulary (`GRADE_5_VOCABULARY_IDS`), the same disposition as Grade 5's other general vocabulary lists, not deleted.

The audit also caught real defects in the pre-existing civics content that had never been checked against the live word banks: `government` and `president` were already Grade 4 Common Words (Sets 1 and 3), and `responsibility` was already a Grade 5 Core Spelling word (Advanced Multisyllabic Academic Words) — all three replaced (`amendment`, `congress`, `liberty` respectively). During implementation, a fourth collision was found and fixed the same way: `democracy` was already a Grade 4 Core Spelling word (`tier-2-greek-latin-roots`, a Greek-root example), replaced with `justice`. This is exactly the kind of problem the "remain unwired pending research" holding pattern (Section 14) existed to catch.

**Geography, technology, health, and arts were evaluated as candidates for a possible third card and rejected.** Geography is explicitly blocklisted by name in Section 1's "Deferred optional content" rule. Technology and health are open, ever-growing domains with no closed standard-named subset the way coins or customary units have — the same failure mode as generic "Math"/"Science." Arts vocabulary lacks a comparably universal standard anchor and reads as thinner/more arbitrary than the other candidates. Grade 5 ships with exactly two Additional Practice cards, not three, on the merits of each candidate — not to hit a round number.

**Zero-overlap verification:** both new/corrected cards' 24 words were checked programmatically against every word in every published K–5 Common Words set and every K–5 Core Spelling (`contentRole: grade-unit`/`skill`) page — zero overlaps remain. This check is now a standing regression test (`gradeHubCards.test.ts`).

## 15. Exact Grade 5 Common Words (High-Frequency Words)

Four cumulative 12-word sets, 48 words total, zero overlap with the 292 words already owned by the twenty-nine Kindergarten, Grade 1, Grade 2, Grade 3, and Grade 4 Common Words sets (verified directly against every published set file's `words:` array, not from memory — 340 total K–5 words, all unique). Matches the frozen 4-set count (Section 1) and the 12-words-per-set convention every implemented grade but Kindergarten has used.

| Set | Theme | Words | Shared spelling problem |
|---|---|---|---|
| 1 | Words with a Silent or Hidden Letter | often, foreign, campaign, height, conscience, privilege, vehicle, schedule, honest, rhythm, acquire, vague | A silent or hidden letter survives the spelling after the sound drops out of speech — continues Grade 4's silent-letter set at the classic "hardest words in English" register (foreign, conscience, rhythm, acquire) rather than Grade 4's more domestic set. |
| 2 | Doubled Letters in Longer Academic Words | accommodate, occurrence, committee, millennium, appreciate, parallel, appointment, accidentally, excellent, arrangement, collaborate, appeal | A doubled letter that's easy to get backward or drop, in longer Tier 2 report-and-essay vocabulary rather than Grade 4's shorter, more domestic doubled-consonant words. |
| 3 | Words with an Unstressed Vowel in Everyday Academic Writing | temperature, experience, interesting, desperate, valuable, natural, literature, miserable, available, temporary, unfortunately, average | A schwa vowel or whole unstressed syllable that casual speech drops (*interesting* said as three syllables, not four), in longer, more narrative/opinion-register words than Grade 4's more clinical set. |
| 4 | Editing and Connecting Words for Longer Writing | consequently, particularly, specifically, essentially, ultimately, despite, punctuation, apostrophe, vocabulary, reference, quotation, thesaurus | Precise linking words for cause/contrast/emphasis, paired with editing and reference vocabulary — continuing Grade 3's precedent of "words about writing" (dictionary, paragraph, author, title) at a more advanced register, and directly embedding the "proofreading transfer, dictionary/reference skills, general editing routines" `CANONICAL_K5_GRADE_UNIT_CURRICULUM.md` says Grade 5 absorbs as a spiral strand rather than a separate Grade Unit. |

**Connector-word scarcity decision:** Grade 3's Set 5 and Grade 4's Set 4 already claimed nearly every common transition word in the language (finally, probably, actually, immediately, eventually, meanwhile, instead, otherwise, therefore, certainly, definitely, recently, however, furthermore, regardless, although, though, thorough, altogether, persuade, reason, sincerely). Rather than stretch to find twelve more near-synonyms — the same "redundant vocabulary" failure mode Grade 4's own Set 4 revision decision (Section 8) rejected — Set 4 pairs six genuinely new, higher-register connectors with six editing/reference words, giving the set a coherent identity beyond "more transition words."

**Rejected words and why:** `especially` was proposed during review and rejected outright — it is already a Grade 3 Common Words word (`grade-3-common-words-4`), a zero-overlap violation, not an editorial judgment call. `guard` was an earlier Set 1 candidate, replaced with `vague`: `guard`'s silent-u pattern (`gu-`) is already familiar from earlier, simpler sight words (guess, guest, guide), making it a weaker "narrow corrective" pick by Grade 5 than the rest of the set; `vague`'s silent-u-before-e pattern stays genuinely unpredictable well past elementary school and is a stronger Tier 2 fit for opinion/argument writing. `Wednesday` and `February` were both considered and dropped for Set 1 and Set 3 respectively — not because they overlap any Common Words set, but because Grade 1's and Grade 2's existing Additional Practice cards ("Days of the Week," "Months of the Year") almost certainly already own them, and a parent should not see the same word twice across the site.

Gateway: `grade-5-common-words` collection (`category: sight-words`, `grade: "5"`), same model as `grade-4-common-words`. Four `sight-word-set` entries, `relatedLists: []` (matching the Grade 2–4 convention — no Heart Words page to link). Set 1's `prerequisiteLists` closes the gap from `grade-4-common-words-4`, the same way `grade-3-common-words-5` → `grade-4-common-words-1` was closed; `grade-4-common-words-4.nextLists` was updated from `[]` to `["grade-5-common-words-1"]` to close that gap forward. `grade-5-common-words-4.nextLists: []` is the true end of the K–5 Common Words sequence.
