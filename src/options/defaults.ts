import { RequestOptions } from '../interfaces';
import { mergeOptions } from '../core';
import isString from 'lodash/isString';

let defaultOptions: RequestOptions = {
    baseURL: '/',
    url: '',
    payload: {},
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: 'auto',
    autoTransformPayload: true,
    middlewares: [],
    signal: null,
    onAbort: null,
};

export function getDefaultOptions(): RequestOptions {
    return defaultOptions;
}

export function setDefaultOptions<T extends keyof RequestOptions>(
    key: T,
    value: Partial<RequestOptions>[T]
): RequestOptions;
export function setDefaultOptions(options: Partial<RequestOptions>): RequestOptions;
export function setDefaultOptions<T extends keyof RequestOptions>(
    key: T | Partial<RequestOptions>,
    value?: Partial<RequestOptions>[T]
): RequestOptions {
    const target = isString(key) ? { [key]: value } : key;

    return (defaultOptions = mergeOptions(getDefaultOptions(), target));
}
