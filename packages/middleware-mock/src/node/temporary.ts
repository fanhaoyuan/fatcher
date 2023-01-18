import * as path from 'path';
import * as fs from 'fs-extra';

export type TemporaryHandler = (temporaryPath: string) => Promise<void> | void;

/**
 * Generate a temporary file for handle.
 * @param content
 * @param handler
 * @param extension
 */
export async function temporary(content: string, handler: TemporaryHandler, extension = '.js') {
    const temporaryPath = path.resolve(__dirname, `.temporary.${Date.now()}${extension}`);

    await fs.writeFile(temporaryPath, content);

    await handler(temporaryPath);

    await fs.remove(temporaryPath);
}
