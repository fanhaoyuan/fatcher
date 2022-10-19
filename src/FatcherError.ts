import { Context } from './interfaces';

/**
 * Fatcher error
 */
export class FatcherError extends Error {
    constructor(readonly _context: Context, readonly _response: Response) {
        super(`[fatcher] Fetch failed with status code ${_response.status}`);
    }

    override readonly name = 'FatcherError';

    get _isFatcherError() {
        return true;
    }

    isFatcherError() {
        return this._isFatcherError;
    }

    toJSON() {
        const headers: Record<string, string> = {};

        for (const [key, value] of this._response.headers) {
            headers[key] = value;
        }

        return {
            status: this._response.status,
            statusText: this._response.statusText,
            context: this._context,
            headers,
            data: this._response.body,
        };
    }
}
