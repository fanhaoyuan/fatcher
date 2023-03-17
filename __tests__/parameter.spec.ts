import fetchMock from 'jest-fetch-mock';
import { fatcher, parameter } from '../src';

describe('fatcher-middleware-parameter', () => {
    beforeEach(() => {
        fetchMock.mockIf(/^https:\/\/foo.bar\/get/, async request => {
            const [, querystring] = request.url.split('?');
            return {
                body: querystring,
            };
        });

        fetchMock.enableMocks();
    });

    afterEach(() => fetchMock.disableMocks());

    it('Transform context params to querystring', async () => {
        const response = await fatcher('https://foo.bar/get', {
            middlewares: [parameter],
            params: {
                page: 1,
                pageSize: 10,
            },
        });

        expect(await response.text()).toBe('page=1&pageSize=10');
    });

    it('Merge origin querystring into context params', async () => {
        const response = await fatcher('https://foo.bar/get?order=0', {
            middlewares: [parameter],
            params: {
                page: 1,
                pageSize: 10,
            },
        });

        expect(await response.text()).toBe('page=1&pageSize=10&order=0');
    });

    it('Prefer context params, it will cover origin querystring', async () => {
        const response = await fatcher('https://foo.bar/get?page=10&order=0', {
            middlewares: [parameter],
            params: {
                page: 1,
                pageSize: 10,
            },
        });

        expect(await response.text()).toBe('page=1&pageSize=10&order=0');
    });

    it('Nothing happen when params is empty', async () => {
        const response = await fatcher('https://foo.bar/get?page=10&order=0', {
            middlewares: [parameter],
        });

        expect(await response.text()).toBe('page=10&order=0');
    });

    it('Filter context params when params is undefined', async () => {
        const response = await fatcher('https://foo.bar/get?page=10&order=0', {
            middlewares: [parameter],
            params: {
                page: 1,
                pageSize: 10,
                name: undefined,
            },
        });

        expect(await response.text()).toBe('page=1&pageSize=10&order=0');
    });
});
