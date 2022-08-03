import { temporary } from '../src/node/temporary';
import * as fs from 'fs-extra';

describe('Temporary', () => {
    it('Generate a temporary file', async () => {
        await temporary('export default []', temporaryPath => {
            expect(fs.existsSync(temporaryPath)).toBe(true);
        });
    });

    it('Temporary file will remove after handler resolve', async () => {
        let path: string;

        await temporary('export default []', temporaryPath => {
            path = temporaryPath;
            expect(fs.existsSync(temporaryPath)).toBe(true);
        });

        expect(fs.existsSync(path!)).toBe(false);
    });
});
