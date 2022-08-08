import { Middleware } from 'fatcher';
import { isNodeJS } from '@fatcherjs/utils-shared';

let isActive = false;

async function setup() {
    const mounted = (event: MessageEvent) => {
        if (event.data && Array.isArray(event.data) && event.data[1] === 'activated') {
            isActive = true;
        }

        navigator.serviceWorker.removeEventListener('message', mounted);
    };

    navigator.serviceWorker.addEventListener('message', mounted);
}

if (!isNodeJS) {
    setup();
}

export function checker(): Middleware {
    return {
        name: 'fatcher-middleware-service-worker-checker',
        async use(context, next) {
            // All mock request should waiting service worker setup done。
            if (!isActive) {
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
            }
            return next();
        },
    };
}
