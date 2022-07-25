---
title: 自定义拦截器
order: 5
---

# 自定义拦截器

实际上，拦截器也就是一个自定义中间件。

在同一个中间件中，可以同时进行请求拦截和响应拦截。但是不建议这样做，因为这样做会让逻辑变得太混乱。建议是一个中间件只做一件事。

> 假设你已经了解如何使用一个[中间件](/zh-CN/using-middlewares)

## 请求拦截器

请求拦截器是通过请求上下文来判断这个请求是否能够发起

### 例子

假设我们现在要实现一个对请求参数校验的拦截器

我们给他取一个名字叫 `fatcher-middleware-validator`

#### 定义中间件

```ts
// validator.ts
import { Middleware } from 'fatcher';

function validator() {
    return {
        name: 'fatcher-middleware-validator',
        use(context, next) {
            return next();
        },
    };
}
```

我们已经定义了一个最简单的中间件，在这个中间件里面暂时没有进行任何操作。

#### 读取上下文

因为我们这个中间件时要对请求参数进行校验，所以我们要读取请求上下文,在上下文中进行拦截。

```ts
// validator.ts
import { Middleware } from 'fatcher';

function validator() {
    return {
        name: 'fatcher-middleware-validator',
        use(context, next) {
            const { method } = context;

            // 对 method 进行拦截
            if (method !== 'POST') {
                // 拦截后处理
                return Promise.reject(new Error('这个请求只能是POST'));
            }

            // ...

            return next();
        },
    };
}
```

在拦截后需要抛出一个错误，中断这个 Promise 调用链。

#### 使用

```ts
fatcher({
    url: '/get',
    method: 'GET',
    middlewares: [validator()],
})
    .then(res => {
        // 响应成功
    })
    .catch(error => {
        console.log(error.message); // 这个请求只能是POST
    });
```

以上就是一个请求参数校验的一个请求拦截器的例子。

## 响应拦截器

响应拦截器是通过判断响应的结果判断请求是否能成功返回

### 例子

假设我们现在做一个自定义响应错误拦截器。

我们给他取一个名字叫 `fatcher-middleware-error-handler`

#### 定义中间件

```ts
// error-handler.ts
import { Middleware } from 'fatcher';

function errorHandler() {
    return {
        name: 'fatcher-middleware-error-handler',
        use(context, next) {
            return next();
        },
    };
}
```

我们已经定义了一个最简单的中间件，在这个中间件里面暂时没有进行任何操作。

#### 读取响应结果

```ts
// error-handler.ts
import { Middleware, canActivate } from 'fatcher';

function errorHandler() {
    return {
        name: 'fatcher-middleware-error-handler',
        async use(context, next) {
            const result = await next();

            // http 响应状态为 200
            // 但是 body 内容为 status: 500

            const { status, data } = result;

            console.log(status); // 200

            const body = await data.json();

            console.log(body.status); // 500

            if (body.status === 500) {
                return Promise.reject(new Error('这个请求出错了'));
            }

            // 通过拦截，响应结果
            return result;
        },
    };
}
```

在拦截后需要抛出一个错误，中断这个 Promise 调用链。

#### 使用

```ts
fatcher({
    url: '/get',
    method: 'GET',
    middlewares: [errorHandler()],
})
    .then(res => {
        // 响应成功
    })
    .catch(error => {
        console.log(error.message); // 这个请求出错了
    });
```

以上就是一个自定义状态码的一个响应拦截器的例子。

---

以上就是两种拦截器的使用，通过组合不同的拦截器，可以拦截不同的情况。
