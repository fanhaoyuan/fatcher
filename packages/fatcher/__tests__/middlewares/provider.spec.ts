import { fatcher, Middleware } from '../../src';

describe('Middleware providers', () => {
    it('Middleware can visible provided context in use()', () => {
        const provider = (): Middleware => {
            const aborterController = new AbortController();

            return {
                name: 'fatcher-middleware-aborter-signal-provider',
                provides() {
                    return {
                        signal: aborterController.signal,
                    };
                },
                use(context) {
                    expect(aborterController.signal === context.signal).toBe(true);

                    return {
                        status: 200,
                        statusText: 'ok',
                        data: null,
                        headers: new Headers(),
                        url: context.url!,
                    };
                },
            };
        };

        fatcher({ middlewares: [provider], url: '/provide' });
    });

    it('Middlewares is hoisting provided context', () => {
        const aborterController = new AbortController();

        const provider1 = (): Middleware => {
            return {
                name: 'fatcher-middleware-provider-1',
                use(context, next) {
                    expect(aborterController.signal === context.signal).toBe(true);

                    return next();
                },
            };
        };

        const provider2 = (): Middleware => {
            return {
                name: 'fatcher-middleware-provider-2',
                provides() {
                    return {
                        signal: aborterController.signal,
                    };
                },
                use(context) {
                    return {
                        status: 200,
                        statusText: 'ok',
                        data: null,
                        headers: new Headers(),
                        url: context.url!,
                    };
                },
            };
        };

        fatcher({ middlewares: [provider1, provider2], url: '/provides' });
    });
});
