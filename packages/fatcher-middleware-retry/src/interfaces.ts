import * as Fatcher from 'fatcher';

export interface RetryOptions {
    /**
     * Retry times
     *
     * If limit is `0`. Will not retry when request error
     *
     * @default 3
     */
    limit?: number;

    /**
     * Delay time (**ms**) between the two retries.
     *
     * If `0`, will retry immediately when catch a fatcher error
     *
     * @default 0
     */
    retryDelay?: number;

    /**
     * The hook before getting retry
     *
     * If this hook return `false`, it will not retry and throw error which catch by last time.
     *
     * @default null
     */
    beforeRetry?:
        | ((errorResponse: Fatcher.Response<string | Record<string, any>>, limit: number) => boolean | void)
        | null;

    /**
     * The hook after retry connect
     */
    afterRetry?: (() => void) | null;
}

declare module 'fatcher' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface RequestOptions extends RetryOptions {}
}
