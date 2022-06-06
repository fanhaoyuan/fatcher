import path from 'path';
import * as fs from 'fs-extra';

/**
 * Update Readme from root
 */
async function syncReadme() {
    const en = await fs.readFile(path.resolve(__dirname, '../../../README.md'), 'utf-8');
    const cn = await fs.readFile(path.resolve(__dirname, '../../../README.zh-CN.md'), 'utf-8');

    await fs.writeFile(path.resolve(__dirname, '../README.md'), en, 'utf-8');
    await fs.writeFile(path.resolve(__dirname, '../README.zh-CN.md'), cn, 'utf-8');
}

(async function prerelease() {
    await syncReadme();
})();
