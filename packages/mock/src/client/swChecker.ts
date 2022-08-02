import { Middleware } from 'fatcher';

let isActive = false;

function mounted(event: MessageEvent) {
    if (event.data && Array.isArray(event.data) && event.data[1] === 'activated') {
        isActive = true;
    }

    navigator.serviceWorker.removeEventListener('message', mounted);
}

navigator.serviceWorker.addEventListener('message', mounted);

export function swChecker(): Middleware {
    return {
        name: 'fatcher-middleware-service-worker-state-checker',
        async use(context, next) {
            // All mock request should waiting service worker setup done。
            await new Promise(resolve => {
                const check = () => {
                    console.log('Checking service worker setup state.', 'Setup state:', isActive);
                    if (isActive) {
                        resolve(true);
                        return;
                    }
                    setTimeout(check, 1000);
                };
                check();
            });

            return next();
        },
    };
}
