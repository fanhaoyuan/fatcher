import { Middleware } from '../interfaces';
import { AbortError } from '../helpers';

/**
 * A Fatcher middleware for abort fetch
 *
 * Inline onAbort callback will `replace` globals onAbort callback
 *
 * @param onAbort Inline onAbort callback
 * @returns
 *
 * - A Fatcher `middleware` to register.
 *
 * - A Function to `abort` current fetch.
 */
export function aborter(onAbort: ((...args: any[]) => void) | null = null) {
    const abortController = new AbortController();

    /**
     * Response flag
     *
     * Will be truly when fetch has response
     */
    let isResponse = false;

    let _onAbort = onAbort;

    const middleware: Middleware = {
        name: 'fatcher-middleware-aborter',
        apply(context) {
            if ((onAbort || context.options.onAbort) && context.options.timeout > 0) {
                return true;
            }
            return false;
        },
        async use(context, next) {
            try {
                /**
                 * prefer inline onAbort
                 */
                if (!_onAbort && context.options.onAbort) {
                    _onAbort = context.options.onAbort;
                }

                const response = await Promise.race([
                    next({
                        options: {
                            signal: abortController.signal,
                        },
                    }),
                    (async function timer(): Promise<never> {
                        return new Promise((_, reject) => {
                            setTimeout(() => {
                                abortController.abort();
                                reject(new Error());
                            }, context.options.timeout);
                        });
                    })(),
                ]);

                isResponse = true;

                return response;
            } catch (error) {
                /**
                 * Catch a error of aborted fetch.
                 *
                 * Signal aborted will be true.
                 *
                 * So we know is a error of aborted fetch.
                 *
                 * throw a AbortError
                 */
                if (abortController.signal.aborted) {
                    return Promise.reject(new AbortError(context.options));
                }

                /**
                 * Other error should throw it out.
                 */
                throw error;
            }
        },
    };

    /**
     * Register onAbort callback
     */
    abortController.signal.onabort = _onAbort;

    function abort() {
        /**
         * We can abort fetch before response
         */
        if (isResponse) {
            return;
        }

        abortController.abort();
    }

    return [middleware, abort] as const;
}
