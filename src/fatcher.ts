import type { Options, Middleware } from './types';
import composeMiddlewares from './composeMiddlewares';
import fetchMiddleware from './fetch';
import createContext from './createContext';

export default function fatcher(input: string, options: Options = {}) {
    const { middlewares = [], ...rest } = options;

    const context = createContext(input, {
        credentials: 'same-origin',
        cache: 'default',
        redirect: 'follow',
        referrerPolicy: 'no-referrer-when-downgrade',
        mode: 'no-cors',
        ...rest,
    });

    let middlewareList: Middleware[] = [];

    for (const middleware of middlewares) {
        if (Array.isArray(middleware)) {
            middlewareList = middlewareList.concat(middleware);
        } else {
            middlewareList.push(middleware);
        }
    }

    return composeMiddlewares([...middlewareList, fetchMiddleware])(context);
}
