import { defineMiddleware } from 'fatcher';

export const json = () => {
  return defineMiddleware(async (context, next) => {
    const response = await next();

    if (!response.bodyUsed || !response.body) {
      return response;
    }

    const clonedResponse = response.clone();

    try {
      /**
       * Clone a response to try.
       */
      const data = await clonedResponse.json();

      return data;
    } catch {
      /**
       * If transform error.
       *
       * Return origin result.
       */
    }

    return response;
  });
};
