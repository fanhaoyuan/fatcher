# @fatcherjs/middleware-cache

A middleware for caching response result.

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

[LICENSE](https://github.com/fatcherjs/fatcher/blob/master/LICENSE)
