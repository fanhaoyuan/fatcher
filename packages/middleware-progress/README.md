# @fatcherjs/middleware-progress

A Middleware for getting progress

[![codecov](https://codecov.io/gh/fatcherjs/middleware-progress/branch/master/graph/badge.svg?token=TFKUGW6YNI)](https://codecov.io/gh/fatcherjs/middleware-progress)
[![install size](https://packagephobia.com/badge?p=@fatcherjs/middleware-progress)](https://packagephobia.com/result?p=@fatcherjs/middleware-progress)
<a href="https://unpkg.com/@fatcherjs/middleware-progress"><img alt="Size" src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-progress"></a>
<a href="https://npmjs.com/package/@fatcherjs/middleware-progress"><img src="https://img.shields.io/npm/v/@fatcherjs/middleware-progress.svg" alt="npm package"></a>
<a href="https://github.com/fatcherjs/middleware-progress/actions/workflows/ci.yml"><img src="https://github.com/fatcherjs/middleware-progress/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status"></a>

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-progress
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-progress/dist/progress.min.js"></script>
```

## Usage

```ts
import { progress } from '@fatcherjs/middleware-progress';
import { fatcher } from 'fatcher';

fatcher({
    url: '/bar/foo',
    middlewares: [
        progress({
            onDownloadProgress: (current, total) => {
                console.log(current / total);
            },
        }),
    ],
    body: {
        bar: 'foo',
    },
})
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(error);
    });
```

## Options

| Name               | Description                                   | Type                                                 | DefaultValue       |
| ------------------ | --------------------------------------------- | ---------------------------------------------------- | ------------------ |
| onDownloadProgress | Callback with read stream chunks              | `((current: number, total: number) => void) \| null` | `null`             |
| lengthName         | `Custom name in headers with `content-length` | `string`                                             | `'content-length'` |

## License

[MIT](./LICENSE)
