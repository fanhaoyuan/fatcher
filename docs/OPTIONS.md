# Options

Fatcher based on `fetch` and enhances it. So the vast majority of fetch's options is work in fatcher.

## Option List

The following are Fatcher specific options.

### base

Prefix path at request. `base` will combine with `url`.

#### Types

```ts
interface FatcherOptions {
    /**
     * @default `/`
     */
    base?: string;
}
```

#### Reference

```ts
import { fatcher } from 'fatcher';

fatcher({
    base: 'https://examples.com/',
});
```

### url

Request url. `url` will combine with `base`.

#### Types

```ts
interface FatcherOptions {
    /**
     * @default '/'
     */
    url?: string;
}
```

#### Reference

```ts
import { fatcher } from 'fatcher';

fatcher({
    base: 'https://examples.com/',
    url: '/foo/bar
});
```

### middlewares

An array of function with `pre` or `post` request. Detail please see [MIDDLEWARES](./MIDDLEWARES.md).

#### Types

```ts
interface FatcherOptions {
    /**
     *  @default []
     */
    middlewares?: MiddlewareRegister[];
}
```

#### Reference

```ts
import { fatcher, defineMiddleware } from 'fatcher';

const middleware = defineMiddleware(async (context, next) => {
    // ...
}, 'my-middleware-name');

fatcher({
    middlewares: [middleware],
});
```

### params

Some request params in url.

#### Types

```ts
interface FatcherOptions {
    /**
     *  @default {}
     */
    params?: Record<string, string>;
}
```

#### Reference

```ts
import { fatcher } from 'fatcher';

fatcher({
    base: 'https://examples.com/',
    url: '/foo/bar',
    params: {
        name: 'example',
        id: '1',
    },
}); // Request url is https://examples.com/foo/bar?name=example&id=1
```

### validateCode

Custom validate status code, If status code is not match, will throw a `FatcherError`.

#### Types

```ts
interface FatcherOptions {
    /**
     *  @default
     * (statusCode) => 200 <= statusCode < 300
     */
    validateCode?: (statusCode: number) => boolean;
}
```

#### Reference

```ts
import { fatcher } from 'fatcher';

fatcher({
    base: 'https://examples.com/',
    url: '/foo/bar',
    validateCode(code) {
        return code === 200; // will success when code is 200
    },
});
```

## Different from fetch

Fatcher unified the fetch configuration items to eliminate the problem of inconsistent performance in different environments.

### method

HTTP Request Method for current request.

#### Types

```ts
// fetch
interface RequestInit {
    method?: string;
}

// fatcher
interface FatcherOptions {
    /**
     *  @default 'GET'
     */
    method?:
        | 'GET'
        | 'get'
        | 'POST'
        | 'post'
        | 'PUT'
        | 'put'
        | 'DELETE'
        | 'delete'
        | 'HEAD'
        | 'head'
        | 'OPTIONS'
        | 'options'
        | 'PATCH'
        | 'patch';
}
```

#### Reference

```ts
import { fatcher } from 'fatcher';

fatcher({
    method: 'POST',
});
```

### body

Request body, will consume it in middlewares before send request. Convert to different formats with request method.

#### Types

```ts
// fetch
interface RequestInit {
    body?: BodyInit | null;
}

// fatcher
type RequestBody = BodyInit | null | Record<string, any>;

interface FatcherOptions {
    body?: RequestBody;
}
```

#### Reference

```ts
import { fatcher } from 'fatcher';

fatcher({
    body: {
        id: 'examples',
    },
});
```
