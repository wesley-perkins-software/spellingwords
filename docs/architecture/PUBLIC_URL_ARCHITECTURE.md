# Public URL Architecture

**Status:** approved and implemented for canonical K–5 grade curriculum pages.

## Canonical K–5 grade curriculum rule

Canonical Grade Hubs and all canonical Grade Hub card destinations use a flat, grade-first, no-trailing-slash URL structure:

```text
/{grade}
/{grade}/{page-slug}
```

Approved grade slugs are exactly:

- `/kindergarten`
- `/1st-grade`
- `/2nd-grade`
- `/3rd-grade`
- `/4th-grade`
- `/5th-grade`

The canonical page resolver is `src/lib/content/canonicalGradeRoutes.ts`. It is the sole runtime source of truth for canonical K–5 grade curriculum paths. Stable content `id`, not source folder, `category`, filename, or historical `urlSlug`, determines whether a page belongs to the grade-first architecture.

## Section policy

Grade Hubs remain the only parent landing pages for a grade. These section names remain visible on the Grade Hub:

- Core Spelling
- High-Frequency Words
- Additional Practice

They are not URL ancestors. Do not create canonical public routes such as:

- `/{grade}/core-spelling`
- `/{grade}/core`
- `/{grade}/high-frequency-words`
- `/{grade}/additional-practice`
- `/{grade}/practice`

## High-Frequency Words policy

There is no standalone Common Words / High-Frequency Words gateway page under the canonical grade curriculum architecture. Each set is a direct child of its Grade Hub:

```text
/{grade}/high-frequency-words-1
/{grade}/high-frequency-words-2
/{grade}/high-frequency-words-3
```

Gateway collection content was dispositioned into Grade Hub High-Frequency Words section context and the old gateway URLs permanently redirect to the corresponding Grade Hub.

## Trailing slash convention

The project canonical convention is **no trailing slash** for manifest paths, Grade Hub paths, internal links, redirect destinations, canonical tags, breadcrumb JSON-LD, and sitemap entries.

## Redirects

Historical canonical K–5 curriculum URLs under `/spelling-lists/{category}/{urlSlug}` and historical Grade Hub URLs under `/spelling-lists/{grade}` permanently redirect directly to their grade-first canonical paths. Redirects are configured in `netlify.toml` and verified against `src/lib/content/canonicalGradeRoutes.ts` by tests.

## Migration inventory

The human-readable migration map is `docs/content/inventory/grade-url-migration-map.md`. It is generated from `src/lib/content/canonicalGradeRoutes.ts` plus current content frontmatter and is tested for manifest synchronization.
