import 'fatcher';

export type DownloadProgressEvent = (current?: number, total?: number) => void;

export interface DownloadProgressOptions {
    /**
     * Trigger this function with download progress
     *
     * @default null
     */
    onDownloadProgress: DownloadProgressEvent | null;
}

declare module 'fatcher' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface RequestOptions extends DownloadProgressOptions {}
}
