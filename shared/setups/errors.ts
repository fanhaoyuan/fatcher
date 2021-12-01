export default async function errors(request: Request) {
    if (request.url.endsWith('/500')) {
        return {
            status: 500,
        };
    }

    if (request.url.endsWith('/400')) {
        return {
            status: 400,
        };
    }

    return {
        status: 404,
        body: 'Not Found',
    };
}
