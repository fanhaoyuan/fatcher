import fetchMock from 'jest-fetch-mock';
import methods from './methods';
import { BASE_URL } from './utils';

fetchMock.mockIf(/^https:\/\/fatcher\.mock\.com\/.*/, async request => {
    const url = request.url.replace(BASE_URL, '/');

    if (url.startsWith('/errors/')) return errors(request);
    if (url.startsWith('/methods/')) return methods(request);

    return {
        status: 404,
        body: 'Not Found',
    };
});

fetchMock.enableMocks();
