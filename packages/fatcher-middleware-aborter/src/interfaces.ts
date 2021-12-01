import 'fatcher';
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
}

declare module 'fatcher' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface RequestOptions extends AborterOptions {}
}
