import { immutable, isFunction } from '../../src/utils';

describe('Utils', () => {
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
