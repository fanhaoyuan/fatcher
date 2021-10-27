import { Middleware, AbortError } from '../interfaces';

/**
 * A Fatch middleware for abort fetch
 *
 * Inline onAbort callback will `replace` globals onAbort callback
 *
 * @param onAbort Inline onAbort callback
 * @returns
 *
 * - A Fatch `middleware` to register.
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
        name: 'fatch-middleware-aborter',
        async use(context, next) {
            try {
                /**
                 * prefer inline onAbort
                 */
                if (!_onAbort && context.options.onAbort) {
                    _onAbort = context.options.onAbort;
                }

                const response = await next({
                    options: {
                        signal: abortController.signal,
                    },
                });

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
                    const abortError: AbortError = {
                        isAborted: true,
                        url: context.options.url,
                    };

                    return Promise.reject(new Error(JSON.stringify(abortError)));
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
