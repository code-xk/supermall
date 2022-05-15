<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick"></check-button>
          <span>全选</span>
      </div>

      <div class="price">
          合计:{{totalPrice}}
      </div>

      <div class="calculate">
          去计算({{checkLength}})
      </div>
      
  </div>
</template>

<script>
// import mapGetters from "vuex"
import CheckButton from "../../../components/content/checkButton/CheckButton.vue"

export default {
    name:'CartBottomBar',
    components:{
        CheckButton
    },
    methods:{
        checkClick(){
            if(this.isSelectAll){
                this.$store.state.cartList.forEach(n => n.checked = false)  //foreach() 方法对数组中每一个2元素可执行一次方法
            } else{
                this.$store.state.cartList.forEach(n => n.checked = true)
            }
        }
    },
    computed:{
        // ...mapGetters(['cartLength']),
        totalPrice(){
            return '￥' + this.$store.state.cartList.filter( n =>{
                return n.checked
            }).reduce((previousValue,n) => {    
                return previousValue +(n.price * n.count)
            },0).toFixed(2)    //给默认值0，不给出错
        },
        checkLength(){
            return this.$store.state.cartList.filter( n => n.checked).length
        },
        isSelectAll(){
            if(this.$store.state.cartList.length){
            return !(this.$store.state.cartList.filter( n => !n.checked).length) //正数取反为false,0取反为true
            }
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    height:40px;
    background-color:#eee;
     position:relative;
    line-height:40px;
    display:flex;
}
.check-content{
    display:flex;
    align-items:center; /*设置侧轴上子元素排列方式（单行时使用）*/
    margin-left:10px;
}
.check-button{
    width:22px;
    height:22px;
    line-height:22px;
    margin-right:5px;
}
.price{
    margin-left:20px;
}
.calculate{
position:absolute;
right:0px;
width:100px;
background-color:#ff5000;
text-align:center;
}
</style>