import { FatcherRequest, FatcherResponse } from 'fatcher';

interface Snapshot {
  request: FatcherRequest;
  response: FatcherResponse;
}

export class FatcherError extends Error {
  constructor(request: FatcherRequest, response: FatcherResponse) {
    super(`[fatcher] Request fail with code ${response.status}`);

    this.snapshot = {
      request,
      response,
    };
  }

  name = 'fatcherError';

  snapshot: Snapshot;
}
