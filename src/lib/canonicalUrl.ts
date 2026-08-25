import { SITE_ORIGIN } from '@/lib/siteOrigin';

/**
 * Centralized canonical-URL construction. `Astro.url.pathname` does not
 * directly give the clean, no-trailing-slash public path the project's
 * convention requires: with `build.format: 'file'` (set in
 * astro.config.mjs to fix the pathname's trailing slash at the source),
 * Astro's own `Astro.url.pathname` during static generation reflects the
 * literal output filename, including a trailing `.html` — verified locally
 * via `astro build` before this was accepted as final, per the project's
 * "hosting behavior must be verified, not assumed" rule. Netlify serves the
 * built `.html` files at their extensionless, pretty-URL path, so the
 * public URL a browser actually shows never has `.html` — this helper makes
 * the canonical tag, og:url, and breadcrumb JSON-LD agree with that public
 * URL instead of the build artifact's filename.
 */

export function getCanonicalUrl(pathname: string, site: string | URL | undefined): URL {
  let clean = pathname.replace(/\.html$/, '');
  if (clean.length > 1) clean = clean.replace(/\/$/, '');
  if (clean === '') clean = '/';
  return new URL(clean, site ?? SITE_ORIGIN);
}
