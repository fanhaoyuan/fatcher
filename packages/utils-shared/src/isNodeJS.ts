/**
 * Check current env whether in node.js
 */
export const isNodeJS = !!(typeof process !== 'undefined' && process.versions && process.versions.node);
