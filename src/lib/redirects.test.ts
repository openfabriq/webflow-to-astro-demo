import { describe, expect, it } from 'vitest';
import { parseRedirects } from './redirects';

describe('parseRedirects', () => {
	it('returns nothing for a header-only file', () => {
		expect(parseRedirects('from,to,status\n')).toEqual({});
	});
	it('maps each row', () => {
		expect(parseRedirects('from,to,status\n/old,/blog-article,301\n')).toEqual({ '/old': '/blog-article' });
	});
	it('rejects a row without a target', () => {
		expect(() => parseRedirects('from,to\n/old,\n')).toThrow();
	});
});
