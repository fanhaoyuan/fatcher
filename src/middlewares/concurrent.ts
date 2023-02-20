import { defineMiddleware } from '../helpers';
import { Context } from '../interfaces';

export function concurrent(options: { groupBy?: (context: Readonly<Context>) => string }) {
    const { groupBy } = options;

    return defineMiddleware((context, next) => {
        const { signal, abort, params } = context;

        const group = groupBy ? groupBy(context) : `${context.url}_${context.method}_${new URLSearchParams(params)}`;

        return next();
    }, 'fatcher-middleware-concurrent');
}

// const concurrencyAborter = defineMiddleware(async (context, next) => {
//     const { signal, abort } = context as AborterMiddlewareContext;

//     // Resolve concurrency
//     if (roadMap[group] && roadMap[group].length) {
//         roadMap[group].forEach(item => item.abort());
//     }

//     // Setup current request
//     if (!roadMap[group]) {
//         roadMap[group] = [];
//     }

//     roadMap[group].push({ abort, signal });

//     const release = () => {
//         roadMap[group] = roadMap[group].filter(item => {
//             // Keep signals which is not aborted.
//             return item.signal !== signal;
//         });

//         if (!roadMap[group].length) {
//             delete roadMap[group];
//         }
//     };

//     // Cleanup with abort event triggered.
//     signal.addEventListener('abort', release);

//     const result = await next();

//     // Release current request
//     release();

//     return result;
// }, 'fatcher-middleware-concurrency-aborter');
