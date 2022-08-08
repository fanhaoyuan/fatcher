import Schema, { Rules } from 'async-validator';

export async function paramsValidator(params: string | Record<string, string>, rules: Rules) {
    let searchParams: Record<string, any>;

    if (typeof params === 'string') {
        searchParams = {};

        for (const [key, value] of new URLSearchParams(params)) {
            searchParams[key] = value;
        }
    } else {
        searchParams = params;
    }

    await new Schema(rules).validate(searchParams);

    return null;
}
