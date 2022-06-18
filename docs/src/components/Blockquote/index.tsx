import { PropsWithChildren } from 'react';
import styles from './index.module.css';

export function Blockquote(props: PropsWithChildren<{}>) {
    const { children } = props;

    return <blockquote className={styles.blockquote}>{children}</blockquote>;
}
