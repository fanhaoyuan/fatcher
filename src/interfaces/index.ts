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

export type ImmutableObject<T extends Record<string, any>> = { readonly [K in keyof T]: Immutable<T[K]> };
export type Immutable<T> = T extends Record<string, any> ? ImmutableObject<T> : T;
