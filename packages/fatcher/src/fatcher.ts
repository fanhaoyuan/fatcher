import { composeMiddlewares } from './composeMiddlewares';
import { FatcherMiddleware, FatcherOptions, FatcherRequest } from './types';

export async function fatcher(input: RequestInfo | URL, options: FatcherOptions = {}) {
  const { middlewares = [], ...rest } = options;

  const context = new Request(input, rest) as FatcherRequest;
  context.options = rest;

  let middlewareList: FatcherMiddleware[] = [];

  for (const middleware of middlewares) {
    if (Array.isArray(middleware)) {
      middlewareList = middlewareList.concat(middleware);
    } else {
      middlewareList.push(middleware);
    }
  }

  return composeMiddlewares([...middlewareList, req => fetch(req)])(context);
}
