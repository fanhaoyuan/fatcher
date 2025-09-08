import { describe } from '@jest/globals';
import { fatcher } from 'fatcher';
import { parameters, ParameterSerializer } from '../src';

describe('Serializer', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation((request: Request) => {
      const [, querystring] = request.url.split('?');
      return new Response(querystring);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Custom Serializer', async () => {
    const serializer: ParameterSerializer = () => {
      return 'bar=foo';
    };

    const response = await fatcher('https://foo.bar', {
      params: {
        foo: 'bar',
      },
      serializer,
      middlewares: [parameters],
    });

    const result = await response.text();
    expect(result).toBe('bar=foo');
  });

  it('Custom Serializer', async () => {
    const serializer: ParameterSerializer = () => {
      return '';
    };

    const response = await fatcher('https://foo.bar', {
      params: {
        foo: 'bar',
      },
      serializer,
      middlewares: [parameters],
    });

    expect(response.body).toBe(null);
  });

  it('Custom Serializer Ignore undefined value', async () => {
    const response = await fatcher('https://foo.bar', {
      params: {
        foo: 'bar',
        count: undefined,
      },
      middlewares: [parameters],
    });

    const result = await response.text();
    expect(result).toBe('foo=bar');
  });
});
