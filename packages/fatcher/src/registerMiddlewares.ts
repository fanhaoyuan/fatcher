import { FatcherFunctionalMiddleware, FatcherMiddlewares } from './types';

export function registerMiddlewares(
  middlewares: FatcherMiddlewares | FatcherMiddlewares[],
  registeredMiddlewares = new Set<string>(),
) {
  const middlewareList: FatcherFunctionalMiddleware[] = [];

  for (const middleware of middlewares) {
    if (typeof middleware === 'function') {
      registeredMiddlewares.add(Math.random().toString(36).slice(-6));
      middlewareList.push(middleware);
      continue;
    }

    if (Array.isArray(middleware)) {
      registerMiddlewares(middlewareList, registeredMiddlewares);
      continue;
    }

    if (registeredMiddlewares.has(middleware.name)) {
      continue;
    }

    registeredMiddlewares.add(middleware.name);
    middlewareList.push(middleware.use);
  }

  return middlewareList;
}
