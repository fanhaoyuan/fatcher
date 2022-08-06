# @fatcherjs/middleware-progress

A Middleware for getting progress

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-progress
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-progress/dist/progress.min.js"></script>
```

## Usage

```ts
import { progress } from '@fatcherjs/middleware-progress';
import { fatcher } from 'fatcher';

fatcher({
    url: '/bar/foo',
    middlewares: [
        progress({
            onDownloadProgress: (current, total) => {
                console.log(current / total);
            },
        }),
    ],
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

## Options

| Name               | Description                                   | Type                                                 | DefaultValue       |
| ------------------ | --------------------------------------------- | ---------------------------------------------------- | ------------------ |
| onDownloadProgress | Callback with read stream chunks              | `((current: number, total: number) => void) \| null` | `null`             |
| lengthName         | `Custom name in headers with `content-length` | `string`                                             | `'content-length'` |

## License

[MIT](https://github.com/fatcherjs/fatcher/blob/master/LICENSE)
