<div align="center">
<h1>Fatcher</h1>

Send fetch request gracefully in browsers and nodeJS

[![codecov](https://codecov.io/gh/fanhaoyuan/fatcher/branch/master/graph/badge.svg?token=9DRTR2GXH8)](https://codecov.io/gh/fanhaoyuan/fatcher)
[![](https://data.jsdelivr.com/v1/package/npm/fatcher/badge?style=rounded)](https://www.jsdelivr.com/package/npm/fatcher)
[![install size](https://packagephobia.com/badge?p=fatcher)](https://packagephobia.com/result?p=fatcher)
<a href="https://unpkg.com/fatcher"><img alt="Size" src="https://img.badgesize.io/https://unpkg.com/fatcher"></a>
<a href="https://npmjs.com/package/fatcher"><img src="https://img.shields.io/npm/v/fatcher.svg" alt="npm package"></a>
<a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/fatcher.svg" alt="node compatibility"></a>
<a href="https://github.com/fanhaoyuan/fatcher/actions/workflows/ci.yml"><img src="https://github.com/fanhaoyuan/fatcher/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status"></a>

</div>

## Introduction

`Fatcher` is a lightweight HTTP request library based on `fetch`. It allows us to use native `fetch` for web requests in a browser and NodeJS environment.

It is wrapped using the native `fetch`, we require that browsers or NodeJS support `fetch` when we use it.

- Fetch support is already pretty good in modern browsers.
- In NodeJS, fetch already support with `18.0.0`

`Fatcher` aims to embrace the `fetch` of the standard library and at the same time provide some functions that cannot be provided in `fetch`, as well as make the function better expand and reuse.

### Features

- Fully compatible with fetch api
- Zero dependencies
- Tiny: less than 1kb
- Works in Node.js and all modern browsers
- Composable middleware
- Streaming API

### Compatibility

#### Browsers

- [fetch](https://caniuse.com/fetch)
- [ReadableStream](https://caniuse.com/mdn-api_readablestream)
- [Headers](https://caniuse.com/mdn-api_headers)
- [Response](https://caniuse.com/mdn-api_response)
- [Request](https://caniuse.com/mdn-api_request)
- [AbortController](https://caniuse.com/abortcontroller)

#### NodeJS

- [fetch](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#fetch)
- [ReadableStream](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#class-readablestream)
- [Headers](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#class-headers)
- [Response](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#response)
- [Request](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#request)
- [AbortController](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#class-abortcontroller)

## Getting Started

### Install

#### NPM

```bash
>$ npm install fatcher
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
```

## Usage

### Basic

`Fatcher` is fully compatible with fetch api.

```ts
const fetchOptions = {
  /* options */
};

fetch('https://foo.bar', fetchOptions);

// is similar to
import { fatcher } from 'fatcher';
fatcher('https://foo.bar', fetchOptions);
```

### Middleware

Everything is middleware, middleware is a function which is like in koa

```ts
export type FatcherMiddleware = (
  request: FatcherRequest,
  next: (request?: Partial<FatcherRequest>) => Promise<FatcherResponse> | FatcherResponse,
) => Promise<FatcherResponse> | FatcherResponse;
```

We can pass the request context to next middleware and get the response form next middleware.

We should call the next function and return the response to prev middleware.

```ts
import { defineMiddleware } from 'fatcher';

const logs = defineMiddleware(async (request, next) => {
  const response = await next({
    url: 'https://foo.bar1',
  });
});

fatcher('https://foo.bar', { middlewares: [logs] }); //  sent to 'https://foo.bar1' instead of 'https://foo.bar'
```

### Exception Handling

In the fetch api, all requests are considered successful. However, we generally consider a request with a response code of `200-299` to be successful.

```ts
import { exception, fatcher, isFatcherError } from 'fatcher';

fatcher('https://foo.bar', { middlewares: [exception()] }).catch(error => {
  if (isFatcherError(error)) {
    // handle fatcher error
    return;
  }

  // handle other error
});
```

## Packages

- [@fatcherjs/middleware-aborter](https://github.com/fanhaoyuan/fatcher/tree/master/packages/fatcher-middleware-aborter)
- [@fatcherjs/middleware-cache](https://github.com/fanhaoyuan/fatcher/tree/master/packages/fatcher-middleware-cache)
- [@fatcherjs/middleware-form-data](https://github.com/fanhaoyuan/fatcher/tree/master/packages/fatcher-middleware-form-data)
- [@fatcherjs/middleware-json](https://github.com/fanhaoyuan/fatcher/tree/master/packages/fatcher-middleware-json)
- [@fatcherjs/middleware-parameter](https://github.com/fanhaoyuan/fatcher/tree/master/packages/fatcher-middleware-parameter)
- [@fatcherjs/middleware-progress](https://github.com/fanhaoyuan/fatcher/tree/master/packages/fatcher-middleware-progress)

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
