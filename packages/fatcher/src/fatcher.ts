import { composeMiddlewares } from './composeMiddlewares';
import { registerMiddlewares } from './registerMiddlewares';
import { FatcherOptions } from './types';

export async function fatcher(input: RequestInfo | URL, options: FatcherOptions = {}) {
  const { middlewares = [], ...rest } = options;

  const request = Object.assign(new Request(input, rest), rest);

  const registeredMiddlewares = registerMiddlewares(middlewares);

  return composeMiddlewares([...registeredMiddlewares, ctx => fetch(ctx)])(request);
}
