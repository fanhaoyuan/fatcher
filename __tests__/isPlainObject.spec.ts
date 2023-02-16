import { isPlainObject } from '../src/utils';

describe('isPlainObject', () => {
    it('The object create by null is plain object', () => {
        expect(isPlainObject(Object.create(null))).toBe(true);
    });

    it('The literal object is plain object', () => {
        expect(isPlainObject({})).toBe(true);
    });

    it('Array is not a plain object', () => {
        expect(isPlainObject([])).toBe(false);
    });

    it('FormData is not a plain object', () => {
        expect(isPlainObject(new FormData())).toBe(false);
    });

    it('ReadableStream is not a plain object', () => {
        expect(isPlainObject(new ReadableStream())).toBe(false);
    });

    it('Blob is not a plain object', () => {
        expect(isPlainObject(new Blob())).toBe(false);
    });

    it('URLSearchParams is not a plain object', () => {
        expect(isPlainObject(new URLSearchParams())).toBe(false);
    });
});
