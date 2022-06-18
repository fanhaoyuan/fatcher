import { Outlet } from 'react-router';
import { MDXProvider } from '@mdx-js/react';
import styles from './index.module.css';
import classnames from 'classnames';
import { NavigationLink, Heading, Blockquote, Link, Code, Pre } from '@/components';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from '@/hooks';
import { useMemo } from 'react';

export interface ContentProps {
    className?: string;
}

export function Content(props: ContentProps) {
    const { className } = props;

    const { order, collection } = useRouter();

    const showPrevLink = order > 0;
    const showNextLink = order < collection.length - 1;

    const prevRouter = useMemo(() => {
        if (showPrevLink) {
            return collection[order - 1];
        }
    }, [showPrevLink, collection, order]);

    const nextRouter = useMemo(() => {
        if (showNextLink) {
            return collection[order + 1];
        }
    }, [showNextLink, collection, order]);

    return (
        <section className={classnames(styles.content, className)}>
            <MDXProvider
                components={{
                    h1: p => <Heading {...p} level={1} anchor={false} />,
                    h2: p => <Heading {...p} level={2} />,
                    h3: p => <Heading {...p} level={3} />,
                    h4: p => <Heading {...p} level={4} />,
                    h5: p => <Heading {...p} level={5} />,
                    h6: p => <Heading {...p} level={6} />,
                    blockquote: p => <Blockquote {...p} />,
                    a: p => <Link {...p} />,
                    code: p => <Code {...p} />,
                    pre: p => <Pre {...p} />,
                }}
            >
                <Outlet />
            </MDXProvider>

            <div className={styles.navigationLinkGroup}>
                {showPrevLink && (
                    <NavigationLink
                        className={classnames(styles.navigationLink, styles.prevLink)}
                        to={prevRouter?.path}
                    >
                        <ArrowLeftOutlined className={styles.navigationLinkIcon} />
                        {prevRouter?.meta?.title}
                    </NavigationLink>
                )}

                {showNextLink && (
                    <NavigationLink
                        className={classnames(styles.navigationLink, styles.nextLink)}
                        to={nextRouter?.path}
                    >
                        {nextRouter?.meta?.title}
                        <ArrowRightOutlined className={styles.navigationLinkIcon} />
                    </NavigationLink>
                )}
            </div>
        </section>
    );
}
