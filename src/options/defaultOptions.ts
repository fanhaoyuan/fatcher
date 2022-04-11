import { RequestOptions } from '../interfaces';

/**
 * Globals Options.
 */
export const defaultOptions: RequestOptions = {
    baseUrl: '/',
    middlewares: [],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
};
