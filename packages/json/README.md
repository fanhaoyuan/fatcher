# @fatcherjs/middleware-json

A middleware for transform response to JSON

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
    payload: {
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

[LICENSE](https://github.com/fatcherjs/fatcher/blob/master/LICENSE)
