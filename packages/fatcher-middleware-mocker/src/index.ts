import { Middleware } from 'fatcher';
import { MockerOptions } from './interfaces';

export function mocker(inlineOptions: MockerOptions = {}): Middleware {
    return {
        name: 'fatcher-middleware-mocker',
        apply(context) {
            if (!inlineOptions.mock || !context.options.mock) {
                return false;
            }
            return true;
        },
        use(context, next) {
            return next();
        },
    };
}
