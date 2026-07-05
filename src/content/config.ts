import { defineCollection, z } from 'astro:content';

const category = z.enum([
  'grade-level',
  'sight-words',
  'phonics',
  'challenge',
  'theme',
  'seasonal',
]);
const difficulty = z.enum(['beginner', 'developing', 'intermediate', 'advanced', 'challenge']);
const status = z.enum(['draft', 'published', 'archived']);

// Words in list frontmatter are plain strings.
// Optional object form allows hint (etymology notes for challenge lists) and
// phonicsPattern (per-word phonics tags). exampleSentence always comes from the
// sentence bank at build time via toPlayableWords() — never stored here.
const wordEntry = z.union([
  z.string(),
  z.object({
    word: z.string(),
    hint: z.string().optional(),
    phonicsPattern: z.array(z.string()).optional(),
  }),
]);

const spellingLists = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    urlSlug: z.string(),
    title: z.string(),
    description: z.string(),
    shortAnswer: z.string().optional(),
    category,
    grade: z.string().optional(),
    difficulty,
    skillTags: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    order: z.number(),
    estimatedDurationMinutes: z.number(),
    status,
    masteryThreshold: z.number(),
    sourceType: z.enum(['curated', 'custom']),
    canonicalSource: z
      .object({
        name: z.string(),
        tier: z.string(),
        url: z.string().optional(),
      })
      .optional(),
    relatedLists: z.array(z.string()).default([]),
    prerequisiteLists: z.array(z.string()).default([]),
    nextLists: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    // Short, scannable signals a parent can use to judge readiness for this
    // specific list. Optional — pages render no "Is this the right list?"
    // section until a list has real, specific signals written for it.
    readinessSignals: z.array(z.string()).default([]),
    // Real parent/teacher questions specific to this list, for the FAQ
    // section and FAQPage structured data. Optional for the same reason.
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .default([]),
    words: z.array(wordEntry),
  }),
});

const spellingCollections = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    urlSlug: z.string(),
    title: z.string(),
    description: z.string(),
    shortAnswer: z.string().optional(),
    category,
    grade: z.string().optional(),
    listIds: z.array(z.string()),
    status,
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  'spelling-lists': spellingLists,
  'spelling-collections': spellingCollections,
};
