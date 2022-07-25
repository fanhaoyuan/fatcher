import { useAppContext } from '@/app.context';

export function useLocalePath() {
    const { locales } = useAppContext();

    function getLocalePath(locale: string, fullPath: string) {
        let paths = fullPath.split('/');

        paths.shift();

        if (!locales.some(item => item[0] === paths[0])) {
            paths = [locales[0][0], ...paths];
        }

        paths.shift();

        const path = ['', locale, ...paths].join('/').replace(locales[0][0], '');

        return path;
    }

    return {
        getLocalePath,
    };
}
