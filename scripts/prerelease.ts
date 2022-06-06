import glob from 'fast-glob';
import * as fs from 'fs-extra';
import path from 'path';
import { version } from '../package.json';

/**
 * Update version in all packages.
 */
async function updateVersion() {
    console.log('Version', version);

    const files = await glob(path.resolve(__dirname, '../packages', '*/package.json'));

    for await (const file of files) {
        const json = await fs.readJSON(file, 'utf-8');

        await fs.writeJSON(file, { ...json, version }, { encoding: 'utf-8', spaces: 4 });
    }
}

(async function prerelease() {
    console.log('\nPrerelease\n');

    await updateVersion();

    console.log();
})();
