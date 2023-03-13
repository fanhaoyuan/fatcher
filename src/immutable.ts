/**
 * Set a record to immutable record. Just read only.
 * @param record
 * @returns
 */
export default function immutable<T extends Record<string, any>>(record: T): Readonly<T> {
    return new Proxy(record, {
        set(_, key) {
            console.warn(`[Fatcher]: Context is immutable, ${String(key)} has not changed.`);
            return true;
        },
    });
}
