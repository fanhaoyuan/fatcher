/* eslint-disable no-use-before-define */
type MaybePromise<T> = Promise<T> | T;

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';

export interface Options extends RequestInit {
    middlewares?: (Middleware | Middleware[])[];
    /**
     * HTTP Request Method for current request.
     *
     * @default 'GET'
     */
    method?: Method;

    /**
     * @requires
     * `fatcher-middleware-progress`
     *
     * @param current loaded data length
     * @param total total data length
     */
    downloadProgress?: (current: number, total: number) => void;

    /**
     * Custom http response code by fetch.
     * @param code origin http response code
     *
     * @default
     * ```ts
     * (code: number) => 200 <= code < 300
     * ```
     */
    validateCode?: (code: number) => boolean;

    /**
     * @requires
     * `fatcher-middleware-aborter`
     */
    onAbort?: () => void;

    /**
     * @requires
     * `fatcher-middleware-timeout`
     */
    timeout?: number;

    /**
     * @requires
     * `fatcher-middleware-limit`
     */
    limit?: number;

    /**
     * @requires
     * `fatcher-middleware-parameter`
     */
    params?: Record<string, any>;
}

export type Result = Response;

export interface Context extends Omit<Options, 'middlewares'> {
    url: string;

    headers: Headers;

    /**
     *
     * @requires
     * `fatcher-middleware-aborter`
     */
    abort?: () => void;
}

export type PatchContext = Partial<Context>;

type Next = (patchContext?: PatchContext) => MaybePromise<Result>;

export interface Middleware {
    name: string;
    provide?: (options: Options) => Partial<Options>;
    use(context: Readonly<Context>, next: Next): MaybePromise<Result>;
}
