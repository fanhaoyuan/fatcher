import { RequestOptions, Immutable } from '../interfaces';

/**
 * Error of Fatcher.
 */
export class FatcherError<T = ReadableStream<Uint8Array>> extends Error {
    constructor(status: number, statusText: string, data: T, options: RequestOptions | Immutable<RequestOptions>) {
        super(`Fetch failed with status code ${status}`);

        this.options = options;
        this.status = status;
        this.data = data;
        this.statusText = statusText;
    }

    name = 'FatcherError';

    data: T;

    status: number;

    statusText: string;

    options: RequestOptions | Immutable<RequestOptions>;

    isFatcherError = true;

    get headers(): Record<string, any> {
        return Object.fromEntries(Object.entries(this.options.headers).filter(item => item[1]));
    }

    toJSON() {
        const headers = this.options.headers;

        const data =
            this.data instanceof ReadableStream ? new Response(this.data, { headers: this.headers }).json() : this.data;

        return {
            status: this.status,
            statusText: this.statusText,
            data,
            options: this.options,
            headers,
        };
    }
}
