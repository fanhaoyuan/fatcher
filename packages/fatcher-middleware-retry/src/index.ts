import { Middleware, fatcher, clone, isFatcherError } from 'fatcher';
import { RetryOptions } from './interfaces';

/**
 * Middleware for reconnect during catch error of fetch.
 * @param inlineOptions inline options for retry middleware.
 * @returns
 */
export default function retry(inlineOptions: RetryOptions = {}): Middleware {
    return {
        name: 'fatcher-middleware-retry',
        apply() {
            /**
             * If inlineOptions set `0`, it mean will not apply this middleware.
             */
            return inlineOptions.limit !== 0;
        },
        async use(context, next) {
            const defaultOptions: Required<RetryOptions> = {
                limit: 3,
                retryDelay: 0,
                beforeRetry: null,
                afterRetry: null,
            };

            const options = Object.assign(defaultOptions, context.options, inlineOptions);

            let limit = options.limit;

            /**
             * Assert a number because filter it in apply();
             */

            try {
                const response = await next();

                return response;
            } catch (error: any) {
                if (isFatcherError(error) && limit > 0) {
                    limit--;

                    const errorResponse = await error.toJSON();

                    const { beforeRetry, retryDelay, afterRetry } = options;

                    if (beforeRetry?.(errorResponse, limit) === false) {
                        throw error;
                    }

                    if (retryDelay > 0) {
                        await new Promise(resolve => setTimeout(() => resolve(true), retryDelay));
                    }

                    return new Promise(resolve => {
                        fatcher({ ...clone(context.options), limit }).then(res => resolve(res));

                        afterRetry?.();
                    });
                }

                throw error;
            }
        },
    };
}
