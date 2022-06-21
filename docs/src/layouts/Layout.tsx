import { Content } from './Content';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import styled from 'styled-components';

const NavigationWrapper = styled(Navigation)`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin-left: 250px;
`;

const HeaderWrapper = styled(Header)`
    position: relative;
    left: -250px;
    padding-left: 250px;
    width: calc(100% + 250px);
    margin-bottom: 48px;
`;

const ContentWrapper = styled(Content)`
    flex: 1;
`;

export function Layout() {
    return (
        <div>
            <NavigationWrapper />
            <Main>
                <HeaderWrapper />
                <ContentWrapper />
                <Footer />
            </Main>
        </div>
    );
}
