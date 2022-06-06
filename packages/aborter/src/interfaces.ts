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
}
