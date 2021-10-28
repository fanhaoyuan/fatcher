# Fatch

A out-of-box http request library with fetch and stream.

## Features

-   ✨ Custom Middlewares
-   ✨ Promisify
-   ✨ Fetch
-   ✨ TypeScript
-   ✨ Stream API
-   ✨ Cancelable
-   ✨ Auto Transform Request Payload
-   ✨ Auto Transform Response data

## Upcoming Features

-   🌱 Timeout
-   🌱 Download Progress
-   🌱 Progressive response
-   🌱 Reconnect limits
-   🌱 Resumable

## Install

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

## Middlewares

### Order

`Fatch` will use the following order to use middlewares.

-   fatch-middleware-transformer
-   Custom Middlewares
-   fatch-middleware-fetcher
