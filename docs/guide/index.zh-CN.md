---
toc: menu
nav:
    title: 指南
    order: 1
---

# 开始

## 安装

### npm 包管理工具

-   `NPM`

```bash
>$ npm install fatcher
```

-   `Yarn`

```bash
>$ yarn add fatcher
```

-   `PNPM`

```bash
>$ pnpm install fatcher
```

### CDN

-   `jsdelivr`

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
```

-   `unpkg`

```html
<script src="https://unpkg.com/fatcher/dist/fatcher.min.js"></script>
```

## 发起第一个请求

首先从上述的方式引入`fatcher`，然后在项目中引入导出的模块`fatcher`。

### 从包中引入

```ts
import { fatcher } from 'fatcher';

fatcher('/my-app/login', { username: 'root', password: '123456' }).then(res => {
    console.log(res);
});
```

### 从 CDN 引入

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
<script>
    const { fatcher } = window.Fatcher;

    fatcher('/my-app/login', { username: 'root', password: '123456' }).then(res => {
        console.log(res);
    });
</script>
```

通过上面的代码示例，即可发送出第一个 `fatcher` 请求。
