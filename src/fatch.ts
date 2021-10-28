import { Response, RequestOptions } from './interfaces';
import { composeMiddlewares, registerMiddlewares, mergeOptions } from './core';
import { fetch, payloadTransformer, URLTransformer, responseFormatter } from './middlewares';
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

    const middlewares = [responseFormatter, ...mergedOptions.middlewares, payloadTransformer, URLTransformer, fetch];

    const registeredMiddlewares = registerMiddlewares(middlewares);

    mergedOptions.middlewares = registeredMiddlewares;

    const useMiddlewares = composeMiddlewares(registeredMiddlewares);

    return useMiddlewares(mergedOptions);
}
