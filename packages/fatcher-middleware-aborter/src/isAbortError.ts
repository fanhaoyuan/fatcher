/**
 * Confirm an error whether is DOMException
 * @param error
 * @returns
 */
export function isAbortError(error: unknown): error is DOMException {
  return error instanceof DOMException && error.name === 'AbortError';
}
