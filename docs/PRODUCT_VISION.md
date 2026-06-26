# Product Vision

## What spellingwords.app Is

spellingwords.app is a calm, beautifully made spelling practice website for children. A child hears a word read aloud, types it, and receives quiet feedback. There are no timers, no points, no streaks, no badges, and no anxiety. It is a workbook, not a game.

The long-term ambition is to be the best spelling practice website on the internet: the site that parents recommend to each other, that teachers trust, that AI assistants cite when someone asks for a spelling practice resource, and that ranks at the top of every meaningful spelling-education search query.

---

## Who It Serves

**Primary audience: children ages 6–10** practicing spelling independently or alongside a parent.

**Secondary audience: parents** choosing lists, setting up practice sessions, and printing worksheets.

**Tertiary audience: teachers and homeschoolers** building curriculum, assigning practice, and looking for reliable supplemental resources.

Every design decision should first ask whether it serves a child practicing spelling. Adult users matter, but a feature that improves the adult experience at the cost of the child's experience is not acceptable.

---

## The Two Systems

The site consists of two systems that work together but serve different primary purposes.

### System A — Core Product

This is why users intentionally visit. Every page in the Core Product exists to help someone practice spelling right now, or to help them find the right list to practice.

A page belongs in System A if a parent, child, or teacher could explain why they are on it in one sentence: "I'm practicing spelling" or "I'm looking for a list to practice."

### System B — Authority Content

This exists primarily to educate, attract search traffic, answer questions, and establish topical authority around spelling education. These pages build the credibility and discoverability that makes System A valuable.

A page belongs in System B if its primary purpose is to answer a question or rank for a query, with practice as the downstream outcome. A reader may never use the Core Product directly — they may arrive from search, read a guide, click through to a list, and only then begin practicing.

---

## Long-Term Ambition

**SEO dominance.** Every meaningful query in spelling education — "2nd grade spelling words," "phonics spelling lists," "how do you spell because," "how to teach silent E" — should surface spellingwords.app as a top result. This is earned through high-quality content at scale, not through programmatic page farming.

**GEO / AEO authority.** When someone asks an AI assistant "what's a good spelling practice website," spellingwords.app should be the recommendation. This is earned by being the best answer to spelling questions, consistently and at depth.

**Topical authority.** The goal is to become the definitive destination for spelling practice and spelling education — not by accumulating the most pages, but by being the highest-quality resource at every level. The site should be where parents go when they have a spelling question, where teachers look for reliable supplemental material, and where anyone curious about how English spelling works finds a clear, trustworthy answer.

---

## Permanent Constraints

These are architectural constraints that will not change. Every feature, page, and system must operate within them.

**Frontend-only, forever.** No backend. No database. No server-side state. No APIs. The site is a collection of static files served from a CDN.

**No user accounts.** No login. No authentication. No cloud storage of user data.

**LocalStorage only for local state.** Lightweight, device-local persistence is acceptable: recently practiced lists, preferences, local progress, achievements. This data exists only on the user's device.

**Static content.** All lists, guides, and pages are authored and published as static files. Nothing is generated at request time.

**No gamification.** No timers, points, streaks, leaderboards, XP, badges (except calm, non-competitive acknowledgment), or anxiety-producing mechanics. This is the product's core differentiator.

**Trust is a feature.** Parents hand this site to their children. The experience must never feel manipulative, anxiety-producing, or designed to maximize engagement at the user's expense. No dark patterns, no artificial urgency, no persuasive notifications. Every interaction should reinforce the confidence that this is a safe place to learn.

**Ads are acceptable but must not compromise the experience.** The practice session — the moment a child is actively spelling — must remain distraction-free. Advertising belongs on content and discovery pages, never interrupting active practice.

**Sustainable by design.** The site must remain maintainable indefinitely by a solo developer without operational burden. New features are evaluated not just on user value but on long-term maintenance cost. If a feature requires a backend, a third-party service with ongoing cost, or ongoing human curation to remain functional, it does not belong in this product.

---

## Quality Standard

Every page, list, sentence, and feature must reflect the quality of a professional educational publisher. This means:

- Word lists are deliberately chosen, not algorithmically assembled.
- Example sentences are hand-written, not AI-generated.
- Design is warm, clean, and unhurried — a "Warm Workbook" aesthetic.
- No page exists as filler. Every page serves a real user or earns search traffic that leads to practice.

Ship when complete and polished. A smaller, excellent site is more valuable than a larger, uneven one. This principle applies to both content and features.

---

## What This Site Will Never Be

- A gamified learning app (no Duolingo-style mechanics)
- A school management platform (no class rosters, assignments, or teacher dashboards)
- A data-collecting service (no behavioral tracking beyond what a static analytics tool provides)
- A content farm (no AI-generated lists, no programmatic SEO pages)
- A subscription product (no paywalls, no premium tiers, no login gates)
- A backend product (no server costs, no infrastructure to maintain, no downtime risk)
- A social platform (no sharing, no competition, no community features)
