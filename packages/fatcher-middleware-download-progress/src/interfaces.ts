export type DownloadProgressEvent = (current?: number, total?: number) => void;

export interface DownloadProgressOptions {
    /**
     * Trigger this function with download progress
     *
     * @default null
     */
    onDownloadProgress: DownloadProgressEvent | null;
}
