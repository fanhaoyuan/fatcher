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

export interface Context extends Omit<RequestOptions, 'headers'> {
    /**
     * A map of http request headers.
     *
     * @description Some headers name cannot be modified programmatically.
     * @see https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
     */
    headers: Headers;
    middlewares: Middleware[];
    method: RequestMethod;
    params: Record<string, string>;
    mode: RequestMode;
    cache: RequestCache;
    redirect: RequestRedirect;
    credentials: RequestCredentials;
    referrerPolicy: ReferrerPolicy;
    url: string;
    [name: string]: any;
}

export interface Result<T = any> {
    data: T;
    headers: Headers;
    status: number;
    statusText: string;
    options: RequestOptions;
    url: string;
}

export type MiddlewareResult = Omit<Result, 'options'>;

export type PatchContext = Partial<Context>;

/**
 * Middleware Next
 *
 * Should call by using middleware for get response.
 */
export type MiddlewareNext = (patchContext?: PatchContext) => MaybePromise<MiddlewareResult>;

export interface Middleware {
    (context: Readonly<Context>, next: MiddlewareNext): MaybePromise<MiddlewareResult>;
    displayName?: string;
    /**
     * Provides something in context (hoisting) by registering middlewares.
     *
     * Other middlewares can read provided context.
     */
    provides?: PatchContext | ((initialContext: Context) => PatchContext);
}

export type MiddlewareRegister = Middleware | null | (Middleware | null)[];

export type RequestBody = BodyInit | null | Record<string, any>;

export interface RequestOptions extends Omit<RequestInit, 'body'> {
    /**
     * Base url to fetch.
     *
     * @default '/'
     */
    base?: string;
    url?: string;
    body?: RequestBody;
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
    middlewares?: MiddlewareRegister[];

    /**
     * Request Headers
     *
     * @default
     * {
     *   'Content-Type': 'application/x-www-form-urlencoded'
     * }
     */
    headers?: HeadersInit;

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
