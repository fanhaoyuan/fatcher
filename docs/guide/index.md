---
toc: menu
nav:
    title: Guide
    order: 1
---

# Getting started

## Install

### Package Manager

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

## The first request

Using `fatcher` from package or cdn, and using the module which export from `fatcher` in your project.

### From package

```ts
import { fatcher } from 'fatcher';

fatcher('/my-app/login', { username: 'root', password: '123456' }).then(res => {
    console.log(res);
});
```

### From CDN

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
<script>
    const { fatcher } = window.Fatcher;

    fatcher('/my-app/login', { username: 'root', password: '123456' }).then(res => {
        console.log(res);
    });
</script>
```

Now, you sent the first `fatcher` request.
