import { describe, expect, it } from 'vitest';
import { defineMiddleware, FatcherMiddleware } from '../src';
import { registerMiddlewares } from '../src/registerMiddlewares';

describe('Register Middlewares', () => {
  const a = defineMiddleware(async () => {
    return new Response();
  });

  const b = defineMiddleware(async () => {
    return new Response();
  });

  const c = defineMiddleware({
    name: 'c',
    use: async () => new Response(),
  }) as FatcherMiddleware;

  it('Register Middleware groups', () => {
    const middlewares = registerMiddlewares([a, b, c]);
    expect(middlewares[0]).toBe(a);
    expect(middlewares[1]).toBe(b);
    expect(middlewares[2]).toBe(c.use);
  });

  it('Register Middleware groups', () => {
    const middlewares = registerMiddlewares([a, [b, c]]);
    expect(middlewares[0]).toBe(a);
    expect(middlewares[1]).toBe(b);
    expect(middlewares[2]).toBe(c.use);
  });

  it('Register Named Middleware twice', () => {
    const middlewares = registerMiddlewares([
      [c, a],
      [b, c],
    ]);
    expect(middlewares[0]).toBe(c.use);
    expect(middlewares[1]).toBe(a);
    expect(middlewares[2]).toBe(b);
  });

  it('Register Functional Middleware twice', () => {
    const middlewares = registerMiddlewares([
      [a, b],
      [b, c],
    ]);
    expect(middlewares[0]).toBe(a);
    expect(middlewares[1]).toBe(b);
    expect(middlewares[2]).toBe(b);
    expect(middlewares[3]).toBe(c.use);
  });
});
