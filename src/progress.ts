import defineMiddleware from './defineMiddleware';
import canActivate from './canActivate';

export default defineMiddleware({
    name: 'fatcher-middleware-progress',
    async use(context, next) {
        const { downloadProgress } = context;

        /**
         * Never apply this middleware when downloadProgress in not in context.
         *
         * Because it is useless.
         */
        if (!downloadProgress) {
            return next();
        }

        const response = await next();

        /**
         * If this stream read by other.
         *
         * We can not read it again.
         */
        if (!canActivate(response)) {
            return response;
        }

        const total = response.headers.get('content-length');

        if (!total || total === '0') {
            console.warn('[fatcher-middleware-progress]: Response body is null.');
            return response;
        }

        /**
         * Wrap a new readableStream for getting reading progress in real-time.
         */
        const readableStream = new ReadableStream<Uint8Array>({
            start(controller) {
                let current = 0;

                (async function push(reader: ReadableStreamDefaultReader<Uint8Array>) {
                    const { done, value } = await reader.read();

                    if (done) {
                        controller.close();
                        return;
                    }

                    controller.enqueue(value);
                    current += value.length;
                    downloadProgress(current, ~~total);
                    await push(reader);
                })(response.body!.getReader());
            },
        });

        return new Response(readableStream, response);
    },
});
