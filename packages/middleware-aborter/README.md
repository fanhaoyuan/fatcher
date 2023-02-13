# @fatcherjs/middleware-aborter

A middleware for aborting fatcher request.

[![install size](https://packagephobia.com/badge?p=@fatcherjs/middleware-aborter)](https://packagephobia.com/result?p=@fatcherjs/middleware-aborter)
<a href="https://unpkg.com/@fatcherjs/middleware-aborter"><img alt="Size" src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-aborter"></a>
<a href="https://npmjs.com/package/@fatcherjs/middleware-aborter"><img src="https://img.shields.io/npm/v/@fatcherjs/middleware-aborter.svg" alt="npm package"></a>

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
import { aborter, isAbortError } from '@fatcherjs/middleware-aborter';
import { fatcher } from 'fatcher';

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

| Name        | Description                                     | Type                                     | DefaultValue                                                                         |
| ----------- | ----------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| timeout     | If `timeout > 0`, will abort this request later | `number`                                 | `0`                                                                                  |
| onAbort     | A callback when aborting this request           | `(() => void) \| null`                   | `null`                                                                               |
| concurrency | Request concurrency restrictions                | `boolean`                                | `false`                                                                              |
| groupBy     | Concurrency key                                 | `(context: Readonly<Context>) => string` | `${context.url}_${context.method}_${new URLSearchParams(context.params).toString()}` |

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)