# @fatcherjs/middleware-cache

A middleware for caching response result.

[![install size](https://packagephobia.com/badge?p=@fatcherjs/middleware-cache)](https://packagephobia.com/result?p=@fatcherjs/middleware-cache)
<a href="https://unpkg.com/@fatcherjs/middleware-cache"><img alt="Size" src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-cache"></a>
<a href="https://npmjs.com/package/@fatcherjs/middleware-cache"><img src="https://img.shields.io/npm/v/@fatcherjs/middleware-cache.svg" alt="npm package"></a>

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-cache
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-cache/dist/cache.min.js"></script>
```

## Usage

```ts
import { cache } from '@fatcherjs/middleware-cache';
import { fatcher } from 'fatcher';

fatcher({
    url: '/bar/foo',
    middlewares: [cache({ ttl: 5 * 60 * 1000 })],
    payload: {
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

| Name     | Descriptions                           | Type                   | DefaultValue                          |
| -------- | -------------------------------------- | ---------------------- | ------------------------------------- |
| useCache | Whether use cache                      | `boolean`              | `true`                                |
| ttl      | Time to live(ms)                       | `number`               | `60 * 1000`                           |
| validate | Validate a request whether needs cache | `(Context) => boolean` | `context => context.method === 'GET'` |

## License

[LICENSE](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
