<template lang="pug">
#应用
    .主容器.mha.w600
        router-view
        .分隔线: hr
        .导航.db 导航
        .db
            router-link(to="/") 主页
            span |
            router-link(to="/about") 简介

</template>

<style lang="sass">
@import ~hia-common-css/src/css/hia/hia_common.scss

#应用
    +_(颜色, 褐色)

    $样式组合: (颜色: #453423         , //note 这里的规则名和值都可以中英混合
    背景色          : blue,
    border          : 5px solid 浅蓝色)



</style>

<script lang="ls">

computed='这是个计算变量'

for 值 in [24567 to 24569]
    console.log 值

中文= 'zhongwen'

计算属性对象=
    (计算属性):'12341234计算属性'

console.log '计算属性对象',计算属性对象,'全局计算变量',全局计算变量
</script>


