import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    company: z.string(),
    year: z.number(),
    role: z.string(),
    tags: z.array(z.string()),
    heroImage: z.string(),
    summary: z.string(),
    impact: z.array(z.string()).optional(),
    featured: z.boolean(),
    visibility: z.enum(['public', 'password', 'hidden']).default('public'),
    /** Required when visibility === 'password'. Client-side obfuscation only. */
    password: z.string().optional(),
    order: z.number(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
  }),
});

export const collections = { work };
