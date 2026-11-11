export interface Facts {
	title: string;
	description: string;
	canonical: string;
	h1: string[];
	links: string[];
}

const decode = (s: string) =>
	s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

function attr(tag: string, name: string): string | undefined {
	return tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'))?.slice(1).find((v) => v !== undefined);
}

/** Read the facts parity compares from a page's HTML; links are made absolute against `origin`. */
export function extractFacts(html: string, origin: string): Facts {
	const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim();
	let description = '';
	let canonical = '';
	for (const tag of html.match(/<(?:meta|link)\b[^>]*>/gi) ?? []) {
		if (/^<meta/i.test(tag) && attr(tag, 'name')?.toLowerCase() === 'description') description = decode(attr(tag, 'content') ?? '');
		if (/^<link/i.test(tag) && attr(tag, 'rel')?.toLowerCase() === 'canonical') canonical = attr(tag, 'href') ?? '';
	}
	const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => decode(m[1].replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim());
	const links = [...html.matchAll(/<a\b[^>]*>/gi)]
		.map((m) => attr(m[0], 'href'))
		.filter((h): h is string => !!h && !h.startsWith('#') && !/^(mailto|tel|javascript):/i.test(h))
		.map((h) => new URL(h, origin + '/').href);
	return { title, description, canonical, h1, links: [...new Set(links)].sort() };
}

/**
 * The gaps between the old page and the new one. `oldOrigin` and `newOrigin` tell the internal links
 * from the external ones; every internal link of the new page sits under `base`, and every internal
 * link of the old page has its counterpart there.
 */
export function comparePages(
	oldPage: Facts,
	newPage: Facts,
	opts: { base: string; oldOrigin: string; newOrigin: string },
): string[] {
	const gaps: string[] = [];
	if (oldPage.title !== newPage.title) gaps.push(`title: "${oldPage.title}" -> "${newPage.title}"`);
	if (oldPage.description !== newPage.description) gaps.push(`description: "${oldPage.description}" -> "${newPage.description}"`);
	if (oldPage.h1.join('|') !== newPage.h1.join('|')) gaps.push(`h1: ${JSON.stringify(oldPage.h1)} -> ${JSON.stringify(newPage.h1)}`);
	if (!newPage.canonical.startsWith(opts.base + '/') && !new URL(newPage.canonical || 'http://x').pathname.startsWith(opts.base + '/')) {
		gaps.push(`canonical is not under ${opts.base}/: "${newPage.canonical}"`);
	}
	const internal = (links: string[], origin: string) => links.filter((u) => new URL(u).origin === origin).map((u) => new URL(u).pathname);
	const newPaths = internal(newPage.links, opts.newOrigin);
	for (const p of newPaths) if (!p.startsWith(opts.base + '/')) gaps.push(`link outside the base: ${p}`);
	const stripped = new Set(newPaths.map((p) => p.slice(opts.base.length) || '/'));
	for (const p of internal(oldPage.links, opts.oldOrigin)) {
		if (!stripped.has(p)) gaps.push(`link of the old page missing on the new one: ${p}`);
	}
	return gaps;
}
