import { fatcher } from './fatcher';
import { RequestOptions } from './interfaces';
import { FatcherError } from './core';
import { clone } from './immutable';
import { mergeOptions, globalOptions } from './options';
import aborter, { AbortError, isAbort } from 'fatcher-middleware-aborter';
import downloadProgress from 'fatcher-middleware-download-progress';
import { chunkStreamReader } from 'utils-shared';
export * from './interfaces';
export { isFatcherError } from './helpers';
export {
    globalOptions,
    fatcher,
    clone,
    FatcherError,
    aborter,
    AbortError,
    isAbort,
    downloadProgress,
    chunkStreamReader,
};
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
