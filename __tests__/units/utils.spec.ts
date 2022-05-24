import { immutable, isAbsoluteURL, isFunction, normalizeURL } from 'fatcher/utils';

describe('Utils', () => {
    it('isAbsoluteURL', () => {
        expect(isAbsoluteURL('https://a/test')).toBe(true);
        expect(isAbsoluteURL('a/b/c')).toBe(false);
        expect(isAbsoluteURL('http://a/b/c')).toBe(true);
        expect(isAbsoluteURL('/test/a')).toBe(false);
    });

    it('normalizeURL', () => {
        expect(normalizeURL('/test', '/a')).toBe('/test/a');
        expect(normalizeURL('https://test/a/c', '/t/e')).toBe('https://test/a/c/t/e');
        expect(normalizeURL('/', '')).toBe('/');
        expect(normalizeURL('/', 'https://a/c')).toBe('https://a/c');
        expect(normalizeURL('/', '/a/c')).toBe('/a/c');
    });

    it('isFunction', () => {
        expect(isFunction(() => null)).toBe(true);
        expect(isFunction('1')).toBe(false);
        expect(isFunction(2)).toBe(false);
        expect(isFunction({})).toBe(false);
        expect(isFunction([])).toBe(false);
        expect(isFunction(null)).toBe(false);
        expect(isFunction(new Map())).toBe(false);
        expect(isFunction(new Set())).toBe(false);
        // eslint-disable-next-line no-new-func
        expect(isFunction(new Function())).toBe(true);
    });

    it('immutable', () => {
        const object = {
            a: 'c',
        };

        const immutableObject = immutable(object);

        try {
            immutableObject.a = '';
        } catch (error) {
            expect(error instanceof TypeError).toBe(true);
        }

        expect(immutableObject.a).toBe('c');

        object.a = '';

        expect(object.a).toBe('');
    });
});
