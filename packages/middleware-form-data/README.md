# @fatcherjs/middleware-form-data

A middleware for consuming payload to form data

[![codecov](https://codecov.io/gh/fatcherjs/middleware-form-data/branch/master/graph/badge.svg?token=TFKUGW6YNI)](https://codecov.io/gh/fatcherjs/middleware-form-data)
[![install size](https://packagephobia.com/badge?p=@fatcherjs/middleware-form-data)](https://packagephobia.com/result?p=@fatcherjs/middleware-form-data)
<a href="https://unpkg.com/@fatcherjs/middleware-form-data"><img alt="Size" src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-form-data"></a>
<a href="https://npmjs.com/package/@fatcherjs/middleware-form-data"><img src="https://img.shields.io/npm/v/@fatcherjs/middleware-form-data.svg" alt="npm package"></a>
<a href="https://github.com/fatcherjs/middleware-form-data/actions/workflows/ci.yml"><img src="https://github.com/fatcherjs/middleware-form-data/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status"></a>

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-form-data
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-form-data/dist/form-data.min.js"></script>
```

## Usage

```ts
import { formData } from '@fatcherjs/middleware-form-data';
import { fatcher } from 'fatcher';

fatcher({
    url: '/bar/foo',
    middlewares: [formData()],
    payload: {
        bar: 'foo',
    },
    headers: {
        'Content-Type': 'multipart/form-data',
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

[LICENSE](./LICENSE)
