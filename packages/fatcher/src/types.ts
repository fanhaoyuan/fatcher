/* eslint-disable no-use-before-define */
export interface FatcherResponse extends Response {}

export interface FatcherOptions extends RequestInit {
  middlewares?: FatcherMiddlewares | FatcherMiddlewares[];
}

export interface FatcherRequest
  extends Request,
    Omit<FatcherOptions, keyof RequestInit | 'middlewares'> {}

export type FatcherFunctionalMiddleware = (
  request: FatcherRequest,
  next: (context?: Partial<FatcherRequest>) => Promise<FatcherResponse> | FatcherResponse,
) => Promise<FatcherResponse> | FatcherResponse;

export type FatcherMiddleware = {
  name: string;
  use: FatcherFunctionalMiddleware;
};

export type FatcherMiddlewares = (FatcherFunctionalMiddleware | FatcherMiddleware)[];
