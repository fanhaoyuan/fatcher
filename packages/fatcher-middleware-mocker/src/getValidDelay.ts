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

        min = Math.min(min, max);
        max = Math.max(min, max);

        return Math.floor(Math.random() * (max - min)) + min;
    }

    return delay;
}
