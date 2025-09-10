import { FatcherFunctionalMiddleware, FatcherMiddleware } from './types';

export function defineMiddleware(middleware: FatcherMiddleware | FatcherFunctionalMiddleware) {
  return middleware;
}
