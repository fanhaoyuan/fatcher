# @fatcher/middleware-form-data

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-form-data
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-form-data/dist/index.min.js"></script>
```

## Usage

```ts
import { fatcher } from 'fatcher';
import { formData } from '@fatcherjs/middleware-form-data';

fatcher('https://foo.bar', {
  middlewares: [formData()],
});
```

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
