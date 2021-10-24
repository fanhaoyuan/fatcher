import { RequestOptions } from '../interfaces';
import { mergeOptions } from '../core';
import { isString } from '../utils';

let defaultOptions: RequestOptions = {
    baseURL: '/',
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: 'auto',
    autoTransformPayload: true,
    middlewares: [],
};

export function getDefaultOptions(): RequestOptions {
    return defaultOptions;
}

export function setDefaultOptions<T extends keyof RequestOptions>(key: T, value: RequestOptions[T]): RequestOptions;
export function setDefaultOptions(options: RequestOptions): RequestOptions;
export function setDefaultOptions<T extends keyof RequestOptions>(key: T | RequestOptions, value?: RequestOptions[T]) {
    const target = isString(key) ? { [key]: value } : key;

    return (defaultOptions = mergeOptions(getDefaultOptions(), target));
}
