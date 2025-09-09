// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'fatcher';

declare module 'fatcher' {
  interface FatcherOptions {
    onAbort?: (reason?: string) => void;
    timeout?: number;
    onTimeout?: () => void;
  }
  interface FatcherContext {
    abort: (reason?: string) => void;
  }

  interface FatcherResponse {
    abort: (reason?: string) => void;
  }
}
