import fetchMock from 'jest-fetch-mock';
import errors from './errors';
import methods from './methods';
import mock from './mock';
import { BASE_URL } from './utils';

fetchMock.mockIf(/^https:\/\/fatcher\.mock\.com\/.*/, async request => {
    const url = request.url.replace(BASE_URL, '/');

    if (url.startsWith('/errors/')) return errors(request);
    if (url.startsWith('/methods/')) return methods(request);
    if (url.startsWith('/mock/')) return mock(request);

    return {
        status: 404,
        body: 'Not Found',
    };
});

fetchMock.enableMocks();
