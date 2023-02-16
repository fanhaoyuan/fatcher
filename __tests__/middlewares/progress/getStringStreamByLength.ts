import { getRandomString } from './getRandomString';
import { getStringStream } from './getStringStream';

export function getStringStreamByLength(length: number, chunkSize: number) {
    return getStringStream(getRandomString(length), chunkSize);
}
