import 'fatcher';

declare module 'fatcher' {
  export interface FatcherOptions {
    validateCode?: (statusCode: number) => boolean;
  }
}
