import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/posts' }),
  schema: z.object({
    category: z.string(),
    headline: z.string(),
    highlight: z.string(),
    order: z.number(),
  }),
});

const explainers = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/explainers' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().default('Explained'),
    leadParagraph: z.string(),
    highlight: z.string(),
    drivers: z.array(z.object({ heading: z.string(), body: z.string() })),
  }),
});

export const collections = { posts, explainers };
