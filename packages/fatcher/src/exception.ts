import { defineMiddleware } from './defineMiddleware';
import { FatcherError } from './FatcherError';
import { ExceptionOptions } from './types';

export const exception = (options: ExceptionOptions = {}) => {
  return defineMiddleware(async (context, next) => {
    const { validateCode } = options;

    const response = await next();

    if (validateCode?.(response.status)) {
      return response;
    }

    if (response.ok) {
      return response;
    }

    return Promise.reject(new FatcherError(context, response));
  });
};
