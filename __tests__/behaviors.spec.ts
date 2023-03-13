import fetchMock from 'jest-fetch-mock';
import { fatcher } from '../src';

describe('Request behavior with fetch', () => {
    beforeEach(() => {
        fetchMock.mockIf('https://foo.bar/get', async () => {
            return {};
        });

        fetchMock.enableMocks();
    });

    afterEach(() => fetchMock.disableMocks());

    it('[Success] Same behavior with fetch', async () => {
        const input = 'https://foo.bar/get';
        const res = await fatcher(input);
        const res1 = await fetch(input);
        expect(res).toStrictEqual(res1);
    });

    it('[Fail] Same behavior with fetch', async () => {
        const input = '/get';
        let err, err1;
        try {
            await fatcher(input);
        } catch (error) {
            err = error;
        }

        try {
            await fetch(input);
        } catch (error) {
            err1 = error;
        }

        expect(err).toStrictEqual(err1);
    });
});
