---
title: 功能
order: 2
---

# 功能

在基础的功能中，使用 fatcher 与使用原生的 fetch 没有什么区别。但是，fatcher 会通过组合不同功能来增强 fetch，从而适应不同的使用场景。

## 中间件

-   所属模块：[核心库](https://github.com/fatcherjs/fatcher/tree/master/packages/fatcher)

fatcher 的核心功能是中间件组合，这个中间件则是类似于 koa 的中间件，实现方式也是参考了 koa。

通过组合中间件，我们可以在一个中间件中实现请求参数拦截，响应拦截，模拟返回等操作。

> 详情可以查看下一节[中间件](/zh-CN/middlewares)

## 取消请求

-   所属模块：[@fatcherjs/middleware-aborter](https://github.com/fatcherjs/fatcher/tjsree/master/packages/aborter)

在很多场景中，我们需要对请求进行取消，例如下载或者上传操作。

fetch 会并没有提供一个取消请求的 api， 但是我们可以通过绑定 AbortController 来取消 fetch 请求。

### 手动绑定

如果你想手动去绑定一个 AbortController 来取消请求，可以通过 fetch 配置项 signal 来进行绑定。

```ts
import { fatcher } from 'fatcher';

const aborterController = new AbortController();

fatcher({
    url: '/get',
    signal: aborterController.signal,
});

aborterController.abort(); // 取消请求
```

## 超时时间

-   所属模块：[@fatcherjs/middleware-aborter](https://github.com/fatcherjs/fatcher/tree/master/packages/aborter)

该中间件提供了一个超时时间的功能。

当一个请求已经过了一段时间仍然没有响应，我们可以选择对它进行取消，并反馈给用户。

所以，当配置了超时时间后，通过配合中间件中的`onAbort`事件，可以简单地完成这个场景所需的功能。

## 响应 JSON 转换

-   所属模块：[@fatcherjs/middleware-json](https://github.com/fatcherjs/fatcher/tree/master/packages/json)

fetch 在响应的时候会返回一个 response 对象，但是 fatcher 在过滤之后会返回一个`ResponseResult`对象，在这个对象中默认返回的是一个`ReadableStream`响应体，但大多数时候，我们需要的是返回一个 JSON 格式的响应体。

这时候这个中间件会尝试把响应结果进行转换，如果转换**失败**，则返回默认的`ReadableStream`，让后续的中间件进行操作或者用户自行转换。

## FormData 请求体

-   所属模块：[@fatcherjs/middleware-form-data](https://github.com/fatcherjs/fatcher/tree/master/packages/form-data)

我们在使用 xhr 上传文件的时候，通常会使用 FormData 来进行文件传输。

fetch 也不例外，在上传文件中也需要用到 `FormData`这个格式，但是与 xhr 不同的是，xhr 需要指定请求头上的 `Content-Type` 为 `multipart/form-data`。

但是在 fetch 中，我们指定了 `Content-Type: multipart/form-data` 之后，反而不能顺利地上传文件。这是因为 fetch 在指定了 `Content-Type`之后，不会对 FormData 进行分割。

为了让行为统一，使用这个中间件后，`Content-Type`仍然需要指定为`multipart/form-data`，在内部会处理这个请求头，让浏览器自行的对`FormData`进行分割，从而顺利的完成`FormData`的传输。

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
        // 请求体
    },
});
```

## 下载进度

-   所属模块：[@fatcherjs/middleware-progress](https://github.com/fatcherjs/fatcher/tree/master/packages/progress)

在下载的场景中，我们很可能需要展示给用户知道当前的下载进度。但是 fetch 没有提供这样的一个 api 给我们进行获取。

这个中间件提供了一个获取当前下载进度的功能。

这个功能的核心为在响应头中返回一个`Content-Length`字段。通过总大小与已获取量的大小则可以模拟出当前的下载进度。

## 响应缓存

-   所属模块：[@fatcherjs/middleware-cache](https://github.com/fatcherjs/fatcher/tree/master/packages/cache)

在一些不高频改动的数据中，我们可以在客户端进行对结果的缓存，在有效时间内，每次命中缓存 key 的请求会把响应数据缓存起来，下一次请求的时候，优先返回该数据。

会有效的提高响应效率，在一些场景下特别有用。
