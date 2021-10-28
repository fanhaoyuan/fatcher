/**
 * Read a readable stream by chunk
 * @param readableStream
 * @param callback
 * @returns
 */
export async function chunkStreamReader<T = Uint8Array>(
    readableStream: ReadableStream<T>,
    callback: (chunk: T) => void
) {
    return (async function read(reader: ReadableStreamReader<T>) {
        const { value, done } = await reader.read();

        if (done || !value) {
            return;
        }

        callback(value);

        await read(reader);
    })(readableStream.getReader());
}
