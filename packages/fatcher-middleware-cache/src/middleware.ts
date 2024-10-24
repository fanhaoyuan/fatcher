import { defineMiddleware } from 'fatcher';
import { CacheOptions } from './types';

const cacheMap = new Map<string, Response>();

export const cache = (options: CacheOptions = {}) => {
  return defineMiddleware(async (req, next) => {
    const { ttl = 0, useCache } = options;

    if (!useCache || ttl <= 0 || !req.url || req.method?.toUpperCase() !== 'GET') {
      return next();
    }

    const cacheKey = `${req.method} ${req.url}`;

    if (cacheMap.has(cacheKey)) {
      return cacheMap.get(cacheKey)!.clone();
    }

    const response = await next();

    const clonedResponse = response.clone();

    cacheMap.set(cacheKey, clonedResponse);

    setTimeout(() => {
      cacheMap.delete(cacheKey);
    }, ttl);

    return response;
  });
};
