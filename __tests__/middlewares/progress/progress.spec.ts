import { fatcher, progress } from '../../../src';
import { responser } from './utils';

describe('Progress', () => {
    const cof = 1000;
    const length = 100_000;

    it('Download Progress', async () => {
        let chunk = 0;

        function onDownloadProgress(current: number, total: number) {
            expect(current).toBe(cof * (chunk + 1));
            expect(total).toBe(length);
            chunk++;
        }

        const result = await fatcher({
            url: '/download/progress',
            middlewares: [
                progress({
                    onDownloadProgress,
                }),
                responser({
                    cof,
                    length,
                }),
            ],
        });

        const text = await new Response(result.data).text();

        expect(text.length).toBe(length);
        expect(length / cof).toBe(chunk);
    });

    it('Without download progress callback', async () => {
        const result = await fatcher({
            url: '/download/without/callback',
            middlewares: [progress(), responser({ cof, length })],
        });

        const text = await new Response(result.data).text();

        expect(text.length).toBe(length);
    });

    it('Content-Length is 0', async () => {
        let chunk = 0;

        function onDownloadProgress(current: number, total: number) {
            expect(current).toBe(cof * (chunk + 1));
            expect(total).toBe(length);
            chunk++;
        }

        const data = '1000000';

        const result = await fatcher({
            url: '/download/progress',
            middlewares: [
                progress({
                    onDownloadProgress,
                }),
                responser({
                    cof,
                    length: 0,
                    data,
                }),
            ],
        });

        const text = await new Response(result.data).text();

        expect(text.length).toBe(data.length);
        expect(text).toBe(data);
        expect(chunk).toBe(0);
    });

    it('Without Content-Length in headers', async () => {
        let chunk = 0;

        function onDownloadProgress(current: number, total: number) {
            expect(current).toBe(cof * (chunk + 1));
            expect(total).toBe(length);
            chunk++;
        }

        const data = '1000000';

        const result = await fatcher({
            url: '/download/progress',
            middlewares: [
                progress({
                    onDownloadProgress,
                }),
                responser({
                    noHeaders: true,
                    data,
                }),
            ],
        });

        const text = await new Response(result.data).text();

        expect(text.length).toBe(data.length);
        expect(text).toBe(data);
        expect(chunk).toBe(0);
    });

    it('Invalid Content-Length', async () => {
        let chunk = 0;

        function onDownloadProgress(current: number, total: number) {
            expect(current).toBe(cof * (chunk + 1));
            expect(total).toBe(length);
            chunk++;
        }

        const data = '1000000';

        const result = await fatcher({
            url: '/download/progress',
            middlewares: [
                progress({
                    onDownloadProgress,
                }),
                responser({
                    cof,
                    // @ts-expect-error
                    length: 'awetonaowentnaowetnawnetoanwoteanoznoenaot',
                    data,
                }),
            ],
        });

        const text = await new Response(result.data).text();

        expect(text.length).toBe(data.length);
        expect(text).toBe(data);
        expect(chunk).toBe(0);
    });
});
