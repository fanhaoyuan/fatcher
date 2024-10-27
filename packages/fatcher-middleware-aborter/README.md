# @fatcherjs/middleware-aborter

<a href="https://npmjs.com/package/@fatcherjs/middleware-aborter"><img src="https://img.shields.io/npm/v/@fatcherjs/middleware-aborter.svg" alt="npm package"></a>
[![install size](https://packagephobia.com/badge?p=@fatcherjs/middleware-aborter)](https://packagephobia.com/result?p=@fatcherjs/middleware-aborter)
<a href="https://unpkg.com/@fatcherjs/middleware-aborter"><img alt="Size" src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-aborter"></a>

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-aborter
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-aborter/dist/index.min.js"></script>
```

## Usage

```ts
import { fatcher } from 'fatcher';
import { aborter } from '@fatcherjs/middleware-aborter';

fatcher('https://foo.bar', {
  middlewares: [
    aborter({
      /* Options*/
    }),
  ],
});
```

## Options

### onAbort

```ts
import { fatcher } from 'fatcher';
import { aborter } from '@fatcherjs/middleware-aborter';

fatcher('https://foo.bar', {
  middlewares: [
    aborter({
      onAbort: () => console.log('aborted'),
    }),
  ],
});
```

### timeout

```ts
import { fatcher } from 'fatcher';
import { aborter } from '@fatcherjs/middleware-aborter';

fatcher('https://foo.bar', {
  middlewares: [
    aborter({
      timeout: 10 * 1000, // abort in 10 seconds
    }),
  ],
});
```

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
