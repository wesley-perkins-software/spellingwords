import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { canonicalGradeRoutes } from './canonicalGradeRoutes';
import { CORE_SPELLING_SEQUENCE } from './coreSpellingSequence';
import {
  GRADE_5_THEMED_SPELLING_PRACTICE_IDS,
  GRADE_5_CORE_IDS,
} from './grade5Progression';
import { getCoreNavigationModel } from './navigationSequence';

const CONTENT_ROOT = join(
  process.cwd(),
  'src/content/spelling-lists/grade-level',
);

const CORE_FIXTURES = [
  {
    file: '5th-grade-multisyllabic-academic-words.md',
    id: 'grade-5-multisyllabic-academic-words',
    urlSlug: '5th-grade-multisyllabic-academic-words',
    title: 'Multisyllabic Academic Words',
    order: '5',
    skillIds: ['multisyllabic-words'],
    relatedLists: [],
    readinessSignals: [
      'can spell shorter academic words and are ready for longer words with several meaningful chunks',
      'can use syllables to hold a long word in order while writing',
      'notice recurring endings such as -tion, -ation, -ment, and -ology in school vocabulary',
    ],
    words: [
      'information',
      'investigation',
      'organization',
      'explanation',
      'observation',
      'responsibility',
      'independent',
      'environment',
      'communication',
      'experiment',
      'conclusion',
      'technology',
    ],
  },
  {
    file: '5th-grade-prefix-suffix-words.md',
    id: 'grade-5-prefix-suffix-words',
    urlSlug: '5th-grade-prefix-suffix-words',
    title: 'Prefix and Suffix Words',
    order: '6',
    skillIds: ['common-prefixes'],
    relatedLists: [],
    readinessSignals: [
      'can identify both a beginning word part and an ending word part in longer vocabulary',
      'have practiced common prefixes and suffixes separately in earlier lessons',
      'use word-part meaning to check whether a long academic word makes sense in context',
    ],
    words: [
      'interfere',
      'international',
      'transfer',
      'transport',
      'supervise',
      'substitute',
      'attractive',
      'creative',
      'responsible',
      'activity',
      'courageous',
      'agreement',
    ],
  },
  {
    file: '5th-grade-greek-latin-word-parts.md',
    id: 'grade-5-greek-latin-word-parts',
    urlSlug: '5th-grade-greek-latin-word-parts',
    title: 'Greek and Latin Word Parts',
    order: '8',
    skillIds: ['greek-and-latin-roots'],
    relatedLists: ['tier-1-roots-and-patterns'],
    readinessSignals: [
      'can identify familiar Greek and Latin parts inside longer academic words',
      'are comfortable spelling words with three or more syllables when they can be broken into chunks',
      'use word-part meanings to support comprehension in science, social studies, and ELA vocabulary',
    ],
    words: [
      'photography',
      'biology',
      'geography',
      'telescope',
      'telephone',
      'transportation',
      'construction',
      'inspection',
      'prediction',
      'description',
      'instruction',
      'interruption',
    ],
  },
  {
    file: '5th-grade-commonly-confused-words.md',
    id: 'grade-5-commonly-confused-words',
    urlSlug: '5th-grade-commonly-confused-words',
    title: 'Commonly Confused Words',
    order: '9',
    skillIds: ['commonly-confused-words'],
    relatedLists: ['grade-4-commonly-confused-words'],
    readinessSignals: [
      'can compare word meanings closely enough to explain why one choice fits a sentence better than another',
      'write reports, arguments, stories, or explanations where precise vocabulary affects credibility and clarity',
      'have practiced earlier homophones and are ready for confusing pairs that may differ by part of speech, spelling pattern, or context',
    ],
    words: [
      'desert',
      'dessert',
      'affect',
      'effect',
      'principal',
      'principle',
      'advice',
      'advise',
      'loose',
      'lose',
      'past',
      'passed',
    ],
  },
  {
    file: '5th-grade-spelling-changes-related-words.md',
    id: 'grade-5-spelling-changes-related-words',
    urlSlug: '5th-grade-spelling-changes-in-related-words',
    title: 'Spelling Changes in Related Words',
    order: '10',
    skillIds: [],
    relatedLists: [],
    readinessSignals: [
      'can spell base words such as critic, athlete, magic, music, and electric',
      'notice that related words such as magic and magician share a spelling even when a sound shifts from /k/ to /sh/',
      "are ready to reason about a whole word family's spelling rather than sounding out one word at a time",
    ],
    words: [
      'critic',
      'critical',
      'criticism',
      'athlete',
      'athletic',
      'athleticism',
      'magic',
      'magician',
      'music',
      'musician',
      'electric',
      'electrician',
    ],
  },
] as const;

function frontmatter(file: string): string {
  const source = readFileSync(join(CONTENT_ROOT, file), 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`Missing frontmatter: ${file}`);
  return match[1];
}

function scalar(source: string, key: string): string | undefined {
  return source
    .match(new RegExp(`^${key}:\\s*["']?([^\\n"']+)["']?$`, 'm'))?.[1]
    .trim();
}

function inlineArray(source: string, key: string): string[] {
  const value = source.match(new RegExp(`^${key}:\\s*\\[(.*)\\]$`, 'm'))?.[1];
  return value
    ? value.split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
    : [];
}

function blockArray(source: string, key: string): string[] {
  const value = source.match(
    new RegExp(`^${key}:\\s*\\n((?:  - .+\\n?)+)`, 'm'),
  )?.[1];
  return value
    ? value
        .trim()
        .split('\n')
        .map((line) => line.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, ''))
    : [];
}

describe('Grade 5 Core editorial invariants', () => {
  it('keeps every frozen frontmatter field, word order, relationship, and readiness signal unchanged', () => {
    for (const fixture of CORE_FIXTURES) {
      const source = frontmatter(fixture.file);
      expect(
        {
          id: scalar(source, 'id'),
          urlSlug: scalar(source, 'urlSlug'),
          title: scalar(source, 'title'),
          grade: scalar(source, 'grade'),
          category: scalar(source, 'category'),
          contentRole: scalar(source, 'contentRole'),
          status: scalar(source, 'status'),
          order: scalar(source, 'order'),
          masteryThreshold: scalar(source, 'masteryThreshold'),
          words: blockArray(source, 'words'),
          skillIds: inlineArray(source, 'skillIds'),
          relatedLists: inlineArray(source, 'relatedLists'),
          prerequisiteLists: inlineArray(source, 'prerequisiteLists'),
          nextLists: inlineArray(source, 'nextLists'),
          readinessSignals: blockArray(source, 'readinessSignals'),
        },
        fixture.id,
      ).toEqual({
        id: fixture.id,
        urlSlug: fixture.urlSlug,
        title: fixture.title,
        grade: '5',
        category: 'grade-level',
        contentRole: 'grade-unit',
        status: 'published',
        order: fixture.order,
        masteryThreshold: '90',
        words: [...fixture.words],
        skillIds: [...fixture.skillIds],
        relatedLists: [...fixture.relatedLists],
        prerequisiteLists: [],
        nextLists: [],
        readinessSignals: [...fixture.readinessSignals],
      });
    }
  });

  it('keeps the frozen Core sequence, routes, Hub order, and terminal navigation', () => {
    const ids = CORE_FIXTURES.map(({ id }) => id);
    expect(GRADE_5_CORE_IDS).toEqual(ids);
    expect(CORE_SPELLING_SEQUENCE.slice(-5)).toEqual(ids);
    expect(
      canonicalGradeRoutes
        .filter(
          ({ grade, classification }) =>
            grade === '5' && classification === 'core-spelling',
        )
        .map(({ id }) => id),
    ).toEqual(ids);
    expect(getCoreNavigationModel(ids.at(-1)!)).toEqual({
      reviewIds: ['grade-5-commonly-confused-words'],
      nextIds: [],
      exploreIds: [],
    });
    expect(
      inlineArray(
        frontmatter('5th-grade-spelling-changes-related-words.md'),
        'skillIds',
      ),
    ).toEqual([]);
  });

  it('mirrors the authoritative four-card Themed Spelling Practice order in the secondary manifest', () => {
    expect(GRADE_5_THEMED_SPELLING_PRACTICE_IDS).toEqual(
      canonicalGradeRoutes.filter(({ grade, classification }) => grade === '5' && classification === 'themed-spelling-practice').map(({ id }) => id),
    );
  });
});
