import { immutable, isFunction, normalizeURL } from '../../src/utils';

describe('Utils', () => {
    it('normalizeURL', () => {
        expect(normalizeURL('/test', '/a')).toBe('/test/a');
        expect(normalizeURL('https://test/a/c', '/t/e')).toBe('https://test/a/c/t/e');
        expect(normalizeURL('/', '')).toBe('/');
        expect(normalizeURL('/', 'https://a/c')).toBe('https://a/c');
        expect(normalizeURL('https://a/b', 'https://a/c')).toBe('https://a/c');
        expect(normalizeURL('/', 'file://a/b')).toBe('file://a/b');
        expect(normalizeURL('/', '/a/c')).toBe('/a/c');
        expect(normalizeURL('/', 'a/c')).toBe('/a/c');
        expect(normalizeURL('/', './a/c')).toBe('/a/c');
        expect(normalizeURL('/b/e', '../a/c')).toBe('/b/a/c');
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

        //@ts-expect-error
        immutableObject.a = '';

        expect(immutableObject.a).toBe('c');

        object.a = '';

        expect(object.a).toBe('');
    });
});
