export interface ProgressOptions {
    /**
     * Callback with read stream chunks.
     *
     * @default null
     */
    onDownloadProgress?: ((current: number, total: number) => void) | null;

    /**
     * Custom name in headers with content-length
     *
     * @default 'content-length'
     */
    lengthName?: string;
}
