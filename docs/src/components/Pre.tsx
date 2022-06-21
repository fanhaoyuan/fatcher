import { MediaScreen } from '@/utils';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Wrapper = styled.pre`
    margin-left: -16px;
    margin-right: -16px;
    background-color: rgb(39, 41, 53);
    border-radius: 0px;
    padding: 1rem 0;
    font-family: Menlo, 'Dank Mono', Inconsolata, 'Operator Mono', Consolas, 'Andale Mono WT', 'Andale Mono',
        'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono',
        'Nimbus Mono L', 'Courier New', Courier, monospace;
    font-size: 1em;
    color: #c8d3f5;
    overflow-x: auto;
    border-radius: 10px;

    @media (min-width: 576px) {
        border-radius: 10px;
        font-size: 16px;
    }

    ${MediaScreen.LG} {
        margin-left: -25px;
        margin-right: -25px;
    }

    .prismjs {
        padding: 0 1.5rem;
    }
`;

export function Pre(props: PropsWithChildren<{}>) {
    const { children } = props;
    return <Wrapper>{children}</Wrapper>;
}
