/* eslint-disable max-nested-callbacks */
import { describe } from '@jest/globals';
import { fatcher } from 'fatcher';
import { progress } from '../src';

describe('Empty Response', () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Response();
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Never process callback', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [progress()],
      onDownloadProgress: () => {
        throw new Error('processed.');
      },
    });
    expect(response.body).toBe(null);
  });
});
