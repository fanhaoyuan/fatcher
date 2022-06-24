---
title: 使用中间件
order: 3
---

# 中间件

中间件是 fatcher 的核心功能。中间件可以理解为一个调用链，每个中间件这是这个调用链的每一个环节。

通过组合中间件，我们可以实现很多的功能。我们可以把一些逻辑抽离出来，封装成为一个中间件，这个中间件就可以在多处使用。

## 规则

一个中间件是一个对象，由`name`和`use`组成

### name

### use

use 方法是一个函数，这个函数是中间件的方法实现，它会被上层的中间件调用，它也可以接受下一个中间件的返回值。

#### 参数

在实现中间件方法时，里面有两个参数：

-   第一个参数为当前请求的上下文，这个上下文是不可变的，所以**不要**对上下文进行重新赋值。
-   第二个参数为 next 方法，调用它则是调用下个中间件。

### presets

> 添加于 `v1.3.0`

presets 是这个中间件需要前置的中间件

#### 合并规则

声明在这里的中间件会在注册时被扁平化，声明于当前中间件的前方

```ts
const a = {
    presets: [b, c],
};

register([a]); // => [b, c, a]
```

## 约定

我们约定 fatcher 中间件的名称是以 `fatcher-middleware-` 开头，这样我们就很容易知道这是 fatcher 的一个中间件。

## 类型签名

```ts
interface MiddlewareResult extends Omit<ResponseResult, 'options' | 'data'> {
    data?: any;
}

type UnregisteredMiddlewares = ((() => Middleware) | Middleware | ((() => Middleware) | Middleware)[])[];

type PatchContext = Partial<Context>;

type MiddlewareNext = (patchContext?: PatchContext) => Promise<MiddlewareResult> | MiddlewareResult;

interface Middleware {
    name: `fatcher-middleware-${string}`;
    use(context: Readonly<Context>, next: MiddlewareNext): Promise<MiddlewareResult> | MiddlewareResult;
    presets?: UnregisteredMiddlewares;
}
```
