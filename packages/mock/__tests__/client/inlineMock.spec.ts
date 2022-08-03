import { fatcher } from 'fatcher';
import { mock } from '../../src/client';

describe('Inline Mock', () => {
    it('Inline Mock', async () => {
        const { data } = await fatcher({
            url: '/mock',
            middlewares: [
                mock({
                    schema: {
                        id: 'guid',
                        name: 'cname',
                    },
                }),
            ],
        });

        expect(typeof data.id === 'string').toBe(true);
        expect(typeof data.name === 'string').toBe(true);
    });
});
