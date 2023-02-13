import { RequestOptions, Result } from './interfaces';
import { registerMiddlewares } from './registerMiddlewares';
import { composeMiddlewares } from './composeMiddlewares';
import { request } from './request';
import { createContext } from './createContext';
import { canActivate } from './helpers';
import { isFunction, merge } from './utils/index';

/**
 * Send HTTP request with custom options.
 */
export async function fatcher<T = any>(input?: RequestOptions): Promise<Result<T>>;
export async function fatcher<T = any>(input: string, options?: RequestOptions): Promise<Result<T>>;
export async function fatcher<T = any>(
    input?: string | RequestOptions,
    options: RequestOptions = {}
): Promise<Result<T>> {
    let _options = options;

    if (typeof input === 'string') {
        _options.url = input;
    } else {
        _options = Object.assign({}, _options, input);
    }

    const { middlewares = [], ...rest } = _options;

    const registeredMiddlewares = registerMiddlewares([...middlewares, request()]);

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
