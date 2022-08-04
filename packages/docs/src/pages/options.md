---
title: Options
order: 4
---

# Options

[Type Declaration](#Declaration)

> Merge policy: Inline Options > Scoped Options > Globals Options

## Merge Rules

`Headers` will deep merge, other configurations are merged by policy.

## Fatcher Options

fatcher specific configurations

### baseUrl

Prefix url, it will combine with [url](#url).

-   Type: `string`
-   DefaultValue: `'/'`

### url

Request Url, will combine with [baseUrl](#baseurl).

-   Type: `string`
-   Required: `true`

### method

Request Method.

-   Type: `'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH'`
-   DefaultValue: `'GET'`

### middlewares

Middleware can be a `Middleware` object or a function that returns the Middleware object.

-   Type: `((() => Middleware) | Middleware | ((() => Middleware) | Middleware)[])[]`
-   DefaultValue `[]`

#### Middleware Type Declaration

```ts
type MiddlewareNext = (patchContext?: PatchContext) => MaybePromise<MiddlewareResult>;

interface Middleware {
    name: `fatcher-middleware-${string}`;
    use(context: Readonly<Context>, next: MiddlewareNext): MaybePromise<MiddlewareResult>;
}
```

### headers

Request Headers. Will ignore `null` in headers.

-   Type: `Record<string, string | null>`
-   DefaultValue: `{ 'Content-Type': 'application/x-www-form-urlencoded' }`

> HTTP Headers is case insensitive.
>
> For example, 'content-type' and 'content-type' overwrite each other.

### params

Query String for search params.

-   Type: `Record<string, string>`
-   DefaultValue: `{}`

> If the URL already has query parameters, they are converted to Params and then to query parameters again before sending the request

### payload

Request Payload, will consume it before send request. Convert to different forms according to [method](#method).

-   Type: `Record<string, any> | null`
-   DefaultValue: `null`

> `GET` | `HEAD` request payload into params
> The rest of the requests are converted to body

> Custom middleware allows you to customize the payload type

### validateCode

Custom validate status code, If status code not in range, throw a `FatcherError`.

-   Version: `>= 1.6.0`
-   Type: `(statusCode: number) => boolean`
-   DefaultValue: `(statusCode: number) => 200 <= statusCode < 300`

## fetch Options

Consistent with the native fetch options.

> Because there may be differences in browser defaults, specifying defaults will have the same behavior in different environments.

### credentials

Whether to send 'cookies' with the request

-   Type: `'omit' | 'same-origin' | 'include'`
-   DefaultValue: `'same-origin'`

> Details please see [Request.credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials)

### cache

Controls how requests interact with the browser's HTTP cache

-   Type: `'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'`
-   DefaultValue: `'default'`

> Details please see [Request.cache](https://developer.mozilla.org/en-US/docs/Web/API/Request/cache)

### redirect

How to handle redirects

-   Type: `'follow' | 'error' | 'manual'`
-   DefaultValue: `'follow'`

> Details please see [Request.redirect](https://developer.mozilla.org/en-US/docs/Web/API/Request/redirect)

### referrerPolicy

Reference policy

-   Type: `'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'`
-   DefaultValue: `'no-referrer-when-downgrade'`

> Details please see [Request.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy)

### mode

Request mode

-   Type: `'same-origin' | 'no-cors' | 'cors' | 'navigate'`
-   DefaultValue: `'cors'`

> Details please see [Request.mode](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode)

## Declaration

```ts
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';

type RequestHeaders = Record<string, string | null>;

export type UnregisteredMiddlewares = (
    | (() => MaybePromise<Middleware>)
    | Middleware
    | ((() => MaybePromise<Middleware>) | Middleware)[]
)[];

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
