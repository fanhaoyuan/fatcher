# Fatcher

A out-of-box http request library with fetch for modern browsers.

## Languages

English | [中文](./README.CN.md)

## Features

-   ✨ Custom Middlewares
-   ✨ Stream API
-   ✨ Cancelable
-   ✨ Auto Transform Request Payload
-   ✨ Auto Transform Response data
-   ✨ Download Progress
-   ✨ Immutable Context

## Upcoming Features

-   🌱 Timeout
-   🌱 Reconnect limits
-   🌱 Resumable
-   🌱 Easy Mock

## Install

### NPM

```bash
>$ npm install fatcher
```

### CDN

#### jsdelivr

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
```

#### unpkg

```html
<script src="https://unpkg.com/fatcher/dist/fatcher.min.js"></script>
```

## usage

```ts
import { fatcher } from 'fatcher';

fatcher(
    '/api/my/request/url', //request url
    {
        //options
        method: 'get',
        payload: {
            a: 1,
            b: 2,
            c: 3,
        },
    }
)
    .then(res => {
        // response here
    })
    .catch(err => {
        // request error here.
    });
```

## Middlewares

Middleware is a function for change `request` context or `response` context.

```ts
export interface Middleware {
    name: string; //Middleware's name
    apply?: ((context: Immutable<RequestContext>) => boolean) | boolean; //Should middleware apply.
    use(context: Immutable<RequestContext>, next: MiddlewareNext): Promise<Response> | Response; //Handler of middleware
}
```

You can set custom middlewares between settled middlewares. Just register in `options.middlewares`.

### Change Context

#### Request

If you want to change a request context.

you just pass a patch context to `next()`;

```ts
next({
    options: {
        url: 'my-other-url',
    },
});
```

It will merge into a new context.

#### Response

### Order

`Fatcher` will use the following order to use middlewares.

-   fatcher-middleware-response-formatter
-   Custom Middlewares
-   fatcher-middleware-payload-transformer
-   fatcher-middleware-url-transformer
-   fatcher-middleware-fetcher

## Typescript

This lib is written by typescript.So typescript is fully supported.

## Promise

Fully Supported `promise` and `async/await`.

## License

[MIT](./LICENSE)
