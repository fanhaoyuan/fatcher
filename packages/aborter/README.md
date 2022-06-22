# @fatcherjs/middleware-aborter

A middleware for aborting fatcher request.

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-aborter
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-aborter/dist/aborter.min.js"></script>
```

## Usage

```ts
import { aborter } from '@fatcherjs/middleware-aborter';
import { fatcher, isAbortError } from 'fatcher';

fatcher({
    url: '/bar/foo',
    middlewares: [
        aborter({
            timeout: 10 * 1000, // 10s
            onAbort: () => {
                console.log('Request is Aborted.');
            },
        }),
    ],
})
    .then(res => {
        // Request success in 10s
        console.log(res);
    })
    .catch(err => {
        if (isAbortError(err)) {
            //Run error when request aborted.
            console.error(err);
        }

        // Other errors.
    });
```

## Options

### timeout

-   Type: `number`
-   DefaultValue: `0`
-   Description:

If `timeout > 0`, will abort this request later.

Aborted request will throw a DOMException which can use `isAbortError` to confirm.

### onAbort

-   Type: `(() => void) | null`
-   DefaultValue: `null`
-   Description:

A callback when aborting this request.

## License

[MIT](https://github.com/fatcherjs/fatcher/blob/master/LICENSE)
