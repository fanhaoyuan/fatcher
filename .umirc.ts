import { defineConfig } from 'dumi';

export default defineConfig({
    title: 'Fatcher',
    mode: 'site',
    base: '/fatcher/',
    publicPath: '/fatcher/',
    outputPath: 'docs-dist',
    navs: {
        'en-US': [
            null,
            {
                title: 'GitHub',
                path: 'https://github.com/fanhaoyuan/fatcher',
            },
        ],
        'zh-CN': [
            null,
            {
                title: 'GitHub',
                path: 'https://github.com/fanhaoyuan/fatcher',
            },
        ],
    },
});
