import { Middleware } from 'fatcher';
import { chunkStreamReader } from 'utils-shared';
import { DownloadProgressEvent } from './interfaces';
export * from './interfaces';
/**
 * Imitating download progress events.
 * - Total length comes from response `headers['content-type']`
 * - Read chunk of stream to get current progress
 *
 * @param onDownloadProgress inline download progress callback
 */
export default function downloadProgress(onDownloadProgress?: DownloadProgressEvent): Middleware {
    return {
        name: 'fatcher-middleware-download-progress',
        apply(context) {
            if (!onDownloadProgress && !context.options.onDownloadProgress) {
                return false;
            }

            return true;
        },
        async use(context, next) {
            const response = await next();

            let total: number;

            try {
                total = parseInt(response.headers['content-length'] ?? '0');

                if (Number.isNaN(total)) {
                    throw new Error();
                }
            } catch {
                total = 0;
            }

            let current = 0;

            const [progressStream, data] = response.data.tee();

            await chunkStreamReader(progressStream, chunk => {
                current += chunk.length;

                /**
                 * prefer inline callback
                 */
                (onDownloadProgress || context.options.onDownloadProgress)?.(current, total);
            });

            return Object.assign({}, response, { data });
        },
    };
}
