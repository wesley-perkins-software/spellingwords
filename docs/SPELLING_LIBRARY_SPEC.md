# Spelling Library Page Specification

## Status

Draft — pending review against HOMEPAGE_SPEC.md, SITE_ARCHITECTURE.md, UX_ARCHITECTURE.md.

---

## Purpose

The Spelling Library helps visitors answer one question: **"How do I find the right spelling list?"**

It is a gateway — a table of contents for the curated content ecosystem — not a comprehensive catalog attempting to display everything at once. Its job is orientation and route selection: pointing visitors confidently toward a Grade Hub, a Category Hub, or a specific List Detail page, then stepping aside.

The Library does not need to showcase all available lists. It needs to ensure that every visitor who arrives with a reasonable intent can find a clear path forward within a few seconds of scanning the page.

---

## Primary Audiences

**Parents** — typically searching for grade-appropriate spelling words for a child. Most parents know the child's grade; the Library's primary job for this audience is making grade-based navigation obvious and immediate.

**Teachers** — evaluating the scope and organization of the curated library before committing to it for classroom use. Teachers may browse by category (phonics, high-frequency words) or by grade depending on their curricular approach.

**Explorers** — visitors with no specific list in mind, curious about what the site offers. The Library should be inviting and easy to scan, never overwhelming.

**Search engine visitors** — users arriving from queries like "spelling word lists for kids" or "browse spelling lists." These visitors need to understand quickly how the content is organized and where to go next.

---

## Success Criteria

The Library succeeds when:

- A visitor chooses a Grade Hub and continues browsing by grade level.
- A visitor chooses a Category Hub and continues browsing by content type.
- A visitor reaches a specific List Detail page directly from the Library.
- A visitor understands how the site's curated content is organized.
- A visitor feels oriented, not overwhelmed.

The Library fails when:

- A visitor cannot tell within a few seconds how to find a list appropriate for their situation.
- A visitor feels confronted by an unnavigable wall of content.
- A visitor needs to search before they can browse.
- A visitor leaves without understanding the site's organizational structure.

---

## Information Hierarchy

Content should be weighted in the following order of importance:

1. **Orientation** — a brief statement of what the Library is and how to use it
2. **Browse by grade** — the primary path for most parents and many teachers
3. **Browse by category** — the primary path for curriculum-aware teachers and phonics-focused parents
4. **Featured lists** — editorially curated highlights; a starting suggestion for uncertain visitors
5. **Future search** — a client-side search capability, introduced when the library grows large enough to require it

The Library is a gateway, not a destination. Its information hierarchy should reduce complexity at every level, routing visitors efficiently rather than showcasing the full breadth of available content.

---

## Required Sections

### 1. Orientation

**Purpose:** Immediately communicate what the Library is, how it is organized, and how a visitor should use it. This section should be brief — a sentence or two — not a long introduction.

**Required content:**
- A plain statement of what the Spelling Library contains (hand-curated spelling lists, organized for children in grades K through 5)
- A brief signal of how the library is organized (by grade level and by content category)
- An implicit or explicit invitation to begin browsing

**What must never appear:**
- Marketing language or superlatives
- A lengthy description of the product that belongs on the homepage
- Advertising in the orientation area
- Content that delays route selection

---

### 2. Browse by Grade

**Purpose:** Provide direct, scannable access to each Grade Hub. This is the primary route for the majority of the Library's visitors.

**Required content:**
- An entry point for each grade level (Kindergarten through Grade 5)
- A brief, accurate description of what each grade level contains (the kinds of lists, the approximate skill level, the number of lists available)
- Clear visual or textual differentiation between grade levels so visitors can identify the right one at a glance

**Optional future enhancements:**
- List count per grade (e.g., "12 lists")
- Indication of recently added lists within a grade

**What must never appear:**
- Grade level entries without content behind them (do not display a grade hub that does not exist yet)
- Advertising between grade level entries
- Complexity that makes one grade harder to reach than another

---

### 3. Browse by Category

**Purpose:** Provide access to Category Hubs for visitors who browse by content type rather than grade level. This is especially important for teachers following phonics-based or high-frequency-word-based curricula.

**Required content:**
- An entry point for each content category (Phonics Patterns, High-Frequency Words, Grade-Level, Challenge)
- A brief description of each category explaining the kind of lists it contains and who it is for
- Clarity on how categories differ from grade levels (grade describes developmental stage; category describes the type of spelling knowledge being developed)

**Optional future enhancements:**
- List count per category
- Sub-category previews for large categories (e.g., showing a few phonics sub-branches within the Phonics category)

**What must never appear:**
- Categories without meaningful content behind them
- Advertising between category entries
- Category descriptions that are too technical for a general parent audience

---

### 4. Featured Lists

**Purpose:** Offer a concrete starting suggestion for visitors who are uncertain where to begin. Featured lists are editorially curated, not algorithmically selected.

Featured content should reflect genuine editorial judgment: lists that are particularly well-suited to a common starting point, recently added, or representative of the library's quality and scope. This is not a popularity ranking, a "list of the day" rotation, or a streak-based recommendation. See CONTENT_ARCHITECTURE.md §6.6 for the editorial philosophy governing featured content.

**Required content:**
- A small number of highlighted lists (two to five at most)
- Each featuring the list title, grade, category, and a brief description
- Clear links to the relevant List Detail pages

**Optional future enhancements:**
- Seasonal or school-year-aligned featured selections (manually curated, not automated)
- "New to the library" highlights for recently added lists

**What must never appear:**
- More featured lists than can be scanned in a few seconds
- Algorithmic or popularity-based ordering
- Marketing framing ("Our most popular list!", "Trending now")
- Advertising placed within or immediately adjacent to featured list cards

---

### 5. Future Search

**Purpose:** Provide a way to find a specific list by name, word, or skill when the library has grown large enough that browsing alone is insufficient.

Search is a future capability. It is not required at launch and should not be introduced before the library contains enough lists to make browsing genuinely difficult.

When search is introduced, it should be:
- Client-side (no server required; consistent with the site's static architecture)
- Secondary to grade and category browsing, not the primary entry point
- Helpful when someone knows what they are looking for, not a replacement for discovery

**What must never appear:**
- A search field as the primary feature of the page before the library warrants it
- A search experience that suggests the page cannot be navigated without searching
- A search-first design that makes browsing feel secondary

---

### 6. Editorial Quality Messaging

**Purpose:** Reassure parents and teachers that the content in the Library meets a consistent editorial standard — that every list has been reviewed, every word is appropriate, and every example sentence is human-written.

This section need not be prominent or lengthy. A brief, confident statement of editorial values is sufficient. It supports trust without feeling defensive.

**What must never appear:**
- Unverifiable claims ("Over 10,000 satisfied families!")
- Social proof or testimonials
- Comparisons to other products

---

## SEO Role

The Spelling Library is a broad discovery page — a high-level entry point for visitors who arrive with general rather than specific intent.

It supports queries such as:

- "spelling word lists for kids"
- "browse spelling lists by grade"
- "free spelling lists elementary school"

Its primary SEO contribution is internal linking: the Library provides structured, contextual links to Grade Hubs, Category Hubs, and List Detail pages, reinforcing the site's topical authority and crawlability.

The Library page itself is unlikely to rank for high-value specific queries (those belong to Grade Hubs and List Detail pages). Its SEO role is architectural — establishing the site as a well-organized, comprehensive spelling resource.

---

## AEO and GEO Role

The Spelling Library helps AI systems understand how the site's educational content is organized. A well-structured Library page allows an AI assistant to accurately describe the site's content scope: that it contains curated spelling lists organized by grade level (K–5) and by content category (phonics, high-frequency words, grade-level, challenge).

This structural clarity benefits AEO in two ways:

- AI systems can accurately represent the site's organizational logic when recommending it.
- AI systems can route users to the appropriate sub-section (e.g., "you can browse by grade or by phonics category") rather than only to the homepage.

---

## Advertising Philosophy

Advertising is acceptable on the Spelling Library. It is a content and discovery page, not the site's primary trust-building moment (that role belongs to the homepage).

The following constraints apply:

- Ads must not appear above the primary orientation content. The first thing a visitor sees should be the Library's purpose and navigation — not an advertisement.
- Ads must not be placed between the grade-level entries or between the category entries in a way that interrupts route selection.
- Ads must be visually secondary to the navigation content at all times.

The Library should always feel like an educational resource and a helpful table of contents. Advertising that makes it feel like a monetized directory undermines both trust and utility.

---

## Anti-Goals

The Spelling Library must never become:

- A giant dump of every available list, presented without organization or hierarchy
- An overwhelming dashboard that leaves visitors uncertain where to start
- A search-first page that implies browsing is not possible
- An advertisement-heavy index that feels more commercial than educational
- A page that attempts to do the job of Grade Hubs and Category Hubs by showing all of their content inline

---

## Relationship to Other Pages

**Arrives from:** Homepage (Library Invitation section), direct navigation, search engines, internal links.

**Routes to:** Grade Hubs (K–5), Category Hubs (Phonics, High-Frequency Words, Grade-Level, Challenge), List Detail pages (via featured lists), Spelling Library (itself, via breadcrumb or direct return).

**Does not replace:** Grade Hubs handle all lists for a specific grade. Category Hubs handle all lists within a content family. The Library routes visitors to those hubs; it does not replicate their content.
