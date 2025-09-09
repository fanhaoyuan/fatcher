# @fatcherjs/middleware-form-data

<a href="https://npmjs.com/package/@fatcherjs/middleware-form-data"><img src="https://img.shields.io/npm/v/@fatcherjs/middleware-form-data.svg" alt="npm package"></a>
[![install size](https://packagephobia.com/badge?p=@fatcherjs/middleware-form-data)](https://packagephobia.com/result?p=@fatcherjs/middleware-form-data)
<a href="https://unpkg.com/@fatcherjs/middleware-form-data"><img alt="Size" src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-form-data"></a>

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
  middlewares: [formData],
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  method: 'POST',
  body: {
    foo: 'bar',
    test: 'a',
  },
});
```

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
