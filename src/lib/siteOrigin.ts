/**
 * The production origin, shared by every TypeScript module that needs it
 * (canonical URLs, the sitemap). `astro.config.mjs` also sets `site` to this
 * same value so `Astro.site` agrees with it at build time.
 *
 * `public/robots.txt` is a static file with no build step, so it cannot
 * import this constant — its `Sitemap:` line must be kept in sync by hand
 * if this value ever changes.
 */
export const SITE_ORIGIN = 'https://spellingwords.app';
