<template>
  <div id="detail">
   <detail-nav-bar class="detail-nav"></detail-nav-bar>
   <scroll class="content">
       <detail-swiper :topImages="topimages"></detail-swiper>
       <detail-base-info :goods="goods"></detail-base-info>
       <detail-shop-info :shop="shop"></detail-shop-info>
   </scroll>
   
   <!-- <h2>{{goods.title}}</h2> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar.vue"
import DetailSwiper from "./childComponents/DetailSwiper.vue"
import DetailBaseInfo from "./childComponents/DetailBaseInfo.vue"
import DetailShopInfo from "./childComponents/DetailShopInfo.vue"

import Scroll from "../../components/common/scroll/Scroll.vue"

import {getDetail, Goods, Shop} from ".././../network/detail"

export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll
    },
    data(){
        return{
            iid:null,
            topimages:[],
            goods:{},
            shop:{}
        }
    },
    created(){
        //1.保存传入的iid
        this.iid = this.$route.params.id;
        //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            console.log(res);
            const data = res.result;
            //获取顶部的轮播数据
            this.topimages = data.itemInfo.topImages
            //获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            //创建店铺信息对象
            this.shop = new Shop(data.shopInfo)

        })
    }
}
</script>

<style scoped>
#detail{
    position:relative;
    z-index:9;
    background-color:#fff;
    height:100vh;
}
.content{
    height:calc(100% - 44px);
}
.detail-nav{
    position:relative;
    z-index:9;
    background-color:#fff;
}
</style>