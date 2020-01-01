//js多语言关键字、用语。（借助webpack.DefinePlugin插件）
//Js multilingual keywords, phrases.(with the help of webpack.DefinePlugin)

module.exports = {
    //用于一些（英文）api对象的属性。示例：var 对象:{[命名]:'值'}
    //For some of the attributes of the object (in English) API. Example: var obj:{[aliasname]:'value'}
    命名    : '"name"',
    组件集  : '"components"',
    计算属性: '"computed"',
    方法集  : '"methods"',

    挂载到: '"$mount"',
    路由: '"router"',
    状态: '"store"',
    呈现器: '"render"',
    //=================================================================
    //主要用于js环境的一些系统级全局变量、API、速写语法
    //Mainly used for some js environment system level global variables, API, sketch
    全局计算变量:'computed',


};
//todo 数据大了之后考虑分出子模块
//note 如果需要添加用语文件，在vue.config.js中配置DefineObj
//note if you need to add phrases files, you need to config the vue.config.js and DefineObj.
