import styles from './index.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { useAppContext } from '@/app.context';
import { DownOutlined } from '@ant-design/icons';
import { useLocalePath } from '@/hooks';

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

    const { currentRoutes, locale, locales, setLocal } = useAppContext();

    const navigateTo = useNavigate();

    const { getLocalePath } = useLocalePath();

    function onLocaleChange(loc: string) {
        if (loc === locale) {
            return;
        }

        setLocal(() => loc);

        navigateTo(getLocalePath(loc, pathname), { replace: true });
    }

    return (
        <nav className={classnames(styles.navigation, className)}>
            <div className={styles.navigationToolbar}>
                <div className={styles.navigationToolbarButton}>
                    {locales.find(item => item[0] === locale)?.[1]}
                    <DownOutlined className={styles.navigationToolbarButtonIcon} />

                    <div className={styles.navigationToolbarDropdownMenu}>
                        <ul className={styles.navigationToolbarDropdownMenuList}>
                            {locales.map(item => {
                                return (
                                    <li
                                        key={item[0]}
                                        className={styles.navigationToolbarDropdownMenuListItem}
                                        onClick={() => onLocaleChange(item[0])}
                                    >
                                        {item[1]}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <ul className={styles.navigationMenu}>
                {currentRoutes?.map(router => {
                    const { meta, path } = router;

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
