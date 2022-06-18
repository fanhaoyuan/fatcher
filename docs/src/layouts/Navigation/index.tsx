import styles from './index.module.css';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { useAppContext } from '@/app.context';

export interface NavigationItem {
    title: string;
    path: string;
}

export interface NavigationProps {
    routes?: NavigationItem[];
    className?: string;
}

export function Navigation(props: NavigationProps) {
    const { className } = props;

    const { pathname } = useLocation();

    const { routes } = useAppContext();

    return (
        <nav className={classnames(styles.navigation, className)}>
            <ul className={styles.navigationMenu}>
                {routes?.map(router => {
                    const { meta = {}, path } = router;

                    return (
                        <li
                            key={path}
                            className={classnames(styles.navigationItem, {
                                [styles.active]: path === pathname,
                            })}
                        >
                            <Link to={path}>{meta.title}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
