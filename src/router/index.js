import V视图    from 'vue'            ;
import V路由    from 'vue-router'     ;
import 主页视图 from '../views/Home.vue'  ;
import 用户方法 from '../api/biz/user';

V视图[启用](V路由);

const 路由列表 = [
    {
        [路径]: '/',
        [命名]: '主页',
        [组件]: 主页视图
    },
    {
        [路径]: '/about',
        [命名]: '简介',
        [组件]: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
    }

];

const 路由 = new V路由({
    [路由集]: 路由列表
});

路由[全局路由前置事件]((目标路由, 来源路由, 下一步) => {
    //检测登录状态并跳转。
    用户方法.登录状态检测(目标路由, 来源路由, 下一步, 路由[应用][V选项][状态]);
});

export default 路由;
