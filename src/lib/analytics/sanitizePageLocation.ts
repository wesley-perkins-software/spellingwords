export interface SanitizableLocation {
  origin: string;
  pathname: string;
}

/**
 * Reduces a page location to `origin + pathname` only. Deliberately typed to
 * accept nothing but those two fields so a caller can't accidentally spread
 * `search` or `hash` (and with them state-bearing values like `?session=`,
 * `?list=`, or `#list=`) into what gets reported to analytics.
 */
export function sanitizePageLocation(location: SanitizableLocation): string {
  return `${location.origin}${location.pathname}`;
}
