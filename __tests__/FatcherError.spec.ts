import { isFatcherError, fatcher } from '../src';
import fetchMock from 'jest-fetch-mock';

describe('Fatcher Error Instance', () => {
    beforeEach(() => {
        fetchMock.mockIf('https://foo.bar/get', async () => {
            return {
                status: 500,
            };
        });

        fetchMock.enableMocks();
    });

    it('Receive a fatcher error when response code is not 2xx', async () => {
        try {
            await fatcher('https://foo.bar/get');
        } catch (error) {
            if (isFatcherError(error)) {
                expect(error.snapshot.response.status).toBe(500);
            }
        }
    });
});
