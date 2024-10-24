import { describe, expect, it } from '@jest/globals';
import { FatcherError, isFatcherError } from '../src';

describe('Confirm a error whether is fatcher error', () => {
  it('Normal error is not fatcher error', () => {
    expect(isFatcherError(new Error())).toBe(false);
  });

  it('DOMException is not fatcher error', () => {
    expect(isFatcherError(new DOMException())).toBe(false);
  });

  it('FatcherError instance is a fatcher error', () => {
    // @ts-expect-error
    expect(isFatcherError(new FatcherError({}, new Response()))).toBe(true);
  });
});
