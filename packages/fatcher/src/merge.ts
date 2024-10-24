export function merge<
  T extends Record<string, any>,
  R extends Record<string, any>,
  V extends Record<string, any>,
>(target: T, source?: R, source1?: V): T {
  if (!source) {
    return target;
  }

  for (const key of Object.keys(source)) {
    // eslint-disable-next-line no-proto
    if (!Object.hasOwn(target.__proto__, key)) {
      // @ts-expect-error
      target[key] = source[key];
    }
  }

  if (source1) {
    return merge(target, source1);
  }

  return target;
}
