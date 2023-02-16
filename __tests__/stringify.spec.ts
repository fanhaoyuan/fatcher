import { stringify } from '../src/core/stringify';

describe('stringify', () => {
    it('Stringify with empty params object', () => {
        const params: Record<string, string> = {};

        const querystring = stringify(params);

        expect(querystring).toBe('');
    });

    it('Stringify with normal params object', () => {
        const params: Record<string, string> = {
            a: 'b',
            b: 'c',
        };

        const querystring = stringify(params);

        expect(querystring).toBe('a=b&b=c');
    });

    it('Stringify With params has undefined value', () => {
        const params: Record<string, string | undefined> = {
            a: 'b',
            c: undefined,
        };

        const querystring = stringify(params);

        expect(querystring).toBe('a=b');
    });

    it('Stringify With params all is undefined', () => {
        const params: Record<string, string | undefined> = {
            a: undefined,
            c: undefined,
        };

        const querystring = stringify(params);

        expect(querystring).toBe('');
    });
});
