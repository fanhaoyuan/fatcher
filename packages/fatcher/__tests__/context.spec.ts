import { PatchContext } from '../src';
import { createContext } from '../src/createContext';
import { combine } from '../src/utils';

describe('Context', () => {
    it('createContext', () => {
        const base = '/';
        const url = '/test';

        const context = createContext({ base, url });

        expect(context.base).toBe(base);
        expect(context.url).toBe(url);
    });

    it('createContext without url', () => {
        try {
            createContext({ base: '/' });
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
        const context = createContext({
            url: '/a/test/',
            method: 'POST',
            base: '/a/',
            credentials: 'same-origin',
        });

        const patchContext: PatchContext = {
            url: '/b/test',
            method: 'PATCH',
            headers: new Headers({}),
        };

        const mergedContext = combine(context, patchContext);

        expect(mergedContext.url).toBe(patchContext.url);
        expect(mergedContext.base).toBe(context.base);
        expect(mergedContext.credentials).toBe(context.credentials);
        expect(mergedContext.headers).toStrictEqual(patchContext.headers);
    });

    it('mergeContext with headers', () => {
        const context = createContext({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Origin: 'origin',
            },
        });

        const patchContext: PatchContext = {
            headers: new Headers({
                'Content-Type': 'application/json',
                Test: 'test',
            }),
        };

        const patchContextWithEmptyHeaders: PatchContext = {};

        const mergedContext = combine(context, patchContext, patchContextWithEmptyHeaders);

        // expect(mergedContext.headers!['Content-Type']).toBe(patchContext.headers!['Content-Type']);
        // expect(mergedContext.headers!['Test']).toBe(mergedContext.headers!['Test']);
        // expect(mergedContext.headers!['Origin']).toBe(context.headers!['Origin']);

        expect(mergedContext.headers.get('origin')).toBe('origin');
    });
});
