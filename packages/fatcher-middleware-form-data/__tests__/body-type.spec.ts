import { fatcher } from 'fatcher';
import { formData } from '../src';
import { isFormDataString } from './isFormDataString';

describe('Body Type', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(async (request: Request) => {
      return new Response(
        JSON.stringify({
          isFormData: isFormDataString(await request.text()),
          isEmpty: !request.body,
        }),
      );
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Will ignore when body is empty', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [formData],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: null,
    });

    expect(await response.json()).toEqual({ isFormData: false, isEmpty: true });
  });

  it('Will Ignore when body is not plain object', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [formData],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: new Response(),
    });

    expect(await response.json()).toEqual({ isFormData: false, isEmpty: false });
  });
});
