import chokidar from 'chokidar';
import * as path from 'path';
import * as builder from './builder';
import chalk from 'chalk';

const watcher = chokidar.watch(path.resolve(__dirname, '../src'), {
    persistent: true,
});

watcher.on('change', () => {
    console.log(chalk.blueBright('Files changed. Rebuilding...'));

    builder.builder(true);
});

console.log(chalk.blueBright('watching for file changes...'));
console.log();
console.log();

builder.builder(true);
