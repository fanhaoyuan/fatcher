export function getPrototypeString(value: unknown): string {
  return Object.prototype.toString.call(value);
}
