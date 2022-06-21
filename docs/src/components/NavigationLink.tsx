import { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled(Link)`
    position: relative;
    display: block;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    padding: 48px 16px;

    :hover {
        color: #7cbbff;
        background: rgba(0, 0, 0, 0.1);
        border-bottom: 2px solid #425991;
        text-decoration: none;
    }
`;

export interface NavigationLinkProps {
    className?: string;
    to?: string;
}

export function NavigationLink(props: PropsWithChildren<NavigationLinkProps>) {
    const { children, to = '#', className } = props;

    return (
        <Wrapper to={to} className={classnames(className)}>
            {children}
        </Wrapper>
    );
}
