//混入
//混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。
//一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

// 1.定义
//  export var myMixin = {
//     created(){
//         console.log('hello mixin')
//     }
// }
// 2.使用:在组件中使用
// mixins:[myMixin]