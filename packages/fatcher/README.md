<div style="text-align: center;">
<p style="font-size:40px;">Fatcher<p>
<p style="font-size:20x;margin-bottom: 8px;">
A out-of-box 📦 http request library with fetch for modern browsers.<p>

[![codecov](https://codecov.io/gh/fanhaoyuan/fatcher/branch/master/graph/badge.svg?token=9DRTR2GXH8)](https://codecov.io/gh/fanhaoyuan/fatcher)
[![](https://data.jsdelivr.com/v1/package/npm/fatcher/badge?style=rounded)](https://www.jsdelivr.com/package/npm/fatcher)
<a href="https://npmjs.com/package/fatcher"><img src="https://img.shields.io/npm/v/fatcher.svg" alt="npm package"></a>
<a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/fatcher.svg" alt="node compatibility"></a>
<a href="https://github.com/fanhaoyuan/fatcher/actions/workflows/ci.yml"><img src="https://github.com/fanhaoyuan/fatcher/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status"></a>

</div>

---

## Languages

English | [中文](./README.zh-CN.md)

## Browsers

|  Chrome   |  Firefox  |   Edge    |  Safari   |       IE       |
| :-------: | :-------: | :-------: | :-------: | :------------: |
| ✅ latest | ✅ latest | ✅ latest | ✅ latest | ❌ Not Support |

## Features

-   ✨ Built-in common request encapsulation and default configuration, no additional configuration required.
-   ✨ Flexible middleware system that processes data in different scenarios through different combinations of middleware.
-   ✨ Data emulation of each request is supported to obtain simulated data returned by the interface at development.
-   ✨ Written entirely in TypeScript, the complete type system is much easier to use.
-   ✨ Data is returned as a stream and can be read and operated at the same time to speed up interface processing.
-   ✨ Request payload and response data are automatically converted without manual conversion.

## Install

### NPM

```bash
>$ npm install fatcher
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
```

## usage

```ts
import { fatcher } from 'fatcher';

fatcher(
    '/api/my/request/url', //request url
    {
        //options
        method: 'get',
        payload: {
            a: 1,
            b: 2,
            c: 3,
        },
    }
)
    .then(res => {
        // response here
    })
    .catch(err => {
        // request error here.
    });
```

## More

More information in [document](https://fanhaoyuan.github.io/fatcher)

## License

[MIT](./LICENSE)
