import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './GlobalStyle';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
        <GlobalStyle />
    </StrictMode>
);
