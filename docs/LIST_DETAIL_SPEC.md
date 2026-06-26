# List Detail Page Specification

## Status

Draft — pending review against HOMEPAGE_SPEC.md, SITE_ARCHITECTURE.md, UX_ARCHITECTURE.md.

---

## Purpose

The List Detail page answers one question: **"Is this the right spelling list to practice?"**

It is simultaneously the site's primary conversion page, its primary SEO landing page, and the bridge between discovery and practice. Almost every user journey — whether arriving from a Grade Hub, a Category Hub, the Spelling Library, a search engine, or an AI assistant — passes through a List Detail page before practice begins.

The page must help a parent, teacher, or independent visitor evaluate a list and make a confident decision within roughly fifteen seconds of arriving. If the list is the right fit, the path to practice must be obvious. If it is not, the path to related or appropriate lists must be equally clear.

---

## Primary Audiences

**Parents** — typically searching on behalf of a child. They need to quickly understand what the list covers, whether it is grade-appropriate, and how to start. They will scan rather than read.

**Teachers** — evaluating lists for classroom or homework use. They care about curricular fit, skill alignment, and the completeness and quality of the word list itself.

**Older children browsing independently** — children aged roughly 9 and up who discover lists through navigation or search and want to decide for themselves whether to practice.

**Search engine visitors** — users landing directly from a query such as "2nd grade sight words list" or "short vowel CVC words." They arrive with a specific intent; the page must immediately confirm or redirect them.

**AI-referred visitors** — users who followed a recommendation from an AI assistant. These visitors arrive pre-sold on a concept and need the page to confirm that what they see matches what they were told.

---

## Success Criteria

The page succeeds when any of the following occur:

- A visitor begins a practice session.
- A visitor confidently determines the list is not quite right for them and navigates to a related or more appropriate list.
- A visitor understands the educational purpose of the list well enough to make a recommendation to a child or colleague.
- A visitor bookmarks, shares, or returns to the page later.
- A future print or worksheet flow is initiated (when implemented).

The page fails when a visitor cannot tell within fifteen seconds what words are included, who the list is for, or how to start.

---

## Information Hierarchy

Content should be weighted in the following order of importance:

1. **List identity** — what this list is called, what grade it targets, and what category it belongs to
2. **What this list teaches** — the spelling skill or pattern at the heart of this list, stated plainly
3. **Start Practice** — the action the page is built around; prominent but not aggressive
4. **Complete word list** — every word included, visible without gates or paywalls
5. **Educational context** — deeper explanation of the skill, who benefits, and how it fits into a learning progression
6. **Related, prerequisite, and next lists** — natural continuation paths
7. **Grade and category navigation** — breadcrumb and hub links for visitors who need to explore further

The complete word list is primary content, not supporting material. It should be visible without excessive scrolling and never truncated or hidden behind any interaction.

---

## Required Sections

### 1. List Identity

**Purpose:** Immediately orient the visitor. Within the first few seconds, they should know the list's name, its grade level, its category, and a one-sentence summary of its educational purpose.

**Required content:**
- List title (e.g., "Short A Words — CVC Pattern")
- Grade level or target audience indicator (e.g., "Grade 1" or "Kindergarten–Grade 1")
- Category chip or label (e.g., Phonics, Sight Words, Grade-Level)
- Difficulty indicator, when meaningful (e.g., Beginner, Intermediate)
- Estimated session duration, when useful (e.g., "About 10 minutes")
- Short description: one to two sentences stating what the list is and who it is for

**Optional future enhancements:**
- Mastery badge or completion indicator for returning visitors (powered by localStorage)
- "Last practiced" timestamp for recognized returning visitors

**What must never appear:**
- Marketing language or superlatives ("The best list for your child!")
- Login or account prompts
- Incomplete or placeholder content

---

### 2. Practice Entry Point

**Purpose:** Provide a clear, calm path from evaluation to action. The visitor who has decided to practice should not need to search for how to begin.

**Required content:**
- A prominent call to action to begin a practice session with this list
- Clarity that the session will use this specific list

**Optional future enhancements:**
- Session size selection (e.g., "Practice 5 words" vs. "Practice all 15 words")
- Option to continue from a previous session if progress is tracked via localStorage

**What must never appear:**
- Pressure, urgency language, or countdown timers
- Login prompts or account gates
- Competing calls to action that dilute the primary action
- Gamification framing ("Start your streak!", "Earn points!")

The Start Practice action should be the most obvious affordance on the page. It should not, however, feel aggressive or promotional. The tone is: "Whenever you're ready."

---

### 3. Word List

**Purpose:** Let the visitor evaluate the specific words included. This is the most important piece of content on the page for every audience.

**Required content:**
- Every word in the list, displayed legibly
- Example sentences for each word (required per content standards; see CONTENT_STANDARDS.md)
- Word count (e.g., "15 words")

**Optional future enhancements:**
- Audio pronunciation for individual words on this page (separate from the practice session)
- Print-optimized word list view
- Visual grouping of words by sub-pattern when applicable

**What must never appear:**
- Truncated word list requiring a click to expand
- Paywall or login to see the full list
- Advertising inside or between words in the list
- Decorative elements that impede readability

The word list is primary content. It is why the page exists. It should never be treated as supplementary or secondary to editorial copy.

---

### 4. Educational Explanation

**Purpose:** Help parents and teachers understand the spelling skill this list develops, why it matters, and how it fits into a broader learning progression. This section is primarily for adults.

**Required content:**
- A clear explanation of the spelling pattern, rule, or category the list addresses (e.g., what CVC means, why sight words are learned differently from phonics words)
- The approximate grade level or developmental stage this skill belongs to
- A plain statement of why this list is useful

**Optional future enhancements:**
- Link to a relevant Teaching Guide (Tier 3 content) for deeper reading
- Skill tag links connecting to other lists sharing the same pattern

**What must never appear:**
- Dense academic language that excludes parents
- Marketing copy masquerading as educational explanation
- Content that buries or delays the word list

---

### 5. Related, Prerequisite, and Next Lists

**Purpose:** Help visitors navigate naturally into the next learning step, or discover a more appropriate starting point if this list is not quite right.

**Required content:**
- Links to prerequisite lists (what to practice before this one), when defined in frontmatter
- Links to next lists (what to practice after this one), when defined in frontmatter
- Links to related lists (thematically or structurally adjacent), when defined in frontmatter

The labels and framing should reflect the learning relationship, not generic "you might also like" language. A prerequisite list should be labeled as such. A next list should be described as a continuation.

**Optional future enhancements:**
- Compact visual cards for related lists showing word count, grade, and category
- "Continue learning" prompt driven by localStorage progress data (see CONTENT_ARCHITECTURE.md §6.1)

**What must never appear:**
- Algorithmically generated recommendations with no editorial basis
- Promotional placement of lists that happen to be featured elsewhere
- Related lists that are not genuinely educationally relevant

---

### 6. Print and Share (Future)

**Purpose:** Support the classroom and homework use case by making it easy to print or share a list.

This section is not required at launch. When implemented, it should offer a print-friendly word list view — clean, without advertising or navigation — suitable for use as a spelling homework sheet or study aid. A shareable URL is already inherent to the page's design.

**What must never appear:**
- Account creation as a prerequisite for printing
- Watermarks, branding-heavy print layouts, or paywalled print formats

---

### 7. Navigation and Orientation

**Purpose:** Help visitors who arrived from search or an external link understand where this page fits in the site, and give them an easy path back to the broader library.

**Required content:**
- Breadcrumb navigation linking to the parent Category Hub and the Spelling Library
- Link to the parent Grade Hub when grade is defined
- Navigation sufficient to let a visitor explore adjacent content without returning to the homepage

**What must never appear:**
- Redundant or duplicate navigation that clutters the page
- Navigation that competes with the Start Practice action

---

## SEO Role

List Detail pages are the site's highest-value SEO landing pages. They are the pages most likely to rank for specific, high-intent queries — the kind of searches a parent makes when they know what they need.

Target query patterns include:

- Grade-specific spelling lists ("1st grade spelling words", "3rd grade spelling list")
- Phonics-pattern queries ("short vowel words for kids", "CVC word list")
- Sight word queries ("Dolch sight words list kindergarten", "Fry words grade 2")
- Named-list searches ("second grade sight words", "long E words spelling list")

Each List Detail page is a self-contained, authoritative document about a specific spelling list. The page title, meta description, and body content should be written to clearly answer the search query that would lead someone to it.

SEO value on these pages comes from genuine educational quality: complete word lists, clear explanations, and honest metadata. Content farming — thin copy, keyword stuffing, or inflated list counts — undermines both trust and long-term ranking.

---

## AEO and GEO Role

List Detail pages are the pages most likely to be cited, summarized, or recommended by AI assistants. A parent asking an AI assistant for a short-vowel word list for first grade should receive a recommendation that, when followed, delivers exactly what was promised.

These pages should be structured so that an AI system can accurately extract and answer:

- **What words are included?** — The complete word list must be machine-readable and unambiguous.
- **Who is this list for?** — Grade level and target audience must be stated explicitly.
- **What spelling skill does it teach?** — The educational explanation should answer this plainly.
- **What grade is it appropriate for?** — Grade data must be present in both the content and the metadata.

AEO quality is a function of content quality. These pages earn AI citation by being genuinely useful, not by gaming structured data.

---

## Advertising Philosophy

Advertising is appropriate on List Detail pages. These are editorial content pages — genuine educational resources — and modest, well-placed advertising is consistent with that character.

The following constraints are absolute:

- Ads must never appear inside the word list or between individual words.
- Ads must never appear immediately adjacent to the Start Practice action in a way that competes with or confuses it.
- Ads must never interrupt the educational explanation section.
- Ads must never make the page resemble an SEO content farm — cluttered, low-trust, and visually overwhelming.

The page must always read as a trustworthy educational resource. Advertising supports that mission when it is visually secondary. It undermines it when it dominates.

---

## Anti-Goals

The List Detail page must never become:

- An SEO article with the word list buried beneath marketing copy
- A thin content page that lists words without context or educational value
- A sales page with pressure language and aggressive conversion tactics
- An advertisement-heavy experience that erodes trust
- A metadata dump that is accurate but cold and unusable
- A page where a visitor leaves without understanding whether the list is appropriate for their child

---

## Relationship to Other Pages

**Arrives from:** Spelling Library, Grade Hub, Category Hub, search engines, AI assistants, direct links, related-list navigation.

**Routes to:** Practice Session (via Start Practice), related/prerequisite/next List Detail pages, Grade Hub, Category Hub, Spelling Library, Teaching Guides (future).

**Does not replace:** Grade Hubs and Category Hubs handle aggregate browsing. List Detail pages handle individual list evaluation. These roles are complementary, not overlapping.
