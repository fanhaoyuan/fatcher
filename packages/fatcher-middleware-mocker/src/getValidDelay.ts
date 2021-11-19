/**
 * Format and return a valid delay option
 * @param delay option of delay
 * @returns
 *
 * A number of formatted delay
 */
export function getValidDelay(delay: number | number[]) {
    if (Array.isArray(delay)) {
        let [min, max] = delay;
        if (min === max) {
            return min;
        }

        min = Math.min(min, max, 0);
        max = Math.max(min, max, 1);

        return Math.floor(Math.random() * (max - min)) + min;
    }

    if (delay > 1) {
        return 1;
    }

    if (delay < 0) {
        return delay;
    }

    return delay;
}
