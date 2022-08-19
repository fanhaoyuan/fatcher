import { getQuerystringByParams } from '../src';

describe('Get Querystring By Params Object', () => {
    it('With empty params object', () => {
        const params: Record<string, string> = {};

        const querystring = getQuerystringByParams(params);

        expect(querystring).toBe('');
    });

    it('With normal params object', () => {
        const params: Record<string, string> = {
            a: 'b',
            b: 'c',
        };

        const querystring = getQuerystringByParams(params);

        expect(querystring).toBe('a=b&b=c');
    });

    it('with params has undefined value', () => {
        const params: Record<string, string | undefined> = {
            a: 'b',
            c: undefined,
        };

        const querystring = getQuerystringByParams(params);

        expect(querystring).toBe('a=b');
    });

    it('with params all is undefined', () => {
        const params: Record<string, string | undefined> = {
            a: undefined,
            c: undefined,
        };

        const querystring = getQuerystringByParams(params);

        expect(querystring).toBe('');
    });
});
