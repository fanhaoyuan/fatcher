// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as fatcher from 'fatcher';

export interface AborterOptions {
  timeout?: number;
  signal?: AbortSignal;
  abort?: () => void;
  onAbort?: () => void;
}

declare module 'fatcher' {
  interface FatcherRequest {
    abort: () => void;
  }
}
