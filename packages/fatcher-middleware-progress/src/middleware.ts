import { defineMiddleware } from 'fatcher';
import { ProgressOptions } from './types';

async function readStreamByChunk(
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

export const progress = (options: ProgressOptions = {}) => {
  return defineMiddleware(async (context, next) => {
    const { onDownloadProgress } = options;

    const response = await next();

    if (!onDownloadProgress || !response.body) {
      return response;
    }

    const total = Number(response.headers.get('content-length')) ?? 0;

    if (!total) {
      return response;
    }

    let current = 0;

    const [stream, tee] = response.body.tee();

    readStreamByChunk(stream, chunk => {
      current += chunk.length;
      onDownloadProgress(current, total);
    });

    return new Response(tee, response);
  });
};
