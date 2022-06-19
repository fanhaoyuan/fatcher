import styles from './index.module.css';
import { PrismLight } from 'react-syntax-highlighter';
import { PropsWithChildren, useMemo } from 'react';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import diff from 'react-syntax-highlighter/dist/esm/languages/prism/diff';
import './theme.css';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

PrismLight.registerLanguage('jsx', jsx);
PrismLight.registerLanguage('javascript', javascript);
PrismLight.registerLanguage('typescript', typescript);
PrismLight.registerLanguage('tsx', tsx);
PrismLight.registerLanguage('bash', bash);
PrismLight.registerLanguage('css', css);
PrismLight.registerLanguage('diff', diff);

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
        <code className={styles.code}>{children}</code>
    );
}
