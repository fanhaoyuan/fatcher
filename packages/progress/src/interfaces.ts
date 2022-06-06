export interface ProgressOptions {
    /**
     * Callback with read stream chunks.
     *
     * @default null
     */
    onDownloadProgress?: ((current: number, total: number) => void) | null;
}
