import constate from 'constate';
import { useEffect, useMemo, useState } from 'react';
import { AppContext } from './interfaces';

const [AppContextProvider, useAppContext] = constate((props: AppContext) => {
    const { logo, repository, version, title, locales, routes } = props;

    const [locale, setLocal] = useState(locales[0][0]);

    const routerPrefix = useMemo(() => {
        if (locale === locales[0][0]) {
            return '/';
        }

        return `/${locales.find(item => item[0] === locale)?.[0]}`;
    }, [locale]);

    useEffect(() => {
        const [loc] = location.pathname.replace(import.meta.env.BASE_URL, '').split('/');

        let index = locales.findIndex(item => item[0] === loc);

        if (index === -1) {
            index = 0;
        }

        setLocal(() => locales[index][0]);
    }, []);

    const currentRoutes = useMemo(() => {
        return routes.find(item => item.path === routerPrefix)?.children ?? [];
    }, [routerPrefix, routes]);

    return {
        logo,
        repository,
        version,
        title,
        currentRoutes,
        locale,
        locales,
        setLocal,
    };
});

export { AppContextProvider, useAppContext };
