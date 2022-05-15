<template>
<div class="cart">
        <nav-bar class="nav-bar">
        <!-- 导航 -->
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list></cart-list>
        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
</div>

</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue"
import CartList from "./childComponents/CartList.vue"
import CartBottomBar from "./childComponents/CartBottomBar.vue"

import {mapGetters} from "vuex"  //vux内部的辅助函数，辅助函数仅仅是将store映射到局部的计算属性


export default {
    name:'Shopcart',
    components:{
        NavBar,
        CartList,
        CartBottomBar
    },
    computed:{
        //两种写法
        //第一种，数组
        ...mapGetters(['cartLength'])

        //第二种，对象，自定义命名
        // ...mapGetters({
        //     length:'cartLength'
        // })

    }
}
</script>

<style scoped>
.cart{
    height:100vh;
}
.nav-bar{
    background-color:var(--color-tint);
    color:#fff;
}
</style>