import * as fs from 'fs-extra';
import * as path from 'path';

(function syncReadme() {
    const readme = fs.readFileSync(path.resolve(__dirname, '../../../README.md'));

    fs.writeFileSync(path.resolve(__dirname, '../README.md'), readme, 'utf-8');
})();
