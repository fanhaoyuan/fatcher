import { defineMiddleware } from 'fatcher';
import { MockOptions } from './interfaces';
import { parser } from '../parser';
import { checker } from './checker';
import { MOCK_HEADER_KEY } from '../utils';
import { isNodeJS } from '@fatcherjs/utils-shared';

export function mock(options: MockOptions = {}) {
    const { enabled = process.env.NODE_ENV !== 'production', schema } = options;

    return [
        !isNodeJS() ? checker() : null,
        defineMiddleware(async (context, next) => {
            if (enabled) {
                if (schema) {
                    // 有行内 mock，直接 mock
                    return {
                        status: 200,
                        statusText: 'ok',
                        data: parser(schema),
                        headers: new Headers({
                            'content-type': 'application/json',
                        }),
                        url: context.url!,
                    };
                }

                // 没有行内 mock，添加请求头。
                context.requestHeaders.set(MOCK_HEADER_KEY, 'true');

                const response = await next();

                const headers = new Headers(response.headers);

                if (response.headers.has(MOCK_HEADER_KEY)) {
                    // 接收到 mock 的响应头 就应该返回一个 schema
                    // 这里返回 mock 数据
                    headers.delete(MOCK_HEADER_KEY);
                }

                return response;
            }

            return next();
        }, 'fatcher-middleware-mock'),
    ];
}
