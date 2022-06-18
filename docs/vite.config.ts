import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import * as fs from 'fs-extra';

const scopedNameMap = new Map();

export default async () => {
    const mdx = (await import('@mdx-js/rollup')).default;
    const frontmatter = (await import('remark-frontmatter')).default;
    const mdxFrontmatter = (await import('remark-mdx-frontmatter')).remarkMdxFrontmatter;

    const CWD = process.cwd();

    const CWD_PACKAGE_JSON_PATH = path.resolve(CWD, 'package.json');

    const packageJson = await fs.readJSON(CWD_PACKAGE_JSON_PATH, 'utf-8');

    const appContext = {
        version: packageJson.version,
        title: packageJson.name,
        repository: packageJson.repository,
        logo: '/fatcher.png',
    };

    return defineConfig({
        root: __dirname,
        base: '/fatcher/',
        build: {
            outDir: path.resolve(__dirname, '../docs-dist'),
            emptyOutDir: true,
        },
        define: {
            __FANDO_APP_CONTEXT__: JSON.stringify(appContext),
        },
        plugins: [
            react(),
            mdx({
                providerImportSource: '@mdx-js/react',
                remarkPlugins: [frontmatter, mdxFrontmatter],
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        css: {
            modules: {
                localsConvention: 'camelCaseOnly',
                generateScopedName(name, fileName) {
                    if (!scopedNameMap.has(fileName)) {
                        scopedNameMap.set(fileName, Math.random().toString(36).slice(-6));
                    }

                    if (/^prismjs.*/.test(name)) {
                        return name;
                    }

                    return `${name}__${scopedNameMap.get(fileName)}`;
                },
            },
        },
        optimizeDeps: {
            include: ['react/jsx-runtime'],
        },
    });
};
