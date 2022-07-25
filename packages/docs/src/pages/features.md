---
title: Features
order: 2
---

# Features

It is has no different between `fatcher` and `fetch` in basic using.

But fatcher can compose different enhancements functions to adapt to different usage scenarios.

## Middlewares

-   Package: [Core](https://github.com/fatcherjs/fatcher/tree/master/packages/fatcher)

The core of fatcher is middleware composition.

Middleware composition implementation is consulted `koa`.

By combining middleware, we can realize request parameter interception, response interception, simulated return and other operations in one middleware.

> See the next section for details[Middleware](/middlewares)

## Cancelable Request

-   Package: [@fatcherjs/middleware-aborter](https://github.com/fatcherjs/fatcher/tjsree/master/packages/aborter)

In many scenarios, we need to cancel requests, such as download or upload operations.

Fetch does not provide an API to cancel the request, but we can cancel the fetch request by binding `AbortController`.

### Binding Manually

If you want to manually binding an `AbortController` to cancel the request, you can provide `signal` to `fatcher`.

```ts
import { fatcher } from 'fatcher';

const aborterController = new AbortController();

fatcher({
    url: '/get',
    signal: aborterController.signal,
});

aborterController.abort(); // Canceled.
```

## Timeout

-   Package: [@fatcherjs/middleware-aborter](https://github.com/fatcherjs/fatcher/tree/master/packages/aborter)

The middleware provides a timeout function.

When a request has gone unanswered for some time, we can choose to cancel it and report back to the user.

So, when the timeout is configured, it is easy to accomplish the required functionality for this scenario by coordinating with the 'onAbort' event in the middleware.

## JSON Transform

-   Package: [@fatcherjs/middleware-json](https://github.com/fatcherjs/fatcher/tree/master/packages/json)

Fetch returns a `Response` object when responding.

But fatcher returns a `ResponseResult` after filtering.

This object returns a `ReadableStream` response body by default.

Most of the time, we want to return a response body in JSON format.

This middleware will try to transform `ReadableStream` to `JSON`.

If it transform error, will pass this `ReadableStream` to other middleware or user.

## FormData Payload

-   Package: [@fatcherjs/middleware-form-data](https://github.com/fatcherjs/fatcher/tree/master/packages/form-data)

When we use XMLHttpRequest to upload files, we usually use `FormData` for file transfer.

Fetch is also using `FormData` to upload files. But XMLHttpRequest should set `Content-Type` to `multipart/form-data` which is in request headers.

We should remove `Content-Type` in request headers when we using `FormData`.Let the browser split `FormData` by itself.

```diff
import { fatcher } from 'fatcher';
import { formData } from '@fatcherjs/middleware-form-data';

fatcher({
    url: '/upload',
    middlewares: [formData()],
+   headers: {
+        'Content-Type': 'multipart/form-data',
+    },
    payload: {
        // payload
    },
});
```

## Download Progress

-   Package: [@fatcherjs/middleware-progress](https://github.com/fatcherjs/fatcher/tree/master/packages/progress)

In the download scenario, we will most likely need to show the user the current download progress. However, FETCH does not provide such an API for us to fetch.

This middleware provides a function to get the current download progress.

The core of this functionality is to return a `Content-Length` field in the response header. The current download progress can be simulated by the total size and the size of the acquired quantity.

## Response Cache

-   Package [@fatcherjs/middleware-cache](https://github.com/fatcherjs/fatcher/tree/master/packages/cache)

For some data that is not frequently changed, we can cache the results on the client. Within the validity period, each request that hits the cache key will cache the response data, and the next request will preferentially return the data.

This improves response efficiency and is especially useful in some scenarios.
