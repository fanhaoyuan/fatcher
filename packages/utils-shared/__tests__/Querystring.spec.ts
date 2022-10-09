import { Querystring } from '../src';

describe('Querystring', () => {
    it('Parse with empty querystring', () => {
        const querystring = '';

        const params = Querystring.parse(querystring);

        expect(params).toStrictEqual({});
    });

    it('Parse with normal querystring', () => {
        const querystring = 'a=b&b=c';

        const params = Querystring.parse(querystring);

        expect(params).toStrictEqual({ a: 'b', b: 'c' });
    });

    it('Stringify with empty params object', () => {
        const params: Record<string, string> = {};

        const querystring = Querystring.stringify(params);

        expect(querystring).toBe('');
    });

    it('Stringify with normal params object', () => {
        const params: Record<string, string> = {
            a: 'b',
            b: 'c',
        };

        const querystring = Querystring.stringify(params);

        expect(querystring).toBe('a=b&b=c');
    });

    it('Stringify With params has undefined value', () => {
        const params: Record<string, string | undefined> = {
            a: 'b',
            c: undefined,
        };

        const querystring = Querystring.stringify(params);

        expect(querystring).toBe('a=b');
    });

    it('Stringify With params all is undefined', () => {
        const params: Record<string, string | undefined> = {
            a: undefined,
            c: undefined,
        };

        const querystring = Querystring.stringify(params);

        expect(querystring).toBe('');
    });
});
