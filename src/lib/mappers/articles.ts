/** Mapper: the published Webflow pages of the article -> one `articles` entry. Pure: no network, no file. */

export interface ImageRef {
	/** Absolute URL of the file on Webflow's CDN, to download. */
	url: string;
	/** Local file name, under `src/content/articles/images/`. */
	file: string;
	alt: string;
}

export interface ArticleEntry {
	slug: string;
	data: {
		title: string;
		summary: string;
		hero: string;
		heroAlt: string;
		author: string;
		authorPhoto: string;
		authorPhotoAlt: string;
		date: string;
		/** Webflow shows no category on the article: left out until a maintainer names one. */
		category?: string;
		/** Images of the cards of the home list, `Image 1` to `Image 4`. */
		cardImages: string[];
		/** Images of the "Related articles" and "Featured" blocks, `Feature 1` to `Feature 4`. */
		featureImages: string[];
	};
	body: string;
	images: ImageRef[];
}

const entities: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decode(text: string): string {
	return text
		.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
		.replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
		.replace(/&(\w+);/g, (all, name) => entities[name] ?? all);
}

const clean = (html: string) => decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

function attr(tag: string, name: string): string {
	const found = new RegExp(`\\s${name}="([^"]*)"`).exec(tag);
	return found ? decode(found[1]) : '';
}

/** `…/5ee2_Blog%20Image.jpg` -> `Blog-Image.jpg` (the Webflow id prefix dropped). */
export function imageFile(url: string): string {
	const name = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? '');
	return name.replace(/^[\da-f]{24}_/, '').replace(/\s+/g, '-');
}

function imageOf(tag: string): ImageRef {
	const url = attr(tag, 'src');
	return { url, file: imageFile(url), alt: attr(tag, 'alt') };
}

function must<T>(value: T | null | undefined, what: string): T {
	if (value === null || value === undefined || value === '') throw new Error(`article mapper: ${what} not found`);
	return value;
}


/** The rich text of the article -> Markdown (p with `<br>` breaks, h2, h3, img). */
export function richTextToMarkdown(html: string, images: ImageRef[]): string {
	const blocks: string[] = [];
	const block = /<(p|h2|h3)\b[^>]*>([\s\S]*?)<\/\1>|<img\b[^>]*>/g;
	for (const match of html.matchAll(block)) {
		const [whole, tag, inner] = match;
		if (!tag) {
			const image = imageOf(whole);
			images.push(image);
			blocks.push(`![${image.alt}](./images/${image.file})`);
		} else if (tag === 'p') {
			for (const paragraph of inner.split(/(?:<br\s*\/?>\s*){2,}/)) {
				const text = clean(paragraph.replace(/<br\s*\/?>/g, ' '));
				if (text) blocks.push(text);
			}
		} else {
			blocks.push(`${tag === 'h2' ? '##' : '###'} ${clean(inner)}`);
		}
	}
	return blocks.join('\n\n') + '\n';
}

export function mapArticle(articleHtml: string, homeHtml: string, slug = 'blog-article'): ArticleEntry {
	const images: ImageRef[] = [];
	const add = (image: ImageRef) => {
		images.push(image);
		return image.file;
	};

	const title = clean(must(/<h1\b[^>]*>([\s\S]*?)<\/h1>/.exec(articleHtml), 'h1')[1]);
	const header = must(/class="profile-block-header"[\s\S]*?<\/div><\/div><\/div>/.exec(articleHtml), 'author block')[0];
	const photo = imageOf(must(/<img\b[^>]*>/.exec(header), 'author photo')[0]);
	const author = clean(must(/class="title-small[^"]*"[^>]*>([\s\S]*?)<\/div>/.exec(header), 'author name')[1]);
	const date = clean(must(/class="paragraph-detials-small[^"]*"[^>]*>([\s\S]*?)<\/div>/.exec(header), 'date')[1]);
	const hero = imageOf(must(/<img\b[^>]*class="blog-hero-image"[^>]*>/.exec(articleHtml), 'hero image')[0]);

	const bodyHtml = must(
		/class="content-left_blog">([\s\S]*?)<\/div><div class="content-right">/.exec(articleHtml),
		'article body',
	)[1];

	// The summary is the card text of the home list.
	const summary = clean(must(/class="blog-content">[\s\S]*?<p\b[^>]*>([\s\S]*?)<\/p>/.exec(homeHtml), 'card summary')[1]);
	const cards = [...homeHtml.matchAll(/<img\b[^>]*class="blog-image"[^>]*>/g)].map((m) => imageOf(m[0]));
	const features = [...articleHtml.matchAll(/<img\b[^>]*class="feature-image"[^>]*>/g)].map((m) => imageOf(m[0]));

	const heroFile = add(hero);
	const photoFile = add(photo);
	const body = richTextToMarkdown(bodyHtml, images);
	const cardImages = cards.map(add);
	const featureImages = features.map(add);

	const unique = new Map(images.map((image) => [image.file, image]));
	return {
		slug,
		data: {
			title,
			summary,
			hero: heroFile,
			heroAlt: hero.alt,
			author,
			authorPhoto: photoFile,
			authorPhotoAlt: photo.alt,
			date,
			cardImages,
			featureImages,
		},
		body,
		images: [...unique.values()],
	};
}

const quote = (value: string) => JSON.stringify(value);

/** Front matter and body of the entry, as the Markdown file. Same entry, same text. */
export function serializeArticle(entry: ArticleEntry): string {
	const { data } = entry;
	const image = (file: string) => quote(`./images/${file}`);
	const lines = [
		'---',
		`title: ${quote(data.title)}`,
		`summary: ${quote(data.summary)}`,
		`hero: ${image(data.hero)}`,
		`heroAlt: ${quote(data.heroAlt)}`,
		`author: ${quote(data.author)}`,
		`authorPhoto: ${image(data.authorPhoto)}`,
		`authorPhotoAlt: ${quote(data.authorPhotoAlt)}`,
		`date: ${quote(data.date)}`,
		...(data.category ? [`category: ${quote(data.category)}`] : []),
		'cardImages:',
		...data.cardImages.map((file) => `  - ${image(file)}`),
		'featureImages:',
		...data.featureImages.map((file) => `  - ${image(file)}`),
		'---',
		'',
	];
	return lines.join('\n') + entry.body;
}
