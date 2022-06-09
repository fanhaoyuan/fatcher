# Fatcher

[![codecov](https://codecov.io/gh/fatcherjs/fatcher/branch/master/graph/badge.svg?token=9DRTR2GXH8)](https://codecov.io/gh/fatcherjs/fatcher)
[![](https://data.jsdelivr.com/v1/package/npm/fatcher/badge?style=rounded)](https://www.jsdelivr.com/package/npm/fatcher)
[![install size](https://packagephobia.com/badge?p=fatcher)](https://packagephobia.com/result?p=fatcher)
<a href="https://npmjs.com/package/fatcher"><img src="https://img.shields.io/npm/v/fatcher.svg" alt="npm package"></a>
<a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/fatcher.svg" alt="node compatibility"></a>
<a href="https://github.com/fatcherjs/fatcher/actions/workflows/ci.yml"><img src="https://github.com/fatcherjs/fatcher/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status"></a>

A tiny (**<= 2KB**) composable HTTP request library which base on fetch API.

## Languages

English | [中文](./README.zh-CN.md)

## Feature List

### Core

| Name                   | Browsers                                    | Node           |
| ---------------------- | ------------------------------------------- | -------------- |
| Basic Request          | ✅                                          | ✅ (>= 18.0.0) |
| Promise API            | ✅                                          | ✅             |
| TypeScript Supports    | ✅                                          | ✅             |
| Streams API            | ✅ ([Streams](https://caniuse.com/streams)) | ✅ (>= 18.0.0) |
| Composable Middlewares | ✅                                          | ✅             |

### [@fatcherjs/middleware-json](https://github.com/fatcherjs/fatcher/tree/master/packages/json/)

| Name                        | Browsers | Node |
| --------------------------- | -------- | ---- |
| Automated JSON Transforming | ✅       | ✅   |

### [@fatcherjs/middleware-aborter](https://github.com/fatcherjs/fatcher/tree/master/packages/aborter)

| Name       | Browsers                                                    | Node |
| ---------- | ----------------------------------------------------------- | ---- |
| Cancelable | ✅ ([AbortController](https://caniuse.com/abortcontroller)) | ⚠️   |
| Timeout    | ✅ ([AbortController](https://caniuse.com/abortcontroller)) | ⚠️   |

### [@fatcherjs/middleware-form-data](https://github.com/fatcherjs/fatcher/tree/master/packages/form-data)

| Name              | Browsers | Node |
| ----------------- | -------- | ---- |
| FormData Supports | ✅       | ⚠️   |

### [@fatcherjs/middleware-progress](https://github.com/fatcherjs/fatcher/tree/master/packages/progress)

| Name              | Browsers | Node |
| ----------------- | -------- | ---- |
| Download Progress | ✅       | ⚠️   |

### [@fatcherjs/middleware-cache](https://github.com/fatcherjs/fatcher/tree/master/packages/cache)

| Name                  | Browsers | Node |
| --------------------- | -------- | ---- |
| Response Result Cache | ✅       | ✅   |

## Install

### NPM

```bash
>$ npm install fatcher

#or using yarn
>$ yarn add fatcher

#or using pnpm
>$ pnpm add fatcher
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
```

## Usage

### Basic

```ts
import { fatcher, isFatcherError } from 'fatcher';

fatcher({
    url: '/foo/bar',
    payload: {
        foo: 'bar',
    },
    method: 'GET',
})
    .then(response => {
        // response
        console.log(response);
    })
    .catch(error => {
        if (isFatcherError(error)) {
            // handle fatcher error;
            console.error(error.toJSON());
            return;
        }
        // handle other error
        console.error(error);
    });
```

### Advance

#### createScopedRequest

```ts
import { createScopedRequest, fatcher, isFatcherError } from 'fatcher';
import { json } from '@fatcherjs/middleware-json';

const fatcher = createScopedRequest({
    baseUrl: 'https://fatcher.virtual',
    method: 'POST',
    middlewares: [json()],
});

fatcher({
    url: '/getUserList',
    payload: {
        foo: 'bar',
    },
})
    .then(response => {
        // response
        console.log(response);
    })
    .catch(error => {
        if (isFatcherError(error)) {
            // handle fatcher error;
            console.error(error.toJSON());
            return;
        }
        // handle other error
        console.error(error);
    });
```

#### Globals Options

Inline Options `>` Scoped Options `>` Default Options

```ts
import { setDefaultOptions, fatcher, isFatcherError } from 'fatcher';
import { json } from '@fatcherjs/middleware-json';

setDefaultOptions({
    baseUrl: 'https://fatcher.virtual',
    method: 'POST',
    middlewares: [json()],
});

fatcher({
    url: '/getUserList',
    payload: {
        foo: 'bar',
    },
})
    .then(response => {
        // response
        console.log(response);
    })
    .catch(error => {
        if (isFatcherError(error)) {
            // handle fatcher error;
            console.error(error.toJSON());
            return;
        }
        // handle other error
        console.error(error);
    });
```

### Interceptors

It's actually using a custom Middleware to intercept.

#### Request Interceptor

An example for intercepting request before send.

```ts
import { Middleware, fatcher, isFatcherError } from 'fatcher';

function requestInterceptor(): Middleware {
    return {
        name: 'fatcher-middleware-request-interceptor',
        use(context, next) {
            if (!context.payload) {
                return Promise.reject(new Error('Payload is required.'));
            }

            if (context.method !== 'POST') {
                return Promise.reject(new Error('Method is not allowed.'));
            }

            // check anything from context.

            return next();
        },
    };
}

fatcher({
    url: '/foo/bar',
    method: 'POST',
    middlewares: [requestInterceptor()],
})
    .then(response => {
        // response
        console.log(response);
    })
    .catch(error => {
        if (isFatcherError(error)) {
            // handle fatcher error;
            console.error(error.toJSON());
            return;
        }
        // handle other error
        console.error(error);
    });
```

#### Response Interceptor

An example for intercepting response before resolve.

```ts
import { Middleware, fatcher, isFatcherError } from 'fatcher';

function responseInterceptor(): Middleware {
    return {
        name: 'fatcher-middleware-response-interceptor',
        async use(context, next) {
            const result = await next();

            // check anything from result.

            if (result.data.status === 50000) {
                return Promise.reject(result.data);
            }

            return result;
        },
    };
}

fatcher({
    url: '/foo/bar',
    method: 'POST',
    middlewares: [responseInterceptor()],
})
    .then(response => {
        // response
        console.log(response);
    })
    .catch(error => {
        if (isFatcherError(error)) {
            // handle fatcher error;
            console.error(error.toJSON());
            return;
        }
        // handle other error
        console.error(error);
    });
```

## Polyfills

-   [Streams API](https://github.com/MattiasBuelens/web-streams-polyfill#readme)
-   [Fetch API](https://github.com/github/fetch#readme)

## More

More information in [documentation](https://fatcherjs.github.io/docs/)

## License

[MIT](./LICENSE)
