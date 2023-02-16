import { canActivate } from '../../core';
import { defineMiddleware } from '../../helpers';
import { Middleware } from '../../interfaces';
import { ProgressOptions } from './interfaces';

/**
 * A Middleware for getting progress
 * @param options
 * @returns
 */
export function progress(options: ProgressOptions = {}): Middleware {
    const { onDownloadProgress, lengthName = 'content-length' } = options;

    return defineMiddleware(async (context, next) => {
        const result = await next();

        const data = result.data;

        if (!canActivate(data)) {
            return result;
        }

        const originStream = data.body;

        if (!originStream) {
            return result;
        }

        if (!onDownloadProgress) {
            return result;
        }

        const total = ~~(result.headers.get(lengthName) || 0);

        if (total === 0) {
            return result;
        }

        const readableStream = new ReadableStream({
            start(controller) {
                let current = 0;

                (async function push(reader: ReadableStreamDefaultReader<Uint8Array>) {
                    const { done, value } = await reader.read();

                    if (done) {
                        controller.close();
                        return;
                    }

                    controller.enqueue(value);
                    current += value.length;
                    onDownloadProgress(current, total);
                    await push(reader);
                })(originStream.getReader());
            },
        });

        return {
            ...result,
            data: readableStream,
        };
    }, 'fatcher-middleware-progress');
}
