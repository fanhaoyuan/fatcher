import { RequestOptions } from '../interfaces';

/**
 * Globals Options.
 */
export const defaultOptions: RequestOptions = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'same-origin',
    cache: 'default',
    redirect: 'follow',
    referrerPolicy: 'no-referrer-when-downgrade',
    mode: 'cors',
};
