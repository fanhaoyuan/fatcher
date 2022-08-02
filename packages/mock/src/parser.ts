import { MockSchema } from './interfaces';
import { Random } from 'mockjs';

export function parser(schema: MockSchema) {
    const data = Object.create(null);

    for (const [key, value] of Object.entries(schema)) {
        data[key] = Random[value]();
    }

    return data;
}
