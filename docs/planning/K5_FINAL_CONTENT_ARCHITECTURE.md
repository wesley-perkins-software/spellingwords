# Authoritative K–5 Content Architecture

> **Status: authoritative, frozen at the architecture level.** This document is the single implementation reference for K–5 grade hubs and their curriculum-facing content. Kindergarten, Grade 1, and Grade 2 are implementation-complete; Grades 3–5 remain governed by this specification for future implementation. It replaces the broad architecture recommendations in [K5_FINAL_CONTENT_PLAN.md](./K5_FINAL_CONTENT_PLAN.md), [K5_SIMPLE_WEBSITE_CONTENT_PLAN.md](./K5_SIMPLE_WEBSITE_CONTENT_PLAN.md), and [CANONICAL_CURRICULUM_IMPLEMENTATION_PLAN.md](./CANONICAL_CURRICULUM_IMPLEMENTATION_PLAN.md). Historical research remains useful evidence; it is not an implementation specification.

### Implementation status

| Grade | Status | Current public realization |
|---|---|---|
| Kindergarten | Implementation-complete | Eight Core Spelling cards, four direct High-Frequency Words sets (40 words), and three Additional Practice cards. |
| Grade 1 | Implementation-complete | Twelve Core Spelling cards, six direct High-Frequency Words sets (72 unique words), and three Additional Practice cards. |
| Grade 2 | Implementation-complete | Ten Core Spelling cards, six direct High-Frequency Words sets (72 unique words), and three Additional Practice cards. |
| Grades 3–5 | Planned | Implement according to the frozen map and durable rules below, with later editorial curation where explicitly noted. |

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

The following are deliberately **not** architecture decisions: exact word membership for the still-unimplemented Grade 3–5 sets, the detailed K/Grade 1/Grade 2 card descriptions, which later topic pages meet quality thresholds, the exact Grade 4–5 root families, and the individual visual treatment of an annotation. They require editorial curation or implementation work, but may not change the three sections, URL/identity rule, or Common Words set counts without an explicit new architecture decision.

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
| 3 | Longer words/syllable division; Prefixes; Suffixes; merged base-word changes; Homophones/confusions; review. | 5 sets + gateway. | Math; Earth/Weather; Maps/Communities; Writing Transitions after audit. |
| 4 | Multisyllabic spelling/unstressed vowels; prefixes/derived words; suffixes/stable endings; Latin roots; Greek roots; confusions. | 4 sets + gateway. | Math; Science; Social Studies; opinion/explanation writing after audit. |
| 5 | Advanced multisyllabic spelling; academic prefixes; academic suffixes plus `-tion/-sion/-cian`; Greek/Latin word parts; related-word spellings **new**; confusions; editing. | 4 sets + gateway. | Math; Science; U.S. History/Civics; research/transition writing after audit. |

### Publishing estimate

The prior 180-page recommendation is not a target. Reuse existing canonical practice URLs and add only coherent pages: 29 Common Words sets, 6 Common Words gateways, a small number of genuine instructional gaps per remaining grade, and later optional topic pages that clear editorial review. Kindergarten, Grade 1, and Grade 2 now provide 16 published sets and 3 gateways. Grades 3–5 Common Words pages remain future implementation work.

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

## 7. Common Words content model and Heart Word treatment

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

## 8. Implemented Kindergarten, Grade 1, and Grade 2 Common Words content

### Gateways

| Title | Stable ID | Route | Members | Parent-facing introductory copy |
|---|---|---|---|---|
| Kindergarten Common Words | `kindergarten-common-words` | `/spelling-lists/collections/kindergarten-common-words` | `kindergarten-common-words-1` through `-4`; 40 words total | “These four small sets help kindergarteners spell everyday words used in early reading and writing. Most words can be connected to sounds your child knows; when one small part does not match yet, the page points it out as a Heart Word part.” |
| Grade 1 Common Words | `grade-1-common-words` | `/spelling-lists/collections/grade-1-common-words` | `grade-1-common-words-1` through `-6`; 72 unique words total | “These six cumulative sets build useful Grade 1 writing words without treating them as a list to memorize blindly. Children use familiar phonics when possible and learn only the unexpected spelling parts by heart.” |
| Grade 2 Common Words | `grade-2-common-words` | `/spelling-lists/collections/grade-2-common-words` | `grade-2-common-words-1` through `-6`; 72 unique words total | “These six sets carry a second grader through the last heavy year of common-word learning. Most of these words can now be sounded out with the patterns your child already knows — vowel teams, syllables, and silent letters. Where one small part is still unexpected, the page names it so your child learns only that part by heart.” |

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

All six sets are published, contain 12 words each, and form a live adjacent sequence (set 1's prerequisite is `grade-1-common-words-6`; set 6 has no next set, pending a Grade 3 gateway). Word membership is unique across the sequence and has zero overlap with the 112 words owned by the ten Kindergarten and Grade 1 sets. `relatedLists` is `[]` on every set — unlike the numbered sets above, Grade 2 has no Heart Words page to point at, and inventing one would duplicate an existing page family, so the sequence relationship lives entirely in `prerequisiteLists`/`nextLists`.

| Set | Ordered words | Classification (`R` regular, `T` temporarily irregular, `P` permanently irregular portion) | Editorial focus |
|---|---|---|---|
| `grade-2-common-words-1` | always, around, before, another, between, under, until, almost, together, enough, without, through | always T (`al`); around R; before R; another P (`o`); between R; under R; until R; almost T (`al`); together P (first syllable); enough P (`ough`); without R; through P (`ough`). | The connective glue of Grade 2 sentences. Groups the two `ough` words (*enough*, *through*) so the pattern is taught once. |
| `grade-2-common-words-2` | been, does, goes, gave, made, found, told, began, took, came, went, done | been P (`ee`→short i); does P (`oes`); goes T (`oes`); gave R; made R; found R; told T (`old` family); began R; took R; came R; went R; done P (`o`). | Past-tense and irregular verbs. Pairs *does*/*goes* so the shared `-oes` spelling is contrasted, not confused. |
| `grade-2-common-words-3` | school, book, page, word, letter, sentence, story, question, answer, learn, study, never | school P (`ch`→/k/); book R; page R; word P (`or`→/er/); letter R; sentence R; story R; question P (`ti`→/sh/); answer P (silent `w`); learn T (`ear`→/er/); study R; never R. | The vocabulary of classroom instructions and writing prompts. |
| `grade-2-common-words-4` | friend, family, father, mother, sister, brother, children, everyone, someone, something, young, kind | friend P (`ie`); family R; father T (`a`→ah); mother P (`o`); sister R; brother P (`o`); children R; everyone T (compound); someone P (`o`); something R; young P (`ou`); kind T (`ind` family). | Groups *mother*/*brother*/*young* so /ʌ/-spelled-`o`/`ou` is one family, not three oddities. |
| `grade-2-common-words-5` | best, both, different, important, great, large, small, high, light, cold, fast, right | best R; both T (long o, no marker); different R; important R; great P (`ea`→long a); large R; small T (`all`); high P (`igh`); light P (`igh`); cold T (`old` family); fast R; right P (`igh`). | Groups the three `igh` words (*high*, *light*, *right*) — that pattern gets no Core Spelling card, so it is taught here. |
| `grade-2-common-words-6` | which, these, those, its, own, off, only, other, use, work, thought, read | which R; these R; those R; its R; own T (`ow`→long o); off R; only R; other P (`o`); use R; work P (`or`→/er/); thought P (`ough`); read (heteronym — no fixed classification). | Mirrors Grade 1 set 6's job one year on. Pairs *its* against the Contractions Core Spelling card. |

The gateway's introductory copy and each set's body copy are quoted in full in the content entries; this table freezes architecture, sequence, and word membership.

## 9. Completed K–2 implementation and future-grade contract

### Completed implementation

Kindergarten, Grade 1, and Grade 2 now realize the three-section architecture on their public hubs. All three Common Words gateways and all sixteen K–2 child sets are published. Kindergarten exposes four sets and 40 words; Grade 1 and Grade 2 each expose six sets and 72 unique words. The public hubs link directly to their set cards while their collection gateways remain canonical explanatory landing pages.

The completed implementation preserves existing flat canonical routes, stable IDs, parent/adjacent links, server-rendered gateway orientation, and visible-content-aligned breadcrumb and `ItemList` structured data. Focused Skills and compatibility pages retain their routes without becoming duplicate canonical curriculum pages. Grade 2's implementation additionally required no schema change — it reused `contentRole: grade-unit`, `skillIds`, `prerequisiteLists`/`nextLists`, and the existing `spelling-collections` gateway model exactly as documented above.

### Contract for Grades 3–5

Future grade implementations must follow the frozen decisions in Sections 1–3:

- Use the three public sections in order: Core Spelling, High-Frequency Words, and Additional Practice.
- Reuse stable canonical practice URLs and add only genuine curricular gaps or approved bounded vocabulary topics.
- Publish one Common Words gateway per grade and the set counts frozen in Section 1.
- Curate exact word membership before publishing; do not expose planned-but-unpublished children in visible links or structured data.
- Use existing schema fields, adjacent-set relationships, and optional Heart Word hints; do not create duplicate route families or a parallel Heart Word taxonomy.
- Keep breadcrumbs, `ItemList` data, and internal links aligned with visible published content.
- Preserve focused Skills as reusable practice reached from Grade Units, browse surfaces, search, and related links.

## 10. SEO, internal linking, and documentation governance

### Durable SEO/AEO/GEO principles

- Teach a specific spelling concept or provide a bounded, useful collection; do not publish generic keyword buckets.
- Use natural familiar terms (“sight words,” “Heart Words,” “high-frequency words”) in explanatory copy and metadata while retaining the one Common Words architecture.
- Every gateway needs substantive server-rendered orientation text, unique purpose, and a complete crawlable child list.
- Each practice page needs one canonical URL, a clear answer-oriented introduction, grade/skill context, and a limited set of relevant internal links.
- Structured data must describe visible content, not planned-but-unpublished pages.

### Documentation governance

This document supersedes only prior **planning documents** whose purpose was to choose a K–5 architecture. Retain technical and evidence documents that describe the current schema, routes, audits, curriculum research, source policies, or historical rationale. When implementation changes a technical contract, update that technical document separately; do not use this architecture plan as a substitute for code-level documentation.

## 11. Implementation order for remaining grades

1. ~~Implement Grade 2 Common Words and its two genuine instructional gaps.~~ **Done.** Grade 2 shipped with its Common Words system and five genuine instructional gaps, not two — see the Core Spelling gap count decision (D3) in Section 6.
2. Normalize Grade 3’s suffix-change and syllable-division route.
3. Reframe Grades 4–5 morphology and multisyllabic material, and curate their narrower Common Words sequences.
4. Add optional topic cards only after each grade’s core route and Common Words system are complete and the topics clear editorial review.
5. Keep Kindergarten, Grade 1, and Grade 2 synchronized with implementation when maintenance changes their technical contracts; do not reopen their frozen architecture without an explicit architecture decision.
