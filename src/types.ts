/* eslint-disable no-use-before-define */
export interface FatcherResponse extends Response {}

export type FatcherMiddlewares = (
  | FatcherFunctionalMiddleware
  | FatcherMiddleware
  | (FatcherFunctionalMiddleware | FatcherMiddleware)[]
)[];

export interface FatcherOptions extends RequestInit {
  middlewares?: FatcherMiddlewares;
}

export interface FatcherContext extends Omit<FatcherOptions, 'middlewares'> {
  request: Request;
}

export type FatcherFunctionalMiddleware = (
  request: FatcherContext,
  next: (context?: Partial<FatcherContext>) => Promise<FatcherResponse> | FatcherResponse,
) => Promise<FatcherResponse> | FatcherResponse;

export type FatcherMiddleware = {
  name: string;
  use: FatcherFunctionalMiddleware;
};
