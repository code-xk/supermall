<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
    name:"Scroll",
    data(){
        return {
            scroll:null, 
        }
    },
    props:{
        probetype:{
            type:Number,
            default:0
        },
        pullupload:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        //创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probetype,
            pullUpLoad:this.pullupload
        })
        //监听滚动位置
        this.scroll.on('scroll',position => {
            // console.log(position);
            this.$emit('scroll',position)
        })
        //监听上拉事件
        this.scroll.on('pullingUp',() => {
            // console.log('上拉加载更多');
            this.$emit('pullingUp')
        })
    },
    methods:{
        scrollTo(x,y,time=100){
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        refresh(){
            // console.log('----');
            this.scroll && this.scroll.refresh()
        },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp()
        }
    }
}
</script>

<style>

</style>