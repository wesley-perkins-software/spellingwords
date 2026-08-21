# Launch supporting pages and global navigation plan

**Status:** implementation plan based on the production repository as audited on 2026-08-21  
**Scope:** supporting pages, global navigation, launch privacy facts, and implementation sequencing  
**Out of scope:** changing curriculum, canonical grade/Skill routes, Direction A color semantics, adding ads, or writing final legal copy

## Executive decisions

Before launch, publish four canonical supporting pages—`/about`, `/curriculum`, `/privacy`, and `/terms`—plus a carefully scoped `/accessibility` statement after an accessibility verification pass. Do not create `/contact` until a real, maintainable public channel exists. Do not create a standalone FAQ, help center, global Core/HFW/Themed hub, or HTML sitemap: the current product does not give any of those a distinct job.

Make Grades a simple desktop disclosure menu with the six real Grade Hubs and `View all grades` linking to `/#grades`. Keep Skills as one direct link to `/skills`; the canonical hub already presents all 41 Skills in their frozen 12-family taxonomy, and a partial header taxonomy would add complexity without a clear user benefit. Replace `How it Works` with `Curriculum`. Keep the coral action labeled `Start practicing` where space permits and `Practice` in compact mobile chrome.

Expand the footer into four restrained groups: SpellingWords, Grades, Explore, and Legal. Link only to canonical destinations that exist. In particular, do not invent grade-independent Core Spelling, High-Frequency Words, or Themed Spelling Practice URLs.

The largest launch blocker found in this audit is analytics architecture, not legal-page wording: **GA4 is not currently installed anywhere in this repository.** There is no measurement ID, tag loader, event call, environment filter, or consent mechanism. Custom words are currently encoded into the `/play?list=...` URL. Consequently, installing a default GA4 page-view tag on `/play` could transmit that encoded free text in `page_location`. Analytics must therefore redact the query string (and any referrer that can contain it) before the first production GA page view is allowed. Final Privacy copy must follow—not precede—that implementation decision.

---

## A. Current-state inventory

### A1. Production routes and supporting pages

The production route set is currently:

- `/` — homepage, own-word entry, Grade entry points, curriculum summary, Skills entry point, audiences, and homepage FAQ;
- `/play` — interactive practice;
- six Grade Hubs: `/kindergarten`, `/1st-grade`, `/2nd-grade`, `/3rd-grade`, `/4th-grade`, `/5th-grade`;
- 18 grade/strand gateways under `/{grade}/{strand}` (Core Spelling, High-Frequency Words, and Themed Spelling Practice for each grade);
- canonical grade-unit detail routes under `/{grade}/{strand}/{slug}`;
- `/skills` and 41 canonical `/skills/{slug}` reference pages;
- `/sitemap.xml`.

The many `/design-explore/...` files are design prototypes, not part of the intended production information architecture. They are nevertheless statically routable under the current Astro build. Their launch disposition should be handled separately (remove from production output, gate, or add `noindex`); they must not be linked from global navigation or included in the sitemap.

No production route exists for:

- About;
- Privacy Policy;
- Terms of Use;
- Accessibility Statement;
- Contact;
- Curriculum/methodology;
- standalone FAQ/help;
- HTML sitemap/navigation directory.

There is one currently broken global promise: the footer links to `/privacy`, but no `src/pages/privacy.astro` exists and `/privacy` is absent from the generated sitemap. This is not a legacy Privacy page; it is a link to an absent page. Correct it by implementing the audited policy, not by removing the need for one.

There is also no custom `404.astro` or `robots.txt`. These are launch utilities rather than editorial supporting pages, but a branded 404 and an explicit robots file referencing `/sitemap.xml` should be included in launch hardening.

### A2. Current header

`SiteHeader.astro` has two variants:

1. **Discovery header** (all content/discovery pages): sticky Direction A header with `Sw` mark and visible `SpellingWords` wordmark; desktop-only navigation (`md:block`) for `Grades` → `/#grades`, `Skills` → `/skills`, and `How it Works` → `/#how-it-works`; and a coral homepage CTA. It renders `Practice` below `sm` and `Start practicing` at `sm` and above.
2. **Practice header** (`/play`): intentionally minimal wordmark plus `← New list`, both returning to `/`. Preserve this low-distraction exception.

Current desktop navigation is understandable but makes users return to the homepage before choosing a grade. Current mobile has **no navigation menu at all**: primary nav is hidden below `md`, leaving only the logo and practice CTA. Active-state handling exists only for Skills; grade pages and homepage sections do not receive meaningful active state.

The coral CTA currently points to `/`, which is appropriate because own-word entry is the first actionable homepage content. The label capitalization differs from nearby editorial style (`Start Practicing` inside the hero versus `Start practicing` in the header); global chrome should use sentence case.

### A3. Current footer

`SiteFooter.astro` is one wrapping row with:

- identity sentence: `SpellingWords.app — free K–5 spelling practice by grade or skill, no account required.`;
- current year;
- links to Grades, Skills, How it Works, and the nonexistent Privacy route.

It does not expose Grade Hubs, About/methodology, Terms, or accessibility information. The lean treatment fit an earlier site, but it no longer reflects the mature Grade + Skill architecture.

### A4. Analytics and external data flow

#### Confirmed current engineering facts

- **No GA4 implementation exists.** No `gtag.js`, Google Tag Manager container, Measurement Protocol call, Google Analytics package, measurement ID, environment variable, custom event helper, or analytics event appears in production source/configuration.
- Therefore GA currently runs in **no environment**—not production, branch deploys, or deploy previews—and sends **no standard or custom GA events**.
- There is no deploy-preview/hostname filtering because there is no analytics loader.
- There is no consent banner, consent state, Consent Mode call, or analytics opt-out control.
- The application itself does not set cookies and contains no `document.cookie` access.
- The application does not use `localStorage`. It uses `sessionStorage` only for curated practice sessions: `sw:words:{payload}` stores the structured word objects and `sw:title:{payload}` stores the list/Skill title. These values remain in the current tab's browser session under the current implementation.
- Own-word input is parsed and base64url-encoded client-side into `/play?list={payload}`. The encoding is reversible transport, **not encryption**. The words therefore exist in browser history, the address bar, copied URLs, screenshots, and potentially referrer/server/CDN logs depending on deployment behavior.
- Curated Grade Unit and Skill sessions also put an encoded list in the same `list` query parameter. Their richer hints/examples/title remain in `sessionStorage`; the word spellings themselves remain recoverable from the URL.
- `/play` reads the query locally, decodes it locally, and runs the session locally. Typed spelling answers, correctness, attempts, and results are held in page memory; no persistence or explicit network submission was found.
- The practice experience uses the browser Web Speech Synthesis API. The repository makes no direct speech-service API call and selects a browser-provided voice. Whether a specific browser/OS implements a voice locally or via an operating-system/vendor network service is outside this codebase and must not be represented as guaranteed local processing.
- Production pages load CSS/font resources from Google Fonts (`fonts.googleapis.com` and `fonts.gstatic.com`). Those requests disclose ordinary request metadata such as IP address, user agent, requested resource, and referrer subject to browser behavior. An additional global CSS `@import` requests other Google font families even though the production Layout separately requests its Direction A families; this should be rationalized or self-hosted in privacy/performance hardening.
- No `fetch`, XHR, beacon, form action, embedded iframe/service, error-monitoring SDK, ad script, social embed, payment integration, backend/API, database, or server-side application state was found in production code.
- Hosting is configured as a static Astro build deployed through Netlify configuration. Repository code does not reveal the contents or retention of Netlify edge/access/deploy logs; that operational fact must be verified in the hosting account before Privacy copy is finalized.

#### Accounts and direct identifiers

There is no account, login, registration, authentication, profile, database, cloud save, contact form, email field, name field, school field, payment field, or other intentionally collected personally identifying form field. The only free-text product field is the spelling-word textarea, and the only in-session answer field is the typed spelling response.

#### What changes when GA4 is added

Standard GA4 collection can process online identifiers and request/device metadata, including GA cookies or device identifiers, IP address for geolocation/processing, user agent/browser/device information, language, approximate geography, page/view/referrer information, and interaction timing. The exact set depends on tag configuration, consent state, Google Signals/advertising settings, granular location/device settings, retention settings, and property configuration. These are launch configuration decisions, not current repository facts.

GA must not be implemented as an unconditional default page-view tag. On own-word practice, the URL contains reversible user-entered educational free text. A default `page_view` commonly includes `page_location`; the `/play?list=...` value could therefore leave the browser. Referrer capture can propagate the same URL when a user navigates away. This is a **high-priority privacy issue to prevent**, not a confirmed current leak: because GA is absent today, entered words currently reach no GA endpoint.

### A5. Child-directed privacy implications

#### Confirmed facts

- The product is designed for K–5 children, and internal product documentation identifies children roughly ages 6–10 as the primary audience.
- Children can use the service directly without an adult gate or account.
- Free text can include arbitrary content even though the UI asks only for spelling words.
- No ads, accounts, profiles, direct-identifier forms, behavioral custom events, or current analytics tags exist.
- Google-hosted fonts receive browser requests; intended launch GA4 would introduce materially more measurement processing.

#### Likely product/privacy implications

- Data minimization should be a design constraint, not merely Privacy copy. In particular, query-bearing `/play` URLs must be excluded/redacted from all analytics and avoidable logs.
- No custom event should contain a word, answer, list payload, list title supplied by a user, full URL, or unbounded text.
- A child-friendly product increases the importance of conservative defaults: no Google Signals, ad personalization, User-ID, audience activation, cross-service linking, or unnecessary retention at launch.
- The own-word field should continue to request spelling words only and should not invite names or other personal information.

#### Questions for specialized legal review

- Whether and how COPPA and state child/privacy laws apply to this particular child-directed service and its launch analytics configuration;
- whether prior verifiable parental consent is required for any proposed GA identifiers/cookies, or whether analytics should operate only after a different consent/design choice;
- appropriate Google Analytics property/data-collection settings and whether GA is an acceptable launch processor for this audience at all;
- required disclosures, retention, deletion/rights handling, and how requests can be accepted if the operator provides no public contact channel;
- whether a privacy contact method is legally required in the operator's jurisdictions even though a general Contact page is not a product requirement;
- whether Netlify and Google Fonts operational processing changes the required disclosures.

Do not claim COPPA compliance, an exception, a WCAG conformance level, or legal sufficiency without this review.

### A6. Curriculum and editorial source material

The public-facing pages should synthesize, not copy, the repository's internal standards:

- `CURRICULUM_PHILOSOPHY.md` defines the spelling-specific inclusion test, boundaries from vocabulary/general literacy, progression spine, and educational-integrity principle.
- `PRODUCT_VISION.md` defines the calm practice experience, student/parent/teacher audiences, frontend-only/no-account posture, and topical scope.
- `CONTENT_STANDARDS.md`, the editorial system, source map, research summary, and curriculum audits document word selection, source/review expectations, duplication rules, and editorial QA.
- the canonical curriculum and Grade Hub standards define K–5 progression and the distinct roles of Core Spelling, High-Frequency Words, and Themed Spelling Practice.
- `SKILLS_ARCHITECTURE.md` and production `spellingSkills.ts` define the frozen 41-Skill, 12-family, grade-independent reference taxonomy.

**About owns:** identity, audience, purpose, narrow spelling scope, calm/no-account product model, and a short map of practice + grades + Skills.  
**Curriculum owns:** the educational rationale, progression, strand roles, grade-independent Skill relationship, selection/editing methodology, U.S. elementary positioning with appropriate limits, and exclusions. It should translate internal standards into parent/teacher language and avoid exposing internal filenames, frozen-contract terminology, SEO ambitions, or implementation details.

---

## B. Recommended canonical supporting pages

| Route            | Page title                  | Purpose and audience                                                                                                          | Content ownership / non-duplication                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Launch priority                                                                                                                    | Global placement                                                                                     |
| ---------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `/about`         | **About SpellingWords**     | Explain what the site is, why it exists, and who it serves; useful to parents, teachers, press/linkers, and trust evaluators. | Own identity, K–5 spelling-only scope, calm practice approach, no-account model, and the relationship among own-word practice, Grade curriculum, and Skills. Do not reproduce the homepage hero, all Grade summaries, taxonomy lists, FAQs, or detailed methodology. Link onward to Curriculum, Privacy, and practice.                                                                                                                                                                                                                                                                             | **Launch**                                                                                                                         | Footer; mobile menu. Not needed in the compact desktop primary row.                                  |
| `/curriculum`    | **Our Spelling Curriculum** | Make educational method and editorial trust legible to parents and teachers.                                                  | Own K–5 progression; Core/HFW/Themed roles; grade-independent Skills; selection/inclusion test; editorial/research approach; U.S.-elementary positioning with explicit non-universal/non-standards-alignment boundaries; and what the site does not teach. Summarize and link to Grade Hubs and `/skills`; do not duplicate each Grade Hub's grade-specific path, each Skill's teaching reference, or all word lists.                                                                                                                                                                              | **Launch**                                                                                                                         | Desktop header, mobile menu, footer. Contextually linked from homepage curriculum summary and About. |
| `/privacy`       | **Privacy Policy**          | Give parents/guardians, teachers, and users an accurate account of current data handling and third parties.                   | Own collected/processed data, purposes, word-practice data flow, storage, GA, fonts/hosting, cookies/identifiers, retention, choices/rights, children's privacy, changes/effective date, and an honest contact/rights mechanism if legally required. Do not contain marketing copy, hypothetical ad partners, Terms clauses, or unsupported compliance claims.                                                                                                                                                                                                                                     | **Launch blocker**, after GA/hosting decisions                                                                                     | Footer only; contextual link near any consent/settings UI.                                           |
| `/terms`         | **Terms of Use**            | Set proportionate rules for use of free educational content and practice tools.                                               | Own permitted personal/classroom use, informational/supplemental nature, no guarantee of universal curricular fit, acceptable use, IP/content reuse, third-party/service availability, disclaimers/limitation language proportionate to a free static site, changes, and governing-law/dispute/contact details only if counsel/operator can truthfully supply them. Do not mention subscriptions, payments, enterprise accounts, user posts, marketplaces, or nonexistent services.                                                                                                                | **Launch**; counsel review                                                                                                         | Footer only.                                                                                         |
| `/accessibility` | **Accessibility Statement** | State the product's accessibility goals and verified current behavior for disabled students, families, and educators.         | Own goals and tested features (semantic structure, skip link, keyboard operation, visible focus, contrast results, responsive/touch behavior, reduced-motion handling, and practice/audio alternatives), known limitations, testing date/scope, and improvement commitment. Do not assert WCAG A/AA conformance, certification, universal compatibility, or a feedback channel that does not exist. If no public channel exists, state that a dedicated feedback channel is not currently available rather than saying “contact us”; legal/product should decide whether launch must wait for one. | **Launch if verification is completed**; otherwise do not publish a vague placeholder and track as immediate launch-readiness work | Footer and mobile menu lower-priority section; not desktop primary row.                              |

### Pages not recommended

- **Contact:** no route and no supportable email/form/address exist. A blank or fabricated channel reduces trust. Create later only with a real owner, response expectations, spam/security plan, and privacy handling. Legal counsel must separately decide whether Privacy/Terms require a contact method.
- **Standalone FAQ/help:** the homepage and relevant detail pages already answer context-specific questions. A global FAQ would duplicate them and has no separate support workflow.
- **Global Core/HFW/Themed pages:** those are grade-specific architectures. Their canonical destinations are the 18 grade/strand gateways, not nonexistent top-level hubs.
- **HTML sitemap/navigation page:** global nav, footer, `/skills`, homepage grade grid, and XML sitemap already cover discovery. An HTML link directory would add a large repeated block without a clear human task.
- **Advertising/cookie-vendor page:** there are no ads at launch. Re-audit and update Privacy/consent before—not after—adding any ad technology.

---

## C. Header specification

### C1. Desktop discovery header (`md` and above)

Order:

1. `Sw` mark + **SpellingWords** wordmark → `/`;
2. **Grades** disclosure;
3. **Skills** → `/skills`;
4. **Curriculum** → `/curriculum`;
5. flexible space;
6. coral **Start practicing** → `/#practice` (add a stable anchor to the own-word panel/hero rather than relying only on top-of-page position).

The Grades panel contains, in canonical `gradeConfig` order:

- Kindergarten → `/kindergarten`
- 1st Grade → `/1st-grade`
- 2nd Grade → `/2nd-grade`
- 3rd Grade → `/3rd-grade`
- 4th Grade → `/4th-grade`
- 5th Grade → `/5th-grade`
- separator
- View all grades → `/#grades`

This removes a needless intermediate click while retaining a human/crawler path to the overview. It is a disclosure menu, not a mega-menu.

Keep **Skills as Option A: a direct link**. The 12 canonical families are meaningful on the hub, but selecting a subset for a small dropdown would either privilege some families without a stable product rule or make a 13-item menu (Browse all + 12 families). The direct link is simpler for students, preserves the taxonomy in its proper explanatory context, and avoids dumping 41 destinations into chrome. If behavior data later proves a family shortcut is needed, use the exact family titles/anchors produced from `SPELLING_SKILL_FAMILIES`; never create a parallel taxonomy.

Replace **How it Works** with **Curriculum**. The existing label points to an audience section rather than a process explanation. “Curriculum” accurately signals the new trust/methodology destination to adults while Grades, Skills, and the coral practice action continue to serve students directly.

### C2. Desktop disclosure behavior and accessibility

- Use a native `<button type="button">` with `aria-expanded` and `aria-controls` for Grades; do not put `role="menu"` on ordinary site-navigation links.
- The panel is an ordinary list of links. On open, leave focus on the controlling button; Tab enters links in DOM order. Arrow-key menu emulation is unnecessary for disclosure navigation.
- Toggle by click/Enter/Space; close on Escape (return focus to trigger), outside pointer interaction, selection, and focus leaving the disclosure/header.
- Hover may enhance but must not be required. Avoid delayed hover traps.
- Give every interactive target at least 44×44 CSS px where practical and clear `:focus-visible` styling.
- Apply `aria-current="page"` to the exact current Grade/Skills/Curriculum destination. A parent disclosure may be visually active while on any child Grade route.
- Prevent clipping and viewport overflow at zoom. The small panel should align below its trigger and remain above content without shifting layout.

### C3. Mobile discovery header

Primary chrome:

1. compact **SpellingWords** logo/wordmark;
2. coral **Practice** action → `/#practice`;
3. 44×44 menu button with visible label or accessible name, expanded state, and controlled panel ID.

Expanded menu:

- **Grades** nested disclosure: the six Grade Hub links plus `View all grades`;
- **Skills** → `/skills` (no family dump);
- **Curriculum** → `/curriculum`;
- secondary divider;
- **About** → `/about`;
- **Accessibility** → `/accessibility`, if published.

Privacy and Terms remain in the footer rather than primary mobile navigation.

Prefer an in-flow/collapsible panel directly beneath the sticky header over a full-screen dialog: the link set is short, this avoids overbuilt modal semantics and focus trapping, and opening can push content rather than obscure it. Requirements:

- button works with click, Enter, and Space via native semantics;
- accurate `aria-expanded`/`aria-controls`, no redundant ARIA;
- logical DOM/tab order and visible focus;
- Escape closes and returns focus to menu button;
- selecting a link closes naturally through navigation;
- outside click may close but is not the sole close path;
- closing while focus is inside moves focus to the menu button;
- nested Grades state is understandable and independently keyboard/touch operable;
- no hover dependency; 44×44 touch targets; no horizontal overflow at 320px/200% zoom;
- respect reduced-motion preferences for any panel animation.

### C4. Practice header

Retain the minimal `/play` variant and `← New list`. Do not introduce Grade/Curriculum exploration into the active spelling stage. Ensure the accessible brand name uses consistent capitalization (`SpellingWords home`).

---

## D. Footer specification

### D1. Desktop

Use a responsive four-column link area plus a bottom identity row.

**SpellingWords**

- About
- Our Spelling Curriculum
- Accessibility (only if published)

**Grades**

- Kindergarten
- 1st Grade
- 2nd Grade
- 3rd Grade
- 4th Grade
- 5th Grade

**Explore**

- Spelling Skills → `/skills`
- Practice Your Own Words → `/#practice`
- Browse all grades → `/#grades`

**Legal**

- Privacy Policy
- Terms of Use

Do not list Core Spelling, High-Frequency Words, or Themed Spelling Practice here because no canonical grade-independent destination exists. The homepage and every Grade Hub already introduce those three strands in the correct grade context. Do not add Contact.

Bottom row:

`SpellingWords.app — K–5 spelling curriculum and practice. © {year}`

This sentence uses the domain/entity form intentionally; avoid “free” as an immutable legal/footer promise if monetization could change later, while keeping the current no-account fact available on About/Privacy where maintained.

### D2. Mobile

- Stack the identity block first, then two columns where width permits and one column at narrow widths.
- Keep headings as text or headings—not links pretending to be categories.
- Do not collapse link groups into accordions; the total is modest, and visible links are more discoverable and require less interaction.
- Preserve 44px target height/spacing, visible focus, logical reading order, and adequate contrast.
- Keep copyright/identity copy last.

This footer exposes every Grade Hub, one canonical Skills hub, and the trust/legal pages without repeating 41 Skills or 18 strand gateways site-wide.

---

## E. Brand naming rule

1. **`SpellingWords` is the public brand/wordmark.** Use it in the header logo, navigation labels, UI references, page-heading phrases such as “About SpellingWords,” and casual editorial references to the product.
2. **`SpellingWords.app` identifies the website/domain or publishing entity.** Use it on first reference in formal About/Curriculum/Privacy/Terms prose—“SpellingWords.app is a K–5 spelling website…”—in canonical/metadata where a domain identity is useful, and in the footer identity sentence.
3. **Do not stylize normal prose as `spellingwords.app`** except when showing the literal URL. Do not add `.app` to the header wordmark.
4. **Legal ownership is not inferable from the domain.** Terms/Privacy must use the operator's actual legal identity if required; do not pretend `SpellingWords.app` is an incorporated entity or invent an address.
5. Titles may use either form by job: supporting-page H1s use the brand (`About SpellingWords`); homepage SEO title may retain the domain (`… | SpellingWords.app`).

---

## F. Privacy and Terms factual requirements

### F1. Privacy Policy outline (after analytics design is fixed)

1. **Scope and plain-language summary** — K–5 spelling site; no accounts; who operates the policy, using only verified identity details.
2. **Information users provide** — spelling words and typed practice answers; exactly where each is stored/transported; warn that `list` URLs are shareable/reversible rather than private.
3. **Information collected automatically** — final GA facts, hosting/access-log facts, and ordinary HTTP/device information; distinguish site code from processor behavior.
4. **How information is used** — deliver practice, operate/security/debug the static site, understand aggregate use only to the extent actually configured.
5. **Browser storage and cookies** — application `sessionStorage`; final GA cookie/identifier and consent behavior. Do not call sessionStorage a cookie or claim no cookies if GA sets them.
6. **Service providers** — Google Analytics, Google Fonts (unless self-hosted), and Netlify only as current verified services, with accurate functions; no ad partners.
7. **Children's privacy** — child-directed context, minimized collection, guidance not to enter personal information, and counsel-approved rights/consent language; no unsupported compliance declaration.
8. **Retention and deletion** — tab-session storage behavior; GA property retention setting; hosting logs; operational limits. Do not invent retention periods.
9. **Choices and controls** — consent/decline behavior, browser controls, analytics opt-out as applicable, and query-link handling.
10. **Security and international processing** — restrained, factual language; never guarantee security.
11. **Rights/jurisdictional notices** — only those counsel confirms, with a real request path if required.
12. **Changes, effective date, and contact** — real dates and a real legally sufficient channel or an explicit launch blocker; never a fabricated email/address.

Maintenance gate: Privacy and consent must be re-audited before advertising, ad measurement, additional analytics, error monitoring, forms, accounts, cloud saving, or new third parties are introduced. Future ad vendors must not be listed as present processors until actually selected and implemented.

### F2. Terms of Use outline

1. acceptance and scope;
2. eligibility/adult supervision language appropriate to children, as counsel advises;
3. educational/supplemental purpose and no universal school/district/standards guarantee;
4. permitted personal, family, homeschool, and classroom use;
5. ownership/licensing of site copy, curated lists, design, and code-facing assets; clear rules for printing/sharing if supported;
6. acceptable use (security interference, automated abuse, unlawful content in custom fields, misleading redistribution);
7. user-entered words remain the user's responsibility; no social publication or hosted UGC model should be implied;
8. third-party/browser features (including speech synthesis) and availability/change/discontinuation;
9. proportionate disclaimers and limitation of liability, counsel-reviewed;
10. governing law/disputes only with the operator's real jurisdiction and legal advice;
11. changes/effective date and a real contact mechanism only if one exists/is required.

Omit payments, refunds, subscriptions, trials, enterprise SLAs, account termination, API licensing, user profiles, social posting, marketplace sellers, and advertising terms.

---

## G. Google Analytics launch findings and requirements

### Direct answers to the audit questions

1. **Property/script mechanism:** none in repository; no GA4 measurement ID or loader exists.
2. **Injection point:** none. The shared production `Layout.astro` contains metadata, structured data, and Google Fonts only.
3. **Environments:** none. There is no production-only, deploy-preview, development, hostname, or environment-variable gate.
4. **Standard GA data currently processed:** none by GA. If GA4 is added, likely request/online identifier, cookie/device, page/referrer, browser/device/language, approximate location derived from IP, and engagement data must be documented from the final configuration.
5. **Custom events:** none.
6. **Do spelling words/free text reach GA?** Not currently, because GA is absent. However, own and curated words are reversibly encoded in the `list` query parameter, so a default future GA page view can expose them through `page_location`; outbound referrer behavior and infrastructure logs are additional review points. No words appear in event names/parameters today because no events exist.
7. **Personally identifying fields:** no name/email/account/profile/contact/payment field exists. The word field is unbounded educational free text and could contain personal information despite its intended use.
8. **Consent:** none.
9. **Identifiers/storage:** application uses sessionStorage as described; no application cookies/localStorage. Future GA cookies/device identifiers depend on implementation and consent.
10. **Child/data-minimization settings:** none because GA is absent. They must be deliberately configured before launch.

### Analytics implementation acceptance criteria

- Keep GA entirely absent until the practice URL/data flow and legal/configuration decisions below are resolved. Then obtain privacy counsel guidance on whether the intended minimal GA4 configuration qualifies for the FTC's support-for-internal-operations exception for persistent identifiers used solely for qualifying site analytics, and what notice, consent, and configuration obligations still apply. The question is not a simplistic “consent or no consent” binary; do not infer either the exception or consent from continued use.
- Load only on the canonical production hostname and production build. Exclude localhost, automated tests, design-explore routes, Netlify deploy previews, and branch deploys. Keep the measurement ID in a public build environment variable, but treat the hostname/build gate—not secrecy—as the protection.
- Ensure **no network request to GA occurs before safe configuration is applied**. Do not let the automatic config page view race ahead.
- Send a manually constructed page path/location that strips all query parameters and fragments. For `/play`, report only `/play`. Also prevent a query-bearing document referrer from being sent; test navigation from `/play?list=...` to another tracked page.
- Never send the raw `list` value, decoded word, typed answer, hint, example sentence, user-supplied title, textarea content, sessionStorage key/value, full URL, or other free text in an event name, parameter, user property, dimension, or log.
- Initial custom-event allowlist should be minimal and bounded, for example `practice_start` with a coarse source enum (`custom`, `grade_unit`, `skill`) and perhaps a numeric word-count bucket—not exact text/list payload. Do not send correctness per word. A no-custom-event launch is acceptable.
- Disable Google Signals, ads personalization, User-ID, enhanced measurement features that are not explicitly needed, and data sharing/linking not approved for launch. Evaluate granular location/device collection controls in GA Admin.
- Choose the shortest practical event/user-data retention and document it. Verify IP-related configuration/Google processing using current official GA documentation and property settings at implementation time.
- Define consent-denied behavior and whether cookieless pings are allowed; “denied” must not silently mean data collection that product/legal did not approve.
- Add automated source/build tests for hostname gating, no query/referrer leakage, no forbidden free-text parameters, and exclusion of `/design-explore`.
- Perform a browser network inspection using deliberately unique test words and confirm the unique strings and their encoded payload do not appear in requests, request bodies, cookies, or analytics debug views.
- Record the final Measurement ID/property (in private operational documentation if appropriate), Admin settings, consent behavior, events, retention, linked products, and processor list before drafting final Privacy prose.

Before adding GA, evaluate replacing the word-bearing query transport with session-scoped browser storage and a non-sensitive, tab-local lookup key so user-entered spelling words no longer appear in URLs at all. Prefer eliminating the URL exposure over relying on analytics redaction alone; sanitized analytics paths/referrers remain required as defense in depth. If shareable word-list URLs are a real product requirement, design that feature explicitly rather than treating the current reversible query payload as an acceptable default. This practice-transport change belongs in its own reviewed and tested product-engineering commit.

---

## H. Implementation sequence

Keep work reviewable; the phases below may each be one commit/PR or a small coherent series.

### Phase 0 — Resolve launch decisions and verify operations

1. Determine the truthful operator identity, physical or mailing address, and online contact information that Privacy/Terms must disclose. A COPPA-related operator-contact requirement may exist independently of whether the product offers a general Contact page; do not publish invented details or create `/contact` unless the product actually wants and can support it.
2. Have specialized counsel evaluate whether the intended strictly minimal GA4 use fits the FTC support-for-internal-operations framework for qualifying analytics and determine the resulting notice, consent, and configuration obligations.
3. Inspect Netlify account logging/retention and production/deploy-preview environment variables.
4. Decide whether Google Fonts will be self-hosted; audit the duplicate global font import.
5. Decide whether query-based shareable lists are required or whether practice transport can move off the query string.

### Phase 1 — Practice transport and analytics privacy engineering (before GA launch)

1. First move user-entered spelling words out of the URL into session-scoped browser storage unless an explicit shareable-list design is approved; test browser history, referrers, and failure recovery.
2. Only after legal/configuration decisions are resolved, add one typed analytics module/component with production-host gating, consent handling, manual sanitized page views, strict event allowlist, and no arbitrary parameter API.
3. Configure GA Admin for data minimization and document settings.
4. Add automated tests plus browser/network leak checks using unique custom words.
5. Verify deploy previews and retired design prototypes send nothing.

GA remains entirely absent throughout the approved About/Curriculum/navigation work; that work must be committed and reviewed separately from practice-transport, analytics, Privacy, and Terms changes so unresolved legal work cannot block the information-architecture release.

This precedes Privacy drafting because it determines the facts the policy must state.

### Phase 2 — Supporting-page content and shared template

1. Add a reusable supporting-page shell using the existing Layout, SiteHeader, SiteFooter, typography, semantic landmarks, and narrow prose measure—no new visual direction.
2. Author `/about` from Product Vision and the concise product architecture.
3. Author `/curriculum` from the canonical curriculum/editorial docs in parent/teacher language; add contextual links to Grade Hubs and Skills.
4. Draft `/privacy` from verified Phase 0/1 facts and obtain legal review.
5. Draft proportionate `/terms` and obtain legal review.
6. Run an accessibility audit, document known limitations, then author `/accessibility` with only verified claims.
7. Add metadata, canonical URLs, BreadcrumbList where useful, and inclusion in `sitemap.xml`; do not add FAQ schema to pages without visible FAQs.

### Phase 3 — Global header/mobile navigation

1. Add the Grades disclosure from `gradeConfig`, direct Skills link, Curriculum link, and stable `#practice` target.
2. Add the mobile in-flow navigation and nested Grades disclosure with focus/Escape/outside-click behavior.
3. Preserve practice header minimalism and active-route semantics.
4. Add unit/DOM tests for generated destinations and browser tests for keyboard, focus, Escape, touch, zoom, and responsive behavior.

### Phase 4 — Footer and contextual internal links

1. Implement the three currently valid footer groups using `gradeConfig` and canonical route constants rather than duplicated hardcoded paths where available; add the fourth Legal group only when Privacy and Terms exist.
2. Add About/Curriculum/Accessibility destinations now. Add Privacy/Terms only with their reviewed pages; remove the broken `/privacy` placeholder link in the meantime.
3. Link homepage curriculum summary → `/curriculum`; About ↔ Curriculum; Curriculum → grades/Skills; Privacy from any consent UI.
4. Verify no nonexistent global strand route or Contact link appears.

### Phase 5 — Launch hardening and acceptance

1. Add branded `404.astro` and `robots.txt` referencing the XML sitemap.
2. Remove/gate/noindex design-explore output as deliberately decided.
3. Build and crawl the static output for broken links, duplicate titles/H1s, canonical correctness, sitemap membership, orphan supporting pages, and accidental query links.
4. Run keyboard/screen-reader smoke tests, automated accessibility checks, reduced-motion, contrast, 320px/200% zoom, and mobile touch checks.
5. Run privacy network inspection in production-like preview with consent allowed/denied and verify analytics property DebugView.
6. Re-read Privacy/Terms/Accessibility against the shipped build and Admin settings; mismatches block launch.

---

## I. Genuine open decisions

1. **Analytics legal/configuration posture:** Does the intended minimal GA4 configuration qualify for the FTC support-for-internal-operations exception for persistent identifiers used solely for qualifying analytics, and what notice, consent, cookieless-ping, retention, and property-setting obligations follow? This requires specialized legal/product judgment; GA stays absent meanwhile.
2. **Truthful operator/contact details:** What operator name, address, and online contact information must Privacy/Terms disclose, including any COPPA-specific requirements? This does not automatically justify a general Contact page, which should exist only if the product wants and can support one.
3. **Practice URL transport:** Are shareable word-list URLs a required feature? If not, move user-entered words out of the query string before analytics launch. If yes, accept that copied/history URLs contain reversible words and build stricter redaction/referrer/log controls.
4. **Font delivery:** Self-host the two Direction A font families (privacy/performance control) or disclose and retain Google Fonts after removing redundant requests?
5. **Accessibility statement timing:** Commit to the verification/remediation needed to publish `/accessibility` at launch, or defer the page rather than publish unsupported conformance language?
6. **Operator identity/jurisdiction:** What truthful legal name and governing jurisdiction, if any, should Terms/Privacy identify? The domain alone is not an answer.

Everything else in this plan—page set, no Contact page for now, naming convention, direct Skills link, Grades disclosure, Curriculum label, grade-rich footer, and avoidance of invented global strand routes—can proceed without reopening curriculum or Direction A.

## Superseding cross-grade gateway decision — August 2026

The earlier rejection of global Core/HFW/Themed pages, their footer exclusion, and the Phase 4 check for nonexistent global strand routes are superseded by an authorized architecture reopening. `/core-spelling`, `/high-frequency-words`, and `/themed-spelling-practice` are now canonical cross-grade Gateways. Add all three to Footer → Explore only when all three ship, and verify them atomically; the restrained header remains unchanged. The 18 grade/strand Gateways retain their existing routes and grade-specific inventory ownership.
