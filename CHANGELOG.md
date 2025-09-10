## v3.0.0

- 🚀 Support Named Middleware and Functional Middleware
- ❌ Remove `Fatcher Error`
- ❌ Remove `exception` middleware

## v3.0.0-beta-2

- 🚀 add `fatcher-middleware-parameter` to deal with query string ([#266](https://github.com/fanhaoyuan/fatcher/pull/266))

## v3.0.0-beta-1

- 🐛 Pass fetch options to fetch api ([#264](https://github.com/fanhaoyuan/fatcher/pull/264))

## v3.0.0-beta

- 🔧 Refactor fatcher request core, same behavior with fetch.
- 🚀 Built-in `fatcher-middleware-aborter`
- 🚀 Built-in `fatcher-middleware-json`
- ❌ Deprecated `createScopedRequest`
- 📚 Archived `@fatcherjs/middleware-json`
- 📚 Archived `@fatcherjs/middleware-aborter`
- 📚 Archived `@fatcherjs/middleware-cache`
- 📚 Archived `@fatcherjs/middleware-form-data`
- 📚 Archived `@fatcherjs/middleware-mock`
- 📚 Archived `@fatcherjs/middleware-progress`
- 📚 Archived `@fatcherjs/utils-shared`

## v2.1.0

- 🚀 Supports string inputs.

## v2.0.0

- ❌ Deprecated `setDefaultOptions`
- ❌ Deprecated `mergeOptions`
- ❌ Deprecated `isAbortError`
- ❌ Deprecated `chunkStreamReader`
- 🚀 Add `combine` for merging options and context
- 🚀 Add `defineMiddleware` helper function to declare middleware
- 🚀 `RequestMethod` allows lower method
- 🚀 `Context` with required context.
- 🔧 Refactor object middleware to functions

## v1.8.0

- 🚀 middleware can provide context before fetching

## v1.7.1

- 🐛 Filter undefined value in payload when transform to querystring

## v1.7.0

- 🚀 Supports async middlewares. ([#183](https://github.com/fanhaoyuan/fatcher/pull/183))

## v1.6.1

- 🐛 fix parse error when query string had absolute url ([#180](https://github.com/fanhaoyuan/fatcher/pull/180))
- 🐛 fix parse exception when base url with an absolute request url ([#181](https://github.com/fanhaoyuan/fatcher/pull/181))

## v1.6.0

- 🚀 add options `validateCode` for passing custom response status code. ([#174](https://github.com/fanhaoyuan/fatcher/pull/174))
- ⚡️ `normalizeURL` downgrade to use `match`. ([#179](https://github.com/fanhaoyuan/fatcher/pull/179))

## v1.5.0

- 🚀 `readStreamByChunk` supports async callback ([#167](https://github.com/fanhaoyuan/fatcher/pull/167))
- 🚀 request url supports relative path like `../` and `./` ([#170](https://github.com/fanhaoyuan/fatcher/pull/170))

## v1.4.1

- 🔧 Remove some overt options ([#161](https://github.com/fanhaoyuan/fatcher/pull/161))

## v1.4.0

- ❌ Deprecate `isAbortError`, move it to `@fanhaoyuan/middleware-aborter`. ([#157](https://github.com/fanhaoyuan/fatcher/pull/157))

## v1.3.0

- 🚀 `Middleware` add `presets` options, can set preset middlewares before using this middleware. ([#152](https://github.com/fanhaoyuan/fatcher/pull/152))

## v1.2.0

- 🚀 Use `Headers` class for sending http headers. ([#129](https://github.com/fanhaoyuan/fatcher/pull/129))
- 🚀 Add `params` into request options ([#128](https://github.com/fanhaoyuan/fatcher/pull/128))
- 🚀 Change context in `middleware.use` to readonly ([#127](https://github.com/fanhaoyuan/fatcher/pull/127))
- 🐛 When using `createScopedRequest`, headers will cover another request headers ([#140](https://github.com/fanhaoyuan/fatcher/pull/140))
- 🐛 Should not return request headers but response headers ([#137](https://github.com/fanhaoyuan/fatcher/pull/137))
- 🔧 Using `requestHeaders` instead of `headers` in context ([#142](https://github.com/fanhaoyuan/fatcher/pull/142))

## v1.1.3

- 🐛 `ResponseResult` headers should be response headers ([#126](https://github.com/fanhaoyuan/fatcher/pull/126))
- 🧪 Upgrade node version to `18` and setup units tests ([#124](https://github.com/fanhaoyuan/fatcher/pull/124))

## v1.1.2

- 🐛 It is not exported `isAbortError` and `readStreamByChunk` ([#120](https://github.com/fanhaoyuan/fatcher/pull/120))
- 🔧 Rename `chunkStreamReader` to `readStreamByChunk` ([#119](https://github.com/fanhaoyuan/fatcher/pull/119))
- 🐛 The global options `overriding` headers rather than `merging` headers ([#118](https://github.com/fanhaoyuan/fatcher/pull/118))

## v1.1.1

- 🐛 Using body instead of inline url params with `application/x-www-form-urlencoded` ([#113](https://github.com/fanhaoyuan/fatcher/pull/113))
- ⚡️ Headers using `Record<string, string>` to send request ([#109](https://github.com/fanhaoyuan/fatcher/pull/109))

## v1.1.0

- 🔧 Move `@fanhaoyuan/utils-shared` to `utils`
- 🚀 Add default request init for same behavior during fetch in different browsers

## v1.0.0

- 🚀 Add `payload-consumer`

## v1.0.0-beta.1

- 🚀 Add `createScopedRequest`
- ❌ Deprecate `clone` helper function
- ❌ Deprecate Auto Transform Response Data
- ❌ Deprecate Middleware Apply.
- 🔧 Refactor Typings
- 🔧 Refactor Immutable Context
- 🔧 Move Download Progress Middleware to [@fanhaoyuan/middleware-download-progress](https://github.com/fanhaoyuan/middlewares/tree/master/packages/download-progress)
- 🔧 Move Cancelable Middlewares to [@fanhaoyuan/middleware-aborter](https://github.com/fanhaoyuan/middlewares/tree/master/packages/aborter)

## v0.3.2

- 🐛 fix normalize error when baseURL is not '/' [#62](https://github.com/fanhaoyuan/fatcher/pull/62)

## v0.3.1

- 🐛 fix normalize url error
- 🐛 fix merge options error

## v0.3.0

- 🚀 add `FatcherError`
- 🚀 add `isFatcherError` for custom middleware
- 📦 export `clone` helper function

## v0.2.0

- 🚀 Add Timeout aborter.
- 🚀 Throw AbortError during aborting fetch.
- 🔧 Add compatibility with esModule

## v0.1.1

- 🐞 Fix can not abort fetch when request pending.

## v0.1.0

- 🚀 Basic Fetch.
- 🚀 Cancelable.
- 🚀 Add custom middlewares.
- 🚀 Auto Transform Request Payload.
- 🚀 Auto Transform Response data
- 🚀 Immutable Context
- 🚀 Download Progress
