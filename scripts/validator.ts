import * as path from 'path';
import * as fs from 'fs';
/**
 * Check commit message whether a valid message format.
 * @param message
 */
function validator(message: string) {
    const REG_EXP = new RegExp(
        `^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|release)(\\(.+\\))?: .{1,50}`
    );

    if (!REG_EXP.test(message)) {
        console.error(`<${message}> is an invalid commit message format.`);
        process.exit(1);
    }
}

const messagePath = path.resolve(process.cwd(), process.argv[process.argv.length - 1]);

validator(fs.readFileSync(messagePath, 'utf-8').trim());
