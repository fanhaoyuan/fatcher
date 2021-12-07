import { isImmutable, clone } from '../immutable';
import { RequestOptions, Immutable, Response as FatcherResponse } from '../interfaces';

/**
 * Error of Fatcher.
 */
export class FatcherError<T = ReadableStream<Uint8Array>> extends Error {
    constructor(status: number, statusText: string, data: T, options: RequestOptions | Immutable<RequestOptions>) {
        super(`Fetch failed with status code ${status}`);

        this.options = isImmutable(options) ? clone(options) : options;
        this.status = status;
        this.data = data;
        this.statusText = statusText;
    }

    name = 'FatcherError';

    data: T;

    status: number;

    statusText: string;

    options: RequestOptions;

    isFatcherError = true;

    get headers(): Record<string, any> {
        return Object.fromEntries(Object.entries(this.options.headers).filter(item => item[1]));
    }

    async toJSON(): Promise<FatcherResponse<string | Record<string, any>>> {
        let responseData: string | Record<string, any> = this.data;

        if (responseData instanceof ReadableStream) {
            const [s1, s2] = responseData.tee();
            try {
                responseData = await new Response(s1, { headers: this.headers }).json();
            } catch (err) {
                responseData = await new Response(s2, { headers: this.headers }).text();
            }
        }

        return {
            status: this.status,
            statusText: this.statusText,
            data: responseData,
            options: this.options,
            headers: this.headers,
        };
    }
}
