export async function readStreamByChunk(
  readableStream: ReadableStream,
  callback: (value: string) => Promise<void> | void,
) {
  async function read(reader: ReadableStreamDefaultReader) {
    const { value, done } = await reader.read();
    if (done) {
      return;
    }
    await callback(value);
    await read(reader);
  }
  return read(readableStream.getReader());
}
