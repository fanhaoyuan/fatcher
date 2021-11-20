/**
 * Confirm a url whether is a absolute url.
 * @param url url to confirm
 * @returns
 */
export function isAbsoluteURL(url: string) {
    return /^http(s)?:\/\/.+/.test(url);
}
