import { fatch } from './fatch';
import { RequestOptions } from './interfaces';
import { mergeOptions } from './core';
export * from './globals';
export { aborter, downloadProgress } from './middlewares';
export * from './interfaces';
export { isAbort, chunkStreamReader } from './helpers';
export { fatch };
export class Fatch {
    constructor() {
        throw new Error('Fatch can not be initialized.');
    }

    static get(url: string, inlineOptions: Partial<RequestOptions> = {}) {
        return fatch(url, {
            ...inlineOptions,
            method: 'get',
        });
    }

    static post(url: string, inlineOptions: Partial<RequestOptions> = {}) {
        return fatch(url, {
            ...inlineOptions,
            method: 'post',
        });
    }

    static put(url: string, inlineOptions: Partial<RequestOptions> = {}) {
        return fatch(url, {
            ...inlineOptions,
            method: 'put',
        });
    }

    static delete(url: string, inlineOptions: Partial<RequestOptions> = {}) {
        return fatch(url, {
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
            return fatch(url, mergeOptions(localRequestOptions, inlineOptions, { payload: payload ?? {} }));
        };
    }
}
