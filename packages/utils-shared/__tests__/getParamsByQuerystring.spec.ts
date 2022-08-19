import { getParamsByQuerystring } from '../src';

describe('Get Params object By Querystring', () => {
    it('With empty querystring', () => {
        const querystring = '';

        const params = getParamsByQuerystring(querystring);

        expect(params).toStrictEqual({});
    });

    it('With normal querystring', () => {
        const querystring = 'a=b&b=c';

        const params = getParamsByQuerystring(querystring);

        expect(params).toStrictEqual({ a: 'b', b: 'c' });
    });
});
