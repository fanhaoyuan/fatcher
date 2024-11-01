// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as fatcher from 'fatcher';

declare module 'fatcher' {
  interface FatcherOptions {
    /**
     * Cache a Response for a while
     * Will not cache when ttl is `0`
     * @default 0
     */
    ttl?: number;

    /**
     * Ignore cache and send request when is `true`
     * @default false
     */
    flush?: boolean;
  }
}
