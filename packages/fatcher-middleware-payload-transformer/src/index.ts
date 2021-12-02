import { Middleware } from 'fatcher';
import { supportedContentTypes } from './utils';
import { urlTransformer } from './url';
import { payloadTransformer } from './payload';
export * from './interfaces';

export default function transformer(): Middleware {
    return {
        name: 'fatcher-middleware-payload-transformer',
        apply({ options }) {
            if (!options.autoTransformPayload) {
                return false;
            }

            if (!Object.keys(options.payload).length) {
                return false;
            }

            return (
                options.method === 'get' ||
                supportedContentTypes.some(type => options.headers['Content-Type']?.includes(type))
            );
        },
        use(context, next) {
            if (context.options.method === 'get') {
                return urlTransformer(context, next);
            }

            return payloadTransformer(context, next);
        },
    };
}
