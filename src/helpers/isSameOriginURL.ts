import { isAbsoluteURL } from './isAbsoluteURL';

/**
 * Confirm a url is same origin with current location
 * @param url url to confirm
 * @returns
 */
export function isSameOriginURL(url: string) {
    if (!isAbsoluteURL(url)) {
        return true;
    }

    if (typeof location === 'undefined') {
        return true;
    }

    const regExp = new RegExp(`^${location.origin}`);

    // const REG_EXP = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?(:\d+)?/;

    const URLMatch = url.match(regExp);

    return !!URLMatch;
}
