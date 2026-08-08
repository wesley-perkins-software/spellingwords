# Public URL Architecture

**Status:** approved and implemented for canonical K–5 grade curriculum pages and canonical Skill pages. These are the site's original launch URLs — spellingwords.app is pre-launch, so there is no established public site whose old URLs need to be preserved.

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

The canonical page resolver is `src/lib/content/canonicalGradeRoutes.ts`. It is the sole runtime source of truth for canonical K–5 grade curriculum paths. Stable content `id`, not source folder, `category`, filename, or frontmatter `urlSlug`, determines whether a page belongs to the grade-first architecture.

## Canonical Skill rule

The 41 canonical Skill pages (see `docs/architecture/SKILLS_ARCHITECTURE.md`) use a flat, grade-independent, no-trailing-slash URL structure:

```text
/skills
/skills/{skill-slug}
```

`/skills` is the Skills Hub — a first-class top-level public journey ("I know what we need to practice," `CONSTITUTION.md` §3.3), parallel to the grade-first journey.

The canonical page resolver is `src/lib/content/canonicalSkillRoutes.ts`. It is the sole runtime source of truth for canonical Skill paths: an explicit stable-id-keyed manifest, not derived from source folder, category, filename, or frontmatter `urlSlug`. Frontmatter `urlSlug` is a separate, unrelated field — it is not read by this manifest and is not changed by it. Where the two differ (14 of the 41 Skills), the manifest's `finalSlug` is the only public routing decision; the frontmatter value is bookkeeping for the content file itself. See `docs/content/inventory/skill-pages.md`'s `Canonical public path` column for the full cross-reference.

The legacy `/spelling-lists` and `/learning-paths` route trees have been removed entirely. Every published `spelling-lists` entry is now a canonical Grade Unit or Skill id — enforced by `src/lib/content/retainedSpellingListPages.test.ts`. See `docs/content/inventory/LEGACY_REMOVAL_DELETION_MANIFEST.md` for the full record of what was removed.

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

There is no standalone High-Frequency Words / High-Frequency Words gateway page under the canonical grade curriculum architecture. Each set is a direct child of its Grade Hub:

```text
/{grade}/high-frequency-words-1
/{grade}/high-frequency-words-2
/{grade}/high-frequency-words-3
```

The Grade Hub itself is the entry point for a grade's High-Frequency Words sets. The `spelling-collections` content type (the old High-Frequency Words gateway collections and the Dolch collections) has been removed entirely.

## Trailing slash convention

The project canonical convention is **no trailing slash** for every path except `/` itself — manifest paths, internal links, canonical tags, og:url, breadcrumb JSON-LD, and sitemap entries. This is enforced centrally in `astro.config.mjs` (`trailingSlash: 'never'`, `build.format: 'file'`), not by per-page string trimming, since `Astro.url.pathname` (which both `Layout.astro`'s canonical/og:url and each detail template's breadcrumb JSON-LD derive from) otherwise inherits Astro's directory-format trailing slash regardless of what a route manifest says.

## No redirects, pre-launch

Because the site has never launched, old repository-shaped URLs for migrated grade-curriculum pages, migrated Skill pages, and every removed `/spelling-lists`/`/learning-paths` page are simply not generated — they return 404, not a redirect. There is no historical traffic, backlink, or search-index history to preserve. `netlify.toml` carries no migration-oriented redirects.

## Reference inventories

- `docs/content/inventory/grade-url-migration-map.md` — canonical path reference for the 105 grade-curriculum pages, generated from `src/lib/content/canonicalGradeRoutes.ts`.
- `docs/content/inventory/skill-pages.md` — per-Skill id/title/frontmatter-urlSlug/canonical-public-path cross-reference.
- `docs/content/inventory/LEGACY_REMOVAL_DELETION_MANIFEST.md` — the complete record of every non-canonical `spelling-lists`/`spelling-collections` page removed from the site.


## August 2026 HFW curriculum migration

The HFW curriculum now contains 27 canonical sets. Grade 1 and Grade 2 add `/high-frequency-words-7`; Grade 4 and Grade 5 each end at Set 2. The former Grade 4/5 Set 3 and Set 4 routes are not generated and return 404 under the verified pre-launch policy above. Repository deployment documentation, the empty redirect configuration, and absence of a configured deployment remote support that disposition; if the operational launch status changes, redirects require a separate explicit decision.
