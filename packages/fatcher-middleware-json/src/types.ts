import 'fatcher';

declare module 'fatcher' {
  interface FatcherResponse {
    readStreamAsJson: <T>(
      onRead?: (chunk: string, buffer: Uint8Array) => void | Promise<void>,
    ) => Promise<T | null>;
  }
}
