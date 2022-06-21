import { Content } from './Content';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import styled from 'styled-components';
import { MediaScreen } from '@/utils';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

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
    transition: all ease-in-out 0.15s;

    ${MediaScreen.LG} {
        margin-left: 250px;
    }
`;

const HeaderWrapper = styled(Header)`
    position: relative;
    margin-bottom: 48px;
    left: 0;
    padding-left: 0;
    width: 100%;

    ${MediaScreen.LG} {
        left: -250px;
        padding-left: 250px;
        width: calc(100% + 250px);
    }
`;

const Wrapper = styled.div`
    ${(props: { visible: boolean }) =>
        props.visible &&
        `
         ${NavigationWrapper} {
            visibility: visible;
            opacity: 1;
            transform: none;
        }
    `}

    ${MediaScreen.LG} {
        ${NavigationWrapper} {
            visibility: visible;
            opacity: 1;
            transform: none;
        }
    }
`;

const ContentWrapper = styled(Content)`
    flex: 1;
`;

export function Layout() {
    const [visible, setVisible] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setVisible(false);
    }, [location]);

    return (
        <Wrapper visible={visible}>
            <NavigationWrapper onCloseIconClick={() => setVisible(false)} />
            <Main>
                <HeaderWrapper onCollapseIconClick={() => setVisible(true)} />
                <ContentWrapper />
                <Footer />
            </Main>
        </Wrapper>
    );
}
