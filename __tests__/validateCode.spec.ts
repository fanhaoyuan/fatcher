import fetchMock from 'jest-fetch-mock';
import { fatcher } from '../src';

describe('Validate Code', () => {
    beforeEach(() => {
        fetchMock.mockIf(/^https:\/\/foo.bar\/get/, async request => {
            const [, queryString] = request.url.split('?');
            const params = new URLSearchParams(queryString);

            return {
                status: ~~params.get('code')!,
            };
        });

        fetchMock.enableMocks();
    });

    afterEach(() => fetchMock.disableMocks());

    it('Request successfully with code 10001', async () => {
        const res = await fatcher('https://foo.bar/get?code=10001', {
            validateCode: code => code === 10001,
        });

        expect(res.status).toBe(10001);
    });
});
