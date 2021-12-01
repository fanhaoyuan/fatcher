<div style="text-align: center;">
<p style="font-size:40px;">Fatcher<p>
<p style="font-size:20x;margin-bottom: 8px;">
一个开箱即用 📦 的现代浏览器 `http` 请求库。<p>

[![codecov](https://codecov.io/gh/fanhaoyuan/fatcher/branch/master/graph/badge.svg?token=9DRTR2GXH8)](https://codecov.io/gh/fanhaoyuan/fatcher)
[![](https://data.jsdelivr.com/v1/package/npm/fatcher/badge?style=rounded)](https://www.jsdelivr.com/package/npm/fatcher)
<a href="https://npmjs.com/package/fatcher"><img src="https://img.shields.io/npm/v/fatcher.svg" alt="npm package"></a>
<a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/fatcher.svg" alt="node compatibility"></a>
<a href="https://github.com/fanhaoyuan/fatcher/actions/workflows/ci.yml"><img src="https://github.com/fanhaoyuan/fatcher/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status"></a>

</div>

---

## 语言

[English](./README.md) | 中文

## 支持列表

|   Chrome    |   Firefox   |    Edge     |   Safari    |    IE     |
| :---------: | :---------: | :---------: | :---------: | :-------: |
| ✅ 最新版本 | ✅ 最新版本 | ✅ 最新版本 | ✅ 最新版本 | ❌ 不支持 |

## 特性

-   ✨ 内置常用的请求封装和默认配置，开箱即用，无需额外的配置
-   ✨ 灵活的中间件系统，通过不同的中间件组合，处理不同场景的数据
-   ✨ 支持单独请求的数据模拟，在开发时获得接口返回的模拟数据
-   ✨ 完全使用 TypeScript 编写，完备的类型系统更省心
-   ✨ 数据以流的形式返回，可边读边操作，加快接口处理速度
-   ✨ 请求载体和响应数据自动转换，无需手动转换

## 安装

### NPM

```bash
>$ npm install fatcher
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
```

## 用法

```ts
import { fatcher } from 'fatcher';

fatcher(
    '/api/my/request/url', //请求路径
    {
        //配置项
        method: 'get',
        payload: {
            a: 1,
            b: 2,
            c: 3,
        },
    }
)
    .then(res => {
        // 响应回调
    })
    .catch(err => {
        // 错误回调
    });
```

## 更多

更多信息请查看[文档](https://fanhaoyuan.github.io/fatcher/zh-CN)

## License

[MIT](./LICENSE)
