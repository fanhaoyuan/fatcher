import { Command } from 'commander';
import * as path from 'path';
import { resolveConfig } from '../src/node/resolveConfig';
import { generator } from '../src/node/generator';
import * as fs from 'fs';
import glob from 'fast-glob';
import { MockConfig } from '../src/interfaces';

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

        const paths = await glob(`${workspace}/**/*.mock.(j|t)s`);

        let configs: MockConfig[] = [];

        for await (const p of paths) {
            const config = await resolveConfig(p);
            configs = configs.concat(config);
        }

        const sw = await generator(configs);

        fs.writeFileSync(path.resolve(__dirname, '../sw.js'), sw);
    });

program.parse(process.argv);
