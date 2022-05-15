<template>
<div id="home" >
    <nav-bar class="home-nav">
    <div slot="center">购物街</div></nav-bar>
    <tab-control class="control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probetype="3" @scroll="contentScroll" :pullupload="true" @pullingUp="loadMore">
       <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
       <recommend-view :recommends="recommends"></recommend-view>
       <feature-view></feature-view>
       <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
       <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
     <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>     <!--组件监听点击需要加.native -->
</div>
  
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue"
import homeSwiper from './childComponents/homeSwiper.vue'
import recommendView from './childComponents/recommendView.vue'
import FeatureView from "./childComponents/FeatureView.vue"
import GoodsList from "../../components/content/goods/GoodsList.vue"
import TabControl from "../../components/content/TabControl/TabControl.vue"
import Scroll from "../../components/common/scroll/Scroll.vue"
import BackTop from "../../components/content/backTop/BackTop.vue"


import {debounce} from "../../common/utils"


import {getHomeMultidata,getHomeGoods} from "../../network/home"


export default {
    name:'Home',
    components:{
      NavBar,
      homeSwiper,
      recommendView,
      FeatureView,
      TabControl,
      getHomeGoods,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page: 0, list: []},
          'new':{page: 0, list: []},
          'sell':{page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    //  computed: {
    //   showGoods() {
    //     return this.goods[this.currentType].list
    //   }
    // },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //保存y值
      this.saveY = this.$refs.scroll.scroll.y;

      // console.log(this.saveY)
    },
    created(){
      //1.请求多个数据
       this.getHomeMultidata();
      //2.请求商品数据
       this.getHomeGoods('pop');
       this.getHomeGoods('new');
       this.getHomeGoods('sell');
       
    },
    mounted(){
      //3.监听item中图片加载完成 解决bug
       const refresh = debounce(this.$refs.scroll.refresh,50)
      this.$bus.$on('itemImageLoad',() => {
        // this.$refs.scroll.scroll.refresh()
        refresh();
      })
      
    },
    methods:{
      //事件监听相关

      tabClick(index){
         switch(index){
           case 0:
             this.currentType = "pop"
             break
           case 1:
             this.currentType = "new"
             break
           case 2:
             this.currentType = "sell"
             break
         }
         this.$refs.tabControl1.currentIndex = index;
         this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
            this.$refs.scroll.scrollTo(0,0,500);
      },
      contentScroll(position){
        //1.判断backTop是否显示
        this.isShowBackTop = position.y < -1000;
        //2.决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = position.y < -(this.tabOffsetTop);//628
      },
      loadMore(){
        console.log('加载更多');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
      //获取tabControl的offsetTop
      //所有的组件都有一个$el属性；用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      //网络请求相关
      getHomeMultidata(){
         getHomeMultidata().then(res => {
                   console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();//多次上拉加载刷新
        
      })
      }
}
}
</script>

<style scoped>
#home{
  /* padding-top:44px; */
  position:relative;
  height:100vh;
}
.home-nav{
  background-color:var(--color-tint);
  color:#fff;
/* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position:fixed;
  top:0;
  left:0;
  right:0;
  z-index:9; */
}

.content{
  overflow: hidden;

  position:absolute;
  top:44px;
  bottom:49px;
  left:0;
  right:0;
}
.control{
  position:relative;
  z-index:9;
}
</style>