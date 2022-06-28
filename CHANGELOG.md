## Coming Soon

### @fatcherjs/middleware-progress

-   🚀 Add `lengthName` for setting custom headers name

### @fatcherjs/middleware-form-data

-   🐛 No longer transform `payload` when it is `FormData`

## v1.3.0

### fatcher

-   🚀 `Middleware` add `presets` options, can set preset middlewares before using this middleware. ([#152](https://github.com/fatcherjs/fatcher/pull/152))

## v1.2.0

### fatcher

-   🚀 Use `Headers` class for sending http headers. ([#129](https://github.com/fatcherjs/fatcher/pull/129))
-   🚀 Add `params` into request options ([#128](https://github.com/fatcherjs/fatcher/pull/128))
-   🚀 Change context in `middleware.use` to readonly ([#127](https://github.com/fatcherjs/fatcher/pull/127))

-   🐛 When using `createScopedRequest`, headers will cover another request headers ([#140](https://github.com/fatcherjs/fatcher/pull/140))
-   🐛 Should not return request headers but response headers ([#137](https://github.com/fatcherjs/fatcher/pull/137))

-   🔧 Using `requestHeaders` instead of `headers` in context ([#142](https://github.com/fatcherjs/fatcher/pull/142))

### @fatcherjs/middleware-form-data

-   🔧 Using `requestHeaders` instead of `headers` in context ([#142](https://github.com/fatcherjs/fatcher/pull/142))

## v1.1.3

### fatcher

-   🐛 `ResponseResult` headers should be response headers ([#126](https://github.com/fatcherjs/fatcher/pull/126))
-   🧪 Upgrade node version to `18` and setup units tests ([#124](https://github.com/fatcherjs/fatcher/pull/124))

## v1.1.2

### fatcher

-   🐛 It is not exported `isAbortError` and `readStreamByChunk` ([#120](https://github.com/fatcherjs/fatcher/pull/120))
-   🔧 Rename `chunkStreamReader` to `readStreamByChunk` ([#119](https://github.com/fatcherjs/fatcher/pull/119))
-   🐛 The global options `overriding` headers rather than `merging` headers ([#118](https://github.com/fatcherjs/fatcher/pull/118))

## v1.1.1

### fatcher

-   🐛 Using body instead of inline url params with `application/x-www-form-urlencoded` ([#113](https://github.com/fatcherjs/fatcher/pull/113))
-   ⚡️ Headers using `Record<string, string>` to send request ([#109](https://github.com/fatcherjs/fatcher/pull/109))

## v1.1.0

### fatcher

-   🔧 Move `@fatcherjs/utils-shared` to `utils`
-   🚀 Add default request init for same behavior during fetch in different browsers

## v1.0.1

### @fatcherjs/middleware-progress

-   🐛 fix: get total form headers content-length error ([#11](https://github.com/fatcherjs/middlewares/pull/11))

### @fatcherjs/middleware-form-data

-   🐛 Should not return request headers but response headers.

## v1.0.0

### fatcher

-   🚀 Add `payload-consumer`

### @fatcherjs/middleware-progress

-   🚀 Supports download progress when getting streams.

### @fatcherjs/middleware-form-data

-   🚀 Supports `FormData` body.

## v1.0.0-beta.1

### fatcher

-   🚀 Add `createScopedRequest`
-   ❌ Deprecate `clone` helper function
-   ❌ Deprecate Auto Transform Response Data
-   ❌ Deprecate Middleware Apply.
-   🔧 Refactor Typings
-   🔧 Refactor Immutable Context
-   🔧 Move Download Progress Middleware to [@fatcherjs/middleware-download-progress](https://github.com/fatcherjs/middlewares/tree/master/packages/download-progress)
-   🔧 Move Cancelable Middlewares to [@fatcherjs/middleware-aborter](https://github.com/fatcherjs/middlewares/tree/master/packages/aborter)

## v0.3.2

### fatcher

-   🐛 fix normalize error when baseURL is not '/' [#62](https://github.com/fatcherjs/fatcher/pull/62)

## v0.3.1

### fatcher

-   🐛 fix normalize url error
-   🐛 fix merge options error

## v0.3.0

### fatcher

-   🚀 add `FatcherError`
-   🚀 add `isFatcherError` for custom middleware
-   📦 export `clone` helper function

## v0.2.0

### fatcher

-   🚀 Add Timeout aborter.
-   🚀 Throw AbortError during aborting fetch.

-   🔧 Add compatibility with esModule

## v0.1.1

### fatcher

-   🐞 Fix can not abort fetch when request pending.

## v0.1.0

### fatcher

-   🚀 Basic Fetch.
-   🚀 Cancelable.
-   🚀 Add custom middlewares.
-   🚀 Auto Transform Request Payload.
-   🚀 Auto Transform Response data
-   🚀 Immutable Context
-   🚀 Download Progress
