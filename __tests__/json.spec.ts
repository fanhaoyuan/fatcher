import { json, fatcher, canActivate, defineMiddleware } from '../src';
import fetchMock from 'jest-fetch-mock';

describe('fatcher-middleware-json', () => {
    beforeEach(() => {
        fetchMock.mockIf(/^https:\/\/foo.bar\/get/, async request => {
            if (request.url.endsWith('?json')) {
                return {
                    body: JSON.stringify({
                        key: 'test',
                    }),
                };
            }

            return {
                body: 'test',
            };
        });

        fetchMock.enableMocks();
    });

    afterEach(() => fetchMock.disableMocks());

    it('Response json with json data', async () => {
        const res = await fatcher('https://foo.bar/get?json', {
            middlewares: [json],
        });

        expect(res).toStrictEqual({ key: 'test' });
    });

    it('Response origin data with non-json data', async () => {
        const res = await fatcher('https://foo.bar/get', {
            middlewares: [json],
        });

        expect(canActivate(res)).toBe(true);
        expect(await res.text()).toBe('test');
    });

    it('Do not apply with can not activated data', async () => {
        const originData = { key: 'test' };

        const res = await fatcher('https://foo.bar/get?json', {
            middlewares: [
                json,
                defineMiddleware({
                    name: 'test',
                    async use(context, next) {
                        const _ = await next();

                        // use it.
                        await _.json();

                        return _;
                    },
                }),
            ],
        });

        expect(canActivate(res)).toBe(false);
        expect(res).not.toStrictEqual(originData);
        expect(res.json).toThrowError();
    });
});
