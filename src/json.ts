import canActivate from './canActivate';
import defineMiddleware from './defineMiddleware';

export default defineMiddleware({
    name: 'fatcher-middleware-json',
    async use(context, next) {
        const response = await next();

        if (!canActivate(response)) {
            return response;
        }

        const clonedResponse = response.clone();

        try {
            /**
             * Clone a response to try.
             */
            const data = await clonedResponse.json();

            return data;
        } catch {
            /**
             * If transform error.
             *
             * Return origin result.
             */
        }

        return response;
    },
});
