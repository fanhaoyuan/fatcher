// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'fatcher';

declare module 'fatcher' {
  interface FatcherOptions {
    onAbort?: (reason?: string) => void;
    abortController?: AbortController;
    timeout?: number;
  }
  interface FatcherContext {
    signal: AbortSignal;
    abort: (reason?: string) => void;
  }
}
