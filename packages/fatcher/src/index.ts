import { fatcher } from './fatcher';
import { RequestOptions } from './interfaces';
import { mergeOptions, clone, FatcherError } from './core';
import aborter, { AbortError, isAbort } from 'fatcher-middleware-aborter';
export * from './globals';
export * from './interfaces';
export { chunkStreamReader, isFatcherError } from './helpers';
export { fatcher, clone, FatcherError, aborter, AbortError, isAbort };
export class Fatcher {
    constructor() {
        throw new Error('Fatcher can not be initialized.');
    }

    static get<T = any>(url: string, inlineOptions: Partial<RequestOptions> = {}) {
        return fatcher<T>(url, {
            ...inlineOptions,
            method: 'get',
        });
    }

    static post<T = any>(url: string, inlineOptions: Partial<RequestOptions> = {}) {
        return fatcher<T>(url, {
            ...inlineOptions,
            method: 'post',
        });
    }

    static put<T = any>(url: string, inlineOptions: Partial<RequestOptions> = {}) {
        return fatcher<T>(url, {
            ...inlineOptions,
            method: 'put',
        });
    }

    static delete<T = any>(url: string, inlineOptions: Partial<RequestOptions> = {}) {
        return fatcher<T>(url, {
            ...inlineOptions,
            method: 'delete',
        });
    }

    static create<T = any>(localRequestOptions: Partial<RequestOptions> = {}) {
        return (
            url: string,
            payload: Record<string, any> | null = null,
            inlineOptions: Partial<RequestOptions> = {}
        ) => {
            return fatcher<T>(url, mergeOptions(localRequestOptions, inlineOptions, { payload: payload ?? {} }));
        };
    }
}
