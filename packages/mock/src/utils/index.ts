export const MOCK_HEADER_KEY = 'x-fatcher-mock';

export const isNodeJS = typeof process !== 'undefined' && process.versions && process.versions.node;

export const ResponseStatusMap = {
    200: 'OK',
    400: 'Bad Request',
    405: 'Method Not Allowed',
    500: 'Internal Server Error',
};

export function getResponseStatus(status: keyof typeof ResponseStatusMap) {
    return {
        status,
        statusText: ResponseStatusMap[status],
    };
}
