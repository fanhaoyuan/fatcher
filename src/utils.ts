import { isDev } from '@fatcherjs/utils-shared';

export const VerbosityLevel = {
    ERRORS: 0,
    WARNINGS: 1,
    INFOS: 5,
} as const;

const verbosityLevel = isDev() ? VerbosityLevel.INFOS : VerbosityLevel.WARNINGS;

const VerbosityPrefix = '[Fatcher]';

export function log(message: string) {
    if (verbosityLevel >= VerbosityLevel.INFOS) {
        console.log(`${VerbosityPrefix} ${message}`);
    }
}

export function warn(message: string) {
    if (verbosityLevel >= VerbosityLevel.WARNINGS) {
        console.warn(`${VerbosityPrefix} ${message}`);
    }
}

export function error(message: string) {
    if (verbosityLevel >= VerbosityLevel.ERRORS) {
        console.error(`${VerbosityPrefix} ${message}`);
    }
}

export function unreachable(reason: string): never {
    throw new Error(`${VerbosityPrefix} ${reason}`);
}
