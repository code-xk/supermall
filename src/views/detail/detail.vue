<template>
  <div id="detail">
   <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
   <scroll class="content" ref="scroll" @scroll="contentScroll" :probetype="3">
       <detail-swiper :topImages="topimages"></detail-swiper>
       <detail-base-info :goods="goods"></detail-base-info>
       <detail-shop-info :shop="shop"></detail-shop-info>
       <detail-goods-info :detailInfo="detailinfo" @imageLoad="imageLoad"></detail-goods-info>
       <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
       <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
       <goods-list :goods="recommends" ref="recommend"></goods-list>
   </scroll>
   <detail-bottom-bar @addCart="addtocart"></detail-bottom-bar>
   <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>  
   
   <!-- <h2>{{goods.title}}</h2> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar.vue"
import DetailSwiper from "./childComponents/DetailSwiper.vue"
import DetailBaseInfo from "./childComponents/DetailBaseInfo.vue"
import DetailShopInfo from "./childComponents/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComponents/detailGoodsInfo.vue"
import DetailParamInfo from "./childComponents/DetailParamInfo.vue"
import DetailCommentInfo from "./childComponents/DetailCommentInfo.vue"
import GoodsList from "../../components/content/goods/GoodsList.vue"
import DetailBottomBar from "./childComponents/DetailBottomBar"
import BackTop from "../../components/content/backTop/BackTop.vue"

import {debounce} from "../../common/utils"

import Scroll from "../../components/common/scroll/Scroll.vue"

import {getDetail, Goods, Shop, GoodsParam,getRecommend} from ".././../network/detail"


export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop,
        Scroll
    },
    data(){
        return{
            iid:null,
            topimages:[],
            goods:{},
            shop:{},
            detailinfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeY:[],
            getThemeY:null,
            currentIndex:0,
            isShowBackTop:false
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
            //保存商品详情数据
            this.detailinfo = data.detailInfo
            //获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            //取出评论信息
            if(data.rate.cRate !==0){
               this.commentInfo = data.rate.list[0];
            }


        })
        //3.请求推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list;
        })
        //4.给getThemeY赋值
        this.getThemeY = debounce(() => {

        this.themeY = []
        this.themeY.push(0)
        this.themeY.push(this.$refs.params.$el.offsetTop)
        this.themeY.push(this.$refs.comment.$el.offsetTop)
        this.themeY.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeY)
        },100)
    },
    mounted(){

        const refresh =debounce(this.$refs.scroll.refresh,50)
        this.$bus.$on('detailImageLoad',() => {
            refresh()
        })
    },
    methods:{
        imageLoad(){
            this.$refs.scroll.refresh()
            this.getThemeY()
        },
        titleClick(index){
            console.log(index)
            this.$refs.scroll.scrollTo(0,-this.themeY[index],100)
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0,300);
        },
        contentScroll(position){
            //1.获取Y值
            const positionY = -position.y

            //2.positionY和主题中的值对比
            // [0,7398,9120,9454]

            // positionY 在 0 和 7398 之间 ，index = 0
            // positionY 在 7398 和 9120 之间 ，index = 1
            // positionY 在 9120 和 9454 之间 ，index = 2
            // positionY 大于 9454 值，index = 3

          let length = this.themeY.length
        for (let i = 0; i <length; i++) {
           if (this.currentIndex !== i && ((i<length - 1 && positionY >= this.themeY[i] && positionY < this.themeY[i+1]) || 
           (i === length - 1 && positionY >= this.themeY[i]))) {
           this.currentIndex = i
           console.log(this.currentIndex)
           this.$refs.nav.currentIndex = this.currentIndex

           //是否显示backTop
           this.isShowBackTop = position.y < -1000;
        }
      }
        },
        //添加到购物车
        addtocart(){
            console.log("实现功能")
            //1.获取购物车需要展示的信息
            const product = {}
            product.image = this.topimages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;
            //2.将商品添加到购物车中
            // this.$store.commit('addCart',product) //mutations调用
            this.$store.dispatch('addCart',product).then(res => {
                console.log(res)
            })

        }
        
    },
    updated(){

        
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
    height:calc(100% - 44px - 58px);
}
.detail-nav{
    position:relative;
    z-index:9;
    background-color:#fff;
}
</style>