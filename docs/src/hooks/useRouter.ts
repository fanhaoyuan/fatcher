import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { asyncRoutes, RouteRecord } from '../app.routes';

export function useRouter() {
    const { pathname } = useLocation();

    const [order, setOrder] = useState(-1);

    const [router, setRouter] = useState<RouteRecord>();

    const [collection, setCollection] = useState<RouteRecord[]>([]);

    useEffect(() => {
        const routes = asyncRoutes.find(item => item.path === '/')?.children ?? [];

        setCollection(() => routes);

        for (let i = 0; i < routes.length; i++) {
            if (pathname === routes[i].path) {
                setOrder(() => i);
                setRouter(() => routes[i]);
            }
        }
    }, [pathname]);

    return {
        router,
        order,
        collection,
    };
}
