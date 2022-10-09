import { defineMiddleware, fatcher } from '../src';

describe('Middleware providers', () => {
    it('Middleware can visible provided context in use()', () => {
        const provider = () => {
            const aborterController = new AbortController();

            const middleware = defineMiddleware(context => {
                expect(aborterController.signal === context.signal).toBe(true);

                return {
                    status: 200,
                    statusText: 'ok',
                    data: null,
                    headers: new Headers(),
                    url: context.url!,
                };
            });

            middleware.provides = {
                signal: aborterController.signal,
            };

            return middleware;
        };

        fatcher({ middlewares: [provider()], url: '/provide' });
    });

    it('Middlewares is hoisting provided context', () => {
        const aborterController = new AbortController();

        const provider1 = () => {
            return defineMiddleware((context, next) => {
                expect(aborterController.signal === context.signal).toBe(true);
                return next();
            });
        };

        const provider2 = () => {
            const middleware = defineMiddleware(context => {
                return {
                    status: 200,
                    statusText: 'ok',
                    data: null,
                    headers: new Headers(),
                    url: context.url!,
                };
            });

            middleware.provides = () => {
                return {
                    signal: aborterController.signal,
                };
            };

            return middleware;
        };

        fatcher({ middlewares: [provider1(), provider2()], url: '/provides' });
    });
});
