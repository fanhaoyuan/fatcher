import 'fatcher';

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
