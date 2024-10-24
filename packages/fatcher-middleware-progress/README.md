# @fatcher/middleware-progress

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
