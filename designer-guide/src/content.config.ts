import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ base: './content', pattern: '**/*.{md,mdx}', deferRender: true }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lastReviewed: z.iso.date().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { docs };
