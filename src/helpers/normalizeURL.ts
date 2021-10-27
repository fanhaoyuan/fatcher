import { isAbsoluteURL } from './isAbsoluteURL';
/**
 * Normalize a url with `baseURL` and `url`
 *
 * @param baseURL
 * @param url
 */
export function normalizeURL(baseURL: string, url: string) {
    if (!url) {
        return baseURL;
    }
    /**
     * If baseURL is not set and url is a absolute url
     *
     * return url
     */
    if (isAbsoluteURL(url)) {
        return url;
    }

    return `${baseURL}/${url}`.replace(/\/\//g, '/');
}
