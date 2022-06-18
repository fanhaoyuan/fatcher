import { PropsWithChildren } from 'react';
import classnames from 'classnames';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

export interface NavigationLinkProps {
    className?: string;
    to?: string;
}

export function NavigationLink(props: PropsWithChildren<NavigationLinkProps>) {
    const { children, to = '#', className } = props;

    return (
        <Link to={to} className={classnames(styles.navigationLink, className)}>
            {children}
        </Link>
    );
}
