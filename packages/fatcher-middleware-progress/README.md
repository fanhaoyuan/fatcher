# @fatcherjs/middleware-progress

<a href="https://npmjs.com/package/@fatcherjsjs/middleware-progress"><img src="https://img.shields.io/npm/v/@fatcherjsjs/middleware-progress.svg" alt="npm package"></a>
[![install size](https://packagephobia.com/badge?p=@fatcherjs/middleware-progress)](https://packagephobia.com/result?p=@fatcherjs/middleware-progress)
<a href="https://unpkg.com/@fatcherjs/middleware-progress"><img alt="Size" src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-progress"></a>

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-progress
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-progress/dist/index.min.js"></script>
```

## Usage

```ts
import { fatcher } from 'fatcher';
import { progress } from '@fatcherjs/middleware-progress';

fatcher('https://foo.bar', {
  middlewares: [
    progress({
      // Options
    }),
  ],
});
```

## Options

### onDownloadProgress

```ts
import { fatcher } from 'fatcher';
import { progress } from '@fatcherjs/middleware-progress';

fatcher('https://foo.bar', {
  middlewares: [
    progress({
      onDownloadProgress: (current, total) => {
        console.log(current, total);
      }, // will trigger when receive data
    }),
  ],
});
```

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
