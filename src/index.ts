import { fatcher } from './fatcher';
import { RequestOptions } from './interfaces';
import { mergeOptions, clone } from './core';
export * from './globals';
export { aborter, downloadProgress } from './middlewares';
export * from './interfaces';
export { isAbort, chunkStreamReader } from './helpers';
export { fatcher, clone };
export class Fatcher {
    constructor() {
        throw new Error('Fatcher can not be initialized.');
    }

    static get(url: string, inlineOptions: Partial<RequestOptions> = {}) {
        return fatcher(url, {
            ...inlineOptions,
            method: 'get',
        });
    }

    static post(url: string, inlineOptions: Partial<RequestOptions> = {}) {
        return fatcher(url, {
            ...inlineOptions,
            method: 'post',
        });
    }

    static put(url: string, inlineOptions: Partial<RequestOptions> = {}) {
        return fatcher(url, {
            ...inlineOptions,
            method: 'put',
        });
    }

    static delete(url: string, inlineOptions: Partial<RequestOptions> = {}) {
        return fatcher(url, {
            ...inlineOptions,
            method: 'delete',
        });
    }

    static create(localRequestOptions: Partial<RequestOptions> = {}) {
        return (
            url: string,
            payload: Record<string, any> | null = null,
            inlineOptions: Partial<RequestOptions> = {}
        ) => {
            return fatcher(url, mergeOptions(localRequestOptions, inlineOptions, { payload: payload ?? {} }));
        };
    }
}
