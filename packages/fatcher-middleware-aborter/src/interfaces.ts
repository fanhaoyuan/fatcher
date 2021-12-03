export interface AborterOptions {
    /**
     * Abort signal
     *
     * @default null
     */
    signal: AbortSignal | null;

    /**
     * Trigger this function with abort fetch
     *
     * @default null
     */
    onAbort: ((...args: any[]) => void) | null;

    /**
     * Request timeout
     *
     * If response out of timeout, will abort this request.
     *
     * If timeout is `0`, request will not auto abort.
     *
     * @default 0
     */
    timeout: number;
}
