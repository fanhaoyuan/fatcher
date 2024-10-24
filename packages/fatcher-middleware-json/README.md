# @fatcher/middleware-json

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-json
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-json/dist/index.min.js"></script>
```

## Usage

```ts
import { fatcher } from 'fatcher';
import { json } from '@fatcherjs/middleware-json';

fatcher('https://foo.bar', {
  middlewares: [json()],
});
```

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
