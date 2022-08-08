import { isRequestWithoutBody } from '../../src/utils';

describe('Is Request Without Body', () => {
    it('GET without body', () => {
        const boolean = isRequestWithoutBody('GET');

        expect(boolean).toBe(true);
    });

    it('POST with body', () => {
        const boolean = isRequestWithoutBody('POST');

        expect(boolean).toBe(false);
    });

    it('PUT with body', () => {
        const boolean = isRequestWithoutBody('PUT');

        expect(boolean).toBe(false);
    });

    it('DELETE with body', () => {
        const boolean = isRequestWithoutBody('DELETE');

        expect(boolean).toBe(false);
    });

    it('HEAD with body', () => {
        const boolean = isRequestWithoutBody('HEAD');

        expect(boolean).toBe(true);
    });

    it('OPTIONS with body', () => {
        const boolean = isRequestWithoutBody('OPTIONS');

        expect(boolean).toBe(false);
    });
});
