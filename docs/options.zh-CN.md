---
toc: menu
nav:
    title: 配置项
---

# 配置项

## autoTransformPayload

-   类型 `boolean`
-   默认值 `true`

是否使用自动转换请求数据。

转换规则：

-   [method](#method)为`get`时，会转换为`url`查询参数
-   [method](#method)不为`get`时且[headers](#headers)中的`Content-Type`为`'application/json'`时，`payload`会进行`JSON.stringify`序列化
-   [method](#method)不为`get`时且[headers](#headers)中的`Content-Type`为`'application/x-www-form-urlencoded'`时，`payload`会转换为`url`查询参数
-   [method](#method)不为`get`时且[headers](#headers)中的`Content-Type`为`'multipart/form-data'`时，`payload`会转换为`FormData`

如果需要手动转换类型，应该提供一个自定义中间件进行转换并且把`autoTransformPayload`设置为`false`。

## baseURL

-   类型 `string`
-   默认值 `'/'`

请求的基础路径，会在发送请求前拼接到路径前（绝对请求路径会**忽略**该配置项）

## headers

-   类型 `Record<string, string | null>`
-   默认值

    ```json
    {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    ```

自定义请求头，**相同名称**的键值对会被**覆盖**，**不同名称**的键值对会**合并**成一个对象。

当值为`null`时，在发送请求时会被过滤。

## method

-   类型 `string`
-   默认值 `'get'`
-   可选值 `'get' | 'post' | 'delete' | 'put' | 'head' | 'options' | 'patch'`

`HTTP` 请求方法

## middlewares

-   类型 `(Middleware ｜ (() => Middleware))[]`
-   默认值 `[]`

自定义中间件集合，会按数组中的顺序执行中间件。

## onAbort

-   类型 `(() => void) | null`
-   默认值 `null`

取消请求回调函数。当请求被取消时触发。

## onDownloadProgress

-   类型 `((current: number, total: number) => void) | null`
-   默认值 `null`

请求进度回调函数，会返回当前**已获取**大小和总大小。每读取一段流会触发一次。

## payload

-   类型 `Record<string, any>`
-   默认值 `{}`

请求携带的数据，如果[autoTransformPayload](#autotransformpayload)设置为`true`时会进行自动转换。

## responseType

-   类型 `string`
-   默认值 `'json'`
-   可选值 `'json' | 'blob' | 'arrayBuffer' | 'text'`

响应数据转换类型。

## timeout

-   类型 `number`
-   默认值 `0`
-   单位 `毫秒`

请求超时时间，如果为`0`时 c，则为不设置超时时间。

## url

-   类型 `string`
-   默认值 `''`

请求的目标路径，会根据[baseURL](#baseurl)生成最终的请求路径

## withCredentials

-   类型 `'auto' | boolean`
-   默认值 `'auto'`

请求是否携带`cookies`.

规则：

-   `'auto'`为**同源**时携带`cookies`，**跨域**时不携带`cookies`
-   `true`为始终**携带**`cookies`
-   `false`为始终**不携带**`cookies`
