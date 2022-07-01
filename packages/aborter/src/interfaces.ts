import { Context } from 'fatcher';

export type AbortReason = 'concurrency' | 'timeout' | 'manual';

export type AbortEventHandler = (type: AbortReason) => void;

export type RoadSign = {
    abort: (type: AbortReason) => void;
    timer: NodeJS.Timeout | null;
    signal: AbortSignal;
};

export type RoadMap = Record<string, RoadSign[]>;

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
    onAbort?: AbortEventHandler | null;

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
