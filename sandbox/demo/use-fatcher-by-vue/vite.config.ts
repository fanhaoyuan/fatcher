import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 9555,
        host: '0.0.0.0',
        proxy: {
            '^/api': {
                target: 'http://localhost:3000/zcs',
                changeOrigin: true,
                rewrite: (url: string) => url.replace('/api', ''),
                cookiePathRewrite: {
                    '/api': '/',
                },
            },
        },
    },
});
