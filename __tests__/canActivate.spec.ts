import { canActivate } from '../src';

describe('Confirm response whether can be activated', () => {
  it('Plain object can not be activated', () => {
    expect(canActivate({})).toBe(false);
  });

  it('Number can not be activated', () => {
    expect(canActivate(1)).toBe(false);
  });

  it('NaN can not be activated', () => {
    expect(canActivate(NaN)).toBe(false);
  });

  it('Array can not be activated', () => {
    expect(canActivate([])).toBe(false);
  });

  it('String can not be activated', () => {
    expect(canActivate('test')).toBe(false);
  });

  it('Boolean can not be activated', () => {
    expect(canActivate(true)).toBe(false);
  });

  it('Function can not be activated', () => {
    expect(canActivate(() => void 0)).toBe(false);
  });

  it('Response with data can be activated', () => {
    expect(canActivate(new Response('test'))).toBe(true);
  });

  it('Response without data can not be activated', () => {
    expect(canActivate(new Response())).toBe(false);
  });

  it('Response used body can no be activated', async () => {
    const res = new Response('test');

    await res.text();

    expect(canActivate(res)).toBe(false);
  });
});
