import { Response, RequestOptions } from './interfaces';
import { mergeOptions, globalOptions } from './options';
import { fetch, composeMiddlewares, registerMiddlewares } from './middlewares';
import responseFormatter from 'fatcher-middleware-response-formatter';
import payloadTransformer from 'fatcher-middleware-payload-transformer';

import { isString } from 'utils-shared';
import { isFatcherError } from './helpers';

export async function fatcher<T = any>(payload: string, options?: Partial<RequestOptions>): Promise<Response<T>>;
export async function fatcher<T = any>(payload: Partial<RequestOptions> & { url: string }): Promise<Response<T>>;
export async function fatcher(
    payload: (Partial<RequestOptions> & { url: string }) | string,
    inlineOptions: Partial<RequestOptions> = {}
) {
    let mergedOptions: RequestOptions;

    if (isString(payload)) {
        mergedOptions = mergeOptions(globalOptions, inlineOptions, { url: payload });
    } else {
        mergedOptions = mergeOptions(globalOptions, payload);
    }

    const middlewares = [responseFormatter, ...mergedOptions.middlewares, payloadTransformer, fetch];

    const registeredMiddlewares = registerMiddlewares(middlewares);

    mergedOptions.middlewares = registeredMiddlewares;

    const useMiddlewares = composeMiddlewares(registeredMiddlewares);

    try {
        return await useMiddlewares(mergedOptions);
    } catch (error: any) {
        if (isFatcherError(error)) {
            return Promise.reject(await error.toJSON());
        }

        throw error;
    }
}
