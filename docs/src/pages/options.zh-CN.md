---
title: 配置
order: 4
---

# 配置

[完整配置签名](#完整配置签名)

> 配置优先级 行内配置 > 局部配置 > 全局配置

## 合并规则

除了`headers`会深度合并，其余配置项均会按照优先级合并。

## fatcher 配置

fatcher 特有的配置项，会在请求前进行转换。

### baseUrl

请求的前缀地址，会与[url](#url)组合

-   类型: `string`
-   默认值: `'/'`

### url

请求路径，会与[baseUrl](#baseurl)组合

-   类型: `string`

> 请求路径不能为空，否则会抛出错误

### method

请求方式

-   类型: `'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH'`
-   默认值: `'GET'`

### middlewares

中间件可以是一个 Middleware 对象，也可以是一个函数返回 Middleware 对象

-   类型: `((() => Middleware) | Middleware | ((() => Middleware) | Middleware)[])[]`
-   默认值 `[]`

#### 完整类型签名

```ts
type MiddlewareNext = (patchContext?: PatchContext) => Promise<MiddlewareResult> | MiddlewareResult;

interface Middleware {
    name: `fatcher-middleware-${string}`;
    use(context: Readonly<Context>, next: MiddlewareNext): Promise<MiddlewareResult> | MiddlewareResult;
}
```

### headers

请求时携带的请求头. null 值会被忽略，发送时不会携带。

-   类型: `Record<string, string | null>`
-   默认值 `{ 'Content-Type': 'application/x-www-form-urlencoded' }`

> HTTP Headers 对大小写不敏感。
>
> 例如`content-type` 与 `Content-Type` 会相互覆盖。

### params

查询参数

-   类型: `Record<string, string>`
-   默认值: `{}`

> 如果 url 上原本就有查询参数，则会先转为 params， 在发送请求前再次转为查询参数

### payload

携带的请求体，会在发送前进行消费，根据[method](#method)转换为不同的形式。

-   类型: `Record<string, any> | null`
-   默认值: `null`

> `GET` | `HEAD` 请求会把 payload 转为 params
> 其余请求会转为 body

> 自定义中间件可以自定义 payload 类型

### validateCode

自定义状态码，如果指定范围内，则抛出一个`FatcherError`

-   版本: `>= 1.6.0`
-   类型: `(statusCode: number) => boolean`
-   默认值: `(statusCode: number) => 200 <= statusCode < 300`

## fetch 配置

与原生的 fetch 配置项一致。

> 因为浏览器默认值中可能会有差异，所以指定默认值，在不同环境中会有相同的行为。

### credentials

请求时是否携带 `cookies`

-   类型: `'omit' | 'same-origin' | 'include'`
-   默认值: `'same-origin'`

> 详情请看 [Request.credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials)

### cache

控制请求以何种方式与浏览器的 HTTP 缓存进行交互

-   类型: `'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'`
-   默认值: `'default'`

> 详情请看 [Request.cache](https://developer.mozilla.org/en-US/docs/Web/API/Request/cache)

### redirect

如何处理重定向

-   类型: `'follow' | 'error' | 'manual'`
-   默认值: `'follow'`

> 详情请看 [Request.redirect](https://developer.mozilla.org/en-US/docs/Web/API/Request/redirect)

### referrerPolicy

引用策略

-   类型: `'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'`
-   默认值: `'no-referrer-when-downgrade'`

> 详情请看 [Request.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy)

### mode

请求模式

-   类型: `'same-origin' | 'no-cors' | 'cors' | 'navigate'`
-   默认值: `'cors'`

> 详情请看 [Request.mode](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode)

## 完整配置签名

```ts
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';

type RequestHeaders = Record<string, string | null>;

type UnregisteredMiddlewares = ((() => Middleware) | Middleware | ((() => Middleware) | Middleware)[])[];

interface RequestOptions extends Omit<RequestInit, 'body' | 'headers'> {
    baseUrl?: string;
    url?: string;
    method?: RequestMethod;
    params?: Record<string, string>;
    middlewares?: UnregisteredMiddlewares;
    payload?: Record<string, any> | null;
    headers?: RequestHeaders;
}
```
