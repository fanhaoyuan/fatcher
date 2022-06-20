import { useAppContext } from '@/app.context';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { RouteRecord } from '../interfaces';

export function useRouter() {
    const { pathname } = useLocation();

    const [order, setOrder] = useState(-1);

    const [router, setRouter] = useState<RouteRecord>();

    const [collection, setCollection] = useState<RouteRecord[]>([]);

    const { currentRoutes } = useAppContext();

    useEffect(() => {
        const routes = currentRoutes ?? [];

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
