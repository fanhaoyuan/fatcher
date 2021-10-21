/* eslint-disable no-use-before-define */
export type ImmutableObject<T extends Record<string, any>> = { readonly [K in keyof T]: Immutable<T[K]> };
export type Immutable<T> = T extends Record<string, any> ? ImmutableObject<T> : T;
