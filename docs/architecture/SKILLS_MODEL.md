# SpellingWords.app Skills Model

> **Superseded notice:** §7 (Canonical public Skill Families), §8 (Focused Skills), and §10 (Canonical K–5 taxonomy summary) are superseded by the frozen `docs/architecture/SKILLS_ARCHITECTURE.md`, which is the authoritative reference for the final 12-family, 41-skill taxonomy. The rest of this document — the Skill/Focused-Skill/Practice-Set model, the autonomy rule, and the editorial philosophy in §1–§6, §9, and §11–§20 — still governs.

## 1. Purpose and precedence

This document defines the canonical reusable Skills model for SpellingWords.app from Kindergarten through Grade 5. It is an editorial and product model, not an implementation plan. It should guide future Skill content, Grade Roadmap relationships, Skills browsing, internal linking, and later URL decisions.

This model is subordinate to the Architecture Constitution and the Content Model. If older documents, existing markdown files, current routes, current `skillTags`, or legacy gateway pages conflict with this model, the Constitution and Content Model govern first, and this document governs the reusable Skills interpretation.

The goal is to keep the public product simple:

1. Practice Your Own Words.
2. Learn by Grade.
3. Choose Specific Practice.

The Skills system supports the third journey: “I know what we need to practice.” It must not expose the full technical curriculum taxonomy. It should expose concepts that parents, teachers, and students naturally recognize, search for, assign, bookmark, or practice.

It does not create routes, redirects, schema decisions, frontmatter changes, gateway removals, or final page-count decisions.

## 2. Relationship to the Constitution and Content Model

The Constitution defines SpellingWords.app as a calm, practice-centered spelling website for children in Kindergarten through Grade 5. It also establishes that the product is not a content farm and that content identities exist to help users reach useful spelling practice.

The Content Model distinguishes several identities that must remain separate:

- **Grade Unit:** a grade-specific curriculum milestone.
- **Skill:** a reusable spelling concept or focused pattern.
- **Practice Set:** the actual word set loaded into practice.
- **Teaching Guide:** adult-facing explanatory content.
- **Sight Word Set:** a distinct high-frequency or irregular-word practice identity.
- **Collection:** an editorial grouping or named sequence.
- **Vocabulary or Theme List:** supplemental spelling practice organized by topic, subject, or enrichment purpose.

The Skills Model is the bridge between Grade Roadmaps and reusable targeted practice. It answers which concepts should become reusable Skills, which should remain narrower Practice Sets or filters, and how Skills can scale across grades without duplication.

A Skill is grade-neutral in identity even when it is introduced, reviewed, or extended in a particular grade. A Grade Unit may reference one or more Skills, but it must remain useful without requiring the user to visit a Skill page. Likewise, a Skill page must remain reusable without pretending to be a Grade Unit.

Existing content is evidence, not authority.

## 3. What a Skill is

A **Skill** is a reusable spelling concept, focused pattern, recognized word type, or named practice need that users can understand and practice independently of one Grade Roadmap.

A candidate concept is a strong Skill candidate when several of these are true:

- teachers or parents naturally assign it;
- students can practice it directly;
- it has a coherent word bank for useful practice;
- it supports review, remediation, or enrichment across grades;
- it can be explained in plain language;
- it has meaningful broader or narrower relationships;
- it can be understood without knowing one grade’s full sequence;
- it has direct-link, bookmark, assignment, or search value.

Examples of likely Skills include Short A, Consonant Digraphs, Beginning Blends, Silent E, AI and AY, R-Controlled Vowels, Prefixes, Word Endings and Suffixes, and Homophones.

A Skill may be broad or focused. Broad Skill Families organize recognizable areas of spelling practice. Focused Skills are reusable editorial concepts beneath those families. A canonical Focused Skill is not a guaranteed URL, markdown page, or navigation item; later autonomy and implementation review still decide whether it becomes a standalone experience.

## 4. What a Skill is not

A Skill is not automatically:

- a page;
- a URL;
- a markdown file;
- a route under `/spelling-lists/phonics/`;
- a value from existing `skillTags`;
- a grade-owned lesson;
- every narrow pattern under a broader concept;
- every word bank that can be generated;
- every keyword that could attract search traffic.

A candidate should not become a Skill merely because it appears in one curriculum lesson, has a technical label, has a small list of words, currently exists as content, or can be represented by a route.

This distinction is especially important for narrow patterns such as individual blends, individual roots, rare vowel teams, narrow final syllables, or technical syllable distinctions. These may be instructionally useful without becoming independent Skills.

## 5. Skill autonomy rule

A candidate independent Skill should normally demonstrate several of the following:

- recognizable user intent;
- direct assignment value;
- a coherent explanation distinct from its parent concept;
- enough useful words for meaningful practice;
- a clear distinction from sibling concepts;
- reuse across grades, review, intervention, or enrichment;
- bookmarking or direct-link utility;
- meaningful broader and narrower relationships.

A concept should remain a Practice Set, filter, subsection, tab, or internal metadata value when:

- only the word bank changes;
- the concept is too narrow for a user-facing destination;
- the explanation duplicates the parent Skill;
- user intent is weak;
- the corpus is limited;
- it exists mainly for curriculum sequencing;
- it would create thin pages or unnecessary navigation depth.

The autonomy rule is deliberately non-numeric. Editors should apply judgment rather than promote every available word bank.

## 6. Skill levels

The public model has three main layers.

### A. Canonical public Skill Families

Canonical public Skill Families are a compact set of broad concepts ordinary users can recognize and browse. They should be stable enough to support future navigation and internal linking, but they are not automatically final route labels.

Recommended canonical families:

1. Short Vowels and CVC Words
2. Consonant Digraphs
3. Consonant Blends
4. One-Syllable Spelling Patterns
5. Silent E
6. Vowel Teams
7. R-Controlled Vowels
8. Syllables and Multisyllabic Words
9. Word Endings and Suffixes
10. Prefixes
11. Greek and Latin Word Parts
12. Homophones and Commonly Confused Words

Sight Words and Irregular Words may appear as a discovery bridge, but sight-word systems remain parallel to ordinary Skills.

### B. Focused Skills

Focused Skills are directly assignable editorial concepts beneath Skill Families. They may deserve reusable experiences if they pass the autonomy rule, but even canonical Focused Skills are not automatically guaranteed URLs, markdown pages, or navigation items.

Examples include Short A, SH, Beginning Blends, Final CK, Long A Silent E, AI and AY, AR, Plurals and -s/-es, Dropping Silent E, UN and RE Prefixes, and Homophones.

### C. Practice Sets, filters, subsections, and internal distinctions

Practice Sets and filters support targeted practice without forcing every subpattern into public navigation. Examples include individual blends such as BL or BR, grouped L/R/S blends, individual roots, narrow suffix groups, rare vowel teams, and technical distinctions used mainly for sequencing.

Internal metadata can preserve curriculum precision without public taxonomy sprawl.

## 7. Canonical public Skill Families

### Short Vowels and CVC Words

This is the preferred public family for short-vowel closed-syllable spelling. Short Vowels and CVC Words should not be exposed as two equal broad families because their public user intent overlaps heavily.

Focused Skills:

- Short A
- Short E
- Short I
- Short O
- Short U

CVC may appear as a technical alternate label, related search term, explanatory subsection, or internal curriculum metadata. A separate CVC destination should exist only if it serves meaningfully different user intent, such as mixed CVC review across all five vowels.

### Consonant Digraphs

This family covers two letters that work together to spell one consonant sound.

Canonical focused Skills:

- SH
- CH
- TH
- WH

PH and NG may be added later only if the autonomy rule supports them. TH may include voiced/unvoiced explanation, but that distinction should usually remain instructional explanation rather than separate Skill identity.

### Consonant Blends

This family covers adjacent consonants where both sounds are heard.

Canonical focused Skills:

- Beginning Blends
- Ending Blends

Individual blends such as BL, BR, CL, ND, NK, and MP should normally remain Practice Sets, filters, tabs, or subsections. L-Blends, R-Blends, and S-Blends may be useful grouped Practice Sets but are not automatically canonical Skills.

### One-Syllable Spelling Patterns

This family organizes common spelling conventions beyond basic short vowels, blends, and digraphs. It is an editorial taxonomy label, not necessarily the future public navigation label; parents may ultimately recognize individual concepts such as CK, TCH, FLOSS, or Hard and Soft C/G more readily than the umbrella phrase.

Likely focused Skills:

- Final CK
- FLOSS / Double Final Consonants
- TCH and DGE
- C/K/CK Choices
- Silent Letters

Hard and Soft C/G may be a future focused Skill or Teaching Guide topic, pending autonomy review and content depth.

### Silent E

Silent E is a canonical broad Skill Family because it is widely recognized by parents, teachers, and students and supports many assignable practice sets.

Likely focused Skills or strong Practice Sets:

- Long A Silent E
- Long I Silent E
- Long O Silent E
- Long U Silent E

Long E Silent E should require autonomy review. Silent E also relates to Dropping Silent E under suffix spelling changes.

### Vowel Teams

Vowel Teams is a canonical public family for two-letter vowel spellings and related long-vowel patterns.

Strong likely focused Skills:

- AI and AY
- EE and EA
- OA and OW

Provisional focused Skills requiring autonomy review:

- OI and OY
- OU and OW
- less common vowel teams

Diphthongs may remain a subfamily beneath Vowel Teams, a focused grouping, or a Teaching Guide term. The simplest public model should preserve accuracy without forcing users into technical categories.

### R-Controlled Vowels

This family covers vowel spellings changed by following r.

Likely focused Skills:

- AR
- OR
- ER / IR / UR

The ER/IR/UR grouping is practical because the sounds and spelling choices are often taught together and individual pages for each may be thin.

### Syllables and Multisyllabic Words

This family supports longer-word spelling without exposing every syllable-analysis term as public navigation.

Likely focused or provisional Skills:

- Multisyllabic Words
- Open Syllables
- Y as a Vowel
- Consonant-LE, pending content depth

Syllable Types, Syllable Division, Schwa, and Accented/Unaccented Syllables are important, but they may work better as Teaching Guide topics or internal metadata unless a clear practice experience exists.

### Word Endings and Suffixes

This is the preferred simplified public grouping for early morphology involving endings and suffixes. Internally, editors should preserve distinctions among inflectional endings, derivational suffixes, and suffix spelling changes, but public navigation does not need three equal families.

Likely focused areas:

- Plurals and -s/-es
- -ed and -ing
- Comparatives -er/-est
- Common Suffixes
- Suffix Spelling Changes
  - Doubling Final Consonants
  - Dropping Silent E
  - Changing Y to I

This grouping can serve Grade 1 inflectional endings, Grade 2 plural/comparative/suffix work, and Grade 3 suffix spelling changes without duplicating concepts across grades.

### Prefixes

Prefixes are a canonical public family because they are recognizable, assignable, and recur across Grades 2–5.

Likely focused Skills:

- UN and RE Prefixes
- Common Prefixes
- Advanced Prefixes, if needed for upper elementary

Individual prefixes can remain Practice Sets or subsections unless they have strong user intent and enough explanation.

### Greek and Latin Word Parts

This family covers upper-elementary roots, combining forms, and meaning-based word-part spelling.

Likely focused Skills:

- Greek and Latin Roots
- Common Word Parts

Individual roots should usually remain Practice Sets, filters, or examples. A root should become an independent Skill only if it has unusually strong instructional and practice value.

### Homophones and Commonly Confused Words

This family covers meaning-based spelling choices where words may sound alike or be easily confused in writing.

Canonical public concepts:

- Homophones
- Commonly Confused Words

Specific sets such as there/their/they’re or to/too/two are provisional focused Skills or Practice Sets. They should receive independent identity only when they show strong assignment value, explanatory depth, enough practice value, and clear user intent.

## 8. Focused Skills

Canonical focused Skills are reusable editorial concepts that are strong enough to support assignment, linking, and curriculum relationships. They are not automatic standalone pages, URLs, markdown files, or navigation items; those decisions still require later autonomy and implementation review.

Recommended canonical focused Skills:

- Short A
- Short E
- Short I
- Short O
- Short U
- SH
- CH
- TH
- WH
- Beginning Blends
- Ending Blends
- Final CK
- FLOSS / Double Final Consonants
- TCH and DGE
- C/K/CK Choices
- Silent Letters
- Long A Silent E
- Long I Silent E
- Long O Silent E
- Long U Silent E
- AI and AY
- EE and EA
- OA and OW
- AR
- OR
- ER / IR / UR
- Open Syllables
- Multisyllabic Words
- Compound Words
- Plurals and -s/-es
- Contractions
- -ed and -ing
- Comparatives -er/-est
- Common Suffixes
- Doubling Final Consonants
- Dropping Silent E
- Changing Y to I
- UN and RE Prefixes
- Common Prefixes
- Greek and Latin Roots
- Homophones
- Commonly Confused Words

Compound Words and Contractions are treated as focused Skills because they are recognizable, assignable word-formation concepts with direct practice value. They are not broad families in this model; they sit inside the wider word-study layer and can connect to Word Endings and Suffixes, vocabulary practice, or Teaching Guides as needed.

Provisional focused Skills requiring autonomy review include:

- Sounds and Letters as a public destination
- PH
- NG as a digraph-like destination
- L-Blends, R-Blends, S-Blends
- Long E Silent E
- OI and OY
- OU and OW
- Diphthongs
- Y as a Vowel
- Consonant-LE
- Syllable Types
- Schwa
- Possessives
- Advanced Prefixes
- Advanced Suffixes
- individual high-value homophone sets such as there/their/they’re and to/too/two

## 9. Practice Sets, filters, and internal distinctions

The Skills Model should protect the site from unnecessary micro-pages. Narrow concepts may still be valuable as Practice Sets, filters, tabs, examples, metadata, or sections within broader pages.

Concepts normally demoted to Practice Sets or filters:

- individual beginning blends: BL, BR, CL, CR, DR, FL, FR, GL, GR, PL, PR, SL, SM, SN, SP, ST, SW, TR;
- individual ending blends: ND, NG, LD, ST, NT, NK, LT, LK, MP, FT, SK;
- grouped L/R/S blends unless autonomy review supports promotion;
- individual roots;
- narrow final syllables;
- low-frequency vowel teams;
- voiced vs. unvoiced TH;
- one tiny suffix group with limited words;
- technical sequencing distinctions not visible to ordinary users.

Internal metadata may continue to track concepts such as CVC, closed syllables, syllable type, phoneme-grapheme correspondence, word complexity, source type, grade relationship, prerequisite sequence, or curriculum strand.

## 10. Canonical K–5 taxonomy summary

| Concept | Level | Public status | Likely child concepts | Typical grade relationship | Notes |
|---|---|---|---|---|---|
| Sounds and Letters | Kindergarten foundation / Teaching Guide | Provisional / future capability | letter sounds, beginning sounds | introduced K, practiced K–1 | Current Practice Engine is built around spelling whole words, not isolated phoneme-manipulation or letter-formation tasks, so this should be treated cautiously as a future capability. |
| Short Vowels and CVC Words | Broad Skill Family | Canonical Broad Skill Family | Short A/E/I/O/U | introduced K–1, practiced K–2, reviewed as needed | Preferred public family; CVC may be alternate label or metadata. |
| Short A/E/I/O/U | Focused Skills | Canonical Focused Skills | individual vowel practice | introduced K–1, practiced/reviewed later | Short A is the reference pattern. |
| Consonant Digraphs | Broad Skill Family | Canonical Broad Skill Family | SH, CH, TH, WH | introduced K–1, practiced 1–2 | PH/NG require later review. |
| SH/CH/TH/WH | Focused Skills | Canonical Focused Skills | focused digraph practice | introduced K–1, practiced/reviewed later | Voiced/unvoiced TH stays explanatory. |
| Consonant Blends | Broad Skill Family | Canonical Broad Skill Family | Beginning Blends, Ending Blends | introduced 1, practiced 1–2 | Individual blends are usually filters. |
| Beginning / Ending Blends | Focused Skills | Canonical Focused Skills | L/R/S groups, final blend groups | introduced 1, practiced/reviewed later | L/R/S groups are likely Practice Sets. |
| Individual blends | Practice Sets | Practice Set / Filter | BL, BR, ND, NK, MP, etc. | practiced as needed | Not canonical Skills by default. |
| One-Syllable Spelling Patterns | Broad Skill Family | Canonical Broad Skill Family | CK, FLOSS, TCH/DGE, C/K/CK | introduced K–2, practiced 1–3 | Broad destination must teach the pattern and route to real practice, not only list links. |
| Silent E | Broad Skill Family | Canonical Broad Skill Family | Long A/I/O/U Silent E | introduced 1, practiced 1–3 | Also relates to Dropping Silent E. |
| Long A/I/O/U Silent E | Focused Skills | Canonical Focused Skills | vowel-specific VCe sets | introduced/practiced 1–2 | Long E Silent E requires autonomy review. |
| Vowel Teams | Broad Skill Family | Canonical Broad Skill Family | AI/AY, EE/EA, OA/OW, others | introduced 1–2, practiced 2–3 | Diphthongs may nest here. |
| AI/AY, EE/EA, OA/OW | Focused Skills | Canonical Focused Skills | long-vowel team practice | introduced/practiced 1–2 | Strong user and assignment value. |
| OI/OY, OU/OW | Focused or filter | Provisional Focused Skill | diphthong practice | introduced/practiced 2–3 | Current pages are evidence, not proof of autonomy. |
| R-Controlled Vowels | Broad Skill Family | Canonical Broad Skill Family | AR, OR, ER/IR/UR | introduced 1–2, practiced 2–3 | Recognizable public concept. |
| AR, OR, ER/IR/UR | Focused Skills | Canonical Focused Skills | focused r-controlled practice | practiced 2–3, reviewed as needed | ER/IR/UR remain grouped for simplicity. |
| Syllables and Multisyllabic Words | Broad Skill Family | Canonical Broad Skill Family | open syllables, multisyllabic words | introduced 2–3, extended 3–5 | Technical syllable terms may be guides/internal. |
| Word Endings and Suffixes | Broad Skill Family | Canonical Broad Skill Family | plurals, -ed/-ing, suffix changes | introduced 1–2, extended 3–5 | Public simplification of morphology. |
| Suffix Spelling Changes | Focused grouping | Canonical Focused Skill / subfamily | doubling, dropping e, y to i | introduced 3, extended 4–5 | Can organize focused rules. |
| Prefixes | Broad Skill Family | Canonical Broad Skill Family | UN/RE, common prefixes | introduced 2, extended 3–5 | Individual prefixes usually subsections. |
| Greek and Latin Word Parts | Broad Skill Family | Canonical Broad Skill Family | roots, word parts | introduced 4, extended 5 | Individual roots usually Practice Sets. |
| Homophones and Commonly Confused Words | Broad Skill Family | Canonical Broad Skill Family | homophones, confused sets | introduced 2–3, extended 4–5 | Specific sets are provisional. |
| Sight Words and Irregular Words | Parallel system | Parallel Sight Word System | Dolch, Fry, Heart Words | introduced K, practiced K–3 | Discovery bridge only; Dolch/Fry levels are not Skills. |
| Vocabulary and Theme Lists | Other content identity | Not Recommended as Skills | animals, weather, science words | supplemental | Discoverable elsewhere, not part of Skills taxonomy. |

## 11. Grade relationships

Skills are reusable across grades. Grades provide developmental framing, word complexity, and sequencing.

Use broad relationship terms only:

- **introduced** — a grade commonly begins the concept;
- **practiced** — a grade commonly uses the concept for fluency;
- **extended** — a grade applies the concept to longer or more complex words;
- **reviewed as needed** — the concept supports intervention, remediation, or spiral review.

This model does not define a universal U.S. mastery sequence. No single national scope and sequence exists, and programs differ in terminology and order. The model reflects broad developmental consensus while preserving editorial flexibility.

Examples:

- Short Vowels and CVC Words may be introduced in Kindergarten or Grade 1, practiced in early grades, and reviewed later for intervention.
- Silent E may be introduced in Grade 1, practiced in Grade 2, and revisited in Grade 3 when students learn Dropping Silent E before suffixes.
- Prefixes may begin with UN and RE in Grade 2, expand in Grade 3, and extend into advanced prefixes in Grades 4–5.
- Greek and Latin Word Parts are usually upper-elementary concepts, but individual words may appear earlier as vocabulary.

## 12. Grade Unit ↔ Skill model

A Grade Unit represents one grade-specific milestone. It should provide immediate practice, a clear explanation, and grade-appropriate word selection. A Skill represents reusable practice independent of a grade.

Grade Units should reference Skills in a limited and helpful way:

- one primary Skill Family where appropriate;
- one or more focused Skills when useful;
- optional Practice Sets for narrower review;
- optional Teaching Guides for adult explanation.

Grade Units should not become gateways whose main job is to send users elsewhere. The normal journey should remain Grade Roadmap → Grade Unit → Practice. Skill links are secondary support.

Skills should not pretend to be Grade Units. A Short A Skill may serve Kindergarten introduction, Grade 1 review, and later intervention without changing identity.

## 13. Sight Words and irregular-word systems

Sight Words remain parallel to the ordinary Skills taxonomy.

The site may use **Sight Words and Irregular Words** as a discovery bridge, but it must preserve these distinctions:

- **Sight Word Set:** a distinct content identity for high-frequency or irregular-word practice.
- **Dolch and Fry:** named collections/systems, not ordinary Skills.
- **Heart Words:** an instructional frame for attending to irregular or temporarily irregular parts of words, not one universal list.
- **High-frequency:** a statement about how often words appear in print.
- **Irregular:** a statement about spelling predictability.

These concepts overlap but are not synonyms. Dolch Primer, Dolch First Grade, Fry levels, and Heart Word sets should not be represented as Skills. They may be reached through grade roadmaps, collections, search, contextual links, or a sight-word browsing experience.

## 14. Vocabulary/theme exclusion

Vocabulary and Theme Lists are not Skills.

Animal Words, Weather Words, Action Words, Science Words, Math Vocabulary, Academic Vocabulary, and similar topic-based lists may be useful spelling practice, but they do not define reusable spelling-skill identity. They should not be included merely to make the Skills taxonomy feel complete.

Vocabulary/theme lists may support enrichment, subject vocabulary, writing vocabulary, or grade-level practice. They should remain discoverable through appropriate list browsing, grade context, collections, or future vocabulary systems rather than the core Skills taxonomy.

## 15. Teaching Guide relationships

Teaching Guides explain concepts for adults and older learners. They may overlap with Skills but are separate content identities.

Good Teaching Guide topics include:

- What are short vowels and CVC words?
- What are consonant digraphs?
- What are consonant blends?
- What is the FLOSS rule?
- What is silent e?
- What are vowel teams?
- What are r-controlled vowels?
- What are syllable types?
- How do suffix spelling changes work?
- What are prefixes and suffixes?
- What are Greek and Latin roots?
- What are heart words?
- How should students practice homophones?

A Skill page is concept-first: its job is to teach the pattern clearly, demonstrate it, and route the user to the Grade Unit(s) where it is actually practiced — it does not launch a practice session of its own. A Teaching Guide can carry deeper explanation, terminology, parent guidance, and curriculum context beyond what a Skill's own concise explanation covers.

## 16. Gateway-page principles

Current gateway pages are transitional implementation artifacts. They exist because older content did not have a stable Skill Family model.

Future outcomes for a gateway page may include:

- becoming a broad Skill Family destination;
- becoming a legitimate browse or index page;
- becoming or remaining a Grade Unit support page;
- being demoted or merged later;
- remaining temporarily for compatibility.

This document does not prescribe deletion.

A broad Skill destination must provide immediate value: clear explanation, useful practice access, sensible child concepts, and helpful links. It must not merely list links.

Gateway pages should not multiply. A gateway page that only lists links without meaningful instructional or navigational value should not survive indefinitely. New broad pages should be created only when they clarify user choice and reduce complexity.

## 17. Conceptual URL and discoverability implications

Later URL design should follow stable content identity.

Conceptual principles:

- Broad Skill Families may later receive canonical destinations.
- Focused Skills may receive destinations only when they pass the autonomy rule.
- Practice Sets do not automatically receive URLs.
- Grade Units remain conceptually grade-specific.
- Skills remain conceptually grade-neutral.
- Sight Word Sets and Collections follow sight-word identity, not ordinary Skill identity.
- Current `/spelling-lists/phonics/` locations are legacy route choices, not content identity.

This document intentionally does not provide exact route trees, migration maps, or redirect plans.

Discoverability should support assignment, remediation, direct skill search, and topical relationships without creating thin pages solely for keywords.

## 18. Migration philosophy

Recommended staged sequence after this document is approved:

1. Approve `SKILLS_MODEL.md`.
2. Finalize Short Vowels and CVC Words as the first complete Skill Family.
3. Classify existing short-vowel gateway and focused pages against this model.
4. Migrate Short E, Short I, Short O, and Short U using the Short A reference pattern.
5. Build a minimal Skills browsing experience.
6. Revisit Grade 1 with stable Grade Unit ↔ Skill relationships.
7. Migrate additional Skill Families incrementally.
8. Revisit URLs only after identities are stable.

This sequencing philosophy prevents one-off Skill pages, route churn, and premature navigation decisions.

## 19. Intentionally undecided details

This model does not freeze:

- final public URLs;
- route hierarchy;
- redirect strategy;
- exact page count;
- which provisional focused Skills receive pages;
- tabs vs. filters vs. pages;
- exact navigation labels;
- exact Astro collections;
- exact frontmatter field names beyond approved content identities;
- final visual design;
- SEO schema;
- progress systems;
- account systems;
- whether every broad Skill Family appears in top-level navigation.

These decisions should be made after identities are stable and after one or more Skill Families prove the model in practice.

## 20. Concrete examples

### Kindergarten Short A Grade Unit

Kindergarten Short A Grade Unit → Short A Skill → Short Vowels and CVC Words family.

The Grade Unit should use Kindergarten-appropriate words, explanation, and sequence placement. The Short A Skill can remain reusable for Grade 1 review, intervention, or direct assignment.

### Grade 1 CVC Review

Grade 1 CVC Review → Short Vowels and CVC Words → Short A/E/I/O/U where useful.

CVC should work as alternate terminology, explanation, and metadata unless a mixed CVC destination serves distinct user intent beyond short-vowel family practice.

### Grade 1 Consonant Digraphs

Grade 1 Consonant Digraphs → Consonant Digraphs → SH, CH, TH, WH.

The Grade Unit may introduce several digraphs together. Focused Skills allow a teacher or parent to assign one digraph for review.

### Beginning Blends

Grade 1 Beginning Consonant Blends → Consonant Blends → Beginning Blends → optional L/R/S grouped Practice Sets.

Individual blend pages such as BL or BR are usually too narrow for independent Skill identity. They may remain useful as filters, tabs, or Practice Sets.

### Ending Blends

Grade 1 Ending Consonant Blends → Consonant Blends → Ending Blends → optional final-blend Practice Sets.

ND, NK, MP, and similar endings should not automatically become canonical Skills merely because word lists exist.

### Silent E

Grade 1 Silent E → Silent E → Long A/I/O/U Silent E.

The broad Skill should explain the pattern, demonstrate it, route to where it's practiced, and connect later to Dropping Silent E.

### Vowel Teams

Grade 1 or Grade 2 Vowel Teams → Vowel Teams → AI/AY, EE/EA, OA/OW; provisional OI/OY and OU/OW.

Diphthongs can be explained beneath Vowel Teams or handled through a guide. A current page is evidence but not automatic proof of independent Skill identity.

### R-Controlled Vowels

R-Controlled Vowels → AR, OR, ER/IR/UR.

Grouping ER/IR/UR prevents unnecessary depth while reflecting common instruction.

### Grade 3 Dropping Silent E

Grade 3 Dropping Silent E Grade Unit → Word Endings and Suffixes → Suffix Spelling Changes → Dropping Silent E → related Silent E Skill.

The Grade Unit teaches the grade-specific spelling change; Silent E remains the reusable base pattern.

### Prefixes across Grades 2–5

Grade 2 UN and RE → Prefixes → UN and RE Prefixes.

Grades 3–5 can extend the same family with more prefixes and more complex words. Individual prefixes usually remain subsections or Practice Sets.

### Greek and Latin Roots in upper elementary

Grade 4/5 Roots Grade Unit → Greek and Latin Word Parts → Greek and Latin Roots → narrower root Practice Sets.

Individual roots should not become pages by default. They can be practiced in sets organized by frequency, utility, or curriculum purpose.

### Sight Words, Dolch, and Heart Words

Kindergarten Heart Words or Dolch Pre-Primer → Sight Word Set or Collection → Sight Words and Irregular Words discovery bridge.

Dolch tiers and Heart Word sets are not Skills. Heart Words are an instructional framing; Dolch and Fry are named systems.

### Homophones and commonly confused sets

Grade 2 Homophones → Homophones and Commonly Confused Words → Homophones.

Specific groups such as there/their/they’re or to/too/two may become focused Skills or Practice Sets if they show strong assignment value, explanation depth, and practice usefulness. They are not guaranteed standalone pages.
