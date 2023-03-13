import { Context, Options } from './types';

export default function createContext(input: string, options: Options): Context {
    const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        ...options.headers,
    });

    return { url: input, ...options, headers };
}
