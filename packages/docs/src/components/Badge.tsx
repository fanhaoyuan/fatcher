import * as React from 'react';
import styled from 'styled-components';

const BadgeWrapper = styled.span`
    color: #fff;
    background-image: linear-gradient(45deg, #0058ff, #df72a1, #f7ffbb);
    display: inline-block;
    margin-left: 6px;
    padding: 1px 7px;
    font-size: 14px;
    line-height: 20px;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 6px 16px -2px rgba(0, 0, 0, 0.06);
    border-radius: 2px;
    vertical-align: top;
`;

export function Badge(props: React.PropsWithChildren<{}>) {
    const { children } = props;
    return <BadgeWrapper>{children}</BadgeWrapper>;
}
