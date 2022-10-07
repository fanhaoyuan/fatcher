import { Context } from '../interfaces';

/**
 * Fatcher error
 */
export class FatcherError extends Error {
    constructor(context: Context, response: Response) {
        super(`[fatcher] Fetch failed with status code ${response.status}`);

        this.#response = response;
        this.#context = context;
    }

    readonly name = 'FatcherError';

    readonly #isFatcherError = true;

    readonly #response: Response;

    readonly #context: Context;

    isFatcherError() {
        return #isFatcherError in this;
    }


    toJSON() {
        const headers: Record<string, string> = {};

        for (const [key, value] of this.#response.headers) {
            headers[key] = value;
        }

        return {
            status: this.#response.status,
            statusText: this.#response.statusText,
            context: this.#context,
            headers,
            data: this.#response.body,
        };
    }
}
