import glob from 'fast-glob';
import { MockConfig } from '../interfaces';
import { bundle } from './bundle';
import { temporary } from './temporary';

export async function resolveConfig(workspace: string) {
    const paths = await glob(`${workspace}/**/*.mock.(j|t)s`);

    let configs: MockConfig[] = [];

    for await (const path of paths) {
        // 如果是 ts 文件，先进行构建，再拿数据
        if (path.endsWith('.ts')) {
            const file = await bundle(path, 'cjs', true);

            // eslint-disable-next-line no-loop-func
            await temporary(file, temporaryPath => {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                configs = configs.concat(require(temporaryPath).default);
            });

            continue;
        }

        if (path.endsWith('.js')) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            configs = configs.concat(require(path));
            continue;
        }
    }

    return configs;
}
