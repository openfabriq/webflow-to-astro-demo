/** Prefix a site path ("/", "/blog-article") with the base of the site. */
export function withBase(path: string, base: string = import.meta.env.BASE_URL): string {
	const root = base.endsWith('/') ? base : `${base}/`;
	return root + path.replace(/^\/+/, '');
}
