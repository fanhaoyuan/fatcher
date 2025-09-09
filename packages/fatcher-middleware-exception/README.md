# @fatcherjs/middleware-exception

<a href="https://npmjs.com/package/@fatcherjs/middleware-exception"><img src="https://img.shields.io/npm/v/@fatcherjs/middleware-exception.svg" alt="npm package"></a>
[![install size](https://packagephobia.com/badge?p=@fatcherjs/middleware-exception)](https://packagephobia.com/result?p=@fatcherjs/middleware-exception)
<a href="https://unpkg.com/@fatcherjs/middleware-exception"><img alt="Size" src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-exception"></a>

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-exception
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-exception/dist/index.min.js"></script>
```

## Usage

In the fetch api, all requests are considered successful. However, we generally consider a request with a response code of `200-299` to be successful.

```ts
import { exception, fatcher, isFatcherError } from 'fatcher';

fatcher('https://foo.bar', { middlewares: [exception] }).catch(error => {
  if (isFatcherError(error)) {
    // handle fatcher error
    return;
  }

  // handle other error
});
```

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
