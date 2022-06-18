import './App.css';
import { AppContextProvider } from './app.context';
import { PropsWithChildren } from 'react';

export default function App(props: PropsWithChildren<{}>) {
    const { children } = props;
    return (
        <AppContextProvider>
            <div className='App'>{children}</div>
        </AppContextProvider>
    );
}
