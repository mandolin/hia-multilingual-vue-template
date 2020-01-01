//js多语言关键字、用语，用户自定义文件。（借助webpack.DefinePlugin插件）
//Js multilingual keywords, phrases, user-defined file.(with the help of webpack.DefinePlugin)
// * note 此文件用户可以置于其它指定的文件夹
// * note This file can be placed in other folders

module.exports = {
    //用于一些（英文）api对象的属性。示例：var 对象:{[命名]:'值'}
    //For some of the attributes of the object (in English) API. Example: var obj:{[aliasname]:'value'}
    命名    : '"name"',
    组件集  : '"components"',
    计算属性: '"computed"',
    方法集  : '"methods"',

    变更集:'"mutations"',
    操作集:'"actions"',
    模块集:'"modules"',

    挂载到: '"$mount"',
    路由: '"router"',
    路由集: '"routes"',
    状态: '"store"',
    呈现器: '"render"',
    状态数据 : '"state"',
    路径 : '"path"',
    组件  : '"component"',
    启用:'"use"',

    状态设定: '"Store"',

    配置:'"config"',
    生产环境提示:'"productionTip"',
    全局路由前置事件:'"beforeEach"',
    执行:'"commit"',

    应用:'"app"',
    调度:'"dispatch"',

    V选项:'"$options"',

    //=================================================================
    //主要用于js环境的一些系统级全局变量、API、速写语法
    //Mainly used for some js environment system level global variables, API, sketch
    真: 'true',
    假: 'false',
    是: 'true',
    否: 'false',

    全局计算变量:'computed',

    惰性加载: '() => import',

    根状态:'this.$store',

    当前时间: 'new Date()',

    控制台记录:'console.log', // note 属于速写形式，当经常调用路径较深的相同属性时，可用此速写形式。
};

