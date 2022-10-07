/* eslint-disable no-use-before-define */

export type MaybePromise<T> = T | Promise<T>;

export type RequestMethod =
    | 'GET'
    | 'get'
    | 'POST'
    | 'post'
    | 'PUT'
    | 'put'
    | 'DELETE'
    | 'delete'
    | 'HEAD'
    | 'head'
    | 'OPTIONS'
    | 'options'
    | 'PATCH'
    | 'patch';

/**
 * Middleware Context
 */
export interface Context extends Omit<RequestOptions, 'middlewares'> {
    body?: BodyInit | null;

    /**
     * A map of http request headers.
     *
     * @description Some headers name cannot be modified programmatically.
     * @see https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
     */
    requestHeaders: Headers;

    /**
     * Request Headers
     *
     * @deprecated use `requestHeaders` instead.
     */
    headers?: RequestHeaders;
}

/**
 * Request Headers
 *
 * Will filter null value before fetch.
 */
export type RequestHeaders = Record<string, string | null>;

export interface Result<T = any> {
    data: T;
    headers: Headers;
    status: number;
    statusText: string;
    options: RequestOptions;
    url: string;
}

/**
 * Middlewares Response Result
 */
export interface MiddlewareResult extends Omit<ResponseResult, 'options' | 'data'> {
    data?: any;
}

export type PatchContext = Partial<Context>;

/**
 * Middleware Next
 *
 * Should call by using middleware for get response.
 */
export type MiddlewareNext = (patchContext?: PatchContext) => MaybePromise<MiddlewareResult>;

/**
 * Middleware
 */
export interface Middleware {
    name: `fatcher-middleware-${string}`;
    use(context: Readonly<Context>, next: MiddlewareNext): MaybePromise<MiddlewareResult>;
    /**
     * Current middleware needs some middlewares
     */
    presets?: UnregisteredMiddlewares;
    /**
     * Provides something in context (hoisting) by registering middlewares.
     *
     * Other middlewares can read provided context in `Middleware.use()`
     */
    provides?: Partial<Context> | ((initialContext: Context) => Partial<Context>);
}

/**
 * A Middleware or a series of Middlewares
 *
 * Will flatten into a array of middlewares.
 */
export type UnregisteredMiddlewares = (
    | (() => MaybePromise<Middleware>)
    | Middleware
    | ((() => MaybePromise<Middleware>) | Middleware)[]
)[];

/**
 * Request Options for fetch
 */
export interface RequestOptions extends Omit<RequestInit, 'body' | 'headers'> {
    /**
     * Base url to fetch.
     *
     * @default '/'
     */
    base?: string;
    url?: string;
    /**
     * HTTP Request Method for current request.
     *
     * @default 'GET'
     */
    method?: RequestMethod;

    /**
     * Query string for request url
     */
    params?: Record<string, string>;

    /**
     * An array of function with `pre` or `post` request.
     *
     * Middlewares will compose into an async function.
     *
     * @default []
     */
    middlewares?: UnregisteredMiddlewares;

    /**
     * Request Payload
     */
    payload?: Record<string, any> | null;

    /**
     * Request Headers
     *
     * @default
     * {
     *   'Content-Type': 'application/x-www-form-urlencoded'
     * }
     */
    headers?: RequestHeaders;

    /**
     * Custom validate status code
     *
     * If status code not in range, throw a `FatcherError`
     *
     * @default
     * ```
     * (statusCode) => 200 <= statusCode < 300
     * ```
     */
    validateCode?: (statusCode: number) => boolean;
}
