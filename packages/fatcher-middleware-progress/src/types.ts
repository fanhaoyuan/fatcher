// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as fatcher from 'fatcher';

declare module 'fatcher' {
  interface FatcherOptions {
    onDownloadProgress?: (current: number, total: number) => void;
  }
}
