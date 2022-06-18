import styles from './index.module.css';
import classnames from 'classnames';
import { RepoButton } from '@/components';
import { useAppContext } from '@/app.context';

export interface HeaderProps {
    className?: string;
}

export function Header(props: HeaderProps) {
    const { className } = props;

    const { logo, title, repository, version } = useAppContext();

    return (
        <header className={classnames(styles.header, className)}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>{logo && <img alt='logo' src={logo} />}</div>

                {title && <div className={styles.title}>{title}</div>}

                {repository && <RepoButton className={styles.button} />}

                {version && (
                    <a href={`${repository}/releases`} target='_blank' rel='noreferrer' className={styles.version}>
                        v{version}
                    </a>
                )}
            </div>

            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 240' fill='#1f2028' className={styles.mask}>
                <g>
                    <path d='M1920,144.5l0,95.5l-1920,0l0,-65.5c196,-36 452.146,-15.726 657.5,8.5c229.698,27.098 870,57 1262.5,-38.5Z'></path>
                </g>
            </svg>
        </header>
    );
}
