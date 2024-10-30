export function isNodeJs() {
  return typeof process !== 'undefined' && !!process.versions;
}
