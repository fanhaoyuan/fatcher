import { generator } from '../../src/node';

describe('Generator', () => {
    it('Generate a service worker with template', async () => {
        const sw = await generator([]);

        expect(typeof sw === 'string').toBe(true);
    });
});
