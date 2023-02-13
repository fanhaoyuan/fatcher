import { parse } from '../src/core/parse';

describe('parse', () => {
    it('Parse with empty querystring', () => {
        const querystring = '';

        const params = parse(querystring);

        expect(params).toStrictEqual({});
    });

    it('Parse with normal querystring', () => {
        const querystring = 'a=b&b=c';

        const params = parse(querystring);

        expect(params).toStrictEqual({ a: 'b', b: 'c' });
    });
});
