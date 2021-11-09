import 'fatcher';
import { MockerOptions } from './interfaces';

declare module 'fatcher' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface RequestOptions extends MockerOptions {}
}
