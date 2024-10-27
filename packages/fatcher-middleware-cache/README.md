# @fatcherjs/middleware-cache

<a href="https://npmjs.com/package/@fatcherjs/middleware-cache"><img src="https://img.shields.io/npm/v/@fatcherjs/middleware-cache.svg" alt="npm package"></a>
[![install size](https://packagephobia.com/badge?p=@fatcherjs/middleware-cache)](https://packagephobia.com/result?p=@fatcherjs/middleware-cache)
<a href="https://unpkg.com/@fatcherjs/middleware-cache"><img alt="Size" src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-cache"></a>

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-cache
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-cache/dist/index.min.js"></script>
```

## Usage

```ts
import { fatcher } from 'fatcher';
import { cache } from '@fatcherjs/middleware-cache';

fatcher('https://foo.bar', {
  middlewares: [
    cache({
      /* Options*/
    }),
  ],
});
```

## Options

### ttl

```ts
import { fatcher } from 'fatcher';
import { cache } from '@fatcherjs/middleware-cache';

fatcher('https://foo.bar', {
  middlewares: [
    cache({
      ttl: 5 * 1000, // Cache in 5 seconds
    }),
  ],
});
```

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
