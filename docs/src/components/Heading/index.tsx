import classnames from 'classnames';
import { PropsWithChildren, useMemo } from 'react';
import styles from './index.module.css';

export interface HeadingProps {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    anchor?: boolean;
}

const anchors = new Set<string>();

export function Heading(props: PropsWithChildren<HeadingProps>) {
    const { level, anchor = true, children } = props;

    const Tag: `h${typeof level}` = `h${level}`;

    const hash = useMemo(() => {
        let h = [children]
            .filter(child => typeof child === 'string')
            .join(' ')
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/-$/g, '')
            .toLowerCase();

        if (anchors.has(h)) {
            let count = 1;

            while (anchors.has(h + count)) {
                count++;
            }

            h = `${h}-${count}`;
        }

        anchors.add(h);

        return h;
    }, []);

    return (
        <Tag className={classnames(styles.heading, styles[`heading${level}`])}>
            {anchor && (
                <a className={styles.anchor} id={hash} href={`#${hash}`}>
                    #
                </a>
            )}
            {children}
        </Tag>
    );
}
