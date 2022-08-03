export function register(url: string) {
    return navigator.serviceWorker.register(`${url}?${Date.now()}`, { scope: './' });
}
