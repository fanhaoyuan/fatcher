import config from '../../shared/rollup.base.config';
export default config({
    external: ['fatcher', 'mockjs'],
    globals: {
        fatcher: 'Fatcher',
        mockjs: 'Mock',
    },
});
