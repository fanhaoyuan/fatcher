import { composeMiddlewares } from './composeMiddlewares';
import { merge } from './merge';
import { registerMiddlewares } from './registerMiddlewares';
import { FatcherOptions } from './types';

export async function fatcher(input: RequestInfo | URL, options: FatcherOptions = {}) {
  const { middlewares = [], ...rest } = options;

  const request = merge(new Request(input, rest), rest);

  const registeredMiddlewares = registerMiddlewares(middlewares);

  return composeMiddlewares([...registeredMiddlewares, ctx => fetch(ctx)])(request);
}
