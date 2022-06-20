---
title: 快速开始
order: 1
---

# 快速开始

## 安装

使用 NPM:

```bash
>$ npm install fatcher
```

使用 Yarn:

```bash
>$ yarn add fatcher
```

使用 Pnpm:

```bash
>$ pnpm add fatcher
```

### 从 CDN 中引入

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
```

> 使用 CDN 引入，fatcher 将会挂载到 `window.Fatcher` 中

安装完成之后，我们可以就创建一个 fatcher 请求了。

## 使用

### 发送请求

在一个 fatcher 请求中，必须指定`url`地址。在指定了`url`之后，默认会对这个`url`发送一个`GET`请求。

```ts
import { fatcher } from 'fatcher';

fatcher({
    url: '/',
}).then(result => {
    // 响应结果
    const { data, status } = result;
});
```

fatcher 会返回一个 Promise，所以我们可以对 fatcher 使用 Async/Await 来简化我们的代码。

```ts
import { fatcher } from 'fatcher';

(async function request() {
    const { data, status } = await fatcher({ url: '/' });
})();
```

### 捕捉错误

我们都知道，在 fetch 中，无论 status 返回的值是 404、500 或者是其他值，在响应时都会认为是成功的请求。

所以，我们要对这些"出错的代码"进行过滤。

在 fatcher 中， 只有`2xx`的 status 才会认为是成功的请求，至于其他请求，一律会抛出一个`FatcherError`对象。

```ts
import { fatcher, isFatcherError } from 'fatcher';

fatcher({
    url: '/',
})
    .then(result => {
        // 响应结果
        const { data, status } = result;
    })
    .catch(err => {
        // 捕捉错误
        if (isFatcherError(err)) {
            // 这里是发送请求成功，但是 status 值不是2xx的错误
            console.error(err.toJSON());
            return;
        }

        // 这里是其他错误
    });
```

通过`isFatcherError`来进行对抛出的错误进行判断，我们就可以判断出哪些请求是因为 fatcher 过滤而抛出的错误。

---

到这里，我们就已经发送出一个简单的 fatcher 请求。在下一节中，我们会了解到 fatcher 提供了哪些功能。
