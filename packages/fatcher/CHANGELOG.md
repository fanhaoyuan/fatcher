## v1.5.0

-   🚀 `readStreamByChunk` supports async callback ([#167](https://github.com/fatcherjs/fatcher/pull/167))
-   🚀 request url supports relative path like `../` and `./` ([#170](https://github.com/fatcherjs/fatcher/pull/170))

## v1.4.1

-   🔧 Remove some overt options ([#161](https://github.com/fatcherjs/fatcher/pull/161))

## v1.4.0

-   ❌ Deprecate `isAbortError`, move it to `@fatcherjs/middleware-aborter`. ([#157](https://github.com/fatcherjs/fatcher/pull/157))

## v1.3.0

-   🚀 `Middleware` add `presets` options, can set preset middlewares before using this middleware. ([#152](https://github.com/fatcherjs/fatcher/pull/152))

## v1.2.0

-   🚀 Use `Headers` class for sending http headers. ([#129](https://github.com/fatcherjs/fatcher/pull/129))
-   🚀 Add `params` into request options ([#128](https://github.com/fatcherjs/fatcher/pull/128))
-   🚀 Change context in `middleware.use` to readonly ([#127](https://github.com/fatcherjs/fatcher/pull/127))
-   🐛 When using `createScopedRequest`, headers will cover another request headers ([#140](https://github.com/fatcherjs/fatcher/pull/140))
-   🐛 Should not return request headers but response headers ([#137](https://github.com/fatcherjs/fatcher/pull/137))
-   🔧 Using `requestHeaders` instead of `headers` in context ([#142](https://github.com/fatcherjs/fatcher/pull/142))

## v1.1.3

-   🐛 `ResponseResult` headers should be response headers ([#126](https://github.com/fatcherjs/fatcher/pull/126))
-   🧪 Upgrade node version to `18` and setup units tests ([#124](https://github.com/fatcherjs/fatcher/pull/124))

## v1.1.2

-   🐛 It is not exported `isAbortError` and `readStreamByChunk` ([#120](https://github.com/fatcherjs/fatcher/pull/120))
-   🔧 Rename `chunkStreamReader` to `readStreamByChunk` ([#119](https://github.com/fatcherjs/fatcher/pull/119))
-   🐛 The global options `overriding` headers rather than `merging` headers ([#118](https://github.com/fatcherjs/fatcher/pull/118))

## v1.1.1

-   🐛 Using body instead of inline url params with `application/x-www-form-urlencoded` ([#113](https://github.com/fatcherjs/fatcher/pull/113))
-   ⚡️ Headers using `Record<string, string>` to send request ([#109](https://github.com/fatcherjs/fatcher/pull/109))

## v1.1.0

-   🔧 Move `@fatcherjs/utils-shared` to `utils`
-   🚀 Add default request init for same behavior during fetch in different browsers

## v1.0.0

-   🚀 Add `payload-consumer`

## v1.0.0-beta.1

-   🚀 Add `createScopedRequest`
-   ❌ Deprecate `clone` helper function
-   ❌ Deprecate Auto Transform Response Data
-   ❌ Deprecate Middleware Apply.
-   🔧 Refactor Typings
-   🔧 Refactor Immutable Context
-   🔧 Move Download Progress Middleware to [@fatcherjs/middleware-download-progress](https://github.com/fatcherjs/middlewares/tree/master/packages/download-progress)
-   🔧 Move Cancelable Middlewares to [@fatcherjs/middleware-aborter](https://github.com/fatcherjs/middlewares/tree/master/packages/aborter)

## v0.3.2

-   🐛 fix normalize error when baseURL is not '/' [#62](https://github.com/fatcherjs/fatcher/pull/62)

## v0.3.1

-   🐛 fix normalize url error
-   🐛 fix merge options error

## v0.3.0

-   🚀 add `FatcherError`
-   🚀 add `isFatcherError` for custom middleware
-   📦 export `clone` helper function

## v0.2.0

-   🚀 Add Timeout aborter.
-   🚀 Throw AbortError during aborting fetch.
-   🔧 Add compatibility with esModule

## v0.1.1

-   🐞 Fix can not abort fetch when request pending.

## v0.1.0

-   🚀 Basic Fetch.
-   🚀 Cancelable.
-   🚀 Add custom middlewares.
-   🚀 Auto Transform Request Payload.
-   🚀 Auto Transform Response data
-   🚀 Immutable Context
-   🚀 Download Progress
