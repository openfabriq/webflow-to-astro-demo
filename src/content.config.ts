import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/articles' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			hero: image(),
			heroAlt: z.string(),
			author: z.string(),
			authorPhoto: image(),
			authorPhotoAlt: z.string(),
			// As Webflow shows it ("January 10, 2020"); templates print it as is.
			date: z.string(),
			category: z.string().optional(),
			// The home cards and the Related block repeat the one article with these images.
			cardImages: z.array(image()),
			featureImages: z.array(image()),
		}),
});

export const collections = { articles };
