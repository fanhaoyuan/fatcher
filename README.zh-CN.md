# Fatcher

[![codecov](https://codecov.io/gh/fatcherjs/fatcher/branch/master/graph/badge.svg?token=9DRTR2GXH8)](https://codecov.io/gh/fatcherjs/fatcher)
[![](https://data.jsdelivr.com/v1/package/npm/fatcher/badge?style=rounded)](https://www.jsdelivr.com/package/npm/fatcher)
[![install size](https://packagephobia.com/badge?p=fatcher)](https://packagephobia.com/result?p=fatcher)
<a href="https://npmjs.com/package/fatcher"><img src="https://img.shields.io/npm/v/fatcher.svg" alt="npm package"></a>
<a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/fatcher.svg" alt="node compatibility"></a>
<a href="https://github.com/fatcherjs/fatcher/actions/workflows/ci.yml"><img src="https://github.com/fatcherjs/fatcher/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status"></a>

一个基于 Fetch API 且体积极小(**<= 2KB**)的组合式 HTTP 请求库

## 语言

[English](./README.md) | 中文

## 功能列表

| 名称                | 前置                                                                                                       | 浏览器                                                      |      Node      |
| ------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | :------------: |
| 基础请求            | 核心库                                                                                                     | ✅ ([Fetch API](https://caniuse.com/fetch))                 | ✅ (>= 18.0.0) |
| Promise 支持        | 核心库                                                                                                     | ✅                                                          |       ✅       |
| TypeScript 支持     | 核心库                                                                                                     | ✅                                                          |       ✅       |
| Streams API 支持    | 核心库                                                                                                     | ✅ ([Streams](https://caniuse.com/streams))                 | ✅ (>= 18.0.0) |
| 组合式中间件        | 核心库                                                                                                     | ✅                                                          |       ✅       |
| 自动转换 JSON 响应  | [@fatcherjs/middleware-json](https://github.com/fatcherjs/middlewares/tree/master/packages/json)           | ✅                                                          |       ⚠️       |
| 取消请求            | [@fatcherjs/middleware-aborter](https://github.com/fatcherjs/middlewares/tree/master/packages/aborter)     | ✅ ([AbortController](https://caniuse.com/abortcontroller)) |       ⚠️       |
| 超时时间            | [@fatcherjs/middleware-aborter](https://github.com/fatcherjs/middlewares/tree/master/packages/aborter)     | ✅ ([AbortController](https://caniuse.com/abortcontroller)) |       ⚠️       |
| FormData 请求体格式 | [@fatcherjs/middleware-form-data](https://github.com/fatcherjs/middlewares/tree/master/packages/form-data) | ✅                                                          |       ⚠️       |
| 下载进度            | [@fatcherjs/middleware-progress](https://github.com/fatcherjs/middlewares/tree/master/packages/progress)   | ✅                                                          |       ⚠️       |

## 安装

### NPM

```bash
>$ npm install fatcher

#或者 yarn
>$ yarn add fatcher

#或者 pnpm
>$ pnpm add fatcher
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
```

## 用法

### 基础使用

```ts
import { fatcher, isFatcherError } from 'fatcher';

fatcher({
    url: '/foo/bar',
    payload: {
        foo: 'bar',
    },
    method: 'GET',
})
    .then(response => {
        // 响应内容
        console.log(response);
    })
    .catch(error => {
        if (isFatcherError(error)) {
            // 处理请求失败的错误
            console.error(error.toJSON());
            return;
        }
        // 处理其他错误
        console.error(error);
    });
```

### 进阶用法

#### 作用域请求

```ts
import { createScopedRequest, fatcher, isFatcherError } from 'fatcher';
import { json } from '@fatcherjs/middleware-json';

// 自定义初始化配置项
const fatcher = createScopedRequest({
    baseUrl: 'https://fatcher.virtual',
    method: 'POST',
    middlewares: [json()],
});

fatcher({
    url: '/getUserList',
    payload: {
        foo: 'bar',
    },
})
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        if (isFatcherError(error)) {
            console.error(error.toJSON());
            return;
        }

        console.error(error);
    });
```

#### 全局配置

行内配置 `>` 作用域配置 `>` 全局配置

```ts
import { setDefaultOptions, fatcher, isFatcherError } from 'fatcher';
import { json } from '@fatcherjs/middleware-json';

setDefaultOptions({
    baseUrl: 'https://fatcher.virtual',
    method: 'POST',
    middlewares: [json()],
});

fatcher({
    url: '/getUserList',
    payload: {
        foo: 'bar',
    },
})
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        if (isFatcherError(error)) {
            console.error(error.toJSON());
            return;
        }
        console.error(error);
    });
```

### 拦截器

实际上是使用自定义中间件来拦截。

#### 请求拦截器

一个在发送前拦截请求的示例。

```ts
import { Middleware, fatcher, isFatcherError } from 'fatcher';

function requestInterceptor(): Middleware {
    return {
        name: 'fatcher-middleware-request-interceptor',
        use(context, next) {
            if (!context.payload) {
                return Promise.reject(new Error('Payload is required.'));
            }

            if (context.method !== 'POST') {
                return Promise.reject(new Error('Method is not allowed.'));
            }

            // 从 context 中检查内容

            return next();
        },
    };
}

fatcher({
    url: '/foo/bar',
    method: 'POST',
    middlewares: [requestInterceptor()],
})
    .then(response => {
        // 响应内容
        console.log(response);
    })
    .catch(error => {
        if (isFatcherError(error)) {
            // 处理请求失败的错误
            console.error(error.toJSON());
            return;
        }
        // 处理其他错误
        console.error(error);
    });
```

#### 响应拦截器

一个在解析前拦截响应的示例。

```ts
import { Middleware, fatcher, isFatcherError } from 'fatcher';

function responseInterceptor(): Middleware {
    return {
        name: 'fatcher-middleware-response-interceptor',
        async use(context, next) {
            const result = await next();

            // 从 result 中检查内容

            if (result.data.status === 50000) {
                return Promise.reject(result.data);
            }

            return result;
        },
    };
}

fatcher({
    url: '/foo/bar',
    method: 'POST',
    middlewares: [responseInterceptor()],
})
    .then(response => {
        // 响应内容
        console.log(response);
    })
    .catch(error => {
        if (isFatcherError(error)) {
            // 处理请求失败的错误
            console.error(error.toJSON());
            return;
        }
        // 处理其他错误
        console.error(error);
    });
```

## Polyfills

-   [Streams API](https://github.com/MattiasBuelens/web-streams-polyfill#readme)
-   [Fetch API](https://github.com/github/fetch#readme)

## 更多

更多信息在[文档](https://fatcherjs.github.io/docs/)

## 许可证

[MIT](./LICENSE)
