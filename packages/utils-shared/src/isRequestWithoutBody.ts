import { RequestMethod } from 'fatcher';

/**
 * Check this request method whether has request body.
 */
export function isRequestWithoutBody(method: RequestMethod) {
    return ['GET', 'HEAD'].includes(method);
}
