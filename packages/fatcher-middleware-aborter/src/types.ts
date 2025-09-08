// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'fatcher';

declare module 'fatcher' {
  interface FatcherContext {
    timeout?: number;
    onAbort?: (reason?: string) => void;
    abortController?: AbortController;
    abort: (reason?: string) => void;
    signal: AbortSignal;
  }
}
