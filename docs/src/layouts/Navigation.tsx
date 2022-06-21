import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/app.context';
import { DownOutlined } from '@ant-design/icons';
import { useLocalePath } from '@/hooks';
import styled, { css } from 'styled-components';

const Wrapper = styled.nav`
    width: 250px;
    overflow-y: auto;
    background-color: rgba(31, 32, 40, 0.6);
    transition: transform 0.5s ease 0.15s, visibility 0.15s 0s, opacity 0.15s 0s;

    @media (min-width: 992px) {
        padding-top: 0px;
        display: block;
        visibility: visible;
        transform: none;
        box-shadow: none;
        opacity: 1;
        will-change: transform, opacity;
        backdrop-filter: blur(30px) saturate(100%);
    }
`;

const NavigateToolbar = styled.div`
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
`;

const NavigationToolbarDropdownMenu = styled.div`
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    padding-top: 12px;
`;

const NavigationToolbarButton = styled.div`
    border: none;
    color: #fff;
    background: #424557;
    will-change: opacity;
    font-size: 16px;
    font-weight: 600;
    padding: 10px 16px;
    border-radius: 4px;
    transition: background 0.2s, color 0.2s;
    box-shadow: 0 1px 4px -2px black, inset 0 2px 1px -1px rgb(255 255 255 / 10%);
    background: #424557;
    color: #81edff;
    border: none;
    position: relative;

    :hover {
        background: white;
        color: black;

        > ${NavigationToolbarDropdownMenu} {
            display: block;
        }
    }
`;

const NavigationToolbarButtonIcon = styled(DownOutlined)`
    font-size: 14px;
    margin-left: 8px;
`;

const NavigationToolbarDropdownMenuList = styled.ul`
    color: #26323d;
    box-shadow: 0 0 20px 4px rgb(154 161 177 / 15%), 0 4px 80px -8px rgb(36 40 47 / 25%),
        0 4px 4px -2px rgb(91 94 105 / 15%);
    background-color: #fff;
    padding: 13px 17px;
    border-radius: 4px;
    margin: 0;
`;

const NavigationToolbarDropdownMenuListItem = styled.li`
    margin-bottom: 5px;
    margin-top: 0;
    list-style: none;
    cursor: pointer;

    :hover {
        text-decoration: underline;
    }
`;

const NavigateMenu = styled.ul`
    padding-left: 0;
    list-style: none;
    margin: 0;
`;

const navigationItemActive = css`
    color: white;
    font-weight: 600;
    border-width: 0;
    background: linear-gradient(to right, rgb(66, 69, 87), transparent);
`;

const NavigationItem = styled.li`
    margin: 0;

    > a {
        display: block;
        padding: 4px 25px;
        font-size: 17px;
        padding-left: 40px;
        color: inherit;
        text-decoration: none;
        transition: color 0.15s;

        :hover {
            color: white;
        }
    }

    ${(props: { active: boolean }) => (props.active ? navigationItemActive : '')}
`;

export interface NavigationItemOptions {
    title: string;
    path: string;
}

export interface NavigationProps {
    routes?: NavigationItemOptions[];
    className?: string;
}

export function Navigation(props: NavigationProps) {
    const { className } = props;

    const { pathname } = useLocation();

    const { currentRoutes, locale, locales, setLocal } = useAppContext();

    const navigateTo = useNavigate();

    const { getLocalePath } = useLocalePath();

    function onLocaleChange(loc: string) {
        if (loc === locale) {
            return;
        }

        setLocal(() => loc);

        navigateTo(getLocalePath(loc, pathname), { replace: true });
    }

    return (
        <Wrapper className={className}>
            <NavigateToolbar>
                <NavigationToolbarButton>
                    {locales.find(item => item[0] === locale)?.[1]}
                    <NavigationToolbarButtonIcon />

                    <NavigationToolbarDropdownMenu>
                        <NavigationToolbarDropdownMenuList>
                            {locales.map(item => {
                                return (
                                    <NavigationToolbarDropdownMenuListItem
                                        key={item[0]}
                                        onClick={() => onLocaleChange(item[0])}
                                    >
                                        {item[1]}
                                    </NavigationToolbarDropdownMenuListItem>
                                );
                            })}
                        </NavigationToolbarDropdownMenuList>
                    </NavigationToolbarDropdownMenu>
                </NavigationToolbarButton>
            </NavigateToolbar>

            <NavigateMenu>
                {currentRoutes?.map(router => {
                    const { meta, path } = router;

                    return (
                        <NavigationItem key={path} active={path === pathname}>
                            <Link to={path}>{meta.title}</Link>
                        </NavigationItem>
                    );
                })}
            </NavigateMenu>
        </Wrapper>
    );
}
