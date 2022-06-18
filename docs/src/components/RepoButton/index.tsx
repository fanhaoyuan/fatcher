import { useAppContext } from '@/app.context';
import { useMemo } from 'react';
import styles from './index.module.css';
import { GithubOutlined, ShareAltOutlined } from '@ant-design/icons';
import classnames from 'classnames';

const github = 'https://github.com';

export interface RepoButtonProps {
    className?: string;
}

export function RepoButton(props: RepoButtonProps) {
    const { className } = props;

    const { repository } = useAppContext();

    const host = useMemo(() => (repository?.includes(github) ? 'Github' : 'Source'), [repository]);

    const Icon = useMemo(() => (repository?.includes(github) ? GithubOutlined : ShareAltOutlined), [repository]);

    return (
        <a className={classnames(styles.repoButton, className)} target='_blank' rel='noreferrer' href={repository}>
            <Icon className={styles.icon} /> View on {host}
        </a>
    );
}
