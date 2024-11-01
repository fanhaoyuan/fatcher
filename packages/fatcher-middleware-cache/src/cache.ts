import { FatcherMiddleware, FatcherResponse } from 'fatcher';

const cacheMap = new Map<string, { expireTime: number; response: FatcherResponse }>();

export const cache = () => {
  return (async (req, next) => {
    const { ttl = 0, flush } = req.options;

    const method = req.method.toUpperCase();

    if (method !== 'GET') {
      return next();
    }

    const cacheKey = `${method} ${req.url}`;

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
  }) as FatcherMiddleware;
};
