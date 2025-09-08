// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'fatcher';

export type RequestParameters = Record<string, any>;

export type ParameterSerializer = (params: RequestParameters) => string;

declare module 'fatcher' {
  interface FatcherOptions {
    params?: RequestParameters;
    serializer?: ParameterSerializer;
  }
}
