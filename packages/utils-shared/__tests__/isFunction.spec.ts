import { isFunction } from '../src';

describe('isFunction', () => {
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
});
