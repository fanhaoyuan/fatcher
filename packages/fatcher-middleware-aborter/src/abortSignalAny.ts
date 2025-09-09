export function abortSignalAny(signals: AbortSignal[]) {
  // @ts-ignore
  if (typeof AbortSignal.any === 'function') {
    // @ts-ignore
    return AbortSignal.any(signals);
  }

  const abortController = new AbortController();

  const onAbort = () => {
    abortController.abort();
    // eslint-disable-next-line no-use-before-define
    cleanup();
  };

  const cleanup = () => {
    for (const signal of signals) {
      signal.removeEventListener('abort', onAbort);
    }
  };

  for (const signal of signals) {
    if (signal.aborted) {
      onAbort();
      break;
    }

    signal.addEventListener('abort', onAbort);
  }

  return abortController.signal;
}
