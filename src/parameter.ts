import defineMiddleware from './defineMiddleware';

/**
 * Wrap context params to url.
 */
const parameter = defineMiddleware({
    name: 'fatcher-middleware-parameter',
    async use(context, next) {
        const { params } = context;

        if (!params) {
            return next();
        }

        // eslint-disable-next-line prefer-const
        let [base, querystring] = context.url.split('?');

        if (querystring) {
            for (const [key, value] of new URLSearchParams(querystring)) {
                // Prefer Context Params.
                if (params[key]) {
                    continue;
                }

                params[key] = value;
            }
        }

        querystring = Object.keys(params)
            .reduce<string[]>((result, key) => {
                const value = params[key];

                if (typeof value === 'undefined') {
                    return result;
                }

                // Avoid some error in querystring. Just like emoji
                return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(value)}`];
            }, [])
            .join('&');

        return next({ url: `${base}?${querystring}`, params });
    },
});

export default parameter;
