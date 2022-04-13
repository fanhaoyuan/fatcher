import { Context } from '../interfaces';

/**
 * Fatcher error
 */
export class FatcherError extends Error {
    constructor(context: Context, response: Response) {
        super(`[Fatcher]: Fetch failed with status code ${response.status}`);

        this._response = response;
        this._context = context;
    }

    readonly name = 'FatcherError';

    readonly __isFatcherError__ = true;

    private readonly _response: Response;

    private readonly _context: Context;

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
