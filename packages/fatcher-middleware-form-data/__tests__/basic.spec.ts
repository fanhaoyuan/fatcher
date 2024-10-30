import { fatcher } from 'fatcher';
import { formData } from '../src';
import { isFormDataString } from './isFormDataString';

describe('Basic', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(async (request: Request) => {
      return new Response(JSON.stringify({ isFormData: isFormDataString(await request.text()) }));
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Basic Using', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [formData()],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: {
        foo: 'bar',
        test: 'a',
        b: new Blob(['1']),
      },
    });

    expect(await response.json()).toEqual({ isFormData: true });
  });

  it('Origin FormData', async () => {
    const body = new FormData();

    body.append('foo', 'bar');

    const response = await fatcher('https://foo.bar', {
      middlewares: [formData()],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body,
    });

    expect(await response.json()).toEqual({ isFormData: true });
  });

  it('Array Value', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [formData()],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: {
        foo: ['bar', 'bar1'],
      },
    });

    expect(await response.json()).toEqual({ isFormData: true });
  });
});
