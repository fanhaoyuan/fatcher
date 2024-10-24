# @fatcher/middleware-aborter

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
