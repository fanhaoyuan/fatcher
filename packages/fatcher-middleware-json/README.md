# @fatcher/middleware-json

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-json
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-json/dist/index.min.js"></script>
```

## Usage

```ts
import { fatcher } from 'fatcher';
import { json } from '@fatcherjs/middleware-json';

const res = await fatcher('https://foo.bar/get', {
  middlewares: [json()],
});

const streamingJson = await res.readStreamAsJson((string: string, buffer: Uint8Array) => {
  console.log(string, buffer); // chunks for streaming string
}); // full result
```

## License

[MIT](https://github.com/fanhaoyuan/fatcher/blob/master/LICENSE)
