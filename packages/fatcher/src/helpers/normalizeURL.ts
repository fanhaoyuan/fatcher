import { isAbsoluteURL } from './isAbsoluteURL';

function normalize(url: string) {
    let protocol: string;

    return url
        .replace(/http(s?):\/\//, (str: string) => {
            protocol = str;
            return '';
        })
        .replace(/\/\/(\/)?/g, '/')
        .replace(/.*\S/, str => (protocol ?? '') + str);
}

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
        return normalize(url);
    }

    if (baseURL === '/') {
        return url;
    }

    return normalize(`${baseURL}/${url}`);
}
