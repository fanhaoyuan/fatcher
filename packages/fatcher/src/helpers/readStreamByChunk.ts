import { MaybePromise } from '../interfaces';

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
    async function read(reader: ReadableStreamReader<T>) {
        const { value, done } = await reader.read();

        if (done || !value) {
            return;
        }

        await callback(value);

        await read(reader);
    }

    return read(readableStream.getReader());
}
