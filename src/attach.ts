export function attach<T extends Record<string, any>, R extends Record<string, any>>(
  target: T,
  source?: R,
): T {
  if (!source) {
    return target;
  }

  for (const key of Object.keys(source)) {
    if (!Object.hasOwn(Object.getPrototypeOf(target), key)) {
      // @ts-expect-error
      target[key] = source[key];
    }
  }

  return target;
}
