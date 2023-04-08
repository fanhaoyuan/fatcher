import type { Options, Middleware } from './types';
import composeMiddlewares from './composeMiddlewares';
import fetchMiddleware from './fetch';
import createContext from './createContext';

export default function fatcher(input: string, options: Options = {}) {
    const { middlewares = [], ...rest } = options;

    let context = createContext(input, {
        credentials: 'same-origin',
        cache: 'default',
        redirect: 'follow',
        referrerPolicy: 'no-referrer-when-downgrade',
        mode: 'cors',
        ...rest,
    });

    let middlewareList: Middleware[] = [];

    for (const middleware of middlewares) {
        if (Array.isArray(middleware)) {
            middlewareList = middlewareList.concat(middleware);
            context = middleware.reduce((pre, cur) => {
                return Object.assign(pre, cur.provide?.(pre));
            }, context);
        } else {
            middlewareList.push(middleware);
            context = Object.assign(context, middleware.provide?.(context));
        }
    }

    return composeMiddlewares([...middlewareList, fetchMiddleware])(context);
}
