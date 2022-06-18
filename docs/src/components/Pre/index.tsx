import { PropsWithChildren } from 'react';
import styles from './index.module.css';

export function Pre(props: PropsWithChildren<{}>) {
    const { children } = props;
    return <pre className={styles.pre}>{children}</pre>;
}
