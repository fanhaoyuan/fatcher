import config from '../../shared/rollup.base.config';
export default config({
    external: ['fatcher'],
    globals: {
        fatcher: 'Fatcher',
    },
});
