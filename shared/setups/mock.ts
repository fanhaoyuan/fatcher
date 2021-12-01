import Mock from 'mockjs';

export default async function mock(request: Request) {
    if (request.url.endsWith('/getAccountInfo')) {
        return {
            status: 200,
            body: JSON.stringify({
                id: Mock.mock('@id'),
                name: Mock.mock('@name'),
                email: Mock.mock('@email'),
                ip: Mock.mock('@ip'),
            }),
        };
    }
}
