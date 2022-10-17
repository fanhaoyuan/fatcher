import { MaybePromise, Middleware } from './interfaces';

/**
 * Confirm a data can be transform.
 * @param response
 * @returns
 */
export function canActivate(data: unknown): data is Response {
    return data instanceof Response && !data.bodyUsed && !!data.body;
}

/**
 * Read a readable stream by chunk
 * @param readableStream
 * @param callback
 * @returns
 */
export async function readStreamByChunk<T = Uint8Array, K = void>(
    readableStream: ReadableStream<T>,
    callback: (chunk: T) => MaybePromise<K>
) {
    async function read(reader: ReadableStreamDefaultReader<T>) {
        const { value, done } = await reader.read();

        if (done || !value) {
            return;
        }

        await callback(value);

        await read(reader);
    }

    return read(readableStream.getReader());
}

/**
 * A helper function for defineMiddleware
 * @param middleware
 * @param displayName
 * @returns
 */
export function defineMiddleware(middleware: Middleware, displayName?: string): Middleware {
    middleware.displayName = displayName || 'Anonymous';
    return middleware;
}
