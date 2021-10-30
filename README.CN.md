# Fatch

一个开箱即用的现代浏览器 `http` 请求库。

## 语言

[English](./README.md) | 中文

## 特性

-   ✨ 自定义中间件
-   ✨ 流 API
-   ✨ 可以取消的请求
-   ✨ 自动转换请求数据
-   ✨ 自动转换响应数据
-   ✨ 下载进度
-   ✨ 不可变的上下文

## 即将到来的特性

-   🌱 超时时间
-   🌱 重新连接次数限制
-   🌱 断点续存
-   🌱 数据模拟

## 安装

### NPM

```bash
>$ npm install fatch
```

### CDN

#### jsdelivr

```html
<script src="https://cdn.jsdelivr.net/npm/fatch/dist/fatch.min.js"></script>
```

#### unpkg

```html
<script src="https://unpkg.com/fatch/dist/fatch.min.js"></script>
```

## 用法

```ts
import { fatch } from 'fatch';

fatch(
    '/api/my/request/url', //请求路径
    {
        //配置项
        method: 'get',
        payload: {
            a: 1,
            b: 2,
            c: 3,
        },
    }
)
    .then(res => {
        // 响应回调
    })
    .catch(err => {
        // 错误回调
    });
```

## 中间件

中间件是用于更改请求上下文或响应上下文的函数。

```ts
export interface Middleware {
    name: string; //中间件名称
    apply?: ((context: Immutable<RequestContext>) => boolean) | boolean; //判断中间件是否应该执行
    use(context: Immutable<RequestContext>, next: MiddlewareNext): Promise<Response> | Response; //中间件执行方法
}
```

可以在固定的中间件之间设置自定义中间件。需要在`options.middlewares`中注册。

### 改变上下文

#### 请求

如果您想更改请求上下文

只需把想更改的配置项传入到`next()`方法中

```ts
next({
    options: {
        url: 'my-other-url',
    },
});
```

会自动合并到下一个中间件的`context`中

#### 响应

### 顺序

会以下列顺序执行中间件:

-   fatch-middleware-response-formatter
-   Custom Middlewares
-   fatch-middleware-payload-transformer
-   fatch-middleware-url-transformer
-   fatch-middleware-fetcher

## Typescript

完全支持。

## Promise

完全支持。

## License

[MIT](./LICENSE)
