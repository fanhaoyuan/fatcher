import { getResponseStatus } from '../src';

describe('Get Response Status', () => {
    it('200 is OK', () => {
        const { status, statusText } = getResponseStatus(200);

        expect(status).toBe(200);
        expect(statusText).toBe('OK');
    });

    it('400 is Bad Request', () => {
        const { status, statusText } = getResponseStatus(400);

        expect(status).toBe(400);
        expect(statusText).toBe('Bad Request');
    });

    it('405 is Method Not Allowed', () => {
        const { status, statusText } = getResponseStatus(405);

        expect(status).toBe(405);
        expect(statusText).toBe('Method Not Allowed');
    });

    it('500 is Internal Server Error', () => {
        const { status, statusText } = getResponseStatus(500);

        expect(status).toBe(500);
        expect(statusText).toBe('Internal Server Error');
    });

    it('Not Found is undefined', () => {
        // @ts-expect-error
        const { status, statusText } = getResponseStatus(50);

        expect(status).toBe(50);
        expect(statusText).toBeUndefined();
    });
});
