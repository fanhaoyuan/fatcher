import { Middleware } from '../../src';
import { composeMiddlewares, registerMiddlewares } from '../../src/middlewares';

describe('Middlewares', () => {
    let registeredMiddlewares: Middleware[];

    const functionMiddlewareName = 'fatcher-middleware-function';
    const objectMiddlewareName = 'fatcher-middleware-object';
    const errorMiddlewareName = 'fatcher-middleware-error';

    function functionMiddleware(): Middleware {
        return {
            name: functionMiddlewareName,
            use(context, next) {
                return next();
            },
        };
    }

    const objectMiddleware: Middleware = {
        name: objectMiddlewareName,
        use(context, next) {
            return next();
        },
    };

    function errorMiddleware(): Middleware {
        return {
            name: errorMiddlewareName,
            use(context, next) {
                next();
                return next();
            },
        };
    }

    const arrayMiddleware = [functionMiddleware, objectMiddleware];

    it('registerMiddlewares', async () => {
        registeredMiddlewares = await registerMiddlewares([
            functionMiddleware,
            errorMiddleware,
            arrayMiddleware,
            objectMiddleware,
        ]);

        expect(registeredMiddlewares.length).toBe(5);
        expect(registeredMiddlewares[0].name).toBe(functionMiddlewareName);
        expect(registeredMiddlewares[1].name).toBe(errorMiddlewareName);
        expect(registeredMiddlewares[2].name).toBe(functionMiddlewareName);
        expect(registeredMiddlewares[3].name).toBe(objectMiddlewareName);
        expect(registeredMiddlewares[4].name).toBe(objectMiddlewareName);
    });

    it('composeMiddlewares', async () => {
        const useMiddlewares = composeMiddlewares(registeredMiddlewares);

        try {
            await useMiddlewares({
                requestHeaders: new Headers(),
            });
        } catch (error) {
            expect(`Middleware <${errorMiddlewareName}> call next() more than once.`);
        }
    });

    it('useMiddlewares', async () => {
        const body = {
            id: 'test',
            name: 'fatcher',
        };

        const url = '/test';

        function middlewareA(): Middleware {
            return {
                name: 'fatcher-middleware-a',
                async use(context, next) {
                    expect(context.method).toBe('GET');
                    expect(context.url).toBe(url);
                    expect(context.headers!['Content-Type']).toBe('application/x-www-form-urlencoded');

                    const result = await next({
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    expect(result.status).toBe(404);

                    return result;
                },
            };
        }

        function middlewareB(): Middleware {
            return {
                name: 'fatcher-middleware-b',
                async use(context, next) {
                    expect(context.method).toBe('POST');
                    expect(context.url).toBe(url);
                    expect(context.payload).toBeNull();

                    const result = await next({
                        credentials: 'include',
                        headers: {
                            Test: 'test',
                        },
                    });

                    expect(result.status).toBe(200);

                    return {
                        ...result,
                        status: 404,
                        statusText: 'Not Found',
                    };
                },
            };
        }

        function middlewareC(): Middleware {
            return {
                name: 'fatcher-middleware-c',
                use(context) {
                    expect(context.credentials).toBe('include');
                    expect(context.payload).toBeNull();
                    expect(context.url).toBe(url);

                    expect(context.headers).toStrictEqual({
                        'Content-Type': 'application/json',
                        Test: 'test',
                    });

                    const response = new Response(JSON.stringify(body), { status: 200 });

                    return {
                        status: response.status,
                        statusText: response.statusText,
                        data: response,
                        headers: response.headers,
                        url: context.url || '',
                    };
                },
            };
        }

        const result = await composeMiddlewares(await registerMiddlewares([middlewareA, middlewareB, middlewareC]))({
            method: 'GET',
            url,
            payload: null,
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            requestHeaders: new Headers(),
        });

        expect(result.status).toBe(404);
        expect(result.url).toBe(url);

        const data = await result.data.json();

        expect(data.id).toBe(body.id);
        expect(data.name).toBe(body.name);
    });

    it('Presets Middlewares', async () => {
        const middlewareName = 'fatcher-middleware-middleware';
        const presetsName = 'fatcher-middleware-presets';

        const middleware = (): Middleware => {
            return {
                name: middlewareName,
                use(context, next) {
                    return next();
                },
                presets: [],
            };
        };

        const presets = (): Middleware => {
            return {
                name: presetsName,
                use(context, next) {
                    return next();
                },
                presets: [middleware],
            };
        };

        const middlewares = await registerMiddlewares([presets]);

        expect(middlewares[0].name).toBe(middlewareName);
        expect(middlewares[1].name).toBe(presetsName);
        expect(middlewares.length).toBe(2);
    });
});
