import { Content } from '../Content';
import { Header } from '../Header';
import { Navigation } from '../Navigation';
import { Footer } from '../Footer';
import styles from './index.module.css';

export function BasicLayout() {
    return (
        <div className={styles.layout}>
            <Navigation className={styles.nav} />
            <main className={styles.main}>
                <Header className={styles.header} />
                <Content className={styles.content} />
                <Footer className={styles.footer} />
            </main>
        </div>
    );
}
