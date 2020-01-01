/*
    postcss配置
*/

//所需插件

module.exports = {
    exec: true,
    //parser: 'sugarss',
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {},
        'cssnano': {}
    }
};
