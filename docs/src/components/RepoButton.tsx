import { useAppContext } from '@/app.context';
import { GithubOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import styled from 'styled-components';

const Wrapper = styled.a`
    color: #000;
    font-weight: 500;
    background-color: rgba(255, 255, 255, 0.4);
    text-decoration: none;
    padding: 12px 24px;
    border-radius: 4px;
    transition: all 0.25s;
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    :hover {
        background-color: #fff;
        text-decoration: none;
        box-shadow: 0 8px 16px -2px rgb(0 32 128 / 25%);
        color: #2263e5;
    }
`;

const Icon = styled(GithubOutlined)`
    color: #000;
    font-size: 24px;
    margin-right: 8px;
`;

export interface RepoButtonProps {
    className?: string;
}

export function RepoButton(props: RepoButtonProps) {
    const { className } = props;

    const { repository } = useAppContext();

    return (
        <Wrapper className={classnames(className)} target='_blank' rel='noreferrer' href={repository}>
            <Icon /> View on Github
        </Wrapper>
    );
}
