// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as fatcher from 'fatcher';

declare module 'fatcher' {
  interface FatcherRequest {
    abort: (reason?: string) => void;
  }

  interface FatcherOptions {
    timeout?: number;
    onAbort?: (reason?: string) => void;
    abortController?: AbortController;
  }
}
