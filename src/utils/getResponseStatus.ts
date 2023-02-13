export const ResponseStatusMap = {
    200: 'OK',
    400: 'Bad Request',
    405: 'Method Not Allowed',
    500: 'Internal Server Error',
};

/**
 * Get response status object with status code
 */
export function getResponseStatus(status: keyof typeof ResponseStatusMap) {
    return {
        status,
        statusText: ResponseStatusMap[status],
    };
}
