import { composeMiddlewares } from './composeMiddlewares';
import { registerMiddlewares } from './registerMiddlewares';
import { FatcherContext, FatcherOptions } from './types';

export async function fatcher(input: RequestInfo | URL, options: FatcherOptions = {}) {
  const { middlewares = [], ...rest } = options;

  const context: FatcherContext = {
    ...rest,
    request: new Request(input, rest),
  };

  const registeredMiddlewares = registerMiddlewares(middlewares);

  return composeMiddlewares([...registeredMiddlewares, ctx => fetch(ctx.request)])(context);
}
