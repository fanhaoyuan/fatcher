import { Context } from 'fatcher';

export interface CacheOptions {
    /**
     * Validate a request whether needs cache
     *
     * @default
     * (context: Context) => context.method === 'GET'
     */
    validate?: (context: Context) => boolean;
    /**
     * Time to live (ms).
     *
     * If `0`, permanent cache
     * @default 60000
     */
    ttl?: number;

    /**
     * @default true
     */
    useCache?: boolean;
}
