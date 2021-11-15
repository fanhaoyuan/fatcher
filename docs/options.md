---
toc: menu
nav:
    title: Options
---

# Options

## autoTransformPayload

-   Type `boolean`
-   Default `true`

Whether to use automatic transformation to request data.

Rules:

-   If [method](#method) is `get`, `payload` will be converted to the 'URL' query parameter.
-   If [method](#method) is not `get` and `Content-Type` is `'application/json'`, `payload` will `JSON.stringify`
-   If [method](#method) is not `get` and `Content-Type` is `'application/x-www-form-urlencoded', `payload` will be converted to the 'URL' query parameter.
-   If [method](#method) is not `get` and `Content-Type` is `'multipart/form-data'`, `payload` will be converted to `FormData`

If you want to transform payload by yourself. You should provide a middleware and set this option to `false`.

## baseURL

-   Type `string`
-   Default `'/'`

The underlying path of the request, which is concatenated to the preceding path before sending the request (the absolute request path will **ignore** this option)

## headers

-   Type `Record<string, string | null>`
-   Default

    ```json
    {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    ```

If headers with same key, new value will cover old value.

When value is `null`, it will be filtered before send request.

## method

-   Type `string`
-   Default `'get'`
-   Optional `'get' | 'post' | 'delete' | 'put' | 'head' | 'options' | 'patch'`

`HTTP` request method.

## middlewares

-   Type `(Middleware ｜ (() => Middleware))[]`
-   Default `[]`

The gather of custom middlewares, middlewares will execute by order in array.

## onAbort

-   Type `(() => void) | null`
-   Default `null`

The callback function with aborting request.

## onDownloadProgress

-   Type `((current: number, total: number) => void) | null`
-   Default `null`

The callback function with download progress, the function has params of current size and total size.This function will call when read a chunk of stream.

## payload

-   Type `Record<string, any>`
-   Default `{}`

Request payload, will auto converts when [autoTransformPayload](#autotransformpayload) is `true`.

## responseType

-   Type `string`
-   Default `'json'`
-   Optional `'json' | 'blob' | 'arrayBuffer' | 'text'`

The type of response data.

## timeout

-   Type `number`
-   Default `0`
-   Unit `ms`

Request timeout. If you do not want to set timeout, you should set this option to `0`.

## url

-   Type `string`
-   Default `''`

Target url of request, will create final url with [baseURL](#baseurl).

## withCredentials

-   Type `'auto' | boolean`
-   Default `'auto'`

Whether bring `cookies` in request.

Rules:

-   `'auto'`, will bring `cookies` when same origin, otherwise will not.
-   `true` always bring `cookies`.
-   `false` never bring `cookies`.
