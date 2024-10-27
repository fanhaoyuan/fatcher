# @fatcherjs/middleware-parameter

<a href="https://npmjs.com/package/@fatcherjs/middleware-parameter"><img src="https://img.shields.io/npm/v/@fatcherjs/middleware-parameter.svg" alt="npm package"></a>
[![install size](https://packagephobia.com/badge?p=@fatcherjs/middleware-parameter)](https://packagephobia.com/result?p=@fatcherjs/middleware-parameter)
<a href="https://unpkg.com/@fatcherjs/middleware-parameter"><img alt="Size" src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-parameter"></a>

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-parameter
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-parameter/dist/index.min.js"></script>
```

## Usage

```ts
import { fatcher } from 'fatcher';
import { parameter } from '@fatcherjs/middleware-parameter';

fatcher('https://foo.bar', {
  params: {
    foo: 'bar',
  },
  middlewares: [parameter({})],
}); // url is https://foo.bar?foo=bar
```

## Options

### serializer

```ts
import qs from 'qs;
import { fatcher } from 'fatcher';
import { parameter, Serializer } from '@fatcherjs/middleware-parameter';

const serializer: Serializer = (params) => qs.stringify(params);

fatcher('https://foo.bar', {
  params: {
    foo: 'bar',
  },
  middlewares: [parameter({
    serializer
  })],
});
```

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
