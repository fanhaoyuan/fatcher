# @fatcherjs/middleware-form-data

A middleware for consuming payload to form data

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

[LICENSE](https://github.com/fatcherjs/fatcher/blob/master/LICENSE)
