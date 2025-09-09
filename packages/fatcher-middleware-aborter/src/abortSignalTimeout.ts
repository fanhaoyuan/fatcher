export function abortSignalTimeout(timeout: number) {
  // @ts-ignore
  if (typeof AbortSignal.timeout === 'function') {
    // @ts-ignore
    return AbortSignal.timeout(timeout);
  }

  const abortController = new AbortController();

  const timer = setTimeout(() => {
    abortController.abort();
  }, timeout);

  abortController.signal.addEventListener('abort', () => clearTimeout(timer));

  return abortController.signal;
}
