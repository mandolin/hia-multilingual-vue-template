import V视图    from 'vue'      ;
import V路由    from 'vue-router'     ;
import V状态管理 from 'vuex'              ;
import 应用主件 from './App.vue';
import 路由数据 from './router' ;
import 状态数据 from './store'  ;

V视图[配置][生产环境提示] = 真;

new V视图({
    router  : 路由数据,
    [状态]  : 状态数据 ,
    [呈现器]: 呈现 => 呈现(应用主件),
})[挂载到]('#应用');
