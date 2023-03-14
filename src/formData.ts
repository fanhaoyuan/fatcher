import defineMiddleware from './defineMiddleware';

export default defineMiddleware({
    name: 'fatcher-middleware-form-data',
    use(context, next) {
        const { headers } = context;

        const contentType = headers.get('content-type');

        if (contentType?.includes('multipart/form-data')) {
            headers.delete('content-type');
        }

        return next();
    },
});
