<template lang="pug">
.介绍(主题=春天)
    //- note 建议（仅供参考）：使用英文样式类和英文属性来：呈现基本样式、与api相关或api对其有命名约束的相关行为的标识
    //- note 建议（仅供参考）：使用中文属性来：表达语义、呈现站点/频道/页面等（偏于相对统一的）通用样式、与相对纯粹的业务相关的行为的标识
    #介绍.着重文字.mha(介绍文字 主题='春天') 这是一个春天的主题
        <div 内容摘要>一些内容摘要</div>
</template>
<style lang='sass' scoped>

$春色: 浅绿色 //

[主题=春天]
    background: lightblue //note 常规写法目前无法用中文。（理论上改造sass后可以实现常规写法支持中文）
    color: red
    background-color: lightgreen

    // 使用混入，全程用中文写样式
    +_(背景色, 浅蓝色)
    +_(颜色, 红色)
    +_(背景色, $春色)

</style>
