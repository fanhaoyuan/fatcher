/* eslint-disable no-use-before-define */
type MaybePromise<T> = Promise<T> | T;

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';

export type Options = RequestInit & {
    middlewares?: (Middleware | Middleware[])[];
    /**
     * HTTP Request Method for current request.
     *
     * @default 'GET'
     */
    method?: Method;

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
};

export type Result = Response;

export interface Context extends Omit<Options, 'middlewares'> {
    url: string;

    headers: Headers;
}

export type PatchContext = Partial<Context>;

type Next = (patchContext?: PatchContext) => MaybePromise<Result>;

export interface Middleware {
    name: string;
    use(context: Readonly<Context>, next: Next): MaybePromise<Result>;
}
