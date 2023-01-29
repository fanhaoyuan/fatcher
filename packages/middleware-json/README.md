# @fatcherjs/middleware-json

A middleware for transform response to JSON

[![install size](https://packagephobia.com/badge?p=@fatcherjs/middleware-json)](https://packagephobia.com/result?p=@fatcherjs/middleware-json)
<a href="https://unpkg.com/@fatcherjs/middleware-json"><img alt="Size" src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-json"></a>
<a href="https://npmjs.com/package/@fatcherjs/middleware-json"><img src="https://img.shields.io/npm/v/@fatcherjs/middleware-json.svg" alt="npm package"></a>

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-json
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-json/dist/json.min.js"></script>
```

## Usage

```ts
import { json } from '@fatcherjs/middleware-json';
import { fatcher } from 'fatcher';

fatcher({
    url: '/bar/foo',
    middlewares: [json()],
    body: {
        bar: 'foo',
    },
})
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(error);
    });
```

## License

[LICENSE](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
