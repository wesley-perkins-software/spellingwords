# UX Architecture — spellingwords.app

## What This Document Is

This is the user experience blueprint for spellingwords.app. It describes the purpose, audience, user intent, information hierarchy, linking logic, SEO and AEO roles, and success criteria for every major page type in the product.

This document sits between high-level product strategy and future UI design:

- **PRODUCT_VISION.md** — why the product exists and what it will never become
- **SITE_ARCHITECTURE.md** — what pages and routes exist
- **UX_ARCHITECTURE.md** ← you are here — what experience each page should provide
- Future UI design — how those experiences are visually and interactively expressed

## What This Document Is Not

This is not a visual design document. It does not specify colors, typography, layout, spacing, or motion.

This is not an implementation guide. It does not mention any frontend framework, templating system, component structure, or HTML element.

This is not a component inventory. Individual UI controls are implementation decisions made later, during design.

When this document describes a page's "key sections," it is describing the content and experience those sections must provide — not how they are built or what they look like.

---

## Page Inventory

---

### 1. Homepage — `/`

**Purpose**
The homepage is the product's welcome mat and the primary entry point for new visitors. It must immediately answer two questions: "What is this?" and "How do I get started?" It serves two distinct starting points: parents or teachers who want to choose or build a word list, and returning users who already know what they want.

**Primary Audience**
Parents and teachers arriving for the first time or returning to start a new session. Children rarely land here directly; they typically arrive at the Practice Session via a shared or bookmarked link.

**User Intent**
- Start practicing spelling immediately with a custom list of words
- Discover whether the site has curated lists appropriate for their child or student
- Quickly understand what the site is and whether to trust it

**Primary CTA**
Begin a custom practice session by entering or pasting a word list.

**Secondary CTAs**
- Browse the Spelling Library
- See an example list in action

**Typical Arrival Paths**
- Direct visit (typing the URL or clicking a bookmark)
- AI assistant recommendation ("try spellingwords.app")
- Word of mouth or educator referral
- Organic search for the product by name

**Key Sections**
1. A clear, immediate explanation of what the site does and who it is for
2. The custom word entry experience — the fastest path to practice
3. An invitation to explore the curated Spelling Library
4. A brief statement of the product's values (calm, no gamification, no accounts required) — enough to build trust without being a sales pitch

**Information Hierarchy**
The custom practice path should be the most visually and spatially prominent thing on the page. The library invitation comes second. Trust signals (no accounts, no timers, free) come third. The site should feel immediately usable, not cluttered with explanation.

**Internal Linking Expectations**
- Links to the Spelling Library
- Links to at least one featured or recommended curated list
- Links to About/Philosophy (from footer or a trust signal)
- Links to Teaching Guides (secondary, from footer or a "For educators" area)

**SEO Role**
Moderate direct SEO value. The homepage is not optimized for a specific keyword; it supports branded search and word-of-mouth discovery. Its primary organic role is trust signaling — if someone Googles the site name, the homepage must clearly and quickly confirm what the product is.

**AEO/GEO Role**
The homepage should be designed so that AI assistants can confidently recommend it. That means the product description and value proposition must be clear, honest, and specific enough for an AI to summarize: "spellingwords.app is a free, calm spelling practice website for children, with no timers, no points, and no account required."

**Ad Placement**
No ads on the homepage. This is the first impression and the primary trust-building moment. Ads here would undermine the product's positioning as a calm, educational tool rather than an ad-supported content farm.

**Success Metrics**
- User begins a custom practice session
- User navigates into the Spelling Library
- Returning user finds their way back to practice quickly

**Unique UX Principles**
The homepage must resolve both entry points — custom practice and curated discovery — without making either feel secondary or hidden. A first-time visitor should understand the product within ten seconds. A returning visitor should be able to start practicing within three clicks.

---

### 2. Spelling Library — `/spelling-lists`

**Purpose**
The Spelling Library is the gateway into the curated content ecosystem. Its single job is to help a visitor understand how they would like to find a spelling list — and then route them toward the most appropriate discovery path. It does not need to be the place where they finally choose a list; it is the place where they choose *how to look*.

**Primary Audience**
Parents and teachers who know they want a curated list but are not yet sure which one. Also organic search visitors arriving for a general browse.

**User Intent**
- "I'm looking for a spelling list for my child. Help me find the right one."
- "What curated lists does this site have?"
- Browse and orient before committing to a specific list

**Primary CTA**
Choose a browsing path: by grade level, by category or pattern type, or (in the future) by searching.

**Secondary CTAs**
- Return to Homepage
- Link to a featured or recommended list directly from the library surface

**Typical Arrival Paths**
- Homepage (via "Browse Lists" or equivalent)
- Organic Google search ("spelling word lists for kids", "free spelling lists")
- Direct URL navigation from a bookmark or shared link
- Internal navigation from within the site

**Key Sections**
1. A brief orienting statement — what the library contains and how it is organized
2. Grade-level browsing path — for parents looking by school year
3. Category/pattern browsing path — for educators and parents looking by skill type (phonics, high-frequency words, challenge, etc.)
4. A small number of featured or recommended lists for visitors who don't know where to start

**Information Hierarchy**
The browsing paths should be the most prominent content. Each path should be described clearly enough that a visitor immediately knows whether it is right for them. The library's job is routing, not showcasing — resist the temptation to make it a dense visual catalog of every list.

**Internal Linking Expectations**
- Links to each Grade Hub
- Links to each Category Hub
- Links to a handful of featured List Detail pages
- Link back to Homepage

**SEO Role**
Moderate. This page captures broad search queries ("free spelling word lists") and acts as a hub page that passes link equity to Grade Hubs and Category Hubs. It is not the primary destination for any specific keyword.

**AEO/GEO Role**
Low direct AEO value. AI assistants are more likely to surface specific grade or category pages than a general library index. The library's AEO role is indirect: by clearly linking to and describing Grade Hubs and Category Hubs, it helps search engines understand the breadth and organization of the content.

**Ad Placement**
Ads are acceptable here, but must be low-prominence. They should never appear between or alongside the primary browsing path choices, where they would disrupt navigation.

**Success Metrics**
- User selects a Grade Hub or Category Hub and continues browsing
- User navigates directly to a featured List Detail page
- Visitor clearly understands what kind of content the library contains

**Unique UX Principles**
The Spelling Library is a navigation surface, not a content destination. It should feel like a clear, well-organized table of contents — not an overwhelming catalog. Visitors should leave feeling oriented and directed, not overwhelmed by choice.

---

### 3. Grade Hub — e.g. `/spelling-lists/grade-2`

**Purpose**
The Grade Hub answers the most common parental question: "What spelling words should my child practice this year?" It aggregates all curated lists for a specific grade level, briefly explains what makes grade-level lists useful, and routes visitors to individual List Detail pages.

**Primary Audience**
Parents of children in a specific grade, looking for appropriately leveled word practice.

**User Intent**
- "My child is in second grade. What lists should we use?"
- "I want grade-appropriate spelling words, not too hard and not too easy."

**Primary CTA**
Select a list from the grade's collection and navigate to its List Detail page.

**Secondary CTAs**
- Navigate to an adjacent grade hub (one grade up or down)
- Return to the Spelling Library

**Typical Arrival Paths**
- Organic Google search ("2nd grade spelling words", "grade 3 spelling list free")
- Spelling Library browse
- AI assistant recommendation for a specific grade

**Key Sections**
1. A clear statement of what this grade's lists cover and what age range they suit
2. The full collection of lists at this grade level, each with a brief description of its focus
3. Guidance on how to choose between lists if there are multiple (e.g., phonics-focused vs. high-frequency word-focused)
4. Links to adjacent grades for parents whose children are working above or below grade level

**Information Hierarchy**
The list collection is the most important content. Supporting explanation (what grade-level lists are, how to use them) is valuable but should not bury or delay access to the lists themselves. A parent in a hurry should be able to scan and select a list within seconds.

**Internal Linking Expectations**
- Links to all List Detail pages at this grade level
- Links to adjacent Grade Hubs
- Link to Spelling Library
- May link to relevant Teaching Guides

**SEO Role**
High. Grade Hubs are primary organic traffic targets for queries like "2nd grade spelling words" and "spelling lists for grade 3." Each Grade Hub should be substantive enough to rank on its own merits — not a thin index page, but a useful resource in its own right.

**AEO/GEO Role**
High. AI assistants frequently answer grade-level spelling questions by recommending specific resources. A well-structured Grade Hub page — with clear descriptions of what words appear and why — is exactly the kind of content an AI will cite or summarize. Structured data describing the grade level and list contents is important here.

**Ad Placement**
No ads on Grade Hub pages. These pages are trust-critical discovery experiences. Parents evaluating whether to trust this site for their child's education should not encounter ads on the page that introduces them to the content.

**Success Metrics**
- User selects a list and navigates to a List Detail page
- User understands what distinguishes the available lists and can make an informed choice
- Returning user finds their preferred list quickly

**Unique UX Principles**
Grade Hubs must communicate clearly that the content is appropriate for that grade — not dumbed down, not overwhelming. The tone should be that of a knowledgeable, calm educator who understands what children at each grade level need, not a marketing page.

---

### 4. Category Hub — e.g. `/spelling-lists/phonics`

**Purpose**
The Category Hub introduces a skill-based or content-type family of spelling lists (phonics, high-frequency words, challenge words, etc.) and routes visitors to specific lists within that category. Unlike the Grade Hub, which is organized around a child's age and year in school, the Category Hub is organized around a learning method or vocabulary type.

**Primary Audience**
Teachers, homeschooling parents, and educators who are familiar with curriculum terminology and looking for a specific type of word list.

**User Intent**
- "I need phonics spelling lists that focus on vowel patterns."
- "What high-frequency word lists do you have for kindergarten through third grade?"
- "I want challenge words for advanced spellers."

**Primary CTA**
Select a list from the category and navigate to its List Detail page.

**Secondary CTAs**
- Navigate to a related Category Hub
- Return to the Spelling Library

**Typical Arrival Paths**
- Organic Google search ("phonics spelling lists", "Dolch high-frequency word list", "challenge spelling words")
- Spelling Library browse
- AI assistant recommendation for a specific learning approach
- Teaching Guide internal links

**Key Sections**
1. A clear explanation of what this category is and how it differs from other categories (e.g., "Phonics lists focus on spelling patterns and sound-letter relationships, not grade level")
2. The collection of lists in this category, organized by progression or difficulty where applicable
3. Guidance on how to use this type of list effectively (brief — deeper content belongs in Teaching Guides)
4. Links to related categories

**Information Hierarchy**
The category explanation comes first — many visitors may arrive from a search query and need confirmation they're in the right place. The list collection follows immediately. Related categories are a useful footer.

**Internal Linking Expectations**
- Links to all List Detail pages in this category
- Links to related Category Hubs
- Link to Spelling Library
- Links to relevant Teaching Guides

**SEO Role**
High for category-specific queries. Category Hubs capture educator and parent searches for specific word list types. They also pass link equity to List Detail pages.

**AEO/GEO Role**
High. AI assistants are frequently asked definitional and comparative questions ("What's the difference between high-frequency words and phonics words?") that a well-written Category Hub can answer. These pages should be written to inform, not just to route — they can be cited as authoritative explanations of curriculum categories.

**Ad Placement**
No ads on Category Hub pages. Like Grade Hubs, these are evaluation and discovery pages where trust matters more than monetization.

**Success Metrics**
- User selects a list and navigates to a List Detail page
- User understands what the category covers and can distinguish it from related categories
- Educator arrives from a specific curricular need and finds an appropriate list

**Unique UX Principles**
Category Hubs must speak with authority. A teacher who knows what a "digraph" is should not feel talked down to. At the same time, a parent who does not know curriculum terminology should not feel excluded. The language should be clear and educational without being condescending or jargon-heavy.

---

### 5. List Detail — `/spelling-lists/{category}/{slug}`

**Purpose**
The List Detail page is the center of the product. It is where curated word lists live, where visitors evaluate whether a list is right for their child or student, and where they choose to begin practicing. Almost every user journey ends here before starting the Practice Session.

**Primary Audience**
Parents and teachers evaluating a specific list; older children (grades 3+) may browse independently. A child's first interaction with any specific list is almost always mediated by an adult.

**User Intent**
- "Is this the right list for my child's needs?"
- "What words are on this list?"
- "I'm ready to practice. Start the session."

**Primary CTA**
Start a practice session using this list.

**Secondary CTAs**
- Browse related lists (next in progression, same skill focus, same grade)
- Navigate to the parent Grade Hub or Category Hub
- Print or share the word list

**Typical Arrival Paths**
- Organic Google search (the most common path — specific list name queries)
- AI assistant recommendation for a specific list
- Grade Hub navigation
- Category Hub navigation
- Related List link from another List Detail page
- Teaching Guide recommendation
- Shared URL

**Key Sections**
1. The list name and a brief, honest description of who it is for and what it covers
2. The complete word list — clearly presented and easy to review at a glance
3. Context for why this list exists and how to use it well (a brief "how to use this list" note)
4. Related lists — next in progression, similar in skill focus, or adjacent in grade level
5. A link back to the parent Grade Hub or Category Hub

**Information Hierarchy**
The word list itself is the most important content — it is why the visitor came. The Start Practice CTA must be highly visible and always accessible. The description and context support the visitor's evaluation. Related lists help with discovery after the primary decision is made.

**Internal Linking Expectations**
- Link to the Practice Session (via Start Practice CTA)
- Links to related and next lists in the progression
- Link to parent Grade Hub
- Link to parent Category Hub
- May link to a relevant Teaching Guide

**SEO Role**
High — this is the site's primary organic traffic driver. Each List Detail page targets a specific keyword phrase (e.g., "Dolch first grade high-frequency words", "short vowel CVC words for second grade"). The page must be substantive and accurate: the word list itself is the content, and its presence makes the page genuinely useful for search visitors.

**AEO/GEO Role**
High. List Detail pages are among the most likely to be cited or summarized by AI assistants answering queries like "What words are on the Dolch second grade list?" or "What are some common phonics words for first grade?" Structured data clearly marking the list name, grade level, category, and word contents is important for AEO. The page should be written so that an AI can extract a clean, accurate summary.

**Ad Placement**
Ads are acceptable, but placement is carefully constrained. Ads should never appear within or immediately adjacent to the word list, the Start Practice CTA, or the "how to use this list" section. Appropriate positions are below the fold, in a sidebar context (if one exists in the future design), or below the related lists section. The educational content must never feel cluttered or undermined by ads.

**Success Metrics**
- User begins a practice session
- User discovers and navigates to another relevant list
- Visitor accurately evaluates whether the list fits their needs (even if they navigate away — a well-informed exit is still a success)

**Unique UX Principles**
The List Detail page is an evaluation page first and a launch pad second. Visitors should be able to make a confident decision — "yes, this is right for us" — before committing to a session. The page should never feel like it is pressuring the visitor into starting; it should feel like a calm, informative preview. Trust in the content is what drives the click.

---

### 6. Practice Session — `/play`

**Purpose**
The Practice Session is the product's core experience — the moment of actual learning. Its entire job is to create an environment where a child can hear a word, think about it, and type it, without distraction, pressure, or anxiety. Every design decision on this page flows from that single purpose.

**Primary Audience**
Children ages 6–10 (the primary, unmediated user of this page — the only page in the product where this is true). A parent or teacher may be nearby but is typically not interacting.

**User Intent**
Practice spelling words by listening and typing, one word at a time, until the list is complete.

**Primary CTA**
The practice loop itself: hear the word, type the word, confirm, move to the next word. There is no separate call to action — the flow is the experience.

**Secondary CTAs**
- Hear the word again (replay)
- Exit the session (clearly available but not prominent)

**Typical Arrival Paths**
- List Detail page (via the Start Practice CTA)
- Homepage (via custom word entry)
- Bookmarked session URL
- Shared session link

**Key Sections**
1. The current word display / audio interface — what the child hears and responds to
2. The typing input — where the child types their answer
3. Feedback — calm, clear confirmation of correct or incorrect
4. Progress indication — how far through the list the child is (without countdown pressure)
5. Session completion — a calm, encouraging end state

**Information Hierarchy**
The current word and the typing input are the entire experience. Everything else — progress, feedback, navigation — is secondary and should not compete for attention. The page should feel almost empty of visual complexity. The child's focus should never be divided.

**Internal Linking Expectations**
- One exit path back to the referring page or the homepage (clearly available but not prominent during the session)
- No outbound links during the session
- Session completion may offer a link to the List Detail page or to a related list

**SEO Role**
None. The Practice Session is not a content page and is not indexed for search. Its URL contains encoded list data and is not a canonical destination for any keyword.

**AEO/GEO Role**
None directly. The Practice Session is an interactive experience, not an informational page.

**Ad Placement**
No ads, ever, on the Practice Session page. This is the core learning moment — the reason the product exists. Ads during practice would undermine the calm, distraction-free experience that defines the product's value. This is a permanent, non-negotiable constraint.

**Success Metrics**
- User completes the full practice session
- User chooses to practice another list immediately after completing one
- Child experiences no confusion, anxiety, or frustration during the session flow

**Unique UX Principles**
The Practice Session is the only page in the product designed primarily for a child, without an adult intermediary. It must be immediately understandable by a six-year-old who cannot read complex instructions. There is no timer. There are no points. Mistakes are acknowledged calmly and the child moves on. The session has a clear beginning and a clear, rewarding end. The interface should feel as quiet and focused as a workbook. When the child is typing, nothing on the page should distract them.

---

### 7. Teaching Guide — e.g. `/guides/how-to-teach-spelling`

**Purpose**
Teaching Guides are long-form authority content for educators and engaged parents. Their purpose is to build trust and demonstrate expertise, while naturally leading visitors toward the curated spelling lists. They are an educational resource first and a discovery surface second.

**Primary Audience**
Teachers, homeschooling parents, and education-interested parents looking for classroom strategies, teaching methods, or explanations of why spelling practice matters.

**User Intent**
- "How should I structure spelling practice at home?"
- "What's the best way to teach a child who struggles with phonics?"
- "I want to understand the approach before I commit to a site."

**Primary CTA**
Navigate to a related spelling list and begin practicing.

**Secondary CTAs**
- Browse other Teaching Guides
- Navigate to the Spelling Library

**Typical Arrival Paths**
- Organic Google search ("how to teach spelling at home", "spelling strategies second grade")
- AI assistant recommendation for pedagogical questions
- Internal links from List Detail pages or the Spelling Library
- Social sharing or educator referral

**Key Sections**
1. A clear, authoritative explanation of the topic covered by the guide
2. Practical strategies or guidance that a teacher or parent can act on
3. Connections to specific list types or categories that support the approach described
4. Links to relevant curated lists
5. Links to related Teaching Guides

**Information Hierarchy**
The educational content comes first and must be substantive — a brief paragraph is not a Teaching Guide. The list recommendations come after the content has delivered genuine value. The page should never feel like a thin pretext for linking to lists.

**Internal Linking Expectations**
- Links to relevant List Detail pages (multiple, with context for each)
- Links to Grade Hubs or Category Hubs where applicable
- Links to related Teaching Guides
- Link to Spelling Library

**SEO Role**
High for long-tail educational queries. Teaching Guides are designed to capture searches that Grade Hubs and List Detail pages cannot — broader, more pedagogical questions. They also build the site's topical authority, which benefits all pages.

**AEO/GEO Role**
High. AI assistants frequently answer teaching-strategy questions by summarizing authoritative content. A well-written Teaching Guide — clear structure, concrete advice, honest framing — is exactly what an AI will cite or paraphrase. These pages should be written to inform completely, not to tease content that requires further navigation.

**Ad Placement**
Ads are acceptable on Teaching Guides. Placement should be between content sections, never at the top of the page, and never adjacent to key teaching content. The page must feel like a resource, not an ad vehicle. Ad density should be low — one or two placements per guide at most.

**Success Metrics**
- User navigates to a spelling list from within the guide
- User bookmarks or shares the guide
- Returning visitor arrives at the guide and then enters the product more deeply

**Unique UX Principles**
Teaching Guides must earn the visitor's trust through genuine educational value before asking anything of them. They are the product's way of saying "we understand your world." A guide that oversimplifies, pads content, or exists primarily for SEO undermines the trust that the rest of the product depends on.

---

### 8. About / Philosophy — `/about`

**Purpose**
The About page builds trust by explaining who made this site, why it exists, and what it will never become. It is not a marketing page — it is a statement of values for parents who want to understand what they are putting in front of their child.

**Primary Audience**
Parents evaluating the site for the first time, often arriving after seeing it recommended or after using it briefly and wanting to know more.

**User Intent**
- "Who made this? Are they trustworthy?"
- "Is there a catch? What's the business model?"
- "Does this site share my child's data?"

**Primary CTA**
There is no transactional CTA. The implicit call to action is: feel confident enough to explore the library or recommend the site to others.

**Secondary CTAs**
- Browse the Spelling Library
- Read a Teaching Guide

**Typical Arrival Paths**
- Homepage or footer link
- Direct search for the site name or "spellingwords.app about"
- After a positive practice session, an adult wanting to learn more

**Key Sections**
1. A clear, human statement of why the site was made
2. The product's values: no gamification, no timers, no accounts, no data collection
3. The editorial approach: hand-curated lists, no AI generation, original sentences
4. A brief, honest explanation of how the site supports itself (ads, if applicable)
5. An invitation to continue into the product

**Information Hierarchy**
Honesty first. The visitor came to evaluate trust — give them what they need immediately. Avoid burying important details (like ad-supported nature) at the bottom of a wall of idealistic copy.

**Internal Linking Expectations**
- Link to the Spelling Library
- Link to Teaching Guides
- Link to relevant List Detail pages (as examples of the editorial approach)

**SEO Role**
Low direct SEO value. The About page supports branded trust signals and may appear in search results for the site name. It is not optimized for any educational keyword.

**AEO/GEO Role**
Moderate. AI assistants recommending the site may pull descriptive content from the About page to summarize what the product is. The opening description should be accurate, specific, and quotable.

**Ad Placement**
No ads on the About page. A page about editorial integrity and trustworthiness should not be visually interrupted by advertising.

**Success Metrics**
- Visitor gains confidence and continues into the product
- Visitor shares the site with another parent or educator
- Visitor's specific trust concern is addressed (no data collection, no accounts, etc.)

**Unique UX Principles**
The About page is one of the most consequential pages on the site for trust. A parent who reads it and feels reassured is more likely to use the site regularly and recommend it to others. A parent who reads it and feels like they're being marketed to will leave. Write for the skeptical parent, not the already-converted user.

---

### 9. Word Pages (Future) — `/words/{word}`

**Purpose**
Word Pages are individual reference pages for specific words in the vocabulary (e.g., `/words/because`). Their primary purpose is to answer simple, direct questions that a parent, student, or AI system might ask: "How do you spell this word?", "What grade is this word taught?", "What lists contain this word?" They are utility pages, not practice entry points.

**Primary Audience**
People who searched for a specific word — a parent checking spelling, a student looking up a word they encountered, an AI assistant retrieving structured data.

**User Intent**
- "How do you spell [word]?"
- "What grade level is [word] typically taught?"
- "Is there a spelling list that includes [word]?"

**Primary CTA**
Navigate to a spelling list that includes this word.

**Secondary CTAs**
- Navigate to a related word
- Browse the Spelling Library

**Typical Arrival Paths**
- Organic Google search ("how do you spell because", "is 'because' a high-frequency word")
- AI assistant query routing
- Internal links from List Detail pages (future — "see all words in this list")

**Key Sections**
1. The word, clearly and prominently displayed, with any relevant phonetic or pronunciation guidance
2. Grade level and category context (e.g., "commonly taught in grades 1–2, phonics and high-frequency word lists")
3. Curated lists that include this word
4. Related words (similar pattern, same grade band, commonly confused with)

**Information Hierarchy**
The word itself and its basic factual attributes come first. List links follow. Related words are a discovery bonus. The page should feel like a clean, fast reference card — not a full article or a landing page.

**Internal Linking Expectations**
- Links to List Detail pages that include the word
- Links to related words (same phonics pattern, same grade band)
- Link to relevant Grade Hub or Category Hub
- Breadcrumb or navigation back to the Spelling Library

**SEO Role**
Moderate to high at scale. Any individual word page has modest SEO value, but a large, well-structured set of word pages creates meaningful topical coverage and internal linking density. Long-tail queries ("how do you spell because for kids") can aggregate to significant traffic.

**AEO/GEO Role**
High — this is the primary purpose of Word Pages. AI assistants and AI-powered search overviews frequently answer direct spelling and vocabulary questions by pulling from structured, authoritative sources. A Word Page with clear, structured content (word, definition context, grade level, related lists) is exactly what those systems index and cite. Word Pages should be designed so that an AI can extract a clean, complete answer without navigating further.

**Ad Placement**
Ads are acceptable on Word Pages, but should be minimal and unobtrusive. These are fast utility pages — the visitor wants an answer, not a browsing experience. Heavy advertising would drive bounce rates and reduce the AEO value of the page. One small, non-intrusive placement is appropriate.

**Success Metrics**
- Visitor gets their question answered (the word is correct, the grade level is accurate)
- Visitor continues to a related spelling list
- Page is cited or summarized by an AI assistant as an authoritative source

**Unique UX Principles**
Word Pages are designed to answer a question in under five seconds. The design should support that: fast loading, immediate clarity, no friction. They are reference tools, not experiences. A visitor who gets their answer and leaves has been well served. A visitor who gets their answer and then discovers a relevant spelling list has been exceptionally well served.

---

## Site-wide UX Principles

These principles apply to every page on spellingwords.app. They are not implementation guidelines — they are commitments about the experience the product provides.

**1. Every page has one obvious primary action.**
No page should leave a visitor uncertain about what to do next. The primary action may be "start practicing," "choose a list," "read this guide," or "understand what this site is" — but it must be unambiguous.

**2. Practice is never more than a few steps away.**
From any page in the product, a visitor should be able to reach the Practice Session in no more than three steps. Discovery pages lead to lists; lists lead to practice.

**3. Discovery pages lead naturally into practice.**
Grade Hubs, Category Hubs, and the Spelling Library exist to help visitors find the right list. Their success is measured by how effectively they route visitors to List Detail pages and from there to practice — not by how engaging they are on their own.

**4. Authority pages educate first and invite practice second.**
Teaching Guides and the About page build trust through substance. They should never feel like thin content designed to funnel visitors into the product. Genuine educational value comes first; invitations to practice follow naturally.

**5. Children should never feel lost or overwhelmed.**
The Practice Session is designed primarily for children. It must be immediately understandable, calm, and forgiving. A child who makes a mistake should feel gently corrected, not penalized. A child who completes a session should feel accomplished, not ranked.

**6. Parents should immediately understand what to do.**
Parents arriving at the homepage, a Grade Hub, or a List Detail page should be able to orient, evaluate, and decide within seconds — without reading long explanations or navigating multiple levels to understand the product.

**7. Adults and children share the experience without conflict.**
Most pages are used by an adult and child together. The experience should be equally legible to both: the adult can evaluate and navigate; the child can participate and engage. Neither should feel like a second-class user.

**8. The experience is calm, warm, and distraction-free.**
No urgency. No countdown timers. No streaks to protect. No loud celebrations or harsh failure states. The product should feel like sitting down at a workbook, not launching a game.

**9. Trust is built through transparency, not persuasion.**
The product never hides its business model, its data practices, or its editorial standards. Parents who ask "what's the catch?" should get a clear, honest answer. Trust earned through transparency lasts; trust manufactured through clever copy does not.

**10. Ads support the product but never interrupt learning.**
Advertising is an acceptable and honest part of the product's sustainability. Ads appear on discovery and reference pages where they do not interrupt the educational experience. Ads never appear during the Practice Session. Ad placement never crowds or undermines educational content on any page.

**11. Mobile and desktop are equally important.**
The product is used on phones, tablets, and computers — often with a child on a tablet while a parent manages things on a laptop. Every page must work well at any screen size. No page is "desktop-first" or "mobile-only."

**12. Accessibility is a product feature.**
The product serves children, including children with learning differences, visual impairments, or motor challenges. Accessibility is not a compliance checkbox — it is part of the product's core commitment to every child who might benefit from spelling practice.

**13. Fast loading is a product feature.**
A slow page is a frustrating page. This is especially true for children and for visitors on lower-bandwidth connections. Performance is a design constraint, not an afterthought.

**14. The experience scales gracefully from first visit to hundredth.**
A first-time visitor should feel welcomed and oriented. A returning visitor should be able to get to practice quickly without re-navigating the entire discovery flow. The product should feel familiar and efficient to regular users without being opaque to newcomers.
