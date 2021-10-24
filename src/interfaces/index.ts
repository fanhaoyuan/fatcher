/* eslint-disable no-use-before-define */
export type RequestMethod =
    | 'get'
    | 'post'
    | 'delete'
    | 'put'
    | 'head'
    | 'options'
    | 'patch'
    | 'connect'
    | 'GET'
    | 'POST'
    | 'DELETE'
    | 'PUT'
    | 'HEAD'
    | 'OPTIONS'
    | 'PATCH'
    | 'CONNECT';

export type ImmutableObject<T extends Record<string, any>> = { readonly [K in keyof T]: Immutable<T[K]> } & {
    readonly __IS_IMMUTABLE__: true;
};
export type Immutable<T> = T extends Record<string, any> ? ImmutableObject<T> : T;

export interface Middleware {
    /**
     * Middleware name
     */
    name: string;

    /**
     * Should middleware apply.
     *
     * If `false`, middlewares will filter in register middleware
     *
     * If `true`, middleware will always run in request.
     *
     * If `function`, middleware will run with return true or void.
     *
     * @default true
     */
    apply?: ((context: Immutable<RequestContext>) => boolean) | boolean;

    /**
     * Middleware function.
     */
    use(context: Immutable<RequestContext>, next: MiddlewareNext): Promise<ResponseType> | ResponseType;
}

export interface RequestOptions extends RequestInit {
    /**
     * The prefix url with http request.
     *
     * It will splice into the front of url.
     */
    baseURL?: string;

    /**
     * URL to request.
     */
    url?: string;

    /**
     * Middleware to register.
     */
    middlewares?: ((() => Middleware) | Middleware)[];
    payload?: Record<string, any>;
    /**
     * Request headers.
     */
    headers?: Record<string, string>;

    /**
     * Request Method
     */
    method?: RequestMethod;
}

export interface RequestContext {
    /**
     * Request Options
     */
    options: RequestOptions;
}

export type ResponseType = Response | ArrayBuffer | FormData | string | ReadableStream<Uint8Array>;

export interface MiddlewareNext {
    (context?: Partial<RequestContext>): Promise<ResponseType> | ResponseType;
}
