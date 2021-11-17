import { Response, RequestOptions } from './interfaces';
import { composeMiddlewares, registerMiddlewares, mergeOptions } from './core';
import { fetch, payloadTransformer, URLTransformer, responseFormatter } from './middlewares';
import { globalOptions } from './globals';
import { isString } from './utils';
import { isFatcherError } from './helpers';

export async function fatcher(payload: string, options?: Partial<RequestOptions>): Promise<Response>;
export async function fatcher(payload?: Partial<RequestOptions> & { url: string }): Promise<Response>;
export async function fatcher(
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

    try {
        return await useMiddlewares(mergedOptions);
    } catch (error: any) {
        if (isFatcherError(error)) {
            return Promise.reject(await error.toJSON());
        }
    }
}
