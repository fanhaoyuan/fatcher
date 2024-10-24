/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-use-before-define */

export interface FatcherOptions extends RequestInit {
  middlewares?: FatcherMiddleware[] | FatcherMiddleware[][];
}

export interface FatcherRequest extends Request {
  options: Omit<FatcherOptions, 'middlewares'>;
}

export interface FatcherResponse extends Response {}

export type FatcherMiddlewareNext = (
  request?: Partial<FatcherRequest>
) => Promise<FatcherResponse> | FatcherResponse;

export type FatcherMiddleware = (
  request: FatcherRequest,
  next: FatcherMiddlewareNext
) => Promise<FatcherResponse> | FatcherResponse;

export interface ExceptionOptions {
  validateCode?: (statusCode: number) => boolean;
}
