import { Context, RequestOptions } from '../interfaces';

/**
 * Create initial context by request options
 * @param options
 * @returns
 */
export function createContext(options: RequestOptions): Context {
    return options;
}
