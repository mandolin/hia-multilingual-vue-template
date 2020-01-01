const PATH  = require('path');
const PATHS = {
    Prj : PATH.join(__dirname, './'  ), //项目目录
    Dist: PATH.join(__dirname, 'dist'), //输出目录
    Src : PATH.join(__dirname, 'src' ), //源目录
};
const UGLIFYJS_PLUGIN = require('uglifyjs-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;
const WEBPACK = require('webpack'       ) ;

const MULTILINGUAL_CUSTOM = require('./tool/multilingual/multilingual-custom') ;
const MULTILINGUAL = require('./tool/multilingual/multilingual') ;
//note 编译阶段嵌入全局中文标识符常量
var   DefineObj= Object.assign({
    //PRODUCTION: JSON.stringify(true),
    //VERSION: JSON.stringify('1.0.0'),
    //BROWSER_SUPPORTS_HTML5: true,
    //'typeof window': JSON.stringify('object'),
    //'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),

},MULTILINGUAL,MULTILINGUAL_CUSTOM);


module.exports = {
    //公共地址根路径（亦即生产环境下或网站运行目录）
    publicPath: '',
    //静态文件目录
    assetsDir: 'static',
    //是否包含运行时编译机制
    runtimeCompiler: true,

    lintOnSave: true,

    productionSourceMap: false,

    css: {
        requireModuleExtension: false,
        loaderOptions: {
            css: {},
            postcss: {
                // 这里的选项会传递给 postcss-loader
                //exec: true,
                //parser: 'sugarss',
                plugins:[
                    require('postcss-import')(),
                    require('postcss-preset-env')(),
                    require('cssnano')()
                ]
            }
        }
    },
    chainWebpack: config => {
        config.module.rule('images').use('url-loader').loader('url-loader')
            .tap(options => Object.assign(options, { esModule: false  }));
        config.module.rule('media').use('url-loader').loader('url-loader')
            .tap(options => Object.assign(options, { esModule: false  }));
        config.module.rule('fonts').use('url-loader').loader('url-loader')
            .tap(options => Object.assign(options, { esModule: false  }));

    },
    configureWebpack: (config) => {
        config.plugins.push(
            new WEBPACK.DefinePlugin(DefineObj)
        );
        if (NODE_ENV === 'production') {
            config.plugins.push(
                new UGLIFYJS_PLUGIN({
                    uglifyOptions: {
                        compress: {
                            //warnings: false,
                            drop_debugger: true, // 注释console
                            drop_console: true,
                            pure_funcs: ['console.log'] // 移除console
                        },
                    },
                    sourceMap: false,
                    parallel: true,
                })
            );
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            'preProcessor': 'sass',
            'patterns': [
                PATH.resolve(__dirname, './tool/multilingual/multilingual-custom.sass'),//note 将你的自定义配置文件置于你需要的地方。Put your custom configuration files in where it is needed.
                PATH.resolve(__dirname, './tool/multilingual/multilingual.sass'),
            ]
        }
    }
};
