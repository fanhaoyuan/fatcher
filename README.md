# Fatcher

> Send fetch requests gracefully in browsers and Node.js

<div align="center">
  <a href="https://codecov.io/github/fatcherjs/fatcher" > 
    <img src="https://codecov.io/github/fatcherjs/fatcher/graph/badge.svg?token=JL0Z89OVRI"/> 
 </a>
  <a href="https://www.jsdelivr.com/package/npm/fatcher">
    <img src="https://data.jsdelivr.com/v1/package/npm/fatcher/badge?style=rounded" alt="jsDelivr">
  </a>
  <a href="https://packagephobia.com/result?p=fatcher">
    <img src="https://packagephobia.com/badge?p=fatcher" alt="install size">
  </a>
  <a href="https://unpkg.com/fatcher">
    <img src="https://img.badgesize.io/https://unpkg.com/fatcher" alt="Size">
  </a>
  <a href="https://npmjs.com/package/fatcher">
    <img src="https://img.shields.io/npm/v/fatcher.svg" alt="npm package">
  </a>
  <a href="https://nodejs.org/en/about/releases/">
    <img src="https://img.shields.io/node/v/fatcher.svg" alt="node compatibility">
  </a>
  <a href="https://github.com/fatcherjs/fatcher/actions/workflows/ci.yml">
    <img src="https://github.com/fatcherjs/fatcher/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status">
  </a>
</div>

## Introduction

`Fatcher` is a lightweight HTTP request library based on the native `fetch` API. It works seamlessly in both browsers and Node.js environments.

### Features

- Fully compatible with the Fetch API
- Zero dependencies
- Less than 1kb
- Works in Node.js and all modern browsers
- Composable middleware
- Streaming API support

### Compatibility

| Platform          | Version       |
| ----------------- | ------------- |
| Chrome            | >= 66         |
| Firefox           | >= 65         |
| Safari            | >= 12.1       |
| Edge              | >= 16         |
| Opera             | >= 53         |
| Internet Explorer | Not Supported |
| Node.js           | >= 18.0.0     |

## Installation

### NPM

```bash
npm install fatcher
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
<script>
  Fatcher.fatcher('xxx', {}).then(response => {
    console.log(response);
  });
</script>
```

## Quick Start

```ts
import { fatcher } from 'fatcher';

const init: RequestInit = {};
fatcher('https://foo.bar', init);

// equivalent to native fetch
fetch('https://foo.bar', init);
```

## Middlewares

Fatcher uses a middleware system similar to Koa.

```ts
export interface FatcherOptions extends RequestInit {
  middlewares?: FatcherMiddlewares | FatcherMiddlewares[];
}

export interface FatcherContext extends Omit<FatcherOptions, 'middlewares'> {
  request: Request;
}

export type FatcherFunctionalMiddleware = (
  request: FatcherContext,
  next: (context?: Partial<FatcherContext>) => Promise<FatcherResponse> | FatcherResponse,
) => Promise<FatcherResponse> | FatcherResponse;

export type FatcherMiddleware = {
  name: string;
  use: FatcherFunctionalMiddleware;
};
```

- FunctionalMiddleware runs every time it is used.
- ObjectMiddleware is registered only once, respecting the registration order.

### Custom Middleware

```ts
// fatcher.d.ts
import 'fatcher';

declare module 'fatcher' {
  // expand fatcher options for custom options
  interface FatcherOptions {
    baseUrl?: number;
  }
}

// middleware.ts
import { defineMiddleware } from 'fatcher';
const baseUrlMiddleware = defineMiddleware({
  name: 'base-url',
  use: async (context, next) => {
    const target = `${context.baseUrl}/${context.url}`;
    return next({ request: new Request(target, context.request), url: target });
  },
});

// api.ts
fatcher('/foo.bar', {
  baseUrl: 'https://api.example.com',
}).then(response => {
  // do something
});
```

## Examples

### Logger Middleware

```ts
import { defineMiddleware } from 'fatcher';

const logs = defineMiddleware(async (request, next) => {
  const startTime = Date.now();

  const response = await next();

  console.log(`Request spent ${Date.now() - startTime}ms`);
  return response;
});

fatcher('https://foo.bar', { middlewares: [logs] }); // Request spent 20 ms
```

### Custom Request

```ts
import { defineMiddleware } from 'fatcher';

const request = defineMiddleware({
  name: 'my-custom-request',
  use: async context => {
    const response = await myFetch(context.url);
    return response;
  },
});
// custom request should register at last
fatcher('https://foo.bar', { middlewares: [request] });
```

### Request Interceptor

```ts
import { defineMiddleware } from 'fatcher';

const requestInterceptor = defineMiddleware({
  name: 'request-interceptor',
  use: async (context, next) => {
    const accessToken = localStorage.get('AccessToken');

    if (accessToken) {
      context.request.headers.set('Authorization', accessToken);
    }

    return next();
  },
});
```

### Response Interceptor

```ts
import { defineMiddleware, fatcher } from 'fatcher';

const responseInterceptor = defineMiddleware({
  name: 'response-interceptor',
  use: async (context, next) => {
    const response = await next();

    // rewrite response body
    return new Response('success', response);
  },
});

fatcher('https://foo.bar', {
  middlewares: [responseInterceptor],
}).then(response => {
  const text = await response.text();
  console.log(text); // 'success'2
});
```

### Video Transformer

```ts
// fatcher.d.ts
import 'fatcher';

declare module 'fatcher' {
  interface FatcherResponse {
    getMp4: () => Promise<File>;
  }
}

// middleware.ts
import { defineMiddleware, fatcher } from 'fatcher';

const videoTransformer = defineMiddleware({
  name: 'video-transformer',
  use: async (context, next) => {
    const response = await next();

    const videoResponse = response.clone();

    response.getMp4 = () => {
      return new Promise((resolve, reject) => {
        // video transform
        console.log(videoResponse);
      });
    };

    return response;
  },
});

// api.ts
const response = await fatcher('https://video.examples.com/foo.avi', {
  middlewares: [videoTransformer],
});

const mediaSource = new MediaSource();
const url = URL.createObjectURL(mediaSource);
mediaSource.onsourceopen = async () => {
  // read response readableStream for data;
};
const video = document.querySelector('#video');
video.src = url;

const transformedFile = await response.getMp4();
// download mp4 file
```

## Packages

- [@fatcherjs/middleware-aborter](https://github.com/fatcherjs/middleware-aborter)
- [@fatcherjs/middleware-cache](https://github.com/fatcherjs/middleware-cache)
- [@fatcherjs/middleware-form-data](https://github.com/fatcherjs/middleware-form-data)
- [@fatcherjs/middleware-json](https://github.com/fatcherjs/middleware-json)
- [@fatcherjs/middleware-parameter](https://github.com/fatcherjs/middleware-parameter)
- [@fatcherjs/middleware-progress](https://github.com/fatcherjs/middleware-progress)
- [@fatcherjs/middleware-exception](https://github.com/fatcherjs/middleware-exception)

## License

[MIT](https://github.com/fatcherjs/fatcher/blob/master/LICENSE)
