import { getPrototypeString } from './getPrototypeString';

export function isPlainObject(value: unknown): value is Record<string, any> {
  return getPrototypeString(value) === '[object Object]';
}
