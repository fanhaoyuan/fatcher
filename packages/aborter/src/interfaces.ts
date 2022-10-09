import { Context } from 'fatcher';

export type RoadSign = {
    abort: () => void;
    signal: AbortSignal;
};

export type RoadMap = Record<string, RoadSign[]>;

declare module 'fatcher' {
    // eslint-disable-next-line no-shadow
    interface Context {
        /**
         * Provides with aborter
         *
         * @require `@fatcherjs/middleware-aborter`
         */
        abort: () => void;

        /**
         * Provides with aborter
         *
         * @require `@fatcherjs/middleware-aborter`
         */
        signal: AbortSignal;
    }
}

export interface AborterOptions {
    /**
     * Request timeout
     *
     * `ms`
     *
     * @default 0
     */
    timeout?: number;

    /**
     * Callback with aborted request.
     *
     * @default null
     */
    onAbort?: (() => void) | null;

    /**
     * Request concurrency restrictions
     *
     * @default false
     */
    concurrency?: boolean;

    /**
     * Concurrency key.
     */
    groupBy?: (context: Readonly<Context>) => string;
}
