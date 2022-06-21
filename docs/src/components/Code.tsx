import { PrismLight } from 'react-syntax-highlighter';
import { PropsWithChildren, useMemo } from 'react';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';

PrismLight.registerLanguage('jsx', jsx);
PrismLight.registerLanguage('javascript', javascript);
PrismLight.registerLanguage('typescript', typescript);
PrismLight.registerLanguage('tsx', tsx);
PrismLight.registerLanguage('bash', bash);
PrismLight.registerLanguage('css', css);
PrismLight.registerLanguage('diff', diff);

const Wrapper = styled.code`
    color: rgb(129, 237, 255);
    font-family: Menlo, 'Dank Mono', Inconsolata, 'Operator Mono', Consolas, 'Andale Mono WT', 'Andale Mono',
        'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono',
        'Nimbus Mono L', 'Courier New', Courier, monospace;
    padding: 0.15em 0.25em;
    border-radius: 0.25em;
    line-height: inherit;
    font-size: 90%;
    background: none;
`;

export interface CodeBlockProps {
    className?: string;
}

export function Code(props: PropsWithChildren<CodeBlockProps>) {
    const { className, children } = props;

    const match = /language-(\w+)/.exec(className || '');

    const language = useMemo(() => {
        const map: Record<string, string> = {
            ts: 'typescript',
            js: 'javascript',
        };

        if (match) {
            const [, lang] = match;
            return map[lang] || lang;
        }
    }, []);

    return match ? (
        <PrismLight language={language} PreTag='div' useInlineStyles={false} style={atomDark}>
            {children as string}
        </PrismLight>
    ) : (
        <Wrapper>{children}</Wrapper>
    );
}
