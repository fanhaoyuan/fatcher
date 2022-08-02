import { Command } from 'commander';
import * as path from 'path';
import { resolveConfig } from '../src/node/resolveConfig';
import { generator } from '../src/node/generator';
import * as fs from 'fs';

const program = new Command();

const cwd = process.cwd();

const resolve = (...paths: string[]) => path.resolve(cwd, ...paths);

program
    .command('create')
    .description('Create service worker from templates')
    .option('-w, --workspace <dirPath>', 'Mock templates root dir')
    .action(async options => {
        let workspace = resolve('mock');

        if (options.workspace) {
            workspace = resolve(options.workspace);
        }

        const configs = await resolveConfig(workspace);

        const sw = await generator(configs);

        fs.writeFileSync(path.resolve(__dirname, '../sw.js'), sw);
    });

program.parse(process.argv);
