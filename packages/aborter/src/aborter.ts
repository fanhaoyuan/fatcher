import { Middleware } from 'fatcher';
import { AbortReason, AborterOptions, RoadMap } from './interfaces';

const roadMap: RoadMap = {};

/**
 * A middleware for aborting fatcher request.
 * @param options
 * @returns
 */
export function aborter(options: AborterOptions = {}): Middleware {
    const { timeout = 0, onAbort = null, concurrency, groupBy } = options;

    let _timeout = timeout;

    if (isNaN(timeout) || ~~timeout < 0) {
        console.warn('[fatcher-middleware-aborter] Timeout is not a valid number.');
        _timeout = 0;
    }

    return {
        name: 'fatcher-middleware-aborter',
        async use(context, next) {
            const abortController = new AbortController();

            const { abort, signal } = abortController;

            const requestTask = next({ signal });

            const group =
                groupBy?.(context) ??
                `${context.url}_${context.method}_${new URLSearchParams(context.params).toString()}`;

            // Setup road map before response
            if (roadMap[group]?.length && concurrency) {
                // If has other request in group. Abort them.
                roadMap[group].forEach(item => {
                    item.abort('concurrency');
                });
            }

            roadMap[group] ??= [];

            const trigger = (reason: AbortReason) => {
                abort.call(abortController);
                onAbort?.(reason);
            };

            roadMap[group].push({
                abort: trigger,
                timer: _timeout ? setTimeout(() => trigger('timeout'), _timeout) : null,
                signal,
            });

            // Cleanup with abort event triggered.
            signal.addEventListener('abort', () => {
                roadMap[group] = roadMap[group].filter(item => {
                    if (item.signal === signal) {
                        if (item.timer) {
                            clearTimeout(item.timer);
                        }

                        return false;
                    }

                    return true;
                });

                if (!roadMap[group].length) {
                    delete roadMap[group];
                }
            });

            return requestTask;
        },
    };
}
