import { createContext } from '../src/core/createContext';
import { isFatcherError, FatcherError } from '../src';

describe('Errors', () => {
    let fatcherError: FatcherError;

    const context = createContext({
        url: '/errors/test',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const responseBody = {
        userId: 'test',
        userName: 'fatcher',
    };

    const response = new Response(JSON.stringify(responseBody), {
        status: 404,
        headers: context.headers,
    });

    it('FatcherError', () => {
        fatcherError = new FatcherError(context, response);

        const json = fatcherError.toJSON();

        expect(json.context).toStrictEqual(context);
        expect(json.status).toBe(404);
        expect(json.headers['content-type']).toBe(context.headers.get('Content-Type'));
    });

    it('isFatcherError', () => {
        expect(isFatcherError(fatcherError)).toBe(true);
        expect(isFatcherError(new Error())).toBe(false);
    });
});
