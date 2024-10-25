import { readStreamByChunk } from '@fatcherjs/utils-shared';
import { FatcherMiddleware } from 'fatcher';
import { ProgressOptions } from './types';

export const progress = (options: ProgressOptions = {}): FatcherMiddleware => {
  return async (context, next) => {
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
  };
};
