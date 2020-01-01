const 用户 = {
    namespaced: true,

    // 模块内容（module assets）
    state: {   }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
    getters: {
        isAdmin () {  } // -> getters['account/isAdmin']
    },
    actions: {
        login () {   } // -> dispatch('account/login')
    },
    mutations: {
        login () {   } // -> commit('account/login')
    },
};
export default 用户;
