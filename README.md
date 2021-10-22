# Fatch

A out-of-box http request library with fetch and stream.

## Features

-   ✨ Custom Middlewares
-   ✨ Promisify
-   ✨ Fetch
-   ✨ TypeScript
-   ✨ Stream API

## Upcoming Features

-   ⏳ Timeout
-   ⏳ Download Progress
-   ⏳ Auto Transform Request Payload
-   ⏳ Cancelable
-   ⏳ Progressive response
-   ⏳ Reconnect limits
-   ⏳ Resumable

## Install

### NPM

```bash
>$ npm install fatch
```

### CDN

```html
<script src="https://unpkg.com/fatch/dist/fatch.min.js"></script>
```

## Middlewares

### Order

`Fatch` will use the following order to use middlewares.

-   fatch-middleware-transformer
-   Custom Middlewares
-   fatch-middleware-fetcher
