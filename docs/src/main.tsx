import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Router } from './app.routes';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App>
            <Router />
        </App>
    </StrictMode>
);
