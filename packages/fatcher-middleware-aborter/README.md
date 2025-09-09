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

## Provider

### FatcherRequest

#### abort

```ts
declare module 'fatcher' {
  interface FatcherRequest {
    abort: (reason?: string) => void;
  }
}
```

Middleware can get a `abort` function after call `aborter`;

```ts
fatcher('https://foo.bar', {
  middlewares: [
    aborter(),
    (req, next) => {
      console.log(typeof req.abort); // 'function'
      return next();
    },
  ],
});
```

## Usage

### Basic

```ts
import { fatcher } from 'fatcher';
import { aborter } from '@fatcherjs/middleware-aborter';

fatcher('https://foo.bar', {
  onAbort: () => console.log('aborted'),
  middlewares: [aborter()],
});
```

### Timeout

```ts
import { fatcher } from 'fatcher';
import { aborter, timeout } from '@fatcherjs/middleware-aborter';

fatcher('https://foo.bar', {
  onAbort: () => console.log('aborted'),
  timeout: 1000 * 10, // 10s
  middlewares: [aborter, timeout /* must call after aborter */],
});
```

### User Cancelable

```ts
import { fatcher } from 'fatcher';
import { aborter } from '@fatcherjs/middleware-aborter';

const abortController = new AbortController();

fatcher('https://foo.bar', {
  onAbort: () => console.log('aborted'),
  abortController,
  middlewares: [aborter],
}).catch(error => {
  // abort error
});

abortController.abort();
```

### isAbortError

```ts
import { fatcher } from 'fatcher';
import { aborter, isAbortError } from '@fatcherjs/middleware-aborter';

const abortController = new AbortController();

fatcher('https://foo.bar', {
  onAbort: () => console.log('aborted'),
  abortController,
  middlewares: [aborter],
}).catch(error => {
  if (isAbortError(error)) {
    // do something..
    return;
  }
  // other error
});

abortController.abort();
```

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
