import 'fatcher';

declare module 'fatcher' {
  interface FatcherResponse {
    toJson: <T>() => Promise<T>;
  }
}
