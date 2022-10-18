import { RequestOptions, Result } from './interfaces';
import { fetcher, registerMiddlewares, composeMiddlewares } from './middlewares';
import { createContext } from './context';
import { canActivate } from './helpers';
import { isFunction, merge } from '@fatcherjs/utils-shared';

/**
 * Send HTTP request with custom options.
 */
export async function fatcher<T = any>(options: RequestOptions = {}): Promise<Result<T>> {
    const { middlewares = [], ...rest } = options;

    const registeredMiddlewares = registerMiddlewares([...middlewares, fetcher()]);

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
