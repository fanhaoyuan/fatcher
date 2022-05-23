import { canActivate, Middleware } from 'fatcher';

export const BASE_URL = 'https://fatcher.virtual';

function json(): Middleware {
    return {
        name: 'fatcher-middleware-json',
        async use(context, next) {
            const result = await next();
            if (canActivate(result.data)) {
                const clonedResponse = result.data.clone();
                try {
                    const data = await clonedResponse.json();
                    return Object.assign(result, { data });
                } catch (e) {
                    //nothing...
                }
            }
            return result;
        },
    };
}

export { json };
