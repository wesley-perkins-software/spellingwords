export type AdditionalPracticeExploreMore = {
  sourceId: string;
  targetIds: readonly [string, string, string];
  rationale: string;
};

/**
 * Editorial, same-grade peer recommendations for every canonical Additional
 * Practice page. Array order is presentation order. Rationales make each
 * choice reviewable; none of these rows represents a learning sequence.
 */
export const ADDITIONAL_PRACTICE_EXPLORE_MORE = [
  {
    sourceId: 'kindergarten-animal-words',
    targetIds: ['kindergarten-color-words', 'kindergarten-body-words', 'kindergarten-family-words'],
    rationale:
      'Connects familiar living things with descriptive words and everyday people/body vocabulary.',
  },
  {
    sourceId: 'kindergarten-body-words',
    targetIds: [
      'kindergarten-family-words',
      'kindergarten-animal-words',
      'kindergarten-number-words',
    ],
    rationale: 'Moves among familiar people, living things, and foundational counting vocabulary.',
  },
  {
    sourceId: 'kindergarten-number-words',
    targetIds: ['kindergarten-color-words', 'kindergarten-family-words', 'kindergarten-body-words'],
    rationale: 'Balances foundational labels with familiar home and body vocabulary.',
  },
  {
    sourceId: 'kindergarten-color-words',
    targetIds: [
      'kindergarten-animal-words',
      'kindergarten-number-words',
      'kindergarten-body-words',
    ],
    rationale: 'Pairs useful describing words with animals, counting, and the body.',
  },
  {
    sourceId: 'kindergarten-family-words',
    targetIds: ['kindergarten-body-words', 'kindergarten-animal-words', 'kindergarten-color-words'],
    rationale:
      'Keeps practice in a familiar-world cluster of people, living things, and descriptions.',
  },
  {
    sourceId: 'grade-1-weather-words',
    targetIds: ['grade-1-clothing-words', 'grade-1-days-of-the-week', 'grade-1-shape-words'],
    rationale:
      'Links weather to daily clothing and calendar talk, then offers a contrasting math topic.',
  },
  {
    sourceId: 'grade-1-clothing-words',
    targetIds: ['grade-1-weather-words', 'grade-1-shape-words', 'grade-1-days-of-the-week'],
    rationale: 'Connects daily clothing choices with weather, visual attributes, and routines.',
  },
  {
    sourceId: 'grade-1-shape-words',
    targetIds: ['grade-1-number-words-11-20', 'grade-1-clothing-words', 'grade-1-weather-words'],
    rationale: 'Pairs early math vocabulary with two concrete everyday topics.',
  },
  {
    sourceId: 'grade-1-number-words-11-20',
    targetIds: ['grade-1-shape-words', 'grade-1-days-of-the-week', 'grade-1-weather-words'],
    rationale: 'Combines early math and calendar vocabulary with a familiar science topic.',
  },
  {
    sourceId: 'grade-1-days-of-the-week',
    targetIds: ['grade-1-weather-words', 'grade-1-number-words-11-20', 'grade-1-clothing-words'],
    rationale:
      'Builds a practical daily-life set around calendar, weather, counting, and clothing.',
  },
  {
    sourceId: 'grade-2-transportation-words',
    targetIds: ['grade-2-community-helpers', 'grade-2-money-words', 'grade-2-months-of-the-year'],
    rationale: 'Connects community travel with people, practical money, and calendar vocabulary.',
  },
  {
    sourceId: 'grade-2-money-words',
    targetIds: [
      'grade-2-number-words-20-100',
      'grade-2-community-helpers',
      'grade-2-transportation-words',
    ],
    rationale: 'Pairs money naturally with number words and everyday community topics.',
  },
  {
    sourceId: 'grade-2-number-words-20-100',
    targetIds: ['grade-2-money-words', 'grade-2-months-of-the-year', 'grade-2-community-helpers'],
    rationale: 'Extends number practice into money and calendar use with a varied community topic.',
  },
  {
    sourceId: 'grade-2-community-helpers',
    targetIds: [
      'grade-2-transportation-words',
      'grade-2-months-of-the-year',
      'grade-2-money-words',
    ],
    rationale: 'Groups practical community, travel, calendar, and money vocabulary.',
  },
  {
    sourceId: 'grade-2-months-of-the-year',
    targetIds: [
      'grade-2-number-words-20-100',
      'grade-2-transportation-words',
      'grade-2-community-helpers',
    ],
    rationale: 'Offers calendar and number practice alongside two concrete community themes.',
  },
  {
    sourceId: 'grade-3-map-globe-words',
    targetIds: [
      'grade-3-life-cycle-words',
      'grade-3-time-words',
      'grade-3-multiplication-division-words',
    ],
    rationale: 'Offers the complete same-grade peer set across science and math topics.',
  },
  {
    sourceId: 'grade-3-life-cycle-words',
    targetIds: [
      'grade-3-map-globe-words',
      'grade-3-time-words',
      'grade-3-multiplication-division-words',
    ],
    rationale: 'Offers the complete same-grade peer set across social studies and math topics.',
  },
  {
    sourceId: 'grade-3-time-words',
    targetIds: [
      'grade-3-multiplication-division-words',
      'grade-3-map-globe-words',
      'grade-3-life-cycle-words',
    ],
    rationale:
      'Leads with complementary math, followed by varied social studies and science topics.',
  },
  {
    sourceId: 'grade-3-multiplication-division-words',
    targetIds: ['grade-3-time-words', 'grade-3-map-globe-words', 'grade-3-life-cycle-words'],
    rationale:
      'Leads with complementary math, followed by varied social studies and science topics.',
  },
  {
    sourceId: 'grade-4-measurement-words',
    targetIds: [
      'grade-4-geometry-words',
      'grade-4-solar-system-words',
      'grade-4-career-occupation-words',
    ],
    rationale: 'Leads with connected math, then offers science and practical-world alternatives.',
  },
  {
    sourceId: 'grade-4-solar-system-words',
    targetIds: [
      'grade-4-measurement-words',
      'grade-4-geometry-words',
      'grade-4-career-occupation-words',
    ],
    rationale: 'Offers the complete same-grade peer set, with related quantitative topics first.',
  },
  {
    sourceId: 'grade-4-career-occupation-words',
    targetIds: [
      'grade-4-measurement-words',
      'grade-4-solar-system-words',
      'grade-4-geometry-words',
    ],
    rationale: 'Offers varied math and science alternatives to a practical-world topic.',
  },
  {
    sourceId: 'grade-4-geometry-words',
    targetIds: [
      'grade-4-measurement-words',
      'grade-4-solar-system-words',
      'grade-4-career-occupation-words',
    ],
    rationale: 'Leads with connected math, then offers science and practical-world alternatives.',
  },
  {
    sourceId: 'grade-5-money-management-words',
    targetIds: [
      'grade-5-fraction-decimal-words',
      'grade-5-community-civics-words',
      'grade-5-ecosystem-environment-words',
    ],
    rationale: 'Connects financial math and civic life, then adds a contrasting science topic.',
  },
  {
    sourceId: 'grade-5-ecosystem-environment-words',
    targetIds: [
      'grade-5-community-civics-words',
      'grade-5-fraction-decimal-words',
      'grade-5-money-management-words',
    ],
    rationale: 'Offers the complete same-grade peer set across civics and practical math.',
  },
  {
    sourceId: 'grade-5-fraction-decimal-words',
    targetIds: [
      'grade-5-money-management-words',
      'grade-5-ecosystem-environment-words',
      'grade-5-community-civics-words',
    ],
    rationale: 'Leads with applied financial math, then offers science and civics alternatives.',
  },
  {
    sourceId: 'grade-5-community-civics-words',
    targetIds: [
      'grade-5-money-management-words',
      'grade-5-ecosystem-environment-words',
      'grade-5-fraction-decimal-words',
    ],
    rationale: 'Connects civic and money vocabulary, with science and math alternatives.',
  },
] as const satisfies readonly AdditionalPracticeExploreMore[];

const recommendationsBySource: ReadonlyMap<string, readonly [string, string, string]> = new Map(
  ADDITIONAL_PRACTICE_EXPLORE_MORE.map(({ sourceId, targetIds }) => [sourceId, targetIds]),
);

export function getAdditionalPracticeExploreMore(id: string): readonly string[] {
  return recommendationsBySource.get(id) ?? [];
}
