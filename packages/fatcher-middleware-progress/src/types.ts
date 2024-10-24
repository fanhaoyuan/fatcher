export interface ProgressOptions {
  onDownloadProgress?: (current: number, total: number) => void;
}
