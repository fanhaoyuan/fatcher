/* eslint-disable no-use-before-define */
export type RequestMethod = 'get' | 'post' | 'delete' | 'put' | 'head' | 'options' | 'patch';

export type ImmutableObject<T extends Record<string, any>> = { readonly [K in keyof T]: Immutable<T[K]> } & {
    readonly __IS_IMMUTABLE__: true;
};
export type Immutable<T> = T extends Record<string, any> ? (T extends Function ? T : ImmutableObject<T>) : T;

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
    use(context: Immutable<RequestContext>, next: MiddlewareNext): Promise<Response> | Response;
}

export interface RequestOptions {
    /**
     * The prefix url with http request.
     *
     * It will splice into the front of url.
     *
     * @default '/'
     */
    baseURL: string;

    /**
     * URL to request.
     */
    url: string;

    /**
     * Middleware to register.
     *
     * @default []
     */
    middlewares: ((() => Middleware) | Middleware)[];

    /**
     * Request Payload.
     *
     * Payload will automatically transform on basis of `method` and `Content-headers`.
     *
     * - Method `get` will transform to `URL Parameters`
     *
     * Other method will automatically transform on basis of `Content-headers`
     *
     * - ContentType `'application/json'` will stringify to `string`.
     *
     * - ContentType `'application/x-www-form-urlencoded'` will use `qs` to stringify.
     *
     * - ContentType `'multipart/form-data'` will use `FormData` to send.
     *
     * Else ContentType will not transform and provide a custom __middleware__ to transform it.
     *
     * @default {}
     */
    payload: Record<string, any>;

    /**
     * Whether auto transform request payload.
     *
     * If `false`, should transform payload customization .
     *
     * @default true
     */
    autoTransformPayload: boolean;

    /**
     * Request headers.
     *
     *
     * @default
     * {
     *   'Content-Type': 'application/json'
     * }
     */
    headers: Record<string, string>;

    /**
     * Request Method
     *
     * @default 'get'
     */
    method: RequestMethod;

    /**
     * Whether send http request with credentials.
     *
     * - If `true`, will `always` sent request with credentials.
     *
     * - If `false`, will `never` sent request with credentials.
     *
     * - If `'auto'`, will sent request with credentials by `same-origin`.
     *
     * @default 'auto'
     */
    withCredentials: 'auto' | boolean;

    /**
     * Abort signal
     *
     * @default null
     */
    signal: AbortSignal | null;

    /**
     * Trigger this function with abort fetch
     *
     * @default null
     */
    onAbort: ((...args: any[]) => void) | null;
}

export interface RequestContext extends Record<string, any> {
    /**
     * Request Options
     */
    options: RequestOptions;
}

export interface Response<T = any> {
    status: number;
    statusText: string;
    data: T;
    headers: Record<string, string>;
    options: RequestOptions;
}

export interface PatchRequestContext extends Record<string, any> {
    options?: Partial<RequestOptions>;
}
export interface MiddlewareNext {
    (context?: PatchRequestContext): Promise<Response> | Response;
}

export interface AbortError {
    isAborted: true;
    url: string;
}
