import { Context } from 'fatcher';

export type RoadSign = {
    abort: () => void;
    signal: AbortSignal;
};

export type RoadMap = Record<string, RoadSign[]>;

export interface AborterMiddlewareContext extends Readonly<Context> {
    /**
     * Provides with aborter
     *
     * @require `@fatcherjs/middleware-aborter`
     */
    abort: () => void;

    signal: AbortSignal;
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
