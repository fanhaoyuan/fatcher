import { useMemo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
    text-align: center;
    padding: 25px 0;
    border-top: 1px solid rgba(0, 32, 128, 0.12);
    font-size: 85%;

    a {
        color: rgb(191, 195, 217);
    }

    a:hover {
        color: #fff;
    }
`;

export interface FooterProps {
    className?: string;
}

export function Footer(props: FooterProps) {
    const { className } = props;

    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <Wrapper className={className}>
            <p>&copy; {year} — MIT License</p>
            <p>
                Documentation built by <a href='https://github.com/fanhaoyuan/fando'>fando</a>
            </p>
        </Wrapper>
    );
}
