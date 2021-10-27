import { Response, RequestOptions } from './interfaces';
import { composeMiddlewares, registerMiddlewares, mergeOptions } from './core';
import { fetch, URLTransformer } from './middlewares';
import { globalOptions } from './globals';
import isString from 'lodash/isString';

export async function fatch(payload: string, options?: Partial<RequestOptions>): Promise<Response>;
export async function fatch(payload?: Partial<RequestOptions> & { url: string }): Promise<Response>;
export async function fatch(
    payload?: (Partial<RequestOptions> & { url: string }) | string,
    inlineOptions?: Partial<RequestOptions>
) {
    let mergedOptions: RequestOptions;

    if (isString(payload)) {
        mergedOptions = mergeOptions(globalOptions, inlineOptions ?? {}, { url: payload });
    } else {
        mergedOptions = mergeOptions(globalOptions, payload ?? {});
    }

    const middlewares = [...mergedOptions.middlewares, URLTransformer, fetch];

    const registeredMiddlewares = registerMiddlewares(middlewares);

    const useMiddlewares = composeMiddlewares(registeredMiddlewares);

    const response = await useMiddlewares(mergedOptions);

    return response;
}
