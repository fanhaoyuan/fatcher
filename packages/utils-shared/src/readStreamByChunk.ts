export async function readStreamByChunk<T = Uint8Array>(
  readableStream: ReadableStream<T>,
  callback: (value: T) => Promise<void> | void,
) {
  async function read(reader: ReadableStreamDefaultReader<T>) {
    const { value, done } = await reader.read();
    if (done) {
      return;
    }
    await callback(value);
    await read(reader);
  }
  return read(readableStream.getReader());
}
