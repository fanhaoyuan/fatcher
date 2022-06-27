import * as fs from 'fs-extra';
import * as path from 'path';
import glob from 'fast-glob';

const logs = fs
    .readFileSync(path.resolve(__dirname, '../CHANGELOG.md'), 'utf-8')
    .split('\n')
    .filter(item => !!item);

const versions: [string, [string, string][]][] = [];

for (let i = 0; i < logs.length; i++) {
    const value = logs[i];

    if (value.startsWith('## ')) {
        versions.push([value.slice(3), []]);
        continue;
    }

    if (value.startsWith('### ')) {
        versions[versions.length - 1][1].push([value.slice(4), '\n']);
        continue;
    }

    const arr = versions[versions.length - 1][1];

    arr[arr.length - 1][1] += `${value}\n`;
}

const groups = new Map<string, string>();

for (const [tag, contents] of versions) {
    for (const [name, log] of contents) {
        if (!groups.has(name)) {
            groups.set(name, '');
        }

        groups.set(name, `${groups.get(name)} \n ## ${tag} ${log}`);
    }
}

(async () => {
    const match = await glob(path.resolve(__dirname, '../packages/*/package.json'));

    for await (const p of match) {
        const { name } = await fs.readJSONSync(p);

        if (groups.has(name)) {
            fs.writeFileSync(path.resolve(p, '../CHANGELOG.md'), groups.get(name)!, 'utf-8');
        }
    }
})();
