import { readStreamByChunk } from '@fatcherjs/utils-shared';
import { FatcherMiddleware } from 'fatcher';

export const progress = () => {
  return (async (context, next) => {
    const {
      options: { onDownloadProgress },
    } = context;

    const response = await next();

    if (!onDownloadProgress || !response.body || response.bodyUsed) {
      return response;
    }

    const total = Number(response.headers.get('content-length') || 0);

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
  }) as FatcherMiddleware;
};
