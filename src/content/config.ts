import { defineCollection, z } from 'astro:content';

const category = z.enum(['grade-level', 'sight-words', 'phonics', 'challenge', 'theme', 'seasonal']);
const difficulty = z.enum(['beginner', 'developing', 'intermediate', 'advanced', 'challenge']);
const status = z.enum(['draft', 'published', 'archived']);

const spellingWord = z.object({
  word: z.string(),
  spokenPrompt: z.string().optional(),
  hint: z.string().optional(),
  exampleSentence: z.string().optional(),
  phonicsPattern: z.array(z.string()).optional(),
});

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
    words: z.array(spellingWord),
  }),
});

export const collections = { 'spelling-lists': spellingLists };
