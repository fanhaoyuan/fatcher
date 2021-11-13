## demo 介绍

[Fatcher](./README.md) 简介

### 开始

本 demo 是 fatcher 的使用，目前是两种。

一是在 HTML 中的使用，二是在 vue 中的使用

要使用本项目中的 demo，首先得按一下步骤。

-   根目录安装相关依赖

使用 npm

```sh
yarn
```

-   启动本地测试服务器

```
yarn sandbox
```

#### HTML demo

参考代码： sandbox/demo/useFatcher.html

基础使用：

引入 fatcher

```html
<script src="../../dist/fatcher.min.js"></script>
```

```js
Fatcher.fatcher({
    url: 'http://127.0.0.1:3000/zcs/check/getCheckInfo',
    method: 'get',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
}).then(res => {
    console.log(res.data);
});
```

#### vue demo

参考代码： sandbox/demo/use-fatcher-by-vue/src/api/platform.ts

使用：

```ts
import { Fatcher } from 'fatcher';
```

可以创建一个统一 api 实例

```ts
const request = Fatcher.create({
    //配置项
    method: 'post',//get、...
    baseURL: 'api',//自行配置
    middlewares: [
        {
			//自定义的中间件
        },
        ...
    ],
    ...
});
```

参考代码 middlewares：

```ts
middlewares: [
        {
            name: 'carry token',
            apply() {
                return !!sessionStorage.getItem('token');
            },
            async use(context, next) {
                const response = await next({
                    options: {
                        headers: {
                            Authorization: sessionStorage.getItem('token'),
                        },
                    },
                });
                return {
                    ...response,
                };
            },
        },
        {
            name: 'data stream handle',
            async use(context, next) {
                const response = await next();

                const [stream, returnStream] = response.data.tee();

                const _res = new Response(stream, { headers: response.headers });

                const responseJSON = await _res.json();

                console.log('response', responseJSON);
                if (responseJSON.code === 401) {
                    return { ...response, data: returnStream };
                }
                if (!responseJSON.success) {
                    return Promise.reject(new Error());
                }

                return {
                    ...response,
                    data: returnStream,
                };
            },
        },
    ],
```

此 demo 模拟用户登录、用户携带 token 获取信息为例

middleware by data stream handle

用户登录，有时会需要携带特定的请求头进行校验是否符合登录条件

例：

```ts
export function login(data: { loginCode: string; password: string }) {
    return request('/group/groupList', data, {
        headers: {
            SystemType: 'onlineBookKeeping',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}
```

这个登录接口模拟后台需要请求头携带 _SystemType_， 所以需要对 header 进行修改，传入 header，在 data stream handle 中，

```ts
const _res = new Response(stream, { headers: response.headers });
```

就可以将 header 进行修改了。

middleware by carry token

登录接口自然不需要 token，但是其他接口大多数都需要 token，如果单独传入，会很麻烦，所以可以添加多一个 middleware 进行 token 的单独添加。

其中，middleware 的执行条件就是由 apply 控制

```ts
apply() {
	return !!sessionStorage.getItem('token');
},
```

从业务逻辑上看，当我们接口获取数据失败时，都会返回相对应的状态码，此时，我们可以在 middleware by data stream handle 里面进行对数据流进行解析

```ts
const [stream, returnStream] = response.data.tee();

const responseJSON = await _res.json();

if (responseJSON.code === 401) {
    return { ...response, data: returnStream };
}
if (!responseJSON.success) {
    return Promise.reject(new Error());
}
```

对不同的状态进行不同的操作，然后进行抛错等一系列业务操作。
