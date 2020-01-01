# 多语言辅助开发框架模板

适用于希望用中文开发vue前端应用的开发者。\
理论上适用于任何希望用非英语语言开发的用户。


## 前提
已安装好node.js、已全局安装vue-cli。

## 项目安装
```
npm install
```
### pug的中文id和中文样式类的速写形式支持
安装好后，请使用tool文件夹中的 `pug-lexer/index.js` 替换 `node_module` 中的相应文件。
（使pug能支持 `.中文类#中文id` 的写法）

### 编译并热加载调试
```
npm run serve
```

### 编译并打包为生产环境代码
```
npm run build
```

## 说明

### 使用方法
- 直接clone本项目,在此基础上开发vue项目。（推荐）
- 在你的项目中使用
    1. `npm i -D hia-multilingual-vue-template`
    2. 建立好你自己的样式用语库和脚本用语库
    3. 配置你的vue.config.js 或者 webpack配置文件
        ```js
        //引入webpack。
        const WEBPACK = require('webpack') ;
        //引入你自己的脚本语库文件。
        const MULTILINGUAL_CUSTOM = require('path to your cutom multilingual file') ;
        //引入标准语库文件。
        const MULTILINGUAL = require('hia-multilingual-vue-template/tool/multilingual/multilingual') ;
        //合并成单个对象。
        var DefineObj= Object.assign({
            //还可以在此同时定义一些其它编译时全局常量。
            //PRODUCTION: JSON.stringify(true),
            //VERSION: JSON.stringify('1.0.0'),
            //BROWSER_SUPPORTS_HTML5: true,
            //'typeof window': JSON.stringify('object'),
            //'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },MULTILINGUAL,MULTILINGUAL_CUSTOM);

        module.exports = {
            //DefinePlugin插件处理DefineObj
            configureWebpack: (config) => {
                config.plugins.push(
                    new WEBPACK.DefinePlugin(DefineObj)
            ),
            pluginOptions: {
                //自动导入多语言辅助sass库，避免在每个sass文件或块中手动导入。
                'style-resources-loader': {
                    'preProcessor': 'sass',
                    'patterns': [
                        PATH.resolve(__dirname, 'path to your cutom multilingual sass/scss file'),//note 将你的样式语库文件置于你需要的地方。Put your custom configuration files in where it is needed.
                        PATH.resolve(__dirname, 'hia-multilingual-vue-template/tool/multilingual/multilingual.sass'),//标准样式语库文件
                    ]
                }
            }
        }
        ```
    4. 然后就可以轻松的使用中文写样式和脚本了。详见下面[指南](#指南)。

### 指南
- 写中文样式
    ```sass
    $春色: 浅绿色
    [主题=春天]
        background: lightblue //note 常规写法目前无法用中文。（理论上改造sass后可以实现常规写法支持中文）

        // 使用混入，全程用中文写样式

        // 单条样式规则写法
        +_(背景色          , 浅蓝色     )
        +_(颜色            , 红色       )
        +_(背景色          , $春色      )
        +_(background-color, #3a3       ) //可混用原始英文命名
        +_(背景色          , lightgreen ) //可混用原始英文命名
        +_(background-color, $春色      ) //可混用原始英文命名

        //多条样式规则区块式写法。note 注意在sass格式下，list和map不能在起始括号后和结束括号前换行，否则会出错。如希望每条定义都单独成行，请用scss格式。
        +_((颜色: #514d97,
        背景色  : 绿色,
        边框    : 121px 实线 浅蓝色), false)
    ```
- 写中文脚本
    ```js
    /*
        语库的用语定义分为两类

        1. 命名: '"name"', 这样的形式，用于一些（英文）api对象的属性。
            示例：var 某api对象 = {[命名]:'值'}; 某api函数调用(对象[属性][子属性]......[最终属性])

        2. 命名: 'name'，这样的形式，主要用于js环境的一些系统级全局变量、API、速写语法。
            示例：某全局方法名();

    */
    //note 导入对象，属于局部变量，可直接中文命名。
    import V视图     from 'vue'               ;
    import V状态管理 from 'vuex'              ;
    import 用户      from './modules/user.js' ;

    //note 以 `启用` 为例，为语库中的属性词汇，会在编译期直接替换为语库中定义的值: `"use"`
    V视图[启用](V状态管理);

    export default new V状态管理[状态设定]({
        [状态数据]: {
            登录信息:{
                已登录      : false,    //从本地存储获取及处理
                上次登录时间: null,     //从本地存储获取及处理
                上次活跃时间: null,     //从本地存储获取及处理
                本次操作时间: null,     //从本地存储获取及处理
                过期时间    : 20*60*1000//从本地存储获取及处理
            }
        },
        [变更集]: {
            更新本次操作时间 (状态数据) {
                //note 以 `当前时间` 为例，为语库中的系统级定义词汇，会在编译期直接替换为语库中定义的值: `new Date()`
                状态数据.登录信息.本次操作时间 = 当前时间;
                //note 以 `控制台记录` 为例，为语库中的系统级定义词汇，会在编译期直接替换为语库中定义的值: `console.log`。note 属于速写形式
                控制台记录('更新本次操作时间',状态数据.登录信息.本次操作时间);
            }
        },
        [操作集]: {
            更新本次操作时间: (上下文)=>{
                控制台记录('更新本次操作时间 (上下文) ',上下文);
                上下文[执行]('更新本次操作时间');
            }
        },
        [模块集]: {
            用户:用户
        }
    });

    ```

### 实现机制及效果
- 修改了pug-lexer的相关正则，使得用pug语言写template模板时支持中文样式类和中文id的速写形式
- 用sass实现了一个混入(mixin)，使得可以使用中文写样式规则(须使用混入速写形式)
- 通过引入webpack.DefinePlugin插件，使得可以在脚本中使用中文作为全局变量和对象属性(写法稍异)的名称。

### 特性和不足
- 好处是:
    - 不用修改各种库的API或者fork出一个本地化库。同时也意味着不会对原始API调用造成任何差异性。
    - 开发者可以根据自己的语义偏好设置自定义用语,不必被某个统一的语义用语风格绑架。
    - 开发者可以创造出各种适合自身使用的速写用词。见上方[指南](#指南)。

- 不足在于:
    - js对象属性写法上稍异,需要适应。（如需完全兼容常规写法，理论上可以通过修改webpack插件来解决）
    - 一些语法高亮等特性会失效（需要针对性的插件来解决）。
    - 少量特殊关键字暂时无法运用此法（但理论上可以通过修改webpack插件来解决）。
    - 局部变量的速写不支持(因为会被uglifyjs转换，如要支持的话，需要改造defineplugin插件提前执行或者开发一个针对性的插件)，暂时可以通过调整构建流程来解决(将uglifyjs处理放在最后一步，或者单独做一个后处理流程)。
    - sass中不支持在常规单条样式规则中用中文（但理论上可以通过修改sass来解决）。
    - eval中的任何关键字、api、变量等必须使用原始命名。（预计到将来都难以解决，因为js不像python能给关键字起别名）

总体上来说，本项目目前用最精简的方式，实现了大范围的中文可用性，效能比突出；\
另一方面，功能还很单薄，很多不足之处也很明显。\
后期会不断改进。

### 一些需要注意的地方

#### 代码方面
    button(@click = '更新一些时间') //-无效
    /*须加上括号：*/ button(@click = '更新一些时间()')
    //- 英文名方法则无此问题

#### 语库
本应用尚处于demo状态，主要是标准语库刚开始建立，如果你希望立即在你的开发环境中运用此框架，你至少需要建立及完善你自身的语库。

#### 中英混用
使用建议(仅供参考)：某些情形下适宜用中文(多见于可读性更重要的场景)，某些情形下适宜用英文尤其是简短字符(多见于需要快速输入代码的场景，比如快速实现一些逻辑简明但是语法啰嗦的私有方法内部方法等)，请斟酌结合使用，找到最佳的使用方式。

#### 适用项目
- 推荐个人项目使用。
- 如在团队项目中推行，目前还需要慎重考虑，主要有两点：
    1. 用语的个性化的个体差异可能超过想象，这会对团队交流带来程度不等的影响。
    2. 每个人对中文代码的接受度不一样、增益性有差异（甚至对某些个体可能是负面影响）。

    解决的方案也有：开发时使用各自的用语库，需要交流时则转换为标准库用语(可以有多套)即可，但这一点依赖于用语转换功能(尚未实现，后期考虑)。

### 为什么中文开发
多年开发的经历给了本人一个启示：改代码、读代码的所需时间和精力远远超出写代码。\
本人作为一个中文母语的开发者，英文的掌握还算合格，但在阅读和理解速度上始终磕磕碰碰，各人的语言天赋毕竟有先天差异，并非后天一定能弥补（或者代价很大），（另还有中文、英文在象形表意、表音之间的差异和影响，也是额外的因素，这些可以查看很多这方面的相关论述）。\
基于以上及更多相关因素，本人逐渐开始尝试在编程中更多的引入中文名，取得不错效果后，从此坚定了自己走中文开发的步子。工作中以前端为主，而前端中vue在中国使用广泛，因此决定在vue基础上实现一套多语言机制方便中文开发。

### 对编程个体的意义
一言蔽之：“此之蜜糖,彼之砒霜”。

---

# hia-multilingual-vue-template

Apply to  vue front-end application developers who wanna use Chinese for programming.\
In theory it is applicable to any user whe wants to use the Non English language for development.

## Premise
Node.js is installed and Vue cli is installed globally.

## Project setup
```
npm install
```

### Make it usable for Chinese id and Chinese style class sketch form of pug
After installation，Please use file `./tool/pug-lexer/index.js` replace the relevant file of `node_module` .
（make the pug can support sketch form of `.中文类#中文id`）

### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```

## Description


### Method of use
- Clone this project directly, develop vue project on this basis. (recommend)
- Use in your projects
    1. `npm i -D hia-multilingual-vue-template`
    2. Establish your own styling and scripting thesaurus
    3. Configure your vue.config.js or webpack configuration file
        ```js
        const WEBPACK = require('webpack') ;
        // Introduce your own script corpus file.
        const MULTILINGUAL_CUSTOM = require('path to your cutom multilingual file') ;
        // Introduce standard corpus files.
        const MULTILINGUAL = require('hia-multilingual-vue-template/tool/multilingual/multilingual') ;
        // Merge into a single object.
        var DefineObj= Object.assign({
            // You can also define some other compile-time global constants here.
            //PRODUCTION: JSON.stringify(true),
            //VERSION: JSON.stringify('1.0.0'),
            //BROWSER_SUPPORTS_HTML5: true,
            //'typeof window': JSON.stringify('object'),
            //'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },MULTILINGUAL,MULTILINGUAL_CUSTOM);

        module.exports = {
            configureWebpack: (config) => {
                config.plugins.push(
                    new WEBPACK.DefinePlugin(DefineObj)
            ),
            pluginOptions: {
                // Automatically import the multi-language auxiliary sass library to avoid manual import in each sass file or block.
                'style-resources-loader': {
                    'preProcessor': 'sass',
                    'patterns': [
                        PATH.resolve(__dirname, 'path to your cutom multilingual sass/scss file'),//note Put your custom configuration files in where it is needed.
                        PATH.resolve(__dirname, 'hia-multilingual-vue-template/tool/multilingual/multilingual.sass'),// Standard style corpus file
                    ]
                }
            }
        }
        ```
    4.  Then you can easily write styles and scripts in Chinese. See [Guide](#guide) below for details.

### Guide
- Write Chinese style
    ```sass
    $春色: 浅绿色
    [主题=春天]
        background: lightblue // note It is currently not possible to use Chinese in regular writing. (Theoretically, it is possible to support conventional Chinese after transforming sass)

        // use mixin and write styles in Chinese throughout

        // single style rule
        +_(背景色          , 浅蓝色     )
        +_(颜色            , 红色       )
        +_(背景色          , $春色      )
        +_(background-color, #3a3       ) //can be mixed with the original English name
        +_(背景色          , lightgreen ) //can be mixed with the original English name
        +_(background-color, $春色      ) //can be mixed with the original English name

        //Block style of multiple style rules. note Note that in sass format, lists and maps cannot wrap after the opening parenthesis and before the closing parenthesis, otherwise errors will occur. If you want each definition to be on its own line, use scss format.
        +_((颜色: #514d97,
        背景色  : 绿色,
        边框    : 121px 实线 浅蓝色), false)
    ```
- Write Chinese script
    ```js
    /*
        Definition of terminology into two categories

        1. Naming: '"name"', this form is used for some (English) API object properties.
            Example: var some-api-object = {[name]: 'value'}; some api function call (object [attribute] [sub-attribute] ... [final attribute])

        2. Naming: 'name', this form is mainly used for some system-level global variables, APIs, and sketch syntax in the js environment.
            Example: a global method name ();

    */
    //note The imported object is a local variable and can be directly named in Chinese.
    import V视图     from 'vue'               ;
    import V状态管理 from 'vuex'              ;
    import 用户      from './modules/user.js' ;

    //note note Take `enable` as an example, as the attribute word in the corpus, it will be directly replaced with the value defined in the corpus at compile time: `"use"`
    V视图[启用](V状态管理);

    export default new V状态管理[状态设定]({
        [状态数据]: {
            登录信息:{
                已登录      : false,    //
                上次登录时间: null,     //
                上次活跃时间: null,     //
                本次操作时间: null,     //
                过期时间    : 20*60*1000//
            }
        },
        [变更集]: {
            更新本次操作时间 (状态数据) {
                //note Take `当前时间` as an example, define the vocabulary for the system level in the corpus, and it will be directly replaced with the value defined in the corpus during compilation:`new Date()`
                状态数据.登录信息.本次操作时间 = 当前时间;
                //note Take `控制台记录` as an example, define the vocabulary for the system level in the corpus, it will be directly replaced with the value defined in the corpus at compile time:`console.log`. note is sketched form

                控制台记录('更新本次操作时间',状态数据.登录信息.本次操作时间);
            }
        },
        [操作集]: {
            更新本次操作时间: (上下文)=>{
                控制台记录('更新本次操作时间 (上下文) ',上下文);
                上下文[执行]('更新本次操作时间');
            }
        },
        [模块集]: {
            用户:用户
        }
    });

    ```

### Implementation mechanism and effect
- Modified the related rules of pug-lexer so that when writing template templates in pug language, Chinese style classes and Chinese id sketches are supported
- Implemented a mixin with sass, making it possible to write style rules in Chinese (must use the mixin sketch form)
- Through the introduction of the webpack.DefinePlugin plugin, it is possible to use Chinese as the name of global variables and object attributes (slightly different) in the script.

### Features and shortcomings
- Benefits are:
    - No need to modify the API of various libraries or fork out a localized library. It also means that there is no difference to the original API call.
    - Developers can set custom terms according to their own semantic preferences, without having to be kidnapped by a uniform semantic language style.
    - Developers can create all kinds of sketch words suitable for their use. See [Guide] (#Guide) above.

- The disadvantages are:
    - js object attributes are written slightly differently and need to be adapted. (For full compatibility with conventional writing, in theory, it can be solved by modifying the webpack plugin)
    - Some features such as syntax highlighting will fail (requires targeted plugins to resolve).
    - A small number of special keywords are temporarily unavailable for this method (but theoretically can be solved by modifying the webpack plugin).
    - The sketching of local variables is not supported (because it will be converted by uglifyjs. If you want to support it, you need to modify the defineplugin plug-in to execute in advance or develop a targeted plug-in). For the time being, you can solve the problem by adjusting the build process (put the uglifyjs processing in the last step , Or do a separate post-processing process).
    - Sass does not support Chinese in regular single style rules (but in theory, it can be solved by modifying sass).
    - Any keywords, apis, variables, etc. in eval must use the original name. (It is expected to be difficult to solve in the future, because js does not alias keywords like python)

Overall, the project has achieved a wide range of Chinese availability in the most streamlined manner, with an outstanding efficiency ratio. \
On the other hand, the functions are very thin and many shortcomings are obvious. \
It will continue to improve in the later stages.

### Some things to note

#### Code aspect
    button (@click = 'Update some time') //-Invalid
    /* Require parentheses: */ button (@click = 'Update some time ()')
    //- English name method does not have this problem

#### Corpus
This application is still in the demo state, and the standard corpus is just beginning to be established. If you want to use this framework in your development environment immediately, you need to build and improve your own corpus at least.

#### Chinese and English mixed
Suggestions for use (for reference only): Chinese is appropriate in some cases (most commonly in scenarios where readability is more important), and English, especially short characters, is appropriate in some situations (mostly in scenarios where you need to quickly enter code, such as quick Implement some logically concise but grammatically private methods, etc.), please consider combining them to find the best way to use them.

#### Applicable items
- Recommended for personal projects.
- If it is implemented in a team project, it needs to be carefully considered at present. There are two main points:
    1. Personalized individual differences in terms may exceed imagination, which will have varying degrees of impact on team communication.
    2. Each person's acceptance of Chinese codes is different, and the gain is different (even may be negative for some individuals).

    There are also solutions: use their own termbases during development, and convert to standard library terms (multiple sets) when communication is required, but this depends on the term conversion function (not yet implemented, considered later).

### Why Chinese Development
The experience of many years of development has given me an inspiration: the time and effort required to change and read the code is far more than writing code. \
As a native Chinese developer, I still have a good command of English, but I always have a bump in the speed of reading and understanding. After all, each person's language talents have innate differences, which may not be able to make up (or cost a lot). (There are also differences and influences between pictographs and phonetics in Chinese and English, which are also additional factors. These can be viewed in many related discussions in this regard). \
Based on the above and more related factors, I gradually began to try to introduce more Chinese names in programming. After achieving good results, I have firmly established myself in the pace of Chinese development. The front-end is mainly used in the work, and vue is widely used in China. Therefore, it is decided to implement a multi-language mechanism based on vue to facilitate Chinese development.

### Meaning for programming individuals
In a word: "This honey, the other frost."


# License
MIT 2020 mandolin.mdy@gmail.com
