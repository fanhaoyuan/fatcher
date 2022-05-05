## v1.1.1

-   🐛 Using body instead of inline url params with `application/x-www-form-urlencoded` ([#113](https://github.com/fatcher/fatcher/pull/113))
-   ⚡️ Headers using `Record<string, string>` to send request ([#109](https://github.com/fatcher/fatcher/pull/109))

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

-   🐛 fix normalize error when baseURL is not '/' [#62](https://github.com/fatcher/fatcher/pull/62)

## v0.3.1

### bugs

-   🐛 fix normalize url error
-   🐛 fix merge options error

## v0.3.0

### features

-   🚀 add `FatcherError`
-   🚀 add `isFatcherError` for custom middleware

### modules

-   📦 export `clone` helper function

## v0.2.0

### features

-   🚀 Add Timeout aborter.
-   🚀 Throw AbortError during aborting fetch.

### build

-   🔧 Add compatibility with esModule

## v0.1.1

### bugs

-   🐞 Fix can not abort fetch when request pending.

## v0.1.0

### features

-   🚀 Basic Fetch.
-   🚀 Cancelable.
-   🚀 Add custom middlewares.
-   🚀 Auto Transform Request Payload.
-   🚀 Auto Transform Response data
-   🚀 Immutable Context
-   🚀 Download Progress
