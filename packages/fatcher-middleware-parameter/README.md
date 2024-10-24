# @fatcher/middleware-parameter

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-parameter
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-parameter/dist/index.min.js"></script>
```

## Usage

```ts
import { fatcher } from 'fatcher';
import { parameter } from '@fatcherjs/middleware-parameter';

fatcher('https://foo.bar', {
  middlewares: [
    parameter({
      params: {
        test: '1',
      },
    }),
  ],
}); // url is https://foo.bar?test=1
```

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
