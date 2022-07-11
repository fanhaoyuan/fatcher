---
title: Quick Start
order: 1
---

# Quick Start

## Install

Using NPM:

```bash
>$ npm install fatcher
```

Using Yarn:

```bash
>$ yarn add fatcher
```

Using Pnpm:

```bash
>$ pnpm add fatcher
```

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
```

After install, we can send fatcher request now.

## Using

### Send Request

We must set `url` in a fatcher request.

We will send a `GET` request by default.

```ts
import { fatcher } from 'fatcher';

fatcher({
    url: '/',
}).then(result => {
    // Response
    const { data, status } = result;
});
```

Fatcher will return a promise after send request. So we can using `Async/Await` for simplify our code.

```ts
import { fatcher } from 'fatcher';

(async function request() {
    const { data, status } = await fatcher({ url: '/' });
})();
```

### Catch Errors

It's a successfully response status which is 404 or 500 with fetch.

So we should filter this `errors code`.

Fatcher will filter `2xx` response status code. If response code is not `2xx`, will throw a `FatcherError`.

```ts
import { fatcher, isFatcherError } from 'fatcher';

fatcher({
    url: '/',
})
    .then(result => {
        // Response
        const { data, status } = result;
    })
    .catch(err => {
        // Catch Fatcher Error
        if (isFatcherError(err)) {
            // Request successfully. But response status code is not 2xx.
            console.error(err.toJSON());
            return;
        }

        // This is other errors.
    });
```

We can know errors in request which is filtered by fatcher with `isFatcherError`.

---

We have sent a simple Fatcher request. In the next section, we'll learn what Fatcher provides.
