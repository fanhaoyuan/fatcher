/* eslint-disable no-use-before-define */

/**
 *  HTTP Request Methods
 */
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';

/**
 * Middleware Context
 */
export interface Context extends Omit<RequestOptions, 'middlewares'> {
    body?: BodyInit | null;
}

/**
 * Request Headers
 *
 * Will filter null value before fetch.
 */
export type RequestHeaders = Record<string, string | null>;

/**
 * Response Result
 */
export interface ResponseResult<T = any> {
    data: T;
    headers: RequestHeaders;
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
export type MiddlewareNext = (context?: PatchContext) => Promise<MiddlewareResult> | MiddlewareResult;

/**
 * Middleware
 */
export interface Middleware {
    name: `fatcher-middleware-${string}`;
    use(context: Context, next: MiddlewareNext): Promise<MiddlewareResult> | MiddlewareResult;
}

/**
 * A Middleware or a series of Middlewares
 *
 * Will flatten into a array of middlewares.
 */
export type UnregisteredMiddlewares = ((() => Middleware) | Middleware | ((() => Middleware) | Middleware)[])[];

/**
 * Request Options for fetch
 */
export interface RequestOptions extends Omit<RequestInit, 'body' | 'headers'> {
    /**
     * Base url to fetch.
     *
     * @default '/'
     */
    baseUrl?: string;

    /**
     * Url to fetch
     */
    url?: string;

    /**
     * HTTP Request Method for current request.
     *
     * @default 'GET'
     */
    method?: RequestMethod;

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
}
