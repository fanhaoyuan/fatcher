# Guide

Fatcher is a lightweight HTTP request library based on `fetch`. It allows us to use native `fetch` for web requests in a browser and NodeJS environment.

It is wrapped using the native `fetch`, we require that browsers or NodeJS support `fetch` when we use it.

-   Fetch support is already pretty good in modern browsers, so we don't have to worry about FETCH compatibility
-   In NodeJS, fetch already has some support starting with `18.0.0`

Fatcher aims to embrace the `fetch` of the standard library and at the same time provide some functions that cannot be provided in `fetch`, as well as make the function better expand and reuse.

## Compatibility

### Browsers

-   [fetch](https://caniuse.com/fetch)
-   [ReadableStream](https://caniuse.com/mdn-api_readablestream)
-   [Headers](https://caniuse.com/mdn-api_headers)
-   [Response](https://caniuse.com/mdn-api_response)
-   [Request](https://caniuse.com/mdn-api_request)
-   [AbortController](https://caniuse.com/abortcontroller)

### NodeJS

-   [fetch](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#fetch)
-   [ReadableStream](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#class-readablestream)
-   [Headers](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#class-headers)
-   [Response](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#response)
-   [Request](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#request)
-   [AbortController](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#class-abortcontroller)
