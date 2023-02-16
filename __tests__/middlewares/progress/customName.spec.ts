import { fatcher, progress } from '../../../src';
import { responser } from './utils';

describe('Custom Length Name', () => {
    const cof = 1000;
    const length = 100_000;

    it('Custom name', async () => {
        let chunk = 0;

        function onDownloadProgress(current: number, total: number) {
            expect(current).toBe(cof * (chunk + 1));
            expect(total).toBe(length);
            chunk++;
        }

        const customName = 'total-length';

        const result = await fatcher({
            url: '/download/progress',
            middlewares: [
                progress({
                    onDownloadProgress,
                    lengthName: customName,
                }),
                responser({
                    cof,
                    length,
                    customName,
                }),
            ],
        });

        const text = await new Response(result.data).text();

        expect(text.length).toBe(length);
        expect(length / cof).toBe(chunk);
    });
});
