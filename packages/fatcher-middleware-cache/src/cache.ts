import { FatcherMiddleware } from 'fatcher';

const cacheMap = new Map<string, { expireTime: number; response: Response }>();

export const cache: FatcherMiddleware = {
  name: 'fatcher-middleware-cache',
  use: async (context, next) => {
    const { ttl = 0, flush } = context;

    const method = context.request.method.toUpperCase();

    if (method !== 'GET') {
      return next();
    }

    const cacheKey = `${method} ${context.request.url}`;

    const hitCache = cacheMap.get(cacheKey);

    if (hitCache && !flush) {
      const isValid = hitCache.expireTime > Date.now();
      if (isValid) {
        return hitCache.response;
      }
      cacheMap.delete(cacheKey);
    }

    const response = await next();

    if (ttl > 0) {
      const expireTime = Date.now() + ttl;
      cacheMap.set(cacheKey, { response: response.clone(), expireTime });
    }

    return response;
  },
};
