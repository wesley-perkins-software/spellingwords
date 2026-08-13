# CLAUDE.md

Guidance for Claude Code when working in this repository.

---

## Project Overview

**spellingwords.app** is a calm, workbook-style spelling practice web app for children: kids (and the parents and teachers helping them) pick a curated word list or paste their own, then hear each word read aloud and type it — with no timers, points, streaks, or test anxiety. The goal is a warm, reassuring, educational experience with an editorial "Warm Workbook" aesthetic, not a game.

---

## Tech Stack & Dependencies

- **Language:** TypeScript 5.5 (strict — `tsconfig.json` extends `astro/tsconfigs/strict`)
- **Framework:** Astro ^4.15 (static site generation, file-based routing, Content Collections). No React/Vue/Svelte — interactivity is vanilla TypeScript in `<script>` tags.
- **Package manager:** npm (`package-lock.json` is committed)
- **Styling:** Tailwind CSS ^3.4 via `@astrojs/tailwind` ^5.1. All design tokens (colors, fonts, radii) live in `tailwind.config.mjs`; global styles and font imports in `src/styles/global.css`.
- **State management:** No library. Pure reducer/state-machine pattern in `src/modules/spellingTest/stateMachine.ts`; page-scoped state wired up with vanilla DOM scripts.
- **Database:** None. Static site. Curated lists are Markdown Content Collections; custom lists are serialized into URL query params (`src/lib/words/serialization.ts`) with optional `sessionStorage` for richer payloads.
- **Testing:** Vitest ^2.1 (`environment: 'node'`, colocated `src/**/*.test.ts`), coverage via `@vitest/coverage-v8`. Playwright is in devDependencies but has no config or specs yet — don't assume E2E exists.
- **Linting/formatting:** ESLint ^8.57 (`@typescript-eslint` ^7.18, `eslint-plugin-astro` ^1.2) and Prettier ^3.3 (`prettier-plugin-astro`; single quotes, semicolons, trailing commas, 100-char width, 2-space tabs).
- **Notable third-party usage:** none beyond the above — speech uses the native `window.speechSynthesis` API wrapped in `src/modules/speech/`.
- **Deployment:** Netlify static hosting (`netlify.toml`).

---

## Core Architecture & Directory Structure

Architectural pattern: a statically generated Astro site with pure, framework-free business logic in `src/lib/` and `src/modules/`, thin `.astro` pages/components on top, and content stored as Markdown via Astro Content Collections.

```
src/
├── pages/                    # File-based routes (page markup + inline <script> wiring)
│   ├── index.astro           #   /                 home: hero, custom word input, list browser
│   ├── play.astro            #   /play             interactive spelling test (?list=<encoded>)
│   └── spelling-lists/
│       ├── index.astro       #   /spelling-lists   browse all curated lists
│       └── [category]/[slug].astro  # list detail pages, generated from content collections
├── layouts/Layout.astro      # Master layout (head, fonts, shared chrome)
├── components/               # Reusable .astro UI components (Breadcrumbs, CategoryChip, …)
├── lib/                      # Pure business logic (framework-free, fully unit-tested)
│   ├── words/                #   parse / validate / normalize / compare / serialize words
│   └── content/              #   content-collection query & category-metadata helpers
├── modules/                  # Feature modules (pure logic + types, framework-free)
│   ├── spellingTest/         #   test state machine, scoring, word ordering
│   └── speech/               #   speechSynthesis controller + voice selection
├── content/
│   ├── config.ts             # Content Collection schemas
│   └── spelling-lists/       # Curated word lists as Markdown (phonics/, high-frequency-words/,
│                             #   grade-level/, challenge/ — frontmatter drives routes)
├── types/spelling.ts         # Core domain types
├── data/fixtures/            # Sample list fixtures not yet migrated to Markdown
└── styles/global.css         # Tailwind directives, Google Fonts import, focus styles, paper grain
public/                       # Static assets (currently HTML mockups)
docs/                         # Product docs: CONTENT_ARCHITECTURE, LEARNING_MODEL,
                              #   CONTENT_STANDARDS, LIST_SPECIFICATIONS, LIBRARY_ROADMAP
```

Where things go:

- **Business logic** → `src/lib/` and `src/modules/` as pure functions with colocated tests. `.astro` files should only render and wire events.
- **UI components** → `src/components/` (PascalCase `.astro`), but only extract a component once it's actually reused — pages keep their own markup otherwise.
- **Types** → colocated `types.ts` inside each module, or `src/types/spelling.ts` for shared domain types.
- **Content** → Markdown in `src/content/spelling-lists/<category>/`; routes derive from frontmatter, not hardcoded lists. Read `docs/CONTENT_ARCHITECTURE.md` and `docs/CONTENT_STANDARDS.md` before adding lists.
- **Visual/UI redesign work** → before touching visual design, use the `frontend-design` skill (`.claude/skills/frontend-design/SKILL.md`) and read `docs/SPELLINGWORDS_VISUAL_REDESIGN_BRIEF.md` for project-specific audience/tone/accessibility context.

---

## Coding Standards & Preferences

- **TypeScript strictness:** strict mode is on; keep explicit parameter and return types on exported functions. Never use `any`.
- **Style:** functional, not OOP. Pure functions and reducers; no classes in core logic. Side effects (DOM, speechSynthesis, storage) stay at the edges behind small injectable interfaces (see `src/modules/speech/speechController.ts`) so logic stays testable in the `node` Vitest environment.
- **Naming:** PascalCase for `.astro` components (`HeroWordPanel.astro`); camelCase for TS modules (`normalizeWord.ts`); tests as `<name>.test.ts` colocated with the source.
- **Component pattern:** Astro frontmatter (`---`) for props/data, template below, vanilla `<script>` for interactivity. No JSX, no client-side framework islands.
- **Exports:** named exports for all utilities; each module exposes a public API through its `index.ts` (`src/lib/words/index.ts`, `src/modules/spellingTest/index.ts`).
- **Error handling:** result objects, not exceptions — `{ ok: true, ... } | { ok: false, errors }` (see `validateWordInput.ts`) and error-code enums in module `types.ts`. Don't throw from core logic.
- **Imports:** use the `@/` alias for `src/` (configured in both `tsconfig.json` and `vitest.config.ts`); avoid deep relative paths across modules.
- **Accessibility:** non-negotiable for a children's app. Semantic HTML, `aria-label`/`aria-live`/`aria-expanded` on interactive elements, `sr-only` headings and skip links, visible focus rings (global `focus-visible` style in `global.css`).
- **Styling:** Tailwind utilities only, using the existing tokens — `app-paper`/`app-cloud` backgrounds, `ink`/`ink-soft`/`ink-faint` text, `brand.*`, `chip.*`, `feedback.*` colors, the rounded radius scale, and the three font families (`font-display` Fredoka for headings/wordmark, `font-sans` Nunito for body, `font-word` Atkinson Hyperlegible for displayed/typed words). Restrained, warm, low-cognitive-load UI; no raw hex values in markup.

---

## Key Commands

```bash
npm run dev                                      # Development server (astro dev)
npm run build                                    # Production build (astro build)
npm run preview                                  # Preview the production build
npm test                                         # Run test suite once (vitest run)
npx vitest run src/lib/words/normalizeWord.test.ts   # Run a single test file
npm run test:watch                               # Tests in watch mode
npm run test:coverage                            # Tests with v8 coverage
npm run lint                                     # ESLint over .ts and .astro files
npm run format                                   # Prettier --write .
```

---

## Anti-Patterns & Common Pitfalls

- **No gamification — ever.** No timers, points, streaks, badges, leaderboards, confetti, or loud celebratory UI. Feedback stays calm and reassuring (the muted `feedback.correct`/`feedback.incorrect` tokens, gentle copy). This is the product's core differentiator; see `docs/LEARNING_MODEL.md`.
- **Don't add frameworks or infrastructure.** No React/Vue/Svelte islands, no state-management or UI libraries, no backend/database. The site is intentionally static; custom lists travel via URL serialization and `sessionStorage`, and future progress tracking is planned as `localStorage` (see `docs/CONTENT_ARCHITECTURE.md`).
- **Don't invent design tokens.** New colors, fonts, shadows, or radii outside `tailwind.config.mjs` need explicit approval. No inline hex colors or one-off font imports.
- **Don't bypass `src/lib/words/`.** All word input must flow through the existing parse → validate → normalize → serialize utilities (Unicode/diacritic handling lives there). Never compare words with raw `===` on user input.
- **Don't put business logic in `.astro` files.** Logic belongs in `lib/`/`modules/` with tests; pages and components only render and wire events.
- **Don't prematurely componentize or abstract.** Prefer modifying existing files over creating new ones; extract a component or helper only when there's real duplication.
- **Avoid `any` and thrown exceptions in core logic.** Use the established result-object and error-code patterns.
- **Preserve existing behavior** (URL formats, sessionStorage keys, default 10-word session size, calm UX flows) unless the task is explicitly to change it.
