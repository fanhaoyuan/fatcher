// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as fatcher from 'fatcher';

export type RequestParameters = Record<string, any>;

export type ParameterSerializer = (params: RequestParameters) => string;

export interface ParameterOptions {
  serializer?: ParameterSerializer;
}

declare module 'fatcher' {
  interface FatcherOptions {
    params?: RequestParameters;
  }
}
