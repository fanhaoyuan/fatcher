import defineMiddleware from './defineMiddleware';
import FatcherError from './FatcherError';

export default defineMiddleware({
    name: 'fatcher-middleware-fetch',
    async use(context) {
        const { validateCode, url, ...rest } = context;

        const response = await fetch(url, rest);

        if (validateCode?.(response.status)) {
            return response;
        }

        if (response.ok) {
            return response;
        }

        return Promise.reject(new FatcherError(context, response));
    },
});
