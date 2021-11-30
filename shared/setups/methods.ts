import { RequestMethod } from 'fatcher';
import fetchMock from 'jest-fetch-mock';
import Mock from 'mockjs';

function response(request: Request, method: RequestMethod) {
    if (request.method !== method.toUpperCase()) {
        return {
            status: 405,
        };
    }

    return {
        status: 200,
        body: JSON.stringify({
            mockId: Mock.mock('@guid'),
            method,
        }),
    };
}

fetchMock.mockIf(/^https:\/\/fatcher\.mock\.com\/methods\/.*/, async request => {
    if (request.url.endsWith('/get')) return response(request, 'get');
    if (request.url.endsWith('/post')) return response(request, 'post');
    if (request.url.endsWith('/put')) return response(request, 'put');
    if (request.url.endsWith('/delete')) return response(request, 'delete');
    if (request.url.endsWith('/head')) return response(request, 'head');
    if (request.url.endsWith('/options')) return response(request, 'options');
    if (request.url.endsWith('/patch')) return response(request, 'patch');

    return {
        status: 404,
        body: 'Not Found',
    };
});
