import { Context } from './types';

interface Snapshot {
    context: Context;
    response: Response;
}

export default class FatcherError extends Error {
    constructor(context: Context, response: Response) {
        super(`[fatcher] Request fail with code ${response.status}`);

        this.snapshot = {
            context,
            response,
        };
    }

    name = 'fatcherError';

    snapshot: Snapshot;
}
