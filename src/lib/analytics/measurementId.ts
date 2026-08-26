export const GA_MEASUREMENT_ID = 'G-FZ9BG2KKBR';

// GA must only ever run on the live production host — never localhost or a
// Netlify deploy preview/branch deploy. Shared by GoogleAnalytics.astro (the
// page-view tag) and the custom-event module so both gate on one constant.
export const PRODUCTION_HOSTNAME = 'spellingwords.app';
