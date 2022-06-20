export interface RouteRecordMeta {
    title: string;
    order: number;
}

export interface RouteRecord {
    path: string;
    component?:
        | React.LazyExoticComponent<() => JSX.Element>
        | ((props: React.PropsWithChildren<Record<string, any>>) => JSX.Element);
    children?: RouteRecord[];
    redirect?: string;
    meta: RouteRecordMeta;
}

export interface AppContext {
    title: string;
    version: string;
    repository: string;
    logo: string;
    locales: [string, string][];
    routes: RouteRecord[];
}
