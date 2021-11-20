import { RequestOptions, Immutable } from '../interfaces';

/**
 * An error of abort fetch
 */
export class AbortError extends Error {
    constructor(options: RequestOptions | Immutable<RequestOptions>) {
        super(`${options.url} is aborted.`);

        this.options = options;
    }

    options: RequestOptions | Immutable<RequestOptions>;

    name = 'AbortError';

    get url() {
        return this.options.url;
    }

    /**
     * The flag of abort error
     */
    get isAborted() {
        return true;
    }
}
