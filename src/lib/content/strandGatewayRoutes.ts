import type { GradeRouteClassification } from './canonicalGradeRoutes';

/**
 * Canonical top-level (cross-grade) strand gateway paths — lateral navigation, not a URL parent
 * of the grade-scoped `/{grade}/{strand}` gateways. See docs/planning/
 * LAUNCH_SUPPORTING_PAGES_AND_GLOBAL_NAVIGATION_PLAN.md (2026-08-21 amendment).
 */
export const STRAND_GATEWAY_PATHS: Record<GradeRouteClassification, string> = {
  'core-spelling': '/core-spelling',
  'high-frequency-words': '/high-frequency-words',
  'themed-spelling-practice': '/themed-spelling-practice',
};

export const STRAND_GATEWAY_TITLES: Record<GradeRouteClassification, string> = {
  'core-spelling': 'Core Spelling',
  'high-frequency-words': 'High-Frequency Words',
  'themed-spelling-practice': 'Themed Spelling Practice',
};
