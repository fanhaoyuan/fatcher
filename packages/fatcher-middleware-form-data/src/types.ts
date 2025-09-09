// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'fatcher';

declare module 'fatcher' {
  interface FatcherOptions {
    body?: Record<string, any> | BodyInit | null;
  }
}
