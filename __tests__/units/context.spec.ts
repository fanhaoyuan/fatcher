import { Context } from 'fatcher';
import { createContext, mergeContext } from 'fatcher/context';

describe('Context', () => {
    it('createContext', () => {
        const baseUrl = '/';
        const url = '/test';

        const context = createContext({ baseUrl, url });

        expect(context.baseUrl).toBe(baseUrl);
        expect(context.url).toBe(url);
    });

    it('createContext without url', () => {
        try {
            createContext({ baseUrl: '/' });
        } catch (error: any) {
            expect(error.message).toBe('__vp__ URL is required.');
        }
    });

    it('createContext with empty', () => {
        try {
            createContext({});
        } catch (error: any) {
            expect(error.message).toBe('__vp__ URL is required.');
        }
    });

    it('mergeContext without headers', () => {
        const context: Context = {
            url: '/a/test/',
            method: 'POST',
            baseUrl: '/a/',
            credentials: 'same-origin',
        };

        const patchContext: Partial<Context> = {
            url: '/b/test',
            method: 'PATCH',
            headers: {},
        };

        const mergedContext = mergeContext(context, patchContext);

        expect(mergedContext.url).toBe(patchContext.url);
        expect(mergedContext.baseUrl).toBe(context.baseUrl);
        expect(mergedContext.credentials).toBe(context.credentials);
        expect(mergedContext.headers).toStrictEqual(patchContext.headers);
    });

    it('mergeContext with headers', () => {
        const context: Context = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Origin: 'origin',
            },
        };

        const patchContext: Partial<Context> = {
            headers: {
                'Content-Type': 'application/json',
                Test: 'test',
            },
        };

        const patchContextWithEmptyHeaders: Partial<Context> = {};

        const mergedContext = mergeContext(context, patchContext, patchContextWithEmptyHeaders);

        expect(mergedContext.headers!['Content-Type']).toBe(patchContext.headers!['Content-Type']);
        expect(mergedContext.headers!['Test']).toBe(mergedContext.headers!['Test']);
        expect(mergedContext.headers!['Origin']).toBe(context.headers!['Origin']);
    });
});
