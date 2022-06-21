import { AppContextProvider } from './app.context';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouteRecord, AppContext } from './interfaces';
import { repository, name, version } from '../../package.json';
import { Layout } from './layouts';

const defaultAppContext: AppContext = {
    repository: '',
    title: name,
    version,
    logo: new URL('/fatcher.png', import.meta.url).href,
    locales: [
        ['en-US', 'English'],
        ['zh-CN', '中文'],
    ],
    routes: [],
};

console.log(defaultAppContext);

(function normalizeRepository() {
    const [match] = repository.url.match(/http(s?):\/\/.*/g) ?? [];

    if (match) {
        defaultAppContext.repository = match.replace(new RegExp(`.${repository.type || 'git'}$`), '');
    }
})();

const asyncRoutes: RouteRecord[] = [];

(function registerLayouts() {
    for (let i = 0; i < defaultAppContext.locales.length; i++) {
        const [lang, title] = defaultAppContext.locales[i];

        asyncRoutes.push({
            path: i === 0 ? '/' : `/${lang}`,
            component: Layout,
            children: [],
            meta: {
                title,
                order: i,
            },
        });
    }
})();

console.log(asyncRoutes);

const groups: Map<string, RouteRecord[]> = new Map();

(function registerContentRoutes() {
    const modules = import.meta.globEager(`@/pages/**/*.md(x)?`);

    console.log(modules);

    for (const [key, { default: component, ...meta }] of Object.entries(modules)) {
        const [path, locale = '/'] = key
            .replace('./pages', '')
            .replace(/\.md(x)?$/, '')
            .split('.');

        const router: RouteRecord = {
            path: path.replace(/\/index$/, '/'),
            component,
            // @ts-expect-error
            meta,
        };

        if (locale !== '/') {
            router.path = `/${locale}${router.path}`;
        }

        if (groups.has(locale)) {
            groups.get(locale)?.push(router);
            continue;
        }

        groups.set(locale, [router]);
    }

    for (const [locale, routes] of groups.entries()) {
        console.log(locale, routes);

        const currentRouter = asyncRoutes.find(router => {
            return router.path === (locale === '/' ? '/' : `/${locale}`);
        }) as RouteRecord;

        currentRouter.children = routes;

        currentRouter.children.sort((a, b) => {
            return a.meta.order - b.meta.order;
        });
    }

    console.log(groups);
})();

console.log(asyncRoutes);

defaultAppContext.routes = asyncRoutes;

function registerAsyncRoutes(routes: RouteRecord[]) {
    return routes.map(route => {
        const DynamicComponent = route.component;

        if (!DynamicComponent) {
            return null;
        }

        return (
            <Route path={route.path} key={route.path} element={<DynamicComponent />}>
                {route.children?.length && registerAsyncRoutes(route.children)}
            </Route>
        );
    });
}

export default function App() {
    return (
        <AppContextProvider {...defaultAppContext}>
            <div className='App'>
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                    <Suspense fallback={false}>
                        <Routes>{registerAsyncRoutes(asyncRoutes)}</Routes>
                    </Suspense>
                </BrowserRouter>
            </div>
        </AppContextProvider>
    );
}
