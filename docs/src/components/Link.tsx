import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Wrapper = styled.a`
    font-weight: bold;
    border-bottom: 2px solid #425991;
    transition: color 0.25s, border-color 0.2s;
    cursor: pointer;

    :hover {
        color: white;
        text-decoration: none;
        border-bottom-color: rgba(255, 255, 255, 0.6);
    }
`;

export interface LinkProps {
    href?: string;
}

export function Link(props: PropsWithChildren<LinkProps>) {
    const { children, href } = props;

    const isOriginLink = href && /^(\.\.)?[/#]/.test(href);

    return (
        <Wrapper target={isOriginLink ? undefined : '_blank'} rel={isOriginLink ? undefined : 'noreferrer'} href={href}>
            {children}
        </Wrapper>
    );
}
