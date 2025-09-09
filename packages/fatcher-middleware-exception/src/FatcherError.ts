import { FatcherContext, FatcherResponse } from 'fatcher';

interface Snapshot {
  context: FatcherContext;
  response: FatcherResponse;
}

export class FatcherError extends Error {
  constructor(context: FatcherContext, response: FatcherResponse) {
    super(`[fatcher] Request fail with code ${response.status}`);

    this.snapshot = {
      context,
      response,
    };
  }

  name = 'fatcherError';

  snapshot: Snapshot;
}
