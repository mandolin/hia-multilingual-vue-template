<template lang='pug'>
    .主页
        img(alt='Vue 徽标' src="../assets/logo.png")
        p 本次操作时间: {{本次操作时间}}
        button(@click = '更新一些时间') 更新(@click = '更新一些时间'无效)
        <button @click="更新一些时间()">更新(@click = '更新一些时间()'有效)</button>

</template>

<script>
// @ is an alias to /src
import {
    mapState   as 数据映射,
    mapActions as 操作映射
} from 'vuex';

export default {
    [命名]  : '主页视图',
    [组件集]: {

    },
    [计算属性]: 数据映射({
        已登录      : 数据 => 数据.登录信息.已登录      ,
        上次登录时间: 数据 => 数据.登录信息.上次登录时间,
        上次活跃时间: 数据 => 数据.登录信息.上次活跃时间,
        本次操作时间: 数据 => 数据.登录信息.本次操作时间,
        过期时间    : 数据 => 数据.登录信息.过期时间    ,
    }),
    [方法集]: {
        更新:function(){
            this.$store.dispatch('更新本次操作时间');
            控制台记录('aaa',1111111111111111111111111);
        },

        ...操作映射( {'更新一些时间': '更新本次操作时间' } )

    }
};
</script>
