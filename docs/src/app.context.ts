import constate from 'constate';
import { useMemo } from 'react';
import { asyncRoutes, RouteRecord } from './app.routes';

export interface AppContext {
    logo?: string;
    repository?: string;
    version?: string;
    title?: string;
    routes?: RouteRecord[];
}

const [AppContextProvider, useAppContext] = constate(() => {
    const { logo, repository, version, title } = useMemo(() => {
        return __FANDO_APP_CONTEXT__;
    }, []);

    const repo = useMemo(() => {
        if (typeof repository === 'string') {
            return repository;
        }

        if (typeof repository === 'object' && repository.url) {
            const [match] = repository.url.match(/http(s?):\/\/.*/g) ?? [];

            if (match) {
                return match.replace(new RegExp(`.${repository.type || 'git'}$`), '');
            }
        }
    }, [repository]);

    const routes = useMemo(() => {
        return asyncRoutes.find(item => item.path === '/')?.children ?? [];
    }, []);

    return {
        logo,
        repository: repo,
        version,
        title,
        routes,
    } as AppContext;
});

export { AppContextProvider, useAppContext };
