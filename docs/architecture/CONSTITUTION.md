# SpellingWords.app Architecture Constitution

## 1. Purpose and Precedence

This constitution is the first source of truth for product, curriculum, information-architecture, and content-identity decisions on SpellingWords.app.

It is written for developers, designers, curriculum writers, content editors, and future AI coding agents. Read it before changing page types, navigation, curriculum structure, spelling-list identity, or the relationship between grades, skills, and practice.

This document defines what must remain true. It does not prescribe exact routes, schemas, components, or migration plans. Those belong in later technical documents.

When older documentation conflicts with this constitution, this constitution governs unless it is explicitly amended.

## 2. Product Definition

SpellingWords.app is a calm, focused spelling-practice website for children in Kindergarten through Grade 5.

Its central promise is simple:

> SpellingWords.app helps children practice spelling with their own words, by following their grade, or by practicing a specific spelling skill.

The product should feel simple, trustworthy, immediate, child-friendly, useful to parents and teachers, and academically responsible without feeling academic or overwhelming.

SpellingWords.app is not:

- a learning-management system;
- a school administration platform;
- a gradebook;
- a broad vocabulary encyclopedia;
- a gamified educational app;
- a clone of UFLI, Fundations, CKLA, or another commercial curriculum;
- a content farm containing every technically possible word-list page.

The practice experience is the center of the product. List Detail pages, Grade Units, Skill pages, sight-word sets, vocabulary lists, guides, and custom-word flows are ways of reaching or supplying useful spelling practice. They are not ends in themselves.

## 3. The Three Primary User Journeys

The canonical public product model contains three primary user journeys. These are the choices an ordinary visitor should understand within about 30 seconds.

### 3.1 Practice Your Own Words

User intent: “I already have a spelling list.”

Typical users include parents with this week’s school words, students preparing for a spelling test, teachers with custom lists, homeschool families, and interventionists using assessment-based word sets.

Expected experience:

- The user types or pastes words.
- The user begins practicing with minimal friction.
- The user does not need to browse curriculum, grade levels, or content categories first.

This is the flagship homepage experience.

Conceptual role: “I already have words. Let’s practice.”

### 3.2 Learn by Grade

User intent: “My child is in Kindergarten, Grade 1, Grade 2, Grade 3, Grade 4, or Grade 5. What should they practice?”

Expected experience:

- The user chooses a grade.
- The grade page presents a curated spelling progression.
- The grade page acts as a roadmap, not an exhaustive directory.
- Each core unit provides immediate useful practice.
- The user can move to previous or next grade-level units.
- Supporting skill, sight-word, or vocabulary practice may be recommended where appropriate.

Conceptual role: “Show me a sensible grade-level learning path.”

### 3.3 Practice a Specific Skill

User intent: “My child needs help with a particular spelling concept.”

Examples include short vowels, consonant blends, digraphs, silent e, vowel teams, r-controlled vowels, syllables, prefixes, suffixes, homophones, and sight words.

Expected experience:

- The user searches or browses for a recognizable spelling concept.
- The user reaches focused practice without needing to follow a grade sequence.
- The content may be useful across multiple grades.
- Technical terminology may be explained, but it should not be required to use the site.

Possible labels such as “Spelling Skills,” “Practice by Skill,” or “Choose a Practice List” may be tested later. This constitution freezes the journey, not a specific interface label.

Conceptual role: “I know what we need to practice.”

## 4. Product Journeys vs. Internal Content Systems

The visible product should expose user intent, not internal departments.

The three product journeys are simple decisions users make:

- I already have words.
- I know the grade.
- I know the skill or word type.

Internal content systems are richer editorial structures that support those journeys. They may include curriculum, skills, sight-word sets, vocabulary and themes, teaching guides, and collections.

These internal systems must not automatically become top-level navigation. Parents and children should not need to understand the project’s taxonomy, metadata model, curriculum data model, or editorial workflow to start practicing.

## 5. Canonical Content Identities

These are conceptual content identities. They are not necessarily route names, Astro collections, frontmatter fields, or separate technical systems.

### 5.1 Practice Tool

The Practice Tool accepts user-provided words, runs spelling practice, provides calm feedback, and supports both curated lists and custom lists.

The interaction should remain familiar across custom words, Grade Units, Skill pages, Sight Word Sets, and Vocabulary or Theme Lists.

### 5.2 Grade Roadmap

A Grade Roadmap answers: “What should this grade practice?”

It presents a curated sequence of major spelling milestones for a grade. It should be calm, scannable, and useful as a roadmap. It should not expose every narrow practice page or pretend to be a rigid national pacing guide.

### 5.3 Grade Unit

A Grade Unit represents one grade-specific spelling milestone.

A Grade Unit should generally include:

- a clear title;
- a short parent-friendly explanation;
- a grade-appropriate word list, usually 8–16 words;
- immediate access to practice;
- previous and next grade-unit navigation;
- limited optional links to focused practice;
- accurate terminology explained in plain language.

A Grade Unit should not primarily be a gateway to other pages. The normal journey should be:

> Grade Roadmap → Grade Unit → Practice

Optional focused practice is secondary.

### 5.4 Skill

A Skill represents a reusable spelling concept or focused pattern. It supports targeted practice independent of one grade and may be referenced from several grades.

Examples include Short A, Consonant Digraphs, Beginning Blends, Silent E, AI and AY, R-Controlled Vowels, Prefixes, Suffixes, and Homophones.

A skill may be introduced in one grade and revisited in another. Current grade metadata must not automatically imply that a page is fundamentally a Grade Unit.

### 5.5 Sight Word Set

A Sight Word Set supports recognized high-frequency word systems and irregular-word practice. Examples may include Dolch, Fry, Heart Words, or other carefully defined sets.

Sight Words are conceptually distinct because user intent differs from both grade curriculum and phonics-pattern practice. Sight-word resources may be reached through Grade Roadmaps, skill or list browsing, contextual recommendations, direct search, or collections such as Dolch. Their future navigation treatment is intentionally undecided.

Important terms must not be collapsed:

- High-frequency words are common in print.
- Irregular words have spellings that are not fully predictable from common phoneme-grapheme patterns.
- Heart-word instruction is a teaching frame for drawing attention to the parts of a word students must learn “by heart.”

These overlap, but they are not synonyms.

### 5.6 Vocabulary or Theme List

A Vocabulary or Theme List provides supplemental spelling practice organized by topic, subject, writing use, or enrichment purpose.

Examples may include animal words, action words, weather words, science words, academic vocabulary, or describing words.

These lists may be useful, but they do not define the core spelling curriculum. They should not dominate Grade Roadmaps or the main product identity.

### 5.7 Teaching Guide

A Teaching Guide explains spelling concepts to parents, teachers, or homeschool families. It builds trust, helps users choose appropriate practice, and links into useful practice experiences.

Examples include explanations of consonant blends, silent e, heart words, or how parents can help children practice spelling.

Teaching Guides support the product but should not interrupt immediate practice. They should not duplicate practice pages unnecessarily.

### 5.8 Collection

A Collection packages related lists or sets and may support navigation or a named external sequence such as Dolch.

A Collection is an editorial packaging mechanism, not a primary product journey by default.

## 6. Curriculum Foundation

SpellingWords.app should reflect broad U.S. consensus about elementary spelling development without copying one commercial curriculum.

No single national scope and sequence exists. State standards and respected curricula differ in exact ordering and terminology. They broadly agree, however, that elementary spelling develops through:

1. alphabet knowledge and sound-to-letter encoding;
2. short-vowel and closed-syllable spelling;
3. digraphs, blends, and one-syllable spelling conventions;
4. long-vowel patterns, including silent e, vowel teams, open syllables, and r-controlled vowels;
5. syllable awareness and multisyllabic spelling;
6. inflectional endings and basic morphology;
7. prefixes, suffixes, roots, and suffix spelling changes;
8. Greek and Latin morphology;
9. high-frequency irregular words, homophones, meaning-based spelling, and proofreading transfer.

Spelling is encoding, not merely vocabulary memorization. It involves phonology, orthography, syllables, morphology, meaning, and conventional word knowledge.

The full technical taxonomy should remain mostly internal. The public experience should expose recognizable concepts in plain language.

Curriculum research documents are the detailed curriculum reference. This constitution is the product and architecture reference.

## 7. Relationship Between Grades and Skills

Skills are reusable concepts. Grades are curated developmental paths through those concepts.

A skill may appear in multiple grades with different word complexity or a different instructional objective.

Silent E may appear as simple one-syllable long-vowel practice in an early grade, as review in a later grade, and as part of the “drop silent e” suffix rule in later spelling work.

Consonant blends may appear as simple CCVC and CVCC words in Grade 1, as longer or multisyllabic words in later grades, or as remediation practice for an older learner.

Therefore:

- No grade owns the concept of Silent E.
- No grade owns Short A, SH, BL, or any other reusable pattern.
- A Grade Unit may provide a grade-specific view or word list for a broader skill.
- A Skill page may serve several grades.
- Relationships should be represented through metadata and links, not through duplicating the same concept beneath every grade.
- Users do not need to see or understand a complex cross-grade skill graph.

The visible experience should remain simple even when the internal relationships are rich.

## 8. Grade Roadmap Principles

Each Grade Roadmap should:

- answer “What should this grade practice?”;
- show only major curriculum milestones;
- remain calm and scannable;
- avoid exposing dozens of atomic skill pages;
- use a curated order;
- distinguish core progression from optional supplemental material only when that distinction adds value;
- favor direct access to practice;
- preserve teacher trust through sound curriculum sequencing.

A Grade Roadmap should not:

- function as a complete sitemap;
- list every focused skill page;
- expose internal categories such as phonics, morphology, or orthography as required navigation;
- be generated automatically from raw content categories;
- imply that every child must complete every resource;
- pretend to be a rigid national pacing guide.

## 9. Grade Unit Principles

A Grade Unit should help a user understand and practice one grade-specific spelling milestone.

It should not contain an overwhelming directory of subpages, require a long lesson before practice, repeat a large teaching article, contain a giant word bank, or claim that one practice session proves mastery.

Grade Units should be useful even if a user never clicks any optional supporting links.

## 10. Skill Principles

Skill pages should answer: “I need practice with this spelling concept.”

They should use recognizable parent and teacher language, provide direct practice, remain grade-neutral unless the content itself is explicitly grade-specific, support assignment and intervention, link to relevant Grade Roadmaps where helpful, identify prerequisites and related skills when useful, and avoid unnecessary technical terminology.

Not every possible micro-pattern deserves its own standalone page. A focused skill page should exist only when it provides real value, such as genuine instructional isolation, strong teacher assignment utility, distinct user intent, a sufficiently useful word set, or meaningful search and bookmarking value.

The site must not create pages simply because a programmatic route can generate them. A filter, tab, section, or practice-state variation may be better than a separate indexed page.

## 11. The No-Gateway Rule

A page should not be inserted into the normal learning or practice path merely to expose another directory of links.

Undesirable:

> Grade Roadmap → Practice Gateway → More choices → Actual practice

Preferred:

> Grade Roadmap → Grade Unit → Immediate practice → Optional focused practice

Every indexable destination should provide value appropriate to its primary user intent through at least one of the following:

- practice;
- a useful Grade Roadmap;
- a meaningful word set;
- a substantive explanation;
- a recognized collection;
- a legitimate browse or search experience.

This rule does not mean every page must contain the practice engine. Legitimate index, browse, and collection pages may exist when browsing or choosing among a recognized set is the page’s explicit user purpose. Examples include a Grade Roadmap, a spelling-skill index, a Dolch collection, or a search/browse results page.

The rule is: every page must provide real value for its primary user intent.

## 12. Simplicity Principles

The architecture should pass the 30-second test. A new parent should quickly understand what the site does, how their child practices, which of the three journeys fits their situation, and that the experience is calm and trustworthy.

The constitution favors:

- fewer clear choices;
- direct practice;
- plain-language labels;
- curated recommendations;
- reusable content;
- gradual expansion;
- evidence-based changes.

It rejects:

- architecture for architecture’s sake;
- visible technical taxonomies;
- unnecessary page types;
- unnecessary hierarchy;
- content generated merely for page count;
- large directories in the main learning flow;
- premature implementation of every future possibility.

Complexity may exist internally, but it should not be exposed unless it helps the user.

## 13. Practice Experience Principles

The practice experience should remain consistent across custom words, Grade Units, Skill pages, Sight Word Sets, and Vocabulary or Theme Lists. The source and purpose of the words may differ, but the central interaction should feel familiar.

The project should favor calm feedback, clear instructions, minimal setup, and no mandatory account.

The project rejects rankings, public comparison, manipulative streak pressure, anxiety-producing timers, complex gradebooks, and mandatory accounts.

Calm optional continuity, such as “continue where you left off,” may be explored later. If introduced, progress should support continuity rather than completion pressure.

## 14. Content and Editorial Principles

SpellingWords.app should focus on words children are expected to spell, not merely words they are expected to understand.

Curriculum word lists should be deliberately curated. Grade Unit lists should generally contain 8–16 words. A large number of possible words does not justify a giant list.

Every page must answer a clear user question and have one primary purpose. Page count is not a product goal.

Vocabulary and theme lists should be labeled and treated as supplemental. Existing useful content should be preserved and repurposed where possible, but duplicate pages should not be created for the same user intent.

Grade metadata must not be treated as page identity. Public labels should use familiar language. Technical terms may appear as secondary explanations. Important instructional distinctions should not be erased merely to reduce categories.

## 15. SEO, GEO, and AEO Principles

Discoverability matters, but SEO must not dictate the product.

The site should satisfy real user intent first. Topical authority comes from complete, accurate coverage and meaningful relationships, not from exposing every page at once.

Different content identities answer different intents:

- Grade Roadmaps answer grade-based curriculum intent.
- Skill pages answer focused spelling-concept intent.
- Sight Word Sets answer high-frequency, irregular-word, or named-set intent.
- Vocabulary or Theme Lists answer topic- or subject-based supplemental intent.
- Teaching Guides answer explanatory intent.

Pages should not be created solely to target a keyword. Thin, near-duplicate, or filter-only pages should not be indexed automatically.

Canonical content should exist once and be linked from multiple relevant journeys. Grade pages may curate or recommend content without owning or duplicating it.

URL design should follow content identity after the model is stable. URL migration is not the immediate next step. Any future URL change must preserve redirects, canonical metadata, structured data, breadcrumbs, and internal links through a dedicated migration plan.

## 16. Implementation Boundaries

This constitution does not freeze:

- exact public URLs;
- exact route paths;
- exact database, JSON, or content structures;
- exact Astro collections;
- exact frontmatter field names;
- exact component names;
- whether focused practice is a page or filtered state;
- exact navigation labels;
- exact URL migration schedule.

Those decisions belong in `docs/architecture/CONTENT_MODEL.md` and later technical implementation plans.

The constitution defines what must be true, not the precise code used to accomplish it.

## 17. Documentation Governance

Documentation precedence is:

1. `docs/architecture/CONSTITUTION.md` — product purpose, user journeys, conceptual content identities, and non-negotiable principles.
2. `docs/architecture/CONTENT_MODEL.md` — metadata, content representation, relationships, field definitions, and validation rules.
3. Curriculum research and grade-skill source documents — K–5 taxonomy, grade-skill matrix, and source analysis.
4. Grade-specific plans — Kindergarten, Grade 1, and later grades.
5. Technical and migration plans — routes, migrations, components, and PR-specific implementation plans.
6. Archived or historical documents.

Older documents may remain valuable, but they are subordinate when they conflict with this constitution.

Likely future archival candidates include older or superseded portions of `docs/CONTENT_ARCHITECTURE.md`, `docs/SITE_ARCHITECTURE.md`, `docs/GRADE_LEVEL_STRATEGY.md`, and `docs/LIST_ARCHITECTURE.md`. Do not move or delete them as part of adopting this constitution. A later documentation cleanup may move clearly outdated planning documents into `docs/archive/`, preserve them for historical reference, and label them as non-canonical.

## 18. Renovation, Not Restart

The current project should evolve rather than be rebuilt from scratch.

The existing project contains valuable work: practice functionality, curated content, curriculum research, Kindergarten and Grade 1 work, interface design, content relationships, and testing and deployment infrastructure.

The correct strategy is renovation:

- preserve useful content;
- clarify content identity;
- remove or merge redundant gateway pages over time;
- progressively align implementation with this constitution;
- avoid a wholesale rewrite unless a future technical audit demonstrates that one is necessary.

This constitution should guide alignment work. It should not be read as a claim that the current code, routes, or content already fully conform.

## 19. Near-Term Sequence

The current recommended rollout is:

1. Adopt and approve this constitution.
2. Define `docs/architecture/CONTENT_MODEL.md`.
3. Audit and archive outdated documentation after the new canonical documents exist.
4. Align Kindergarten as the first reference implementation under this constitution.
5. Revise Grade 1 using the same model.
6. Build the initial reusable Skills experience.
7. Revisit URL structure after page identities are stable.
8. Expand Grades 2–5 incrementally.
9. Consider supporting systems such as guides, themed lists, and calm local continuity later.

This sequence may change as the project evolves. The conceptual principles should remain stable unless explicitly amended.

## 20. Amendment Standard

This constitution should guide evolution without pretending the product can never change.

A foundational change must be explicit. It should:

- identify the principle being changed;
- explain the evidence or product reason for the change;
- update this constitution;
- update any conflicting canonical documents;
- avoid silently changing architecture through implementation alone.

Implementation should not become architecture by accident. If the product model changes, the constitution must change with it.
