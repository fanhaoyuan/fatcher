import defineMiddleware from './defineMiddleware';
import FatcherError from './FatcherError';

export default defineMiddleware({
    name: 'fatcher-middleware-fetch',
    async use(context) {
        const { validateCode } = context;

        const response = await fetch(context.url);

        if (validateCode?.(response.status)) {
            return response;
        }

        if (response.ok) {
            return response;
        }

        return Promise.reject(new FatcherError(context, response));
    },
});
