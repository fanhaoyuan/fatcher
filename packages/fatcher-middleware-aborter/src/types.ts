import 'fatcher';

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
