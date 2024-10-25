import { FatcherMiddleware } from 'fatcher';
import { readStreamByChunk } from '../../utils-shared/dist';

export const json = (): FatcherMiddleware => {
  return async (context, next) => {
    const response = await next();

    if (response.bodyUsed || !response.body) {
      return response;
    }

    const clonedResponse = response.clone();

    response.toJson = async () => {
      let string = '';

      await readStreamByChunk(clonedResponse.body!, chunk => {
        console.log(Buffer.isBuffer(chunk));

        string += chunk;
      });

      console.log(string);

      return JSON.parse(string);
    };

    return response;
  };
};
