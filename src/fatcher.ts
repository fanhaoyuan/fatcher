import { RequestOptions, ResponseResult } from './interfaces';
import { defaultOptions, mergeOptions } from './options';
import { fetcher, registerMiddlewares, composeMiddlewares } from './middlewares';
import { createContext } from './context';
import { canActivate } from './helpers';

/**
 * Send HTTP request with custom options.
 */
export async function fatcher<T = any>(inlineOptions: RequestOptions = {}): Promise<ResponseResult<T>> {
    const options = mergeOptions(defaultOptions, inlineOptions);

    const { middlewares: customMiddlewares = [], ...rest } = options;

    const registeredMiddlewares = registerMiddlewares([...customMiddlewares, fetcher]);

    const useMiddlewares = composeMiddlewares(registeredMiddlewares);

    const initialContext = createContext(rest);

    const result = await useMiddlewares(initialContext);

    const data = canActivate(result.data) ? result.data.body : result.data;

    return {
        ...result,
        options,
        data,
    };
}
