import { Middleware, canActivate, Context, MiddlewareResult } from 'fatcher';
import { CacheOptions } from './interfaces';

const cacheMap = new Map<string, MiddlewareResult>();

const timer: Record<string, NodeJS.Timer> = {};

function getClonedData(data: unknown) {
    return canActivate(data) ? data.clone() : data;
}

/**
 * A middleware for cache response result
 * @param options
 */
export function cache(options: CacheOptions): Middleware {
    const { validate = (context: Context) => context.method === 'GET', ttl = 60000, useCache = true } = options;

    return {
        name: 'fatcher-middleware-cache',
        async use(context, next) {
            if (!useCache) {
                return next();
            }

            const cacheKey = `${context.method} ${context.url}`;

            if (cacheMap.has(cacheKey)) {
                const result = cacheMap.get(cacheKey) as MiddlewareResult;

                return {
                    ...result,
                    data: getClonedData(result.data),
                };
            }

            const result = await next();

            if (!validate(context) || ttl <= 0) {
                return result;
            }

            // clone and save;
            const clonedData = getClonedData(result.data);

            cacheMap.set(cacheKey, {
                ...result,
                data: clonedData,
            });

            timer[cacheKey] = setTimeout(() => {
                cacheMap.delete(cacheKey);
                delete timer[cacheKey];
            }, ttl);

            return result;
        },
    };
}
