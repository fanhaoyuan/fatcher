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

| Name                          | Requires                                                                                                   | Browsers(`Modern`)                                          | Node(`>= 17.5.0`) |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | :---------------: |
| `Basic Request`               | `Core`                                                                                                     | ✅ ([Fetch](https://caniuse.com/fetch))                     |        ✅         |
| `Promise API`                 | `Core`                                                                                                     | ✅                                                          |        ✅         |
| `TypeScript Supports`         | `Core`                                                                                                     | ✅                                                          |        ✅         |
| `Streams API`                 | `Core`                                                                                                     | ✅ ([Streams](https://caniuse.com/streams))                 |        ✅         |
| `Composable Middlewares`      | `Core`                                                                                                     | ✅                                                          |        ✅         |
| `Automated JSON Transforming` | [@fatcherjs/middleware-json](https://github.com/fatcherjs/middlewares/tree/master/packages/json)           | ✅                                                          |        ✅         |
| `Cancelable`                  | [@fatcherjs/middleware-aborter](https://github.com/fatcherjs/middlewares/tree/master/packages/aborter)     | ✅ ([AbortController](https://caniuse.com/abortcontroller)) |        ✅         |
| `FormData Supports`           | [@fatcherjs/middleware-form-data](https://github.com/fatcherjs/middlewares/tree/master/packages/form-data) | ✅                                                          |        ✅         |

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
import { createScopedRequest } from 'fatcher';
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
import { setDefaultOptions } from 'fatcher';

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

## Polyfills

-   [Streams API](https://github.com/MattiasBuelens/web-streams-polyfill#readme)
-   [Fetch API](https://github.com/github/fetch#readme)

## License

[MIT](./LICENSE)
