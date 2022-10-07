import { RequestOptions, Result } from './interfaces';
import { defaultOptions, mergeOptions } from './options';
import { fetcher, registerMiddlewares, composeMiddlewares } from './middlewares';
import { createContext } from './context';
import { canActivate } from './helpers';
import { isFunction, merge } from '@fatcherjs/utils-shared';

/**
 * Send HTTP request with custom options.
 */
export async function fatcher<T = any>(inlineOptions: RequestOptions = {}): Promise<Result<T>> {
    const options = mergeOptions(defaultOptions, inlineOptions);

    const { middlewares: customMiddlewares = [], ...rest } = options;

    const registeredMiddlewares = await registerMiddlewares([...customMiddlewares, fetcher]);

    const initialContext = createContext(rest);

    const context = merge(
        initialContext,
        registeredMiddlewares.map(item => {
            if (isFunction(item.provides)) {
                return item.provides(initialContext);
            }

            return item.provides || {};
        }),
        Object.assign
    );

    const useMiddlewares = composeMiddlewares(registeredMiddlewares);

    const result = await useMiddlewares(context);

    const data = canActivate(result.data) ? result.data.body : result.data;

    return {
        ...result,
        options,
        data,
    };
}
