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

| Name                            | Requires | Browsers(`Modern`)                          | Node(`>= 17.5.0`) |
| ------------------------------- | -------- | ------------------------------------------- | :---------------: |
| `Basic Request`                 | `Core`   | ✅ ([Fetch](https://caniuse.com/fetch))     |        ✅         |
| `Promise API`                   | `Core`   | ✅                                          |        ✅         |
| `TypeScript Supports`           | `Core`   | ✅                                          |        ✅         |
| `Streams API`                   | `Core`   | ✅ ([Streams](https://caniuse.com/streams)) |        ✅         |
| `Composable Middlewares`        | `Core`   | ✅                                          |        ✅         |
| `Transforms JSON automatically` | `Core`   | ✅                                          |        ✅         |

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

```ts
import { fatcher } from 'fatcher';

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
        // something run error
        console.error(error);
    });
```

## Polyfills

-   [Streams API](https://github.com/MattiasBuelens/web-streams-polyfill#readme)
-   [Fetch API](https://github.com/github/fetch#readme)

## License

[MIT](./LICENSE)
