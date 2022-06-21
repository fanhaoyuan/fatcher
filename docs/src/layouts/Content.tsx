import { Outlet } from 'react-router';
import { MDXProvider } from '@mdx-js/react';
import { NavigationLink, Heading, Blockquote, Link, Code, Pre } from '@/components';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useRouter } from '@/hooks';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';

const ContentWrapper = styled.section`
    max-width: 875px;
    margin: 0 auto;
    position: relative;
    padding: 0 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const NavigationLinkGroup = styled.div`
    margin-top: auto;
    display: flex;
    margin-top: 64px;
`;

const NavigationLinkWrapper = styled(NavigationLink)`
    font-size: 22px !important;
    display: inline-flex !important;
    align-items: center;
    width: 50%;
`;

const NavigationPrevLink = styled(NavigationLinkWrapper)`
    justify-content: flex-start;
`;

const NavigationNextLink = styled(NavigationLinkWrapper)`
    margin-left: auto;
    justify-content: flex-end;
`;

const NavigationLinkIcon = css`
    font-size: 32px;
`;

const NavigationPrevLinkIcon = styled(ArrowLeftOutlined)`
    ${NavigationLinkIcon}
    margin-right: 8px;
`;

const NavigationNextLinkIcon = styled(ArrowRightOutlined)`
    ${NavigationLinkIcon}
    margin-left: 8px;
`;

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
        <ContentWrapper className={className}>
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

            <NavigationLinkGroup>
                {showPrevLink && (
                    <NavigationPrevLink to={prevRouter?.path}>
                        <NavigationPrevLinkIcon />
                        {prevRouter?.meta?.title}
                    </NavigationPrevLink>
                )}

                {showNextLink && (
                    <NavigationNextLink to={nextRouter?.path}>
                        {nextRouter?.meta?.title}
                        <NavigationNextLinkIcon />
                    </NavigationNextLink>
                )}
            </NavigationLinkGroup>
        </ContentWrapper>
    );
}
