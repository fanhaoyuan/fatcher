import { readStreamByChunk } from '@fatcherjs/utils-shared';
import { FatcherMiddleware } from 'fatcher';

export const json: FatcherMiddleware = {
  name: 'fatcher-middleware-json',
  use: async (context, next) => {
    const response = await next();

    if (response.bodyUsed || !response.body) {
      response.readStreamAsJson = async () => null;
      return response;
    }

    const clonedResponse = response.clone();

    response.readStreamAsJson = async onRead => {
      const textDecoder = new TextDecoder();
      let string = '';

      await readStreamByChunk(clonedResponse.body!, chunk => {
        const currentChunkString = textDecoder.decode(chunk, { stream: true });
        string += currentChunkString;
        onRead?.(currentChunkString, chunk);
      });

      string += textDecoder.decode(undefined, { stream: false });
      try {
        return JSON.parse(string);
      } catch {
        return null;
      }
    };

    return response;
  },
};
