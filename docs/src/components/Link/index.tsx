import { PropsWithChildren } from 'react';
import styles from './index.module.css';

export interface LinkProps {
    href?: string;
}

export function Link(props: PropsWithChildren<LinkProps>) {
    const { children, href } = props;

    const isOriginLink = href && /^(\.\.)?[/#]/.test(href);

    return (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a
            target={isOriginLink ? undefined : '_blank'}
            rel={isOriginLink ? undefined : 'noreferrer'}
            className={styles.link}
            href={href}
        >
            {children}
        </a>
    );
}
