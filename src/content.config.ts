import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.date(),
    language: z.enum(['en', 'pl']),
    category: z.enum(['tech', 'lifestyle', 'culture']),
    excerpt: z.string().optional(),
    translation: z
      .object({
        en: z.string().optional(),
        pl: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { blog };
